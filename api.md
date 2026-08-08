# REST API Specification

Version: 1.0

---

# 1. Purpose

This document defines every REST API used by the Interactive Portfolio Website.

The API is consumed by

• Public Website

• CMS Dashboard

• Future Mobile Application

All APIs return JSON unless otherwise specified.

---

# 2. Base URL

Development

https://localhost:5001/api/v1

Production

https://yourdomain.com/api/v1

Future API versions

/api/v2

/api/v3

---

# 3. Authentication

Public APIs

No Authentication

CMS APIs

JWT Bearer Token

Example

Authorization

Bearer <access_token>

---

# 4. Standard Response

Success

{
    "success": true,
    "message": "Success",
    "data": {}
}

Error

{
    "success": false,
    "message": "Validation failed",
    "errors": []
}

Every endpoint should follow the same response structure.

---

# 5. HTTP Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# 6. Pagination

Recommended

?page=1

&pageSize=10

Response

page

pageSize

totalItems

totalPages

items

---

# 7. Filtering

Examples

?published=true

?search=react

?category=frontend

Filters may be combined.

---

# 8. Sorting

Examples

?sort=name

?sort=-createdAt

Ascending

sort=name

Descending

sort=-name

---

# 9. File Upload

Content Type

multipart/form-data

Supported

Images

GLB

PDF

Future Video

---

---

# 11. Authentication Endpoints

POST

/auth/login

Administrator Login

POST

/auth/refresh

Generate New Access Token

POST

/auth/logout

Invalidate Refresh Token

GET

/auth/me

Current Administrator

---

# 12. Login Request

POST

/auth/login

Body

{
    "email": "",
    "password": ""
}

Response

Access Token

Refresh Token

User Information

---

# 13. Refresh Token

POST

/auth/refresh

Body

{
    "refreshToken": ""
}

Response

New Access Token

New Refresh Token

---

# 14. Logout

POST

/auth/logout

Authentication Required

Response

204 No Content

Refresh Token becomes invalid.

---

# 15. About API

GET

/about

Public

Returns

Biography

Avatar

Social Links

Resume

Location

---

# 16. Experience API

GET

/experience

Public

Returns

Timeline

Company

Role

Date

Description

Technology

---

# 17. Skills API

GET

/skills

Public

Returns

Category

Name

Level

Description

Icon

---

# 18. Projects API

GET

/projects

Public

Supports

Pagination

Filtering

Sorting

Search

---

# 19. Project Detail

GET

/projects/{id}

Returns

Project

Gallery

Technology

Links

Description

---

---

# 21. Achievement API

GET

/achievements

Public

Returns

Title

Description

Date

Certificate

Image

Category

Order

Supports

Pagination

Sorting

Filtering

---

# 22. Character API

GET

/character

Public

Returns the currently active character.

Response

Character Name

GLB URL

Thumbnail

Version

Default Animation

Status

Theme Configuration

The public website always loads this endpoint first.

---

# 23. Character List

GET

/characters

Authentication Required

Returns

All Characters

Draft

Published

Archived

Version History

This endpoint is used by the CMS.

---

# 24. Character Upload

POST

/characters

Authentication Required

Content-Type

multipart/form-data

Upload

GLB

Thumbnail

Metadata

Response

Character ID

Upload Status

Preview URL

---

# 25. Character Update

PUT

/characters/{id}

Authentication Required

Editable Fields

Name

Description

Thumbnail

Default Status

Camera

Lighting

Metadata

---

# 26. Character Publish

POST

/characters/{id}/publish

Authentication Required

Publishes the selected character.

The previous published character becomes archived automatically.

---

# 27. Character Rollback

POST

/characters/{id}/rollback

Authentication Required

Restores the selected version.

Rollback should preserve animation mappings.

---

# 28. Character Delete

DELETE

/characters/{id}

Authentication Required

Only Draft or Archived characters may be deleted.

Published characters cannot be deleted directly.

---

# 29. Character Preview

GET

/characters/{id}/preview

Authentication Required

Returns

Character

Animations

Camera

Lighting

Theme

Used only inside the CMS.

---

---

# 31. Animation API

GET

/animations

Authentication Required

Returns

Animation Library

Categories

Preview

Duration

Loop

Status

---

# 32. Animation Upload

POST

/animations

Authentication Required

Content-Type

multipart/form-data

Upload

GLB Animation

Thumbnail (Optional)

Metadata

---

# 33. Animation Detail

GET

/animations/{id}

Authentication Required

Returns

Animation Name

Duration

Loop

Category

Status

Preview

---

# 34. Animation Update

PUT

/animations/{id}

Authentication Required

Editable

Name

Description

Loop

Category

Priority

Status

---

# 35. Animation Delete

DELETE

/animations/{id}

Authentication Required

Deletes an unused animation.

Animations currently assigned to events should not be deletable.

---

# 36. Event Mapping API

GET

/character-events

Authentication Required

Returns

All Event → Animation mappings.

---

# 37. Update Event Mapping

PUT

/character-events

Authentication Required

Example

Home Idle

↓

Idle

Projects

↓

LookDown

Skills

↓

Think

Achievements

↓

Celebrate

About

↓

LookLeft

Experience

↓

LookRight

Character Tap

↓

Wave

Popup Close

↓

Idle

---

# 38. Preview Animation

POST

/animations/{id}/preview

Authentication Required

Plays the selected animation in the CMS preview.

No data is modified.

---

# 39. Validate Character

POST

/characters/{id}/validate

Authentication Required

Validation includes

Model

Textures

Skeleton

Animations

Event Mapping

Returns

Passed

Warnings

Errors

---

---

# 41. Media API

The Media API manages all uploaded files.

Supported Media

Images

Character Models

Animations

PDF

Icons

Future Videos

Only authenticated administrators may upload media.

---

# 42. Upload Media

POST

/media/upload

Authentication Required

Content-Type

multipart/form-data

Supported Files

Image

GLB

PDF

Response

Media ID

Filename

URL

File Size

Mime Type

Upload Date

---

# 43. Media List

GET

/media

Authentication Required

Supports

Pagination

Filtering

Sorting

Search

Returns

Media Metadata

Thumbnail

Usage Count

Status

---

# 44. Media Detail

GET

/media/{id}

Authentication Required

Returns

Filename

Original Name

URL

Mime Type

Size

Uploader

Created Date

Used By

---

# 45. Replace Media

PUT

/media/{id}

Authentication Required

Upload New File

↓

Validate

↓

Replace File

↓

Update Metadata

↓

Return Updated Resource

The Media ID remains unchanged.

---

# 46. Delete Media

DELETE

/media/{id}

Authentication Required

Media currently in use cannot be deleted.

Return

409 Conflict

when references still exist.

---

# 47. Thumbnail API

POST

/media/{id}/thumbnail

Authentication Required

Generates or replaces thumbnails.

Supported

Images

Characters

Achievements

Projects

---

# 48. Media Search

GET

/media/search

Parameters

keyword

type

status

Returns matching media assets.

---

# 49. Storage Information

GET

/media/storage

Authentication Required

Returns

Used Storage

Available Storage

Media Count

Largest Files

Storage Provider

---

---

# 51. About CMS API

GET

/admin/about

Authentication Required

Returns editable About information.

PUT

/admin/about

Updates

Biography

Avatar

Social Links

Resume

Location

---

# 52. Experience CMS API

GET

/admin/experience

Authentication Required

Returns all experience entries.

POST

/admin/experience

Create new experience.

PUT

/admin/experience/{id}

Update experience.

DELETE

/admin/experience/{id}

Delete experience.

---

# 53. Skills CMS API

GET

/admin/skills

POST

/admin/skills

PUT

/admin/skills/{id}

DELETE

/admin/skills/{id}

Editable Fields

Name

Category

Level

Description

Icon

Display Order

---

# 54. Projects CMS API

GET

/admin/projects

POST

/admin/projects

PUT

/admin/projects/{id}

DELETE

/admin/projects/{id}

Editable Fields

Title

Description

Thumbnail

Gallery

Technologies

GitHub URL

Demo URL

Published Status

---

# 55. Achievements CMS API

GET

/admin/achievements

POST

/admin/achievements

PUT

/admin/achievements/{id}

DELETE

/admin/achievements/{id}

Editable Fields

Title

Certificate

Date

Category

Description

Thumbnail

---

# 56. Publish Content

POST

/admin/publish

Authentication Required

Publishes all pending changes.

Supported

About

Projects

Skills

Experience

Achievements

Character

Animations

---

# 57. Draft Content

POST

/admin/draft

Authentication Required

Saves current edits as a draft.

Draft content remains invisible to public visitors.

---

# 58. Restore Content

POST

/admin/restore/{versionId}

Authentication Required

Restores a previous content version.

Returns

Restored Version

Timestamp

Author

---

# 59. Dashboard Summary

GET

/admin/dashboard

Authentication Required

Returns

Projects Count

Skills Count

Achievements Count

Media Count

Characters Count

Storage Usage

Latest Updates

---

---

# 61. Website Settings API

Website settings control the global behavior of the portfolio.

Authentication Required

GET

/settings

Returns

Website Title

Website Description

Default Language

Default Theme

Character Settings

SEO Settings

Social Links

Maintenance Mode

---

# 62. Update Website Settings

PUT

/settings

Authentication Required

Editable Fields

Website Title

Description

Author

Keywords

Theme

Language

SEO

Social Links

The changes should take effect immediately after saving.

---

# 63. Theme API

GET

/theme

Public

Returns

Current Theme

Available Themes

Primary Colors

Accent Colors

Logo Variant

Character Lighting Profile

---

# 64. Update Theme

PUT

/theme

Authentication Required

Body

{
    "theme": "MidnightIndie"
}

Supported Themes

MidnightIndie

PaperLight

Future themes can be added without changing existing APIs.

---

# 65. Language API

GET

/languages

Public

Returns

Supported Languages

Default Language

Translation Status

---

# 66. Update Language

PUT

/languages/default

Authentication Required

Body

{
    "language": "en"
}

Supported

en

id

Future languages should be configurable without code changes.

---

# 67. Navigation API

GET

/navigation

Public

Returns

Menu Items

Order

Visibility

Icons

Display Rules

The frontend uses this endpoint to render navigation dynamically.

---

# 68. Social Links API

GET

/social-links

Public

Returns

GitHub

LinkedIn

Email

Instagram

Portfolio Links

PUT

/social-links

Authentication Required

Updates social profiles.

---

# 69. Maintenance Mode

PUT

/settings/maintenance

Authentication Required

Enable

↓

Public Website

↓

Maintenance Page

CMS remains accessible.

---

---

# 71. Validation Rules

Every incoming request should be validated.

Examples

Required Fields

Maximum Length

Minimum Length

Email Format

URL Format

File Size

File Type

Duplicate Records

Validation occurs before business logic execution.

---

# 72. Validation Response

Example

HTTP 422

{
    "success": false,
    "message": "Validation failed",
    "errors": [
        {
            "field": "title",
            "message": "Title is required."
        }
    ]
}

Validation responses should be consistent across all endpoints.

---

# 73. Authentication Errors

HTTP 401

Returned when

Access Token Missing

Invalid Token

Expired Token

Response

{
    "success": false,
    "message": "Unauthorized"
}

---

# 74. Authorization Errors

HTTP 403

Returned when

User lacks permission.

Example

Public User

↓

Admin Endpoint

↓

Forbidden

---

# 75. Resource Not Found

HTTP 404

Example

GET

/projects/999

Response

{
    "success": false,
    "message": "Project not found"
}

---

# 76. Conflict Response

HTTP 409

Examples

Duplicate Project

Duplicate Skill

Deleting Media In Use

Publishing Existing Version

Conflict responses should explain the reason clearly.

---

# 77. Internal Server Error

HTTP 500

Never expose

Stack Trace

Database Errors

Connection Strings

Sensitive Configuration

Log internal details privately while returning a generic message to clients.

---

# 78. API Rate Limiting

Recommended Limits

Anonymous

100 Requests / Minute

Authenticated

500 Requests / Minute

Login Endpoint

10 Requests / Minute

Exceeded requests return

HTTP 429

Too Many Requests

---

# 79. Correlation ID

Every request should include a Correlation ID.

Example

X-Correlation-ID

Benefits

Trace Logs

Debugging

Monitoring

Distributed Systems

The server generates one if the client does not provide it.

---

---

# 81. OpenAPI Specification

The backend must expose an OpenAPI (Swagger) document.

Purpose

API Documentation

Client Generation

Backend Testing

Frontend Integration

Third-party Integration

Swagger should always reflect the latest API version.

---

# 82. Swagger UI

Development

/swagger

Production

May be disabled or protected by authentication.

Features

Browse Endpoints

Authorize JWT

Execute Requests

View Schemas

Download OpenAPI Specification

Swagger should support Bearer Token authentication.

---

# 83. API Versioning

The API uses URL versioning.

Examples

/api/v1/projects

/api/v2/projects

Breaking changes require a new version.

Minor improvements should remain backward compatible.

---

# 84. API Deprecation

When an endpoint is scheduled for removal

↓

Mark as Deprecated

↓

Document Replacement

↓

Provide Migration Period

↓

Remove in Next Major Version

Clients should have sufficient time to migrate.

---

# 85. Response Caching

Public GET endpoints may be cached.

Examples

About

Skills

Projects

Achievements

Character

Recommended Cache-Control

public

max-age=300

CMS endpoints should never be publicly cached.

---

# 86. Security Headers

Recommended Headers

Content-Security-Policy

X-Frame-Options

X-Content-Type-Options

Referrer-Policy

Permissions-Policy

Strict-Transport-Security

Security headers should be configured globally.

---

# 87. HTTPS

Production environments must enforce HTTPS.

HTTP requests

↓

Redirect

↓

HTTPS

All authentication tokens should only be transmitted over HTTPS.

---

# 88. Logging

Every request should log

Timestamp

Method

Endpoint

Status Code

Execution Time

User ID (if authenticated)

Correlation ID

Sensitive information must never be logged.

---

# 89. Monitoring

Monitor

API Availability

Response Time

Error Rate

Authentication Failures

Upload Failures

Storage Usage

CPU Usage

Memory Usage

Monitoring should provide alerts for critical failures.

---

---

# 91. Public Endpoints

Accessible without authentication

GET /about

GET /experience

GET /skills

GET /projects

GET /projects/{id}

GET /achievements

GET /character

GET /theme

GET /languages

GET /navigation

GET /social-links

These endpoints are used by the public portfolio.

---

# 92. Protected Endpoints

Authentication Required

Authentication

Character

Animations

Media

Dashboard

Projects CMS

Skills CMS

Experience CMS

Achievements CMS

Settings

Theme

Language

Publish

Draft

Restore

Only administrators may access these endpoints.

---

# 93. API Design Principles

The API should be

RESTful

Predictable

Consistent

Versioned

Secure

Documented

Scalable

Every endpoint should follow the same conventions.

---

# 94. Naming Conventions

Resources

Plural

Examples

/projects

/skills

/characters

/animations

Use nouns instead of verbs whenever possible.

---

# 95. Best Practices

Always

Validate Input

Return Correct Status Codes

Use DTOs

Protect Sensitive Data

Paginate Large Collections

Log Requests

Handle Exceptions Gracefully

Avoid exposing internal implementation details.

---

# 96. API Lifecycle

Client Request

↓

Authentication (if required)

↓

Validation

↓

Business Logic

↓

Database

↓

DTO Mapping

↓

Response

↓

Logging

↓

Monitoring

Every request should follow this lifecycle.

---

# 97. API Developer Checklist

Before adding a new endpoint

✓ Route Defined

✓ DTO Created

✓ Validation Added

✓ Authorization Configured

✓ Error Handling Implemented

✓ Swagger Updated

✓ Unit Tests Written

✓ Integration Tests Passed

✓ Logging Enabled

✓ Documentation Updated

Every endpoint should satisfy this checklist before release.

---

# 98. Future API Expansion

Potential future APIs

Notifications

Analytics

Blog

Contact Form

Visitor Statistics

Character Presets

Asset Marketplace

AI Assistant

Plugin System

The architecture should allow these features without major refactoring.

---

# 99. Final Principles

The API should remain

Reliable

Secure

Maintainable

Scalable

Well Documented

Consistent

Developer Friendly

A well-designed API enables both the public website and the CMS to evolve independently while maintaining compatibility.

---

# 100. End of REST API Specification

Version 1.0

This document defines the complete REST API architecture for the Interactive Portfolio Website.

It covers authentication, public endpoints, CMS management, character and animation systems, media handling, validation, security, performance, monitoring, versioning, and future API expansion.