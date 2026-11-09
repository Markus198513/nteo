# NTEO Vinyl Stickers — RU / EN

Bilingual landing page for NTEO's vinyl sticker production, plotter cutting and on-site application service across Cyprus.

## Included
- Russian main page (`/`) and English page (`/en/`)
- Responsive layout and mobile navigation
- 9 service categories focused on cut vinyl
- City coverage: Limassol, Paphos, Nicosia and Larnaca, plus surrounding areas
- SEO title, description, H1/H2 structure, hreflang and LocalBusiness JSON-LD
- Quote form with one optional artwork attachment (PDF, SVG, EPS, AI, PNG, JPG, WEBP, ZIP; max 15 MB)
- Node/Express endpoint that emails the enquiry and attachment using SMTP
- WhatsApp contact shortcut

## Run locally
Requires Node.js 20+.

```bash
npm install
npm start
```

Open http://localhost:3000

## Required Render environment variables for real email delivery
Set these in Render > Service > Environment:

- `SMTP_HOST` — SMTP server hostname
- `SMTP_PORT` — usually `587` (or `465` for SSL)
- `SMTP_USER` — SMTP login
- `SMTP_PASS` — SMTP password / app password
- `TO_EMAIL` — mailbox that receives customer enquiries
- `FROM_EMAIL` — verified sender address (often the SMTP account)
- `REPLY_TO_EMAIL` — optional reply-to address

The form endpoint is implemented. Until SMTP credentials are entered, the server deliberately returns a clear configuration response and the page offers WhatsApp as a fallback. Do not put SMTP credentials in frontend JavaScript.

## Deploy to Render
1. Push the contents of this folder to a new GitHub repository.
2. In Render choose **New > Blueprint** and connect the repository.
3. Render reads `render.yaml`; enter the SMTP environment values.
4. Wait for deployment, then test `/health`, both language routes, and a real form submission with a small test attachment.

## Staging vs production SEO
The current pages include `noindex,nofollow` to prevent the temporary Render staging URL from competing in search results. Before publishing on the permanent NTEO domain:
1. Replace the canonical URLs in both HTML files with the final public URLs.
2. Remove the `noindex,nofollow` meta tag.
3. Add a sitemap and robots.txt for the final URL structure.
4. Verify the domain, SSL, analytics and search console.

## Business details to verify before launch
- Confirm the WhatsApp phone number currently set to +357 97 587065.
- Confirm the email address for receiving enquiries.
- Confirm actual availability of each material / service and geographic installation coverage.


## SEO staging / production switch

This archive is configured for the temporary Render staging host:
- `robots.txt` allows crawling so search engines can read page directives.
- All HTML pages use `noindex,follow` to keep the staging host out of search results.
- Do not submit the staging sitemap to Google Search Console.

Before launch on the final domain:
1. Replace canonical URLs, hreflang URLs and sitemap URLs with the final domain.
2. Change every HTML `meta name="robots"` from `noindex,follow` to `index,follow` (or remove the tag).
3. Keep `robots.txt` crawlable; do not add `Disallow: /`.
4. Submit the production sitemap in Google Search Console.
5. Add verified business address / coordinates to LocalBusiness schema only when confirmed.
