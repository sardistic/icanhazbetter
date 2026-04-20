# icanhazbetter

A browser extension that upgrades [icanhazchat.com](https://www.icanhazchat.com) with a dark theme, a smarter user list, cam management, and chat improvements.

> **Browser support** — Chrome, Firefox, Opera, Edge (all use this branch)

---

## Features

**Dark theme**
- Full dark UI across chat, cams, menus, and overlays
- Modern avatar initials with hash-based per-user colors and real profile image fallback
- Site supporter hearts — users with a supporter badge get a subtle pink glow on their avatar

**User list**
- Rebuilt user list with compact rows, online/cammed/idle/mod indicators
- Filter bar that searches both active users and the hidden-cams section simultaneously
- Sidebar strip shows broadcaster avatars with name tooltips when the list is collapsed
- Collapse/expand toggle built into the sidebar strip

**Cam management**
- Hide individual cams — they stay hidden across page refreshes (saved to `localStorage`)
- Hidden cams listed in a collapsible section at the bottom of the user list
- Cam refresh throttled to prevent disruptive random reloads

**Chat**
- Image links in chat auto-embed as inline previews
- Join/leave timestamps hidden for cleaner scrollback
- GIF picker with search, plus an emoji tab with ~170 standard emojis
- Private message panel

---

## Installation

### Firefox

Firefox supports unsigned extensions in **Developer Edition** and **Nightly**, or via temporary installation in any version.

#### Option A — Temporary install (any Firefox, resets on restart)

1. Download **[icanhazbetter.zip](../../raw/master/icanhazbetter.zip)** and extract it to a folder.
2. Open Firefox and go to `about:debugging`.
3. Click **This Firefox** in the left sidebar.
4. Click **Load Temporary Add-on…**
5. Open the extracted folder and select **`manifest.json`**.

> The extension stays active until Firefox restarts. Repeat from step 4 after each restart.

#### Option B — Permanent install (Firefox Developer Edition or Nightly only)

1. Download **[icanhazbetter.zip](../../raw/master/icanhazbetter.zip)** and extract it.
2. Go to `about:config`, search for `xpinstall.signatures.required`, set it to **`false`**.
3. Go to `about:addons` → gear icon → **Install Add-on From File…**
4. Select the extracted folder's **`manifest.json`**.

---

### Chrome

1. Download **[icanhazbetter.zip](../../raw/master/icanhazbetter.zip)** and extract it.
2. Go to `chrome://extensions`.
3. Enable **Developer mode** (toggle, top-right).
4. Click **Load unpacked** and select the extracted folder.

---

### Opera

1. Download **[icanhazbetter.zip](../../raw/master/icanhazbetter.zip)** and extract it.
2. Go to `opera://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extracted folder.

---

### Microsoft Edge

1. Download **[icanhazbetter.zip](../../raw/master/icanhazbetter.zip)** and extract it.
2. Go to `edge://extensions`.
3. Enable **Developer mode** (left sidebar toggle).
4. Click **Load unpacked** and select the extracted folder.

---

## Updating

Re-download the zip, extract it over your existing folder, then reload:

| Browser | How to reload |
|---------|---------------|
| Firefox (temporary) | `about:debugging` → **Reload** next to icanhazbetter |
| Firefox (permanent) | `about:addons` → extension menu → **Reload** |
| Chrome | `chrome://extensions` → refresh icon on the icanhazbetter card |
| Opera | `opera://extensions` → refresh icon |
| Edge | `edge://extensions` → refresh icon |

---

## Building from source

No build step required — this is a plain MV3 extension.

```
ichc-extension/
├── manifest.json
├── gifs.txt                 # GIF/emote data
├── scripts/
│   ├── chat.js              # Chat theming, image embedding, scroll sync
│   ├── modernize.js         # User list, sidebar, GIF/emoji picker, cam management
│   ├── persist-hidecams.js  # localStorage-backed cam hide/show
│   ├── pm.js                # Private message panel
│   └── theme.js             # Icon replacement, button polish
└── styles/
    ├── theme.css            # Full dark theme + layout overrides
    └── pm.css               # Private message panel styles
```

Clone the repo and load as an unpacked extension per the instructions above for your browser.

---

## Privacy

icanhazbetter collects no user data. It does not transmit, store, or share any information with any server or third party.

The only data written to storage is your hidden-cam list, saved to `localStorage` in your own browser on icanhazchat.com. This never leaves your device.

## License

MIT
