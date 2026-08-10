---
name: Naresh Singh Bhau — B2B Revenue Leader
description: Dark, amber-signaled portfolio for a revenue operator; proof reads like instruments on a console.
colors:
  bg-deep: "hsl(220 15% 6%)"
  surface: "hsl(220 15% 10%)"
  foreground: "hsl(0 0% 98%)"
  signal-amber: "hsl(38 92% 50%)"
  on-amber: "hsl(220 15% 6%)"
  raised: "hsl(220 12% 16%)"
  muted-slate: "hsl(220 10% 60%)"
  hairline: "hsl(220 12% 20%)"
  destructive: "hsl(0 84.2% 60.2%)"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.2em"
  stat:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.on-amber}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "48px"
  tile-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "{spacing.md}"
  tag-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted-slate}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  featured-tile:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
---

# Design System: Naresh Singh Bhau — B2B Revenue Leader

## Overview

**Creative North Star: "The Signal Room"**

This is a dark operations console, not a brochure. The page is a control room where a career in revenue is rendered as a live instrument panel: figures glow like indicators, the timeline reads like a run of operation, and the serif headline is the one authoritative voice in the room. The visitor is treated as a decision-maker standing at the console and being shown a track record they can verify in seconds.

**"Quiet authority, loud results."** The canvas is calm and premium — deep navy-slate, generous space, restrained motion. The amber never decorates; it signals. It marks what moved the business: the numbers, the deal trail, the proof tiles, the one call to action. Because the environment stays hushed, the mathematics does the arguing. This is deliberate: both audiences (recruiters and founders) are making a fast, high-stakes read, and a screen full of static would lose them before the first scroll.

Density is moderate and editorial. Text-heavy sections (About, Capabilities) use a wide two-column grid with a sticky left rail; proof surfaces (achievements, metric wall) pack into dense bento grids and ledger rows. Depth is tonal, not shadowy: layered translucent surfaces, one frosted-glass panel (the hero proof card), and a soft amber glow reserved for exactly two proof-point containers. The single recognizable flourish is the gradient-amber numeral — the whole system orbits it.

**Key Characteristics:**
- Dark slate-blue console aesthetic; amber = live signal only.
- Playfair Display serif for authority; Inter for utility; JetBrains Mono for instrumentation.
- Gradient-amber numerals are the signature motif — never plain-gray figures.
- Flat tonal surfaces plus one frosted-glass proof panel; glow reserved for proof.
- Editorial two-column grids with a sticky left rail on scannable sections.
- Restrained motion: fade-up reveals on scroll, one slow skills marquee, quiet hovers.

## Colors

One signal (Signal Amber) against a navy-slate neutral scale. The palette is near-monochrome by design; the amber earns its noise through scarcity.

### Primary
- **Signal Amber** (`hsl(38 92% 50%)`, also the `ring`): live indicators only. Buttons, timeline rail and dots, eyebrow indexes, icon wells, gradient numerals, tag underlines on hover, back-to-top, marquee separators, focus rings. Never bulk reading text.
- **Signal Amber Deep** (`hsl(38 92% 45%)`): hover states of amber surfaces (button hover reads slightly deeper).

### Neutral
- **Console Slate** (`hsl(220 15% 6%)`): page background; the "room."
- **Raised Panel** (`hsl(220 15% 10%)`: card/popover surfaces; also the shell color of translucent tiles.
- **Instrument Grey** (`hsl(220 12% 16%)`: secondary/muted surface fills behind icon wells and outline buttons.
- **Reading Blue-Grey** (`hsl(0 0% 98%)`): near-white foreground; headlines and primary copy.
- **Muted Slate** (`hsl(220 10% 60%)`): secondary text, captions, list copy — the default "talking" voice.
- **Hairline** (`hsl(220 12% 20%)`): borders, input strokes, divide lines at low opacity variants.
- **Risk Red** (`hsl(0 84.2% 60.2%)`): reserved for destructive states only; never used on this page today.

### Named Rules
**The One Signal Rule.** Signal Amber appears on ≤15% of any screen and always marks proof, an active indicator, or a primary action. When in doubt, render an element in neutrals and let the data do the talking.

**The Noise Rule.** Rotation of two over two is impossible: no gradient other than the amber numeral gradient, no more than one glowing container at a time, no third accent color. The palette is strictly amber-on-slate.

## Typography

**Display Font:** Playfair Display (with Georgia, serif fallback) — set via `.font-display`.
**Body Font:** Inter (with system-ui, sans-serif fallback).
**Label/Mono Font:** JetBrains Mono (with ui-monospace fallback) — labels, indexes, ledger numerals.

**Character:** A financial console set in an old bank's reading room. Playfair supplies grandeur for the claims, Inter keeps paragraphs machine-clean, and the mono makes every number read like instrument readout. The pairing is intentionally three-part: one font for authority, one for reading, one for measurement.

### Hierarchy
- **Display** (700, `clamp(3rem, 6vw, 4.5rem)`, 1.04): the hero name only. Tighter tracking (`-0.03em`), often with the family's italic gradient word as the sole flourish.
- **Headline** (700, `clamp(2.25rem, 4vw, 3rem)`, 1.08): section titles (Experience, Education). One idea per line.
- **Title** (700, `clamp(1.25rem, 2vw, 1.875rem)`, 1.1): tile titles, company names, mini-stat keys.
- **Body** (400, 1rem–1.125rem, 1.625): all paragraphs and leads; max line length ~65ch; secondary paragraphs read in Muted Slate.
- **Label** (500, 0.75rem, 0.2em spacing, uppercase): mono section indexes (`01`, `02`, `03`), eyebrow tags, caption chips, the footer tagline.
- **Stat** (600, `clamp(1.75rem, 3vw, 2.5rem)`, 1): Metric Wall ledger numerals in JetBrains Mono. Hero-panel and About figures swap to Playfair Display per the Number Rule below.

### Named Rules
**The Ledger Rule.** Every business figure is a numeral — set either in JetBrains Mono (Metric Wall) or Playfair Display (hero panel, About chips) — at display size, gradient amber, never gray inline text. A rounded currency figure always leads the eye of its container.

**The Reading Rule.** Body paragraphs are never amber, never serif, and never bolded wholesale. Emphasis is reserved for bold foreground spans and the occasional inline figure.

## Layout

A single 1280px container (`max-w-7xl`) with a breathing page gutter: 16px mobile, 24px `sm`, 32px `lg`. Sections are 96px of vertical padding on mobile, 128px at `md` — the page is generous vertically and calm about it.

- **Hero:** a wide `1.4fr / 1fr` split — name and pitch left, the frosted proof panel right; full-viewport height.
- **Scannable two-columns:** About (`1fr / 1.6fr`) and Capabilities (`1fr / 1.8fr`) pair a sticky left heading rail (`lg:sticky lg:top-28`) with a flowing right column.
- **Bento:** Achievements use a gapless 3-column proof grid — one 2×2 featured tile, one 1×1 featured, four compact tiles — no empty cells on any breakpoint.
- **Ledger rows:** the Metric Wall is a dense table of divided rows (`220px numeral | label | detail`) between hairline rules.
- **Timeline:** a center rail at `md+` with alternating content columns and a `3px` amber dot with a 4px background ring; the rail shifts to the left edge with padded content mobile-first.
- **Spatial rhythm:** internal card padding 24–32px (`p-6`/`p-8`), grid gaps 16px mobile → 20px desktop, list spacing 12px. Section dividers are hairline rules (`border-white/[0.07]`).

## Elevation & Depth

Flat by default, with tonal layering and one audited exception. Depth is conveyed by surface contrast (translucent white overlays at 2–3% over the console slate), hairlines, and atmospheric light — not by stacking shadows. The only box shadow in general use is a `1px` hairline shadow on outline buttons.

The hero proof panel is the one frosted surface: `backdrop-blur-xl` at 3% white. The amber glow (`0 0 40px -10px` Signal Amber at 30%) is locked to two proof-point containers only: the hero metric panel and the Industry Expert icon. Soft blurred amber blobs (10–15% alpha) drift behind content as atmosphere; a radial vignette seals the hero so light falls off at the edges like a lit console.

### Shadow Vocabulary
- **Target Glow** (`0 0 40px -10px hsl(38 92% 50% / 0.3)`): the "locked on this proof" light. Two containers only.
- **Ambient Hover** (`0 1px 2px 0 rgb(0 0 0 / 0.05)`) + amber tint: outline/ghost interactions surface via border and fill shifts, not shadow.

### Named Rules
**The Target-Lock Rule.** Glow equals proof. If a glowing container does not enclose a verifiable figure or credential, remove the glow. Never more than one target locked at a time.

**The Flat-By-Default Rule.** Surfaces start flat. Hover reveals a hairline lift: borders warm to amber, fills step up 2%, icon wells brighten. Shadows do not accumulate with stacking; the page never composes depth from elevation.

## Shapes

A controlled radius language that reads "beveled instrument panel": cards and tiles at 16px (`rounded-2xl`), compact tiles and icon wells at 12px (`rounded-xl`/`rounded-lg`), and full pills (`rounded-full`) for every action, chip, and dot. Corners are generous enough to feel machined, tight enough to stay professional under a serif headline.

Distinctive recurring silhouettes: the monogram "NB" square (36px, 12px radius, amber fill), the 3px timeline dot with a background ring, 6px bullet points, and the softly bled amber blob (a blurred radial atmosphere, never a content shape). Featured tiles invert the quiet look: an amber gradient wash and `primary/20` border that marks them as the marquee proof. Borders are ultra-fine: white at 7–15% for structural lines, amber at 20–30% for featured emphasis.

## Components

### Buttons
- **Shape:** full pill; height 48px `lg`/40px default; padding `0 28px`; icon + label with 8px gap.
- **Primary:** Signal Amber fill, Console Slate text (contrast ~5.9:1); hover darkens the amber 10%; focus ring 3px amber at 50%. The only true call-to-action on the page (resume download).
- **Outline:** translucent console slate at 40%, white 15% hairline, near-white label; hover warms the fill to white/5. Secondary actions (scroll cues, secondary CTA).

### Chips
- **Style:** translucent console shell at 60%, white/10 hairline, JetBrains Mono 11px, uppercase with 0.05–0.25em tracking, Muted Slate text.
- **Use:** achievement tags, eyebrow captions, section indexes. Never colored filled — a chip is a label, not a signal.

### Cards / Tiles
- **Corner Style:** 16px.
- **Standard tile:** 2% white fill, white/8 hairline, 24–32px padding. Hover: border warms to amber at 30%, fill steps to 4%.
- **Featured tile:** amber gradient wash (`from-primary/15` to transparent), `primary/20` border, an amber icon well, blurred amber blob top-right that scales on hover. The signature proof block.
- **Icon well:** 40–44px, 12px radius, amber at 10% fill with amber icon; hover brightens to 20%. The recurring "instrument" glyph.

### Inputs / Fields
- No inputs exist on this surface today. If one appears, it inherits the hairline stroke, 10–16px radius, console fill, and amber focus ring declared in Colors.

### Navigation
- **Style:** fixed top bar. At rest: transparent, tall (20px). On scroll: frosted console slate at 80% (`backdrop-blur-xl`) with a hairline base, 12px tall.
- **Mark:** 36px amber "NB" monogram block (12px radius) with a playful `-6deg` tilt on hover.
- **Links:** Muted Slate, an amber hairline that grows left-to-right on hover; active hover lifts to near-white. Download Resume pill always right.

### Signature Pattern: The Ledger Row
Metric Wall rows: a mono gradient numeral left of a label/detail pair, hairline-divided, numeral nudging right on hover. This is the visual thesis of the whole system — numbers as instruments. See the sidecar for the rendered snippet.

## Do's and Don'ts

### Do:
- **Do** set every business figure as a large mono or serif-display numeral with the amber gradient — never as gray body-sized text.
- **Do** reserve Signal Amber for proof, live indicators, and primary actions; keep paragraphs in Muted Slate.
- **Do** use 16px card corners, 12px icon wells, and full pills only — never mixed or random radius values.
- **Do** keep body copy Paragraph width at ≤65ch and Muted Slate at rest.
- **Do** use tonal layering (2–4% white fills + hairlines) as the default depth mechanism.
- **Do** keep one gradient expression per screen — the amber numeral gradient — and nothing else.

### Don't:
- **Don't** add a second accent color, a second gradient style, or glow on more than one proof container (see The Target-Lock Rule).
- **Don't** render the skills marquee, eyebrow tags, or captions in amber fill — labels are mono on slate.
- **Don't** use Playfair for paragraphs or Inter for headline numerals; the three-font division is the system.
- **Don't** stack an amber glow with a blue/green glow or introduce pure black text; the room is always Console Slate.
- **Don't** break the hero on mobile, let the timeline rail overlap its content (content clears the rail via left padding), or leave a bento cell empty at any breakpoint.
- **Don't** fabricate testimonials, portraits, press quotes, or unreviewed figures; proof must stay verifiable (see PRODUCT.md).