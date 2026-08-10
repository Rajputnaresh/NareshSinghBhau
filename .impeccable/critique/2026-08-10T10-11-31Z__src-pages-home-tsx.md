---
target: Home page (src/pages/Home.tsx)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
p2_count: 3
timestamp: 2026-08-10T10-11-31Z
slug: src-pages-home-tsx
---
# Design Critique — Home (`src/pages/Home.tsx`)

**Method: dual-agent (A: design review · B: detector + browser evidence).**
A read source/design truth (no browser in its shard). B ran the bundled detector on `Home.tsx` and the full `src/` tree (exit 2, 12 findings) and rendered the live Vite app in headless Chromium at 1440/1024/390px with computed-style contrast and overflow reads.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live availability chip + scroll-state nav, but no "you are here" marker and downloads give no in-page confirmation |
| 2 | Match System / Real World | 3 | Sales-native language; but "PCR"/"WRPS" unexplained and the metric-panel arrow implies a destination that isn't there |
| 3 | User Control and Freedom | 3 | Free scroll, smooth jumps, back-to-top; nothing traps the user |
| 4 | Consistency and Standards | 2 | Arbitrary section numbering (01/02/03 on three of ten sections), ₹96L vs ₹94 Lakh drift, one icon affordance that lies |
| 5 | Error Prevention | 3 | No inputs; remaining risks are the dead Insight Alpha affordance + unverifiable PDF path |
| 6 | Recognition Rather Than Recall | 4 | Everything labeled and visible; contact repeated at both ends relieves recall |
| 7 | Flexibility and Efficiency | n/a | Persuade single-page — one linear path is the design |
| 8 | Aesthetic and Minimalist | 2 | Elegant but not minimal: five numbers render four times, amber spreads past signal into atmosphere and icon wells |
| 9 | Error Recovery | 3 | Read-only surface, no real failure paths; the one recoverable moment (dead arrow) gives zero feedback |
| 10 | Help and Documentation | n/a | The page is the artifact; no task needs a help route |
| **Total** | | **23 / 32** | **72% — Good** (right at the Acceptable boundary; held up by structure, held back by its own color discipline) |

## Design Specificity Verdict

**Content-specific, scaffold-generic — and the system leaks its own discipline.**

The substance is unmistakably authored for this product: "₹3Cr+ monthly regional revenue", "Youngest RM — Jaipur", "BUILT TO CONVERT · LIKE THE DEALS I CLOSE", "Proof, not promises." The three-font division is executed consistently and the mono-ledger treatment of numerals is a genuine signature. Meaning-wise this is NOT category-interchangeable.

But the scaffolding is a premium landing template (availability chip → CTAs + proof panel → skills marquee → metric wall → alternating center-rail timeline → bento → numbered list → education → CTA footer). The sharper failure is internal: the "Signal Room" concept requires amber to be scarce and semantic, yet the composer deploys amber as atmosphere (animated hero/footer/industry-band blobs), surface tint on every generic card, and amber marquee separators — against the system's own One Signal Rule, Noise Rule, and "don't render the marquee in amber" bullet. When every section glows, nothing is signaled.

**Deterministic scan:** detector exit 2 — 12 findings. On Home.tsx: 4× `design-system-font-size` (11px@185/583, 15px@546, 2.6rem@334). Tree-wide: unreachable `App.css` `#888`, unimported shadcn `calendar.tsx` 0.8rem×2, `overused-font` Inter warnings, gradient-amber color + 4px scrollbar radius in `index.css`. After excluding documented component specs (DESIGN.md specs 11px mono chips and 15px buttons) and dead code, the genuine residual is **1 off-ramp figure (2.6rem hero stat > 2.5rem stat max)** plus a P3 contrast nuance.

**Browser evidence:** 0 console/page errors at 1440/1024/390; no horizontal overflow anywhere (marquee + `overflow-x-hidden` work); muted-slate small copy 6.45:1 (AA pass, AAA miss, deliberate tone); amber 9.00:1 and foreground 18.39:1 (AAA); `.glow-amber` count exactly 2 (the two sanctioned proof containers); 14 `.text-gradient` numerals (one gradient type only); marquee confirmed duplicated-but-`aria-hidden`. There is no browser overlay tab in this session; the evidence above is from a headless render, not a live [Human] overlay.

## Overall Impression

This is a genuinely authored, well-voiced persuasion surface — "Proof, not promises." is a real thesis, the ledger numerals are a real motif, and the reduced-motion implementation is ahead of most portfolios. The single biggest opportunity: the page is a "Signal Room" that currently signals everything at once, and its two load-bearing proof claims (deal size, Insight Alpha credential) disagree with themselves or lead nowhere. Pull the amber back to the two sanctioned instruments, let one module own each number, and make the one credential verifiable — and the concept finally lands.

## What's Working

1. **The verbal system is authored, not pasted.** Sales-native, specific, confident headlines and sourced figures (scope, retention, promotion trajectory) — evidence-over-adjectives, exactly what a hiring founder needs to see.
2. **Typography discipline holds where it's expensive.** Three-font division (Playfair authority / Inter reading / JetBrains Mono measurement) is consistent; body never goes amber or serif; numbers are always gradient display figures; line lengths capped.
3. **Motion restraint + reduced motion is exemplary.** Every animation gate-checks `useReducedMotion()` and a global `prefers-reduced-motion` block collapses all CSS motion — verified in live render with zero errors.

## Priority Issues

**[P1] What:** The metric-panel footer "Insight Alpha — Industry Expert" carries a `BadgeCheck` AND an `ArrowUpRight` but is not a link — no href, no onClick (Home.tsx:341-345). **Why:** The arrow is a strong open-a-destination affordance on the page's single most valuable verifiable credential; a founder/recruiter verifies at exactly this moment, gets nothing, and the next click feels riskier. **Fix:** Link it to the verifiable Insight Alpha/LinkedIn profile with `target=_blank rel=noopener`; if no URL exists, drop the arrow and render as a plain caption chip. **Command:** `harden`

**[P1] What:** Amber exceeds the system's own signal rules — floating atmosphere blobs (hero ×2, industry band, footer radial), `from-primary/10` gradient band, amber icon wells on every generic card, amber marquee separators (`text-primary/60`, explicitly disallowed by DESIGN.md), and a featured-tile blob that scales on hover. **Why:** The One Signal/Noise rules define the whole concept; when the amber CTA competes with ~a dozen amber objects per viewport, "signal" reads as decoration, CTA salience falls, and the page converges on the generic dark-amber template the North Star exists to avoid. **Fix:** reserve amber for proof + signals: neutralize the atmospheric blobs, make marquee separators slate, slate the generic icon wells, drop the hover-scale blob, keep `glow-amber` locked to the two sanctioned containers, keep the gradient numerals. **Command:** `quieter`

**[P2] What:** The same proof renders four times — `₹3Cr+` (hero panel, About paragraph, About chip, MetricWall), `18%+` (×3), `65%+` (×3), `6,000+` (×2) — and figures disagree: **`₹96 Lakh` deal** (experience bullet) vs **`₹96L`** (MetricWall) vs **`₹94 Lakh`** (achievements tile), plus "1.3× PCR Champion" title vs "2× branch revenue growth" description. **Why:** A ledger that repeats itself reads padded, and figure drift is precisely what an auditing founder cross-checks — it breaks "Evidence over adjectives." **Fix:** let one module own each figure; reconcile the deal size to one number site-wide; fix the PCR title/desc conflict or rename the tile. **Command:** `distill`

**[P2] What:** Section numbering is decorative, not systematic — `01 Profile / 02 Track Record / 03 Foundation` while Experience, Capabilities, and IndustryExpert carry no index; and dead code `i % 2 === 1 ? '' : ''` at Home.tsx:515. **Why:** The instrument-panel metaphor depends on consistent instrumentation; arbitrary serials read as ornament and a meticulous reviewer catches the no-op. **Fix:** number every narrative section sequentially or drop the indexes entirely; remove the no-op ternary. **Command:** `polish`

**[P2/P3] What:** Below `lg` the nav collapses to brand + Resume pill only — no section anchors, no mobile jump, and the resume action sits in the top bar outside the one-handed thumb zone while the footer CTA is a full page away. **Why:** hiring evaluations often happen on mobile in seconds; a mid-scroll interruption strands the visitor with no jump and no thumb-reachable action. **Fix:** add a mobile sheet for the 4 anchors and/or a sticky bottom action bar (Resume / top). Keep touch targets ≥44px. **Command:** `layout`

## Persona Red Flags

**Jordan (first-time evaluator, non-sales ops leader):** hits "1.3× PCR Champion" in the biggest proof cell — "PCR" is never expanded and the description argues "2×", two competing figures at the trust moment; taps the Insight Alpha row's ArrowUpRight and gets a dead click; on mobile no section nav, so getting to Contact means scrolling ~9 sections.

**Riley (skeptical founder / hiring VP who validates before outreach):** cross-audits the numbers funnel and finds the ₹96/₹94 deal mismatch, PCR 1.3× vs 2×, and undefined WRPS — one self-contradiction seeds an audit of everything; the Insight Alpha credential has no verification path (and the arrow lies), so a "selected to advise" claim reads as puffery exactly to the person who needs to verify it; keyboard users get raw `<button>`s with no focus ring styling in the console theme.

**Casey (distracted, one-handed mobile user):** the resume action is either the top bar (thumb-unreachable after ~200px) or the footer (full-page scroll) — never in the bottom thumb zone; interrupted mid-scroll, there's no sticky action to resume against, and the only bottom-of-screen control is back-to-top, which moves her away from conversion.

## Minor Observations

- Hero H1 is the name; the earning claim sits in a body paragraph — consider a one-line display claim in the hero (persuade-first read).
- Two CTAs say "Resume" vs "Download Resume" for the same destination; standardize.
- "BUILT TO CONVERT · LIKE THE DEALS I CLOSE" is a great finisher but sits far from the CTA; it lands as a transition line right before Download.
- Education ("B.E. + 10th/12th") sags the closing cadence after the IndustryExpert band — template-bottom feel for an 8-year revenue leader.
- Hero contact strip repeats verbatim in the footer; fine, but each set retains amber icons that count against the One Signal budget.
- `2.6rem` hero stat exceeds the 2.5rem stat ramp (the one genuine detector hit).
- Muted-slate small copy is 6.45:1 — AA-passing, AAA-missing by intent.

## Questions to Consider

1. **Are you selling a résumé or a signal?** The page's largest object is a static stat grid and its only live "instrument" is a decorative marquee — why doesn't the ledger itself react to the visitor?
2. **What would it cost to make one proof look like the only proof?** Would a single ledger, cross-referenced, signal more rigor than a wall of repeated figures?
3. **Does a credential that leads nowhere deserve to be the tallest object in the page's only frosted panel?**
