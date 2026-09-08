# BLOCKERS

Open items that code cannot fix. Newest last.

---

## [CP6] GitHub Pages is not live, and there is no `main` branch — 2026-09-08
**Type:** C
**Goal:** Verify exit criterion 1 — "all four pages load from index.html and link
to each other correctly" — on the GitHub Pages URL, as the checkpoint asks.

**Exact error:**
```
$ git ls-remote --heads origin
9db28021d77375c816e1d573fa52d955722bf009	refs/heads/claude/repository-checkpoint-creation-mxtudy

$ curl -s -o /dev/null -w "%{http_code}" https://kaydenkamberi.github.io/Hire_Me-Dad/
000
```
The repository has exactly one branch and it is not `main`. The Pages URL does
not resolve.

**Ruled out:**
- "Pages is enabled but slow to build" — the URL returns no HTTP status at all,
  not a 404 from a Pages host, so nothing is deployed at that hostname.
- "It is published from a different branch" — there is only one branch on the
  remote, so there is no other candidate to publish from.

**Not attempted, deliberately:** enabling Pages and creating `main` both need
your GitHub account, which the CP6 prompt names as a Type C boundary. Zero
retries per the escalation protocol.

**I need from you:** create a `main` branch and switch on GitHub Pages
(Settings → Pages → Deploy from a branch → `main` / root), or tell me to stop
verifying against Pages.

**Options:**
1. Merge `build/cp6-redesign` into a new `main` and enable Pages from it
   (recommended — it is what the build spec §9 Phase A assumes, and it is the
   URL Dad reviews the site on at CP8).
2. Enable Pages from `build/cp6-redesign` directly. Works today, but the branch
   is per-checkpoint and will be gone after the next merge.
3. Skip the Pages check until CP8 and keep verifying locally.

**Impact:** exit criterion 1 was verified locally instead — all four pages
served over HTTP, every internal link returning 200, no absolute paths. The
only thing unverified is that they behave the same on a Pages subpath. Every
internal path is relative, which is what that subpath would test.
