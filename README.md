# NTEO Vinyl Stickers — Render deployment

This is a separate Node/Express landing page for NTEO vinyl stickers, plotter-cut lettering and on-site application across Cyprus.

## Local preview
1. Install Node.js 20+
2. Run `npm install`
3. Run `npm start`
4. Open http://localhost:3000

## Render
Create a new Web Service or Blueprint from this repository. `render.yaml` configures the service.
Set SMTP variables in Render Environment:
- SMTP_HOST
- SMTP_PORT (587 or 465)
- SMTP_USER
- SMTP_PASS
- TO_EMAIL
- FROM_EMAIL
- REPLY_TO_EMAIL (optional)

Without SMTP configuration, the form falls back to WhatsApp. The phone number is currently +357 97 587074; confirm it before launch.

## Before public launch
- Confirm WhatsApp number and email destination.
- Confirm installation coverage and travel conditions.
- Replace canonical URL in `public/index.html` with the final domain.
- Check all photography and replace any image if you prefer your own work.
- This site describes cut vinyl graphics, not full vehicle wrapping or full-colour photo printing.


## Demonstration images
The landing includes AI-generated demonstration visuals in `public/assets/images/`. They are illustrative mockups, not photographs of verified NTEO customer projects. Replace them with real project photos when available.


## Service gallery
The services section now contains ten locally bundled demonstration images, one for each vinyl-cutting and installation category. The seasonal-promotion image is cropped to focus on cut-vinyl lettering and solid-colour shapes. All service images are stored in `public/assets/images/` and do not depend on external image hosts. Demonstration visuals are illustrative and are not verified customer projects.
