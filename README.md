# VirtualViking — Astro + Markdown

An editable, responsive static blog migrated from the public [VirtualViking](https://virtualviking.blog/) Hostinger Website Builder website, designed for GitHub Pages.

## Project structure

```text
astro/
  src/content/blog/   38 Markdown documents, each retaining its original URL slug
  src/pages/          Astro homepage, article listing and dynamic article route
  src/layouts/        Shared site layout
  public/assets/      CSS, JavaScript, favicon and 196 locally hosted images
.github/workflows/    GitHub Pages deployment workflow
scripts/              Source migration tools
```

## Write a new article

Add `astro/src/content/blog/my-new-post.md`:

```md
---
title: "My new post"
description: "A short summary"
cover: "/assets/images/my-image.png"
draft: false
---

Your post starts here.
```

Commit and push to `main`; GitHub Actions rebuilds the static site. For an existing post, edit its Markdown file. Each article's filename/slug determines its URL. Place new images in `astro/public/assets/images/`.

## Local development

```sh
cd astro
npm ci
npm run dev
```

Run `npm run build` for static output in `astro/dist/`.

## Deploy

1. Create a **public** GitHub repository named `sbhernes.github.io` under account `sbhernes`.
2. Push the project at the root of the `main` branch.
3. In **Settings → Pages**, choose **GitHub Actions** as the deployment source.
4. Confirm the generated site works on `https://sbhernes.github.io/`.
5. After testing, configure `virtualviking.blog` as a custom domain in GitHub Pages and update only relevant website DNS records. Do not disrupt existing email records.
6. Keep Hostinger active until the final domain cutover is verified.

## Migration notes

- Original sitemap contained 40 URLs; the Astro build produces 40 pages (homepage, `/blog/` and 38 Markdown-based pages).
- 196 public images are stored locally rather than served from Hostinger's CDN.
- The source was extracted from public HTML, not an official Hostinger export. **Review post formatting, links, captions and image order before DNS cutover**, especially long VCF walkthroughs.
- Hostinger contact/newsletter forms are not active on GitHub Pages; integrate a form service if desired.
- Some original URL slugs represent category pages rather than articles, but are preserved as Markdown documents for URL compatibility.
- Publication currently uses the repository root URL, not a project subpath.
- The content is the author's copyright. No blanket license to copy articles or images is granted.
