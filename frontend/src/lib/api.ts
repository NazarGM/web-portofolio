import type {
  Profile,
  SocialLink,
  Experience,
  Project,
  Skill,
  Achievement,
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';
const ASSET_ORIGIN = API_BASE.replace(/\/api\/?$/, '');

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

let authToken: string | null = localStorage.getItem('admin_token');

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) localStorage.setItem('admin_token', token);
  else localStorage.removeItem('admin_token');
}

export function getAuthToken() {
  return authToken;
}

export function resolveUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\/api(?=\/)/, '');
  return `${ASSET_ORIGIN}${clean}`;
}

import i18n from '../i18n';

export function localize(obj: Record<string, any>, key: string): string | undefined {
  const lang = (i18n.language || 'id').slice(0, 2);
  if (lang === 'en') {
    const enVal = obj[key + 'En'];
    if (enVal != null && enVal !== '') return String(enVal);
  }
  const val = obj[key];
  return val != null ? String(val) : undefined;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    if (res.status === 401) {
      setAuthToken(null);
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    const body = await res.text().catch(() => '');
    throw new ApiError(res.status, body || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

function get<T>(path: string) {
  return request<T>(path);
}

function post<T>(path: string, body: unknown) {
  return request<T>(path, { method: 'POST', body: JSON.stringify(body) });
}

function put<T>(path: string, body: unknown) {
  return request<T>(path, { method: 'PUT', body: JSON.stringify(body) });
}

function del(path: string) {
  return request<void>(path, { method: 'DELETE' });
}

export const api = {
  profile: {
    get: () => get<Profile>('/profile'),
    update: (data: Partial<Profile>) => put<Profile>('/profile', data),
  },
  socials: {
    list: () => get<SocialLink[]>('/socials'),
    create: (data: Partial<SocialLink>) => post<SocialLink>('/socials', data),
    update: (id: string, data: Partial<SocialLink>) => put<SocialLink>(`/socials/${id}`, data),
    remove: (id: string) => del(`/socials/${id}`),
  },
  experiences: {
    list: () => get<Experience[]>('/experiences'),
    create: (data: Partial<Experience>) => post<Experience>('/experiences', data),
    update: (id: string, data: Partial<Experience>) => put<Experience>(`/experiences/${id}`, data),
    remove: (id: string) => del(`/experiences/${id}`),
  },
  projects: {
    list: () => get<Project[]>('/projects'),
    create: (data: Partial<Project>) => post<Project>('/projects', data),
    update: (id: string, data: Partial<Project>) => put<Project>(`/projects/${id}`, data),
    remove: (id: string) => del(`/projects/${id}`),
  },
  skills: {
    list: () => get<Skill[]>('/skills'),
    create: (data: Partial<Skill>) => post<Skill>('/skills', data),
    update: (id: string, data: Partial<Skill>) => put<Skill>(`/skills/${id}`, data),
    remove: (id: string) => del(`/skills/${id}`),
  },
  achievements: {
    list: () => get<Achievement[]>('/achievements'),
    create: (data: Partial<Achievement>) => post<Achievement>('/achievements', data),
    update: (id: string, data: Partial<Achievement>) => put<Achievement>(`/achievements/${id}`, data),
    remove: (id: string) => del(`/achievements/${id}`),
  },
  auth: {
    login: (username: string, password: string) =>
      post<{ token: string }>('/auth/login', { username, password }),
    updateAccount: (data: { currentPassword?: string; newUsername?: string; newPassword?: string; email?: string }) =>
      put<{ message: string }>('/auth/account', data),
    forgotPassword: () =>
      post<{ message: string }>('/auth/forgot-password', {}),
    resetPassword: (token: string, newPassword: string) =>
      post<{ message: string }>('/auth/reset-password', { token, newPassword }),
  },
  upload: {
    file: (file: File) => {
      const fd = new FormData();
      fd.append('file', file);
      const headers: Record<string, string> = {};
      if (authToken) headers.Authorization = `Bearer ${authToken}`;
      return fetch(`${API_BASE}/uploads`, { method: 'POST', headers, body: fd }).then((res) => {
        if (!res.ok) throw new ApiError(res.status, `Upload failed: ${res.status}`);
        return res.json() as Promise<{ url: string }>;
      });
    },
  },
};

export { ApiError };
