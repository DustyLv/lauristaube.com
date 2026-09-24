# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Lauris Taube (lauristaube.com) with a small CMS at `/admin`. Vanilla JS, no build step, no tests, no linter. One Cloudflare Pages project serves both: static files from `public/` and a backend from `functions/` (Pages Functions), with D1, R2 and KV bindings declared in `wrangler.toml`. Deployed by pushing to GitHub (`DustyLv/lauristaube.com`); Cloudflare Pages builds `main` to production and other branches to preview URLs. DNS is on Cloudflare.

The CMS is modelled on the Lipke CMS (`D:\_Files\Dev\LipkeInteractiveMap\lipke-cms`); the upload/media handlers and the save pattern are ports of it. Unlike Lipke, there are no passwords: sign-in is Cloudflare Access (Zero Trust).

## Commands

wrangler is pinned to 4.84.1 because newer versions need Node 22 and this machine has Node 20.

```bash
npm install
npm run dev        # wrangler pages dev public --port 8788 --persist-to=.wrangler/state

# Schema (migrations/*.sql, tracked by wrangler)
npx wrangler d1 migrations apply portfolio-db --local --persist-to=.wrangler/state
npx wrangler d1 migrations apply portfolio-db --remote

# Local D1 query
npx wrangler d1 execute portfolio-db --local --persist-to=.wrangler/state --command "SELECT id, title FROM projects"
```

`scripts/migrate-content.mjs --local|--remote` is the one-time import of the old hardcoded content (`projectdata.js`, `images/`). It replaces all projects and timeline rows, refuses `--remote` when projects already exist (unless `--force`), and `--skip-images` skips the slow R2 uploads. `projectdata.js` and the root `images/` folder only exist for this script; they are not served.

`--persist-to=.wrangler/state` must be the same on every local command, or wrangler reads a different local state.

## Architecture

**Data (D1 `portfolio-db`, `migrations/0001_init.sql`):** `projects` (tags/details/links are JSON text columns; `is_featured` has a unique partial index so only one is featured; `status` draft/published; `position` = display order), `project_media` (gallery rows: `upload` = R2 key, `video` = YouTube URL), `timeline` (experience + education, `section` column, `resume_bullets` JSON). The `access_keys` table from 0001 was dropped in 0002 when sign-in moved to Cloudflare Access.

**API (`functions/api/`, file-based routing):**
- `GET /api/content`: `{ projects, experience, education }`, published only, cached in KV under `content`. `GET /api/admin/content` is the same with drafts, uncached, plus `user` (the Access email); the CMS uses that. Both build it with `_content.js`.
- `POST`/`PUT /api/admin/projects` and `/api/admin/timeline` save a whole record. **PUT is a full replace**: omitted fields are cleared, and project media not in the body is deleted from D1 and R2. `DELETE` lives in `projects/[id].js` / `timeline/[id].js` (collection files can't take `/:id`).
- `PUT /api/admin/order` rewrites `position`; `POST /api/admin/upload` puts an image in R2 (content-sniffed, 15 MB max) and returns `{r2_key}` without a DB row; `GET /api/media/<key>` serves R2 with a year of edge cache.
- **Auth is Cloudflare Access.** An Access application covers `/admin` and `/api/admin/*` (on lauristaube.com and lauristaube-com.pages.dev; preview deployments are covered by Pages' own Access setting). Access does the login and forwards a signed JWT in `Cf-Access-Jwt-Assertion`; `api/admin/_middleware.js` → `verifyAccess()` in `_utils.js` checks signature (team JWKS), `iss`, `aud`, expiry and the `ACCESS_EMAILS` allowlist. Config is `[vars]` in `wrangler.toml` (`ACCESS_TEAM_DOMAIN`, `ACCESS_AUD` — comma-separated, since the Pages preview policy is a separate Access app with its own AUD — and `ACCESS_EMAILS`). With it unset, every admin request is refused.
- Everything writable or draft-revealing lives under `/api/admin/` (`content`, `projects`, `timeline`, `order`, `upload`) so the one Access path rule and the one middleware cover it. Public endpoints are only `GET /api/content` and `GET /api/media/*`. Every mutation calls `invalidateContent`.
- Local dev: `.dev.vars` (gitignored) sets `ACCESS_DEV_BYPASS=1`, which `verifyAccess` honours only when the hostname is localhost/127.0.0.1.
- Same-origin only, so there is no CORS middleware.

**Public site (`public/index.html`, `public/script.js`):** fetches `/api/content` on load and renders the featured card, paginated grid (4/page), project modal gallery, and the experience/education timelines (`#experience-list`, `#education-list`). `generateResume()` builds a print-only resume from the same data (one template, light/dark class maps in `RESUME_THEMES`); contact info and summary are constants at the top of `script.js`. After injecting `<i data-lucide>` HTML, `lucide.createIcons()` must run. `.reveal-text` scroll animations are set up after content renders.

**CMS (`public/admin/`):** Alpine.js 3 app (`admin.js`) with Tailwind CDN and Quill 2.0.3. No login screen: if `/api/admin/content` is refused it shows a "no access" view; if Access expires mid-session, `request()` sees the redirect (`opaqueredirect`) and offers sign-in in a new tab without losing edits. Sign out = `/cdn-cgi/access/logout`. All navigation goes through `go()`, which checks `isDirty()` (JSON snapshot in `pristine`) before leaving an editor. Images are resized/re-encoded to WebP in the browser before upload (`optimizeImage`). Video links are normalised to `https://www.youtube.com/watch?v=<id>`, the one shape the public embed code parses.

## Gotchas

- Direct D1 edits don't clear the KV cache: `npx wrangler kv key delete --binding KV content --remote`.
- Lucide is loaded unpinned (`@latest`) on both pages, and some names were removed upstream (`github`, `linkedin`, `crab`). The CMS icon field warns when a name doesn't exist.
- `long_description` is HTML and is inserted with `innerHTML`; all other CMS fields are escaped with `esc()` in `script.js`.
- Uploads whose project is never saved stay in R2 unreferenced.
- Unknown paths fall back to `public/index.html` (Pages SPA behaviour), so `/api/*` typos return HTML, not 404.
