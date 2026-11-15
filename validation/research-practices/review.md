# IKELOS research-practice redesign review

Implemented locally on `redesign/two-research-practices` in `/tmp/ikelos-research-practices`, from `06721fd`. No merge, push, deployment, or Sites registration. The original checkout remains on `main` with its unfinished navigation files and supplied PDF untouched.

[Open the visual preview](preview.html). Select any of ten pages, desktop or phone, first screen or full page. For the interactive production preview, run `node scripts/preview.cjs` from the worktree and open `http://127.0.0.1:4175` using Node 22.22.2. The local QA server is stopped after handoff preparation; the script restarts it. A review archive is available alongside the worktree at `/tmp/ikelos-research-preview.zip`.

## New visitor journey

The first screen identifies IKELOS as applied research for embedded and operational systems and states the shared premise. A small Systems Sigil research model switches between the access and survivability questions. The next sections split the practices, explain the named product foundations, outline an engagement, and expose an illustrative evidence package.

Exquisite Access Development explains tailored capabilities, when to call, FME as a method, scoping, and conditional outputs. OT Behavior Validation and Survivability focuses on defined conditions, critical functions, observed failure/degradation, and recovery. Both connect to relevant product work. PHOBETOR separates the product direction from the Monkeysploit reference workflow. VEILTRACE uses the supplied description and clearly marks environment questions as scoping prompts.

Navigation now follows Practices / Research products / How we work / Discuss a research engagement. The mobile directory exposes both named practices and products directly. Contact starts with a non-sensitive description and offers a local email-draft helper. The handling, approved-channel, external-model/API, and OpenPGP guidance is retained and made more visible.

## Deliberate migrations

- The detailed methodology moves from the homepage to `/about#research-methodology`; its old homepage hash redirects in-app.
- `/services` remains a compatibility entry to the practices with all four method/partnership anchors.
- `/capabilities/firmware-emulation` remains supporting PHOBETOR technical material with all five section anchors.
- Existing About/Contact anchors, sample deliverable, evidence policy, public key, no-JavaScript contact, and Matrix/SPA rules remain.
- Document and Open Graph metadata migrate to the new positioning on every route.

## Validation evidence

- Production build: passed, no build warnings. `production-build.txt` records the actual output filenames and gzip sizes.
- Component tests: **44 passed** in two suites (`component-tests.txt`). Existing testing-library/React and Node deprecation warnings remain.
- Production Chromium: **44 route/width combinations** (11 routes × 320, 390, 768, 1440px), one h1 per page, no horizontal overflow, synchronized title/description/Open Graph, **zero automated WCAG A/AA violations** (`views.json`).
- Keyboard and browser behavior: skip link; research-question selector; menu focus trap, Escape, focus/scroll restoration and route focus; six methodology stages; eight firmware tabs; eight sample disclosures; required engagement description; topic context; mailto handoff feedback; no local/session storage; exact public-key download; 404 recovery (`results.json`).
- All internal links resolve; all 18 legacy hashes clear the fixed header at 320 and 1440px. No runtime errors or external page requests.
- Reduced motion suppresses the decorative hero animation. Labels and content stay visible independently of motion.
- Visual review inspected desktop and phone opening screens, complete homepage and OT practice, product/evidence layouts, contact prominence, and mobile menu. `contrast-review.json` supplements axe's layered-background contrast review items with the actual palette ratios.
- Public-key source/public/build bytes match. Root/public/build redirects match. No PDF exists in public or build output; dependency files are unchanged (`artifact-audit.json`).

The first browser attempt needed pre-existing and separately unpacked runtime libraries. QA dependencies were kept outside the project. A browser-test selector initially observed the URL before the React route-focus effect; waiting for the completed transition confirmed the preserved focus behavior. No application workaround was required.

## Owner review before publication

1. Confirm PHOBETOR's current product boundary, supported targets, and roadmap wording. The supplied paper supports the narrower embedded-Linux component workflow and does not name PHOBETOR.
2. Confirm VEILTRACE maturity and engagement deliverable scope. No customer history, benchmark, integration, or validation result is asserted.
3. Confirm target-specific access-capability handover and public detail. Suggested outputs remain conditional on the agreed engagement scope.
4. Confirm model/API hosting, permitted data transfers, and retention before making any more-specific customer assurance.

The supplied PDF was inspected locally. Its identity, page-level claim mapping, and limits are in `claims-review.txt`. It is not published or included in the preview. No ownership or licensing terms are asserted.

Verification limits: Chromium only; no live-host deployment, Safari/Firefox run, screen-reader audit, or network/CPU-throttled performance test. Automated accessibility results are not certification. The website only requests an email draft; sending and encryption remain actions in the visitor's mail application.
