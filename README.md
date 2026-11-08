# IKELOS Group — Systems Sigil

A static React 18 website for systems security engineering and advanced vulnerability research. React Router and Create React App remain in place. No backend, analytics, external font requests, or contact-form service.

## Develop and build

Use Node.js **22.22.2**, pinned in `.nvmrc`:

```sh
nvm use
npm ci
npm start
npm test -- --watchAll=false --runInBand
npm run build
```

Production output is `build/`. TypeScript 4.9.5 remains a build dependency for the `react-scripts@5` peer range; application code is JavaScript. No dependencies were added for the redesign.

This work is on `brand/systems-sigil-redesign`. Validation was performed locally; no merge or deployment has been performed.

## Identity and presentation

The supplied Systems Sigil board supersedes the previous cosmetic restrictions. Source artwork remains unchanged in the repository. Original SVG paths reconstruct its segmented hexagonal emblem, central nodes, diagonal vector, and geometric lettering. These are an interpretation of the raster board, not an extracted original vector master.

- `public/brand/wordmark-{color,light,dark}.svg`: horizontal identity.
- `public/brand/emblem-{color,light,dark}.svg`: standalone identity.
- `public/favicon.svg` and `public/brand/icon-{32,180,192,512}.png`: favicon, Apple touch icon, and manifest assets.
- `src/assets/systems-sigil.svg`: inline animation copy of the color emblem.
- `public/fonts/`: locally served Inter and Orbitron variable WOFF2 fonts, CSS, and original SIL Open Font License notices. Font files were retrieved from Fontsource's jsDelivr distribution on 2026-11-05; licenses from Google Fonts' `ofl/inter/OFL.txt` and `ofl/orbitron/OFL.txt`. No font provider receives visitor requests. Font hashes are in the artifact audit.

Steel Doctrine tokens in `src/index.css`: Deep Slate `#10161D`, Steel Blue Gray `#22313F`, Hardened Steel `#405463`, Mist Gray `#A6B5C3`, Cold White `#E6EDF3`, Signal Cyan `#5D9FB0`. Orbitron supplies display headings; Inter supplies body and controls, with system fallbacks and `font-display: swap`.

`Hero.js` combines dimensional SVG geometry, perspective, architectural lines, and gradients. The approximately three-second intro progressively reveals structure, connections, nodes, and vector. The headline, navigation, and actions are immediately usable. Skip animation settles the composition; reduced motion starts settled. No WebGL or animation framework is required.

`ResearchNarrative.js` establishes the buying case before the methodology: deployment/acceptance, integration/change, vulnerability/consequence, and remediation/verification. The architecture-to-implementation positioning explains how IKELOS complements engineering, security, and test teams. This replaces the earlier scroll-driven narrative diagram; scrolling never overrides workbench selection. Section 02 is an interactive systems-engineering research workbench implemented in `SystemsModel.js`, `researchMethodology.js`, and `ResearchMethodology.css`. Its six directly selectable stages replace the old five-tab interface:

1. Mission & Consequence
2. System Modeling
3. Causal & Attack Analysis
4. Technical Investigation
5. Exploit Validation
6. Engineering Resolution

One explicitly fictional thermal-control module retains its geometry as visitors explore mission losses, a functional control structure, insecure control actions, a candidate causal scenario, targeted implementation questions, evidence requirements, and conditional engineering decisions. Operator authority, maintenance configuration, a controller/process model, pump actuation, the thermal process, and temperature/flow feedback are distinct. Selectable components expose assumptions, technical questions, and evidence to seek. The evidence chain separates access, implementation effects, control effects, and operational consequences. No experimental findings or successful exploit are simulated.

The stage rail uses native buttons with `aria-current="step"`, ordinary Tab/Enter/Space access, and additional arrow/Home/End navigation. Components use pressed-state buttons with an associated inspector. The resolution stage can explicitly return to modeling; any stage can be reopened. Scrolling never changes the selected stage. Responsive diagrams preserve control/feedback topology; reduced motion removes transitions. STPA-Sec informs the analysis but these six stages are IKELOS's broader workflow, not official STPA-Sec steps. Hypotheses, modeled consequences, experimental evidence, and proposed controls remain explicitly distinguished.

Terminology was checked against the MIT-hosted [STPA-Sec systems analysis paper](https://web.mit.edu/smadnick/www/wp/2018-12.pdf). The thermal-control scenario and trace identifiers are original illustrative material, not claims from that paper or a customer engagement.

## Pages and content contracts

Routes are `/`, `/services`, `/about`, `/contact`, and `/capabilities/firmware-emulation`, with a meaningful in-app 404. All eight destinations remain available:

- `/services#analysis`, `#research`, `#consulting`, `#partner`
- `/about#walkthrough`, `#stuxnet`
- `/contact#partnerships`, `#encrypted-email`

Home leads with the concrete value proposition, four buying triggers, and the architecture-to-implementation differentiator. The methodology workbench is followed by decision-focused engagement pathways, an inspectable sample evidence package, established company details, and a technical-scoping invitation. `BuyerPositioning.css` extends the original palette and responsive layout.

The maritime example is now the representative NAV-01 evidence package at `/#sample-deliverable`, implemented in `Shared.js`. Eight native, keyboard-accessible disclosures expose the assumption register, hypothesis status, proposed test conditions, evidence requirements, limitations, modeled consequences, conditional decision, and retest criteria. It is labeled illustrative once; individual records carry evidence status. There are no fabricated findings or measured results. This sample demonstrates deliverable structure, not prior execution. No publishable research, customer history, or organizational credentials were supplied; only the existing company name and organizational contact channels appear. Add future research or credentials only when verified and approved for publication.

Capabilities retains conceptual diagrams, technical methods, and scoped outputs, and adds “Engage when” and “Decision supported” to every service and research discipline. “Research tooling and test platforms” replaces the ambiguous capability-development label. Foreign materiel exploitation and trusted execution environment analysis are omitted pending support for those specific public claims. Engineering advisory and partnership retain their anchors.

Approach now explains engagement governance: scope and decision ownership, authorization/access/handling, safe test boundaries, reporting and scope review, stakeholder decisions, retesting, and handover. The evidence policy is centralized at `/about#evidence-policy`; the six-stage technical workflow remains on the homepage. `/about#walkthrough` leads to the inspectable sample. `/about#stuxnet` remains a secondary collapsed historical-reading disclosure with the existing source and a clear distinction from IKELOS work or attribution of STPA-Sec to the creators. Do not add equipment versions, exploit procedures, customers, credentials, or unsupported specialties.

Contact leads with the organizational business email and the existing four-step introductory workflow, followed by partnership prompts and encrypted correspondence. Keep all company-only privacy requirements: no personnel biographies, personal contact details, individual career histories, testimonials, or Person metadata in rendered content or published assets. Third-party font copyright notices are retained as required by their licenses.

## Contact and hosting contracts

General inquiries: `info@ikelosgroup.com`. Encrypted correspondence: `secure_email@ikelosgroup.com`. Visitors must import the public key into an OpenPGP-capable mail application and enable encryption themselves. Opening a mailto link does not encrypt a message.

Contact asks for a non-sensitive introduction. The explicit handling notice prohibits sending classified information, CUI, export-controlled data, credentials, or proprietary technical material before handling requirements and an approved channel are established. It makes clear that OpenPGP alone does not authorize transmission of controlled information. No clearance, accreditation, contracting eligibility, or secure-facility claim is implied.

Public-key URL and download filename: `/keys/ikelos-secure-email.asc`, `ikelos-secure-email.asc`. Primary fingerprint: `5AD6 A645 E697 72E5 AA7C 0277 DB44 9499 7C6F 00D3`. Preserve the supplied public key byte-for-byte; verify the source, public, and built files and fingerprint when changing it. Never publish private key material.

Cloudflare Pages: build command `npm run build`, output `build`, Node `22.22.2`. Root `_redirects` and `public/_redirects` must remain identical. Matrix server/client/support redirects precede the SPA fallback. Keep the no-JavaScript company-contact fallback in `public/index.html`.

Navigation becomes solid after the top sentinel leaves view. The mobile modal contains focus, closes on Escape, returns focus and scroll when dismissed, and releases the page before route focus. Route changes update title, description, and Open Graph text and focus the main content. Hash jumps retain sticky-header clearance. Observers, media-query listeners, and intro timers are cleaned up; there is no continuous animation loop.

## Local validation and review

The latest results and limitations are in [validation/buyer-positioning/review.txt](validation/buyer-positioning/review.txt). [validation/buyer-positioning/](validation/buyer-positioning/) contains the four-route/four-width screenshots, initial views, buying case, collapsed/expanded sample, keyboard focus, menu, and evidence-policy captures; its `methodology/` directory contains all six workbench states. The earlier [Systems Sigil review](validation/design-review.txt) and [methodology review](validation/research-methodology/review.txt) remain historical records; current captures supersede their changed page content.

The browser script is `scripts/browser-review.cjs`. It uses the environment's existing Playwright/Chromium and the dependency tree's axe-core without adding project dependencies. To use another environment, provide `PLAYWRIGHT_MODULE` and `CHROMIUM_EXECUTABLE`, and optionally `PREVIEW_URL` and `REVIEW_OUTPUT`. Run a static SPA preview of `build/` first. `--interactions` checks keyboard, all eight legacy hashes plus new destinations, sample disclosures, menu, and downloads; `--icons` rasterizes the SVG favicon into the public icon assets and should be followed by a build.

Browser checks cover Chromium only. Live hosting, Matrix responses on the deployed host, and Safari/Firefox behavior remain unverified. Local checks are not an accessibility certification or deployment authorization.


For the methodology feature, run `scripts/methodology-review.cjs` with the same browser environment variables and local production preview described above. It checks all six stages at 320, 375, 768, and 1440 pixels, component/evidence inspection, keyboard navigation, iteration, stable geometry, annotations, reduced motion, runtime errors, and axe accessibility results. Dependency inputs did not change; the existing installation was reused.


## Firmware vulnerability research and system emulation

The capability page at `/capabilities/firmware-emulation` extends the existing identity and service hierarchy. `FirmwareEmulation.js` composes eight editorial sections with original conceptual artwork (`FirmwareArchitecture.js`), an interactive eight-stage evidence workflow (`FirmwareEvidenceFlow.js` and `firmwareResearch.js`), and an explicitly illustrative system model (`FirmwareSystemModel.js`). `FirmwareEmulation.css` uses the existing palette and typography without additional dependencies. The six methodology titles are reused from `researchMethodology.js` without altering that workflow.

`FirmwareSpotlight.js` appears between the homepage engagement pathways and evidence package. Hardware/firmware and research-tooling disciplines link to the new page, as does the footer. Primary navigation remains unchanged. The page has document and Open Graph metadata and these deep-link destinations:

- `#research-capability`
- `#evidence-workflow`
- `#system-integration`
- `#engagement-applications`
- `#research-deliverables`

The workflow is a conceptual explanation, not a live scan. Its native tab buttons support arrow keys, Home/End, and a focusable evidence panel. The selected stage exposes the evidence sought and the boundary of its claim. Reduced motion uses the site's existing global preference rule. At narrow widths, the diagram becomes a vertical sequence with readable HTML labels.

Content distinguishes the supplied demonstrated tooling scope (ELF-based embedded Linux, x86-64/AArch64, cross-binary analysis, component rehosting, isolated execution/evidence) from RTOS and expanded bespoke emulation development. It separates implementation observations, modeled control effects, and unverified operational consequences. AI-assisted research may involve external models or APIs; no all-local processing claim is made. Tool ownership, proprietary names, third-party identities, business arrangements, and whitepaper assets are not published by this change.

**Technical source review:** the six-page reference supplied in `assets/monkey_vr_whitepaper.pdf` was read and cross-checked against the capability copy. `validation/firmware-emulation/whitepaper-claims.txt` maps the claims to source pages and records the scope limits. This checks consistency with the supplied reference, not independent execution or detection accuracy. The reference does not specify model hosting or external API handling, so those details require confirmation; the site explicitly avoids an all-local processing assurance. The PDF remains untracked and is excluded from the build. See `validation/firmware-emulation/review.txt` for the review items and validation results. No deployment or merge is part of this enhancement.

Run `scripts/firmware-review.cjs` against a production SPA preview using the same `PLAYWRIGHT_MODULE`, `CHROMIUM_EXECUTABLE`, `PREVIEW_URL`, and `REVIEW_OUTPUT` conventions as the existing browser scripts. It checks the new route at 320, 375, 768, and 1440 pixels; all workflow stages; keyboard/focus behavior; deep links; integration links; existing route layouts; axe results; reduced motion; runtime errors; and external requests. Screenshots and machine-readable results are under `validation/firmware-emulation/`. Component and route tests are in `src/components/FirmwareEmulation.test.js` and run with the existing test suite.
