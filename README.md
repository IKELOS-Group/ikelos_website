# IKELOS Group website

A responsive React website for bespoke vulnerability research and cybersecurity consulting. Uses React Router and Create React App; no backend, analytics, external fonts, or contact-form service.

## Development

Use Node.js 22.22.2 (pinned in `.nvmrc`) and npm. With nvm installed, run `nvm use`. Run `npm ci`, then `npm start` for local development.

TypeScript is pinned to 4.9.5 as a build dependency to satisfy `react-scripts@5.0.1`'s peer range, even though this site uses JavaScript. Commit both `package.json` and `package-lock.json` when changing dependencies, and verify with a clean `npm ci` before deployment.

- `npm test -- --watchAll=false`: component and navigation checks.
- `npm run build`: production output in `build/`.

Routes: `/`, `/services` (Capabilities), `/about` (Approach), `/contact`. Research and advisory sections also support `/services#research` and `/services#consulting`.

## Content and design

Shared styling and responsive rules are in `src/index.css`. Page content is in `src/components`. Shared visual elements and the contact invitation are in `Shared.js`.

The supplied logo remains in `assets/`; its byte-identical copy in `src/assets/` is bundled by React. `Brand.js` frames the artwork, and CSS applies the warm monochrome treatment against the dark background without editing the source image. The slogan is “In Silentio, Vincimus.”

General inquiries use `info@ikelosgroup.com`. PGP-encrypted correspondence uses `secure_email@ikelosgroup.com`; visitors must encrypt messages in their own OpenPGP-capable mail app. The public key is served at `/keys/ikelos-secure-email.asc`, copied byte-for-byte from the supplied `.asc` file in `assets/`. Its primary fingerprint is `5AD6 A645 E697 72E5 AA7C 0277 DB44 9499 7C6F 00D3`. When rotating the key, update the published file, displayed fingerprint, and contact test together, and verify the built download. Publish only public keys. Do not add unverified specialties, credentials, clients, testimonials, or metrics.

## Static hosting

For Cloudflare Pages, use build command `npm run build` and output directory `build`. The `.nvmrc` selects the tested Node version. If the project has a `NODE_VERSION` environment override, set it to `22.22.2` as well.

Deploy the contents of `build/` to the existing static host when authorized. `public/_redirects` is copied into the build; it retains the Matrix discovery redirects before the SPA fallback. The root `_redirects` mirrors this configuration for existing host workflows. Keep both copies in sync.

A host that does not support `_redirects` needs equivalent redirect rules plus a fallback to `index.html` for client-side routes. Check direct requests and refreshes for every route, and the three Matrix discovery endpoints, after deployment. Hosting configuration and deployed behavior cannot be verified from this repository alone.
