# icanhazbetter

A browser extension that reshapes [icanhazchat.com](https://www.icanhazchat.com) into a customizable chat and cam room. It adds selectable themes, a flexible cam layout, richer user and chat tools, and a draggable private-message panel.

> **Browser support** — Chrome, Firefox, Opera, Edge (all use this branch)

---

## Features

**Theme**
- Seven selectable themes, including dark and light options
- Restyled chat, cams, menus, controls, and overlays
- Profile avatars and room-user details, with cached profile metadata and fallback initials

**User list**
- Compact user list with online, cam, idle, and moderator indicators
- Search and sorting, including name, account age, and karma
- Karma tiers, account-age badges, avatars, and profile details
- Collapsible sidebar with broadcaster shortcuts

**Cam management**
- Hide, mute, reorder, resize, and feature cams in a flexible room layout
- Hidden-cam list with search, restore, export, and import controls
- Broadcast timers and room activity tools
- Optional cam auto-restart when the room goes idle; broadcast patches can be disabled independently

**Chat**
- Optional chat history across reloads, condensed join/leave events, relative timestamps, and reply previews
- Inline image previews and link cards with page metadata
- GIF and emote search, an emoji picker, and emoji name completion
- Mention/PM sound alerts with selectable styles, preview, and an on/off control
- Draggable, resizable private-message panel with unread indicators and locally saved conversation history

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

## Data and privacy

The extension does not include analytics or an extension-operated account service. It saves settings and site data in the browser's `localStorage` for icanhazchat.com. Depending on which features you use, this can include layout and theme preferences, hidden cams, cached room-profile details, chat history, and private-message history. These records remain in that browser storage unless you clear them or the site/browser removes them.

The extension works with icanhazchat.com and its image host. Chat, cam, and other site activity still uses the site's services. Link cards may also request the linked page's HTML to read its title, description, and preview image; the request omits cookies. Loading linked preview images or opening a link can contact that link's host.

## License

MIT
