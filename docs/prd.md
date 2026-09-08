PRD: [Dad's Name] — Hire-Me Website

Author: Kevin | Client: Dad | Version: 0.2 (Draft) Status: Ready for the Dad meeting. 🔴 = answer needed from Dad before build starts.

1. Goal

A one-page website that makes a stranger tap Call.

Success: the phone rings from someone who found the site. Not the goal: a company site, a blog, SEO campaigns, e-commerce, or anything with a login or database.

2. Audience & Device
Who: homeowners in the San Diego area, mostly on their phones.
How they decide (~30 seconds): Does he do what I need? Is he near me? Can I trust him? How do I call him?
Design consequence: mobile-first, big tap targets, no small text, no horizontal scrolling, works one-handed.
🔴 Language: English / Spanish / both. If both, it's one page with a language toggle — not two sites.
3. Primary Action

Ranked. Everything on the page serves #1.

Tap-to-call — tel: link, repeated 3× down the page (hero, after gallery, contact).
Tap-to-text — sms: link, sits next to every call button.
WhatsApp chat — 🔴 only if Dad uses WhatsApp for work.
Contact form — 3 fields max: name, phone, what they need.
4. Page Sections, In Order
#	Section	Content	Blocked by
1	Hero	Name + trade + area + years, one big Call/Text button	🔴 name, trade, years
2	About	2–3 sentences + real photo of Dad on a job	🔴 photo
3	Services	Short list, plain words customers use	🔴 service list
4	Before/After Gallery	8–10 photos, same-angle pairs where possible	🔴 photos
5	Testimonials	3–5 quotes, first name + city	🔴 quotes
6	Service Area	Cities / neighborhoods, written out as text	🔴 area list
7	Contact	Form + call/text/WhatsApp + Google review link	🔴 phone, email
8	Footer	Service area recap, license # if any, "Site by Kevin — [link]"	🔴 license

Draft hero headline: "[Name] — [Trade] in [Area]. [X]+ Years. Free Estimates."

5. Meeting Checklist — What Dad Must Provide

Ask #2 first; it changes the wording of the whole site.

 Phone number + email the site should use
 License status — CSLB licensed? License #? Or does he work under licensed contractors?
 Exact list of services to advertise
 Service area — cities and neighborhoods
 Customer language — English / Spanish / both
 8–10 best job photos, plus 1 photo of him and 1–2 action shots
 3–5 customer testimonials (a screenshot of a text message is fine)
 Does he use WhatsApp for work?
 Google Business Profile — does one exist? If not, create it together
 Years of experience — exact number

Photo collection: AirDrop / text them during the meeting. Do not leave without the photos — they are the longest pole in the build.

6. Trust Signals
Exact years of experience 🔴
"Free estimates"
Real photos only. Zero stock images. A stock photo of a stranger's kitchen is the fastest way to lose a homeowner's trust.
Local proof: named neighborhoods, first-name-plus-city testimonials.

Licensing rule (non-negotiable): if he is CSLB licensed, California law requires the license number in advertising, so it goes in the hero or footer. If he is not licensed, the site must not claim, imply, or hint at it — no "licensed and insured", no "certified", no badge graphics. When unlicensed, lead with years of experience and real work instead.

7. Tech Stack

Kevin's call, not Dad's.

Build: hand-written HTML/CSS, mobile-first, single page. No framework.
Version control: GitHub.
Hosting: Netlify free tier, with Netlify Forms. Fallback: GitHub Pages + Web3Forms.
Form notifications: → Dad's email only. Never Kevin's.
Reviews: live on Google Business Profile; the site links to them.
Domain: ~$12/yr, Namecheap or Cloudflare, registered in Dad's name, paid on Dad's card.
Performance: images compressed (TinyPNG / WebP), target under 2s on cellular. Test on a real phone with WiFi off before launch.
Accessibility floor: real alt text on photos, tap targets ≥ 44px, text contrast that survives outdoor sunlight.
8. Out of Scope

Show this page to Dad. It protects both of you.

Kevin does not handle leads, customer data, or reply to inquiries. Every inquiry goes straight to Dad.
No multi-page site, blog, SEO campaign, or paid ads.
No logo design (separate project if wanted).
No email accounts, invoicing, scheduling, or booking system.
Revisions: 2 rounds included after the first draft. Beyond that, per-edit pricing.
Support: 30-day bug-fix window after launch. Bug fix = something broken. New content or new sections are edits, not bugs.
After 30 days: optional $5–10/mo maintenance plan, or Dad's on his own.
9. The Deal
Price: $100 flat.
Payment: on approval. (Family rate. Future clients: 50% up front.)
Referral clause: Dad shows the site to guys on job sites and passes out Kevin's number. This is part of the price.
Ownership: Dad owns the domain and the final files. Kevin may show the site in his portfolio.
Sign at the meeting.
10. Timeline
When	What	Done when
Weekend 1	Dad meeting; collect all §5 items	Every 🔴 above is answered
Week 2 evenings	Finalize PRD, write site copy, compress photos	Copy approved by Dad
Weekend 2	Build, deploy, test on a real phone over cellular	Call button works from Dad's phone
Launch	Point domain, hand over logins	30-day bug-fix window starts

Launch gate — do not go live until all five pass:

Call button dials the right number from a real phone.
Text button opens a message to the right number.
Form submission lands in Dad's inbox (test it end to end).
Page loads in under ~2s on cellular.
License wording matches his actual license status.
