# Rolodex broadcast toggle — drop-in for icanhazbetter

Replaces the Go Live / Stop Live button's bobbing red glow with a 3D rolodex:
hover peeks from a random top/bottom, click rolls 1¼ turns in a random direction
to the opposite state, and it idle-fidgets ±180° every ~7s to a 2nd GO LIVE face.

Two edits only: `scripts/modernize.js` (the function + one call) and `styles/theme.css`
(the prism styles, replacing the old `.ichc-live` glow rules).

The button is `a.ichc-broadcast-btn` inside `#ichc-primary-actions`, toggled live via the
`.ichc-live` class — the JS reads that class, so the site's own publish handler still drives
the actual broadcast state. We only restyle + spin.

────────────────────────────────────────────────────────
## 1. scripts/modernize.js
────────────────────────────────────────────────────────

Add this function (e.g. near the other button helpers):

```js
function ichcBuildRolodex(btn) {
  if (btn.querySelector('.ichc-rolo')) return;        // build once
  btn.classList.add('ichc-rolo-btn');
  const GO   = '<span class="ichc-face go">GO LIVE</span>';
  const STOP = '<span class="ichc-face stop"><i class="ichc-rec"></i>STOP LIVE</span>';
  const GO2  = '<span class="ichc-face go2">' + ICONS.broadcast + 'GO LIVE</span>';
  btn.innerHTML =
    '<span class="ichc-rolo"><span class="ichc-tilt"><span class="ichc-prism">' +
      '<span class="ichc-f f0">' + GO   + '</span>' +
      '<span class="ichc-f f1">' + STOP + '</span>' +
      '<span class="ichc-f f2">' + GO2  + '</span>' +
      '<span class="ichc-f f3">' + STOP + '</span>' +
    '</span></span></span>';

  const prism = btn.querySelector('.ichc-prism');
  const tilt  = btn.querySelector('.ichc-tilt');
  let rot = 0, hover = false;
  const live = () => btn.classList.contains('ichc-live');
  const rnd  = () => (Math.random() < 0.5 ? -1 : 1);
  const apply = (ms, ease) => {
    prism.style.transition = 'transform ' + ms + 'ms ' + ease;
    prism.style.transform  = 'rotateX(' + rot + 'deg)';
  };

  // Peek from top OR bottom at random, each hover
  btn.addEventListener('mouseenter', () => {
    hover = true; const d = rnd();
    tilt.style.transform = 'rotateX(' + (22 * d) + 'deg) translateY(' + (-d) + 'px)';
  });
  btn.addEventListener('mouseleave', () => { hover = false; tilt.style.transform = ''; });

  // Click: spin 1¼ turns in a random direction → lands on opposite state
  btn.addEventListener('click', () => {
    rot += 450 * rnd();
    apply(950, 'cubic-bezier(.5,.04,.18,1)');
  }, true);

  // Idle fidget: when NOT live and not hovered, roll ±180° (random L/R) to 2nd GO LIVE face
  setInterval(() => {
    if (live() || hover) return;
    rot += 180 * rnd();
    apply(1200, 'cubic-bezier(.4,.12,.22,1)');
  }, 7000);
}
```

Then call it once, right after the button gets its class (search `ichc-broadcast-btn`,
~line 2122 in the existing setup):

```js
broadcastBtn.classList.add('ichc-broadcast-btn');
ichcBuildRolodex(broadcastBtn);                 // ← add this line
```

If the site ever re-renders the button label and wipes the prism, just call
`ichcBuildRolodex(broadcastBtn)` again (the guard makes it a no-op when already built).

Faces alternate GO / STOP every 90°, so any odd quarter-turn count (450° = 5) flips to the
opposite state, while 180° (even) keeps the same state but shows the second GO face.

────────────────────────────────────────────────────────
## 2. styles/theme.css
────────────────────────────────────────────────────────

Delete the old live-glow rules: the `@keyframes ichc-golive-glow` and
`@keyframes ichc-golive-icon-pulse` blocks, plus
`#ichc-primary-actions > a.ichc-broadcast-btn.ichc-live { … animation … }` and its
`.ichc-live .ichc-btn-icon-lg svg { animation … }` companion. Then add:

```css
/* neutralise the base button chrome when the rolodex is mounted */
#ichc-primary-actions > a.ichc-broadcast-btn.ichc-rolo-btn {
  padding: 0 !important; background: transparent !important; border: 0 !important;
  box-shadow: none !important; overflow: visible !important; animation: none !important;
}

.ichc-rolo  { position: relative; display: block; width: 158px; height: 46px; perspective: 800px; }
.ichc-tilt  { position: absolute; inset: 0; transform-style: preserve-3d;
              transition: transform .35s cubic-bezier(.34,1.4,.5,1); }   /* peek easing; set by JS */
.ichc-prism { position: absolute; inset: 0; transform-style: preserve-3d; }

.ichc-f     { position: absolute; inset: 0; backface-visibility: hidden; }
.ichc-f.f0 { transform: rotateX(0deg)   translateZ(23px); }   /* GO  */
.ichc-f.f1 { transform: rotateX(90deg)  translateZ(23px); }   /* STOP */
.ichc-f.f2 { transform: rotateX(180deg) translateZ(23px); }   /* GO (2nd) */
.ichc-f.f3 { transform: rotateX(270deg) translateZ(23px); }   /* STOP */

.ichc-face {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  gap: 8px; border: 2px solid; box-sizing: border-box;
  font: 800 16px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 2px;
}
.ichc-face.go, .ichc-face.go2 { color:#7fe6a4; background:#0d1712; border-color:rgba(53,211,106,.55); }
.ichc-face.go2 { font-size:15px; letter-spacing:1px; }
.ichc-face.go2 svg { width:15px; height:15px; }
.ichc-face.stop { color:#f3a8aa; background:#170c0d; border-color:rgba(237,90,93,.6); }
.ichc-rec { width:8px; height:8px; border-radius:50%; background:#f8595c;
            box-shadow:0 0 7px rgba(248,90,92,.7); }

/* optional light theme */
html.ichc-light-theme .ichc-face.go,
html.ichc-light-theme .ichc-face.go2 { background:#eaf7ee; color:#1c7a44; }
html.ichc-light-theme .ichc-face.stop { background:#fdeaea; color:#b3261e; }
```

────────────────────────────────────────────────────────
## 3. Tuning & notes
────────────────────────────────────────────────────────
- `translateZ` (23px) = half the 46px height, so faces meet flush like a flip-leaf.
  Resize the button → change height, width, and translateZ together (translateZ = height/2).
- Click spin: `450` = 1¼ turns. Heavier: `810`. Snappier: `90`. Keep it an odd multiple of 90
  so it always toggles state.
- Peek angle: `22`deg. Fidget: every `7000`ms, `180`° step. Remove the `setInterval` to disable.
- Reduced motion: guard the fidget with
  `if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { …setInterval… }`.
- The prism renders correctly in any real browser; some screenshot/preview rasterisers
  mishandle `preserve-3d` and show faces flipped — that's a capture artifact, not a real bug.
