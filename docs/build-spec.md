Build Spec: [Dad's Name] — Hire-Me Website

Companion to: prd-dads-hireme-site-v0.2.md (the what and why) This document: the how — everything Claude Code needs to build the site. Author: Kevin | Version: 1.1 Deployment order: GitHub + GitHub Pages for the entire build (CP0–CP8); Netlify migration is the final checkpoint (CP9). Status: Buildable. 🔴 = real content required before launch; build proceeds with placeholders until then.

0. How to use this document

This spec is written to be executed in order by Claude Code, one checkpoint at a time. Do not hand the whole thing over in one prompt — the result will be generic. Work checkpoint by checkpoint (§10), verify the exit criteria, commit, then move on.

Golden rules for the whole build:

Mobile is the design, desktop is the adaptation. Every decision starts at 375px wide.
No framework, no build step, no npm. Plain HTML, CSS, and a small amount of vanilla JS. This site must still work in five years with zero maintenance.
The page must fully render and be fully usable with JavaScript disabled. JS adds polish only. Phone numbers are real <a href="tel:"> links in the HTML, not injected.
No stock photos, ever. If real photos aren't ready, use flat gray placeholder blocks labeled PHOTO NEEDED: [description]. Never fill the gap with a stock image "for now" — placeholders that look finished ship by accident.
No external requests, and no webfont may be loaded from a third-party host — fonts are self-hosted in assets/fonts/ (amended at CP6). No Google Fonts link, no icon CDN, no analytics script, no jQuery. Inline SVG only. This is a performance requirement, not a preference.
All internal paths are relative — ./css/styles.css, not /css/styles.css. The site is built and previewed on GitHub Pages, which serves from a subpath (username.github.io/dads-site/), and later moves to Netlify at a domain root. Relative paths work in both. Absolute paths break silently on GitHub Pages and you'll lose an hour to it.
Host-agnostic until the very end. Nothing host-specific enters the repo until CP9. No netlify.toml, no data-netlify attributes, no Netlify redirects. The site must be a plain static folder that runs from any web server — or from a file:// double-click — for the entire build.
1. Content source of truth

All of Dad's real answers live in one file: content/source-of-truth.md. Nothing else in the repo may contain content that isn't traceable to it.

Until it's filled in, the build uses these placeholder tokens verbatim in the HTML so they're greppable:

Token	Meaning	Example
{{NAME}}	Full name as customers should see it	Miguel Torres
{{TRADE}}	The trade, in customer words	Handyman / Painter / Drywall
{{AREA}}	Primary service area	San Diego
{{YEARS}}	Years of experience	22
{{PHONE_DISPLAY}}	Formatted for reading	(619) 555-0134
{{PHONE_RAW}}	For tel:/sms: — E.164	+16195550134
{{EMAIL}}	Where form submissions go	—
{{LICENSE_LINE}}	Full license string, or empty	CA Lic. #1234567
{{GOOGLE_REVIEW_URL}}	Google Business Profile review link	—
{{WHATSAPP_RAW}}	WhatsApp number, or empty	—
{{DOMAIN}}	Final domain	—

Pre-launch gate: grep -r "{{" . must return zero results outside source-of-truth.md.

The license branch

{{LICENSE_LINE}} is not cosmetic — it forks the copy. Claude Code must implement whichever branch applies and delete the other entirely:

Licensed: license number appears in the footer and in the hero trust strip. Copy may use "Licensed & Insured" if insurance is also confirmed.
Not licensed: the strings "licensed", "certified", "bonded", "insured", and any badge/shield iconography are forbidden anywhere in the repo. Trust copy leads with {{YEARS}} years of experience, real photos, and neighbor testimonials instead. Add a repo check: grep -ril "licens" src/ must return nothing.
2. What the site looks like
2.1 Overall feel

Working-trade credible, not startup-slick. Think: a clean, confident business card blown up to phone size. High contrast, large type, generous tap targets, real photos doing the persuading. No gradients, no glassmorphism, no animated hero, no carousel that moves on its own.

2.2 Design tokens

Define these as CSS custom properties on :root. Nothing in the stylesheet uses a raw color or a raw pixel spacing value.

css
:root {
  /* dark surfaces */
  --ink:        #0E1113;   /* page background, hero, dark sections */
  --panel:      #14181B;   /* credential strip, cards, section nav */
  --panel-deep: #0A0C0D;   /* footer */
  --line:       rgba(255,255,255,.10);
  --on-dark:        #FFFFFF;
  --on-dark-soft:   rgba(255,255,255,.74);
  --on-dark-muted:  rgba(255,255,255,.56);
  --on-dark-faint:  rgba(255,255,255,.44);   /* non-text only — 4.39:1 on --ink */
  /* light surfaces */
  --bone:       #F4F2EF;
  --bone-line:  #D7D1C9;
  --on-light:       #14181B;
  --on-light-soft:  #4A5359;
  --on-light-faint: #7C858B;                 /* non-text only — 3.37:1 on --bone */
  /* accent — CALL/TEXT ACTIONS ONLY */
  --accent:      #FF6B1A;
  --accent-ink:  #0E1113;
  --accent-deep: #A8470A;   /* accent text on light backgrounds only. CP6 was
                               handed #C2540C, which is 4.11:1 on --bone and
                               under the §8 floor; darkened to 5.26:1. */
  /* type */
  --display: 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --body:    'Public Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --t-hero:    clamp(2.875rem, 11.8vw, 4rem);
  --t-page-h1: clamp(2.375rem, 9.7vw, 3rem);
  --t-h2:      clamp(1.8125rem, 7.4vw, 2.25rem);
  --t-h3:      1.125rem;
  --t-body:    1rem;
  --t-small:   0.90625rem;
  --t-eyebrow: 0.6875rem;
  --gutter: 22px;
  --tap: 52px;
  --btn: 58px;
}

Replaced wholesale at CP6 — the former blue/system-font set is gone, not
evolved. Fonts are self-hosted (§0 rule 5, as amended). Square corners
throughout: no border-radius anywhere on this site.

--accent is confined to call and text buttons, the header Call pill, the sticky
bottom bar, eyebrow rules and labels, credential-strip icons, the active nav
underline, and the Before/After "After" tag. Nowhere else.

Accent color note: --accent is reserved exclusively for call/text actions. If a non-action element uses the accent color, the call button stops being the obvious thing to tap. This is the single most important visual rule on the page.

Contrast floor: every text/background pair ≥ 4.5:1. Verify, don't assume — this page gets read outdoors in San Diego sun on a dim phone.

2.3 Layout system
One column at every breakpoint. Content capped at --maxw, centered, --s5 side gutters.
Sections alternate --paper / --paper-alt so scroll position is legible.
Two breakpoints only: base (mobile) and min-width: 768px. At 768px+, the gallery goes 2-up and the hero gets more vertical air. That's it.
Sticky bottom call bar on mobile (max-width: 767px): a fixed bar, full width, containing Call and Text buttons. Always visible after the user scrolls past the hero. Add padding-bottom to <body> equal to the bar height so it never covers the footer.
2.4 Component specs

Primary button (Call) Full width on mobile, min-height: var(--tap), --accent background, --accent-ink text, 18px semi-bold, --radius, inline SVG phone icon, label Call {{PHONE_DISPLAY}} — the number is visible in the label, not hidden behind the word "Call". Visible :focus-visible outline. :active uses --accent-dark.

Secondary button (Text / WhatsApp) Same dimensions, transparent background, 2px --accent border, --accent text. Sits directly under or beside the primary.

Section header --t-h2, --ink, left-aligned, with a 48px × 4px --accent rule beneath it.

Before/After pair Two stacked images with Before / After labels as small pills in the top-left corner of each. Do not build a drag-slider widget — it's fragile on touch and adds JS for no conversion gain. Two labeled images, side by side at 768px+.

Testimonial card --paper background, 1px --line border, --radius, quote in --t-body italic, attribution — First name, City in --t-small --ink-soft.

2.5 Section-by-section wireframe (mobile, 375px)
┌─────────────────────────────────┐
│ {{NAME}}            [Call now]  │  Sticky top bar, 56px, appears
├─────────────────────────────────┤  after hero scrolls past
│                                 │
│   {{NAME}}                      │  HERO
│   {{TRADE}} in {{AREA}}         │  --t-hero, tight leading
│                                 │
│   {{YEARS}}+ years · Free       │  trust strip, --t-small
│   estimates · {{LICENSE_LINE}}  │
│                                 │
│   ┌───────────────────────────┐ │
│   │ 📞 Call (619) 555-0134    │ │  PRIMARY — above the fold,
│   └───────────────────────────┘ │  no scroll required
│   ┌───────────────────────────┐ │
│   │ 💬 Text me                │ │
│   └───────────────────────────┘ │
│                                 │
│   [ photo of Dad on a job ]     │  16:9, real photo, eager-loaded
│                                 │
├─────────────────────────────────┤
│ ▬▬▬                             │  ABOUT  (--paper-alt)
│ About {{FIRST_NAME}}            │
│ 2–3 sentences, first person,    │
│ plain words. Ends with what     │
│ he'll do for you.               │
├─────────────────────────────────┤
│ ▬▬▬                             │  SERVICES (--paper)
│ What I Do                       │
│ ✓ Service one                   │  Checkmark list, --ok color
│ ✓ Service two                   │  checks, --t-body text.
│ ✓ Service three                 │  6–8 items max. If it's not
│ ...                             │  on the list he doesn't do it.
│                                 │
│ [ Call (619) 555-0134 ]         │  CTA REPEAT #2
├─────────────────────────────────┤
│ ▬▬▬                             │  GALLERY (--paper-alt)
│ Recent Work                     │
│ ┌─────────┐ Before              │  8–10 photos. Pairs where
│ │  img    │                     │  possible, singles otherwise.
│ └─────────┘                     │  All lazy-loaded except the
│ ┌─────────┐ After               │  first.
│ │  img    │                     │
│ └─────────┘                     │
│ (repeat ×4–5)                   │
├─────────────────────────────────┤
│ ▬▬▬                             │  TESTIMONIALS (--paper)
│ What Neighbors Say              │
│ ┌─────────────────────────────┐ │
│ │ "quote"                     │ │  3–5 cards, stacked.
│ │ — Maria, Chula Vista        │ │
│ └─────────────────────────────┘ │
│                                 │
│ [ Read reviews on Google → ]    │  text link, not a button
├─────────────────────────────────┤
│ ▬▬▬                             │  SERVICE AREA (--paper-alt)
│ Where I Work                    │
│ Plain text list of cities and   │  Real text, not an embedded
│ neighborhoods, comma separated. │  map. Maps cost 300KB and
│ "Not sure if you're in my area? │  don't convert.
│  Just call and ask."            │
├─────────────────────────────────┤
│ ▬▬▬                             │  CONTACT (--paper)
│ Get a Free Estimate             │
│ ┌───────────────────────────┐   │
│ │ 📞 Call (619) 555-0134    │   │  CTA REPEAT #3
│ └───────────────────────────┘   │
│ ┌───────────────────────────┐   │
│ │ 💬 Text me                │   │
│ └───────────────────────────┘   │
│                                 │
│ Or send a message:              │
│ [ Your name            ]        │  3 fields. Nothing else.
│ [ Your phone           ]        │  Never ask for an address.
│ [ What do you need?    ]        │
│ [      Send            ]        │
├─────────────────────────────────┤
│ {{NAME}} · {{TRADE}}            │  FOOTER (--ink bg, light text)
│ Serving {{AREA}}                │
│ {{LICENSE_LINE}}                │
│ Site by Kevin — [link]          │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│  📞 Call        │    💬 Text     │  STICKY BOTTOM BAR (mobile only)
└─────────────────────────────────┘

Desktop (768px+) differences: hero photo sits beside the text in a 2-column grid; gallery goes 2-up; sticky bars are removed entirely (desktop users can see the whole page); everything else stays single-column and centered.

3. File structure
dads-site/
├── index.html                  # home
├── services.html               # CP6: four flat pages, no subfolders
├── work.html
├── contact.html
├── css/
│   └── styles.css              # all styles, one file, token-driven
├── js/
│   └── main.js                 # < 5KB, progressive enhancement only
├── assets/
│   ├── fonts/                      # CP6: self-hosted, latin subset
│   │   ├── archivo.woff2           # variable — one file covers 700 and 800
│   │   └── public-sans.woff2       # variable — one file covers 400 and 600
│   ├── img/
│   ├── og-image.jpg
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── content/
│   └── source-of-truth.md
├── docs/                       # spec, PRD, approved mockups
├── scripts/
│   └── optimize-images.sh
├── netlify.toml                # ⚠ ADDED AT CP9 ONLY — not before
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── .gitignore
├── BLOCKERS.md                 # open items that code cannot fix
├── CLAUDE.md                   # governs every session in this repo
├── README.md                   # handover doc, written FOR DAD
└── HANDOVER.md                 # accounts, logins, renewal dates

Deliberately absent: package.json, node_modules, any bundler config, any framework. If a checkpoint seems to need one, the checkpoint is wrong.

4. Page structure (rewritten at CP6)

Four flat pages at the repo root — index.html, services.html, work.html,
contact.html. No subfolders for pages; every internal path stays relative.

Each page is: skip link → top bar → [section nav, inner pages only] → <main>
(page sections, then the CTA band) → footer → sticky bottom call bar → script.

The top bar, footer, CTA band and call bar are duplicated verbatim in all four
files. There is no build step and the page must work with JS off, so no
includes and no JS injection — four copies is the decision. They are kept
byte-identical apart from the section nav's aria-current.

  index.html     hero → credential strip → reviews marquee → recent work →
                 about. No section nav; the hero does that job.
  services.html  photo page-header → numbered service list → service area
  work.html      photo page-header → before/after pairs → more-jobs grid
  contact.html   header → three contact rows → form → hours strip

The CTA band sits inside <main>, above the footer, with different headline copy
per page. It is page content, and outside a landmark an accessibility audit
flags it.

Semantic HTML throughout: one <h1> per page, <h2> per section, <ul> for the
service list, service area, credential strip and nav, <figure>/<figcaption> for
before/after pairs, work tiles and review cards. Where a section's heading
would be visual noise, it is present and .sr-only rather than absent — a
skipped heading level fails the §8 accessibility budget.

Supersedes the single-page structure this section described before CP6.

What main.js is allowed to do

Three things, and it is not load-bearing for any of them:

1. Hide the sticky bottom call bar while the page header is on screen. The bar
   is visible by default in CSS, so with JS off it is simply always there,
   which is the safe failure.
2. Client-side form validation — inline errors, never an alert().
3. Swap the submit button to a sending state and show the success message in
   place of the form.

If it is doing anything else, delete it.


5. SEO & local discovery
JSON-LD LocalBusiness in <head>: name, telephone, image, areaServed (array of cities), priceRange, url, and openingHours if Dad gives them. This is what feeds "handyman near me" results.
<title> formula: {{NAME}} — {{TRADE}} in {{AREA}} | Free Estimates
One <h1> only, containing name + trade + area.
Every image needs descriptive alt text naming the work and the city where relevant: alt="Repainted kitchen cabinets in Chula Vista, after" — not alt="after photo".
sitemap.xml with the single URL. robots.txt allowing everything.
The Google Business Profile matters more than the site itself for local search. If Dad doesn't have one, creating it is a launch task, not a nice-to-have. The site links to it; it links back to the site.
6. Forms — built in two stages

The form is the one part of the site that can't be host-agnostic, so it gets split: the markup and behavior are built during the GitHub phase, and the submission wiring is connected at CP9. Netlify Forms is the destination, because it needs zero backend and zero maintenance.

Stage 1 — CP5 (GitHub phase): everything except submission

Build the complete form, styled, validated, and accessible. It just doesn't send anywhere yet.

html
<form id="estimate" name="estimate" method="POST" action="#">
  <!-- action="#" is a placeholder. CP9 replaces this line. -->
  <p class="hp" aria-hidden="true">
    <label>Company <input name="company" tabindex="-1" autocomplete="off"></label>
  </p>
  <!-- .hp { display:none } — spam trap, must never be visible -->
  …
</form>
Three real fields: name (text, required), phone (tel, required, inputmode="tel"), need (textarea, required, max 500).
autocomplete="name" / autocomplete="tel" so phones autofill.
Real <label> elements. Placeholder text is never the label.
Validation JS shows inline errors, never an alert().
Success state: the form is replaced by a confirmation that repeats the number — "Got it. I'll call you back. Can't wait? Call (619) 555-0134."
Honeypot only. No reCAPTCHA — external request, mobile conversion killer, and the volume here doesn't come close to justifying it.
During CP5, main.js intercepts submit, runs validation, and renders the success state without sending anything. That proves the entire UX before any host is involved.

Because nothing sends during the GitHub phase, add a visible note in the README and a <!-- TODO CP9: form not wired --> comment directly above the form. A form that silently swallows submissions is the single worst bug this site could ship with.

Stage 2 — CP9 (Netlify): wire it up

Three changes, all inside CP9:

Add data-netlify="true" and netlify-honeypot="company" to the <form>, plus the hidden <input type="hidden" name="form-name" value="estimate">.
Remove action="#" and drop the JS submit interception, keeping validation.
In the Netlify dashboard, set the form notification email to {{EMAIL}} (Dad's). Kevin's address must not appear in the notification settings.

Then submit a real test and confirm it lands in Dad's inbox — that's launch gate check #3, and it cannot be skipped or simulated.

If you later decide against Netlify: the same form works with Web3Forms by setting action="https://api.web3forms.com/submit" plus a hidden access key. Stage 1 is deliberately built so either path is a ten-minute swap.

7. Images

The single biggest performance risk. Photos come off a phone at 4MB each.

Pipeline (scripts/optimize-images.sh):

Resize longest edge to 1600px.
Export WebP at quality 80 → .webp.
Export JPEG at quality 82 → .jpg fallback.
Strip EXIF. This is non-negotiable — phone photos carry GPS coordinates of the job sites, which means customers' home addresses.
Target: every image under 200KB, hero under 250KB.

Markup:

html
<picture>
  <source srcset="./assets/img/work-01-after.webp" type="image/webp">
  <img src="./assets/img/work-01-after.jpg"
       alt="…" width="1600" height="1200"
       loading="lazy" decoding="async">
</picture>

Explicit width/height on every image (prevents layout shift). The hero photo gets loading="eager" + fetchpriority="high"; everything else is lazy.

8. Performance & accessibility budgets

Hard limits. A checkpoint fails if any is exceeded.

Metric	Budget
Total page weight (first view)	< 900 KB
CSS	< 20 KB uncompressed
JS	< 5 KB uncompressed
Requests on load	< 15
LCP on simulated Slow 4G	< 2.5 s
Cumulative Layout Shift	< 0.05
Lighthouse Performance (mobile)	≥ 95
Lighthouse Accessibility	100

Accessibility requirements: all interactive elements ≥ 44×44px (spec says 52); visible focus states everywhere; text contrast ≥ 4.5:1; form inputs have real <label> elements, not placeholder-as-label; page is fully operable by keyboard; prefers-reduced-motion respected (which is easy — there's almost no motion).

9. Hosting, domain & deployment

Two phases, in this order. The whole site is built, reviewed, and approved on GitHub. Netlify is a migration at the end, not a dependency throughout.

Phase A — GitHub (CP0 through CP8)
Repo: GitHub, dads-site, private during the build, owned by Kevin.
Preview host: GitHub Pages, serving from the main branch root. URL is https://<username>.github.io/dads-site/ — note the subpath, which is exactly why every internal path is relative (§0 rule 6).
.nojekyll in the repo root so Pages serves the files as-is instead of running them through Jekyll.
Branch strategy: main is the preview. Work on build/cpN-* branches, one per checkpoint, merged via PR. Each PR body lists the checkpoint's exit criteria as a checklist.
This is the URL you show Dad. He reviews, comments, and approves the whole site here. Nothing about the review needs Netlify.
Known Phase A limitation: the contact form does not submit (§6). Every other feature is fully testable, including all call and text links.
Phase B — Netlify (CP9, after Dad approves)
Host: Netlify, connected to the same GitHub repo. Every push to main deploys automatically. Pull requests get deploy previews.
netlify.toml added at this point: force HTTPS, security headers (X-Content-Type-Options, Referrer-Policy, a basic CSP), cache /assets/* for a year, cache index.html for zero.
Netlify Forms wired per §6 Stage 2.
Turn GitHub Pages off once Netlify is live and the domain is pointed. Two live copies of the site is an SEO problem (duplicate content) and a support problem — Dad will eventually send someone the wrong link.
Domain: registered at Cloudflare or Namecheap in Dad's name, on Dad's card. Kevin never owns the domain. Enable auto-renew. Record the renewal date in HANDOVER.md.
Repo ownership transfers to Dad (or Dad is added as an owner) at handover.

Why this order: GitHub Pages needs no account signup, no build config, and no third-party service to review a static site. Bringing Netlify in early would mean debugging form plumbing and deploy settings while the design is still moving. Splitting them means each phase has one kind of problem to solve.

10. Checkpoints

Each checkpoint is one Claude Code session, one branch, one commit. Do not start the next until the exit criteria pass.

CP0–CP8 happen entirely on GitHub. CP9 is the Netlify migration, and it is the last thing that happens before launch.

CP0 — Repo skeleton (GitHub)

Create the directory structure from §3, .gitignore, .nojekyll, README.md stub, robots.txt, and content/source-of-truth.md with every 🔴 question from PRD §5 as an unanswered heading. No netlify.toml — that arrives at CP9. Exit: repo pushed to GitHub; GitHub Pages enabled on main; a placeholder page loads at https://<username>.github.io/dads-site/ over HTTPS.

CP1 — Design tokens & base stylesheet

css/styles.css with the §2.2 tokens, a modern reset, base typography, the button components, and section rhythm. No page content yet. Exit: a test page renders both buttons, all headings, and a testimonial card correctly at 375px and 1280px. Contrast checked.

CP2 — HTML skeleton, all 8 sections — SUPERSEDED BY CP6

Full semantic structure with {{TOKEN}} placeholders and gray PHOTO NEEDED blocks. Real tel: and sms: links using {{PHONE_RAW}}. Exit: page scrolls top to bottom on a phone; every section present in order; heading hierarchy validates; zero console errors.

CP3 — Hero + sticky call bars

Hero laid out per the wireframe, CSS-only sticky bottom bar, JS-revealed top bar. Body bottom padding correct. Exit: primary Call button is fully visible at 375×667 without scrolling; bottom bar never covers footer content; tapping Call opens the dialer on a real phone.

CP4 — Content sections — SUPERSEDED BY CP6

About, Services, Gallery, Testimonials, Service Area built out. CTA repeats placed after Services and in Contact. Exit: three call CTAs present and reachable; gallery grid correct at both breakpoints; no layout shift as images load.

CP5 — Contact form (markup + behavior only)

Build the form per §6 Stage 1: fields, labels, styling, validation JS, success state, honeypot. Submission is deliberately not wired — action="#" with JS intercepting submit. Exit: validation catches empty and malformed input with inline errors; success state renders; keyboard and screen-reader accessible; native HTML validation still fires with JS disabled; the TODO CP9 comment is in place above the form.

CP6 — Multi-page redesign

Replaces the single-page site with four pages and a new visual system: dark
--ink/--bone surfaces, an orange call accent, self-hosted Archivo and Public
Sans, square corners. Supersedes CP2 and CP4. Exit: all four pages load and
link to each other; the header Call pill and the sticky bottom bar both work;
the section nav shows the correct active item; the reviews marquee loops with
no jump, measured rather than eyeballed; no Google Fonts request; every page
renders fully with JavaScript disabled and native form validation still fires;
no horizontal scroll at 375px; CSS under 20KB, JS under 5KB, Lighthouse mobile
Accessibility 100.

CP6-content — Real content pass 🔴

Replace every {{TOKEN}} with Dad's real answers. Run the license branch (§1) and delete the unused wording. Write the real hero headline, About paragraph, and service list. Exit: grep -r "{{" . outside source-of-truth.md returns nothing. License wording matches actual status. Dad has read and approved every word.

CP7 — Real photos 🔴

Run all photos through optimize-images.sh. Place them, write real alt text, confirm EXIF is stripped. Exit: every placeholder block gone; every image < 200KB; exiftool shows no GPS data on any file; total page weight under budget.

CP8 — Polish & audit (still on GitHub)

Lighthouse run, accessibility audit, meta tags, JSON-LD, OG image, favicon, 404 page. Everything except hosting. Exit: all §8 budgets met on the GitHub Pages URL; Lighthouse mobile Performance ≥ 95 and Accessibility 100; Dad has seen the GitHub Pages URL on his own phone and approved it.

← Approval gate. Do not start CP9 until Dad has signed off on the site as it stands. Everything after this point is plumbing; nothing after this point should change the design.

CP9 — Netlify migration & launch 🚀

The only checkpoint that touches hosting. In order:

Create the Netlify account in Dad's name where possible, connect it to the GitHub repo, set the publish directory to the repo root, no build command.
Add netlify.toml per §9 Phase B — HTTPS redirect, security headers, cache rules.
Wire the form per §6 Stage 2: data-netlify, netlify-honeypot, hidden form-name, remove action="#" and the JS submit interception.
Set the form notification email to {{EMAIL}}. Verify Kevin's address appears nowhere in the notification settings.
Register the domain in Dad's name, point DNS at Netlify, confirm the automatic HTTPS certificate issues.
Update <link rel="canonical"> and the JSON-LD url to the real domain.
Disable GitHub Pages so only one live copy exists.
Rerun Lighthouse against the real domain.

Exit: the site loads at the real domain over HTTPS; the §11 launch gate passes end to end; GitHub Pages is off; §8 budgets still met.

11. Launch gate

Run at the end of CP9, against the real domain — not against the GitHub Pages preview. Five checks, on a real phone with WiFi turned off. All five must pass. No exceptions, no "we'll fix it after launch."

The call button dials the right number. Tap it. Let it ring Dad's actual phone. Watch it ring.
The text button opens a message to the right number, pre-addressed.
A form submission lands in Dad's inbox. Submit a real test. Confirm he sees it, on his phone, in the inbox he actually checks — not spam.
The page loads in under ~2.5s on cellular with the hero call button visible.
The license wording matches his actual license status, verified against source-of-truth.md.

Plus a final sweep: no {{tokens}}, no lorem, no placeholder images, no stock photos, no TODO CP9 comments left in the source, no Kevin's phone or email anywhere in the repo or in the Netlify notification settings, and GitHub Pages confirmed disabled.

12. Handover

HANDOVER.md, written in plain language for Dad, not for a developer:

Domain registrar, the account it's under, renewal date, annual cost.
Netlify account and how to find form submissions in the dashboard.
GitHub repo location.
Google Business Profile login.
How to change the phone number — the one edit he's most likely to need, written as literal step-by-step instructions.
What's covered in the 30-day window and what isn't.
Kevin's number for questions.

Deliver it printed as well as digital. A file on a laptop is a file he'll never find again.

13. Explicitly out of scope for the build

No CMS or admin panel. No blog, no multi-page structure, no site search. No booking, scheduling, quoting, invoicing, or payment. No login or user accounts. No live chat widget. No cookie banner (there are no cookies — keep it that way). No analytics in v1; if Dad wants numbers later, add a privacy-friendly script as a scoped follow-on. No embedded map. No carousel. No dark mode.

Spanish version: treated as Phase 2, not v1. If Dad says his customers are Spanish-speaking, the plan is /es/index.html as a full translation with hreflang tags and a text toggle in the header — not a JS string-swap, and not machine translation. Scope and price it separately.
