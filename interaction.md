# Interaction Specification

Version: 1.0

---

# 1. Purpose

This document defines every interaction that can occur inside the Interactive Portfolio Website.

Unlike Design Specification, this document focuses only on user interactions and application states.

It answers questions such as:

- What happens when a button is pressed?
- Which panels may be opened?
- Which interactions are blocked?
- Which animations should play?
- Which UI elements appear or disappear?

This document intentionally does not define colors, typography, or animations in detail.

---

# 2. Interaction Philosophy

Every interaction should feel like navigating a modern indie game's main menu.

Interactions should always be:

• Predictable

• Smooth

• Fast

• Lightweight

• Consistent

Users should never wonder what a button will do.

---

# 3. Application States

The application consists of six major states.

Home

↓

Projects

↓

Skills

↓

Achievements

↓

About

↓

Experience

Only one state may be active at any time.

---

# 4. Home State

Default application state.

Visible

✓ Character

✓ Theme Toggle

✓ Language Selector

✓ Bottom Navigation

Desktop

✓ About

✓ Experience

Mobile

✓ About Button

✓ Experience Button

Nothing else is open.

---

# 5. Home Rules

Character

Idle Animation

Bottom Navigation

Enabled

Theme Toggle

Enabled

Language

Enabled

Desktop Panels

Visible

Mobile Panels

Hidden

This state represents the application's resting state.

---

# 6. State Priority

Highest Priority

About

Experience

↓

Popup Panels

↓

Navigation

↓

Character Interaction

↓

Background

Higher priority interactions temporarily disable lower priority interactions.

---

# 7. Interaction Lock

While an animation is playing

Disable

✓ Repeated Clicks

✓ Double Tap

✓ Rapid Navigation

Interaction becomes available again after the animation completes.

---

# 8. Global Controls

Global Controls remain accessible whenever possible.

Includes

Theme Toggle

Language Selector

Exception

During About and Experience animations, controls are temporarily locked.

---

# 9. Input Methods

The application supports

Mouse

Keyboard

Touch

Every interaction should behave identically regardless of input method.

---

# 10. Interaction Feedback

Every button should provide immediate feedback.

Examples

Hover

↓

Highlight

Press

↓

Button Press Animation

Release

↓

Execute Action

Users should never press a button without receiving visual feedback.

---

---

# 11. Home State Interaction

The Home State is the default state of the application.

It serves as the central hub from which all other interactions originate.

When the application starts, it must always enter the Home State.

---

# 12. Home UI

Desktop

Visible

✓ About Panel

✓ Experience Panel

✓ Character

✓ Bottom Navigation

✓ Theme Toggle

✓ Language Selector

Hidden

✗ Popup Panel

---

Mobile

Visible

✓ About Button

✓ Experience Button

✓ Theme Toggle

✓ Language Selector

✓ Character

✓ Bottom Navigation

Hidden

✗ About Panel

✗ Experience Panel

✗ Popup Panel

---

# 13. Home State Flow

Application Launch

↓

Load Settings

↓

Load Language

↓

Load Theme

↓

Load Portfolio Data

↓

Initialize Character

↓

Play Idle Animation

↓

Enter Home State

↓

Ready For Interaction

---

# 14. Character Behavior

When entering Home State

Character should

✓ Face Forward

✓ Play Idle Animation

✓ Blink Occasionally

✓ Breathe Naturally

✓ Remain Centered

Character interaction should never interfere with UI interactions.

---

# 15. Character Camera

Camera remains fixed.

Do not zoom.

Do not rotate.

Do not pan.

The user should always see the full character.

Future camera interactions may be added, but the default Home camera should remain stable.

---

# 16. Background Behavior

The background should remain passive.

Allowed

✓ Ambient animation

✓ Soft particles

✓ Lighting

Forbidden

✗ Camera movement

✗ Distracting objects

✗ Large animated elements

The background should reinforce the atmosphere rather than compete for attention.

---

# 17. Bottom Navigation Interaction

When the user taps a navigation button:

Button Press

↓

Visual Feedback

↓

Current Popup Closes (if one exists)

↓

Selected Popup Opens

↓

Button becomes Active

↓

Interaction Ends

Navigation should always feel responsive.

---

# 18. Active Navigation State

Only one navigation button may be active.

Correct

Projects

↓

Skills

↓

Achievements

Incorrect

Projects + Skills

Projects + Achievements

Skills + Achievements

Multiple active buttons are not allowed.

---

# 19. Idle State

If the user does not interact with the website:

Character continues idle animation.

UI remains unchanged.

No popup opens automatically.

No notifications appear.

The Home screen should feel calm.

---

# 20. Returning Home

Every interaction eventually returns to Home.

Example

Projects

↓

Close

↓

Home

About

↓

Back

↓

Home

Experience

↓

Back

↓

Home

The Home State always restores:

✓ Character

✓ Navigation

✓ Theme Toggle

✓ Language Selector

✓ Desktop Panels (Desktop)

✓ About / Experience Buttons (Mobile)

---

# 21. Home State Restrictions

While Home is active:

Allowed

✓ Theme Toggle

✓ Language Change

✓ Open Projects

✓ Open Skills

✓ Open Achievements

✓ Open About

✓ Open Experience

Forbidden

✗ Multiple Popups

✗ Hidden Navigation

✗ Character Relocation

✗ Fullscreen Dialogs

✗ Browser Navigation

---

# 22. Home Performance

Entering the Home State should feel immediate.

Target:

State Transition

<150ms

UI Response

Instant

Character Animation

Continuous

No visible loading should occur after the Home State is fully initialized.

---

---

# 23. Projects Interaction

The Projects panel allows visitors to explore portfolio projects.

Projects are displayed inside the Main Panel.

The panel should never replace the current page.

It simply expands upward from the Bottom Navigation.

---

# 24. Opening Projects

Initial State

```
Home
```

↓

User selects

```
Projects
```

↓

Button enters Active State

↓

Current Popup closes (if any)

↓

Projects Panel slides upward

↓

Projects Content becomes interactive

↓

State becomes

```
Projects Open
```

---

# 25. Projects State

Visible

✓ Character

✓ Projects Popup

✓ Bottom Navigation

Desktop

✓ About

✓ Experience

Mobile

✓ About Button

✓ Experience Button

✓ Theme Toggle

✓ Language Selector

Hidden

✗ Skills Popup

✗ Achievement Popup

---

# 26. Project Card Interaction

Each project card supports multiple actions.

Available actions

• Open Details

• GitHub Repository

• Live Demo

• Preview Image

Interaction

User taps Project Card

↓

Card Highlight

↓

Small Press Animation

↓

Open Project Detail

Project Detail should remain inside the popup.

Do not navigate to another page.

---

# 27. Project Detail

Project Detail expands within the popup.

Recommended Layout

```
Thumbnail

Title

Description

Technology Stack

Features

GitHub

Live Demo

Close
```

Project Detail should never become fullscreen.

---

# 28. Closing Projects

Projects Open

↓

User taps

Projects

again

↓

Projects Popup closes

↓

Button loses Active State

↓

Return Home

---

# 29. Switching Panels

Projects Open

↓

User taps Skills

↓

Projects Popup closes

↓

Skills Popup opens

↓

Projects Button inactive

↓

Skills Button active

No overlapping animations.

Only one popup exists.

---

# 30. Skills Interaction

Skills follows the same interaction pattern.

Home

↓

Skills

↓

Popup opens

↓

Scrollable List

↓

Close

↓

Home

Only the content differs.

The interaction remains identical.

---

# 31. Skill Item Interaction

Each Skill Item may expand.

Collapsed

```
React

Advanced
```

↓

Tap

↓

Expanded

```
React

Advanced

Description

Experience

Projects using React
```

Only one skill expands at a time.

---

# 32. Achievements Interaction

Achievements behave like Projects.

Home

↓

Achievements

↓

Popup opens

↓

Horizontal Cards

↓

Close

↓

Home

---

# 33. Achievement Detail

Each Achievement Card may expand.

Contains

• Certificate

• Organization

• Date

• Description

• Credential URL

The expanded content remains inside the popup.

---

# 34. Popup Switching Rules

Correct

Projects

↓

Skills

↓

Achievement

↓

Projects

Incorrect

Projects

↓

Projects + Skills

Incorrect

Achievement

↓

Projects + Achievement

Only one popup may exist.

---

# 35. Popup Persistence

Changing

Theme

↓

Popup remains open.

Changing

Language

↓

Popup remains open.

Window Resize

↓

Popup remains open.

Popup state should persist whenever possible.

---

# 36. Popup Scroll Memory

Optional Feature

Each popup remembers its scroll position.

Example

Projects

↓

Scroll

↓

Close

↓

Open Again

↓

Returns to previous position

If not implemented,

always return to the top.

---

# 37. Empty Content

If no data exists.

Projects

↓

Display friendly illustration

↓

"No projects available."

Skills

↓

"No skills available."

Achievements

↓

"No achievements available."

Never leave blank space.

---

# 38. Error State

If data fails to load.

Display

```
Unable to load content.

Please try again later.
```

Show Retry button.

Do not close the popup automatically.

---

# 39. Interaction Summary

Projects

↓

Open

↓

Browse

↓

Detail

↓

Close

↓

Home

Skills

↓

Open

↓

Scroll

↓

Expand

↓

Close

↓

Home

Achievements

↓

Open

↓

Browse

↓

Detail

↓

Close

↓

Home

Every interaction should follow the same predictable pattern.

---

---

# 40. About Panel Interaction

The About Panel introduces the portfolio owner.

Desktop and Mobile share the same content.

Only their interaction differs.

---

# 41. Desktop About Behavior

Desktop

The About Panel is permanently visible.

It is part of the layout.

It never opens.

It never closes.

It never animates.

Allowed interactions

• Scroll

• Copy Contact

• Open Social Links

• Download Resume

The panel itself cannot be hidden.

---

# 42. Mobile About Flow

Initial State

```
Home
```

↓

User taps

```
About
```

↓

About Button disappears

↓

Experience Button disappears

↓

Bottom Navigation becomes disabled

↓

Theme Toggle becomes disabled

↓

Language Selector becomes disabled

↓

About Panel slides in from the left

↓

Back Button appears

↓

State becomes

```
About Open
```

---

# 43. About State

Visible

✓ About Panel

✓ Back Button

Hidden

✗ Character

(partially or fully covered)

✗ Bottom Navigation

✗ About Button

✗ Experience Button

Disabled

✗ Theme Toggle

✗ Language Selector

The user should focus only on the About content.

---

# 44. About Internal Interaction

Inside the About Panel

Allowed

✓ Vertical Scrolling

✓ Copy Contact

✓ Open GitHub

✓ Open LinkedIn

✓ Open Email

✓ Download Resume

Forbidden

✗ Open Projects

✗ Open Skills

✗ Open Achievements

The About Panel is an independent interaction.

---

# 45. Closing About

User taps

```
Back
```

↓

About Panel slides out to the left

↓

Buttons restored

↓

Navigation enabled

↓

Theme Toggle enabled

↓

Language Selector enabled

↓

Character visible again

↓

Return Home

---

# 46. Experience Panel Interaction

Desktop

Always visible.

Never animated.

Never hidden.

Only the timeline scrolls.

The panel itself remains fixed.

---

# 47. Mobile Experience Flow

Initial State

```
Home
```

↓

User taps

```
Experience
```

↓

Experience Button disappears

↓

About Button disappears

↓

Navigation disabled

↓

Theme disabled

↓

Language disabled

↓

Experience Panel slides in from the right

↓

Back Button appears

↓

State becomes

```
Experience Open
```

---

# 48. Experience State

Visible

✓ Experience Panel

✓ Back Button

Hidden

✗ Bottom Navigation

✗ About Button

✗ Experience Button

Disabled

✗ Theme Toggle

✗ Language Selector

Character may become partially covered.

---

# 49. Timeline Interaction

Timeline Items

Collapsed

↓

Tap

↓

Expanded

↓

Show

• Position

• Company

• Duration

• Description

• Technology Stack

Only one timeline item may expand at a time.

---

# 50. Closing Experience

User taps

```
Back
```

↓

Experience Panel slides out to the right

↓

Navigation restored

↓

Buttons restored

↓

Theme Toggle enabled

↓

Language Selector enabled

↓

Character visible

↓

Return Home

---

# 51. Switching Restriction

About Open

↓

User taps Experience

Nothing happens.

The user must first return to Home.

Likewise

Experience Open

↓

User taps About

Nothing happens.

Return Home first.

---

# 52. Interaction Lock

While About or Experience is opening or closing

Disable

✓ Touch

✓ Mouse

✓ Keyboard shortcuts

✓ Navigation

Until the animation finishes.

---

# 53. Scroll Memory

Optional

The About Panel remembers its previous scroll position.

The Experience Panel remembers its timeline position.

If this feature is disabled

Both panels always reopen at the top.

---

# 54. Error Handling

If About content cannot be loaded

Display

```
Unable to load profile information.
```

If Experience content cannot be loaded

Display

```
Unable to load experience history.
```

Provide a Retry button.

Do not automatically close the panel.

---

# 55. Interaction Summary

Desktop

About

Always Visible

↓

Scrollable

↓

Done

Experience

Always Visible

↓

Scrollable

↓

Done

---

Mobile

Home

↓

About

↓

Back

↓

Home

OR

Home

↓

Experience

↓

Back

↓

Home

The user should never become trapped inside a panel.

Back always returns to Home.

---

---

# 56. Theme Interaction

The portfolio supports two visual themes.

• Midnight Indie (Default)

• Paper Light

Changing the theme only affects appearance.

The application state must remain unchanged.

---

# 57. Theme Toggle Flow

Initial State

```
Midnight Indie
```

↓

User presses

```
Theme Toggle
```

↓

Button Press Animation

↓

Save Current UI State

↓

Apply New Theme Variables

↓

Animate Color Transition

↓

Update 3D Environment Lighting

↓

Save Preference

↓

Interaction Complete

The website must never reload during this process.

---

# 58. Theme Transition

Transition Duration

Recommended

200ms–300ms

Animated Properties

✓ Background Color

✓ Panel Color

✓ Card Color

✓ Border Color

✓ Divider Color

✓ Text Color

✓ Icon Color

✓ Shadow Opacity

✓ Environment Lighting

Do Not Animate

✗ Layout

✗ Component Position

✗ Width

✗ Height

✗ Character Position

✗ Navigation Position

Theme changes should feel smooth but subtle.

---

# 59. Theme Persistence

The selected theme must persist between sessions.

Recommended Storage

```
localStorage
```

Example

User selects

```
Paper Light
```

↓

Close Browser

↓

Return Later

↓

Portfolio opens in

```
Paper Light
```

No login is required.

---

# 60. Theme Restrictions

Changing the theme must NOT:

• Close an open popup

• Reset scroll position

• Interrupt character animation

• Restart the application

• Reload assets unnecessarily

The current interaction should continue seamlessly.

---

# 61. Language Interaction

The portfolio supports multiple languages.

Example

• English

• Indonesian

The language selector is always available on the Home State.

---

# 62. Language Selector Flow

Home

↓

User taps

```
Language
```

↓

Dropdown opens

↓

User selects language

↓

Text resources reload

↓

UI updates instantly

↓

Dropdown closes

↓

Interaction Complete

No page refresh.

---

# 63. Language Persistence

The selected language should persist.

Recommended Storage

```
localStorage
```

Example

User selects

```
Bahasa Indonesia
```

↓

Close Browser

↓

Open Portfolio

↓

Website starts in Indonesian

---

# 64. Language Update Rules

Only textual content changes.

The following must remain unchanged:

✓ Layout

✓ Navigation

✓ Character

✓ Popup State

✓ Animation

✓ Theme

The language system should never modify the application's structure.

---

# 65. Dynamic Content Reload

Changing language updates

• About

• Experience

• Projects

• Skills

• Achievements

• Navigation Labels

• Buttons

• Tooltips

Content should update without noticeable delay.

---

# 66. Unsupported Language

If a translation is unavailable,

Fallback to

```
English
```

Optionally display

```
Some content is not available in the selected language.
```

The interface should never display missing translation keys.

---

# 67. Combined Theme & Language Behavior

Theme

↓

Language

↓

Projects

↓

About

↓

Back

↓

Theme

↓

Experience

Every interaction should continue normally.

Neither Theme nor Language should interrupt other application states.

---

# 68. Theme & Language Restrictions

Theme and Language controls are disabled while:

• About Panel is opening

• About Panel is closing

• Experience Panel is opening

• Experience Panel is closing

They become available again immediately after the transition finishes.

---

# 69. Interaction Summary

Theme

↓

Apply Visual Changes

↓

Continue Current State

Language

↓

Update Text

↓

Continue Current State

Neither action should force the user back to Home.

---

# 70. Future Expansion

The system should support future additions such as:

• Automatic language detection

• More than two languages

• High contrast mode

• Accessibility theme

These features must integrate with the existing interaction model without altering the overall application flow.

---

---

# 71. Character Philosophy

The 3D character is the centerpiece of the portfolio.

It is not merely decoration.

The character represents the portfolio owner and acts as the visual anchor for every interaction.

All UI elements should support the character instead of competing with it.

The character should always feel alive, even when the user is not interacting with the website.

---

# 72. Default State

When the website loads,

the character immediately enters the Idle State.

Idle includes:

✓ Breathing Animation

✓ Blinking

✓ Small Weight Shift

✓ Hair / Clothing Physics (optional)

The Idle animation should loop seamlessly.

---

# 73. Character Idle Cycle

Example sequence

```
Idle

↓

Blink

↓

Look Around Slightly

↓

Idle

↓

Small Breathing Motion

↓

Idle
```

The cycle should feel natural.

Avoid robotic repetition.

---

# 74. Character Visibility

Desktop

The entire upper body should remain visible.

Mobile

The head and torso should always remain visible.

Popup panels may partially cover the lower body,

but never the head.

The face should remain the visual focus.

---

# 75. Character Priority

The character has higher visual priority than:

• Background

• Decorations

• Cards

• Dividers

Only temporary panels (About / Experience on Mobile) may partially cover the character.

---

# 76. Mouse Interaction (Desktop)

Future Feature

When the cursor moves,

the character may subtly react.

Allowed reactions

✓ Eyes follow cursor

✓ Head turns slightly

✓ Small upper body rotation

Maximum rotation

Horizontal

±15°

Vertical

±8°

The movement should remain subtle.

---

# 77. Touch Interaction (Mobile)

Future Feature

When the user taps the character,

possible reactions include:

• Wave

• Smile

• Nod

• Blink

Only one reaction should play at a time.

Repeated taps should be ignored until the current animation finishes.

---

# 78. Character Reaction to Navigation

Projects

↓

Character glances downward toward the popup.

Skills

↓

Character briefly looks at the Skills panel.

Achievements

↓

Character smiles subtly or looks toward the panel.

After the reaction,

the character returns to Idle.

These reactions should last less than one second.

---

# 79. Character Reaction to About & Experience

Desktop

No reaction required,

since these panels are always visible.

Mobile

Opening About

↓

Character briefly looks left.

Opening Experience

↓

Character briefly looks right.

After the panel opens,

the character returns to Idle if still visible.

---

# 80. Character During Theme Change

When switching themes,

the character model remains unchanged.

Only the environment updates.

Changes include:

• Ambient Light

• Shadow Intensity

• Rim Lighting

The transition should be smooth.

No animation reset should occur.

---

# 81. Character During Language Change

Changing the language must not affect:

✓ Animation

✓ Position

✓ Rotation

✓ Expression

Only UI text changes.

The character continues its current animation uninterrupted.

---

# 82. Character Loading

When the application starts,

show a lightweight loading placeholder while the model loads.

Sequence

```
Loading

↓

Load 3D Model

↓

Load Animations

↓

Initialize Physics

↓

Fade In Character

↓

Idle
```

The user should never see a T-pose or an incomplete model.

---

# 83. Character Performance

Target Frame Rate

60 FPS

Animation updates should remain smooth even while UI panels are open.

If performance decreases,

reduce animation complexity before reducing UI responsiveness.

---

# 84. Future Character Features

The architecture should support future additions such as:

• Sitting Animation

• Walking in Place

• Outfit Switching

• Facial Expressions

• Seasonal Themes

• Interactive Props

• Voice Greeting

• Lip Sync

These features should integrate without changing the existing interaction model.

---

# 85. Character Interaction Rules

The character should never:

✗ Obstruct important UI

✗ Leave the Main Panel

✗ React excessively

✗ Play long animations automatically

✗ Distract from the portfolio content

The character exists to enhance the experience, not dominate it.

---

---

# 86. Error Handling Philosophy

Errors should never interrupt the overall experience.

Whenever possible, the application should recover gracefully without requiring a page refresh.

The user should always understand:

• What happened

• Why it happened (if known)

• What they can do next

Technical error messages should never be exposed directly.

---

# 87. Data Loading Failure

If portfolio content cannot be loaded,

display a friendly error message.

Example

```
Unable to load portfolio data.

Please try again.
```

Available actions

• Retry

• Return Home

The application should remain usable.

---

# 88. Character Loading Failure

If the 3D character fails to load,

display a lightweight placeholder.

Example

```
Character is unavailable.

The rest of the portfolio remains accessible.
```

The website should continue functioning normally.

Never leave an empty blank area.

---

# 89. Image Loading Failure

If a project thumbnail,

certificate,

or profile image fails to load,

display a placeholder image.

Example

```
Image unavailable
```

Broken image icons should never appear.

---

# 90. CMS Failure

If the CMS cannot be reached,

use the most recent cached data when available.

If no cached data exists,

display empty-state content with a retry option.

The website should never crash because the CMS is unavailable.

---

# 91. Network Connection Lost

If the internet connection is interrupted,

display a small notification.

Example

```
You're currently offline.

Some content may not be available.
```

The notification should disappear automatically after the connection is restored.

---

# 92. Invalid Navigation

Prevent invalid application states.

Examples

Incorrect

Projects

↓

Projects

↓

Projects

↓

Projects

Repeated requests should be ignored.

Another example

About Open

↓

Open Skills

Blocked

The current interaction must finish first.

---

# 93. Rapid User Input

If the user repeatedly taps buttons,

the application should:

• Ignore repeated input

• Complete the current animation

• Accept the next interaction afterward

The UI should never enter an inconsistent state.

---

# 94. Window Resize

If the browser is resized while a popup is open,

the application should:

✓ Preserve the active popup

✓ Preserve scroll position

✓ Recalculate layout

The popup should not close automatically.

---

# 95. Orientation Change

Mobile

Portrait

↓

Landscape

↓

Portrait

The application should preserve:

• Current state

• Popup state

• Theme

• Language

• Character animation

No reset should occur.

---

# 96. Browser Refresh

If the user refreshes the page,

restore:

✓ Theme

✓ Language

✓ Last Home Layout

Do not restore:

• Open About

• Open Experience

• Popup Panels

The application should always restart from Home.

---

# 97. Unsupported Browser Features

If WebGL is unavailable,

display a simplified version of the website.

Example

```
3D is not supported on this device.

A simplified portfolio is displayed instead.
```

Core portfolio content should remain accessible.

---

# 98. Animation Failure

If an animation cannot be played,

skip the animation.

Do not block the interaction.

The application should prioritize functionality over visual polish.

---

# 99. Accessibility Failure

If animations are disabled by the user's system preferences,

replace animations with immediate transitions.

Respect accessibility settings whenever possible.

---

# 100. Unexpected Errors

If an unexpected error occurs,

display a generic recovery message.

Example

```
Something went wrong.

Please try again.
```

Provide:

• Retry

• Return Home

The application should never display raw error stacks or developer messages.

---

---

# 101. Global Interaction Rules

Every interaction inside the portfolio must follow these principles.

The website should always feel:

• Fast

• Smooth

• Predictable

• Consistent

Every interaction should begin and end in a valid application state.

The user should never become confused about what happened after pressing a button.

---

# 102. State Machine

The application follows a simple state machine.

```
                    HOME
                      │
      ┌───────────────┼───────────────┐
      │               │               │
      ▼               ▼               ▼
  Projects         Skills      Achievements
      │               │               │
      └───────────────┴───────────────┘
                      │
                      ▼
                    HOME

        HOME
         │
         ▼
      About
         │
         ▼
       Back
         │
         ▼
       HOME

        HOME
         │
         ▼
    Experience
         │
         ▼
       Back
         │
         ▼
       HOME
```

Every state transition must be intentional.

No hidden transitions should exist.

---

# 103. Interaction Priority

Highest Priority

• About

• Experience

↓

Popup Panels

↓

Navigation

↓

Character

↓

Background

Lower priority interactions should pause whenever a higher priority interaction is active.

---

# 104. State Recovery

Whenever an interaction is interrupted,

the application should recover safely.

Examples

Browser Resize

↓

Restore Layout

Animation Interrupted

↓

Complete State

Lost Focus

↓

Resume Idle

The application should always return to a valid state.

---

# 105. Animation Synchronization

Animations should never compete.

Correct

Projects closes

↓

Skills opens

Incorrect

Projects closing

+

Skills opening

+

Character animation

+

Theme animation

All at the same time.

Major UI animations should occur sequentially.

---

# 106. Navigation Consistency

Navigation should always represent the current state.

Examples

Projects Open

↓

Projects Button Active

Skills Open

↓

Skills Button Active

Home

↓

No Active Navigation

The active state should always be visually obvious.

---

# 107. Character Consistency

The character should always feel alive.

Even when no interaction occurs,

the character continues:

• Idle

• Breathing

• Blinking

Small natural movements are preferred over dramatic animations.

---

# 108. Accessibility Rules

Users should be able to interact using:

✓ Mouse

✓ Keyboard

✓ Touch

Interactive elements should always provide:

• Focus Indicator

• Hover Feedback

• Press Feedback

• Accessible Labels

The portfolio should remain usable without relying solely on animations.

---

# 109. Performance Goals

Interaction Response

<100ms

Animation Start

<50ms

Frame Rate

60 FPS

State Change

Immediate

The interface should always prioritize responsiveness over visual complexity.

---

# 110. AI Constraints

When generating UI or code from this document,

an AI must preserve:

✓ Single Scene Architecture

✓ Character-Centered Layout

✓ Desktop Three-Region Structure

✓ Mobile Single-Main-Panel Structure

✓ Bottom Navigation

✓ Popup-Based Navigation

✓ Responsive Layout

✓ Theme System

✓ Language System

✓ Character Visibility

The AI must never introduce:

✗ Multiple Pages

✗ Browser Navigation

✗ Sidebar Navigation

✗ Hamburger Menu

✗ Floating Action Button

✗ Fullscreen Modal

✗ Dashboard Layout

✗ Infinite Scroll

✗ Random Widgets

✗ Popups outside the Main Panel

When uncertain,

follow the existing interaction model rather than inventing new behaviors.

---

# 111. Developer Checklist

Before releasing the portfolio,

verify:

General

☐ Character remains the visual focus.

☐ No browser scrolling on the Home screen.

☐ Layout matches the documented wireframe.

☐ Only one popup can be opened.

☐ Only one mobile panel can be opened.

☐ Theme persists.

☐ Language persists.

☐ CMS content loads correctly.

☐ Responsive layout functions properly.

☐ Animations remain smooth.

Desktop

☐ About always visible.

☐ Experience always visible.

☐ Theme Toggle works.

☐ Language Selector works.

☐ Projects Popup works.

☐ Skills Popup works.

☐ Achievements Popup works.

Mobile

☐ About slides from left.

☐ Experience slides from right.

☐ Back button restores Home.

☐ Navigation hides during About.

☐ Navigation hides during Experience.

☐ Character remains centered.

☐ Safe areas respected.

Performance

☐ Stable 60 FPS.

☐ No unnecessary re-render.

☐ Assets lazy-loaded.

☐ Optimized 3D model.

Accessibility

☐ Keyboard navigation.

☐ Screen reader labels.

☐ Reduced motion support.

☐ High contrast compatibility.

---

# 112. Future Expansion Rules

Future features should integrate naturally into the existing interaction model.

Potential additions include:

• Blog

• Guestbook

• Interactive NPC

• Character Customization

• Dynamic Weather

• Seasonal Themes

• Mini Games

• Visitor Analytics

• Admin Dashboard

New features must never compromise:

• Character First

• Single Scene

• Minimal Interface

• Responsive Design

• Performance

---

# 113. Final Principles

This portfolio is not designed to behave like a traditional website.

It is an interactive experience inspired by indie game menus, combining software engineering, UI/UX design, and real-time 3D graphics.

Every interaction should reinforce these principles:

1. Character First

2. Simplicity Over Complexity

3. One Scene, One Experience

4. Smooth and Predictable Interaction

5. Consistent Navigation

6. Responsive by Design

7. Data-Driven Content

8. Scalable Architecture

9. Performance-Oriented Implementation

10. Long-Term Maintainability

Whenever a future design decision conflicts with these principles,

the principles should always take priority.

---

# End of Interaction Specification