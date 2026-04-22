# DESIGN.md

## Overview
Create a refined wedding landing page that feels contemporary, elegant, and memorable without looking generic, overly rustic, or template-like. The site is a single-page experience for invited guests. The design should communicate warmth, celebration, and premium attention to detail.

The page includes these main sections, in order:
1. Hero / introduction
2. Introductory descriptive paragraph
3. Venue description
4. Wedding registry (`Lista nozze`)
5. Footer

The visual language should balance editorial elegance with modern web clarity. Avoid clichés like excessive floral borders, heavy gold gradients, or overly ornate serif overload. The result should feel tasteful, intimate, and polished.

## Design Goals
- Make the page feel special and emotionally rich from the first screen.
- Use a modern luxury aesthetic with strong typography and restrained decorative elements.
- Keep the layout clean and legible on mobile first, while becoming more immersive on desktop.
- Make the `Lista nozze` section feel premium and trustworthy, not like an e-commerce catalog.
- Support Italian wedding content and a slightly formal tone.

## Brand Personality
- Elegant
- Romantic
- Contemporary
- Soft but not washed out
- Premium but welcoming
- Minimal with subtle visual character

## Visual Direction
The design should mix:
- editorial typography
- generous whitespace
- soft color transitions
- lightly layered cards
- subtle depth through blur, translucency, and fine borders
- restrained decorative details inspired by stationery and luxury hospitality

The page should feel closer to a boutique hotel or premium event brand than to a standard wedding template.

## Color Palette
Use the following palette consistently across the page.

### Core Colors
- `--color-bg`: `#FAF7F2` — warm ivory background
- `--color-surface`: `#FFFDFC` — elevated card surface
- `--color-surface-muted`: `#F3EEE7` — secondary surface blocks
- `--color-text`: `#2F2A28` — primary text
- `--color-text-soft`: `#6F6660` — secondary text
- `--color-line`: `#DDD2C6` — subtle borders and dividers

### Accent Colors
- `--color-primary`: `#B76E79` — dusty rose, elegant primary accent
- `--color-primary-strong`: `#9E5965` — stronger hover / emphasis tone
- `--color-secondary`: `#7C8C7A` — muted sage for balancing warmth
- `--color-highlight`: `#D8B98A` — soft champagne accent for icons and micro-details

### Functional Usage
- Primary buttons and interactive emphasis use dusty rose.
- Secondary accents, badges, and supporting decorative details may use muted sage.
- Champagne is used sparingly for highlights, separators, icon strokes, or subtle gradients.
- Avoid pure black or pure white. Keep everything slightly warm.

## Background Treatment
The background should not be flat. Use layered visual depth:
- warm ivory base
- very soft radial glow or gradient areas in blush / champagne tones
- occasional blurred organic shapes in the far background
- subtle noise or paper-like texture only if extremely light

The overall effect should be calm and luxurious, never busy.

## Typography
Use a combination of a high-contrast serif for key headings and a clean sans-serif for body content.

### Font Pairing
- Headings: `Cormorant Garamond`, fallback `Playfair Display`, serif
- Body / UI: `Inter`, fallback `Manrope`, sans-serif

### Type Scale
- Hero title: 56–72px desktop, 40–48px mobile
- Section title: 32–40px desktop, 26–32px mobile
- Intro lead paragraph: 20–24px desktop, 18–20px mobile
- Body text: 16–18px
- Small meta text: 13–14px

### Typographic Rules
- Serif headings should feel elegant and airy, with slightly tight line-height.
- Body text should remain highly readable and never too light.
- Use sentence case, not all caps for large headings.
- Small labels may use uppercase with generous letter spacing.
- Avoid excessive italics except for very small romantic accents or quotes.

## Layout System
The page is a one-column narrative layout with alternating full-width and contained sections.

### Container Widths
- Main content container: 1120px max width
- Narrow reading container for long text: 760px max width
- Comfortable horizontal padding: 20px mobile, 32px tablet, 48px desktop

### Spacing Rhythm
- Section padding: 96–140px desktop, 72–88px mobile
- Vertical spacing inside sections should feel generous
- Preserve strong separation between content blocks
- Avoid cramped cards or dense multi-column layouts

## Hero Section
The hero should feel cinematic but restrained.

### Hero Content
- Couple names as the main focal point
- Optional date or short event line
- One short emotional subtitle or invitation line
- A visual cue to scroll

### Hero Style
- Large editorial headline
- Layered background with soft photography feel, gradient overlay, or abstract atmospheric art direction
- Optional monogram or fine decorative mark
- No loud CTA buttons in the hero unless explicitly needed

### Hero Composition
Desktop:
- vertically centered content
- strong top-to-bottom flow
- large breathable negative space

Mobile:
- stacked layout
- hero remains immersive without oversized empty space
- text stays readable above the fold

## Introductory Paragraph Section
This section should present the emotional and narrative introduction.

### Style
- Use a narrow centered reading column
- Lead paragraph is prominent and spacious
- Optional short eyebrow label above the title
- Text alignment may be centered for the lead, but body copy should remain easy to read

### Mood
This is where the site becomes personal. The design should support intimacy and sincerity.

## Venue Description Section
This section describes the wedding location.

### Layout
Use a split or editorial layout on desktop:
- text block on one side
- visual or framed image area on the other side

On mobile:
- stack vertically
- keep image block above or below text depending on narrative flow

### Style Details
- Use cards or framed surfaces with soft borders
- Emphasize atmosphere, landscape, architecture, and guest experience
- Support optional metadata like city, address, or timing in subtle chips or detail rows

## Wedding Registry Section (`Lista nozze`)
This section must feel elegant, clear, and easy to scan.

### Design Intent
The registry is important but should still feel integrated with the wedding brand. It must not look like a checkout page or a generic donation block.

### Possible Content Blocks
- short introductory text
- explanation of what the gift supports
- one or more registry options or contribution methods
- optional note of thanks

### Layout Suggestions
Use premium stacked cards or a clean multi-card layout with:
- title
- concise explanatory text
- optional amount guidance or categories
- button or link area

### Registry UI Style
- cards with soft background and fine border
- subtle shadow, never harsh
- generous internal spacing
- clear visual hierarchy
- actions styled as elegant buttons, not overly commercial

### Interaction
- buttons have smooth hover transitions
- interactive elements feel tactile but understated
- if links open external services, visually indicate this in a refined way

## Footer
The footer should be minimal and graceful.

Include only essential information such as:
- couple names or monogram
- date or location
- small thank-you line

Avoid bulky navigation or corporate-style footer structures.

## Components

### Buttons
Primary button:
- dusty rose background
- ivory or near-white text
- slightly rounded corners, around 14–18px radius
- elegant hover darkening and soft lift

Secondary button:
- transparent or soft ivory background
- thin border using line color
- text in primary text color

### Cards
- background: surface or muted surface
- border: 1px solid line color
- radius: 24–32px
- subtle shadow with low opacity
- optional backdrop blur for highlighted cards

### Chips / Metadata Pills
- small rounded pills
- muted surface background
- secondary text color
- sparse usage only

### Dividers
- thin lines or decorative centered marks
- champagne accent may be used very sparingly

## Imagery Direction
Use imagery that feels atmospheric, luminous, and editorial.

Preferred image style:
- natural light
- soft contrast
- elegant architecture or landscape
- romantic details without kitsch
- premium event photography feel

Avoid:
- oversaturated imagery
- heavy sepia filters
- generic stock wedding clichés
- rustic overload unless explicitly requested

## Motion
Animation should be soft and intentional.

Use:
- fade and slight upward reveal on scroll
- gentle parallax or background drift only if performance remains excellent
- button hover transitions between 180ms and 240ms
- subtle image scale on hover where appropriate

Avoid:
- bouncing elements
- excessive motion
- flashy entrance animations

## Decorative Language
Decorative elements must remain subtle.

Allowed:
- fine line ornaments
- monogram-inspired circular motif
- soft gradient halos
- paper / silk inspired textures at very low opacity
- editorial framing

Avoid:
- obvious hearts everywhere
- floral corner clipart
- thick gold frames
- excessive lace motifs

## Accessibility
- Maintain strong contrast for text against light backgrounds.
- Body text must remain easily readable on mobile.
- Interactive elements must have clear hover and focus states.
- Do not rely on color alone to convey meaning.
- Keep tap targets comfortable on mobile.

## Responsive Behavior
Mobile is first-class, not an afterthought.

### Mobile Priorities
- readable hero without overwhelming height
- generous spacing preserved at smaller sizes
- stacked sections with clean rhythm
- registry cards stay easy to scan and tap

### Desktop Priorities
- stronger editorial composition
- immersive hero
- split layouts for venue and registry where useful
- refined asymmetry without reducing clarity

## Content Tone
Copy should feel:
- warm
- sincere
- elegant
- lightly formal
- never corporate
- never overly sugary

Italian wording should sound natural and polished.

## Implementation Notes
- Prefer rounded large surfaces over sharp boxes.
- Use 8px spacing increments, but allow looser editorial spacing where needed.
- Favor restrained gradients over flat blocks of accent color.
- Use section transitions through spacing and tone shifts, not hard visual breaks.
- The overall result should feel premium, modern, and emotionally resonant.

## Summary
Design a modern wedding landing page with editorial elegance, warm neutrals, dusty rose accents, refined serif typography, soft layered backgrounds, and premium card-based sections. The experience should feel personal, romantic, and polished, with a particularly well-crafted `Lista nozze` section that is visually integrated into the overall brand language.
