# Design Specification

Version: 2.0

---

# 1. Project Overview

## Project Name

Interactive 3D Portfolio Website

## Project Type

Interactive personal portfolio website inspired by modern indie game interfaces.

Unlike traditional portfolio websites, this project is designed as a single interactive scene where users explore information through game-like interactions instead of navigating between pages.

The website combines a responsive user interface with a real-time 3D character, making the portfolio feel alive while maintaining a clean and professional appearance.

---

# 2. Purpose

The primary purpose of this website is to showcase professional experience, projects, skills, and achievements in a memorable way.

Rather than focusing on visual effects, the website focuses on interaction quality and user experience.

The design should leave visitors with the impression that they are interacting with a lightweight indie game instead of browsing a standard portfolio.

---

# 3. Design Vision

The portfolio should feel like a game menu instead of a dashboard.

Every interaction should be:

- Natural
- Smooth
- Predictable
- Lightweight
- Responsive

The interface should always support the character.

The character should never support the interface.

In other words, the 3D character is always the hero of the page.

The UI exists only to provide information.

---

# 4. Design Philosophy

The project follows several core philosophies.

## Character First

The 3D character is the center of attention.

Every panel, popup, navigation element, and animation must respect the character's space.

Whenever possible, the character remains visible.

---

## Single Scene Experience

The Home page never changes.

No page transitions.

No browser scrolling.

No routing between About, Projects, Skills, or Experience.

Everything happens inside one responsive scene.

---

## Minimal Interface

The interface should never feel crowded.

Every UI element must have a clear purpose.

If an element does not improve the experience, it should be removed.

---

## Content First

Animations exist to improve usability.

They should never distract users from reading content.

Information is always more important than visual effects.

---

## Consistency

Every interaction should behave consistently.

If one panel slides upward, every similar panel should also slide upward.

If one button uses the accent color when selected, every navigation button should behave the same way.

Users should never need to learn multiple interaction styles.

---

# 5. Design Goals

The website aims to achieve the following goals.

## Goal 1

Create a memorable first impression.

Visitors should immediately recognize that this is not a standard portfolio website.

---

## Goal 2

Maintain professional readability.

Although the interface is inspired by games, recruiters should still be able to quickly access important information.

---

## Goal 3

Showcase technical ability.

The portfolio itself becomes a demonstration of frontend, backend, animation, responsive design, and 3D rendering skills.

---

## Goal 4

Provide a responsive experience.

Desktop and mobile users should receive the same information while using interfaces specifically designed for their devices.

---

## Goal 5

Prepare for future CMS integration.

Every section should eventually become editable without changing source code.

---

# 6. User Experience Principles

The website follows these UX principles.

## Predictable

Users should always know what will happen after clicking a button.

Animations must reinforce understanding instead of creating surprise.

---

## Fast

Animations should feel smooth without delaying interaction.

The interface should never feel slow.

---

## Focused

Only one major interaction should happen at a time.

The user should never need to manage multiple open windows.

---

## Comfortable

The interface should avoid unnecessary movement.

Large animations should only occur when changing content.

---

## Responsive

Every interaction should work equally well using:

- Mouse
- Touch
- Keyboard

---

# 7. Information Architecture

The website consists of three primary content categories.

## Static Information

Always available.

Includes:

- About Me
- Experience

---

## Interactive Information

Displayed only when requested.

Includes:

- Projects
- Skills
- Achievements

---

## Global Controls

Available everywhere.

Includes:

- Theme Toggle
- Language Selector

---

The information hierarchy intentionally remains shallow.

Visitors should reach every piece of content within one interaction from the Home screen.

No nested navigation should exist.

---

# 8. Layout Architecture

The website uses a **three-region layout** on desktop and a **single-focus layout** on mobile.

Both layouts share the same content and interaction logic.

Only the presentation changes.

The 3D Character always remains the primary focus.

---

## Desktop Architecture

Desktop is divided into three permanent regions.

```
+---------------------------------------------------------------+
| About Me |            Main Panel            |   Experience     |
|          |                                  |                  |
|          |        3D CHARACTER              |                  |
|          |                                  |                  |
|          |                                  |                  |
|          | Projects Skills Achievement      |                  |
+---------------------------------------------------------------+
```

### Left Region

Purpose:

Display personal information.

Contains:

- About Me
- Contact Information
- Social Links
- Download CV (optional)

Characteristics:

- Always visible
- Fixed width
- Never animated
- Never hidden
- Not scrollable outside its own container

---

### Center Region

Purpose:

Main interactive area.

Contains:

- Theme Toggle
- Language Selector
- 3D Character
- Popup Panels
- Bottom Navigation

Characteristics:

- Highest visual priority
- Character remains centered
- All popup panels stay inside this region
- Uses `overflow: hidden`

---

### Right Region

Purpose:

Display work history.

Contains:

- Experience Timeline

Characteristics:

- Always visible
- Fixed width
- Independent scrolling if content exceeds height
- Never overlaps Main Panel

---

# 9. Desktop Layout Rules

The desktop layout should remain stable.

Opening content must never resize the layout.

The user should never lose orientation.

Rules:

- No panel changes width.
- No region moves.
- No browser scrolling.
- Character position stays fixed.
- Only popup panels animate.

---

# 10. Mobile Architecture

Mobile simplifies the interface.

Instead of showing three regions simultaneously, only the Main Panel is visible.

Additional information is opened only when requested.

```
+----------------------------+
| About       Experience     |
|                     EN ▼   |
|                     Theme  |
|                            |
|                            |
|      3D CHARACTER          |
|                            |
|                            |
| Projects Skills Achievement|
+----------------------------+
```

The Main Panel occupies the full screen.

---

# 11. Mobile Layout Rules

Only one content area may be visible.

The Home screen focuses entirely on the character.

When About or Experience opens:

- Hide About button
- Hide Experience button
- Disable Bottom Navigation
- Show Back Button
- Open selected panel

Returning Home restores the original interface.

---

# 12. Layout Constraints

These rules are mandatory.

## Fixed Regions

Desktop regions are permanent.

No animation may move a region.

---

## Divider Rules

Vertical dividers separate each region.

Nothing may cross them.

Forbidden:

- Popup outside Main Panel
- Floating cards across regions
- Character crossing divider
- Navigation outside Main Panel

---

## Popup Boundary

Projects

Skills

Achievements

must remain completely inside the Main Panel.

Maximum popup height:

Approximately 45% of Main Panel height.

---

## Character Boundary

The character occupies the center of the Main Panel.

The character should remain visible while popup panels are open.

Recommended visibility:

At least 60% of the character remains visible.

The head should always remain visible.

---

## Overflow Rules

About Panel

Own scrolling only.

Experience Panel

Own scrolling only.

Projects

Horizontal scrolling.

Skills

Vertical scrolling.

Achievements

Horizontal scrolling.

Browser scrolling should never occur on the Home page.

---

# 13. Responsive Behavior

Three layouts are supported.

## Desktop

Width:

1280px and above

Features:

- Three permanent regions
- Full navigation
- About visible
- Experience visible

---

## Tablet

Width:

768px – 1279px

Behavior:

Desktop layout is preserved with reduced panel widths.

Spacing becomes tighter.

No features are removed.

---

## Mobile

Width:

767px and below

Behavior:

Single Main Panel.

About and Experience become temporary panels.

Navigation remains at the bottom.

Character remains centered.

---

# 14. Safe Areas

Certain interface areas should remain unobstructed.

Top Area

Reserved for:

- Theme Toggle
- Language Selector
- About Button
- Experience Button

Center Area

Reserved exclusively for:

- 3D Character

Bottom Area

Reserved for:

- Projects
- Skills
- Achievements

Popup panels may occupy the lower half of the Main Panel but should never permanently cover the character.

---

# 15. Layout Consistency

All layouts should preserve the same identity.

Desktop and Mobile must feel like the same application.

Only the arrangement changes.

The interaction logic remains identical.

The visual language remains identical.

The navigation remains identical.

The user should never need to relearn the interface when switching devices.

---

# 16. Navigation System

The website uses a navigation system inspired by modern indie game interfaces.

Instead of changing pages, navigation reveals content inside the Main Panel.

Navigation should always feel lightweight, smooth, and predictable.

The website contains two navigation groups:

- Global Navigation
- Content Navigation

---

# 17. Global Navigation

Global Navigation is always available regardless of the current state.

Components:

- Theme Toggle
- Language Selector

Desktop Position

Top Left

Theme Toggle

Top Right

Language Selector

Mobile Position

Top Left

About Button

Top Right

Experience Button

Below Experience

Language Selector

Below Language Selector

Theme Toggle

Global Navigation must never overlap the character.

---

# 18. Content Navigation

Content Navigation is fixed at the bottom of the Main Panel.

Buttons

- Projects
- Skills
- Achievements

Desktop

Always visible.

Mobile

Visible only on the Home screen.

Disabled while About or Experience is open.

---

# 19. Navigation Rules

Only one navigation destination may be active.

Selecting another destination automatically closes the current content.

Example

Projects

↓

User selects Skills

↓

Projects closes

↓

Skills opens

No two popup panels may exist simultaneously.

---

# 20. About Panel

Desktop

The About Panel is permanently visible.

The panel is not treated as a popup.

The content remains available at all times.

The panel may scroll internally if needed.

---

## About Content

Recommended sections

- Profile Picture (optional)
- Full Name
- Role
- Short Description
- Contact
- Social Media
- Resume Download

The panel should remain simple.

Avoid placing project information inside About.

---

## Mobile About

Interaction

Home

↓

Tap About

↓

Hide About Button

↓

Hide Experience Button

↓

Disable Bottom Navigation

↓

Slide About Panel from Left

↓

Show Back Button

↓

Back returns Home

Only one animation should happen.

---

# 21. Experience Panel

Desktop

The Experience Panel remains permanently visible.

The panel contains a vertical timeline.

Each timeline item contains

- Position
- Company
- Employment Period
- Description
- Technology Stack

The timeline scrolls independently if needed.

---

## Mobile Experience

Interaction

Home

↓

Tap Experience

↓

Hide About Button

↓

Hide Experience Button

↓

Disable Bottom Navigation

↓

Slide Experience Panel from Right

↓

Show Back Button

↓

Back returns Home

---

# 22. Projects Panel

Projects are displayed as cards.

The panel appears by sliding upward.

The panel does not replace the character.

It occupies only the lower portion of the Main Panel.

---

## Project Card

Each project should contain

- Thumbnail
- Project Name
- Short Description
- Technology Stack
- GitHub Button
- Live Demo Button
- Status
- Year

Cards scroll horizontally.

The number of cards is unlimited.

Cards should be loaded dynamically from the CMS.

---

## Project Rules

Maximum popup height

45% of Main Panel

Horizontal scrolling only.

The popup must remain inside the Main Panel.

---

# 23. Skills Panel

Skills are displayed using a vertical list.

Each item contains

- Skill Name
- Category
- Proficiency Level
- Description

Recommended Categories

- Frontend
- Backend
- Database
- DevOps
- Game Development
- Tools

The list scrolls vertically.

The popup height follows the same rule as Projects.

---

# 24. Achievement Panel

Achievements showcase certificates and milestones.

Each card contains

- Certificate Image
- Title
- Organization
- Date
- Description
- Credential Link (optional)

Cards scroll horizontally.

The layout remains identical to Projects for consistency.

---

# 25. Language Selector

The website supports multiple languages.

Initially

- English
- Indonesian

Future languages may be added without changing the layout.

Interaction

Tap

↓

Dropdown

↓

Choose Language

↓

UI Updates

↓

Dropdown Closes

No page reload.

No loading screen.

Language changes should happen instantly.

---

# 26. Theme Toggle

The Theme Toggle switches between

- Midnight Indie
- Paper Light

Interaction

Tap

↓

Small Button Animation

↓

Theme Transition

↓

Save Preference

↓

Continue Current State

The Theme Toggle never resets the current page state.

---

# 27. Navigation Priority

Priority Order

1

Global Controls

↓

2

About / Experience

↓

3

Bottom Navigation

↓

4

Popup Content

When a higher-priority interaction is active, lower-priority interactions are temporarily disabled.

Example

Experience Open

↓

Bottom Navigation Disabled

↓

Back Button

↓

Return Home

↓

Bottom Navigation Enabled

---

# 28. Navigation Consistency

Every navigation interaction should follow the same pattern.

User Action

↓

Button Feedback

↓

Animation

↓

Content Appears

↓

Interaction Complete

No instant content replacement.

No abrupt transitions.

No flashing.

No overlapping animations.

The navigation should always feel responsive and polished.

---

# 29. Future Navigation

Future features may include

- Blog
- Gallery
- Timeline Filter
- Visitor Counter
- Guestbook

These features should follow the same interaction principles.

No future feature should introduce page navigation or browser scrolling.

---

# 30. Design Guidelines

The design language should feel timeless.

It should not follow temporary design trends.

The interface should remain modern for many years.

The overall feeling should resemble:

- Indie Games
- Steam Deck UI
- Apple Human Interface
- VSCode
- Notion
- Raycast

The website should never resemble:

- Admin Dashboard
- Banking Application
- ERP Software
- Windows Forms
- Bootstrap Demo

---

# 31. Visual Identity

The website should immediately communicate three things.

1.

Professional

2.

Creative

3.

Interactive

Visitors should immediately understand that this portfolio belongs to a software engineer who enjoys building interactive experiences.

---

# 32. Simplicity Rules

Every component must have a purpose.

Before adding a UI element ask:

"Does this improve the experience?"

If the answer is no,

remove it.

Avoid unnecessary:

- Decorations
- Icons
- Borders
- Shadows
- Animations
- Labels

Minimal interfaces are easier to understand.

---

# 33. Consistency Rules

Every component should behave consistently.

Buttons should look identical.

Cards should share the same spacing.

Popup panels should use identical animations.

Navigation should always appear in the same location.

Users should never wonder whether two similar components behave differently.

---

# 34. Component Sizing

Large Components

Examples

- Main Panel
- About Panel
- Experience Panel

These define the structure of the page.

Medium Components

Examples

- Project Cards
- Skill Cards
- Achievement Cards

These contain information.

Small Components

Examples

- Buttons
- Icons
- Badges
- Tags

These support interaction.

Component sizes should remain proportional across all screen sizes.

---

# 35. Spacing System

Use a consistent spacing scale.

Recommended spacing values

4px

8px

12px

16px

24px

32px

48px

64px

Avoid random spacing values.

Consistent spacing creates visual rhythm.

---

# 36. Typography

The typography should prioritize readability.

Recommended Fonts

Headings

Poppins SemiBold

Body

Inter Regular

Buttons

Inter Medium

Code

JetBrains Mono

Use only two font families throughout the project.

Avoid decorative fonts.

---

# 37. Icons

Icons should be:

- Minimal
- Outline style
- Simple
- Consistent

Recommended icon libraries

- Lucide
- Heroicons
- Phosphor

Avoid mixing multiple icon styles.

---

# 38. Cards

Cards should be lightweight.

Each card has one purpose.

Project Card

Contains project information.

Skill Card

Contains skill information.

Achievement Card

Contains certificate information.

Cards should never become mini pages.

Keep content concise.

---

# 39. Buttons

Buttons should communicate action.

Primary Buttons

High importance.

Examples

- Open Project
- Live Demo

Secondary Buttons

Supporting actions.

Examples

- GitHub
- Download CV

Icon Buttons

Utility actions.

Examples

- Theme
- Language
- Back

Avoid using more than one primary button in the same area.

---

# 40. Empty Space

Whitespace is part of the design.

Do not fill every empty area.

The character requires breathing room.

Large empty areas improve focus.

---

# 41. Character Priority

The character is the center of the experience.

UI should orbit around the character.

Never design the character around the UI.

The character should always receive the largest visual area.

---

# 42. Background Design

Backgrounds should remain subtle.

Allowed

✓ Soft gradients

✓ Ambient lighting

✓ Slight particles

✓ Very small decorative elements

Not Allowed

✗ Busy wallpapers

✗ Large illustrations

✗ Strong patterns

✗ RGB lighting

✗ Moving backgrounds

The background exists only to support the character.

---

# 43. Decorations

Decorations should be minimal.

Examples

Allowed

Small corner accents

Soft dividers

Tiny glowing dots

Subtle shadows

Avoid

Large ornaments

Complex frames

Heavy borders

Visual clutter

---

# 44. Scroll Behavior

Scrolling should exist only inside content containers.

Allowed

Projects

Horizontal

Skills

Vertical

Experience

Internal vertical

About

Internal vertical

Forbidden

Entire website scrolling

Nested scrolling

Horizontal page scrolling

---

# 45. Error Prevention

The interface should prevent user mistakes.

Buttons should disable while animations are running.

Repeated clicks should be ignored.

Only one popup panel should exist.

Only one mobile panel should exist.

The user should never reach an invalid state.

---

# 46. Loading States

Whenever data is loading:

Show skeleton placeholders.

Do not shift layouts.

Do not hide the character.

Loading indicators should feel lightweight.

Avoid full-screen loading overlays whenever possible.

---

# 47. Future Design Guidelines

Future features must respect all existing design principles.

When adding a new feature ask:

Does it preserve:

- Character First
- Single Scene
- Minimal Interface
- Consistency
- Responsive Behavior

If not,

redesign the feature before implementation.

---

# 48. Final Design Rules

The website should always prioritize:

1. Character
2. User Experience
3. Readability
4. Consistency
5. Performance
6. Accessibility
7. Simplicity

Visual effects should never become the primary attraction.

The best compliment a visitor can give is:

"This feels like a small indie game, but it's actually a portfolio."

---

# 49. Developer Guidelines

This document defines how the design should be implemented.

The implementation should always prioritize:

- Maintainability
- Scalability
- Readability
- Reusability
- Performance

The implementation should never sacrifice user experience for unnecessary visual effects.

---

# 50. Frontend Architecture

The UI should be component-based.

Every UI element should have a single responsibility.

Recommended structure:

```
src/

components/
layout/
panels/
navigation/
character/
hooks/
contexts/
pages/
types/
utils/
assets/
styles/
```

Components should remain small and reusable.

Avoid creating one large component containing multiple responsibilities.

---

# 51. Component Rules

Each component should:

- Have one responsibility
- Be reusable
- Receive data through props
- Avoid hardcoded values
- Avoid duplicated logic

Components should communicate through state rather than direct manipulation.

---

# 52. State Management

Global state should only be used when necessary.

Recommended global states:

- Theme
- Language
- Active Panel
- Character State

Content such as Projects, Skills, and Experience should be fetched dynamically rather than stored as hardcoded data.

---

# 53. Data Driven Design

The UI should never depend on hardcoded content.

All editable information should eventually come from the CMS.

Editable sections include:

- About
- Experience
- Projects
- Skills
- Achievements
- Languages
- Settings

The UI should automatically update when new data becomes available.

---

# 54. Responsive Checklist

Desktop

✓ Three permanent regions

✓ About visible

✓ Experience visible

✓ Character centered

✓ Bottom navigation visible

---

Mobile

✓ Single Main Panel

✓ About button

✓ Experience button

✓ Language selector

✓ Theme toggle

✓ Bottom navigation

✓ Character centered

---

# 55. Accessibility Checklist

Every interactive element should support:

✓ Keyboard Navigation

✓ Screen Readers

✓ Focus Indicator

✓ Touch Interaction

✓ High Contrast

✓ Responsive Font Size

Buttons should always include accessible labels.

Icons should not be the only way to communicate meaning.

---

# 56. Performance Goals

The portfolio should feel lightweight.

Target goals:

First Contentful Paint

Less than 2 seconds

Initial Bundle

As small as possible

Animation

60 FPS

Character

Stable frame rate

Avoid unnecessary re-rendering.

Lazy load assets whenever possible.

---

# 57. Browser Support

Desktop

- Chrome
- Edge
- Firefox
- Safari

Mobile

- Chrome Android
- Safari iOS
- Samsung Internet

The experience should remain consistent across supported browsers.

---

# 58. AI Design Rules

If an AI is used to generate UI or code, it must follow these rules.

Always preserve:

- Character First
- Single Scene Experience
- Three-region desktop layout
- Mobile single-focus layout
- Bottom navigation
- Fixed panel boundaries

Never:

- Add page navigation
- Introduce browser scrolling
- Move the character outside the center
- Create popups outside the Main Panel
- Add unnecessary UI elements

When unsure, preserve the existing interaction model instead of inventing a new one.

---

# 59. Future Expansion

The architecture should support future additions without redesigning the website.

Potential future modules:

- Blog
- Visitor Analytics
- Guestbook
- Contact Form
- Timeline Filters
- Character Customization
- Downloadable Resume
- Interactive NPC
- Mini Games

Future features should follow the same design language and interaction principles.

---

# 60. Final Design Statement

This portfolio is not intended to be a traditional website.

It is an interactive experience that combines software engineering, UI/UX design, and real-time 3D graphics into a single cohesive application.

Every design decision should reinforce these core principles:

- Character First
- Single Scene
- Minimal Interface
- Smooth Interaction
- Professional Presentation
- Responsive Experience
- Consistent Design
- Future Scalability

If a future design decision conflicts with these principles, the principles should always take priority.

---

# End of Document