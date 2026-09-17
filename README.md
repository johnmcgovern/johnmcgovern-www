# John McGovern — www.johnmcgovern.com

Personal landing page / link hub. Pure static HTML/CSS/JS — no framework,
no build step. Same architecture and deep-space design family as
[www.j23networks.com](https://www.j23networks.com).

## Structure

Everything deployable lives in `public/` — that's the Cloudflare Pages output directory.

```
public/
  index.html          # the whole site (name, tagline, link cards)
  404.html            # custom not-found page
  sdsu-itni.html      # UNLISTED: standalone SDSU-styled application page
                      #   (noindex meta + X-Robots-Tag; not in sitemap, robots.txt,
                      #   or linked from anywhere). Own fonts: Montserrat, favicon-sdsu.svg
  assets/css/style.css
  assets/js/main.js   # starfield background
  assets/favicon.svg
  _headers            # Cloudflare Pages security/cache headers
  robots.txt, sitemap.xml
```

## Local preview

Any static server works:

```sh
python3 -m http.server 8789 -d public
# → http://localhost:8789
```

## Editing content

- **Links**: each card is an `<a class="card">` in the `.links` list in
  `public/index.html` — edit the href, title, and description in place.
  Per-card accent colors are the `.card-linkedin` / `.card-github` / etc.
  rules at the bottom of the link-card section in `style.css`.
- **Name/tagline**: the `.name` and `.tagline` elements in `index.html`.
- **Colors/fonts**: CSS variables at the top of `public/assets/css/style.css`.

## Future: articles

The site is deliberately framework-free so articles can be added later as
plain pages, e.g. `public/articles/<slug>/index.html` sharing the same
stylesheet. Add new pages to `sitemap.xml` as they're published. If/when
volume justifies it, a static generator (e.g. Astro or Eleventy) can adopt
this same `public/` output convention without changing hosting.

## Deploy: Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
   pick the repo.
3. Build settings: **no framework preset, no build command, output directory `public`**.
4. After the first deploy, add `www.johnmcgovern.com` under **Custom domains**
   (and the apex `johnmcgovern.com` redirecting to www).

Every push to `main` auto-deploys; branches get preview URLs.
