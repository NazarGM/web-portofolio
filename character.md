# Character System Specification

Version: 1.0

---

# 1. Purpose

This document defines the complete 3D Character System used by the Interactive Portfolio Website.

The character is the primary visual element of the portfolio.

Its responsibilities include

• Visual Identity

• Idle Animation

• Interactive Reactions

• Character Events

• Theme Integration

• Future Expansion

The character should enhance the user experience without distracting from the portfolio content.

---

# 2. Design Goals

The character should feel

✓ Friendly

✓ Professional

✓ Modern

✓ Minimal

✓ Lightweight

✓ Responsive

The character is part of the interface rather than a decorative object.

---

# 3. Supported Formats

Preferred

GLB

Supported

GLTF

Future

VRM

FBX (Import Only)

GLB is the official runtime format.

---

# 4. Character Requirements

The character must

Use PBR Materials

Contain Armature

Contain Animations

Be Optimized

Use Embedded Textures

Avoid missing dependencies.

---

# 5. Character Structure

Character

↓

Armature

↓

Mesh

↓

Materials

↓

Textures

↓

Animations

↓

Metadata

Everything should exist inside one GLB whenever practical.

---

# 6. Character Limitations

Maximum

Vertices

100,000

Bones

100

Materials

10

Texture Resolution

2048x2048

Animation Count

Unlimited

(as separate uploads)

Optimization is more important than visual complexity.

---

# 7. Coordinate System

Forward

+Z

Up

+Y

Scale

1 Meter

Rotation

Zeroed

Transforms should be applied before export.

---

# 8. Naming Convention

Character

Character_Name.glb

Examples

Character_Default.glb

Character_Formal.glb

Character_Casual.glb

Avoid spaces.

Use PascalCase or Snake_Case consistently.

---

# 9. Character Lifecycle

Upload

↓

Validate

↓

Preview

↓

Publish

↓

Displayed on Website

↓

Future Replacement

Old characters remain stored for rollback.

---

---

# 11. Rigging

Every character must be rigged.

Requirements

Humanoid Skeleton

Applied Transform

Proper Bone Hierarchy

Consistent Bone Naming

Animation compatibility depends on proper rigging.

---

# 12. Skeleton Compatibility

Preferred

Mixamo Skeleton

Future

VRM Humanoid

Using a common skeleton improves animation reuse.

---

# 13. Animation Source

Recommended

Mixamo

Custom Blender Animation

Motion Capture

Future

Custom animations should use the same skeleton whenever possible.

---

# 14. Required Animations

Minimum required animations

Idle

Blink

Wave

Look Left

Look Right

Look Down

Celebrate

Thinking

Without an Idle animation the character cannot be published.

---

# 15. Optional Animations

Future animations

Sit

Walk

Run

Jump

Clap

Point

Typing

Reading

Stretch

Breathing

Developers may add unlimited animations.

---

# 16. Animation Naming

Recommended

Idle

Idle02

Blink

Wave

Celebrate

Think

LookLeft

LookRight

LookDown

Avoid generic names.

Example

Animation001

Animation002

---

# 17. Animation Rules

Animations should

Loop correctly

Have smooth transitions

Avoid sudden jumps

Maintain consistent scale

Use Root Transform consistently.

---

# 18. Animation Blending

Use smooth transitions.

Recommended

Fade Out

↓

Fade In

Transition

0.2–0.4 seconds

Abrupt animation switching should be avoided.

---

# 19. Animation Priority

Highest

Click Interaction

↓

Popup Interaction

↓

Idle Variation

↓

Idle

Higher priority animations temporarily interrupt lower priority animations.

---

---

# 21. Blender Workflow

Every character should follow the same production pipeline.

Recommended Workflow

Create / Edit Character

↓

Rig Character

↓

Apply Materials

↓

Apply Textures

↓

Test Animations

↓

Apply Transform

↓

Export GLB

↓

Upload to CMS

↓

Preview

↓

Publish

Using a standardized workflow reduces compatibility issues.

---

# 22. Blender Scene Rules

Before exporting

✓ Apply Scale

✓ Apply Rotation

✓ Apply Location

✓ Remove Unused Objects

✓ Remove Hidden Meshes

✓ Remove Duplicate Materials

✓ Check Face Orientation

The scene should only contain the required assets.

---

# 23. Material Guidelines

Recommended

PBR Materials

Base Color

Metallic

Roughness

Normal Map

Avoid

Procedural Nodes

Simulation Nodes

Unsupported Shader Nodes

Only export-compatible materials should be used.

---

# 24. Texture Guidelines

Supported Formats

PNG

JPEG

Recommended Resolution

512x512

1024x1024

2048x2048

Avoid

4096x4096

unless absolutely necessary.

Textures should balance quality and performance.

---

# 25. Export Settings

Recommended Export

Format

GLB

Include

Mesh

Armature

Materials

Textures

Animations

Compression

Enabled

Apply Modifiers

Enabled

The exported file should be self-contained.

---

# 26. Validation Checklist

Before uploading

✓ Character Faces Forward

✓ Scale Correct

✓ Materials Loaded

✓ Animations Play

✓ No Missing Texture

✓ No Console Errors

Every validation item should pass before publication.

---

# 27. Preview Environment

The CMS should include a Character Preview.

Preview includes

Rotate Camera

Zoom

Play Animation

Reset View

Toggle Theme

The preview should match the public portfolio as closely as possible.

---

# 28. Character Replacement

Replacing a character should

Upload New Model

↓

Validate

↓

Preview

↓

Assign Default

↓

Publish

↓

Frontend Updates Automatically

The previous character remains available for rollback.

---

# 29. Asset Versioning

Every uploaded character should store

Version Number

Upload Date

Uploader

Description

Status

Published

Draft

Archived

This allows safe rollback if necessary.

---

---

# 31. React Three Fiber Integration

The frontend loads the active character from the backend.

Workflow

Website Opens

↓

Fetch Character Metadata

↓

Load GLB

↓

Initialize Scene

↓

Initialize Animation Mixer

↓

Play Idle

↓

Ready

The UI should remain responsive while loading.

---

# 32. Animation Mixer

Each character uses

THREE.AnimationMixer

Responsibilities

Play

Pause

Fade

Crossfade

Stop

Queue

The mixer should manage all animation transitions.

---

# 33. Animation State Machine

Recommended States

Idle

↓

Interaction

↓

Return Idle

↓

Idle Variation

↓

Idle

Only one primary animation should be active at a time.

---

# 34. Idle Variations

Instead of repeating one animation forever

Idle

↓

Idle02

↓

Blink

↓

Look Around

↓

Stretch

↓

Idle

Idle variations make the character feel alive.

---

# 35. Event Mapping

Each UI action may trigger an animation.

Example Mapping

Projects

→ LookDown

Skills

→ Think

Achievements

→ Celebrate

About

→ LookLeft

Experience

→ LookRight

Close Panel

→ Idle

Mappings should be editable through the CMS.

---

# 36. Mouse Interaction

Desktop

Mouse Movement

↓

Head Slightly Follows Cursor

↓

Clamp Rotation

↓

Return to Idle

Movement should remain subtle.

---

# 37. Touch Interaction

Mobile

Tap Character

↓

Wave

↓

Return Idle

Long Press (Future)

↓

Special Animation

Touch interactions should never interfere with navigation.

---

# 38. Animation Queue

If multiple events occur

Current Animation

↓

Queue Next

↓

Smooth Transition

↓

Play

↓

Return Idle

Interruptions should be minimized.

---

# 39. Fallback Behavior

If an animation is missing

Use Idle

If the model fails

Show Placeholder Character

If loading fails

Show Retry Button

The portfolio should remain usable under all circumstances.

---

---

# 41. CMS Character Management

The CMS provides a complete interface for managing characters.

Administrator can

• Upload Character

• Upload Animations

• Replace Character

• Preview Character

• Assign Events

• Publish

• Archive

• Rollback

No code changes should be required.

---

# 42. Character Dashboard

Recommended Sections

Characters

Animations

Preview

Event Mapping

Versions

Settings

The dashboard should separate character assets from portfolio content.

---

# 43. Character Information

Each character stores

Name

Description

Version

Status

Upload Date

Updated Date

Thumbnail

GLB File

Default Character

Only one character can be marked as Default.

---

# 44. Animation Library

Animations are managed independently.

Each animation stores

Name

Description

Category

Duration

Loop

Preview

GLB File

Status

Animations should be reusable across multiple characters that share the same skeleton.

---

# 45. Animation Categories

Recommended Categories

Idle

Interaction

Gesture

Expression

Celebration

Movement

Custom

Categories help organize large animation libraries.

---

# 46. Event Mapping

Administrators assign animations to UI events.

Example

Home Idle
→ Idle

About Open
→ LookLeft

Experience Open
→ LookRight

Projects Open
→ LookDown

Skills Open
→ Think

Achievements Open
→ Celebrate

Character Tap
→ Wave

Popup Close
→ Idle

Mappings are editable at any time.

---

# 47. Preview Mode

The CMS preview allows testing interactions.

Supported actions

Play Animation

Switch Theme

Open Projects

Open Skills

Open Achievements

Open About

Open Experience

The preview should simulate the public website.

---

# 48. Publish Workflow

Draft Character

↓

Validate

↓

Preview

↓

Publish

↓

Replace Active Character

↓

Frontend Refresh

Publishing should require confirmation.

---

# 49. Rollback

If problems occur

Open Version History

↓

Select Previous Version

↓

Restore

↓

Publish

↓

Frontend Updates

Rollback should preserve all associated animation mappings.

---

---

# 51. Camera System

The camera should be configurable through the CMS.

Editable Properties

Position

Rotation

Field of View

Zoom Limits

Default Distance

Changes should apply without rebuilding the frontend.

---

# 52. Camera Behavior

Desktop

Fixed Camera

↓

Subtle Character Focus

↓

No Orbit Controls

Mobile

Fixed Camera

↓

Optimized Framing

The camera should always present the character in the intended composition.

---

# 53. Lighting System

Lighting should be configurable.

Recommended Lights

Ambient

Directional

Rim

Fill

Future

Spot Light

HDR Environment

Lighting should enhance the character without overpowering the UI.

---

# 54. Theme Integration

Midnight Indie

↓

Cool Ambient

↓

Blue Rim Light

↓

Softer Shadows

Paper Light

↓

Neutral Ambient

↓

White Fill Light

↓

Brighter Scene

Only the environment lighting changes.

The character model remains identical.

---

# 55. Shadow Settings

Recommended

Soft Shadows

Contact Shadows

Adjustable Shadow Strength

Shadow Distance

Shadow Resolution

Avoid extremely dark shadows.

---

# 56. HDR Environment

Supported

Studio

Neutral

Outdoor

Custom HDRI (Future)

The HDR environment should remain subtle.

It should never distract from the character.

---

# 57. Background

The background should remain minimal.

Supported

Solid Color

Gradient

Soft Decorative Shapes

Future

Animated Background

The background is secondary to the character.

---

# 58. Responsive Camera

Desktop

Medium Shot

Tablet

Slightly Wider

Mobile

Closer Framing

The character should remain fully visible regardless of screen size.

---

# 59. Camera Reset

Whenever the user returns Home

↓

Reset Camera

↓

Reset Character

↓

Play Idle

The Home state should always be predictable.

---

---

# 61. Performance Goals

The character system should prioritize smooth performance.

Target

Desktop

60 FPS

Tablet

60 FPS

Mobile

30–60 FPS

The UI should remain responsive while the character is rendered.

---

# 62. Model Optimization

Every character should be optimized before publication.

Recommended

Reduce Vertices

Merge Meshes

Remove Hidden Faces

Remove Unused Bones

Optimize UV Layout

Optimization should occur before export.

---

# 63. Geometry Compression

Recommended

Draco Compression

or

Meshopt Compression

Workflow

Export GLB

↓

Compress

↓

Upload

↓

Automatic Decompression

Compression reduces download size significantly.

---

# 64. Texture Optimization

Recommended Formats

WebP

PNG

JPEG

Future

KTX2

Texture Rules

Maximum Resolution

2048 x 2048

Power-of-Two Sizes

Mipmaps Enabled

Avoid oversized textures.

---

# 65. Material Optimization

Reduce material count.

Recommended

1–5 Materials

Maximum

10 Materials

Reuse existing materials whenever possible.

Too many materials increase draw calls.

---

# 66. Animation Optimization

Animations should

Remove Unused Keyframes

Reduce Keyframe Density

Remove Duplicate Tracks

Keep Loop Clean

Store Separately

Only required animations should be loaded.

---

# 67. Asset Preloading

Recommended Preload

Character Model

↓

Idle Animation

↓

Environment

↓

Theme Assets

↓

UI Ready

Frequently used assets should load before interaction.

---

# 68. Memory Management

Unload

Unused Models

Unused Animations

Unused Textures

Dispose

Geometry

Materials

Textures

Proper cleanup prevents memory leaks.

---

# 69. Performance Monitoring

Monitor

FPS

Render Time

GPU Memory

Texture Count

Draw Calls

Triangle Count

Developers should profile performance before release.

---

---

# 71. Asset Pipeline

Recommended Pipeline

Blender

↓

Rigging

↓

Mixamo

↓

Animation Testing

↓

GLB Export

↓

Compression

↓

CMS Upload

↓

Validation

↓

Preview

↓

Publish

↓

Website

Every asset should follow this workflow.

---

# 72. Folder Structure

Recommended

characters/

default/

casual/

formal/

animations/

idle/

interaction/

gesture/

expression/

thumbnails/

archives/

The folder structure should remain organized and predictable.

---

# 73. Asset Naming

Characters

Character_Default.glb

Character_Formal.glb

Animations

Idle.glb

Wave.glb

Think.glb

Celebrate.glb

LookLeft.glb

LookRight.glb

LookDown.glb

Avoid spaces and inconsistent naming.

---

# 74. Metadata

Each asset should store

Unique ID

Name

Version

Author

Description

Upload Date

Published Status

Thumbnail

Checksum (Optional)

Metadata improves asset management.

---

# 75. Version Control

Each published asset creates a new version.

Workflow

Upload

↓

Version 1

↓

Modify

↓

Version 2

↓

Modify

↓

Version 3

↓

Rollback (Optional)

Older versions should remain available.

---

# 76. Backup Strategy

Recommended

Daily Database Backup

Weekly Asset Backup

Monthly Full Archive

Backups should be stored separately from the production server.

---

# 77. Restore Procedure

Failure

↓

Select Backup

↓

Restore Assets

↓

Restore Database

↓

Validate

↓

Publish

The restore process should minimize downtime.

---

# 78. Deployment

Character assets should be deployable independently.

Uploading a new character should not require

Frontend Build

Backend Build

Server Restart

Only the CMS should manage deployment.

---

# 79. Compatibility

Supported Platforms

Desktop

Tablet

Mobile

Supported Browsers

Chrome

Edge

Firefox

Safari

Character behavior should remain consistent across platforms.

---

---

# 81. Testing Strategy

Every character should pass a validation process before publication.

Testing Types

Visual Testing

Animation Testing

Performance Testing

Compatibility Testing

Interaction Testing

Regression Testing

Characters should never be published without testing.

---

# 82. Visual Validation

Verify

Correct Scale

Correct Orientation

Materials

Textures

Shadows

Lighting

No Missing Meshes

No Floating Geometry

The character should appear identical to the CMS preview.

---

# 83. Animation Validation

Verify

Idle Loop

Smooth Transition

No Foot Sliding

No Bone Distortion

No Mesh Stretching

Correct Animation Speed

Proper Loop

Every animation should play correctly.

---

# 84. Event Validation

Test every mapped event.

Examples

Open About

↓

LookLeft

Open Experience

↓

LookRight

Open Projects

↓

LookDown

Open Skills

↓

Think

Open Achievements

↓

Celebrate

Character Tap

↓

Wave

Close Popup

↓

Idle

Every event should trigger the assigned animation.

---

# 85. Performance Validation

Measure

FPS

Memory Usage

GPU Usage

CPU Usage

Loading Time

Draw Calls

Triangle Count

The character should maintain smooth performance across supported devices.

---

# 86. Compatibility Matrix

Desktop

✓ Chrome

✓ Edge

✓ Firefox

✓ Safari

Tablet

✓ Android

✓ iPadOS

Mobile

✓ Android Chrome

✓ Safari iOS

Behavior should remain consistent across platforms.

---

# 87. Error Recovery

If the model cannot be loaded

↓

Display Placeholder Character

↓

Show Friendly Message

↓

Retry Loading

↓

Continue Website

The portfolio should never become unusable.

---

# 88. Troubleshooting

Common Issues

Missing Texture

↓

Check Export Settings

Incorrect Scale

↓

Apply Transform

Animation Missing

↓

Verify Event Mapping

Rig Broken

↓

Re-export GLB

Large File Size

↓

Optimize Mesh

The CMS should display meaningful error messages whenever possible.

---

# 89. QA Checklist

Before publishing

✓ Character Loads

✓ Animations Work

✓ Event Mapping Correct

✓ Theme Compatible

✓ Mobile Compatible

✓ Desktop Compatible

✓ Performance Verified

✓ Preview Matches Production

Only fully validated assets should be published.

---

---

# 91. Character Best Practices

Keep the character

Simple

Recognizable

Professional

Readable

Optimized

The character should support the portfolio rather than distract from it.

---

# 92. Future Features

Possible future improvements

Multiple Characters

Character Selection

Seasonal Costumes

Accessories

Facial Expressions

Hand Gestures

Dynamic Clothing

Plugin-based Character Packs

The architecture should support future expansion.

---

# 93. Facial Expressions

Future expression support

Neutral

Happy

Thinking

Surprised

Confident

Focused

Expressions may be triggered by UI interactions or animations.

---

# 94. Lip Sync

Future support

Audio Playback

↓

Viseme Detection

↓

Lip Animation

↓

Return to Idle

Lip sync is optional and not required for Version 1.

---

# 95. Interactive Character

Future interactions

Click

Wave

Double Click

Celebrate

Hover

Look at Cursor

Idle Timeout

Stretch

Keyboard Shortcut

Special Animation

Interactions should remain subtle and non-intrusive.

---

# 96. AI Character (Future)

Potential AI features

Voice Conversation

Speech Recognition

LLM Integration

Context Awareness

Personalized Greetings

Natural Gestures

These features should remain optional and modular.

---

# 97. NPC Behavior System (Future)

Future behavior tree

Idle

↓

Observe User

↓

React

↓

Return Idle

↓

Random Idle

↓

Repeat

Behavior should feel natural rather than repetitive.

---

# 98. Final Character Principles

The character system should remain

• Modular

• Lightweight

• Optimized

• Reusable

• Extensible

• CMS Driven

No behavior should require frontend code changes when manageable through the CMS.

---

# 99. Character Developer Checklist

Before publishing a new character

✓ Model Optimized

✓ GLB Valid

✓ Skeleton Compatible

✓ Materials Verified

✓ Textures Embedded

✓ Idle Animation Added

✓ Required Animations Uploaded

✓ Event Mapping Configured

✓ Preview Tested

✓ Mobile Verified

✓ Desktop Verified

✓ Theme Verified

✓ Performance Tested

✓ Published Successfully

Following this checklist ensures consistent quality across all character assets.

---

# 100. End of Character Specification

Version 1.0

This document defines the complete Character System for the Interactive Portfolio Website.

It covers asset creation, rigging, animation, optimization, CMS management, React Three Fiber integration, performance, testing, and future expansion while keeping the 3D character as the primary visual identity of the portfolio.