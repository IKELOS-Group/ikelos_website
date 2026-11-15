# IKELOS Group — three research practices

React 18 / Create React App marketing site. Mission-first Systems Sigil redesign, locally served Inter and Orbitron, no backend, analytics, third-party font requests, or contact submission service.

## Run and verify

Use Node **22.22.2** (`.nvmrc`). Dependency versions and lockfile are unchanged.

```sh
npm ci
npm start
npm test -- --watchAll=false --runInBand
npm run build
node scripts/preview.cjs
```

The production preview uses `http://127.0.0.1:4175` and SPA fallback. `npm run dev` serves the same production build on port 4173 for managed preview compatibility. It does not compile source; rebuild before reviewing. Neither preview proxies the production Matrix service.

## Information architecture

- `/`: explicit cyberwarfare R&D, warfighter and civilian-critical mission, three practices, prime/government paths, research foundations, illustrative evidence, engagement.
- `/practices`: practice directory, outcome comparison, and methods.
- `/practices/exquisite-access-development`: authorized research/FME, system understanding, access feasibility, bounded demonstrations.
- `/practices/systems-behavior-validation-survivability-testing`: critical functions, defined conditions, behavior, recovery, and retest criteria.
- `/practices/cyber-effects-development-validation`: specified effect, authorized laboratory development, controlled demonstration, measured limits.
- `/engagements`: dedicated prime contractor partnership and government evaluation journeys, scope, deliverables, evidence, and acquisition-fit questions.
- `/products`: PHOBETOR and VEILTRACE as research foundations rather than practices.
- `/products/phobetor`: bounded embedded Linux research basis, workflow, target-specific system engineering, proposed extensions, evidence and limitations.
- `/products/veiltrace`: demonstrated Ludus configuration feasibility versus proposed scale, hybrid OT/hardware, model-confidence and PHOBETOR-integration research.
- `/about`: governance, written authority, safe test boundaries, interactive six-stage methodology, evidence policy, historical reference.
- `/contact`: non-sensitive introduction, practice and buyer context, local email-draft helper, handling and external-model notice, partnerships and OpenPGP.

## Compatibility and accessibility

`/services` retains all four historic anchors. `/capabilities/firmware-emulation` redirects with history replacement to PHOBETOR while preserving query strings and anchors. The prior `/practices/ot-behavior-validation-survivability` similarly redirects to the exact current practice name. Trailing-slash variants work. All original About/Contact and firmware anchors remain. `/#research-methodology` continues to `/about#research-methodology`; `/#research-narrative` and `/#sample-deliverable` remain useful.

Route changes retain title/description/Open Graph updates, scroll behavior, and main-content focus. Navigation highlights parent sections. The mobile dialog contains keyboard focus, closes with Escape, restores focus/scroll, and cleans up inert content. The three-question research selector uses pressed-state buttons and a polite result announcement. Decorative hero movement lasts 1.4 seconds; reduced motion removes all animation and transitions.

## Content boundaries

The three exact practices share operational technology and complex cyber-physical systems as their domain. The public positioning explicitly supports the warfighter and protects critical civilian operations. Confidence comes from specialist scope and accountable research, not invented rankings, customers, registrations, contract vehicles, clearances, certifications, benchmarks, or operational deployments.

PHOBETOR's underlying research supports a bounded ELF-based embedded Linux / x86-64 / AArch64 workflow and component execution, not universal full-system emulation. RTOS and protocol-discovery extensions remain research directions. No ownership, release rights, production readiness, or new public paper link is asserted. Source traceability remains in historical validation records; private reference PDFs are not public build inputs.

VEILTRACE's initial lab feasibility concerns generated functional Ludus configurations. It does not establish operational realism, validated OT behavior, or arbitrary-environment readiness. Broader scale, hybrid environments, confidence, and integration remain proposed work. No draft white paper is published.

The evidence package is fictional and contains no test results. Access, implementation behavior, system effects, and operational consequences have separate evidence requirements. Controlled laboratory validation does not establish live operational effectiveness.

## Contact and hosting contracts

- Business: `info@ikelosgroup.com`.
- Encrypted correspondence: `secure_email@ikelosgroup.com`.
- Key: `/keys/ikelos-secure-email.asc`, unchanged bytes.
- Fingerprint: `5AD6 A645 E697 72E5 AA7C 0277 DB44 9499 7C6F 00D3`.

Ordinary email is for a high-level, non-sensitive introduction. Establish handling requirements and approved channels before classified information, CUI, export-controlled data, credentials, or proprietary technical material. Opening mailto does not encrypt; OpenPGP does not authorize controlled-data transmission. AI-assisted research may use external models/APIs; hosting, permitted transfers, inputs, and retention require scoping. No all-local assurance is made.

The optional introduction helper creates a mailto draft using controlled local React state. Nothing is submitted or stored by the website. The visitor reviews and sends in their mail application. Buyer and practice context are preselected from links and remain editable.

Cloudflare Pages contract is unchanged: `npm run build`, output `build`, Node 22.22.2. Root/public/built `_redirects` preserve three Matrix rules before SPA fallback. The no-JavaScript contact remains. No production configuration, push, PR, or deployment is part of this branch.

## Validation

See `validation/three-practice-redesign/REVIEW.md` for exact results and limitations, with machine-readable audits alongside it. Production screenshots accompany the portable review package. Prior validation folders are historical.

The 71 unit/integration tests cover the three practices, buyer contexts, metadata, legacy redirects and deep links, contact safety, product maturity, evidence and methodology interactions, and modal keyboard behavior. `scripts/research-review.cjs` and `scripts/phobetor-review.cjs` remain portable Playwright review entry points; browser/module locations are set through environment variables.

In a managed preview environment, `node scripts/managed-review-harness.cjs` generates **local-only** files under `build/__qa/` for browser review at 320, 390, 768, and 1440px. Its `?audit=1` and `?links=1` modes produce inspectable JSON; `?width=390&route=/practices` provides a width-controlled iframe for visual and keyboard checks. This is a viewport-layout test, not device emulation. Rebuild before release to remove `build/__qa/`; the harness is never copied into `public/`.

Local browser checks are not an accessibility certification. Production hosting, Safari/Firefox, real mobile devices, screen-reader testing, and external historical-source availability require separate verification.
