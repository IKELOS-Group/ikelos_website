# Three-practice mission redesign: review

Date: 2026-11-15. Base: `1e958dcc1d50a5d11aadb4e41e219e87bc65032b` (latest main rechecked before handoff). Branch: `redesign/three-practice-sigil`. Separate checkout; no prior work overwritten. No push, pull request, merge, or deployment.

## Changes

- Original Systems Sigil editorial design: dark atmosphere, larger typographic hierarchy, dimensional sigil geometry, restrained motion, light practice/evidence passages, responsive layouts.
- Mission-first hero: “The threat does not announce itself.” Explicit cyberwarfare R&D, OT/cyber-physical specialization, warfighter support and protection of critical civilian operations. GRVTY informed conviction and pacing only; no copied assets or layouts.
- Three exact practices, distinct outcomes, detailed scope and evidence boundaries. New cyber-effects page, renamed survivability route, legacy redirects preserved.
- Dedicated prime-contractor/government buyer journey, accountable workstreams, milestones, deliverables, technical evaluation and acquisition-fit questions without invented qualifications.
- PHOBETOR and VEILTRACE maturity separated from practice promises. Private research references and draft white papers remain unpublished. Existing firmware evidence and methodology interactions retained.
- Contextual, editable buyer/practice email-draft helper, including query-navigation updates without losing the typed introduction. Both email addresses, handling cautions, external-model caveats, OpenPGP key and fingerprint preserved.
- Current metadata/no-JavaScript text; unchanged hosting/Matrix contracts and dependencies.

## Verified

- Node 22.22.2 production build: passes. JS 85.46 kB gzip; CSS 17.6 kB gzip.
- Jest: **71 tests, 2 suites passed**. Includes legacy redirects/history/query/hash, routes, exact practices, metadata, contact context, model/PGP safety, firmware evidence, methodology, disclosures and modal behavior. Existing React testing-library act deprecation warning remains.
- Production Chromium: **56 route/width reviews**, covering 14 canonical/compatibility entries at **320, 390, 768, 1440px**. No horizontal overflow; one H1; matching title/Open Graph metadata; no axe WCAG 2 A/AA or 2.1 AA violations; no external resource requests.
- Production deep-link audit: **53 internal links and section destinations passed**. All content anchors present and clear the fixed header. Skip-link target is evaluated for existence rather than visual header clearance.
- Manual browser keyboard checks: mobile Menu opens, Close initially receives focus, Shift+Tab wraps to last link, Tab wraps back, Escape returns focus to Menu, selecting the effects practice closes the modal, removes inert, and focuses main content.
- Desktop homepage, practice directory, buyer page, products, mobile hero and survivability layout visually inspected. Screenshots supplied in the portable review package.
- `git diff --check`: clean. Package lock unchanged. Public key unchanged: SHA-256 `2d6b272c861bca73413947d60d5567382a883a1d8389c4013bd48255094bab5e`. Root/public/built redirect files match. No PDF or draft white paper in build.

## Verification limits

Responsive checks used width-controlled same-origin iframes in managed Chromium, not real mobile devices. Reduced-motion CSS was reviewed and includes a blanket motion/transition stop; actual OS reduced-motion browser emulation was unavailable. The portable Playwright review scripts retain an executable reduced-motion assertion but were not run in this environment. Production hosting, Safari/Firefox, screen-reader audit, external historical links, actual email delivery and procurement eligibility remain unverified. Automated accessibility results are not a certification.

The managed preview initially lacked SPA fallback; selecting the existing production-preview server through `npm run dev` resolved it. The local QA harness is generated only in `build/__qa/` and removed by a clean build. It is not a public site feature.
