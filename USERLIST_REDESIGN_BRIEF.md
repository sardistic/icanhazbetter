# Userlist readability redesign — implementation brief

Hand this to a coding agent working in the `icanhazbetter` repo. It describes how to
port an approved visual prototype into the real extension code. The prototype is NOT in
this repo — all the concrete values you need are inlined below.

Touch only:
- `styles/theme.css` — userlist rules (search `ichc-ul-`)
- `scripts/modernize.js` — `buildUserList` and the row-render path (search `ichc-ul-user`)

Goal: the userlist is information-dense but jumbled. Keep every existing indicator, but put
them on a calm right-aligned grid, let **name brightness + section grouping** carry presence
state (drop the per-row left status dot/glyph), and make a couple of signals interactive.

---

## 1. Group rows by presence state, with section headers

Today rows are a flat list with a colored left border for state. Replace with three labelled
groups, in this order, each preceded by a small uppercase header:

- **ON CAM** — users currently broadcasting (the existing cammed set)
- **ACTIVE** — present, not on cam
- **IDLE** — away/idle

Section header style:
```css
.ichc-ul-section {
  font: 800 9px/1 -apple-system, Inter, sans-serif;
  letter-spacing: .12em;
  text-transform: uppercase;
  padding: 14px 9px 5px;   /* first one: 9px top */
}
.ichc-ul-section.cam    { color: #6cbf8a; }
.ichc-ul-section.active { color: #878d99; }
.ichc-ul-section.idle   { color: #5a5d66; }
```
In `buildUserList`, partition users into the three buckets before rendering and emit a
header node before each non-empty bucket. Within a bucket keep your existing sort (karma desc).

## 2. Drop the left status dot/glyph; encode presence as name brightness

Remove the per-row left color border/dot. Presence is now conveyed by the section AND by the
username color/weight:

```css
.ichc-ul-user-name { font-size: 13px; }
.ichc-ul-section-cam    .ichc-ul-user-name { font-weight: 600; color: #f4f6f8; }
.ichc-ul-section-active .ichc-ul-user-name { font-weight: 600; color: #cfd3da; }
.ichc-ul-section-idle   .ichc-ul-user-name { font-weight: 500; color: #777c85; }
```
(If usernames currently carry per-user colors, keep that as an option but default to these
neutral state colors — the prototype decision was "color only signals state.")

## 3. Right-aligned grid: name on the left, karma stack on the right

Each row is a 2-col grid (3-col when avatars are on). Karma number and its underline bar are
right-aligned so they form a clean column; the year badge sits above the karma, revealed on hover.

```css
.ichc-ul-user {
  display: grid;
  grid-template-columns: 1fr auto;          /* avatars on: 24px 1fr auto */
  align-items: center;
  gap: 10px;
  padding: 5px 9px;                          /* "roomy"; cozy = 3px 9px */
  border-radius: 5px;
}
.ichc-ul-user:hover { background: rgba(255,255,255,.045); }

/* right-hand stack: year (hover) over karma over bar */
.ichc-ul-meta { display: grid; grid-template-rows: 11px auto; justify-items: end; gap: 2px; }
.ichc-ul-karma {
  font: 700 11px/1 -apple-system, Inter, sans-serif;
  font-variant-numeric: tabular-nums;
}
```
Format karma with thousands separators (`(26822).toLocaleString('en-US')` → `26,822`).

## 4. Karma underline bar — width scales with karma (log)

Under each karma number, a 2px rounded bar tinted by tier. **Its width encodes karma** on a
log scale so it doubles as an at-a-glance gauge. Right-align it so higher karma extends left.

```css
.ichc-ul-karma-bar { height: 2px; border-radius: 2px; }
```
Compute width per row (JS), clamp to the list's current max karma:
```js
// MAXK = highest karma currently in the list (recompute per render)
const barW = 6 + 24 * (Math.log(k + 1) / Math.log(MAXK + 1)); // px, ~6..30
el.style.width = barW.toFixed(1) + 'px';
```
Set both the karma text and the bar color from the existing karma tier, with the bar at lower
alpha. Tier RGB ramp (index by tier; reuse your existing tier thresholds if present):
```
0 500-      120,124,138      5 10k+    80,196,150
1 500+      130,120,180      6 25k+   202,168,72
2 1k+        95,110,205      7 50k+   206,104,150
3 2.5k+      70,150,210      8 100k+   96,200,210
4 5k+        60,180,195
```
Bar alpha by section: cam `.55`, active `.45`, idle `.32`. Karma text alpha: cam `.95`,
active `.9`, idle `.62`.

## 5. Year / account-age badge → reveal on row hover

The year badge currently shows inline (was on hover per your note — keep that, formalize it).
Render it in the meta stack's top row, hidden at rest, fading in on hover. No layout shift
because the row reserves the 11px track.
```css
.ichc-ul-year-badge { opacity: 0; transition: opacity .12s ease; font: 700 9px/1 sans-serif; color: #8a8f98; }
.ichc-ul-user:hover .ichc-ul-year-badge { opacity: 1; }
```
Format as two digits with an apostrophe: `2015` → `'15`.

## 6. Inline role icons (keep mod shield, supporter heart)

Render mod/supporter icons inline right after the name (not as separate columns), small,
flex `gap: 5px`:
- Mod shield — `#7c8cde`, 11px
- Supporter heart — `#e0759f`, 10px (idle: drop to `rgba(224,117,159,.7)`)
With avatars on, supporter also gets an avatar ring: `box-shadow: 0 0 0 1.5px rgba(224,117,159,.9), 0 0 8px rgba(224,117,159,.45)`.

## 7. Cam-hidden users — keep on cam, eye-slash toggle

A user whose cam you've hidden is still broadcasting: keep them in **ON CAM**, still counted in
the cam total. The repo already tracks this (`hiddenCamCount`, class `ichc-ul-hidden-live` —
reuse them). Render an **eye-slash button inline after the name** that toggles the hidden state
(wire it to the existing hide/show cam handler — it already does this on click). Hidden user's
name dims to `#9298a4`.

```css
.ichc-ul-eye { background: none; border: 0; padding: 0; cursor: pointer; color: #787d87; display: flex; }
.ichc-ul-eye.reveal { opacity: 0; }                         /* open-eye: hide-this affordance */
.ichc-ul-user:hover .ichc-ul-eye.reveal { opacity: .5; }
.ichc-ul-eye.on { opacity: .9; }                            /* eye-slash: currently hidden */
.ichc-ul-eye:hover { color: #d4d8df; opacity: 1; }
```
- Not hidden → open-eye icon, appears on row hover, click = hide cam.
- Hidden → eye-slash icon, always visible, click = show cam.

Do NOT add a hidden-count chip to the header (the header carries digits only — see §8).

## 8. Header: split-flap cam / here counter (digits only, no labels)

Keep the existing flip-style counter but **remove the "ON CAM" and "HERE" text labels** and any
hidden-count chip — color alone encodes meaning. Two groups: cam count (green digits `#3fce72`)
and here count (blurple `#8e98c4`). Each digit is an 18×26 tile with a center seam and a top leaf
that flaps down on change. If the flip animation already exists, just restyle to these colors
and sizes and strip the labels; don't rebuild it.

## 9. Collapsible "Hidden" footer (offline blocked/ignored)

At the very bottom, a collapsible section for blocked/ignored users who are NOT broadcasting
(distinct from cam-hidden in ON CAM). Collapsed by default.
```css
.ichc-ul-hidden-hd { display: flex; align-items: center; gap: 7px; padding: 14px 9px 5px; cursor: pointer; user-select: none; }
.ichc-ul-hidden-hd:hover { background: rgba(255,255,255,.035); border-radius: 5px; }
```
Header: `HIDDEN` label (`#5a5d66`, 9px/800/.12em) + count + chevron (right when collapsed, up
when expanded). Expanded rows: name struck through (`text-decoration: line-through; color: #6b7079`),
row at `opacity: .62`, with a reveal eye-slash button (click = un-hide). Persist the
collapsed/expanded flag (localStorage) so it survives reloads.

## 10. Avatars + profile-background wash (both opt-in, leave gated as today)

- **Avatars** stay opt-in. When on, prepend a 24px circular avatar column
  (`grid-template-columns: 24px 1fr auto`), initial fallback when no image.
- **Profile-background fetch**: when a user has a fetched profile image, wash it behind the row,
  anchored to the right edge, very low contrast so the name reads first:
  ```css
  background: radial-gradient(135% 130% at 100% 50%,
              <img-derived tint> / .20, transparent 72%);
  ```
  Idle rows: drop the wash alpha to ~`.10`. Keep this behind its existing opt-in flag.

## 11. Density & lurker fade (keep)

- Density toggle: roomy = `padding: 5px 9px`, cozy = `3px 9px`.
- Lurker fade (old account + low karma): keep — `opacity: .5; filter: grayscale(.7)` on the row.

---

## Acceptance checks
- Users split into ON CAM / ACTIVE / IDLE headers; no per-row left dot remains.
- Karma bar visibly longer for higher-karma users; bars align on the right edge.
- Year badge hidden until row hover; no row height change on hover.
- Clicking the eye on a cam user hides/shows their cam and updates the ON CAM hidden count.
- Hidden footer collapsed by default, expands, reveal buttons un-hide, state persists.
- Mod/supporter/lurker/avatars/profile-bg all still function, just regrouped.
- No regressions to the split-flap counter behavior; header shows digits only (no ON CAM/HERE labels, no hidden chip).

## Local test loop
1. `chrome://extensions` → Developer mode → Load unpacked → repo folder
2. Edit `theme.css` / `modernize.js` → click ↻ on the extension card → refresh the chat tab
3. `git checkout -b userlist-readability` → commit → push → PR
