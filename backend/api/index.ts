import express from 'express';
import cors from 'cors';
import multer from 'multer';
import 'dotenv/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Pool } from 'pg';

// === Environment ===
const DATABASE_URL = process.env.DATABASE_URL ?? '';
const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000';
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? '';
const ADMIN_RESET_KEY = process.env.ADMINRESETKEY ?? '';
const CORS_ORIGINS = (process.env.CORS_ORIGINS ?? 'http://localhost:3000,http://localhost:5173')
  .split(',').map((s) => s.trim()).filter(Boolean);
const IS_VERCEL = process.env.NODE_ENV === 'production';

// === DB ===
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const storage = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "Profiles" ("Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "Name" TEXT NOT NULL, "Title" TEXT NOT NULL, "TitleEn" TEXT, "Bio" TEXT, "BioEn" TEXT, "Age" INT, "Location" TEXT, "Email" TEXT, "Website" TEXT, "AvatarUrl" TEXT, "UpdatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS "SocialLinks" ("Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "Platform" TEXT NOT NULL, "Url" TEXT NOT NULL, "IconName" TEXT)`,
  `CREATE TABLE IF NOT EXISTS "Experiences" ("Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "Role" TEXT NOT NULL, "RoleEn" TEXT, "Company" TEXT NOT NULL, "Type" TEXT, "StartDate" TIMESTAMPTZ NOT NULL, "EndDate" TIMESTAMPTZ, "Description" TEXT, "DescriptionEn" TEXT)`,
  `CREATE TABLE IF NOT EXISTS "Projects" ("Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "Title" TEXT NOT NULL, "TitleEn" TEXT, "Description" TEXT, "DescriptionEn" TEXT, "ThumbnailUrl" TEXT, "Tags" TEXT DEFAULT '[]', "DemoUrl" TEXT, "GithubUrl" TEXT)`,
  `CREATE TABLE IF NOT EXISTS "Skills" ("Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "Name" TEXT NOT NULL, "NameEn" TEXT, "Description" TEXT, "DescriptionEn" TEXT, "IconName" TEXT, "Level" INT DEFAULT 0, "Category" TEXT)`,
  `CREATE TABLE IF NOT EXISTS "Achievements" ("Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "Title" TEXT NOT NULL, "TitleEn" TEXT, "Issuer" TEXT, "Date" TIMESTAMPTZ, "ThumbnailUrl" TEXT, "Description" TEXT, "DescriptionEn" TEXT)`,
  `CREATE TABLE IF NOT EXISTS "AdminUsers" ("Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "Username" TEXT NOT NULL, "Email" TEXT, "PasswordHash" TEXT NOT NULL, "ResetToken" TEXT, "ResetTokenExpires" TIMESTAMPTZ)`,
];

const TABLES: Record<string, { table: string; cols: string[] }> = {
  socials: { table: 'SocialLinks', cols: ['Platform', 'Url', 'IconName'] },
  experiences: { table: 'Experiences', cols: ['Role', 'RoleEn', 'Company', 'Type', 'StartDate', 'EndDate', 'Description', 'DescriptionEn'] },
  projects: { table: 'Projects', cols: ['Title', 'TitleEn', 'Description', 'DescriptionEn', 'ThumbnailUrl', 'Tags', 'DemoUrl', 'GithubUrl'] },
  skills: { table: 'Skills', cols: ['Name', 'NameEn', 'Description', 'DescriptionEn', 'IconName', 'Level', 'Category'] },
  achievements: { table: 'Achievements', cols: ['Title', 'TitleEn', 'Issuer', 'Date', 'ThumbnailUrl', 'Description', 'DescriptionEn'] },
};
const PROFILE_COLS = ['Name', 'Title', 'TitleEn', 'Bio', 'BioEn', 'Age', 'Location', 'Email', 'Website', 'AvatarUrl'];

// === Helpers ===
const toCamel = (row: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(row).map(([k, v]) => [k[0].toLowerCase() + k.slice(1), v]));
const toPascal = (body: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(body).map(([k, v]) => [k[0].toUpperCase() + k.slice(1), v]));

function sha256(s: string): string {
  return crypto.createHash('sha256').update(s).digest('hex');
}

// === Bootstrap (idempotent) ===
async function bootstrap(): Promise<void> {
  try {
    for (const sql of SCHEMA_STATEMENTS) await pool.query(sql);

    // Ensure Id columns have UUID default (existing tables from prior deploys may lack it)
    for (const table of ['Profiles', 'SocialLinks', 'Experiences', 'Projects', 'Skills', 'Achievements', 'AdminUsers']) {
      await pool.query(`ALTER TABLE "${table}" ALTER COLUMN "Id" SET DEFAULT gen_random_uuid()`).catch(() => {});
    }

    await pool.query(`UPDATE "Profiles" SET "UpdatedAt" = CURRENT_TIMESTAMP WHERE "UpdatedAt" IS NULL`);

    if (storage) {
      try { await storage.storage.createBucket('uploads', { public: true }); } catch { /* exists */ }
    }

    // Seed content data
    const { rows } = await pool.query('SELECT COUNT(*)::int AS n FROM "Profiles"');
    if (rows[0].n === 0) {
      const seedPath = join(process.cwd(), 'seed.json');
      try {
        const seed = JSON.parse(readFileSync(seedPath, 'utf8')) as Record<string, Array<Record<string, unknown>>>;
        for (const [key, item] of Object.entries(seed)) {
          if (key === 'AdminUsers') continue;
          const rows = item as Array<Record<string, unknown>>;
          if (rows.length === 0) continue;
          const placeholders = rows.map((_, i) => `(${cols(rows[0]).map((_, j) => `$${i * cols(rows[0]).length + j + 1}`).join(',')})`).join(',');
          const flat = rows.flatMap((r) => cols(r).map((c) => r[c]));
          await pool.query(`INSERT INTO "${key}" (${cols(rows[0]).map((c) => `"${c}"`).join(',')}) VALUES ${placeholders}`, flat);
        }
      } catch (e) {
        console.error('[seed] seed.json missing or invalid:', (e as Error).message);
      }
    }

    // Admin user
    const admin = await pool.query('SELECT COUNT(*)::int AS n FROM "AdminUsers"');
    if (admin.rows[0].n === 0) {
      if (!ADMIN_PASSWORD) {
        console.error('[seed] ADMIN_PASSWORD not set; cannot create admin user');
      } else {
        await pool.query('INSERT INTO "AdminUsers" ("Username", "Email", "PasswordHash") VALUES ($1, $2, $3)',
          ['admin', ADMIN_EMAIL || null, bcrypt.hashSync(ADMIN_PASSWORD, 10)]);
      }
    }
  } catch (e) {
    console.error('[bootstrap]', (e as Error).message);
  }
}

function cols(row: Record<string, unknown>): string[] {
  return Object.keys(row).filter((k) => k !== 'Id');
}

bootstrap();

// === Rate limiting (in-memory fixed window) ===
const rateHits = new Map<string, number[]>();
function rateLimit(ip: string, key: string): boolean {
  const now = Date.now();
  const k = `${ip}:${key}`;
  const hits = (rateHits.get(k) ?? []).filter((t) => now - t < 60_000);
  if (hits.length >= 5) return false;
  hits.push(now);
  rateHits.set(k, hits);
  return true;
}

// === Auth ===
function signToken(username: string, sub: string): string {
  return jwt.sign(
    { username },
    JWT_SECRET,
    { subject: sub, issuer: 'PortfolioAPI', audience: 'PortfolioAdmin', expiresIn: '7d' },
  );
}

function authRequired(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.headers.authorization ?? '';
  if (!header.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(header.slice(7), JWT_SECRET) as { username: string; sub?: string };
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

function sendEmail(to: string, subject: string, text: string): Promise<void> {
  if (!RESEND_API_KEY) {
    console.log(`[email] SMTP not configured. Reset link for ${to}: ${text}`);
    return Promise.resolve();
  }
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, text }),
  })
    .then(async (r) => { if (!r.ok) console.error('[email] resend error:', await r.text()); })
    .catch((e) => console.error('[email]', (e as Error).message));
}

// === App ===
const app = express();
app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(express.json({ limit: '2mb' }));

const api = express.Router();

api.get('/health', (_req, res) => res.json({ status: 'Healthy' }));

// === Profile ===
api.get('/profile', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM "Profiles" LIMIT 1');
  res.json(rows[0] ? toCamel(rows[0]) : null);
});

api.put('/profile', authRequired, async (req, res) => {
  const data = toPascal(req.body ?? {});
  const allowed = PROFILE_COLS.filter((c) => data[c] !== undefined);
  const sets = allowed.map((c, i) => `"${c}" = $${i + 1}`).join(', ');
  const params = allowed.map((c) => data[c]);
  params.push(new Date());
  const { rows } = await pool.query(
    `UPDATE "Profiles" SET ${sets}, "UpdatedAt" = $${params.length} RETURNING *`,
    params,
  );
  res.json(toCamel(rows[0]));
});

// === CRUD collections ===
for (const [key, { table, cols }] of Object.entries(TABLES)) {
  api.get(`/${key}`, async (_req, res) => {
    const { rows } = await pool.query(`SELECT * FROM "${table}"`);
    res.json(rows.map(toCamel));
  });

  api.post(`/${key}`, authRequired, async (req, res) => {
    const data = toPascal(req.body ?? {});
    const allowed = cols.filter((c) => data[c] !== undefined);
    const params = allowed.map((c) => data[c]);
    const { rows } = await pool.query(
      `INSERT INTO "${table}" (${allowed.map((c) => `"${c}"`).join(',')}) VALUES (${allowed.map((_, i) => `$${i + 1}`).join(',')}) RETURNING *`,
      params,
    );
    res.status(201).json(toCamel(rows[0]));
  });

  api.put(`/${key}/:id`, authRequired, async (req, res) => {
    const data = toPascal(req.body ?? {});
    const allowed = cols.filter((c) => data[c] !== undefined);
    if (allowed.length === 0) return res.status(400).json({ message: 'No fields to update' });
    const sets = allowed.map((c, i) => `"${c}" = $${i + 1}`).join(', ');
    const params = [...allowed.map((c) => data[c]), req.params.id];
    const { rows } = await pool.query(`UPDATE "${table}" SET ${sets} WHERE "Id" = $${params.length} RETURNING *`, params);
    if (!rows[0]) return res.status(404).json({ message: 'Not found' });
    res.json(toCamel(rows[0]));
  });

  api.delete(`/${key}/:id`, authRequired, async (req, res) => {
    const { rowCount } = await pool.query(`DELETE FROM "${table}" WHERE "Id" = $1`, [req.params.id]);
    if (!rowCount) return res.status(404).json({ message: 'Not found' });
    res.status(204).end();
  });
}

// === Auth endpoints ===
api.post('/auth/login', async (req, res) => {
  const { username, password } = req.body ?? {};
  const ip = req.ip ?? 'x';
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
  if (!rateLimit(ip, 'login')) return res.status(429).json({ message: 'Too many requests' });

  const { rows } = await pool.query('SELECT * FROM "AdminUsers" WHERE "Username" = $1', [username]);
  const user = rows[0];
  if (!user || !bcrypt.compareSync(password, user.PasswordHash)) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ token: signToken(user.Username, user.Id) });
});

api.put('/auth/account', authRequired, async (req, res) => {
  const user = (req as any).user;
  const { currentPassword, newUsername, newPassword, email } = req.body ?? {};

  const { rows } = await pool.query('SELECT * FROM "AdminUsers" WHERE "Username" = $1', [user.username]);
  const admin = rows[0];
  if (!admin) return res.status(404).json({ message: 'Not found' });

  if (currentPassword) {
    if (!bcrypt.compareSync(currentPassword, admin.PasswordHash)) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
  }
  if (newUsername) admin.Username = newUsername;
  if (email) admin.Email = email;
  if (newPassword) {
    if (newPassword.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    admin.PasswordHash = bcrypt.hashSync(newPassword, 10);
  }
  await pool.query('UPDATE "AdminUsers" SET "Username" = $1, "Email" = $2, "PasswordHash" = $3 WHERE "Id" = $4',
    [admin.Username, admin.Email, admin.PasswordHash, admin.Id]);
  res.json({ message: 'Account updated successfully' });
});

api.post('/auth/forgot-password', async (req, res) => {
  if (!rateLimit(req.ip ?? 'x', 'forgot')) return res.status(429).json({ message: 'Too many requests' });
  const { rows } = await pool.query('SELECT * FROM "AdminUsers" LIMIT 1');
  if (rows[0]?.Email) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    await pool.query('UPDATE "AdminUsers" SET "ResetToken" = $1, "ResetTokenExpires" = $2 WHERE "Id" = $3',
      [sha256(rawToken), new Date(Date.now() + 3_600_000), rows[0].Id]);
    const link = `${FRONTEND_URL}/admin/reset-password?token=${rawToken}`;
    await sendEmail(rows[0].Email, 'Password Reset Request',
      `Hello,\n\nYou requested a password reset for your portfolio admin account.\nClick the link below to reset your password:\n\n${link}\n\nIf you did not request this, please ignore this email.`);
  }
  res.json({ message: 'A password reset link has been sent to your registered email.' });
});

api.post('/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body ?? {};
  if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password are required' });
  if (newPassword.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters long' });

  const { rows } = await pool.query('SELECT * FROM "AdminUsers" WHERE "ResetToken" = $1 AND "ResetTokenExpires" > NOW()', [sha256(token)]);
  if (!rows[0]) return res.status(400).json({ message: 'Invalid or expired reset token' });

  await pool.query('UPDATE "AdminUsers" SET "PasswordHash" = $1, "ResetToken" = NULL, "ResetTokenExpires" = NULL WHERE "Id" = $2',
    [bcrypt.hashSync(newPassword, 10), rows[0].Id]);
  res.json({ message: 'Password has been reset successfully' });
});

api.post('/auth/reset', async (req, res) => {
  const { resetKey, newPassword, newUsername } = req.body ?? {};
  if (!ADMIN_RESET_KEY || ADMIN_RESET_KEY !== resetKey) return res.status(401).json({ message: 'Unauthorized' });

  const { rows } = await pool.query('SELECT * FROM "AdminUsers" LIMIT 1');
  if (rows[0]) {
    await pool.query('UPDATE "AdminUsers" SET "Username" = $1, "PasswordHash" = $2 WHERE "Id" = $3',
      [newUsername ?? rows[0].Username, bcrypt.hashSync(newPassword, 10), rows[0].Id]);
  } else {
    await pool.query('INSERT INTO "AdminUsers" ("Username", "Email", "PasswordHash") VALUES ($1, $2, $3)',
      [newUsername ?? 'admin', null, bcrypt.hashSync(newPassword, 10)]);
  }
  res.json({ message: 'Admin credentials reset successfully' });
});

// === Uploads (Supabase Storage) ===
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 4 * 1024 * 1024 } });
const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.glb'];

api.post('/uploads', authRequired, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const ext = (req.file.originalname.match(/\.\w+$/) ?? [''])[0].toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) return res.status(400).json({ message: `File type ${ext} not allowed` });
  if (!storage) return res.status(500).json({ message: 'Storage not configured' });

  const path = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
  const { error } = await storage.storage.from('uploads').upload(path, req.file.buffer, {
    contentType: req.file.mimetype,
    upsert: true,
  });
  if (error) return res.status(500).json({ message: error.message });
  const { data } = storage.storage.from('uploads').getPublicUrl(path);
  res.json({ url: data.publicUrl });
});

app.use('/api', api);

export default app;

// Listen only when run directly (not on Vercel)
if (!IS_VERCEL) {
  const port = Number(process.env.PORT ?? 5210);
  app.listen(port, () => console.log(`[api] listening on http://localhost:${port}`));
}
