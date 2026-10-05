# Progress Log

## Full UI Transformation Completed: Marcus Lorenzet Modern Aesthetic
- Design tokens defined in `app/globals.css`:
  - Canvas: Obsidian `#0d0c0a`
  - Cards: Deep warm surface `#141310` with `border-white/10`
  - Accents: Warm Champagne / Sand `#d0c5ab` and Amber Spotlight `#fcc438`
- Navigation:
  - Desktop: Pinned floating island dock (`.marcus-dock`) at bottom center with prominent warm champagne "ENROLL NOW ↗" action pill + minimal top status bar.
  - Mobile: Floating island action dock with direct Call, WhatsApp, and Enroll pills.
- All landing sections modernized:
  - Hero, Stats, Services with interactive age slider, 7-step Journey, Packages, Why Wenasa bento, Instructors, Reviews, Branch with dark map, Digital Resources, FAQ accordion, Gallery with lightbox, Blog reader, Apply form, and Footer with giant subtle watermark `WENASA · වෙනස`.
- All modals modernized:
  - PolicyModal, MockExamModal, RoadSignsModal, PackageFinderModal, StudentKitModal, StudentPortalModal, LicenceGuideModal, VideoLessonsModal.
- Verification:
  - `npm run build` static generation passed with 0 errors across all routes (`/`, `/en`, `/si`, `/ta`).
  - Playwright visual QA executed and screenshots captured for Desktop (1440px) and Mobile (390px).
