# Database Specification

Version: 1.0

---

# 1. Purpose

This document defines the database architecture used by the Interactive Portfolio Website.

The database stores all dynamic content displayed on both the public portfolio and the CMS.

The database should remain independent from the frontend implementation.

The backend is responsible for accessing and managing all database operations.

---

# 2. Goals

The database should provide

✓ Clean relational structure

✓ High maintainability

✓ Easy scalability

✓ Minimal data duplication

✓ Strong referential integrity

✓ CMS-friendly architecture

The database should support future expansion without major redesign.

---

# 3. Database Engine

Recommended

PostgreSQL

Alternative

Microsoft SQL Server

ORM

Entity Framework Core

The schema should remain compatible with both database engines whenever possible.

---

# 4. Naming Convention

Tables

PascalCase

Example

Projects

ProjectImages

Achievements

Columns

PascalCase

Example

ProjectTitle

CreatedAt

UpdatedAt

Primary Key

Id

Foreign Key

ParentTableNameId

Examples

ProjectId

CharacterId

LanguageId

Boolean

Prefix

Is

Examples

IsActive

IsDeleted

IsPublished

Date

Suffix

At

Examples

CreatedAt

UpdatedAt

DeletedAt

---

# 5. Common Columns

Every content table should contain

Id

CreatedAt

UpdatedAt

CreatedBy

UpdatedBy

IsPublished

IsDeleted

Version

Purpose

CreatedAt

Record creation date

UpdatedAt

Last modification

CreatedBy

Administrator ID

UpdatedBy

Administrator ID

IsPublished

Visible on website

IsDeleted

Soft delete

Version

Optimistic concurrency

---

# 6. Database Principles

Use Soft Delete

Never permanently remove content immediately.

Use Foreign Keys

Every relationship should be explicit.

Avoid Duplicate Data

Store reusable data only once.

Normalize where practical.

Avoid unnecessary complexity.

---

# 7. High-Level Architecture

Users

↓

Content

↓

Media

↓

Character

↓

Settings

↓

Translations

Each module remains independent.

Communication occurs through foreign keys.

---

# 8. Main Tables

Authentication

Users

RefreshTokens

AuditLogs

Portfolio

About

Experiences

Projects

ProjectImages

Skills

SkillCategories

Achievements

AchievementCategories

Character

Characters

Animations

AnimationMappings

Localization

Languages

Translations

System

Settings

Themes

Media

---

# 9. Relationship Philosophy

One User

↓

Many Projects

One User

↓

Many Skills

One Character

↓

Many Animations

One Project

↓

Many Images

One Language

↓

Many Translations

Relationships should remain intuitive.

---

# 10. Index Strategy

Indexes should exist on

Primary Keys

Foreign Keys

Email

Slug

Language Code

Project Status

CreatedAt

UpdatedAt

Indexes improve API performance.

Avoid unnecessary indexes.

---

---

# 11. Users Table

Purpose

Stores administrator accounts.

Columns

Id

Email

PasswordHash

FullName

Role

Avatar

LastLogin

CreatedAt

UpdatedAt

IsActive

One administrator is sufficient for Version 1.

Future versions may support multiple administrators.

---

# 12. RefreshTokens Table

Purpose

Stores JWT Refresh Tokens.

Columns

Id

UserId

Token

ExpiresAt

CreatedAt

RevokedAt

IsRevoked

Relationship

One User

↓

Many Refresh Tokens

Old tokens should remain stored for auditing.

---

# 13. AuditLogs Table

Purpose

Records every important administrator action.

Columns

Id

UserId

Action

Module

Description

IpAddress

CreatedAt

Examples

Login

Logout

Delete Project

Upload Character

Publish Changes

Audit logs should never be editable.

---

# 14. About Table

Purpose

Stores personal profile information.

Columns

Id

FullName

JobTitle

ShortBio

LongBio

Email

Phone

Location

ResumeMediaId

AvatarMediaId

Github

LinkedIn

Instagram

Website

CreatedAt

UpdatedAt

Only one About record should be active.

---

# 15. Experience Table

Columns

Id

Company

Position

EmploymentType

Location

Description

StartDate

EndDate

IsCurrent

DisplayOrder

CreatedAt

UpdatedAt

Newest experiences appear first.

---

# 16. Projects Table

Columns

Id

Title

Slug

ShortDescription

Description

GithubUrl

DemoUrl

VideoUrl

Status

Featured

ThumbnailMediaId

DisplayOrder

CreatedAt

UpdatedAt

Projects remain independent from images.

---

# 17. ProjectImages Table

Columns

Id

ProjectId

MediaId

Caption

DisplayOrder

CreatedAt

Relationship

One Project

↓

Many Images

---

# 18. SkillCategories Table

Columns

Id

Name

Icon

DisplayOrder

Categories are reusable.

Examples

Frontend

Backend

Database

DevOps

Unity

Tools

---

# 19. Skills Table

Columns

Id

CategoryId

Name

Description

Level

Icon

DisplayOrder

CreatedAt

UpdatedAt

Relationship

One Category

↓

Many Skills

---

---

# 21. AchievementCategories Table

Purpose

Stores reusable achievement categories.

Columns

Id

Name

Icon

Description

DisplayOrder

CreatedAt

UpdatedAt

Examples

Certificate

Award

Competition

Course

Milestone

Badge

Categories should remain reusable.

---

# 22. Achievements Table

Purpose

Stores all achievements displayed on the portfolio.

Columns

Id

CategoryId

Title

Organization

Description

IssueDate

ExpirationDate

CredentialId

CredentialUrl

ThumbnailMediaId

DisplayOrder

CreatedAt

UpdatedAt

Relationship

One Category

↓

Many Achievements

---

# 23. AchievementMedia Table

Purpose

Stores multiple media files belonging to an achievement.

Columns

Id

AchievementId

MediaId

Caption

DisplayOrder

CreatedAt

Relationship

One Achievement

↓

Many Media Files

Supported Media

Certificate

Additional Images

PDF

---

# 24. Languages Table

Purpose

Stores all supported languages.

Columns

Id

Name

Code

IsDefault

IsEnabled

CreatedAt

UpdatedAt

Examples

English

en

Bahasa Indonesia

id

Only one language may be marked as the default.

---

# 25. Translations Table

Purpose

Stores all translatable text used by the application.

Columns

Id

LanguageId

TranslationKey

TranslationValue

Module

CreatedAt

UpdatedAt

Example

Language

English

Key

Navigation.Projects

Value

Projects

Example

Language

Indonesia

Key

Navigation.Projects

Value

Proyek

Using translation keys prevents duplicated content.

---

# 26. Translation Strategy

Every visible text should reference a translation key.

Incorrect

Store raw English text everywhere.

Correct

Store

Navigation.Projects

↓

Lookup

↓

Projects

↓

Proyek

This allows unlimited language expansion.

---

# 27. Language Relationships

One Language

↓

Many Translations

Deleting a language should not automatically remove translations.

The CMS should require confirmation.

---

# 28. Localization Rules

Content modules such as

About

Projects

Skills

Achievements

Experience

should support localized content.

The database should remain flexible enough to store translated versions in future releases.

---

# 29. Localization Performance

Translations should be loaded in batches.

Avoid querying one translation at a time.

Cache translations whenever possible.

---

---

# 31. Characters Table

Purpose

Stores available 3D character models.

Columns

Id

Name

Description

ModelMediaId

PreviewMediaId

Version

IsActive

CreatedAt

UpdatedAt

Only one character should be active.

Previous characters remain stored for future use.

---

# 32. Character Versions

Replacing a character should create a new version.

Old versions should remain available.

Example

Character

↓

Version 1

↓

Version 2

↓

Version 3

Administrators may switch between versions.

---

# 33. Animations Table

Purpose

Stores all available character animations.

Columns

Id

CharacterId

Name

AnimationType

MediaId

Duration

Loop

Priority

CreatedAt

UpdatedAt

Relationship

One Character

↓

Many Animations

---

# 34. Animation Types

Recommended Types

Idle

IdleVariation

Blink

Wave

Nod

LookLeft

LookRight

LookDown

Celebrate

Thinking

Custom types may be added later.

---

# 35. AnimationMappings Table

Purpose

Maps website events to character animations.

Columns

Id

EventName

AnimationId

TransitionDuration

Priority

Enabled

CreatedAt

UpdatedAt

Examples

Home

↓

Idle

ProjectsOpen

↓

LookDown

AboutOpen

↓

LookLeft

ExperienceOpen

↓

LookRight

CharacterClick

↓

Wave

---

# 36. Animation Rules

One event

↓

One default animation

Future versions may support

Random animation selection

Priority-based animation

Animation blending

---

# 37. Character Settings Table

Purpose

Stores configurable character behavior.

Columns

Id

Scale

PositionX

PositionY

PositionZ

RotationX

RotationY

RotationZ

MouseFollow

BlinkEnabled

IdleEnabled

AutoWave

EnvironmentPreset

UpdatedAt

The website loads these settings during startup.

---

# 38. Character Relationships

One Character

↓

Many Animations

One Animation

↓

Many Event Mappings

One Character

↓

One Character Settings

---

# 39. Character Validation

Before activating a character

Verify

✓ Model exists

✓ Preview exists

✓ Idle animation exists

✓ Skeleton compatible

✓ Required animations available

Activation should fail if validation fails.

---

---

# 41. Media Table

Purpose

Stores all uploaded files used by the portfolio.

Every uploaded file should exist only once.

All modules reference media through MediaId.

---

# 42. Media Columns

Id

FileName

OriginalFileName

Extension

MimeType

Size

Width

Height

Duration

StorageProvider

StoragePath

Checksum

CreatedAt

UpdatedAt

CreatedBy

---

# 43. Supported Media Types

Images

PNG

JPG

JPEG

WEBP

SVG

3D Models

GLB

GLTF

Future

VRM

Animations

GLB

GLTF

Documents

PDF

Videos

MP4

WEBM

---

# 44. Media Usage

A single media file may be used by multiple modules.

Examples

Avatar Image

↓

About

Project Thumbnail

↓

Projects

Certificate Image

↓

Achievements

Character Model

↓

Characters

Animation File

↓

Animations

No duplicated uploads should be required.

---

# 45. Media Relationships

Media

↓

Referenced By

About

Projects

Achievements

Characters

Animations

Themes

Deleting media should be prevented while it is still referenced.

---

# 46. Media Storage

Current

Local Storage

Future

AWS S3

Cloudflare R2

Azure Blob Storage

Google Cloud Storage

The database should only store metadata.

Actual files remain in storage.

---

# 47. File Naming Strategy

Uploaded filenames should never be used directly.

Generate

UUID

↓

Store File

↓

Save Metadata

Example

Original

resume.pdf

Stored

3a19b3af-71fa-4b68-a5d2.pdf

This prevents filename collisions.

---

# 48. Media Validation

Before saving

Validate

✓ Extension

✓ MIME Type

✓ Maximum Size

✓ Virus Scan (Future)

Reject unsupported file types.

---

# 49. Media Optimization

Images

↓

Compress

↓

Generate Thumbnail

↓

Store

Large images should not be served directly when thumbnails are available.

---

---

# 51. Settings Table

Purpose

Stores global website configuration.

Only one active settings record should exist.

---

# 52. Settings Columns

Id

WebsiteTitle

WebsiteDescription

DefaultLanguageId

DefaultThemeId

MaintenanceMode

PortfolioVersion

CharacterEnabled

CreatedAt

UpdatedAt

---

# 53. Themes Table

Purpose

Stores available UI themes.

Columns

Id

Name

DisplayName

Mode

PrimaryColor

SecondaryColor

AccentColor

DividerColor

PanelColor

TextPrimary

TextSecondary

BorderRadius

ShadowPreset

CreatedAt

UpdatedAt

Examples

Midnight Indie

Paper Light

Future custom themes may be added.

---

# 54. Theme Relationships

One Theme

↓

Many Settings Versions

Only one theme is active at a time.

Changing themes should not require database migration.

---

# 55. Environment Settings

Additional configuration

PopupAnimationSpeed

NavigationAnimationSpeed

CharacterLightingPreset

DefaultCameraPreset

IdleAnimationInterval

MouseFollowSensitivity

These values are editable through the CMS.

---

# 56. Website State

Current state information

CurrentTheme

CurrentLanguage

MaintenanceMode

CharacterEnabled

LastPublished

These values should be cached.

---

# 57. Feature Flags

Future features should use feature flags.

Examples

BlogEnabled

GuestbookEnabled

MiniGameEnabled

TestimonialsEnabled

ChatEnabled

Feature flags reduce the need for schema changes.

---

# 58. Versioning

Configuration changes should increase

Version

UpdatedAt

This allows synchronization between frontend and backend.

---

# 59. Configuration Cache

Frequently accessed configuration

↓

Load Once

↓

Store in Memory Cache

↓

Refresh When Updated

Avoid querying the database on every request.

---

---

# 61. Foreign Key Rules

The database should enforce referential integrity.

Every relationship must explicitly define its foreign key.

Examples

Projects

↓

ThumbnailMediaId

↓

Media.Id

Skills

↓

CategoryId

↓

SkillCategories.Id

Animations

↓

CharacterId

↓

Characters.Id

Avoid implicit relationships.

---

# 62. Delete Behavior

The following delete behaviors are recommended.

Media

Referenced

↓

Restrict

Projects

↓

ProjectImages

↓

Cascade

SkillCategories

↓

Skills

↓

Restrict

AchievementCategories

↓

Achievements

↓

Restrict

Characters

↓

Animations

↓

Cascade

Animations

↓

AnimationMappings

↓

Cascade

Users

↓

AuditLogs

↓

Restrict

Users

↓

RefreshTokens

↓

Cascade

---

# 63. Soft Delete

Content should never be permanently removed immediately.

Workflow

Delete

↓

IsDeleted = true

↓

Hidden from CMS

↓

Hidden from Website

↓

Restore (Optional)

Hard delete should only be available to administrators.

---

# 64. Cascade Delete Rules

Cascade Delete should only be used when child records cannot exist independently.

Examples

Project

↓

ProjectImages

Character

↓

Animations

Animation

↓

Mappings

Avoid cascading across unrelated modules.

---

# 65. Unique Constraints

The following values should be unique.

Users

Email

Projects

Slug

Languages

Code

Themes

Name

Characters

Only one active character

Settings

Only one active settings record

Unique constraints help prevent duplicate data.

---

# 66. Check Constraints

Recommended validations.

Scale

Greater than 0

Opacity

Between 0 and 1

Animation Duration

Greater than 0

Language Code

Maximum 10 characters

Theme Mode

Dark

Light

Validation should occur in both the database and backend.

---

# 67. Transaction Rules

Operations involving multiple tables should use database transactions.

Example

Create Project

↓

Insert Project

↓

Insert Images

↓

Commit

If one step fails

↓

Rollback

This ensures data consistency.

---

# 68. Optimistic Concurrency

Every editable table should contain

Version

or

RowVersion

When two administrators edit the same record

↓

Conflict Detected

↓

Prompt for Refresh

This prevents accidental overwrites.

---

# 69. Data Integrity

The database should reject

Orphan records

Invalid foreign keys

Duplicate unique values

Broken mappings

Data integrity is enforced by both the database and backend.

---

---

# 71. Performance Goals

The database should prioritize

Fast Reads

Reliable Writes

Low Latency

Scalability

The portfolio is read-heavy.

Optimize read performance without sacrificing maintainability.

---

# 72. Index Strategy

Primary Keys

↓

Clustered Index

Foreign Keys

↓

Non-Clustered Index

Additional Indexes

CreatedAt

UpdatedAt

Slug

DisplayOrder

LanguageId

CategoryId

Indexes should support the most common queries.

---

# 73. Query Optimization

Avoid

SELECT *

Prefer

Selecting only required columns.

Example

Project Card

Only load

Title

Thumbnail

Short Description

Do not load the full project description unnecessarily.

---

# 74. Pagination

Large datasets should use pagination.

Recommended

Limit

20

Offset

0

Future

Cursor Pagination

Pagination reduces memory usage and response time.

---

# 75. Search Optimization

Search should support

Projects

Skills

Achievements

Experience

Use indexed columns whenever possible.

Future

Full-text search

---

# 76. Caching

Frequently accessed data

↓

Memory Cache

Examples

Settings

Theme

Languages

Navigation

Translations

Avoid querying unchanged data repeatedly.

---

# 77. Lazy Loading

Large assets should be loaded only when required.

Examples

Project Gallery

Certificate Images

Character Preview

Animations

Avoid loading all media during initial startup.

---

# 78. Statistics

The CMS dashboard may display

Total Projects

Total Skills

Total Achievements

Total Experiences

Storage Usage

Character Count

Statistics should be generated efficiently.

---

# 79. Database Maintenance

Regular maintenance should include

Index Rebuild

Vacuum (PostgreSQL)

Statistics Update

Backup Verification

Maintenance should not interrupt website availability.

---

---

# 81. Entity Relationship Diagram (ERD)

The database follows a modular architecture.

Each module is responsible for a single domain.

```
Users
 ├── RefreshTokens
 └── AuditLogs

Projects
 └── ProjectImages

SkillCategories
 └── Skills

AchievementCategories
 └── Achievements
        └── AchievementMedia

Characters
 ├── Animations
 │      └── AnimationMappings
 └── CharacterSettings

Languages
 └── Translations

Media
 ├── About
 ├── Projects
 ├── ProjectImages
 ├── Achievements
 ├── AchievementMedia
 ├── Characters
 └── Animations

Themes
 └── Settings
```

---

# 82. Relationship Cardinality

Users

1

↓

Many

RefreshTokens

Users

1

↓

Many

AuditLogs

Projects

1

↓

Many

ProjectImages

SkillCategories

1

↓

Many

Skills

AchievementCategories

1

↓

Many

Achievements

Achievements

1

↓

Many

AchievementMedia

Characters

1

↓

Many

Animations

Characters

1

↓

1

CharacterSettings

Animations

1

↓

Many

AnimationMappings

Languages

1

↓

Many

Translations

Themes

1

↓

Many

Settings History (Future)

---

# 83. One-to-One Relationships

Characters

↓

CharacterSettings

About

↓

Resume Media

(Current Active Record)

Settings

↓

Current Theme

One-to-One relationships should remain minimal.

---

# 84. One-to-Many Relationships

Projects

↓

ProjectImages

Characters

↓

Animations

Achievements

↓

AchievementMedia

Languages

↓

Translations

SkillCategories

↓

Skills

AchievementCategories

↓

Achievements

Users

↓

AuditLogs

Users

↓

RefreshTokens

These relationships represent the majority of the schema.

---

# 85. Many-to-Many Relationships

Version 1

No Many-to-Many relationships are required.

Future examples

Projects

↔

Technologies

Projects

↔

Tags

Characters

↔

Accessories

These can be implemented using junction tables.

---

# 86. Database Growth

Expected growth

Projects

Low

Skills

Low

Achievements

Medium

Media

High

AuditLogs

High

RefreshTokens

High

Media and logs should be monitored periodically.

---

# 87. Archiving Strategy

Old records may be archived.

Examples

Old Audit Logs

Expired Refresh Tokens

Unused Media

Archived records should remain recoverable.

---

# 88. Future Database Modules

Potential additions

Testimonials

Blog Posts

Guestbook

Mini Games

Analytics

Notifications

Plugin System

The schema should remain modular enough to accommodate these additions.

---

# 89. Database Diagram Principles

The ERD should remain readable.

Avoid unnecessary relationships.

Keep entities focused on a single responsibility.

Normalization should improve maintainability rather than increase complexity.

---

---

# 91. Entity Framework Core Conventions

The backend uses Entity Framework Core.

Recommended conventions

• One DbSet per table

• Fluent API for relationships

• Data Annotations only when appropriate

• Configuration classes separated by entity

Avoid placing relationship configuration inside entity models.

---

# 92. Migration Strategy

Every schema change should be introduced through EF Core Migrations.

Workflow

Update Entity

↓

Create Migration

↓

Review Migration

↓

Apply Migration

↓

Verify Database

Never modify production tables manually.

---

# 93. Seed Data

Initial data should be seeded automatically.

Recommended seed data

Administrator Account

Default Theme

Languages

Skill Categories

Achievement Categories

Default Character Settings

Seed data should only run when required.

---

# 94. Repository Pattern

Recommended structure

Controllers

↓

Services

↓

Repositories

↓

Entity Framework Core

↓

Database

Business logic should never exist inside repositories.

Repositories are responsible only for data access.

---

# 95. Validation Responsibility

Validation should exist in multiple layers.

Frontend

↓

User Experience

Backend

↓

Business Rules

Database

↓

Data Integrity

Each layer complements the others.

---

# 96. Backup Recommendations

Recommended schedule

Database

Daily

Media

Weekly

Configuration

Weekly

Always verify backup integrity before relying on it.

---

# 97. Monitoring

Recommended metrics

Database Size

Media Storage

Query Duration

Failed Requests

Login Attempts

Storage Growth

Monitoring helps identify performance issues early.

---

# 98. Documentation Rules

Every new table should include

Purpose

Relationships

Primary Key

Foreign Keys

Indexes

Validation Rules

This keeps documentation synchronized with implementation.

---

# 99. Final Database Principles

The database should remain

• Modular

• Consistent

• Scalable

• Secure

• Efficient

• Easy to Maintain

Every schema decision should prioritize long-term maintainability over short-term convenience.

---

# 100. End of Database Specification

Version 1.0

The database architecture defined in this document serves as the foundation for the backend, CMS, and public portfolio application.

Future features should extend this architecture without requiring significant redesign of existing modules.