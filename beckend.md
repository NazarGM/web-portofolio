# Backend Architecture Specification

Version: 1.0

---

# 1. Purpose

This document defines the backend architecture used by the Interactive Portfolio Website.

The backend is responsible for:

• Business Logic

• Authentication

• Authorization

• Data Validation

• File Upload

• CMS

• API

• Database Access

The backend should remain independent from the frontend implementation.

---

# 2. Technology Stack

Framework

ASP.NET Core (.NET 10)

Language

C#

ORM

Entity Framework Core

Database

PostgreSQL

Authentication

JWT + Refresh Token

Object Mapping

Mapster (Recommended)

Validation

FluentValidation

Logging

Serilog

File Storage

Local Storage

Future

Cloud Storage

Architecture

Clean Architecture

---

# 3. Goals

The backend should be

✓ Modular

✓ Secure

✓ Scalable

✓ Easy to Maintain

✓ Easy to Test

✓ CMS Friendly

Business logic must never depend on the frontend.

---

# 4. Architecture

Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Infrastructure Layer

Dependencies always point inward.

The Domain Layer should not depend on any external framework.

---

# 5. Folder Structure

Recommended

```
src/

Portfolio.Api/

Portfolio.Application/

Portfolio.Domain/

Portfolio.Infrastructure/

tests/

Portfolio.Tests/
```

Each project has a single responsibility.

---

# 6. Layer Responsibilities

API

Receives HTTP Requests

Returns HTTP Responses

Application

Business Logic

Use Cases

Validation

Domain

Entities

Enums

Interfaces

Business Rules

Infrastructure

EF Core

JWT

Repositories

File Storage

Email

External Services

---

# 7. Dependency Rule

API

↓

Application

↓

Domain

Infrastructure

↓

Application

↓

Domain

Domain must never reference Infrastructure.

---

# 8. Dependency Injection

Every service should be registered using Dependency Injection.

Examples

ProjectService

CharacterService

ThemeService

LanguageService

MediaService

AuthenticationService

Avoid manual object creation.

---

# 9. Configuration

Configuration should be stored in

appsettings.json

Environment Variables

Never hardcode

Database Connection

JWT Secret

SMTP Password

Storage Keys

API Keys

---

---

# 11. Request Flow

Visitor

↓

React Frontend

↓

HTTP Request

↓

Controller

↓

Application Service

↓

Repository

↓

Entity Framework Core

↓

PostgreSQL

↓

Response

The controller should remain thin.

Business logic belongs inside Application Services.

---

# 12. Controllers

Each module should have its own controller.

Examples

AuthController

ProjectsController

SkillsController

AchievementsController

ExperienceController

CharacterController

MediaController

ThemeController

SettingsController

Controllers should only coordinate requests and responses.

---

# 13. Services

Services contain business logic.

Examples

ProjectService

AuthenticationService

CharacterService

AnimationService

MediaService

ThemeService

LanguageService

Services should never return Entity Framework entities directly.

---

# 14. Repositories

Repositories handle database access.

Examples

ProjectRepository

SkillRepository

CharacterRepository

MediaRepository

ThemeRepository

Repositories should not contain business logic.

---

# 15. DTO

Never expose database entities directly.

Use

Request DTO

↓

Application

↓

Response DTO

Separate DTOs improve security and maintainability.

---

# 16. Validation

Validation should occur before business logic.

Recommended

FluentValidation

Examples

Email

Password

Project Title

Media Upload

Character Model

Animation File

Validation errors should return HTTP 400.

---

# 17. Error Handling

Use centralized exception handling.

Examples

ValidationException

NotFoundException

UnauthorizedException

ForbiddenException

BusinessRuleException

Avoid repetitive try-catch blocks inside controllers.

---

# 18. Logging

Every important action should be logged.

Examples

Login

Logout

Upload Character

Create Project

Delete Media

Publish Changes

Recommended

Serilog

Logs should support debugging without exposing sensitive data.

---

# 19. API Response Format

Every endpoint should return a consistent response.

Example

Success

Message

Data

Errors

Timestamp

Consistency simplifies frontend integration.

---

---

# 21. Authentication

The CMS requires secure authentication.

Authentication should use

JWT Access Token

+

Refresh Token

Only authenticated administrators may access protected resources.

---

# 22. Authentication Flow

Administrator

↓

Login

↓

Validate Credentials

↓

Generate Access Token

↓

Generate Refresh Token

↓

Return Tokens

↓

Access Protected APIs

↓

Access Token Expires

↓

Use Refresh Token

↓

Receive New Access Token

---

# 23. JWT Configuration

Recommended Configuration

Algorithm

HS256

Issuer

Configurable

Audience

Configurable

Expiration

15 Minutes

Refresh Token

7 Days

JWT Secret

Stored in Environment Variables

Never expose the JWT secret.

---

# 24. Access Token

The Access Token should contain

User Id

Email

Role

Token Id

Issued At

Expiration

Avoid storing unnecessary information.

---

# 25. Refresh Token

Refresh Tokens should

Be Random

Be Unique

Be Revocable

Be Stored in Database

Be Rotated

Each refresh generates a new refresh token.

---

# 26. Login Process

Validate Email

↓

Validate Password

↓

Generate JWT

↓

Generate Refresh Token

↓

Store Refresh Token

↓

Return Tokens

↓

CMS Dashboard

Passwords should always be verified using secure hashing.

---

# 27. Logout Process

Logout

↓

Invalidate Refresh Token

↓

Delete Local Access Token

↓

Delete Local Refresh Token

↓

Redirect to Login

Logged-out tokens should no longer be usable.

---

# 28. Token Refresh

Client

↓

Send Refresh Token

↓

Validate

↓

Generate New Access Token

↓

Generate New Refresh Token

↓

Replace Old Refresh Token

↓

Return New Tokens

Old refresh tokens should immediately become invalid.

---

# 29. Password Hashing

Recommended

ASP.NET Core Identity Password Hasher

Alternative

BCrypt

Never use

MD5

SHA1

Plain Text

Passwords must never be recoverable.

---

---

# 31. Authorization

Authentication identifies the administrator.

Authorization determines what actions the administrator may perform.

Authorization should occur after authentication.

---

# 32. Current Roles

Version 1

Administrator

Future

Editor

Viewer

Super Administrator

The architecture should support future roles.

---

# 33. Role Permissions

Administrator

Full Access

Editor

Create

Edit

Publish

Viewer

Read Only

Permissions should be checked before executing business logic.

---

# 34. Policy-Based Authorization

Recommended

Policy Authorization

Examples

ManageProjects

ManageCharacters

ManageMedia

ManageSettings

Policies are easier to extend than hardcoded role checks.

---

# 35. Protected Endpoints

Protected

POST

PUT

PATCH

DELETE

Authentication APIs

Public

GET

Portfolio Content

Language

Theme

Public visitors should never access CMS endpoints.

---

# 36. Middleware

Authentication Middleware

↓

Authorization Middleware

↓

Controller

↓

Business Logic

Middleware should reject unauthorized requests before reaching controllers.

---

# 37. Permission Validation

Every protected endpoint should verify

Valid JWT

↓

Correct Role

↓

Required Policy

↓

Execute Request

Otherwise

401 Unauthorized

or

403 Forbidden

---

# 38. Account Lock

Recommended

Five failed login attempts

↓

Temporary Lock

↓

Unlock after configurable time

This reduces brute-force attacks.

---

# 39. Security Headers

Recommended Headers

Content Security Policy

X-Frame-Options

X-Content-Type-Options

Referrer Policy

Permissions Policy

These headers improve overall security.

---

---

# 41. File Upload

The backend is responsible for validating, storing, and managing all uploaded files.

Supported uploads

• Images

• PDF

• 3D Models

• Character Animations

• Icons

• Videos (Future)

Every uploaded file should pass validation before storage.

---

# 42. Upload Flow

Administrator

↓

Choose File

↓

Client Validation

↓

Upload API

↓

Server Validation

↓

Generate Unique Filename

↓

Save File

↓

Save Metadata

↓

Return Media Information

↓

Frontend Updates

The upload process should be asynchronous.

---

# 43. File Validation

Every uploaded file should be validated.

Validation includes

Extension

MIME Type

Maximum File Size

Corrupted File

Empty File

Unsupported Format

The backend should reject invalid uploads immediately.

---

# 44. Upload Limits

Recommended Limits

Images

10 MB

Character Model (.glb)

30 MB

Animation (.glb)

15 MB

PDF

20 MB

Video (Future)

100 MB

Limits should be configurable.

---

# 45. Media Storage

Current Version

Local Storage

Example

uploads/

images/

models/

animations/

documents/

Future Support

Amazon S3

Cloudflare R2

Azure Blob Storage

Google Cloud Storage

Storage providers should be interchangeable.

---

# 46. Character Upload

Character upload process

Upload GLB

↓

Validate

↓

Generate Preview

↓

Save Model

↓

Update Character Record

↓

Publish Character

↓

Frontend Automatically Updates

No application restart should be required.

---

# 47. Animation Upload

Animation upload process

Upload Animation

↓

Validate Skeleton

↓

Validate Duration

↓

Store Animation

↓

Update Animation Database

↓

Assign Mapping

↓

Publish

Animations should remain independent from the model whenever possible.

---

# 48. File Replacement

Replacing a file should

Upload New File

↓

Validate

↓

Update Database Reference

↓

Delete Old File (Optional)

↓

Clear Cache

↓

Frontend Refresh

Old files should never be deleted before validation succeeds.

---

# 49. Upload Security

Uploaded files should never be executed.

Reject

Executable Files

Scripts

Unknown MIME Types

Future

Virus Scanning

The upload directory should not allow code execution.

---

---

# 51. Entity Framework Core

Entity Framework Core is the primary ORM.

Responsibilities

Database Access

Change Tracking

Migrations

Relationships

Transactions

Repositories should use EF Core internally.

---

# 52. DbContext

Recommended

PortfolioDbContext

Responsibilities

Entity Configuration

Relationships

Indexes

Global Query Filters

The DbContext should remain lightweight.

---

# 53. Entity Configuration

Each entity should have its own configuration class.

Example

ProjectConfiguration

SkillConfiguration

CharacterConfiguration

AnimationConfiguration

Avoid placing Fluent API configuration inside DbContext.

---

# 54. Repository Pattern

Repositories abstract data access.

Examples

ProjectRepository

CharacterRepository

MediaRepository

SettingsRepository

Repositories should expose only required operations.

Avoid generic repositories that become overly complex.

---

# 55. Unit of Work

Recommended

One DbContext per Request

Workflow

Request

↓

Repository

↓

DbContext

↓

SaveChanges

↓

Response

Transactions should complete before sending a response.

---

# 56. Transactions

Use transactions for operations affecting multiple tables.

Example

Create Project

↓

Insert Project

↓

Insert Images

↓

Save Technologies

↓

Commit

If any operation fails

↓

Rollback

Transactions ensure consistency.

---

# 57. Query Strategy

Use

AsNoTracking()

for read-only queries.

Use tracking only when updates are required.

This improves performance.

---

# 58. Global Query Filters

Soft Delete

↓

Automatically Exclude

IsDeleted == true

Published Content

↓

Automatically Filter

IsPublished == true

Global filters reduce duplicate query logic.

---

# 59. Migrations

Database schema changes should only occur through migrations.

Workflow

Modify Entity

↓

Create Migration

↓

Review Migration

↓

Apply Migration

↓

Verify Database

Manual production schema changes should be avoided.

---

---

# 61. Middleware Pipeline

Every incoming request should pass through a middleware pipeline.

Recommended Order

Request

↓

Request Logging

↓

Exception Handling

↓

HTTPS Redirection

↓

Static Files

↓

Routing

↓

CORS

↓

Authentication

↓

Authorization

↓

Response Compression

↓

Controllers

↓

Response

Each middleware should have a single responsibility.

---

# 62. Global Exception Handling

The application should use a centralized exception handler.

Avoid handling exceptions inside every controller.

Benefits

• Consistent API Responses

• Cleaner Controllers

• Easier Maintenance

• Better Logging

Unhandled exceptions should return

HTTP 500

without exposing internal details.

---

# 63. Exception Types

Recommended custom exceptions

ValidationException

NotFoundException

UnauthorizedException

ForbiddenException

ConflictException

BusinessRuleException

MediaException

AuthenticationException

Each exception should return the appropriate HTTP status code.

---

# 64. Logging

Every important operation should be logged.

Examples

User Login

Logout

Upload Character

Upload Animation

Create Project

Update Project

Delete Project

Publish Portfolio

Theme Changed

Language Changed

Logs should help diagnose issues without exposing sensitive information.

---

# 65. Logging Framework

Recommended

Serilog

Output Targets

Console

File

Future

Seq

ElasticSearch

Azure Monitor

Log levels

Verbose

Debug

Information

Warning

Error

Fatal

---

# 66. Request Logging

Every HTTP request should record

Method

Endpoint

Status Code

Execution Time

User Id (if authenticated)

IP Address

Timestamp

Avoid logging sensitive information such as passwords or JWT secrets.

---

# 67. Caching

Frequently accessed data should be cached.

Examples

Website Settings

Themes

Languages

Translations

Character Settings

Navigation

Caching reduces unnecessary database queries.

---

# 68. Cache Strategy

Cache

↓

Read Request

↓

If Exists

↓

Return Cache

Else

↓

Database

↓

Store Cache

↓

Return Response

Cache should be invalidated whenever related data changes.

---

# 69. Response Compression

Enable response compression for

JSON

CSS

JavaScript

SVG

Text

Compression reduces bandwidth usage and improves loading performance.

---

---

# 71. Background Services

Some tasks should run independently of user requests.

Recommended

BackgroundService

HostedService

Examples

Clear Expired Tokens

Generate Thumbnails

Cleanup Unused Files

Database Maintenance

Scheduled Cache Refresh

---

# 72. Refresh Token Cleanup

Expired refresh tokens should be removed automatically.

Workflow

Scheduled Job

↓

Find Expired Tokens

↓

Delete or Archive

↓

Log Result

This keeps the database clean.

---

# 73. Media Cleanup

Unused media files should be detected periodically.

Workflow

Scan Media Table

↓

Check References

↓

Unused

↓

Archive

↓

Optional Delete

Never delete files still referenced by the database.

---

# 74. Thumbnail Generation

When an image is uploaded

↓

Generate Thumbnail

↓

Store Thumbnail

↓

Save Metadata

↓

Return Response

Thumbnails improve frontend performance.

---

# 75. Scheduled Maintenance

Recommended schedule

Daily

Refresh Token Cleanup

Weekly

Unused Media Scan

Monthly

Database Optimization

Maintenance should not interrupt normal operation.

---

# 76. Health Checks

Expose a health endpoint.

Example

/health

Verify

Database Connection

Storage Availability

Application Status

Health checks simplify deployment monitoring.

---

# 77. API Documentation

The backend should provide interactive API documentation.

Recommended

OpenAPI

Swagger

Documentation should remain synchronized with the codebase.

---

# 78. Configuration Management

Configuration values should be grouped logically.

Examples

JWT

Database

Storage

Logging

Caching

CORS

Environment-specific configuration should use separate configuration files or environment variables.

---

# 79. Environment Support

Supported environments

Development

Testing

Production

Each environment should have independent configuration.

Production secrets must never be committed to source control.

---

---

# 81. Performance Goals

The backend should prioritize

• Fast Response Time

• Low Memory Usage

• High Availability

• Scalability

Target Response Time

GET

< 200 ms

POST

< 500 ms

File Upload

Depends on file size

Performance should remain consistent under normal load.

---

# 82. API Versioning

The API should support versioning.

Recommended

/api/v1/

Future

/api/v2/

/api/v3/

Versioning prevents breaking existing clients.

---

# 83. Rate Limiting

Public APIs should implement rate limiting.

Examples

Anonymous

100 Requests / Minute

Authenticated

500 Requests / Minute

Login

10 Attempts / Minute

Exceeded requests should return

HTTP 429

Too Many Requests

---

# 84. Monitoring

Monitor

API Response Time

Database Performance

Memory Usage

CPU Usage

Storage Usage

Error Rate

Active Users

Monitoring enables proactive issue detection.

---

# 85. Testing Strategy

Testing should include

Unit Testing

Integration Testing

API Testing

Manual Testing

Regression Testing

Performance Testing

Automated testing should cover critical business logic.

---

# 86. Unit Testing

Recommended Framework

xUnit

Test

Services

Validators

Business Rules

Utilities

Repositories should be mocked.

---

# 87. Integration Testing

Integration tests should verify

API Endpoints

Database

Authentication

Authorization

File Upload

Caching

These tests ensure modules work together correctly.

---

# 88. API Documentation Standards

Every endpoint should document

Purpose

Authentication

Parameters

Request Body

Response

Status Codes

Example Request

Example Response

Swagger should be the primary documentation source.

---

# 89. Production Readiness Checklist

Before deployment verify

✓ Database Migration Applied

✓ Environment Variables Configured

✓ JWT Secret Configured

✓ HTTPS Enabled

✓ Logging Enabled

✓ Swagger Disabled (or Protected)

✓ Rate Limiting Enabled

✓ Backups Configured

---

---

# 91. Coding Standards

Use

PascalCase

Classes

Interfaces

Enums

Methods

Use

camelCase

Variables

Method Parameters

Avoid abbreviations unless widely accepted.

Examples

ProjectService

CharacterController

MediaRepository

AnimationMapping

Use meaningful names.

---

# 92. Clean Code Principles

Follow

Single Responsibility Principle

Open/Closed Principle

Dependency Inversion Principle

Keep methods short.

Keep classes focused.

Avoid duplicated code.

Readable code is more valuable than clever code.

---

# 93. Error Response Standard

Every error response should contain

Status

Message

ErrorCode

Timestamp

Path

Validation errors should also include

Field

Reason

This format keeps frontend error handling consistent.

---

# 94. Security Best Practices

Never expose

Stack Traces

Database Errors

Connection Strings

JWT Secrets

Password Hashes

Validate every user input.

Sanitize uploaded filenames.

Use HTTPS in production.

---

# 95. Code Review Checklist

Before merging code

✓ Code Compiles

✓ Tests Pass

✓ Naming Follows Convention

✓ No Hardcoded Secrets

✓ Validation Implemented

✓ Logging Added

✓ Documentation Updated

Every pull request should be reviewed before merging.

---

# 96. Dependency Management

Update dependencies regularly.

Remove unused packages.

Pin package versions for production.

Review release notes before upgrading major versions.

---

# 97. Backend Principles

The backend should remain

• Modular

• Testable

• Secure

• Scalable

• Observable

• Maintainable

Architecture decisions should prioritize long-term maintainability.

---

# 98. Future Enhancements

Possible future additions

OAuth Login

Redis Cache

Message Queue

SignalR

Background Workers

Email Notifications

Plugin System

These features should integrate without major architectural changes.

---

# 99. Developer Checklist

Before completing any feature

✓ Database Updated

✓ Entity Added

✓ DTO Created

✓ Validation Added

✓ Service Implemented

✓ Repository Updated

✓ API Documented

✓ Tested

✓ CMS Updated (if needed)

✓ Frontend Integrated

Following this checklist ensures consistency across the project.

---

# 100. End of Backend Specification

Version 1.0

This document defines the complete backend architecture for the Interactive Portfolio Website.

It serves as the implementation guide for ASP.NET Core, Entity Framework Core, Authentication, CMS, API development, and future backend expansion.