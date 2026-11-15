# IKELOS Group — two research practices

React 18 / Create React App marketing site. Systems Sigil identity, locally served Inter and Orbitron, no backend, analytics, third-party font requests, or contact submission service.

This redesign is on `redesign/two-research-practices`. PHOBETOR now incorporates the firmware research material in the local checkout. No merge, push, or deployment is part of this work.

## Run locally

Use Node **22.22.2** (see `.nvmrc`). Dependencies and lockfile are unchanged.

```sh
npm ci
npm start
npm test -- --watchAll=false --runInBand
npm run build
node scripts/preview.cjs
```

The last command serves `build/` at `http://127.0.0.1:4175`. Set `PORT` to use another local port. Stop with Ctrl+C. The preview implements SPA fallback for local review; it does not proxy the production Matrix service.

## Structure

- `/`: shared applied-research premise → two distinct practice paths → PHOBETOR and VEILTRACE foundations → research process → illustrative evidence package → engagement.
- `/practices`: practice directory and research methods.
- `/practices/exquisite-access-development`: tailored access capabilities; FME is a method within this practice; buying trigger, scope, conditional deliverables, and PHOBETOR connection.
- `/practices/ot-behavior-validation-survivability`: critical functions, defined failure/degradation/adversarial conditions, behavior, recovery, bounded conclusions, and VEILTRACE/PHOBETOR connections.
- `/products`: research-product directory.
- `/products/phobetor`: IKELOS Group’s firmware research and system emulation platform, incorporating the capability overview, interactive evidence workflow, system model, applications, and deliverables. A dedicated funded-research section covers RTOS support and protocol-based vulnerability discovery as development work.
- `/products/veiltrace`: dynamic, threat-representative network generation, complex IT/OT modeling, and failure-state analysis. No performance, customer, integration, or validation claims.
- `/about`: engagement governance, retained interactive six-stage methodology, evidence policy, sample referral, historical reference.
- `/contact`: non-sensitive introduction, optional local email-draft preparation, scoping workflow, external model/API processing notice, partnerships, approved channels, and OpenPGP.
- `/capabilities/firmware-emulation`: compatibility redirect to `/products/phobetor`, preserving query parameters and section anchors with history replacement. All five existing capability anchors and the product’s `#research-basis` anchor remain. Navigation links directly to PHOBETOR.

`/services` remains a compatibility entry to the practice directory. Its `#analysis`, `#research`, `#consulting`, and `#partner` destinations remain useful, with links into the new hierarchy. All existing About/Contact anchors and `/#sample-deliverable` remain. `/#research-narrative` now identifies the practice introduction. `/#research-methodology` deliberately redirects in-app to `/about#research-methodology`.

Route changes retain title/description/Open Graph updates, scroll behavior, and main-content focus. Navigation highlights practice/product parents. The mobile modal retains focus containment, Escape dismissal, focus/scroll restoration, and inert cleanup. The hero has a 1.5-second decorative assembly and a keyboard-operable research-question selector; reduced motion removes the animation. SVG product diagrams and the hero model are labeled illustrative. The retained evidence package and research workbench explicitly distinguish fictional models and test plans from observations.

## Content and source boundaries

The supplied source PDF remains a private research reference in `assets/`. Its SHA-256 and claim mapping are recorded in `validation/research-practices/claims-review.txt`. It is not included in `public/`, build output, or the preview package. `/assets/*.pdf` is ignored as an extra guard against future accidental source commits.

Public copy uses PHOBETOR and IKELOS Group branding throughout. IKELOS operates the platform and funds research into RTOS support and protocol-based vulnerability discovery, as supplied in the product brief. The current firmware workflow covers ELF-based embedded Linux / x86-64 / AArch64, cross-binary analysis, and component execution. Full-system emulation requires target-specific engineering; the funded research programs are explicitly in development. RTOS and bare-metal remain outside the current embedded Linux workflow. Internal source records are retained for claim tracing. No vendor counts, benchmark figures, exclusive-authorship claims, or licensing terms are published. VEILTRACE uses only the user-supplied product description; scoping questions are not portrayed as results. Product access and deliverables are scoped through engagements, with no subscriptions or self-service purchase paths.

## Contact and hosting contracts

- Business contact: `info@ikelosgroup.com`.
- Encrypted correspondence: `secure_email@ikelosgroup.com`.
- Public key: `/keys/ikelos-secure-email.asc`; download filename `ikelos-secure-email.asc`.
- Fingerprint: `5AD6 A645 E697 72E5 AA7C 0277 DB44 9499 7C6F 00D3`.

Key bytes remain unchanged. Opening a mailto link does not encrypt mail. OpenPGP does not authorize controlled-data transmission. Visitors must establish handling requirements and an approved channel before sending classified information, CUI, export-controlled data, credentials, or proprietary technical material. AI-assisted research may use external models/APIs; model hosting, permitted transfers, and retention must be scoped. No all-local assurance is made.

The optional draft uses controlled React state and a mailto URI. Nothing is sent or stored by the website. The visitor reviews and sends through their mail application; the site reports only that a draft was requested. Plain email remains available without using the draft helper.

Cloudflare Pages contracts remain: build `npm run build`, output `build`, Node 22.22.2. Root, public, and built `_redirects` are identical. Three Matrix rules precede the SPA fallback. The no-JavaScript company contact is retained. No hosting registration or configuration change was made.

## Validation and preview

The prior full-site review and visual preview are in `validation/research-practices/`. PHOBETOR integration checks and updated captures are in `validation/phobetor/`. Earlier validation directories describe their respective versions and are historical.

`src/App.test.js` covers hierarchy, practice/product scope, routes, metadata, legacy anchors, methodology migration, context-preserving engagement, retained evidence interactions, contact/handling, and 404 recovery. `src/components/FirmwareEmulation.test.js` covers the integrated PHOBETOR workflow/evidence, keyboard interaction, metadata, canonical and legacy deep links, redirect history/query preservation, and engagement context.

`scripts/research-review.cjs` checks the production preview across all 11 routes at 320, 390, 768, and 1440px, axe WCAG checks, all internal links, 18 legacy hashes, keyboard navigation, menu focus/scroll restoration, retained research interactions, reduced motion, runtime/external-request errors, and exact key download. It uses external QA tooling without adding project dependencies. Set `PLAYWRIGHT_MODULE`, `CHROMIUM_EXECUTABLE`, `PREVIEW_URL`, and `REVIEW_OUTPUT` as needed. Browser runtime libraries may require an environment-specific `LD_LIBRARY_PATH`.

`scripts/phobetor-review.cjs` checks PHOBETOR and its related product/practice pages at the same four widths (20 views), public branding and metadata, axe WCAG checks, workflow keyboard interaction, 36 canonical/legacy deep links, the trailing-slash legacy URL, engagement context, and internal links. It saves desktop/mobile hero and funded-research captures alongside `validation/phobetor/results.json`. It uses the same QA environment variables.

These are local Chromium checks, not an accessibility certification. Live hosting, Safari/Firefox, external historical-source availability, and a screen-reader audit are outside the verified scope. Earlier owner review items are recorded with their respective historical reviews.
