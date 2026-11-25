# Chemtech Specialty website

React + Vite + Tailwind front end with a small Node server that emails quote requests.

## Run locally

```bash
npm install
cp .env.example .env      # then fill in RESEND_API_KEY and MAIL_TO
npm run server            # terminal 1: API on http://localhost:5000
npm run dev               # terminal 2: site on http://localhost:5173 (proxies /api to the server)
```

## How it fits together

- `src/data/productData.js` is the only place products are defined. Pages, footer, search, structured data,
  static HTML and `sitemap.xml` all come from it.
- `npm run build` builds the site, then `scripts/prerender.js` renders every route of the React app to HTML.
  The browser hydrates that HTML. Anything browser-only must wait for `useHydrated()` or an effect.
- `src/routes.jsx` maps URLs to lazily loaded pages. `src/lib/head.js` defines every `<head>` tag.
- `npm run audit:seo` checks the built pages (run it after a build).
- 3D journeys: `src/components/journey/`. One `Journey.jsx`, one `SceneShell.jsx`, and a scene plus text per category.
  three.js only downloads when a journey nears the screen.

## Hosting

- **Site: Cloudflare** (`wrangler.jsonc`, `public/_headers`). Serves `dist/`, with real 404s and no trailing slashes.
  `VITE_API_URL` must be set at build time to the API's origin.
- **Quote API: Render** (`server/`, start command `npm start`). Set the variables from `.env.example`, including
  `CORS_ORIGIN`. Email goes through Resend, with Reply-To set to the customer.

Protection: server-side validation, HTML-escaped email, a honeypot field, and 5 submissions per IP per 15 minutes.

Never commit `.env`.
