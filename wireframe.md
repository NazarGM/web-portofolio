# Wireframe Specification

Version: 1.0

---

# 1. Purpose

This document defines the structural wireframe of the Interactive Portfolio Website.

Unlike `design.md`, this document focuses only on the placement of UI elements.

No colors, typography, shadows, or animations are defined here.

Only layout and structure.

---

# 2. Layout Philosophy

The layout follows one simple rule:

The 3D Character is always the center of the experience.

Everything else exists around the character.

The layout should feel similar to an indie game's main menu.

---

# 3. Desktop Wireframe

Desktop consists of three permanent regions.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ About Me │                 Main Panel                  │ Experience          │
│          │                                             │                     │
│          │  🌙 Theme                     🌐 Language    │                     │
│          │                                             │                     │
│          │                                             │                     │
│          │             3D CHARACTER                    │                     │
│          │                                             │                     │
│          │                                             │                     │
│          │                                             │                     │
│          │    Projects   Skills   Achievements         │                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

# 4. Desktop Regions

## Left Region

Purpose

Display permanent profile information.

Contains

- Avatar (optional)
- Name
- Role
- About
- Contact
- Social Links
- Resume

Always visible.

Never animated.

---

## Main Region

Purpose

Primary interaction area.

Contains

- Theme Toggle
- Language Selector
- Character
- Popup Panels
- Bottom Navigation

Only this region contains interactive content.

---

## Right Region

Purpose

Professional timeline.

Contains

- Experience
- Timeline
- Company
- Position
- Description

Always visible.

Scrollable internally if necessary.

---

# 5. Region Size

Recommended layout.

Desktop

Left

20%

Center

60%

Right

20%

The Center Region should always receive the most space.

---

# 6. Fixed Divider

Desktop regions are separated by permanent dividers.

```
About │ Main │ Experience
```

Rules

No component may cross a divider.

Popup panels remain inside the Main Region.

Character remains inside the Main Region.

Navigation remains inside the Main Region.

The divider represents a hard layout boundary.

---

# 7. Character Area

The character occupies the visual center.

```
        Theme        Language

              3D CHARACTER

Projects   Skills   Achievement
```

The character should occupy approximately:

60–70% of the Main Region height.

The head should remain visible whenever possible.

---

# 8. Top Area

Desktop top bar.

```
🌙 Theme                    🌐 EN
```

Left

Theme Toggle

Right

Language Selector

No other controls should be added to this row.

---

# 9. Bottom Area

Bottom Navigation.

```
Projects

Skills

Achievements
```

The navigation remains fixed.

It never moves.

It never scrolls.

Only the popup content changes.

---

# 10. Popup Area

Popup panels appear above the Bottom Navigation.

```
Character

──────────────

Popup

──────────────

Navigation
```

Maximum popup height

45% of the Main Region.

Character visibility should be preserved.

---

---

# 11. Mobile Wireframe

The mobile layout follows a completely different philosophy from desktop.

Desktop prioritizes information.

Mobile prioritizes interaction.

Instead of displaying three regions simultaneously, mobile displays only the Main Panel.

Everything else appears only when requested.

---

# 12. Mobile Home Layout

```
┌─────────────────────────────┐
│ About          Experience   │
│                     EN ▼    │
│                     🌙       │
│                             │
│                             │
│                             │
│       3D CHARACTER          │
│                             │
│                             │
│                             │
│                             │
│ Projects Skills Achievement │
└─────────────────────────────┘
```

Visible Components

• About Button

• Experience Button

• Language Selector

• Theme Toggle

• Character

• Bottom Navigation

Nothing else should appear on the Home screen.

---

# 13. Mobile Layout Regions

The screen is divided into three invisible zones.

```
┌─────────────────────────────┐
│         Top Zone            │
├─────────────────────────────┤
│                             │
│        Character Zone       │
│                             │
├─────────────────────────────┤
│       Navigation Zone       │
└─────────────────────────────┘
```

---

## Top Zone

Contains

• About Button

• Experience Button

• Language Selector

• Theme Toggle

No popup should originate from this zone except About and Experience.

---

## Character Zone

Dedicated to the 3D character.

Rules

The character remains centered.

No floating buttons.

No cards.

No popup windows.

No permanent overlays.

Only temporary interactions may briefly overlap this area.

---

## Bottom Zone

Contains

Projects

Skills

Achievements

This navigation remains fixed.

It never scrolls.

---

# 14. About Panel Wireframe

Initial Home

```
About         Experience

Character

Projects
```

↓

User taps About

↓

```
Back

┌─────────────────────────────┐
│                             │
│         ABOUT ME            │
│                             │
│ Profile                     │
│ Bio                         │
│ Contact                     │
│ Social                      │
│                             │
└─────────────────────────────┘
```

Rules

About slides from the left.

Character may become partially hidden.

Bottom Navigation disappears.

About and Experience buttons disappear.

Back button replaces About.

---

# 15. Experience Panel Wireframe

Initial Home

↓

Tap Experience

↓

```
                       Back

┌─────────────────────────────┐
│ EXPERIENCE                  │
│                             │
│ Timeline                    │
│                             │
│ Company                     │
│                             │
│ Position                    │
│                             │
└─────────────────────────────┘
```

Rules

Slides from the right.

Navigation hidden.

Character may be partially covered.

Back button replaces Experience.

---

# 16. Returning Home

About

↓

Back

↓

```
About         Experience

Character

Projects Skills Achievement
```

Everything returns to its original state.

No remembered popup remains open.

---

# 17. Mobile Header

Home

```
About

Experience

Language

Theme
```

Alignment

```
About                 Experience

                  EN ▼

                  🌙
```

Spacing should remain consistent.

The controls form one visual group.

---

# 18. Character Placement

The character occupies approximately

65%

of the screen height.

Recommended placement

```
Header

↓

Character Head

↓

Character Body

↓

Navigation
```

The feet may be partially hidden if necessary.

The head should always remain visible.

---

# 19. Mobile Navigation

Bottom Navigation

```
┌─────────────────────────┐
│ Projects Skills Achieve │
└─────────────────────────┘
```

Characteristics

Always centered.

Equal spacing.

Equal width buttons.

Never overlap system gestures.

Respect device safe areas.

---

# 20. Mobile Interaction Rules

Only one major interaction may exist.

Examples

Home

↓

Projects

↓

Home

Correct.

Home

↓

Projects

↓

Skills

↓

Projects closes

↓

Skills opens

Correct.

Home

↓

Projects

↓

About

Incorrect.

About cannot open while another popup is active.

The current interaction must finish before another begins.

---

---

# 21. Popup System

The Main Panel contains a dedicated popup area.

Popup panels never behave like modal dialogs.

Instead, they extend naturally from the Bottom Navigation.

The popup system is designed to feel like expanding a game menu.

Desktop

```
Theme                    Language

        3D CHARACTER

──────────────────────────────

Popup Area

──────────────────────────────

Projects Skills Achievement
```

Mobile

```
Character

────────────

Popup

────────────

Projects Skills Achievement
```

The popup never replaces the page.

It simply expands inside the Main Panel.

---

# 22. Shared Popup Rules

All popup panels share identical behavior.

Rules

✓ Slides upward.

✓ Stops before covering the character's head.

✓ Remains inside the Main Panel.

✓ Rounded top corners.

✓ Independent scrolling.

✓ Bottom Navigation always remains visible.

Only the popup content changes.

The navigation never moves.

---

# 23. Popup Dimensions

Desktop

Recommended Width

100% of Main Panel

Recommended Height

35–45%

Maximum

50%

Mobile

Recommended Height

45–55%

Maximum

60%

Never exceed these limits.

The character should still be recognizable while browsing content.

---

# 24. Projects Popup

```
┌──────────────────────────────┐
│ Projects                     │
├──────────────────────────────┤
│ [ Card ] [ Card ] [ Card ] → │
│                              │
│ [ Card ] [ Card ] [ Card ] → │
└──────────────────────────────┘
```

Each card contains

• Thumbnail

• Title

• Short Description

• Technology Stack

• GitHub

• Live Demo

• Status

Cards scroll horizontally.

The popup itself does not scroll horizontally.

Only the card container scrolls.

---

# 25. Project Card Layout

```
┌───────────────────────┐
│ Thumbnail             │
│                       │
├───────────────────────┤
│ Project Title         │
│ Description           │
│                       │
│ React • ASP.NET       │
│                       │
│ GitHub   Demo         │
└───────────────────────┘
```

Cards should remain compact.

Avoid excessive text.

Descriptions should be concise.

---

# 26. Skills Popup

The Skills popup differs from Projects.

Instead of cards,

it uses a vertical list.

```
┌──────────────────────────────┐
│ Skills                       │
├──────────────────────────────┤
│ React             Advanced   │
│ ASP.NET           Advanced   │
│ PostgreSQL        Intermediate│
│ Docker            Beginner   │
│ Unity             Advanced   │
│ Blender           Intermediate│
└──────────────────────────────┘
```

Vertical scrolling only.

No horizontal scrolling.

---

# 27. Skill Item

Each item contains

```
Skill Name

Category

Level

Description
```

Optional

Progress Bar

Years of Experience

Technology Icon

Items should remain lightweight.

---

# 28. Achievement Popup

Achievements use cards similar to Projects.

```
┌─────────────────────────────┐
│ Achievement                 │
├─────────────────────────────┤
│ [ Certificate ] →           │
│                             │
│ [ Certificate ] →           │
└─────────────────────────────┘
```

Horizontal scrolling.

Unlimited cards.

---

# 29. Achievement Card

```
┌───────────────────────────┐
│ Certificate Image         │
├───────────────────────────┤
│ Title                     │
│ Organization              │
│ Date                      │
│                           │
│ View Credential           │
└───────────────────────────┘
```

The card should prioritize the certificate preview.

---

# 30. Popup Switching

Example

```
Projects

↓

Projects Popup

↓

User taps Skills

↓

Projects closes

↓

Skills opens
```

No overlapping animations.

No simultaneous popups.

---

# 31. Empty State

When no data exists.

Projects

```
No Projects Yet

Come back later.
```

Skills

```
No Skills Available
```

Achievements

```
No Achievements Yet
```

Use friendly messages.

Never leave blank areas.

---

# 32. Popup Footer

Popup panels should not contain footer buttons.

Closing a popup is done by:

• Pressing the active navigation button again.

or

• Selecting another navigation button.

This keeps interactions simple.

---

# 33. Popup Safe Area

Popup content should never overlap:

• Theme Toggle

• Language Selector

• About Panel

• Experience Panel

• Device Safe Areas

The popup remains fully contained inside the Main Panel.

---

---

# 34. About Panel Specification

The About Panel introduces the portfolio owner.

Its purpose is to answer the question:

"Who is this person?"

The panel should remain concise and easy to scan.

Avoid turning the About section into a long autobiography.

---

# 35. Desktop About Wireframe

```
┌────────────────────────────┐
│        Profile Photo       │
│                            │
│ John Doe                   │
│ Backend Developer          │
│                            │
├────────────────────────────┤
│ About Me                   │
│ Short introduction...      │
│                            │
├────────────────────────────┤
│ Contact                    │
│ Email                      │
│ Phone                      │
│ Location                   │
├────────────────────────────┤
│ Social Links               │
│ GitHub                     │
│ LinkedIn                   │
│ Instagram                  │
├────────────────────────────┤
│ Download Resume            │
└────────────────────────────┘
```

Everything should scroll vertically inside the panel if necessary.

---

# 36. About Panel Structure

Recommended order

1. Avatar
2. Name
3. Role
4. About
5. Contact
6. Social Links
7. Resume

This order should remain consistent across all devices.

---

# 37. About Section

The About section should be brief.

Recommended length

100–250 words.

Suggested content

- Current role
- Interests
- Technologies
- Career goals

Avoid:

- Long personal stories
- Unrelated hobbies
- Repeated information

---

# 38. Contact Section

The Contact section contains only essential information.

Recommended fields

• Email

• Phone

• Location

• Time Zone (optional)

Contact information should remain easy to copy.

---

# 39. Social Links

Display only professional platforms.

Recommended

• GitHub

• LinkedIn

Optional

• Instagram

• X (Twitter)

• YouTube

Avoid displaying inactive accounts.

---

# 40. Resume Section

A single button is sufficient.

```
Download Resume
```

Do not place multiple resume buttons throughout the website.

The Resume button belongs only inside the About Panel.

---

# 41. Experience Panel Specification

The Experience Panel answers the question:

"What has this person done?"

The content should be chronological.

Newest experience appears first.

---

# 42. Desktop Experience Wireframe

```
┌────────────────────────────┐
│ Experience                 │
├────────────────────────────┤
│ ● Senior Developer         │
│ │ Company                  │
│ │ 2025 - Present           │
│ │ Description              │
│ │                          │
│ ● Backend Developer        │
│ │ Company                  │
│ │ 2023 - 2025              │
│ │ Description              │
│ │                          │
│ ● Student                  │
│ │ University               │
│ │ 2021 - 2025              │
└────────────────────────────┘
```

---

# 43. Timeline Rules

Timeline items should remain compact.

Each item contains

• Position

• Company

• Employment Period

• Description

Optional

• Technology Stack

• Company Logo

Avoid displaying too much text.

---

# 44. Timeline Item

Recommended layout

```
Position

Company

Date

Description

Tech Stack
```

The Position should receive the highest emphasis.

The Company is secondary.

The Description should remain concise.

---

# 45. Timeline Scrolling

The Experience Panel scrolls independently.

Only the timeline moves.

The panel itself remains fixed.

Scrolling should not affect the Main Panel.

---

# 46. Mobile About

Wireframe

```
┌────────────────────────────┐
│ ← Back                     │
├────────────────────────────┤
│ Avatar                     │
│ Name                       │
│ Role                       │
│                            │
│ About                      │
│                            │
│ Contact                    │
│                            │
│ Social Links               │
│                            │
│ Resume                     │
└────────────────────────────┘
```

Everything scrolls vertically.

---

# 47. Mobile Experience

Wireframe

```
┌────────────────────────────┐
│                     Back → │
├────────────────────────────┤
│ Experience                 │
│                            │
│ Timeline                   │
│                            │
│ Timeline                   │
│                            │
│ Timeline                   │
└────────────────────────────┘
```

The timeline occupies nearly the full width.

Internal scrolling only.

---

# 48. Empty States

If no About content exists

```
About information is not available.
```

If no Experience exists

```
Experience will be added soon.
```

Avoid displaying blank panels.

---

# 49. Future Expansion

The About Panel should support future additions such as

• Current Status

• Languages

• Interests

• Availability

The Experience Panel may later include

• Filters

• Company Logos

• Attachments

• Recommendation Letters

These additions must not change the existing layout structure.

---

---

# 50. Responsive Design Philosophy

The website is designed as a responsive application rather than a responsive document.

Instead of merely resizing components, the interface reorganizes itself while preserving the same interaction model.

Desktop emphasizes information visibility.

Mobile emphasizes interaction simplicity.

The transition between layouts should feel natural and predictable.

---

# 51. Responsive Breakpoints

Recommended breakpoints.

Desktop XL

1600px and above

Desktop

1280px – 1599px

Laptop

1024px – 1279px

Tablet

768px – 1023px

Mobile

767px and below

These values may be adjusted slightly during implementation.

---

# 52. Desktop XL Layout

Desktop XL provides the most spacious layout.

```
┌──────────────────────────────────────────────────────────────┐
│ About │                 Main                 │ Experience    │
│       │                                      │               │
│       │           3D CHARACTER               │               │
│       │                                      │               │
│       │                                      │               │
│       │ Projects Skills Achievement          │               │
└──────────────────────────────────────────────┘
```

Characteristics

• Wide panels

• Large character

• Comfortable spacing

• Maximum readability

---

# 53. Desktop Layout

The default desktop layout.

```
20%

60%

20%
```

About

Main

Experience

The proportions should remain stable.

Avoid resizing panels while interacting.

---

# 54. Laptop Layout

When horizontal space decreases,

the layout compresses instead of changing structure.

```
18%

64%

18%
```

Spacing becomes slightly smaller.

Cards become narrower.

Typography may reduce by one scale.

The interaction model remains identical.

---

# 55. Tablet Layout

Tablet preserves the desktop philosophy.

```
16%

68%

16%
```

Adjustments

Smaller margins.

Smaller paddings.

Compact navigation.

Reduced popup height.

No functionality should disappear.

---

# 56. Mobile Layout

The layout changes completely.

```
Header

↓

Character

↓

Navigation
```

The side panels disappear.

About and Experience become temporary panels.

The user always returns to Home.

---

# 57. Responsive Character Scaling

The character scales proportionally.

Desktop XL

100%

Desktop

95%

Laptop

90%

Tablet

85%

Mobile

80%

Scaling should preserve proportions.

Do not stretch or squash the character.

---

# 58. Responsive Popup Scaling

Desktop

Popup

35–45%

Laptop

40%

Tablet

45%

Mobile

50–60%

The popup should never occupy the entire screen.

The character should remain identifiable.

---

# 59. Responsive Typography

Heading

Desktop

32px

Laptop

30px

Tablet

28px

Mobile

24px

Body

Desktop

16px

Tablet

15px

Mobile

14px

Avoid text smaller than 14px.

---

# 60. Responsive Spacing

Desktop

32px

24px

16px

Tablet

24px

16px

12px

Mobile

16px

12px

8px

Spacing should reduce proportionally.

Never allow components to touch each other.

---

# 61. Responsive Navigation

Desktop

Projects

Skills

Achievements

Equal width.

Centered.

Mobile

The same navigation.

Buttons become taller for touch interaction.

Minimum touch target

48×48 pixels.

---

# 62. Safe Area Support

The interface must respect device safe areas.

Especially

• iPhone Dynamic Island

• Camera Hole

• Rounded Corners

• Android Gesture Navigation

No important control may be hidden.

---

# 63. Landscape Mode

Landscape mobile is supported.

```
About

Character

Experience
```

The layout may temporarily resemble desktop,

but About and Experience remain temporary panels.

Bottom navigation remains visible.

---

# 64. Responsive Constraints

Never change

• Navigation logic

• Character position

• Popup direction

• Animation direction

• Panel behavior

Only resize and rearrange components.

Interaction must remain identical across devices.

---

---

# 65. Wireframe Constraints

This document defines the structural layout of the portfolio.

Every future UI implementation must preserve this structure.

Visual styling may evolve.

The layout architecture may not.

---

# 66. Absolute Layout Rules

The following rules are mandatory.

Desktop must always contain:

✓ About Region

✓ Main Region

✓ Experience Region

Desktop must never become a single-column layout.

---

Mobile must always contain:

✓ Header Controls

✓ Main Character

✓ Bottom Navigation

Everything else is temporary.

---

# 67. Main Panel Rules

The Main Panel is the heart of the website.

Responsibilities

• Character

• Popup Panels

• Navigation

• Theme Toggle

• Language Selector

Nothing else belongs here.

Avoid adding decorative widgets.

Avoid adding floating cards.

Avoid advertisements.

Avoid announcements.

The Main Panel should remain visually clean.

---

# 68. About Panel Rules

Desktop

Always visible.

Never collapses.

Never becomes a popup.

Mobile

Temporary panel.

Slides from left.

Closed using Back.

About should never contain:

✗ Projects

✗ Skills

✗ Achievements

Those belong exclusively inside the Main Panel.

---

# 69. Experience Rules

Desktop

Permanent panel.

Scrollable internally.

Mobile

Temporary panel.

Slides from right.

Closed using Back.

The timeline should remain chronological.

Newest items appear first.

---

# 70. Popup Rules

Popup panels include

Projects

Skills

Achievements

Shared Rules

✓ Slide upward

✓ Rounded top corners

✓ Stay inside Main Panel

✓ Independent scrolling

✓ Never exceed maximum height

Forbidden

✗ Fullscreen popup

✗ Browser modal

✗ External dialog

✗ New page

---

# 71. Character Rules

The character is the visual anchor.

The UI should adapt around the character.

The character should never adapt around the UI.

Never

✗ Move character into About

✗ Move character into Experience

✗ Hide the character completely

✗ Replace the character with content

Whenever possible

The character remains visible.

---

# 72. Navigation Rules

Desktop

Bottom Navigation always visible.

Mobile

Visible only on Home.

Disabled during About or Experience.

Navigation buttons

Projects

Skills

Achievements

No additional navigation buttons should be introduced without updating the documentation.

---

# 73. Header Rules

Desktop

Theme Toggle

Top Left

Language Selector

Top Right

Mobile

About

Top Left

Experience

Top Right

Language

Below Experience

Theme

Below Language

Header controls should remain lightweight.

---

# 74. Divider Rules

Desktop contains two permanent vertical dividers.

```
About │ Main │ Experience
```

The dividers define hard layout boundaries.

No element may cross a divider.

This includes

• Popup

• Character

• Cards

• Navigation

• Decorative elements

---

# 75. Wireframe Consistency

Every page state should feel like the same application.

Examples

Correct

Home

↓

Projects

↓

Skills

↓

Achievements

↓

Home

Incorrect

Home

↓

Projects

↓

Open New Page

Incorrect

Home

↓

Projects

↓

Fullscreen Modal

Consistency is more important than novelty.

---

# 76. AI Constraints

If an AI generates UI from this document, it must preserve:

✓ Three-column desktop layout

✓ Single-panel mobile layout

✓ Character-centered design

✓ Bottom navigation

✓ Popup system

✓ Fixed panel boundaries

The AI must not invent:

✗ Sidebar menus

✗ Hamburger menus

✗ Floating action buttons

✗ Dashboard widgets

✗ Browser page navigation

✗ Infinite scrolling

✗ Additional content panels

When uncertain,

the AI should preserve the documented layout instead of improvising.

---

# 77. Developer Checklist

Before considering the layout complete, verify:

Desktop

☐ Three permanent regions

☐ Character centered

☐ Bottom navigation fixed

☐ About visible

☐ Experience visible

☐ Popup contained

☐ No browser scrolling

☐ Dividers respected

---

Mobile

☐ About button

☐ Experience button

☐ Language selector

☐ Theme toggle

☐ Character centered

☐ Bottom navigation fixed

☐ About slides from left

☐ Experience slides from right

☐ Back button works

☐ No overlapping panels

---

# 78. Final Statement

The wireframe defines the foundation of the Interactive Portfolio Website.

It is intentionally minimal.

Visual styling, colors, typography, animations, and 3D assets may evolve over time.

However, the structural layout described in this document should remain stable.

The goal is to create a portfolio that feels like a polished indie game menu while remaining professional, intuitive, responsive, and easy to maintain.

---

# End of Wireframe Specification