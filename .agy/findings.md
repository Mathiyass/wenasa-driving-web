# Findings & Visual Architecture Analysis

## Reference Site: Marcus Lorenzet (https://www.marcuslorenzet.com/)
- **Visual Aesthetic:** Cinematic dark luxury editorial portfolio / digital studio.
- **Palette Tokens:**
  - Background: Deep obsidian/carbon `#0d0c0a` with secondary card backing `#141310` and `#1a1916`.
  - Subtle Warm Ambient Glow: Radial amber/champagne aura (`#fcc438` at 6% opacity) centered behind hero elements.
  - Accent / Contrast Text: Warm parchment/champagne cream `#d0c5ab` and bold gold `#fcc438`.
  - Body Text: Muted stone grey `#9e988a` and warm silver `#c7c2b6`.
  - Borders: Ultra-refined hairline borders `rgba(255, 255, 255, 0.08)` and `rgba(208, 197, 171, 0.15)`.
- **Typography:**
  - Giant sans-serif display typography with tight letter tracking (`tracking-tighter` / `tracking-tight`).
  - Section headers accented with editorial bracket markers: `[ WHAT WE OFFER ]`, `[ CASE STUDIES ]`, `[ 01 · COURSES ]`.
  - Numbered indices (`01`, `02`, `03`) to structure cards and timeline phases.
- **Navigation Innovation:**
  - Pinned floating dock bar at bottom center (`fixed bottom-6 left-1/2 -translate-x-1/2 z-50`).
  - Ultra-clear frosted glass container (`bg-[#151412]/85 backdrop-blur-2xl border border-white/10 rounded-full px-5 py-2.5 shadow-2xl`).
  - Integrated pill CTA (`LET'S TALK` / `REGISTER NOW`) with high-contrast warm sand button.
  - Top header is minimalist: Left brand mark, right live status + quick action.

## Wenasa Driving School Current State
- Built with Next.js 15.5.27, React 19, Tailwind CSS v4, Motion v12, Lucide icons.
- Complete content in 3 locales: English (`en`), Sinhala (`si`), Tamil (`ta`).
- Baseline build is passing (`0 errors`).
- Currently has a standard corporate slate theme (`#070b14` / `#0d1527` with emerald accents).
- Needs cohesive transformation into the obsidian/carbon + warm champagne/gold luxury editorial language.
