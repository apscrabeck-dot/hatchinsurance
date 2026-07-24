# Hatch Insurance Agency — Website

The marketing site for [Hatch Insurance Agency](https://hatchinsurance.com), an
independent, family-owned agency in Phoenix, AZ. Founded 1973, licensed in 44
states, eight specialty practices.

This is a single-page static site. No build step

## Stack

Plain HTML, CSS, and a small vanilla-JS file. Fonts are pulled from Google
Fonts. Everything renders without a framework or compiler.

```
index.html        Markup for the whole page.
styles.css        Tokens + section styles + responsive breakpoints.
script.js         Specialty tab switching + mobile nav toggle.
assets/verticals/ Photography for the hero and the eight practice plates.
netlify.toml      Netlify build/headers config.
_design-reference/
                  Original design handoff: prototype HTML, JSX, CSS, and
                  the design spec (DESIGN_HANDOFF.md). Kept in the repo
                  for posterity but excluded from the deploy via
                  netlify.toml's publish dir.
```

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

```bash
# Node
npx serve .
```

## Deploy: GitHub + Netlify

### One-time setup

1. **Create a GitHub repository** (e.g. `hatch-insurance-site`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_ORG/hatch-insurance-site.git
   git push -u origin main
   ```
3. **Connect Netlify**:
   - Sign in at [app.netlify.com](https://app.netlify.com).
   - Click **Add new site → Import an existing project → GitHub**.
   - Authorize Netlify and pick `hatch-insurance-site`.
   - Build command: leave blank (or `echo "static site"`).
   - Publish directory: `.`
   - Click **Deploy site**.
4. **Custom domain**: in Netlify, **Domain settings → Add a domain** and point
   `hatchinsurance.com` (or whichever apex/subdomain) at the Netlify nameservers
   or add the recommended A/CNAME records.

That's it. Netlify will redeploy automatically on every push to `main`.

### Updating content

Edit `index.html` directly, push to `main`, Netlify rebuilds in ~10 seconds.

The list of specialty practices is duplicated in two places:
- `index.html` — for the eight tab buttons and the initial plate state.
- `script.js` — `SPECIALTIES` array, used to swap plate content on tab click.

If you change a specialty's title, summary, or tags, update both.

## Content sources

All copy and contact data come from the design handoff and reflect Hatch's real
contact info:

- Phone: 602-995-5692 · Toll free: 1-877-995-5692
- Email: info@hatchinsurance.com
- Office: 2222 W Parkside Lane, Ste 117, Phoenix, AZ 85027
- Hours: Mon–Fri · 7:30a–4:30p MST

## Photography

The `assets/verticals/*` images are placeholders carried over from the design
prototype. Per the design handoff, production should commission editorial,
on-location photography for the hero and each of the eight practice plates.
Drop replacements into `assets/verticals/` using the same filenames and the
site picks them up automatically.

## Accessibility notes

- The specialty tab strip implements the WAI-ARIA tabs pattern: `role="tab"`,
  `aria-selected`, arrow-key navigation, `Home`/`End` jump.
- All CTAs meet WCAG AA contrast against their backgrounds.
- Visible focus rings (`:focus-visible`) use the warm accent for keyboard users.
- Decorative images use `alt=""`. The hero image does too — the headline is the
  semantic content. Replace with descriptive alt text when commissioned
  photography goes in.
- Honors `prefers-reduced-motion`.

## Design reference

`_design-reference/` contains the original handoff: the React/JSX prototype,
the prototype CSS, and `DESIGN_HANDOFF.md` (the full visual spec). Anyone
revising the site visually should read that first.

## License

Proprietary — Hatch Insurance Agency.
