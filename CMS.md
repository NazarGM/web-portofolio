# CMS Specification

Version: 1.0

---

# 1. Purpose

This document defines the Content Management System (CMS) used to manage the Interactive Portfolio Website.

The CMS allows administrators to modify portfolio content without changing the application source code.

The website should be fully data-driven.

Only the application logic remains in the source code.

Everything else should be editable from the CMS.

---

# 2. Goals

The CMS should allow administrators to:

✓ Edit portfolio information

✓ Upload media

✓ Replace the 3D character

✓ Replace animations

✓ Manage projects

✓ Manage skills

✓ Manage achievements

✓ Manage experience

✓ Change About Me

✓ Manage supported languages

✓ Configure website settings

No code changes should be required.

---

# 3. CMS Philosophy

The CMS is designed for one administrator.

No multi-user collaboration is required.

The interface should be:

• Simple

• Fast

• Responsive

• Easy to maintain

The CMS is not intended to become a complex admin dashboard.

---

# 4. CMS Modules

The CMS consists of the following modules.

Dashboard

About

Experience

Projects

Skills

Achievements

Character

Languages

Theme

Settings

Media Library

Each module is independent.

---

# 5. Dashboard

Purpose

Provide an overview of the portfolio.

Suggested widgets

• Total Projects

• Total Skills

• Total Achievements

• Total Experiences

• Current Character

• Current Theme

• Last Updated

The dashboard should remain minimal.

---

# 6. Navigation

Recommended sidebar

```
Dashboard

Content
 ├── About
 ├── Experience
 ├── Projects
 ├── Skills
 └── Achievements

Character
 ├── Model
 ├── Animations

Appearance
 ├── Theme
 └── Languages

Media Library

Settings
```

The navigation should remain stable.

Avoid deeply nested menus.

---

# 7. Dashboard Layout

Recommended layout

```
-----------------------------------

Sidebar

-----------------------

Dashboard

[ Projects ]

[ Skills ]

[ Achievement ]

[ Experience ]

-----------------------

Recent Activity

Storage Usage

Current Character

-----------------------------------
```

---

# 8. Permissions

Current Version

Single Administrator

Future Support

Administrator

Editor

Viewer

The architecture should support role expansion without requiring major redesign.

---

# 9. Data Flow

Administrator

↓

CMS

↓

Database

↓

API

↓

React Website

↓

Visitor

The website should never edit data directly.

All content updates pass through the CMS.

---

# 10. General Rules

Every module should support

✓ Create

✓ Read

✓ Update

✓ Delete

Where appropriate.

Changes should be reflected on the website after publishing or saving.

---

---

# 11. About Module

The About module manages all personal profile information displayed on the portfolio.

The administrator should be able to modify every field without editing source code.

---

# 12. About Fields

Required Fields

• Full Name

• Professional Title

• Short Bio

• Long Description

• Email

• Phone

• Location

• Resume File

• Avatar Image

Optional Fields

• Current Company

• Current Status

• Availability

• Time Zone

• Personal Website

---

# 13. Social Links

Supported Platforms

• GitHub

• LinkedIn

• Instagram

• X (Twitter)

• YouTube

• Discord

• Facebook

Each platform contains

Platform

↓

URL

↓

Visible (Yes / No)

Administrators should be able to hide unused platforms.

---

# 14. Resume Management

Supported Formats

PDF

Maximum Size

10 MB

Actions

✓ Upload

✓ Replace

✓ Delete

✓ Download Preview

Only one active resume should exist.

---

# 15. About Preview

The CMS should include a live preview.

Changes

↓

Preview

↓

Save

↓

Publish

The administrator should immediately see how the About Panel will appear.

---

# 16. Experience Module

The Experience module manages the professional timeline.

Timeline entries appear in reverse chronological order.

Newest entries appear first.

---

# 17. Experience Fields

Each experience contains

• Position

• Company

• Company Logo

• Employment Type

• Location

• Start Date

• End Date

• Current Position

(True / False)

• Description

• Technologies Used

---

# 18. Experience Actions

Administrators can

✓ Add

✓ Edit

✓ Delete

✓ Reorder

✓ Duplicate

Reordering should use drag-and-drop.

---

# 19. Timeline Preview

The CMS should display the timeline exactly as it appears on the website.

Changes should update the preview immediately.

---

# 20. Validation Rules

Position

Required

Company

Required

Start Date

Required

End Date

Optional if Current Position is enabled.

Descriptions should support Markdown formatting.

---

# 21. Projects Module

The Projects module manages all portfolio projects.

Projects appear inside the Projects popup.

There is no limit to the number of projects.

---

# 22. Project Fields

Required

• Project Title

• Thumbnail

• Short Description

• Full Description

• Technology Stack

Optional

• GitHub URL

• Live Demo

• Documentation

• Video Demo

• Figma

• Featured

(True / False)

• Status

Completed

In Progress

Archived

---

# 23. Project Gallery

Each project supports multiple images.

Gallery

Image 1

Image 2

Image 3

...

Administrators should reorder images using drag-and-drop.

---

# 24. Project Technologies

Instead of free text,

the CMS should allow selecting technologies from an existing list.

Example

React

ASP.NET Core

PostgreSQL

Docker

Unity

Blender

This prevents duplicate naming.

---

# 25. Featured Projects

Projects marked as Featured appear first.

Sorting

Featured

↓

Newest

↓

Oldest

Administrators should toggle Featured with one click.

---

# 26. Project Preview

The CMS should include a project preview panel.

Preview updates in real time.

No publishing is required to see the preview.

---

# 27. SEO Fields

Optional

Project Slug

Meta Title

Meta Description

Open Graph Image

These fields are reserved for future expansion.

---

# 28. Project Validation

Project Title

Required

Thumbnail

Required

Description

Required

Technology Stack

Minimum one technology

GitHub and Demo links should be validated before saving.

---

# 29. Auto Save

Optional Feature

The CMS automatically saves drafts every 30 seconds.

Unsaved changes should be clearly indicated.

---

---

# 31. Skills Module

The Skills module manages all technical and non-technical skills displayed inside the Skills popup.

Skills should remain categorized for easier management.

---

# 32. Skill Categories

Recommended Categories

Frontend

Backend

Database

DevOps

Game Development

3D

Programming Language

Tools

Soft Skills

Administrators may create custom categories.

---

# 33. Skill Fields

Required

• Skill Name

• Category

• Level

• Description

Optional

• Icon

• Years of Experience

• Official Website

• Display Order

---

# 34. Skill Levels

Recommended

Beginner

Intermediate

Advanced

Expert

Custom percentage values should be avoided.

---

# 35. Skill Sorting

Skills are sorted by

Category

↓

Display Order

↓

Alphabetical

Drag-and-drop should update Display Order.

---

# 36. Achievement Module

The Achievement module manages certificates, awards, and milestones.

Achievements appear inside the Achievement popup.

---

# 37. Achievement Types

Certificate

Award

Competition

Course

Milestone

Badge

Administrators may create custom types.

---

# 38. Achievement Fields

Required

Title

Organization

Issue Date

Thumbnail

Description

Optional

Credential URL

Credential ID

Expiration Date

Category

---

# 39. Achievement Gallery

Each achievement may contain

Certificate Image

Additional Images

PDF Certificate

Preview should support zoom.

---

# 40. Achievement Sorting

Default Order

Newest

↓

Oldest

Administrators may override this using Display Order.

---

# 41. Search & Filter

Every module should support

Search

Category Filter

Status Filter

Date Filter

Sorting

This applies to

Projects

Skills

Achievements

Experience

---

# 42. Bulk Actions

Supported Actions

Delete

Hide

Publish

Unpublish

Move Category

Duplicate

Bulk actions improve productivity.

---

# 43. Draft System

Every content type supports

Draft

Published

Archived

Visitors only see Published content.

---

# 44. Publish Workflow

Draft

↓

Preview

↓

Publish

↓

Website Updates

Publishing should not require restarting the application.

---

# 45. Revision History

Optional

Every update creates a revision.

Administrators may restore previous versions.

Fields

Version

Date

Author

Summary

---

# 46. Validation Rules

All required fields must be completed before publishing.

The CMS should highlight missing fields automatically.

---

# 47. Preview Mode

Projects

Skills

Achievements

Experience

About

should all support preview before publishing.

---

# 48. Empty State

If no content exists,

the CMS should encourage administrators to create new content.

Avoid displaying empty pages.

---

# 49. Future Expansion

Future modules may include

Testimonials

Blog

Timeline Events

Courses

Downloads

Mini Games

without modifying the existing CMS architecture.

---

---

# 51. Character Manager

The Character Manager controls every aspect of the 3D character displayed on the portfolio.

The administrator should be able to replace the character without modifying the application source code.

The Character Manager is responsible for:

• Character Model

• Character Animations

• Character Position

• Character Scale

• Character Rotation

• Character Interaction

• Character Lighting

• Character Preview

---

# 52. Character Model

Supported Formats

• GLB (Recommended)

• GLTF

Future Support

• VRM

Only one active character model may exist.

Available Actions

✓ Upload

✓ Replace

✓ Delete

✓ Preview

The uploaded model should automatically replace the previous character.

---

# 53. Character Requirements

Recommended

Maximum File Size

30 MB

Maximum Triangle Count

50,000

Recommended Texture Size

2048 x 2048

Maximum Texture Size

4096 x 4096

The CMS should warn administrators if these limits are exceeded.

---

# 54. Character Preview

The Character Manager should include a realtime 3D preview.

Available Controls

✓ Rotate

✓ Zoom

✓ Reset Camera

✓ Toggle Grid

✓ Toggle Lighting

The preview should match the website as closely as possible.

---

# 55. Animation Manager

Animations are managed separately from the model.

Supported Formats

• GLB

• GLTF

Each animation should have a unique identifier.

Examples

Idle

Wave

Nod

LookLeft

LookRight

LookDown

Celebrate

Thinking

Administrators can upload, replace, or remove animations independently.

---

# 56. Animation Mapping

Every interaction is mapped to an animation.

Example

Home

↓

Idle

Character Click

↓

Wave

Projects

↓

LookDown

About

↓

LookLeft

Experience

↓

LookRight

The CMS should allow changing these mappings using dropdown menus.

No source code changes should be required.

---

# 57. Character Transform

Administrators can configure

Position X

Position Y

Position Z

Rotation X

Rotation Y

Rotation Z

Scale

Changes should update the preview immediately.

---

# 58. Character Interaction

Available Settings

Mouse Follow

ON / OFF

Idle Animation

ON / OFF

Blink

ON / OFF

Auto Wave

ON / OFF

Interaction Distance

Adjustable

Future options may be added without redesigning the interface.

---

# 59. Character Lighting

The Character Manager controls only the character lighting.

Available Settings

Ambient Intensity

Directional Light

Shadow Strength

Rim Light

Environment Preset

Changes should be visible in realtime.

---

# 60. Character Validation

Before publishing,

the CMS should verify

✓ Model Loaded

✓ Required Animations Exist

✓ Texture Loaded

✓ Skeleton Valid

✓ File Size Accepted

Publishing should be blocked if validation fails.

---

---

# 61. Theme Manager

The Theme Manager controls the visual appearance of the portfolio.

The default theme is

Midnight Indie.

Administrators may switch the active default theme.

Future custom themes may be added.

---

# 62. Theme Configuration

Editable Values

Primary Background

Secondary Background

Panel Background

Accent Color

Divider Color

Primary Text

Secondary Text

Button Radius

Shadow Strength

Changes should immediately update the preview.

---

# 63. Theme Preview

The CMS should provide

Desktop Preview

Mobile Preview

Switching themes updates both previews simultaneously.

---

# 64. Language Manager

Supported Languages

English

Bahasa Indonesia

Administrators may add more languages later.

Each language has

Language Name

Language Code

Enabled

Default

---

# 65. Translation Editor

Every text displayed on the website should be editable.

Examples

About

Projects

Skills

Achievements

Experience

Navigation

Buttons

Error Messages

Tooltips

No hardcoded UI text should exist.

---

# 66. Settings Module

General Website Settings

Website Title

Website Description

Website Icon (Favicon)

Default Language

Default Theme

Maintenance Mode

Portfolio Version

---

# 67. Homepage Settings

Administrators may configure

Character Enabled

Background Decoration

Character Scale

Default Camera Position

Navigation Animation Speed

Popup Animation Speed

All changes should be applied without rebuilding the frontend.

---

# 68. Cache Management

Available Actions

Clear Cache

Reload Website Data

Refresh Preview

These actions should not restart the application.

---

# 69. Media Library

The Media Library stores every uploaded asset.

Supported Files

Images

Videos

PDF

3D Models

Animations

Icons

Documents

Files should be reusable across multiple modules.

---

# 70. Media Management

Available Actions

Upload

Rename

Move

Delete

Replace

Preview

Search

Filter

The CMS should prevent deleting files currently in use.

---

---

# 71. Authentication

The CMS must be protected.

Only authenticated administrators may access the CMS.

Visitors should never have access to administrative features.

---

# 72. Login

Authentication Method

JWT Authentication

Required Fields

• Email

• Password

Buttons

• Login

• Forgot Password (Future)

• Remember Me (Optional)

---

# 73. Session Management

After successful login

↓

Generate JWT Access Token

↓

Generate Refresh Token

↓

Store Refresh Token securely

↓

Redirect to Dashboard

Access Tokens should remain short-lived.

Refresh Tokens should be revocable.

---

# 74. Logout

Logout should

✓ Remove Access Token

✓ Remove Refresh Token

✓ Redirect to Login

✓ Clear cached user information

No protected page should remain accessible after logout.

---

# 75. Route Protection

Protected Routes

Dashboard

About

Projects

Skills

Achievements

Character

Media Library

Settings

Visitors attempting to access these routes should be redirected to Login.

---

# 76. Password Policy

Minimum Length

8 Characters

Recommended

12 Characters

Password should contain

• Uppercase

• Lowercase

• Number

• Special Character

Passwords must always be hashed.

Never store plain text passwords.

---

# 77. Audit Log

Every administrative action should be logged.

Examples

Login

Logout

Create Project

Delete Skill

Replace Character

Upload Animation

Publish Changes

Each log contains

Timestamp

Action

Administrator

Affected Module

---

# 78. Security Rules

Uploaded files should be validated.

Only supported file types are accepted.

Maximum upload size should be configurable.

File names should be sanitized.

Executable files must never be accepted.

---

# 79. Rate Limiting

Login attempts should be limited.

Example

5 Failed Attempts

↓

Temporary Lock

↓

Retry after 5 Minutes

This helps reduce brute-force attacks.

---

---

# 81. API Integration

The CMS communicates with the backend through REST APIs.

The frontend should never access the database directly.

All requests pass through the API layer.

---

# 82. API Structure

Recommended Base URL

/api

Modules

/auth

/about

/experience

/projects

/skills

/achievements

/character

/animations

/media

/settings

/languages

Each module should follow REST principles.

---

# 83. Request Flow

Administrator

↓

React CMS

↓

HTTP Request

↓

ASP.NET Core API

↓

Business Logic

↓

Database

↓

Response

↓

React Updates UI

---

# 84. CRUD Operations

Every major module supports

GET

Retrieve data

POST

Create

PUT

Update

DELETE

Remove

PATCH may be used for partial updates.

---

# 85. File Upload Flow

Administrator

↓

Choose File

↓

Upload

↓

Server Validation

↓

Save File

↓

Save Metadata

↓

Return URL

↓

Preview Updates

Uploads should be asynchronous.

---

# 86. Character Upload Flow

Upload Character Model

↓

Validate File

↓

Generate Preview

↓

Store Model

↓

Update Database

↓

Website Automatically Uses New Character

No frontend rebuild should be required.

---

# 87. Animation Upload Flow

Upload Animation

↓

Validate Skeleton

↓

Save Animation

↓

Select Animation Mapping

↓

Publish

↓

Website Uses New Animation

Animations should remain independent from the model whenever possible.

---

# 88. API Response Format

Every endpoint should return a consistent response.

Example

Success

Status

Message

Data

Errors (if any)

Consistency simplifies frontend development.

---

# 89. Error Handling

API errors should return meaningful messages.

Examples

400

Validation Failed

401

Unauthorized

403

Forbidden

404

Not Found

500

Internal Server Error

Never expose stack traces to clients.

---

---

# 91. Database Mapping

The CMS should use a relational database.

Recommended

• PostgreSQL

or

• SQL Server

Entity Framework Core should be used as the ORM.

All relationships should follow normalization principles while remaining practical for future expansion.

---

# 92. Core Tables

Recommended tables

Users

About

Experiences

Projects

ProjectImages

Skills

SkillCategories

Achievements

AchievementCategories

Languages

Translations

Characters

Animations

AnimationMappings

Themes

Media

Settings

AuditLogs

RefreshTokens

Each table should have a primary key.

---

# 93. Common Columns

Every content table should include

Id

CreatedAt

UpdatedAt

CreatedBy

UpdatedBy

IsPublished

IsDeleted

Version

These fields improve maintainability and auditing.

---

# 94. Entity Relationships

Users

↓

creates

↓

Projects

Projects

↓

contains

↓

ProjectImages

Skills

↓

belongs to

↓

SkillCategory

Achievements

↓

belongs to

↓

AchievementCategory

Characters

↓

has many

↓

Animations

Animations

↓

mapped by

↓

AnimationMappings

Media

↓

referenced by

↓

All Content Modules

The database should enforce referential integrity.

---

# 95. Character Database

Character Table

Fields

Id

Name

ModelPath

PreviewImage

Description

IsActive

CreatedAt

UpdatedAt

Only one character should be active at a time.

---

# 96. Animation Database

Animation Table

Fields

Id

Name

AnimationType

FilePath

Duration

Loop

Description

CharacterId

Status

Animations remain reusable.

---

# 97. Animation Mapping Table

Fields

Id

EventName

AnimationId

Priority

TransitionTime

Enabled

Examples

Home → Idle

Projects → LookDown

About → LookLeft

Experience → LookRight

CharacterClick → Wave

Mappings should be editable through the CMS.

---

# 98. Media Table

Fields

Id

FileName

OriginalName

Extension

MimeType

Size

Width

Height

StoragePath

CreatedAt

Media should never be duplicated unnecessarily.

Reuse existing files whenever possible.

---

# 99. Settings Table

Contains global configuration.

Examples

Default Theme

Default Language

Maintenance Mode

Character Enabled

Navigation Speed

Popup Speed

Settings should be loaded during application startup.

---

---

# 101. Backup System

The CMS should support data backup.

Recommended backup types

Database Backup

Media Backup

Configuration Backup

Backups should be independent.

---

# 102. Restore System

Administrators should be able to restore

Database

Media

Settings

Character

Animations

Restore operations should require confirmation.

---

# 103. Export

Supported export formats

JSON

CSV

ZIP

PDF (Future)

Export should support

Projects

Skills

Achievements

Experiences

Settings

---

# 104. Import

Supported formats

JSON

ZIP

CSV

Imported data should be validated before writing to the database.

---

# 105. Deployment

Recommended deployment

Frontend

React

↓

Vercel

Netlify

Cloudflare Pages

Backend

ASP.NET Core

↓

Docker

Linux VPS

Azure

Railway

Database

PostgreSQL

or

SQL Server

Storage

Local Storage

Future

S3 Compatible Storage

---

# 106. Environment Variables

Sensitive values should never be hardcoded.

Examples

Database Connection

JWT Secret

SMTP

Cloud Storage Keys

API Keys

Environment-specific settings should be stored separately.

---

# 107. Maintenance Mode

Administrators should be able to enable

Maintenance Mode

When enabled

Visitors see

```
The portfolio is currently under maintenance.

Please check back later.
```

Administrators may still log in.

---

# 108. Notifications

Optional future features

Email Notifications

Discord Webhook

Telegram Bot

Slack Integration

Notifications may be triggered after

Publishing

Backup

Restore

System Errors

---

# 109. Scalability

The architecture should support

Multiple Characters

Multiple Themes

Multiple Languages

Multiple Administrators

Cloud Storage

CDN

Versioning

Plugin System

Future expansion should not require major architectural changes.

---

---

# 111. CMS Design Principles

The CMS should prioritize simplicity over complexity.

It is designed for maintaining a personal interactive portfolio, not for enterprise resource management.

Every feature should support the portfolio without introducing unnecessary administrative overhead.

Core principles

• Simple

• Fast

• Maintainable

• Data-Driven

• Scalable

• Responsive

---

# 112. UI Principles

The CMS interface should feel modern and clean.

Avoid excessive animations.

The administrator should be able to reach any module within three clicks or fewer.

Recommended layout

```
+------------------------------------------------------+
| Header                                                |
+----------+-------------------------------------------+
| Sidebar  |                                           |
|          |             Main Content                  |
|          |                                           |
|          |                                           |
|          |                                           |
+----------+-------------------------------------------+
```

Consistency is more important than visual complexity.

---

# 113. Responsive CMS

Desktop

Sidebar remains expanded.

Tablet

Sidebar becomes collapsible.

Mobile

Sidebar becomes a drawer.

Every module should remain fully usable on smaller screens.

---

# 114. Performance Guidelines

The CMS should remain responsive even with large amounts of content.

Recommended practices

✓ Lazy Loading

✓ Pagination

✓ Image Compression

✓ Virtualized Lists (if needed)

✓ API Caching

Avoid loading unnecessary data during initial page load.

---

# 115. File Management Rules

Uploaded files should never overwrite existing files directly.

Instead

Upload

↓

Generate Unique Filename

↓

Store File

↓

Update Database Reference

↓

Delete Old File (Optional)

This prevents broken references and accidental data loss.

---

# 116. Publishing Workflow

Editing content should not immediately affect the public website.

Workflow

Draft

↓

Preview

↓

Publish

↓

Website Updates

↓

Archive Previous Version (Optional)

This allows administrators to review changes before making them public.

---

# 117. Error Prevention

The CMS should prevent common mistakes.

Examples

• Confirmation before deletion

• Warning before replacing the active character

• Warning before deleting media currently in use

• Validation before publishing incomplete content

The goal is to reduce accidental mistakes.

---

# 118. AI Constraints

If an AI generates code based on this specification,

it must preserve

✓ Modular Architecture

✓ REST API

✓ CMS Separation

✓ Character Manager

✓ Media Library

✓ Theme System

✓ Language System

✓ Animation Mapping

✓ Draft/Publish Workflow

The AI must never replace the CMS with hardcoded content.

The AI must never remove editable fields that are defined in this specification.

---

# 119. Developer Checklist

Before deployment

Authentication

☐ JWT Authentication works

☐ Refresh Token works

☐ Route Protection enabled

CMS

☐ Dashboard operational

☐ CRUD works for every module

☐ Character upload works

☐ Animation upload works

☐ Theme Manager works

☐ Language Manager works

☐ Media Library works

Website

☐ Public content updates correctly

☐ Character updates automatically

☐ Animations update automatically

☐ Theme updates correctly

☐ Language updates correctly

Performance

☐ Optimized API responses

☐ Lazy-loaded images

☐ Optimized GLB files

☐ Cached static assets

Security

☐ Password hashing

☐ JWT validation

☐ Upload validation

☐ SQL Injection protection

☐ XSS protection

☐ CSRF protection (where applicable)

Backup

☐ Database backup tested

☐ Media backup tested

☐ Restore tested

---

# 120. Final Principles

The CMS exists to empower content management without requiring source code changes.

Every editable element of the portfolio should be manageable through the CMS.

The architecture should remain modular so that future features can be added without major redesign.

The CMS should continue following these principles:

1. Data over Hardcoded Content

2. Modular Architecture

3. Secure by Default

4. Responsive Administration

5. Reusable Components

6. Scalable Database Design

7. Predictable API Structure

8. Easy Maintenance

9. Future Expansion Ready

10. User-Friendly Administration

Whenever implementation decisions conflict with these principles,

the principles should take precedence.

---

# End of CMS Specification