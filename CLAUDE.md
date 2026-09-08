# CLAUDE.md — dads-site

Read this before doing anything. It governs every session in this repo.

## What this is

A one-page "hire me" website for a tradesman. Its only job is to make a
stranger on a phone tap **Call**. Success is the phone ringing.

Full specs live in `docs/`:

- `docs/build-spec.md` — the technical spec. Section numbers below (§2, §8…)
  refer to it. **This is the source of truth for every build decision.**
- `docs/prd.md` — the what and why.
- `content/source-of-truth.md` — the client's real answers. The only place
  content comes from.

## Golden rules

These are not preferences. Breaking one is an automatic stop (see Escalation).

1. **Mobile is the design, desktop is the adaptation.** Every decision starts
   at 375px wide.
2. **No framework, no build step, no npm.** Plain HTML, CSS, vanilla JS. If a
   task seems to need `package.json`, the task is wrong — stop and ask.
3. **The page must fully work with JavaScript disabled.** JS is polish only.
   Phone links are real `<a href="tel:">` in the HTML, never injected.
4. **No stock photos, ever.** Missing images are flat gray blocks labeled
   `PHOTO NEEDED: [description]`. Never fill a gap with a stock image.
5. **No external requests, and no webfont may be loaded from a third-party
   host — fonts are self-hosted in `assets/fonts/`.** No Google Fonts link, no
   CDN, no analytics, no jQuery. Inline SVG only.
6. **All internal paths are relative** (`./css/styles.css`). The site runs on
   a GitHub Pages subpath now and a domain root later.
7. **Host-agnostic until CP9.** No `netlify.toml`, no `data-netlify`
   attributes, nothing host-specific enters the repo before then.
8. **`--accent` is only ever used for call/text buttons.** Nothing else.

## Working method

- **One checkpoint per session.** Do not start the next checkpoint, even if
  the current one finished early. Stop and report.
- **One branch per checkpoint:** `build/cpN-short-name`.
- **Commit at every passing exit criterion**, not once at the end. Small
  commits are the recovery mechanism — reverting beats debugging.
- Commit messages: `CP3: sticky call bar reveals after hero`.
- Before claiming a checkpoint is done, re-read its exit criteria in
  `docs/build-spec.md` §10 and verify each one literally. Do not verify from
  memory of what you built.

## Escalation protocol — when something goes wrong

The expensive mistake is grinding on a problem that code cannot fix.
**Classify the failure before attempting a second fix.**

### Failure classes

- **Type A — mechanical.** Typo, wrong path, bad flag, syntax error. You have
  everything you need. → Retry, subject to the stop rules below.
- **Type B — knowledge gap.** You don't know how a tool or API behaves. →
  ONE research attempt (read real docs, inspect real output), then
  re-evaluate. Do not guess repeatedly.
- **Type C — blocked, not broken.** Needs a human decision, an account,
  a credential, a login, a file or photo that does not exist, or something
  that contradicts this file or the spec. → **ZERO retries. Stop
  immediately.** No amount of code fixes a Type C.

Most wasted effort is a Type C being treated as a Type A. When a failure
involves authentication, account setup, a missing asset, or an unanswered 🔴
question, it is Type C. Stop.

### Stop rules

Stop at whichever comes first:

1. **Three distinct hypotheses.** Not three retries — three genuinely
   different explanations of the cause. Re-running a command with a tweak is
   the same hypothesis.
2. **The same error twice in a row.** Identical error on consecutive attempts
   means you learned nothing; attempt three will not differ. Stop on the spot.
   This rule outranks the count.
3. **A golden rule would have to break** to proceed. Automatic stop.
4. **~15 tool calls spent on a single exit criterion.** Stop regardless of how
   close it feels.

### What to do when you stop

1. **Append an entry to `BLOCKERS.md`** in the repo root, in exactly this
   format:

   ```markdown
   ## [CP#] Short title — YYYY-MM-DD
   **Type:** A / B / C
   **Goal:** what I was trying to accomplish
   **Exact error:**
   ```
   (paste verbatim, do not paraphrase)
   ```
   **Ruled out:**
   - hypothesis 1 — how I tested it, what happened
   - hypothesis 2 — …
   **I need from you:** one specific question or action
   **Options:**
   1. … (recommended, because …)
   2. …
   ```

   Write it so it can be answered from a phone in one reply, without opening
   the repo.

2. **Decide isolated vs foundational.**
   - *Isolated* (one item, e.g. an image tool isn't installed): stub it,
     note the stub in `BLOCKERS.md`, keep working on everything else.
   - *Foundational* (e.g. the repo won't push): halt the session. Everything
     downstream would be built on an assumption.

3. **Report at the end of the session**: what passed, what's blocked, what
   you need.

### Never

- Never mark an exit criterion passed when it isn't.
- Never delete, skip, or weaken a check to make it pass.
- Never silently substitute a placeholder for a thing that failed.
- Never install a package, add a framework, or change a spec decision to
  route around a blocker.
- Never invent content. If the client hasn't answered it, it stays a
  `{{TOKEN}}`.

A checkpoint that reports "blocked, here's why" is a good outcome. A
checkpoint that claims it passed when it didn't costs a day.

## Content placeholders

Real content is absent until CP6. Use `{{TOKEN}}` form verbatim so it's
greppable — `{{NAME}}`, `{{TRADE}}`, `{{AREA}}`, `{{YEARS}}`,
`{{PHONE_DISPLAY}}`, `{{PHONE_RAW}}`, `{{EMAIL}}`, `{{LICENSE_LINE}}`,
`{{GOOGLE_REVIEW_URL}}`, `{{WHATSAPP_RAW}}`, `{{DOMAIN}}`.
Full table in `docs/build-spec.md` §1.

**The license branch:** never write "licensed", "certified", "bonded", or
"insured" anywhere until the client's license status is confirmed in
`content/source-of-truth.md`. Claiming it falsely is a legal problem, not a
copy problem.

## Privacy

Job-site photos from a phone carry GPS EXIF data — the customers' home
addresses. **Every image must have EXIF stripped before it is committed.**
No exceptions, no "we'll do it at the end."

## Budgets (docs/build-spec.md §8)

CSS < 20KB · JS < 5KB · total page < 900KB · < 15 requests ·
LCP < 2.5s on Slow 4G · CLS < 0.05 · Lighthouse mobile Perf ≥ 95, A11y 100.

Every interactive element ≥ 44px tall (spec says 52). Contrast ≥ 4.5:1.
