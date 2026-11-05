# IKELOS Group website

A responsive React website for bespoke vulnerability research and cybersecurity consulting. Uses React Router and Create React App; no backend, analytics, external fonts, or contact-form service.

## Development

Use Node.js 22 and npm. Run `npm ci`, then `npm start` for local development.

- `npm test -- --watchAll=false`: component and navigation checks.
- `npm run build`: production output in `build/`.

Routes: `/`, `/services` (Capabilities), `/about` (Approach), `/contact`. Research and advisory sections also support `/services#research` and `/services#consulting`.

## Content and design

Shared styling and responsive rules are in `src/index.css`. Page content is in `src/components`. Shared visual elements and the contact invitation are in `Shared.js`.

The supplied logo remains in `assets/`; its byte-identical copy in `src/assets/` is bundled by React. `Brand.js` frames the artwork, and CSS applies the warm monochrome treatment against the dark background without editing the source image. The slogan is “In Silentio, Vincimus.”

Contact links use `info@ikelosgroup.com`. Initial email is for high-level inquiries and arranging a suitable channel; it is not presented as encrypted contact. Do not add unverified specialties, credentials, clients, testimonials, metrics, or secure-contact identifiers.

## Static hosting

Deploy the contents of `build/` to the existing static host when authorized. `public/_redirects` is copied into the build; it retains the Matrix discovery redirects before the SPA fallback. The root `_redirects` mirrors this configuration for existing host workflows. Keep both copies in sync.

A host that does not support `_redirects` needs equivalent redirect rules plus a fallback to `index.html` for client-side routes. Check direct requests and refreshes for every route, and the three Matrix discovery endpoints, after deployment. Hosting configuration and deployed behavior cannot be verified from this repository alone.
