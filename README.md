# IKELOS Group website

A responsive React website for system security analysis, vulnerability research, and engineering advisory, connecting system exploitability and operational consequences to engineering decisions. Uses React Router and Create React App; no backend, analytics, external fonts, or contact-form service.

## Development

Use Node.js 22.22.2 (pinned in `.nvmrc`) and npm. With nvm installed, run `nvm use`. Run `npm ci`, then `npm start` for local development.

TypeScript is pinned to 4.9.5 as a build dependency to satisfy `react-scripts@5.0.1`'s peer range, even though this site uses JavaScript. Commit both `package.json` and `package-lock.json` when changing dependencies, and verify with a clean `npm ci` before deployment.

- `npm test -- --watchAll=false`: component and navigation checks.
- `npm run build`: production output in `build/`.

Routes: `/`, `/services` (Capabilities), `/about` (Approach), `/contact`. Preserved destinations: `/services#research`, `/services#consulting`, `/about#walkthrough`, `/contact#encrypted-email`, `/about#stuxnet`, `/services#partner`, and `/contact#partnerships`. System security analysis adds `/services#analysis`.

## Content and design

Shared styling and responsive rules are in `src/index.css`. Page content is in `src/components`. The illustrative decision brief is in `Shared.js`; it appears only on Approach.

The supplied logo remains in `assets/`; its byte-identical copy in `src/assets/` is bundled by React. `Brand.js` frames the artwork, and CSS applies the warm monochrome treatment against the dark background without editing the source image. The artwork retains its supplied motto; do not repeat the motto as standalone text.

General inquiries use `info@ikelosgroup.com`. PGP-encrypted correspondence uses `secure_email@ikelosgroup.com`; visitors must encrypt messages in their own OpenPGP-capable mail app. The public key is served at `/keys/ikelos-secure-email.asc`, copied byte-for-byte from the supplied `.asc` file in `assets/`. Its primary fingerprint is `5AD6 A645 E697 72E5 AA7C 0277 DB44 9499 7C6F 00D3`. When rotating the key, update the published file, displayed fingerprint, and contact test together, and verify the built download. Publish only public keys. Do not add unverified specialties, credentials, clients, testimonials, or metrics.

## Research content and accessibility

The text-led homepage opens with “Understand how your system can be exploited—and what that means for operation.” One concise paragraph explains the top-down, target-agnostic approach, followed by one engagement button. Reading order: introduction → three services with concrete outputs and section links → compact reasons to engage → short hypothetical maritime preview → specialist delivery partnership. The footer supplies the closing contact path. The homepage has no research diagram, full decision brief, separate method preview, or generic outputs list.

Capabilities (`/services`) groups the practice into **System security analysis**, **Vulnerability research**, and **Engineering advisory**. Hardware and firmware, protocol and logic, cyber-physical implementation, physical-access conditions, and custom tooling are subordinate research topics. Deliverables stay within their relevant service. Specialist delivery partnership follows as an arrangement spanning the services; it is not a fourth service.

Approach (`/about`) contains the six-stage iterative workflow, evidence standards distinguishing observations, hypotheses, and validated findings, the full maritime walkthrough and decision brief, and a compact historical note. Only the maritime example and brief use the contrasting document treatment. The workflow explains the appropriate use and limits of STPA-Sec. Metadata describes the practice without foregrounding the historical example.

The maritime example is prominently labeled **Hypothetical scenario** on Home and at `/about#walkthrough`. It describes invalid GPS-derived input placing an ECDIS into an unexpected state, undermining crew confidence without root or administrator access. The system includes crew interpretation and reliance on the information. The illustrative decision brief separates objective, scenario consequence, evidence needed, and decisions about input handling, fault indication, recovery, and independent verification. No measured result, remediation outcome, or customer engagement is claimed. The deeper walkthrough explains D4M once and discusses degradation without asserting the other effects.

The always-visible **Historical note: Stuxnet** section at `/about#stuxnet` links to Symantec’s [W32.Stuxnet Dossier](https://nsarchive2.gwu.edu/NSAEBB/NSAEBB424/docs/Cyber-044.pdf). It connects industrial process knowledge, control behavior, operator visibility, and intended operational effects. The systems-engineering connection is explicitly retrospective; it does not attribute STPA-Sec or another development method to the creators. Neither example is evidence of an IKELOS engagement. Keep both non-replicable: no packet contents, protocol identifiers, equipment versions, injection procedures, exploit sequences, code, or process parameters. Do not add crashes, grounding, equipment damage, complete navigation denial, or invented outcomes to the maritime example.

Partnership positioning describes a **specialist delivery partner** that can own a defined research workstream, contributing system modeling, research planning, implementation investigation, validation, and evidence for the partner’s engineering and stakeholder deliverables. Responsibilities, interfaces, reporting, confidentiality, and IP arrangements are conversation topics, not standard terms or established relationships. Both engagement and partnership inquiries use `info@ikelosgroup.com`. Contact leads with its heading and `info@ikelosgroup.com`, followed by a short introduction. It publishes the confirmed initial workflow as a compact ordered list: introductory discussion → confidentiality arrangements as needed → objectives and access review → scoped proposal. Business inquiries and partnership prompts precede the retained encrypted-correspondence section.
Design tokens, responsive layouts, visible focus states, and reduced-motion rules live in `src/index.css`. Preserve the palette, system fonts, and logo treatment. Use plain descriptive headings, sentence-case sans-serif labels (at least 12px), navigation and utility links at least 14px, and primary body copy at 16px. Reserve monospace for workflow numerals and fingerprints. The homepage headline is at most 48px, approximately 34px on narrow screens, with an 820px maximum text column. Accent color is concentrated on the engagement button, active navigation, and focus indicators. Avoid decorative section numbers, link arrows, and repeated panels. Retain the existing route focus and hash scrolling behavior when adding sections. Company-only content applies to visible copy, metadata, public files, and bundled source. Do not add personnel profiles or identifiers.

For release review, inspect all four routes at mobile, tablet, and desktop widths (375, 768, and 1440px), plus 320px reflow, including keyboard navigation, all eight hash destinations, persistent example labels, workflow legibility, contrast, reduced motion, partnership paths, and contact links. Confirm the business email appears within the initial 375×812 Contact viewport. Capture updated screenshots and record the actual checks and any limitations. Compare the supplied, public, and built PGP key bytes and verify its primary fingerprint with an OpenPGP tool. Check both redirect files against the built copy; review public assets and bundles for prohibited personal material. Automated component checks do not replace visual review or live-host redirect checks.

The [2026-11-05 validation record](validation/design-review.txt) documents 27 passing component tests, the production build, 16 browser route/viewport checks, navigation and download verification, and the local screenshot locations and review limits.

## Static hosting

For Cloudflare Pages, use build command `npm run build` and output directory `build`. The `.nvmrc` selects the tested Node version. If the project has a `NODE_VERSION` environment override, set it to `22.22.2` as well.

Deploy the contents of `build/` to the existing static host when authorized. `public/_redirects` is copied into the build; it retains the Matrix discovery redirects before the SPA fallback. The root `_redirects` mirrors this configuration for existing host workflows. Keep both copies in sync.

A host that does not support `_redirects` needs equivalent redirect rules plus a fallback to `index.html` for client-side routes. Check direct requests and refreshes for every route, and the three Matrix discovery endpoints, after deployment. Hosting configuration and deployed behavior cannot be verified from this repository alone.
