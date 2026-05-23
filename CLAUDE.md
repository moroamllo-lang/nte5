# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This builder produces high-converting gaming theme prelanders for affiliate game installs in english. The goal is maximum game installations via visually distinctive, "anti-AI-slop" design.

## Project Structure

```
_lander_builder/
├── prelander/
│   ├── index.html       # Prelander markup
│   ├── css/style.css    # All styles (CSS variables for color system)
│   ├── js/script.js     # Animations (animejs) + interactivity
│   └── assets/          # Game images (1.png, 2.png, 3.png…)
├── variation.txt        # 3 A/B hook+CTA variants per project
├── hook_cta_frameworks.md  # Full copy strategy playbook (PAS/BAB/AIDA/Fear)
├── persona.md           # Windows PC gamer persona intelligence
├── node_modules/animejs/   # Animation library (already installed)
└── package.json
```

## Development Workflow

**Every new prelander requires two parallel streams before touching code:**

1. **Vibe Discovery** — answer the 4 aesthetic questions, synthesize a named vibe, pass the Freshness Check
2. **Copy Strategy** — select a framework from `hook_cta_frameworks.md` (PAS/BAB/AIDA/Fear), write headline using Value Prop + Hook formula, pass the Headline Litmus Test

Only after both streams complete: write `prelander/index.html`, `css/style.css`, `js/script.js`, then `variation.txt`.

## Skills
|  Skill | Purpose|
|---|---|
|  ui-ux-pro-max-skill |  inteligente ui/ux system design | 
| gsap-skills  |  advanced scroll and animation |  

## MCP
| mcp server | Purpose |
|---|---|
|21st.dev| pull beautiful components from 21st.dev if needed |


## Animations
use `framer-motion` (already installed) Import from the bundle
Use `animejs` (v4, already in `node_modules`). Import from the bundle:


```js
import anime from '../node_modules/animejs/dist/bundles/anime.esm.js';
```

Or use the UMD build via a `<script>` tag pointing to `node_modules/animejs/dist/bundles/anime.umd.min.js`.

Animation vocabulary to follow: fade-in, blur-in, slide-in, scale-in, stagger (entrance); marquee, beam, pulse, float, rotate (continuous); hover-lift, hover-glow, hover-reveal, click-ripple (interactive).
## Design guide line
- gaming theme
- use gaming abstract art vector element every where
- use heavy animation that attract attention on cta button

## Copy Strategy Rules

- Persona: Windows PC gamer, 16–35, FOMO-driven, skeptical of F2P. Full profile in `persona.md`.
- Framework selection guide is in `hook_cta_frameworks.md` Part 5.
- Headline must pass the Litmus Test: visitor sees ONLY the headline → knows exactly what's being offered.
- CTA must be a narrative continuation of the headline, never "Learn More" or "Sign Up".

## Vibe Discovery — The 4 Questions

Before designing, answer all four:

1. **Real-world reference** — What physical place, era, or material does this feel like?
2. **Emotional temperature** — What emotion does entering the page produce?
3. **Two colliding influences** — What two unexpected worlds are crashing together? (Both must be visible in the final design.)
4. **Wildcard** — One element that "doesn't fit" but makes it memorable.

Name the vibe (unnamed vibes become generic). Derive colors fresh from Q1 — no hex code memory across projects.

## Anti-AI-Slop Rules

**Fonts to avoid:** Inter, Roboto, Open Sans, Lato  
**Use instead:** Newsreader, Playfair Display, Clash Display, Outfit, Manrope, Satoshi

**Icons to avoid:** Lucide  
**Use instead:** Iconify Solar, Heroicons, Phosphor

**Colors to avoid:** Purple gradients, Stripe palette, generic blue-to-purple  
**Use instead:** Derive from the Q1 real-world reference

**Font rotation:** Cannot reuse the same display font across different prelander projects.

## Output Checklist

**Visual Distinction:**
- [ ] No generic purple gradients
- [ ] Non-default icon set
- [ ] Distinctive font pairing (not on the avoid list)
- [ ] At least one "memorable" element from the wildcard
- [ ] CSS variables for color system

**Technical:**
- [ ] Mobile responsive (design at 375px first)
- [ ] All images loading from `prelander/assets/`
- [ ] Animations use framer-motion and/or animejs
- [ ] Accessible contrast
- [ ] Fast initial load

**Copy:**
- [ ] "FREE" or "$0" appears within first 5 words or first visual element
- [ ] Headline passes Litmus Test
- [ ] CTA uses an action verb (Download, Install, Get, Claim, Play)
- [ ] Trust micro-copy beneath CTA button ("No credit card • No sign-up • Virus-free")
- [ ] `variation.txt` contains 3 A/B hook+CTA variants with rationale

## Persona Quick Reference

- **#1 conversion trigger:** "FREE" above the fold
- **#2:** Limited-time urgency
- **#3:** Social proof numbers (install count + star rating)
- **Voice:** Fellow gamer energy, not corporate. Grade 6–8 readability. Short sentences, short paragraphs (max 3 lines on mobile).
- **Avoid:** auto-playing audio, intrusive pop-ups before page loads, forced email capture before download
