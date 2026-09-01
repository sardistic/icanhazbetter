(function () {
    'use strict';

    // Inline SVG icon map — no external dependencies, no CSP issues.
    const ICONS = {
        broadcast:  `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5zM19 7.573a.75.75 0 0 0-1.214-.588l-3.036 2.427V10.5l3.036 2.423A.75.75 0 0 0 19 12.423V7.573z"/></svg>`,
        leave:      `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-1.04a.75.75 0 1 1 1.06-1.06l2.333 2.317a.75.75 0 0 1 0 1.06l-2.333 2.317a.75.75 0 1 1-1.06-1.06l1.047-1.04H6.75A.75.75 0 0 1 6 10z" clip-rule="evenodd"/></svg>`,
        search:     `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9z" clip-rule="evenodd"/></svg>`,
        rotate:     `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.389zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219z" clip-rule="evenodd"/></svg>`,
        fileExport: `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L7.29 9.22a.75.75 0 0 0-1.08 1.04l3.25 3.5a.75.75 0 0 0 1.08 0l3.25-3.5a.75.75 0 1 0-1.08-1.04l-1.96 2.144V2.75z"/><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"/></svg>`,
        fileImport: `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614z"/><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"/></svg>`,
        eye:        `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/><path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" clip-rule="evenodd"/></svg>`,
        eyeSlash:   `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557z" clip-rule="evenodd"/><path d="M10.748 13.93l2.523 2.524a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678z"/></svg>`,
        xmark:      `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22z"/></svg>`,
        heart:      `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001z"/></svg>`,
        rotateRight:`<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.389z" clip-rule="evenodd"/></svg>`,
        cog:         `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.993 6.993 0 0 1 7.51 3.456l.33-1.652zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clip-rule="evenodd"/></svg>`,
        bell:        `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M4 8a6 6 0 1 1 12 0v2.917c0 .703.228 1.387.648 1.954l1.288 1.718A1.75 1.75 0 0 1 16.6 17.25H3.4a1.75 1.75 0 0 1-1.394-2.796l1.288-1.718A3.25 3.25 0 0 0 4 10.917V8zm6 12a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 10 20z" clip-rule="evenodd"/></svg>`,
        volume:      `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75zM13.78 7.22a.75.75 0 1 0-1.06 1.06 2.5 2.5 0 0 1 0 3.44.75.75 0 1 0 1.06 1.06 4 4 0 0 0 0-5.56z"/><path d="M15.905 5.096a.75.75 0 0 0-1.06 1.06 5.5 5.5 0 0 1 0 7.788.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.908z"/></svg>`,
        palette:     `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M3.75 3A1.75 1.75 0 0 0 2 4.75v10.5C2 16.216 2.784 17 3.75 17h10.5A1.75 1.75 0 0 0 16 15.25v-6.5A1.75 1.75 0 0 0 14.25 7H10V4.75A1.75 1.75 0 0 0 8.25 3H3.75zM6 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.25-3.75a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zM10 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" clip-rule="evenodd"/></svg>`,
        imageIcon:   `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909-.48-.48a.75.75 0 0 0-1.06 0L6.53 13.53 4.22 11.22a.75.75 0 0 0-1.06 0l-.66.659v.001zm1.5-4.56A1.25 1.25 0 1 1 6.25 7.75 1.25 1.25 0 0 1 4 6.5z" clip-rule="evenodd"/></svg>`,
        phone:       `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5z" clip-rule="evenodd"/></svg>`,
        question:    `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94zM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clip-rule="evenodd"/></svg>`,
        dotsH:       `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/></svg>`,
        dotsAnimated:`<span class="ichc-dots-wrap" aria-hidden="true"><span class="ichc-dot ichc-dot-1"></span><span class="ichc-dot ichc-dot-2"></span><span class="ichc-dot ichc-dot-3"></span><span class="ichc-dot ichc-dot-4"></span><span class="ichc-dot ichc-dot-5"></span></span>`,
        // Line equivalent of dotsAnimated, for the hamburger: 3 stacked rules at
        // rest, shifting up in a stagger while a hidden 4th slides in below.
        linesAnimated:`<span class="ichc-lines-wrap" aria-hidden="true"><span class="ichc-line ichc-line-1"></span><span class="ichc-line ichc-line-2"></span><span class="ichc-line ichc-line-3"></span><span class="ichc-line ichc-line-4"></span></span>`,
        chevronDown: `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z" clip-rule="evenodd"/></svg>`,
        chevronUp:   `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 0 1-1.06-.02L10 8.832 6.29 12.77a.75.75 0 0 1-1.08-1.04l4.25-4.5a.75.75 0 0 1 1.08 0l4.25 4.5a.75.75 0 0 1-.02 1.06z" clip-rule="evenodd"/></svg>`,
        chat:        `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 0 0 1.28.53l3.58-3.579A13.95 13.95 0 0 0 12 14c2.236 0 4.43-.18 6.57-.524C20.007 13.245 21 11.986 21 10.574V5.426c0-1.413-.993-2.67-2.43-2.902A41.112 41.112 0 0 0 12 2h-2zm0 1.5c2.188 0 4.33.175 6.395.512.97.157 1.605.944 1.605 1.814v5.148c0 .87-.636 1.657-1.605 1.814A39.614 39.614 0 0 1 10 13a12.45 12.45 0 0 1-1.57-.1.75.75 0 0 0-.557.16L5.5 15.702v-2.537a.75.75 0 0 0-.676-.744 39.61 39.61 0 0 1-2.344-.303C1.636 11.915 1 11.128 1 10.258V5.426c0-.87.636-1.657 1.605-1.814A39.614 39.614 0 0 1 10 3.5z" clip-rule="evenodd"/></svg>`,
        hamburger:   `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75zm0 5A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75zm0 5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75z" clip-rule="evenodd"/></svg>`,
        gifIcon:     `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5zm4.049 3.49A.75.75 0 0 0 4.25 9.5v1A.75.75 0 0 0 5 11.25h1.25a.75.75 0 0 0 0-1.5H5.75V9.5a.75.75 0 0 0-.701-.76zm2.551-.74a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75zm2 0a.75.75 0 0 1 .673.418L11 10.108l.727-1.69A.75.75 0 0 1 13.25 8v3.75a.75.75 0 0 1-1.5 0v-1.608l-.227.529a.75.75 0 0 1-1.046 0l-.227-.53v1.609a.75.75 0 0 1-1.5 0V8.75a.75.75 0 0 1 .75-.75z" clip-rule="evenodd"/></svg>`,
        users:       `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 17a9.953 9.953 0 0 1-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.8A7.468 7.468 0 0 1 14.5 16z"/></svg>`,
        videoCam2:   `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5zM19 7.573a.75.75 0 0 0-1.214-.588l-3.036 2.427V10.5l3.036 2.423A.75.75 0 0 0 19 12.423V7.573z"/></svg>`,
        videoCamOff: `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5z" opacity=".35"/><path d="M19 7.573a.75.75 0 0 0-1.214-.588l-3.036 2.427V10.5l3.036 2.423A.75.75 0 0 0 19 12.423V7.573z" opacity=".35"/><path fill-rule="evenodd" d="M1.22 1.22a.75.75 0 0 1 1.06 0l16.5 16.5a.75.75 0 1 1-1.06 1.06L1.22 2.28a.75.75 0 0 1 0-1.06z" clip-rule="evenodd"/></svg>`,
        chevronRight:`<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z" clip-rule="evenodd"/></svg>`,
        chevronLeft: `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.832 10l3.938 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02z" clip-rule="evenodd"/></svg>`,
        shield:      `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.384 9.563-8.06 11.076a.475.475 0 0 1-.32 0C4.384 16.563 1 12.162 1 7c0-.539.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749z" clip-rule="evenodd"/></svg>`,
        sun:         `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2zM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15zM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.061-1.06zM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06zM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10zM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10zM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.061zM5.404 6.464a.75.75 0 0 0 1.06-1.06L5.403 4.343a.75.75 0 0 0-1.06 1.06l1.06 1.061z"/></svg>`,
        moon:        `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083z" clip-rule="evenodd"/></svg>`,
        popOut:      `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06z" clip-rule="evenodd"/></svg>`,
        popIn:       `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M14.78 5.22a.75.75 0 0 0-1.06 0L6 12.94V7.5a.75.75 0 0 0-1.5 0v6.75c0 .414.336.75.75.75H12a.75.75 0 0 0 0-1.5H6.56l7.72-7.72a.75.75 0 0 0 0-1.06z" clip-rule="evenodd"/></svg>`,
        terminal:    `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M3.25 3A2.25 2.25 0 0 0 1 5.25v9.5A2.25 2.25 0 0 0 3.25 17h13.5A2.25 2.25 0 0 0 19 14.75v-9.5A2.25 2.25 0 0 0 16.75 3H3.25zm.896 3.97a.75.75 0 0 0-1.06 1.06l1.72 1.72-1.72 1.72a.75.75 0 0 0 1.06 1.06l2.25-2.25a.75.75 0 0 0 0-1.06l-2.25-2.25zm4.729 1.28a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5z" clip-rule="evenodd"/></svg>`,
        cloud:       `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M1 12.5A4.5 4.5 0 0 0 5.5 17H15a4 4 0 0 0 1.866-7.539 3.504 3.504 0 0 0-4.504-4.272A4.5 4.5 0 0 0 4.5 8H4a3 3 0 0 0-3 3v1.5z"/></svg>`,
        gauge:       `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M3 12.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V13.5a.75.75 0 0 1 .75-.75zM7 8.25a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75zM11 10.75a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-1.5 0V11.5a.75.75 0 0 1 .75-.75zM15 4.25a.75.75 0 0 1 .75.75v10.75a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75z"/></svg>`,
        // The armed/disarmed pair for auto-restart. Same rotate glyph both times so
        // the two states read as one control in two positions; the slash is the only
        // difference, which is what makes "will refresh" vs "will not" legible at a
        // glance rather than a colour the user has to have learned.
        rotateOn:    `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h1.433a.75.75 0 0 0 0-1.5H4.083a.75.75 0 0 0-.75.75v3.149a.75.75 0 1 0 1.5 0v-1.058l.19.189a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.423-.47zM4.688 8.576a5.5 5.5 0 0 1 9.201-2.466l.312.311H12.77a.75.75 0 0 0 0 1.5h3.149a.75.75 0 0 0 .75-.75V3.984a.75.75 0 0 0-1.5 0v1.06l-.19-.19A7 7 0 0 0 3.265 8.106a.75.75 0 1 0 1.423.47z" clip-rule="evenodd"/></svg>`,
        rotateOff:   `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h1.433a.75.75 0 0 0 0-1.5H4.083a.75.75 0 0 0-.75.75v3.149a.75.75 0 1 0 1.5 0v-1.058l.19.189a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.423-.47zM4.688 8.576a5.5 5.5 0 0 1 9.201-2.466l.312.311H12.77a.75.75 0 0 0 0 1.5h3.149a.75.75 0 0 0 .75-.75V3.984a.75.75 0 0 0-1.5 0v1.06l-.19-.19A7 7 0 0 0 3.265 8.106a.75.75 0 1 0 1.423.47z" clip-rule="evenodd" opacity="0.75"/><path d="M3.22 3.22a.75.75 0 0 1 1.06 0l11.5 11.5a.75.75 0 1 1-1.06 1.06L3.22 4.28a.75.75 0 0 1 0-1.06z"/></svg>`,
    };

    const PREF_KEY = 'ichc_layout_prefs';
    const ORDER_KEY = 'ichc_cam_order';
    const FEATURED_KEY = 'ichc_featured_cam';
    const AUTO_RESTART_KEY = 'ichc_auto_restart_cams';
    const AUTO_RESTART_COUNT_KEY = 'ichc_auto_restart_count';
    // Auto-restart disarms itself after this many consecutive automatic restarts.
    // A room that keeps going idle is a room nobody is watching, and an extension
    // that keeps reviving cams in it is burning bandwidth on an empty screen.
    const AUTO_RESTART_LIMIT = 5;
    const SIDE_WIDTH_KEY = 'ichc_stage_side_width';
    const UL_WIDTH_KEY   = 'ichc_ul_width';
    const CAM_SPAN_KEY = 'ichc_cam_spans_v1';
    const CAM_LAYOUT_CACHE_KEY = 'ichc_cam_layout_v2';
    const DEFAULT_PREFS = { camMin: 360, chatWidth: 430, chatSide: 'right' };

    // Restore last known cam layout immediately so first paint matches last session.
    // This runs synchronously at document_start before any DOM is parsed.
    try {
        const _lc = JSON.parse(localStorage.getItem(CAM_LAYOUT_CACHE_KEY) || 'null');
        if (_lc && typeof _lc === 'object') {
            const _r = document.documentElement;
            if (_lc.columns) { _r.style.setProperty('--ichc-cam-columns', String(_lc.columns)); }
            if (_lc.camMin)  { _r.style.setProperty('--ichc-cam-min', `${_lc.camMin}px`); }
            if (_lc.aspect)  { _r.style.setProperty('--ichc-cam-aspect', _lc.aspect); }
            if (_lc.sideWidth)  { _r.style.setProperty('--ichc-stage-side-width', `${_lc.sideWidth}px`); }
            if (_lc.chatWidth)  { _r.style.setProperty('--ichc-chat-width', `${_lc.chatWidth}px`); }
            if (_lc.ulWidth)    { _r.style.setProperty('--ichc-userlist-width', `${_lc.ulWidth}px`); }
        }
    } catch (_) {}
    // Mark the initial settle window; removed after first layout so transitions are safe.
    document.documentElement.classList.add('ichc-cams-init');
    // Safety net: never hold the init class longer than 1.5s regardless of DOM readiness.
    window.setTimeout(() => document.documentElement.classList.remove('ichc-cams-init'), 1500);
    const dragState = { handleArmed: null, activeCard: null };
    const userListState = {
        timer: null,
        srcObserver: null,
        camsObserver: null,
        srcObservedEl: null,
        camsObservedEl: null,
        avatarObserver: null,      // IntersectionObserver — only fetches avatars for visible rows
        avatarObserverRoot: null,  // the panel element the observer was created with
        searchFocused: false,  // true while filter input has focus — suppresses frequent rebuilds
        _suppressBlur: false,  // true during panel.innerHTML='' so the sync blur doesn't clear searchFocused
        rebuildPendingAfterSearch: false,
        moreMenuDismissBound: false,
        sortMode: localStorage.getItem('ichc_ul_sort') || 'karma',  // 'alpha' | 'karma' | 'age'
        showAvatars: localStorage.getItem('ichc_ul_show_avatars') === 'true',
        lastBuildSig: null,  // content signature — skip rebuild when source data unchanged
        scrollTop: 0,            // last known scroll-body offset (user or programmatic)
        _lastUserScrollAt: 0,    // perf-time of the last user-initiated scroll
        _programmaticScrollAt: 0,// perf-time of our last scrollTop write (to ignore its echo)
        _programmaticScrollTo: -1,// target px of our last scrollTop write (echo lands here)
    };
    const lurkState = {
        pollTimer: null,
        wasVisible: false,
        autoTimer: null,
        countdownTimer: null,
        restartAt: 0,
        limitHit: false,   // budget ran out this session — explains the Off state
        lastActiveAt: 0,   // last time the inactivity pause was showing
    };
    const camLayoutState = {
        timer: null,
        resizeObserver: null,
        panelObserver: null,
        syncObserver: null,
        sideWidthOverride: null,
        ulWidthOverride: null,
        suppressUntil: 0,
        lastDensitySignature: '',
        syncRetryTimer: null,
    };
    // Cache: username_lower → image URL string | null (final miss)
    // Capped at 200 entries — evict oldest 50 when full to avoid unbounded growth.
    const profileImageCache = new Map();
    const profileImagePending = new Map();
    const profileKarmaCache = new Map();   // username_lower → karma number | null
    const profileYearCache  = new Map();   // username_lower → highest trophy year | null
    const profileGuestCache = new Map();   // username_lower → true (nick/guest) | false | null (unknown)
    const profileBgCache    = new Map();   // username_lower → bg image URL string | null
    const profileJoinTsCache = new Map(); // username_lower → join timestamp ms | null
    const profileTrophiesCache = new Map(); // username_lower → [{src,alt}] | null
    const profileBioCache   = new Map();   // username_lower → string | null
    let _gifDataCache = null;              // shared with tab-complete: { gifs: [{code,src,full}] }

    function _trackEmoteUsage(code) {
        try {
            const counts = JSON.parse(localStorage.getItem('ichc_emote_usage') || '{}');
            counts[code] = (counts[code] || 0) + 1;
            localStorage.setItem('ichc_emote_usage', JSON.stringify(counts));
        } catch {}
    }

    function _getTopEmotes(n) {
        try {
            const counts = JSON.parse(localStorage.getItem('ichc_emote_usage') || '{}');
            const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, n);
            const gifs = _gifDataCache?.gifs ?? [];
            return sorted.map(([code]) => {
                const gif = gifs.find(g => g.code === code);
                if (gif) { return { type: 'gif', code, src: 'https:' + gif.src }; }
                const emoji = ICHC_EMOJIS.find(e => e.e === code);
                if (emoji) { return { type: 'emoji', code, char: emoji.e }; }
                return { type: 'text', code };
            });
        } catch { return []; }
    }

    function _profileCacheSet(key, value) {
        if (profileImageCache.size >= 200) {
            let evicted = 0;
            for (const k of profileImageCache.keys()) {
                profileImageCache.delete(k);
                if (++evicted >= 50) { break; }
            }
        }
        profileImageCache.set(key, value);
    }
    // Cache: username_lower → <img> element (reused across userlist rebuilds to prevent abort loops)
    // Capped separately from URL cache because these are real DOM nodes.
    const avatarImgCache = new Map();
    function _evictImgNode(img) {
        if (!img) { return; }
        const src = img.src || '';
        if (src.startsWith('blob:')) { try { URL.revokeObjectURL(src); } catch (_) {} }
        img.removeAttribute('src');
    }
    function _avatarImgCacheSet(key, img) {
        if (avatarImgCache.size >= 200 && !avatarImgCache.has(key)) {
            let evicted = 0;
            for (const [oldKey, oldImg] of avatarImgCache.entries()) {
                if (oldImg?.isConnected) { continue; }
                _evictImgNode(oldImg);
                avatarImgCache.delete(oldKey);
                if (++evicted >= 50) { break; }
            }
            if (avatarImgCache.size >= 220) {
                for (const [oldKey, oldImg] of avatarImgCache.entries()) {
                    _evictImgNode(oldImg);
                    avatarImgCache.delete(oldKey);
                    if (++evicted >= 50) { break; }
                }
            }
        }
        avatarImgCache.set(key, img);
    }

    // Generic LRU-style trim: drop the oldest (maxDrop) entries when over maxSize.
    function _trimMap(map, maxSize, maxDrop = 50) {
        if (map.size <= maxSize) { return; }
        let n = 0;
        for (const k of map.keys()) {
            map.delete(k);
            if (++n >= maxDrop) { break; }
        }
    }

    // ── Avatar fetch rate limiter ─────────────────────────────────────────────────
    // Keep avatar lookup very gentle for big rooms: one profile page at a time,
    // spaced out so we don't hammer ICHC or its image CDN.
    const _AV_LS          = 'ichc_av7_';        // localStorage key prefix (v7: fixed badge_ exclusion blocking real avatars)
    const _AV_HIT_TTL     = 7 * 24 * 3600e3;   // 7 days: successful avatar URL
    const _AV_MISS_TTL    = 30 * 60e3;          // 30 minutes: transient profile scrape misses self-heal quickly
    const _KM_LS          = 'ichc_km1_';        // karma localStorage key prefix
    const _KM_TTL         = 7 * 24 * 3600e3;   // 7 days
    const _YB_LS          = 'ichc_yb3_';        // year badge localStorage key prefix (v3: added join-date text parsing)
    const _YB_TTL         = 3 * 24 * 3600e3;    // 3-day TTL so corrections pick up sooner
    const _GS_LS          = 'ichc_gs1_';        // guest/nick status localStorage key prefix
    const _GS_TTL         = 24 * 3600e3;        // 1 day — guests may register
    const _BG_LS          = 'ichc_bg1_';        // profile background image localStorage key prefix
    const _BG_TTL         = 7 * 24 * 3600e3;    // 7 days
    const _JT_LS          = 'ichc_jt1_';        // join timestamp localStorage key prefix
    const _TR_LS          = 'ichc_tr1_';        // trophies localStorage key prefix
    const _TR_TTL         = 3 * 24 * 3600e3;    // 3 days
    const _BI_LS          = 'ichc_bi1_';        // bio localStorage key prefix
    const _BI_TTL         = 7 * 24 * 3600e3;    // 7 days
    const _JT_TTL         = 7 * 24 * 3600e3;    // 7 days
    let   _avActive       = 0;
    const _AV_MAX         = 1;
    const _AV_START_GAP   = 900;
    const _avQueue        = [];

    function _lsAvSave(key, url) {
        try { localStorage.setItem(_AV_LS + key, JSON.stringify({ url: url || null, ts: Date.now() })); } catch (_) {}
    }

    // ── Karma / year tier helpers ─────────────────────────────────────────────
    const _KARMA_TIERS = [100, 500, 1000, 5000, 10000, 20000, 50000, 100000];
    function _karmaToTier(karma) {
        if (karma == null) { return -1; }
        for (let i = _KARMA_TIERS.length - 1; i >= 0; i--) {
            if (karma >= _KARMA_TIERS[i]) { return i + 1; }
        }
        return 0;
    }
    const _YEAR_TIERS  = [1, 4, 8, 12, 16];
    function _yearToTier(year) {
        if (year == null) { return -1; }
        for (let i = _YEAR_TIERS.length - 1; i >= 0; i--) {
            if (year >= _YEAR_TIERS[i]) { return i + 1; }
        }
        return 0; // <1 yr
    }
    const _KT_STOPS = [
        [1,      [110,  70, 185]],
        [100,    [125,  80, 205]],
        [500,    [ 85, 105, 215]],
        [1000,   [ 65, 145, 215]],
        [5000,   [ 55, 185, 200]],
        [10000,  [ 72, 198, 145]],
        [20000,  [205, 170,  55]],
        [50000,  [200,  88, 138]],
        [100000, [ 55, 185, 200]],
    ];
    function _karmaToSpectral(karma) {
        if (!karma || karma <= 0) { return null; }
        const k = Math.max(1, karma);
        const n = _KT_STOPS.length - 1;
        let loIdx = 0;
        for (let i = 1; i < _KT_STOPS.length; i++) {
            if (k < _KT_STOPS[i][0]) { break; }
            loIdx = i;
        }
        const hiIdx = Math.min(loIdx + 1, n);
        const [kLo, cLo] = _KT_STOPS[loIdx];
        const [kHi, cHi] = _KT_STOPS[hiIdx];
        let f = 0;
        if (loIdx < hiIdx) {
            const logLo = Math.log10(Math.max(1, kLo));
            const logHi = Math.log10(kHi);
            f = logHi > logLo ? Math.min(1, (Math.log10(k) - logLo) / (logHi - logLo)) : 0;
        }
        const r = Math.round(cLo[0] + (cHi[0] - cLo[0]) * f);
        const g = Math.round(cLo[1] + (cHi[1] - cLo[1]) * f);
        const b = Math.round(cLo[2] + (cHi[2] - cLo[2]) * f);
        const t = (loIdx + f) / n;
        return [`${r},${g},${b}`, +(0.42 + t * 0.58).toFixed(3)];
    }
    function _setKarmaTierClass(el, karma) {
        if (!el) { return; }
        for (let i = 0; i <= 8; i++) { el.classList.remove(`ichc-kt${i}`); }
        const t = _karmaToTier(karma);
        if (t >= 0) { el.classList.add(`ichc-kt${t}`); }
        const spectral = _karmaToSpectral(karma);
        if (spectral) {
            el.style.setProperty('--ichc-kt-color', spectral[0]);
            el.style.setProperty('--ichc-kt-i', String(spectral[1]));
        } else {
            el.style.removeProperty('--ichc-kt-color');
            el.style.removeProperty('--ichc-kt-i');
        }
    }
    // ── User prominence score ─────────────────────────────────────────────────
    // Used by chat.js to decide which names survive truncation in the aggregated
    // join/leave line. Exposed on window because content scripts of one extension
    // share an isolated world, and these caches only exist here.
    //
    // Live signals outrank profile stats deliberately: someone on cam right now
    // matters more to the room than someone with a big karma number who is idle.
    // Note profileYearCache holds an AGE IN YEARS, not a calendar year — see
    // _YEAR_TIERS ([1,4,8,12,16]) and _setUserViz, which both treat it that way.
    function _rankUser(nick) {
        const key = (nick || '').trim().toLowerCase();
        if (!key) { return 0; }
        let score = 0;

        const karma = profileKarmaCache.get(key);
        if (karma != null && karma > 0) {
            // Same log curve as _setUserViz, saturating at 50k
            score += 3 * Math.min(1, Math.log10(1 + karma) / Math.log10(50001));
        }
        const age = profileYearCache.get(key);
        if (age != null && age > 0) { score += Math.min(1, age / 12); }
        if (profileGuestCache.get(key) === true) { score -= 2; }

        // Broadcast in the last 6h — _BCAST_LS stores the epoch their cam went live
        try {
            const started = parseInt(localStorage.getItem(_BCAST_LS + key) || '', 10);
            if (started && Date.now() - started < 6 * 3600 * 1000) { score += 3; }
        } catch (_) {}

        // Current state straight off their userlist row: cheaper and always fresher
        // than re-deriving mod/supporter/cam status here.
        try {
            const row = document.querySelector(
                `#ichc-userlist .ichc-ul-user[data-ichc-av-key="${CSS.escape(key)}"]`);
            if (row) {
                if (row.classList.contains('cammed')) { score += 4; }
                if (row.classList.contains('mod')) { score += 2; }
                if (row.classList.contains('ichc-ul-supporter-row')) { score += 1; }
                if (row.classList.contains('idle')) { score -= 1; }
            }
        } catch (_) {}

        return score;
    }
    window.__ichcRankUser = _rankUser;

    function _setYearTierClass(el, year) {
        if (!el) { return; }
        for (let i = 0; i <= 5; i++) { el.classList.remove(`ichc-yt${i}`); }
        const t = _yearToTier(year);
        if (t >= 0) { el.classList.add(`ichc-yt${t}`); }
    }
    // 2-D visual weight: karma × age interaction.
    // Old + low karma  → lurker  (faded, grey, background barely shows)
    // New + high karma → active  (vivid, full colour)
    // Old + high karma → veteran (slightly dimmer than active, still vivid)
    function _setUserViz(el, karma, year) {
        if (!el) { return; }
        const k  = Math.max(0, karma || 0);
        const yr = Math.max(0, year  ?? 0);

        // Karma score 0→1 on log scale, saturates at 50k
        const kScore  = k <= 0 ? 0 : Math.min(1, Math.log10(1 + k) / Math.log10(50001));
        // Age 0→1 over 0–12 years
        const ageNorm = Math.min(1, yr / 12);

        // Lurk factor: how much age erodes vibrancy for low-karma accounts
        const lurkFactor = 0.9 * Math.pow(Math.max(0, 1 - kScore), 0.85);

        // ageMult: karma drives the base (0.28→1.0), age×lurk erodes it,
        // mild age cap so veterans sit slightly below active newcomers at equal karma
        const base    = 0.28 + 0.72 * kScore;
        const ageMult = Math.max(0.08,
            base * (1 - ageNorm * lurkFactor) * (1 - ageNorm * 0.10));

        el.style.setProperty('--ichc-age-mult', ageMult.toFixed(3));

        // CSS lurker score → drives grayscale + opacity in the stylesheet
        const lurkerViz = Math.max(0,
            ageNorm * Math.pow(Math.max(0, 1 - kScore * 1.1), 0.9) - 0.12);
        if (lurkerViz > 0.01) {
            el.style.setProperty('--ichc-lurker', lurkerViz.toFixed(3));
        } else {
            el.style.removeProperty('--ichc-lurker');
        }
    }

    function _flipCountWAAPI(el, oldVal, newVal) {
        if (!el || oldVal === newVal) { return; }
        const FOLD = 200;
        const len = Math.max(String(newVal).length, String(oldVal).length);
        const ns = String(newVal).padStart(len, '0');
        const os = String(oldVal).padStart(len, '0');
        el.querySelectorAll('.ichc-fh-digit').forEach((digit, i) => {
            if (i >= len || ns[i] === os[i]) { return; } // unchanged digit — skip
            const spans = digit.querySelectorAll('.ichc-fh > span');
            if (spans.length < 4) { return; }
            const [newTop, newBot, oldTop, oldBot] = spans;
            oldTop.animate(
                [{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(-90deg)' }],
                { duration: FOLD, easing: 'ease-in', fill: 'both' }
            );
            oldBot.animate(
                [{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(90deg)' }],
                { duration: FOLD, easing: 'ease-in', fill: 'both' }
            );
            newTop.animate(
                [{ transform: 'rotateX(90deg)' }, { transform: 'rotateX(0deg)' }],
                { delay: FOLD, duration: FOLD, easing: 'ease-out', fill: 'both' }
            );
            newBot.animate(
                [{ transform: 'rotateX(-90deg)' }, { transform: 'rotateX(0deg)' }],
                { delay: FOLD, duration: FOLD, easing: 'ease-out', fill: 'both' }
            );
        });
    }

    // ── Input typing gradient (spectral palette, same stops as karma tiers) ──────
    const _INPUT_SPECTRAL = [
        [110,  70, 185],  // dim violet
        [125,  80, 205],  // violet
        [ 85, 105, 215],  // periwinkle
        [ 65, 145, 215],  // cornflower blue
        [ 55, 185, 200],  // teal
        [ 72, 198, 145],  // mint green
        [205, 170,  55],  // warm amber
        [200,  88, 138],  // dusty rose  (near-limit warning)
    ];
    function _spectralInputColor(t) {
        const n = _INPUT_SPECTRAL.length - 1;
        const s = Math.min(Math.max(t, 0), 1) * n;
        const i = Math.min(Math.floor(s), n - 1);
        const f = s - i;
        const [r1, g1, b1] = _INPUT_SPECTRAL[i];
        const [r2, g2, b2] = _INPUT_SPECTRAL[i + 1];
        return [Math.round(r1 + (r2 - r1) * f), Math.round(g1 + (g2 - g1) * f), Math.round(b1 + (b2 - b1) * f)];
    }

    function _setBadgeYear(badgeEl, year) {
        if (!badgeEl) { return; }
        if (year == null) { return; }
        // Text-only badge (no SVG year icon).
        badgeEl.classList.remove('ichc-year-badge-has-img');
        const img = badgeEl.querySelector('.ichc-year-badge-img');
        if (img) { img.remove(); }
        badgeEl.textContent = `${year}yr`;
    }

    function _scheduleAvatarFetch(fn) {
        return new Promise(resolve => {
            const run = () => {
                _avActive++;
                Promise.resolve()
                    .then(fn)
                    .then(result => {
                        resolve(result);
                    })
                    .catch(() => {
                        resolve(null);
                    })
                    .finally(() => {
                        _avActive--;
                        if (_avQueue.length > 0) {
                            window.setTimeout(() => (_avQueue.shift())?.(), _AV_START_GAP);
                        }
                    });
            };
            if (_avActive < _AV_MAX) { run(); }
            else { _avQueue.push(run); }
        });
    }
    let camSeed = 0;

    // ── Broadcast duration timer ──────────────────────────────────────────────────
    // Records wall-clock time when a cam card first goes live; persists across
    // page refreshes via localStorage so the counter is never reset by refreshCams().
    const _BCAST_LS = 'ichc_bcast_';

    function _formatBcastTime(ms) {
        const s = Math.floor(ms / 1000);
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        if (h > 0) {
            return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        }
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    function _updateCamTimers() {
        document.querySelectorAll('#cams .rounded_square').forEach(card => {
            const timerEl = card.querySelector('.ichc-cam-timer');
            if (!timerEl) { return; }
            const name = getCardName?.(card)?.trim().toLowerCase();
            if (!name) { if (timerEl.textContent) { timerEl.textContent = ''; } return; }
            try {
                const raw = localStorage.getItem(_BCAST_LS + name);
                if (!raw) { if (timerEl.textContent) { timerEl.textContent = ''; } return; }
                const startMs = parseInt(raw, 10);
                if (!startMs) { if (timerEl.textContent) { timerEl.textContent = ''; } return; }
                const next = _formatBcastTime(Date.now() - startMs);
                if (timerEl.textContent !== next) { timerEl.textContent = next; }
            } catch (_) {}
        });
    }
    window.setInterval(() => { _updateCamTimers(); _reapplyCamAudio(); }, 1000);

    // ── Cam-up session history (debug) ──────────────────────────────────────────
    // Each time a broadcast session ends, fold its duration into a per-nick aggregate
    // in localStorage. Inspect from the page console with ichcCamTime().
    const _CAMTIME_LS = 'ichc_camtime';
    function _loadCamTime() { try { return JSON.parse(localStorage.getItem(_CAMTIME_LS) || '{}') || {}; } catch (_) { return {}; } }
    function _saveCamTime(d) { try { localStorage.setItem(_CAMTIME_LS, JSON.stringify(d)); } catch (_) {} }
    function _recordCamSession(name) {
        const key = (name || '').trim().toLowerCase();
        if (!key) { return; }
        let startMs = 0;
        try { startMs = parseInt(localStorage.getItem(_BCAST_LS + key) || '0', 10); } catch (_) { return; }
        if (!startMs) { return; }
        const dur = Date.now() - startMs;
        if (dur < 3000 || dur > 86400000) { return; }   // ignore <3s blips and >24h stale entries
        const d = _loadCamTime();
        const e = d[key] || { totalMs: 0, sessions: 0, longestMs: 0, lastMs: 0, lastEndedAt: 0 };
        e.totalMs += dur; e.sessions += 1;
        e.longestMs = Math.max(e.longestMs, dur);
        e.lastMs = dur; e.lastEndedAt = Date.now();
        d[key] = e; _saveCamTime(d);
    }

    // ── Per-cam audio — the site mutes cam <video> elements; this un-mutes one on demand.
    // Sticky across cam refreshes via an in-memory set (re-applied each second).
    const _camAudioOn = new Set();
    function _camNick(card) { try { return getCardName(card)?.trim().toLowerCase() || ''; } catch (_) { return ''; } }
    function _toggleCamAudio(card) {
        const v = card.querySelector('video');
        if (!v) { return; }
        const nick = _camNick(card);
        if (v.muted) {
            v.muted = false; v.volume = 1;
            if (nick) { _camAudioOn.add(nick); }
            const p = v.play && v.play(); if (p && p.catch) { p.catch(() => {}); }
        } else {
            v.muted = true;
            if (nick) { _camAudioOn.delete(nick); }
        }
        card.classList.toggle('ichc-cam-audio-on', !v.muted);
    }
    function _reapplyCamAudio() {
        if (!_camAudioOn.size) { return; }
        document.querySelectorAll('#cams .rounded_square').forEach(card => {
            const on = !!(_camNick(card) && _camAudioOn.has(_camNick(card)));
            card.classList.toggle('ichc-cam-audio-on', on);
            if (on) { const v = card.querySelector('video'); if (v && v.muted) { v.muted = false; v.volume = 1; } }
        });
    }

    // ── Broadcast-quality presets (cog-menu UI → page-context applier) ──
    // NB: key must NOT start with _BCAST_LS ('ichc_bcast_') or _reconcileBcastTimers
    // would evict it as a stale per-cam timer on every relayout.
    const _BCAST_Q_KEY = 'ichc_bq';
    // Apply strings set window.__ichcBcastQ DIRECTLY (read by the always-on quality
    // patch's bcastTarget at cam-up). No dependency on the diagnostics collector, so
    // broadcast quality keeps working even with the collector's WebRTC hooks disabled.
    const _AN = ';window.ichcApplyBcastNow&&ichcApplyBcastNow()';   // apply live to the current stream too
    // `q` is the data; the apply string is derived from it. Both the page-context
    // patch and the cog menu read the same table, so a preset can never mean two
    // different things depending on which path set it.
    // Hard ceiling on what any preset may ask for. Enforced below when the apply
    // strings are built, so a preset table edit can never push the outbound stream
    // over the cap by accident — the clamp is the last word, not the table.
    const _BCAST_MAX_KBPS = 980;   // < 1 Mbps
    const _BCAST_Q_SETTINGS = {
        off:    null,
        // 720p keeps its resolution and sheds frames under pressure: the point of
        // choosing it is the resolution, and at this bitrate something has to give.
        sd480:  { width: 640,  height: 480,  maxFps: 30, maxKbps: 900, degradation: 'balanced' },
        hd720:  { width: 1280, height: 720,  maxFps: 30, maxKbps: 980, degradation: 'maintain-resolution' },
    };
    const _BCAST_Q = {
        off:    { label: 'Off (site default)' },
        sd480:  { label: '480p' },
        hd720:  { label: '720p (wide)' },
    };
    Object.keys(_BCAST_Q).forEach(k => {
        const s = _BCAST_Q_SETTINGS[k];
        if (s && s.maxKbps > _BCAST_MAX_KBPS) { s.maxKbps = _BCAST_MAX_KBPS; }
        _BCAST_Q[k].apply = 'window.__ichcBcastQ=' + JSON.stringify(s) + _AN;
    });
    // Presets removed in the trim to three. A stored key from an older build maps
    // to its nearest survivor rather than silently falling back to Off, which would
    // drop a broadcaster's caps without telling them.
    const _BCAST_Q_LEGACY = { sharp: 'sd480', smooth: 'sd480', hd: 'hd720', fhd: 'hd720' };
    // Always returns a key that exists in _BCAST_Q. An unrecognised stored value used
    // to make `_BCAST_Q[key].apply` throw, which the caller's try/catch swallowed —
    // so boot pushed no preset at all and cam-up silently used the defaults.
    function _bcastQKey() {
        try {
            const raw = localStorage.getItem(_BCAST_Q_KEY) || 'off';
            if (Object.prototype.hasOwnProperty.call(_BCAST_Q, raw)) { return raw; }
            const migrated = _BCAST_Q_LEGACY[raw];
            if (migrated) {
                try { localStorage.setItem(_BCAST_Q_KEY, migrated); } catch (_) {}
                return migrated;
            }
            return 'off';
        } catch (_) { return 'off'; }
    }
    function _bcastQLabel() { return (_BCAST_Q[_bcastQKey()] || _BCAST_Q.off).label; }
    // Display order for the cog submenu, worst-to-best. Explicit rather than
    // Object.keys(_BCAST_Q) so reordering the table above cannot silently
    // reorder the menu.
    const _BCAST_Q_ORDER = ['off', 'sd480', 'hd720'];
    // What a preset actually does, in words, DERIVED from _BCAST_Q_SETTINGS
    // rather than written out a second time — that table is the single source of
    // truth (see the note above it), so a preset can never describe itself
    // differently from what it applies.
    function _bcastQDetail(key) {
        const s = _BCAST_Q_SETTINGS[key];
        if (!s) { return 'Site default — no constraints applied'; }
        const mbps = s.maxKbps >= 1000
            ? (s.maxKbps / 1000).toFixed(s.maxKbps % 1000 === 0 ? 0 : 1) + ' Mbps'
            : s.maxKbps + ' kbps';
        // Both presets sit under the same sub-1 Mbps ceiling, so what separates
        // them at the bottom of the pipe is what each one sacrifices when the
        // link cannot keep up. Spelling that out is the point of the list.
        const tradeoff =
            s.degradation === 'maintain-resolution' ? 'keeps detail, drops frames' :
            s.degradation === 'maintain-framerate' ? 'keeps motion, drops detail' :
            'balances detail and motion';
        return s.width + '×' + s.height + ' · ' + s.maxFps + 'fps · ' + mbps + ' · ' + tradeoff;
    }
    function _setBcastQuality(key) {
        const next = Object.prototype.hasOwnProperty.call(_BCAST_Q, key) ? key : 'off';
        try { localStorage.setItem(_BCAST_Q_KEY, next); } catch (_) {}
        console.log('%c[ichc] broadcast quality: ' + next, 'color:#3ba55c;font-weight:bold');
        runInPageContext(_BCAST_Q[next].apply);
        return _BCAST_Q[next];
    }

    // ─── Emoji dataset ───────────────────────────────────────────────────────────
    // Each entry: { e: char, n: search name (lowercase) }
    const ICHC_EMOJIS = [
        // Faces – positive
        {e:'😀',n:'grinning'},{e:'😁',n:'beaming grin'},{e:'😂',n:'joy tears laugh'},
        {e:'🤣',n:'rofl rolling floor laughing'},{e:'😃',n:'big smile'},{e:'😄',n:'smile eyes'},
        {e:'😅',n:'sweat smile'},{e:'😆',n:'laughing'},{e:'😊',n:'smiling blushing'},
        {e:'😋',n:'yum delicious'},{e:'😎',n:'cool sunglasses'},{e:'😍',n:'heart eyes love'},
        {e:'🥰',n:'smiling hearts love'},{e:'😘',n:'kiss blow'},{e:'😗',n:'kissing'},
        {e:'😙',n:'kissing smiling'},{e:'😚',n:'kissing closed eyes'},
        {e:'🤩',n:'star struck excited'},{e:'😇',n:'angel halo innocent'},
        // Faces – neutral / expressive
        {e:'🙂',n:'slightly smiling'},{e:'🙃',n:'upside down'},{e:'😐',n:'neutral'},
        {e:'😑',n:'expressionless'},{e:'😶',n:'no mouth'},{e:'🫡',n:'salute'},
        {e:'🤔',n:'thinking'},{e:'🤨',n:'raised eyebrow suspicious'},
        {e:'😏',n:'smirk'},{e:'😒',n:'unamused'},{e:'🙄',n:'eye roll'},
        {e:'😬',n:'grimace'},{e:'🤥',n:'lying pinocchio'},{e:'😌',n:'relieved'},
        {e:'😔',n:'pensive sad'},{e:'😪',n:'sleepy'},{e:'🤤',n:'drooling'},
        {e:'😴',n:'sleeping zzz'},{e:'😷',n:'mask sick'},{e:'🤒',n:'thermometer sick'},
        {e:'🤕',n:'hurt bandage'},{e:'🤢',n:'nauseated sick'},{e:'🤮',n:'vomiting'},
        {e:'🤧',n:'sneezing'},{e:'🥵',n:'hot flushed'},{e:'🥶',n:'cold frozen'},
        {e:'🥴',n:'woozy drunk'},{e:'😵',n:'dizzy dead eyes'},{e:'🤯',n:'exploding head mind blown'},
        {e:'🥱',n:'yawn bored tired'},{e:'🫠',n:'melting face'},
        {e:'🫥',n:'dotted face invisible'},{e:'🫨',n:'shaking face'},
        // Faces – negative
        {e:'😞',n:'disappointed'},{e:'😟',n:'worried'},{e:'😣',n:'persevering'},
        {e:'😖',n:'confounded'},{e:'😫',n:'tired'},{e:'😩',n:'weary'},
        {e:'🥺',n:'pleading puppy eyes'},{e:'😢',n:'cry single tear'},
        {e:'😭',n:'sob loudly crying'},{e:'😤',n:'triumph steam nose'},
        {e:'😠',n:'angry'},{e:'😡',n:'pouting rage red'},{e:'🤬',n:'swearing cursing'},
        {e:'😈',n:'devil smiling'},{e:'👿',n:'devil angry'},{e:'💀',n:'skull dead'},
        {e:'☠️',n:'skull crossbones'},{e:'💩',n:'poop'},{e:'🤡',n:'clown'},
        {e:'👹',n:'ogre monster'},{e:'👺',n:'goblin'},{e:'👻',n:'ghost'},
        {e:'👽',n:'alien'},{e:'🤖',n:'robot'},{e:'🫶',n:'heart hands love'},
        // Gestures & hands
        {e:'👋',n:'wave hi hello'},{e:'🤚',n:'raised back hand'},
        {e:'🖐️',n:'hand five fingers'},{e:'✋',n:'raised hand stop'},
        {e:'🖖',n:'vulcan salute spock'},{e:'🫱',n:'rightwards hand'},
        {e:'🫲',n:'leftwards hand'},{e:'🫳',n:'palm down'},
        {e:'🫴',n:'palm up'},{e:'🫵',n:'point you'},
        {e:'👌',n:'ok perfect'},{e:'🤌',n:'pinched fingers chef kiss'},
        {e:'🤏',n:'pinching hand small tiny'},
        {e:'✌️',n:'peace victory two'},{e:'🤞',n:'crossed fingers luck'},
        {e:'🤟',n:'love you hand'},{e:'🤘',n:'horns rock metal'},
        {e:'🤙',n:'call me shaka hang loose'},{e:'👈',n:'left point'},
        {e:'👉',n:'right point'},{e:'👆',n:'up point'},{e:'👇',n:'down point'},
        {e:'☝️',n:'index point up'},{e:'👍',n:'thumbs up like good'},
        {e:'👎',n:'thumbs down dislike'},{e:'✊',n:'raised fist'},
        {e:'👊',n:'oncoming fist punch'},{e:'🤛',n:'left fist bump'},
        {e:'🤜',n:'right fist bump'},{e:'👏',n:'clap applause'},
        {e:'🙌',n:'raising hands celebration'},
        {e:'👐',n:'open hands'},{e:'🤲',n:'palms up prayer'},
        {e:'🙏',n:'pray please thank you'},{e:'🤝',n:'handshake deal'},
        {e:'💅',n:'nail polish sassy'},{e:'🤳',n:'selfie'},
        {e:'💪',n:'muscle strong flex'},{e:'🦵',n:'leg kick'},{e:'🦶',n:'foot'},
        {e:'👂',n:'ear listen'},{e:'👃',n:'nose sniff'},
        {e:'🫀',n:'heart anatomical organ'},{e:'🫁',n:'lungs'},
        {e:'🦷',n:'tooth teeth'},{e:'🦴',n:'bone'},
        // Hearts & affection
        {e:'❤️',n:'red heart love'},{e:'🧡',n:'orange heart'},
        {e:'💛',n:'yellow heart'},{e:'💚',n:'green heart'},
        {e:'💙',n:'blue heart'},{e:'💜',n:'purple heart'},
        {e:'🖤',n:'black heart'},{e:'🤍',n:'white heart'},
        {e:'🤎',n:'brown heart'},{e:'💔',n:'broken heart'},
        {e:'❤️‍🔥',n:'heart fire burning love'},{e:'❤️‍🩹',n:'heart bandage mending'},
        {e:'💕',n:'two hearts'},{e:'💞',n:'revolving hearts'},
        {e:'💓',n:'beating heart'},{e:'💗',n:'growing heart'},
        {e:'💖',n:'sparkling heart'},{e:'💘',n:'heart arrow cupid'},
        {e:'💝',n:'heart ribbon gift'},{e:'💟',n:'heart decoration'},
        {e:'♥️',n:'heart suit card'},{e:'😻',n:'heart eyes cat'},
        {e:'💋',n:'kiss mark lips'},
        // People & activities
        {e:'🫂',n:'hug people'},{e:'🤦',n:'facepalm'},
        {e:'🤷',n:'shrug whatever'},{e:'💁',n:'info person sassy'},
        {e:'🙆',n:'ok gesture person'},{e:'🙅',n:'no gesture forbidden'},
        {e:'🙋',n:'raising hand question'},{e:'🤸',n:'cartwheel gymnastics'},
        {e:'💃',n:'dance woman'},{e:'🕺',n:'dance man'},
        {e:'🧘',n:'yoga meditate lotus'},{e:'🏃',n:'running person'},
        {e:'🚶',n:'walking person'},{e:'🧗',n:'climbing person'},
        {e:'🤾',n:'handball throw'},{e:'⛹️',n:'basketball dribble'},
        {e:'🏋️',n:'weight lifting gym'},{e:'🤼',n:'wrestling'},
        {e:'🤺',n:'fencing sword'},{e:'🏇',n:'horse racing jockey'},
        {e:'🚴',n:'cycling bike'},{e:'🏊',n:'swimming'},
        {e:'🤽',n:'water polo'},{e:'🧜',n:'mermaid'},
        {e:'🧙',n:'wizard mage magic'},{e:'🧟',n:'zombie'},
        {e:'🧛',n:'vampire'},{e:'🧝',n:'elf'},
        {e:'🧞',n:'genie'},{e:'🧚',n:'fairy'},
        {e:'🧜',n:'mermaid'},{e:'👷',n:'construction worker hardhat'},
        {e:'💂',n:'guard soldier'},{e:'🕵️',n:'detective spy'},
        {e:'👨‍🍳',n:'chef cook'},{e:'👨‍🎤',n:'rock star singer'},
        {e:'👩‍💻',n:'developer programmer coder'},
        // Animals – mammals
        {e:'🐱',n:'cat kitten'},{e:'🐶',n:'dog puppy'},
        {e:'🐭',n:'mouse'},{e:'🐹',n:'hamster'},
        {e:'🐰',n:'rabbit bunny'},{e:'🦊',n:'fox'},
        {e:'🐻',n:'bear'},{e:'🐼',n:'panda'},
        {e:'🐨',n:'koala'},{e:'🐯',n:'tiger'},
        {e:'🦁',n:'lion'},{e:'🐮',n:'cow moo'},
        {e:'🐷',n:'pig oink'},{e:'🐸',n:'frog'},
        {e:'🐵',n:'monkey'},{e:'🙈',n:'see no evil monkey'},
        {e:'🙉',n:'hear no evil monkey'},{e:'🙊',n:'speak no evil monkey'},
        {e:'🐒',n:'monkey animal'},{e:'🦍',n:'gorilla ape'},
        {e:'🦧',n:'orangutan'},{e:'🦮',n:'guide dog'},
        {e:'🐕',n:'dog'},{e:'🐩',n:'poodle'},
        {e:'🐈',n:'cat'},{e:'🐎',n:'horse'},
        {e:'🦄',n:'unicorn'},{e:'🦓',n:'zebra'},
        {e:'🦌',n:'deer'},{e:'🦬',n:'bison'},
        {e:'🐄',n:'cow'},{e:'🐖',n:'pig'},
        {e:'🐏',n:'sheep ram'},{e:'🐑',n:'ewe sheep'},
        {e:'🦙',n:'llama'},{e:'🐐',n:'goat'},
        {e:'🐪',n:'camel'},{e:'🐫',n:'two hump camel'},
        {e:'🦒',n:'giraffe'},{e:'🦘',n:'kangaroo'},
        {e:'🦣',n:'mammoth'},{e:'🐘',n:'elephant'},
        {e:'🦏',n:'rhinoceros'},{e:'🦛',n:'hippopotamus'},
        {e:'🐁',n:'mouse rat'},{e:'🐀',n:'rat'},
        {e:'🐇',n:'rabbit'},{e:'🦔',n:'hedgehog'},
        {e:'🦇',n:'bat'},{e:'🐿️',n:'chipmunk squirrel'},
        // Animals – birds
        {e:'🐧',n:'penguin'},{e:'🐦',n:'bird'},
        {e:'🦅',n:'eagle'},{e:'🦆',n:'duck'},
        {e:'🦉',n:'owl'},{e:'🦚',n:'peacock'},
        {e:'🦜',n:'parrot'},{e:'🦩',n:'flamingo'},
        {e:'🕊️',n:'dove peace'},{e:'🐓',n:'rooster chicken'},
        {e:'🦃',n:'turkey'},{e:'🦢',n:'swan'},
        {e:'🐔',n:'chicken'},{e:'🦤',n:'dodo'},
        // Animals – aquatic & reptiles
        {e:'🐟',n:'fish'},{e:'🐠',n:'tropical fish'},
        {e:'🐡',n:'blowfish puffer'},{e:'🦈',n:'shark'},
        {e:'🐙',n:'octopus'},{e:'🦑',n:'squid'},
        {e:'🦞',n:'lobster'},{e:'🦀',n:'crab'},
        {e:'🦐',n:'shrimp'},{e:'🦪',n:'oyster'},
        {e:'🐬',n:'dolphin'},{e:'🐳',n:'whale'},
        {e:'🐋',n:'whale'},{e:'🦭',n:'seal'},
        {e:'🐊',n:'crocodile alligator'},{e:'🐢',n:'turtle'},
        {e:'🦎',n:'lizard'},{e:'🐍',n:'snake'},
        {e:'🐲',n:'dragon'},{e:'🦕',n:'sauropod dinosaur'},
        {e:'🦖',n:'t-rex dinosaur'},
        // Animals – bugs & insects
        {e:'🐛',n:'bug caterpillar worm'},{e:'🦋',n:'butterfly'},
        {e:'🐌',n:'snail'},{e:'🐞',n:'ladybug'},
        {e:'🐜',n:'ant'},{e:'🦟',n:'mosquito'},
        {e:'🦗',n:'cricket'},{e:'🦂',n:'scorpion'},
        {e:'🕷️',n:'spider'},{e:'🕸️',n:'spider web'},
        {e:'🐝',n:'bee honey'},{e:'🪲',n:'beetle'},
        {e:'🪳',n:'cockroach'},{e:'🦠',n:'microbe germ virus'},
        // Nature – plants & flowers
        {e:'🌸',n:'cherry blossom flower pink'},{e:'🌺',n:'hibiscus flower'},
        {e:'🌻',n:'sunflower'},{e:'🌹',n:'rose'},
        {e:'🥀',n:'wilted rose dead'},{e:'🌷',n:'tulip'},
        {e:'💐',n:'bouquet flowers'},{e:'🌼',n:'blossom daisy'},
        {e:'🪷',n:'lotus flower'},{e:'🌱',n:'seedling sprout new'},
        {e:'🌿',n:'herb leaves plant'},{e:'☘️',n:'shamrock clover'},
        {e:'🍀',n:'four leaf clover luck'},{e:'🎋',n:'bamboo'},
        {e:'🎍',n:'pine decoration'},{e:'🍃',n:'leaves flying'},
        {e:'🍂',n:'fallen leaf autumn'},{e:'🍁',n:'maple leaf canada'},
        {e:'🌾',n:'sheaf rice grain'},{e:'🪴',n:'potted plant'},
        {e:'🌵',n:'cactus desert'},{e:'🎄',n:'christmas tree'},
        {e:'🌲',n:'evergreen pine tree'},{e:'🌳',n:'tree deciduous'},
        {e:'🌴',n:'palm tree tropical'},{e:'🪵',n:'log wood'},
        {e:'🪨',n:'rock stone'},
        // Nature – sky & weather
        {e:'☀️',n:'sun sunny'},{e:'🌤️',n:'sun behind cloud'},
        {e:'⛅',n:'partly cloudy'},{e:'🌦️',n:'sun behind rain'},
        {e:'🌧️',n:'cloud rain'},{e:'⛈️',n:'thunder storm lightning'},
        {e:'🌩️',n:'lightning storm'},{e:'🌨️',n:'snow cloud'},
        {e:'❄️',n:'snowflake cold winter'},{e:'🌬️',n:'wind blowing'},
        {e:'🌀',n:'cyclone typhoon'},{e:'🌈',n:'rainbow'},
        {e:'☁️',n:'cloud'},{e:'🌫️',n:'fog mist'},
        {e:'🌪️',n:'tornado twister'},{e:'🌡️',n:'thermometer temperature'},
        {e:'☂️',n:'umbrella rain'},{e:'⛱️',n:'beach umbrella'},
        {e:'🌙',n:'crescent moon night'},{e:'🌛',n:'crescent moon face'},
        {e:'🌜',n:'crescent moon face'},{e:'🌝',n:'full moon face'},
        {e:'🌞',n:'sun face'},{e:'🌚',n:'new moon face dark'},
        {e:'⭐',n:'star'},{e:'🌟',n:'glowing star'},
        {e:'💫',n:'dizzy star spinning'},{e:'✨',n:'sparkles magic'},
        {e:'☄️',n:'comet meteor'},{e:'🌌',n:'milky way galaxy'},
        // Food & drink – savory
        {e:'🍕',n:'pizza'},{e:'🍔',n:'burger'},
        {e:'🍟',n:'fries'},{e:'🌭',n:'hot dog'},
        {e:'🌮',n:'taco'},{e:'🌯',n:'burrito wrap'},
        {e:'🫔',n:'tamale'},{e:'🥙',n:'pita flatbread'},
        {e:'🧆',n:'falafel'},{e:'🥚',n:'egg'},
        {e:'🍳',n:'fried egg pan'},{e:'🥘',n:'pot stew casserole'},
        {e:'🍲',n:'pot food stew'},{e:'🫕',n:'fondue'},
        {e:'🥣',n:'bowl cereal'},{e:'🥗',n:'salad green'},
        {e:'🍜',n:'noodles ramen'},{e:'🍝',n:'spaghetti pasta'},
        {e:'🍛',n:'curry rice'},{e:'🍚',n:'rice bowl'},
        {e:'🍙',n:'rice ball'},{e:'🍘',n:'rice cracker'},
        {e:'🍣',n:'sushi'},{e:'🍱',n:'bento box'},
        {e:'🦪',n:'oyster'},{e:'🍤',n:'shrimp fried'},
        {e:'🍙',n:'onigiri rice'},{e:'🧁',n:'cupcake'},
        {e:'🍦',n:'soft ice cream'},{e:'🍧',n:'shaved ice'},
        {e:'🥩',n:'meat steak cut'},{e:'🍗',n:'chicken leg poultry'},
        {e:'🍖',n:'meat bone'},{e:'🥓',n:'bacon'},
        {e:'🫙',n:'jar'},
        // Food & drink – bread & sweets
        {e:'🥐',n:'croissant french'},{e:'🥖',n:'baguette bread'},
        {e:'🍞',n:'bread loaf'},{e:'🥨',n:'pretzel'},
        {e:'🧀',n:'cheese'},{e:'🥞',n:'pancakes'},
        {e:'🧇',n:'waffle'},{e:'🧈',n:'butter'},
        {e:'🍰',n:'cake slice'},{e:'🎂',n:'birthday cake'},
        {e:'🍮',n:'custard pudding flan'},{e:'🍭',n:'lollipop candy'},
        {e:'🍬',n:'candy sweet'},{e:'🍫',n:'chocolate bar'},
        {e:'🍩',n:'donut doughnut'},{e:'🍪',n:'cookie'},
        {e:'🥧',n:'pie'},{e:'🍡',n:'dango sweet dumpling'},
        {e:'🍢',n:'oden japanese'},{e:'🍧',n:'shaved ice dessert'},
        // Food & drink – fruit & veg
        {e:'🍎',n:'apple red'},{e:'🍊',n:'tangerine orange'},
        {e:'🍋',n:'lemon yellow'},{e:'🍇',n:'grapes purple'},
        {e:'🍓',n:'strawberry'},{e:'🫐',n:'blueberry'},
        {e:'🍈',n:'melon'},{e:'🍉',n:'watermelon summer'},
        {e:'🍑',n:'peach'},{e:'🍒',n:'cherries'},
        {e:'🍍',n:'pineapple tropical'},{e:'🥭',n:'mango'},
        {e:'🥥',n:'coconut'},{e:'🍌',n:'banana'},
        {e:'🍐',n:'pear'},{e:'🫒',n:'olive'},
        {e:'🥑',n:'avocado'},{e:'🥦',n:'broccoli'},
        {e:'🥬',n:'leafy greens'},{e:'🥒',n:'cucumber'},
        {e:'🌽',n:'corn maize'},{e:'🥕',n:'carrot'},
        {e:'🫛',n:'pea pod beans'},{e:'🧄',n:'garlic'},
        {e:'🧅',n:'onion'},{e:'🥔',n:'potato'},
        {e:'🍆',n:'eggplant aubergine'},{e:'🥑',n:'avocado'},
        {e:'🌶️',n:'hot pepper chili spicy'},
        // Drinks
        {e:'☕',n:'coffee hot'},{e:'🍵',n:'tea hot cup'},
        {e:'🧋',n:'bubble tea boba'},{e:'🥤',n:'cup straw soft drink'},
        {e:'🧃',n:'juice box'},{e:'🥛',n:'milk glass'},
        {e:'🍺',n:'beer mug'},{e:'🍻',n:'clinking beers cheers'},
        {e:'🥂',n:'champagne toast'},{e:'🍷',n:'wine red glass'},
        {e:'🍸',n:'cocktail martini'},{e:'🍹',n:'tropical drink'},
        {e:'🧉',n:'mate drink'},{e:'🍾',n:'champagne bottle pop'},
        {e:'🫗',n:'pouring liquid'},
        // Travel & transport
        {e:'🚗',n:'car red automobile'},{e:'🚕',n:'taxi cab'},
        {e:'🚙',n:'suv car'},{e:'🚌',n:'bus'},
        {e:'🚎',n:'trolleybus'},{e:'🏎️',n:'racing car formula'},
        {e:'🚓',n:'police car'},{e:'🚑',n:'ambulance'},
        {e:'🚒',n:'fire truck'},{e:'🚐',n:'minibus van'},
        {e:'🛻',n:'pickup truck'},{e:'🚚',n:'delivery truck'},
        {e:'🚛',n:'semi truck articulated'},{e:'🚜',n:'tractor'},
        {e:'🏍️',n:'motorcycle motorbike'},{e:'🛵',n:'scooter moped'},
        {e:'🚲',n:'bicycle bike'},{e:'🛴',n:'kick scooter'},
        {e:'🛺',n:'auto rickshaw tuk-tuk'},{e:'✈️',n:'airplane plane fly'},
        {e:'🛩️',n:'small plane'},{e:'🚀',n:'rocket launch'},
        {e:'🛸',n:'ufo flying saucer'},{e:'🚁',n:'helicopter'},
        {e:'🛶',n:'canoe boat'},{e:'⛵',n:'sailboat'},
        {e:'🚤',n:'speedboat'},{e:'🛥️',n:'motor boat'},
        {e:'🚢',n:'ship cruise'},{e:'⛴️',n:'ferry'},
        {e:'🚂',n:'locomotive train'},{e:'🚃',n:'railway car'},
        {e:'🚄',n:'bullet train'},{e:'🚅',n:'bullet train fast'},
        {e:'🚇',n:'metro subway'},{e:'🚊',n:'tram'},
        {e:'🚉',n:'station'},{e:'⛽',n:'fuel pump gas'},
        {e:'🛞',n:'wheel tire'},{e:'🚦',n:'traffic light'},
        {e:'🛣️',n:'motorway highway'},{e:'🗺️',n:'map world'},
        {e:'🧭',n:'compass navigate'},{e:'⚓',n:'anchor ship'},
        {e:'🏕️',n:'camping tent'},{e:'🏔️',n:'mountain snow'},
        {e:'🗻',n:'mount fuji mountain'},{e:'🌋',n:'volcano eruption'},
        {e:'🏖️',n:'beach sand'},{e:'🏝️',n:'island tropical'},
        {e:'🏜️',n:'desert'},
        // Places & buildings
        {e:'🏠',n:'house home'},{e:'🏡',n:'house garden'},
        {e:'🏢',n:'office building'},{e:'🏣',n:'post office'},
        {e:'🏥',n:'hospital'},{e:'🏦',n:'bank'},
        {e:'🏨',n:'hotel'},{e:'🏩',n:'love hotel'},
        {e:'🏪',n:'convenience store'},{e:'🏫',n:'school'},
        {e:'🏬',n:'department store shopping'},{e:'🏰',n:'castle european'},
        {e:'🏯',n:'japanese castle'},{e:'⛩️',n:'shinto shrine'},
        {e:'🗼',n:'tokyo tower'},{e:'🗽',n:'statue liberty'},
        {e:'🎡',n:'ferris wheel'},{e:'🎢',n:'roller coaster'},
        {e:'🎠',n:'carousel'},{e:'⛲',n:'fountain'},
        {e:'🎪',n:'circus tent'},{e:'🌃',n:'night stars city'},
        {e:'🌉',n:'bridge night'},{e:'🌁',n:'foggy'},
        {e:'🌄',n:'sunrise mountain'},{e:'🌅',n:'sunrise'},
        {e:'🌆',n:'cityscape dusk'},{e:'🌇',n:'sunset city'},
        // Objects – entertainment
        {e:'🎮',n:'game controller video'},{e:'🕹️',n:'joystick arcade'},
        {e:'🎲',n:'dice game'},{e:'🧩',n:'puzzle piece'},
        {e:'🪀',n:'yo-yo'},{e:'🪁',n:'sling shot'},
        {e:'🎭',n:'performing arts theatre'},{e:'🎨',n:'palette art paint'},
        {e:'🖼️',n:'painting picture frame'},{e:'🎬',n:'clapper film movie'},
        {e:'📽️',n:'film projector'},{e:'📺',n:'television tv'},
        {e:'🎙️',n:'microphone studio'},{e:'🎚️',n:'level slider'},
        {e:'🎛️',n:'control knobs'},{e:'📻',n:'radio'},
        {e:'🎸',n:'guitar rock'},{e:'🎹',n:'piano keyboard'},
        {e:'🥁',n:'drum percussion'},{e:'🎺',n:'trumpet brass'},
        {e:'🎻',n:'violin fiddle'},{e:'🪗',n:'accordion'},
        {e:'🪘',n:'long drum bongo'},{e:'🎷',n:'saxophone sax'},
        {e:'🎵',n:'music note'},{e:'🎶',n:'musical notes'},
        {e:'🎤',n:'microphone karaoke sing'},{e:'🎧',n:'headphones music'},
        // Objects – tech & tools
        {e:'💻',n:'laptop computer'},{e:'🖥️',n:'desktop computer monitor'},
        {e:'⌨️',n:'keyboard type'},{e:'🖱️',n:'computer mouse'},
        {e:'🖨️',n:'printer'},{e:'📱',n:'mobile phone'},
        {e:'📞',n:'telephone handset'},{e:'☎️',n:'phone landline'},
        {e:'📟',n:'pager'},{e:'📠',n:'fax machine'},
        {e:'📷',n:'camera photo'},{e:'📸',n:'camera flash'},
        {e:'📹',n:'video camera'},{e:'🎥',n:'movie camera'},
        {e:'📡',n:'satellite antenna'},{e:'🔭',n:'telescope star watch'},
        {e:'🔬',n:'microscope science'},{e:'💡',n:'lightbulb idea'},
        {e:'🔦',n:'flashlight torch'},{e:'🕯️',n:'candle flame'},
        {e:'🪫',n:'low battery dead'},{e:'🔋',n:'battery charge'},
        {e:'🔌',n:'electric plug'},{e:'💾',n:'floppy disk save'},
        {e:'💿',n:'cd disc'},{e:'📀',n:'dvd disc'},
        {e:'📼',n:'videocassette vhs tape'},{e:'📺',n:'tv television'},
        {e:'🧲',n:'magnet attract'},{e:'🪜',n:'ladder'},
        {e:'⚙️',n:'gear settings cog'},{e:'🔧',n:'wrench tool fix'},
        {e:'🔩',n:'nut bolt'},{e:'🪛',n:'screwdriver'},
        {e:'🔨',n:'hammer'},{e:'⚒️',n:'hammer pick'},
        {e:'🪚',n:'carpentry saw'},{e:'🗜️',n:'clamp'},
        {e:'⚖️',n:'scales balance justice'},
        // Objects – everyday
        {e:'📚',n:'books stack'},{e:'📖',n:'open book read'},
        {e:'📝',n:'memo note write'},{e:'✏️',n:'pencil write'},
        {e:'🖊️',n:'pen write'},{e:'🖋️',n:'fountain pen'},
        {e:'📌',n:'pushpin location'},{e:'📍',n:'round pushpin map'},
        {e:'📎',n:'paperclip'},{e:'🖇️',n:'linked paperclips'},
        {e:'✂️',n:'scissors cut'},{e:'🗂️',n:'card index dividers'},
        {e:'🗃️',n:'card file box'},{e:'🗄️',n:'file cabinet'},
        {e:'🗑️',n:'wastebasket trash'},{e:'🔐',n:'locked key'},
        {e:'🔑',n:'key unlock'},{e:'🗝️',n:'old key'},
        {e:'🔒',n:'locked padlock'},{e:'🔓',n:'unlocked padlock'},
        {e:'🔔',n:'bell notification'},{e:'🔕',n:'bell slash muted'},
        {e:'📣',n:'megaphone loud'},{e:'📢',n:'loudspeaker announcement'},
        {e:'🪄',n:'magic wand'},{e:'💎',n:'gem diamond jewel'},
        {e:'💰',n:'money bag rich'},{e:'💵',n:'dollar bill cash'},
        {e:'💳',n:'credit card'},{e:'🎫',n:'ticket admission'},
        {e:'🎟️',n:'admission tickets'},{e:'🏷️',n:'label tag price'},
        {e:'📦',n:'package box'},{e:'📫',n:'mailbox closed'},
        {e:'📬',n:'open mailbox'},{e:'📭',n:'mailbox empty'},
        {e:'✉️',n:'envelope letter email'},{e:'📧',n:'email message'},
        {e:'📩',n:'envelope arrow incoming'},{e:'📨',n:'incoming envelope'},
        {e:'🎒',n:'backpack school bag'},{e:'👝',n:'purse clutch'},
        {e:'👛',n:'purse wallet'},{e:'👜',n:'handbag'},
        {e:'🧳',n:'luggage travel suitcase'},{e:'☂️',n:'umbrella rain'},
        {e:'🧵',n:'thread sew stitch'},{e:'🧶',n:'yarn wool knit'},
        {e:'💊',n:'pill medicine tablet'},{e:'💉',n:'syringe needle injection'},
        {e:'🩺',n:'stethoscope doctor'},{e:'🩹',n:'adhesive bandage first aid'},
        {e:'🧬',n:'dna genetics science'},{e:'🧪',n:'test tube experiment'},
        {e:'🧫',n:'petri dish biology'},{e:'⚗️',n:'alembic chemistry'},
        {e:'🔮',n:'crystal ball fortune'},{e:'🪬',n:'hamsa evil eye'},
        {e:'🧿',n:'nazar amulet evil eye'},
        // Sports & games
        {e:'⚽',n:'soccer football'},{e:'🏀',n:'basketball'},
        {e:'🏈',n:'american football'},{e:'⚾',n:'baseball'},
        {e:'🥎',n:'softball'},{e:'🏐',n:'volleyball'},
        {e:'🏉',n:'rugby football'},{e:'🎾',n:'tennis'},
        {e:'🥏',n:'flying disc frisbee'},{e:'🎳',n:'bowling'},
        {e:'🏏',n:'cricket game'},{e:'🏑',n:'field hockey'},
        {e:'🏒',n:'ice hockey'},{e:'🥍',n:'lacrosse'},
        {e:'🏓',n:'ping pong table tennis'},{e:'🏸',n:'badminton'},
        {e:'🥊',n:'boxing glove'},{e:'🥋',n:'martial arts belt'},
        {e:'🥅',n:'goal net'},{e:'⛳',n:'golf flag hole'},
        {e:'⛸️',n:'ice skate'},{e:'🎿',n:'ski skis'},
        {e:'🛷',n:'sled toboggan'},{e:'🎯',n:'direct hit bullseye'},
        {e:'🎱',n:'pool billiard 8 ball'},{e:'🏹',n:'bow arrow'},
        {e:'🎣',n:'fishing rod fish'},{e:'🤿',n:'diving mask snorkel'},
        {e:'🎽',n:'running shirt sports'},{e:'🎖️',n:'military medal'},
        {e:'🏆',n:'trophy winner'},{e:'🥇',n:'gold medal first place'},
        {e:'🥈',n:'silver medal second'},{e:'🥉',n:'bronze medal third'},
        // Symbols & misc
        {e:'🔥',n:'fire hot lit'},{e:'💥',n:'boom explosion'},
        {e:'💢',n:'anger symbol mad'},{e:'💨',n:'dashing running wind'},
        {e:'💦',n:'sweat drops water'},{e:'💤',n:'zzz sleep'},
        {e:'🕳️',n:'hole void'},{e:'💣',n:'bomb explosion'},
        {e:'💈',n:'barber pole'},{e:'🚁',n:'helicopter'},
        {e:'🎉',n:'party popper celebration'},{e:'🎊',n:'confetti ball party'},
        {e:'🎈',n:'balloon'},{e:'🎁',n:'gift present wrapped'},
        {e:'🎀',n:'ribbon bow'},{e:'🪅',n:'piñata'},
        {e:'🎃',n:'jack-o-lantern halloween'},{e:'🎆',n:'fireworks'},
        {e:'🎇',n:'sparkler'},{e:'🧨',n:'firecracker red'},
        {e:'✨',n:'sparkles'},{e:'🎍',n:'bamboo decoration'},
        {e:'🎋',n:'tanabata tree bamboo'},{e:'🎎',n:'japanese dolls'},
        {e:'🎐',n:'wind chime'},{e:'🎑',n:'moon viewing ceremony'},
        {e:'💯',n:'hundred percent perfect'},{e:'🔞',n:'no under 18'},
        {e:'‼️',n:'double exclamation'},{e:'❓',n:'question mark'},
        {e:'❗',n:'exclamation mark'},{e:'✅',n:'check mark yes'},
        {e:'❌',n:'cross no x'},{e:'⚠️',n:'warning caution'},
        {e:'🆒',n:'cool button'},{e:'🆕',n:'new button'},
        {e:'🆓',n:'free button'},{e:'🆙',n:'up button'},
        {e:'🆗',n:'ok button'},{e:'🆘',n:'sos emergency'},
        {e:'🔴',n:'red circle'},{e:'🟠',n:'orange circle'},
        {e:'🟡',n:'yellow circle'},{e:'🟢',n:'green circle'},
        {e:'🔵',n:'blue circle'},{e:'🟣',n:'purple circle'},
        {e:'⚫',n:'black circle'},{e:'⚪',n:'white circle'},
        {e:'🔶',n:'orange diamond large'},{e:'🔷',n:'blue diamond large'},
        {e:'🔸',n:'orange diamond small'},{e:'🔹',n:'blue diamond small'},
        {e:'🔺',n:'red triangle up'},{e:'🔻',n:'red triangle down'},
        {e:'👀',n:'eyes looking watching'},{e:'🗣️',n:'speaking head talk'},
        {e:'💬',n:'speech bubble chat'},{e:'💭',n:'thought bubble thinking'},
        {e:'🗯️',n:'anger bubble shout'},{e:'🫧',n:'bubbles'},
        {e:'🪐',n:'planet saturn'},{e:'🌍',n:'earth europe africa'},
        {e:'🌎',n:'earth americas'},{e:'🌏',n:'earth asia'},
        {e:'🗺️',n:'world map'},{e:'🧭',n:'compass'},
        {e:'🚩',n:'flag triangular red'},{e:'🏴',n:'black flag'},
        {e:'🏳️',n:'white flag surrender'},{e:'🏁',n:'chequered flag finish'},
    ];

    // ─── JS ──────────────────────────────────────────────────────────────────────

    // ── Themes ──────────────────────────────────────────────────────────────────
    // Palettes live in theme.css as token blocks; this is only the registry and
    // the class plumbing. `light` keeps the original `ichc-light-theme` class
    // because ~150 pre-token override rules are still keyed to it — renaming it
    // would silently strip the light theme back to its tokens.
    // `swatch` is [surface, accent, text] and duplicates three values from each
    // CSS block on purpose: the picker has to draw a theme that is not applied,
    // and a var() can only ever resolve to the active palette.
    const THEMES = [
        { id: 'dark',       label: 'Dark',             cls: '',                      light: false, swatch: ['#18191c', '#5865f2', '#dbdee1'] },
        { id: 'light',      label: 'Light',            cls: 'ichc-light-theme',      light: true,  swatch: ['#d4d7dc', '#5865f2', '#313338'] },
        { id: 'mocha',      label: 'Catppuccin Mocha', cls: 'ichc-theme-mocha',      light: false, swatch: ['#1e1e2e', '#cba6f7', '#cdd6f4'] },
        { id: 'tokyo',      label: 'Tokyo Night',      cls: 'ichc-theme-tokyo',      light: false, swatch: ['#1a1b26', '#7aa2f7', '#c0caf5'] },
        { id: 'everforest', label: 'Everforest',       cls: 'ichc-theme-everforest', light: false, swatch: ['#2d353b', '#a7c080', '#d3c6aa'] },
        { id: 'paper',      label: 'Paper',            cls: 'ichc-theme-paper',      light: true,  swatch: ['#e8e1d2', '#2f6d7a', '#3b3529'] },
        { id: 'dawn',       label: 'Rosé Pine Dawn',   cls: 'ichc-theme-dawn',       light: true,  swatch: ['#fffaf3', '#907aa9', '#575279'] },
    ];
    const THEME_CLASSES = THEMES.map(t => t.cls).filter(Boolean).concat('ichc-theme-is-light');

    function currentThemeId() {
        const saved = localStorage.getItem('ichc_theme');
        return THEMES.some(t => t.id === saved) ? saved : 'dark';
    }
    function currentTheme() {
        return THEMES.find(t => t.id === currentThemeId()) || THEMES[0];
    }
    function applyTheme(id, { persist = true } = {}) {
        const theme = THEMES.find(t => t.id === id) || THEMES[0];
        const root = document.documentElement;
        root.classList.remove(...THEME_CLASSES);
        if (theme.cls) { root.classList.add(theme.cls); }
        // Polarity marker, read by the CSS that flips user nick colours and by
        // isLightTheme() in chat.js. Kept separate from the palette class so a
        // new light theme needs no changes anywhere but the registry.
        if (theme.light) { root.classList.add('ichc-theme-is-light'); }
        if (persist) { localStorage.setItem('ichc_theme', theme.id); }
        document.dispatchEvent(new CustomEvent('ichc-theme-change'));
        return theme;
    }

    // Apply saved theme before first paint
    applyTheme(currentThemeId(), { persist: false });

    // ── Loading overlay — fills the Rocket Loader deferral gap ──────────────────
    (function _installLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'ichc-loading-overlay';
        overlay.innerHTML =
            `<div id="ichc-loading-icon">${ICONS.broadcast}</div>` +
            `<div id="ichc-loading-wordmark">icanhazchat</div>` +
            `<div id="ichc-loading-bar"><div id="ichc-loading-bar-fill"></div></div>` +
            `<div id="ichc-loading-sub">connecting…</div>`;
        document.documentElement.appendChild(overlay);

        const fill = overlay.querySelector('#ichc-loading-bar-fill');

        let _gone = false;
        const dismiss = () => {
            if (_gone) { return; }
            _gone = true;
            // Freeze scaleX at its current animated value, then ease to scaleX(1).
            const frozen = getComputedStyle(fill).transform;
            fill.style.setProperty('animation', 'none', 'important');
            fill.style.setProperty('transform', frozen, 'important');
            fill.style.setProperty('transition', 'transform 0.35s ease-out', 'important');
            fill.offsetWidth; // force reflow before transition starts
            fill.style.setProperty('transform', 'scaleX(1)', 'important');
            setTimeout(() => {
                overlay.classList.add('ichc-loading-out');
                setTimeout(() => { overlay.remove(); }, 620);
            }, 380);
        };

        // If scripts already ran (e.g. extension reloaded mid-session), dismiss instantly.
        if (typeof window.refreshCams === 'function') { dismiss(); return; }

        // After window.load Rocket Loader starts executing deferred scripts.
        // Poll briefly for the site's main cam function to confirm they've run.
        window.addEventListener('load', () => {
            let _t = 0;
            const _poll = setInterval(() => {
                _t += 60;
                if (typeof window.refreshCams === 'function' || _t >= 4000) {
                    clearInterval(_poll);
                    dismiss();
                }
            }, 60);
        });

        // Hard cap: never show longer than 10 s regardless of script state.
        setTimeout(dismiss, 10000);
    }());

    installBroadcastQualityPatch();
    installBroadcastDeviceSwitchFix();

    document.addEventListener('DOMContentLoaded', () => {
        _pruneProfileCaches();   // free localStorage early so the site's own writes never fail
        // Cosmetic, and it runs before the layout builders — so it is isolated. An
        // exception here used to take installStageLayout/initUserList/initCamLayout
        // with it, which leaves a room showing nothing but cams.
        try { ensureSiteHeaderLogo(); } catch (_) {}   // no-op in a room anyway
        installStageLayout();
        installUnifiedHeader();
        initUserList();
        initCamLayout();
        initChatCamBadges();
        initLurkBanner();
        initDynamicLayout();
        transformCommandBar();
        installCamDiagnostics();
        installCamMonitor();
        // Push the saved broadcast-quality preset into the page (read by the quality
        // patch at cam-up). Independent of the diagnostics collector.
        try { runInPageContext(_BCAST_Q[_bcastQKey()].apply); } catch (_) {}
        // Retried because the site's own scripts may not have defined as() yet.
        // The patch is idempotent and only sets its flag once it has really wrapped.
        installFocusGuardPatch();
        installScrollPauseFix();
        installCamDownAudioFix();
        [800, 2500, 6000].forEach(d => window.setTimeout(() => {
            installFocusGuardPatch();
            installScrollPauseFix();
            installCamDownAudioFix();
        }, d));
        // Resume observing persisted rooms once this room has had time to join
        // — the whole feature is inert while the list is empty.
        window.setTimeout(() => { try { _obsSync(); } catch (_) {} }, 3000);
        // Clear the init transition-suppression class unconditionally.
        // CSS vars are already set from the localStorage cache, so no layout reflow needed here.
        // The initDynamicLayout retries will refine the layout once the DOM is measurable.
        document.documentElement.classList.remove('ichc-cams-init');

        // Spectral border gradient: colour shifts through the karma palette as user types.
        document.addEventListener('input', e => {
            const el = e.target;
            if (el.id !== 'txtMsg' && !el.matches('.pm_outgoing input[type="text"]')) { return; }
            const maxLen = el.maxLength > 0 ? el.maxLength : 500;
            const t = Math.pow(el.value.length / maxLen, 0.4);
            if (el.value.length === 0) {
                el.style.removeProperty('--ichc-input-border');
                el.style.removeProperty('--ichc-input-glow');
            } else {
                const [r, g, b] = _spectralInputColor(Math.min(t, 1));
                el.style.setProperty('--ichc-input-border', `rgba(${r},${g},${b},0.85)`);
                el.style.setProperty('--ichc-input-glow',   `rgba(${r},${g},${b},0.20)`);
            }
        });
    });

    // ── Dialog center + drag ──────────────────────────────────────────────────────

    function _injectSlotOfferToChat(dialog) {
        const txt = document.getElementById('txt');
        if (!txt) { return; }
        if (txt.querySelector('.ichc-slot-offer-row')) { return; } // already injected

        const contentEl = dialog.querySelector('.ui-dialog-content');
        const titleEl   = dialog.querySelector('.ui-dialog-title');
        const bodyText  = (contentEl?.textContent || '').trim();
        const titleText = (titleEl?.textContent  || '').trim();

        const row = document.createElement('div');
        row.className = 'ichc-slot-offer-row';

        if (titleText) {
            const h = document.createElement('div');
            h.className = 'ichc-slot-offer-title';
            h.textContent = titleText;
            row.appendChild(h);
        }
        if (bodyText) {
            const p = document.createElement('div');
            p.className = 'ichc-slot-offer-msg';
            p.textContent = bodyText;
            row.appendChild(p);
        }

        // Collect action buttons from buttonset and content links
        const dialogBtns = [
            ...dialog.querySelectorAll('.ui-dialog-buttonset button, .ui-dialog-buttonpane button'),
            ...dialog.querySelectorAll('.ui-dialog-content a'),
        ].filter(b => b.textContent.trim());

        if (dialogBtns.length) {
            const btnsEl = document.createElement('div');
            btnsEl.className = 'ichc-slot-offer-btns';
            dialogBtns.forEach((btn, i) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'ichc-slot-offer-btn' + (i === 0 ? ' ichc-slot-offer-btn-primary' : '');
                b.textContent = btn.textContent.trim();
                b.addEventListener('click', e => {
                    e.stopPropagation();
                    btn.click();
                    row.remove();
                });
                btnsEl.appendChild(b);
            });
            row.appendChild(btnsEl);
        }

        txt.appendChild(row);
        txt.scrollTop = txt.scrollHeight;

        // Auto-remove when dialog is closed or hidden
        const cleanup = new MutationObserver(() => {
            const gone = !dialog.isConnected || dialog.style.display === 'none';
            if (gone) { row.remove(); cleanup.disconnect(); }
        });
        cleanup.observe(dialog, { attributes: true, attributeFilter: ['style', 'class'] });
        if (dialog.parentNode) { cleanup.observe(dialog.parentNode, { childList: true }); }
    }

    function _isSlotOfferDialog(dialog) {
        const text = normalizeText(dialog.textContent || '');
        const hasTopic  = /\bslot\b|\bspot\b|\bcam\b|\bbroadcast(?:ing)?\b/.test(text);
        const hasIntent = /\bgive\b|\boffer\b|\brelease\b|\bwould you\b|\bwant(?:s)?\b|\bwaiting\b|\bfree\b|\btaken\b|\bfull\b|\bsomeone\b|\bqueue\b|\bavailable\b/.test(text);
        return hasTopic && hasIntent;
    }

    function _initDialog(dialog) {
        if (dialog._ichcDialog) { return; }
        dialog._ichcDialog = true;

        // Center on first open
        requestAnimationFrame(() => {
            const w = dialog.offsetWidth || 320;
            const h = dialog.offsetHeight || 400;
            dialog.style.left = Math.max(8, (window.innerWidth  - w) / 2) + 'px';
            dialog.style.top  = Math.max(8, (window.innerHeight - h) / 2) + 'px';
        });

        const titlebar = dialog.querySelector('.ui-dialog-titlebar');

        const _closeDialog = () => {
            try { if (typeof $ !== 'undefined') { $(dialog).dialog('close'); return; } } catch (_) {}
            dialog.style.display = 'none';
        };

        // Close button — replace jQuery UI sprite icon with SVG X
        const closeBtn = dialog.querySelector('.ui-dialog-titlebar-close');
        if (closeBtn) {
            closeBtn.replaceChildren();
            closeBtn.insertAdjacentHTML('beforeend',
                '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" ' +
                'style="pointer-events:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;fill:none;">' +
                '<line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>');
            closeBtn.addEventListener('click', e => { e.stopPropagation(); _closeDialog(); });
        }

        // "Send Private Message" / "Start Private Message" → open PM tab
        const nick = dialog.querySelector('.ui-dialog-title')?.textContent?.trim() || '';

        // Apply profile background image to dialog
        if (nick) {
            const _applyDialogBg = () => {
                const bgUrl = profileBgCache.get(nick.toLowerCase());
                if (bgUrl && dialog.isConnected) {
                    dialog.style.setProperty('--ichc-dialog-bg', `url("${bgUrl}")`);
                    dialog.classList.add('ichc-has-profile-bg');
                }
            };
            _applyDialogBg();
            setTimeout(_applyDialogBg, 600);
            setTimeout(_applyDialogBg, 1800);
        }

        // Seed avatar cache from the dialog's own DOM — the profile pic is in
        // td.trophy_case img.rounded and is already loaded; no page fetch needed.
        if (nick) {
            requestAnimationFrame(() => {
                const pfpEl = dialog.querySelector('td.trophy_case img.rounded, td.trophy_case img, .trophy_case img');
                if (!pfpEl) { return; }
                const raw = pfpEl.getAttribute('src') || '';
                if (!raw) { return; }
                try {
                    const url = new URL(raw, location.href).href;
                    if (_isUserAvatarUrl(url)) {
                        _profileCacheSet(nick.toLowerCase(), url);
                        _lsAvSave(nick.toLowerCase(), url);
                    }
                } catch (_) {}
            });
        }

        if (nick) {
            dialog.addEventListener('click', e => {
                const a = e.target.closest('a');
                if (!a) { return; }
                const txt = (a.textContent || '').toLowerCase();
                if (/private\s*message|send.*pm/.test(txt)) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.dispatchEvent(new CustomEvent('ichc-pm-open', { detail: { nick, forceShow: true } }));
                    _closeDialog();
                }
            });
        }

        // Drag via titlebar — RAF-throttled to avoid jank
        if (!titlebar) { return; }
        titlebar.addEventListener('mousedown', e => {
            if (e.button !== 0 || e.target.closest('.ui-dialog-titlebar-close')) { return; }
            e.preventDefault();
            const startX = e.clientX;
            const startY = e.clientY;
            const startLeft = parseFloat(dialog.style.left) || 0;
            const startTop  = parseFloat(dialog.style.top)  || 0;
            titlebar.style.cursor = 'grabbing';
            let _pendingX = startX, _pendingY = startY, _rafId = null;
            const onMove = ev => {
                _pendingX = ev.clientX;
                _pendingY = ev.clientY;
                if (_rafId) { return; }
                _rafId = requestAnimationFrame(() => {
                    _rafId = null;
                    dialog.style.left = Math.max(0, startLeft + _pendingX - startX) + 'px';
                    dialog.style.top  = Math.max(0, startTop  + _pendingY - startY) + 'px';
                });
            };
            const onUp = () => {
                if (_rafId) { cancelAnimationFrame(_rafId); _rafId = null; }
                titlebar.style.cursor = '';
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup',  onUp);
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup',  onUp);
        });

        // Mirror slot-offer dialogs into the chat log.
        // Retried at 400 ms and 1000 ms because jQuery UI sometimes populates
        // dialog content and buttonsets asynchronously after the node is added.
        const _trySlotOffer = () => {
            if (_isSlotOfferDialog(dialog)) { _injectSlotOfferToChat(dialog); }
        };
        requestAnimationFrame(_trySlotOffer);
        setTimeout(_trySlotOffer, 400);
        setTimeout(_trySlotOffer, 1000);
    }

    new MutationObserver(muts => {
        for (const mut of muts) {
            for (const node of mut.addedNodes) {
                if (!(node instanceof Element)) { continue; }
                if (node.classList.contains('ui-dialog')) { _initDialog(node); }
                node.querySelectorAll('.ui-dialog').forEach(_initDialog);
            }
        }
    }).observe(document.documentElement, { childList: true, subtree: true });

    // ── Shared utilities ──────────────────────────────────────────────────────────

    function normalizeText(value = '') {
        return value.replace(/\s+/g, ' ').trim().toLowerCase();
    }

    // Runs `source` in the PAGE's own JS realm, via the background service worker.
    //
    // A previous attempt injected a <script> element directly instead. Do not do
    // that: this function is reachable at document_start, when <head> does not yet
    // exist, so the element lands as a child of <html> mid-parse and wrecks the
    // page. It is reverted.
    //
    // What IS kept from that attempt is the engine guard. Firefox's `chrome.*`
    // alias is callback-based, so sendMessage returns undefined there and
    // `.catch()` on the result is a TypeError that aborts the CALLER — the message
    // is dispatched (the call precedes the property access), so the damage is to
    // whatever the caller meant to do next, silently.
    function runInPageContext(source) {
        try {
            const api = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;
            const ret = api.runtime.sendMessage({ type: 'ichc-exec', code: source });
            if (ret && typeof ret.catch === 'function') { ret.catch(() => {}); }
        } catch (_) {}
    }


    // ── Stop the site yanking focus into the chat box while you type elsewhere ──
    // Root cause, from the site's own scripts110725.js:
    //
    //   function onChatHistoryScroll(){ … if(scrolled away from bottom){ … scrollOff() } … }
    //   function scrollOff(){ … if(!du.fq){du.fq=$get(oT)} as(); … }
    //   function as(){ if(du.fq){ du.fq.focus() } }
    //
    // So scrolling the chat log away from the bottom focuses the chat input, and
    // scrolling back down re-arms it (the `du.eo` flag flips via cR()), so it fires
    // again on the next scroll up. Anything you were typing in — the user-list
    // filter, a PM, a site form — loses focus mid-keystroke, repeatedly.
    //
    // as() is ALSO used legitimately: send_command() ends with it so focus returns
    // to chat after you send. So it is not disabled. It is only prevented from
    // taking focus away from ANOTHER text field. When nothing is focused, or the
    // chat box already is, it behaves exactly as before.
    // ── The site pauses chat scrolling even when you are at the bottom ─────────
    // THE ROOT CAUSE of "chat freezes / only updates when I click".
    //
    // The site decides you have scrolled away from the bottom with a FIXED pixel
    // test in onChatHistoryScroll:
    //
    //     if (du.fp.scrollTop < du.fp.scrollHeight - 450) { ... scrollOff() }
    //
    // 450px is only correct while the chat viewport is shorter than 450px, which
    // it is in the site's own layout. This extension makes the log much taller —
    // measured live at clientHeight 1283 — and at the very bottom
    // scrollTop === scrollHeight - clientHeight, so the test reads
    //
    //     scrollHeight - 1283  <  scrollHeight - 450     -> always true
    //
    // The site therefore pauses on EVERY scroll event, permanently, no matter
    // where the user is. That is not just a stalled auto-scroll: cR() ends with
    // "var c = du.en; du.en = ''; aA(c)", so while paused incoming messages are
    // buffered into du.en instead of being appended — the chat stops rendering and
    // dumps a burst whenever something calls cR().
    //
    // Rather than reimplement the site's scroll handler, scrollOff() is wrapped to
    // refuse when the log is genuinely at the bottom. Scrolling up still pauses
    // (the feature works), and the site's own resume path is untouched.
    const SCROLL_BOTTOM_SLOP = 150;   // px; "close enough to the bottom to be following"
    function installScrollPauseFix() {
        runInPageContext(`
(() => {
    if (window.__ichcScrollPauseFix) { return; }
    const orig = window.scrollOff;
    if (typeof orig !== 'function') { return; }   // site scripts not up yet; retried
    window.__ichcScrollPauseFix = true;
    window.scrollOff = function () {
        try {
            const el = (window.du && du.fp) || document.getElementById('txt');
            if (el && (el.scrollHeight - el.scrollTop - el.clientHeight) < ${SCROLL_BOTTOM_SLOP}) {
                // At the bottom. The site's fixed 450px test is wrong for a chat
                // viewport this tall, and pausing here buffers messages that the
                // user is actively looking at.
                return;
            }
        } catch (e) {}
        return orig.apply(this, arguments);
    };
    console.log('%c[ichc] chat scroll-pause fix installed', 'color:#3ba55c');
})();
        `);
    }

    // ── Cam down leaves the server thinking you still broadcast audio ──────────
    // Read from the site's own scripts110725.js:
    //
    //   function startBroadcasting(b){ ... send_command("/cam onx");
    //                                  setTimeout(()=>send_command("/cam audio-on"),2000) ... }
    //   function stopCam(a){ ... du.fE=0; if(a){ send_command("/cam off") } ... }
    //   function flashMicOff(){ du.eS=0; ax(); send_command("/cam audio-off"); du.el=0 }
    //
    // Going live tells the server BOTH "/cam onx" and "/cam audio-on". Cam down
    // sends only "/cam off" — never "/cam audio-off" — and leaves du.el / du.eS
    // set. The server therefore still has the audio flag for this user: the audio
    // indicator stays up, and the slot is still accounted for, which is why going
    // live again does not take.
    //
    // stopCam is wrapped so a user-initiated cam-down also clears the audio side,
    // using the site's OWN flashMicOff() where available so its client state
    // (du.eS, du.el) and its "Your cam:" control strip are updated the same way
    // they would be by the mute toggle.
    //
    // Deliberately within the guardrails in memory/firefox-cam-switch-clean-restart:
    // no foreign track is put on the site's senders, and the site's broadcast
    // toggle is never auto-clicked. This only runs on a stop the USER initiated
    // (stopCam's first argument is what tells the server), never to restart.
    function installCamDownAudioFix() {
        runInPageContext(`
(() => {
    if (window.__ichcCamDownAudioFix) { return; }
    const origStop = window.stopCam;
    const origSend = window.send_command;
    if (typeof origStop !== 'function' || typeof origSend !== 'function') { return; }
    window.__ichcCamDownAudioFix = true;

    // Is a broadcast currently meant to be running? Tracked from the commands the
    // site itself sends, so no minified internals are relied on.
    let broadcastArmed = false;

    // THE RACE. startBroadcasting() does:
    //     send_command("/cam onx");
    //     setTimeout(() => send_command("/cam audio-on"), 2000);
    // and nothing cancels that timer. Cam down inside those two seconds and the
    // server receives "/cam off" and then "/cam audio-on", so it announces
    // "<nick> is now broadcasting audio" for a cam that is already down — the
    // stuck audio indicator, and it also lands after our own "/cam audio-off".
    // The timer cannot be cleared from out here (its id never leaves the closure),
    // so the stale command is dropped at the point it would be sent.
    window.send_command = function (cmd) {
        try {
            const text = String(cmd || '');
            if (text === '/cam on' || text === '/cam onx') {
                broadcastArmed = true;
            } else if (text === '/cam off') {
                broadcastArmed = false;
            } else if (text === '/cam audio-on' && !broadcastArmed) {
                // Deferred audio-on landing after the cam went down. Dropping it is
                // the whole point; a legitimate audio-on (going live, or unmuting
                // while live) always has broadcastArmed set.
                console.log('%c[ichc] dropped a stale "/cam audio-on" after cam down',
                            'color:#faa61a');
                return;
            }
        } catch (e) {}
        return origSend.apply(this, arguments);
    };

    // The site's stopCam sends only "/cam off" — never "/cam audio-off" — and
    // leaves du.el / du.eS set, so the server keeps the audio flag for this user.
    // flashMicOff() is the site's own function for exactly that.
    window.stopCam = function (sendOff) {
        const result = origStop.apply(this, arguments);
        try {
            if (sendOff) {
                broadcastArmed = false;
                if (typeof flashMicOff === 'function') {
                    flashMicOff();
                } else {
                    window.send_command('/cam audio-off');
                }
            }
        } catch (e) {
            console.warn('[ichc] cam-down audio release failed', e);
        }
        return result;
    };

    console.log('%c[ichc] cam-down audio release installed', 'color:#3ba55c');
})();
`);
    }

    function installFocusGuardPatch() {
        runInPageContext(`
(() => {
    if (window.__ichcFocusGuard) { return; }
    const orig = window.as;
    // Site scripts may not have run yet — leave the flag unset so a later retry
    // can still install this.
    if (typeof orig !== 'function') { return; }
    window.__ichcFocusGuard = true;
    window.as = function () {
        try {
            const el = document.activeElement;
            const typingElsewhere = el && el !== document.body && (
                el.isContentEditable ||
                ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.id !== 'txtMsg')
            );
            if (typingElsewhere) { return; }
        } catch (e) {}
        return orig.apply(this, arguments);
    };
    console.log('%c[ichc] focus guard installed on as()', 'color:#3ba55c');
})();
        `);
    }

    function installBroadcastQualityPatch() {
        const source = `
(() => {
    if (window.__ichcBroadcastQualityPatch) { return; }
    window.__ichcBroadcastQualityPatch = true;

    const target = {
        width: { ideal: 640, max: 1280 },
        height: { ideal: 480, max: 720 },
        frameRate: { ideal: 15, max: 30 },
        bitrate: 1500000,
    };

    // Effective target: the user's broadcast-quality preset overrides the defaults.
    // Read live so a preset change takes effect on the NEXT cam-up — we deliberately
    // never touch the live broadcast track, which is what desyncs ICHC into the stuck
    // "broadcasting audio" state.
    //
    // localStorage is the source of truth, NOT window.__ichcBcastQ. The page-global is
    // only a cache: it is pushed in by a fire-and-forget extension message, so it can be
    // missing at cam-up if that message raced or the page context was rebuilt. When that
    // happened the preset silently reverted to the defaults, and the only way back was to
    // cycle presets until the setting was re-pushed. Reading the store here means a saved
    // preset applies on the first cam-up with no push at all.
    var __ichcQPresets = ${JSON.stringify(_BCAST_Q_SETTINGS)};
    function savedBcastQ() {
        try {
            var k = localStorage.getItem(${JSON.stringify(_BCAST_Q_KEY)});
            if (k && Object.prototype.hasOwnProperty.call(__ichcQPresets, k)) {
                return __ichcQPresets[k];
            }
        } catch (_) {}
        return null;
    }
    function bcastTarget() {
        // undefined means nothing was ever pushed — fall back to the store. An explicit
        // null means the user chose "Off", which must NOT be overridden by the fallback.
        var q = window.__ichcBcastQ;
        if (q === undefined) { q = savedBcastQ(); }
        if (q && q.width && q.height) {
            return {
                width:  { ideal: q.width,  max: q.width },
                height: { ideal: q.height, max: q.height },
                frameRate: { ideal: q.maxFps || 30, max: q.maxFps || 30 },
                bitrate: q.maxKbps ? q.maxKbps * 1000 : target.bitrate,
            };
        }
        return target;
    }

    function liftNumber(value, minimum) {
        return typeof value === 'number' ? Math.max(value, minimum) : minimum;
    }

    function liftConstraint(existing, desired) {
        if (existing == null || existing === true) { return Object.assign({}, desired); }
        if (typeof existing === 'number') {
            return { ideal: liftNumber(existing, desired.ideal), max: desired.max };
        }
        if (typeof existing !== 'object') { return existing; }

        const next = Object.assign({}, existing);
        delete next.exact;
        next.ideal = liftNumber(next.ideal, desired.ideal);
        next.max = liftNumber(next.max, desired.max);
        return next;
    }

    // Resolve the broadcaster dropdown's CURRENTLY-selected camera to a real Firefox
    // deviceId, read live at the moment getUserMedia fires. By the time ICHC calls
    // getUserMedia (in response to the dropdown's change event) the <select> already
    // holds the new value — so reading it here is never a tick behind, unlike the
    // pre-recorded window._ichcSelectedVideoId which raced ICHC's preview capture and
    // always landed one selection late (OBS showed Kinect, Kinect showed OBS).
    function selectedVideoId() {
        try {
            const panel = document.getElementById('rtc-broadcaster');
            const inputs = window._ichcVideoInputs || [];
            if (panel && inputs.length) {
                const sels = panel.querySelectorAll('select');
                for (const sel of sels) {
                    if (!sel.value) { continue; }
                    const hint = (sel.id + ' ' + sel.name).toLowerCase();
                    if (/audio|mic|sound/i.test(hint)) { continue; }
                    const opt = sel.options[sel.selectedIndex];
                    const lbl = ((opt && opt.textContent) || '').trim().toLowerCase();
                    const m = inputs.find(d => d.deviceId === sel.value)
                        || (lbl ? inputs.find(d => d.label && d.label.toLowerCase() === lbl) : null)
                        || (lbl ? inputs.find(d => {
                            const dl = d.label.toLowerCase();
                            return dl && (dl.includes(lbl) || lbl.includes(dl));
                        }) : null);
                    if (m) { return m.deviceId; }
                }
            }
        } catch (_) {}
        return window._ichcSelectedVideoId || null;
    }

    function improveConstraints(constraints) {
        const next = Object.assign({}, constraints || {});
        const video = next.video;
        if (!video) { return constraints; }
        // ICHC's own getUserMedia passes its CameraMobile_XXX deviceId, which Firefox
        // can't match — it silently falls back to the default camera (mjpeg). THIS is
        // why cam-up ignored the selected device. If we've resolved the user's chosen
        // camera to a real Firefox deviceId, OVERRIDE ICHC's broken id with it. We use
        // { exact } (not ideal) so a co-present resolution constraint can't make Firefox
        // mismatch back to the default; the getUserMedia patch retries without the
        // override if exact ever over-constrains.
        if (typeof video === 'object' && video.deviceId != null) {
            // If ICHC passed a deviceId that matches a real Firefox device, respect it —
            // only override the unmatchable CameraMobile_XXX ids.
            const requested = typeof video.deviceId === 'string'
                ? video.deviceId
                : (video.deviceId.exact || video.deviceId.ideal || '');
            const knownInputs = window._ichcVideoInputs;
            const live = selectedVideoId();
            if (requested && Array.isArray(knownInputs) && knownInputs.some(d => d.deviceId === requested)) {
                // ICHC already asked for a real device — only override if the dropdown
                // resolves to a DIFFERENT real one (so we still honor a fresh switch).
                if (!live || live === requested) { return constraints; }
            }
            if (live) {
                next.video = Object.assign({}, video, { deviceId: { exact: live } });
                console.log('[ichc] override camera deviceId →', live);
                return next;
            }
            return constraints;
        }
        if (video === true) {
            const T = bcastTarget();
            next.video = {
                width: Object.assign({}, T.width),
                height: Object.assign({}, T.height),
                frameRate: Object.assign({}, T.frameRate),
            };
            // Inject the user-selected camera for broadcast-start getUserMedia calls
            const liveTrue = selectedVideoId();
            if (liveTrue) {
                next.video.deviceId = { exact: liveTrue };
                console.log('[ichc] inject camera deviceId →', liveTrue);
            }
            return next;
        }
        if (typeof video !== 'object') { return constraints; }

        const T = bcastTarget();
        next.video = Object.assign({}, video, {
            width: liftConstraint(video.width, T.width),
            height: liftConstraint(video.height, T.height),
            frameRate: liftConstraint(video.frameRate, T.frameRate),
        });
        const liveObj = selectedVideoId();
        if (liveObj) {
            next.video.deviceId = { exact: liveObj };
            console.log('[ichc] inject camera deviceId →', liveObj);
        }
        return next;
    }

    function tuneSender(sender) {
        try {
            const track = sender && sender.track;
            if (!track || track.kind !== 'video') { return; }
            track.contentHint = 'detail';
            if (!sender.getParameters || !sender.setParameters) { return; }
            const T = bcastTarget();
            const params = sender.getParameters() || {};
            params.encodings = params.encodings && params.encodings.length ? params.encodings : [{}];
            params.encodings.forEach(encoding => {
                if (encoding.scaleResolutionDownBy && encoding.scaleResolutionDownBy > 1) {
                    encoding.scaleResolutionDownBy = 1;
                }
                encoding.maxBitrate = Math.max(encoding.maxBitrate || 0, T.bitrate);
                encoding.maxFramerate = Math.max(encoding.maxFramerate || 0, T.frameRate.ideal);
            });
            sender.setParameters(params).catch(() => {});
        } catch (_) {}
    }

    function tunePeer(peer) {
        try { peer.getSenders().forEach(tuneSender); } catch (_) {}
    }

    const mediaDevices = navigator.mediaDevices;
    if (mediaDevices && mediaDevices.getUserMedia && !mediaDevices.getUserMedia.__ichcQualityPatched) {
        const original = mediaDevices.getUserMedia.bind(mediaDevices);
        // Keep the last few captured streams so ichcForceStopBroadcast() can end a
        // broadcast whose audio the site failed to release ("broadcasting audio" desync).
        const stash = s => {
            try { (window.__ichcStreams = window.__ichcStreams || []).push(s); while (window.__ichcStreams.length > 8) { window.__ichcStreams.shift(); } } catch (e) {}
            return s;
        };
        const patched = function(constraints) {
            const improved = improveConstraints(constraints);
            return original(improved).then(stash).catch(err => {
                // Our forced { exact } deviceId (or boosted resolution) over-constrained
                // — e.g. a stale stored camera id. Retry with ICHC's original request so
                // cam-up never fails just because our injection didn't fit.
                if (improved !== constraints) {
                    console.warn('[ichc] getUserMedia failed with injected constraints, retrying original:', err && err.name);
                    return original(constraints).then(stash);
                }
                throw err;
            });
        };
        patched.__ichcQualityPatched = true;
        mediaDevices.getUserMedia = patched;
    }

    // Recovery lever for the site's "broadcasting audio" desync: physically stop every
    // local media track we've captured, ending the lingering audio/video source. This
    // can't repair ICHC's UI state machine, but it stops the actual broadcast media.
    window.ichcForceStopBroadcast = function() {
        let n = 0;
        try {
            (window.__ichcStreams || []).forEach(s => {
                try { s.getTracks().forEach(t => { try { t.stop(); n++; } catch (e) {} }); } catch (e) {}
            });
        } catch (e) {}
        console.log('%c[ichc] force-stopped ' + n + ' local media track(s). If the panel still shows a stale state, close it or refresh the tab.', 'color:#f0a020;font-weight:bold');
        return n;
    };

    // Tells you whether your mic/cam are actually still captured after a "stop" — i.e.
    // whether "broadcasting audio" is real (a live audio track) or just a stale label.
    window.ichcAudioStatus = function() {
        const out = [];
        try {
            (window.__ichcStreams || []).forEach((s, i) => {
                try {
                    s.getTracks().forEach(t => out.push({
                        stream: i, kind: t.kind, label: t.label || '(unnamed)',
                        readyState: t.readyState, enabled: t.enabled, muted: t.muted
                    }));
                } catch (e) {}
            });
        } catch (e) {}
        try { console.table(out); } catch (e) {}
        const liveAudio = out.filter(t => t.kind === 'audio' && t.readyState === 'live');
        if (liveAudio.length) {
            console.log('%c[ichc] ' + liveAudio.length + ' audio track(s) STILL LIVE — your mic is still captured (audio likely still transmitting). Run ichcForceStopBroadcast() to end it.', 'color:#f85149;font-weight:bold');
        } else {
            console.log('%c[ichc] no live audio tracks — your mic is released; "broadcasting audio" is just a stale label.', 'color:#3ba55c;font-weight:bold');
        }
        return out;
    };

    ['getUserMedia', 'webkitGetUserMedia', 'mozGetUserMedia'].forEach(name => {
        const original = navigator[name];
        if (typeof original !== 'function' || original.__ichcQualityPatched) { return; }
        const patched = function(constraints, success, failure) {
            return original.call(navigator, improveConstraints(constraints), success, failure);
        };
        patched.__ichcQualityPatched = true;
        navigator[name] = patched;
    });

    const NativePeer = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    if (!NativePeer || NativePeer.__ichcQualityPatched) { return; }

    ['addTrack', 'addTransceiver', 'addStream', 'setLocalDescription', 'setRemoteDescription', 'createOffer', 'createAnswer'].forEach(method => {
        const original = NativePeer.prototype[method];
        if (typeof original !== 'function' || original.__ichcQualityPatched) { return; }
        NativePeer.prototype[method] = function(...args) {
            const result = original.apply(this, args);
            setTimeout(() => tunePeer(this), 0);
            setTimeout(() => tunePeer(this), 250);
            if (result && typeof result.then === 'function') {
                return result.then(value => {
                    tunePeer(this);
                    return value;
                });
            }
            return result;
        };
        NativePeer.prototype[method].__ichcQualityPatched = true;
    });

    NativePeer.__ichcQualityPatched = true;
})();
        `;
        runInPageContext(source);
        window.setTimeout(() => runInPageContext(source), 1000);
        window.setTimeout(() => runInPageContext(source), 3000);
    }

    function installBroadcastDeviceSwitchFix() {
        // Firefox silently ignores applyConstraints({deviceId}) on a live track, so
        // ICHC's camera dropdown can't switch the physical device. Two earlier fixes
        // both desynced ICHC's broadcast state machine (stuck "broadcasting audio",
        // can't cam back up): (a) swapping a foreign getUserMedia track onto ICHC's
        // senders; (b) auto-clicking ICHC's broadcast toggle to restart. Clean approach:
        // never touch ICHC's tracks or controls. Just RECORD the chosen camera as a real
        // Firefox deviceId in window._ichcSelectedVideoId (persisted to localStorage);
        // improveConstraints in the quality patch OVERRIDES ICHC's unmatchable
        // CameraMobile_XXX id with it on every getUserMedia. So the selection applies on
        // the next capture — automatically on cam-up; to switch mid-broadcast, cam down
        // then back up. ICHC stays fully in control of its tracks and broadcast.
        const source = `
(() => {
    if (window.__ichcDeviceSwitchFix) { return; }
    window.__ichcDeviceSwitchFix = true;

    const LS_KEY = 'ichc_selected_video_id';

    // Pre-load the last-used device so the very first cam-up getUserMedia — which
    // fires before the user touches the dropdown — already requests it via the
    // improveConstraints injection. Uses { ideal } there, so a now-invalid stored id
    // (device unplugged) falls back to the default instead of failing.
    try {
        const saved = localStorage.getItem(LS_KEY);
        if (saved && !window._ichcSelectedVideoId) { window._ichcSelectedVideoId = saved; }
    } catch (_) {}

    // Keep a synchronously-readable cache of real video inputs. The dropdown change
    // handler must resolve label→deviceId BEFORE ICHC's own handler fires its
    // getUserMedia in the same tick — an async enumerateDevices (or the old 300ms
    // debounce) makes the injected camera lag one selection behind, which is exactly
    // the "pick kinect, get the previous camera" symptom.
    window._ichcVideoInputs = window._ichcVideoInputs || [];
    async function _refreshInputs() {
        try {
            const devs = await navigator.mediaDevices.enumerateDevices();
            window._ichcVideoInputs = devs
                .filter(d => d.kind === 'videoinput')
                .map(d => ({ deviceId: d.deviceId, label: d.label || '' }));
        } catch (_) {}
    }
    _refreshInputs();
    try { navigator.mediaDevices.addEventListener('devicechange', _refreshInputs); } catch (_) {}

    // Map ICHC's CameraMobile_XXX id / human label to a real Firefox deviceId. Match
    // by exact id, then exact label, then substring — but NEVER on an empty label:
    // before permission Firefox returns blank labels and 'kinect'.includes('') is
    // true, which would resolve every camera to inputs[0] (a virtual mjpeg/sprout).
    async function _resolveVideoId(deviceId, deviceLabel) {
        let realId = deviceId, matchLabel = '';
        try {
            const devs = await navigator.mediaDevices.enumerateDevices();
            const inputs = devs.filter(d => d.kind === 'videoinput');
            const lbl = (deviceLabel || '').toLowerCase();
            const match = inputs.find(d => d.deviceId === deviceId)
                || (lbl ? inputs.find(d => d.label && d.label.toLowerCase() === lbl) : null)
                || (lbl ? inputs.find(d => {
                    const dl = d.label.toLowerCase();
                    return dl && (dl.includes(lbl) || lbl.includes(dl));
                }) : null)
                || (isNaN(+deviceId) ? null : inputs[+deviceId]);
            if (match) { realId = match.deviceId; matchLabel = match.label || ''; }
        } catch (_) {}
        return { realId, matchLabel };
    }

    // We deliberately do NOT auto-restart the broadcast to apply a live switch.
    // Clicking ICHC's broadcast toggle (stop → go-live) is unreliable and, with
    // overlapping requests from fast dropdown changes, corrupts ICHC into the stuck
    // "broadcasting audio / can't cam up" state. Instead the selected device is just
    // recorded; the improveConstraints override applies it on the next getUserMedia —
    // i.e. the next cam-up. To switch mid-broadcast, cam down then back up.
    let _selectTimer = null;
    async function _selectVideoDevice(deviceId, deviceLabel) {
        const { realId, matchLabel } = await _resolveVideoId(deviceId, deviceLabel);
        const changed = window._ichcSelectedVideoId !== realId;
        window._ichcSelectedVideoId = realId;
        try { localStorage.setItem(LS_KEY, realId); } catch (_) {}
        console.log('[ichc] selected camera', matchLabel || realId,
            changed ? '(new — cam down/up to apply)' : '(unchanged)');
    }
    function _selectDebounced(deviceId, deviceLabel) {
        clearTimeout(_selectTimer);
        _selectTimer = setTimeout(() => {
            _selectVideoDevice(deviceId, deviceLabel).catch(() => {});
        }, 300);
    }

    // Synchronous resolve from the cached input list — runs in the capture-phase
    // change handler so _ichcSelectedVideoId is already correct when ICHC's own
    // handler calls getUserMedia in the same tick. Returns false if the cache
    // couldn't resolve it (then the async path is the fallback).
    function _selectSync(deviceId, deviceLabel) {
        const lbl = (deviceLabel || '').toLowerCase();
        const inputs = window._ichcVideoInputs || [];
        const match = inputs.find(d => d.deviceId === deviceId)
            || (lbl ? inputs.find(d => d.label && d.label.toLowerCase() === lbl) : null)
            || (lbl ? inputs.find(d => {
                const dl = d.label.toLowerCase();
                return dl && (dl.includes(lbl) || lbl.includes(dl));
            }) : null)
            || (isNaN(+deviceId) ? null : inputs[+deviceId]);
        if (!match) { return false; }
        window._ichcSelectedVideoId = match.deviceId;
        try { localStorage.setItem(LS_KEY, match.deviceId); } catch (_) {}
        console.log('[ichc] selected camera', match.label || match.deviceId, '(applies on next cam-up)');
        return true;
    }

    // Watch the broadcaster panel: record the dropdown's selected video device (on
    // open and on change) so the improveConstraints override applies it on the next
    // getUserMedia. No broadcast manipulation here.
    function _attachPanelListener(panel) {
        if (!panel || panel.dataset.ichcDsw) { return; }
        panel.dataset.ichcDsw = '1';

        // On open, only record the dropdown default if nothing is saved yet. The panel
        // resets its dropdown to option 1 regardless of what we injected, so recording
        // it unconditionally STOMPS the saved selection — dropdown then disagrees with
        // the live preview and the next cam-up flips back to mjpeg.
        const _readSelected = () => {
            if (window._ichcSelectedVideoId) { return; }
            try {
                panel.querySelectorAll('select').forEach(sel => {
                    const opt = sel.options[sel.selectedIndex];
                    if (!opt || !sel.value) { return; }
                    const hint = (sel.id + ' ' + sel.name).toLowerCase();
                    if (/audio|mic|sound/i.test(hint)) { return; } // video only
                    _selectDebounced(sel.value, opt.textContent.trim());
                });
            } catch (_) {}
        };
        setTimeout(_readSelected, 800);
        setTimeout(_readSelected, 2500);
        _refreshInputs(); // labels populate once permission is granted

        panel.addEventListener('change', e => {
            const sel = e.target;
            if (sel.tagName !== 'SELECT' || !sel.value) { return; }
            const hint = (sel.id + ' ' + sel.name + ' ' +
                (sel.labels && sel.labels[0] ? sel.labels[0].textContent : '')).toLowerCase();
            if (/audio|mic|sound/i.test(hint)) { return; } // video only
            const opt = sel.options[sel.selectedIndex];
            const optLabel = opt ? opt.textContent.trim() : '';
            console.log('[ichc] camera dropdown changed →', optLabel);
            // Resolve synchronously so ICHC's same-tick getUserMedia already sees the
            // new selection; fall back to the async resolver only if the cache missed.
            if (!_selectSync(sel.value, optLabel)) {
                _selectDebounced(sel.value, optLabel);
            } else {
                _refreshInputs();
            }
        }, true); // capture so we read the value before the site's handler
    }

    _attachPanelListener(document.getElementById('rtc-broadcaster'));
    const _mo = new MutationObserver(() => {
        _attachPanelListener(document.getElementById('rtc-broadcaster'));
    });
    _mo.observe(document.body, { childList: true, subtree: true });
})();
        `;
        runInPageContext(source);
        window.setTimeout(() => runInPageContext(source), 2000);
    }
    function invokeNativeElementAction(element) {
        if (!element || !element.isConnected) { return; }

        const bridgeToken = `ichc-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        element.setAttribute('data-ichc-bridge', bridgeToken);

        const selector = `[data-ichc-bridge="${bridgeToken}"]`;

        runInPageContext(`
(() => {
            const el = document.querySelector(${JSON.stringify(selector)});
            if (!el) { return; }
            el.removeAttribute('data-ichc-bridge');

            const nativeHref = el.getAttribute('href') || '';
            const nativeOnclick = el.getAttribute('onclick') || '';
            if (/^\\s*javascript:/i.test(nativeHref)) {
                const js = nativeHref.replace(/^\\s*javascript:\\s*/i, '');
                try { Function(js).call(el); } catch (_) {
                    try { (0, eval)(js); } catch (_) {}
                }
                return;
            }

            if (nativeOnclick) {
                try { Function(nativeOnclick).call(el); } catch (_) {}
                return;
            }

            try {
                if (typeof el.click === 'function') { el.click(); }
            } catch (_) {}
})();
        `);

        // The main-world call removes the marker after it finds the element. This
        // timeout only cleans up if extension messaging/injection fails. Removing it
        // synchronously here races the service worker and makes every bridged click a
        // silent no-op.
        window.setTimeout(() => {
            if (element.getAttribute('data-ichc-bridge') === bridgeToken) {
                element.removeAttribute('data-ichc-bridge');
            }
        }, 3000);
    }

    function loadPrefs() {
        try {
            return { ...DEFAULT_PREFS, ...(JSON.parse(localStorage.getItem(PREF_KEY) || '{}')) };
        } catch (_) {
            return { ...DEFAULT_PREFS };
        }
    }


    function applyPrefs(nextPrefs = loadPrefs()) {
        const prefs = {
            ...DEFAULT_PREFS,
            ...nextPrefs,
            chatSide: 'right',
            chatWidth: 430,
        };
        // Use cached layout from last session as the base — updateCamDensity() will
        // refine these once the DOM is measured, but this prevents the initial jump.
        let cachedLayout = null;
        try { cachedLayout = JSON.parse(localStorage.getItem(CAM_LAYOUT_CACHE_KEY) || 'null'); } catch (_) {}
        const camMin = cachedLayout?.camMin || DEFAULT_PREFS.camMin;
        const camCols = cachedLayout?.columns || 1;
        document.documentElement.style.setProperty('--ichc-cam-min', `${camMin}px`);
        document.documentElement.style.setProperty('--ichc-cam-columns', String(camCols));
        if (cachedLayout?.aspect) {
            document.documentElement.style.setProperty('--ichc-cam-aspect', cachedLayout.aspect);
        }
        const storedSideWidth = cachedLayout?.sideWidth || loadStoredSideWidth();
        if (storedSideWidth) {
            document.documentElement.style.setProperty('--ichc-stage-side-width', `${storedSideWidth}px`);
            // CSS now sizes #ichc-chat-shell via --ichc-chat-width + --ichc-userlist-width
            const _ulW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ichc-userlist-width')) || 200;
            document.documentElement.style.setProperty('--ichc-chat-width', `${Math.max(280, storedSideWidth - _ulW)}px`);
        } else {
            document.documentElement.style.setProperty('--ichc-chat-width', `${prefs.chatWidth}px`);
        }

        const stage = document.getElementById('ichc-room-stage');
        if (stage) { stage.classList.remove('ichc-chat-left'); }

        return prefs;
    }

    function getFirstNode(a, b) {
        if (!a?.isConnected) { return b || null; }
        if (!b?.isConnected) { return a || null; }
        return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? a : b;
    }

    function getCommonAncestor(nodes) {
        if (!nodes.length) { return null; }
        const paths = nodes.map(node => {
            const path = [];
            let current = node;
            while (current) {
                path.push(current);
                current = current.parentElement;
            }
            return path;
        });

        return paths[0].find(candidate => paths.every(path => path.includes(candidate))) || null;
    }

    function collapseEmptyShells(nodes) {
        nodes.forEach(node => {
            let current = node;
            for (let depth = 0; current && depth < 2; depth += 1) {
                if (current.id === 'aspnetForm' || current.id === 'ichc-room-stage' || current === document.body) {
                    break;
                }
                if (current.children.length === 0) {
                    current.classList.add('ichc-layout-ghost');
                    current = current.parentElement;
                    continue;
                }
                break;
            }
        });
    }

    function flattenLegacyShells(nodes) {
        nodes.forEach(node => {
            let current = node;
            for (let depth = 0; current && depth < 5; depth += 1) {
                if (!current || current === document.body || current.id === 'aspnetForm' ||
                    current.id === 'ichc-room-stage' || /panelHeader$/i.test(current.id || '') ||
                    /panelFooter$/i.test(current.id || '')) {
                    break;
                }

                current.classList.add('ichc-legacy-shell');
                current.style.setProperty('height', 'auto', 'important');
                current.style.setProperty('min-height', '0', 'important');
                current.style.setProperty('border', '0', 'important');
                current.style.setProperty('box-shadow', 'none', 'important');
                current.style.setProperty('background', 'transparent', 'important');
                current.style.setProperty('overflow', 'visible', 'important');
                current.style.setProperty('padding', '0', 'important');
                current.style.setProperty('margin', '0', 'important');
                current = current.parentElement;
            }
        });
    }

    function retireDetachedShell(startNode, protectedNodes = []) {
        const protectedSet = new Set(protectedNodes.filter(Boolean));
        let current = startNode;

        for (let depth = 0; current && depth < 5; depth += 1) {
            if (!current || current === document.body || current.id === 'aspnetForm') {
                break;
            }

            if ([...protectedSet].some(node => current === node || current.contains(node))) {
                break;
            }

            current.classList.add('ichc-retired-shell');
            current = current.parentElement;
        }
    }

    function resetRoomShell(stage) {
        const header = document.getElementById('header');
        const cams = document.getElementById('cams');
        const chatContainer = document.getElementById('chat_container');
        const shell = getCommonAncestor([header, cams, chatContainer, stage].filter(Boolean));
        if (!shell || shell === document.body || shell.id === 'aspnetForm' || shell.id === 'ctl00_panelHeader') {
            return;
        }

        let current = shell;
        for (let depth = 0; current && depth < 4; depth += 1) {
            if (!current || current === document.body || current.id === 'aspnetForm' ||
                /panelHeader$/i.test(current.id || '') || /panelFooter$/i.test(current.id || '')) {
                break;
            }

            current.classList.add('ichc-room-shell-reset');
            current.style.setProperty('border', '0', 'important');
            current.style.setProperty('outline', '0', 'important');
            current.style.setProperty('box-shadow', 'none', 'important');
            current.style.setProperty('background', 'transparent', 'important');
            current.style.setProperty('min-height', '0', 'important');
            current.style.setProperty('height', 'auto', 'important');
            current.style.setProperty('overflow', 'visible', 'important');
            current.style.setProperty('padding', '0', 'important');
            current.style.setProperty('margin', '0 auto', 'important');
            current = current.parentElement;
        }
    }

    function ensureFooterBar() {
        let bar = document.getElementById('ichc-footer-bar');
        const camsCol = document.getElementById('ichc-cams-col');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'ichc-footer-bar';

            // Left — holds the theme toggle button (placed later by transformCommandBar)
            const left = document.createElement('div');
            left.id = 'ichc-footer-left';
            bar.appendChild(left);

            // Center — copyright only, no links
            const copy = document.createElement('div');
            copy.id = 'ichc-footer-copy';
            copy.textContent = `© ${new Date().getFullYear()} icanhazchat.com`;
            bar.appendChild(copy);

            // Right — links, cloud toggle, More button (submenu appended by collectRoomLinks)
            const right = document.createElement('div');
            right.id = 'ichc-footer-right';

            const linksSpan = document.createElement('span');
            linksSpan.id = 'ichc-footer-links';
            linksSpan.innerHTML = [
                ['Help',        'https://www.icanhazchat.com/Help'],
                ['Get Hearted', 'https://www.icanhazchat.com/GetHearted'],
                ['Credits',     'https://www.icanhazchat.com/credits'],
                ['Contact',     'https://www.icanhazchat.com/contact'],
            ].map(([label, href]) =>
                `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
            ).join(' · ');
            right.appendChild(linksSpan);


            bar.appendChild(right);
        }
        if (camsCol && bar.parentElement !== camsCol) {
            camsCol.appendChild(bar);
        }
        return bar;
    }

    function isRoomRulesLink(link) {
        const text = normalizeText(link?.textContent || '');
        const href = (link?.getAttribute?.('href') || '').toLowerCase();
        return /room\s+rules?|rules/.test(text) || /roomrules|room-rules|rules/.test(href);
    }

    function placeRoomRulesInFooter(sourceLink) {
        const linksSpan = document.getElementById('ichc-footer-links');
        if (!linksSpan || !sourceLink) { return; }
        let rulesLink = document.getElementById('ichc-footer-room-rules');
        if (!rulesLink) {
            rulesLink = document.createElement('a');
            rulesLink.id = 'ichc-footer-room-rules';
            rulesLink.target = '_blank';
            rulesLink.rel = 'noopener noreferrer';
            rulesLink.textContent = sourceLink.textContent.trim() || 'Room Rules';
            linksSpan.appendChild(document.createTextNode(' \u00b7 '));
            linksSpan.appendChild(rulesLink);
        }
        rulesLink.href = sourceLink.href || sourceLink.getAttribute('href') || '#';
        rulesLink.textContent = sourceLink.textContent.trim() || 'Room Rules';
    }
    function collectRoomLinks(stage, _retries = 0) {
        if (!stage) { return; }

        const footerBar = ensureFooterBar();

        // Build submenu wrapper once
        let submenu = document.getElementById('ichc-room-submenu');
        if (!submenu) {
            submenu = document.createElement('div');
            submenu.id = 'ichc-room-submenu';
            submenu.className = 'ichc-room-submenu';

            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.id = 'ichc-room-submenu-btn';
            toggleBtn.className = 'ichc-room-submenu-btn';
            toggleBtn.title = 'Room options';
            toggleBtn.innerHTML = ICONS.dotsAnimated;

            const panel = document.createElement('div');
            panel.id = 'ichc-room-links';
            panel.className = 'ichc-room-links-panel';

            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                submenu.classList.toggle('ichc-submenu-open');
            });
            document.addEventListener('click', () => {
                submenu.classList.remove('ichc-submenu-open');
            });

            // Hard-coded site links section — always present
            const siteLinksDiv = document.createElement('div');
            siteLinksDiv.className = 'ichc-room-site-links';
            const SITE_LINKS = [
                ['Support', '/GetHearted'],
                ['Status', 'http://www.imssr.com/#/view/www.icanhazchat.com'],
                ['Directory', '/lobby'],
                ['FAQ', '/FAQ'],
                ['Safety', '/Safety'],
                ['Store', '/Store'],
                ['Developers', '/icanhazcode'],
                ['Terms', '/TermsOfService'],
                ['Privacy', '/PrivacyPolicy'],
            ];
            SITE_LINKS.forEach(([label, href]) => {
                const a = document.createElement('a');
                a.href = href;
                a.textContent = label;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                siteLinksDiv.appendChild(a);
            });

            submenu.appendChild(toggleBtn);
            submenu.appendChild(panel);
            panel.appendChild(siteLinksDiv);
        }

        // More button lives in the right section of the footer bar
        const footerRight = document.getElementById('ichc-footer-right') || footerBar;
        if (!footerRight.contains(submenu)) {
            footerRight.appendChild(submenu);
        }

        const panel = document.getElementById('ichc-room-links');
        const siteLinksDiv = panel.querySelector('.ichc-room-site-links');
        const linkNodes = [...document.querySelectorAll('.room_footer_links')]
            .filter(link => !panel.contains(link));
        const roomRulesLink = linkNodes.find(isRoomRulesLink);
        if (roomRulesLink) { placeRoomRulesInFooter(roomRulesLink); }
        const menuLinkNodes = linkNodes.filter(link => link !== roomRulesLink);

        if (!menuLinkNodes.length) {
            if (_retries < 4) {
                setTimeout(() => collectRoomLinks(stage, _retries + 1), 700);
            }
            return;
        }

        const originNodes = new Set();
        menuLinkNodes.forEach(link => {
            const holder = link.closest('td, div, span') || link.parentElement;
            if (holder) { originNodes.add(holder); }
            // Insert room links before the site links section
            panel.insertBefore(link, siteLinksDiv);
        });

        flattenLegacyShells(originNodes);
        collapseEmptyShells(originNodes);
    }


    function installRoomRoot(stage) {
        const header = document.getElementById('header');
        const pageHeader = document.getElementById('ctl00_panelHeader') ||
            document.querySelector('[id$="panelHeader"]');
        if (!header || !stage || !pageHeader) { return; }

        const previousParents = new Set([
            header.parentElement,
            stage.parentElement,
        ].filter(Boolean));

        let root = document.getElementById('ichc-room-root');
        if (!root) {
            root = document.createElement('section');
            root.id = 'ichc-room-root';
            pageHeader.insertAdjacentElement('afterend', root);
        }
        previousParents.delete(root);

        if (!root.contains(header)) { root.appendChild(header); }
        if (!root.contains(stage)) { root.appendChild(stage); }

        flattenLegacyShells(previousParents);
        collapseEmptyShells(previousParents);
        retireDetachedShell([...previousParents][0], [
            root,
            pageHeader,
            document.getElementById('ctl00_panelFooter'),
        ]);
    }

    function installUnifiedHeader() {
        const pageHeader = document.getElementById('ctl00_panelHeader') ||
            document.querySelector('[id$="panelHeader"]');
        const roomHeader = document.getElementById('header');
        const topic = document.getElementById('topic');
        const camControl = document.getElementById('camControl');
        const leaveControl = document.getElementById('signout');
        const userLinks = pageHeader?.querySelector('.page_header_userlinks');
        const logoBlock = pageHeader?.querySelector('.page_header_logo') ||
            document.getElementById('ichc-logo-header');

        if (!pageHeader || !roomHeader || !topic || !camControl || !leaveControl) {
            return;
        }

        let topbar = document.getElementById('ichc-topbar');
        if (!topbar) {
            topbar = document.createElement('header');
            topbar.id = 'ichc-topbar';
            topbar.innerHTML = `
                <div id="ichc-header-brand"></div>
                <div id="ichc-header-room"></div>
                <div id="ichc-header-leave"></div>
                <div id="ichc-header-topic"></div>
                <div id="ichc-header-actions">
                    <div id="ichc-header-userinfo"></div>
                    <div id="ichc-primary-actions"></div>
                </div>
            `;
        }
        const root = document.getElementById('ichc-room-root');
        // Topbar lives at the top of the cams column so it spans only the cams width
        // and ends at the chat's left edge — the chat/userlist then run full height,
        // with the user/GO-LIVE/cog actions sitting at the topbar's right end (just
        // left of the chat). Fall back to room-root until the cams column exists.
        const camsColForBar = document.getElementById('ichc-cams-col');
        if (camsColForBar) {
            if (camsColForBar.firstElementChild !== topbar) {
                camsColForBar.insertBefore(topbar, camsColForBar.firstChild);
            }
        } else if (root && root.firstElementChild !== topbar) {
            root.prepend(topbar);
        }

        const brand = document.getElementById('ichc-header-brand');
        const topicSlot = document.getElementById('ichc-header-topic');
        const actions = document.getElementById('ichc-header-actions');
        const primaryActions = document.getElementById('ichc-primary-actions');
        const userInfoSlot = document.getElementById('ichc-header-userinfo');
        const roomSlot  = document.getElementById('ichc-header-room');
        const leaveSlot = document.getElementById('ichc-header-leave');
        if (!brand || !topicSlot || !actions || !primaryActions) { return; }

        if (logoBlock && !brand.contains(logoBlock)) { brand.replaceChildren(logoBlock); }
        if (!topicSlot.contains(topic)) { topicSlot.replaceChildren(topic); }

        // Room name box — populate once (pathname like /roomname)
        if (roomSlot && !roomSlot.dataset.ichcRoomDone) {
            const rawRoom = window.location.pathname.replace(/^\/+/, '').split('/')[0];
            if (rawRoom) {
                const slashEl = document.createElement('span');
                slashEl.className = 'ichc-room-slash';
                slashEl.textContent = '/';
                const nameEl = document.createElement('span');
                nameEl.className = 'ichc-room-name-text';
                nameEl.textContent = rawRoom;
                roomSlot.replaceChildren(slashEl, nameEl);
                for (const el of [document.getElementById('chat_container'), document.body]) {
                    if (!el) { continue; }
                    const bg = el.style.backgroundColor;
                    if (bg && bg !== 'transparent' && bg !== '') { roomSlot.style.setProperty('--ichc-room-accent', bg); break; }
                    const bgImg = el.style.backgroundImage;
                    if (bgImg && bgImg !== 'none' && bgImg !== '') { roomSlot.style.setProperty('--ichc-room-bg-img', bgImg); break; }
                }
                roomSlot.dataset.ichcRoomDone = '1';
            }
        }

        // Populate user info — structured: greeting | username (large) + karma (small).
        // Re-attempt on every call until we get non-trivial text (handles late-loading).
        const NAV_LINK_RE = /^(sign\s?out|sign\s?in|log\s?out|log\s?in|messages?|groups?|post(\s+\w+)?|help|faq|support|store|terms?|privacy|credits?|contact|developers?|directory|safety|status|settings?|emotimemes?|text.?only|dashboard|home|profile|account|report)$/i;
        // Re-run until the structured ident element exists (handles late-loading userlinks).
        if (userInfoSlot && userLinks && !userInfoSlot.querySelector('#ichc-userinfo-ident')) {
            const clone = userLinks.cloneNode(true);
            const allLinks = [...clone.querySelectorAll('a')];
            const usernameLink = allLinks.find(a => !NAV_LINK_RE.test(a.textContent.trim()));

            if (usernameLink) {
                const username = usernameLink.textContent.trim();

                // Collect text nodes before the username link → greeting
                let greeting = '';
                let node = usernameLink.previousSibling;
                while (node) {
                    if (node.nodeType === Node.TEXT_NODE) { greeting = node.textContent + greeting; }
                    node = node.previousSibling;
                }
                greeting = greeting
                    .replace(/\bhello[,\s]+|omg\s+it'?s\s+|greetings[,\s]+|welcome[,\s]+/gi, '')
                    .replace(/[|·\-•,]+/g, '').trim();

                // Extract karma: prefer the site's explicit <span title="karma">N</span>,
                // fall back to regex scan for "N karma" or "N posts" in the full text.
                let karmaText = '';
                const karmaSpan = clone.querySelector('[title="karma"], [title*="karma"]');
                if (karmaSpan) {
                    const raw = karmaSpan.textContent.trim().replace(/,/g, '');
                    const num = parseInt(raw, 10);
                    if (!isNaN(num)) { karmaText = num.toLocaleString(); }
                }
                if (!karmaText) {
                    const fullLinksText = clone.textContent;
                    const numMatch = fullLinksText.match(/(\d[\d,]+)\s*karma/i) ||
                                     fullLinksText.match(/\[?\s*(\d[\d,]*)\s*\]?\s*posts?/i);
                    if (numMatch) {
                        const num = parseInt(numMatch[1].replace(/,/g, ''), 10);
                        if (!isNaN(num)) { karmaText = num.toLocaleString(); }
                    }
                }

                // Build structured DOM
                userInfoSlot.innerHTML = '';
                if (greeting) {
                    const greetEl = document.createElement('span');
                    greetEl.id = 'ichc-userinfo-greeting';
                    greetEl.textContent = greeting;
                    userInfoSlot.appendChild(greetEl);
                }
                const identEl = document.createElement('span');
                identEl.id = 'ichc-userinfo-ident';
                const nameEl = document.createElement('span');
                nameEl.id = 'ichc-userinfo-username';
                nameEl.textContent = username;
                identEl.appendChild(nameEl);
                if (karmaText) {
                    const karmaEl = document.createElement('span');
                    karmaEl.id = 'ichc-userinfo-karma';
                    karmaEl.textContent = karmaText;

                    const karmaNum = parseInt(karmaText.replace(/,/g, ''), 10);
                    // Tint the header to match the userlist tier color: set the same
                    // --ichc-kt-color / --ichc-kt-i vars (and ichc-ktN class) the rows use
                    // on the IDENT container, so both the username and karma number can read
                    // them (custom props inherit) and the block can carry a subtle accent.
                    if (!isNaN(karmaNum)) { _setKarmaTierClass(identEl, karmaNum); }
                    const lsKey = 'ichc_karma_seen_' + username.toLowerCase();
                    let deltaEl = null;
                    try {
                        const stored = localStorage.getItem(lsKey);
                        if (stored !== null && !isNaN(karmaNum)) {
                            const delta = karmaNum - parseInt(stored, 10);
                            if (!isNaN(delta) && delta !== 0) {
                                deltaEl = document.createElement('span');
                                deltaEl.id = 'ichc-karma-delta';
                                deltaEl.className = delta > 0 ? 'ichc-karma-delta-up' : 'ichc-karma-delta-down';
                                deltaEl.textContent = (delta > 0 ? '+' : '') + delta.toLocaleString();
                            }
                        }
                        if (!isNaN(karmaNum)) { localStorage.setItem(lsKey, String(karmaNum)); }
                    } catch (_) {}

                    const karmaRow = document.createElement('span');
                    karmaRow.id = 'ichc-karma-row';
                    if (deltaEl) { karmaRow.appendChild(deltaEl); }
                    karmaRow.appendChild(karmaEl);
                    identEl.appendChild(karmaRow);
                }
                userInfoSlot.appendChild(identEl);
                userInfoSlot.dataset.ichcPopulated = '1';
            } else {
                // Username link not found yet (userlinks not loaded) — leave slot empty, retry next call.
            }
        }

        const primaryLinks = [];

        // Rolodex broadcast toggle — restyles a.ichc-broadcast-btn as a 3D prism that
        // spins on click and idle-fidgets. Reads the site's own .ichc-live class for state
        // (the publish handler still drives the actual broadcast). Build is idempotent.
        function ichcBuildRolodex(btn) {
            if (btn.querySelector('.ichc-rolo')) { return; }    // build once
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
            let rot = 0;
            // Pointer-tracked peek flag. A re-render on a state flip (go live / cam
            // auto-restart) can drop the pointerleave so the flag alone gets stuck true;
            // btn.matches(':hover') can independently get stuck stale-true. The peek is
            // only "real" when BOTH agree — so a stuck either-one still clears the tilt.
            let peeking = false;
            const live = () => btn.classList.contains('ichc-live');
            const reallyHover = () => {
                try { return peeking && btn.matches(':hover'); } catch (_) { return peeking; }
            };
            const rnd  = () => (Math.random() < 0.5 ? -1 : 1);
            const apply = (ms, ease) => {
                prism.style.transition = 'transform ' + ms + 'ms ' + ease;
                prism.style.transform  = 'rotateX(' + rot + 'deg)';
            };
            const clearTilt = () => { if (tilt.style.transform) { tilt.style.transform = ''; } };

            // Peek from top OR bottom at random, each hover
            btn.addEventListener('pointerenter', () => {
                peeking = true;
                const d = rnd();
                tilt.style.transform = 'rotateX(' + (22 * d) + 'deg) translateY(' + (-d) + 'px)';
            });
            const endPeek = () => { peeking = false; clearTilt(); };
            btn.addEventListener('pointerleave', endPeek);
            btn.addEventListener('pointercancel', endPeek);
            btn.addEventListener('blur', endPeek);
            // The prism settles after its transition — if the pointer isn't genuinely on
            // the button anymore, make sure no foreshortening tilt lingers.
            tilt.addEventListener('transitionend', () => { if (!reallyHover()) { clearTilt(); } });

            // The prism follows the REAL broadcast state (.ichc-live), never the click.
            // Clicking Go Live only opens the camera/mic picker — broadcasting starts
            // (and .ichc-live lands) only after you confirm. Spinning optimistically on
            // click left the button stuck on STOP if you cancelled/clicked out. So the
            // satisfying 1¼-turn roll happens here, when state actually flips.
            // Faces alternate GO (even ×90°) / STOP (odd ×90°).
            let wasLive = live();
            const faceMatchesState = () =>
                (Math.abs(Math.round(rot / 90)) % 2 === 1) === live(); // odd step == STOP
            // Align the resting face with the current state at build time (e.g. page
            // loaded while already broadcasting) — no animation, just snap.
            if (!faceMatchesState()) { rot += 90; apply(0, 'linear'); }
            const liveStateObserver = new MutationObserver(() => {
                peeking = false;
                clearTilt();
                const nowLive = live();
                if (nowLive !== wasLive) {
                    // Real state change: roll 1¼ turns, correcting parity so it lands on
                    // the face for the new state.
                    const dir = rnd();
                    rot += 450 * dir;
                    if (!faceMatchesState()) { rot += 90 * dir; }
                    apply(950, 'cubic-bezier(.5,.04,.18,1)');
                    wasLive = nowLive;
                } else if (!faceMatchesState()) {
                    // No state change but the face drifted out of sync (re-render) —
                    // snap a clean quarter-turn back onto the correct face.
                    rot += 90 * rnd();
                    apply(600, 'cubic-bezier(.4,.12,.22,1)');
                }
            });
            liveStateObserver.observe(btn, { attributes: true, attributeFilter: ['class'] });

            // Click only drops a pending peek so it doesn't stick post-toggle; the spin
            // is driven by the .ichc-live observer above.
            btn.addEventListener('click', clearTilt, true);

            // Watchdog + idle fidget. Always unstick a stray tilt when not genuinely
            // hovered (covers the stuck-:hover/stuck-flag case that left STOP LIVE
            // foreshortened). When NOT live and idle, roll ±180° to the 2nd GO face.
            // Skipped under prefers-reduced-motion.
            if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const idleTimer = window.setInterval(() => {
                    if (!btn.isConnected) {
                        window.clearInterval(idleTimer);
                        liveStateObserver.disconnect();
                        return;
                    }
                    if (!reallyHover()) { clearTilt(); }
                    if (live() || reallyHover()) { return; }
                    rot += 180 * rnd();
                    apply(1200, 'cubic-bezier(.4,.12,.22,1)');
                }, 5000);
            }
        }

        // Find broadcast button: may already be in primaryActions (moved on a previous call)
        // or still in camControl (first call). Look for broadcast/live URL; fall back to first link.
        const broadcastBtn = primaryActions.querySelector('a.ichc-broadcast-btn') ||
            [...camControl.querySelectorAll('a')].find(a =>
                /broadcast|live|cam|stream/i.test(a.href || '') ||
                /go.?live|start.?broadcast|stop.?broadcast/i.test(a.textContent.trim())
            ) ||
            [...camControl.querySelectorAll('a')][0];
        if (broadcastBtn) {
            broadcastBtn.classList.add('ichc-broadcast-btn');
            ichcBuildRolodex(broadcastBtn);
            primaryLinks.push(broadcastBtn);
        }

        // Find leave button: may already be in leaveSlot/primaryActions or still in signout element.
        const leaveBtn = leaveSlot?.querySelector('a.ichc-leave-btn') ||
            primaryActions.querySelector('a.ichc-leave-btn') ||
            [...leaveControl.querySelectorAll('a')][0];
        if (leaveBtn && leaveSlot) {
            if (!leaveBtn.classList.contains('ichc-leave-btn')) {
                leaveBtn.innerHTML = ICONS.leave;
                leaveBtn.classList.add('ichc-leave-btn');
            }
            if (!leaveSlot.contains(leaveBtn)) { leaveSlot.appendChild(leaveBtn); }
        }

        primaryActions.replaceChildren(...primaryLinks);

        // Hide the source containers — their extracted buttons now live in primaryActions.
        // Any remaining anchors (Post, Dashboard, etc.) must not be visible.
        camControl.style.setProperty('display', 'none', 'important');
        leaveControl.style.setProperty('display', 'none', 'important');
        // Build hamburger nav — move the actual link elements so their badge
        // counts (new messages, etc.) remain live-updated by the site's own JS.
        let hamburgerWrapper = document.getElementById('ichc-nav-hamburger-wrapper');
        let hamburgerMenu = hamburgerWrapper?.querySelector('#ichc-nav-hamburger-menu');
        if (!hamburgerWrapper) {
            hamburgerWrapper = document.createElement('div');
            hamburgerWrapper.id = 'ichc-nav-hamburger-wrapper';

            const hamburgerBtn = document.createElement('button');
            hamburgerBtn.type = 'button';
            hamburgerBtn.id = 'ichc-nav-hamburger-btn';
            hamburgerBtn.title = 'Navigation';
            hamburgerBtn.innerHTML = ICONS.linesAnimated;

            hamburgerMenu = document.createElement('div');
            hamburgerMenu.id = 'ichc-nav-hamburger-menu';
            hamburgerMenu.hidden = true;

            // Mirror the more button: watch the menu's hidden attribute rather than
            // toggling a class at each call site, so the open state stays in sync
            // however the menu gets closed (button, outside click, anything later).
            new MutationObserver(() => {
                hamburgerBtn.classList.toggle('ichc-nav-open', !hamburgerMenu.hidden);
            }).observe(hamburgerMenu, { attributeFilter: ['hidden'] });

            hamburgerBtn.addEventListener('click', e => {
                e.stopPropagation();
                hamburgerMenu.hidden = !hamburgerMenu.hidden;
            });
            document.addEventListener('click', e => {
                if (!hamburgerWrapper.contains(e.target)) { hamburgerMenu.hidden = true; }
            });

            hamburgerWrapper.appendChild(hamburgerBtn);
            hamburgerWrapper.appendChild(hamburgerMenu);
        }
        // Populate / update menu links on every call — move the real <a> elements
        // so the site's own JS keeps badge counters (new messages etc.) live.
        if (hamburgerMenu && userLinks) {
            const links = [...userLinks.querySelectorAll('a')];
            links.forEach(link => {
                if (hamburgerMenu.contains(link)) { return; } // already moved
                link.classList.add('ichc-nav-item');
                hamburgerMenu.appendChild(link);
            });
        }
        if (!topbar.contains(hamburgerWrapper)) { topbar.prepend(hamburgerWrapper); }

        pageHeader.classList.add('ichc-source-header');
        roomHeader.classList.add('ichc-merged-header');
    }

    function installStageLayout() {
        const cams = document.getElementById('cams');
        const chatContainer = document.getElementById('chat_container');
        if (!cams || !chatContainer) { return; }

        let stage = document.getElementById('ichc-room-stage');
        let panel = document.getElementById('ichc-cams-panel');
        let divider = document.getElementById('ichc-stage-divider');
        let chatShell = document.getElementById('ichc-chat-shell');
        let userPanel = document.getElementById('ichc-userlist');

        if (!stage) {
            const previousParents = new Set([cams.parentElement, chatContainer.parentElement].filter(Boolean));
            const oldCamParent = cams.parentElement;
            const anchor = getFirstNode(cams, chatContainer);

            stage = document.createElement('section');
            stage.id = 'ichc-room-stage';
            panel = document.createElement('section');
            panel.id = 'ichc-cams-panel';
            divider = document.createElement('div');
            divider.id = 'ichc-stage-divider';
            divider.setAttribute('role', 'separator');
            divider.setAttribute('aria-orientation', 'vertical');
            chatShell = document.createElement('section');
            chatShell.id = 'ichc-chat-shell';

            // Wrap cams panel in a column container so footer goes under cams only
            const camsCol = document.createElement('div');
            camsCol.id = 'ichc-cams-col';

            anchor?.parentNode?.insertBefore(stage, anchor);
            stage.appendChild(camsCol);
            camsCol.appendChild(panel);
            panel.appendChild(cams);
            stage.appendChild(divider);
            stage.appendChild(chatShell);
            chatShell.appendChild(chatContainer);
            flattenLegacyShells(previousParents);
            collapseEmptyShells(previousParents);
            retireDetachedShell(oldCamParent, [
                stage,
                chatContainer,
                document.getElementById('header'),
                document.getElementById('ctl00_panelHeader'),
                document.getElementById('ctl00_panelFooter'),
            ]);
        } else {
            let camsCol = document.getElementById('ichc-cams-col');
            if (!camsCol) {
                camsCol = document.createElement('div');
                camsCol.id = 'ichc-cams-col';
                stage.insertBefore(camsCol, stage.firstChild);
            }
            if (!panel) {
                panel = document.createElement('section');
                panel.id = 'ichc-cams-panel';
                camsCol.insertBefore(panel, camsCol.firstChild);
            } else if (panel.parentElement !== camsCol) {
                camsCol.insertBefore(panel, camsCol.firstChild);
            }
            if (!divider) {
                divider = document.createElement('div');
                divider.id = 'ichc-stage-divider';
                divider.setAttribute('role', 'separator');
                divider.setAttribute('aria-orientation', 'vertical');
            }
            if (!chatShell) {
                chatShell = document.createElement('section');
                chatShell.id = 'ichc-chat-shell';
                stage.appendChild(chatShell);
            }
            document.getElementById('ichc-layout-toolbar')?.remove();
            if (!panel.contains(cams)) { panel.appendChild(cams); }
            if (divider.parentElement !== stage) { stage.insertBefore(divider, chatShell); }
            if (!chatShell.contains(chatContainer)) { chatShell.prepend(chatContainer); }
        }

        if (!userPanel) {
            userPanel = document.createElement('aside');
            userPanel.id = 'ichc-userlist';
            userPanel.style.position = 'relative';
        }
        if (chatShell && !chatShell.contains(userPanel)) {
            chatShell.appendChild(userPanel);
        }


        ensureWordCloud();
        if (_wordCloudMode) { setWordCloudMode(true); }
        installRoomRoot(stage);
        installUnifiedHeader();
        resetRoomShell(stage);
        collectRoomLinks(stage);
        applyPrefs(loadPrefs());
        initStageDivider();
        buildHiddenCamManager();
    }

    function initStageDivider() {
        const divider = document.getElementById('ichc-stage-divider');
        if (!divider || divider.dataset.ichcBound === '1') { return; }
        divider.dataset.ichcBound = '1';

        const state = { active: false, width: 0 };

        const finish = () => {
            if (!state.active) { return; }
            state.active = false;
            divider.classList.remove('ichc-resizing');
            document.body.style.removeProperty('cursor');
            document.body.style.removeProperty('user-select');
            if (state.width) {
                saveStoredSideWidth(state.width);
            }
            camLayoutState.sideWidthOverride = null;
            requestCamRelayout(20);
        };

        divider.addEventListener('pointerdown', event => {
            if (window.innerWidth <= 1100 || event.button !== 0) { return; }
            state.active = true;
            state.width = loadStoredSideWidth() || 0;
            divider.classList.add('ichc-resizing');
            document.body.style.setProperty('cursor', 'col-resize', 'important');
            document.body.style.setProperty('user-select', 'none', 'important');
            divider.setPointerCapture?.(event.pointerId);
            event.preventDefault();
        });

        document.addEventListener('pointermove', event => {
            if (!state.active) { return; }
            const stage = document.getElementById('ichc-room-stage');
            if (!stage) { return; }

            const rect = stage.getBoundingClientRect();
            const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ichc-gap')) || 18;
            const minCamLane = 320;
            const minSide = 360;
            const maxSide = Math.max(minSide, rect.width - minCamLane - gap);
            const nextWidth = Math.max(minSide, Math.min(maxSide, rect.right - event.clientX));

            state.width = Math.round(nextWidth);
            camLayoutState.sideWidthOverride = state.width;
            document.documentElement.style.setProperty('--ichc-stage-side-width', `${state.width}px`);
            // CSS now sizes #ichc-chat-shell via --ichc-chat-width + --ichc-userlist-width
            const _ulW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ichc-userlist-width')) || 200;
            document.documentElement.style.setProperty('--ichc-chat-width', `${Math.max(280, state.width - _ulW)}px`);
            updateCamDensity();
            layoutChat();
        }, true);

        document.addEventListener('pointerup', finish, true);
        document.addEventListener('pointercancel', finish, true);
    }

    function initUserlistResizer(handle) {
        if (!handle || handle.dataset.ichcBound === '1') { return; }
        handle.dataset.ichcBound = '1';

        let active = false;
        let startX = 0;
        let startWidth = 0;
        let startSideWidth = 0;

        const finish = () => {
            if (!active) { return; }
            active = false;
            handle.classList.remove('ichc-resizing');
            document.body.style.removeProperty('cursor');
            document.body.style.removeProperty('user-select');
            const ulW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ichc-userlist-width')) || 188;
            saveStoredUlWidth(ulW);
        };

        handle.addEventListener('pointerdown', (e) => {
            if (e.button !== 0) { return; }
            const userlist = document.getElementById('ichc-userlist');
            if (!userlist) { return; }
            active = true;
            startX = e.clientX;
            startWidth = userlist.getBoundingClientRect().width;
            startSideWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ichc-stage-side-width')) || 600;
            handle.setPointerCapture(e.pointerId);
            handle.classList.add('ichc-resizing');
            document.body.style.setProperty('cursor', 'col-resize');
            document.body.style.setProperty('user-select', 'none');
            e.preventDefault();
        });

        // With setPointerCapture, pointermove/pointerup fire on the handle even
        // when the pointer moves outside it — no global document listeners needed.
        handle.addEventListener('pointermove', (e) => {
            if (!active) { return; }
            const delta = startX - e.clientX;
            const newUlWidth = Math.max(120, Math.min(400, startWidth + delta));
            const newChatWidth = Math.max(280, startSideWidth - newUlWidth - 12);
            camLayoutState.ulWidthOverride = Math.round(newUlWidth);
            document.documentElement.style.setProperty('--ichc-userlist-width', `${newUlWidth}px`);
            document.documentElement.style.setProperty('--ichc-chat-width', `${newChatWidth}px`);
        });

        handle.addEventListener('pointerup', finish);
        handle.addEventListener('pointercancel', finish);
        handle.addEventListener('lostpointercapture', finish);
    }

    // Public entry point: checks in-memory cache -> localStorage -> throttled HTTP fetch.
    // Pending fetches are de-duped so repeated userlist rebuilds don't turn into
    // duplicate profile requests or false null misses.
    function fetchProfileImage(username) {
        const key = (username || '').toLowerCase().trim();
        if (!key) { return Promise.resolve(null); }
        if (profileImageCache.has(key)) { return Promise.resolve(profileImageCache.get(key)); }
        if (profileImagePending.has(key)) { return profileImagePending.get(key); }

        // Check localStorage — avoids any HTTP request for recently-seen users
        try {
            const stored = localStorage.getItem(_AV_LS + key);
            if (stored) {
                const { url, ts } = JSON.parse(stored);
                const ttl = url ? _AV_HIT_TTL : _AV_MISS_TTL;
                if ((Date.now() - ts) < ttl) {
                    _profileCacheSet(key, url || null);
                    return Promise.resolve(url || null);
                }
            }
        } catch (_) {}

        // Warm secondary caches from localStorage so rows can show data before the fetch completes
        if (!profileKarmaCache.has(key)) {
            try {
                const ks = localStorage.getItem(_KM_LS + key);
                if (ks) {
                    const { karma, ts } = JSON.parse(ks);
                    if ((Date.now() - ts) < _KM_TTL && karma != null) { profileKarmaCache.set(key, karma); }
                }
            } catch (_) {}
        }
        if (!profileYearCache.has(key)) {
            try {
                const ys = localStorage.getItem(_YB_LS + key);
                if (ys) {
                    const { year, ts } = JSON.parse(ys);
                    if ((Date.now() - ts) < _YB_TTL) { profileYearCache.set(key, year); }
                }
            } catch (_) {}
        }
        if (!profileGuestCache.has(key)) {
            try {
                const gs = localStorage.getItem(_GS_LS + key);
                if (gs) {
                    const { isGuest, ts } = JSON.parse(gs);
                    if ((Date.now() - ts) < _GS_TTL) { profileGuestCache.set(key, isGuest); }
                }
            } catch (_) {}
        }
        if (!profileBgCache.has(key)) {
            try {
                const bs = localStorage.getItem(_BG_LS + key);
                if (bs) {
                    const { bgUrl, ts } = JSON.parse(bs);
                    if ((Date.now() - ts) < _BG_TTL) { profileBgCache.set(key, bgUrl ?? null); }
                }
            } catch (_) {}
        }
        if (!profileJoinTsCache.has(key)) {
            try {
                const js = localStorage.getItem(_JT_LS + key);
                if (js) {
                    const { joinTs, ts } = JSON.parse(js);
                    if ((Date.now() - ts) < _JT_TTL) { profileJoinTsCache.set(key, joinTs ?? null); }
                }
            } catch (_) {}
        }
        if (!profileTrophiesCache.has(key)) {
            try {
                const ts_str = localStorage.getItem(_TR_LS + key);
                if (ts_str) {
                    const { trophies, ts } = JSON.parse(ts_str);
                    if ((Date.now() - ts) < _TR_TTL) { profileTrophiesCache.set(key, trophies ?? null); }
                }
            } catch (_) {}
        }
        if (!profileBioCache.has(key)) {
            try {
                const bs = localStorage.getItem(_BI_LS + key);
                if (bs) {
                    const { bio, ts } = JSON.parse(bs);
                    if ((Date.now() - ts) < _BI_TTL) { profileBioCache.set(key, bio ?? null); }
                }
            } catch (_) {}
        }

        const pending = _scheduleAvatarFetch(() => _doFetchProfileImage(key))
            .finally(() => profileImagePending.delete(key));
        profileImagePending.set(key, pending);
        return pending;
    }

    function _isUserAvatarUrl(url) {
        if (!url || typeof url !== 'string') { return false; }
        if (/^data:/i.test(url)) { return false; }
        let host;
        try { host = new URL(url).hostname.toLowerCase(); } catch (_) { return false; }
        // Exclude obvious site-asset filenames regardless of host.
        // Note: logo[_.-] is checked separately because the \b word-boundary after _ fails
        // when the filename continues (e.g. logo_header — _ and h are both \w, no boundary).
        // badge_ is intentionally NOT excluded here — ICHC names profile pictures badge_{hash}.jpg under /users/
        // Path-based exclusions below (/badges/, /icons/, etc.) handle non-avatar badge files.
        if (/\b(smicon|trophy|favicon|sprite|control_|18_and_up|roomrating|loading\.|default_avatar|placeholder)\b/i.test(url)) { return false; }
        if (/logo[-_.]/i.test(url)) { return false; }
        // icanhazchat CDN — accept anything not in a known asset subfolder
        if (host === 'images.icanhazchat.com') {
            return !/\/(smicons|icons|badges|sprites|assets)\//i.test(url);
        }
        // Other *.icanhazchat.com hosts (www, etc.) — accept image files not in asset/system paths.
        // Get_Hearted/ contains the site logo and other non-avatar graphics.
        if (host.includes('icanhazchat.com')) {
            return /\.(jpe?g|png|gif|webp)(\?|#|$)/i.test(url) &&
                !/\/(smicons|icons|badges|sprites|assets|js|css|fonts|sounds?|Get_Hearted)\//i.test(url);
        }
        // Explicit external image hosts commonly used for chat avatars
        if (/^(i\.)?imgur\.com$/.test(host) || host === 'vidble.com') { return true; }
        // Any external domain with a direct image extension
        if (/\.(jpe?g|png|gif|webp)(\?|#|$)/i.test(url) &&
            !/jquery|bootstrap|jsdelivr|cloudflare|googleapis|gstatic/i.test(host)) {
            return true;
        }
        return false;
    }

    function _extractAvatarFromDoc(doc, baseUrl) {
        const resolve = raw => {
            if (!raw) { return ''; }
            try { return new URL(raw, baseUrl).href; } catch (_) { return raw; }
        };
        // Read src from an img, falling back through lazy-load data attributes.
        // Sites using Rocket Loader or native lazy-load may store the real URL in
        // data-src / data-original / data-lazy-src instead of src.
        const lazyAttrs = ['src', 'data-src', 'data-original', 'data-lazy-src', 'data-original-src'];
        const getSrc = el => {
            for (const a of lazyAttrs) { const v = el.getAttribute(a); if (v) { return v; } }
            return '';
        };

        // 1. OG / meta image — icanhazchat sets this to the broadcast/profile thumbnail
        for (const sel of [
            'meta[property="og:image"]',
            'meta[name="twitter:image"]',
            'link[rel~="image_src"]',
        ]) {
            const el = doc.querySelector(sel);
            const raw = el?.getAttribute('content') || el?.getAttribute('href') || '';
            const url = resolve(raw);
            if (url && _isUserAvatarUrl(url)) { return url; }
        }
        // 2. icanhazchat CDN and main-domain profile images (src or lazy-load data attrs).
        // Patterns cover both old (_med. / _sqr.) and new (-d suffix: _med- / _sqr-) formats.
        const step2Patterns = [
            'images.icanhazchat.com', '/cache/', '/uploads/',
            '_sqr.', '_sqr-', '_med.', '_med-',
        ];
        for (const pattern of step2Patterns) {
            const combined = lazyAttrs.map(a => `img[${a}*="${pattern}"]`).join(', ');
            const el = doc.querySelector(combined);
            if (!el) { continue; }
            const url = resolve(getSrc(el));
            if (url && _isUserAvatarUrl(url)) { return url; }
        }
        // 3. Common profile picture containers — by element ID/class
        for (const sel of [
            // icanhazchat-specific: the profile pic always lives here
            'td.trophy_case img.rounded', 'td.trophy_case img', '.trophy_case img',
            // Generic fallbacks
            '#profile img', '.profile > img', '.profile-image img', '.profile-photo img',
            '#userProfile img', '#profile_image', '#profileImage', '#profile_pic',
            'img[id*="profile" i]', 'img[class*="profile" i]',
            'img[id*="avatar" i]',  'img[class*="avatar" i]',
            'img[id*="photo" i]',   'img[class*="user-photo" i]',
        ]) {
            const el = doc.querySelector(sel);
            if (!el) { continue; }
            const url = resolve(getSrc(el) || el.getAttribute('content') || '');
            if (url && _isUserAvatarUrl(url)) { return url; }
        }
        // 4. Full img scan — covers any remaining lazy-load or external avatar hosts
        for (const img of doc.querySelectorAll('img')) {
            const url = resolve(getSrc(img));
            if (url && _isUserAvatarUrl(url)) { return url; }
        }
        // 5. CSS background-image in style attributes
        for (const el of doc.querySelectorAll('[style*="url("]')) {
            const m = (el.getAttribute('style') || '').match(/url\(['"]?([^'"()]+)/i);
            if (m) {
                const url = resolve(m[1]);
                if (url && _isUserAvatarUrl(url)) { return url; }
            }
        }
        return '';
    }

    function _extractKarmaFromDoc(doc) {
        // Clone and strip the site header/nav — it contains the viewer's own karma span,
        // which would otherwise be found first by querySelector on any profile page.
        const body = doc.body?.cloneNode(true);
        if (!body) { return null; }
        body.querySelector('.page_header_userlinks')?.remove();
        body.querySelector('header, nav, #header, .header, .page_header')?.remove();

        const el = body.querySelector('span[title="karma" i], span[data-karma]');
        if (el) {
            const n = parseInt((el.textContent || el.getAttribute('data-karma') || '').replace(/,/g, '').trim(), 10);
            if (!isNaN(n)) { return n; }
        }
        // Fallback: scan text for "karma" followed by a number
        const m = (body.textContent || '').match(/karma\D{0,10}?([\d,]{1,10})/i);
        if (m) {
            const n = parseInt(m[1].replace(/,/g, ''), 10);
            if (!isNaN(n)) { return n; }
        }
        return null;
    }

    // Matches Trophy_7year, Trophy_15Year, Trophy_7yr, etc.
    const _TROPHY_RE = /Trophy_(\d+)ye?a?r/gi;

    function _extractYearBadgeFromDoc(doc) {
        let maxYear = 0;
        const _try = str => {
            for (const m of (str || '').matchAll(_TROPHY_RE)) {
                const y = parseInt(m[1], 10);
                if (y > maxYear) { maxYear = y; }
            }
        };
        // img src / data-src / title
        doc.querySelectorAll('img, a[href], a[title]').forEach(el => {
            _try(el.getAttribute('src'));
            _try(el.getAttribute('data-src'));
            _try(el.getAttribute('href'));
            _try(el.getAttribute('title'));
            _try(el.getAttribute('alt'));
        });
        // Catch remaining references in raw HTML (srcset, background-image, etc.)
        _try(doc.body?.innerHTML);

        // Fallback: parse join/registration year from profile page text.
        // Covers cases where trophies were only issued up to a certain year.
        // Handles formats like: "since:\n  January 2012", "Member since: April 2010"
        const bodyText = doc.body?.textContent || '';
        const currentYear = new Date().getFullYear();
        const _MONTHS = 'january|february|march|april|may|june|july|august|september|october|november|december';
        const datePatterns = [
            // "since: January 2012" — explicit month name between keyword and year
            new RegExp(`since[^0-9]{0,60}(?:${_MONTHS})\\.?\\s+(20\\d{2}|199\\d)`, 'i'),
            // "joined / registered / member since" with year anywhere within 60 chars
            /member\s+since[^0-9]{0,60}(20\d{2}|199\d)/i,
            /joined[^0-9]{0,60}(20\d{2}|199\d)/i,
            /registered[^0-9]{0,60}(20\d{2}|199\d)/i,
            /since[^0-9]{0,60}(20\d{2}|199\d)/i,
        ];
        for (const re of datePatterns) {
            const m = bodyText.match(re);
            if (m) {
                // last capture group is always the year
                const joinYear = parseInt(m[m.length - 1], 10);
                if (joinYear >= 2005 && joinYear <= currentYear) {
                    const computed = currentYear - joinYear;
                    if (computed > maxYear) { maxYear = computed; }
                }
                break;
            }
        }

        return maxYear > 0 ? maxYear : null;
    }

    const _JT_MONTH_IDX = { january:0, february:1, march:2, april:3, may:4, june:5,
                             july:6, august:7, september:8, october:9, november:10, december:11 };
    const _JT_MONTHS_RE = 'january|february|march|april|may|june|july|august|september|october|november|december';
    function _extractJoinTimestampFromDoc(doc) {
        const bodyText = doc.body?.textContent || '';
        const currentYear = new Date().getFullYear();
        // Try month + year for maximum precision: "since: January 2012"
        const monthYearRe = new RegExp(`since[^0-9]{0,60}(${_JT_MONTHS_RE})\\.?\\s+(20\\d{2}|199\\d)`, 'i');
        const mm = bodyText.match(monthYearRe);
        if (mm) {
            const mo = _JT_MONTH_IDX[mm[1].toLowerCase()];
            const yr = parseInt(mm[2], 10);
            if (yr >= 2005 && yr <= currentYear && mo !== undefined) { return Date.UTC(yr, mo, 1); }
        }
        // Fall back to year-only patterns
        const yearPatterns = [
            /member\s+since[^0-9]{0,60}(20\d{2}|199\d)/i,
            /joined[^0-9]{0,60}(20\d{2}|199\d)/i,
            /registered[^0-9]{0,60}(20\d{2}|199\d)/i,
            /since[^0-9]{0,60}(20\d{2}|199\d)/i,
        ];
        for (const re of yearPatterns) {
            const ym = bodyText.match(re);
            if (ym) {
                const yr = parseInt(ym[ym.length - 1], 10);
                if (yr >= 2005 && yr <= currentYear) { return Date.UTC(yr, 0, 1); }
            }
        }
        return null;
    }

    function _extractIsGuestFromDoc(doc) {
        const t = doc.body?.textContent || '';
        return /using a nick|finger command|active chatter.*nick|using a nick\. You can use/i.test(t);
    }

    function _extractTrophiesFromDoc(doc) {
        const seen = new Set();
        const out  = [];
        const _add = (el) => {
            const src = el.getAttribute('src') || el.getAttribute('data-src') || '';
            if (!src || seen.has(src)) { return; }
            seen.add(src);
            // Only include images that look like trophies/awards, exclude avatars/smicons/sprites
            if (!/trophy|award|badge|medal|ribbon|supporter|hearted|contrib|patron|rank/i.test(src)) { return; }
            if (/smicon|sprite|control_|favicon|loading\.|default_avatar|placeholder/i.test(src)) { return; }
            const abs = /^https?:/.test(src) ? src
                      : src.startsWith('//') ? 'https:' + src
                      : 'https://www.icanhazchat.com' + (src.startsWith('/') ? '' : '/') + src;
            out.push({ src: abs, alt: (el.getAttribute('alt') || el.getAttribute('title') || '').trim() });
        };
        // Try dedicated trophy containers first
        for (const sel of ['.trophy_case img', '#trophies img', '.trophies img', '.awards img', '#awards img', 'td.trophy_case img']) {
            doc.querySelectorAll(sel).forEach(_add);
        }
        // Fallback: any img whose src contains trophy-like keywords
        if (!out.length) {
            doc.querySelectorAll('img').forEach(img => {
                const s = img.getAttribute('src') || '';
                if (/trophy|award|medal|ribbon/i.test(s)) { _add(img); }
            });
        }
        return out.length ? out : null;
    }

    function _extractBioFromDoc(doc) {
        // ICHC profile pages display user attributes joined by ♦ diamonds, e.g.:
        // "sardistic is a site supporter ♦ is a male living in the United States ♦ ..."
        // This ♦ pattern is the most reliable fingerprint.

        // Helper: is this element purely a text container (no interactive children)?
        const _isTextEl = el => el.querySelectorAll('a,button,input,select,textarea,nav,header,footer').length === 0;

        // Walk all block-level elements and find the ♦-bearing text closest to the profile content
        for (const el of doc.querySelectorAll('p,div,td,span,li,section')) {
            // Only look at leaf-ish nodes (few children) to avoid catching containers
            if (el.children.length > 6) { continue; }
            const t = (el.textContent || '').trim();
            if (t.includes('♦') && t.length >= 8 && t.length <= 800 && _isTextEl(el)) {
                return t.slice(0, 500);
            }
        }

        // Fallback: scan the whole body text for a ♦-joined line
        const bodyText = (doc.body?.textContent || '');
        const diaMatch = bodyText.match(/[^\n\r]{8,500}♦[^\n\r]{2,500}/);
        if (diaMatch) { return diaMatch[0].trim().slice(0, 500); }

        // Last resort: try known ICHC ASP.NET control IDs
        for (const id of ['ctl00_ContentPlaceHolder1_lblAbout', 'ctl00_ContentPlaceHolder1_lblBio',
                          'ctl00_ContentPlaceHolder1_txtBio', 'ctl00_ContentPlaceHolder1_Bio',
                          'ctl00_ContentPlaceHolder1_Description', 'bio', 'lblBio', 'txtBio']) {
            const el = doc.getElementById(id);
            if (!el) { continue; }
            const t = (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') ? el.value : el.textContent;
            const trimmed = (t || '').trim();
            if (trimmed.length > 2) { return trimmed.slice(0, 500); }
        }
        return null;
    }

    // Fetches the profile page, extracts avatar URL and karma, caches both.
    async function _doFetchProfileImage(key) {
        const pageUrl = `https://www.icanhazchat.com/user/${encodeURIComponent(key)}`;
        try {
            const resp = await fetch(pageUrl, { method: 'GET', credentials: 'include', cache: 'default' });
            if (resp.ok) {
                const html = await resp.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const karma = _extractKarmaFromDoc(doc);
                if (karma != null) {
                    profileKarmaCache.set(key, karma);
                    _trimMap(profileKarmaCache, 300);
                    try { localStorage.setItem(_KM_LS + key, JSON.stringify({ karma, ts: Date.now() })); } catch (_) {}
                }
                const year = _extractYearBadgeFromDoc(doc);
                profileYearCache.set(key, year);
                _trimMap(profileYearCache, 300);
                try { localStorage.setItem(_YB_LS + key, JSON.stringify({ year, ts: Date.now() })); } catch (_) {}

                const isGuest = _extractIsGuestFromDoc(doc);
                profileGuestCache.set(key, isGuest);
                _trimMap(profileGuestCache, 300);
                try { localStorage.setItem(_GS_LS + key, JSON.stringify({ isGuest, ts: Date.now() })); } catch (_) {}

                const bgInput = doc.getElementById('ctl00_ContentPlaceHolder1_backImgUrl');
                let bgUrl = bgInput?.value?.trim() || null;
                // Fallback: ICHC may render the bg as an inline style on <body> or a wrapper div
                if (!bgUrl) {
                    for (const el of [doc.body, ...doc.querySelectorAll('[style*="background"]')]) {
                        if (!el) { continue; }
                        const m = (el.getAttribute('style') || '').match(
                            /background(?:-image)?\s*:\s*url\(\s*['"]?(https?:\/\/[^'")\s]+)['"]?\s*\)/i
                        );
                        if (m?.[1]) { bgUrl = m[1]; break; }
                    }
                }
                profileBgCache.set(key, bgUrl);
                _trimMap(profileBgCache, 300);
                try { localStorage.setItem(_BG_LS + key, JSON.stringify({ bgUrl, ts: Date.now() })); } catch (_) {}

                const joinTs = _extractJoinTimestampFromDoc(doc);
                profileJoinTsCache.set(key, joinTs);
                _trimMap(profileJoinTsCache, 300);
                try { localStorage.setItem(_JT_LS + key, JSON.stringify({ joinTs, ts: Date.now() })); } catch (_) {}

                const trophies = _extractTrophiesFromDoc(doc);
                profileTrophiesCache.set(key, trophies);
                _trimMap(profileTrophiesCache, 300);
                try { localStorage.setItem(_TR_LS + key, JSON.stringify({ trophies, ts: Date.now() })); } catch (_) {}

                const bio = _extractBioFromDoc(doc);
                profileBioCache.set(key, bio);
                _trimMap(profileBioCache, 300);
                try { localStorage.setItem(_BI_LS + key, JSON.stringify({ bio, ts: Date.now() })); } catch (_) {}

                let url = _extractAvatarFromDoc(doc, pageUrl);
                if (!url) {
                    // Fallback: regex over raw HTML catches URLs embedded in <script>
                    // blocks, JSON data, or attributes DOMParser doesn't expose cleanly.
                    const m = html.match(/https?:\/\/images\.icanhazchat\.com\/users\/[^"'\s<>]+/i);
                    if (m && _isUserAvatarUrl(m[0])) { url = m[0]; }
                }
                if (url) {
                    _profileCacheSet(key, url);
                    _lsAvSave(key, url);
                    return url;
                }
            }
        } catch (_) {}

        _lsAvSave(key, null);
        _profileCacheSet(key, null);
        return null;
    }

    // Load an avatar image by setting img.src directly.
    // <img> elements bypass Firefox OpaqueResponseBlocking and don't require CORS headers,
    // unlike fetch(). Never use fetch+blob here — that path was blocking with ORB errors
    // and then poisoning the cache with null on failure.
    function _loadAvatarSrc(img, url) {
        if (!img || !url) { return; }
        img.addEventListener('load',  () => { img.classList.add('ichc-ul-avatar-loaded'); }, { once: true });
        img.src = url;
        img.classList.add('ichc-ul-avatar-loaded');
    }

    // ── Chat & cam year-badge / guest injection ───────────────────────────────
    // (fetch deduplication is handled by fetchProfileImage's profileImagePending map)

    let _chatCamStatusTimer = null;

    function _chatRowFromAnchor(anchor) {
        const log = document.getElementById('txt');
        if (!log || !anchor) { return null; }
        let node = anchor;
        while (node.parentElement && node.parentElement !== log) {
            node = node.parentElement;
        }
        return node.parentElement === log ? node : null;
    }

    function _getCamStatusSets() {
        const active = new Set();
        const disabled = new Set();
        document.querySelectorAll('#cams .rounded_square').forEach(card => {
            const name = getCardName(card).trim().toLowerCase();
            if (!name || looksLikePlaceholderName(name)) { return; }
            if (card.classList.contains('ichc-ghost-slot')) {
                disabled.add(name);
            } else {
                active.add(name);
            }
        });
        return { active, disabled };
    }

    function _applyChatRowDecor(row, nick) {
        if (!row || !nick) { return; }
        const karma = profileKarmaCache.get(nick);
        const tier = _karmaToTier(karma ?? null);
        if (tier > 0) { row.dataset.ichcKt = String(tier); }
        else { delete row.dataset.ichcKt; }
        const { active, disabled } = _getCamStatusSets();
        row.classList.toggle('ichc-chat-oncam', active.has(nick));
        row.classList.toggle('ichc-chat-camoff', !active.has(nick) && disabled.has(nick));
    }

    function _refreshAllChatCamStatus() {
        const { active, disabled } = _getCamStatusSets();
        document.querySelectorAll('#txt a.userlink[data-ichc-nick]').forEach(a => {
            const nick = a.dataset.ichcNick;
            const row = _chatRowFromAnchor(a);
            if (!row) { return; }
            row.classList.toggle('ichc-chat-oncam', active.has(nick));
            row.classList.toggle('ichc-chat-camoff', !active.has(nick) && disabled.has(nick));
        });
    }

    function _scheduleRefreshChatCamStatus() {
        if (_chatCamStatusTimer) { return; }
        _chatCamStatusTimer = window.setTimeout(() => {
            _chatCamStatusTimer = null;
            _refreshAllChatCamStatus();
        }, 500);
    }

    function _applyChatGrouping(row, nick) {
        if (!row || !nick) { return; }
        // Walk backwards past event/collector rows to find the previous real message row
        let prev = row.previousElementSibling;
        while (prev && (
            prev.classList.contains('ichc-chat-event') ||
            prev.classList.contains('ichc-event-collector')
        )) { prev = prev.previousElementSibling; }
        if (!prev) { return; }
        const prevNick = prev.querySelector('a.userlink[data-ichc-nick]')?.dataset.ichcNick;
        if (prevNick === nick) {
            row.classList.add('ichc-chat-same-above');
            prev.classList.add('ichc-chat-same-below');
        }
    }

    function _finalizeChatBadgeAnchor(anchor, nick) {
        const row = _chatRowFromAnchor(anchor);
        _applyChatRowDecor(row, nick);

        if (row) {
            const karma = profileKarmaCache.get(nick) ?? null;
            const tier  = _karmaToTier(karma);
            const yt    = _yearToTier(profileYearCache.get(nick) ?? null);
            const alpha = (tier <= 0 ? 0 : tier * 0.013) + (yt <= 0 ? 0 : yt * 0.008);
            const year = profileYearCache.get(nick) ?? null;
            if (tier > 0) {
                const spectral = _karmaToSpectral(karma);
                if (spectral) {
                    row.style.setProperty('--ichc-nick-color', `rgba(${spectral[0]},${alpha})`);
                    row.style.setProperty('--ichc-kt-color', spectral[0]);
                    row.style.setProperty('--ichc-kt-i', String(spectral[1]));
                }
            } else {
                const m = (anchor.style.color || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (m) { row.style.setProperty('--ichc-nick-color', `rgba(${m[1]},${m[2]},${m[3]},${alpha})`); }
                row.style.removeProperty('--ichc-kt-color');
                row.style.removeProperty('--ichc-kt-i');
            }
            _setUserViz(row, karma, year);
            _applyChatGrouping(row, nick);
        }

        if (!profileYearCache.has(nick) || !profileJoinTsCache.has(nick)) {
            fetchProfileImage(nick).then(() => {
                _updateChatBadgesForUser(nick);
                _updateCamBadgesForUser(nick);
            });
        }
    }

    function _dedupeNickBlock(nickBlock, nick, anchor) {
        if (!nickBlock) { return; }
        const badges = [...nickBlock.querySelectorAll(`.ichc-chat-year-badge[data-ichc-year-badge="${CSS.escape(nick)}"]`)];
        badges.slice(1).forEach(el => el.remove());
        const indicators = [...nickBlock.querySelectorAll(`.ichc-nick-indicators[data-ichc-nick-indicators="${CSS.escape(nick)}"]`)];
        indicators.slice(1).forEach(el => el.remove());
        const indicator = indicators[0] || document.createElement('span');
        indicator.className = 'ichc-nick-indicators';
        indicator.dataset.ichcNickIndicators = nick;
        _updateNickIndicators(indicator, nick);
        if (!indicator.isConnected && anchor) { nickBlock.insertBefore(indicator, anchor); }
    }

    function _applyChatBadge(anchor) {
        if (!anchor) { return; }
        if ('ichcNick' in anchor.dataset) {
            const block = anchor.closest('.ichc-nick-block');
            if (block) { _dedupeNickBlock(block, anchor.dataset.ichcNick, anchor); }
            return;
        }
        const nick = anchor.textContent.trim().toLowerCase();
        if (!nick) { return; }

        // Chat messages have "nick: message" — the text node after the anchor starts with ':'.
        // Event rows (join/leave/broadcast) don't have that separator; skip them entirely.
        const existingBlock = anchor.closest('.ichc-nick-block');
        if (existingBlock) {
            anchor.dataset.ichcNick = nick;
            _dedupeNickBlock(existingBlock, nick, anchor);
            _finalizeChatBadgeAnchor(anchor, nick);
            return;
        }

        const nextRaw = anchor.nextSibling;
        const isMessage = nextRaw?.nodeType === Node.TEXT_NODE && /^\s*:/.test(nextRaw.textContent);
        if (!isMessage) { return; }
        anchor.dataset.ichcNick = nick;

        const year    = profileYearCache.get(nick);
        const isGuest = profileGuestCache.get(nick);
        if (isGuest) { anchor.classList.add('ichc-chat-guest'); }

        const badge = document.createElement('span');
        badge.className = 'ichc-chat-year-badge';
        badge.dataset.ichcYearBadge = nick;
        _setBadgeYear(badge, year ?? null);
        _setYearTierClass(badge, year ?? null);
        anchor.before(badge);

        // Wrap badge + anchor + trailing colon into one block so CSS can hide
        // the whole nick prefix (including separator) for continuation rows.
        const nickBlock = document.createElement('span');
        nickBlock.className = 'ichc-nick-block';
        badge.replaceWith(nickBlock);
        nickBlock.appendChild(badge);
        const indicators = document.createElement('span');
        indicators.className = 'ichc-nick-indicators';
        indicators.dataset.ichcNickIndicators = nick;
        _updateNickIndicators(indicators, nick);
        nickBlock.appendChild(indicators);
        nickBlock.appendChild(anchor);
        const nextNode = nickBlock.nextSibling;
        if (nextNode?.nodeType === Node.TEXT_NODE) {
            const cm = nextNode.textContent.match(/^(\s*:\s*)([\s\S]*)$/);
            if (cm) {
                const sep = document.createElement('span');
                sep.className = 'ichc-nick-sep';
                sep.textContent = cm[1];
                nickBlock.appendChild(sep);
                if (cm[2]) { nextNode.textContent = cm[2]; }
                else { nextNode.remove(); }
            }
        }

        _finalizeChatBadgeAnchor(anchor, nick);
    }

    function _applyChatBadgesScope(root) {
        if (!root) { return; }
        const anchors = root.matches?.('a.userlink') ? [root] : [...root.querySelectorAll('a.userlink')];
        anchors.forEach(_applyChatBadge);
    }

    function _updateNickIndicators(el, nick) {
        const year    = profileYearCache.get(nick);
        const karma   = profileKarmaCache.get(nick);
        // Only show indicators once we have confirmed profile data (both caches set,
        // even if values are null). Without this guard the sprout appears for every
        // user before their profile loads.
        const hasData = profileYearCache.has(nick) && profileJoinTsCache.has(nick);
        // year === null after a successful profile fetch means no trophy yet → < ~1 year old
        const isNew        = hasData && year === null;
        // 7+ year account with low engagement
        const isOldDormant = year != null && year >= 7 && karma != null && karma < 700;
        el.textContent = '';
        if (isNew) {
            const s = document.createElement('span');
            s.className = 'ichc-ni ichc-ni-new';
            s.textContent = '\u{1F331}';
            s.title = 'New account (no year badge yet)';
            el.appendChild(s);
        }
        if (isOldDormant) {
            const s = document.createElement('span');
            s.className = 'ichc-ni ichc-ni-dormant';
            s.textContent = '\u{1F578}️';
            s.title = `${year}yr account, low karma (${karma})`;
            el.appendChild(s);
        }
    }

    function _updateChatBadgesForUser(key) {
        const karma   = profileKarmaCache.get(key);
        const year    = profileYearCache.get(key);
        const isGuest = profileGuestCache.get(key);
        const { active, disabled } = _getCamStatusSets();
        const tier = _karmaToTier(karma ?? null);
        const yt   = _yearToTier(year ?? null);
        const alpha = (tier <= 0 ? 0 : tier * 0.013) + (yt <= 0 ? 0 : yt * 0.008);
        document.querySelectorAll(`#txt a.userlink[data-ichc-nick="${CSS.escape(key)}"]`).forEach(a => {
            if (isGuest) { a.classList.add('ichc-chat-guest'); }
            const row = _chatRowFromAnchor(a);
            if (row) {
                if (tier > 0) { row.dataset.ichcKt = String(tier); }
                else { delete row.dataset.ichcKt; }
                row.classList.toggle('ichc-chat-oncam', active.has(key));
                row.classList.toggle('ichc-chat-camoff', !active.has(key) && disabled.has(key));
                if (tier > 0) {
                    const spectral = _karmaToSpectral(karma ?? null);
                    if (spectral) {
                        row.style.setProperty('--ichc-nick-color', `rgba(${spectral[0]},${alpha})`);
                        row.style.setProperty('--ichc-kt-color', spectral[0]);
                        row.style.setProperty('--ichc-kt-i', String(spectral[1]));
                    }
                } else {
                    const mc = (a.style.color || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                    if (mc) { row.style.setProperty('--ichc-nick-color', `rgba(${mc[1]},${mc[2]},${mc[3]},${alpha})`); }
                    row.style.removeProperty('--ichc-kt-color');
                    row.style.removeProperty('--ichc-kt-i');
                }
                _setUserViz(row, karma, year ?? null);
            }
        });
        document.querySelectorAll(`#txt span[data-ichc-year-badge="${CSS.escape(key)}"]`).forEach(span => {
            _setBadgeYear(span, year ?? null);
            _setYearTierClass(span, year ?? null);
        });
        document.querySelectorAll(`#txt span[data-ichc-nick-indicators="${CSS.escape(key)}"]`).forEach(el => {
            _updateNickIndicators(el, key);
        });
    }

    // ── Cam decoration via dynamic stylesheet ────────────────────────────────
    // Never touches .rounded_square attributes or its subtree — uses :has() in
    // a <style> element so the site's MutationObserver is never triggered.
    const _camDecorMap = new Map(); // camId → { karma, year, bgUrl }
    let _camDecorStyleEl = null;
    let _camDecorLastCSS = '';
    function _getCamDecorStyle() {
        if (!_camDecorStyleEl?.isConnected) {
            _camDecorStyleEl = document.getElementById('ichc-cam-decor');
            if (!_camDecorStyleEl) {
                _camDecorStyleEl = document.createElement('style');
                _camDecorStyleEl.id = 'ichc-cam-decor';
                document.head.appendChild(_camDecorStyleEl);
            }
        }
        return _camDecorStyleEl;
    }
    function _updateCamDecorStyles() {
        const rules = [];
        for (const [camId, { karma, year, bgUrl }] of _camDecorMap) {
            const eid = CSS.escape('id-' + camId);
            const cardSel = `#cams .rounded_square:has(#${eid})`;
            const spectral = _karmaToSpectral(karma);
            if (spectral) {
                const [rgb, i] = spectral;
                // Karma-tinted border + crisp hard offset shadow (sticker-lift style,
                // matches the userlist). Hover grows the shadow for an obvious lift.
                const bA = (0.30 + i * 0.50).toFixed(2); // border alpha 0.30→0.80
                const sA = (0.16 + i * 0.24).toFixed(2); // rest shadow alpha (subtle)
                const sH = (0.34 + i * 0.34).toFixed(2); // hover shadow alpha
                let decl = `border-color:rgba(${rgb},${bA});box-shadow:1px 1px 0 0 rgba(${rgb},${sA});z-index:2`;
                if (i >= 0.9)  { decl += ';animation:ichc-cam-aura 2.2s ease-in-out infinite'; }
                rules.push(`${cardSel}{${decl}!important}`);
                // Raise on hover so the offset shadow paints over adjacent cams.
                rules.push(`${cardSel}:hover{box-shadow:4px 4px 0 0 rgba(${rgb},${sH})!important;z-index:50!important;transition:box-shadow 0.13s ease!important}`);
            }
            if (bgUrl) {
                // Profile background fills behind the video as a subtle wash.
                // z-index:0 keeps it below the video; videocontainer sits on top.
                rules.push(`${cardSel}::before{content:'';position:absolute;inset:0;background:url("${bgUrl}") center 30%/cover no-repeat;opacity:0.38;z-index:1;pointer-events:none;border-radius:inherit;transition:opacity 0.3s}`);
            }
            if (year != null) {
                const nameSel = `${cardSel} .name-on-cam`;
                if (year >= 1 && year <= 20) {
                    const url = chrome.runtime.getURL(`images/year-badges/${year}yr.svg`);
                    // Transition + hover handled by static theme.css — not here, so style
                    // regeneration never resets an in-progress hover animation.
                    rules.push(`${nameSel}::after{content:'';display:inline-block;width:14px;height:14px;max-width:0;overflow:hidden;background:url("${url}") no-repeat center/contain;vertical-align:middle;margin-left:0;opacity:0}`);
                } else {
                    rules.push(`${nameSel}::after{content:"${year}yr";display:inline-block;white-space:nowrap;max-width:0;overflow:hidden;font-size:8px;opacity:0;margin-left:0;vertical-align:middle}`);
                }
            }
        }
        const css = rules.join('\n');
        if (css === _camDecorLastCSS) { return; }
        _camDecorLastCSS = css;
        _getCamDecorStyle().textContent = css;
    }
    function _applyCamDecor(camId, karma, year, bgUrl) {
        if (!camId) { return; }
        const prev = _camDecorMap.get(camId);
        const resolvedBg = bgUrl ?? prev?.bgUrl ?? null;
        const resolvedKarma = karma ?? null;
        if (resolvedKarma == null && year == null && !resolvedBg) { _camDecorMap.delete(camId); }
        else { _camDecorMap.set(camId, { karma: resolvedKarma, year: year ?? null, bgUrl: resolvedBg }); }
        _updateCamDecorStyles();
    }

    // ── Evicting decor for cams that are gone ────────────────────────────────
    // `_camDecorMap` is keyed by camId and nothing above ever removed an entry
    // for a cam that left. A camId belongs to a stream, not a person, so every
    // join, leave, reconnect and site-side card rebuild minted a new one and the
    // map only ever grew — and with it the generated stylesheet, at two to four
    // rules per dead camId, EVERY ONE of them a `:has()` selector scoped to
    // `#cams`. `:has()` makes the engine re-check its subjects whenever that
    // subtree mutates, and #cams mutates constantly, so hours in a busy room
    // turned into thousands of live rules re-evaluated on every cam change.
    // That is a whole-document style-recalc cost that climbs for as long as the
    // tab stays open, which is exactly the "gets laggy the longer it is left
    // open" report. Rebuilding the CSS string also walked the whole map on
    // every single badge application.
    //
    // The rule for a camId can only ever match while `#id-<camId>` is in the
    // document, so an entry whose element is gone is dead weight by definition.
    // Removal is deferred one pass: the site detaches and re-attaches a card
    // during its own rebuilds, and dropping the decor the instant an element
    // blinks out would make karma borders flicker.
    const _camDecorStrikes = new Map();   // camId → consecutive passes seen absent
    function _pruneCamDecorMap() {
        if (!_camDecorMap.size) {
            if (_camDecorStrikes.size) { _camDecorStrikes.clear(); }
            return;
        }
        let dropped = false;
        for (const camId of [..._camDecorMap.keys()]) {
            if (document.getElementById('id-' + camId)) {
                _camDecorStrikes.delete(camId);
                continue;
            }
            const strikes = (_camDecorStrikes.get(camId) || 0) + 1;
            if (strikes < 2) { _camDecorStrikes.set(camId, strikes); continue; }
            _camDecorStrikes.delete(camId);
            _camDecorMap.delete(camId);
            dropped = true;
        }
        if (dropped) { _updateCamDecorStyles(); }
    }

    function _applyCamBadge(nameEl) {
        if (!nameEl) { return; }
        const nick = nameEl.textContent.trim().toLowerCase();
        if (!nick) { return; }
        const card = nameEl.closest('.rounded_square');
        if (!card) { return; }
        const camId = getCamId(card);
        if (!camId) { return; }
        _applyCamDecor(camId, profileKarmaCache.get(nick) ?? null, profileYearCache.get(nick) ?? null, profileBgCache.get(nick) ?? null);
        // A cam whose name just resolved is a cam that may need its overlay.
        if (_lastMsgOn()) { _scheduleCamLastMsg(); }
        if (!profileYearCache.has(nick) || !profileBgCache.has(nick)) {
            fetchProfileImage(nick).then(() => {
                _updateChatBadgesForUser(nick);
                _updateCamBadgesForUser(nick);
            });
        }
    }

    // ── Chat text colour ────────────────────────────────────────────────────────
    // Applied through the site's OWN save path, taken from its onColorSave():
    //     set_cookie("textcolor", hex);  send_command("/color " + hex);
    // Both are page globals. `du.eY` is the site's in-memory copy of the same value;
    // it is written too, behind a typeof guard, so the site stays self-consistent —
    // but nothing here depends on that minified name existing.
    function _normalizeHex(value) {
        const hex = String(value || '').trim().replace(/^#/, '');
        return /^[0-9a-f]{6}$/i.test(hex) ? hex.toLowerCase() : '';
    }

    // Local-only: follows the dialog while the user drags, and never touches the
    // network. The colour is not committed until `change`.
    function _previewTextColor(value) {
        const hex = _normalizeHex(value);
        if (!hex) { return; }
        const swatch = document.querySelector('#ichc-cog-menu .ichc-color-swatch');
        if (!swatch) { return; }
        // The swatch is the colour input itself, and an input shows its `value`,
        // not its background — the background is transparent so the native swatch
        // pseudo-element is what paints. Setting background here would do nothing
        // visible on it, and setting value on a plain span would do nothing at all.
        if (swatch.tagName === 'INPUT') { swatch.value = '#' + hex; }
        else { swatch.style.setProperty('background', '#' + hex, 'important'); }
    }

    function _applyTextColor(value) {
        const hex = _normalizeHex(value);
        if (!hex) { return; }
        _previewTextColor(hex);
        try { localStorage.setItem('ichc_font_color', '#' + hex); } catch (_) {}

        // Record it against the local user so their own user-list name picks the
        // colour up straight away rather than after their next message.
        const me = document.getElementById('ichc-userinfo-username')?.textContent?.trim();
        if (me && typeof window.__ichcRecordNickColor === 'function') {
            window.__ichcRecordNickColor(me, '#' + hex);
            scheduleUserListBuild(120);
        }

        runInPageContext(`
(() => {
    var hex = ${JSON.stringify(hex)};
    try { if (typeof set_cookie === 'function') { set_cookie('textcolor', hex); } } catch (e) {}
    try { if (typeof du === 'object' && du) { du.eY = hex; } } catch (e) {}
    try {
        if (typeof send_command === 'function') {
            send_command('/color ' + hex);
        } else {
            console.warn('[ichc] text color: send_command() is not defined on this page.');
        }
    } catch (e) {
        console.warn('[ichc] text color: applying failed', e);
    }
})();
        `);
        console.log('%c[ichc] text color: #' + hex, 'color:#' + hex + ';font-weight:bold');
    }

    // ── Site header logo, outside a room ────────────────────────────────────────
    // Most pages ship the logo already; a few render the header without it, and the
    // header is the only thing identifying the page. CSS alone cannot add a missing
    // image, so the logo is guaranteed here rather than merely un-hidden.
    const SITE_LOGO_URL = 'https://www.icanhazchat.com/Get_Hearted/logo_header.png';
    function _inRoom() { return !!document.getElementById('chat_container'); }

    function ensureSiteHeaderLogo() {
        if (_inRoom()) { return; }
        const header = document.getElementById('ctl00_panelHeader') ||
            document.querySelector('[id$="panelHeader"], .page_header');
        if (!header) { return; }
        // The site's own <img id="ichc-logo"> is preferred whenever it is present —
        // it already points at this file, and leaving it alone keeps the site's
        // markup authoritative.
        if (header.querySelector('#ichc-logo, .ichc-site-logo')) { return; }

        let slot = header.querySelector('.page_header_logo, #ichc-logo-header');
        if (!slot) {
            slot = document.createElement('div');
            slot.className = 'page_header_logo';
            slot.id = 'ichc-logo-header';
            header.prepend(slot);
        }
        const link = document.createElement('a');
        link.href = '/';
        link.title = 'Webcam Chat for the Masses - Home';
        const img = document.createElement('img');
        img.className = 'ichc-site-logo';
        img.src = SITE_LOGO_URL;
        img.alt = 'icanhazchat';
        // If the asset ever moves, drop the slot rather than leaving a broken image
        // icon sitting where the brand should be.
        img.onerror = () => { slot.remove(); };
        link.appendChild(img);
        slot.appendChild(link);
    }

    // ── Last-message cam overlay (opt-in, cog toggle) ───────────────────────────
    // Shows each broadcaster's most recent chat line beside their name on their own
    // cam. Content is pulled from chat.js, which owns the chat DOM and hands back a
    // cloned, fully-themed fragment — so emotes, inline images and gifs come across
    // as themselves rather than as :codes:.
    const LASTMSG_KEY = 'ichc_cam_lastmsg';
    function _lastMsgOn() {
        try { return localStorage.getItem(LASTMSG_KEY) === '1'; } catch (_) { return false; }
    }
    function _setLastMsgOn(on) {
        try { localStorage.setItem(LASTMSG_KEY, on ? '1' : '0'); } catch (_) {}
        _syncCamLastMsg();
    }

    function _removeAllCamLastMsg() {
        document.querySelectorAll('.ichc-cam-lastmsg').forEach(el => el.remove());
    }

    let _lastMsgTimer = null;
    function _scheduleCamLastMsg(delay) {
        if (_lastMsgTimer) { return; }
        _lastMsgTimer = window.setTimeout(() => {
            _lastMsgTimer = null;
            _syncCamLastMsg();
        }, delay || 120);
    }

    // Reports only when the outcome CHANGES, so it explains a blank overlay without
    // adding a line per cam pass. "0 with a recent message" means the lookup ran and
    // simply found nothing from those nicks in the visible log.
    let _lastMsgDiag = '';
    function _lastMsgReport(state) {
        if (state === _lastMsgDiag) { return; }
        _lastMsgDiag = state;
        console.log('%c[ichc] last-msg overlay: ' + state, 'color:#7289da');
    }

    function _syncCamLastMsg() {
        if (!_lastMsgOn()) { _removeAllCamLastMsg(); _lastMsgDiag = ''; return; }
        const api = window.__ichcLastMsg;
        if (!api || typeof api.forNicks !== 'function') {
            _lastMsgReport('chat.js lookup not reachable yet');
            return;   // chat.js not up yet
        }

        const nameEls = [...document.querySelectorAll('#cams .name-on-cam')];
        if (!nameEls.length) { _lastMsgReport('no cam names on screen'); return; }
        const byNick = new Map();
        for (const el of nameEls) {
            const nick = (el.textContent || '').trim();
            if (nick) { byNick.set(nick.toLowerCase(), el); }
        }
        const found = api.forNicks([...byNick.keys()]);
        _lastMsgReport(byNick.size + ' cam name(s), ' + found.size + ' with a recent message');

        for (const [nick, nameEl] of byNick) {
            const parent = nameEl.parentElement;
            if (!parent) { continue; }
            const content = found.get(nick);
            let overlay = parent.querySelector(':scope > .ichc-cam-lastmsg');
            if (!content) { overlay?.remove(); continue; }

            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'ichc-cam-lastmsg';
                // A hidden copy of the nick, in the name's own font, is what pushes
                // the message clear of it — no measuring, and it re-fits by itself
                // when the nick or the font changes.
                const spacer = document.createElement('span');
                spacer.className = 'ichc-cam-lastmsg-spacer';
                spacer.setAttribute('aria-hidden', 'true');
                const body = document.createElement('span');
                body.className = 'ichc-cam-lastmsg-body';
                overlay.append(spacer, body);
                // Directly after the name so both share its containing block and
                // therefore its coordinate system.
                nameEl.insertAdjacentElement('afterend', overlay);
            }
            overlay.querySelector('.ichc-cam-lastmsg-spacer').textContent = (nameEl.textContent || '').trim();
            const body = overlay.querySelector('.ichc-cam-lastmsg-body');
            // Only repaint when the line actually changed — this runs on every cam
            // pass, and replacing identical nodes would restart every gif in view.
            const sig = content.text + '|' + (content.frag.childElementCount || 0) + '|' + content.big;
            if (overlay.dataset.ichcSig === sig) { continue; }
            overlay.dataset.ichcSig = sig;
            body.replaceChildren(content.frag);
            overlay.classList.toggle('ichc-big', !!content.big);
            overlay.title = content.text || '';
        }
    }

    window.addEventListener('ichc-chat-row', () => {
        if (_lastMsgOn()) { _scheduleCamLastMsg(); }
    });

    function _updateCamBadgesForUser(key) {
        const karma = profileKarmaCache.get(key);
        const year  = profileYearCache.get(key);
        const bgUrl = profileBgCache.get(key) ?? null;
        document.querySelectorAll('#cams .name-on-cam').forEach(nameEl => {
            if (nameEl.textContent.trim().toLowerCase() !== key) { return; }
            const card = nameEl.closest('.rounded_square');
            const camId = card ? getCamId(card) : null;
            if (camId) { _applyCamDecor(camId, karma ?? null, year ?? null, bgUrl); }
        });
    }

    // Stored at module level so we can disconnect/reconnect when #txt is replaced.
    let _chatBadgeObs = null;
    let _chatBadgeRoot = null;
    let _camBadgeObs  = null;
    let _camBadgeRoot = null;

    // Batch pending nodes and process them in the next animation frame to avoid
    // synchronous cascades when bursts of messages arrive.
    let _chatBadgePending = new Set();
    let _chatBadgeRAF = null;
    let _chatBadgeIdle = null;

    // ── Chat scroll lock ──────────────────────────────────────────────────────
    // The site auto-scrolls #txt to the bottom on every new message. We intercept
    // this by scheduling a rAF that restores the user's saved position whenever
    // they have scrolled up to read history.
    let _chatAtBottom = true;
    let _chatSavedScrollTop = 0;
    let _chatScrollRestoreRAF = null;
    // Non-zero while WE are moving the log. A scroll event caused by our own
    // adjustment must never be read as "the user scrolled up" — that is what
    // latches following off and leaves the log parked while messages pile up
    // below it. Pruning rows is the main source: it changes scrollTop by
    // definition.
    let _chatScrollAdjusting = 0;

    function _withChatScrollAdjust(fn) {
        _chatScrollAdjusting++;
        try { fn(); } finally {
            // Released after the scroll event this mutation emits.
            window.setTimeout(() => {
                _chatScrollAdjusting = Math.max(0, _chatScrollAdjusting - 1);
            }, 0);
        }
    }

    function _initChatScrollLock(log) {
        if (!log || log._ichcScrollLock) { return; }
        log._ichcScrollLock = true;
        _chatAtBottom = (log.scrollHeight - log.scrollTop - log.clientHeight) < 80;
        log.addEventListener('scroll', () => {
            // Ignore scrolls we caused ourselves (restore, prune, focus resync).
            if (_chatScrollRestoreRAF !== null || _chatScrollAdjusting > 0) { return; }
            const atBottom = (log.scrollHeight - log.scrollTop - log.clientHeight) < 80;
            _chatAtBottom = atBottom;
            if (!atBottom) { _chatSavedScrollTop = log.scrollTop; }
        }, { passive: true });
    }

    function _restoreChatScroll(log) {
        if (_chatAtBottom || !log) { return; }
        const saved = _chatSavedScrollTop;
        if (_chatScrollRestoreRAF !== null) { cancelAnimationFrame(_chatScrollRestoreRAF); }
        _chatScrollRestoreRAF = requestAnimationFrame(() => {
            _chatScrollRestoreRAF = null;
            if (!_chatAtBottom && log.isConnected) { log.scrollTop = saved; }
        });
    }

    // ── Alt-tab resync ──────────────────────────────────────────────────────────
    // Reported as "scrolling gets stuck ... seems to happen when window isnt
    // focused". While the window is unfocused the browser suspends
    // requestAnimationFrame, so _restoreChatScroll's pending frame does not run
    // until you come back; meanwhile rows keep arriving, the log gets pruned, and
    // emotes/images finish loading and change row heights. All of that moves the
    // log without the user touching it.
    //
    // If we still believe we are FOLLOWING, the only correct position on return is
    // the bottom, so snap to it. If the user had deliberately scrolled up before
    // alt-tabbing, _chatAtBottom is false and their position is left exactly where
    // they put it — that is the whole point of the scroll lock.
    function _resyncChatScrollOnFocus() {
        const log = document.getElementById('txt');
        if (!log || !log.isConnected) { return; }
        if (!_chatAtBottom) { return; }   // reading history on purpose
        if ((log.scrollHeight - log.scrollTop - log.clientHeight) <= 4) { return; }
        _withChatScrollAdjust(() => { log.scrollTop = log.scrollHeight; });
    }

    window.addEventListener('focus', _resyncChatScrollOnFocus);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // One immediate pass, then one after layout settles — returning to a
            // background tab can still be applying deferred image loads.
            _resyncChatScrollOnFocus();
            window.setTimeout(_resyncChatScrollOnFocus, 250);
        }
    });

    // Diagnostic for the next report. A content-script global is not reachable
    // from the page console, so this is triggered by an event the page can fire:
    //   document.dispatchEvent(new CustomEvent('ichc-scroll-diag'))
    document.addEventListener('ichc-scroll-diag', () => {
        const log = document.getElementById('txt');
        const err = document.getElementById('errorMessageDiv');
        console.log('[ichc] scroll state', {
            following: _chatAtBottom,
            savedScrollTop: _chatSavedScrollTop,
            adjusting: _chatScrollAdjusting,
            restorePending: _chatScrollRestoreRAF !== null,
            scrollTop: log ? Math.round(log.scrollTop) : null,
            scrollHeight: log ? Math.round(log.scrollHeight) : null,
            clientHeight: log ? Math.round(log.clientHeight) : null,
            distanceFromBottom: log ? Math.round(log.scrollHeight - log.scrollTop - log.clientHeight) : null,
            rows: log ? log.children.length : null,
            sitePausedBanner: /scrolling has been paused/i.test((err && err.textContent) || ''),
        });
    });

    // ── Chat log pruning ──────────────────────────────────────────────────────
    // A busy room can hit several thousand richly-decorated rows in a couple of
    // hours.  Keeping that many live nodes makes every delegated click, selector,
    // and chat MutationObserver progressively more expensive.  The rolling history
    // cache already preserves the newest 800 messages across refreshes/clears, so a
    // smaller live window still leaves generous scrollback without retaining the
    // multi-thousand-node DOM that caused long-session interaction lag.
    const _CHAT_MAX_ROWS = 1600;
    const _CHAT_TRIM_TO  = 1200;

    function _pruneChatLog(log) {
        if (!log) { return; }
        const count = log.children.length;
        if (count <= _CHAT_MAX_ROWS) { return; }
        const excess = count - _CHAT_TRIM_TO;
        const rows = [...log.children].slice(0, excess);
        const wasAtBottom = _chatAtBottom;
        // Compensate scrollTop so the viewport doesn't jump when top rows are removed.
        const heightBefore = log.scrollHeight;
        const scrollBefore = log.scrollTop;
        rows.forEach(r => {
            // chat.js watches removals to preserve moderator-silenced messages.
            // Mark deliberate age pruning so it is not mistaken for moderation and
            // replaced with a row of "removed message" placeholders.
            r.dataset.ichcAgePruned = '1';
            r.remove();
        });
        const removed = heightBefore - log.scrollHeight;
        const newTop = Math.max(0, scrollBefore - removed);
        // When following, snap to the true bottom rather than trusting the
        // arithmetic: rows do not all have their final height yet (emotes and
        // inline images load late, and load while the tab is in the background),
        // so scrollBefore - removed can land far enough off the bottom that the
        // scroll listener latches following OFF. Guarded so the resulting scroll
        // event is not mistaken for the user scrolling up.
        _withChatScrollAdjust(() => {
            log.scrollTop = wasAtBottom ? log.scrollHeight : newTop;
        });
        if (!_chatAtBottom) { _chatSavedScrollTop = Math.max(0, _chatSavedScrollTop - removed); }
    }

    function _scheduleChatBadgeFlush() {
        if (_chatBadgeRAF !== null || _chatBadgeIdle !== null) { return; }
        const schedule = !_chatAtBottom && window.requestIdleCallback
            ? cb => {
                _chatBadgeIdle = window.requestIdleCallback(deadline => {
                    _chatBadgeIdle = null;
                    cb(deadline);
                }, { timeout: 450 });
            }
            : cb => {
                _chatBadgeRAF = requestAnimationFrame(() => {
                    _chatBadgeRAF = null;
                    cb(null);
                });
            };
        schedule(deadline => {
            _chatBadgeRAF = null;
            const budget = !_chatAtBottom ? 12 : 80;
            const nodes = [];
            const started = performance.now();
            for (const node of _chatBadgePending) {
                _chatBadgePending.delete(node);
                nodes.push(node);
                if (nodes.length >= budget) { break; }
                if (deadline && deadline.timeRemaining() < 4) { break; }
                if (!_chatAtBottom && performance.now() - started > 8) { break; }
            }
            const log = document.getElementById('txt');
            nodes.forEach(_applyChatBadgesScope);
            if (_chatAtBottom || _chatBadgePending.size === 0) { _pruneChatLog(log); }
            _restoreChatScroll(log);
            if (_chatBadgePending.size > 0) { _scheduleChatBadgeFlush(); }
        });
    }

    function _attachChatBadgeObserver() {
        const log = document.getElementById('txt');
        if (!log || log === _chatBadgeRoot) { return; }
        _chatBadgeObs?.disconnect();
        _chatBadgeRoot = log;
        // Enforce the bound immediately on attach as well as after new rows. This
        // also repairs an already-long-running tab as soon as the extension reloads.
        _pruneChatLog(log);
        _applyChatBadgesScope(log);
        _initChatScrollLock(log);
        _chatAtBottom = true; // reset on reconnect — treat as following mode
        _chatBadgeObs = new MutationObserver(mutations => {
            let changed = false;
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (node.nodeType !== 1) { continue; }
                    const cl = node.classList;
                    if (cl.contains('ichc-chat-year-badge') ||
                        cl.contains('ichc-nick-block') ||
                        cl.contains('ichc-nick-sep') ||
                        node.closest('.ichc-nick-block')) { continue; }
                    _chatBadgePending.add(node);
                    changed = true;
                }
            }
            if (changed) { _scheduleChatBadgeFlush(); }
        });
        _chatBadgeObs.observe(log, { childList: true, subtree: true });
    }

    const _CAM_DECORATION_SELECTOR = [
        '.ichc-cam-stats-overlay',
        '.ichc-cam-timer',
        '.ichc-cam-fail-badge',
        '.ichc-cam-year-badge',
        '.ichc-card-tools',
        '.ichc-disabled-overlay',
        '.ichc-scan-line',
    ].join(',');

    // Extension-owned badges and overlays change frequently but never change the
    // set/order/identity of camera cards.  Letting those mutations reach all three
    // cam observers turned the one-second Live-overlay sample into a full layout,
    // user-list scan, and chat-cam status refresh every second.
    function _isCamDecorationMutation(mutation) {
        const target = mutation.target instanceof Element
            ? mutation.target
            : mutation.target?.parentElement;
        if (target?.closest?.(_CAM_DECORATION_SELECTOR)) { return true; }
        if (mutation.type !== 'childList') { return false; }

        const changed = [...mutation.addedNodes, ...mutation.removedNodes];
        return changed.length > 0 && changed.every(node =>
            node instanceof Element && node.matches(_CAM_DECORATION_SELECTOR));
    }

    function _attachCamBadgeObserver() {
        const cams = document.getElementById('cams');
        if (!cams || cams === _camBadgeRoot) { return; }
        _camBadgeObs?.disconnect();
        _camBadgeRoot = cams;
        cams.querySelectorAll('.name-on-cam').forEach(_applyCamBadge);
        _camBadgeObs = new MutationObserver(mutations => {
            mutations.forEach(m => {
                if (_isCamDecorationMutation(m)) { return; }
                m.addedNodes.forEach(node => {
                    // Text node added to .name-on-cam: the name was just populated, try again
                    if (node.nodeType === 3) {
                        const p = node.parentElement;
                        if (p?.matches?.('.name-on-cam')) {
                            _applyCamBadge(p);
                            _scheduleRefreshChatCamStatus();
                        }
                        return;
                    }
                    if (node.nodeType !== 1 || node.classList?.contains('ichc-cam-year-badge')) { return; }
                    if (node.matches?.('.name-on-cam')) { _applyCamBadge(node); }
                    node.querySelectorAll?.('.name-on-cam').forEach(_applyCamBadge);
                    _scheduleRefreshChatCamStatus();
                });
            });
        });
        _camBadgeObs.observe(cams, { childList: true, subtree: true });
    }

    // ── Overlay scrollbar ─────────────────────────────────────────────────────
    // Draws a custom thumb over a scroll container's right edge, visible only
    // while scrolling / hovering. The native bar is removed in CSS so it reserves
    // no gutter; see the overlay-scrollbar block in theme.css for why native
    // scrollbars cannot do this.
    // Safe to call repeatedly (a timer for chat, every rebuild for the userlist):
    // it reuses the existing bar, re-attaches a detached one, and only builds a new
    // bar for a scroll element it has not seen.
    function _initOverlayScrollbar(scrollEl, host) {
        if (!scrollEl) { return; }
        const parent = host || scrollEl.parentElement;
        if (!parent) { return; }

        // Self-heal instead of bailing out on the second call. A plain "already done"
        // guard is not enough: the userlist rebuild strips every panel child, so the
        // bar can be detached while the scroll body it belongs to survives. Bailing
        // out there left the userlist with no scrollbar at all.
        if (scrollEl._ichcOsbBar) {
            if (!scrollEl._ichcOsbBar.isConnected) {
                parent.appendChild(scrollEl._ichcOsbBar);
                scrollEl._ichcOsbLayout?.();
            }
            return;
        }

        // Drop a bar orphaned by a previous scroll element — the site replaces #txt,
        // and its old bar would otherwise linger in the host.
        parent.querySelectorAll(':scope > .ichc-osb').forEach(stale => {
            if (!stale._ichcOsbOwner?.isConnected) { stale.remove(); }
        });

        const bar = document.createElement('div');
        bar.className = 'ichc-osb';
        bar._ichcOsbOwner = scrollEl;
        const thumb = document.createElement('div');
        thumb.className = 'ichc-osb-thumb';
        bar.appendChild(thumb);
        parent.appendChild(bar);
        scrollEl._ichcOsbBar = bar;

        let hideTimer = 0;
        let dragging = false;
        let hovering = false;

        const layout = () => {
            const max = scrollEl.scrollHeight - scrollEl.clientHeight;
            if (max <= 1) {
                bar.style.display = 'none';
                bar.classList.remove('ichc-osb-on');
                return;
            }
            bar.style.display = '';
            // Follow the scroll element's box inside the host rather than assuming
            // they are coincident — #txt is one flex child of #chat_container.
            bar.style.top = scrollEl.offsetTop + 'px';
            bar.style.height = scrollEl.clientHeight + 'px';
            const h = Math.max(24, Math.round(
                scrollEl.clientHeight * (scrollEl.clientHeight / scrollEl.scrollHeight)));
            const pos = Math.round((scrollEl.clientHeight - h) * (scrollEl.scrollTop / max));
            thumb.style.height = h + 'px';
            thumb.style.transform = `translateY(${pos}px)`;
            // Same rainbow mapping chat.js uses for --ichc-scroll-hue. --ichc-osb-hue
            // drives the thumb gradient and the ichc-osb-breathe glow; --ichc-scroll-hue
            // is written too, kept in step for anything still reading that name.
            const hue = String(Math.round(300 * (scrollEl.scrollTop / max)));
            bar.style.setProperty('--ichc-osb-hue', hue);
            bar.style.setProperty('--ichc-scroll-hue', hue);
        };
        scrollEl._ichcOsbLayout = layout;

        const show = () => {
            layout();
            if (bar.style.display === 'none') { return; }
            bar.classList.add('ichc-osb-on');
            if (hideTimer) { clearTimeout(hideTimer); }
            hideTimer = window.setTimeout(() => {
                hideTimer = 0;
                if (dragging || hovering) { return; }
                bar.classList.remove('ichc-osb-on');
            }, 1400);
        };

        // Only a scroll the user actually caused should reveal the bar. Chat
        // auto-follows new messages by setting scrollTop, which fires 'scroll' just
        // like a wheel does — showing the bar on every incoming line. There is no way
        // to tell the two apart from the event itself, so gate on a recent input
        // gesture, the same trick chat.js uses for its own pause logic.
        let gestureAt = 0;
        const markGesture = () => { gestureAt = Date.now(); };
        ['wheel', 'touchmove', 'pointerdown', 'keydown'].forEach(type => {
            scrollEl.addEventListener(type, markGesture, { passive: true });
        });

        scrollEl.addEventListener('scroll', () => {
            // Keep the thumb's geometry current either way, so it is already in the
            // right place if the bar is revealed a moment later.
            if (Date.now() - gestureAt > 700) { layout(); return; }
            show();
        }, { passive: true });

        // Deliberately no hover-to-reveal on the scroll element itself: resting the
        // pointer over chat while reading would sit the bar there permanently.
        // Hovering the bar keeps it alive so it can be grabbed once visible.
        bar.addEventListener('pointerenter', () => { hovering = true; show(); }, { passive: true });
        bar.addEventListener('pointerleave', () => { hovering = false; }, { passive: true });

        thumb.addEventListener('pointerdown', e => {
            e.preventDefault();
            e.stopPropagation();
            dragging = true;
            thumb.classList.add('ichc-osb-dragging');
            const startY = e.clientY;
            const startTop = scrollEl.scrollTop;
            const max = scrollEl.scrollHeight - scrollEl.clientHeight;
            const travel = scrollEl.clientHeight - thumb.offsetHeight;
            // chat.js stamps user-scroll intent from a mousedown bound directly on
            // the scroll element. The thumb is a sibling, so a real mousedown never
            // reaches it — without this, dragging the chat up would not pause
            // auto-follow and new messages would yank you back to the bottom.
            // Non-bubbling on purpose: only that direct listener should see it.
            scrollEl.dispatchEvent(new Event('mousedown'));
            let lastStamp = Date.now();
            const move = ev => {
                if (travel <= 0) { return; }
                // Re-stamp user intent throughout the drag. chat.js only treats a scroll
                // as user-initiated within 600ms of the last input event, so any drag
                // longer than that was being read as a *programmatic* scroll — which put
                // chat's follow logic into "restore saved position / jump to live" and
                // fought the drag. One stamp at pointerdown was not enough.
                const now = Date.now();
                if (now - lastStamp > 200) {
                    lastStamp = now;
                    scrollEl.dispatchEvent(new Event('mousedown'));
                }
                scrollEl.scrollTop = startTop + ((ev.clientY - startY) / travel) * max;
            };
            const up = () => {
                dragging = false;
                thumb.classList.remove('ichc-osb-dragging');
                document.removeEventListener('pointermove', move);
                document.removeEventListener('pointerup', up);
                show();
            };
            document.addEventListener('pointermove', move);
            document.addEventListener('pointerup', up);
        });

        // Click the empty track to page toward the click
        bar.addEventListener('pointerdown', e => {
            if (e.target === thumb) { return; }
            const mid = bar.getBoundingClientRect().top + thumb.offsetTop + thumb.offsetHeight / 2;
            scrollEl.scrollTop += (e.clientY < mid ? -0.9 : 0.9) * scrollEl.clientHeight;
        });

        if (typeof ResizeObserver === 'function') {
            new ResizeObserver(layout).observe(scrollEl);
        }
        new MutationObserver(layout).observe(scrollEl, { childList: true });
        layout();
    }

    function _initChatOverlayScrollbar() {
        const log = document.getElementById('txt');
        // #chat_container is position: relative and is #txt's offsetParent
        _initOverlayScrollbar(log, log?.closest('#chat_container') || log?.parentElement);
    }

    function initChatCamBadges() {
        _attachChatBadgeObserver();
        _attachCamBadgeObserver();
        _refreshAllChatCamStatus();
        _initChatOverlayScrollbar();
        // Reconnect if the site replaces #txt or #cams (same approach chat.js uses).
        // The overlay scrollbar rides along: its per-element guard means a replaced
        // #txt gets a fresh bar and an unchanged one is a no-op.
        window.setInterval(() => {
            _attachChatBadgeObserver();
            _attachCamBadgeObserver();
            _refreshAllChatCamStatus();
            _initChatOverlayScrollbar();
            // Same cadence deliberately: this is the tick that already knows the
            // cam DOM may have been rebuilt underneath us, and two passes of it
            // is the grace period _pruneCamDecorMap wants before evicting.
            _pruneCamDecorMap();
        }, 3000);
    }

    // ── Emoji / meme tab-complete ─────────────────────────────────────────────
    function _prefetchGifData() {
        if (_gifDataCache) { return; }
        const chromeOrBrowser = typeof browser !== 'undefined' ? browser : chrome;
        fetch(chromeOrBrowser.runtime.getURL('gifs.txt')).then(r => r.text()).then(text => {
            if (_gifDataCache) { return; }
            const gifSeen = new Set();
            const gifs = [];
            for (const m of text.matchAll(/copyToClipboard\('(:[^']+)'\)[\s\S]{1,400}?src="(\/\/www\.vidble\.com\/([A-Za-z0-9]+)_sqr\.(gif|jpg|png))"/g)) {
                const code = m[1];
                if (gifSeen.has(code)) { continue; }
                gifSeen.add(code);
                gifs.push({ code, src: m[2], full: 'https://www.vidble.com/' + m[3] + '.' + m[4] });
            }
            _gifDataCache = { gifs };
        }).catch(() => {});
    }

    // The edit box's inset shadow is pooled toward the cursor while the pointer is
    // over it, as if the shadow were being dragged around inside the box. The CSS
    // reads --ichc-box-sx / --ichc-box-sy (see the frosted-glass block at the end of
    // theme.css); this only writes those two custom properties, so the shadow's
    // colour, blur, and the rest of the box styling stay in the stylesheet.
    // A positive inset x offset darkens the LEFT inner edge, so to pool the shadow
    // under the cursor the offset points from the cursor back toward the centre.
    // Flip both signs here to invert it into cursor-as-light-source behaviour.
    // Kept small on purpose: a wide reach made the shadow swing across the box and
    // read as an animation rather than a shadow. A few px is a drift, not a swing.
    // The vertical reach is much smaller than the horizontal one: the box is only
    // ~36px tall against several hundred wide, so the same reach on both axes makes
    // the vertical component saturate within a few px of mouse travel and jump.
    const _BOX_SHADOW_REACH_X = 3; // px at the box edge; 2px is the CSS resting value
    const _BOX_SHADOW_REACH_Y = 0.5;
    function _initInputShadowFollow() {
        const input = document.getElementById('txtMsg');
        if (!input || input._ichcShadowFollow) { return; }
        input._ichcShadowFollow = true;

        let frame = 0;
        let pending = null;

        const write = () => {
            frame = 0;
            if (!pending) { return; }
            input.style.setProperty('--ichc-box-sx', pending.x.toFixed(2) + 'px');
            input.style.setProperty('--ichc-box-sy', pending.y.toFixed(2) + 'px');
        };

        input.addEventListener('pointermove', e => {
            const r = input.getBoundingClientRect();
            if (!r.width || !r.height) { return; }
            // -1..1 from the centre, clamped so the corners don't overshoot
            const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
            const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
            pending = { x: -nx * _BOX_SHADOW_REACH_X, y: -ny * _BOX_SHADOW_REACH_Y };
            if (!frame) { frame = requestAnimationFrame(write); }
        }, { passive: true });

        input.addEventListener('pointerleave', () => {
            pending = null;
            if (frame) { cancelAnimationFrame(frame); frame = 0; }
            // Back to the stylesheet's resting offsets
            input.style.removeProperty('--ichc-box-sx');
            input.style.removeProperty('--ichc-box-sy');
        });
    }

    function _initEmojiTabComplete() {
        const input = document.getElementById('txtMsg');
        if (!input || input._ichcTC) { return; }
        input._ichcTC = true;
        _prefetchGifData();

        const popup = document.createElement('div');
        popup.className = 'ichc-tc-popup';
        popup.hidden = true;
        document.body.appendChild(popup);

        let hits = [];
        let sel = 0;

        function _token() {
            const v = input.value, p = input.selectionStart ?? input.value.length;
            const m = v.slice(0, p).match(/:([a-z0-9_-]{1,32})$/i);
            if (!m) { return null; }
            return { q: m[1].toLowerCase(), start: p - m[0].length, end: p };
        }

        function _search(q) {
            const out = [];
            // Emojis — prefer first-keyword starts-with matches
            const exact = [], fuzzy = [];
            for (const em of ICHC_EMOJIS) {
                const words = em.n.split(' ');
                if (words[0].startsWith(q)) { exact.push({ char: em.e, label: words[0], insert: em.e }); }
                else if (em.n.includes(q)) { fuzzy.push({ char: em.e, label: words[0], insert: em.e }); }
            }
            out.push(...exact.slice(0, 8), ...fuzzy.slice(0, Math.max(0, 8 - exact.length)));
            // Memes
            const gifs = _gifDataCache?.gifs ?? [];
            const mExact = [], mFuzzy = [];
            for (const g of gifs) {
                const name = g.code.replace(/^:/, '').toLowerCase();
                if (name.startsWith(q)) { mExact.push({ label: name, insert: g.code, src: 'https:' + g.src }); }
                else if (name.includes(q)) { mFuzzy.push({ label: name, insert: g.code, src: 'https:' + g.src }); }
            }
            out.push(...mExact.slice(0, 6), ...mFuzzy.slice(0, Math.max(0, 6 - mExact.length)));
            return out;
        }

        let _popupAnchored = false;

        function _anchorPopup() {
            const r = input.getBoundingClientRect();
            popup.style.bottom = (window.innerHeight - r.top + 4) + 'px';
            popup.style.left = r.left + 'px';
            popup.style.minWidth = Math.min(r.width, 320) + 'px';
            _popupAnchored = true;
        }

        function _render() {
            if (!_popupAnchored) { _anchorPopup(); }
            popup.innerHTML = '';
            hits.forEach((h, i) => {
                const item = document.createElement('div');
                item.className = 'ichc-tc-item' + (i === sel ? ' ichc-tc-sel' : '');
                const charEl = document.createElement('span');
                charEl.className = 'ichc-tc-char';
                if (h.src) {
                    const img = document.createElement('img');
                    img.src = h.src;
                    img.alt = h.label;
                    charEl.appendChild(img);
                } else {
                    charEl.textContent = h.char;
                }
                const labelEl = document.createElement('span');
                labelEl.className = 'ichc-tc-label';
                labelEl.textContent = h.label;
                item.appendChild(charEl);
                item.appendChild(labelEl);
                item.addEventListener('mousedown', e => { e.preventDefault(); _pick(i); });
                popup.appendChild(item);
            });
            popup.hidden = false;
        }

        function _pick(idx) {
            const h = hits[idx];
            if (!h) { return; }
            const tok = _token();
            if (!tok) { _dismiss(); return; }
            const ins = h.insert + ' ';
            _trackEmoteUsage(h.insert);
            input.value = input.value.slice(0, tok.start) + ins + input.value.slice(tok.end);
            input.setSelectionRange(tok.start + ins.length, tok.start + ins.length);
            _dismiss();
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.focus();
        }

        function _dismiss() {
            if (!popup.hidden) { popup.hidden = true; }
            hits = [];
            sel = 0;
            _popupAnchored = false;
        }

        input.addEventListener('input', () => {
            const tok = _token();
            if (!tok) { _dismiss(); return; }
            hits = _search(tok.q);
            if (!hits.length) { _dismiss(); return; }
            sel = 0;
            _render();
        });

        // Capture-phase doc listener for Tab — fires before any bubble-phase listener
        // on the input (including the site's own username tab-complete), so stopImmediatePropagation
        // prevents the site's handler from running when our popup is open.
        document.addEventListener('keydown', e => {
            if (e.key !== 'Tab' || e.target !== input || popup.hidden) { return; }
            e.preventDefault();
            e.stopImmediatePropagation();
            if (e.shiftKey) {
                sel = (sel - 1 + hits.length) % hits.length;
                _render();
            } else {
                _pick(sel);
            }
        }, true);

        input.addEventListener('keydown', e => {
            if (popup.hidden) { return; }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                sel = (sel + 1) % hits.length;
                _render();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                sel = (sel - 1 + hits.length) % hits.length;
                _render();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                _pick(sel);
            } else if (e.key === 'Escape') {
                e.stopPropagation();
                _dismiss();
            }
        });

        input.addEventListener('blur', () => { setTimeout(_dismiss, 150); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') { _dismiss(); } }, true);
    }

    // ── PM avatar strip helpers ────────────────────────────────────────────────
    function _pmAvNode(nick) {
        return document.querySelector(`#ichc-pm-avatars [data-nick="${CSS.escape(nick)}"]`);
    }

    function ensurePmAvatarItem(nick, color) {
        const strip = document.getElementById('ichc-pm-avatars');
        if (!strip || !nick) { return null; }
        let item = _pmAvNode(nick);
        if (item) { return item; }

        item = document.createElement('div');
        item.className = 'ichc-pm-avatar-item';
        item.dataset.nick = nick;
        item.title = nick;
        // Inline positioning context; width is controlled by CSS (expands when active)
        item.style.cssText = 'position:relative!important;flex-shrink:0!important;cursor:pointer!important;';

        const inner = document.createElement('div');
        inner.className = 'ichc-pm-avatar-inner';
        inner.style.setProperty('--av-bg', color ? `#${color.replace(/^#/, '')}` : userAvatarColor(nick));

        const letter = document.createElement('span');
        letter.className = 'ichc-pm-avatar-letter';
        letter.textContent = (nick[0] || '?').toUpperCase();
        inner.appendChild(letter);

        const badge = document.createElement('span');
        badge.className = 'ichc-pm-avatar-badge';
        badge.setAttribute('aria-hidden', 'true');
        // All positioning inline — left side, above avatar, red glow
        badge.style.cssText = 'position:absolute!important;top:-4px!important;left:-2px!important;right:auto!important;min-width:16px!important;height:16px!important;padding:0 3px!important;border-radius:8px!important;background:#ff1111!important;color:#fff!important;font-size:10px!important;font-weight:800!important;line-height:16px!important;text-align:center!important;pointer-events:none!important;display:none!important;z-index:3!important;border:1.5px solid #1e2024!important;box-sizing:border-box!important;box-shadow:0 0 5px 1px rgba(255,0,0,.55)!important;';

        const statusDot = document.createElement('span');
        statusDot.className = 'ichc-pm-status-dot ichc-pm-status-offline';

        const nameLabel = document.createElement('span');
        nameLabel.className = 'ichc-pm-avatar-name';
        nameLabel.textContent = nick;

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'ichc-pm-avatar-close';
        closeBtn.title = `Close ${nick}`;
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', e => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('ichc-pm-close-nick', { detail: { nick } }));
        });

        item.appendChild(inner);
        item.appendChild(badge);
        item.appendChild(statusDot);
        item.appendChild(nameLabel);
        item.appendChild(closeBtn);

        item.addEventListener('click', () => {
            const pmBtn = document.getElementById('ichc-pm-toggle-btn');
            const isPmOpen = pmBtn?.classList.contains('ichc-pm-open');
            if (item.classList.contains('ichc-pm-avatar-active') && isPmOpen) {
                // Second click on the already-active avatar collapses the PM window
                // and un-expands the avatar pill back to just the circle.
                document.querySelectorAll('#ichc-pm-avatars .ichc-pm-avatar-active')
                    .forEach(a => a.classList.remove('ichc-pm-avatar-active'));
                window.dispatchEvent(new CustomEvent('ichc-pm-user-toggle'));
                return;
            }
            window.dispatchEvent(new CustomEvent('ichc-pm-open', { detail: { nick, forceShow: true } }));
            window.dispatchEvent(new CustomEvent('ichc-pm-active', { detail: { nick } }));
            _clearPmAvatarBadge(nick);
        });

        strip.appendChild(item);

        fetchProfileImage(nick).then(url => {
            if (!url || !document.contains(item)) { return; }
            const img = new Image();
            img.className = 'ichc-pm-avatar-img';
            img.src = url;
            img.onerror = () => img.remove();
            inner.appendChild(img);
        });

        return item;
    }

    function _syncPmAvatarStatuses(users) {
        const byNick = new Map((users || []).map(u => [u.name.toLowerCase(), u]));
        document.querySelectorAll('#ichc-pm-avatars [data-nick]').forEach(item => {
            const key = (item.dataset.nick || '').toLowerCase();
            const u = byNick.get(key);
            let status = 'offline';
            if (u) { status = u.cammed ? 'broadcasting' : u.idle ? 'idle' : 'online'; }
            const dot = item.querySelector('.ichc-pm-status-dot');
            if (dot) { dot.className = `ichc-pm-status-dot ichc-pm-status-${status}`; }
        });
    }

    function _updateSidebarStats(panel, cammedCount, viewerCount) {
        let el = document.getElementById('ichc-sidebar-stats');
        if (!el) {
            el = document.createElement('div');
            el.id = 'ichc-sidebar-stats';
        }
        el.innerHTML =
            `<span class="ichc-sidebar-stat">${ICONS.broadcast}<span class="ichc-sidebar-stat-value">${cammedCount}</span></span>` +
            `<span class="ichc-sidebar-stat">${ICONS.eye}<span class="ichc-sidebar-stat-value">${viewerCount}</span></span>`;
        const pmAv = document.getElementById('ichc-pm-avatars');
        if (pmAv && panel.contains(pmAv)) {
            pmAv.insertAdjacentElement('afterend', el);
        } else {
            panel.appendChild(el);
        }
    }

    function _syncSidebarUnread() {
        const hasUnread = !!document.querySelector('#ichc-pm-avatars .ichc-pm-avatar-unread');
        if (hasUnread) {
            _startSidebarPulse();
        } else {
            _stopSidebarPulse();
            const pmBtn = document.getElementById('ichc-pm-toggle-btn');
            if (pmBtn) {
                pmBtn.dataset.pmUnread = '0';
                pmBtn.classList.remove('ichc-pm-toggle-alert');
                pmBtn.title = pmBtn.classList.contains('ichc-pm-open') ? 'Pop in PM' : 'Pop out PM';
                const pmBadge = pmBtn.querySelector('.ichc-pm-toggle-badge');
                if (pmBadge) { pmBadge.hidden = true; pmBadge.textContent = ''; }
            }
        }
    }

    function setPmAvatarBadge(nick, count) {
        const item = _pmAvNode(nick);
        if (!item) { return; }
        item.classList.add('ichc-pm-avatar-unread');
        const b = item.querySelector('.ichc-pm-avatar-badge');
        if (b) {
            b.textContent = count > 0 ? String(count) : '';
            b.style.setProperty('display', 'block', 'important');
        }
        _syncSidebarUnread();
    }

    function _clearPmAvatarBadge(nick) {
        const item = _pmAvNode(nick);
        if (!item) { return; }
        item.classList.remove('ichc-pm-avatar-unread');
        const b = item.querySelector('.ichc-pm-avatar-badge');
        if (b) {
            b.textContent = '';
            b.style.setProperty('display', 'none', 'important');
        }
        _syncSidebarUnread();
    }

    function _pulsePmAttention(nick) {
        const item = nick ? _pmAvNode(nick) : null;
        if (item) {
            item.classList.remove('ichc-pm-avatar-attention');
            void item.offsetWidth;
            item.classList.add('ichc-pm-avatar-attention');
            window.setTimeout(() => item.classList.remove('ichc-pm-avatar-attention'), 4200);
        }
        const pmBtn = document.getElementById('ichc-pm-toggle-btn');
        if (pmBtn) {
            pmBtn.classList.remove('ichc-pm-toggle-attention');
            void pmBtn.offsetWidth;
            pmBtn.classList.add('ichc-pm-toggle-attention');
            window.setTimeout(() => pmBtn.classList.remove('ichc-pm-toggle-attention'), 4200);
        }
    }

    function _setMentionIndicator(active, detail = null) {
        const moreBtn = document.querySelector('.ichc-ul-more-btn');
        const inputRow = document.getElementById('ichc-input-row');
        if (moreBtn) {
            moreBtn.classList.toggle('ichc-has-mention', !!active);
            if (active) {
                moreBtn.title = detail?.text ? `Mentioned: ${detail.text}` : 'You were mentioned';
            } else if (moreBtn.classList.contains('ichc-menu-open')) {
                moreBtn.title = 'Close options';
            } else {
                moreBtn.title = 'More options';
            }
        }
        if (inputRow) { inputRow.classList.toggle('ichc-has-mention', !!active); }
    }

    // ── Mention / PM ping ─────────────────────────────────────────────────────
    // Two states only: off, or this ping. The previous version tried to reuse the
    // site's own audio and accepted *any* <audio> element on the page (its scoring
    // filter let a score of 0 through), so the alert was whatever clip happened to be
    // loaded — which is why it sounded like a UI click and bore no relation to the
    // event. Synthesised instead: nothing to fetch, no dependency on site markup, and
    // it cannot drift into playing the wrong clip.
    //
    // The sound is a rising two-note bell (A5 → D6, ~90 ms apart), each note a sine
    // with a quiet octave partial and a 0.38 s exponential decay. Short and clearly a
    // notification rather than a click. Built in the page's main world so the
    // AudioContext inherits the page's user activation.
    const PING_KEY = 'ichc_ping_sound';
    function _pingEnabled() {
        try { return localStorage.getItem(PING_KEY) !== 'off'; } catch (_) { return true; }
    }
    function _setPingEnabled(on) {
        try { localStorage.setItem(PING_KEY, on ? 'on' : 'off'); } catch (_) {}
    }

    let _pingLast = 0;
    // `force` bypasses both the toggle and the throttle — used to preview the sound
    // when the user switches it on, so "does it work" is answered immediately.
    function _playPing(force) {
        if (!force && !_pingEnabled()) { return; }
        const now = Date.now();
        if (!force && now - _pingLast < 1200) { return; }   // collapse bursts
        _pingLast = now;
        runInPageContext(`
(() => {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) { return; }
        const ctx = window.__ichcPingCtx || (window.__ichcPingCtx = new Ctx());
        if (ctx.state === 'suspended') { ctx.resume().catch(() => {}); }
        const t0 = ctx.currentTime + 0.01;
        const out = ctx.createGain();
        out.gain.value = 0.9;
        out.connect(ctx.destination);
        [[880, 0], [1174.66, 0.085]].forEach(pair => {
            const base = pair[0], delay = pair[1];
            [[base, 0.17], [base * 2, 0.05]].forEach(part => {
                const freq = part[0], peak = part[1];
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                const s = t0 + delay;
                g.gain.setValueAtTime(0.0001, s);
                g.gain.exponentialRampToValueAtTime(peak, s + 0.012);
                g.gain.exponentialRampToValueAtTime(0.0001, s + 0.38);
                osc.connect(g).connect(out);
                osc.start(s);
                osc.stop(s + 0.42);
            });
        });
    } catch (_) {}
})();
        `);
    }

    function _injectPmAvStyles() {
        if (document.getElementById('ichc-pm-av-styles')) { return; }
        const s = document.createElement('style');
        s.id = 'ichc-pm-av-styles';
        s.textContent = '/* ichc pm avatar styles placeholder */';
        (document.head || document.documentElement).appendChild(s);
    }

    function _isPmTabFocused(nick) {
        if (!nick || typeof nick !== 'string') { return false; }
        const pmRoot = document.getElementById('tabs');
        if (!pmRoot || getComputedStyle(pmRoot).display === 'none') { return false; }
        const tabEl = pmRoot.querySelector(`#pm_${CSS.escape(nick.trim())}`);
        return !!(tabEl && (tabEl.classList.contains('ui-tabs-active') || tabEl.classList.contains('ui-state-active')));
    }

    function _startSidebarPulse() {
        // PM moved out of sidebar — mark the more-btn as having unread PMs
        const moreBtn = document.querySelector('.ichc-ul-more-btn');
        if (moreBtn) { moreBtn.classList.add('ichc-has-pm-unread'); }
    }

    function _stopSidebarPulse() {
        const moreBtn = document.querySelector('.ichc-ul-more-btn');
        if (moreBtn) { moreBtn.classList.remove('ichc-has-pm-unread'); }
    }

    let _pmAvObsDone = false;
    function initPmAvatarObserver() {
        if (_pmAvObsDone) { return; }
        _pmAvObsDone = true;
        _injectPmAvStyles();

        // ichc-pm-alert fires for every incoming PM unconditionally — use this
        // instead of watching ichc-pm-tab-unread, which never gets added because
        // handleIncomingPmMessage calls openPmForNick first (which activates the tab).
        window.addEventListener('ichc-pm-alert', e => {
            const nick = e.detail?.nick;
            if (!nick) { return; }
            ensurePmAvatarItem(nick, null);
            _pulsePmAttention(nick);
            if (_isPmTabFocused(nick)) { return; }
            // Same ping as an @mention, and only when the PM's tab is not focused —
            // no point announcing a message you are already looking at.
            _playPing();
            const item = _pmAvNode(nick);
            if (!item) { return; }
            const b = item.querySelector('.ichc-pm-avatar-badge');
            const prev = b ? (parseInt(b.textContent) || 0) : 0;
            setPmAvatarBadge(nick, prev + 1);
        });

        // PM tab closed via X — remove avatar and recompute sidebar unread count.
        window.addEventListener('ichc-pm-tab-closed', e => {
            const nick = e.detail?.nick;
            if (!nick) { return; }
            _pmAvNode(nick)?.remove();
            const remaining = [...document.querySelectorAll('#ichc-pm-avatars [data-nick]')]
                .reduce((sum, item) => {
                    const b = item.querySelector('.ichc-pm-avatar-badge');
                    return sum + (b && !b.hidden ? (parseInt(b.textContent) || 0) : 0);
                }, 0);
            const pmBtn = document.getElementById('ichc-pm-toggle-btn');
            const pmBadge = pmBtn?.querySelector('.ichc-pm-toggle-badge');
            const remainingAvatars = document.querySelectorAll('#ichc-pm-avatars [data-nick]').length;
            if (remaining === 0) {
                if (pmBtn) {
                    pmBtn.dataset.pmUnread = '0';
                    pmBtn.classList.remove('ichc-pm-toggle-alert');
                }
                if (pmBadge) { pmBadge.hidden = true; pmBadge.textContent = ''; }
                _stopSidebarPulse();
            } else if (pmBtn && pmBadge) {
                pmBtn.dataset.pmUnread = String(remaining);
                pmBadge.textContent = remaining > 9 ? '9+' : String(remaining);
            }
            if (remainingAvatars === 0 && pmBtn) {
                pmBtn.classList.remove('ichc-pm-open');
                pmBtn.title = 'Pop out PM';
            }
        });

        // Ensure avatar exists when a PM window opens.
        // Only clear the badge if the user explicitly opened the PM (forceShow = true).
        window.addEventListener('ichc-pm-open', e => {
            const nick = e.detail?.nick;
            if (nick) {
                ensurePmAvatarItem(nick, e.detail?.color || null);
                if (e.detail?.forceShow) { _clearPmAvatarBadge(nick); }
            }
        });

        // Active PM conversation changed — mark corresponding avatar as active.
        window.addEventListener('ichc-pm-active', e => {
            const activeNick = (e.detail?.nick || '').toLowerCase();
            document.querySelectorAll('#ichc-pm-avatars [data-nick]').forEach(item => {
                item.classList.toggle('ichc-pm-avatar-active', (item.dataset.nick || '').toLowerCase() === activeNick);
            });
        });

        // PM toggle button clicked — clear all avatar badges.
        window.addEventListener('ichc-pm-user-toggle', () => {
            document.querySelectorAll('#ichc-pm-avatars [data-nick]').forEach(item => {
                const nick = item.dataset.nick;
                if (nick) { _clearPmAvatarBadge(nick); }
            });
        });

        // Clicking the empty background of the strip opens the PM window.
        document.addEventListener('click', e => {
            const strip = document.getElementById('ichc-pm-avatars');
            if (!strip || e.target !== strip) { return; }
            const pmBtn = document.getElementById('ichc-pm-toggle-btn');
            if (pmBtn && pmBtn.classList.contains('ichc-pm-open')) { return; }
            // No active PM: open the most-recently-active tab, or just toggle.
            const activeItem = strip.querySelector('.ichc-pm-avatar-active[data-nick]');
            const firstItem = strip.querySelector('[data-nick]');
            const targetNick = (activeItem || firstItem)?.dataset?.nick;
            if (targetNick) {
                window.dispatchEvent(new CustomEvent('ichc-pm-open', { detail: { nick: targetNick, forceShow: true } }));
                window.dispatchEvent(new CustomEvent('ichc-pm-active', { detail: { nick: targetNick } }));
            } else {
                window.dispatchEvent(new CustomEvent('ichc-pm-user-toggle'));
            }
        }, true);

        window.addEventListener('ichc-mention-alert', e => {
            _setMentionIndicator(true, e.detail || null);
            _playPing();
        });
        document.addEventListener('focusin', e => {
            if (e.target?.id === 'txtMsg') { _setMentionIndicator(false); }
        }, true);
        document.addEventListener('click', e => {
            if (e.target?.closest?.('#txt, #chat_container, #ichc-input-row')) {
                _setMentionIndicator(false);
            }
        }, true);

        // Watch #tab_list for tabs being added or removed.
        let _tabListObs = null;
        function connect(tabList) {
            _tabListObs?.disconnect();
            for (const tab of tabList.querySelectorAll('li[id^="pm_"]')) {
                ensurePmAvatarItem(tab.id.slice(3), null);
            }
            _tabListObs = new MutationObserver(muts => {
                for (const m of muts) {
                    if (m.type !== 'childList') { continue; }
                    for (const n of m.removedNodes) {
                        if (n.nodeType === 1 && n.id.startsWith('pm_')) {
                            _pmAvNode(n.id.slice(3))?.remove();
                            _syncSidebarUnread();
                        }
                    }
                    for (const n of m.addedNodes) {
                        if (n.nodeType === 1 && n.id.startsWith('pm_')) {
                            ensurePmAvatarItem(n.id.slice(3), null);
                        }
                    }
                }
            });
            _tabListObs.observe(tabList, { childList: true });
        }

        const tabList = document.getElementById('tab_list');
        if (tabList) {
            connect(tabList);
        } else {
            const wait = new MutationObserver(() => {
                const tl = document.getElementById('tab_list');
                if (tl) { wait.disconnect(); connect(tl); }
            });
            wait.observe(document.body, { childList: true, subtree: true });
        }

        window.addEventListener('pagehide', () => {
            _stopSidebarPulse();
            _tabListObs?.disconnect();
        }, { once: true });
    }

    function debounce(fn, wait) {
        let timeoutId = null;
        return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => fn(...args), wait);
        };
    }

    function isCamRelayoutSuppressed() {
        return Date.now() < camLayoutState.suppressUntil;
    }

    function suppressCamRelayout(ms = 260) {
        camLayoutState.suppressUntil = Math.max(camLayoutState.suppressUntil, Date.now() + ms);
    }

    function requestCamRelayout(delay = 90) {
        window.clearTimeout(camLayoutState.timer);
        camLayoutState.timer = window.setTimeout(() => {
            suppressCamRelayout(280);
            // Re-attach cam layout observer if #cams was replaced by the site
            // (e.g. after a native cam refresh that swaps the whole container).
            const cams = document.getElementById('cams');
            if (cams && !cams.dataset.ichcCamLayout) {
                initCamLayout();
                initUserList();
            }
            syncCamCards();
            scheduleUserListBuild(120);
            layoutChat();
        }, delay);
    }

    function loadStoredSideWidth() {
        const value = Number(localStorage.getItem(SIDE_WIDTH_KEY) || '');
        return Number.isFinite(value) && value >= 320 ? value : null;
    }

    function saveStoredSideWidth(value) {
        if (Number.isFinite(value) && value >= 320) {
            localStorage.setItem(SIDE_WIDTH_KEY, String(Math.round(value)));
        } else {
            localStorage.removeItem(SIDE_WIDTH_KEY);
        }
    }

    function loadStoredUlWidth() {
        const value = Number(localStorage.getItem(UL_WIDTH_KEY) || '');
        return Number.isFinite(value) && value >= 120 ? value : null;
    }

    function saveStoredUlWidth(value) {
        if (Number.isFinite(value) && value >= 120) {
            localStorage.setItem(UL_WIDTH_KEY, String(Math.round(value)));
        } else {
            localStorage.removeItem(UL_WIDTH_KEY);
        }
    }

    function loadBlockedUsers() {
        try {
            const value = JSON.parse(localStorage.getItem('ichc_blocked') || '[]');
            return new Set(Array.isArray(value) ? value.map(name => String(name).toLowerCase()) : []);
        } catch (_) {
            return new Set();
        }
    }

    function _evictOldProfileCache(maxKeys = 60) {
        const prefixes = [_AV_LS, _BG_LS, _KM_LS, _YB_LS, _JT_LS, _TR_LS, _BI_LS, _GS_LS];
        try {
            const matching = Object.keys(localStorage)
                .filter(k => prefixes.some(p => k.startsWith(p)));
            matching.slice(0, maxKeys).forEach(k => { try { localStorage.removeItem(k); } catch (_) {} });
        } catch (_) {}
    }

    // Startup housekeeping so the profile caches can never fill localStorage (which
    // makes the site's OWN writes fail — a likely broadcast-state culprit):
    //   1. Delete orphaned keys from earlier cache versions (av1–av6, yb1–yb2, …).
    //   2. Cap the total current-cache entries, evicting the oldest by timestamp.
    const _PROFILE_PREFIXES = [_AV_LS, _KM_LS, _YB_LS, _GS_LS, _BG_LS, _JT_LS, _TR_LS, _BI_LS];
    const _PROFILE_FAMILY_RE = /^ichc_(av|km|yb|gs|bg|jt|tr|bi)\d*_/;
    const _PROFILE_CACHE_MAX = 1500;
    function _pruneProfileCaches() {
        try {
            let keys = Object.keys(localStorage);
            // 1. Drop orphaned old-version keys (match the family shape but not a live prefix).
            let orphans = 0;
            keys.forEach(k => {
                if (_PROFILE_FAMILY_RE.test(k) && !_PROFILE_PREFIXES.some(p => k.startsWith(p))) {
                    try { localStorage.removeItem(k); orphans++; } catch (_) {}
                }
            });
            // 2. Cap current-version entries by count, oldest ts first.
            const current = Object.keys(localStorage).filter(k => _PROFILE_PREFIXES.some(p => k.startsWith(p)));
            if (current.length > _PROFILE_CACHE_MAX) {
                const withTs = current.map(k => {
                    let ts = 0;
                    try { ts = (JSON.parse(localStorage.getItem(k) || '{}').ts) || 0; } catch (_) {}
                    return [k, ts];
                }).sort((a, b) => a[1] - b[1]);
                withTs.slice(0, current.length - _PROFILE_CACHE_MAX).forEach(([k]) => { try { localStorage.removeItem(k); } catch (_) {} });
            }
            if (orphans) { console.log('[ichc] pruned ' + orphans + ' orphaned profile-cache keys'); }
        } catch (_) {}
    }

    function saveBlockedUsers(set) {
        const data = JSON.stringify([...set]);
        try {
            localStorage.setItem('ichc_blocked', data);
        } catch (e) {
            if (e?.name === 'QuotaExceededError' || e?.code === 22 || e?.code === 1014) {
                _evictOldProfileCache(60);
                try { localStorage.setItem('ichc_blocked', data); } catch (_) {}
            }
        }
    }

    function getLiveCamEntries() {
        return [...document.querySelectorAll('#cams .videocontainer[id]')]
            .map(container => {
                const camId = container.id.replace(/^id-/, '');
                const name = document.getElementById('name-' + camId)?.textContent.trim() ||
                    container.closest('.rounded_square')?.querySelector('.name-on-cam')?.textContent.trim() ||
                    '';

                return {
                    camId,
                    name,
                    container,
                    card: container.closest('.rounded_square'),
                };
            })
            .filter(entry =>
                entry.camId &&
                entry.name &&
                !looksLikePlaceholderName(entry.name) &&
                !entry.card?.classList.contains('ichc-ghost-slot'),
            );
    }

    // Focus never survives hiding. A hidden card still matches the stored focus
    // key, so the focus slot stays held by something invisible and the cam pops
    // back at focus size the moment it is unhidden — hiding and unhiding a user
    // must not change which cam is focused. Every hide/reveal path drops the key
    // when this card owns it.
    function clearFeaturedCamForCard(card) {
        if (!card) { return; }
        const featured = (localStorage.getItem(FEATURED_KEY) || '').trim().toLowerCase();
        if (!featured) { return; }
        // Cards are keyed by camId, but a card with no camId falls back to its
        // name — check both, plus whatever the last layout pass stamped.
        const keys = [
            (card.dataset?.ichcCam || '').toLowerCase(),
            getCardKey(card).toLowerCase(),
            getCardName(card).trim().toLowerCase(),
        ].filter(Boolean);
        if (!keys.includes(featured)) { return; }
        localStorage.removeItem(FEATURED_KEY);
        _featuredWasFound = false;
    }

    function clearFeaturedCamForUser(username) {
        const key = (username || '').trim().toLowerCase();
        if (!key) { return; }
        document.querySelectorAll('#cams .rounded_square').forEach(card => {
            if (getCardName(card).trim().toLowerCase() === key) { clearFeaturedCamForCard(card); }
        });
    }

    function setBlockedStateForCard(card, shouldBlock) {
        const name = getCardName(card).trim();
        if (!name || looksLikePlaceholderName(name)) { return ''; }

        const blocked = loadBlockedUsers();
        if (shouldBlock) {
            blocked.add(name.toLowerCase());
            clearFeaturedCamForCard(card);
        } else {
            blocked.delete(name.toLowerCase());
        }
        saveBlockedUsers(blocked);
        return name;
    }

    function isCardBlockedByPrefs(card) {
        const name = getCardName(card).trim().toLowerCase();
        if (!name || looksLikePlaceholderName(name)) { return false; }
        return loadBlockedUsers().has(name);
    }

    function getPersistHiddenCardName(card) {
        const name = getCardName(card).trim();
        if (!name || looksLikePlaceholderName(name)) { return ''; }
        const blocked = loadBlockedUsers();
        return blocked.has(name.toLowerCase()) ? name : '';
    }

    function revealBlockedUser(username, options = {}) {
        const key = (username || '').trim().toLowerCase();
        if (!key) { return; }

        const blocked = loadBlockedUsers();
        blocked.delete(key);
        saveBlockedUsers(blocked);

        document.querySelectorAll('#cams .videocontainer').forEach(vc => {
            const camId = vc.id.replace(/^id-/, '');
            const name = document.getElementById('name-' + camId)?.textContent.trim().toLowerCase();
            if (name === key) {
                vc.style.removeProperty('display');
                // Reset ghost-aging timestamp so prepareCamCard doesn't immediately
                // re-classify the card as ichc-ghost-slot before media loads.
                const card = vc.closest('.rounded_square');
                if (card) { delete card.dataset.ichcFirstSeenAt; }
                // Unhiding restores the cam, not the focus. Without this, a focus
                // key left pointing at this cam (set before it was hidden, and
                // never cleared because the hidden card still matched it) makes
                // every reveal come back fullscreen.
                clearFeaturedCamForCard(card);
                // Click the site's RETRY control so the stream reconnects — and
                // nothing else. This used to go through
                // getNativeCamToggleControl(), which returns the first element in
                // document order matching a deliberately broad selector list
                // (`.cam-button`, `[id^="cambtn"]`, …) and whose label heuristic
                // calls ANY bare `cambtn1-<id>` a "Start". The only control we
                // have actually verified restarts a feed is `cambtn1-<id>-retry`
                // (the cam-refresh path clicks exactly that); a bare
                // `cambtn1-<id>` / `.cam-button` is a different site control, so
                // revealing a cam was firing an unidentified native button.
                window.setTimeout(() => {
                    const scope = card || vc;
                    const retryBtn = scope.querySelector('[id^="cambtn1-"][id$="-retry"]')
                        || scope.querySelector('[id$="-retry"]');
                    if (retryBtn) { invokeNativeElementAction(retryBtn); }
                }, 80);
            }
        });

        if (options.rerender !== false) {
            syncCamCards();
            buildHiddenCamManager();
            buildUserList();
            layoutChat();
        }
    }

    // Hide a broadcasting user's cam from the user list eye toggle. Mirrors the
    // per-card "disable/stop" path: block the name and hide its videocontainer.
    function hideUserCam(username) {
        const key = (username || '').trim().toLowerCase();
        if (!key) { return; }
        let card = null;
        document.querySelectorAll('#cams .videocontainer').forEach(vc => {
            const camId = vc.id.replace(/^id-/, '');
            const name = document.getElementById('name-' + camId)?.textContent.trim().toLowerCase();
            if (name === key) {
                vc.style.setProperty('display', 'none', 'important');
                card = vc.closest('.rounded_square') || card;
            }
        });
        if (card) {
            setBlockedStateForCard(card, true);
        } else {
            const blocked = loadBlockedUsers();
            blocked.add(key);
            saveBlockedUsers(blocked);
        }
        syncCamCards();
        buildHiddenCamManager();
        buildUserList();
        layoutChat();
    }

    // Automatic new-cam list refresh remains disabled. The polling protocol can
    // emit [c+] during list rebuilds, so answering it with /cam refresh creates a
    // feedback loop. Manual list refresh and inactivity auto-restart are handled
    // separately below.

    const camDiagnosticState = {
        rows: [],
        wsEvents: [],
        httpEvents: [],
        camEvents: [],
        nativeActionInspections: [],
        relaySessions: [],
        controlPlaneFindings: [],
        controlEndpointFindings: [],
        commandEffects: [],
        functionInspections: [],
        streamInventory: [],
        listening: false,
        httpListening: false,
        running: false,
    };
    const CAM_RELAY_TARGETS_KEY = 'ichc_cam_relay_targets_v1';

    function installCamDiagnostics() {
        if (window.__ichcCamDiagnosticsInstalled) { return; }
        window.__ichcCamDiagnosticsInstalled = true;
        installNativeActionInspector();

        window.addEventListener('message', event => {
            if (event.source !== window || event.data?.type !== 'ichc-cam-ws-event') { return; }
            const detail = event.data.detail || {};
            camDiagnosticState.wsEvents.push({
                time: new Date().toLocaleTimeString(),
                phase: detail.phase || 'event',
                url: detail.url || '',
                info: detail.info || '',
                meta: detail.meta || null,
            });
            recordRelaySession(detail);
            if (camDiagnosticState.wsEvents.length > 50) {
                camDiagnosticState.wsEvents.splice(0, camDiagnosticState.wsEvents.length - 50);
            }
            renderCamDiagnostics();
        });

        window.addEventListener('message', event => {
            if (event.source !== window || event.data?.type !== 'ichc-control-http-event') { return; }
            const detail = event.data.detail || {};
            const httpEvent = {
                time: new Date().toLocaleTimeString(),
                transport: detail.transport || '',
                method: detail.method || '',
                url: detail.url || '',
                body: detail.body || '',
                status: detail.status || '',
                response: detail.response || '',
                stackHint: detail.stackHint || '',
            };
            camDiagnosticState.httpEvents.push(httpEvent);
            recordIChcCommandEffect(httpEvent);
            if (camDiagnosticState.httpEvents.length > 60) {
                camDiagnosticState.httpEvents.splice(0, camDiagnosticState.httpEvents.length - 60);
            }
            renderCamDiagnostics();
        });

        window.addEventListener('message', event => {
            if (event.source !== window || event.data?.type !== 'ichc-control-function-inspect-result') { return; }
            const detail = event.data.detail || {};
            recordControlFunctionInspection(detail);
        });

        // Keep the WebSocket watcher opt-in; replacing window.WebSocket during normal browsing can interfere with live chat/cam updates.
    }

    function installNativeActionInspector() {
        if (window.__ichcNativeActionInspectorInstalled) { return; }
        window.__ichcNativeActionInspectorInstalled = true;

        window.ichcInspectDelegatedCamControl = function(nick) {
            const name = nick || firstBroadcastingNick();
            if (!name) {
                console.warn('[ichc native actions] no broadcasting nick found to inspect');
                return Promise.resolve(null);
            }
            return inspectNativeActionsForNick(name).then(report => {
                console.group('[ichc native actions] ' + name);
                console.table(report?.actions || []);
                console.log(report);
                console.groupEnd();
                return report;
            });
        };
        window.ichcInspectDelegatedUserControls = window.ichcInspectDelegatedCamControl;

        window.addEventListener('message', event => {
            if (event.source !== window || event.data?.type !== 'ichc-native-action-inspect-result') { return; }
            const detail = event.data.detail || {};
            recordNativeActionInspection(detail);
        });

        runInPageContext(`
(() => {
    if (window.ichcInspectDelegatedCamControl) { return; }
    window.ichcInspectDelegatedCamControl = function(nick) {
        window.postMessage({ type: 'ichc-native-action-inspect-request', nick: nick || '' }, '*');
        return 'Inspecting native actions for ' + (nick || 'first live cam') + '; result appears in the extension diagnostics panel.';
    };
    window.ichcInspectDelegatedUserControls = window.ichcInspectDelegatedCamControl;
})();
        `);

        window.addEventListener('message', event => {
            if (event.source !== window || event.data?.type !== 'ichc-native-action-inspect-request') { return; }
            inspectNativeActionsForNick(event.data.nick || firstBroadcastingNick());
        });
    }

    function firstBroadcastingNick() {
        const camName = document.querySelector('#cams .name-on-cam, #cams [id^="name-"]')?.textContent?.trim();
        if (camName) { return camName; }
        const user = buildUserListData?.().find(u => u.cammed);
        return user?.name || '';
    }

    function inspectNativeActionsForNick(nick) {
        const name = (nick || '').trim();
        if (!name) { return Promise.resolve(null); }

        return new Promise(resolve => {
            const token = 'ichc-inspect-' + Date.now() + '-' + Math.random().toString(36).slice(2);
            const done = (report, shouldRecord) => {
                window.removeEventListener('message', onMessage);
                window.clearTimeout(timeout);
                if (shouldRecord) { recordNativeActionInspection(report); }
                resolve(report);
            };
            const timeout = window.setTimeout(() => done({
                nick: name,
                status: 'timeout',
                actions: [],
                error: 'Timed out waiting for native profile dialog inspection',
                time: Date.now(),
            }, true), 2500);
            const onMessage = event => {
                if (event.source !== window || event.data?.type !== 'ichc-native-action-inspect-result') { return; }
                const detail = event.data.detail || {};
                if (detail.token !== token) { return; }
                done(detail, false);
            };
            window.addEventListener('message', onMessage);

            runInPageContext(`(function() {
                var token = ${JSON.stringify(token)};
                var nick = ${JSON.stringify(name)};
                function emit(detail) {
                    detail.token = token;
                    detail.nick = nick;
                    detail.time = Date.now();
                    window.postMessage({ type: 'ichc-native-action-inspect-result', detail: detail }, '*');
                }
                function clean() {
                    var s = document.getElementById('ichc-inspect-native-action-style');
                    if (s) { s.remove(); }
                    try {
                        if (typeof $ !== 'undefined') {
                            $('.ui-dialog').each(function() { try { $(this).dialog('close'); } catch(_) {} });
                        }
                    } catch(_) {}
                }
                try {
                    var link = Array.from(document.querySelectorAll('#activeUserList a.userlink'))
                        .find(function(a) { return (a.textContent || '').trim().toLowerCase() === nick.toLowerCase(); });
                    if (!link) {
                        emit({ status: 'missing-userlink', actions: [], error: 'No active user-list link found for nick' });
                        return;
                    }
                    var tmp = document.createElement('style');
                    tmp.id = 'ichc-inspect-native-action-style';
                    tmp.textContent = '.ui-dialog { opacity:0 !important; pointer-events:none !important; }';
                    document.head.appendChild(tmp);
                    link.click();
                    setTimeout(function() {
                        var dialogs = Array.from(document.querySelectorAll('.ui-dialog'));
                        var actions = [];
                        dialogs.forEach(function(d, dialogIndex) {
                            Array.from(d.querySelectorAll('a,button,input[type=submit],input[type=button]')).forEach(function(el, actionIndex) {
                                var label = (el.textContent || el.value || el.title || el.getAttribute('aria-label') || '').replace(/\\s+/g, ' ').trim();
                                var href = el.getAttribute('href') || '';
                                var onclick = el.getAttribute('onclick') || '';
                                var form = el.closest('form');
                                var haystack = [label, href, onclick, el.id, el.className, el.getAttribute('name') || ''].join(' ');
                                var commandMatch = haystack.match(/send_command\\((['"])(.*?)\\1\\)/);
                                var nativeCommand = commandMatch ? commandMatch[2] : '';
                                actions.push({
                                    dialogIndex: dialogIndex,
                                    actionIndex: actionIndex,
                                    tag: el.tagName.toLowerCase(),
                                    type: el.getAttribute('type') || '',
                                    label: label,
                                    id: el.id || '',
                                    className: typeof el.className === 'string' ? el.className : '',
                                    name: el.getAttribute('name') || '',
                                    href: href,
                                    onclick: onclick ? onclick.slice(0, 500) : '',
                                    nativeCommand: nativeCommand,
                                    formAction: form ? (form.getAttribute('action') || '') : '',
                                    formMethod: form ? (form.getAttribute('method') || '') : '',
                                    likelyCamControl: /(^|\\W)(cam|broadcast|stream)(\\W|$)|cam\\s+(down|refuse)|block their viewing of cams/i.test(haystack),
                                    likelyRoomRemovalControl: /kick|room\\s*ban|startRoomBan|\\/(kick|ban)\\b|boot|remove|eject|disconnect/i.test(haystack),
                                    likelyRoomRestrictionControl: /silence|muzzle|mute|timeout|suspend|\\/silence!?\\b|\\/muzzle\\b/i.test(haystack),
                                    likelyRoomRoleControl: /make them a room mod|\\/oper\\b|room mod/i.test(haystack)
                                });
                            });
                        });
                        clean();
                        emit({
                            status: dialogs.length ? 'ok' : 'no-dialog',
                            dialogs: dialogs.length,
                            actions: actions,
                            camActions: actions.filter(function(a) { return a.likelyCamControl; }),
                            roomRemovalActions: actions.filter(function(a) { return a.likelyRoomRemovalControl; }),
                            roomRestrictionActions: actions.filter(function(a) { return a.likelyRoomRestrictionControl; }),
                            roomRoleActions: actions.filter(function(a) { return a.likelyRoomRoleControl; })
                        });
                    }, 450);
                } catch (error) {
                    clean();
                    emit({ status: 'error', actions: [], error: error && (error.stack || error.message) || String(error) });
                }
            })();`);
        });
    }

    function recordNativeActionInspection(report) {
        if (!report) { return; }
        camDiagnosticState.nativeActionInspections.push({
            time: new Date(report.time || Date.now()).toLocaleTimeString(),
            nick: report.nick || '',
            status: report.status || '',
            dialogs: report.dialogs || 0,
            actions: Array.isArray(report.actions) ? report.actions : [],
            camActions: Array.isArray(report.camActions) ? report.camActions : [],
            roomRemovalActions: Array.isArray(report.roomRemovalActions) ? report.roomRemovalActions : [],
            roomRestrictionActions: Array.isArray(report.roomRestrictionActions) ? report.roomRestrictionActions : [],
            roomRoleActions: Array.isArray(report.roomRoleActions) ? report.roomRoleActions : [],
            error: report.error || '',
        });
        if (camDiagnosticState.nativeActionInspections.length > 20) {
            camDiagnosticState.nativeActionInspections.splice(0, camDiagnosticState.nativeActionInspections.length - 20);
        }
        renderCamDiagnostics();
    }

    function recordIChcCommandEffect(event) {
        if (!event || !/chat\.aspx\/SendMessage/i.test(event.url || '') || !event.response) { return; }
        const command = extractSendMessageCommand(event.body);
        const commandMeta = parseIChcCommand(command);
        const parsed = parseIChcSendMessageResponse(event.response);
        if (!command && !parsed.packets.length) { return; }
        parsed.packets.forEach(packet => {
            if (!packet.nick && commandMeta.target && /^(cam-removed|silenced-user|moderation-log|direct-message)$/i.test(packet.type || '')) {
                packet.nick = commandMeta.target;
            }
        });
        const outcome = classifyIChcCommandOutcome(parsed.packets, event.status, commandMeta);
        camDiagnosticState.commandEffects.push({
            time: event.time || new Date().toLocaleTimeString(),
            command,
            commandType: commandMeta.type,
            commandSubcommand: commandMeta.subcommand,
            commandTarget: commandMeta.target,
            commandDuration: commandMeta.duration,
            commandReason: commandMeta.reason,
            commandIssue: commandMeta.issue,
            status: event.status || '',
            outcome,
            packets: parsed.packets,
            summary: summarizeIChcCommandEffect(commandMeta, parsed.packets, parsed.summary),
            response: event.response || '',
        });
        if (camDiagnosticState.commandEffects.length > 40) {
            camDiagnosticState.commandEffects.splice(0, camDiagnosticState.commandEffects.length - 40);
        }
    }

    function extractSendMessageCommand(body) {
        try {
            const obj = JSON.parse(String(body || ''));
            return String(obj.msg || '').trim();
        } catch (_) {
            const match = String(body || '').match(/["']msg["']\s*:\s*["']([^"']+)/i);
            return match ? match[1] : '';
        }
    }

    function parseIChcCommand(command) {
        const text = String(command || '').trim();
        const match = text.match(/^\/(\S+)(?:\s+(.+))?$/);
        if (!match) { return { type: '', subcommand: '', target: '', duration: '', reason: '', issue: '', args: '' }; }
        const type = match[1] || '';
        const args = (match[2] || '').trim();
        const parts = args ? args.split(/\s+/) : [];
        let subcommand = '';
        let target = parts[0] || '';
        let duration = '';
        let reason = '';
        let issue = '';
        if (/^(cam|room)$/i.test(type) && parts.length > 1) {
            subcommand = parts[0] || '';
            target = parts[1] || '';
        }
        if (/^roomban$/i.test(type)) {
            if (/^\d+$/.test(parts[0] || '') && parts[1]) {
                duration = parts[0] || '';
                target = parts[1] || '';
                reason = parts.slice(2).join(' ');
                issue = 'roomban-argument-order';
            } else {
                duration = parts[1] || '';
                reason = parts.slice(2).join(' ');
            }
        }
        return { type, subcommand, target, duration, reason, issue, args };
    }

    function summarizeIChcCommandEffect(commandMeta, packets, fallback) {
        const target = commandMeta?.target ? `target=${commandMeta.target}` : '';
        const duration = commandMeta?.duration ? `duration=${commandMeta.duration}` : '';
        const reason = commandMeta?.reason ? `reason=${commandMeta.reason}` : '';
        const issue = commandMeta?.issue ? `issue=${commandMeta.issue}` : '';
        const type = commandMeta?.type ? `/${commandMeta.type}${commandMeta?.subcommand ? ' ' + commandMeta.subcommand : ''}` : '';
        const packetSummary = (packets || []).map(packet => packet.summary).filter(Boolean).join('; ');
        return [type, target, duration, reason, issue, packetSummary || fallback || 'empty response'].filter(Boolean).join(' · ');
    }

    function classifyIChcCommandOutcome(packets, status, commandMeta) {
        const text = (packets || []).map(packet => [packet.type, packet.summary, packet.text, packet.value].filter(Boolean).join(' ')).join(' ');
        if (/Y U NO MOD|only available to people that are currently modded up|not (?:a|currently) mod|permission|not allowed|denied/i.test(text)) {
            return 'permission-denied';
        }
        if (/failed|must record a reason|required|invalid|usage|try again|cannot|can't/i.test(text)) {
            return 'validation-failed';
        }
        if (commandMeta?.issue) { return 'validation-failed'; }
        if ((packets || []).some(packet => /cam-removed|cam-added|silenced-user|moderation-log|room-note|room-refresh/i.test(packet.type || ''))) {
            return 'accepted';
        }
        if (String(status || '') && !/^2/.test(String(status))) { return 'http-error'; }
        if (!(packets || []).length) { return 'empty'; }
        return 'observed';
    }

    function parseIChcSendMessageResponse(response) {
        let payload = '';
        try {
            const obj = JSON.parse(String(response || ''));
            payload = String(obj.d || '');
        } catch (_) {
            payload = String(response || '');
        }
        const packets = [];
        String(payload || '').split(/\n+/).forEach(line => {
            const match = line.match(/^\[([^\]]+)\](.*)$/);
            if (!match) { return; }
            const code = match[1];
            const data = match[2] || '';
            packets.push(describeIChcPacket(code, data));
        });
        return {
            packets,
            summary: packets.map(packet => packet.summary).filter(Boolean).join('; ') || (payload ? 'empty/unknown response payload' : 'empty response'),
        };
    }

    function describeIChcPacket(code, data) {
        const fields = String(data || '').split('|');
        if (code === 'cU') {
            const bits = fields[0].split('-');
            return {
                code,
                type: 'cam-allocation',
                streamName: bits[0] || '',
                applicationName: bits[1] || '',
                relayHost: bits[2] || '',
                slot: bits[3] || '',
                quality: bits[4] || '',
                resolution: bits[5] || '',
                summary: `cam allocation stream=${bits[0] || '?'} app=${bits[1] || '?'} host=${bits[2] || '?'} ${bits[5] || ''}`.trim(),
            };
        }
        if (code === 'c+' || code === 'c-') {
            const bits = fields[0].split('-');
            return {
                code,
                type: code === 'c+' ? 'cam-added' : 'cam-removed',
                streamName: bits[0] || '',
                applicationName: bits[1] || '',
                relayHost: bits[2] || '',
                nick: bits.slice(3).join('-') || '',
                summary: `${code === 'c+' ? 'cam added' : 'cam removed'} stream=${bits[0] || '?'} app=${bits[1] || '?'} host=${bits[2] || '?'} nick=${bits.slice(3).join('-') || '?'}`,
            };
        }
        if (code === 'n') {
            return {
                code,
                type: 'room-note',
                title: fields[0] || '',
                text: fields[1] || '',
                color: fields[3] || '',
                timeoutMs: fields[5] || '',
                summary: `note ${fields[0] || ''}: ${fields[1] || ''}`.trim(),
            };
        }
        if (code === 'msg') {
            return {
                code,
                type: 'direct-message',
                color: fields[0] || '',
                from: fields[1] || '',
                to: fields[2] || '',
                text: fields.slice(3).join('|') || '',
                summary: `direct message ${fields[1] || '?'} -> ${fields[2] || '?'}: ${fields.slice(3).join('|') || ''}`.trim(),
            };
        }
        if (code === 'mods') {
            return {
                code,
                type: 'moderation-log',
                color: fields[0] || '',
                nick: fields[1] || '',
                text: fields.slice(2).join('|') || '',
                summary: `moderation log ${fields[1] || '?'}: ${fields.slice(2).join('|') || ''}`.trim(),
            };
        }
        if (code === 'rsvp') {
            return {
                code,
                type: 'moderation-suggestion',
                text: data || '',
                summary: `suggestion ${data || ''}`.trim(),
            };
        }
        if (code === 's') {
            return {
                code,
                type: 'silenced-user',
                nick: data || '',
                summary: `silenced ${data || ''}`.trim(),
            };
        }
        if (code === 'r') {
            return {
                code,
                type: 'room-refresh',
                value: data || '',
                summary: `room refresh ${data || ''}`.trim(),
            };
        }
        return {
            code,
            type: 'unknown',
            value: data || '',
            summary: `[${code}] ${data || ''}`.trim(),
        };
    }

    function recordRelaySession(detail) {
        const meta = detail?.meta || {};
        const stream = meta.streamName || '';
        const direction = meta.direction || '';
        if (!stream && !direction && !meta.sessionId && !meta.command) { return; }
        const key = [
            detail.url || '',
            detail.phase || '',
            direction || '?',
            meta.command || '',
            meta.status || '',
            meta.applicationName || '',
            stream || '',
            meta.sessionId || '',
        ].join('|');
        let entry = camDiagnosticState.relaySessions.find(item => item.key === key);
        if (!entry) {
            entry = { key, firstSeen: new Date().toLocaleTimeString() };
            camDiagnosticState.relaySessions.push(entry);
        }
        Object.assign(entry, {
            lastSeen: new Date().toLocaleTimeString(),
            phase: detail.phase || '',
            url: detail.url || '',
            direction,
            command: meta.command || entry.command || '',
            status: meta.status || entry.status || '',
            statusDescription: meta.statusDescription || entry.statusDescription || '',
            applicationName: meta.applicationName || entry.applicationName || '',
            streamName: stream || entry.streamName || '',
            sessionId: meta.sessionId || entry.sessionId || '',
            candidateCount: meta.candidateCount ?? entry.candidateCount ?? null,
            candidateSummary: meta.candidateSummary || entry.candidateSummary || '',
            hasSdp: meta.hasSdp || entry.hasSdp || false,
        });
        rememberRelayTarget(entry.url, entry.applicationName);
        correlateRelaySession(entry);
        if (camDiagnosticState.relaySessions.length > 60) {
            camDiagnosticState.relaySessions.splice(0, camDiagnosticState.relaySessions.length - 60);
        }
        try { window.ichcRelaySessions = camDiagnosticState.relaySessions.slice(); } catch (_) {}
    }

    function rememberRelayTarget(url, applicationName) {
        const app = normalizeWowzaAppName(applicationName || '');
        if (!url || !app) { return; }
        try {
            const existing = loadRelayTargets();
            const key = url + '|' + app;
            const filtered = existing.filter(target => (target.url + '|' + target.applicationName) !== key);
            filtered.unshift({ url, applicationName: app, lastSeen: Date.now() });
            localStorage.setItem(CAM_RELAY_TARGETS_KEY, JSON.stringify(filtered.slice(0, 12)));
        } catch (_) {}
    }

    function loadRelayTargets() {
        try {
            const parsed = JSON.parse(localStorage.getItem(CAM_RELAY_TARGETS_KEY) || '[]');
            if (!Array.isArray(parsed)) { return []; }
            return parsed
                .map(target => ({
                    url: String(target?.url || ''),
                    applicationName: normalizeWowzaAppName(target?.applicationName || ''),
                    lastSeen: Number(target?.lastSeen || 0),
                    cached: true,
                }))
                .filter(target => target.url && target.applicationName);
        } catch (_) {
            return [];
        }
    }

    function correlateRelaySession(session) {
        if (!session || session.name) { return; }
        const endpoints = relaySessionEndpoints(session);
        if (!endpoints.size) { return; }
        const match = camDiagnosticState.camEvents
            .slice()
            .reverse()
            .find(event => event.name && event.name !== '(unknown)' && endpoints.has(event.server));
        if (match) {
            session.name = match.name;
            propagateRelaySessionName(session);
        }
    }

    function correlateRelaySessionsForCamEvent(event) {
        if (!event?.server || !event.name || event.name === '(unknown)') { return; }
        camDiagnosticState.relaySessions.forEach(session => {
            if (!session.name && relaySessionEndpoints(session).has(event.server)) {
                session.name = event.name;
                propagateRelaySessionName(session);
            }
        });
        try { window.ichcRelaySessions = camDiagnosticState.relaySessions.slice(); } catch (_) {}
    }

    function propagateRelaySessionName(source) {
        if (!source?.name || !source.streamName) { return; }
        camDiagnosticState.relaySessions.forEach(session => {
            if (session.name || session.streamName !== source.streamName) { return; }
            const sameUrl = !source.url || !session.url || source.url === session.url;
            const sameSession = !source.sessionId || !session.sessionId ||
                source.sessionId === session.sessionId ||
                session.sessionId === '[empty]';
            if (sameUrl && sameSession) { session.name = source.name; }
        });
    }

    function relaySessionEndpoints(session) {
        const out = new Set();
        String(session?.candidateSummary || '').split(/\s*,\s*/).forEach(part => {
            const bits = part.split('/');
            const endpoint = bits[bits.length - 1] || '';
            if (endpoint) { out.add(endpoint); }
        });
        return out;
    }

    function installCamWebSocketWatcher() {
        if (camDiagnosticState.listening) { return; }
        camDiagnosticState.listening = true;
        runInPageContext(`
(() => {
    if (window.__ichcCamWsWatcherInstalled) { return; }
    window.__ichcCamWsWatcherInstalled = true;
    const NativeWebSocket = window.WebSocket;
    if (typeof NativeWebSocket !== 'function') { return; }

    function summarizePayload(payload) {
        try {
            let text = '';
            if (typeof payload === 'string') {
                text = payload;
            } else if (payload instanceof Blob) {
                text = 'Blob ' + payload.size + ' bytes ' + (payload.type || '');
            } else if (payload instanceof ArrayBuffer) {
                text = 'ArrayBuffer ' + payload.byteLength + ' bytes';
            } else if (ArrayBuffer.isView(payload)) {
                text = payload.constructor.name + ' ' + payload.byteLength + ' bytes';
            } else {
                text = String(payload);
            }
            text = text.replace(/\\s+/g, ' ').trim();
            return text.length > 260 ? text.slice(0, 260) + '...' : text;
        } catch (_) {
            return '[unreadable payload]';
        }
    }

    function parseWowzaPayload(payload) {
        try {
            if (typeof payload !== 'string') { return null; }
            const obj = JSON.parse(payload);
            const streamInfo = obj.streamInfo || {};
            return {
                direction: obj.direction || '',
                command: obj.command || '',
                status: obj.status != null ? String(obj.status) : '',
                statusDescription: obj.statusDescription || '',
                applicationName: streamInfo.applicationName || '',
                streamName: streamInfo.streamName || '',
                sessionId: streamInfo.sessionId || '',
                hasSdp: !!obj.sdp,
                candidateCount: Array.isArray(obj.iceCandidates) ? obj.iceCandidates.length : null,
                candidateSummary: summarizeIceCandidates(obj.iceCandidates),
            };
        } catch (_) {
            return null;
        }
    }

    function summarizeIceCandidates(candidates) {
        try {
            if (!Array.isArray(candidates) || !candidates.length) { return ''; }
            const seen = new Set();
            candidates.forEach(item => {
                const raw = String(item && item.candidate || '');
                const parts = raw.split(/\\s+/);
                const proto = parts[2] || '';
                const address = parts[4] || '';
                const port = parts[5] || '';
                const typ = (raw.match(/ typ (\\S+)/) || [])[1] || '';
                if (address || typ || proto) {
                    seen.add([typ, proto.toLowerCase(), address + (port ? ':' + port : '')].filter(Boolean).join('/'));
                }
            });
            return [...seen].join(', ');
        } catch (_) {
            return '';
        }
    }

    function emit(phase, url, info, meta) {
        window.postMessage({
            type: 'ichc-cam-ws-event',
            detail: { phase, url: String(url || ''), info: String(info || ''), meta: meta || null },
        }, '*');
    }

    function WatchedWebSocket(url, protocols) {
        const socket = protocols === undefined
            ? new NativeWebSocket(url)
            : new NativeWebSocket(url, protocols);
        const startedAt = Date.now();
        emit('create', url, '');
        socket.addEventListener('open', () => emit('open', url, 'readyState=' + socket.readyState));
        socket.addEventListener('message', event => emit('recv', url, summarizePayload(event.data), parseWowzaPayload(event.data)));
        socket.addEventListener('error', () => emit('error', url, ''));
        socket.addEventListener('close', event => {
            emit('close', url, 'after=' + (Date.now() - startedAt) + 'ms code=' + event.code + ' reason=' + (event.reason || '') + ' clean=' + event.wasClean);
        });

        const originalSend = socket.send.bind(socket);
        socket.send = function(data) {
            emit('send', url, summarizePayload(data), parseWowzaPayload(data));
            return originalSend(data);
        };
        return socket;
    }

    WatchedWebSocket.prototype = NativeWebSocket.prototype;
    Object.setPrototypeOf(WatchedWebSocket, NativeWebSocket);
    ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(key => {
        try { Object.defineProperty(WatchedWebSocket, key, { value: NativeWebSocket[key] }); } catch (_) {}
    });
    window.WebSocket = WatchedWebSocket;
})();
        `);
    }

    function installControlHttpWatcher() {
        if (camDiagnosticState.httpListening) { return; }
        camDiagnosticState.httpListening = true;
        runInPageContext(`
(() => {
    if (window.__ichcControlHttpWatcherInstalled) { return; }
    window.__ichcControlHttpWatcherInstalled = true;
    const interesting = /cam|command|send_command|ban|kick|silence|muzzle|oper|room|rtc|webrtc|broadcast|refresh|stream|mod|moder/i;
    function clean(value) {
        let text = '';
        try {
            if (value == null) {
                text = '';
            } else if (typeof value === 'string') {
                text = value;
            } else if (value instanceof URLSearchParams) {
                text = value.toString();
            } else if (value instanceof FormData) {
                text = Array.from(value.entries()).map(pair => pair[0] + '=' + String(pair[1])).join('&');
            } else if (value instanceof Blob) {
                text = 'Blob ' + value.size + ' bytes ' + (value.type || '');
            } else if (value instanceof ArrayBuffer) {
                text = 'ArrayBuffer ' + value.byteLength + ' bytes';
            } else if (ArrayBuffer.isView(value)) {
                text = value.constructor.name + ' ' + value.byteLength + ' bytes';
            } else {
                text = JSON.stringify(value);
            }
        } catch (_) {
            text = String(value || '');
        }
        text = String(text || '').replace(/\\s+/g, ' ').trim();
        return text;
    }
    function stackHint() {
        try {
            const stack = new Error().stack || '';
            return stack.split('\\n').slice(2).map(line => line.trim()).join(' | ');
        } catch (_) {
            return '';
        }
    }
    function emit(transport, method, url, body, extra) {
        const safeUrl = clean(url);
        const safeBody = clean(body);
        const safeResponse = clean(extra && extra.response);
        if (!interesting.test([safeUrl, safeBody, safeResponse].join(' '))) { return; }
        window.postMessage({
            type: 'ichc-control-http-event',
            detail: {
                transport,
                method: String(method || '').toUpperCase(),
                url: safeUrl,
                body: safeBody,
                status: extra && extra.status != null ? String(extra.status) : '',
                response: safeResponse,
                stackHint: stackHint()
            }
        }, '*');
    }

    const nativeFetch = window.fetch;
    if (typeof nativeFetch === 'function' && !nativeFetch.__ichcControlWatched) {
        const watchedFetch = function(input, init) {
            let url = '';
            let method = '';
            try {
                url = typeof input === 'string' ? input : (input && input.url) || '';
                method = (init && init.method) || (input && input.method) || 'GET';
                emit('fetch', method, url, init && init.body);
            } catch (_) {}
            const result = nativeFetch.apply(this, arguments);
            try {
                return Promise.resolve(result).then(response => {
                    try {
                        const cloned = response.clone();
                        cloned.text().then(text => emit('fetch-response', method, url, init && init.body, {
                            status: response.status,
                            response: text
                        })).catch(() => {});
                    } catch (_) {}
                    return response;
                });
            } catch (_) {
                return result;
            }
        };
        watchedFetch.__ichcControlWatched = true;
        window.fetch = watchedFetch;
    }

    const proto = window.XMLHttpRequest && window.XMLHttpRequest.prototype;
    if (proto && !proto.__ichcControlWatched) {
        proto.__ichcControlWatched = true;
        const nativeOpen = proto.open;
        const nativeSend = proto.send;
        proto.open = function(method, url) {
            try {
                this.__ichcControlMethod = method || '';
                this.__ichcControlUrl = url || '';
            } catch (_) {}
            return nativeOpen.apply(this, arguments);
        };
        proto.send = function(body) {
            try {
                const method = this.__ichcControlMethod || '';
                const url = this.__ichcControlUrl || '';
                this.addEventListener('loadend', function() {
                    try {
                        emit('xhr-response', method, url, body, {
                            status: this.status,
                            response: this.responseText || ''
                        });
                    } catch (_) {}
                });
                emit('xhr', method, url, body);
            } catch (_) {}
            return nativeSend.apply(this, arguments);
        };
    }
})();
        `);
    }

    function inspectControlFunctionSurfaces() {
        runInPageContext(`
(() => {
    const names = [
        'send_command',
        'startRoomBan',
        'startBroadcasting',
        'stop_camera',
        'start_camera',
        'update_player',
        'refreshCams',
        'tospd',
        'bO',
        'ignore',
        'StartWhisper',
        'startPublicMessage',
        'giftToThem'
    ];
    const urlRe = /(?:https?:\\/\\/|wss?:\\/\\/|\\/)[^'"\\s<>)]{2,}/g;
    const commandRe = /\\/(?:cam|kick|ban|silence!?|muzzle|oper|deoper|voice|unvoice|follow|unfollow)\\b[^'"\\n;)]*/ig;
    const transportChecks = [
        ['fetch', /\\bfetch\\s*\\(/],
        ['xhr', /XMLHttpRequest|\\.ajax\\s*\\(|\\$\\.post\\s*\\(|\\$\\.get\\s*\\(/],
        ['websocket', /WebSocket|\\.send\\s*\\(/],
        ['chat-command', /send_command|\\/(?:cam|kick|ban|silence!?|muzzle|oper)\\b/i],
        ['wowza', /webrtc-session\\.json|sendOffer|getOffer|getAvailableStreams|streamInfo/i]
    ];
    function compact(value, limit) {
        return String(value || '').replace(/\\s+/g, ' ').trim().slice(0, limit);
    }
    function inspectName(name) {
        const value = window[name];
        const type = typeof value;
        let source = '';
        try { source = type === 'function' ? Function.prototype.toString.call(value) : String(value); } catch (_) {}
        const urls = [...new Set(source.match(urlRe) || [])].slice(0, 12);
        const commands = [...new Set(source.match(commandRe) || [])].slice(0, 12);
        const transports = transportChecks.filter(pair => pair[1].test(source)).map(pair => pair[0]);
        return {
            name,
            type,
            exists: value != null,
            length: source.length,
            transports,
            urls,
            commands,
            snippet: compact(source, 700)
        };
    }
    window.postMessage({
        type: 'ichc-control-function-inspect-result',
        detail: { time: Date.now(), functions: names.map(inspectName) }
    }, '*');
})();
        `);
    }

    function recordControlFunctionInspection(report) {
        const functions = Array.isArray(report?.functions) ? report.functions : [];
        camDiagnosticState.functionInspections = functions.map(item => ({
            name: item.name || '',
            type: item.type || '',
            exists: !!item.exists,
            length: item.length || 0,
            transports: Array.isArray(item.transports) ? item.transports : [],
            urls: Array.isArray(item.urls) ? item.urls : [],
            commands: Array.isArray(item.commands) ? item.commands : [],
            snippet: item.snippet || '',
        }));
        const visible = camDiagnosticState.functionInspections.filter(item => item.exists);
        const transportLabels = [...new Set(visible.flatMap(item => item.transports || []))];
        addCamDiagnosticRow(
            visible.length ? 'info' : 'warn',
            'ICHC control function surfaces',
            `${visible.length}/${functions.length || 0} present${transportLabels.length ? '; transports: ' + transportLabels.join(', ') : '; no transport hints'}`
        );
        renderCamDiagnostics();
    }

    // ── Live per-cam feed stats (WebRTC getStats overlay + console) ──────────────
    // A page-context collector hooks RTCPeerConnection, samples getStats once a
    // second, maps each inbound video track to its cam card, and posts compact
    // per-feed metrics (resolution, fps, bitrate, packet loss, jitter, codec, RTT)
    // back to the content script via window.postMessage. The content side draws an
    // overlay on each matching cam and mirrors the data to the console + window.ichcCamStats.
    let _camStatsOn = (() => { try { return localStorage.getItem('ichc_cam_stats') === '1'; } catch (_) { return false; } })();
    let _camStatsBridged = false;
    let _camStatsBootstrapped = false;
    let _camStatsTick = 0;

    const CAM_STATS_SRC = `
(() => {
  if (window.__ichcCamStatsCollector) { return; }
  window.__ichcCamStatsCollector = true;

  const PCS = new Set();
  const prev = new Map();   // ssrc -> { ts, bytes, packets, lost, frames }
  let timer = null;

  // Capture every RTCPeerConnection created from here on (existing ones are missed,
  // but cams reconnect often so the set fills quickly).
  try {
    const Native = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    if (Native && !Native.__ichcStatsHooked) {
      const Hooked = function(...a) {
        const pc = new Native(...a);
        register(pc);
        return pc;
      };
      Hooked.prototype = Native.prototype;
      try { Object.setPrototypeOf(Hooked, Native); } catch (e) {}
      Hooked.__ichcStatsHooked = true;
      window.RTCPeerConnection = Hooked;
      try { window.webkitRTCPeerConnection = Hooked; } catch (e) {}
    }
    // Also register instances via prototype methods — catches connections the site
    // built from a constructor reference cached before our hook. Runs once (the whole
    // collector is guarded), so no wrapper chaining.
    const proto = (Native && Native.prototype) || null;
    if (proto) {
      ['setRemoteDescription', 'setLocalDescription', 'addTrack', 'createAnswer'].forEach(meth => {
        const orig = proto[meth];
        if (typeof orig !== 'function' || orig.__ichcStatsWrapped) { return; }
        const wrapped = function(...a) { register(this); return orig.apply(this, a); };
        wrapped.__ichcStatsWrapped = true;
        proto[meth] = wrapped;
      });
    }
  } catch (e) {}

  function findVideoForTrack(trackId) {
    if (!trackId) { return null; }
    const vids = document.querySelectorAll('#cams video, video');
    for (const v of vids) {
      const ms = v.srcObject;
      if (!ms || !ms.getTracks) { continue; }
      for (const t of ms.getTracks()) { if (t.id === trackId) { return v; } }
    }
    return null;
  }
  function cardNameForVideo(v) {
    if (!v) { return ''; }
    const card = v.closest('.rounded_square');
    const nameEl = card && card.querySelector('.name-on-cam');
    return nameEl ? (nameEl.textContent || '').trim() : '';
  }

  // ── Failure / server monitoring (event-driven — runs even when the overlay is off) ──
  function register(pc) {
    try { PCS.add(pc); } catch (e) {}
    watch(pc);
  }
  function watch(pc) {
    if (!pc || pc.__ichcWatched) { return; }
    pc.__ichcWatched = true;
    const onChange = () => {
      const st = pc.connectionState || pc.iceConnectionState || '';
      if (st === pc.__ichcState) { return; }
      pc.__ichcState = st;
      if (st === 'closed' || st === 'failed') { PCS.delete(pc); }
      if (st === 'failed' || st === 'disconnected' || st === 'connected' || st === 'completed') { emitEvent(pc, st); }
    };
    try { pc.addEventListener('connectionstatechange', onChange); } catch (e) {}
    try { pc.addEventListener('iceconnectionstatechange', onChange); } catch (e) {}
  }
  function pcName(pc) {
    const ids = new Set();
    try { (pc.getReceivers ? pc.getReceivers() : []).forEach(r => { if (r.track && r.track.kind === 'video') { ids.add(r.track.id); } }); } catch (e) {}
    if (!ids.size) { return ''; }
    const vids = document.querySelectorAll('#cams video, video');
    for (const v of vids) {
      const ms = v.srcObject;
      if (!ms || !ms.getVideoTracks) { continue; }
      for (const t of ms.getVideoTracks()) { if (ids.has(t.id)) { return cardNameForVideo(v); } }
    }
    return '';
  }
  async function pcServer(pc) {
    let addr = '', ctype = '', proto = '';
    try {
      const r = await pc.getStats();
      let pairId = null;
      r.forEach(s => { if (s.type === 'transport' && s.selectedCandidatePairId) { pairId = s.selectedCandidatePairId; } });
      let remoteId = null;
      r.forEach(s => { if (s.type === 'candidate-pair' && (s.id === pairId || s.nominated || s.state === 'succeeded')) { remoteId = s.remoteCandidateId; } });
      r.forEach(s => {
        if (s.type === 'remote-candidate' && (s.id === remoteId || !remoteId)) {
          addr = (s.address || s.ip || '') + (s.port ? (':' + s.port) : '');
          ctype = s.candidateType || ''; proto = s.protocol || '';
        }
      });
    } catch (e) {}
    let cfg = '';
    try {
      const urls = [];
      ((pc.getConfiguration && pc.getConfiguration().iceServers) || []).forEach(se => {
        const u = se.urls; (Array.isArray(u) ? u : [u]).forEach(x => { if (x) { urls.push(x); } });
      });
      cfg = urls.join(', ');
    } catch (e) {}
    return { addr: addr, ctype: ctype, proto: proto, cfg: cfg };
  }
  async function emitEvent(pc, state) {
    let name = '';
    try { name = pcName(pc); } catch (e) {}
    if (name) { pc.__ichcName = name; } else if (pc.__ichcName) { name = pc.__ichcName; }
    const srv = await pcServer(pc);
    try {
      window.postMessage({ __ichc: 'camstats-event', ev: {
        state: state, name: name, server: srv.addr, candType: srv.ctype, proto: srv.proto, iceServers: srv.cfg, time: Date.now()
      } }, '*');
    } catch (e) {}
  }

  // ── Relay capability inspector ──────────────────────────────────────────────
  // Read-only: parses the SDP already negotiated with the edge. The server's
  // description lists what it supports/allows; comparing it to the browser's offer
  // shows which codecs the relay rejected (i.e. won't do for this stream).
  function parseSdpMedia(sdp, kind) {
    if (!sdp) { return null; }
    const lines = sdp.split(/\\r?\\n/);
    let inSec = false, fmts = [], bAS = null, bTIAS = null;
    const rtpmap = {}, fmtp = {}, fb = {};
    const cands = [];
    for (const ln of lines) {
      if (ln.charAt(0) === 'm' && ln.indexOf('m=') === 0) {
        if (ln.indexOf('m=' + kind) === 0) { inSec = true; fmts = ln.split(' ').slice(3); }
        else if (inSec) { break; }
        continue;
      }
      if (!inSec) { continue; }
      let m;
      if (ln.indexOf('b=AS:') === 0) { bAS = parseInt(ln.slice(5), 10); }
      else if (ln.indexOf('b=TIAS:') === 0) { bTIAS = parseInt(ln.slice(7), 10); }
      else if ((m = ln.match(/^a=rtpmap:(\\d+)\\s+([^\\/]+)\\/(\\d+)(?:\\/(\\d+))?/))) { rtpmap[m[1]] = { name: m[2], clock: +m[3] }; }
      else if ((m = ln.match(/^a=fmtp:(\\d+)\\s+(.*)$/))) { fmtp[m[1]] = m[2]; }
      else if ((m = ln.match(/^a=rtcp-fb:(\\S+)\\s+(.*)$/))) { (fb[m[1]] = fb[m[1]] || []).push(m[2]); }
      else if ((m = ln.match(/^a=candidate:\\S+ \\d+ (udp|tcp)/i))) { cands.push(m[1].toLowerCase()); }
    }
    const codecs = fmts.filter(pt => rtpmap[pt]).map(pt => ({
      name: rtpmap[pt].name, clock: rtpmap[pt].clock, fmtp: fmtp[pt] || '',
      fb: (fb[pt] || []).concat(fb['*'] || [])
    }));
    return { codecs: codecs, bAS: bAS, bTIAS: bTIAS, protocols: [...new Set(cands)] };
  }

  window.ichcCamCaps = function(filter) {
    const out = [];
    PCS.forEach(pc => {
     try {
      let nm = pc.__ichcName || '';
      try { nm = pcName(pc) || nm; } catch (e) {}
      if (filter && nm.toLowerCase() !== String(filter).toLowerCase()) { return; }
      const local = pc.localDescription, remote = pc.remoteDescription;
      const sv = parseSdpMedia(remote && remote.sdp, 'video');
      const sa = parseSdpMedia(remote && remote.sdp, 'audio');
      const bv = parseSdpMedia(local && local.sdp, 'video');
      const list = a => (a ? a.codecs.map(c => c.name + (c.fmtp ? ' [' + c.fmtp + ']' : '')) : []);
      const names = a => (a ? a.codecs.map(c => c.name.toLowerCase()) : []);
      const rejected = (bv && sv) ? bv.codecs.map(c => c.name).filter(n => names(sv).indexOf(n.toLowerCase()) === -1) : [];
      const entry = {
        cam: nm || '(unknown)',
        serverVideoCodecs: list(sv), serverAudioCodecs: list(sa),
        browserOfferedVideo: bv ? bv.codecs.map(c => c.name) : [],
        relayRejected: rejected,
        videoBitrateCapKbps: sv ? (sv.bAS || (sv.bTIAS ? Math.round(sv.bTIAS / 1000) : null)) : null,
        transport: sv ? sv.protocols : [], offer: local && local.type, answer: remote && remote.type
      };
      out.push(entry);
      console.group('%c[ichc caps] ' + entry.cam, 'color:#4ec8d7;font-weight:bold');
      console.log('relay video codecs :', entry.serverVideoCodecs.join(', ') || '(none)');
      console.log('relay audio codecs :', entry.serverAudioCodecs.join(', ') || '(none)');
      console.log('browser offered    :', entry.browserOfferedVideo.join(', '));
      console.log('%crelay REJECTED     : ' + (entry.relayRejected.join(', ') || '(none — relay took everything offered)'), 'color:#f0a020');
      console.log('video bitrate cap  :', entry.videoBitrateCapKbps != null ? entry.videoBitrateCapKbps + ' kbps' : '(none in SDP)');
      console.log('transport          :', entry.transport.join(', ') || '(n/a)');
      console.groupEnd();
     } catch (e) {}
    });
    try {
      const v = RTCRtpReceiver.getCapabilities('video');
      const a = RTCRtpReceiver.getCapabilities('audio');
      console.log('%c[ichc caps] this browser CAN decode → video: ' +
        [...new Set((v ? v.codecs : []).map(c => c.mimeType.replace(/^video\\//i, '')))].join(', ') +
        ' · audio: ' + [...new Set((a ? a.codecs : []).map(c => c.mimeType.replace(/^audio\\//i, '')))].join(', '),
        'color:#8fe3ef');
    } catch (e) {}
    window.ichcCamCapsData = out;
    return out;
  };

  // ── Experiment: probe what the relay REALLY supports (opt-in; may blank a cam) ──
  // icanhazchat offers VP8 only, so passive SDP can't reveal the relay's full support.
  // When armed, we re-add VP9/H264/AV1 to the next offer and log what the relay keeps.
  function probeRewriteOffer(sdp) {
    const caps = ((RTCRtpReceiver.getCapabilities && RTCRtpReceiver.getCapabilities('video')) || {}).codecs || [];
    const main = caps.filter(c => /VP8|VP9|H264|AV1/i.test(c.mimeType));
    if (!main.length) { return sdp; }
    const lines = sdp.split(/\\r?\\n/);
    let mi = -1;
    for (let i = 0; i < lines.length; i++) { if (lines[i].indexOf('m=video') === 0) { mi = i; break; } }
    if (mi < 0) { return sdp; }
    const existing = new Set();
    const ex = parseSdpMedia(sdp, 'video');
    if (ex) { ex.codecs.forEach(c => existing.add((c.name + '|' + (c.fmtp || '')).toLowerCase())); }
    const mparts = lines[mi].split(' ');
    const usedPts = new Set(mparts.slice(3).map(Number));
    let nextPt = 96;
    const freePt = () => { while (usedPts.has(nextPt)) { nextPt++; } usedPts.add(nextPt); return nextPt; };
    const addPts = [], addLines = [];
    main.forEach(c => {
      const name = c.mimeType.split('/')[1];
      if (existing.has((name + '|' + (c.sdpFmtpLine || '')).toLowerCase())) { return; }  // already offered
      const pt = freePt();
      addPts.push(pt);
      addLines.push('a=rtpmap:' + pt + ' ' + name + '/' + (c.clockRate || 90000));
      if (c.sdpFmtpLine) { addLines.push('a=fmtp:' + pt + ' ' + c.sdpFmtpLine); }
      ['nack', 'nack pli', 'ccm fir', 'transport-cc'].forEach(fb => addLines.push('a=rtcp-fb:' + pt + ' ' + fb));
    });
    if (!addPts.length) { return sdp; }
    lines[mi] = mparts.concat(addPts).join(' ');
    let insertAt = lines.length;
    for (let i = mi + 1; i < lines.length; i++) { if (lines[i].indexOf('m=') === 0) { insertAt = i; break; } }
    lines.splice(insertAt, 0, ...addLines);
    return lines.join('\\r\\n');
  }

  (function installProbeHooks() {
    const RP = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    const proto = RP && RP.prototype;
    if (!proto) { return; }
    const oCreate = proto.createOffer;
    if (oCreate && !oCreate.__ichcProbe) {
      const w = function() {
        const self = this;
        const r = oCreate.apply(this, arguments);
        if (r && typeof r.then === 'function') {
          return r.then(off => {
            if (window.__ichcProbeArm > 0 && off && off.sdp && off.sdp.indexOf('m=video') !== -1) {
              window.__ichcProbeArm--;
              const before = (parseSdpMedia(off.sdp, 'video') || { codecs: [] }).codecs.map(c => c.name);
              try { off.sdp = probeRewriteOffer(off.sdp); } catch (e) {}
              const after = (parseSdpMedia(off.sdp, 'video') || { codecs: [] }).codecs.map(c => c.name);
              self.__ichcProbing = true;
              console.log('%c[ichc probe] offer rewritten — was [' + [...new Set(before)].join(', ') + '] now offering [' + [...new Set(after)].join(', ') + ']', 'color:#f0a020;font-weight:bold');
            }
            return off;
          });
        }
        return r;
      };
      w.__ichcProbe = true; proto.createOffer = w;
    }
    const oSRD = proto.setRemoteDescription;
    if (oSRD && !oSRD.__ichcProbe) {
      const w = function(desc) {
        try {
          if (this.__ichcProbing && desc && desc.sdp && desc.sdp.indexOf('m=video') !== -1) {
            const ans = parseSdpMedia(desc.sdp, 'video');
            if (ans) { console.log('%c[ichc probe] RELAY ANSWERED with video codecs: ' + [...new Set(ans.codecs.map(c => c.name))].join(', '), 'color:#4ec8d7;font-weight:bold'); }
            this.__ichcProbing = false;
          }
        } catch (e) {}
        return oSRD.apply(this, arguments);
      };
      w.__ichcProbe = true; proto.setRemoteDescription = w;
    }
  })();

  window.ichcProbeRelay = function(n) {
    window.__ichcProbeArm = (n && n > 0) ? n : 1;
    console.log('%c[ichc probe] ARMED for the next ' + window.__ichcProbeArm + ' video offer(s). Trigger one: run refreshCams() or toggle a cam off/on. The probed cam may go black until you refresh it again — this only tests what the relay will negotiate.', 'color:#f0a020;font-weight:bold');
    return 'armed:' + window.__ichcProbeArm;
  };

  // ── Broadcast quality control for your OWN outbound cam ──
  // window.__ichcBcastQ is read by the quality patch (bcastTarget) for the NEXT cam-up,
  // and ichcApplyBcastNow() applies it LIVE to the current stream (setParameters +
  // applyConstraints). This touches the outbound track, but that is NOT what causes the
  // site's "broadcasting audio" desync (that's a pre-existing stop-side site bug), so
  // live quality changes are safe. We still never touch a track mid-teardown.
  window.ichcApplyBcastNow = async function() {
    const q = window.__ichcBcastQ;
    for (const pc of PCS) {
      let senders = [];
      try { senders = pc.getSenders ? pc.getSenders() : []; } catch (e) { continue; }
      for (const s of senders) {
        if (!s.track || s.track.kind !== 'video' || s.track.readyState !== 'live') { continue; }
        try {
          const p = s.getParameters();
          if (!p.encodings || !p.encodings.length) { p.encodings = [{}]; }
          p.encodings.forEach(enc => {
            if (q && q.maxKbps) { enc.maxBitrate = q.maxKbps * 1000; } else { delete enc.maxBitrate; }
            if (q && q.maxFps) { enc.maxFramerate = q.maxFps; } else { delete enc.maxFramerate; }
            enc.scaleResolutionDownBy = 1;
          });
          p.degradationPreference = (q && q.degradation) ? q.degradation : 'balanced';
          await s.setParameters(p);
        } catch (e) {}
        if (q && q.width && q.height && s.track.applyConstraints) {
          let cur = 0;
          try { cur = (s.track.getSettings() || {}).width || 0; } catch (e) {}
          if (cur !== q.width) {
            try { await s.track.applyConstraints({ width: { ideal: q.width }, height: { ideal: q.height }, frameRate: { ideal: q.maxFps || 30 } }); } catch (e) {}
          }
        }
      }
    }
    return q;
  };
  window.ichcSetBroadcastQuality = function(opts) {
    opts = opts || {};
    window.__ichcBcastQ = {
      maxKbps: opts.maxKbps || opts.kbps || null,
      maxFps: opts.maxFps || opts.fps || null,
      width: opts.width || null, height: opts.height || null,
      degradation: opts.degradation || 'maintain-resolution'
    };
    window.ichcApplyBcastNow();   // apply to the current stream immediately
    console.log('%c[ichc broadcast] quality set ' + JSON.stringify(window.__ichcBcastQ) + ' — applied live + on next cam-up. Run ichcBroadcastInfo() to confirm.', 'color:#3ba55c;font-weight:bold');
    return window.__ichcBcastQ;
  };
  window.ichcResetBroadcastQuality = function() {
    window.__ichcBcastQ = null;
    window.ichcApplyBcastNow();   // drop the caps on the current stream now
    console.log('%c[ichc broadcast] OFF — caps removed live; resolution reverts on next cam-up.', 'color:#80848e');
    return 'reset';
  };

  // Inspect YOUR live broadcast: capture res vs encoded res vs what is limiting it.
  // Shows whether 320x240 is your encoder (maybe fixable) or imposed elsewhere.
  window.ichcBroadcastInfo = async function() {
    const out = [];
    for (const pc of PCS) {
      let senders = [];
      try { senders = pc.getSenders ? pc.getSenders() : []; } catch (e) { continue; }
      for (const s of senders) {
        if (!s.track || s.track.kind !== 'video') { continue; }
        const info = {};
        try {
          const st = s.track.getSettings ? s.track.getSettings() : {};
          info.capture = (st.width || '?') + 'x' + (st.height || '?') + ' @' + (st.frameRate ? Math.round(st.frameRate) : '?') + 'fps';
        } catch (e) {}
        try {
          const p = s.getParameters();
          const enc = (p.encodings && p.encodings[0]) || {};
          info.maxBitrateKbps = enc.maxBitrate ? Math.round(enc.maxBitrate / 1000) : null;
          info.scaleDownBy = (enc.scaleResolutionDownBy != null) ? enc.scaleResolutionDownBy : null;
          info.maxFps = (enc.maxFramerate != null) ? enc.maxFramerate : null;
          info.degradation = p.degradationPreference || null;
        } catch (e) {}
        try {
          const r = await pc.getStats(s.track);
          r.forEach(x => {
            if (x.type === 'outbound-rtp' && x.kind === 'video') {
              info.encoded = (x.frameWidth || '?') + 'x' + (x.frameHeight || '?');
              info.encodeFps = (x.framesPerSecond != null) ? Math.round(x.framesPerSecond) : null;
              info.encoderTargetKbps = x.targetBitrate ? Math.round(x.targetBitrate / 1000) : null;
              info.qualityLimit = x.qualityLimitationReason || null;
            }
            if (x.type === 'media-source' && x.kind === 'video') {
              if (x.width) { info.sourceRes = x.width + 'x' + x.height; }
            }
          });
        } catch (e) {}
        out.push(info);
        console.log('%c[ichc broadcast]', 'color:#3ba55c;font-weight:bold', info);
      }
    }
    if (!out.length) { console.warn('[ichc broadcast] no outbound video sender found — are you live? (or the broadcast PC was not captured by the collector)'); }
    window.ichcBroadcastInfoData = out;
    return out;
  };

  // Cam-up session history (data written by the content script; localStorage is shared).
  window.ichcCamTime = function() {
    let d = {};
    try { d = JSON.parse(localStorage.getItem('ichc_camtime') || '{}') || {}; } catch (e) {}
    const fmt = ms => {
      const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
      return (h ? h + ':' + String(m).padStart(2, '0') : '' + m) + ':' + String(ss).padStart(2, '0');
    };
    const rows = Object.keys(d).map(k => ({
      nick: k, sessions: d[k].sessions, total: fmt(d[k].totalMs),
      longest: fmt(d[k].longestMs), last: fmt(d[k].lastMs),
      endedAt: d[k].lastEndedAt ? new Date(d[k].lastEndedAt).toLocaleString() : ''
    })).sort((a, b) => (d[b.nick].totalMs - d[a.nick].totalMs));
    console.table(rows);
    return d;
  };

  // Re-apply a persisted broadcast-quality preset on load.
  // This table must agree with _BCAST_Q_SETTINGS in the content script — it is the
  // same three presets, under the same sub-1 Mbps ceiling, reached by the boot path
  // instead of the menu. Retired keys map to their nearest survivor exactly as
  // _BCAST_Q_LEGACY does, so a broadcaster who had picked HD before the trim does
  // not silently come back up uncapped.
  try {
    const raw = localStorage.getItem('ichc_bq');
    const bq = ({ sharp: 'sd480', smooth: 'sd480', hd: 'hd720', fhd: 'hd720' })[raw] || raw;
    if (bq === 'sd480') { window.ichcSetBroadcastQuality({ width: 640, height: 480, maxFps: 30, maxKbps: 900, degradation: 'balanced' }); }
    else if (bq === 'hd720') { window.ichcSetBroadcastQuality({ width: 1280, height: 720, maxFps: 30, maxKbps: 980, degradation: 'maintain-resolution' }); }
  } catch (e) {}

  async function sample() {
    const feeds = [];
    const seen = new Set();
    const byKey = new Map();   // key -> feed object, so the audio pass can attach to it
    for (const pc of PCS) {
      let report;
      try { report = await pc.getStats(); } catch (e) { continue; }
      let rttMs = null, availKbps = null, server = '', srvType = '', remoteCandId = null;
      const codecs = new Map();
      const remoteCands = new Map();
      report.forEach(s => {
        if (s.type === 'codec') { codecs.set(s.id, s); }
        if (s.type === 'remote-candidate') { remoteCands.set(s.id, s); }
        if (s.type === 'candidate-pair' && (s.nominated || s.state === 'succeeded')) {
          if (typeof s.currentRoundTripTime === 'number') { rttMs = Math.round(s.currentRoundTripTime * 1000); }
          if (typeof s.availableOutgoingBitrate === 'number') { availKbps = Math.round(s.availableOutgoingBitrate / 1000); }
          if (s.remoteCandidateId) { remoteCandId = s.remoteCandidateId; }
        }
      });
      // The selected remote candidate is the actual edge serving this cam — the one
      // thing that genuinely differs cam-to-cam (separate play connections per stream).
      const rc = remoteCandId ? remoteCands.get(remoteCandId) : null;
      if (rc) { server = (rc.address || rc.ip || '') + (rc.port ? (':' + rc.port) : ''); srvType = rc.candidateType || ''; }
      report.forEach(s => {
        if ((s.type !== 'inbound-rtp' && s.type !== 'outbound-rtp') || s.kind !== 'video') { return; }
        if (s.isRemote) { return; }
        const dir = s.type === 'inbound-rtp' ? 'in' : 'out';
        const ssrc = String(s.ssrc || s.id);
        const now = (typeof s.timestamp === 'number') ? s.timestamp : Date.now();
        const bytes = dir === 'in' ? (s.bytesReceived || 0) : (s.bytesSent || 0);
        const packets = dir === 'in' ? (s.packetsReceived || 0) : (s.packetsSent || 0);
        const lost = s.packetsLost || 0;
        const frames = (s.framesDecoded != null) ? s.framesDecoded : (s.framesEncoded != null ? s.framesEncoded : 0);
        const p = prev.get(ssrc);
        const firstTs = (p && p.firstTs) ? p.firstTs : now;   // when we first saw this stream instance
        let kbps = null, lossPct = null;
        let fps = (typeof s.framesPerSecond === 'number') ? Math.round(s.framesPerSecond) : null;
        if (p && now > p.ts) {
          const dt = (now - p.ts) / 1000;
          kbps = Math.round(((bytes - p.bytes) * 8) / dt / 1000);
          if (fps == null) { fps = Math.round((frames - p.frames) / dt); }
          const dPkt = (packets - p.packets) + (lost - p.lost);
          if (dPkt > 0) { lossPct = +(((lost - p.lost) / dPkt) * 100).toFixed(1); }
        }
        prev.set(ssrc, { ts: now, bytes: bytes, packets: packets, lost: lost, frames: frames, firstTs: firstTs });

        const codec = codecs.get(s.codecId);
        const codecName = codec && codec.mimeType ? codec.mimeType.replace(/^video\\//i, '') : '';

        let w = s.frameWidth || 0, h = s.frameHeight || 0, name = '';
        const vid = dir === 'in' ? findVideoForTrack(s.trackIdentifier || '') : null;
        if (vid && vid.videoWidth) { w = vid.videoWidth; h = vid.videoHeight; }
        if (vid) { name = cardNameForVideo(vid); }
        const key = name ? name.toLowerCase() : (dir === 'out' ? '__self__' : ('ssrc:' + ssrc));
        if (seen.has(key)) { return; }
        seen.add(key);

        const feedObj = {
          key: key, name: name, dir: dir, w: w, h: h,
          fps: (fps != null && isFinite(fps)) ? fps : null,
          kbps: (kbps != null && isFinite(kbps)) ? kbps : null,
          loss: lost, lossPct: lossPct,
          jitterMs: (typeof s.jitter === 'number') ? Math.round(s.jitter * 1000) : null,
          codec: codecName,
          nack: s.nackCount != null ? s.nackCount : null,
          pli: s.pliCount != null ? s.pliCount : null,
          freeze: s.freezeCount != null ? s.freezeCount : null,
          framesDropped: (s.framesDropped != null) ? s.framesDropped : null,
          upS: Math.round((now - firstTs) / 1000),
          rttMs: rttMs,
          server: server, srvType: srvType,
          audio: false, audioKbps: null, audioPps: null, audioLevel: null,
          availKbps: dir === 'out' ? availKbps : null,
          qualityLimit: dir === 'out' ? (s.qualityLimitationReason || null) : null
        };
        feeds.push(feedObj);
        byKey.set(key, feedObj);
      });
      // Audio pass — attach presence / bitrate / level to the matching cam feed.
      report.forEach(s => {
        if (s.type !== 'inbound-rtp' || s.kind !== 'audio' || s.isRemote) { return; }
        const assrc = 'a:' + String(s.ssrc || s.id);
        const now = (typeof s.timestamp === 'number') ? s.timestamp : Date.now();
        const bytes = s.bytesReceived || 0;
        const packets = s.packetsReceived || 0;
        const p = prev.get(assrc);
        let akbps = null, apps = null;
        if (p && now > p.ts) {
          const dt = (now - p.ts) / 1000;
          akbps = Math.round(((bytes - p.bytes) * 8) / dt / 1000);
          apps = Math.round((packets - (p.packets || 0)) / dt);
        }
        prev.set(assrc, { ts: now, bytes: bytes, packets: packets });
        const vid = findVideoForTrack(s.trackIdentifier || '');
        const nm = vid ? cardNameForVideo(vid) : '';
        const f = nm ? byKey.get(nm.toLowerCase()) : null;
        if (f) {
          f.audio = true;
          if (akbps != null && isFinite(akbps)) { f.audioKbps = akbps; }
          if (apps != null && isFinite(apps)) { f.audioPps = apps; }
          if (typeof s.audioLevel === 'number') { f.audioLevel = +s.audioLevel.toFixed(3); }
        }
      });
    }
    try { window.ichcCamStats = feeds; } catch (e) {}
    try { window.postMessage({ __ichc: 'camstats-data', feeds: feeds }, '*'); } catch (e) {}
  }

  window.addEventListener('message', ev => {
    if (ev.source !== window || !ev.data || ev.data.__ichc !== 'camstats-cmd') { return; }
    if (ev.data.cmd === 'start') {
      if (!timer) { sample(); timer = setInterval(sample, 1000); }
    } else if (ev.data.cmd === 'stop') {
      if (timer) { clearInterval(timer); timer = null; }
      prev.clear();
    }
  });
})();
`;

    function _initCamStatsBridge() {
        if (_camStatsBridged) { return; }
        _camStatsBridged = true;
        window.addEventListener('message', ev => {
            if (ev.source !== window || !ev.data) { return; }
            if (ev.data.__ichc === 'camstats-data') {
                if (_camStatsOn) {
                    const feeds = ev.data.feeds || [];
                    _updateCamMediaHealth(feeds);
                    _renderCamStats(feeds);
                }
            } else if (ev.data.__ichc === 'camstats-event') {
                _handleCamEvent(ev.data.ev);
            }
        });
    }

    // Always-on failure monitor — injects the collector at startup so cam drops are
    // caught (and the failing server reported) even when the live-stats overlay is off.
    function installCamMonitor() {
        _initCamStatsBridge();
        runInPageContext(CAM_STATS_SRC);
        window.setTimeout(() => runInPageContext(CAM_STATS_SRC), 1500);
        window.setTimeout(() => runInPageContext(CAM_STATS_SRC), 4000);
        // Restore a persisted live-overlay toggle (the footer button used to do this).
        if (_camStatsOn && !_camStatsBootstrapped) { _camStatsBootstrapped = true; setCamStats(true); }
    }

    const _camConnectionFailState = new Map();
    const _camMediaHealthState = new Map();
    const CAM_MEDIA_HEALTH = Object.freeze({
        startupGraceS: 8,
        lowFps: 1,
        lowKbps: 8,
        failSamples: 3,
        recoverSamples: 2,
    });

    function _camCardByName(name) {
        const key = (name || '').trim().toLowerCase();
        if (!key) { return null; }
        const el = [...document.querySelectorAll('#cams .name-on-cam')]
            .find(n => (n.textContent || '').trim().toLowerCase() === key);
        return el ? el.closest('.rounded_square') : null;
    }

    function _recordCamHealthEvent(ev) {
        if (!ev) { return; }
        const entry = {
            time: new Date().toLocaleTimeString(),
            state: ev.state || '',
            name: ev.name || '(unknown)',
            server: ev.server || '',
            candType: ev.candType || '',
            proto: ev.proto || '',
            info: ev.info || [ev.server, ev.candType ? `(${ev.candType}${ev.proto ? '/' + ev.proto : ''})` : '']
                .filter(Boolean).join(' '),
        };
        camDiagnosticState.camEvents.push(entry);
        if (camDiagnosticState.camEvents.length > 50) {
            camDiagnosticState.camEvents.splice(0, camDiagnosticState.camEvents.length - 50);
        }
        correlateRelaySessionsForCamEvent(entry);
        renderCamDiagnostics();
    }

    function _syncCamFailBadge(name) {
        const key = (name || '').trim().toLowerCase();
        if (!key) { return; }
        const connection = _camConnectionFailState.get(key);
        const media = _camMediaHealthState.get(key);
        if (connection?.failed) {
            _showCamFailBadge(name, connection.label, connection.server);
        } else if (media?.failed) {
            _showCamFailBadge(name, media.label, media.server);
        } else {
            _clearCamFailBadge(name);
        }
    }

    function _handleCamEvent(ev) {
        if (!ev) { return; }
        _recordCamHealthEvent(ev);
        const failed = ev.state === 'failed' || ev.state === 'disconnected';
        const who = ev.name || '(unknown cam)';
        const key = (ev.name || '').toLowerCase();
        const srv = ev.server || ev.iceServers || 'server unknown';
        if (failed) {
            const wasFailed = _camConnectionFailState.get(key)?.failed;
            _camConnectionFailState.set(key, {
                failed: true,
                label: ev.state === 'failed' ? 'feed failed' : 'reconnecting…',
                server: ev.server || '',
            });
            (window.ichcCamFailures = window.ichcCamFailures || []).push({
                time: new Date().toISOString(), cam: who, state: ev.state,
                server: ev.server || '', iceServers: ev.iceServers || '',
                candType: ev.candType || '', proto: ev.proto || '',
            });
            console.warn('%c[ichc cam-fail]%c ' + who + ' · ' + ev.state + ' · server ' + srv +
                (ev.candType ? ' (' + ev.candType + (ev.proto ? '/' + ev.proto : '') + ')' : '') +
                (ev.iceServers ? ' · ice: ' + ev.iceServers : ''),
                'color:#f85149;font-weight:bold', 'color:#9aa0a6', ev);
            _syncCamFailBadge(ev.name);
            if (ev.state === 'failed' && !wasFailed) { _camToast('⚠ ' + who + ' — feed failed\n' + srv, 'fail'); }
        } else {
            const wasFailed = _camConnectionFailState.get(key)?.failed;
            _camConnectionFailState.set(key, { failed: false, label: '', server: '' });
            _syncCamFailBadge(ev.name);
            if (wasFailed) {
                console.info('%c[ichc cam-ok]%c ' + who + ' recovered (' + ev.state + ')', 'color:#3ba55c;font-weight:bold', 'color:#9aa0a6');
                if (!_camMediaHealthState.get(key)?.failed) { _camToast(who + ' — recovered', 'ok'); }
            }
        }
    }

    function _showCamFailBadge(name, label, server) {
        const card = _camCardByName(name);
        if (!card) { return; }
        let b = card.querySelector('.ichc-cam-fail-badge');
        if (!b) {
            b = document.createElement('div');
            b.className = 'ichc-cam-fail-badge';
            card.appendChild(b);
        }
        b.innerHTML = '<span class="ichc-cam-fail-dot"></span><span>' + escapeHtml(label) + '</span>' +
            (server ? '<span class="ichc-cam-fail-srv">' + escapeHtml(server) + '</span>' : '');
    }
    function _clearCamFailBadge(name) {
        const card = _camCardByName(name);
        if (card) { card.querySelector('.ichc-cam-fail-badge')?.remove(); }
    }

    function _classifyCamMediaHealth(feed) {
        if (!feed || feed.dir !== 'in' || !feed.name || (feed.upS ?? 0) < CAM_MEDIA_HEALTH.startupGraceS) {
            return null;
        }
        const fps = Number.isFinite(feed.fps) ? feed.fps : null;
        const kbps = Number.isFinite(feed.kbps) ? feed.kbps : null;
        if (fps == null && kbps == null) { return null; }

        const lowFps = fps != null && fps <= CAM_MEDIA_HEALTH.lowFps;
        const lowKbps = kbps != null && kbps <= CAM_MEDIA_HEALTH.lowKbps;
        if (!lowFps && !lowKbps) { return { failed: false, label: '' }; }

        const metrics = [];
        if (lowFps) { metrics.push(fps + 'fps'); }
        if (lowKbps) { metrics.push(kbps + 'kbps'); }
        return { failed: true, label: 'feed stalled · ' + metrics.join(' · ') };
    }

    function _updateCamMediaHealth(feeds) {
        for (const feed of feeds) {
            const result = _classifyCamMediaHealth(feed);
            if (!result) { continue; }
            const key = feed.name.trim().toLowerCase();
            const state = _camMediaHealthState.get(key) || {
                failed: false,
                badSamples: 0,
                goodSamples: 0,
                label: '',
                server: '',
            };

            if (result.failed) {
                state.badSamples++;
                state.goodSamples = 0;
                state.label = result.label;
                state.server = feed.server || '';
                if (!state.failed && state.badSamples >= CAM_MEDIA_HEALTH.failSamples) {
                    state.failed = true;
                    _recordCamHealthEvent({
                        state: 'stalled',
                        name: feed.name,
                        server: feed.server || '',
                        info: result.label + (feed.server ? ' · ' + feed.server : ''),
                    });
                    (window.ichcCamFailures = window.ichcCamFailures || []).push({
                        time: new Date().toISOString(),
                        cam: feed.name,
                        state: 'stalled',
                        fps: feed.fps,
                        kbps: feed.kbps,
                        server: feed.server || '',
                    });
                    console.warn('%c[ichc cam-fail]%c ' + feed.name + ' · ' + result.label,
                        'color:#f85149;font-weight:bold', 'color:#9aa0a6', feed);
                    _camToast('⚠ ' + feed.name + ' — ' + result.label, 'fail');
                }
            } else {
                state.badSamples = 0;
                state.goodSamples++;
                if (state.failed && state.goodSamples >= CAM_MEDIA_HEALTH.recoverSamples) {
                    state.failed = false;
                    state.label = '';
                    state.server = '';
                    _recordCamHealthEvent({
                        state: 'recovered',
                        name: feed.name,
                        server: feed.server || '',
                        info: 'media flow recovered' + (feed.server ? ' · ' + feed.server : ''),
                    });
                    console.info('%c[ichc cam-ok]%c ' + feed.name + ' media flow recovered',
                        'color:#3ba55c;font-weight:bold', 'color:#9aa0a6', feed);
                    if (!_camConnectionFailState.get(key)?.failed) {
                        _camToast(feed.name + ' — recovered', 'ok');
                    }
                }
            }

            _camMediaHealthState.set(key, state);
            if (state.failed || result.failed === false) { _syncCamFailBadge(feed.name); }
        }
    }

    function _resetCamMediaHealth() {
        for (const [key, state] of _camMediaHealthState) {
            if (state.failed && !_camConnectionFailState.get(key)?.failed) {
                _clearCamFailBadge(key);
            }
        }
        _camMediaHealthState.clear();
    }

    let _camToastWrap = null;
    function _camToast(msg, kind) {
        if (!_camToastWrap || !_camToastWrap.isConnected) {
            _camToastWrap = document.getElementById('ichc-cam-toasts');
            if (!_camToastWrap) {
                _camToastWrap = document.createElement('div');
                _camToastWrap.id = 'ichc-cam-toasts';
                const host = document.getElementById('ichc-cams-col') || document.getElementById('cams')?.parentElement || document.body;
                host.appendChild(_camToastWrap);
            }
        }
        const t = document.createElement('div');
        t.className = 'ichc-cam-toast ichc-cam-toast-' + (kind || 'fail');
        t.textContent = msg;
        _camToastWrap.appendChild(t);
        requestAnimationFrame(() => t.classList.add('ichc-show'));
        window.setTimeout(() => { t.classList.remove('ichc-show'); window.setTimeout(() => t.remove(), 300); }, 6500);
    }

    function setCamStats(on) {
        _camStatsOn = !!on;
        try { localStorage.setItem('ichc_cam_stats', on ? '1' : '0'); } catch (_) {}
        // The gauge toggle is the de-facto cam "debug" mode — gate debug-only chrome
        // (e.g. the per-cam audio button) on it via a stable class.
        document.documentElement.classList.toggle('ichc-cam-debug', _camStatsOn);
        const btn = document.getElementById('ichc-cam-stats-btn');
        if (btn) {
            btn.classList.toggle('ichc-active', _camStatsOn);
            btn.setAttribute('aria-pressed', String(_camStatsOn));
        }
        if (_camStatsOn) {
            _initCamStatsBridge();
            runInPageContext(CAM_STATS_SRC);
            // Re-post start a few times so we beat the async page injection race.
            [0, 300, 900].forEach(d => window.setTimeout(() => {
                window.postMessage({ __ichc: 'camstats-cmd', cmd: 'start' }, '*');
            }, d));
            console.log('%c[ichc] cam stats ON — type ichcCamStats in this console for the latest sample', 'color:#4ec8d7;font-weight:bold');
        } else {
            window.postMessage({ __ichc: 'camstats-cmd', cmd: 'stop' }, '*');
            _clearCamStatsOverlays();
            _resetCamMediaHealth();
            console.log('%c[ichc] cam stats OFF', 'color:#80848e');
        }
    }

    function _fmtDur(s) {
        if (s == null) { return ''; }
        if (s < 60) { return s + 's'; }
        const m = Math.floor(s / 60), ss = s % 60;
        if (m < 60) { return m + ':' + (ss < 10 ? '0' : '') + ss; }
        const h = Math.floor(m / 60), mm = m % 60;
        return h + 'h' + (mm < 10 ? '0' : '') + mm;
    }

    function _fmtCamRate(kbps) {
        if (kbps == null) { return ''; }
        if (kbps < 1000) { return kbps + 'k'; }
        return (kbps / 1000).toFixed(kbps >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'M';
    }

    function _camStatsLines(feed) {
        const lines = [];
        // Line 1: resolution + fps + bitrate (often uniform across cams on this service).
        const res = (feed.w && feed.h) ? (feed.w + '×' + feed.h) : '—';
        let l1 = res + (feed.fps != null ? ' · ' + feed.fps + 'fps' : '');
        if (feed.kbps != null) { l1 += ' · ' + _fmtCamRate(feed.kbps); }
        lines.push(l1);
        // Line 2: audio first — this is the primary at-a-glance diagnostic.
        // Uptime/drop/freeze follow it on the same compact health row.
        const h = [];
        // Audio: kbps + packet rate + level. ~50pps = encoder running (14k+lvl 0 =
        // encoded silence, DTX off); ~1-3pps = DTX comfort noise; lvl > 0 = audible.
        if (feed.audio) {
            let a = '🔊' + (feed.audioKbps != null ? feed.audioKbps + 'k' : '');
            if (feed.audioPps != null) { a += ' ' + feed.audioPps + 'pps'; }
            if (feed.audioLevel != null) { a += ' lvl ' + feed.audioLevel.toFixed(2); }
            h.push(a);
        } else {
            h.push('🔇');
        }
        if (feed.upS != null) { h.push('up ' + _fmtDur(feed.upS)); }
        if (feed.framesDropped) { h.push('drop ' + feed.framesDropped); }
        if (feed.freeze) { h.push('frz ' + feed.freeze); }
        lines.push(h.join('  '));
        // Remaining path/server detail stays available to the console mirror but is
        // hidden by the compact overlay styling.
        const q = [];
        if (feed.codec) { q.push(feed.codec); }
        if (feed.rttMs != null) { q.push('rtt ' + feed.rttMs + 'ms'); }
        if (feed.jitterMs != null) { q.push('jit ' + feed.jitterMs + 'ms'); }
        if (feed.lossPct != null) { q.push('loss ' + feed.lossPct + '%'); }
        if (q.length) { lines.push(q.join('  ')); }
        if (feed.server) { lines.push('⇄ ' + feed.server + (feed.srvType ? ' (' + feed.srvType + ')' : '')); }
        return lines;
    }

    function _renderCamStats(feeds) {
        _camStatsTick++;
        const tick = String(_camStatsTick);
        // Console mirror — throttled so the overlay can refresh faster than the log spams.
        if (feeds.length && _camStatsTick % 3 === 1) {
            console.log('%c[ichc cam-stats]', 'color:#4ec8d7;font-weight:bold');
            console.table(feeds.map(f => ({
                cam: f.name || (f.dir === 'out' ? '(me)' : f.key),
                res: (f.w && f.h) ? (f.w + 'x' + f.h) : '',
                fps: f.fps, kbps: f.kbps, codec: f.codec,
                rtt_ms: f.rttMs, jitter_ms: f.jitterMs, 'loss%': f.lossPct,
                up_s: f.upS, dropped: f.framesDropped, freeze: f.freeze,
                audio_kbps: f.audio ? f.audioKbps : null,
                audio_pps: f.audio ? f.audioPps : null,
                audio_lvl: f.audio ? f.audioLevel : null,
                server: f.server, srvType: f.srvType,
            })));
        }
        const nameEls = [...document.querySelectorAll('#cams .name-on-cam')];
        for (const feed of feeds) {
            if (!feed.name) { continue; }   // unmapped (e.g. own outbound) — console only
            const match = nameEls.find(el => (el.textContent || '').trim().toLowerCase() === feed.key);
            const card = match ? match.closest('.rounded_square') : null;
            if (!card) { continue; }
            let ov = card.querySelector('.ichc-cam-stats-overlay');
            if (!ov) {
                ov = document.createElement('div');
                ov.className = 'ichc-cam-stats-overlay';
                card.appendChild(ov);
            }
            ov.dataset.tick = tick;
            // The compact overlay displays video first and audio second; the full
            // diagnostics remain in the console.  Reuse those two spans instead of
            // destroying/recreating every metrics node once per second, which cuts
            // allocation and observer churn during long Live-overlay sessions.
            const visibleLines = _camStatsLines(feed).slice(0, 2);
            while (ov.children.length < visibleLines.length) {
                ov.appendChild(document.createElement('span'));
            }
            while (ov.children.length > visibleLines.length) {
                ov.lastElementChild.remove();
            }
            visibleLines.forEach((line, i) => {
                if (ov.children[i].textContent !== line) { ov.children[i].textContent = line; }
            });
        }
        // Drop overlays for cams that didn't report this tick.
        document.querySelectorAll('#cams .ichc-cam-stats-overlay').forEach(ov => {
            if (ov.dataset.tick !== tick) { ov.remove(); }
        });
    }

    function _clearCamStatsOverlays() {
        document.querySelectorAll('.ichc-cam-stats-overlay').forEach(el => el.remove());
    }

    function openCamDiagnostics() {
        let panel = document.getElementById('ichc-cam-diagnostics');
        if (!panel) {
            panel = document.createElement('section');
            panel.id = 'ichc-cam-diagnostics';
            panel.innerHTML = `
                <div class="ichc-camdiag-header">
                    <div>
                        <div class="ichc-camdiag-title">Cam diagnostics</div>
                        <div class="ichc-camdiag-subtitle">Checks browser WebRTC, loaded RTC scripts, and signaling sockets.</div>
                    </div>
                    <button type="button" class="ichc-camdiag-close" aria-label="Close">${ICONS.xmark}</button>
                </div>
                <div class="ichc-camdiag-actions">
                    <button type="button" class="ichc-camdiag-stats" aria-pressed="false">${ICONS.gauge}<span>Live overlay</span></button>
                    <button type="button" class="ichc-camdiag-run">Run tests</button>
                    <button type="button" class="ichc-camdiag-streams">Probe streams</button>
                    <button type="button" class="ichc-camdiag-functions">Inspect funcs</button>
                    <button type="button" class="ichc-camdiag-native">Inspect controls</button>
                    <button type="button" class="ichc-camdiag-capture">Test capture</button>
                    <button type="button" class="ichc-camdiag-copy">Copy report</button>
                    <button type="button" class="ichc-camdiag-clear">Clear log</button>
                </div>
                <div class="ichc-camdiag-preview" hidden></div>
                <div class="ichc-camdiag-body"></div>
            `;
            document.body.appendChild(panel);
            panel.querySelector('.ichc-camdiag-close')?.addEventListener('click', () => { stopCamCaptureTest(); panel.remove(); });
            panel.querySelector('.ichc-camdiag-run')?.addEventListener('click', () => runCamDiagnostics());
            panel.querySelector('.ichc-camdiag-streams')?.addEventListener('click', () => probeObservedStreamInventory());
            panel.querySelector('.ichc-camdiag-functions')?.addEventListener('click', () => inspectControlFunctionSurfaces());
            panel.querySelector('.ichc-camdiag-native')?.addEventListener('click', () => {
                const nick = firstBroadcastingNick();
                if (!nick) {
                    recordNativeActionInspection({
                        nick: '',
                        status: 'missing-cam',
                        actions: [],
                        error: 'No live cam nick found to inspect',
                        time: Date.now(),
                    });
                    return;
                }
                inspectNativeActionsForNick(nick);
            });
            panel.querySelector('.ichc-camdiag-capture')?.addEventListener('click', () => runCamCaptureTest());
            panel.querySelector('.ichc-camdiag-copy')?.addEventListener('click', () => copyCamDiagnosticReport());
            panel.querySelector('.ichc-camdiag-clear')?.addEventListener('click', () => {
                camDiagnosticState.wsEvents = [];
                camDiagnosticState.httpEvents = [];
                camDiagnosticState.camEvents = [];
                camDiagnosticState.nativeActionInspections = [];
                camDiagnosticState.relaySessions = [];
                camDiagnosticState.controlPlaneFindings = [];
                camDiagnosticState.controlEndpointFindings = [];
                camDiagnosticState.commandEffects = [];
                camDiagnosticState.functionInspections = [];
                camDiagnosticState.streamInventory = [];
                renderCamDiagnostics();
            });
            const statsBtn = panel.querySelector('.ichc-camdiag-stats');
            statsBtn?.addEventListener('click', () => {
                setCamStats(!_camStatsOn);
                statsBtn.classList.toggle('ichc-active', _camStatsOn);
                statsBtn.setAttribute('aria-pressed', String(_camStatsOn));
            });
        }
        // Reflect current live-overlay state each time the panel opens.
        const sb = panel.querySelector('.ichc-camdiag-stats');
        if (sb) { sb.classList.toggle('ichc-active', _camStatsOn); sb.setAttribute('aria-pressed', String(_camStatsOn)); }
        panel.classList.add('is-open');
        installCamWebSocketWatcher();
        installControlHttpWatcher();
        renderCamDiagnostics();
        if (!camDiagnosticState.rows.length && !camDiagnosticState.running) {
            runCamDiagnostics();
        }
    }

    // Console (terminal) button toggles the diagnostics panel open/closed.
    function toggleCamDiagnostics() {
        const panel = document.getElementById('ichc-cam-diagnostics');
        if (panel && panel.classList.contains('is-open')) {
            panel.classList.remove('is-open');
            stopCamCaptureTest();
            panel.remove();
            return;
        }
        openCamDiagnostics();
    }

    function addCamDiagnosticRow(status, label, detail = '') {
        const row = { status, label, detail };
        camDiagnosticState.rows.push(row);
        renderCamDiagnostics();
        return row;
    }

    function updateCamDiagnosticRow(row, status, detail = '') {
        row.status = status;
        row.detail = detail;
        renderCamDiagnostics();
    }

    async function probeObservedStreamInventory() {
        const targets = uniqueStreamInventoryTargets();
        if (!targets.length) {
            addCamDiagnosticRow('warn', 'Stream inventory probe', 'No observed Wowza relay app yet; open diagnostics before cam refresh/play.');
            return;
        }
        for (const target of targets.slice(0, 8)) {
            const row = addCamDiagnosticRow('info', 'Stream inventory probe', `${shortUrl(target.url)} app=${target.applicationName}${target.cached ? ' cached' : ''}`);
            try {
                const result = await requestWowzaStreamInventory(target);
                recordStreamInventory(target, result);
                updateCamDiagnosticRow(row, result.ok ? 'pass' : 'warn', result.detail);
            } catch (error) {
                const result = { ok: false, detail: error?.message || String(error), streams: [] };
                recordStreamInventory(target, result);
                updateCamDiagnosticRow(row, 'warn', result.detail);
            }
        }
    }

    function uniqueStreamInventoryTargets() {
        const out = [];
        const seen = new Set();
        const add = (url, applicationName, cached) => {
            const app = normalizeWowzaAppName(applicationName || '');
            if (!url || !app) { return; }
            const key = url + '|' + app;
            if (seen.has(key)) { return; }
            seen.add(key);
            out.push({ url, applicationName: app, cached: !!cached });
        };
        camDiagnosticState.relaySessions.forEach(session => {
            add(session.url || '', session.applicationName || '', false);
        });
        loadRelayTargets().forEach(target => add(target.url, target.applicationName, true));
        return out;
    }

    function normalizeWowzaAppName(value) {
        return String(value || '').replace(/\/_definst_$/i, '').trim();
    }

    function requestWowzaStreamInventory(target) {
        return new Promise(resolve => {
            let socket;
            let settled = false;
            const timeout = window.setTimeout(() => finish({ ok: false, detail: 'timeout after 5s', streams: [] }), 5000);
            function finish(result) {
                if (settled) { return; }
                settled = true;
                window.clearTimeout(timeout);
                try { socket?.close(); } catch (_) {}
                resolve(result);
            }
            try {
                socket = new WebSocket(target.url);
                socket.addEventListener('open', () => {
                    socket.send(JSON.stringify({
                        direction: 'play',
                        command: 'getAvailableStreams',
                        streamInfo: {
                            applicationName: target.applicationName,
                            streamName: '',
                            sessionId: '[empty]',
                        },
                        userData: { param1: 'value1' },
                    }));
                });
                socket.addEventListener('message', event => {
                    finish(parseStreamInventoryResponse(event.data));
                });
                socket.addEventListener('error', () => finish({ ok: false, detail: 'socket error', streams: [] }));
                socket.addEventListener('close', event => {
                    if (!settled) { finish({ ok: false, detail: `closed before response code=${event.code}`, streams: [] }); }
                });
            } catch (error) {
                finish({ ok: false, detail: error?.message || String(error), streams: [] });
            }
        });
    }

    function parseStreamInventoryResponse(raw) {
        try {
            const obj = JSON.parse(String(raw || ''));
            const streams = extractStreamNamesDeep(obj);
            const status = obj.status != null ? String(obj.status) : '';
            const desc = obj.statusDescription || '';
            return {
                ok: status === '200' || streams.length > 0,
                status,
                statusDescription: desc,
                streams,
                raw: String(raw || '').slice(0, 1200),
                detail: `status=${status || '?'} ${desc || ''}; streams=${streams.length}${streams.length ? ' ' + streams.slice(0, 12).join(', ') : ''}`,
            };
        } catch (error) {
            return { ok: false, detail: 'unparseable response: ' + (error?.message || error), streams: [], raw: String(raw || '').slice(0, 1200) };
        }
    }

    function extractStreamNamesDeep(value) {
        const out = new Set();
        const visit = node => {
            if (!node || out.size > 200) { return; }
            if (Array.isArray(node)) { node.forEach(visit); return; }
            if (typeof node !== 'object') { return; }
            ['streamName', 'name', 'id'].forEach(key => {
                const v = node[key];
                if (typeof v === 'string' && /^[a-z0-9_-]{4,}$/i.test(v)) { out.add(v); }
            });
            Object.keys(node).forEach(key => visit(node[key]));
        };
        visit(value);
        return [...out];
    }

    function recordStreamInventory(target, result) {
        const entry = {
            time: new Date().toLocaleTimeString(),
            url: target.url,
            applicationName: target.applicationName,
            ok: !!result.ok,
            status: result.status || '',
            statusDescription: result.statusDescription || '',
            streams: result.streams || [],
            detail: result.detail || '',
        };
        camDiagnosticState.streamInventory.push(entry);
        if (camDiagnosticState.streamInventory.length > 40) {
            camDiagnosticState.streamInventory.splice(0, camDiagnosticState.streamInventory.length - 40);
        }
        try { window.ichcStreamInventory = camDiagnosticState.streamInventory.slice(); } catch (_) {}
        renderCamDiagnostics();
    }

    function renderCamDiagnostics() {
        const panel = document.getElementById('ichc-cam-diagnostics');
        const body = panel?.querySelector('.ichc-camdiag-body');
        if (!body) { return; }

        const rows = camDiagnosticState.rows.map(row => `
            <div class="ichc-camdiag-row ichc-camdiag-${escapeAttr(row.status)}">
                <span class="ichc-camdiag-status">${escapeHtml(row.status)}</span>
                <span class="ichc-camdiag-label">${escapeHtml(row.label)}</span>
                <span class="ichc-camdiag-detail">${escapeHtml(row.detail || '')}</span>
            </div>
        `).join('');

        const events = camDiagnosticState.wsEvents.length
            ? camDiagnosticState.wsEvents.slice(-12).map(event => `
                <div class="ichc-camdiag-event">
                    <span>${escapeHtml(event.time)}</span>
                    <b>${escapeHtml(event.phase)}</b>
                    <code>${escapeHtml(event.url)}</code>
                    <span>${escapeHtml(event.info)}</span>
                </div>
            `).join('')
            : '<div class="ichc-camdiag-empty">No site WebSocket attempts captured yet. Leave this panel open and click Go Live to capture publish signaling.</div>';

        const camEvents = camDiagnosticState.camEvents.length
            ? camDiagnosticState.camEvents.slice(-12).map(event => `
                <div class="ichc-camdiag-event ichc-camdiag-ev-${escapeAttr(event.state)}">
                    <span>${escapeHtml(event.time)}</span>
                    <b>${escapeHtml(event.state)}</b>
                    <code>${escapeHtml(event.name)}</code>
                    <span>${escapeHtml(event.info)}</span>
                </div>
            `).join('')
            : '<div class="ichc-camdiag-empty">No cam health changes yet. Connections, media stalls, and recoveries show up here with the edge server involved.</div>';

        const nativeActions = camDiagnosticState.nativeActionInspections.length
            ? camDiagnosticState.nativeActionInspections.slice(-8).map(event => {
                const matches = event.camActions.length
                    ? event.camActions.map(action => action.label || action.id || action.href || action.onclick || '(unlabelled)').join('; ')
                    : 'no likely cam-control actions';
                const removal = event.roomRemovalActions.length
                    ? ' · room removal: ' + event.roomRemovalActions.map(action => action.label || action.id || action.href || action.onclick || '(unlabelled)').join('; ')
                    : '';
                const restriction = event.roomRestrictionActions.length
                    ? ' · restriction: ' + event.roomRestrictionActions.map(action => action.label || action.id || action.href || action.onclick || '(unlabelled)').join('; ')
                    : '';
                const role = event.roomRoleActions.length
                    ? ' · role: ' + event.roomRoleActions.map(action => action.label || action.id || action.href || action.onclick || '(unlabelled)').join('; ')
                    : '';
                return `
                    <div class="ichc-camdiag-event ichc-camdiag-ev-${escapeAttr(event.status)}">
                        <span>${escapeHtml(event.time)}</span>
                        <b>${escapeHtml(event.status)}</b>
                        <code>${escapeHtml(event.nick || '(none)')}</code>
                        <span>${escapeHtml(matches + removal + restriction + role + (event.error ? ' · ' + event.error : ''))}</span>
                    </div>
                `;
            }).join('')
            : '<div class="ichc-camdiag-empty">No native delegated controls inspected yet. Use Inspect controls, or run ichcInspectDelegatedCamControl("nick") in the page console.</div>';

        const relaySessions = camDiagnosticState.relaySessions.length
            ? camDiagnosticState.relaySessions.slice(-12).map(session => {
                const parts = [
                    session.direction,
                    session.name ? 'cam ' + session.name : '',
                    session.command,
                    session.status ? 'status ' + session.status : '',
                    session.applicationName ? 'app ' + session.applicationName : '',
                    session.streamName ? 'stream ' + session.streamName : '',
                    session.sessionId ? 'sid ' + session.sessionId : '',
                    session.candidateCount != null ? 'candidates ' + session.candidateCount : '',
                    session.candidateSummary ? 'ice ' + session.candidateSummary : '',
                    session.hasSdp ? 'sdp' : '',
                ].filter(Boolean).join(' · ');
                return `
                    <div class="ichc-camdiag-event">
                        <span>${escapeHtml(session.lastSeen || session.firstSeen || '')}</span>
                        <b>${escapeHtml(session.phase || '')}</b>
                        <code>${escapeHtml(shortUrl(session.url || ''))}</code>
                        <span>${escapeHtml(parts || '(no parsed relay metadata)')}</span>
                    </div>
                `;
            }).join('')
            : '<div class="ichc-camdiag-empty">No parsed Wowza relay sessions yet. Open this panel before cam-up or cam refresh to capture publish/play signaling.</div>';

        const streamInventory = camDiagnosticState.streamInventory.length
            ? camDiagnosticState.streamInventory.slice(-8).map(entry => `
                <div class="ichc-camdiag-event ichc-camdiag-ev-${entry.ok ? 'pass' : 'warn'}">
                    <span>${escapeHtml(entry.time || '')}</span>
                    <b>${escapeHtml(entry.ok ? 'ok' : 'warn')}</b>
                    <code>${escapeHtml(shortUrl(entry.url || '') + ' ' + (entry.applicationName || ''))}</code>
                    <span>${escapeHtml(entry.streams.length ? entry.streams.join(', ') : entry.detail || 'no streams returned')}</span>
                </div>
            `).join('')
            : '<div class="ichc-camdiag-empty">No stream inventory probes yet. Use Probe streams after a relay session is captured or cached.</div>';

        const httpEvents = camDiagnosticState.httpEvents.length
            ? camDiagnosticState.httpEvents.slice(-12).map(event => `
                <div class="ichc-camdiag-event">
                    <span>${escapeHtml(event.time || '')}</span>
                    <b>${escapeHtml(event.transport || '')} ${escapeHtml(event.method || '')}${event.status ? ' ' + escapeHtml(event.status) : ''}</b>
                    <code>${escapeHtml(shortUrl(event.url || ''))}</code>
                    <span>${escapeHtml([event.body, event.response ? 'response=' + event.response : '', event.stackHint].filter(Boolean).join(' · '))}</span>
                </div>
            `).join('')
            : '<div class="ichc-camdiag-empty">No control-looking fetch/XHR calls captured yet. Leave diagnostics open while using room/cam controls to fingerprint the endpoint layer.</div>';

        const commandEffects = camDiagnosticState.commandEffects.length
            ? camDiagnosticState.commandEffects.slice(-12).map(effect => `
                <div class="ichc-camdiag-event">
                    <span>${escapeHtml(effect.time || '')}</span>
                    <b>${escapeHtml([effect.status, effect.outcome || '', effect.commandType ? '/' + effect.commandType + (effect.commandSubcommand ? ' ' + effect.commandSubcommand : '') : ''].filter(Boolean).join(' '))}</b>
                    <code>${escapeHtml(effect.command || '(no command)')}</code>
                    <span>${escapeHtml(effect.summary || '')}</span>
                </div>
            `).join('')
            : '<div class="ichc-camdiag-empty">No parsed SendMessage effects yet. Use cam or room controls while diagnostics is open.</div>';

        const endpointFindings = camDiagnosticState.controlEndpointFindings.length
            ? camDiagnosticState.controlEndpointFindings.slice(0, 20).map(item => `
                <div class="ichc-camdiag-event">
                    <span>${escapeHtml(item.label || '')}</span>
                    <b>${escapeHtml(shortUrl(item.src || ''))}</b>
                    <code>${escapeHtml(item.endpoint || '(keyword)')}</code>
                    <span></span>
                </div>
            `).join('')
            : '<div class="ichc-camdiag-empty">No static ICHC control endpoint scan yet. Run tests to inspect loaded page scripts.</div>';

        const functionSurfaces = camDiagnosticState.functionInspections.length
            ? camDiagnosticState.functionInspections.map(item => {
                const hints = [
                    item.exists ? '' : 'missing',
                    item.transports.length ? 'transports ' + item.transports.join(', ') : '',
                    item.urls.length ? 'urls ' + item.urls.join(', ') : '',
                    item.commands.length ? 'commands ' + item.commands.join(', ') : '',
                    item.length ? 'source ' + item.length + ' chars' : '',
                ].filter(Boolean).join(' · ');
                return `
                    <div class="ichc-camdiag-event">
                        <span>${escapeHtml(item.type || '')}</span>
                        <b>${escapeHtml(item.name || '')}</b>
                        <code>${escapeHtml(item.exists ? (item.transports.join(', ') || 'no transport hint') : 'missing')}</code>
                        <span>${escapeHtml(hints || item.snippet || '')}</span>
                    </div>
                `;
            }).join('')
            : '<div class="ichc-camdiag-empty">No page function fingerprints yet. Run tests or use Inspect funcs.</div>';

        body.innerHTML = `
            <div class="ichc-camdiag-section">${rows}</div>
            <div class="ichc-camdiag-section">
                <div class="ichc-camdiag-section-title">Wowza relay sessions</div>
                ${relaySessions}
            </div>
            <div class="ichc-camdiag-section">
                <div class="ichc-camdiag-section-title">Wowza stream inventory</div>
                ${streamInventory}
            </div>
            <div class="ichc-camdiag-section">
                <div class="ichc-camdiag-section-title">ICHC control HTTP</div>
                ${httpEvents}
            </div>
            <div class="ichc-camdiag-section">
                <div class="ichc-camdiag-section-title">ICHC command effects</div>
                ${commandEffects}
            </div>
            <div class="ichc-camdiag-section">
                <div class="ichc-camdiag-section-title">ICHC endpoint surface</div>
                ${endpointFindings}
            </div>
            <div class="ichc-camdiag-section">
                <div class="ichc-camdiag-section-title">ICHC function surfaces</div>
                ${functionSurfaces}
            </div>
            <div class="ichc-camdiag-section">
                <div class="ichc-camdiag-section-title">Delegated native controls</div>
                ${nativeActions}
            </div>
            <div class="ichc-camdiag-section">
                <div class="ichc-camdiag-section-title">Cam health events</div>
                ${camEvents}
            </div>
            <div class="ichc-camdiag-section">
                <div class="ichc-camdiag-section-title">Live signaling watcher</div>
                ${events}
            </div>
        `;
    }

    async function runCamDiagnostics() {
        if (camDiagnosticState.running) { return; }
        camDiagnosticState.running = true;
        camDiagnosticState.rows = [];
        installCamWebSocketWatcher();
        installControlHttpWatcher();
        renderCamDiagnostics();

        try {
            await probeCamBrowserEnvironment();
            probeCamCodecSupport();
            const candidates = await probeCamScripts();
            await probeIChcControlEndpointSurface();
            inspectControlFunctionSurfaces();
            await probeCamWebSockets(candidates);
            summarizeBrowserVisibleControlPlane(candidates);
            await probeCamIceConnectivity();
            await probeCamLoopbackRtc();
        } finally {
            camDiagnosticState.running = false;
            renderCamDiagnostics();
        }
    }

    async function probeCamBrowserEnvironment() {
        addCamDiagnosticRow(window.isSecureContext ? 'pass' : 'fail', 'Secure browser context', location.origin);
        addCamDiagnosticRow(navigator.mediaDevices?.getUserMedia ? 'pass' : 'fail', 'getUserMedia API', navigator.mediaDevices?.getUserMedia ? 'available' : 'missing');
        addCamDiagnosticRow(window.RTCPeerConnection ? 'pass' : 'fail', 'RTCPeerConnection API', window.RTCPeerConnection ? 'available' : 'missing');
        addCamDiagnosticRow(window.WebSocket ? 'pass' : 'fail', 'WebSocket API', window.WebSocket ? 'available' : 'missing');

        if (navigator.permissions?.query) {
            const camera = await queryPermissionState('camera');
            addCamDiagnosticRow(camera === 'denied' ? 'fail' : 'info', 'Camera permission', camera || 'unavailable');
            const microphone = await queryPermissionState('microphone');
            addCamDiagnosticRow(microphone === 'denied' ? 'fail' : 'info', 'Microphone permission', microphone || 'unavailable');
        }

        if (navigator.mediaDevices?.enumerateDevices) {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoInputs = devices.filter(device => device.kind === 'videoinput').length;
                const audioInputs = devices.filter(device => device.kind === 'audioinput').length;
                addCamDiagnosticRow(videoInputs ? 'pass' : 'warn', 'Local devices', `${videoInputs} camera(s), ${audioInputs} microphone(s)`);
            } catch (error) {
                addCamDiagnosticRow('warn', 'Local devices', error?.message || String(error));
            }
        }

        const conn = navigator.connection;
        if (conn) {
            const parts = [
                conn.effectiveType || '',
                conn.downlink ? `~${conn.downlink} Mbps down` : '',
                conn.rtt ? `~${conn.rtt} ms RTT` : '',
                conn.saveData ? 'data-saver ON' : '',
            ].filter(Boolean);
            addCamDiagnosticRow(conn.saveData ? 'warn' : 'info', 'Network estimate', parts.join(', ') || 'unavailable');
        }
    }

    function probeCamCodecSupport() {
        if (typeof window.RTCRtpSender?.getCapabilities !== 'function') {
            addCamDiagnosticRow('warn', 'Codec capabilities', 'RTCRtpSender.getCapabilities unavailable');
            return;
        }
        const names = kind => [...new Set((RTCRtpSender.getCapabilities(kind)?.codecs || [])
            .map(codec => codec.mimeType.replace(/^(video|audio)\//i, ''))
            .filter(name => !/^(rtx|red|ulpfec|flexfec-03|CN|telephone-event)$/i.test(name)))];
        const video = names('video');
        const audio = names('audio');
        addCamDiagnosticRow(video.length ? 'pass' : 'fail', 'Video codecs (send)', video.join(', ') || 'none');
        addCamDiagnosticRow(audio.length ? 'pass' : 'fail', 'Audio codecs (send)', audio.join(', ') || 'none');
        if (video.length && !video.some(name => /h264/i.test(name))) {
            addCamDiagnosticRow('warn', 'H264 support', 'not available — viewers on H264-only paths may see no video');
        }
    }

    // Gathers ICE candidates against a public STUN server. A srflx candidate proves
    // NAT traversal works; host-only means STUN/UDP is blocked (firewall, VPN, or
    // strict network) and publish/view will only work if the site relays via TURN.
    async function probeCamIceConnectivity() {
        const row = addCamDiagnosticRow('info', 'NAT / STUN reachability', 'gathering ICE candidates…');
        if (!window.RTCPeerConnection) {
            updateCamDiagnosticRow(row, 'fail', 'RTCPeerConnection unavailable');
            return;
        }
        const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
        const types = new Map();   // candidateType -> sample address
        try {
            await new Promise(resolve => {
                const timeout = window.setTimeout(resolve, 6000);
                pc.onicecandidate = event => {
                    if (!event.candidate) { window.clearTimeout(timeout); resolve(); return; }
                    const cand = event.candidate;
                    const type = cand.type || (cand.candidate.match(/ typ (\S+)/) || [])[1] || '?';
                    if (!types.has(type)) {
                        types.set(type, (cand.address || '') + (cand.port ? ':' + cand.port : ''));
                    }
                };
                pc.createDataChannel('ichc-ice-probe');
                pc.createOffer()
                    .then(offer => pc.setLocalDescription(offer))
                    .catch(() => { window.clearTimeout(timeout); resolve(); });
            });
            if (types.has('srflx')) {
                updateCamDiagnosticRow(row, 'pass', `STUN OK — public ${types.get('srflx')} (candidates: ${[...types.keys()].join(', ')})`);
            } else if (types.size) {
                updateCamDiagnosticRow(row, 'warn', `only ${[...types.keys()].join(', ')} candidates — STUN blocked (firewall/VPN?); cams need a TURN relay to work`);
            } else {
                updateCamDiagnosticRow(row, 'fail', 'no ICE candidates gathered — WebRTC networking blocked');
            }
        } catch (error) {
            updateCamDiagnosticRow(row, 'fail', error?.message || String(error));
        } finally {
            try { pc.close(); } catch (_) {}
        }
    }

    async function queryPermissionState(name) {
        try {
            const status = await navigator.permissions.query({ name });
            return status.state;
        } catch (_) {
            return '';
        }
    }

    async function probeCamScripts() {
        const scriptUrls = [...document.scripts]
            .map(script => script.src)
            .filter(src => /rtc|peer|publish|websocket|cam/i.test(src));
        addCamDiagnosticRow(scriptUrls.length ? 'pass' : 'warn', 'RTC scripts loaded', scriptUrls.length ? `${scriptUrls.length} matching script(s)` : 'none found');

        const candidates = new Set();
        const findings = [];
        const inspected = new Set();
        const queue = scriptUrls.slice(0, 8);
        for (let qi = 0; qi < queue.length && inspected.size < 18; qi++) {
            const src = queue[qi];
            if (inspected.has(src)) { continue; }
            inspected.add(src);
            const row = addCamDiagnosticRow('info', 'Inspect script', shortUrl(src));
            try {
                const response = await fetch(src, { cache: 'no-store', credentials: 'same-origin' });
                const text = await response.text();
                const found = extractWebSocketCandidates(text, src);
                found.forEach(url => candidates.add(url));
                findings.push(...extractControlPlaneFindings(text, src));
                extractImportedScriptCandidates(text, src).forEach(url => {
                    if (!inspected.has(url) && queue.length < 24) { queue.push(url); }
                });
                const hasWsConnect = /wsConnect|WebSocket/i.test(text);
                updateCamDiagnosticRow(row, response.ok ? 'pass' : 'warn', `${response.status} ${response.statusText}; ${found.length} socket candidate(s); ${hasWsConnect ? 'socket code present' : 'no socket literal'}; ${summarizeControlFindings(findings.filter(f => f.src === src))}`);
            } catch (error) {
                updateCamDiagnosticRow(row, 'warn', error?.message || String(error));
            }
        }
        camDiagnosticState.controlPlaneFindings = findings;

        return [...candidates];
    }

    function extractImportedScriptCandidates(text, baseUrl) {
        const found = new Set();
        const re = /\bimport(?:\s+[^'"]+\s+from\s+|\s*)['"]([^'"]+\.js)['"]/g;
        let match;
        while ((match = re.exec(text))) {
            try {
                const url = new URL(match[1], baseUrl).href;
                if (new URL(url).origin === location.origin) { found.add(url); }
            } catch (_) {}
        }
        return [...found];
    }

    function extractControlPlaneFindings(text, src) {
        const checks = [
            ['wowza-webrtc-signaling', /webrtc-session\.json|sendOffer|getOffer|sendResponse|streamInfo|applicationName|streamName/i],
            ['wowza-stream-list', /getAvailableStreams/i],
            ['publish-play-only', /direction["']?\s*:\s*["']?(publish|play)|command["']?\s*:\s*["']?(sendOffer|getOffer|sendResponse|getAvailableStreams)/i],
            ['native-room-command', /send_command|\/cam\s+(down|refuse)|\/kick|\/silence!?|\/muzzle|startRoomBan/i],
            ['origin-admin-hint', /8087|\/v2\/servers|jmx|incomingstreams|streammanager|unpublish|disconnectStream|shutdownStream|restapi|rest\/v2/i],
            ['turn-stun-config', /iceServers|stun:|turn:/i],
        ];
        return checks
            .filter(([, re]) => re.test(text))
            .map(([label]) => ({ label, src }));
    }

    function summarizeControlFindings(findings) {
        const labels = [...new Set((findings || []).map(f => f.label))];
        return labels.length ? 'findings: ' + labels.join(', ') : 'no control-plane keywords';
    }

    function summarizeBrowserVisibleControlPlane(candidates) {
        const labels = new Set((camDiagnosticState.controlPlaneFindings || []).map(f => f.label));
        const sawRelay = labels.has('wowza-webrtc-signaling') || camDiagnosticState.relaySessions.length || candidates.length;
        const sawStreamList = labels.has('wowza-stream-list');
        const sawNative = labels.has('native-room-command') || camDiagnosticState.nativeActionInspections.length;
        const sawAdmin = labels.has('origin-admin-hint');
        const verdict = [
            sawRelay ? 'Wowza WebRTC pub/sub signaling visible' : 'no relay signaling discovered statically yet',
            sawStreamList ? 'Wowza stream inventory command visible (getAvailableStreams)' : 'no Wowza stream-list command found yet',
            sawNative ? 'room moderation appears as site/native command surface' : 'no delegated room command surface inventoried yet',
            sawAdmin ? 'possible origin/admin keyword found in client scripts' : 'no browser-visible Wowza REST/JMX/admin control surface found',
        ].join('; ');
        addCamDiagnosticRow(sawAdmin ? 'warn' : 'info', 'Control plane verdict', verdict);
    }

    async function probeIChcControlEndpointSurface() {
        const findings = [];
        const sources = [];
        document.querySelectorAll('script:not([src])').forEach((script, index) => {
            const text = script.textContent || '';
            if (text) { sources.push({ src: 'inline-script-' + index, text }); }
        });
        const external = [...document.scripts]
            .map(script => script.src)
            .filter(src => src && sameOriginUrl(src))
            .filter(src => /ScriptResource|WebResource|chat|room|user|cam|ajax|jquery|modernizr/i.test(src))
            .slice(0, 16);
        for (const src of external) {
            try {
                const response = await fetch(src, { cache: 'no-store', credentials: 'same-origin' });
                const text = await response.text();
                sources.push({ src, text });
            } catch (_) {}
        }
        sources.forEach(source => {
            findings.push(...extractIChcEndpointFindings(source.text, source.src));
        });
        camDiagnosticState.controlEndpointFindings = dedupeEndpointFindings(findings).slice(0, 80);
        const labels = [...new Set(camDiagnosticState.controlEndpointFindings.map(item => item.label))];
        const endpoints = [...new Set(camDiagnosticState.controlEndpointFindings.map(item => item.endpoint).filter(Boolean))];
        addCamDiagnosticRow(
            endpoints.length ? 'info' : 'warn',
            'ICHC endpoint surface',
            endpoints.length
                ? `${endpoints.length} endpoint hint(s); ${labels.join(', ')}`
                : 'no ASP.NET/PageMethod-style control endpoints found in loaded scripts'
        );
    }

    function sameOriginUrl(url) {
        try { return new URL(url, location.href).origin === location.origin; } catch (_) { return false; }
    }

    function extractIChcEndpointFindings(text, src) {
        const out = [];
        const patterns = [
            ['send-message-endpoint', /(?:["'])([^"']*chat\.aspx\/SendMessage[^"']*)(?:["'])/ig],
            ['room-ban-endpoint', /(?:["'])(\/roomban\b[^"']*)(?:["'])/ig],
            ['aspnet-page-method', /(?:["'])([^"']*\.aspx\/[A-Za-z0-9_]+[^"']*)(?:["'])/ig],
            ['asmx-service-method', /(?:["'])([^"']*\.asmx\/[A-Za-z0-9_]+[^"']*)(?:["'])/ig],
            ['control-url', /(?:["'])(\/(?:cam|room|ban|kick|chat|message|moder|ignore|follow|roomban|banned)\b[^"']*)(?:["'])/ig],
        ];
        patterns.forEach(([label, re]) => {
            let match;
            while ((match = re.exec(text))) {
                out.push({ label, endpoint: match[1], src });
            }
        });
        const keywords = [
            ['send-command-function', /\bsend_command\s*\(/i],
            ['keystring-token', /\bkeyString\b/i],
            ['aspnet-scriptmanager', /Sys\.Net\.WebServiceProxy|PageMethods|ScriptResource\.axd/i],
            ['room-ban-function', /\bstartRoomBan\b/i],
        ];
        keywords.forEach(([label, re]) => {
            if (re.test(text)) { out.push({ label, endpoint: '', src }); }
        });
        return out;
    }

    function dedupeEndpointFindings(findings) {
        const seen = new Set();
        return (findings || []).filter(item => {
            const key = [item.label || '', item.endpoint || '', item.src || ''].join('|');
            if (seen.has(key)) { return false; }
            seen.add(key);
            return true;
        });
    }

    function extractWebSocketCandidates(text, baseUrl) {
        const found = new Set();
        const absolute = text.match(/wss?:\/\/[^'"`\\\s)<]+/gi) || [];
        absolute.forEach(url => found.add(url));

        const relativeRe = /["'`](\/[^"'`]*?(?:ws|websocket|rtc|peer|publish|signal)[^"'`]*)["'`]/gi;
        let match;
        while ((match = relativeRe.exec(text))) {
            try { found.add(new URL(match[1], baseUrl).href.replace(/^http/i, location.protocol === 'https:' ? 'wss' : 'ws')); } catch (_) {}
        }
        return [...found].filter(url => /^wss?:/i.test(url));
    }

    async function probeCamWebSockets(candidates) {
        if (!candidates.length) {
            addCamDiagnosticRow('warn', 'Static WebSocket probe', 'No literal socket URL found; use live watcher while clicking Go Live');
            return;
        }

        for (const url of candidates.slice(0, 6)) {
            const row = addCamDiagnosticRow('info', 'WebSocket probe', shortUrl(url));
            const result = await testWebSocket(url);
            updateCamDiagnosticRow(row, result.ok ? 'pass' : 'fail', result.detail);
        }
    }

    function testWebSocket(url) {
        return new Promise(resolve => {
            let socket;
            let settled = false;
            const timeout = window.setTimeout(() => finish(false, 'timeout after 5s'), 5000);
            function finish(ok, detail) {
                if (settled) { return; }
                settled = true;
                window.clearTimeout(timeout);
                try { socket?.close(); } catch (_) {}
                resolve({ ok, detail });
            }
            try {
                socket = new WebSocket(url);
                socket.addEventListener('open', () => finish(true, 'opened'));
                socket.addEventListener('error', () => finish(false, 'error event'));
                socket.addEventListener('close', event => {
                    finish(event.code === 1000 || event.code === 1005, `closed code=${event.code} clean=${event.wasClean}`);
                });
            } catch (error) {
                finish(false, error?.message || String(error));
            }
        });
    }

    async function probeCamLoopbackRtc() {
        const row = addCamDiagnosticRow('info', 'Browser RTC loopback', 'starting');
        if (!window.RTCPeerConnection) {
            updateCamDiagnosticRow(row, 'fail', 'RTCPeerConnection unavailable');
            return;
        }

        const a = new RTCPeerConnection();
        const b = new RTCPeerConnection();
        let timeout;
        try {
            const result = await new Promise(async resolve => {
                timeout = window.setTimeout(() => resolve({ ok: false, detail: 'timeout after 8s' }), 8000);
                a.onicecandidate = event => event.candidate && b.addIceCandidate(event.candidate).catch(() => {});
                b.onicecandidate = event => event.candidate && a.addIceCandidate(event.candidate).catch(() => {});
                b.ondatachannel = event => {
                    event.channel.onopen = () => resolve({ ok: true, detail: 'data channel opened' });
                };
                const channel = a.createDataChannel('ichc-cam-test');
                channel.onopen = () => resolve({ ok: true, detail: 'data channel opened' });
                const offer = await a.createOffer();
                await a.setLocalDescription(offer);
                await b.setRemoteDescription(offer);
                const answer = await b.createAnswer();
                await b.setLocalDescription(answer);
                await a.setRemoteDescription(answer);
            });
            updateCamDiagnosticRow(row, result.ok ? 'pass' : 'fail', result.detail);
        } catch (error) {
            updateCamDiagnosticRow(row, 'fail', error?.message || String(error));
        } finally {
            window.clearTimeout(timeout);
            try { a.close(); } catch (_) {}
            try { b.close(); } catch (_) {}
        }
    }

    // ── Camera capture test ──────────────────────────────────────────────────────
    // Actually opens the camera + mic (the auto probes never do) and shows a short
    // live preview, so "is my cam physically working" gets a direct answer.
    let _camCaptureStream = null;
    let _camCaptureTimer = 0;

    async function runCamCaptureTest() {
        stopCamCaptureTest();
        const row = addCamDiagnosticRow('info', 'Camera capture', 'requesting camera + microphone…');
        if (!navigator.mediaDevices?.getUserMedia) {
            updateCamDiagnosticRow(row, 'fail', 'getUserMedia unavailable');
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            _camCaptureStream = stream;
            const video = stream.getVideoTracks()[0];
            const audio = stream.getAudioTracks()[0];
            const settings = video?.getSettings?.() || {};
            const size = settings.width ? `${settings.width}×${settings.height}` : 'unknown size';
            const fps = settings.frameRate ? `@${Math.round(settings.frameRate)}fps` : '';
            updateCamDiagnosticRow(row, 'pass',
                `${video?.label || 'camera'} — ${size}${fps}` +
                (audio ? `; mic: ${audio.label || 'default'}` : '; no mic track'));
            _showCamCapturePreview(stream);
            _camCaptureTimer = window.setTimeout(() => stopCamCaptureTest(), 10000);
        } catch (error) {
            updateCamDiagnosticRow(row, 'fail', _decodeGumError(error));
        }
    }

    function _decodeGumError(error) {
        const name = error?.name || '';
        const known = {
            NotAllowedError: 'permission denied — allow camera/mic for this site (icon in the address bar)',
            NotFoundError: 'no camera or microphone found on this machine',
            NotReadableError: 'device busy — another app (OBS, Zoom, another tab…) is holding the camera',
            OverconstrainedError: 'device cannot satisfy the requested constraints',
            SecurityError: 'blocked by browser security settings',
            AbortError: 'device start aborted — try unplugging/replugging the camera',
        };
        return known[name] || `${name || 'Error'}: ${error?.message || error}`;
    }

    function _showCamCapturePreview(stream) {
        const slot = document.querySelector('#ichc-cam-diagnostics .ichc-camdiag-preview');
        if (!slot) { return; }
        slot.hidden = false;
        slot.innerHTML = '';
        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.srcObject = stream;
        const stop = document.createElement('button');
        stop.type = 'button';
        stop.className = 'ichc-camdiag-preview-stop';
        stop.textContent = 'Stop preview';
        stop.addEventListener('click', () => stopCamCaptureTest());
        slot.append(video, stop);
    }

    function stopCamCaptureTest() {
        if (_camCaptureTimer) { window.clearTimeout(_camCaptureTimer); _camCaptureTimer = 0; }
        if (_camCaptureStream) {
            try { _camCaptureStream.getTracks().forEach(track => track.stop()); } catch (_) {}
            _camCaptureStream = null;
        }
        const slot = document.querySelector('#ichc-cam-diagnostics .ichc-camdiag-preview');
        if (slot) { slot.hidden = true; slot.innerHTML = ''; }
    }

    function copyCamDiagnosticReport() {
        const lines = [
            'ICHC cam diagnostics',
            `URL: ${location.href}`,
            `Time: ${new Date().toISOString()}`,
            '',
            ...camDiagnosticState.rows.map(row => `[${row.status}] ${row.label}: ${row.detail || ''}`),
            '',
            'Wowza relay sessions:',
            ...(camDiagnosticState.relaySessions.length
                ? camDiagnosticState.relaySessions.map(session =>
                    `${session.lastSeen || session.firstSeen || ''} ${session.phase || ''} ${session.direction || ''} ${session.command || ''} ` +
                    `cam=${session.name || ''} ` +
                    `status=${session.status || ''} app=${session.applicationName || ''} stream=${session.streamName || ''} ` +
                    `session=${session.sessionId || ''} candidates=${session.candidateCount ?? ''} ice=${session.candidateSummary || ''} sdp=${session.hasSdp ? 'yes' : 'no'} url=${session.url || ''}`
                )
                : ['none']),
            '',
            'Browser-visible control-plane findings:',
            ...(camDiagnosticState.controlPlaneFindings.length
                ? camDiagnosticState.controlPlaneFindings.map(f => `${f.label}: ${shortUrl(f.src || '')}`)
                : ['none']),
            '',
            'Wowza stream inventory:',
            ...(camDiagnosticState.streamInventory.length
                ? camDiagnosticState.streamInventory.map(entry =>
                    `${entry.time} ${entry.ok ? 'ok' : 'warn'} app=${entry.applicationName || ''} url=${entry.url || ''} ` +
                    `status=${entry.status || ''} streams=${entry.streams.join(', ')} detail=${entry.detail || ''}`
                )
                : ['none']),
            '',
            'ICHC control HTTP events:',
            ...(camDiagnosticState.httpEvents.length
                ? camDiagnosticState.httpEvents.map(event =>
                    `${event.time} ${event.transport || ''} ${event.method || ''} ${event.url || ''} status=${event.status || ''} body=${event.body || ''} response=${event.response || ''} stack=${event.stackHint || ''}`
                )
                : ['none']),
            '',
            'ICHC command effects:',
            ...(camDiagnosticState.commandEffects.length
                ? camDiagnosticState.commandEffects.flatMap(effect => [
                    `${effect.time} status=${effect.status || ''} outcome=${effect.outcome || ''} type=${effect.commandType || ''} subcommand=${effect.commandSubcommand || ''} target=${effect.commandTarget || ''} duration=${effect.commandDuration || ''} reason=${effect.commandReason || ''} issue=${effect.commandIssue || ''} command=${effect.command || ''} summary=${effect.summary || ''}`,
                    ...effect.packets.map(packet =>
                        `  - [${packet.code || ''}] ${packet.type || ''} stream=${packet.streamName || ''} app=${packet.applicationName || ''} host=${packet.relayHost || ''} nick=${packet.nick || ''} from=${packet.from || ''} to=${packet.to || ''} color=${packet.color || ''} text=${packet.text || packet.value || ''}`
                    ),
                ])
                : ['none']),
            '',
            'ICHC endpoint surface:',
            ...(camDiagnosticState.controlEndpointFindings.length
                ? camDiagnosticState.controlEndpointFindings.map(item =>
                    `${item.label || ''}: ${item.endpoint || '(keyword)'} src=${shortUrl(item.src || '')}`
                )
                : ['none']),
            '',
            'ICHC function surfaces:',
            ...(camDiagnosticState.functionInspections.length
                ? camDiagnosticState.functionInspections.map(item =>
                    `${item.exists ? 'present' : 'missing'} ${item.name || ''} type=${item.type || ''} transports=${item.transports.join(', ')} urls=${item.urls.join(', ')} commands=${item.commands.join(', ')} sourceChars=${item.length || 0}`
                )
                : ['none']),
            '',
            'Cam health events:',
            ...(camDiagnosticState.camEvents.length
                ? camDiagnosticState.camEvents.map(event => `${event.time} ${event.state} ${event.name} ${event.info}`)
                : ['none']),
            '',
            'Delegated native control inspections:',
            ...(camDiagnosticState.nativeActionInspections.length
                ? camDiagnosticState.nativeActionInspections.flatMap(event => [
                    `${event.time} ${event.status} ${event.nick || '(none)'} dialogs=${event.dialogs} actions=${event.actions.length} camActions=${event.camActions.length} roomRemovalActions=${event.roomRemovalActions.length} roomRestrictionActions=${event.roomRestrictionActions.length} roomRoleActions=${event.roomRoleActions.length}${event.error ? ' error=' + event.error : ''}`,
                    ...event.actions.map(action =>
                        `  - ${action.likelyCamControl ? '[cam?] ' : ''}${action.likelyRoomRemovalControl ? '[remove?] ' : ''}${action.likelyRoomRestrictionControl ? '[restrict?] ' : ''}${action.likelyRoomRoleControl ? '[role?] ' : ''}${action.tag || ''} ${action.label || action.id || '(unlabelled)'} ` +
                        `cmd=${action.nativeCommand || ''} href=${action.href || ''} form=${action.formMethod || ''} ${action.formAction || ''} onclick=${action.onclick || ''}`
                    ),
                ])
                : ['none']),
            '',
            'Captured WebSocket events:',
            ...(camDiagnosticState.wsEvents.length
                ? camDiagnosticState.wsEvents.map(event => `${event.time} ${event.phase} ${event.url} ${event.info}`)
                : ['none']),
        ];
        navigator.clipboard?.writeText(lines.join('\n')).catch(() => {});
    }

    function shortUrl(url) {
        try {
            const parsed = new URL(url, location.href);
            return parsed.pathname + parsed.search;
        } catch (_) {
            return String(url || '');
        }
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        }[char]));
    }

    function escapeAttr(value) {
        return String(value).replace(/[^a-z0-9_-]/gi, '');
    }

    let _lastReloadAt = 0;
    let _reloadQueuedTimer = null;

    function triggerReload() {
        const btn = document.getElementById('ichc-reload-cams-btn');
        if (btn) {
            btn.classList.add('ichc-spinning');
            window.setTimeout(() => btn.classList.remove('ichc-spinning'), 2000);
        }
        reloadCams();
    }

    document.addEventListener('ichc-trigger-reload', () => triggerReload());

    function reloadCams() {
        // Match the site's native five-second cam-refresh cooldown. If another
        // request arrives during it, keep one trailing refresh rather than drop it.
        // If a reload is requested during the cooldown, queue one for when it expires
        // so new cams that arrive mid-cooldown aren't permanently missed.
        const now = Date.now();
        const remaining = _lastReloadAt + 5000 - now;
        if (remaining > 0) {
            window.clearTimeout(_reloadQueuedTimer);
            _reloadQueuedTimer = window.setTimeout(() => {
                _reloadQueuedTimer = null;
                reloadCams();
            }, remaining + 50);
            return;
        }
        window.clearTimeout(_reloadQueuedTimer);
        _reloadQueuedTimer = null;
        _lastReloadAt = now;
        // Reset ghost-classifier timestamps BEFORE the refresh so any early
        // MutationObserver-driven relayout (which can fire before 150ms) uses
        // fresh timestamps and doesn't immediately ghost-lock cards whose
        // streams are still reconnecting (display:none freezes media init).
        const _resetFirstSeen = () => {
            const t = String(Date.now());
            getCamCards().forEach(card => { card.dataset.ichcFirstSeenAt = t; });
        };
        _resetFirstSeen();

        // The native refreshCams() silently returns while its shared flood flag is
        // set. Send the exact command it wraps so a manual refresh always works and
        // never reloads the tab (which would stop an outbound broadcast).
        runInPageContext(`
(() => {
    if (typeof window.send_command === 'function') {
        window.send_command('/cam refresh');
        return;
    }
    if (typeof window.refreshCams === 'function') {
        if (typeof window.canPushAgain === 'function') { window.canPushAgain(); }
        window.refreshCams();
    }
})();
        `);

        // Reset once more after 200ms for cards created/kept by refreshCams(),
        // then trigger an explicit relayout.
        window.setTimeout(() => { _resetFirstSeen(); requestCamRelayout(80); }, 200);

        // Re-attach observer if refreshCams() replaced #cams entirely.
        window.setTimeout(() => {
            const cams = document.getElementById('cams');
            if (cams && !cams.dataset.ichcCamLayout) { initCamLayout(); initUserList(); }
        }, 800);

        // Late checkpoint for slow-connecting streams.
        window.setTimeout(() => requestCamRelayout(40), 5000);
    }

    let _ulCollapsed = false;

    function _toggleUserListCollapse() {
        _ulCollapsed = !_ulCollapsed;
        const shell = document.getElementById('ichc-chat-shell');
        shell?.classList.toggle('ichc-ul-collapsed', _ulCollapsed);
        document.documentElement.classList.toggle('ichc-ul-collapsed', _ulCollapsed);
        // Sync the collapse button dot state
        const collapseBtn = document.getElementById('ichc-ul-collapse-btn');
        if (collapseBtn) {
            collapseBtn.classList.toggle('ichc-ul-is-collapsed', _ulCollapsed);
            collapseBtn.title = _ulCollapsed ? 'Expand user list' : 'Collapse user list';
        }
        // The userlist's pinned height differs by collapsed state (it extends behind
        // the frosted input bar only when expanded), so re-run the layout pass.
        layoutChat();
    }

    function transformCommandBar() {
        // Hide command bar native buttons (do this every call so it catches late-loaded bars)
        const bar = document.getElementById('room_command_bar');
        if (bar && bar.dataset.ichcCogDone !== '1') {
            bar.dataset.ichcCogDone = '1';
            const hideByIds = ['scrollControl', 'chatFontSize', 'Div4', 'toggleEmoticons', 'togglePMViewing'];
            hideByIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) { el.classList.add('ichc-cmd-hidden'); }
            });
            bar.querySelectorAll('.chat_button a[href*="clearChatHistory"]').forEach(a => {
                a.closest('.chat_button')?.classList.add('ichc-cmd-hidden');
            });
        }

        const txtMsg = document.getElementById('txtMsg');
        const sendBtn = document.getElementById('btn');
        if (!txtMsg || !sendBtn) { return; }

        const chatShell = document.getElementById('ichc-chat-shell');
        if (!chatShell) { return; }

        // Wrap txtMsg + sendBtn in input row if not done yet.
        // Moving a focused element in the DOM causes focus loss — save and restore.
        let inputRow = document.getElementById('ichc-input-row');
        if (!inputRow) {
            const _hadFocus = document.activeElement === txtMsg;
            inputRow = document.createElement('div');
            inputRow.id = 'ichc-input-row';
            chatShell.appendChild(inputRow);
            inputRow.appendChild(txtMsg);
            inputRow.appendChild(sendBtn);
            if (_hadFocus) { txtMsg.focus(); }
        } else if (inputRow.parentElement !== chatShell) {
            const _hadFocus = document.activeElement === txtMsg;
            chatShell.appendChild(inputRow);
            if (_hadFocus) { txtMsg.focus(); }
        }

        // If pm/cog/gif buttons already exist, ensure correct placement and return.
        if (document.getElementById('ichc-cog-wrapper')) {
            // Cog lives in #ichc-header-actions
            const cogWrapper = document.getElementById('ichc-cog-wrapper');
            const actions = document.getElementById('ichc-header-actions');
            if (cogWrapper && actions && !actions.contains(cogWrapper)) {
                actions.appendChild(cogWrapper);
            }
            // Theme btn lives in the left section of the footer
            const footerBar = document.getElementById('ichc-footer-bar');
            const themeBtn = document.getElementById('ichc-theme-toggle-btn');
            const _footerLeft = document.getElementById('ichc-footer-left') || footerBar;
            if (themeBtn && _footerLeft && !_footerLeft.contains(themeBtn)) {
                _footerLeft.appendChild(themeBtn);
            }
            const _camDiagBtn = document.getElementById('ichc-cam-test-btn');
            if (_camDiagBtn && _footerLeft && !_footerLeft.contains(_camDiagBtn)) {
                _footerLeft.appendChild(_camDiagBtn);
            }
            const _reloadBtn = document.getElementById('ichc-reload-cams-btn');
            if (_reloadBtn && _footerLeft && !_footerLeft.contains(_reloadBtn)) {
                _footerLeft.appendChild(_reloadBtn);
            }
            // PM button lives inside the pm-avatar strip
            const _er_pmBtn = document.getElementById('ichc-pm-toggle-btn');
            const _er_pmAvStrip = document.getElementById('ichc-pm-avatars');
            if (_er_pmBtn && _er_pmAvStrip && !_er_pmAvStrip.contains(_er_pmBtn)) {
                _er_pmAvStrip.insertBefore(_er_pmBtn, _er_pmAvStrip.firstChild || null);
            }
            // PM avatars live below the header in #ichc-userlist panel
            const userlistPanel = document.getElementById('ichc-userlist');
            const pmAvStrip = document.getElementById('ichc-pm-avatars');
            if (pmAvStrip && userlistPanel && !userlistPanel.contains(pmAvStrip)) {
                const _ulHdr = userlistPanel.querySelector('.ichc-ul-header');
                if (_ulHdr) { _ulHdr.after(pmAvStrip); } else { userlistPanel.insertBefore(pmAvStrip, userlistPanel.firstChild); }
            }
            // gif lives directly in inputRow, between txtMsg and sendBtn
            const gifWrap = document.getElementById('ichc-gif-wrapper');
            if (gifWrap && inputRow && !inputRow.contains(gifWrap)) {
                inputRow.insertBefore(gifWrap, sendBtn);
            }
            // more-btn lives in inputRow, after gif and before send
            const _er_moreBtn = document.querySelector('.ichc-ul-more-btn');
            if (_er_moreBtn && inputRow && !inputRow.contains(_er_moreBtn)) {
                inputRow.insertBefore(_er_moreBtn, sendBtn);
            }
            // collapse tab lives in bottom-right of #ichc-pm-avatars (falls back to header)
            const _er_collapseBtn = document.getElementById('ichc-ul-collapse-btn');
            const _er_pmAv = document.getElementById('ichc-pm-avatars');
            const _er_ulHeader = document.querySelector('#ichc-userlist .ichc-ul-header');
            if (_er_collapseBtn) {
                const _target = _er_pmAv || _er_ulHeader;
                if (_target && !_target.contains(_er_collapseBtn)) {
                    _target.appendChild(_er_collapseBtn);
                }
            }
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.id = 'ichc-cog-wrapper';

        const cogBtn = document.createElement('button');
        cogBtn.type = 'button';
        cogBtn.id = 'ichc-cog-btn';
        cogBtn.title = 'Chat settings';
        cogBtn.setAttribute('aria-haspopup', 'true');
        cogBtn.setAttribute('aria-expanded', 'false');
        cogBtn.innerHTML = ICONS.cog;

        const menu = document.createElement('div');
        menu.id = 'ichc-cog-menu';
        menu.setAttribute('role', 'menu');

        // Read the current notification state label from the native button's img title.
        // The site cycles the title as the user toggles (e.g. "Show Notifications" →
        // "Mentions Only" → "No Notifications"), so we mirror it in the menu item.
        function getNotifLabel() {
            const img = document.querySelector('#showNotifications img.smicon');
            const raw = (img?.title || img?.alt || '').trim();
            return raw || 'Notifications';
        }

        const items = [
            {
                label: getNotifLabel(),
                icon: ICONS.bell,
                action(labelEl) {
                    runInPageContext('if (typeof toggleNotifications === "function") { toggleNotifications(); }');
                    window.setTimeout(() => {
                        if (labelEl) { labelEl.textContent = getNotifLabel(); }
                    }, 50);
                },
            },
            {
                // Explicit two-state toggle for our own mention/PM ping. This used to
                // call the site's toggleChatSound(), whose state we could not read and
                // whose label therefore said nothing about what would actually happen.
                label: 'Mention/PM sound: ' + (_pingEnabled() ? 'Ping' : 'Off'),
                icon: ICONS.volume,
                keepOpen: true,
                action(labelEl) {
                    const on = !_pingEnabled();
                    _setPingEnabled(on);
                    if (labelEl) { labelEl.textContent = 'Mention/PM sound: ' + (on ? 'Ping' : 'Off'); }
                    // Preview on enable so the setting proves itself immediately
                    if (on) { _playPing(true); }
                },
            },
            {
                label: 'Broadcast quality: ' + _bcastQLabel(),
                icon: ICONS.gauge,
                qualityPicker: true,
                keepOpen: true,
            },
            {
                label: 'Observed rooms',
                icon: ICONS.eye,
                obsPicker: true,
                keepOpen: true,
            },
            {
                label: 'Last msg cam overlay: ' + (_lastMsgOn() ? 'On' : 'Off'),
                icon: ICONS.chat,
                keepOpen: true,
                action(labelEl) {
                    const on = !_lastMsgOn();
                    _setLastMsgOn(on);
                    if (labelEl) { labelEl.textContent = 'Last msg cam overlay: ' + (on ? 'On' : 'Off'); }
                },
            },
            {
                label: 'Auto-restart cams: ' + (_autoRestartEnabled() ? 'On' : 'Off'),
                icon: ICONS.rotate,
                keepOpen: true,
                action(labelEl) {
                    const on = !_autoRestartEnabled();
                    if (on) { lurkState.limitHit = false; }
                    // _setAutoRestart repaints the label, the paused-screen toggle
                    // and the topbar indicator through _syncAutoRestartUi.
                    _setAutoRestart(on);
                    if (on) {
                        // If cams are currently paused, start the countdown now.
                        if (document.getElementById('cams')?.classList.contains('ichc-lurk-active')) {
                            _scheduleCamAutoRestart();
                        }
                    } else {
                        _cancelCamAutoRestart();
                    }
                    if (labelEl) { labelEl.textContent = 'Auto-restart cams: ' + (on ? 'On' : 'Off'); }
                },
            },
            {
                label: 'Text color',
                icon: ICONS.palette,
                // Renders the swatch AS an <input type="color">; the wiring and the
                // saved value are applied where the row is built.
                colorInput: true,
                // The menu stays open: the native colour dialog is a separate OS
                // window, and the input it belongs to must remain in the document
                // while that dialog is up.
                keepOpen: true,
                action(labelEl) {
                    // The site's own dialog is NOT used. From its scripts110725.js,
                    // pickColor() ends with $("#colorDiv").toggle() and then branches
                    // on :visible — but #colorDiv is not in the room document, so
                    // toggle() hit an empty set, :visible was false, and the site ran
                    // its else branch, as(), which focuses the chat input. That is
                    // exactly what was reported: menu closes, chat box takes focus,
                    // nothing else. An earlier comment in this file had already found
                    // the same thing ("neither of which exists").
                    //
                    // What actually applies a colour, from the site's onColorSave():
                    //     set_cookie("textcolor", hex); send_command("/color " + hex);
                    // Both are plain page globals, so a native colour input driving
                    // those two calls does the whole job.
                    //
                    // Clicking the swatch itself already opens the dialog — this only
                    // forwards a click on the rest of the row, and is why the swatch
                    // stops propagation rather than letting it bubble back here.
                    const input = labelEl?.closest?.('.ichc-cog-item')
                        ?.querySelector('input.ichc-color-swatch');
                    if (input) { input.click(); }
                },
            },
            { label: 'Image viewing',   icon: ICONS.imageIcon, fn: 'toggleImages()' },
            { label: 'PM preferences',  icon: ICONS.phone,     fn: 'togglePMPrefs()' },
            {
                label: `Theme: ${currentTheme().label}`,
                icon:  currentTheme().light ? ICONS.sun : ICONS.moon,
                themePicker: true,
                keepOpen: true,
            },
            { label: 'Help',            icon: ICONS.question,  href: 'help' },
        ];
        items.forEach(item => {
            const el = document.createElement('a');
            el.className = 'ichc-cog-item';
            el.setAttribute('role', 'menuitem');
            if (item.href) {
                el.href = item.href;
                el.target = '_blank';
                el.rel = 'noopener';
            } else {
                el.href = '#';
                el.addEventListener('click', e => {
                    e.preventDefault();
                    if (item.action) {
                        item.action(el.querySelector('.ichc-cog-item-label'));
                        // Keep menu open for Notifications so user can see state cycle
                        if (!item.keepOpen) {
                            menu.hidden = true;
                            cogBtn.setAttribute('aria-expanded', 'false');
                        }
                    } else if (item.fn) {
                        runInPageContext(item.fn);
                        if (!item.keepOpen) {
                            menu.hidden = true;
                            cogBtn.setAttribute('aria-expanded', 'false');
                        }
                    }
                    // Neither `action` nor `fn` means an EXPANDABLE item (the theme
                    // picker, the broadcast-quality picker). Its own listener below
                    // toggles the sub-list, and this handler must do nothing at all.
                    //
                    // It used to fall into the `else` above, which closed the entire
                    // cog menu the instant you clicked an expander — you never got to
                    // see the sub-list you had just opened. It also called
                    // `runInPageContext(undefined)`, firing a bogus
                    // `{type:'ichc-exec', code: undefined}` message at the background
                    // script on every such click. That silently did nothing because
                    // runInPageContext is fire-and-forget with a swallowed rejection,
                    // which is exactly why it went unnoticed.
                });
            }
            // The colour row's swatch IS the <input type="color">, not a span beside
            // one. A zero-sized, transparent input is not something Firefox will
            // open a colour dialog for, and an invisible control is also worse to
            // use — this way the dot the user can see is the control itself, and a
            // direct click on it needs no programmatic .click() at all.
            const swatchHtml = item.colorInput
                ? '<input type="color" class="ichc-color-swatch ichc-color-input" aria-label="Chat text colour">'
                : (item.swatch ? '<span class="ichc-color-swatch" aria-hidden="true"></span>' : '');
            el.innerHTML = `<span class="ichc-cog-item-icon" aria-hidden="true">${item.icon}</span><span class="ichc-cog-item-label">${item.label}</span>${swatchHtml}`;
            if (item.themePicker) {
                // Expands in place rather than flying out sideways: the cog menu is
                // already anchored near the viewport edge, so a nested popover would
                // need collision handling for one list of six fixed rows.
                el.classList.add('ichc-cog-item-expandable');
                el.setAttribute('aria-expanded', 'false');
                const list = document.createElement('div');
                list.className = 'ichc-theme-list';
                list.hidden = true;
                THEMES.forEach(theme => {
                    const row = document.createElement('button');
                    row.type = 'button';
                    row.className = 'ichc-theme-row';
                    row.dataset.themeId = theme.id;
                    row.setAttribute('aria-current', String(theme.id === currentThemeId()));
                    row.innerHTML =
                        `<span class="ichc-theme-swatch" aria-hidden="true">` +
                        theme.swatch.map(c => `<i style="background:${c}"></i>`).join('') +
                        `</span><span class="ichc-theme-name"></span>`;
                    row.querySelector('.ichc-theme-name').textContent = theme.label;
                    row.addEventListener('click', e => {
                        e.preventDefault();
                        e.stopPropagation();
                        applyTheme(theme.id);
                        list.querySelectorAll('.ichc-theme-row').forEach(r => {
                            r.setAttribute('aria-current', String(r.dataset.themeId === theme.id));
                        });
                        const labelEl = el.querySelector('.ichc-cog-item-label');
                        if (labelEl) { labelEl.textContent = `Theme: ${theme.label}`; }
                        const iconEl = el.querySelector('.ichc-cog-item-icon');
                        if (iconEl) { iconEl.innerHTML = theme.light ? ICONS.sun : ICONS.moon; }
                        const footerBtn = document.getElementById('ichc-theme-toggle-btn');
                        if (footerBtn) { footerBtn.innerHTML = theme.light ? ICONS.moon : ICONS.sun; }
                    });
                    list.appendChild(row);
                });
                el.addEventListener('click', () => {
                    list.hidden = !list.hidden;
                    el.setAttribute('aria-expanded', String(!list.hidden));
                });
                item.afterEl = list;
            }
            if (item.obsPicker) {
                // Same expand-in-place shell as the theme and quality pickers.
                // Rows are REBUILT on every expand rather than once at cog build:
                // room status is live data, and the menu outlives many
                // observe/unobserve cycles.
                el.classList.add('ichc-cog-item-expandable');
                el.setAttribute('aria-expanded', 'false');
                const list = document.createElement('div');
                list.className = 'ichc-theme-list ichc-obs-list';
                list.hidden = true;
                let statusTimer = 0;
                const rebuild = () => {
                    list.textContent = '';
                    const rooms = _obsRooms().filter(r => r !== _obsCurrentRoom());
                    if (!rooms.length) {
                        const empty = document.createElement('div');
                        empty.className = 'ichc-obs-empty';
                        empty.textContent = 'No rooms observed';
                        list.appendChild(empty);
                    }
                    rooms.forEach(room => {
                        const row = document.createElement('div');
                        row.className = 'ichc-obs-row';
                        const name = document.createElement('span');
                        name.className = 'ichc-obs-name';
                        name.textContent = room;
                        const status = document.createElement('span');
                        status.className = 'ichc-obs-status';
                        status.textContent = _obsState.frames.get(room)?.status || 'starting…';
                        const remove = document.createElement('button');
                        remove.type = 'button';
                        remove.className = 'ichc-obs-remove';
                        remove.title = 'Stop observing ' + room;
                        remove.innerHTML = ICONS.xmark;
                        remove.addEventListener('click', e => {
                            e.preventDefault();
                            e.stopPropagation();
                            _obsSaveRooms(_obsRooms().filter(r => r !== room));
                            rebuild();
                        });
                        row.append(name, status, remove);
                        list.appendChild(row);
                    });
                    const add = document.createElement('button');
                    add.type = 'button';
                    add.className = 'ichc-theme-row ichc-obs-add';
                    add.textContent = '+ Observe a room…';
                    add.addEventListener('click', e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const room = (window.prompt('Room to observe (its cams join this plane; chat stays here):') || '')
                            .trim().toLowerCase();
                        if (!room || room === _obsCurrentRoom()) { return; }
                        _obsSaveRooms([..._obsRooms(), room]);
                        rebuild();
                    });
                    list.appendChild(add);
                };
                el.addEventListener('click', () => {
                    const opening = list.hidden;
                    if (opening) {
                        rebuild();
                        // Live status while showing — 'loading…' should become
                        // 'N cams' before the user's eyes, not on re-open.
                        window.clearInterval(statusTimer);
                        statusTimer = window.setInterval(() => {
                            if (list.hidden) { window.clearInterval(statusTimer); statusTimer = 0; return; }
                            list.querySelectorAll('.ichc-obs-row').forEach(row => {
                                const room = row.querySelector('.ichc-obs-name')?.textContent;
                                const st = row.querySelector('.ichc-obs-status');
                                const cur = room ? (_obsState.frames.get(room)?.status || 'starting…') : '';
                                if (st && cur && st.textContent !== cur) { st.textContent = cur; }
                            });
                        }, 1000);
                    }
                    list.hidden = !list.hidden;
                    el.setAttribute('aria-expanded', String(!list.hidden));
                });
                item.afterEl = list;
            }
            if (item.qualityPicker) {
                // Same expand-in-place treatment as the theme picker directly
                // above, for the same reason: the cog menu is anchored near the
                // viewport edge, so a fly-out submenu would need collision
                // handling for one short list of fixed rows.
                //
                // This replaces a cycle-through-five-states button. Cycling made
                // the presets effectively undiscoverable — reaching Full HD meant
                // stepping through four others and applying each one on the way,
                // and nothing on screen ever revealed that Sharp and Smooth are
                // the same resolution and framerate differing only in what they
                // sacrifice under bandwidth pressure. Every preset now states its
                // resolution, framerate, ceiling and trade-off up front.
                el.classList.add('ichc-cog-item-expandable');
                el.setAttribute('aria-expanded', 'false');
                const list = document.createElement('div');
                // Reuses the theme-list/theme-row chrome — indent rail, hover,
                // active tick — and adds only the second line of detail.
                list.className = 'ichc-theme-list ichc-bq-list';
                list.hidden = true;
                const activeKey = _bcastQKey();
                _BCAST_Q_ORDER.forEach(key => {
                    const row = document.createElement('button');
                    row.type = 'button';
                    row.className = 'ichc-theme-row ichc-bq-row';
                    row.dataset.bqId = key;
                    row.setAttribute('aria-current', String(key === activeKey));
                    const text = document.createElement('span');
                    text.className = 'ichc-bq-text';
                    const nameEl = document.createElement('span');
                    nameEl.className = 'ichc-bq-name';
                    nameEl.textContent = _BCAST_Q[key].label;
                    const detailEl = document.createElement('span');
                    detailEl.className = 'ichc-bq-detail';
                    // textContent, not innerHTML — these strings are derived from
                    // the settings table but there is no reason to give them
                    // markup power.
                    detailEl.textContent = _bcastQDetail(key);
                    text.append(nameEl, detailEl);
                    row.appendChild(text);
                    row.addEventListener('click', e => {
                        e.preventDefault();
                        e.stopPropagation();   // do not toggle the expander shut
                        const applied = _setBcastQuality(key);
                        list.querySelectorAll('.ichc-bq-row').forEach(r => {
                            r.setAttribute('aria-current', String(r.dataset.bqId === key));
                        });
                        const labelEl = el.querySelector('.ichc-cog-item-label');
                        if (labelEl) { labelEl.textContent = 'Broadcast quality: ' + applied.label; }
                    });
                    list.appendChild(row);
                });
                el.addEventListener('click', () => {
                    list.hidden = !list.hidden;
                    el.setAttribute('aria-expanded', String(!list.hidden));
                });
                item.afterEl = list;
            }
            if (item.swatch || item.colorInput) {
                const sw = el.querySelector('.ichc-color-swatch');
                let saved = '';
                try { saved = localStorage.getItem('ichc_font_color') || ''; } catch (_) {}
                if (sw && item.colorInput) {
                    // An <input type="color"> only accepts #rrggbb; anything else
                    // leaves it at its own default rather than silently blanking.
                    if (/^#[0-9a-f]{6}$/i.test(saved)) { sw.value = saved; }
                    sw.addEventListener('input', () => _previewTextColor(sw.value));
                    sw.addEventListener('change', () => _applyTextColor(sw.value));
                    // The row is an <a href="#">; without this a click on the swatch
                    // bubbles up and the row handler runs too.
                    sw.addEventListener('click', e => e.stopPropagation());
                } else if (sw && saved) {
                    sw.style.background = saved;
                }
            }
            menu.appendChild(el);
            if (item.afterEl) { menu.appendChild(item.afterEl); }
        });

        // Portal the menu to #ichc-room-root so it escapes nested stacking contexts
        // and reliably paints above the userlist and all other in-room elements.
        const portalMenu = () => {
            const root = document.getElementById('ichc-room-root') || document.body;
            if (!root.contains(menu)) { root.appendChild(menu); }
            // Reposition menu below the cog button (cog is now in the header)
            const rect = cogBtn.getBoundingClientRect();
            menu.style.setProperty('top', (rect.bottom + 4) + 'px', 'important');
            menu.style.setProperty('right', (window.innerWidth - rect.right - 2) + 'px', 'important');
            menu.style.removeProperty('bottom');
            menu.style.removeProperty('left');
        };
        const toggle = () => {
            const next = menu.hidden;
            if (next) {
                portalMenu();
                // Refresh notification label on open to reflect any external state change
                const notifLabelEl = menu.querySelector('.ichc-cog-item-label');
                if (notifLabelEl) { notifLabelEl.textContent = getNotifLabel(); }
            }
            menu.hidden = !next;
            cogBtn.setAttribute('aria-expanded', String(next));
        };
        cogBtn.addEventListener('click', e => { e.stopPropagation(); toggle(); });
        document.addEventListener('click', e => {
            if (!wrapper.contains(e.target) && !menu.contains(e.target)) {
                menu.hidden = true;
                cogBtn.setAttribute('aria-expanded', 'false');
            }
        }, true);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !menu.hidden) { menu.hidden = true; cogBtn.setAttribute('aria-expanded', 'false'); }
        });

        menu.hidden = true;
        wrapper.appendChild(cogBtn);
        // menu is portalled on open — do not append to wrapper

        // PM toggle button (left of cog)
        const pmBtn = document.createElement('button');
        pmBtn.type = 'button';
        pmBtn.id = 'ichc-pm-toggle-btn';
        pmBtn.title = 'Pop out PM';
        pmBtn.dataset.pmUnread = '0';
        const pmIconOut = document.createElement('span');
        pmIconOut.dataset.pmState = 'out';
        pmIconOut.innerHTML = ICONS.popOut;
        const pmIconIn = document.createElement('span');
        pmIconIn.dataset.pmState = 'in';
        pmIconIn.innerHTML = ICONS.popIn;
        const pmBadge = document.createElement('span');
        pmBadge.className = 'ichc-pm-toggle-badge';
        pmBadge.setAttribute('aria-hidden', 'true');
        pmBtn.appendChild(pmIconOut);
        pmBtn.appendChild(pmIconIn);
        pmBtn.appendChild(pmBadge);

        const clearPmButtonAlert = () => {
            pmBtn.dataset.pmUnread = '0';
            pmBtn.classList.remove('ichc-pm-toggle-alert');
            pmBtn.classList.remove('ichc-pm-toggle-attention');
            _stopSidebarPulse();
            pmBadge.textContent = '';
            pmBadge.hidden = true;
            pmBtn.title = pmBtn.classList.contains('ichc-pm-open') ? 'Pop in PM' : 'Pop out PM';
        };
        const markPmButtonAlert = detail => {
            const count = Math.min(99, (parseInt(pmBtn.dataset.pmUnread, 10) || 0) + 1);
            const nick = typeof detail?.nick === 'string' ? detail.nick.trim() : '';
            pmBtn.dataset.pmUnread = String(count);
            pmBtn.classList.add('ichc-pm-toggle-alert');
            _startSidebarPulse();
            pmBadge.hidden = false;
            pmBadge.textContent = count > 9 ? '9+' : String(count);
            pmBtn.title = nick ? `New PM from ${nick}` : `${count} unread PM${count === 1 ? '' : 's'}`;
        };

        pmBtn.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('ichc-pm-user-toggle'));
            clearPmButtonAlert();
        });
        // pm.js broadcasts these after handling ichc-pm-user-toggle so all sources stay in sync
        window.addEventListener('ichc-pm-shown', () => {
            pmBtn.classList.add('ichc-pm-open');
            pmBtn.title = 'Pop in PM';
        });
        window.addEventListener('ichc-pm-hidden', () => {
            pmBtn.classList.remove('ichc-pm-open');
            pmBtn.title = 'Pop out PM';
        });
        window.addEventListener('ichc-pm-active', () => {
            const pmRoot = document.getElementById('tabs');
            if (!pmRoot || getComputedStyle(pmRoot).display === 'none') { return; }
            pmBtn.classList.add('ichc-pm-open');
            pmBtn.title = 'Pop in PM';
        });
        window.addEventListener('ichc-pm-alert', e => {
            _pulsePmAttention(e.detail?.nick);
            if (_isPmTabFocused(e.detail?.nick)) { return; }
            markPmButtonAlert(e.detail);
        });
        // ── Emoji / meme tab-complete ─────────────────────────────────────────────
        _initEmojiTabComplete();

        // ── Cursor-tracked inset shadow on the edit box ───────────────────────────
        _initInputShadowFollow();

        // GIF/emote picker button
        let gifWrapper = document.getElementById('ichc-gif-wrapper');
        if (!gifWrapper) {
            gifWrapper = document.createElement('div');
            gifWrapper.id = 'ichc-gif-wrapper';

            const gifBtn = document.createElement('button');
            gifBtn.type = 'button';
            gifBtn.id = 'ichc-gif-toggle-btn';
            gifBtn.title = 'GIFs & Emotes';

            // 3D prism (flip-cube) of your top emotes — same rolodex animation as the
            // broadcast button. Idle-cycles through the 4 most-used emotes; clicking
            // still opens the picker below.
            gifBtn.innerHTML =
                '<span class="ichc-gif-cube"><span class="ichc-gif-cube-tilt">' +
                '<span class="ichc-gif-cube-prism">' +
                    '<span class="ichc-gcf gcf0"><span class="ichc-gif-cube-face"></span></span>' +
                    '<span class="ichc-gcf gcf1"><span class="ichc-gif-cube-face"></span></span>' +
                    '<span class="ichc-gcf gcf2"><span class="ichc-gif-cube-face"></span></span>' +
                    '<span class="ichc-gcf gcf3"><span class="ichc-gif-cube-face"></span></span>' +
                '</span></span></span>';

            (function setupGifCube() {
                // Recommended emotes shown until usage history exists.
                const DEFAULTS = [
                    { type: 'emoji', char: '😂' },
                    { type: 'emoji', char: '🔥' },
                    { type: 'emoji', char: '❤️' },
                    { type: 'emoji', char: '👍' },
                ];
                const prism = gifBtn.querySelector('.ichc-gif-cube-prism');
                const tilt  = gifBtn.querySelector('.ichc-gif-cube-tilt');
                const faceEls = [...gifBtn.querySelectorAll('.ichc-gif-cube-face')];
                let rot = 0, peeking = false;
                const reallyHover = () => {
                    try { return peeking && gifBtn.matches(':hover'); } catch (_) { return peeking; }
                };
                const panelOpen = () => {
                    const p = document.getElementById('ichc-gif-panel');
                    return !!p && !p.hidden;
                };
                const rnd = () => (Math.random() < 0.5 ? -1 : 1);
                const apply = (ms, ease) => {
                    prism.style.transition = 'transform ' + ms + 'ms ' + ease;
                    prism.style.transform  = 'rotateX(' + rot + 'deg)';
                };
                const clearTilt = () => { if (tilt.style.transform) { tilt.style.transform = ''; } };

                const refreshFaces = () => {
                    // Make sure gif metadata is loading so :code: emotes resolve to images
                    // instead of falling back to their raw text.
                    if (!_gifDataCache) { _prefetchGifData(); }
                    const top = _getTopEmotes(4);
                    for (let i = 0; i < 4; i++) {
                        const item = top[i] || DEFAULTS[i];
                        const el = faceEls[i];
                        if (!el) { continue; }
                        // Key on type+src too, so a face first drawn as text upgrades to
                        // the real image once the gif cache finishes loading.
                        const sig = (item.type || '') + '|' + (item.src || item.char || item.code || '');
                        if (el.dataset.sig === sig) { continue; }
                        el.dataset.sig = sig;
                        el.innerHTML = '';
                        if (item.type === 'gif' && item.src) {
                            const img = new Image();
                            img.src = item.src; img.alt = item.code || ''; img.loading = 'lazy';
                            el.appendChild(img);
                        } else {
                            el.textContent = item.char || item.code || '';
                        }
                    }
                };
                refreshFaces();
                // The gif cache may still be loading on first build — re-render the faces
                // a few times so text placeholders flip to images once codes resolve.
                let _gifFaceTries = 0;
                const _gifFacePoll = window.setInterval(() => {
                    if (!gifBtn.isConnected) { window.clearInterval(_gifFacePoll); return; }
                    refreshFaces();
                    if (_gifDataCache || ++_gifFaceTries > 20) { window.clearInterval(_gifFacePoll); }
                }, 500);

                // Peek on hover.
                gifBtn.addEventListener('pointerenter', () => {
                    peeking = true;
                    const d = rnd();
                    tilt.style.transform = 'rotateX(' + (20 * d) + 'deg) translateY(' + (-d) + 'px)';
                });
                const endPeek = () => { peeking = false; clearTilt(); };
                gifBtn.addEventListener('pointerleave', endPeek);
                gifBtn.addEventListener('pointercancel', endPeek);
                gifBtn.addEventListener('blur', endPeek);
                tilt.addEventListener('transitionend', () => { if (!reallyHover()) { clearTilt(); } });

                // Click gives a quick spin for feedback (panel toggling is handled by the
                // existing gifBtn click handler).
                gifBtn.addEventListener('click', () => {
                    clearTilt();
                    rot += 90 * rnd();
                    apply(500, 'cubic-bezier(.34,1.4,.5,1)');
                    refreshFaces();
                }, true);

                // Idle rotation: roll to the next emote face every few seconds when not
                // hovered and the picker is closed. Skipped under reduced-motion.
                if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const _gifIdleTimer = window.setInterval(() => {
                        if (!gifBtn.isConnected) {
                            window.clearInterval(_gifIdleTimer);
                            return;
                        }
                        if (!reallyHover()) { clearTilt(); }
                        if (reallyHover() || panelOpen()) { return; }
                        refreshFaces();
                        rot += 90;
                        apply(900, 'cubic-bezier(.5,.04,.18,1)');
                    }, 3200);
                }
            })();

            // Panel lives directly on body so it's never inside #ichc-room-root's stacking context
            let gifPanel = document.getElementById('ichc-gif-panel');
            if (!gifPanel) {
                gifPanel = document.createElement('div');
                gifPanel.id = 'ichc-gif-panel';
                gifPanel.hidden = true;
                document.body.appendChild(gifPanel);
            }

            // Tabs
            const tabBar = document.createElement('div');
            tabBar.id = 'ichc-gif-tabs';
            const tabGif = document.createElement('button');
            tabGif.type = 'button'; tabGif.className = 'ichc-gif-tab active'; tabGif.textContent = 'GIFs';
            const tabEmote = document.createElement('button');
            tabEmote.type = 'button'; tabEmote.className = 'ichc-gif-tab'; tabEmote.textContent = 'Emoji';
            const tabBlocked = document.createElement('button');
            tabBlocked.type = 'button'; tabBlocked.className = 'ichc-gif-tab'; tabBlocked.textContent = 'Blocked';
            tabBar.appendChild(tabGif); tabBar.appendChild(tabEmote); tabBar.appendChild(tabBlocked);

            // Search
            const searchWrap = document.createElement('div');
            searchWrap.id = 'ichc-gif-search';
            const searchInput = document.createElement('input');
            searchInput.type = 'search'; searchInput.placeholder = 'Search…'; searchInput.autocomplete = 'off';
            searchWrap.appendChild(searchInput);

            // Grid
            const grid = document.createElement('div');
            grid.id = 'ichc-gif-grid';

            const blockAddWrap = document.createElement('div');
            blockAddWrap.id = 'ichc-gif-block-add';
            blockAddWrap.hidden = true;
            const blockAddInput = document.createElement('input');
            blockAddInput.type = 'url';
            blockAddInput.placeholder = 'Image URL to block…';
            blockAddInput.autocomplete = 'off';
            const blockAddBtn = document.createElement('button');
            blockAddBtn.type = 'button';
            blockAddBtn.textContent = 'Block';
            blockAddWrap.appendChild(blockAddInput);
            blockAddWrap.appendChild(blockAddBtn);

            gifPanel.appendChild(tabBar);
            gifPanel.appendChild(searchWrap);
            gifPanel.appendChild(blockAddWrap);
            gifPanel.appendChild(grid);
            gifWrapper.appendChild(gifBtn);

            // Quickbar flyout — shows 3 most-used emotes/gifs on hover
            let quickbar = document.getElementById('ichc-gif-quickbar');
            if (!quickbar) {
                quickbar = document.createElement('div');
                quickbar.id = 'ichc-gif-quickbar';
                quickbar.hidden = true;
                document.body.appendChild(quickbar);
            }

            const refreshQuickbar = () => {
                const top = _getTopEmotes(3);
                quickbar.innerHTML = '';
                if (!top.length) { return; }
                top.forEach(item => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'ichc-quickbar-item';
                    btn.title = item.code;
                    if (item.type === 'gif') {
                        const img = document.createElement('img');
                        img.src = item.src;
                        img.alt = item.code;
                        img.loading = 'lazy';
                        btn.appendChild(img);
                    } else {
                        btn.textContent = item.code;
                    }
                    btn.addEventListener('click', e => {
                        e.stopPropagation();
                        const txtMsg = document.getElementById('txtMsg');
                        if (txtMsg) {
                            const start = txtMsg.selectionStart ?? txtMsg.value.length;
                            const end = txtMsg.selectionEnd ?? txtMsg.value.length;
                            const before = txtMsg.value.slice(0, start);
                            const after = txtMsg.value.slice(end);
                            const sep = before && !before.endsWith(' ') ? ' ' : '';
                            txtMsg.value = before + sep + item.code + ' ' + after;
                            const pos = (before + sep + item.code + ' ').length;
                            txtMsg.setSelectionRange(pos, pos);
                            txtMsg.focus();
                        }
                        _trackEmoteUsage(item.code);
                        quickbar.hidden = true;
                    });
                    quickbar.appendChild(btn);
                });
                quickbar.hidden = top.length === 0;
            };

            const positionQuickbar = () => {
                if (quickbar.parentElement !== document.body) { document.body.appendChild(quickbar); }
                const rect = gifWrapper.getBoundingClientRect();
                quickbar.style.setProperty('bottom', (window.innerHeight - rect.bottom) + 'px', 'important');
                quickbar.style.setProperty('right', (window.innerWidth - rect.left + 6) + 'px', 'important');
                quickbar.style.removeProperty('top');
                quickbar.style.removeProperty('left');
            };

            let _qbHideTimer = null;
            const showQuickbar = () => {
                clearTimeout(_qbHideTimer);
                refreshQuickbar();
                if (!quickbar.hidden) { positionQuickbar(); }
            };
            const hideQuickbar = () => {
                _qbHideTimer = setTimeout(() => { quickbar.hidden = true; }, 250);
            };
            gifWrapper.addEventListener('mouseenter', showQuickbar);
            gifWrapper.addEventListener('mouseleave', hideQuickbar);
            quickbar.addEventListener('mouseenter', () => clearTimeout(_qbHideTimer));
            quickbar.addEventListener('mouseleave', hideQuickbar);

            let _gifData = null; // { gifs: [{code, src, full}], emotes: [{code}] }
            let _activeTab = 'gif';
            let _gifQuery = '';

            const insertText = (text) => {
                _trackEmoteUsage(text);
                const msg = document.getElementById('txtMsg');
                if (!msg) { return; }
                const start = msg.selectionStart ?? msg.value.length;
                const end = msg.selectionEnd ?? msg.value.length;
                const before = msg.value.slice(0, start);
                const after = msg.value.slice(end);
                const sep = before && !before.endsWith(' ') ? ' ' : '';
                msg.value = before + sep + text + ' ' + after;
                const pos = (before + sep + text + ' ').length;
                msg.setSelectionRange(pos, pos);
                msg.focus();
                gifPanel.hidden = true;
            };

            const renderGrid = () => {
                grid.innerHTML = '';
                if (_activeTab === 'blocked') {
                    grid.classList.remove('ichc-emoji-grid');
                    grid.classList.add('ichc-blocked-list');
                    let disabled;
                    try { disabled = new Set(JSON.parse(localStorage.getItem('ichc_disabled_emotes') || '[]')); }
                    catch { disabled = new Set(); }
                    if (disabled.size === 0) {
                        const empty = document.createElement('div');
                        empty.className = 'ichc-blocked-empty';
                        empty.textContent = 'No blocked emotes. Hover any image in chat and click × to block it.';
                        grid.appendChild(empty);
                    } else {
                        disabled.forEach(url => {
                            const row = document.createElement('div');
                            row.className = 'ichc-blocked-row';
                            const thumb = document.createElement('img');
                            thumb.className = 'ichc-blocked-thumb';
                            thumb.src = url;
                            thumb.alt = '';
                            thumb.loading = 'lazy';
                            thumb.referrerPolicy = 'no-referrer';
                            thumb.onerror = () => { thumb.style.display = 'none'; };
                            const lbl = document.createElement('span');
                            lbl.className = 'ichc-blocked-label';
                            try { lbl.textContent = new URL(url).pathname.split('/').pop() || url; } catch { lbl.textContent = url; }
                            lbl.title = url;
                            const btn = document.createElement('button');
                            btn.type = 'button';
                            btn.className = 'ichc-blocked-unblock-btn';
                            btn.title = 'Unblock';
                            btn.textContent = '×';
                            btn.addEventListener('click', () => {
                                const s = new Set(JSON.parse(localStorage.getItem('ichc_disabled_emotes') || '[]'));
                                s.delete(url);
                                localStorage.setItem('ichc_disabled_emotes', JSON.stringify([...s]));
                                window.dispatchEvent(new CustomEvent('ichc-emote-unblocked', { detail: { url } }));
                                renderGrid();
                            });
                            row.appendChild(thumb);
                            row.appendChild(lbl);
                            row.appendChild(btn);
                            grid.appendChild(row);
                        });
                    }
                    return;
                }
                grid.classList.remove('ichc-blocked-list');
                if (!_gifData) {
                    grid.textContent = 'Loading…';
                    return;
                }
                const q = _gifQuery.toLowerCase();
                if (_activeTab === 'gif') {
                    const items = q ? _gifData.gifs.filter(g => g.code.toLowerCase().includes(q)) : _gifData.gifs;
                    items.slice(0, 120).forEach(g => {
                        const el = document.createElement('div');
                        el.className = 'ichc-gif-item';
                        el.title = g.code;
                        const img = document.createElement('img');
                        img.src = 'https:' + g.src;
                        img.loading = 'lazy';
                        img.alt = g.code;
                        el.appendChild(img);
                        el.addEventListener('click', () => insertText(g.code));
                        grid.appendChild(el);
                    });
                } else {
                    const items = q ? ICHC_EMOJIS.filter(e => e.n.includes(q)) : ICHC_EMOJIS;
                    items.forEach(e => {
                        const el = document.createElement('div');
                        el.className = 'ichc-emote-item ichc-emoji-item';
                        el.title = e.n;
                        el.textContent = e.e;
                        el.addEventListener('click', () => insertText(e.e));
                        grid.appendChild(el);
                    });
                }
            };

            const loadGifData = async () => {
                if (_gifData) { renderGrid(); return; }
                grid.textContent = 'Loading…';
                try {
                    const url = (typeof browser !== 'undefined' ? browser : chrome).runtime.getURL('gifs.txt');
                    const resp = await fetch(url);
                    const text = await resp.text();
                    // Parse paired code + image entries from gifs.txt
                    // Each block has copyToClipboard(':code') followed by src="//www.vidble.com/KEY_sqr.EXT"
                    const gifSeen = new Set();
                    const gifs = [];
                    for (const m of text.matchAll(/copyToClipboard\('(:[^']+)'\)[\s\S]{1,400}?src="(\/\/www\.vidble\.com\/([A-Za-z0-9]+)_sqr\.(gif|jpg|png))"/g)) {
                        const code = m[1];
                        if (gifSeen.has(code)) { continue; }
                        gifSeen.add(code);
                        gifs.push({ code, src: m[2], full: 'https://www.vidble.com/' + m[3] + '.' + m[4] });
                    }
                    _gifData = { gifs };
                    _gifDataCache = _gifData;
                } catch (err) {
                    grid.textContent = 'Failed to load.';
                    return;
                }
                renderGrid();
            };

            const portalGifPanel = () => {
                // Ensure panel stays on body (never inside room-root)
                if (gifPanel.parentElement !== document.body) { document.body.appendChild(gifPanel); }
                const rect = gifWrapper.getBoundingClientRect();
                gifPanel.style.setProperty('bottom', (window.innerHeight - rect.top + 4) + 'px', 'important');
                gifPanel.style.setProperty('right', (window.innerWidth - rect.right) + 'px', 'important');
                gifPanel.style.removeProperty('top');
                gifPanel.style.removeProperty('left');
            };
            gifBtn.addEventListener('click', e => {
                e.stopPropagation();
                const next = gifPanel.hidden;
                if (next) { portalGifPanel(); }
                gifPanel.hidden = !next;
                if (!gifPanel.hidden) {
                    if (_activeTab === 'emote') {
                        grid.classList.add('ichc-emoji-grid');
                        renderGrid();
                    } else {
                        loadGifData();
                    }
                }
            });
            document.addEventListener('click', e => {
                if (!gifWrapper.contains(e.target) && !gifPanel.contains(e.target)) { gifPanel.hidden = true; }
            });

            tabGif.addEventListener('click', () => {
                _activeTab = 'gif';
                tabGif.classList.add('active'); tabEmote.classList.remove('active'); tabBlocked.classList.remove('active');
                grid.classList.remove('ichc-emoji-grid');
                searchWrap.hidden = false;
                blockAddWrap.hidden = true;
                renderGrid();
            });
            tabEmote.addEventListener('click', () => {
                _activeTab = 'emote';
                tabEmote.classList.add('active'); tabGif.classList.remove('active'); tabBlocked.classList.remove('active');
                grid.classList.add('ichc-emoji-grid');
                searchWrap.hidden = false;
                blockAddWrap.hidden = true;
                renderGrid();
            });
            tabBlocked.addEventListener('click', () => {
                _activeTab = 'blocked';
                tabBlocked.classList.add('active'); tabGif.classList.remove('active'); tabEmote.classList.remove('active');
                searchWrap.hidden = true;
                blockAddWrap.hidden = false;
                renderGrid();
            });
            blockAddBtn.addEventListener('click', () => {
                const url = blockAddInput.value.trim();
                if (!url) { return; }
                try { new URL(url); } catch { return; }
                const s = new Set(JSON.parse(localStorage.getItem('ichc_disabled_emotes') || '[]'));
                s.add(url);
                localStorage.setItem('ichc_disabled_emotes', JSON.stringify([...s]));
                window.dispatchEvent(new CustomEvent('ichc-emote-blocked', { detail: { url } }));
                blockAddInput.value = '';
                renderGrid();
            });
            blockAddInput.addEventListener('keydown', e => {
                if (e.key === 'Enter') { blockAddBtn.click(); }
            });
            searchInput.addEventListener('input', () => {
                _gifQuery = searchInput.value.trim();
                renderGrid();
            });

            }

        // Cog goes in #ichc-header-actions
        const actions = document.getElementById('ichc-header-actions');
        if (actions && !actions.contains(wrapper)) { actions.appendChild(wrapper); } else {
            // Header not ready yet — retry
            [200, 600, 1400].forEach(d => window.setTimeout(transformCommandBar, d));
            return;
        }
        // The header exists now, so the auto-restart chip has somewhere to live.
        // Re-run on every pass: a topbar rebuild drops the chip with it.
        _syncAutoRestartIndicator();

        // Theme button goes in the footer
        const footerBar = ensureFooterBar();
        let themeBtn = document.getElementById('ichc-theme-toggle-btn');
        if (!themeBtn) {
            themeBtn = document.createElement('button');
            themeBtn.id = 'ichc-theme-toggle-btn';
            themeBtn.type = 'button';
            themeBtn.className = 'ichc-footer-icon-btn';
            themeBtn.title = 'Cycle theme (full list in the cog menu)';
            themeBtn.innerHTML = currentTheme().light ? ICONS.moon : ICONS.sun;
            themeBtn.addEventListener('click', () => {
                // Cycles rather than opening a picker — the cog menu already has the
                // named list, and this button is a 20px footer icon.
                const i = THEMES.findIndex(t => t.id === currentThemeId());
                const next = THEMES[(i + 1) % THEMES.length];
                applyTheme(next.id);
                themeBtn.innerHTML = next.light ? ICONS.moon : ICONS.sun;
                themeBtn.title = `Theme: ${next.label} — click to cycle`;
            });
        }
        const footerLeft = footerBar?.querySelector('#ichc-footer-left') || footerBar;
        if (footerLeft && !footerLeft.contains(themeBtn)) {
            footerLeft.appendChild(themeBtn);
        }

        // Cam diagnostics — footer, right of theme toggle, console icon, no border
        let camTestBtn = document.getElementById('ichc-cam-test-btn');
        if (!camTestBtn) {
            camTestBtn = document.createElement('button');
            camTestBtn.id = 'ichc-cam-test-btn';
            camTestBtn.type = 'button';
            camTestBtn.className = 'ichc-cam-test-btn';
            camTestBtn.title = 'Cam diagnostics';
            camTestBtn.innerHTML = ICONS.terminal;
            camTestBtn.addEventListener('click', () => { toggleCamDiagnostics(); });
        }
        if (footerLeft && !footerLeft.contains(camTestBtn)) {
            footerLeft.appendChild(camTestBtn);
        }

        // The live cam-stats toggle now lives inside the cam-diagnostics ("console")
        // panel (see openCamDiagnostics), not the footer. A stale footer button from an
        // older build is removed here.
        document.getElementById('ichc-cam-stats-btn')?.remove();

        let reloadCamsBtn = document.getElementById('ichc-reload-cams-btn');
        if (!reloadCamsBtn) {
            reloadCamsBtn = document.createElement('button');
            reloadCamsBtn.id = 'ichc-reload-cams-btn';
            reloadCamsBtn.type = 'button';
            reloadCamsBtn.className = 'ichc-reload-cams-btn';
            reloadCamsBtn.title = 'Refresh cam list (keeps your broadcast live)';
            reloadCamsBtn.innerHTML = ICONS.rotate;
            reloadCamsBtn.addEventListener('click', () => { triggerReload(); });
        }
        if (footerLeft && !footerLeft.contains(reloadCamsBtn)) {
            footerLeft.appendChild(reloadCamsBtn);
        }

        // PM button lives inside the pm-avatar strip as its first child
        let pmAvatarStrip = document.getElementById('ichc-pm-avatars');
        if (!pmAvatarStrip) {
            pmAvatarStrip = document.createElement('div');
            pmAvatarStrip.id = 'ichc-pm-avatars';
        }
        if (!pmAvatarStrip.contains(pmBtn)) {
            pmAvatarStrip.insertBefore(pmBtn, pmAvatarStrip.firstChild || null);
        }
        const userlistPanel = document.getElementById('ichc-userlist');
        if (userlistPanel && !userlistPanel.contains(pmAvatarStrip)) {
            const _ulHdr2 = userlistPanel.querySelector('.ichc-ul-header');
            if (_ulHdr2) { _ulHdr2.after(pmAvatarStrip); } else { userlistPanel.insertBefore(pmAvatarStrip, userlistPanel.firstChild); }
        }
        initPmAvatarObserver();

        // gif lives directly in inputRow between txtMsg and sendBtn
        if (gifWrapper && inputRow && !inputRow.contains(gifWrapper)) {
            inputRow.insertBefore(gifWrapper, sendBtn);
        }
    }

    // ── Auto-restart cams after the inactivity ("cams paused") timeout ───────────
    // The site disables cams ~every 10 min of inactivity. When enabled (opt-in,
    // off by default), we auto-click the native restart link after a random 2–10s
    // delay so cams come back on their own. Toggle lives on the paused screen.
    function _autoRestartEnabled() {
        try { return localStorage.getItem(AUTO_RESTART_KEY) === '1'; } catch (_) { return false; }
    }
    function _setAutoRestart(on, opts) {
        try { localStorage.setItem(AUTO_RESTART_KEY, on ? '1' : '0'); } catch (_) {}
        // Turning it on by hand is the user vouching for another full run of
        // restarts, so the budget starts over. Turning it off leaves the count
        // alone: nothing reads it while disarmed, and the next manual arm resets it.
        if (on && !(opts && opts.keepCount)) { _setAutoRestartCount(0); }
        _syncAutoRestartUi();
    }
    function _autoRestartCount() {
        try { return Math.max(0, parseInt(localStorage.getItem(AUTO_RESTART_COUNT_KEY), 10) || 0); } catch (_) { return 0; }
    }
    function _setAutoRestartCount(n) {
        try { localStorage.setItem(AUTO_RESTART_COUNT_KEY, String(Math.max(0, n | 0))); } catch (_) {}
    }
    function _autoRestartLeft() {
        return Math.max(0, AUTO_RESTART_LIMIT - _autoRestartCount());
    }
    // One place that repaints every surface showing auto-restart state: the topbar
    // indicator, the paused-screen toggle, the cog row, and the countdown line.
    // Called from every mutation of the setting so they cannot drift apart.
    function _syncAutoRestartUi() {
        const on = _autoRestartEnabled();
        _syncAutoRestartIndicator();
        const toggle = document.querySelector('.ichc-cam-resume-toggle');
        if (toggle) {
            toggle.classList.toggle('ichc-on', on);
            toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
        }
        document.querySelectorAll('.ichc-cog-item-label').forEach(el => {
            if (/^Auto-restart cams: /.test(el.textContent || '')) {
                el.textContent = 'Auto-restart cams: ' + (on ? 'On' : 'Off');
            }
        });
        _updateCamResumeCountdown();
    }

    // Spent the budget: turn the setting off for real (so every surface reads
    // "Off" and a reload stays off) and say why on the paused screen.
    function _disarmAutoRestartAtLimit() {
        _cancelCamAutoRestart();
        _setAutoRestart(false, { keepCount: true });
        lurkState.limitHit = true;
        console.log('%c[ichc] auto-restart cams disarmed after ' + AUTO_RESTART_LIMIT + ' restarts', 'color:#faa61a;font-weight:bold');
        _syncAutoRestartUi();
    }

    // ── Always-visible auto-restart state chip ───────────────────────────────────
    // The only readouts of this setting used to be the cog submenu (hidden until
    // opened) and the toggle on the paused screen (which exists only while cams are
    // already down) — so in the state that matters, before a pause, nothing on
    // screen said whether cams would come back on their own. This chip lives in the
    // topbar next to the cog and always answers that question.
    function _ensureAutoRestartIndicator() {
        let chip = document.getElementById('ichc-autorestart-chip');
        if (chip) { return chip; }
        const actions = document.getElementById('ichc-header-actions');
        if (!actions) { return null; }
        chip = document.createElement('button');
        chip.type = 'button';
        chip.id = 'ichc-autorestart-chip';
        chip.addEventListener('click', () => {
            const on = !_autoRestartEnabled();
            if (on) { lurkState.limitHit = false; }
            _setAutoRestart(on);
            if (on) {
                if (document.getElementById('cams')?.classList.contains('ichc-lurk-active')) {
                    _scheduleCamAutoRestart();
                }
            } else {
                _cancelCamAutoRestart();
            }
        });
        // Before the cog so the cog stays the rightmost control it has always been.
        const cog = document.getElementById('ichc-cog-wrapper');
        if (cog && cog.parentElement === actions) { actions.insertBefore(chip, cog); }
        else { actions.appendChild(chip); }
        return chip;
    }

    function _syncAutoRestartIndicator() {
        const chip = _ensureAutoRestartIndicator();
        if (!chip) { return; }
        const on = _autoRestartEnabled();
        const left = _autoRestartLeft();
        chip.classList.toggle('ichc-on', on);
        chip.setAttribute('aria-pressed', on ? 'true' : 'false');
        chip.innerHTML = (on ? ICONS.rotateOn : ICONS.rotateOff) +
            '<span class="ichc-autorestart-chip-text"></span>';
        // textContent for the label: it is the only part that varies, and it never
        // needs markup.
        const text = chip.querySelector('.ichc-autorestart-chip-text');
        if (text) { text.textContent = on ? String(left) : 'off'; }
        chip.title = on
            ? 'Cams will auto-restart when the room goes idle — ' + left +
              (left === 1 ? ' restart left' : ' restarts left') + '. Click to turn off.'
            : (lurkState.limitHit
                ? 'Auto-restart turned itself off after ' + AUTO_RESTART_LIMIT + ' restarts. Click to turn back on.'
                : 'Cams will NOT auto-restart when the room goes idle. Click to turn on.');
    }

    function _cancelCamAutoRestart() {
        if (lurkState.autoTimer) { window.clearTimeout(lurkState.autoTimer); lurkState.autoTimer = null; }
        if (lurkState.countdownTimer) { window.clearInterval(lurkState.countdownTimer); lurkState.countdownTimer = null; }
        lurkState.restartAt = 0;
        _updateCamResumeCountdown();
    }

    function _afterCamRestart() {
        window.setTimeout(() => {
            document.getElementById('lurkMessageDiv')?.classList.remove('ichc-visible');
            // Reset first-seen timestamps on all cam cards so the age-based ghost
            // classification re-evaluates from zero while streams reconnect.
            document.querySelectorAll('#cams .rounded_square[data-ichc-first-seen-at]').forEach(card => {
                delete card.dataset.ichcFirstSeenAt;
            });
            requestCamRelayout(1200);
        }, 400);
    }

    function _triggerCamRestart() {
        const actionLink = document.getElementById('lurkMessageDiv')?.querySelector('a');
        if (actionLink) {
            invokeNativeElementAction(actionLink);
            // invokeNativeElementAction executes a javascript: href directly, so a
            // content-world click listener on the anchor would not fire.
            _afterCamRestart();
            return;
        }

        // Fallback for a site markup change: these are the two calls in the native
        // inactivity link. They only restart inbound viewers; they do not touch the
        // user's outbound broadcast.
        runInPageContext(`
(() => {
    if (typeof window.hideLurkMessage === 'function') { window.hideLurkMessage(); }
    if (typeof window.toggleCams === 'function') { window.toggleCams(); }
})();
        `);
        _afterCamRestart();
    }

    function _scheduleCamAutoRestart() {
        if (lurkState.autoTimer) { return; } // already counting down
        // Budget is checked at SCHEDULE time as well as after each restart, so a
        // page reload that lands with the budget already spent cannot start a
        // fresh countdown off a stale enabled flag.
        if (_autoRestartLeft() <= 0) { _disarmAutoRestartAtLimit(); return; }
        const delay = 2000 + Math.floor(Math.random() * 8001); // 2–10s
        lurkState.restartAt = Date.now() + delay;
        lurkState.autoTimer = window.setTimeout(() => {
            lurkState.autoTimer = null;
            _cancelCamAutoRestart();
            _setAutoRestartCount(_autoRestartCount() + 1);
            _triggerCamRestart();
            // Disarm AFTER the fifth restart, not instead of it — the user asked
            // for five restarts, so the fifth one happens and the sixth never does.
            if (_autoRestartLeft() <= 0) { _disarmAutoRestartAtLimit(); }
            else { _syncAutoRestartUi(); }
        }, delay);
        if (!lurkState.countdownTimer) {
            lurkState.countdownTimer = window.setInterval(_updateCamResumeCountdown, 500);
        }
        _updateCamResumeCountdown();
    }

    function _updateCamResumeCountdown() {
        const el = document.querySelector('.ichc-cam-resume-countdown');
        if (!el) { return; }
        if (!lurkState.restartAt) {
            if (_autoRestartEnabled()) {
                const left = _autoRestartLeft();
                el.textContent = 'Auto-restart is on — ' + left +
                    (left === 1 ? ' restart left.' : ' restarts left.');
            } else if (lurkState.limitHit) {
                el.textContent = 'Auto-restart turned itself off after ' + AUTO_RESTART_LIMIT + ' restarts.';
            } else {
                el.textContent = '';
            }
            return;
        }
        const secs = Math.max(0, Math.ceil((lurkState.restartAt - Date.now()) / 1000));
        const mmss = secs >= 60
            ? `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`
            : `${secs}s`;
        el.textContent = `Auto-restarting in ${mmss}…`;
    }

    function syncLurkBanner() {
        const lurkDiv = document.getElementById('lurkMessageDiv');
        if (!lurkDiv) { return; }

        // Dock the banner inside chat_container, above the input row,
        // so it doesn't overlap the user list or sit in the far corner.
        const chatContainer = document.getElementById('chat_container');
        const txtMsg = document.getElementById('txtMsg');
        // Only reposition if txtMsg is still a direct child of chatContainer —
        // transformCommandBar moves txtMsg to ichc-input-row, after which insertBefore
        // would throw HierarchyRequestError.
        if (chatContainer && txtMsg && lurkDiv.parentElement !== chatContainer && chatContainer.contains(txtMsg)) {
            chatContainer.insertBefore(lurkDiv, txtMsg);
        }

        const visible = (lurkDiv.style.visibility || '').toLowerCase() === 'visible' ||
            normalizeText(lurkDiv.textContent || '').includes('cams disabled due to inactivity');

        lurkDiv.classList.toggle('ichc-visible', visible);

        if (visible) { lurkState.lastActiveAt = Date.now(); }

        const actionLink = lurkDiv.querySelector('a');
        if (actionLink) {
            // Rewrite the banner so the button reads as a self-contained action.
            // Original site text wraps the link mid-sentence ("...Click here... them.")
            // which looks broken once we rename the link text.
            if (actionLink.dataset.ichcBound !== '1') {
                lurkDiv.textContent = '';
                const msg = document.createElement('span');
                msg.textContent = 'Cams paused due to inactivity. ';
                lurkDiv.appendChild(msg);
                actionLink.textContent = 'Restart cams';
                lurkDiv.appendChild(actionLink);
            }
            if (actionLink.dataset.ichcBound !== '1') {
                actionLink.dataset.ichcBound = '1';
                // A direct click on the site's hidden action still gets the same
                // reconnect cleanup as the mirrored/manual and automatic paths.
                actionLink.addEventListener('click', _afterCamRestart);
            }
        }

        // Mirror the action inside the cam area so the button is visible where cams would be.
        const cams = document.getElementById('cams');
        const existing = cams?.querySelector('.ichc-cam-resume');
        if (visible && cams) {
            if (!existing) {
                const wrap = document.createElement('div');
                wrap.className = 'ichc-cam-resume';
                wrap.innerHTML =
                    `<div class="ichc-cam-resume-icon">${ICONS.videoCamOff}</div>` +
                    `<div class="ichc-cam-resume-title">Cams Paused</div>` +
                    `<div class="ichc-cam-resume-msg">Room went idle — click below to restart streams.</div>`;
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'ichc-cam-resume-btn';
                btn.innerHTML = ICONS.rotate + '<span>Restart Cams</span>';
                btn.addEventListener('click', () => {
                    _cancelCamAutoRestart();
                    // A manual restart is the user saying they are still here, so
                    // the automatic budget starts over from full.
                    _setAutoRestartCount(0);
                    lurkState.limitHit = false;
                    _triggerCamRestart();
                    _syncAutoRestartUi();
                });
                wrap.appendChild(btn);

                // Opt-in auto-restart toggle. Once enabled, future inactivity
                // timeouts auto-restart after a random 2–10s delay.
                const toggle = document.createElement('button');
                toggle.type = 'button';
                toggle.className = 'ichc-cam-resume-toggle';
                const _renderToggle = () => {
                    const on = _autoRestartEnabled();
                    toggle.classList.toggle('ichc-on', on);
                    toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
                    toggle.innerHTML =
                        `<span class="ichc-cam-resume-toggle-track"><span class="ichc-cam-resume-toggle-knob"></span></span>` +
                        `<span>Auto-restart cams when idle</span>`;
                };
                _renderToggle();
                toggle.addEventListener('click', () => {
                    const on = !_autoRestartEnabled();
                    if (on) { lurkState.limitHit = false; }
                    _setAutoRestart(on);
                    _renderToggle();
                    if (on) { _scheduleCamAutoRestart(); } else { _cancelCamAutoRestart(); }
                });
                wrap.appendChild(toggle);

                const countdown = document.createElement('div');
                countdown.className = 'ichc-cam-resume-countdown';
                wrap.appendChild(countdown);

                cams.appendChild(wrap);
                _updateCamResumeCountdown();
            }
            cams.classList.add('ichc-lurk-active');
        } else {
            existing?.remove();
            cams?.classList.remove('ichc-lurk-active');
        }

        // Schedule/cancel auto-restart on the visibility transition.
        if (visible && !lurkState.wasVisible) {
            lurkState.wasVisible = true;
            _syncAutoRestartIndicator();
            if (_autoRestartEnabled()) { _scheduleCamAutoRestart(); }
        } else if (!visible && lurkState.wasVisible) {
            lurkState.wasVisible = false;
            _cancelCamAutoRestart();
        }
    }

    function initLurkBanner() {
        syncLurkBanner();

        if (!lurkState.pollTimer) {
            lurkState.pollTimer = window.setInterval(syncLurkBanner, 1000);
        }

        // React immediately when the site shows/hides lurkMessageDiv
        const lurkDiv = document.getElementById('lurkMessageDiv');
        if (lurkDiv && !lurkDiv._ichcLurkObs) {
            lurkDiv._ichcLurkObs = true;
            new MutationObserver(syncLurkBanner).observe(lurkDiv, {
                attributes: true, childList: true,
            });
        }
    }


    function buildHiddenCamManager() {
        // Hidden cam management is now integrated into the user list (buildUserList).
        // Remove legacy panel if still in DOM.
        document.getElementById('ichc-hidden-cams')?.remove();
    }

    // ── User list ─────────────────────────────────────────────────────────────────

    function getCammedNames() {
        // Include ghost-slot AND hidden-slot entries — hidden just means the viewer
        // has chosen to hide the cam, but the user IS still broadcasting.
        const s = new Set();
        let hasUnnamedSlot = false;
        [...document.querySelectorAll('#cams .videocontainer[id]')].forEach(container => {
            const camId = container.id.replace(/^id-/, '');
            const card = container.closest('.rounded_square');
            if (!card) { return; }
            const name = (
                document.getElementById('name-' + camId)?.textContent.trim() ||
                card.querySelector('.name-on-cam')?.textContent.trim() ||
                ''
            );
            const key = name.trim().toLowerCase();
            if (key && !looksLikePlaceholderName(key)) {
                s.add(key);
            } else {
                // Cam slot present but name not yet populated — the site sets
                // textContent asynchronously after inserting the card.
                hasUnnamedSlot = true;
            }
        });
        // If any slot had no name, retry once names may have loaded.
        // The camsObserver (characterData: true) should also catch this, but the
        // deferred rebuild is a safety net for sources that don't mutate the DOM.
        if (hasUnnamedSlot) { scheduleUserListBuild(900, true); }
        return s;
    }

    function extractKarmaFromUserAnchor(anchor) {
        if (!anchor) { return null; }

        const haystack = [
            anchor.getAttribute('title') || '',
            anchor.getAttribute('data-original-title') || '',
            anchor.getAttribute('data-karma') || '',
            anchor.parentElement?.getAttribute('title') || '',
            anchor.parentElement?.textContent || '',
        ].join(' ');

        const match = haystack.match(/(\d[\d,]*)\s*karma/i);
        if (!match) { return null; }

        const value = Number(match[1].replace(/,/g, ''));
        return Number.isFinite(value) ? value : null;
    }

    // ── User dropdown (replaces native profile modal for userlist clicks) ───────

    let _activeUserDropdown = null;
    let _activeUserDropdownCleanup = null;

    function closeUserDropdown() {
        // All close paths (close button, action, outside click, Escape, opening a
        // different user) must release the document-level dismiss handlers.  The
        // old local-only cleanup ran for outside/Escape but not the common button
        // paths, leaving one more capture listener behind after every interaction.
        const cleanup = _activeUserDropdownCleanup;
        _activeUserDropdownCleanup = null;
        cleanup?.();
        if (_activeUserDropdown) {
            _activeUserDropdown.remove();
            _activeUserDropdown = null;
        }
    }

    function openUserDropdown(u, rowEl) {
        closeUserDropdown();

        const key       = u.name.toLowerCase();
        // Only use profileImageCache (original CDN URL) — avatarImgCache holds a
        // blob: URL that gets revoked after load and cannot be reused.
        const avatarUrl = profileImageCache.get(key) || null;
        const karma     = profileKarmaCache.get(key);
        const year      = profileYearCache.get(key);
        const bgUrl     = profileBgCache.get(key);
        const trophies  = profileTrophiesCache.get(key);
        const bio       = profileBioCache.get(key);

        const dd = document.createElement('div');
        dd.id = 'ichc-user-dropdown';
        dd.className = 'ichc-user-dropdown';

        // ── Drag grab bar ──
        const grabBar = document.createElement('div');
        grabBar.className = 'ichc-ud-grab';
        grabBar.innerHTML = '<span class="ichc-ud-grab-pip"></span>';
        dd.appendChild(grabBar);

        // Close button is a sibling of the grab bar, absolutely positioned to top-right of the dropdown
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'ichc-ud-close';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.innerHTML = ICONS.xmark;
        closeBtn.addEventListener('click', e => { e.stopPropagation(); closeUserDropdown(); });
        dd.appendChild(closeBtn);

        grabBar.addEventListener('pointerdown', e => {
            if (e.button !== 0) { return; }
            if (e.target.closest('.ichc-ud-close')) { return; }
            e.preventDefault();
            const startX  = e.clientX;
            const startY  = e.clientY;
            const startL  = parseFloat(dd.style.left) || 0;
            const startT  = parseFloat(dd.style.top)  || 0;
            grabBar.setPointerCapture(e.pointerId);
            grabBar.classList.add('ichc-ud-grab-active');
            const onMove = ev => {
                dd.style.left = Math.max(0, startL + ev.clientX - startX) + 'px';
                dd.style.top  = Math.max(0, startT + ev.clientY - startY) + 'px';
            };
            const onUp = () => {
                grabBar.classList.remove('ichc-ud-grab-active');
                grabBar.removeEventListener('pointermove', onMove);
                grabBar.removeEventListener('pointerup',   onUp);
            };
            grabBar.addEventListener('pointermove', onMove);
            grabBar.addEventListener('pointerup',   onUp);
        });

        // ── Header: profile bg + avatar + name + badges ──
        const hdr = document.createElement('div');
        hdr.className = 'ichc-ud-header';

        const _applyBg = url => {
            if (!url) { return; }
            hdr.style.setProperty('--ichc-ud-bg', `url("${url.replace(/"/g, '%22')}")`);
            hdr.classList.add('ichc-ud-has-bg');
        };
        if (bgUrl) { _applyBg(bgUrl); }
        // Missing bg also handled by the unified async fetch block below

        const avWrap = document.createElement('div');
        avWrap.className = 'ichc-ud-avatar';
        avWrap.style.setProperty('--av-bg', userAvatarColor(u.name));

        const _setAvImg = url => {
            if (!url) { return; }
            avWrap.innerHTML = '';
            const img = document.createElement('img');
            img.className = 'ichc-ud-avatar-img';
            img.alt = '';
            _loadAvatarSrc(img, url, key);
            avWrap.appendChild(img);
        };

        if (avatarUrl) {
            _setAvImg(avatarUrl);
        } else {
            const letter = document.createElement('span');
            letter.className = 'ichc-ud-avatar-letter';
            letter.textContent = (u.name[0] || '?').toUpperCase();
            avWrap.appendChild(letter);
            // Avatar will be populated by the async fetch block below
        }
        hdr.appendChild(avWrap);

        const nameCol = document.createElement('div');
        nameCol.className = 'ichc-ud-name-col';

        const nameEl = document.createElement('div');
        nameEl.className = 'ichc-ud-name';
        nameEl.textContent = u.name;
        nameCol.appendChild(nameEl);

        const badgeRow = document.createElement('div');
        badgeRow.className = 'ichc-ud-badge-row';
        const _badge = (cls, html) => {
            const b = document.createElement('span');
            b.className = 'ichc-ud-badge ' + cls;
            b.innerHTML = html;
            badgeRow.appendChild(b);
        };
        if (u.cammed)    { _badge('ichc-ud-badge-cam',  ICONS.broadcast + ' on cam'); }
        if (u.mod)       { _badge('ichc-ud-badge-mod',  ICONS.shield    + ' mod'); }
        if (u.supporter) { _badge('ichc-ud-badge-sup',  '♥ supporter'); }
        if (year)        { _badge('ichc-ud-badge-year', year + 'yr'); }
        if (badgeRow.children.length) { nameCol.appendChild(badgeRow); }

        if (karma != null) {
            const karmaEl = document.createElement('div');
            karmaEl.className = 'ichc-ud-karma';
            karmaEl.textContent = karma.toLocaleString() + ' karma';
            nameCol.appendChild(karmaEl);
        }

        hdr.appendChild(nameCol);
        dd.appendChild(hdr);

        // ── Bio strip ──
        const bioEl = document.createElement('div');
        bioEl.className = 'ichc-ud-bio';
        const _setBio = (text) => {
            if (!text) { return; }
            bioEl.textContent = text;
            bioEl.hidden = false;
        };
        bioEl.hidden = true;
        if (bio) { _setBio(bio); }
        dd.appendChild(bioEl);

        // ── Trophies strip ──
        const trophyRow = document.createElement('div');
        trophyRow.className = 'ichc-ud-trophies';
        const _setTrophies = (list) => {
            if (!list?.length) { return; }
            trophyRow.innerHTML = '';
            list.forEach(({ src, alt }) => {
                const img = new Image();
                img.className = 'ichc-ud-trophy-img';
                img.src = src;
                img.alt = alt;
                img.title = alt;
                trophyRow.appendChild(img);
            });
            trophyRow.hidden = false;
        };
        trophyRow.hidden = true;
        if (trophies) { _setTrophies(trophies); }
        dd.appendChild(trophyRow);

        // Async populate: avatar (if missing), bio, trophies, bg.
        // - If trophies/bio are uncached, call _doFetchProfileImage directly (fetchProfileImage
        //   bails early when avatar URL is already in profileImageCache, skipping new fields).
        // - If only the avatar is missing, use the throttled fetchProfileImage path.
        // Always call _doFetchProfileImage when avatar is missing — fetchProfileImage
        // returns cached null immediately without retrying, so we bypass it here.
        const _needsFullFetch = !profileTrophiesCache.has(key) || !profileBioCache.has(key) || !avatarUrl;
        if (_needsFullFetch) {
            const _p = _doFetchProfileImage(key);
            _p.then(url => {
                if (!avatarUrl) {
                    const freshUrl = url || profileImageCache.get(key);
                    if (freshUrl) { _setAvImg(freshUrl); }
                }
                _setBio(profileBioCache.get(key) || '');
                _setTrophies(profileTrophiesCache.get(key) || null);
                _applyBg(profileBgCache.get(key) || '');
            });
        }

        const hr = document.createElement('div');
        hr.className = 'ichc-ud-divider';
        dd.appendChild(hr);

        // ── Actions ──
        const _btn = (label, icon, cls, onClick) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'ichc-ud-btn' + (cls ? ' ' + cls : '');
            btn.innerHTML = `<span class="ichc-ud-btn-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
            btn.addEventListener('click', e => {
                e.stopPropagation();
                closeUserDropdown();
                onClick();
            });
            dd.appendChild(btn);
        };

        const _divider = () => {
            const d = document.createElement('div');
            d.className = 'ichc-ud-divider';
            dd.appendChild(d);
        };

        // Fill txtMsg and focus
        const _fillChat = text => {
            const inp = document.getElementById('txtMsg');
            if (!inp) { return; }
            inp.value = text;
            inp.focus();
            inp.dispatchEvent(new Event('input', { bubbles: true }));
            inp.setSelectionRange(inp.value.length, inp.value.length);
        };

        // Silently trigger a native profile dialog action by button text pattern
        const _nativeAction = (pattern) => {
            const nick = JSON.stringify(u.name);
            const re   = JSON.stringify(pattern);
            runInPageContext(`(function() {
                var nick = ${nick};
                var patt = new RegExp(${re}, 'i');
                var link = Array.from(document.querySelectorAll('#activeUserList a.userlink'))
                    .find(function(a) { return (a.textContent || '').trim().toLowerCase() === nick.toLowerCase(); });
                if (!link) { return; }
                var tmp = document.createElement('style');
                tmp.id = 'ichc-hd-tmp';
                tmp.textContent = '.ui-dialog { opacity:0 !important; pointer-events:none !important; }';
                document.head.appendChild(tmp);
                link.click();
                setTimeout(function() {
                    var found = false;
                    document.querySelectorAll('.ui-dialog').forEach(function(d) {
                        if (found) { return; }
                        var btn = Array.from(d.querySelectorAll('a,button,input[type=submit],input[type=button]'))
                            .find(function(el) { return patt.test(el.textContent || el.value || ''); });
                        if (btn) { found = true; btn.click(); }
                    });
                    var s = document.getElementById('ichc-hd-tmp');
                    if (s) { s.remove(); }
                    setTimeout(function() {
                        try {
                            if (typeof $ !== 'undefined') {
                                $('.ui-dialog').each(function() { try { $(this).dialog('close'); } catch(_) {} });
                            }
                        } catch(_) {}
                    }, 80);
                }, 400);
            })();`);
        };

        // Chat actions
        _btn('@mention', ICONS.chat, '', () => { _fillChat('@' + u.name + ' '); });
        _btn('Whisper', ICONS.popOut, '', () => { _fillChat('/w ' + u.name + ' '); });
        _btn('Send PM', ICONS.phone, '', () => {
            window.dispatchEvent(new CustomEvent('ichc-pm-open', { detail: { nick: u.name, forceShow: true } }));
        });

        _divider();

        // Cam / social actions
        if (u.cammed) {
            _btn('Hide cam', ICONS.eyeSlash, 'ichc-ud-btn-warn', () => {
                closeUserDropdown();
                const bl = loadBlockedUsers();
                bl.add(key);
                saveBlockedUsers(bl);
                clearFeaturedCamForUser(key);
                syncCamCards();
                buildUserList();
            });
            _btn('Cam down', ICONS.xmark, 'ichc-ud-btn-warn', () => { _nativeAction('cam.?down|disable.?cam|cam.?off'); });
        }
        _btn('Follow', '♥', 'ichc-ud-btn-follow', () => { _nativeAction('follow'); });
        _btn('Ignore', ICONS.eyeSlash, 'ichc-ud-btn-warn', () => { _nativeAction('ignore'); });

        _divider();

        // Profile / external
        _btn('Gift trophy', '🎁', 'ichc-ud-btn-gift', () => { _nativeAction('gift'); });
        _btn('View profile page', ICONS.popOut, '', () => {
            window.open('https://www.icanhazchat.com/user/' + encodeURIComponent(u.name), '_blank');
        });

        // ── Position: prefer left of row, fall back to right ──
        document.body.appendChild(dd);
        _activeUserDropdown = dd;

        const rr  = rowEl.getBoundingClientRect();
        const ddW = dd.offsetWidth  || 210;
        const ddH = dd.offsetHeight || 260;
        const vw  = window.innerWidth;
        const vh  = window.innerHeight;

        let left = rr.left - ddW - 6;
        if (left < 8) { left = rr.right + 6; }
        left = Math.max(8, Math.min(left, vw - ddW - 8));

        let top = rr.top;
        if (top + ddH > vh - 8) { top = Math.max(8, vh - ddH - 8); }
        dd.style.left = left + 'px';
        dd.style.top  = top  + 'px';

        // ── Dismiss ──
        let _dismissTimer = null;
        const _cleanup = () => {
            if (_dismissTimer !== null) {
                window.clearTimeout(_dismissTimer);
                _dismissTimer = null;
            }
            document.removeEventListener('pointerdown', _onDown, true);
            document.removeEventListener('keydown',    _onKey,  true);
        };
        const _onDown = e => { if (!dd.contains(e.target)) { closeUserDropdown(); } };
        const _onKey  = e => { if (e.key === 'Escape')      { closeUserDropdown(); } };
        _activeUserDropdownCleanup = _cleanup;
        _dismissTimer = window.setTimeout(() => {
            _dismissTimer = null;
            if (_activeUserDropdown !== dd) { return; }
            document.addEventListener('pointerdown', _onDown, true);
            document.addEventListener('keydown',    _onKey,  true);
        }, 0);
    }

    function triggerUserModal(sourceAnchor, username = '') {
        let trigger = sourceAnchor;

        if ((!trigger || !trigger.isConnected) && username) {
            const wanted = username.trim().toLowerCase();
            trigger = [...document.querySelectorAll('#activeUserList a.userlink, #txt a.userlink')]
                .find(anchor => anchor.textContent.trim().toLowerCase() === wanted);
        }

        if (!trigger) { return; }
        invokeNativeElementAction(trigger);
    }

    function userAvatarColor(name) {
        let h = 0;
        for (let i = 0; i < name.length; i++) { h = (h * 31 + name.charCodeAt(i)) >>> 0; }
        return `hsl(${h % 360}, 48%, 36%)`;
    }

    function fuzzyMatch(query, name) {
        // Returns a score >= 0 if all chars of query appear in order in name, else -1.
        // Higher score = better match (consecutive runs bonus).
        if (!query) { return 0; }
        let qi = 0, score = 0, consecutive = 0;
        for (let i = 0; i < name.length && qi < query.length; i++) {
            if (name[i] === query[qi]) {
                score += 1 + consecutive * 2;
                consecutive++;
                qi++;
            } else {
                consecutive = 0;
            }
        }
        return qi === query.length ? score : -1;
    }

    function isUserListSearchActive() {
        return userListState.searchFocused || !!document.activeElement?.classList?.contains('ichc-ul-search-input');
    }

    // ── Word cloud ────────────────────────────────────────────────────────────────
    let _wordCloudMode = localStorage.getItem('ichc_wc_mode') === '1';

    function _wcFontSize(karma) {
        if (typeof karma === 'number' && karma > 0) {
            return Math.round(Math.min(22, 12 + Math.sqrt(karma) * 0.8)) + 'px';
        }
        return '12px';
    }

    function buildWordCloud(users) {
        let wc = ensureWordCloud();
        if (!wc) { return; }
        wc.innerHTML = '';
        const visible = users.filter(u => !u.cammed && !u.hidden);
        if (!visible.length) {
            const empty = document.createElement('span');
            empty.className = 'ichc-wc-empty';
            empty.textContent = 'no one lurking';
            wc.appendChild(empty);
            return;
        }
        for (const u of visible) {
            const el = document.createElement('span');
            el.className = 'ichc-wc-nick' + (u.mod ? ' ichc-wc-mod' : '') + (u.idle ? ' ichc-wc-idle' : '');
            el.textContent = u.name;
            el.style.fontSize = _wcFontSize(u.karma);
            el.title = u.karma != null ? `${u.name} · karma ${u.karma}` : u.name;
            el.addEventListener('click', () => {
                u.trigger?.click();
            });
            wc.appendChild(el);
        }
    }

    function ensureWordCloud() {
        // Word cloud is the last child of #ichc-cams-panel (after #cams).
        // The panel stays flex:1 1 auto (full column height), #cams sits at its
        // natural grid height (flex-grow:0 by default), and the word cloud fills
        // the remaining space with flex:1 1 0. box-sizing:border-box on the WC
        // element prevents padding from causing overflow → no scrollbar → no
        // ResizeObserver trigger → no updateCamDensity cascade.
        const panel = document.getElementById('ichc-cams-panel');
        if (!panel) { return null; }
        let wc = document.getElementById('ichc-wordcloud');
        if (!wc) {
            wc = document.createElement('div');
            wc.id = 'ichc-wordcloud';
        }
        if (wc.parentElement !== panel) {
            panel.appendChild(wc);
        }
        return wc;
    }

    function setWordCloudMode(on) {
        _wordCloudMode = on;
        localStorage.setItem('ichc_wc_mode', on ? '1' : '0');
        const wc = ensureWordCloud();
        if (wc) { wc.classList.toggle('ichc-wc-visible', on); }
        const btn = document.getElementById('ichc-wc-toggle-btn');
        if (btn) {
            const label = on ? 'Hide word cloud' : 'Show word cloud';
            btn.innerHTML = `<span class="ichc-cog-item-icon" aria-hidden="true">${ICONS.cloud}</span><span>${label}</span>`;
        }
        if (on) { buildUserList({ force: true }); }
        updateCamDensity();
        // Full relayout so applyFeaturedCam can hand off between freeform
        // packing (WC hidden) and the legacy grid (WC visible) — density
        // alone never removes/restores the ichc-cams-freeform placement.
        requestCamRelayout(40);
    }

    function bindUserListMoreMenuDismiss() {
        if (userListState.moreMenuDismissBound) { return; }
        userListState.moreMenuDismissBound = true;
        document.addEventListener('click', event => {
            const menu = document.getElementById('ichc-ul-more-menu');
            if (!menu || menu.hidden) { return; }
            if (menu.contains(event.target)) { return; }
            const moreBtn = document.querySelector('.ichc-ul-more-btn');
            if (moreBtn?.contains(event.target)) { return; }
            menu.hidden = true;
            moreBtn?.classList.remove('ichc-menu-open');
        }, true);
    }

    function buildUserList({ force = false } = {}) {
        const src = document.getElementById('activeUserList');
        if (!src) { return; }
        bindUserListMoreMenuDismiss();

        if (!force && isUserListSearchActive()) {
            userListState.rebuildPendingAfterSearch = true;
            window.clearTimeout(userListState.timer);
            return;
        }
        // Don't rebuild while the ⋮ more menu is open — removing the header causes visible flicker
        if (!force && document.getElementById('ichc-ul-more-menu')?.hidden === false) {
            return;
        }
        // Skip full DOM rebuild when source data hasn't meaningfully changed.
        // Signature: textContent length + first 100 chars + cam element count + blocked-list length.
        // Any user join/leave, name change, or cam/block state change will shift at least one value.
        if (!force) {
            const _tc = src.textContent;
            const _sig = `${_tc.length}|${_tc.slice(0, 100)}|${document.getElementById('cams')?.childElementCount ?? 0}|${(localStorage.getItem('ichc_blocked') || '').length}`;
            if (_sig === userListState.lastBuildSig) { return; }
            userListState.lastBuildSig = _sig;
        }
        userListState.rebuildPendingAfterSearch = false;
        // Track focus — panel.innerHTML='' blurs anything focused inside the panel.
        // Use the persistent state flag as the source of truth: panel.innerHTML='' fires blur
        // synchronously, which would zero out activeElement before we can read it below.
        const _blFocusedId = document.activeElement?.id;
        const _hadSearchFocus = userListState.searchFocused || (document.activeElement?.classList?.contains('ichc-ul-search-input') ?? false);
        const shell = document.getElementById('ichc-chat-shell');

        const modSet = new Set();
        // Section-based mod + supporter detection: icanhazchat groups users under
        // section headers (e.g. "Mods", "Site Supports", "Get Hearted Users").
        // Browsers may push <p> elements that appear inside <ul> in source HTML
        // OUTSIDE the <ul> in the parsed DOM — so we scan both #activeUserList
        // and its direct parent children (siblings of the <ul>).
        const supporterSectionPattern = /^(get\s*hearted(?:\s+users)?|hearted(?:\s+users)?|site\s+supports?|site\s+supporters?|supporters?|contributors?|site\s+contributors?|donors?|patrons?)$/i;
        const supporterMarkerPattern = /(get[_\s-]?hearted|hearted|heart|supporter|trophysupporter|trophy[_\s-]?supporter|heart_delete|valentine|site[_\s-]?supporter?|contrib|contributor|site[_\s-]?contributor?|donor|patron)/i;
        const supporterNames = new Set();

        const _addSectionUsers = (header) => {
            const text = normalizeText(header.textContent || '');
            const headerLinks = header.querySelectorAll('a.userlink');
            if (headerLinks.length || text.length > 80) { return; }
            const isModSection       = /\bmod(erator)?s?\b/i.test(text);
            const isSupporterSection = supporterSectionPattern.test(text);
            if (!isModSection && !isSupporterSection) { return; }
            let sib = header.nextElementSibling;
            while (sib && !/^(P|H[1-6])$/.test(sib.tagName)) {
                sib.querySelectorAll('a.userlink').forEach(a => {
                    const key = a.textContent.trim().toLowerCase();
                    if (isModSection)       { modSet.add(key); }
                    if (isSupporterSection) { supporterNames.add(key); }
                });
                sib = sib.nextElementSibling;
            }
        };
        // Scan section headers inside #activeUserList
        src.querySelectorAll('p, h2, h3, h4').forEach(_addSectionUsers);
        // Also scan direct siblings of #activeUserList (handles browser-pushed-out <p> tags)
        if (src.parentElement) {
            [...src.parentElement.children].forEach(child => {
                if (child !== src && /^(P|H[1-6])$/.test(child.tagName)) {
                    _addSectionUsers(child);
                }
            });
        }

        const cammed      = getCammedNames();
        const liveEntries = getLiveCamEntries();
        const liveKeys    = new Set(liveEntries.map(e => e.name.trim().toLowerCase()));
        const blocked = loadBlockedUsers();
        const seen    = new Set();
        const users   = [];

        // Per-element marker scan — catches inline img/span supporter icons
        // on individual rows that aren't covered by the section scan above.
        const markerSelector = [
            'img.smicon',
            'img[src*="heart" i]',
            'img[src*="support" i]',
            'img[src*="contrib" i]',
            'img[src*="donor" i]',
            'img[src*="patron" i]',
            'img[src*="trophy" i]',
            'img[src*="staff" i]',
            'span[data-icon]',
            '[title*="heart" i]',
            '[title*="support" i]',
            '[title*="contrib" i]',
            '[title*="donor" i]',
            '[title*="patron" i]',
            '[title*="staff" i]',
            '[aria-label*="heart" i]',
            '[aria-label*="support" i]',
            '[aria-label*="contrib" i]',
            '[aria-label*="donor" i]',
            '[aria-label*="patron" i]',
            '[aria-label*="staff" i]'
        ].join(',');
        const markerText = node => [
            node.getAttribute?.('src'),
            node.getAttribute?.('data-icon'),
            node.getAttribute?.('title'),
            node.getAttribute?.('alt'),
            node.getAttribute?.('aria-label'),
            node.className,
        ].filter(Boolean).join(' ');
        const isSupporterMarker = node => !!node && supporterMarkerPattern.test(markerText(node));
        const nearestUserlink = node => {
            let el = node.previousElementSibling;
            while (el && !el.matches?.('a.userlink')) { el = el.previousElementSibling; }
            if (el) { return el; }
            el = node.nextElementSibling;
            while (el && !el.matches?.('a.userlink')) { el = el.nextElementSibling; }
            if (el) { return el; }
            return node.closest?.('a.userlink') || node.parentElement?.querySelector('a.userlink') || node.closest?.('li, p, div')?.querySelector('a.userlink') || null;
        };
        src.querySelectorAll(markerSelector).forEach(marker => {
            if (!isSupporterMarker(marker)) { return; }
            const n = nearestUserlink(marker)?.textContent?.trim().toLowerCase();
            if (n) { supporterNames.add(n); }
        });

        // Broad context check — catches class-based markers (li.hearted, li.site-support)
        // and tooltip/data-original-title attributes that the above scans miss.
        const contextSupporterCheck = (a, parentLi) => {
            const parts = [
                a.className,
                a.getAttribute('title'),
                a.getAttribute('data-original-title'),
                parentLi?.className,
                a.previousElementSibling?.className,
                a.previousElementSibling?.getAttribute?.('title'),
                a.previousElementSibling?.getAttribute?.('alt'),
                a.previousElementSibling?.getAttribute?.('aria-label'),
                a.previousElementSibling?.getAttribute?.('data-icon'),
                a.previousElementSibling?.getAttribute?.('src'),
                a.nextElementSibling?.className,
                a.nextElementSibling?.getAttribute?.('title'),
                a.nextElementSibling?.getAttribute?.('alt'),
                a.nextElementSibling?.getAttribute?.('aria-label'),
                a.nextElementSibling?.getAttribute?.('data-icon'),
                a.nextElementSibling?.getAttribute?.('src'),
            ].filter(Boolean).join(' ');
            return supporterMarkerPattern.test(parts);
        };

        src.querySelectorAll('a.userlink').forEach(a => {
            const name = a.textContent.trim();
            const key  = name.toLowerCase();
            if (seen.has(key)) { return; }
            seen.add(key);
            const parentLi = a.closest('li');
            const smicon = a.querySelector('img.smicon') || parentLi?.querySelector('img.smicon');
            if (smicon?.src && !profileYearCache.has(key)) {
                const ym = smicon.src.match(/Trophy_(\d+)ye?a?r/i);
                if (ym) { profileYearCache.set(key, parseInt(ym[1], 10)); }
            }
            // Detect broadcasting via cam-logo icon in userlist row (site inserts
            // img.cam-logo next to the userlink for broadcasting users). theme.js
            // replaces those with span[data-icon="cam-logo"] by DOMContentLoaded,
            // so check both forms. Also check common li class conventions.
            const hasCamLogo = !!(
                a.querySelector('img.cam-logo, span[data-icon="cam-logo"]') ||
                parentLi?.querySelector('img.cam-logo, span[data-icon="cam-logo"]') ||
                parentLi?.classList.contains('cam') ||
                parentLi?.classList.contains('on-cam')
            );
            users.push({
                name,
                idle:    a.innerHTML.includes('<strike') || a.parentElement?.tagName === 'STRIKE',
                mod:     modSet.has(key),
                cammed:  cammed.has(key) || hasCamLogo || liveKeys.has(key),
                hidden:  blocked.has(key),
                karma:   extractKarmaFromUserAnchor(a) ?? profileKarmaCache.get(key) ?? null,
                trigger: a,
                icon:      smicon ? { src: smicon.src, title: smicon.title || smicon.alt || '' } : null,
                supporter: supporterNames.has(key) ||
                           !!(parentLi && Array.from(parentLi.querySelectorAll(markerSelector)).some(isSupporterMarker)) ||
                           contextSupporterCheck(a, parentLi),
            });
        });

        // Also include any users who are broadcasting (in #cams) but absent from
        // #activeUserList — this covers hidden-cam users the site may omit from
        // its own list.
        liveEntries.forEach(entry => {
            const key = entry.name.trim().toLowerCase();
            if (!key || seen.has(key)) { return; }
            seen.add(key);
            const triggerEl = [...document.querySelectorAll('#activeUserList a.userlink, #txt a.userlink')]
                .find(a => a.textContent.trim().toLowerCase() === key) || null;
            users.push({
                name:    entry.name.trim(),
                idle:    false,
                mod:     modSet.has(key),
                cammed:  true,
                hidden:  blocked.has(key),
                karma:   triggerEl ? extractKarmaFromUserAnchor(triggerEl) : null,
                trigger: triggerEl,
            });
        });

        // Pre-warm karma/year caches from localStorage for all users so the sort
        // has accurate values. Without this, the first build always sorts alphabetically
        // because _fetchProfile (which warms the cache) only fires after rows are visible.
        users.forEach(u => {
            const k = u.name.toLowerCase();
            if (!profileKarmaCache.has(k)) {
                try {
                    const ks = localStorage.getItem(_KM_LS + k);
                    if (ks) {
                        const { karma, ts } = JSON.parse(ks);
                        if ((Date.now() - ts) < _KM_TTL && karma != null) { profileKarmaCache.set(k, karma); }
                    }
                } catch (_) {}
            }
            if (!profileYearCache.has(k)) {
                try {
                    const ys = localStorage.getItem(_YB_LS + k);
                    if (ys) {
                        const { year, ts } = JSON.parse(ys);
                        if ((Date.now() - ts) < _YB_TTL) { profileYearCache.set(k, year); }
                    }
                } catch (_) {}
            }
            if (u.karma == null) { u.karma = profileKarmaCache.get(k) ?? null; }
        });

        users.sort((a, b) => {
            // hidden-but-cammed: sort with cammed users (0); hidden-offline: bottom (4)
            const rank = u => (u.hidden && !u.cammed ? 4 : u.idle ? 3 : u.cammed ? 0 : u.mod ? 1 : 2);
            const rd = rank(a) - rank(b);
            if (rd !== 0) { return rd; }
            // secondary sort within rank group
            const sm = userListState.sortMode;
            if (sm === 'karma') {
                const ka = a.karma ?? -Infinity, kb = b.karma ?? -Infinity;
                if (ka !== kb) { return kb - ka; }
            } else if (sm === 'age') {
                const nka = a.name.trim().toLowerCase(), nkb = b.name.trim().toLowerCase();
                const _toTs = nk => {
                    const jt = profileJoinTsCache.get(nk);
                    if (jt != null) { return jt; }
                    const yr = profileYearCache.get(nk);
                    return (yr > 0) ? Date.UTC(new Date().getFullYear() - yr, 0, 1) : null;
                };
                const ta = _toTs(nka), tb = _toTs(nkb);
                if (ta !== tb) {
                    if (ta == null) { return 1; }
                    if (tb == null) { return -1; }
                    return ta - tb;  // smaller (earlier) timestamp = older member = first
                }
            }
            return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
        });

        let panel = document.getElementById('ichc-userlist');
        if (!panel) {
            panel = document.createElement('aside');
            panel.id = 'ichc-userlist';
        }
        if (shell) {
            if (panel.parentElement !== shell) {
                shell.appendChild(panel);
            }
        } else if (panel.parentElement !== src.parentNode) {
            src.parentNode.insertBefore(panel, src.nextSibling);
        }

        // Preserve search state across rebuilds
        const prevQuery = panel.querySelector('.ichc-ul-search-input')?.value || '';
        const prevSearchOpen = panel.classList.contains('ichc-ul-search-open');
        const prevOfflineOpen = panel.querySelector('.ichc-ul-offline-hidden.is-open') !== null;
        // Capture scroll position before any DOM mutations — the cleanup and header
        // re-insertion below can cause Chrome to reset scrollTop to 0.
        const _existingScrollBody = panel.querySelector('.ichc-ul-scroll-body');
        const _savedScrollTop = _existingScrollBody?.scrollTop ?? 0;
        // Detach persistent elements before the panel clear so they survive the rebuild.
        const savedResizer = panel.querySelector('#ichc-userlist-resizer');
        savedResizer?.remove();
        const savedMoreBtn = document.querySelector('.ichc-ul-more-btn');
        savedMoreBtn?.remove();
        const savedPmAvatars = document.getElementById('ichc-pm-avatars');
        if (savedPmAvatars && panel.contains(savedPmAvatars)) { savedPmAvatars.remove(); }
        const savedPmBtn = document.getElementById('ichc-pm-toggle-btn');
        if (savedPmBtn && panel.contains(savedPmBtn)) { savedPmBtn.remove(); }

        userListState.avatarObserver?.disconnect();
        // Get or create the scroll body that holds user rows. User rows stay inside it
        // across rebuilds so their CSS transitions (year-badge hover, etc.) are preserved.
        let scrollBody = panel.querySelector('.ichc-ul-scroll-body');
        userListState._suppressBlur = true;
        if (scrollBody) {
            // Clean non-user-row content from scroll body (offline sections etc.)
            [...scrollBody.children].forEach(el => {
                if (!el.classList.contains('ichc-ul-user')) { el.remove(); }
            });
        }
        // Remove all panel children except the scroll body (removes old header etc.)
        // and the overlay scrollbar, which must survive rebuilds — it is bound to the
        // scroll body, and the scroll body is reused rather than recreated.
        [...panel.children].forEach(el => {
            if (el !== scrollBody && !el.classList.contains('ichc-osb')) { el.remove(); }
        });
        if (!scrollBody) {
            scrollBody = document.createElement('div');
            scrollBody.className = 'ichc-ul-scroll-body';
        }
        // Track the user's scroll intent so rebuilds never yank an in-progress scroll.
        // Our own programmatic restores also fire 'scroll', so ignore the echo for a
        // short window after each write (see the restore block at the end of build).
        if (!scrollBody.dataset.ichcScrollBound) {
            scrollBody.dataset.ichcScrollBound = '1';
            scrollBody.addEventListener('scroll', () => {
                const top = scrollBody.scrollTop;
                userListState.scrollTop = top;
                // A user scroll lands on a different pixel than the one we just wrote,
                // so value-match (not just timing) tells our restore echo apart from real input.
                const isEcho = Math.abs(top - userListState._programmaticScrollTo) <= 1 &&
                               performance.now() - userListState._programmaticScrollAt < 400;
                if (!isEcho) { userListState._lastUserScrollAt = performance.now(); }
            }, { passive: true });
        }
        userListState._suppressBlur = false;
        if (prevSearchOpen) { panel.classList.add('ichc-ul-search-open'); }
        panel.classList.toggle('ichc-ul-no-avatars', !userListState.showAvatars);

        const activeCount    = users.filter(u => !u.idle).length;
        const idleCount      = users.filter(u => u.idle).length;
        const cammedCount    = users.filter(u => u.cammed).length;
        const hiddenCamCount = users.filter(u => u.hidden && u.cammed).length;

        // Highest karma currently in the list — used to scale the per-row karma
        // underline bar on a log scale. Recomputed every render.
        const maxKarma = users.reduce((m, u) => {
            const k = profileKarmaCache.get(u.name.toLowerCase()) ?? u.karma ?? 0;
            return k > m ? k : m;
        }, 1);
        // Set the karma underline bar width (log-scaled, ~6..30px). Right-aligned in CSS.
        const _setKarmaBar = (span, karma) => {
            const bar = span.querySelector('.ichc-ul-karma-bar');
            if (!bar) { return; }
            if (karma == null || karma <= 0) { bar.style.width = '0px'; return; }
            const barW = 6 + 24 * (Math.log(karma + 1) / Math.log(maxKarma + 1));
            bar.style.width = barW.toFixed(1) + 'px';
        };

        // Previous counts for the flip animation now live in
        // userListState.prevSectionCounts, written by renderUsers() where the section
        // headers are built — the header no longer carries a counter of its own.
        const _totalUsers = activeCount + idleCount;

        const chatShell = document.getElementById('ichc-chat-shell');

        // First build — schedule transformCommandBar for cog/theme placement
        if (chatShell && !document.getElementById('ichc-ul-collapse-btn')) {
            window.setTimeout(transformCommandBar, 0);
        }

        // ── Header ──
        const header = document.createElement('div');
        header.className = 'ichc-ul-header';

        // Single-row header: [metrics (flex:1)] [collapse]
        const titleRow = document.createElement('div');
        titleRow.className = 'ichc-ul-title-row';

        // Per-digit flip cells: one .ichc-fh-digit per character position.
        // Ghost "0" inside each cell sizes it; the absolute .ichc-fh covers it.
        const _fh = (n, o) => {
            const ns = String(n), os = String(o);
            const len = Math.max(ns.length, os.length);
            const nPad = ns.padStart(len, '0'), oPad = os.padStart(len, '0');
            return nPad.split('').map((d, i) =>
                `<span class="ichc-fh-digit"><span class="ichc-fh-ghost">0</span>` +
                `<span class="ichc-fh"><span>${d}</span><span>${d}</span>` +
                `<span>${oPad[i]}</span><span>${oPad[i]}</span></span></span>`
            ).join('');
        };
        // The big cams/total readout used to live here. It moved onto the ON CAM /
        // ACTIVE section headers, which already name what they are counting — the
        // header was restating it in a second place. _fh() and _flipCountWAAPI() are
        // unchanged and now drive the section counts instead; see buildSectionCount()
        // in renderUsers(). Kept as an empty flex child so the title row keeps its
        // shape and the controls stay right-aligned.
        const metricsRow = document.createElement('div');
        metricsRow.className = 'ichc-ul-metrics-row';

        // Controls: collapse tab is absolute on the header right edge. The search
        // button is gone — clicking any section header opens search instead.
        const controlsRow = document.createElement('div');
        controlsRow.className = 'ichc-ul-controls-row';

        const collapseBtn = document.createElement('button');
        collapseBtn.type = 'button';
        collapseBtn.id = 'ichc-ul-collapse-btn';
        collapseBtn.innerHTML = ICONS.dotsAnimated;
        collapseBtn.classList.toggle('ichc-ul-is-collapsed', _ulCollapsed);
        collapseBtn.title = _ulCollapsed ? 'Expand user list' : 'Collapse user list';
        collapseBtn.addEventListener('click', e => { e.stopPropagation(); _toggleUserListCollapse(); });

        titleRow.append(metricsRow, controlsRow);

        const searchRow = document.createElement('div');
        searchRow.className = 'ichc-ul-search-row';
        const searchInput = document.createElement('input');
        searchInput.type = 'search';
        searchInput.className = 'ichc-ul-search-input';
        searchInput.placeholder = 'Filter users…';
        searchInput.setAttribute('autocomplete', 'off');
        searchInput.setAttribute('spellcheck', 'false');
        if (prevQuery) { searchInput.value = prevQuery; }
        searchInput.addEventListener('focus', () => { userListState.searchFocused = true; });
        searchInput.addEventListener('blur',  () => {
            if (userListState._suppressBlur) { return; }
            userListState.searchFocused = false;
            if (userListState.rebuildPendingAfterSearch) {
                scheduleUserListBuild(80, true);
            }
        });
        searchRow.appendChild(searchInput);

        header.appendChild(titleRow);
        header.appendChild(searchRow);
        // Collapse tab — absolute strip on the right edge of the header
        header.appendChild(collapseBtn);

        // Resize handle: absolute against #ichc-userlist (already position: relative),
        // NOT the header. Anchored to the header it was only as tall as that bar, which
        // made it a small target; spanning the panel puts it alongside the PM strip and
        // the ON CAM / ACTIVE section rules too. Appended to the panel below, once the
        // header is in place.
        const ulResizer = savedResizer || document.createElement('div');
        ulResizer.id = 'ichc-userlist-resizer';
        initUserlistResizer(ulResizer);

        // Insert header; scroll body will go at end so header lands before it.
        panel.insertBefore(header, panel.firstChild || null);
        // Resizer last so it paints above the header and section rules it now spans.
        panel.appendChild(ulResizer);

        // Reattach PM avatars below the header/title row
        if (savedPmAvatars) {
            header.after(savedPmAvatars);
            if (savedPmBtn && !savedPmAvatars.contains(savedPmBtn)) {
                savedPmAvatars.insertBefore(savedPmBtn, savedPmAvatars.firstChild || null);
            }
            // Collapse tab lives in the bottom-right of the PM avatar strip.
            //
            // THE LEAK, measured in a live 6.5-hour session: 2,803 duplicate
            // collapse buttons inside this strip, 19,631 nodes — 54% of the
            // entire document. `collapseBtn` is created fresh on every
            // buildUserList() (see its `document.createElement` above), but the
            // strip is REUSED across builds, so `contains(collapseBtn)` asks
            // whether the strip already holds THIS brand-new node. It never
            // does. The guard therefore never fired, every rebuild appended
            // another button, and nothing ever removed one. The userlist
            // rebuilds on a 350ms debounce whenever the room's user list
            // mutates, which in a busy room is several times a minute.
            //
            // The duplicates also all carried `id="ichc-ul-collapse-btn"`, so
            // `getElementById` kept returning the OLDEST one — which is why
            // `_toggleUserListCollapse` and the placement fix-up in
            // `transformCommandBar` were operating on a stale button while the
            // visible one was the last appended.
            //
            // Evict any previous tab before adopting the new one. Scoped to the
            // strip because that is the only container that survives a rebuild;
            // the header this button was first appended to is itself rebuilt.
            savedPmAvatars.querySelectorAll('#ichc-ul-collapse-btn').forEach(stale => {
                if (stale !== collapseBtn) { stale.remove(); }
            });
            if (!savedPmAvatars.contains(collapseBtn)) {
                savedPmAvatars.appendChild(collapseBtn);
            }
        }

        // Scroll body always lives at the end of the panel — below header and PM avatars.
        panel.appendChild(scrollBody);

        // Overlay scrollbar for the user rows, hosted on the panel (position:
        // relative). No-op after the first build, since the scroll body is reused.
        _initOverlayScrollbar(scrollBody, panel);

        // Sidebar cam/viewer stats (visible only when collapsed)
        _updateSidebarStats(panel, cammedCount, activeCount + idleCount);

        // Reattach the saved more-btn (preserves open/closed state and all listeners).
        // Refresh sort-active class in case sortMode changed since last build.
        if (savedMoreBtn) {
            savedMoreBtn.querySelectorAll('[data-sort]').forEach(btn => {
                btn.classList.toggle('ichc-ul-sort-active', btn.dataset.sort === userListState.sortMode);
            });
            const _ir = document.getElementById('ichc-input-row');
            const _sendBtn = document.getElementById('btn');
            if (_ir && !_ir.contains(savedMoreBtn)) {
                _ir.insertBefore(savedMoreBtn, _sendBtn || null);
            }
        }

        // ── Per-user text colour on userlist names ────────────────────────────
        // chat.js harvests each user's own chosen text colour from their messages
        // (see the nick colour registry there) and shares it via window +
        // localStorage. Applied here as --ichc-ul-name-color so a person reads as the
        // same colour in the userlist as in chat. Two values are written because the
        // panel background differs per theme: dark needs dark colours lifted, light
        // needs light ones pushed down. CSS falls back to the role colour when a user
        // has not been seen speaking yet.
        const _nickColorMap = () => {
            if (window.__ichcNickColors instanceof Map) { return window.__ichcNickColors; }
            try {
                const raw = JSON.parse(localStorage.getItem('ichc_nick_colors') || '{}');
                const m = new Map(Object.entries(raw));
                window.__ichcNickColors = m;
                return m;
            } catch (_) { return new Map(); }
        };

        const _parseRgb = (value) => {
            const v = String(value || '').trim().toLowerCase();
            const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
            if (hex) {
                const h = hex[1];
                return h.length === 3
                    ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
                    : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
            }
            const m = v.match(/^rgba?\(([^)]+)\)$/);
            if (m) {
                const p = m[1].split(',').map(n => parseFloat(n));
                if (p.length >= 3 && p.every(n => !Number.isNaN(n))) { return [p[0], p[1], p[2]]; }
            }
            return null;
        };

        // Mirrors chat.js's makeReadableChatColor so both panels agree on the shade.
        const _readableOnDark = (rgb) => {
            const [r, g, b] = rgb;
            const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            if (lum >= 0.4) { return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`; }
            const mix = Math.min(0.76, 0.2 + ((0.4 - lum) / 0.4) * 0.48);
            return `rgb(${Math.round(r + (255 - r) * mix)}, ${Math.round(g + (255 - g) * mix)}, ${Math.round(b + (255 - b) * mix)})`;
        };
        // Targets a contrast ratio rather than a luminance threshold — see the matching
        // makeReadableOnLightChatColor() in chat.js for why (a threshold lets
        // mid-luminance colours through at ~2.5:1). Kept identical to it on purpose so a
        // person's colour reads the same in the userlist as in chat.
        const _readableOnLight = (rgb) => {
            const [r, g, b] = rgb;
            const chan = c => {
                const s = c / 255;
                return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
            };
            // Reference is the darkest light-theme row, not white — see chat.js.
            const lum = (rr, gg, bb) => 0.2126 * chan(rr) + 0.7152 * chan(gg) + 0.0722 * chan(bb);
            const bgL = lum(206, 210, 216);
            const contrast = (rr, gg, bb) => {
                const f = lum(rr, gg, bb);
                return (Math.max(f, bgL) + 0.05) / (Math.min(f, bgL) + 0.05);
            };
            if (contrast(r, g, b) >= 4.5) {
                return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
            }
            let lo = 0, hi = 1;
            for (let i = 0; i < 16; i++) {
                const mid = (lo + hi) / 2;
                if (contrast(r * mid, g * mid, b * mid) >= 4.5) { lo = mid; } else { hi = mid; }
            }
            return `rgb(${Math.round(r * lo)}, ${Math.round(g * lo)}, ${Math.round(b * lo)})`;
        };

        const _applyNickColor = (span, name) => {
            const raw = _nickColorMap().get((name || '').trim().toLowerCase());
            const rgb = raw ? _parseRgb(raw) : null;
            if (!rgb) {
                span.style.removeProperty('--ichc-ul-name-color');
                span.style.removeProperty('--ichc-ul-name-color-lt');
                return;
            }
            span.style.setProperty('--ichc-ul-name-color', _readableOnDark(rgb));
            span.style.setProperty('--ichc-ul-name-color-lt', _readableOnLight(rgb));
        };

        // Inline role badges after the name: mod shield, then supporter heart.
        // Called from both row paths on purpose. Previously these were only created in
        // _buildNewRow, while the reuse path just rewrote className — so a user who
        // became a mod after their row was first built got the `mod` class (hence the
        // blurple name, the only visible "who is a mod" cue) but never the shield.
        // Same held for the heart. Syncing both directions also clears a badge when
        // the role goes away.
        const _syncRoleBadges = (span, u) => {
            const nameWrap = span.querySelector('.ichc-ul-name-wrap');
            if (!nameWrap) { return; }

            let shield = nameWrap.querySelector(':scope > .ichc-ul-mod-badge');
            if (u.mod && !shield) {
                shield = document.createElement('span');
                shield.className = 'ichc-ul-mod-badge';
                shield.setAttribute('aria-label', 'Moderator');
                shield.title = 'Moderator';
                shield.innerHTML = ICONS.shield;
                nameWrap.appendChild(shield);
            } else if (!u.mod && shield) {
                shield.remove();
                shield = null;
            }

            let heart = nameWrap.querySelector(':scope > .ichc-ul-supporter-heart');
            if (u.supporter && !heart) {
                heart = document.createElement('span');
                heart.className = 'ichc-ul-supporter-heart';
                heart.setAttribute('aria-label', 'Get Hearted');
                heart.title = 'Get Hearted';
                heart.innerHTML = ICONS.heart;
                nameWrap.appendChild(heart);
            } else if (!u.supporter && heart) {
                heart.remove();
                heart = null;
            }

            // Shield sits immediately before the heart so the two read as one group
            if (shield && heart && shield.nextElementSibling !== heart) {
                nameWrap.insertBefore(shield, heart);
            }
        };

        // ── User rows ──
        const _buildNewRow = (u, imgKey) => {
            const span = document.createElement('a');
            span.className = 'ichc-ul-user userlink' +
                (u.hidden ? ' ichc-ul-hidden-live' : '') +
                (u.cammed ? ' cammed' : '') +
                (u.mod    ? ' mod'    : '') +
                (u.idle   ? ' idle'   : '') +
                (u.supporter ? ' ichc-ul-supporter-row' : '');
            span.href = u.trigger?.getAttribute('href') || '#';
            span.setAttribute('draggable', 'false');
            span.setAttribute('tabindex', '0');
            span.setAttribute('role', 'button');
            if (u.trigger) {
                [...u.trigger.getAttributeNames()].forEach(attr => {
                    if (attr === 'class' || attr === 'style' || attr === 'id' || attr === 'href') { return; }
                    if (/^on/i.test(attr)) { return; }
                    span.setAttribute(attr, u.trigger.getAttribute(attr) || '');
                });
            }
            if (profileGuestCache.get(imgKey) === true) { span.classList.add('ichc-ul-guest'); }
            // Layout: [avatar?] [name + inline icons] [meta: year / karma / bar]
            span.innerHTML = `<span class="ichc-ul-name-wrap"><span class="ichc-ul-user-name"></span></span>` +
                `<span class="ichc-ul-meta">` +
                `<span class="ichc-ul-year-badge" data-year-key=""></span>` +
                `<span class="ichc-ul-karma" data-karma-key=""></span>` +
                `<span class="ichc-ul-karma-bar"></span>` +
                `</span>`;
            span.querySelector('.ichc-ul-user-name').textContent = u.name;
            const nameWrap = span.querySelector('.ichc-ul-name-wrap');

            const yearEl = span.querySelector('.ichc-ul-year-badge');
            yearEl.dataset.yearKey = imgKey;
            const initYear = profileYearCache.get(imgKey);
            _setBadgeYear(yearEl, initYear ?? null);
            _setYearTierClass(yearEl, initYear ?? null);

            const karmaEl = span.querySelector('.ichc-ul-karma');
            karmaEl.dataset.karmaKey = imgKey;
            const initKarma = profileKarmaCache.get(imgKey) ?? u.karma;
            if (initKarma != null) { karmaEl.textContent = initKarma.toLocaleString(); }
            _setKarmaTierClass(span, initKarma ?? null);
            _setUserViz(span, initKarma ?? null, initYear ?? null);
            _setKarmaBar(span, initKarma ?? null);

            // Profile avatar — reuse <img> element across rebuilds; src is only set
            // after the row enters the viewport (IntersectionObserver below) to avoid
            // aborting in-progress loads and to limit CDN requests to visible users.
            let avatarImg = avatarImgCache.get(imgKey);
            if (!avatarImg) {
                avatarImg = document.createElement('img');
                avatarImg.className = 'ichc-ul-avatar';
                avatarImg.alt = '';
                avatarImg.draggable = false;
                avatarImg.onerror = () => {
                    avatarImg.removeAttribute('src');
                    avatarImg.classList.remove('ichc-ul-avatar-loaded');
                    _profileCacheSet(imgKey, null);
                    _lsAvSave(imgKey, null);
                };
                _avatarImgCacheSet(imgKey, avatarImg);
            }
            // If URL is already resolved (localStorage hit on this session), show immediately
            const cachedUrl = profileImageCache.get(imgKey); // undefined = not yet fetched
            if (cachedUrl) { _loadAvatarSrc(avatarImg, cachedUrl, imgKey); }
            // Apply profile background image if already cached
            const cachedBg = profileBgCache.get(imgKey);
            if (cachedBg) { span.style.setProperty('--ichc-bg-img', `url("${cachedBg}")`); }

            // Tag the row so the observer can trigger the fetch when it scrolls into view
            span.dataset.ichcAvKey = imgKey;
            const avatarWrap = document.createElement('span');
            avatarWrap.className = 'ichc-ul-avatar-wrap' + (u.supporter ? ' ichc-ul-supporter' : '');
            avatarWrap.dataset.initial = (u.name[0] || '?').toUpperCase();
            avatarWrap.style.setProperty('--ichc-av-bg', userAvatarColor(u.name));
            avatarWrap.appendChild(avatarImg);
            span.insertBefore(avatarWrap, span.firstElementChild);
            if (u.icon) {
                const img = document.createElement('img');
                img.src = u.icon.src;
                img.title = u.icon.title;
                img.alt = u.icon.title;
                img.className = 'ichc-ul-smicon';
                span.querySelector('.ichc-ul-user-name').appendChild(img);
            }
            span.title = [
                u.hidden && 'hidden',
                u.mod && 'mod',
                u.cammed && 'on cam',
                u.supporter && 'Get Hearted',
                u.idle && 'idle',
                u.karma != null && `${u.karma} karma`,
            ].filter(Boolean).join(' · ') || u.name;

            // Inline role icons — rendered right after the name (§6).
            _syncRoleBadges(span, u);
            _applyNickColor(span, u.name);

            // Cam-hidden users stay in ON CAM (§7) and carry an eye-slash to re-enable
            // them. Users whose cam is *showing* get no button: the old hover-to-reveal
            // "Hide cam" eye reserved a slot in every cammed row for an action already
            // available in the user dropdown ("Hide cam"), so it cost layout on every
            // broadcaster to duplicate an existing control.
            if (u.hidden) {
                const enableBtn = document.createElement('button');
                enableBtn.type = 'button';
                enableBtn.className = 'ichc-ul-eye on';
                enableBtn.title = 'Show cam';
                enableBtn.setAttribute('aria-label', 'Show cam');
                enableBtn.innerHTML = ICONS.eyeSlash;
                enableBtn.addEventListener('click', e => {
                    e.preventDefault();
                    e.stopPropagation();
                    revealBlockedUser(u.name.toLowerCase());
                });
                nameWrap.insertBefore(enableBtn, nameWrap.firstChild);
                span.addEventListener('click', event => {
                    event.preventDefault();
                    event.stopPropagation();
                    openUserDropdown(u, span);
                });
            } else {
                span.addEventListener('click', event => {
                    event.preventDefault();
                    event.stopPropagation();
                    openUserDropdown(u, span);
                });
                span.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        event.stopPropagation();
                        openUserDropdown(u, span);
                    }
                });
            }
            return span;
        };

        const renderUsers = (query) => {
            let filtered = users;
            if (query) {
                const q = query.toLowerCase();
                filtered = users
                    .map(u => ({ u, score: fuzzyMatch(q, u.name.toLowerCase()) }))
                    .filter(({ score }) => score >= 0)
                    .sort((a, b) => b.score - a.score)
                    .map(({ u }) => u);
            }

            // Build map of existing rows so we can reuse them in-place instead of
            // destroying them. Keeping rows in the DOM preserves in-progress hover
            // transitions (removing an element always resets its transitions).
            const existingRows = new Map();
            panel.querySelectorAll('.ichc-ul-user[data-ichc-av-key]').forEach(el => {
                existingRows.set(el.dataset.ichcAvKey, el);
            });

            // Remove rows for users not in this render pass
            const newKeys = new Set(filtered.map(u => u.name.toLowerCase()));
            existingRows.forEach((el, key) => {
                if (!newKeys.has(key)) {
                    userListState.avatarObserver?.unobserve(el);
                    el.remove();
                }
            });

            // Pass 1: update or create each span (no DOM reordering yet)
            const spans = filtered.map(u => {
                const imgKey = u.name.toLowerCase();
                let span = existingRows.get(imgKey);
                // Only the hidden flag changes a row's DOM structure now (it adds the
                // re-enable eye and swaps the click handler). Cam state used to force a
                // rebuild because cammed rows carried a hover "Hide cam" eye; that
                // button is gone, so a user starting or stopping a broadcast no longer
                // destroys and recreates their row — which also preserves its
                // transitions.
                const hiddenChanged = span && (span.classList.contains('ichc-ul-hidden-live') !== !!u.hidden);

                if (span && !hiddenChanged) {
                    // Update dynamic attributes on the existing row without detaching it.
                    span.className = 'ichc-ul-user userlink' +
                        (u.hidden ? ' ichc-ul-hidden-live' : '') +
                        (u.cammed ? ' cammed' : '') +
                        (u.mod    ? ' mod'    : '') +
                        (u.idle   ? ' idle'   : '') +
                        (u.supporter ? ' ichc-ul-supporter-row' : '');
                    if (profileGuestCache.get(imgKey) === true) { span.classList.add('ichc-ul-guest'); }
                    const karmaEl = span.querySelector('.ichc-ul-karma');
                    const initKarma = profileKarmaCache.get(imgKey) ?? u.karma;
                    if (karmaEl && initKarma != null) { karmaEl.textContent = initKarma.toLocaleString(); }
                    _setKarmaTierClass(span, initKarma ?? null);
                    _setKarmaBar(span, initKarma ?? null);
                    const yearEl = span.querySelector('.ichc-ul-year-badge');
                    if (yearEl) {
                        const initYear = profileYearCache.get(imgKey);
                        _setBadgeYear(yearEl, initYear ?? null);
                        _setYearTierClass(yearEl, initYear ?? null);
                        _setUserViz(span, initKarma ?? null, initYear ?? null);
                    }
                    const avatarWrap = span.querySelector('.ichc-ul-avatar-wrap');
                    if (avatarWrap) {
                        avatarWrap.className = 'ichc-ul-avatar-wrap' + (u.supporter ? ' ichc-ul-supporter' : '');
                    }
                    // Mod shield / supporter heart can appear or disappear on a reused row
                    _syncRoleBadges(span, u);
                    // Their text colour may have been harvested since the last pass
                    _applyNickColor(span, u.name);
                    span.title = [
                        u.hidden && 'hidden',
                        u.mod && 'mod',
                        u.cammed && 'on cam',
                        u.supporter && 'Get Hearted',
                        u.idle && 'idle',
                        u.karma != null && `${u.karma} karma`,
                    ].filter(Boolean).join(' · ') || u.name;
                } else {
                    // Create a fresh row (new user or hidden-status flip that changes click handlers).
                    if (span) { userListState.avatarObserver?.unobserve(span); span.remove(); }
                    span = _buildNewRow(u, imgKey);
                }
                return span;
            });

            // Partition rows into presence buckets (§1): ON CAM / ACTIVE / IDLE.
            // Within each bucket the existing sort order (from `filtered`) is preserved.
            const buckets = { cam: [], active: [], idle: [] };
            filtered.forEach((u, i) => {
                const span = spans[i];
                if (u.cammed)      { buckets.cam.push(span); }
                else if (u.idle)   { buckets.idle.push(span); }
                else               { buckets.active.push(span); }
            });

            // Drop stale section headers — they're cheap to recreate each render.
            scrollBody.querySelectorAll(':scope > .ichc-ul-section').forEach(h => h.remove());

            // Build the ordered node list: a header before each non-empty bucket.
            const desired = [];
            const sections = [
                ['cam',    'On Cam'],
                ['active', 'Active'],
                ['idle',   'Idle'],
            ];
            // Counts carry the flip animation that used to sit in the big header.
            // Section headers are rebuilt every render, which would normally kill a
            // running animation — it survives because _fh() bakes BOTH the old and new
            // digits into the markup, so the fresh nodes already contain the frames
            // _flipCountWAAPI() animates between. The previous values therefore have to
            // be read before this render overwrites them.
            const _prevSec = userListState.prevSectionCounts || {};
            const _secNow = { cam: buckets.cam.length, active: buckets.active.length, idle: buckets.idle.length, total: _totalUsers };
            const _flipQueue = [];

            // One count cell. `sub` is the "/ N" companion shown on ACTIVE, which the
            // user asked to carry the room total alongside the active figure.
            const buildSectionCount = (key, value, sub) => {
                const prev = Object.prototype.hasOwnProperty.call(_prevSec, key) ? _prevSec[key] : value;
                const cnt = document.createElement('span');
                cnt.className = 'ichc-ul-section-count';
                cnt.dataset.val = value;
                cnt.innerHTML = `<span class="ichc-ul-sec-n" data-k="${key}">${_fh(value, prev)}</span>`;
                if (sub != null) {
                    const prevT = Object.prototype.hasOwnProperty.call(_prevSec, 'total') ? _prevSec.total : sub;
                    cnt.insertAdjacentHTML('beforeend',
                        `<span class="ichc-ul-sec-sep">/</span>` +
                        `<span class="ichc-ul-sec-n ichc-ul-sec-total" data-k="total">${_fh(sub, prevT)}</span>`);
                    if (prevT !== sub) { _flipQueue.push(['total', prevT, sub]); }
                }
                if (prev !== value) { _flipQueue.push([key, prev, value]); }
                return cnt;
            };

            sections.forEach(([key, label]) => {
                const rows = buckets[key];
                if (!rows.length) { return; }
                const hd = document.createElement('div');
                hd.className = `ichc-ul-section ${key}`;
                // Clicking a section header opens the user search — it replaced the
                // dedicated search button. Search always spans every user, not just
                // the section clicked, so the affordance reads the same wherever it is.
                hd.setAttribute('role', 'button');
                hd.setAttribute('tabindex', '0');
                hd.title = 'Search users';
                const lbl = document.createElement('span');
                lbl.className = 'ichc-ul-section-label';
                lbl.textContent = label;
                hd.append(lbl, buildSectionCount(key, rows.length, key === 'active' ? _totalUsers : null));
                desired.push(hd);
                rows.forEach(r => desired.push(r));
            });
            userListState.prevSectionCounts = _secNow;
            if (_flipQueue.length) {
                requestAnimationFrame(() => {
                    _flipQueue.forEach(([k, from, to]) => {
                        scrollBody.querySelectorAll(`.ichc-ul-sec-n[data-k="${k}"]`)
                            .forEach(el => _flipCountWAAPI(el, from, to));
                    });
                });
            }

            // Pass 2: position nodes in correct order with minimal DOM moves.
            // Walk from the first slot in the scroll body and only move a node when
            // it isn't already sitting at the cursor position. Rows already in order
            // are never touched, so their CSS transitions survive.
            let cursor = scrollBody.firstChild;
            for (const node of desired) {
                if (node === cursor) {
                    cursor = cursor.nextElementSibling;
                } else {
                    scrollBody.insertBefore(node, cursor);
                }
            }
        };

        // Update karma, year badge, and guest class on a row after a profile fetch resolves.
        const _applyProfileData = key => {
            const k  = profileKarmaCache.get(key);
            const yr = profileYearCache.get(key);
            const isGuest = profileGuestCache.get(key);

            if (k != null) {
                const el = panel.querySelector(`.ichc-ul-karma[data-karma-key="${CSS.escape(key)}"]`);
                if (el) { el.textContent = k.toLocaleString(); }
                const barRow = panel.querySelector(`.ichc-ul-user[data-ichc-av-key="${CSS.escape(key)}"]`);
                if (barRow) { _setKarmaBar(barRow, k); }
            }
            const yearEl = panel.querySelector(`.ichc-ul-year-badge[data-year-key="${CSS.escape(key)}"]`);
            if (yearEl) {
                _setBadgeYear(yearEl, yr ?? null);
                _setYearTierClass(yearEl, yr ?? null);
            }
            const row = panel.querySelector(`[data-ichc-av-key="${CSS.escape(key)}"]`);
            if (row) {
                if (isGuest != null) { row.classList.toggle('ichc-ul-guest', isGuest); }
                _setKarmaTierClass(row, k ?? null);
                _setUserViz(row, k ?? null, yr ?? null);
                const bg = profileBgCache.get(key);
                if (bg) { row.style.setProperty('--ichc-bg-img', `url("${bg}")`); }
            }
            _updateChatBadgesForUser(key);
            _updateCamBadgesForUser(key);
        };

        // ── IntersectionObserver: only fetch avatars when a row is visible ──────
        // One observer per session, rooted on the #ichc-userlist scroll container.
        // When a tagged row enters the viewport the observer triggers the (throttled,
        // localStorage-cached) fetch and then stops watching that row.
        // Reset if panel was recreated so the observer's root isn't a detached element.
        if (userListState.avatarObserver && userListState.avatarObserverRoot !== scrollBody) {
            userListState.avatarObserver.disconnect();
            userListState.avatarObserver = null;
        }
        if (!userListState.avatarObserver) {
            userListState.avatarObserverRoot = scrollBody;
            userListState.avatarObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) { return; }
                    const row = entry.target;
                    userListState.avatarObserver.unobserve(row);
                    const key = row.dataset.ichcAvKey;
                    if (!key) { return; }
                    const avatarImg = avatarImgCache.get(key);
                    // If bg is already cached, apply it immediately (avatar src may already be set)
                    const cachedBg = profileBgCache.get(key);
                    if (cachedBg) { row.style.setProperty('--ichc-bg-img', `url("${cachedBg}")`); }
                    if (!avatarImg || avatarImg.src) { return; } // avatar already loaded — skip fetch
                    fetchProfileImage(key).then(url => {
                        if (url && avatarImg) { _loadAvatarSrc(avatarImg, url, key); }
                        _applyProfileData(key);
                    });
                });
            }, { root: scrollBody, rootMargin: '120px 0px' });
        }

        const observeAvatarRows = () => {
            panel.querySelectorAll('[data-ichc-av-key]').forEach(row => {
                userListState.avatarObserver.observe(row);
            });
        };

        renderUsers(prevQuery);
        observeAvatarRows();

        // Proactively prefetch in priority order: cammed (A-Z) → non-idle (A-Z) → idle (A-Z).
        // Wire up .then() so the img src is set as each fetch resolves, regardless of visibility.
        [...users]
            .sort((a, b) => {
                const rank = u => (u.cammed ? 0 : u.idle ? 2 : 1);
                return (rank(a) - rank(b)) || a.name.localeCompare(b.name);
            })
            .forEach(u => {
                const key = u.name.toLowerCase();
                fetchProfileImage(key).then(url => {
                    const avatarImg = avatarImgCache.get(key);
                    if (url && avatarImg && !avatarImg.src) { _loadAvatarSrc(avatarImg, url, key); }
                    _applyProfileData(key);
                });
            });

        // ── Search toggle ──
        // Opened by clicking any section header (ON CAM / ACTIVE / IDLE) rather than a
        // dedicated button. Delegated from the scroll body because those headers are
        // rebuilt on every render, so a listener bound to them would not survive.
        const openUserSearch = () => {
            const open = panel.classList.toggle('ichc-ul-search-open');
            if (open) {
                searchInput.focus();
                searchInput.select();
            } else {
                searchInput.value = '';
                renderUsers('');
                observeAvatarRows();
            }
        };
        // buildUserList() runs on every roster change and REUSES the scroll body, so an
        // unguarded bind would stack a listener per rebuild and each click would toggle
        // search once per listener — i.e. it would look like the click did nothing.
        // The latest openUserSearch closure is kept on the element so the handler always
        // calls the current one rather than one captured from a stale build.
        scrollBody._ichcOpenSearch = openUserSearch;
        if (!scrollBody._ichcSectionSearchBound) {
            scrollBody._ichcSectionSearchBound = true;
            const sectionActivate = e => {
                const hd = e.target.closest?.('.ichc-ul-section');
                if (!hd || !scrollBody.contains(hd)) { return; }
                e.preventDefault();
                e.stopPropagation();
                scrollBody._ichcOpenSearch?.();
            };
            scrollBody.addEventListener('click', sectionActivate);
            scrollBody.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { sectionActivate(e); }
            });
        }

        const filterOfflineHidden = (q) => {
            const list = panel.querySelector('.ichc-ul-offline-hidden-list');
            if (!list) { return; }
            const lq = q.toLowerCase();
            list.querySelectorAll('.ichc-ul-offline-hidden-row').forEach(row => {
                const name = row.querySelector('.ichc-ul-offline-hidden-name')?.textContent?.toLowerCase() || '';
                row.style.display = (!lq || name.includes(lq)) ? '' : 'none';
            });
        };

        searchInput.addEventListener('input', () => {
            const q = searchInput.value.trim();
            renderUsers(q);
            filterOfflineHidden(q);
            observeAvatarRows();
        });

        searchInput.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                searchInput.value = '';
                panel.classList.remove('ichc-ul-search-open');
                renderUsers('');
                filterOfflineHidden('');
                observeAvatarRows();
            }
        });

        // ── Offline hidden cams (blocked + not currently in room) ──
        {
            const blockedRaw = [...blocked];
            const offlineHiddenKeys = blockedRaw.filter(k => !seen.has(k));

            if (offlineHiddenKeys.length > 0) {
                const section = document.createElement('div');
                section.className = 'ichc-ul-offline-hidden';

                const header = document.createElement('button');
                header.type = 'button';
                header.className = 'ichc-ul-offline-hidden-toggle';
                header.innerHTML = `${ICONS.eyeSlash}<span>Hidden offline</span><span class="ichc-ul-offline-count">${offlineHiddenKeys.length}</span>${ICONS.chevronDown}`;
                // §9 — collapsed by default; persist expanded flag across reloads.
                const _offOpen = prevOfflineOpen || localStorage.getItem('ichc_ul_hidden_open') === 'true';
                if (_offOpen) { section.classList.add('is-open'); }
                section.appendChild(header);

                const list = document.createElement('div');
                list.className = 'ichc-ul-offline-hidden-list';

                // Built on demand, not on every rebuild. The same live session
                // that exposed the collapse-button leak had 2,166 offline-hidden
                // users, i.e. 6,498 nodes (row + name + remove button each) —
                // 18% of the document — reconstructed from scratch every time
                // the userlist rebuilt, several times a minute, for a section
                // that is COLLAPSED BY DEFAULT and so was almost never looked
                // at. The cost scaled with how many people the user had ever
                // hidden, across all sessions, which is why it grew without any
                // single session leaking.
                //
                // The keys are captured by closure, so expanding later still
                // renders the set this build computed; the next rebuild replaces
                // the section wholesale anyway.
                let _hiddenFilled = false;
                const fillHiddenList = () => {
                    if (_hiddenFilled) { return; }
                    _hiddenFilled = true;
                    // Build display-name lookup once — getBlockedUserDisplayName does 4+ querySelectorAll
                    // calls per key, making it O(n×m) when called inside the forEach loop.
                    const _dnMap = new Map();
                    const _dnAdd = t => { const s = (t || '').trim(); if (s) { _dnMap.set(s.toLowerCase(), s); } };
                    getLiveCamEntries().forEach(e => _dnAdd(e.name));
                    document.querySelectorAll('#cams .name-on-cam, #activeUserList a.userlink, #txt a.userlink')
                        .forEach(el => _dnAdd(el.textContent));
                    const frag = document.createDocumentFragment();
                    offlineHiddenKeys.forEach(key => {
                        const row = document.createElement('div');
                        row.className = 'ichc-ul-offline-hidden-row';
                        const name = document.createElement('span');
                        name.className = 'ichc-ul-offline-hidden-name';
                        name.textContent = _dnMap.get((key || '').trim().toLowerCase()) || key;
                        const removeBtn = document.createElement('button');
                        removeBtn.type = 'button';
                        removeBtn.className = 'ichc-ul-offline-remove-btn';
                        removeBtn.title = 'Remove from hidden list';
                        removeBtn.innerHTML = ICONS.xmark;
                        removeBtn.addEventListener('click', () => revealBlockedUser(key));
                        row.appendChild(name);
                        row.appendChild(removeBtn);
                        frag.appendChild(row);
                    });
                    list.appendChild(frag);
                };

                header.addEventListener('click', () => {
                    const open = section.classList.toggle('is-open');
                    if (open) {
                        fillHiddenList();
                        // Rows built after the user already typed a filter would
                        // otherwise all come back visible.
                        const q = searchInput.value.trim();
                        if (q) { filterOfflineHidden(q); }
                    }
                    localStorage.setItem('ichc_ul_hidden_open', String(open));
                });

                // Only pay for the rows if the section is actually open. The
                // count in the header comes from `offlineHiddenKeys.length`
                // above, so a collapsed section still reports the right number
                // without materialising a single row.
                if (_offOpen) { fillHiddenList(); }

                section.appendChild(list);
                scrollBody.appendChild(section);
            }

            // ⋮ export/import + sort menu — button lives in #ichc-input-row
            const titleRow = panel.querySelector('.ichc-ul-title-row');
            if (titleRow && savedMoreBtn) {
                // Reuse existing button — update sort-active state and re-insert
                const existingMenu = document.getElementById('ichc-ul-more-menu');
                if (existingMenu) {
                    existingMenu.querySelectorAll('.ichc-ul-sort-item').forEach(b => {
                        b.classList.toggle('ichc-ul-sort-active', b.dataset.sort === userListState.sortMode);
                    });
                }
                const _irReuse = document.getElementById('ichc-input-row');
                const _sendBtnReuse = document.getElementById('btn');
                if (_irReuse) {
                    _irReuse.insertBefore(savedMoreBtn, _sendBtnReuse || null);
                } else {
                    titleRow.appendChild(savedMoreBtn);
                }
            } else if (titleRow && !savedMoreBtn) {
                const moreBtn = document.createElement('button');
                moreBtn.type = 'button';
                moreBtn.className = 'ichc-ul-more-btn';
                moreBtn.title = 'More options';
                moreBtn.innerHTML = ICONS.dotsAnimated;

                const moreMenu = document.createElement('div');
                moreMenu.className = 'ichc-ul-more-menu';
                moreMenu.id = 'ichc-ul-more-menu';
                moreMenu.hidden = true;

                // ── Sort section ──
                const sortLabel = document.createElement('div');
                sortLabel.className = 'ichc-ul-more-section-label';
                sortLabel.textContent = 'Sort by';
                moreMenu.appendChild(sortLabel);

                const sortOptions = [
                    { id: 'alpha', label: 'Alphabetical' },
                    { id: 'karma', label: 'Karma' },
                    { id: 'age',   label: 'Account age' },
                ];
                sortOptions.forEach(({ id, label }) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'ichc-ul-more-item ichc-ul-sort-item';
                    if (userListState.sortMode === id) { btn.classList.add('ichc-ul-sort-active'); }
                    btn.dataset.sort = id;

                    const check = document.createElement('span');
                    check.className = 'ichc-ul-sort-check';
                    check.textContent = '✓';
                    btn.appendChild(check);

                    const text = document.createElement('span');
                    text.textContent = label;
                    btn.appendChild(text);

                    btn.addEventListener('click', e => {
                        e.stopPropagation();
                        userListState.sortMode = id;
                        localStorage.setItem('ichc_ul_sort', id);
                        moreMenu.hidden = true;
                        buildUserList();
                    });
                    moreMenu.appendChild(btn);
                });

                // ── Divider ──
                const divider = document.createElement('div');
                divider.className = 'ichc-ul-more-divider';
                moreMenu.appendChild(divider);

                // ── Data section label ──
                const dataLabel = document.createElement('div');
                dataLabel.className = 'ichc-ul-more-section-label';
                dataLabel.textContent = 'Hidden list';
                moreMenu.appendChild(dataLabel);

                // ── Export / Import ──
                const exportItem = document.createElement('button');
                exportItem.type = 'button';
                exportItem.className = 'ichc-ul-more-item';
                exportItem.textContent = 'Export';
                exportItem.addEventListener('click', e => {
                    e.stopPropagation();
                    moreMenu.hidden = true;
                    const names = [...loadBlockedUsers()];
                    const blob = new Blob([JSON.stringify(names, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = 'ichc-hidden-cams.json'; a.click();
                    URL.revokeObjectURL(url);
                });

                const importLabel = document.createElement('label');
                importLabel.className = 'ichc-ul-more-item';
                importLabel.addEventListener('click', e => { e.stopPropagation(); });
                const importInput = document.createElement('input');
                importInput.type = 'file';
                importInput.accept = '.json';
                importInput.style.display = 'none';
                importInput.addEventListener('change', event => {
                    moreMenu.hidden = true;
                    const file = event.target.files?.[0];
                    if (!file) { return; }
                    const reader = new FileReader();
                    reader.onload = e => {
                        try {
                            const imported = JSON.parse(e.target.result);
                            if (!Array.isArray(imported)) { return; }
                            const existing = loadBlockedUsers();
                            imported.forEach(n => { if (typeof n === 'string' && n.trim()) { existing.add(n.trim().toLowerCase()); } });
                            saveBlockedUsers(existing);
                            syncCamCards();
                            buildUserList();
                        } catch (_) {}
                        event.target.value = '';
                    };
                    reader.readAsText(file);
                });
                importLabel.textContent = 'Import';
                importLabel.appendChild(importInput);

                moreMenu.appendChild(exportItem);
                moreMenu.appendChild(importLabel);

                // ── Divider ──
                const divider2 = document.createElement('div');
                divider2.className = 'ichc-ul-more-divider';
                moreMenu.appendChild(divider2);

                // ── View section label ──
                const viewLabel = document.createElement('div');
                viewLabel.className = 'ichc-ul-more-section-label';
                viewLabel.textContent = 'View';
                moreMenu.appendChild(viewLabel);

                // PM panel toggle
                const pmItem = document.createElement('button');
                pmItem.type = 'button';
                pmItem.className = 'ichc-ul-more-item';
                pmItem.innerHTML = `<span class="ichc-cog-item-icon" aria-hidden="true">${ICONS.chat}</span><span>Toggle PM panel</span><span class="ichc-ul-more-toggle" aria-hidden="true"></span>`;
                const _pmHidden = () => {
                    try {
                        const raw = localStorage.getItem('ichc_pm_vis_v1');
                        return raw ? JSON.parse(raw)?.hidden === true : false;
                    } catch (_) { return false; }
                };
                const _refreshPmItem = () => {
                    pmItem.classList.toggle('ichc-on', !_pmHidden());
                };
                _refreshPmItem();
                window.addEventListener('ichc-pm-shown', _refreshPmItem);
                window.addEventListener('ichc-pm-hidden', _refreshPmItem);
                pmItem.addEventListener('click', e => {
                    e.stopPropagation();
                    moreMenu.hidden = true;
                    window.dispatchEvent(new CustomEvent('ichc-pm-user-toggle'));
                });
                moreMenu.appendChild(pmItem);

                // Toggle userlist avatars
                const avatarItem = document.createElement('button');
                avatarItem.type = 'button';
                avatarItem.className = 'ichc-ul-more-item';
                const _refreshAvatarItem = () => {
                    const icon = userListState.showAvatars ? ICONS.eyeSlash : ICONS.eye;
                    const label = userListState.showAvatars ? 'Hide avatars' : 'Show avatars';
                    avatarItem.innerHTML = `<span class="ichc-cog-item-icon" aria-hidden="true">${icon}</span><span>${label}</span><span class="ichc-ul-more-toggle" aria-hidden="true"></span>`;
                    avatarItem.classList.toggle('ichc-on', !!userListState.showAvatars);
                };
                _refreshAvatarItem();
                avatarItem.addEventListener('click', e => {
                    e.stopPropagation();
                    moreMenu.hidden = true;
                    userListState.showAvatars = !userListState.showAvatars;
                    localStorage.setItem('ichc_ul_show_avatars', String(userListState.showAvatars));
                    const _p = document.getElementById('ichc-userlist');
                    if (_p) { _p.classList.toggle('ichc-ul-no-avatars', !userListState.showAvatars); }
                    _refreshAvatarItem();
                });
                moreMenu.appendChild(avatarItem);

                // Word cloud toggle
                const wcItem = document.createElement('button');
                wcItem.type = 'button';
                wcItem.id = 'ichc-wc-toggle-btn';
                wcItem.className = 'ichc-ul-more-item';
                const _refreshWcItem = () => {
                    const label = _wordCloudMode ? 'Hide word cloud' : 'Show word cloud';
                    wcItem.innerHTML = `<span class="ichc-cog-item-icon" aria-hidden="true">${ICONS.cloud}</span><span>${label}</span><span class="ichc-ul-more-toggle" aria-hidden="true"></span>`;
                    wcItem.classList.toggle('ichc-on', !!_wordCloudMode);
                };
                _refreshWcItem();
                wcItem.addEventListener('click', e => {
                    e.stopPropagation();
                    moreMenu.hidden = true;
                    setWordCloudMode(!_wordCloudMode);
                    _refreshWcItem();
                });
                moreMenu.appendChild(wcItem);

                // Retain chat through moderator clears
                const retainItem = document.createElement('button');
                retainItem.type = 'button';
                retainItem.className = 'ichc-ul-more-item';
                const _retainOn = () => localStorage.getItem('ichc_chat_retain') !== 'false';
                const _refreshRetainItem = () => {
                    const on = _retainOn();
                    const label = on ? 'Don’t retain cleared chat' : 'Retain cleared chat';
                    retainItem.innerHTML = `<span class="ichc-cog-item-icon" aria-hidden="true">${on ? ICONS.eye : ICONS.eyeSlash}</span><span>${label}</span><span class="ichc-ul-more-toggle" aria-hidden="true"></span>`;
                    retainItem.classList.toggle('ichc-on', on);
                };
                _refreshRetainItem();
                retainItem.addEventListener('click', e => {
                    e.stopPropagation();
                    moreMenu.hidden = true;
                    localStorage.setItem('ichc_chat_retain', String(!_retainOn()));
                    _refreshRetainItem();
                });
                moreMenu.appendChild(retainItem);

                // Condensed join/leave — collapses all joins/leaves into two pinned
                // lines at the top of the chat log instead of an inline event row.
                // chat.js owns the rendering; this only flips the flag and announces it,
                // because the flag is read on every event and chat.js may be listening
                // before this menu is ever built.
                const condItem = document.createElement('button');
                condItem.type = 'button';
                condItem.className = 'ichc-ul-more-item';
                const _condOn = () => localStorage.getItem('ichc_condensed_events') === '1';
                const _refreshCondItem = () => {
                    const on = _condOn();
                    condItem.innerHTML = `<span class="ichc-cog-item-icon" aria-hidden="true">${ICONS.chat}</span>` +
                        `<span>Condensed join/leave</span>` +
                        `<span class="ichc-ul-more-toggle" aria-hidden="true"></span>`;
                    condItem.classList.toggle('ichc-on', on);
                };
                _refreshCondItem();
                condItem.addEventListener('click', e => {
                    e.stopPropagation();
                    moreMenu.hidden = true;
                    const next = !_condOn();
                    localStorage.setItem('ichc_condensed_events', next ? '1' : '0');
                    _refreshCondItem();
                    window.dispatchEvent(new CustomEvent('ichc-condensed-events-change'));
                });
                moreMenu.appendChild(condItem);

                document.body.appendChild(moreMenu);

                new MutationObserver(() => {
                    moreBtn.classList.toggle('ichc-menu-open', !moreMenu.hidden);
                }).observe(moreMenu, { attributeFilter: ['hidden'] });

                moreBtn.addEventListener('click', e => {
                    e.stopPropagation();
                    if (moreMenu.hidden) {
                        const rect = moreBtn.getBoundingClientRect();
                        moreMenu.style.top = 'auto';
                        moreMenu.style.bottom = `${window.innerHeight - rect.top + 4}px`;
                        moreMenu.style.right = `${window.innerWidth - rect.right}px`;
                        moreMenu.style.left = 'auto';
                        moreMenu.hidden = false;
                    } else {
                        moreMenu.hidden = true;
                    }
                });

                // Insert more btn in the chat input row, before the send button
                const _ir = document.getElementById('ichc-input-row');
                const _sendBtn = document.getElementById('btn');
                if (_ir) {
                    _ir.insertBefore(moreBtn, _sendBtn || null);
                } else {
                    titleRow.appendChild(moreBtn);
                }
            }
        }
        // Sync PM avatar status dots with current user statuses
        _syncPmAvatarStatuses(users);

        // Word cloud — rebuild whenever userlist rebuilds
        if (_wordCloudMode) { buildWordCloud(users); }

        // Restore focus — panel.innerHTML='' blurs anything that was focused inside it.
        // _hadSearchFocus is captured before innerHTML='' so it survives the synchronous blur.
        // Use a short delay so site JS that runs on the same tick can't re-steal focus after us.
        if (_hadSearchFocus || (_blFocusedId === 'txtMsg' && document.activeElement?.id !== 'txtMsg')) {
            window.setTimeout(() => {
                // Only restore into a vacuum. The rebuild blurs what it destroyed and
                // leaves focus on <body>; if anything else holds focus by the time this
                // fires, the user put it there in the intervening 50ms and taking it
                // back mid-keystroke is how characters ended up in the chat box while
                // typing somewhere else. A user list refresh must never outrank a
                // deliberate focus.
                const now = document.activeElement;
                if (now && now !== document.body && now !== document.documentElement) { return; }
                if (_hadSearchFocus) {
                    const inp = panel.querySelector('.ichc-ul-search-input');
                    if (inp) {
                        inp.focus();
                        // Place cursor at end of any existing query text
                        const len = inp.value.length;
                        inp.setSelectionRange(len, len);
                    }
                } else if (_blFocusedId === 'txtMsg' && document.activeElement?.id !== 'txtMsg') {
                    document.getElementById('txtMsg')?.focus();
                }
            }, 50);
        }

        // Restore scroll position after all DOM mutations. Chrome resets scrollTop
        // when children are removed/reordered inside a flex scroll container. The
        // synchronous set is safe (the user can't scroll mid-rebuild), but the
        // deferred re-restore can land a frame later — mid-scroll — and yank the
        // user back down. So the rAF only re-applies if (a) the user hasn't scrolled
        // since, and (b) layout actually clobbered our value.
        if (_savedScrollTop > 0 && scrollBody) {
            userListState._programmaticScrollTo = _savedScrollTop;
            userListState._programmaticScrollAt = performance.now();
            scrollBody.scrollTop = _savedScrollTop;
            const _restoreAt = performance.now();
            requestAnimationFrame(() => {
                if (!scrollBody || !scrollBody.isConnected) { return; }
                if (userListState._lastUserScrollAt > _restoreAt) { return; }
                if (Math.abs(scrollBody.scrollTop - _savedScrollTop) > 1) {
                    userListState._programmaticScrollAt = performance.now();
                    scrollBody.scrollTop = _savedScrollTop;
                }
            });
        }
    }

    function scheduleUserListBuild(delay = 180, bypassFocusThrottle = false) {
        // While the filter input has focus, suppress frequent background rebuilds — they
        // nuke the panel DOM (panel.innerHTML='') and steal focus from the input.
        // Allow rebuilds eventually (2 s after the last mutation) so the list stays fresh.
        // bypassFocusThrottle is set for time-sensitive updates (e.g. unnamed cam slot retry).
        if (isUserListSearchActive() && !bypassFocusThrottle) {
            userListState.rebuildPendingAfterSearch = true;
            window.clearTimeout(userListState.timer);
            return;
        }
        if (userListState.searchFocused && delay < 2000 && !bypassFocusThrottle) { delay = 2000; }
        window.clearTimeout(userListState.timer);
        userListState.timer = window.setTimeout(() => {
            buildUserList({ force: bypassFocusThrottle });
        }, delay);
    }

    function initUserList() {
        scheduleUserListBuild(900);
        const src = document.getElementById('activeUserList');
        if (src && userListState.srcObservedEl !== src) {
            userListState.srcObserver?.disconnect();
            userListState.srcObserver = new MutationObserver(() => scheduleUserListBuild(350));
            userListState.srcObserver.observe(src, { childList: true, subtree: true });
            userListState.srcObservedEl = src;
        }
        const cams = document.getElementById('cams');
        if (cams && userListState.camsObservedEl !== cams) {
            userListState.camsObserver?.disconnect();
            userListState.camsObserver = new MutationObserver(mutations => {
                for (const m of mutations) {
                    if (_isCamDecorationMutation(m)) { continue; }
                    scheduleUserListBuild(220);
                    return;
                }
            });
            userListState.camsObserver.observe(cams, {
                childList: true,
                subtree: true,
                // Also watch style attribute: persist-hidecams.js hides cams by
                // setting display:none inline (no node add/remove), so without
                // this the userlist would not rebuild after a cam is hidden/shown.
                attributes: true,
                attributeFilter: ['style'],
                // characterData: catches the site setting #name-{camId} textContent
                // after the cam card is already in the DOM (common async pattern).
                // Without this, cams with names that load after the initial childList
                // mutation are never detected as cammed in the userlist.
                characterData: true,
            });
            userListState.camsObservedEl = cams;
        }
    }

    function getCamCards() {
        const rounded = [...document.querySelectorAll('#cams .rounded_square')];
        if (rounded.length) { return rounded; }
        return [...document.querySelectorAll('#cams > *')].filter(node => node instanceof HTMLElement);
    }

    function getCamId(card) {
        return (card.querySelector('.videocontainer')?.id || card.id || '').replace(/^id-/, '');
    }

    function getCardName(card) {
        const visible = card.querySelector('.name-on-cam')?.textContent.trim();
        if (visible) { return visible; }

        const camId = getCamId(card);
        if (!camId) { return ''; }

        const hiddenName = document.getElementById('name-' + camId)?.textContent.trim();
        return hiddenName || '';
    }

    function looksLikePlaceholderName(name) {
        return /^[a-f0-9]{8,}$/i.test(name) || /^t[a-f0-9]{7,}$/i.test(name);
    }

    function hasVisibleCamName(card) {
        return !!card.querySelector('.name-on-cam')?.textContent.trim();
    }

    function cardShowsPlaceholderToken(card) {
        const text = (card.textContent || '').replace(/\s+/g, ' ').trim();
        return /(?:^|\s)t?[a-f0-9]{8,}(?:\s|$)/i.test(text);
    }

    function getCardKey(card) {
        const camId = getCamId(card).toLowerCase();
        if (camId) { return camId; }
        const label = getCardName(card).toLowerCase();
        if (label && !looksLikePlaceholderName(label)) { return label; }
        return '';
    }

    function isCardHidden(card) {
        const cardStyle = window.getComputedStyle(card);
        if (cardStyle.display === 'none' || cardStyle.visibility === 'hidden') {
            return true;
        }
        const container = card.querySelector('.videocontainer');
        if (!container) { return false; }
        return window.getComputedStyle(container).display === 'none';
    }

    function hasRenderableMedia(card) {
        const mediaNodes = getMeaningfulMediaNodes(card);
        if (!mediaNodes.length) { return false; }

        return mediaNodes.some(node => {
            const style = window.getComputedStyle(node);
            if (style.display === 'none' || style.visibility === 'hidden') { return false; }

            const rect = node.getBoundingClientRect();
            const attrWidth = Number(node.getAttribute?.('width')) || 0;
            const attrHeight = Number(node.getAttribute?.('height')) || 0;
            // Intrinsic media size counts too. This asks "does the card have
            // real media?", and the rendered box was only ever a proxy for it.
            // Freeform packing sizes cams to fit the panel, so a perfectly
            // healthy feed can render well under 120x90 in a busy room — that
            // used to be impossible when the grid enforced a 160px minimum.
            // Judging by the box alone marked 9 of 20 live cams "loading",
            // which drags in `.ichc-cam-loading { min-height: 90px }` and can
            // override the packed height. A dead slot still reports 0 here.
            const introWidth = node.videoWidth || node.naturalWidth || 0;
            const introHeight = node.videoHeight || node.naturalHeight || 0;
            const width = Math.max(rect.width, node.clientWidth || 0, node.offsetWidth || 0, attrWidth, introWidth);
            const height = Math.max(rect.height, node.clientHeight || 0, node.offsetHeight || 0, attrHeight, introHeight);

            return width >= 120 && height >= 90;
        });
    }

    function isDecorativeCamMedia(node) {
        if (!node || !(node instanceof Element)) { return true; }
        if (node.closest('.ichc-card-tools')) { return true; }
        // Emotes and gifs inside the last-message overlay are <img>/<video> sitting
        // in the card. Without this they would be collected as the cam's own media,
        // and getMediaAspect would size the whole card from an emote.
        if (node.closest('.ichc-cam-lastmsg')) { return true; }
        if (node.matches('.cam-logo, .smicon, .name-on-cam')) { return true; }

        const className = typeof node.className === 'string' ? node.className.toLowerCase() : '';
        const src = (node.getAttribute?.('src') || '').toLowerCase();
        const id = (node.id || '').toLowerCase();

        if (/\bcam-logo\b/.test(className) || /\bsmicon\b/.test(className) || /\bcam-logo\b/.test(id)) {
            return true;
        }
        if (src.includes('cam-logo') || src.includes('/cam-logo') || src.includes('control_') || src.includes('/icons/')) {
            return true;
        }

        return false;
    }

    function getMeaningfulMediaNodes(card) {
        return [...card.querySelectorAll('video, iframe, object, embed, canvas, img')]
            .filter(node => !isDecorativeCamMedia(node));
    }

    function hasMediaFrame(card) {
        const directMedia = getMeaningfulMediaNodes(card);
        if (directMedia.length) { return true; }

        const container = card.querySelector('.videocontainer');
        if (!container) { return false; }
        const meaningfulChildren = [...container.children].filter(node => {
            if (!(node instanceof Element)) { return false; }
            if (node.matches('.name-on-cam, .ichc-card-tools, .cam-logo, .smicon, .ichc-cam-lastmsg')) { return false; }
            if (node.matches('.cam-button, .cam-button2, [id^="cambtn"]')) { return false; }
            return true;
        });
        if (meaningfulChildren.length > 0) { return true; }

        return false;
    }

    function getMediaAspect(card) {
        if (!card) { return ''; }

        const media = getMeaningfulMediaNodes(card)[0];
        if (!media) { return ''; }

        const candidates = [];
        const numericAttr = name => Number(media.getAttribute?.(name) || 0);

        if (media instanceof HTMLVideoElement) {
            candidates.push([media.videoWidth, media.videoHeight]);
        }
        if (media instanceof HTMLImageElement) {
            candidates.push([media.naturalWidth, media.naturalHeight]);
        }
        if (media instanceof HTMLCanvasElement) {
            candidates.push([media.width, media.height]);
        }

        candidates.push(
            [numericAttr('width'), numericAttr('height')],
            [media.clientWidth || 0, media.clientHeight || 0],
            [media.offsetWidth || 0, media.offsetHeight || 0],
        );

        const rect = media.getBoundingClientRect?.();
        if (rect) {
            candidates.push([rect.width, rect.height]);
        }

        for (const pair of candidates) {
            const width = Number(pair?.[0] || 0);
            const height = Number(pair?.[1] || 0);
            if (!(width >= 120 && height >= 90)) { continue; }

            const ratio = width / height;
            if (!Number.isFinite(ratio) || ratio < 0.25 || ratio > 3.5) { continue; }
            return `${Math.round(width)} / ${Math.round(height)}`;
        }

        return '';
    }

    function cardShowsDisabledState(card) {
        const text = (card.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        return /\bdisabled\b/.test(text) || /\bcam disabled\b/.test(text);
    }

    function getNativeCamActionLabel(control) {
        const id = (control?.id || '').toLowerCase();
        const className = typeof control?.className === 'string'
            ? control.className.toLowerCase()
            : '';
        const onclick = (control?.getAttribute?.('onclick') || '').toLowerCase();
        const href = (control?.getAttribute?.('href') || '').toLowerCase();
        const nameAttr = (control?.getAttribute?.('name') || '').toLowerCase();
        const valueAttr = (control?.getAttribute?.('value') || '').toLowerCase();
        const dataAction = (control?.dataset?.action || '').toLowerCase();

        if (/\bcam-button2\b/.test(className) || /^cambtn2-/.test(id) || /\bdisablecam\b/.test(onclick) || /\bdisablecam\b/.test(href)) {
            return 'Disable';
        }
        if (/-retry$/.test(id) || /^cambtn1-/.test(id) || /\bstartcam\b/.test(onclick) || /\bretry\b/.test(onclick) || /\bstart\b/.test(href)) {
            return 'Start';
        }

        const raw = normalizeText([
            control?.textContent || '',
            valueAttr,
            control?.getAttribute?.('title') || '',
            control?.getAttribute?.('aria-label') || '',
            control?.getAttribute?.('onclick') || '',
            control?.id || '',
            nameAttr,
            dataAction,
        ].join(' '));

        if (/\bdisable\b/.test(raw)) { return 'Disable'; }
        if (/\bstart\b/.test(raw)) { return 'Start'; }
        if (/\benable\b/.test(raw)) { return 'Enable'; }
        if (/\bstop\b/.test(raw)) { return 'Stop'; }
        return '';
    }

    function getNativeCamToggleControl(card) {
        return [...card.querySelectorAll('.cam-button2, [id^="cambtn2"], [id*="-retry"], [id^="cambtn1"], .cam-button, [id^="cambtn"], a[id*="cambtn"], a[id*="retry"], button[id*="cambtn"], button[id*="retry"], input[id*="cambtn"], input[id*="retry"]')]
            .filter(control => !control.closest('.ichc-card-tools') && !control.classList.contains('ichc-cam-toggle-btn'))
            .find(control => !!getNativeCamActionLabel(control)) || null;
    }

    function deriveCamToggleLabel(card) {
        if (!card || card.classList.contains('ichc-hidden-slot') || card.classList.contains('ichc-ghost-slot')) {
            return '';
        }
        const camId = getCamId(card);
        const hasRealName = !!getCardName(card) && !looksLikePlaceholderName(getCardName(card));
        if (cardShowsDisabledState(card) || isCardBlockedByPrefs(card) || !!getPersistHiddenCardName(card)) {
            return 'Start';
        }

        const vc = card.querySelector('.videocontainer');
        const containerVisible = vc ? window.getComputedStyle(vc).display !== 'none' : true;
        if (containerVisible && camId && (hasRealName || hasRenderableMedia(card) || hasMediaFrame(card))) {
            return 'Disable';
        }

        const looksReal = hasRenderableMedia(card) || hasMediaFrame(card);
        if (containerVisible && (hasRealName || looksReal)) {
            return 'Disable';
        }
        return '';
    }

    function refreshNativeCamButtons(card) {
        if (!card) { return; }

        card.querySelectorAll('.cam-button, .cam-button2, [id^="cambtn"]').forEach(control => {
            control.classList.add('ichc-native-cam-action-hidden');
            control.classList.remove('ichc-native-cam-action');
            if (control.style?.getPropertyValue('display') === 'none') {
                control.style.removeProperty('display');
            }
        });
    }

    function _loadCamSpans() {
        try { return JSON.parse(localStorage.getItem(CAM_SPAN_KEY) || '{}') || {}; } catch (_) { return {}; }
    }
    function _saveCamSpans(spans) {
        const data = JSON.stringify(spans);
        try {
            localStorage.setItem(CAM_SPAN_KEY, data);
        } catch (e) {
            if (e?.name === 'QuotaExceededError' || e?.code === 22 || e?.code === 1014) {
                _evictOldProfileCache(60);
                try { localStorage.setItem(CAM_SPAN_KEY, data); } catch (_) {}
            }
        }
    }
    function _getCamColumns() {
        return Math.max(1, Number.parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--ichc-cam-columns'), 10
        ) || 1);
    }
    function _syncCardSpanBtns(card, level) {
        const shrink = card.querySelector('.ichc-cam-shrink-btn');
        const grow = card.querySelector('.ichc-cam-grow-btn');
        if (shrink) { shrink.disabled = level <= 0; }
        if (grow) { grow.disabled = level >= 4; }
    }
    // Size levels (grid is doubled to 2*N tracks so mini fits cleanly):
    //   0 = mini    — span 1, half a default slot
    //   1 = default — span 2, standard 1/N width
    //   2 = wide    — span 4, double-wide (2/N); caps to full row when N≤2
    //   3 = wider   — span 6, triple-wide (3/N); full row for N=3, 3/4 row for N=4
    //   4 = cinema  — 1/-1, full row, 16:9 with height cap
    function _applySpanLevel(card, level) {
        const hasFeatured = !!document.querySelector('#cams .ichc-featured');
        // Clear explicit-placement styles left over from featured/focus mode. Without
        // this, a card that was previously the focused cam (or a focus thumbnail) keeps
        // its inline grid-row/align-self/etc. and gets placed on top of its neighbors in
        // the normal auto-flow grid — cams visibly overlap. Featured mode owns these
        // props, so only strip them when no cam is focused.
        if (!hasFeatured) {
            card.style.removeProperty('grid-row');
            card.style.removeProperty('align-self');
            card.style.removeProperty('justify-self');
            card.style.removeProperty('width');
            card.style.removeProperty('height');
            card.style.removeProperty('min-width');
            card.style.removeProperty('position');
            card.style.removeProperty('left');
            card.style.removeProperty('top');
            card.style.removeProperty('margin');
        }
        if (level === 4) {
            card.style.setProperty('grid-column', '1 / -1', 'important');
            if (!hasFeatured) {
                card.style.setProperty('aspect-ratio', '16 / 9', 'important');
                card.style.setProperty('min-height', 'clamp(180px, 28vh, 380px)', 'important');
                card.style.setProperty('max-height', 'clamp(180px, 46vh, 520px)', 'important');
            }
        } else {
            if (level === 3) {
                // Triple-wide: 3 standard-slot widths, natural aspect ratio.
                // span 6 in a 2N-track grid = 3/N of row; full row for N=3, 3/4 for N=4.
                card.style.setProperty('grid-column', 'span 6', 'important');
            } else if (level === 2) {
                // Double-wide: 2 standard-slot widths, natural aspect ratio.
                // span 4 in a 2N-track grid = 2/N of row; caps to full row when N≤2.
                card.style.setProperty('grid-column', 'span 4', 'important');
            } else if (level === 0) {
                card.style.setProperty('grid-column', 'span 1', 'important');
            } else {
                // level 1 default: span 2 in the doubled grid = natural 1/N width
                card.style.setProperty('grid-column', 'span 2', 'important');
            }
            // Featured mode owns aspect-ratio/height for thumbnail cards; don't clobber.
            if (!hasFeatured) {
                card.style.removeProperty('aspect-ratio');
                card.style.removeProperty('min-height');
                card.style.removeProperty('max-height');
            }
        }
    }
    function _applyCardSpans() {
        const spans = _loadCamSpans();
        const columns = _getCamColumns();
        const hasFeatured = !!document.querySelector('#cams .ichc-featured');
        const freeform = !!document.getElementById('cams')?.classList.contains('ichc-cams-freeform');
        getCamCards().forEach(card => {
            if (card.classList.contains('ichc-featured')) {
                const s = card.querySelector('.ichc-cam-shrink-btn');
                const g = card.querySelector('.ichc-cam-grow-btn');
                if (s) { s.disabled = true; }
                if (g) { g.disabled = true; }
                return;
            }
            // In featured mode applyFeaturedCam owns placement outright.
            if (hasFeatured) { return; }
            const key = getCardKey(card);
            const level = key ? Math.max(0, Math.min(4, (key in spans) ? spans[key] : 1)) : 1;
            _syncCardSpanBtns(card, level);
            // In normal freeform mode the packing engine owns placement and the
            // level acts as a width weight — _applySpanLevel would clobber the
            // absolute position with grid spans and strip left/top.
            if (freeform) { return; }
            _applySpanLevel(card, level, columns);
        });
    }
    function _adjustCardSpan(card, delta) {
        const key = getCardKey(card);
        if (!key) { return; }
        const spans = _loadCamSpans();
        const current = (key in spans) ? spans[key] : 1;
        const next = Math.min(4, Math.max(0, current + delta));
        if (next === 1) { delete spans[key]; } else { spans[key] = next; }
        _saveCamSpans(spans);
        _applyCardSpans();
        requestCamRelayout(40);
    }

    function _buildCamRefreshBtn(card) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ichc-overlay-btn ichc-cam-refresh-btn';
        btn.innerHTML = ICONS.rotate;
        btn.title = 'Refresh cam feed';
        btn.setAttribute('aria-label', 'Refresh cam feed');
        btn.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); });
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.add('ichc-refreshing');
            setTimeout(() => btn.classList.remove('ichc-refreshing'), 3000);

            // WebRTC videos have a MediaStream in srcObject and no reloadable src URL,
            // so clearing video.src only made the icon spin. Drive ICHC's own
            // disable→start sequence in the page world instead; that stops the one
            // inbound peer connection and negotiates a fresh one without touching the
            // user's outbound broadcast.
            const bridgeToken = `ichc-cam-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            card.setAttribute('data-ichc-cam-refresh', bridgeToken);
            const selector = `[data-ichc-cam-refresh="${bridgeToken}"]`;
            runInPageContext(`
(() => {
    const card = document.querySelector(${JSON.stringify(selector)});
    if (!card) { return; }
    card.removeAttribute('data-ichc-cam-refresh');

    const disabled = card.querySelector('video[id$="-disabled"]');
    const disable = card.querySelector('.cam-button2, [id^="cambtn2-"]');
    if (!disabled && disable && typeof disable.click === 'function') {
        disable.click();
    }

    window.setTimeout(() => {
        const retry = card.querySelector('[id^="cambtn1-"][id$="-retry"]');
        if (retry && typeof retry.click === 'function') {
            retry.click();
        } else if (typeof window.send_command === 'function') {
            window.send_command('/cam refresh');
        }
    }, 180);
})();
            `);
            window.setTimeout(() => {
                if (card.getAttribute('data-ichc-cam-refresh') === bridgeToken) {
                    card.removeAttribute('data-ichc-cam-refresh');
                }
            }, 3000);
            [300, 1500, 5000].forEach(delay => {
                window.setTimeout(() => requestCamRelayout(60), delay);
            });
        });
        return btn;
    }

    function ensureCardTools(card) {
        // If tools exist but the refresh button was added in a later version, inject it now.
        if (card.querySelector('.ichc-card-tools') || card.querySelector('.ichc-cam-toggle-btn')) {
            if (!card.querySelector('.ichc-cam-refresh-btn')) {
                const toggleBtn = card.querySelector('.ichc-cam-toggle-btn');
                const refreshBtn = _buildCamRefreshBtn(card);
                if (toggleBtn) { card.insertBefore(refreshBtn, toggleBtn); }
                else { card.appendChild(refreshBtn); }
            }
            return;
        }

        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'ichc-overlay-btn ichc-cam-toggle-btn';
        toggleButton.setAttribute('aria-label', 'Toggle cam');
        toggleButton.setAttribute('title', 'Toggle cam');

        const tools = document.createElement('div');
        tools.className = 'ichc-card-tools';
        tools.innerHTML = `
            <button type="button" class="ichc-overlay-btn ichc-cam-audio-btn" aria-label="Toggle audio" title="Toggle this cam's audio">${ICONS.volume}</button>
            <button type="button" class="ichc-overlay-btn ichc-cam-shrink-btn" aria-label="Smaller" title="Smaller">−</button>
            <button type="button" class="ichc-overlay-btn ichc-spotlight-btn" aria-label="Focus cam" title="Focus cam"></button>
            <button type="button" class="ichc-overlay-btn ichc-cam-grow-btn" aria-label="Larger" title="Larger">+</button>
        `;
        const spotlightButton = tools.querySelector('.ichc-spotlight-btn');
        const shrinkButton = tools.querySelector('.ichc-cam-shrink-btn');
        const growButton = tools.querySelector('.ichc-cam-grow-btn');
        const audioButton = tools.querySelector('.ichc-cam-audio-btn');
        if (audioButton) {
            audioButton.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); });
            audioButton.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); _toggleCamAudio(card); });
        }

        // Broadcast duration timer — appended directly to card (not inside .ichc-card-tools)
        // so it's always visible independent of the tools-overlay opacity animation.
        const timerEl = document.createElement('span');
        timerEl.className = 'ichc-cam-timer';
        timerEl.setAttribute('aria-hidden', 'true');

        if (toggleButton) {
            toggleButton.addEventListener('pointerdown', event => {
                event.preventDefault();
                event.stopPropagation();
            });
            toggleButton.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();

                const action = (toggleButton.dataset.ichcAction || '').toLowerCase();
                if (action === 'disable' || action === 'stop') {
                    setBlockedStateForCard(card, true);
                } else if (action === 'start' || action === 'enable') {
                    const name = setBlockedStateForCard(card, false);
                    if (name) { revealBlockedUser(name, { rerender: false }); }
                }

                const vc = card.querySelector('.videocontainer');
                if (action === 'disable' || action === 'stop') {
                    vc?.style?.setProperty('display', 'none', 'important');
                } else if (action === 'start' || action === 'enable') {
                    vc?.style?.removeProperty?.('display');
                }

                // Do NOT invoke the native cam button — ICHC's handler modifies the
                // videocontainer in ways that undo our display:none. Our own block list
                // + ichc-persist-hidden-slot mechanism is sufficient.

                buildHiddenCamManager();
                syncCamCards();   // apply ichc-persist-hidden-slot immediately
                buildUserList();
                requestCamRelayout(40);
                setTimeout(() => requestCamRelayout(140), 140);
                setTimeout(() => requestCamRelayout(420), 420);
            });
        }

        if (spotlightButton) {
            spotlightButton.addEventListener('pointerdown', event => {
                event.preventDefault();
                event.stopPropagation();
            });
            spotlightButton.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                toggleFeatured(card);
            });
        }

        if (shrinkButton) {
            shrinkButton.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); });
            shrinkButton.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); _adjustCardSpan(card, -1); });
        }
        if (growButton) {
            growButton.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); });
            growButton.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); _adjustCardSpan(card, +1); });
        }
        card.appendChild(_buildCamRefreshBtn(card));
        card.appendChild(toggleButton);
        card.appendChild(tools);
        card.appendChild(timerEl);
    }

    function syncCardTools(card) {
        if (!card) { return; }
        ensureCardTools(card);

        const toggleButton = card.querySelector('.ichc-cam-toggle-btn');
        if (!toggleButton) { return; }

        const nativeToggle = getNativeCamToggleControl(card);
        const label = deriveCamToggleLabel(card) || getNativeCamActionLabel(nativeToggle);
        const camId = getCamId(card);

        if (!label && !camId) {
            toggleButton.hidden = true;
            toggleButton.setAttribute('hidden', 'hidden');
            toggleButton.style.setProperty('display', 'none', 'important');
            toggleButton.textContent = '';
            toggleButton.removeAttribute('data-ichc-action');
            return;
        }

        const resolvedLabel = label || (isCardBlockedByPrefs(card) || !!getPersistHiddenCardName(card) ? 'Start' : 'Disable');
        const isStart = /^(start|enable)$/i.test(resolvedLabel);
        toggleButton.hidden = false;
        toggleButton.removeAttribute('hidden');
        toggleButton.style.setProperty('display', 'inline-flex', 'important');
        toggleButton.style.setProperty('visibility', 'visible', 'important');
        toggleButton.innerHTML = isStart ? ICONS.rotateRight : ICONS.xmark;
        toggleButton.dataset.ichcAction = resolvedLabel.toLowerCase();
        toggleButton.title = `${resolvedLabel} cam`;
        toggleButton.setAttribute('aria-label', `${resolvedLabel} cam`);
    }

    function bindCardSignals(card) {
        if (!card) { return; }

        card.querySelectorAll('video, iframe, object, embed, img, canvas').forEach(node => {
            if (node.dataset.ichcMediaBound === '1') { return; }
            node.dataset.ichcMediaBound = '1';

            ['load', 'loadeddata', 'canplay'].forEach(type => {
                node.addEventListener(type, () => requestCamRelayout(140), { capture: true, passive: true });
            });
            // On loadedmetadata we know the real video dimensions — update the card's
            // per-card aspect immediately so the card snaps to the right ratio before
            // the debounced full relayout fires.
            node.addEventListener('loadedmetadata', () => {
                if (typeof prepareCamCard === 'function') { prepareCamCard(card); }
                requestCamRelayout(140);
            }, { capture: true, passive: true });
            // Rate-limit error events: idle/failed cams fire them continuously,
            // causing a relayout storm that saturates the event loop.
            node.addEventListener('error', () => {
                window.clearTimeout(node._ichcErrTimer);
                node._ichcErrTimer = window.setTimeout(() => requestCamRelayout(300), 2000);
            }, { capture: true, passive: true });
        });
    }

    function prepareCamCard(card) {
        if (!card.dataset.ichcSeed) {
            camSeed += 1;
            card.dataset.ichcSeed = String(camSeed);
        }
        if (!card.dataset.ichcFirstSeenAt) {
            card.dataset.ichcFirstSeenAt = String(Date.now());
        }
        const key = getCardKey(card);
        if (key) { card.dataset.ichcCam = key; }
        const name = getCardName(card);
        const rawHidden = isCardHidden(card);
        const persistHiddenName = getPersistHiddenCardName(card);
        const persistHidden = !!persistHiddenName;
        const hasRealName = !!name && !looksLikePlaceholderName(name);
        const mediaFrame = hasMediaFrame(card);
        const camId = getCamId(card);
        const structuralEmpty = !persistHidden && !camId && !hasRealName && !mediaFrame && !(card.textContent || '').trim();
        const hidden = persistHidden || structuralEmpty || (rawHidden && !camId && !hasRealName && !mediaFrame);
        const placeholderToken = !hasVisibleCamName(card) && cardShowsPlaceholderToken(card);
        const mediaReady = hasRenderableMedia(card);
        if (mediaReady) {
            card.dataset.ichcMediaSeenAt = String(Date.now());
        }
        const disabled = cardShowsDisabledState(card);
        const ageMs = Date.now() - (Number(card.dataset.ichcFirstSeenAt) || Date.now());
        // Give new cards 6 seconds before ghost-classifying them. Without this,
        // a card with a name but no media element yet is immediately hidden (ghost),
        // which prevents the stream from loading (display:none freezes media init).
        // Only ghost cards that have a name/camId but NO media element at all after 6s.
        // Cards that have a media frame (video/canvas present but not rendering — e.g.
        // your own outgoing cam, which the site keeps display:none) are never ghosted;
        // the element's presence is enough signal that the slot is live.
        const ghost = !hidden &&
            !persistHidden &&
            !disabled &&
            !placeholderToken &&
            !mediaReady &&
            !mediaFrame &&
            (hasRealName || !!camId) &&
            ageMs > 6000;
        const placeholder = !hidden && !ghost && (
            disabled ||
            placeholderToken ||
            (!hasRealName && !mediaReady && !mediaFrame)
        );
        const mediaAspect = getMediaAspect(card);
        card.classList.toggle('ichc-hidden-slot', hidden);
        card.classList.toggle('ichc-persist-hidden-slot', persistHidden);
        card.classList.toggle('ichc-ghost-slot', ghost);
        card.classList.toggle('ichc-placeholder-slot', placeholder);
        const isLoading = (hasRealName || !!camId) && !mediaReady && !hidden && !ghost && !disabled && !placeholder;
        card.classList.toggle('ichc-cam-loading', isLoading);
        let scanLine = card.querySelector('.ichc-scan-line');
        if (isLoading) {
            if (!scanLine) {
                scanLine = document.createElement('div');
                scanLine.className = 'ichc-scan-line';
                card.appendChild(scanLine);
            }
        } else {
            scanLine?.remove();
        }

        // Disabled-state overlay — shows immediately so there's no blank gap
        let disabledOverlay = card.querySelector('.ichc-disabled-overlay');
        if (disabled) {
            if (!disabledOverlay) {
                disabledOverlay = document.createElement('div');
                disabledOverlay.className = 'ichc-disabled-overlay';
                disabledOverlay.innerHTML =
                    `<span class="ichc-disabled-overlay-icon">${ICONS.videoCamOff}</span>` +
                    `<span class="ichc-disabled-overlay-label">Paused</span>`;
                card.appendChild(disabledOverlay);
            }
        } else {
            disabledOverlay?.remove();
        }
        if (mediaAspect && !placeholder && !hidden) {
            const [aw, ah] = mediaAspect.split('/').map(s => Number(s.trim()));
            const isPortrait = aw > 0 && ah > 0 && ah > aw;
            // Cap portrait cards at 3:4 — extreme 9:16 ratios make the card
            // too tall and disrupt the multi-column grid layout.
            const capped = isPortrait
                ? `${aw} / ${Math.round(Math.min(ah, aw * 4 / 3))}`
                : mediaAspect;
            card.style.setProperty('--ichc-card-aspect', capped, 'important');
            card.classList.toggle('ichc-portrait-cam', isPortrait);
        } else {
            card.style.removeProperty('--ichc-card-aspect');
            card.classList.remove('ichc-portrait-cam');
        }
        card.draggable = !hidden;

        // Broadcast duration timer — record start time on first live appearance;
        // clear it when the stream goes ghost (stopped broadcasting).
        // persistHidden means the viewer blocked the cam, NOT that the broadcaster stopped.
        if (hasRealName && camId && !ghost && !hidden) {
            const bcastKey = _BCAST_LS + name.trim().toLowerCase();
            try {
                if (!localStorage.getItem(bcastKey)) {
                    localStorage.setItem(bcastKey, String(Date.now()));
                }
            } catch (_) {}
        } else if (ghost) {
            if (hasRealName) {
                _recordCamSession(name);
                try { localStorage.removeItem(_BCAST_LS + name.trim().toLowerCase()); } catch (_) {}
            }
        }

        refreshNativeCamButtons(card);
        syncCardTools(card);
        bindCardSignals(card);
    }

    function loadStoredList(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || '[]');
            return Array.isArray(value) ? value : [];
        } catch (_) {
            return [];
        }
    }

    function saveCurrentOrder() {
        const data = JSON.stringify(
            getCamCards()
                .filter(card => card.dataset.ichcCam)
                .map(card => card.dataset.ichcCam),
        );
        try {
            localStorage.setItem(ORDER_KEY, data);
        } catch (e) {
            if (e?.name === 'QuotaExceededError' || e?.code === 22 || e?.code === 1014) {
                _evictOldProfileCache(60);
                try { localStorage.setItem(ORDER_KEY, data); } catch (_) {}
            }
        }
    }

    function getVisibleCamCards() {
        return getCamCards().filter(card =>
            !card.classList.contains('ichc-hidden-slot') &&
            !card.classList.contains('ichc-ghost-slot'),
        );
    }

    function updateCamDensity() {
        const stage = document.getElementById('ichc-room-stage');
        const panel = document.getElementById('ichc-cams-panel');
        const hiddenBar = document.getElementById('ichc-hidden-cams');
        const visible = getVisibleCamCards();
        const count = visible.length;
        const densityCount = visible.filter(card => !card.classList.contains('ichc-placeholder-slot')).length || count;
        let columns = 1;
        let camMin = 360;
        let aspect = '4 / 3';
        const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ichc-gap')) || 18;
        const stageWidth = Math.max(320, Math.round(stage?.getBoundingClientRect().width || stage?.clientWidth || window.innerWidth - 32));

        const storedUlWidth = camLayoutState.ulWidthOverride ?? loadStoredUlWidth();
        let userListWidth = window.innerWidth <= 780
            ? 0
            : storedUlWidth != null ? storedUlWidth
            : densityCount >= 12 ? 164
            : densityCount >= 7 ? 176
            : 188;

        const autoChatWidth = window.innerWidth <= 1100
            ? Math.min(430, stageWidth)
            : densityCount >= 12 ? 320
            : densityCount >= 7 ? 342
            : densityCount >= 4 ? 372
            : 410;
        let chatWidth = autoChatWidth;

        let minCamLane = densityCount <= 1 ? 640 : densityCount <= 4 ? 560 : densityCount <= 8 ? 470 : 390;
        let sideWidth = chatWidth + userListWidth + (window.innerWidth <= 780 ? 0 : 12);
        const storedSideWidth = window.innerWidth > 1100
            ? (camLayoutState.sideWidthOverride || loadStoredSideWidth())
            : null;

        if (window.innerWidth > 1100) {
            const maxRight = Math.max(390, stageWidth - minCamLane - gap);
            sideWidth = storedSideWidth != null
                ? Math.max(360, Math.min(maxRight, storedSideWidth))
                : Math.min(sideWidth, maxRight);
            userListWidth = Math.min(userListWidth, Math.max(168, sideWidth - 320));
            chatWidth = Math.max(320, sideWidth - userListWidth - 12);
        }

        const userListWidthValue = Math.max(0, userListWidth);
        const chatWidthValue = Math.max(320, chatWidth);
        const sideWidthValue = Math.max(390, chatWidth + userListWidth + (window.innerWidth <= 780 ? 0 : 12));

        const measuredCamLane = Math.max(0, Math.round(panel?.getBoundingClientRect().width || panel?.clientWidth || 0));
        const availableWidth = Math.max(
            280,
            measuredCamLane || (
                window.innerWidth <= 1100
                    ? stageWidth
                    : stageWidth - (chatWidth + userListWidth + 12) - gap
            ),
        );
        const hiddenBarHeight = hiddenBar && !hiddenBar.hidden
            ? Math.ceil(hiddenBar.getBoundingClientRect().height || 0) + 10
            : 0;
        let rawPanelH = panel?.clientHeight || stage?.clientHeight || window.innerHeight * 0.72;
        const availableHeight = Math.max(
            240,
            Math.min(window.innerHeight, Math.round(rawPanelH - hiddenBarHeight - 6)),
        );
        camLayoutState.lastAvailableHeight = availableHeight;

        if (window.innerWidth > 760 && densityCount > 0) {
            aspect = '4 / 3';
            const aspectValue = 4 / 3;
            const maxCols = Math.max(1, Math.min(densityCount, Math.floor((availableWidth + gap) / (160 + gap))));

            // Cams fill the COLUMN width (each track is 1fr) and the card's aspect-ratio
            // then sets the height — so for c columns a 4:3 cam renders cellW wide and
            // cellW*3/4 tall, and the whole grid is rows*that-height. Goal: make cams as
            // LARGE as possible while the whole grid still fits the panel height (no cams
            // cut off, no big empty bands above/below from an over-columned tiny grid).
            //
            // Bigger cams = fewer columns, so we pick the FEWEST columns whose rows still
            // fit the available height. If nothing fits (very short panel), fall back to
            // the most-columns / fewest-rows option to minimize how much is cut off.
            let fitFewest = 0;     // fewest cols that fit vertically (= biggest cams)
            let overflow = 1;      // nothing fits — fewest rows to minimize overflow
            let overflowRows = Infinity;
            for (let c = 1; c <= maxCols; c++) {
                const rows = Math.ceil(densityCount / c);
                const cellW = (availableWidth - gap * (c - 1)) / c;
                const totalH = rows * (cellW / aspectValue) + (rows - 1) * gap;
                if (totalH <= availableHeight) {
                    if (fitFewest === 0) { fitFewest = c; } // loop ascends → first = fewest
                } else if (rows < overflowRows) {
                    overflow = c; overflowRows = rows;
                }
            }
            columns = fitFewest || overflow;

            camMin = Math.max(160, Math.floor((availableWidth - gap * (columns - 1)) / columns));
        }

        if (count === 0) {
            camMin = Math.min(availableWidth, 520);
        }

        const camMinValue = Math.max(160, camMin);
        const nextSignature = [
            userListWidthValue,
            chatWidthValue,
            sideWidthValue,
            camMinValue,
            aspect,
            columns,
            count,
            densityCount,
            measuredCamLane,
            availableHeight,
            _wordCloudMode ? '1' : '0',
        ].join('|');

        if (camLayoutState.lastDensitySignature === nextSignature) { return; }
        camLayoutState.lastDensitySignature = nextSignature;

        document.documentElement.style.setProperty('--ichc-userlist-width', `${userListWidthValue}px`);
        document.documentElement.style.setProperty('--ichc-chat-width', `${chatWidthValue}px`);
        document.documentElement.style.setProperty('--ichc-stage-side-width', `${sideWidthValue}px`);
        document.documentElement.style.setProperty('--ichc-cam-min', `${camMinValue}px`);
        document.documentElement.style.setProperty('--ichc-cam-aspect', aspect);
        document.documentElement.style.setProperty('--ichc-cam-columns', String(columns));
        const cams = document.getElementById('cams');
        const hasFeatured = !!document.querySelector('#cams .ichc-featured') || !!(localStorage.getItem(FEATURED_KEY) || '').trim();
        if (cams) {
            cams.classList.remove('ichc-cam-fill-mode');
            if (hasFeatured) {
                // applyFeaturedCam owns the grid template + auto-rows in featured mode
                // (a simple cols-track grid, not the doubled span grid). Setting the
                // doubled grid here would clobber it and re-break the thumbnail sizing.
                applyFeaturedCam();
            } else {
                cams.style.setProperty('grid-template-columns', `repeat(${columns * 2}, minmax(0, 1fr))`, 'important');
                cams.style.removeProperty('grid-auto-rows');
                cams.style.removeProperty('grid-template-rows');
                _applyCardSpans();
            }
        }
        // Persist for next page load so first paint is already correct.
        try {
            localStorage.setItem(CAM_LAYOUT_CACHE_KEY, JSON.stringify({
                columns, camMin: camMinValue, aspect,
                sideWidth: sideWidthValue, chatWidth: chatWidthValue, ulWidth: userListWidthValue,
            }));
        } catch (_) {}
        // End the init window so CSS transitions are now safe to animate.
        document.documentElement.classList.remove('ichc-cams-init');
    }

    function updateEmptyCamState() {
        const cams = document.getElementById('cams');
        if (!cams) { return; }
        const visibleCards = getCamCards().filter(card =>
            !card.classList.contains('ichc-hidden-slot') &&
            !card.classList.contains('ichc-ghost-slot'),
        );
        cams.classList.toggle('ichc-empty-cams', visibleCards.length === 0);
    }

    function applySavedOrder() {
        const cams = document.getElementById('cams');
        if (!cams) { return; }

        const allCards = getCamCards();
        const byKey = new Map(
            allCards
                .filter(card => card.dataset.ichcCam)
                .map(card => [card.dataset.ichcCam, card]),
        );

        const storedKeys = loadStoredList(ORDER_KEY).filter(k => byKey.has(k));
        if (!storedKeys.length) { return; }

        // Check if cards are already in the stored order — avoid DOM moves that
        // would trigger the #cams MutationObserver and cause a relayout loop.
        const currentOrder = allCards.map(c => c.dataset.ichcCam || '');
        let pos = 0;
        const alreadyOrdered = storedKeys.every(key => {
            const idx = currentOrder.indexOf(key, pos);
            if (idx === -1) { return false; }
            pos = idx + 1;
            return true;
        });
        if (alreadyOrdered) { return; }

        storedKeys.forEach(key => {
            const card = byKey.get(key);
            if (card) { cams.appendChild(card); }
        });
    }

    // Initialized to Date.now() if a key is already stored so the 8s grace
    // period applies on page load (not just within the current session).
    let _featuredSetAt = localStorage.getItem(FEATURED_KEY) ? Date.now() : 0;
    let _featuredWasFound = false;

    // ── Focused-mode freeform packing ──────────────────────────────────────
    // The focused cam is pinned to the top-left corner at its real aspect
    // ratio; every other visible cam is packed into the L-shaped free region
    // beside and below it. Cams are scalable rectangles with FIXED aspect
    // ratios, so this is not classic bin packing (MaxRects/skyline/guillotine
    // all assume fixed box sizes) — it is the justified-gallery problem: each
    // strip line can be solved in closed form to exactly fill the strip's
    // main axis, and a Knuth–Plass style DP picks the line breaks whose cross
    // sizes stay nearest the strip's target.
    //
    // Line math: item i has main-axis extent e_i per unit of cross size
    // (e = w/h for a horizontal row, e = h/w for a vertical column). A line
    // holding items S fills the main axis exactly when
    //     cross(S) = (stripMain − (|S|−1)·gap) / Σ_{i∈S} e_i
    // and the DP minimizes Σ_lines (cross − target)² over contiguous
    // partitions, with target = (stripCross − (L−1)·gap) / L for L lines.

    // exts: per-item main-axis extent per unit cross. Returns the best line
    // count and break points, or null when the strip is unusable.
    function _ichcSolveLines(exts, stripMain, stripCross, gap, maxLines) {
        const m = exts.length;
        if (!m || !(stripMain > 0) || !(stripCross > 0)) { return null; }
        const pre = new Array(m + 1).fill(0);
        for (let i = 0; i < m; i++) { pre[i + 1] = pre[i] + exts[i]; }
        // Cross size of a line holding items i..j-1 (exact main-axis fill).
        const crossOf = (i, j) => (stripMain - (j - i - 1) * gap) / (pre[j] - pre[i]);
        const lim = Math.min(m, Math.max(1, maxLines));
        let best = null;
        for (let L = 1; L <= lim; L++) {
            const target = (stripCross - (L - 1) * gap) / L;
            if (target <= 0) { break; }
            const dp = [new Array(m + 1).fill(Infinity)];
            dp[0][0] = 0;
            const cut = [];
            for (let l = 1; l <= L; l++) {
                dp[l] = new Array(m + 1).fill(Infinity);
                cut[l] = new Array(m + 1).fill(0);
                for (let j = l; j <= m; j++) {
                    for (let i = l - 1; i < j; i++) {
                        if (dp[l - 1][i] === Infinity) { continue; }
                        const d = crossOf(i, j) - target;
                        const cost = dp[l - 1][i] + d * d;
                        if (cost < dp[l][j]) { dp[l][j] = cost; cut[l][j] = i; }
                    }
                }
            }
            if (dp[L][m] === Infinity) { continue; }
            if (!best || dp[L][m] < best.cost) {
                const bounds = [];
                let j = m;
                for (let l = L; l >= 1; l--) { bounds.unshift([cut[l][j], j]); j = cut[l][j]; }
                best = {
                    cost: dp[L][m],
                    lines: bounds.map(([i, jj]) => ({ start: i, end: jj, cross: crossOf(i, jj) })),
                };
            }
        }
        return best;
    }

    // Turn a line solution into concrete rects inside `strip` ({x,y,w,h}).
    // axis 'row': lines stack top→bottom, items flow left→right (wide cams).
    // axis 'col': lines stack left→right, items flow top→bottom (tall cams).
    // Lines are only ever DOWN-scaled (upscaling would overflow the main
    // axis); leftover cross space is spread evenly around the lines, and each
    // line's own main-axis slack centers it in the strip.
    function _ichcRealizeStrip(items, strip, gap, axis, maxLines) {
        if (!strip || !(strip.w > 0) || !(strip.h > 0)) { return null; }
        const exts = items.map(it => axis === 'row' ? it.ar : 1 / it.ar);
        const main = axis === 'row' ? strip.w : strip.h;
        const cross = axis === 'row' ? strip.h : strip.w;
        const solved = _ichcSolveLines(exts, main, cross, gap, maxLines);
        if (!solved) { return null; }
        const L = solved.lines.length;
        const sumCross = solved.lines.reduce((a, l) => a + l.cross, 0);
        const usedCross = sumCross + (L - 1) * gap;
        const scale = usedCross > cross ? (cross - (L - 1) * gap) / sumCross : 1;
        if (!(scale > 0)) { return null; }
        const slack = Math.max(0, cross - (sumCross * scale + (L - 1) * gap));
        const pad = slack / (L + 1);
        const rects = [];
        let crossPos = pad;
        for (const line of solved.lines) {
            const lineCross = line.cross * scale;
            let mainLen = (line.end - line.start - 1) * gap;
            for (let i = line.start; i < line.end; i++) { mainLen += exts[i] * lineCross; }
            let mainPos = Math.max(0, (main - mainLen) / 2);
            for (let i = line.start; i < line.end; i++) {
                const len = exts[i] * lineCross;
                rects.push(axis === 'row'
                    ? { index: items[i].index, x: strip.x + mainPos, y: strip.y + crossPos, w: len, h: lineCross }
                    : { index: items[i].index, x: strip.x + crossPos, y: strip.y + mainPos, w: lineCross, h: len });
                mainPos += len + gap;
            }
            crossPos += lineCross + gap + pad;
        }
        return rects;
    }

    // Full search: focus width candidates × two L-decompositions (right strip
    // full-height vs focus-height) × how many cams go beside vs below. The
    // right strip is claimed by the TALLEST cams (smallest w/h) because they
    // stack efficiently in a narrow column; everything keeps DOM order within
    // its strip so cams don't shuffle when aspect ratios drift.
    // Score = 1.25·focusArea + Σ thumbArea + n·minThumbArea − tiny-cam
    // penalties: coverage and fairness pull against each other, so the focus
    // share is an outcome of the optimization rather than a hardcoded ratio.
    function _packFocusedLayout(W, H, gap, focusAR, thumbARs) {
        if (!(W > 0) || !(H > 0) || !(focusAR > 0)) { return null; }
        const n = thumbARs.length;
        const fitW = Math.min(W, H * focusAR);
        if (!n) {
            return { focus: { x: 0, y: 0, w: fitW, h: fitW / focusAR }, rects: [] };
        }
        const byTallness = thumbARs.map((ar, index) => ({ index, ar }))
            .sort((a, b) => a.ar - b.ar || a.index - b.index);
        const all = thumbARs.map((ar, index) => ({ index, ar }));
        const MINDIM = 64;
        const step = n > 12 ? 0.05 : 0.025;
        const widths = [];
        for (let f = 0.40; f <= 0.851; f += step) { widths.push(f * W); }
        widths.push(fitW);
        const seen = new Set();
        let best = null;
        for (const fwRaw of widths) {
            // Floor, never round up: a 1px overshoot past the panel edge would
            // push the full-height/full-width strips out of bounds with it.
            let fw = Math.floor(Math.min(fwRaw, fitW));
            let fh = Math.round(fw / focusAR);
            if (fh > H) { fh = Math.floor(H); fw = Math.min(fw, Math.floor(fh * focusAR)); }
            if (fw <= 0 || fh <= 0 || seen.has(fw)) { continue; }
            seen.add(fw);
            const rightW = W - fw - gap;
            const bottomH = H - fh - gap;
            const canRight = rightW >= MINDIM * 0.7;
            const canBottom = bottomH >= MINDIM * 0.7;
            if (!canRight && !canBottom) { continue; }
            for (const fullHeightRight of [true, false]) {
                if (!canRight && fullHeightRight) { continue; } // both variants identical
                const right = canRight
                    ? { x: fw + gap, y: 0, w: rightW, h: fullHeightRight ? H : fh }
                    : null;
                const bottom = canBottom
                    ? { x: 0, y: fh + gap, w: fullHeightRight ? fw : W, h: bottomH }
                    : null;
                const sMin = bottom ? 0 : n;
                const sMax = right ? Math.min(n, 12) : 0;
                for (let s = sMin; s <= Math.max(sMin, sMax); s++) {
                    if (!right && s > 0) { break; }
                    if (!bottom && s < n) { continue; }
                    const chosen = new Set(byTallness.slice(0, s).map(it => it.index));
                    const rects = [];
                    // Line caps keep the strips reading as margins around the
                    // focus — unless a strip is the ONLY region, in which case
                    // it is the whole stage and may use as many lines as fit.
                    if (s > 0) {
                        const colLim = bottom ? 3 : Math.min(8, s);
                        const rr = _ichcRealizeStrip(all.filter(it => chosen.has(it.index)), right, gap, 'col', colLim);
                        if (!rr) { continue; }
                        rects.push(...rr);
                    }
                    if (s < n) {
                        const rowLim = right ? 5 : Math.min(8, n - s);
                        const br = _ichcRealizeStrip(all.filter(it => !chosen.has(it.index)), bottom, gap, 'row', rowLim);
                        if (!br) { continue; }
                        rects.push(...br);
                    }
                    let sum = 0;
                    let min = Infinity;
                    let max = 0;
                    let penalty = 0;
                    let unusable = false;
                    for (const r of rects) {
                        const d = Math.min(r.w, r.h);
                        if (d < 24) { unusable = true; break; }
                        if (d < MINDIM) { penalty += (MINDIM - d) * (MINDIM - d) * 260; }
                        const a = r.w * r.h;
                        sum += a;
                        if (a < min) { min = a; }
                        if (a > max) { max = a; }
                    }
                    if (unusable) { continue; }
                    // Focused semantics: the selected feed should stay clearly
                    // the largest. Penalize candidates where any thumb rivals it.
                    const focusArea = fw * fh;
                    if (focusArea < 1.3 * max) { penalty += (1.3 * max - focusArea) * 3; }
                    const score = 1.25 * focusArea + sum + n * min - penalty;
                    if (!best || score > best.score) {
                        best = { score, focus: { x: 0, y: 0, w: fw, h: fh }, rects };
                    }
                }
            }
        }
        return best;
    }

    // Normal (unfocused) freeform layout. Level ≤1 cams flow through
    // justified rows (mini = half extent). Level ≥2 cams break onto their own
    // line whose height targets a real multiple of what the plain solve gave
    // them. Multiplying the row EXTENT instead (the obvious mapping) actually
    // SHRINKS the feed: the row gets shorter to keep filling the width, and a
    // contained video's rendered size depends only on the row height.
    function _packNormalLayout(W, H, gap, items) {
        if (!(W > 0) || !(H > 0) || !items.length) { return null; }
        const extOf = it => it.level === 0 ? it.ar * 0.5 : it.ar;
        const plain = _ichcRealizeStrip(
            items.map(it => ({ index: it.index, ar: extOf(it) })),
            { x: 0, y: 0, w: W, h: H }, gap, 'row', Math.min(8, items.length));
        if (!plain) { return null; }
        if (!items.some(it => it.level >= 2)) { return plain; }

        const baseCross = new Map(plain.map(r => [r.index, r.h]));
        const BOOST = [0, 0, 1.35, 1.7, 2.1];

        const grown = items.filter(it => it.level >= 2);
        const normals = items.filter(it => it.level <= 1);
        let grownCross = 0;
        const grownLines = grown.map(it => {
            const cross = Math.min(
                H * 0.85,
                (baseCross.get(it.index) || H * 0.3) * BOOST[it.level],
                W / it.ar);
            grownCross += cross;
            return { it, cross };
        });
        // Keep at least a quarter of the panel for the ungrown cams.
        if (normals.length) {
            const avail = H - Math.max(120, H * 0.25);
            if (grownCross > avail) {
                const s = Math.max(0.3, avail / grownCross);
                grownLines.forEach(l => { l.cross *= s; });
                grownCross *= s;
            }
        }

        // All ungrown cams justify TOGETHER against the remaining height —
        // solving the stretches between grown cams separately would strand
        // one or two cams on full-width lines and blow the height budget.
        const lines = []; // {members: [{index, ext}], cross, normalsEnd?}
        if (normals.length) {
            const exts = normals.map(extOf);
            const solved = _ichcSolveLines(exts, W, Math.max(80, H - grownCross), gap,
                Math.min(8, exts.length));
            if (!solved) { return plain; }
            for (const line of solved.lines) {
                lines.push({
                    members: normals.slice(line.start, line.end)
                        .map((it, k) => ({ index: it.index, ext: exts[line.start + k] })),
                    normalsEnd: line.end,
                    cross: line.cross,
                });
            }
        }
        // Insert each grown line at the line boundary nearest its original
        // position (reverse order keeps multiple grown cams in DOM order).
        for (let g = grownLines.length - 1; g >= 0; g--) {
            const it = grownLines[g].it;
            const itPos = items.indexOf(it);
            const before = normals.filter(nrm => items.indexOf(nrm) < itPos).length;
            let at = lines.length;
            for (let i = 0; i < lines.length; i++) {
                if ((lines[i].normalsEnd ?? 0) > before) { at = i; break; }
            }
            lines.splice(at, 0, {
                members: [{ index: it.index, ext: it.ar }],
                cross: grownLines[g].cross,
            });
        }

        // Global fit: down-scale only, slack spread evenly — same policy as
        // _ichcRealizeStrip. Lines narrower than the panel center themselves.
        const L = lines.length;
        const sumCross = lines.reduce((a, l) => a + l.cross, 0);
        const usedCross = sumCross + (L - 1) * gap;
        const scale = usedCross > H ? (H - (L - 1) * gap) / sumCross : 1;
        if (!(scale > 0)) { return plain; }
        const pad = Math.max(0, H - (sumCross * scale + (L - 1) * gap)) / (L + 1);
        const rects = [];
        let y = pad;
        for (const line of lines) {
            const cross = line.cross * scale;
            let width = (line.members.length - 1) * gap;
            for (const m of line.members) { width += m.ext * cross; }
            let x = Math.max(0, (W - width) / 2);
            for (const m of line.members) {
                rects.push({ index: m.index, x, y, w: m.ext * cross, h: cross });
                x += m.ext * cross + gap;
            }
            y += cross + gap + pad;
        }
        return rects;
    }

    // Convert a fractional packed rectangle into the integer CSS box we apply
    // to a card. Work from the four edges so rounding cannot accumulate, then
    // clamp to the measured #cams content box. The returned w/h are OUTER card
    // dimensions (the placed-card CSS therefore uses border-box).
    function _ichcQuantizePackedRect(layout, x, y, w, h) {
        const minX = Math.ceil(layout.padL);
        const minY = Math.ceil(layout.padT);
        const maxX = Math.max(minX + 1, Math.floor(layout.padL + layout.bounds.w));
        const maxY = Math.max(minY + 1, Math.floor(layout.padT + layout.bounds.h));
        const left = Math.max(minX, Math.min(maxX - 1, Math.round(layout.padL + x)));
        const top = Math.max(minY, Math.min(maxY - 1, Math.round(layout.padT + y)));
        const right = Math.max(left + 1, Math.min(maxX, Math.round(layout.padL + x + w)));
        const bottom = Math.max(top + 1, Math.min(maxY, Math.round(layout.padT + y + h)));
        return { x: left, y: top, w: right - left, h: bottom - top };
    }

    function _ichcShouldUseFreeform(hasCams, wordCloudMode, freeformPref, focused, thumbCount) {
        return !!hasCams && !wordCloudMode &&
            (focused || (freeformPref && thumbCount > 0));
    }

    function applyFeaturedCam() {
        const cams = document.getElementById('cams');
        const featured = (localStorage.getItem(FEATURED_KEY) || '').trim().toLowerCase();
        const columns = Math.max(
            1,
            Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ichc-cam-columns'), 10) || 1,
        );
        let found = false;
        let featuredCard = null;
        const thumbCards = [];

        getCamCards().forEach(card => {
            // A card the user has hidden can never hold the focus slot: it takes
            // no space on screen, so focused mode would pack every other cam
            // around an empty corner and the card would snap to focus size the
            // moment it was revealed. Hide paths clear the key too
            // (clearFeaturedCamForCard); this also disarms keys stored before that
            // existed. Ghost slots are deliberately NOT included — a focused cam
            // whose media drops out for a few seconds must keep its focus rather
            // than flap the whole layout, which is what the grace period below is
            // for.
            const userHidden = card.classList.contains('ichc-hidden-slot') ||
                card.classList.contains('ichc-persist-hidden-slot');
            const active = !!featured && card.dataset.ichcCam === featured && !userHidden;
            card.classList.toggle('ichc-featured', active);
            if (active) {
                featuredCard = card;
                found = true;
            } else if (!userHidden && !card.classList.contains('ichc-ghost-slot')) {
                // Only VISIBLE cams count toward the layout math — hidden/ghost
                // slots take no space, so counting them would shrink everything.
                thumbCards.push(card);
            }
        });

        // Once a video reports its real dimensions (or they change), re-run the
        // layout so every frame tracks its feed's true aspect ratio.
        [...(featuredCard ? [featuredCard] : []), ...thumbCards].forEach(c => {
            const v = c.querySelector('video');
            if (v && !v._ichcFeatMeta) {
                v._ichcFeatMeta = true;
                v.addEventListener('loadedmetadata', () => requestCamRelayout(60));
                v.addEventListener('resize', () => requestCamRelayout(120));
            }
        });

        // Freeform packing runs in BOTH modes. Focused: the selected cam is
        // pinned top-left and _packFocusedLayout fills the L-region around it.
        // Normal: every visible cam is justified into rows across the whole
        // panel (same closed-form line math), which is what lets tall 9:16 and
        // wide 16:9 feeds coexist without the uniform grid's row overflow.
        // Word-cloud mode keeps the legacy grid: freeform needs the panel's
        // full height, but the word cloud expects cams to shrink to content.
        // Toggle the mode classes BEFORE measuring so the tighter freeform
        // gap is what the packing math actually reads.
        // Escape hatch for A/B testing the NORMAL gallery against the legacy
        // grid without reinstalling: localStorage ichc_freeform = 'off'. Focused
        // mode always uses the focused packer: its legacy two-column fallback
        // can be taller than #cams and was observed live clipping lower cards.
        // (A transient unmeasurable focused pass still uses the fallback below,
        // but CSS makes that short-lived state scroll instead of crop.)
        let _freeformPref = true;
        try { _freeformPref = localStorage.getItem('ichc_freeform') !== 'off'; } catch (_) {}
        const wantFreeform = _ichcShouldUseFreeform(
            !!cams, _wordCloudMode, _freeformPref, found, thumbCards.length);
        if (cams) {
            cams.classList.toggle('ichc-has-featured', found);
            if (wantFreeform) { cams.classList.add('ichc-cams-freeform'); }
        }
        const n = thumbCards.length;
        let layout = null; // {focus|null, rects, padL, padT}

        if (wantFreeform) {
            const cs = getComputedStyle(cams);
            const padL = parseFloat(cs.paddingLeft) || 0;
            const padT = parseFloat(cs.paddingTop) || 0;
            const padR = parseFloat(cs.paddingRight) || 0;
            const padB = parseFloat(cs.paddingBottom) || 0;
            let containerW = (cams.clientWidth || 0) - padL - padR;
            let containerH = (cams.clientHeight || 0) - padT - padB;
            // Every card is position:absolute here, so #cams contributes NO
            // intrinsic height — and #ichc-cams-panel is `flex: 1 1 auto` with
            // `flex-basis: auto`, i.e. content-sized. A pass that measures the
            // collapsed box must never be mistaken for "no cams fit": tearing
            // the placement down and rebuilding it next pass makes every cam
            // vanish at once. Fall back to the panel-derived height and the
            // last good measurement instead. (The min-height pin set below is
            // what stops the collapse happening in the first place.)
            const lastGood = camLayoutState.freeformSize;
            if (containerH <= 40 && camLayoutState.lastAvailableHeight > 40) {
                containerH = camLayoutState.lastAvailableHeight - padT - padB;
            }
            if (containerH <= 40 && lastGood) { containerH = lastGood.h; }
            if (containerW <= 40 && lastGood) { containerW = lastGood.w; }
            if (containerW > 40 && containerH > 40) {
                camLayoutState.freeformSize = { w: containerW, h: containerH };
                // Zero-safe: `|| fallback` would turn an intentional 0px gap into
                // the fallback, so test for NaN explicitly.
                const gapRaw = parseFloat(cs.gap);
                const gap = Number.isFinite(gapRaw) ? gapRaw : 2;

                // Default aspect (w/h) from the global cam aspect var, 4:3 fallback.
                const aspRaw = getComputedStyle(document.documentElement)
                    .getPropertyValue('--ichc-cam-aspect');
                const aspM = aspRaw.match(/([\d.]+)\s*\/\s*([\d.]+)/);
                const defAR = aspM ? (Number(aspM[1]) / Number(aspM[2])) : 4 / 3;

                // Real video aspects where known so frames hug the feeds.
                const videoAR = card => {
                    const v = card.querySelector('video');
                    return (v && v.videoWidth > 0 && v.videoHeight > 0)
                        ? v.videoWidth / v.videoHeight : defAR;
                };

                if (found) {
                    const packed = _packFocusedLayout(
                        containerW, containerH, gap, videoAR(featuredCard),
                        thumbCards.map(videoAR));
                    if (packed) {
                        layout = { ...packed, padL, padT, bounds: { w: containerW, h: containerH } };
                    }
                } else {
                    // Normal mode: justified rows over the whole panel, with
                    // the user's per-cam size levels honored by
                    // _packNormalLayout (mini = half width, grown = own line
                    // at a real multiple of its plain height).
                    const spans = _loadCamSpans();
                    const items = thumbCards.map((card, index) => {
                        const key = getCardKey(card);
                        const level = key ? Math.max(0, Math.min(4, (key in spans) ? spans[key] : 1)) : 1;
                        return { index, ar: videoAR(card), level };
                    });
                    const rects = _packNormalLayout(containerW, containerH, gap, items);
                    if (rects) {
                        layout = {
                            focus: null,
                            rects,
                            padL,
                            padT,
                            bounds: { w: containerW, h: containerH },
                        };
                    }
                }
            }
        }

        // A freeform pass that failed to measure or pack keeps whatever is
        // already on screen. Only a real mode change (word cloud, last cam
        // leaving) may drop back to the grid.
        const keepFreeform = !!layout ||
            (wantFreeform && !!cams?.classList.contains('ichc-cams-freeform'));

        if (cams) {
            cams.classList.toggle('ichc-cams-freeform', keepFreeform);
            cams.style.removeProperty('align-content');
            if (layout) {
                // Placed cards are position:absolute and out of flow, so this
                // template only ever applies to cards the site has just added
                // and that this pass has not placed yet. Keep it sane rather
                // than removing it — see the .ichc-cams-freeform CSS comment.
                cams.style.setProperty('grid-template-columns', `repeat(${columns}, minmax(0, 1fr))`, 'important');
                cams.style.removeProperty('grid-template-rows');
                cams.style.removeProperty('grid-auto-rows');
            } else if (keepFreeform) {
                // Holding the previous freeform placement — touch nothing.
            } else if (found) {
                // Not measurable yet — simple 2-col grid until the next pass measures.
                cams.style.setProperty('grid-template-columns', 'repeat(2, minmax(0, 1fr))', 'important');
                cams.style.removeProperty('grid-template-rows');
                cams.style.removeProperty('grid-auto-rows');
            } else {
                // Grid fallback (word-cloud mode, empty stage, unmeasurable):
                // restore the doubled span grid that _applyCardSpans depends on.
                cams.style.removeProperty('grid-template-rows');
                cams.style.removeProperty('grid-auto-rows');
                cams.style.setProperty('grid-template-columns', `repeat(${columns * 2}, minmax(0, 1fr))`, 'important');
            }
        }

        // Map packed rects back to their cards (rect.index is the thumbCards index).
        const rectByCard = new Map();
        if (layout) {
            layout.rects.forEach(r => { rectByCard.set(thumbCards[r.index], r); });
        }
        // Placement travels via custom properties + the stylesheet rule for
        // [data-ichc-placed], NOT inline left/top/width/height.
        //
        // The site periodically rewrites those four properties inline on every
        // cam card (its own tile layout — it writes `visibility: visible` in
        // the same pass) and does so WITHOUT `!important`. Writing a property
        // replaces its priority too, so that silently downgraded our
        // `!important` values, and the base `#cams .rounded_square` rule —
        // which declares `top/left/width/height: auto !important` — then won.
        // Every card collapsed to a 2x2 border box at the container origin:
        // all cams vanishing at once, on the site's refresh cadence. Confirmed
        // live: inline `top: 345px; width: 150px` (no !important) computing to
        // `T=0px W=2px`.
        //
        // A stylesheet `!important` beats a non-important inline declaration,
        // and the site never touches custom properties, so this is immune.
        const placeAbs = (card, x, y, w, h) => {
            // Quantize EDGES, not position and size independently. Independent
            // rounding can turn an in-bounds fractional rectangle into one
            // whose right/bottom edge is a pixel outside #cams. Clamp against
            // the measured content box as a final invariant because #cams
            // deliberately clips overflow.
            const q = _ichcQuantizePackedRect(layout, x, y, w, h);
            card.style.setProperty('--ichc-fx', `${q.x}px`);
            card.style.setProperty('--ichc-fy', `${q.y}px`);
            card.style.setProperty('--ichc-fw', `${q.w}px`);
            card.style.setProperty('--ichc-fh', `${q.h}px`);
            card.dataset.ichcPlaced = '1';
            // Drop our own inline geometry so the site's writes cannot outrank
            // the stylesheet rule that now owns placement.
            ['position', 'left', 'top', 'width', 'height', 'margin',
                'grid-column', 'grid-row', 'aspect-ratio', 'min-height', 'max-height',
                'min-width', 'align-self', 'justify-self'].forEach(p => card.style.removeProperty(p));
        };
        const unplaceAbs = card => {
            if (card.dataset.ichcPlaced) { delete card.dataset.ichcPlaced; }
            ['--ichc-fx', '--ichc-fy', '--ichc-fw', '--ichc-fh']
                .forEach(p => card.style.removeProperty(p));
        };

        getCamCards().forEach(card => {
            const active = card === featuredCard;
            if (active && layout) {
                placeAbs(card, layout.focus.x, layout.focus.y, layout.focus.w, layout.focus.h);
            } else if (keepFreeform && !layout) {
                // Failed pass — leave every card exactly where it was placed.
            } else if (active) {
                // Not measurable yet — full-width stacked until the next pass measures.
                unplaceAbs(card);
                ['position', 'left', 'top', 'margin', 'min-width', 'width', 'height'].forEach(p => card.style.removeProperty(p));
                card.style.setProperty('grid-column', '1 / -1', 'important');
                card.style.removeProperty('grid-row');
                card.style.setProperty('aspect-ratio', '16 / 9', 'important');
                card.style.setProperty('min-height', 'clamp(200px, 40vh, 480px)', 'important');
                card.style.setProperty('max-height', 'clamp(200px, 55vh, 600px)', 'important');
                card.style.setProperty('align-self', 'start', 'important');
                card.style.removeProperty('justify-self');
            } else if (layout) {
                // Every visible card has a packed rect sized to its own video
                // aspect ratio (times its span weight in normal mode), so the
                // karma outline hugs the feed. Hidden/ghost slots have no rect
                // and keep display:none from their own classes.
                const r = rectByCard.get(card);
                if (r) { placeAbs(card, r.x, r.y, r.w, r.h); } else { unplaceAbs(card); }
            } else if (featured) {
                // Grid fallback thumb: one cell, default aspect.
                unplaceAbs(card);
                ['position', 'left', 'top', 'margin', 'width', 'height'].forEach(p => card.style.removeProperty(p));
                card.style.setProperty('grid-column', 'span 1', 'important');
                card.style.removeProperty('grid-row');
                card.style.removeProperty('max-height');
                card.style.removeProperty('min-height');
                card.style.setProperty('aspect-ratio', '4 / 3', 'important');
                card.style.setProperty('align-self', 'start', 'important');
                card.style.removeProperty('justify-self');
            } else {
                unplaceAbs(card);
                ['position', 'left', 'top', 'margin', 'grid-column', 'grid-row',
                    'aspect-ratio', 'height', 'width', 'max-height', 'min-height',
                    'min-width', 'align-self', 'justify-self'].forEach(p => card.style.removeProperty(p));
            }
            const button = card.querySelector('.ichc-spotlight-btn');
            if (button) {
                button.classList.toggle('ichc-spotlight-active', active);
                button.title = active ? 'Unfocus cam' : 'Focus cam';
                button.setAttribute('aria-label', active ? 'Unfocus cam' : 'Focus cam');
            }
        });

        if (found) {
            _featuredWasFound = true;
        } else if (featured && _featuredWasFound && Date.now() - _featuredSetAt > 8000 &&
                   !document.getElementById('cams')?.classList.contains('ichc-lurk-active') &&
                   Date.now() - lurkState.lastActiveAt > 600000) {
            // Only clear the key once the cam has been confirmed present and then
            // gone for >8 seconds — prevents clearing during initial card loading.
            // Skip while cams are paused for inactivity AND for 10min after the pause
            // ends: every cam vanishes during the timeout and they take a while to
            // re-stream after restart, so the focused cam must survive that window.
            localStorage.removeItem(FEATURED_KEY);
            _featuredWasFound = false;
        }

        _applyCardSpans();
    }

    function toggleFeatured(card) {
        const key = card.dataset.ichcCam;
        if (!key) { return; }
        _featuredSetAt = Date.now();
        _featuredWasFound = false;
        const current = (localStorage.getItem(FEATURED_KEY) || '').trim().toLowerCase();

        if (current === key) {
            localStorage.removeItem(FEATURED_KEY);
        } else {
            try {
                localStorage.setItem(FEATURED_KEY, key);
            } catch (e) {
                if (e?.name === 'QuotaExceededError' || e?.code === 22 || e?.code === 1014) {
                    _evictOldProfileCache(60);
                    try { localStorage.setItem(FEATURED_KEY, key); } catch (_) {}
                }
            }
            card.parentElement?.prepend(card);
            saveCurrentOrder();
        }

        layoutChat();
        window.requestAnimationFrame(() => {
            layoutChat();
        });
    }

    function syncCamCards() {
        if (dragState.activeCard) { return; }
        const cams = document.getElementById('cams');
        const cards = getCamCards();
        cams?.classList.toggle('ichc-has-rounded-cards', !!document.querySelector('#cams .rounded_square'));
        cards.forEach(prepareCamCard);
        applySavedOrder();
        updateCamDensity();
        applyFeaturedCam();
        updateEmptyCamState();
        buildHiddenCamManager();
    }

    function _reconcileBcastTimers(cams) {
        // When #cams is replaced wholesale the child-removal MutationObserver never
        // fires, leaving stale _BCAST_LS entries for users who stopped broadcasting.
        // Build the current live set and evict anything not in it.
        const liveNames = new Set(
            [...cams.querySelectorAll('.rounded_square')]
                .map(card => getCardName(card)?.trim().toLowerCase())
                .filter(Boolean)
        );
        try {
            // Object.keys() fetches all keys in one call (O(n)) — localStorage.key(i)
            // in a for-loop is O(n²) in Firefox when localStorage is large.
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(_BCAST_LS) && !liveNames.has(key.slice(_BCAST_LS.length))) {
                    _recordCamSession(key.slice(_BCAST_LS.length));
                    localStorage.removeItem(key);
                }
            });
        } catch (_) {}
    }

    // ── Observed rooms: mirror other rooms' cams into this room's plane ──────
    // EXPERIMENTAL — exists to answer the multi-room feasibility questions live
    // (see HANDOFF). Each observed room loads in a hidden SAME-ORIGIN iframe
    // whose own site scripts join the room and negotiate WebRTC exactly as a
    // second tab would. The host then mirrors each playing cam by pointing a
    // local <video> at the SAME MediaStream object — same-origin realms pass
    // the stream by reference: no re-encode, no bandwidth beyond the join
    // itself. A MediaStream cannot be structured-cloned, which is why separate
    // tabs can never do this and iframes are the only cheap plane-merge.
    //
    // Deliberately NOT manifest all_frames: no extension UI boots inside the
    // frame; the host reaches in through contentDocument. Inert until a room
    // is added from the cog menu (Observed rooms).
    //
    // THE OPEN QUESTION this is built to answer: whether the site's single
    // ASP.NET session tolerates being in two rooms at once. If adding a room
    // kicks you out of the one you are reading, the idea is dead — watch this
    // room's userlist right after adding one.
    const _OBS_LS = 'ichc_observed_rooms';   // must not start 'ichc_bcast_' (timer eviction)
    const _OBS_POLL_MS = 2000;
    const _obsState = { frames: new Map() };  // room → { iframe, status, camCount, timer }

    function _obsRooms() {
        try {
            const raw = JSON.parse(localStorage.getItem(_OBS_LS) || '[]');
            return Array.isArray(raw)
                ? [...new Set(raw.map(r => String(r).trim().toLowerCase()).filter(Boolean))]
                : [];
        } catch (_) { return []; }
    }
    function _obsSaveRooms(rooms) {
        try { localStorage.setItem(_OBS_LS, JSON.stringify([...new Set(rooms)])); } catch (_) {}
        _obsSync();
    }
    function _obsCurrentRoom() {
        return (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
    }
    function _obsFrameHost() {
        let host = document.getElementById('ichc-obs-frames');
        if (!host) {
            host = document.createElement('div');
            host.id = 'ichc-obs-frames';
            host.setAttribute('aria-hidden', 'true');
            document.body.appendChild(host);
        }
        return host;
    }

    function _obsSync() {
        // Never observe the room we are standing in — that would double-join it.
        const wanted = _obsRooms().filter(r => r !== _obsCurrentRoom());
        for (const [room, entry] of [..._obsState.frames]) {
            if (wanted.includes(room)) { continue; }
            window.clearInterval(entry.timer);
            entry.iframe.remove();
            _obsState.frames.delete(room);
            document.querySelectorAll('#cams .ichc-obs-mirror[data-ichc-obs-room="' + CSS.escape(room) + '"]')
                .forEach(m => m.remove());
            requestCamRelayout(80);
        }
        wanted.forEach(room => {
            if (_obsState.frames.has(room)) { return; }
            const iframe = document.createElement('iframe');
            iframe.className = 'ichc-obs-frame';
            // Never steal focus from the chat input — an open regression already
            // stalks that box; do not add a suspect.
            iframe.setAttribute('tabindex', '-1');
            // Origin-relative, not a hardcoded host: same-origin access IS the
            // mechanism, so derive the URL from where we actually are.
            iframe.src = location.origin + '/' + encodeURIComponent(room);
            _obsFrameHost().appendChild(iframe);
            const entry = { iframe, status: 'loading…', camCount: 0, timer: 0 };
            entry.timer = window.setInterval(() => { try { _obsPoll(room); } catch (_) {} }, _OBS_POLL_MS);
            _obsState.frames.set(room, entry);
        });
    }

    // ── Keeping observed frames alive ────────────────────────────────────────
    // FIELD RESULT (2026-08-17): observed rooms go dark after a while. The site
    // pauses cams after roughly ten minutes without activity (`lurkMessageDiv`,
    // "cams disabled due to inactivity"), and a frame parked offscreen can
    // never look active.
    //
    // A synthetic-mousemove keep-alive was written first and REMOVED:
    // **the user confirms mouse activity does not reset the site's inactivity
    // timer.** Whatever the site counts (a sent message, a server-visible
    // action) cannot be faked from a frame without actually posting to that
    // room, which is not acceptable. So prevention is off the table and this is
    // purely reactive: let the frame pause, notice, and resume it. Cost is a
    // gap of up to one poll tick every ~10 minutes.
    //
    // Resuming is safe for your broadcast. The native inactivity link runs
    // `hideLurkMessage()` + `toggleCams()`, and this repo already establishes
    // (see _triggerCamRestart) that those "only restart inbound viewers; they
    // do not touch the user's outbound broadcast."
    const _OBS_RESUME_MIN_MS = 15000;

    // Returns true when the frame is sitting on the site's "cams paused" state.
    function _obsHandleIdle(room, doc, entry) {
        const lurk = doc.getElementById('lurkMessageDiv');
        if (!lurk) { return false; }
        // Visibility ONLY — deliberately not the text match that syncLurkBanner
        // ORs in for the main page. The banner's "cams disabled due to
        // inactivity" text is present in the DOM even while hidden, so a text
        // test reads as paused permanently. Here that would mean clicking the
        // site's resume control in every frame every 15 seconds forever, which
        // touches cam state and is exactly the kind of unattended side effect
        // that must not ship. The harness caught this: a frame that was never
        // idled reported itself paused.
        const view = doc.defaultView;
        if (!view) { return false; }
        let paused = false;
        try {
            const cs = view.getComputedStyle(lurk);
            paused = cs.visibility === 'visible' && cs.display !== 'none' &&
                lurk.getBoundingClientRect().height > 0;
        } catch (_) { return false; }
        if (!paused) { return false; }
        // Click the site's own resume control — the same affordance the main
        // page's lurk banner offers. Throttled so a frame that refuses to
        // resume is not clicked twice a second forever.
        const now = Date.now();
        if (now - (entry.lastResumeAt || 0) > _OBS_RESUME_MIN_MS) {
            entry.lastResumeAt = now;
            entry.resumes = (entry.resumes || 0) + 1;
            // A plain .click() on the banner link does NOT work: its href is a
            // `javascript:` URL, and a content-world click cannot execute one
            // (the same trap invokeNativeElementAction exists to work around on
            // the main page). runInPageContext is no help either — background.js
            // targets the SENDING frame, and no content script runs in observed
            // frames. Firefox-only extension, so reach the frame's page globals
            // through wrappedJSObject and make the two calls the link makes.
            try {
                const w = view.wrappedJSObject || view;
                if (typeof w.hideLurkMessage === 'function') { w.hideLurkMessage(); }
                if (typeof w.toggleCams === 'function') { w.toggleCams(); }
            } catch (_) {}
        }
        return true;
    }

    // A 2s poll rather than a cross-document MutationObserver: the frame's
    // document is REPLACED on navigation/reconnect, which silently orphans any
    // observer attached to the old one. A poll over a dozen cards is nothing,
    // and it re-finds the new document for free every tick.
    function _obsPoll(room) {
        const entry = _obsState.frames.get(room);
        if (!entry) { return; }
        let doc = null;
        try { doc = entry.iframe.contentDocument; } catch (_) {}
        if (!doc) { entry.status = 'blocked (no document)'; entry.camCount = 0; return; }
        const srcCams = doc.getElementById('cams');
        if (!srcCams) {
            entry.status = doc.readyState === 'complete' ? 'no room UI (login? frame-blocked?)' : 'loading…';
            entry.camCount = 0;
            return;
        }
        const idle = _obsHandleIdle(room, doc, entry);
        _obsReconcileMirrors(room, srcCams, entry);
        if (idle) { entry.status += ' · ⏸ idle, resuming'; }
        // Split-chat early warning. FIELD RESULT (2026-08-17, live Firefox):
        // chat/userlist are SESSION-scoped — the frame shows the MAIN room's
        // userlist and receives no chat — while cam signaling is ROOM-scoped,
        // which is why mirroring works at all. The user reports that when the
        // site DOES create a second chat identity (two tabs, two rooms), it
        // suffixes a second username and splits messages between instances.
        // A frame is safe only while it holds no chat presence, so its #txt
        // staying empty is the invariant. Rows accumulating here mean the
        // split has begun and main-room messages may be vanishing into an
        // invisible iframe — surface it rather than let it fail silently.
        const chatRows = doc.getElementById('txt')?.children.length || 0;
        entry.chatRows = chatRows;
        if (chatRows > 0) { entry.status += ' · ⚠ ' + chatRows + ' chat rows'; }
    }

    function _obsReconcileMirrors(room, srcCams, entry) {
        const hostCams = document.getElementById('cams');
        if (!hostCams) { return; }
        const liveIds = new Set();
        let mirrored = 0;
        let changed = false;
        srcCams.querySelectorAll('.rounded_square').forEach(srcCard => {
            const vc = srcCard.querySelector('.videocontainer');
            const srcVideo = srcCard.querySelector('video');
            const stream = srcVideo && srcVideo.srcObject;
            if (!vc || !vc.id || !stream) { return; }   // not a playing cam yet
            const srcId = vc.id.replace(/^id-/, '');
            // Mirror ids are namespaced by room so they can never collide with
            // this room's native camIds — getCamId(), _camDecorMap, FEATURED_KEY
            // and the persisted card order all key off this string.
            const mirrorId = 'obs-' + room + '-' + srcId;
            liveIds.add(mirrorId);
            let mirror = document.getElementById('id-' + mirrorId)?.closest('.rounded_square');
            if (!mirror) {
                mirror = document.createElement('div');
                mirror.className = 'rounded_square ichc-obs-mirror';
                mirror.dataset.ichcObsRoom = room;
                const mvc = document.createElement('div');
                mvc.className = 'videocontainer';
                mvc.id = 'id-' + mirrorId;
                const mv = document.createElement('video');
                mv.autoplay = true;
                mv.muted = true;      // v1 mirrors are video-only; audio stays muted in the frame
                mv.playsInline = true;
                mvc.appendChild(mv);
                const nameEl = document.createElement('div');
                nameEl.className = 'name-on-cam';
                const tag = document.createElement('div');
                tag.className = 'ichc-obs-tag';
                tag.textContent = room;
                mirror.append(mvc, nameEl, tag);
                hostCams.appendChild(mirror);
                changed = true;
            }
            const mv = mirror.querySelector('video');
            if (mv && mv.srcObject !== stream) {
                // First attach, or the site rebuilt the source card with a fresh
                // stream — reattach by reference either way.
                mv.srcObject = stream;
                const p = mv.play();
                if (p && p.catch) { p.catch(() => {}); }
                changed = true;
            }
            // Nick only in .name-on-cam (nick-keyed tooling reads it verbatim);
            // the room lives in its own tag element.
            const nick = (srcCard.querySelector('.name-on-cam')?.textContent || '').trim();
            const nameEl = mirror.querySelector('.name-on-cam');
            if (nameEl && nameEl.textContent !== nick) { nameEl.textContent = nick; }
            mirrored++;
        });
        document.querySelectorAll('#cams .ichc-obs-mirror[data-ichc-obs-room="' + CSS.escape(room) + '"]')
            .forEach(m => {
                const id = m.querySelector('.videocontainer')?.id?.replace(/^id-/, '');
                if (id && !liveIds.has(id)) { m.remove(); changed = true; }
            });
        entry.status = mirrored + ' cam' + (mirrored === 1 ? '' : 's');
        entry.camCount = mirrored;
        if (changed) { requestCamRelayout(80); }
    }


    function initCamLayout() {
        const cams = document.getElementById('cams');
        if (!cams || cams.dataset.ichcCamLayout === '1') { return; }
        cams.dataset.ichcCamLayout = '1';

        _reconcileBcastTimers(cams);
        syncCamCards();

        const syncSoon = debounce(() => {
            if (isCamRelayoutSuppressed()) {
                // A mutation arrived while relayout was suppressed (e.g. a new cam
                // started broadcasting during the post-sync cooldown). Schedule a
                // single retry after suppression expires so the new card is processed.
                window.clearTimeout(camLayoutState.syncRetryTimer);
                camLayoutState.syncRetryTimer = window.setTimeout(() => requestCamRelayout(70), 300);
                return;
            }
            requestCamRelayout(70);
        }, 100);
        camLayoutState.syncObserver?.disconnect();
        camLayoutState.syncObserver = new MutationObserver(mutations => {
            if (mutations.every(_isCamDecorationMutation)) { return; }
            // Real site/card mutations always schedule syncSoon. Timer cleanup is
            // handled by prepareCamCard (ghost detection) and _reconcileBcastTimers
            // (wholesale #cams replacement), because refreshCams() transiently
            // removes cards that are still live.
            syncSoon();
        });
        camLayoutState.syncObserver.observe(cams, {
            childList: true,
            subtree: true,
        });

        const panel = document.getElementById('ichc-cams-panel');
        if (panel && typeof ResizeObserver !== 'undefined') {
            if (!camLayoutState.panelObserver) {
                let lastPanelWidth = Math.round(panel.getBoundingClientRect().width || panel.clientWidth || 0);
                camLayoutState.panelObserver = new ResizeObserver(entries => {
                    const nextWidth = Math.round(entries[0]?.contentRect?.width || panel.getBoundingClientRect().width || panel.clientWidth || 0);
                    if (isCamRelayoutSuppressed()) { return; }
                    if (Math.abs(nextWidth - lastPanelWidth) < 4) { return; }
                    lastPanelWidth = nextWidth;
                    requestCamRelayout(30);
                });
                camLayoutState.panelObserverTarget = panel;
                camLayoutState.panelObserver.observe(panel);
            } else if (camLayoutState.panelObserverTarget !== panel) {
                camLayoutState.panelObserver.disconnect();
                camLayoutState.panelObserver.observe(panel);
                camLayoutState.panelObserverTarget = panel;
            }
        }

        cams.addEventListener('click', event => {
            const toggleButton = event.target.closest('.ichc-cam-toggle-btn');
            if (toggleButton) {
                event.preventDefault();
                event.stopPropagation();
                // Fallback: per-card handler should have fired first (stopPropagation).
                // If we're here, the card was re-created without a per-card listener.
                const card = toggleButton.closest('.rounded_square');
                if (card) {
                    const action = (toggleButton.dataset.ichcAction || '').toLowerCase();
                    if (action === 'disable' || action === 'stop') {
                        setBlockedStateForCard(card, true);
                        card.querySelector('.videocontainer')?.style?.setProperty('display', 'none', 'important');
                    } else if (action === 'start' || action === 'enable') {
                        const name = setBlockedStateForCard(card, false);
                        if (name) { revealBlockedUser(name, { rerender: false }); }
                        card.querySelector('.videocontainer')?.style?.removeProperty?.('display');
                    }
                    buildHiddenCamManager();
                    syncCamCards();
                    buildUserList();
                    requestCamRelayout(40);
                    setTimeout(() => requestCamRelayout(140), 140);
                    setTimeout(() => requestCamRelayout(420), 420);
                }
                return;
            }

            const spotlightButton = event.target.closest('.ichc-spotlight-btn');
            if (!spotlightButton) { return; }
            event.preventDefault();
            event.stopPropagation();
            const card = spotlightButton.closest('.rounded_square');
            if (card) { toggleFeatured(card); }
        });

        cams.addEventListener('dblclick', event => {
            if (event.target.closest('.ichc-overlay-btn')) { return; }
            const card = event.target.closest('.rounded_square');
            if (card) { toggleFeatured(card); }
        });

        cams.addEventListener('pointerdown', event => {
            if (event.button !== 0) {
                dragState.handleArmed = null;
                return;
            }
            if (event.target.closest('.ichc-overlay-btn, .cam-button, .cam-button2, button, a, input, textarea, select, label')) {
                dragState.handleArmed = null;
                return;
            }
            dragState.handleArmed = event.target.closest('.rounded_square') || null;
        });

        cams.addEventListener('dragstart', event => {
            const card = event.target.closest('.rounded_square');
            if (!card || dragState.handleArmed !== card || card.classList.contains('ichc-hidden-slot')) {
                event.preventDefault();
                return;
            }
            dragState.activeCard = card;
            card.classList.add('ichc-dragging');
            event.dataTransfer?.setData('text/plain', card.dataset.ichcCam || 'cam');
        });

        cams.addEventListener('dragover', event => {
            if (!dragState.activeCard) { return; }
            event.preventDefault();

            const target = event.target.closest('.rounded_square');
            if (!target || target === dragState.activeCard || target.classList.contains('ichc-hidden-slot')) {
                return;
            }

            const rect = target.getBoundingClientRect();
            const before = event.clientY < rect.top + rect.height / 2 ||
                (Math.abs(event.clientY - (rect.top + rect.height / 2)) < rect.height * 0.2 &&
                 event.clientX < rect.left + rect.width / 2);

            if (before) {
                target.before(dragState.activeCard);
            } else {
                target.after(dragState.activeCard);
            }
        });

        const finishDrag = () => {
            if (dragState.activeCard) {
                dragState.activeCard.classList.remove('ichc-dragging');
                dragState.activeCard = null;
                saveCurrentOrder();
            }
            dragState.handleArmed = null;
        };

        cams.addEventListener('drop', event => {
            if (!dragState.activeCard) { return; }
            event.preventDefault();
            finishDrag();
        });
        cams.addEventListener('dragend', finishDrag);
        document.addEventListener('pointerup', () => {
            if (!dragState.activeCard) { dragState.handleArmed = null; }
        });

        [3500, 5500, 8000].forEach(delay => {
            window.setTimeout(() => requestCamRelayout(40), delay);
        });
    }

    // ── Dynamic layout ────────────────────────────────────────────────────────────

    function layoutChat() {
        const container = document.getElementById('chat_container');
        const userList = document.getElementById('ichc-userlist');
        const camsPanel = document.getElementById('ichc-cams-panel');
        const stage = document.getElementById('ichc-room-stage');
        if (!container) { return; }

        if (window.innerWidth <= 780) {
            const compact = Math.max(360, Math.min(window.innerHeight * 0.54, 720));
            const compactText = String(compact);
            if (container.dataset.ichcTargetHeight !== compactText) {
                container.dataset.ichcTargetHeight = compactText;
                container.style.setProperty('height', compact + 'px', 'important');
                container.style.setProperty('max-height', compact + 'px', 'important');
            }
            if (userList) {
                delete userList.dataset.ichcTargetHeight;
                userList.style.removeProperty('height');
                userList.style.removeProperty('min-height');
                userList.style.removeProperty('max-height');
            }
            if (camsPanel) {
                delete camsPanel.dataset.ichcTargetHeight;
                camsPanel.style.removeProperty('height');
                camsPanel.style.removeProperty('min-height');
                camsPanel.style.removeProperty('max-height');
            }
            updateCamDensity();
            applyFeaturedCam();
            return;
        }

        // Chat/userlist fill grid row 1; row 2 is the input bar (--ichc-input-height).
        // Subtract the input height so they don't overflow into the input row area.
        const top = stage?.getBoundingClientRect().top || container.getBoundingClientRect().top;
        const inputHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--ichc-input-height')
        ) || 50;
        const target = Math.max(230, Math.floor(window.innerHeight - top - inputHeight));
        const targetText = String(target);
        if (container.dataset.ichcTargetHeight !== targetText) {
            container.dataset.ichcTargetHeight = targetText;
            container.style.setProperty('height', target + 'px', 'important');
            container.style.setProperty('max-height', target + 'px', 'important');
        }
        if (userList) {
            // Expanded, the userlist spans both shell rows so its user rows run down
            // behind the translucent input bar (frosted-glass block in theme.css) —
            // it gets the input height back. These inline heights are !important and
            // therefore beat any stylesheet rule, so the extra height has to be added
            // here, not in CSS. Collapsed, the panel is a fixed overlay stacked far
            // above the input row: keeping it out of the bar's 50px leaves the
            // emote/more buttons clickable.
            const ulCollapsed = document.getElementById('ichc-chat-shell')
                ?.classList.contains('ichc-ul-collapsed');
            const ulTarget = ulCollapsed ? target : target + inputHeight;
            const ulText = String(ulTarget);
            if (userList.dataset.ichcTargetHeight !== ulText) {
                userList.dataset.ichcTargetHeight = ulText;
                userList.style.setProperty('height', ulTarget + 'px', 'important');
                userList.style.setProperty('min-height', ulTarget + 'px', 'important');
                userList.style.setProperty('max-height', ulTarget + 'px', 'important');
            }
        }
        if (camsPanel) {
            if (camsPanel.dataset.ichcTargetHeight !== targetText) {
                camsPanel.dataset.ichcTargetHeight = targetText;
                camsPanel.style.setProperty('height', target + 'px', 'important');
                camsPanel.style.setProperty('min-height', target + 'px', 'important');
                camsPanel.style.setProperty('max-height', target + 'px', 'important');
            }
        }
        updateCamDensity();
        applyFeaturedCam();
    }

    function initDynamicLayout() {
        const refreshLayout = debounce(() => {
            installStageLayout();
            installUnifiedHeader();
            initCamLayout();
            syncCamCards();
            scheduleUserListBuild(120);
            layoutChat();
            // Always run after layout — chatShell guaranteed to exist at this point
            transformCommandBar();
        }, 80);

        for (const delay of [150, 450, 900, 1600, 2600]) {
            setTimeout(refreshLayout, delay);
        }
        window.addEventListener('resize', refreshLayout);

        const stage = document.getElementById('ichc-room-stage');
        if (stage && typeof ResizeObserver !== 'undefined') {
            let lastStageWidth = Math.round(stage.getBoundingClientRect().width || 0);
            new ResizeObserver(entries => {
                const nextWidth = Math.round(entries[0]?.contentRect?.width || stage.getBoundingClientRect().width || 0);
                if (isCamRelayoutSuppressed()) { return; }
                if (Math.abs(nextWidth - lastStageWidth) < 2) { return; }
                lastStageWidth = nextWidth;
                refreshLayout();
            }).observe(stage);
        }

        const container = document.getElementById('chat_container');
        if (container) {
            new MutationObserver(() => {
                if (container.style.getPropertyPriority('height') !== 'important') {
                    refreshLayout();
                }
            }).observe(container, { attributes: true, attributeFilter: ['style'] });
        }

    }

})();
