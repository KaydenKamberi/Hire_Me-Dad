# Source of Truth — Dad's Hire-Me Site

**This is the only place content lives.** Nothing anywhere else in this repo may
contain a fact about Dad that isn't written down here first. If a sentence on the
site can't be traced back to an answer below, it doesn't ship.

**How to use this file:** Dad answers, in his own words. Kevin types the answers
under the headings — no polishing, no marketing voice, no inventing. The words he
actually uses to describe his work are usually better than anything we'd write for
him, because they're the words his customers use too.

**Status legend:**
- 🔴 **UNANSWERED** — blocks launch. Every one of these must be filled in.
- 🟡 **OPTIONAL** — leave blank if it doesn't apply; the build handles the empty case.

> ⚠️ Nothing is answered yet. This file was created at CP0 as the empty
> questionnaire. CP2–CP5 build the site around `{{TOKEN}}` placeholders;
> **CP6** is where these answers replace them.

---

## Part 1 — The tokens

These map one-to-one to the `{{TOKEN}}` placeholders in `index.html`. The heading
names the token; the answer under it is what gets substituted at CP6.

Part 2 does the same for the prose. The build spec's token table only names
facts, but the About paragraph and the service list need to be greppable too —
otherwise they slip past the `grep -r "{{" .` gate at CP6 and ship as
placeholders. So they get tokens as well, and they're named in each heading
below.

### 🔴 `{{NAME}}` — What name should customers see?
*Not his legal name unless that's what he goes by on a job. If he introduces
himself as "Mike" and not "Miguel", that's the answer.*

**Answer:**

---

### 🔴 `{{FIRST_NAME}}` — First name alone
*Used in the About heading: "About ______".*

**Answer:**

---

### 🔴 `{{TRADE}}` — What does he call what he does?
*In customer words, not industry words. "Handyman" beats "residential maintenance
contractor". If he does several things, lead with the one he wants more of.*

**Answer:**

---

### 🔴 `{{AREA}}` — Primary service area
*The one city or region that goes in the page title and the hero. Singular. The
full list of cities goes in Part 2.*

**Answer:**

---

### 🔴 `{{YEARS}}` — Years doing this work
*A number. If it's "about 20", write 20 — but confirm it's defensible; it appears
in the hero trust strip.*

**Answer:**

---

### 🔴 `{{PHONE_DISPLAY}}` — Phone number, formatted for reading
*Exactly as it should appear on the button: `(619) 555-0134`.*

**Answer:**

---

### 🔴 `{{PHONE_RAW}}` — Same number in E.164, for `tel:` and `sms:`
*No spaces, no dashes, leading `+` and country code: `+16195550134`.*

**Answer:**

---

### 🔴 `{{EMAIL}}` — Where form submissions go
*Dad's inbox — the one he actually checks on his phone. **Not Kevin's.** This is
launch gate check #3 and it is verified against a real submission at CP9.*

**Answer:**

---

### 🔴 `{{LICENSE_LINE}}` — License status
*This one forks the copy — see "The license branch" below. Answer with either the
full license string exactly as it must legally appear (e.g. `CA Lic. #1234567`),
or the single word `NONE`.*

**Answer:**

---

### 🔴 `{{GOOGLE_REVIEW_URL}}` — Google Business Profile link
*The share link to leave/read reviews. If Dad doesn't have a Google Business
Profile yet, **creating one is a launch task, not a nice-to-have** — it matters
more for "handyman near me" than the website does. Write `NEEDS CREATING` here
until it exists.*

**Answer:**

---

### 🟡 `{{WHATSAPP_RAW}}` — WhatsApp number, if he uses it
*E.164 like `{{PHONE_RAW}}`. Leave blank if he doesn't use WhatsApp for work — the
secondary button falls back to SMS.*

**Answer:**

---

### 🔴 `{{DOMAIN}}` — Final domain
*Set at CP9. Registered in Dad's name, on Dad's card. Until then the site lives at
the GitHub Pages preview URL.*

**Answer:**

---

## Part 2 — The content

### 🟡 Hero headline — an override, only if he has a better line
*The hero's second line is built from the answers above as `{{TRADE}} in
{{AREA}}`, so there is nothing to fill in here by default.*

*If Dad has a better way of putting it, write it here and it replaces that line.
**One constraint:** it is the page's only `<h1>`, and local search reads it, so
it must still name the trade and the area. "Painting and drywall in Chula Vista"
works. "Your neighborhood fix-it guy" does not, on its own.*

**Answer:**

---

### 🔴 `{{ABOUT_BODY}}` — About, 2 to 3 sentences, first person, plain words
*Ask him: "How would you describe yourself to a neighbor who needs work done?"
Record the answer. Do not rewrite it into marketing copy. It must end with what
he'll do for the customer, not with a claim about himself.*

**Answer:**

---

### 🔴 `{{SERVICE_1}}` … `{{SERVICE_6}}` + `{{SERVICE_n_DESC}}` — 6 things he does
*A checkmark list. **If it's not on the list, he doesn't do it** — so don't pad it.
Better to have six things he's genuinely good at than ten that invite calls he'll
turn down.*

*Each row also carries one line of description — what it actually covers.*

**Answer:**

| # | Service (`{{SERVICE_n}}`) | One line of detail (`{{SERVICE_n_DESC}}`) |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
| 6 | | |

---

### 🔴 `{{AREA_1}}` … `{{AREA_6}}` — every city and neighborhood he'll drive to
*Plain comma-separated text on the site, not a map. One entry per city — the
page has six slots and CP6 adds or removes them to match. List them all here;
the page closes with "Not sure if you're in my area? Just call and ask."*

**Answer:**

---

### 🔴 `{{QUOTE_n}}` / `{{QUOTE_n_WHO}}` — 3 to 5 real quotes
*The home page marquee shows **four** and loops them, so four is the number to
aim for. If only two are real, we ship two and the loop distance is recomputed —
a wrong distance makes the scroll visibly jump.*

*Real customers, real words, first name + city. **Permission is required for each
one.** No composites, no "representative" quotes, nothing written on their behalf.
If we only have two real ones, we ship two.*

**Answer:**

| # | Quote (their words) | First name | City | Permission given? |
|---|---|---|---|---|
| 1 | | | | ☐ |
| 2 | | | | ☐ |
| 3 | | | | ☐ |
| 4 | | | | ☐ |
| 5 | | | | ☐ |

---

### 🔴 `{{ALT_*}}` — 8 to 10 real job photos, plus one of Dad working
*No stock photos, ever — see build spec §0 rule 4. Before/after pairs where they
exist, singles where they don't. Every photo needs alt text naming the work and,
where relevant, the city: "Repainted kitchen cabinets in Chula Vista, after".*

*Every photo goes through `scripts/optimize-images.sh` before it enters
`assets/img/`. **EXIF is stripped — non-negotiable.** Phone photos carry GPS
coordinates of job sites, which are customers' home addresses.*

**Answer:**

| File | What it shows | City | Before/After/Single | Alt text |
|---|---|---|---|---|
| `dad-hero` | Dad on a job | | Single (hero) | |
| `work-01-before` | | | Before | |
| `work-01-after` | | | After | |
| `work-02-before` | | | Before | |
| `work-02-after` | | | After | |

---

### 🟡 Hours — only if he wants to commit to them
*Feeds the JSON-LD `openingHours`. If he'd rather people just call whenever, leave
this blank and we omit the field entirely — better than publishing hours he'll
break.*

**Answer:**

---

### 🟡 Price range — the `$`–`$$$$` band for JSON-LD
*Not a price list. The site quotes nothing; estimates are free and given by phone.*

**Answer:**

---

### 🔴 `{{HERO_BODY}}` — the one paragraph under the hero headline
*One or two sentences. What he does, where, and that estimates are free. This
is the first thing a stranger reads after the headline, so it is his pitch in
plain words — not a list of services.*

**Answer:**

---

### 🔴 `{{JOB_1..6_TITLE}}` / `{{JOB_1..6_CITY}}` — the six jobs shown by name
*Jobs 1–3 are the tiles on the home page. Jobs 4–6 are the before/after pairs
on the work page, so those three need both a before and an after photo of the
same room from the same angle.*

**Answer:**

| # | Where it appears | Job title | City |
|---|---|---|---|
| 1 | Home, large tile | | |
| 2 | Home, small tile | | |
| 3 | Home, small tile | | |
| 4 | Work, before/after | | |
| 5 | Work, before/after | | |
| 6 | Work, before/after | | |

---

### 🟡 `{{HOURS}}` — hours, only if he wants to commit to them
*Shown on the contact page above "Calls after hours get returned the next
morning." If he would rather people call whenever, say so and this row comes
out entirely — better than publishing hours he will break.*

**Answer:**

---

## Part 3 — The license branch

`{{LICENSE_LINE}}` is not cosmetic. It forks the copy, and at CP6 one branch is
implemented and **the other is deleted entirely from the repo.**

**If licensed** (a real license number is written above):
- The license string appears in the footer and in the hero trust strip.
- Copy may say "Licensed & Insured" — but **only if insurance is confirmed too.**

  🔴 **Is he insured?** (Yes / No — required if the answer above is a license number)

  **Answer:**

**If not licensed** (`NONE` written above):
- The words **licensed, certified, bonded, insured** and any badge or shield
  iconography are **forbidden anywhere in this repo.**
- Trust copy leads instead with `{{YEARS}}` years of experience, real photos, and
  neighbor testimonials.
- The check `grep -ril "licens" .` (excluding this file) must return nothing.

This is the fifth launch gate check and it is verified against this file, on a real
phone, before the site goes live.

---

## Part 4 — Sign-off

- ☐ **Dad has read every word that appears on the site** and approved it (CP6).
- ☐ Every photo is real, is his work, and no customer address is identifiable (CP7).
- ☐ Dad has seen the live URL **on his own phone** and approved it (CP8).
- ☐ License wording matches his actual status, checked against Part 3 (CP9).
