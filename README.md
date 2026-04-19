# icanhazbetter

A Firefox browser extension that upgrades [icanhazchat.com](https://www.icanhazchat.com) with a dark theme, a smarter user list, cam management, and chat improvements.

---

## Features

**Dark theme**
- Full dark UI across chat, cams, menus, and overlays
- Modern avatar initials with hash-based per-user colors and real profile image fallback
- Site supporter hearts — users with a supporter badge get a subtle pink glow on their avatar

**User list**
- Rebuilt user list with compact rows, online/cammed/idle/mod indicators
- Filter bar that searches both active users and the hidden-cams section simultaneously
- Sidebar strip (44 px) shows broadcaster avatars with name tooltips when the list is collapsed
- Collapse/expand toggle built into the sidebar strip

**Cam management**
- Hide individual cams — they stay hidden across page refreshes (saved to `localStorage`)
- Hidden cams listed in a collapsible section at the bottom of the user list
- Cam refresh throttled to 60 s to prevent disruptive random reloads

**Chat**
- Image links in chat auto-embed as inline images
- Join/leave timestamps hidden for cleaner scrollback
- GIF & emote picker with search (inserts `:emotename:` into chat)
- Private message panel

---

## Installation (Firefox)

Firefox supports unsigned extensions in **Developer Edition** and **Nightly**, or via temporary installation in any version.

### Option A — Temporary install (any Firefox, resets on restart)

1. Download **[icanhazbetter.zip](./icanhazbetter.zip)** and extract it to a folder on your computer.
2. Open Firefox and navigate to `about:debugging`.
3. Click **This Firefox** in the left sidebar.
4. Click **Load Temporary Add-on…**
5. Browse into the extracted folder and select **`manifest.json`**.
6. The extension is now active. It will be removed when Firefox restarts.

### Option B — Permanent install (Firefox Developer Edition or Nightly)

1. Download **[icanhazbetter.zip](./icanhazbetter.zip)** and extract it.
2. Open Firefox Developer Edition or Nightly and go to `about:config`.
3. Search for `xpinstall.signatures.required` and set it to **`false`**.
4. Go to `about:addons` → click the gear icon → **Install Add-on From File…**
5. Select the **`manifest.json`** file (or zip the folder and select the `.zip`).

> **Note:** Standard Firefox releases require extensions to be signed by Mozilla. Temporary installation (Option A) works in all versions without any config changes.

---

## Updating

Re-download the zip, extract it over your existing folder, then reload the extension:
- Temporary install: go back to `about:debugging` and click **Reload** next to icanhazbetter.
- Developer/Nightly: the extension will reload automatically if you extracted in place.

---

## Building from source

No build step required — this is a plain MV2 extension.

```
ichc-extension/
├── manifest.json
├── gifs.txt              # GIF/emote data
├── scripts/
│   ├── chat.js           # Chat theming, image embedding, scroll sync
│   ├── modernize.js      # User list, sidebar, GIF picker, cam management
│   ├── persist-hidecams.js  # localStorage-backed cam hide/show
│   ├── pm.js             # Private message panel
│   └── theme.js          # Icon replacement, button polish
└── styles/
    ├── theme.css         # Full dark theme + layout overrides
    └── pm.css            # Private message panel styles
```

Clone the repo and load `manifest.json` as a temporary add-on (see Option A above).

---

## License

MIT
