# icanhazbetter — Extension Codex

Chrome Manifest V3 extension for [icanhazchat.com](https://www.icanhazchat.com). Loaded as content scripts + a background service worker. No build step — edit files directly.

---

## File Map

| File | Role |
|---|---|
| `manifest.json` | MV3 manifest. `host_permissions` scoped to `icanhazchat.com` and `images.icanhazchat.com` only — no broad permissions. |
| `background.js` | Service worker. Two message types: `ichc-exec` (eval code in page MAIN world via `chrome.scripting`), `ichc-og-fetch` (proxy fetch for OG card previews). |
| `scripts/modernize.js` | Primary script. Cam layout, user list, avatars, broadcast timers, emoji picker, PM avatars, GIF picker, cam diagnostics. Runs at `document_start`. |
| `scripts/chat.js` | Chat scroll sync, inline image/video embeds, OG preview cards, timestamp styling, dark-color normalization. Runs at `document_start`. |
| `scripts/theme.js` | Light/dark theme toggle, icon sprite replacement, top-bar reorder. |
| `scripts/pm.js` | Private message window improvements. |
| `scripts/persist-hidecams.js` | Persists hidden-cam list across page loads via localStorage. |
| `styles/theme.css` | All extension CSS — dark theme base, cam grid, userlist, OG cards, timestamps, supporter glow, broadcast timers. |
| `styles/pm.css` | PM window styles. |

---

## Architecture

### Entry points
`document_start` means scripts run before the page's own JS. Extensions use `runInPageContext()` (sends `ichc-exec` to background → `chrome.scripting.executeScript` in `MAIN` world) to call site functions like `refreshCams()`, `cR()` (resume chat), `cP()` (pause chat).

### Key localStorage keys
| Key | Purpose |
|---|---|
| `ichc_layout_prefs` | `{ camMin, chatWidth, chatSide }` |
| `ichc_cam_order` | Saved cam card order (array of cam keys) |
| `ichc_featured_cam` | Spotlighted cam key |
| `ichc_stage_side_width` | Manual stage split override |
| `ichc_theme` | `'light'` or unset (dark) |
| `ichc_av3_<name>` | Cached avatar URL (or null miss) per username. v3 = current generation. |
| `ichc_bcast_<name>` | Epoch ms when a broadcaster's cam first went live. Cleared on ghost/removal. |
| `ichc_blocked_users` | JSON array of hidden-cam usernames (lowercase) |

### Cam card pipeline
`initCamLayout()` → `syncCamCards()` → `prepareCamCard(card)` per card → `applySavedOrder()` → `applyFeaturedCam()` → `updateCamDensity()`.

`prepareCamCard` classifies each `.rounded_square` as: visible / `ichc-hidden-slot` / `ichc-ghost-slot` / `ichc-placeholder-slot`. Ghost = card has a name/camId but no media after 6 s. Hidden = user explicitly blocked it or slot is structurally empty.

The `MutationObserver` on `#cams` (subtree) debounces to `requestCamRelayout`. A `applySavedOrder` idempotency check prevents infinite relayout loops.

`_featuredSetAt` / `_featuredWasFound` guard against the spotlight key being prematurely cleared when featured cam is momentarily absent during a refresh.

### Chat scroll sync (`chat.js`)
`initChatScrollSync()` sets up a `MutationObserver` on `#txt`. The `pauseCheckTimer` (2 s interval) reconnects the observer if `#txt` is replaced by the site. Without this, chat freezes permanently after any DOM replacement.

`sawNewRows` flag prevents the extension's own DOM insertions (inline images, OG cards, timestamp nodes) from triggering a scroll-to-bottom or stealing focus from the cam panel.

### Avatar fetch (`modernize.js`)
`fetchProfileImage(username)` → memory cache (`profileImageCache`) → localStorage (`ichc_av3_*`) → HTTP fetch (`_doFetchProfileImage`).

`_doFetchProfileImage` GETs `/user/<name>`, parses with `DOMParser`, extracts image via broad selector list (`_extractAvatarFromDoc`). Miss TTL: 2 h. Hit TTL: 7 days. Max 3 concurrent fetches (`_AV_MAX`), 300 ms between starts.

Priority prefetch order: broadcasting cams → non-idle users → idle users (alphabetical within each tier).

`IntersectionObserver` on `#ichc-userlist` rows (rootMargin 120 px) handles lazy loading for users not in the prefetch list.

### Supporter / mod detection (`buildUserList`)
Three-layer detection inside `#activeUserList`:
1. **Section header scan** — `<p>, <h2>–<h4>` inside `#activeUserList` AND direct children of its parent (browsers may push `<p>` inside `<ul>` outside the `<ul>` during HTML parsing). Section text matched against `supporterPattern` / `/\bmod(erator)?s?\b/i`.
2. **Marker scan** — `img.smicon`, `img[src*="heart"]`, `[title*="support"]`, etc. on individual `<li>` rows.
3. **Context check** — `className`, `title`, `data-original-title` on the `<a>` and parent `<li>`.

Supporter rows get `ichc-ul-supporter` class → pink glow pfp background via CSS.

### Broadcast timer
`_BCAST_LS = 'ichc_bcast_'` — localStorage prefix. `prepareCamCard` records `Date.now()` when a card first goes live (has name + camId + not ghost/hidden). Clears on ghost. Also clears when `MutationObserver` sees a `.rounded_square` removed from `#cams`.

`_updateCamTimers()` runs every second via `setInterval`, reads stored start times, formats as `MM:SS` or `H:MM:SS`, writes to `.ichc-cam-timer` span inside each card.

---

## Patterns / Conventions

- **No build step.** Plain ES2020+ inside an IIFE `(function() { 'use strict'; ... })()`.
- **`runInPageContext(source)`** for anything that must run in the page's JS context (site functions, eval).
- **`!important` everywhere in CSS** — the site uses inline styles and `!important` declarations; we must override them.
- **Debounce / throttle guards** — `debounce()`, `camLayoutState.suppressUntil`, `_lastReloadAt` prevent cascade loops.
- **WeakSet / WeakRef not used** — bound state tracked via `dataset` attributes (`data-ichc-*`) on DOM nodes.
- **No external dependencies** — all icons are inline SVG strings in `ICONS` map.

---

## Known Site Quirks

- `refreshCams()` may replace `#txt` entirely, which detaches MutationObservers → chat stops updating. The 2 s `pauseCheckTimer` detects this and calls `initChatScrollSync()` to reconnect.
- `<p>` section headers in `#activeUserList` may be sibling elements of the `<ul>` (not children) after browser HTML parsing. Section scan covers both.
- The site calls `refreshCams()` on its own timer; we throttle it to ≥ 10 s intervals via page-context wrapping to prevent disruptions.
- `cR()` (resume chat scroll) focuses `#txtMsg`, which steals focus from cam controls. The extension only calls it when `#txtMsg` already has focus or no input is focused.
- Ghost slot aging: new cards get a 6 s grace period before ghost-classification so `display:none` doesn't freeze stream initialization.
