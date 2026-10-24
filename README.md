# Chemtech Specialty website

React + Vite + Tailwind front end with a small Node server that emails quote requests.

## Run locally

```bash
npm install
cp .env.example .env      # then fill in MAIL_TO, SMTP_USER, SMTP_PASS
npm run server            # terminal 1: API on http://localhost:5000
npm run dev               # terminal 2: site on http://localhost:5173 (proxies /api to the server)
```

## Quote form to your inbox

The Contact page posts to `POST /api/quote`. The server validates the input, then emails it to `MAIL_TO`.
The email's Reply-To is the customer's address, so pressing Reply answers them directly.

Gmail setup: turn on 2-Step Verification, create an App Password at
https://myaccount.google.com/apppasswords, and put it in `SMTP_PASS` (with `SMTP_USER` set to your Gmail address).
Any other SMTP provider works too (change `SMTP_HOST` / `SMTP_PORT`).

Built-in protection: server-side validation, HTML-escaped email body, header-injection stripping,
a hidden honeypot field for bots, and a limit of 5 submissions per IP per 15 minutes.

### Deploying

- **One server (Render, Railway, a VPS):** `npm run build && npm start`. Express serves the built site and the API together.
  Set the variables from `.env.example` in the host's dashboard.
- **Vercel:** deploy as normal; `api/quote.js` becomes the endpoint. Add the same variables under
  Project Settings > Environment Variables. (Vercel functions don't share memory, so the rate limit there is weaker.)
- **Site and API on different domains:** set `VITE_API_URL` at build time to the API's origin and
  `CORS_ORIGIN` on the server to the site's origin.

Never commit `.env`.

## Casting journey (3D)

`src/components/CastingJourney.jsx` (Home page, below Products) is an interactive 3D walk through lost-wax
investment casting. The stage text lives in `src/components/castingStages.js`; the scene is `CastingScene.jsx`
(three.js via @react-three/fiber). three.js loads only when the section nears the screen.
It respects `prefers-reduced-motion`, falls back to text when WebGL is unavailable, and doesn't trap page scrolling on phones.
