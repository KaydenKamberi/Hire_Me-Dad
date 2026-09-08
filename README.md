# Dad's Website

This folder holds everything that makes the website work. It's plain HTML and CSS —
no accounts to log into, no software to keep updated, no monthly fees for anything
except the web address itself.

> **⚠️ This site is not finished and is not live to customers yet.**
> It's at **CP4 — every section is built and laid out, but every word on the
> page is still a placeholder in double braces and every photo is a grey box.**
> Nothing on it is true yet. See "Where the build is up to" below.

---

## What's in here

| Folder / file | What it is |
|---|---|
| `index.html` | The website. All of it — it's a single page. |
| `css/styles.css` | How the page looks. Colours, type sizes, spacing. |
| `js/main.js` | A small amount of code for polish. The site works fine without it. |
| `assets/img/` | The photos. |
| `content/source-of-truth.md` | **Your answers.** Everything on the site comes from this file. |
| `scripts/optimize-images.sh` | Shrinks photos before they go on the site. |

**The rule:** if you want to change a word on the website, change it in
`content/source-of-truth.md` first, then in `index.html`. That way the two never
drift apart and there's always one place that says what's true.

---

## Where the build is up to

The site is built in numbered checkpoints. Each one gets finished and checked before
the next one starts.

- [x] **CP0** — Folder structure, questionnaire, preview hosting
- [x] **CP1** — Colours, type, buttons
- [x] **CP2** — Page structure, all eight sections
- [x] **CP3** — Hero and the sticky call bar
- [x] **CP4** — About, services, photos, reviews, service area
- [ ] **CP5** — Contact form *(see the warning below)*
- [ ] **CP6** — 🔴 Your real words replace the placeholders
- [ ] **CP7** — 🔴 Your real photos replace the grey boxes
- [ ] **CP8** — Speed and accessibility check, then **you approve it**
- [ ] **CP9** — Moves to its real web address and goes live

🔴 means it's blocked until you've answered the questions in
`content/source-of-truth.md`.

---

## ⚠️ The contact form does not send anything yet

Until **CP9**, the "Send" button on the contact form is a demonstration only. It
will look like it worked — it shows a confirmation message — but **nothing is
emailed to anyone.** This is on purpose: the form's behaviour gets built and tested
first, and the plumbing that actually delivers the message gets connected last.

**Do not give this address to a customer** until CP9 is done and a real test message
has landed in your inbox. Until then, the phone and text buttons are the only ways
to reach you from the site — and those work from the moment the page exists, because
they're ordinary phone links, not code.

---

## Looking at the site while it's being built

The preview lives on GitHub Pages:

**https://kaydenkamberi.github.io/Hire_Me-Dad/**

It updates automatically within a minute or two of any change. It's a real URL on
the real internet, so it works on your phone — but it's a preview, not the final
address, and it gets switched off when the site moves to its own domain at CP9.

You can also just double-click `index.html` on a computer to open it. The whole site
is built to work that way, with no server and no internet connection.

---

## How to change the phone number

This is the one edit you're most likely to need, so it gets step-by-step
instructions in `HANDOVER.md` — written out in full, no assumptions. That file
arrives at CP9, along with the domain details, renewal dates, and where to find
messages people send you.

---

## For whoever works on this next

Ground rules that keep this site cheap and low-maintenance. They're in the build
spec in full; the short version:

- **No framework, no build step, no npm.** Plain HTML, CSS, and a little vanilla JS.
  It must still work in five years with nobody maintaining it.
- **The page must fully work with JavaScript turned off.** JS is polish only. Phone
  numbers are real `<a href="tel:">` links in the HTML.
- **No external requests.** No web fonts, no icon CDN, no analytics, no jQuery.
  System fonts and inline SVG.
- **All internal paths are relative** (`./css/styles.css`). The preview is served
  from a subpath and the live site from a domain root — relative paths work in both,
  absolute ones break silently on the preview.
- **No stock photos, ever.** Grey `PHOTO NEEDED` blocks until the real ones arrive.
- **Host-agnostic until CP9.** Nothing host-specific — no `netlify.toml`, no
  `data-netlify` attributes — enters this repo before then.

`styleguide.html` is a build tool, not a page of the site: it renders every
component against the stylesheet so CP1 could be checked at 375px and 1280px.
It's noindexed and nothing links to it. **Delete it at CP8.**
