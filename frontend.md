# Frontend Architecture Specification

Version: 1.0

---

# 1. Purpose

This document defines the frontend architecture of the Interactive Portfolio Website.

The frontend is responsible for

• UI Rendering

• 3D Character

• User Interaction

• Theme

• Localization

• API Communication

• Responsive Layout

The frontend should remain independent from the backend implementation.

---

# 2. Technology Stack

Framework

React 19

Build Tool

Vite

Language

TypeScript

3D Engine

React Three Fiber

3D Helpers

@react-three/drei

Animation

Framer Motion

State Management

Zustand

Server State

TanStack Query

Routing

React Router

HTTP Client

Axios

Styling

Tailwind CSS

Icons

Lucide React

Internationalization

react-i18next

Package Manager

npm

---

# 3. Goals

The frontend should be

✓ Fast

✓ Responsive

✓ Maintainable

✓ Modular

✓ Reusable

✓ Character First

---

# 4. Folder Structure

Recommended

src/

assets/

components/

layouts/

pages/

hooks/

stores/

services/

api/

types/

utils/

locales/

styles/

contexts/

constants/

App.tsx

main.tsx

---

# 5. Component Structure

App

↓

Layout

↓

About Panel

↓

Main Panel

↓

Experience Panel

Each panel remains independent.

---

# 6. Main Panel

The Main Panel contains

Theme Toggle

Language Selector

3D Character

Bottom Navigation

Popup Content

No browser scrolling should occur.

---

# 7. Left Panel

Contains

Avatar

Profile

Bio

Information

Social Links

Desktop

Always Visible

Mobile

Opens as overlay

---

# 8. Right Panel

Contains

Timeline

Experience Cards

Desktop

Always Visible

Mobile

Opens as overlay

---

# 9. Design Principles

Character remains the visual focus.

Popup content must never hide the entire character.

Animations should feel lightweight.

Layout must never shift unexpectedly.

---

---

# 11. React Component Tree

App

↓

HomeLayout

├── AboutPanel

├── MainPanel

│   ├── ThemeToggle

│   ├── LanguageSelector

│   ├── CharacterScene

│   ├── BottomNavigation

│   ├── PopupContainer

│   └── Decorations

└── ExperiencePanel

Each component should have a single responsibility.

---

# 12. Character Scene

The Character Scene uses

React Three Fiber

Drei

GLTF Loader

Animation Mixer

Orbit Controls (Disabled)

Environment

Only the administrator can change the displayed character.

---

# 13. Bottom Navigation

Contains

Projects

Skills

Achievements

Desktop

Always Visible

Mobile

Always Visible

unless About or Experience is open.

---

# 14. Popup Container

Displays

Projects

Skills

Achievements

Only one popup may exist at a time.

The popup remains inside the Main Panel.

The popup never crosses layout dividers.

---

# 15. Theme Toggle

Desktop

Top Left

Main Panel

Mobile

Below Language Selector

Changing theme updates

Colors

Lighting

Icons

Shadows

without reloading.

---

# 16. Language Selector

Desktop

Top Right

Mobile

Below Experience Button

Language changes should update the interface instantly.

---

# 17. Responsive Layout

Desktop

Three Columns

Tablet

Three Columns (Reduced Width)

Mobile

Single Main Panel

About and Experience become overlays.

---

# 18. Scroll Rules

Desktop

Only internal panel scrolling.

Never scroll the entire page.

Mobile

Overlay panels may scroll independently.

Home remains fixed.

---

# 19. State Separation

UI State

↓

Theme

Popup

Language

Overlay

Character State

↓

Animation

Idle

Blink

Mouse Follow

Application State should remain predictable.

---

---

# 21. State Management

The application uses two types of state.

Local UI State

Examples

Popup

Overlay

Modal

Loading

Hover

Global State

Examples

Theme

Language

Authentication

Character

Settings

Use Zustand for global client state.

Avoid unnecessary global state.

---

# 22. Zustand Stores

Recommended Stores

themeStore

languageStore

popupStore

characterStore

authStore

settingsStore

Each store should have a single responsibility.

---

# 23. Server State

Server data should be managed separately.

Recommended

TanStack Query

Examples

Projects

Skills

Achievements

Experience

About

Character

Avoid storing API data inside Zustand.

---

# 24. API Structure

Recommended

api/

auth.ts

project.ts

skill.ts

achievement.ts

experience.ts

about.ts

character.ts

media.ts

theme.ts

language.ts

Each module owns its API.

---

# 25. Service Layer

Components should never call Axios directly.

Component

↓

Hook

↓

API Service

↓

Backend

This keeps components clean.

---

# 26. Custom Hooks

Recommended

useProjects()

useSkills()

useAchievements()

useExperience()

useCharacter()

useTheme()

useLanguage()

Custom hooks improve code reuse.

---

# 27. Query Keys

Recommended

["projects"]

["skills"]

["achievements"]

["experience"]

["about"]

["character"]

["settings"]

Query keys should remain consistent.

---

# 28. Cache Strategy

Projects

10 Minutes

Skills

30 Minutes

Achievements

30 Minutes

About

1 Hour

Character

1 Hour

Settings

1 Hour

Invalidate cache after CMS updates.

---

# 29. Loading Strategy

Every request should support

Loading

Success

Error

Empty

Skeleton loading is preferred over spinners.

---

---

# 31. Routing

The portfolio uses minimal routing.

Recommended

/

Home

/admin

CMS Dashboard

/login

CMS Login

404

Not Found

The public portfolio remains a single-page experience.

---

# 32. Home Screen

The Home screen contains

About Panel

Main Panel

Experience Panel

Desktop never changes pages.

Only panel content changes.

---

# 33. Admin Area

The CMS should be completely separated.

Public

↓

Portfolio

Private

↓

Admin Dashboard

Public visitors must never access admin pages.

---

# 34. Lazy Loading

Lazy load

Admin Dashboard

Character Viewer

Large Popups

Heavy Components

This improves initial loading speed.

---

# 35. Code Splitting

Recommended

React.lazy()

Suspense

Each major feature should be split into separate chunks.

---

# 36. Error Boundary

Wrap major components

Character Scene

Popup Container

Admin Dashboard

An error should not crash the entire application.

---

# 37. Theme System

Every component should use theme variables.

Avoid hardcoded colors.

Theme switching should update

Background

Panels

Cards

Buttons

Icons

Character Lighting

---

# 38. Localization

Use

react-i18next

Translation files

/public/locales/

Languages

English

Bahasa Indonesia

Future languages can be added without changing components.

---

# 39. Accessibility

Support

Keyboard Navigation

Visible Focus States

ARIA Labels

Semantic HTML

Minimum contrast ratio for text.

Accessibility should not reduce the visual quality.

---

---

# 41. React Three Fiber

The portfolio uses React Three Fiber (R3F) as the primary 3D rendering library.

Responsibilities

• Render Character

• Play Animations

• Camera Control

• Lighting

• Shadows

• Environment

The 3D scene should remain independent from the UI layer.

---

# 42. Character Scene Structure

Recommended Structure

Canvas

↓

Scene

├── Camera

├── Environment

├── Lights

├── Character

├── Shadow Plane

└── Effects

Each object should have a single responsibility.

---

# 43. Character Loading

Character models should use

GLB

GLTF

Recommended Loader

useGLTF()

Character loading flow

Load Model

↓

Load Materials

↓

Load Animations

↓

Initialize Animation Mixer

↓

Display Character

Loading should be asynchronous.

---

# 44. Character Controller

The Character component is responsible for

Loading Model

Playing Animations

Handling Events

Switching Animations

Mouse Follow

Blink

Idle Loop

The component should not contain unrelated UI logic.

---

# 45. Camera

Recommended Camera

Perspective Camera

Field of View

35°–45°

Camera Position

Editable through CMS

The camera should never rotate freely.

The user should always view the character from the intended angle.

---

# 46. Lighting

Recommended Lights

Ambient Light

Directional Light

Rim Light

Optional

HDR Environment

Lighting changes according to the active theme.

Midnight Indie

Cool lighting

Paper Light

Neutral lighting

---

# 47. Shadows

Enable

Soft Shadows

Character Shadow

Ground Contact Shadow

Avoid harsh shadows.

Shadows should enhance realism without distracting the user.

---

# 48. Environment

Recommended

HDRI

Simple Studio Environment

Minimal Background

Avoid complex environments that compete with the character.

The character remains the visual focus.

---

# 49. Character Events

The Character responds to

Open Projects

↓

Look Down

Open About

↓

Look Left

Open Experience

↓

Look Right

Character Click

↓

Wave

Idle Timeout

↓

Idle Variation

Future events can be added through CMS.

---

---

# 51. Animation System

UI animations should use

Framer Motion

Character animations use

Three.js Animation Mixer

The two systems remain independent.

---

# 52. Popup Animation

Projects

↓

Slide Up

↓

Fade In

↓

Spring Finish

Popup closes

↓

Slide Down

↓

Fade Out

Animation duration

250–300 ms

---

# 53. Navigation Animation

Bottom Navigation

Hover

↓

Scale 1.05

↓

Glow Border

Active

↓

Accent Border

↓

Accent Icon

Transitions should feel smooth.

---

# 54. About Overlay (Mobile)

Tap About

↓

Hide Home Buttons

↓

Slide Panel From Left

↓

Fade Background

↓

Show Back Button

↓

Enable Scroll

Back

↓

Reverse Animation

---

# 55. Experience Overlay (Mobile)

Tap Experience

↓

Hide Home Buttons

↓

Slide Panel From Right

↓

Fade Background

↓

Show Back Button

↓

Enable Scroll

Back

↓

Reverse Animation

---

# 56. Theme Transition

Theme Toggle

↓

Fade Colors

↓

Update CSS Variables

↓

Update Icons

↓

Update Character Lighting

↓

Complete

Duration

200–300 ms

No page reload should occur.

---

# 57. Loading Animation

Before the character loads

↓

Display Skeleton Placeholder

↓

Loading Indicator

↓

Fade Character In

Avoid showing an empty canvas.

---

# 58. Hover Animation

Interactive Elements

Cards

Buttons

Navigation

Timeline

Use

Scale

Shadow

Border Glow

Avoid excessive movement.

---

# 59. Motion Guidelines

Animations should feel

Responsive

Lightweight

Smooth

Minimal

Game-inspired

Avoid

Long animations

Large bounces

Distracting effects

Animation should support usability rather than become the focus.

---

---

# 61. CMS Integration

The frontend communicates with the CMS through REST APIs.

Workflow

Administrator

↓

CMS Dashboard

↓

Backend API

↓

Database

↓

Frontend Refresh

Public users never access CMS endpoints directly.

---

# 62. Authentication Flow

CMS Login

↓

Receive Access Token

↓

Store Securely

↓

Attach Authorization Header

↓

Access Protected APIs

↓

Refresh Token When Needed

↓

Continue Session

When authentication fails, redirect to Login.

---

# 63. Forms

CMS forms should support

Create

Edit

Delete

Publish

Preview

Restore

Every form should perform client-side validation before submission.

---

# 64. Upload System

Supported Uploads

Character (.glb)

Animation (.glb)

Project Image

Achievement Certificate

Profile Avatar

Resume PDF

Upload flow

Select File

↓

Preview

↓

Validate

↓

Upload

↓

Receive URL

↓

Save Content

---

# 65. Character Management

Administrators should be able to

Upload Character

Replace Character

Preview Character

Assign Default Character

Delete Character

Changing the character should automatically update the public portfolio.

---

# 66. Animation Management

Administrators should upload animations individually.

Examples

Idle

Wave

Walk

Celebrate

Think

Point Left

Point Right

Blink

Animations are assigned to events through the CMS.

No hardcoded animation names should exist in the frontend.

---

# 67. Live Preview

CMS supports Preview Mode.

Workflow

Edit Content

↓

Save Draft

↓

Preview

↓

Publish

↓

Public Website Updates

Preview changes should not affect public visitors.

---

# 68. Form Validation

Validate

Required Fields

Maximum Length

Image Size

Model Format

Animation Format

Invalid URL

Email Format

Validation errors should appear immediately.

---

# 69. Admin UX

CMS should include

Loading Indicators

Success Notifications

Error Messages

Confirmation Dialogs

Undo (Future)

Autosave (Future)

The admin experience should prioritize speed and clarity.

---

---

# 71. Performance Goals

The frontend should load quickly and remain responsive.

Target

First Load

< 3 Seconds

Interaction Delay

< 100 ms

Popup Animation

< 300 ms

Theme Switch

< 300 ms

Character Load

As fast as network allows

---

# 72. Asset Optimization

Optimize

Images

GLB Models

Animations

Icons

Fonts

Compress assets before deployment.

Avoid unnecessarily large files.

---

# 73. Lazy Loading

Lazy load

Admin Dashboard

Heavy Components

Character Assets

Achievement Images

Project Galleries

Only load resources when needed.

---

# 74. Preloading

Preload

Character Model

Default Animation

Current Theme Assets

Current Language

This improves perceived loading speed.

---

# 75. Memoization

Use

React.memo

useMemo

useCallback

only when necessary.

Avoid premature optimization.

---

# 76. Rendering Strategy

The Character Scene should only rerender when

Character Changes

Animation Changes

Theme Changes

Camera Changes

UI interactions should not rerender the 3D scene unnecessarily.

---

# 77. Image Optimization

Use

Modern Formats

WebP

AVIF (Future)

Responsive Sizes

Lazy Loading

Generate thumbnails for galleries.

---

# 78. Bundle Optimization

Split JavaScript bundles

Core UI

Character System

Admin Dashboard

Localization

3D Assets

This reduces the initial download size.

---

# 79. Performance Monitoring

Measure

First Contentful Paint

Largest Contentful Paint

Interaction to Next Paint

Layout Shift

Bundle Size

FPS of Character Scene

Performance should be reviewed after major updates.

---

---

# 81. Testing Strategy

The frontend should be tested at multiple levels.

Recommended

Unit Testing

Component Testing

Integration Testing

End-to-End Testing

Manual Testing

Regression Testing

Testing should focus on stability and user experience.

---

# 82. Unit Testing

Recommended Framework

Vitest

Test

Utilities

Custom Hooks

Stores

Validation Functions

Theme Logic

Language Logic

Each unit should be tested independently.

---

# 83. Component Testing

Recommended

React Testing Library

Components to test

Buttons

Cards

Navigation

Popup

Theme Toggle

Language Selector

Forms

Character Loader

Verify rendering and user interactions.

---

# 84. End-to-End Testing

Recommended

Playwright

Example scenarios

Visitor opens website

↓

Character loads

↓

Open Projects

↓

Open Skills

↓

Change Theme

↓

Change Language

↓

Close Popup

↓

Responsive Layout

↓

All interactions succeed

Critical user flows should always be covered.

---

# 85. Error Handling

Every request should support

Loading

↓

Success

↓

Empty State

↓

Error State

If an API request fails

↓

Show friendly message

↓

Allow retry

↓

Keep current page usable

The application should never crash due to a failed request.

---

# 86. Browser Compatibility

Supported Browsers

Google Chrome

Microsoft Edge

Mozilla Firefox

Safari

Latest Mobile Browsers

Older browsers may receive limited support.

---

# 87. Accessibility

Support

Keyboard Navigation

Screen Readers

ARIA Labels

Visible Focus States

Semantic HTML

Interactive elements should remain accessible.

---

# 88. SEO

The public portfolio should include

Meta Title

Meta Description

Open Graph Tags

Twitter Card

Favicon

robots.txt

sitemap.xml

Use semantic HTML wherever possible.

---

# 89. Progressive Enhancement

Core content should remain usable even if

Animations are disabled

Slow network

Images load late

3D assets take longer to load

Decorative features should never block access to information.

---

---

# 91. Coding Standards

Naming

PascalCase

Components

Pages

Classes

camelCase

Variables

Functions

Hooks

Constants

UPPER_SNAKE_CASE

Environment Variables

Avoid abbreviations unless universally understood.

---

# 92. Component Rules

Each component should

Have one responsibility

Be reusable

Receive data via props

Avoid unnecessary global state

Avoid large monolithic components.

---

# 93. Folder Rules

Each feature may contain

Component

Styles

Hook

Types

Utilities

Tests

Keep related files together.

Avoid deeply nested folders.

---

# 94. Styling Guidelines

Use Tailwind CSS.

Prefer utility classes.

Extract reusable UI into components.

Avoid inline styles except for dynamic values.

Spacing should follow a consistent scale.

---

# 95. Git Workflow

Recommended Branches

main

production-ready

develop

integration

feature/*

new features

bugfix/*

bug fixes

hotfix/*

production fixes

Every Pull Request should be reviewed before merging.

---

# 96. Code Review Checklist

Before merging

✓ Code builds successfully

✓ No TypeScript errors

✓ No ESLint errors

✓ Components are reusable

✓ Responsive layout verified

✓ Theme compatibility verified

✓ Language compatibility verified

✓ API integration tested

✓ Animations verified

✓ Accessibility checked

---

# 97. Frontend Principles

The frontend should remain

• Modular

• Responsive

• Accessible

• Maintainable

• Performant

• Scalable

User experience takes priority over unnecessary visual effects.

---

# 98. Future Enhancements

Potential future improvements

Multiple Characters

Character Customization

Interactive Mini Games

Seasonal Themes

Particle Effects

Weather Effects

Background Music (Optional)

Plugin System

Achievement Unlock Animations

VR/AR Support

The architecture should allow these features without major refactoring.

---

# 99. Frontend Developer Checklist

Before completing a feature

✓ Component Created

✓ Props Typed

✓ Responsive Verified

✓ Theme Support Added

✓ Localization Added

✓ Accessibility Checked

✓ Animation Tested

✓ API Integrated

✓ Loading State Added

✓ Error State Added

✓ Empty State Added

✓ Documentation Updated

Every completed feature should satisfy this checklist.

---

# 100. End of Frontend Specification

Version 1.0

This document defines the complete frontend architecture for the Interactive Portfolio Website.

It serves as the implementation guide for React, Vite, React Three Fiber, Tailwind CSS, Framer Motion, Zustand, TanStack Query, responsive UI, animations, localization, and future frontend expansion.