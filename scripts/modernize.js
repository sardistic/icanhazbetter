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
        rotateRight:`<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.389z" clip-rule="evenodd"/></svg>`,
        cog:         `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.993 6.993 0 0 1 7.51 3.456l.33-1.652zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clip-rule="evenodd"/></svg>`,
        bell:        `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M4 8a6 6 0 1 1 12 0v2.917c0 .703.228 1.387.648 1.954l1.288 1.718A1.75 1.75 0 0 1 16.6 17.25H3.4a1.75 1.75 0 0 1-1.394-2.796l1.288-1.718A3.25 3.25 0 0 0 4 10.917V8zm6 12a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 10 20z" clip-rule="evenodd"/></svg>`,
        volume:      `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75zM13.78 7.22a.75.75 0 1 0-1.06 1.06 2.5 2.5 0 0 1 0 3.44.75.75 0 1 0 1.06 1.06 4 4 0 0 0 0-5.56z"/><path d="M15.905 5.096a.75.75 0 0 0-1.06 1.06 5.5 5.5 0 0 1 0 7.788.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.908z"/></svg>`,
        palette:     `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M3.75 3A1.75 1.75 0 0 0 2 4.75v10.5C2 16.216 2.784 17 3.75 17h10.5A1.75 1.75 0 0 0 16 15.25v-6.5A1.75 1.75 0 0 0 14.25 7H10V4.75A1.75 1.75 0 0 0 8.25 3H3.75zM6 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.25-3.75a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zM10 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" clip-rule="evenodd"/></svg>`,
        imageIcon:   `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909-.48-.48a.75.75 0 0 0-1.06 0L6.53 13.53 4.22 11.22a.75.75 0 0 0-1.06 0l-.66.659v.001zm1.5-4.56A1.25 1.25 0 1 1 6.25 7.75 1.25 1.25 0 0 1 4 6.5z" clip-rule="evenodd"/></svg>`,
        phone:       `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5z" clip-rule="evenodd"/></svg>`,
        question:    `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94zM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clip-rule="evenodd"/></svg>`,
        dotsH:       `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/></svg>`,
        chevronDown: `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z" clip-rule="evenodd"/></svg>`,
        chat:        `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 0 0 1.28.53l3.58-3.579A13.95 13.95 0 0 0 12 14c2.236 0 4.43-.18 6.57-.524C20.007 13.245 21 11.986 21 10.574V5.426c0-1.413-.993-2.67-2.43-2.902A41.112 41.112 0 0 0 12 2h-2zm0 1.5c2.188 0 4.33.175 6.395.512.97.157 1.605.944 1.605 1.814v5.148c0 .87-.636 1.657-1.605 1.814A39.614 39.614 0 0 1 10 13a12.45 12.45 0 0 1-1.57-.1.75.75 0 0 0-.557.16L5.5 15.702v-2.537a.75.75 0 0 0-.676-.744 39.61 39.61 0 0 1-2.344-.303C1.636 11.915 1 11.128 1 10.258V5.426c0-.87.636-1.657 1.605-1.814A39.614 39.614 0 0 1 10 3.5z" clip-rule="evenodd"/></svg>`,
        hamburger:   `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75zm0 5A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75zm0 5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75z" clip-rule="evenodd"/></svg>`,
        gifIcon:     `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5zm4.049 3.49A.75.75 0 0 0 4.25 9.5v1A.75.75 0 0 0 5 11.25h1.25a.75.75 0 0 0 0-1.5H5.75V9.5a.75.75 0 0 0-.701-.76zm2.551-.74a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75zm2 0a.75.75 0 0 1 .673.418L11 10.108l.727-1.69A.75.75 0 0 1 13.25 8v3.75a.75.75 0 0 1-1.5 0v-1.608l-.227.529a.75.75 0 0 1-1.046 0l-.227-.53v1.609a.75.75 0 0 1-1.5 0V8.75a.75.75 0 0 1 .75-.75z" clip-rule="evenodd"/></svg>`,
        users:       `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 17a9.953 9.953 0 0 1-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.8A7.468 7.468 0 0 1 14.5 16z"/></svg>`,
        videoCam2:   `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5zM19 7.573a.75.75 0 0 0-1.214-.588l-3.036 2.427V10.5l3.036 2.423A.75.75 0 0 0 19 12.423V7.573z"/></svg>`,
        chevronRight:`<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z" clip-rule="evenodd"/></svg>`,
        chevronLeft: `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.832 10l3.938 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02z" clip-rule="evenodd"/></svg>`,
        shield:      `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.384 9.563-8.06 11.076a.475.475 0 0 1-.32 0C4.384 16.563 1 12.162 1 7c0-.539.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749z" clip-rule="evenodd"/></svg>`,
        sun:         `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2zM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15zM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.061-1.06zM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06zM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10zM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10zM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.061zM5.404 6.464a.75.75 0 0 0 1.06-1.06L5.403 4.343a.75.75 0 0 0-1.06 1.06l1.06 1.061z"/></svg>`,
        moon:        `<svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em" aria-hidden="true" style="display:inline-block;vertical-align:-0.1em"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083z" clip-rule="evenodd"/></svg>`,
    };

    const PREF_KEY = 'ichc_layout_prefs';
    const ORDER_KEY = 'ichc_cam_order';
    const FEATURED_KEY = 'ichc_featured_cam';
    const SIDE_WIDTH_KEY = 'ichc_stage_side_width';
    const DEFAULT_PREFS = { camMin: 360, chatWidth: 430, chatSide: 'right' };
    const dragState = { handleArmed: null, activeCard: null };
    const userListState = {
        timer: null,
        srcObserver: null,
        camsObserver: null,
        srcObservedEl: null,
        camsObservedEl: null,
        avatarObserver: null,  // IntersectionObserver — only fetches avatars for visible rows
        searchFocused: false,  // true while filter input has focus — suppresses frequent rebuilds
        _suppressBlur: false,  // true during panel.innerHTML='' so the sync blur doesn't clear searchFocused
        rebuildPendingAfterSearch: false,
    };
    const lurkState = {
        pollTimer: null,
    };
    const camLayoutState = {
        timer: null,
        resizeObserver: null,
        panelObserver: null,
        sideWidthOverride: null,
        suppressUntil: 0,
        lastDensitySignature: '',
        syncRetryTimer: null,
    };
    // Cache: username_lower → image URL string | null ('pending' while fetching)
    // Capped at 200 entries — evict oldest 50 when full to avoid unbounded growth.
    const profileImageCache = new Map();
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
    const avatarImgCache = new Map();

    // ── Avatar fetch rate limiter ─────────────────────────────────────────────────
    // Keep at most 2 in-flight HTTP requests; 350 ms gap between each start to avoid
    // hammering the CDN with a full room of users all at once.
    const _AV_LS          = 'ichc_av2_';        // localStorage key prefix
    const _AV_HIT_TTL     = 7 * 24 * 3600e3;   // 7 days: successful avatar URL
    const _AV_MISS_TTL    =     24 * 3600e3;    // 1 day:  "no avatar found" marker
    let   _avActive       = 0;
    const _AV_MAX         = 2;
    const _avQueue        = [];

    function _lsAvSave(key, url) {
        try { localStorage.setItem(_AV_LS + key, JSON.stringify({ url: url || null, ts: Date.now() })); } catch (_) {}
    }

    function _scheduleAvatarFetch(fn) {
        return new Promise(resolve => {
            const run = () => {
                _avActive++;
                fn().then(result => {
                    resolve(result);
                    _avActive--;
                    if (_avQueue.length > 0) {
                        window.setTimeout(() => (_avQueue.shift())?.(), 350);
                    }
                });
            };
            if (_avActive < _AV_MAX) { run(); }
            else { _avQueue.push(run); }
        });
    }
    let camSeed = 0;

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
        // Faces – negative
        {e:'😞',n:'disappointed'},{e:'😟',n:'worried'},{e:'😣',n:'persevering'},
        {e:'😖',n:'confounded'},{e:'😫',n:'tired'},{e:'😩',n:'weary'},
        {e:'🥺',n:'pleading puppy eyes'},{e:'😢',n:'cry single tear'},
        {e:'😭',n:'sob loudly crying'},{e:'😤',n:'triumph steam nose'},
        {e:'😠',n:'angry'},{e:'😡',n:'pouting rage red'},{e:'🤬',n:'swearing cursing'},
        {e:'😈',n:'devil smiling'},{e:'👿',n:'devil angry'},{e:'💀',n:'skull dead'},
        {e:'☠️',n:'skull crossbones'},{e:'💩',n:'poop'},{e:'🤡',n:'clown'},
        {e:'👹',n:'ogre monster'},{e:'👺',n:'goblin'},{e:'👻',n:'ghost'},
        {e:'👽',n:'alien'},{e:'🤖',n:'robot'},
        // Gestures & hands
        {e:'👋',n:'wave hi hello'},{e:'🤚',n:'raised back hand'},
        {e:'🖐️',n:'hand five fingers'},{e:'✋',n:'raised hand stop'},
        {e:'🖖',n:'vulcan salute spock'},{e:'🫱',n:'rightwards hand'},
        {e:'👌',n:'ok perfect'},{e:'🤌',n:'pinched fingers chef kiss'},
        {e:'✌️',n:'peace victory two'},{e:'🤞',n:'crossed fingers luck'},
        {e:'🤟',n:'love you hand'},{e:'🤘',n:'horns rock metal'},
        {e:'🤙',n:'call me shaka hang loose'},{e:'👈',n:'left point'},
        {e:'👉',n:'right point'},{e:'👆',n:'up point'},{e:'👇',n:'down point'},
        {e:'☝️',n:'index point up'},{e:'👍',n:'thumbs up like good'},
        {e:'👎',n:'thumbs down dislike'},{e:'✊',n:'raised fist'},
        {e:'👊',n:'oncoming fist punch'},{e:'🤛',n:'left fist bump'},
        {e:'🤜',n:'right fist bump'},{e:'👏',n:'clap applause'},
        {e:'🙌',n:'raising hands celebration'},{e:'🫶',n:'heart hands love'},
        {e:'👐',n:'open hands'},{e:'🤲',n:'palms up prayer'},
        {e:'🙏',n:'pray please thank you'},{e:'🤝',n:'handshake deal'},
        {e:'💅',n:'nail polish sassy'},{e:'🤳',n:'selfie'},
        {e:'💪',n:'muscle strong flex'},{e:'🦵',n:'leg kick'},{e:'🦶',n:'foot'},
        {e:'👂',n:'ear listen'},{e:'👃',n:'nose sniff'},
        // Hearts & affection
        {e:'❤️',n:'red heart love'},{e:'🧡',n:'orange heart'},
        {e:'💛',n:'yellow heart'},{e:'💚',n:'green heart'},
        {e:'💙',n:'blue heart'},{e:'💜',n:'purple heart'},
        {e:'🖤',n:'black heart'},{e:'🤍',n:'white heart'},
        {e:'🤎',n:'brown heart'},{e:'💔',n:'broken heart'},
        {e:'❤️‍🔥',n:'heart fire burning love'},{e:'💕',n:'two hearts'},
        {e:'💞',n:'revolving hearts'},{e:'💓',n:'beating heart'},
        {e:'💗',n:'growing heart'},{e:'💖',n:'sparkling heart'},
        {e:'💘',n:'heart arrow cupid'},{e:'💝',n:'heart ribbon gift'},
        {e:'💟',n:'heart decoration'},{e:'♥️',n:'heart suit card'},
        {e:'😻',n:'heart eyes cat'},{e:'💋',n:'kiss mark lips'},
        // Common objects & symbols
        {e:'🔥',n:'fire hot lit'},{e:'✨',n:'sparkles magic'},
        {e:'⭐',n:'star'},{e:'🌟',n:'glowing star'},{e:'💫',n:'dizzy star spinning'},
        {e:'🎉',n:'party popper celebration'},{e:'🎊',n:'confetti ball party'},
        {e:'🎈',n:'balloon'},{e:'🎁',n:'gift present wrapped'},
        {e:'🏆',n:'trophy winner'},{e:'🥇',n:'gold medal first place'},
        {e:'🍕',n:'pizza'},{e:'🍔',n:'burger'},{e:'🍟',n:'fries'},
        {e:'🌮',n:'taco'},{e:'🍣',n:'sushi'},{e:'🍜',n:'noodles ramen'},
        {e:'🍺',n:'beer mug'},{e:'🍻',n:'clinking beers cheers'},
        {e:'🥂',n:'champagne toast'},{e:'☕',n:'coffee hot'},
        {e:'🧃',n:'juice box'},{e:'🎮',n:'game controller'},
        {e:'💻',n:'laptop computer'},{e:'📱',n:'phone mobile'},
        {e:'📷',n:'camera photo'},{e:'🎵',n:'music note'},
        {e:'🎶',n:'musical notes'},{e:'💤',n:'zzz sleep'},
        {e:'💯',n:'hundred percent perfect'},
        {e:'‼️',n:'double exclamation'},{e:'❓',n:'question'},
        {e:'❗',n:'exclamation'},{e:'✅',n:'check mark yes'},
        {e:'❌',n:'cross no x'},{e:'⚠️',n:'warning caution'},
        {e:'🚀',n:'rocket launch'},{e:'🛸',n:'ufo flying saucer'},
        {e:'🌈',n:'rainbow'},{e:'☀️',n:'sun'},{e:'🌙',n:'moon crescent'},
        {e:'⚡',n:'lightning bolt zap'},{e:'🌊',n:'wave ocean water'},
        {e:'💥',n:'boom explosion'},{e:'👀',n:'eyes looking watching'},
        {e:'🗣️',n:'speaking head talk'},{e:'💬',n:'speech bubble chat'},
        {e:'🫂',n:'hug people'},{e:'🤦',n:'facepalm'},
        {e:'🤷',n:'shrug whatever'},{e:'💁',n:'info person sassy'},
        {e:'🙆',n:'ok gesture person'},{e:'🙅',n:'no gesture forbidden'},
        {e:'🙋',n:'raising hand question'},{e:'🤸',n:'cartwheel gymnastics'},
        {e:'💃',n:'dance woman'},{e:'🕺',n:'dance man'},
        {e:'🐱',n:'cat kitten'},{e:'🐶',n:'dog puppy'},
        {e:'🐸',n:'frog'},{e:'🐧',n:'penguin'},
        {e:'🦊',n:'fox'},{e:'🐼',n:'panda'},
        {e:'🌸',n:'cherry blossom flower pink'},
        {e:'🌺',n:'hibiscus flower'},{e:'🌻',n:'sunflower'},
        {e:'🍀',n:'four leaf clover luck'},
    ];

    // ─── JS ──────────────────────────────────────────────────────────────────────

    // Apply saved theme before first paint
    if (localStorage.getItem('ichc_theme') === 'light') {
        document.documentElement.classList.add('ichc-light-theme');
    }

    installBroadcastQualityPatch();

    document.addEventListener('DOMContentLoaded', () => {
        installStageLayout();
        installUnifiedHeader();
        initUserList();
        initCamLayout();
        initLurkBanner();
        initDynamicLayout();
        transformCommandBar();
        // Throttle refreshCams in page context — the site calls it on its own timer
        // which was causing the "random refresh" disruptions.  Pass true as first arg
        // to bypass the throttle for deliberate extension-triggered reloads.
        const _wrapRefreshCams = () => {
            runInPageContext(`
                if (typeof refreshCams === 'function' && !refreshCams._ichcThrottled) {
                    const _orig = refreshCams;
                    window._ichcLastRefresh = window._ichcLastRefresh || 0;
                    window.refreshCams = function(force) {
                        const now = Date.now();
                        if (!force && now - window._ichcLastRefresh < 10000) {
                            return;
                        }
                        window._ichcLastRefresh = now;
                        return _orig.apply(this, arguments);
                    };
                    window.refreshCams._ichcThrottled = true;
                }
            `);
        };
        _wrapRefreshCams();
        window.setTimeout(_wrapRefreshCams, 2000);
        window.setTimeout(_wrapRefreshCams, 5000);
    });

    // ── Shared utilities ──────────────────────────────────────────────────────────

    function normalizeText(value = '') {
        return value.replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function runInPageContext(source) {
        chrome.runtime.sendMessage({ type: 'ichc-exec', code: source }).catch(() => {});
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

    function improveConstraints(constraints) {
        const next = Object.assign({}, constraints || {});
        const video = next.video;
        if (!video) { return constraints; }
        if (video === true) {
            next.video = {
                width: Object.assign({}, target.width),
                height: Object.assign({}, target.height),
                frameRate: Object.assign({}, target.frameRate),
            };
            return next;
        }
        if (typeof video !== 'object') { return constraints; }

        next.video = Object.assign({}, video, {
            width: liftConstraint(video.width, target.width),
            height: liftConstraint(video.height, target.height),
            frameRate: liftConstraint(video.frameRate, target.frameRate),
        });
        return next;
    }

    function tuneSender(sender) {
        try {
            const track = sender && sender.track;
            if (!track || track.kind !== 'video') { return; }
            track.contentHint = 'detail';
            if (!sender.getParameters || !sender.setParameters) { return; }
            const params = sender.getParameters() || {};
            params.encodings = params.encodings && params.encodings.length ? params.encodings : [{}];
            params.encodings.forEach(encoding => {
                if (encoding.scaleResolutionDownBy && encoding.scaleResolutionDownBy > 1) {
                    encoding.scaleResolutionDownBy = 1;
                }
                encoding.maxBitrate = Math.max(encoding.maxBitrate || 0, target.bitrate);
                encoding.maxFramerate = Math.max(encoding.maxFramerate || 0, target.frameRate.ideal);
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
        const patched = function(constraints) {
            return original(improveConstraints(constraints));
        };
        patched.__ichcQualityPatched = true;
        mediaDevices.getUserMedia = patched;
    }

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
    function invokeNativeElementAction(element) {
        if (!element || !element.isConnected) { return; }

        const bridgeToken = `ichc-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        element.setAttribute('data-ichc-bridge', bridgeToken);

        const selector = `[data-ichc-bridge="${bridgeToken}"]`;
        const href = element.getAttribute('href') || '';
        const onclick = element.getAttribute('onclick') || '';

        runInPageContext(`
            const el = document.querySelector(${JSON.stringify(selector)});
            if (!el) { return; }

            try {
                ['mousedown', 'mouseup', 'click'].forEach(type => {
                    el.dispatchEvent(new MouseEvent(type, {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                    }));
                });
            } catch (_) {}

            try {
                if (typeof el.click === 'function') { el.click(); }
            } catch (_) {}

            const nativeHref = ${JSON.stringify(href)};
            if (/^\s*javascript:/i.test(nativeHref)) {
                const js = nativeHref.replace(/^\s*javascript:\s*/i, '');
                try { Function(js).call(el); } catch (_) {
                    try { (0, eval)(js); } catch (_) {}
                }
            }

            const nativeOnclick = ${JSON.stringify(onclick)};
            if (nativeOnclick) {
                try { Function(nativeOnclick).call(el); } catch (_) {}
            }
        `);

        element.removeAttribute('data-ichc-bridge');
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
        document.documentElement.style.setProperty('--ichc-cam-min', `${DEFAULT_PREFS.camMin}px`);
        document.documentElement.style.setProperty('--ichc-chat-width', `${prefs.chatWidth}px`);
        document.documentElement.style.setProperty('--ichc-cam-columns', '1');
        const storedSideWidth = loadStoredSideWidth();
        if (storedSideWidth) {
            document.documentElement.style.setProperty('--ichc-stage-side-width', `${storedSideWidth}px`);
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
        // Footer lives at the bottom of #ichc-cams-col (under the cams panel)
        let bar = document.getElementById('ichc-footer-bar');
        const camsCol = document.getElementById('ichc-cams-col');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'ichc-footer-bar';

            // Copyright line + key links
            const copy = document.createElement('div');
            copy.id = 'ichc-footer-copy';
            copy.innerHTML = `\u00a9 2025 icanhazchat.com \u00b7 ` + [
                ['Help',          'https://www.icanhazchat.com/Help'],
                ['Get Hearted',   'https://www.icanhazchat.com/GetHearted'],
                ['Credits',       'https://www.icanhazchat.com/credits'],
                ['Contact',       'https://www.icanhazchat.com/contact'],
            ].map(([label, href]) =>
                `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
            ).join(' \u00b7 ');
            bar.appendChild(copy);
        }
        if (camsCol && bar.parentElement !== camsCol) {
            camsCol.appendChild(bar);
        }

        // Word cloud toggle button
        if (!document.getElementById('ichc-wc-toggle-btn')) {
            const wcBtn = document.createElement('button');
            wcBtn.id = 'ichc-wc-toggle-btn';
            wcBtn.type = 'button';
            wcBtn.title = _wordCloudMode ? 'Switch to user list' : 'Switch to word cloud';
            wcBtn.textContent = '☁';
            wcBtn.className = 'ichc-wc-toggle-btn' + (_wordCloudMode ? ' ichc-wc-active' : '');
            wcBtn.addEventListener('click', () => setWordCloudMode(!_wordCloudMode));
            bar.appendChild(wcBtn);
        }

        return bar;
    }


    function isRoomRulesLink(link) {
        const text = normalizeText(link?.textContent || '');
        const href = (link?.getAttribute?.('href') || '').toLowerCase();
        return /room\s+rules?|rules/.test(text) || /roomrules|room-rules|rules/.test(href);
    }

    function placeRoomRulesInFooter(sourceLink) {
        const copy = document.getElementById('ichc-footer-copy');
        if (!copy || !sourceLink) { return; }
        let rulesLink = document.getElementById('ichc-footer-room-rules');
        if (!rulesLink) {
            rulesLink = document.createElement('a');
            rulesLink.id = 'ichc-footer-room-rules';
            rulesLink.target = '_blank';
            rulesLink.rel = 'noopener noreferrer';
            rulesLink.textContent = sourceLink.textContent.trim() || 'Room Rules';
            copy.appendChild(document.createTextNode(' \u00b7 '));
            copy.appendChild(rulesLink);
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
            toggleBtn.innerHTML = ICONS.dotsH + '<span class="ichc-room-submenu-label">More</span>';

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

            // Room button lives in the footer bar
            if (!footerBar.contains(submenu)) {
                footerBar.appendChild(submenu);
            }
        } else {
            if (!footerBar.contains(submenu)) {
                footerBar.appendChild(submenu);
            }
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
                <div id="ichc-header-topic"></div>
                <div id="ichc-header-actions">
                    <div id="ichc-header-userinfo"></div>
                    <div id="ichc-primary-actions"></div>
                </div>
            `;
        }
        const root = document.getElementById('ichc-room-root');
        if (root && root.firstElementChild !== topbar) {
            root.prepend(topbar);
        }

        const brand = document.getElementById('ichc-header-brand');
        const topicSlot = document.getElementById('ichc-header-topic');
        const actions = document.getElementById('ichc-header-actions');
        const primaryActions = document.getElementById('ichc-primary-actions');
        const userInfoSlot = document.getElementById('ichc-header-userinfo');
        if (!brand || !topicSlot || !actions || !primaryActions) { return; }

        if (logoBlock && !brand.contains(logoBlock)) { brand.replaceChildren(logoBlock); }
        if (!topicSlot.contains(topic)) { topicSlot.replaceChildren(topic); }

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
                    identEl.appendChild(karmaEl);
                }
                userInfoSlot.appendChild(identEl);
                userInfoSlot.dataset.ichcPopulated = '1';
            } else {
                // Username link not found yet (userlinks not loaded) — leave slot empty, retry next call.
            }
        }

        const primaryLinks = [];

        // Find broadcast button: may already be in primaryActions (moved on a previous call)
        // or still in camControl (first call). Look for broadcast/live URL; fall back to first link.
        const broadcastBtn = primaryActions.querySelector('a.ichc-broadcast-btn') ||
            [...camControl.querySelectorAll('a')].find(a =>
                /broadcast|live|cam|stream/i.test(a.href || '') ||
                /go.?live|start.?broadcast|stop.?broadcast/i.test(a.textContent.trim())
            ) ||
            [...camControl.querySelectorAll('a')][0];
        if (broadcastBtn) {
            if (!broadcastBtn.classList.contains('ichc-broadcast-btn')) {
                broadcastBtn.innerHTML = '<span class="ichc-btn-icon-lg">' + ICONS.broadcast + '</span><span>Go Live</span>';
                broadcastBtn.classList.add('ichc-broadcast-btn');
            }
            primaryLinks.push(broadcastBtn);
        }

        // Create reload-cams button (between Go Live and Leave)
        let reloadBtn = document.getElementById('ichc-reload-cams-btn');
        if (!reloadBtn) {
            reloadBtn = document.createElement('button');
            reloadBtn.id = 'ichc-reload-cams-btn';
            reloadBtn.type = 'button';
            reloadBtn.className = 'ichc-reload-cams-btn';
            reloadBtn.title = 'Reload cams';
            reloadBtn.innerHTML = ICONS.rotate;
            reloadBtn.addEventListener('click', () => {
                triggerReload();
            });
        }
        primaryLinks.push(reloadBtn);

        // Find leave button: may already be in primaryActions or still in signout element.
        const leaveBtn = primaryActions.querySelector('a.ichc-leave-btn') ||
            [...leaveControl.querySelectorAll('a')][0];
        if (leaveBtn) {
            if (!leaveBtn.classList.contains('ichc-leave-btn')) {
                leaveBtn.innerHTML = ICONS.leave;
                leaveBtn.classList.add('ichc-leave-btn');
            }
            primaryLinks.push(leaveBtn);
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
            hamburgerBtn.innerHTML = ICONS.hamburger;

            hamburgerMenu = document.createElement('div');
            hamburgerMenu.id = 'ichc-nav-hamburger-menu';
            hamburgerMenu.hidden = true;

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
        if (!actions.contains(hamburgerWrapper)) { actions.appendChild(hamburgerWrapper); }

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

        // Userlist resize handle (left edge of userlist)
        if (userPanel && !document.getElementById('ichc-userlist-resizer')) {
            const ulResizer = document.createElement('div');
            ulResizer.id = 'ichc-userlist-resizer';
            userPanel.appendChild(ulResizer);
            initUserlistResizer(ulResizer);
        }

        collectRoomLinks(stage);
        ensureFooterBar(); // ensure footer bar is in cams-col
        ensureWordCloud();
        if (_wordCloudMode) { setWordCloudMode(true); }
        installRoomRoot(stage);
        installUnifiedHeader();
        resetRoomShell(stage);
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
            updateCamDensity();
            layoutChat();
        }, true);

        document.addEventListener('pointerup', finish, true);
        document.addEventListener('pointercancel', finish, true);
    }

    function initUserlistResizer(handle) {
        if (!handle || handle.dataset.ichcBound === '1') { return; }
        handle.dataset.ichcBound = '1';

        const state = { active: false, startX: 0, startWidth: 0 };

        const finish = () => {
            if (!state.active) { return; }
            state.active = false;
            handle.classList.remove('ichc-resizing');
            document.body.style.removeProperty('cursor');
            document.body.style.removeProperty('user-select');
            handle.releasePointerCapture?.(state.pointerId);
        };

        handle.addEventListener('pointerdown', (e) => {
            const userlist = document.getElementById('ichc-userlist');
            if (!userlist) { return; }
            state.active = true;
            state.startX = e.clientX;
            state.startWidth = userlist.getBoundingClientRect().width;
            state.pointerId = e.pointerId;
            handle.setPointerCapture?.(e.pointerId);
            handle.classList.add('ichc-resizing');
            document.body.style.setProperty('cursor', 'col-resize');
            document.body.style.setProperty('user-select', 'none');
            e.preventDefault();
        });

        document.addEventListener('pointermove', (e) => {
            if (!state.active) { return; }
            // Dragging left edge of userlist: moving LEFT = wider userlist
            const delta = state.startX - e.clientX;
            const newWidth = Math.max(140, Math.min(500, state.startWidth + delta));
            document.documentElement.style.setProperty('--ichc-userlist-width', `${newWidth}px`);
        }, true);

        document.addEventListener('pointerup', finish, true);
        document.addEventListener('pointercancel', finish, true);
    }

    // Public entry point: checks in-memory cache → localStorage → throttled HTTP fetch.
    // Never re-fetches within a session once a result (url or null) is stored.
    function fetchProfileImage(username) {
        const key = (username || '').toLowerCase().trim();
        if (!key) { return Promise.resolve(null); }
        if (profileImageCache.has(key)) { return Promise.resolve(profileImageCache.get(key)); }

        // Mark pending immediately so concurrent renders don't queue duplicate fetches
        _profileCacheSet(key, null);

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

        // Queue the actual HTTP fetch (max 2 concurrent, 350 ms between starts)
        return _scheduleAvatarFetch(() => _doFetchProfileImage(key));
    }

    // Performs the two-pass HTTP lookup and writes results to cache + localStorage.
    async function _doFetchProfileImage(key) {
        // ── Pass 1: profile page (same-origin) — look for CDN user image in img src ──
        try {
            const pageResp = await fetch(`https://www.icanhazchat.com/user/${encodeURIComponent(key)}`, {
                method: 'GET',
                credentials: 'include',
                cache: 'default',
            });
            if (pageResp.ok) {
                const html = await pageResp.text();
                // Loop through all CDN user img srcs; skip badge_ filenames (not profile pics)
                const srcRe = /src=["']((?:https?:)?\/\/images\.icanhazchat\.com\/users\/[^"']+\.(?:jpe?g|png|gif|webp)(?:\?[^"']*)?)["']/ig;
                let sm;
                while ((sm = srcRe.exec(html)) !== null) {
                    const fname = sm[1].split('/').pop().split('?')[0];
                    if (!fname.startsWith('badge_')) {
                        let url = sm[1].trim();
                        if (url.startsWith('//')) { url = 'https:' + url; }
                        _profileCacheSet(key, url);
                        _lsAvSave(key, url);
                        return url;
                    }
                }
            }
        } catch (_) {}

        // ── Pass 2: CDN directory listing (credentials:omit avoids strict CORS) ──
        try {
            const prefix = key.slice(0, 2);
            const dirUrl = `https://images.icanhazchat.com/users/${encodeURIComponent(prefix)}/${encodeURIComponent(key)}/`;
            const resp = await fetch(dirUrl, {
                method: 'GET',
                credentials: 'omit',
                cache: 'default',
            });

            // Server may redirect straight to the image file — skip badge_ filenames
            if (/\.(jpe?g|png|gif|webp)(\?.*)?$/i.test(resp.url) && resp.url !== dirUrl) {
                const fname = resp.url.split('/').pop().split('?')[0];
                if (!fname.startsWith('badge_')) {
                    const url = resp.url.startsWith('//') ? 'https:' + resp.url : resp.url;
                    _profileCacheSet(key, url);
                    _lsAvSave(key, url);
                    return url;
                }
            }

            if (resp.ok) {
                const html = await resp.text();
                // Loop through all href matches; skip badge_ filenames (achievement badges, not avatars).
                // Check the filename portion after the last '/' to handle both bare names and full paths.
                let raw = null;
                let m;
                const hrefRe = /href="([^"<>?#]+\.(?:jpe?g|png|gif|webp))"/ig;
                while ((m = hrefRe.exec(html)) !== null) {
                    const fname = m[1].split('/').pop().split('?')[0];
                    if (!fname.startsWith('badge_')) { raw = m[1]; break; }
                }
                if (!raw) {
                    // Fallback: unquoted bare filename (no slashes)
                    const nameRe = /"([^"<>?#/\\]+\.(?:jpe?g|png|gif|webp))"/ig;
                    while ((m = nameRe.exec(html)) !== null) {
                        if (!m[1].startsWith('badge_')) { raw = m[1]; break; }
                    }
                }
                if (raw) {
                    const imageUrl = /^https?:\/\//i.test(raw) ? raw :
                        raw.startsWith('/') ? `https://images.icanhazchat.com${raw}` :
                        `https://images.icanhazchat.com/users/${encodeURIComponent(prefix)}/${encodeURIComponent(key)}/${raw}`;
                    _profileCacheSet(key, imageUrl);
                    _lsAvSave(key, imageUrl);
                    return imageUrl;
                }
            }
        } catch (_) {}

        // No avatar found — record the miss so we don't retry for 24 h
        _lsAvSave(key, null);
        return null; // profileImageCache already set to null above
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
        // Force size + positioning context inline so CSS caching can't break the badge
        item.style.cssText = 'position:relative!important;width:28px!important;height:28px!important;flex-shrink:0!important;cursor:pointer!important;';

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

        item.appendChild(inner);
        item.appendChild(badge);

        item.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('ichc-pm-open', { detail: { nick, forceShow: true } }));
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
                pmBtn.title = 'Toggle PM window';
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

    function _injectPmAvStyles() {
        if (document.getElementById('ichc-pm-av-styles')) { return; }
        const s = document.createElement('style');
        s.id = 'ichc-pm-av-styles';
        s.textContent = '/* ichc pm avatar styles placeholder */';
        (document.head || document.documentElement).appendChild(s);
    }

    // JS-driven pulse — CSS animations can't override !important author declarations,
    // but inline styles set via setProperty(..., 'important') can.
    let _sidebarPulseTimer = null;
    let _sidebarPulseT = 0;

    function _startSidebarPulse() {
        if (_sidebarPulseTimer) { return; }
        _sidebarPulseT = 0;
        _sidebarPulseTimer = setInterval(() => {
            const strip = document.getElementById('ichc-ul-toggle-btn');
            if (!strip || !document.querySelector('#ichc-pm-avatars .ichc-pm-avatar-unread')) {
                _stopSidebarPulse();
                return;
            }
            _sidebarPulseT = (_sidebarPulseT + 1) % 28;
            const t = Math.sin((_sidebarPulseT / 28) * Math.PI); // smooth 0→1→0
            strip.style.setProperty('background', `rgba(160,10,10,${(t * 0.22).toFixed(3)})`, 'important');
            strip.style.setProperty('box-shadow', `inset -6px 0 20px rgba(239,68,68,${(t * 0.28).toFixed(3)})`, 'important');
            strip.style.setProperty('border-left-color', `rgba(239,68,68,${(0.06 + t * 0.35).toFixed(3)})`, 'important');
        }, 50);
    }

    function _stopSidebarPulse() {
        if (_sidebarPulseTimer) { clearInterval(_sidebarPulseTimer); _sidebarPulseTimer = null; }
        const strip = document.getElementById('ichc-ul-toggle-btn');
        if (strip) {
            strip.style.removeProperty('background');
            strip.style.removeProperty('box-shadow');
            strip.style.removeProperty('border-left-color');
            strip.style.removeProperty('animation');
        }
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
            const item = _pmAvNode(nick);
            if (!item) { return; }
            const b = item.querySelector('.ichc-pm-avatar-badge');
            const prev = b ? (parseInt(b.textContent) || 0) : 0;
            setPmAvatarBadge(nick, prev + 1);
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

        // PM toggle button clicked — clear all avatar badges.
        window.addEventListener('ichc-pm-user-toggle', () => {
            document.querySelectorAll('#ichc-pm-avatars [data-nick]').forEach(item => {
                const nick = item.dataset.nick;
                if (nick) { _clearPmAvatarBadge(nick); }
            });
        });

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

    function loadBlockedUsers() {
        try {
            const value = JSON.parse(localStorage.getItem('ichc_blocked') || '[]');
            return new Set(Array.isArray(value) ? value.map(name => String(name).toLowerCase()) : []);
        } catch (_) {
            return new Set();
        }
    }

    function saveBlockedUsers(set) {
        localStorage.setItem('ichc_blocked', JSON.stringify([...set]));
    }

    function getBlockedUserDisplayName(key) {
        const wanted = (key || '').trim().toLowerCase();
        if (!wanted) { return ''; }

        const sources = [
            ...getLiveCamEntries().map(entry => ({ textContent: entry.name || '' })),
            ...document.querySelectorAll('#cams .name-on-cam'),
            ...document.querySelectorAll('#activeUserList a.userlink'),
            ...document.querySelectorAll('#txt a.userlink'),
        ];

        const match = sources.find(node => node.textContent.trim().toLowerCase() === wanted);
        return match?.textContent.trim() || key;
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

    function setBlockedStateForCard(card, shouldBlock) {
        const name = getCardName(card).trim();
        if (!name || looksLikePlaceholderName(name)) { return ''; }

        const blocked = loadBlockedUsers();
        if (shouldBlock) {
            blocked.add(name.toLowerCase());
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
        if (!name) { return ''; }

        const blocked = loadBlockedUsers();
        if (!blocked.has(name.toLowerCase())) { return ''; }

        const container = card.querySelector('.videocontainer');
        if (!container) { return ''; }

        const hiddenInline = container.style.getPropertyValue('display') === 'none';
        const hiddenComputed = window.getComputedStyle(container).display === 'none';
        if (!hiddenInline && !hiddenComputed) { return ''; }

        return name;
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
                // Invoke the native Start/retry button so the stream reconnects.
                window.setTimeout(() => {
                    const startBtn = card
                        ? getNativeCamToggleControl(card)
                        : vc.querySelector('[id^="cambtn1"], [id$="-retry"]');
                    if (startBtn && getNativeCamActionLabel(startBtn) === 'Start') {
                        invokeNativeElementAction(startBtn);
                    }
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

    // New-cam detection is intentionally disabled — the auto-reload caused random
    // stream disruptions.  The site's own refreshCams() polling (throttled to 15s
    // via _wrapRefreshCams) handles picking up new cams within a reasonable delay.
    // The manual reload button in the header is available for on-demand refresh.

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
        // Throttle: at most one reload per 15 seconds.
        // If a reload is requested during the cooldown, queue one for when it expires
        // so new cams that arrive mid-cooldown aren't permanently missed.
        const now = Date.now();
        const remaining = _lastReloadAt + 15000 - now;
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
        if (typeof window._ichcSuppressNewCamDetect === 'function') { window._ichcSuppressNewCamDetect(30000); }

        // Reset ghost-classifier timestamps BEFORE the refresh so any early
        // MutationObserver-driven relayout (which can fire before 150ms) uses
        // fresh timestamps and doesn't immediately ghost-lock cards whose
        // streams are still reconnecting (display:none freezes media init).
        const _resetFirstSeen = () => {
            const t = String(Date.now());
            getCamCards().forEach(card => { card.dataset.ichcFirstSeenAt = t; });
        };
        _resetFirstSeen();

        // Pass true to bypass the 15s throttle wrapper — this is a deliberate reload.
        runInPageContext(`if (typeof refreshCams === 'function') { window._ichcLastRefresh = 0; refreshCams(true); }`);

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
            const sidebarStrip = document.getElementById('ichc-ul-toggle-btn');
            if (sidebarStrip) {
                [
                    document.getElementById('ichc-pm-toggle-btn'),
                    document.getElementById('ichc-cog-wrapper'),
                ].forEach(el => {
                    if (el && !sidebarStrip.contains(el)) {
                        sidebarStrip.appendChild(el);
                    }
                });
                const pmAvStrip = document.getElementById('ichc-pm-avatars');
                if (pmAvStrip && !sidebarStrip.contains(pmAvStrip)) {
                    const tb = document.getElementById('ichc-theme-toggle-btn');
                    sidebarStrip.insertBefore(pmAvStrip, tb || sidebarStrip.firstChild);
                }
            }
            // gif lives directly in inputRow, between txtMsg and sendBtn
            const gifWrap = document.getElementById('ichc-gif-wrapper');
            if (gifWrap && inputRow && !inputRow.contains(gifWrap)) {
                inputRow.insertBefore(gifWrap, sendBtn);
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
            { label: 'Sounds',          icon: ICONS.volume,    fn: 'toggleChatSound()' },
            { label: 'Text color',      icon: ICONS.palette,   fn: 'pickColor()' },
            { label: 'Image viewing',   icon: ICONS.imageIcon, fn: 'toggleImages()' },
            { label: 'PM preferences',  icon: ICONS.phone,     fn: 'togglePMPrefs()' },
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
                    } else {
                        runInPageContext(item.fn);
                        menu.hidden = true;
                        cogBtn.setAttribute('aria-expanded', 'false');
                    }
                });
            }
            el.innerHTML = `<span class="ichc-cog-item-icon" aria-hidden="true">${item.icon}</span><span class="ichc-cog-item-label">${item.label}</span>`;
            menu.appendChild(el);
        });

        // Portal the menu to #ichc-room-root so it escapes nested stacking contexts
        // and reliably paints above the userlist and all other in-room elements.
        const portalMenu = () => {
            const root = document.getElementById('ichc-room-root') || document.body;
            if (!root.contains(menu)) { root.appendChild(menu); }
            // Reposition menu above the cog button
            const rect = cogBtn.getBoundingClientRect();
            menu.style.setProperty('bottom', (window.innerHeight - rect.top + 4) + 'px', 'important');
            menu.style.setProperty('right', (window.innerWidth - rect.right - 2) + 'px', 'important');
            menu.style.removeProperty('top');
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
        pmBtn.title = 'Toggle PM window';
        pmBtn.innerHTML = ICONS.chat;
        pmBtn.dataset.pmUnread = '0';
        const pmBadge = document.createElement('span');
        pmBadge.className = 'ichc-pm-toggle-badge';
        pmBadge.setAttribute('aria-hidden', 'true');
        pmBtn.appendChild(pmBadge);

        const clearPmButtonAlert = () => {
            pmBtn.dataset.pmUnread = '0';
            pmBtn.classList.remove('ichc-pm-toggle-alert');
            pmBadge.textContent = '';
            pmBadge.hidden = true;
            pmBtn.title = 'Toggle PM window';
        };
        const markPmButtonAlert = detail => {
            const count = Math.min(99, (parseInt(pmBtn.dataset.pmUnread, 10) || 0) + 1);
            const nick = typeof detail?.nick === 'string' ? detail.nick.trim() : '';
            pmBtn.dataset.pmUnread = String(count);
            pmBtn.classList.add('ichc-pm-toggle-alert');
            pmBadge.hidden = false;
            pmBadge.textContent = count > 9 ? '9+' : String(count);
            pmBtn.title = nick ? `New PM from ${nick}` : `${count} unread PM${count === 1 ? '' : 's'}`;
        };

        let _pmVisible = true;
        pmBtn.addEventListener('click', () => {
            _pmVisible = !_pmVisible;
            window.dispatchEvent(new CustomEvent('ichc-pm-user-toggle'));
            pmBtn.classList.toggle('ichc-pm-toggle-hidden', !_pmVisible);
            clearPmButtonAlert();
        });
        window.addEventListener('ichc-pm-alert', e => markPmButtonAlert(e.detail));
        // GIF/emote picker button
        let gifWrapper = document.getElementById('ichc-gif-wrapper');
        if (!gifWrapper) {
            gifWrapper = document.createElement('div');
            gifWrapper.id = 'ichc-gif-wrapper';

            const gifBtn = document.createElement('button');
            gifBtn.type = 'button';
            gifBtn.id = 'ichc-gif-toggle-btn';
            gifBtn.title = 'GIFs & Emotes';
            gifBtn.innerHTML = ICONS.gifIcon;

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
            tabBar.appendChild(tabGif); tabBar.appendChild(tabEmote);

            // Search
            const searchWrap = document.createElement('div');
            searchWrap.id = 'ichc-gif-search';
            const searchInput = document.createElement('input');
            searchInput.type = 'search'; searchInput.placeholder = 'Search…'; searchInput.autocomplete = 'off';
            searchWrap.appendChild(searchInput);

            // Grid
            const grid = document.createElement('div');
            grid.id = 'ichc-gif-grid';

            gifPanel.appendChild(tabBar);
            gifPanel.appendChild(searchWrap);
            gifPanel.appendChild(grid);
            gifWrapper.appendChild(gifBtn);

            let _gifData = null; // { gifs: [{code, src, full}], emotes: [{code}] }
            let _activeTab = 'gif';
            let _gifQuery = '';

            const insertText = (text) => {
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
                tabGif.classList.add('active'); tabEmote.classList.remove('active');
                grid.classList.remove('ichc-emoji-grid');
                renderGrid();
            });
            tabEmote.addEventListener('click', () => {
                _activeTab = 'emote';
                tabEmote.classList.add('active'); tabGif.classList.remove('active');
                grid.classList.add('ichc-emoji-grid');
                renderGrid();
            });
            searchInput.addEventListener('input', () => {
                _gifQuery = searchInput.value.trim();
                renderGrid();
            });

            }

        // pm/cog live in the sidebar strip; gif floats in the input row on the right
        pmBtn.classList.add('ichc-sidebar-btn');
        const cogBtnEl = wrapper.querySelector('button');
        if (cogBtnEl) { cogBtnEl.classList.add('ichc-sidebar-btn'); }

        const sidebarStrip = document.getElementById('ichc-ul-toggle-btn');
        if (sidebarStrip) {
            // Theme toggle button (above PM button)
            let themeBtn = document.getElementById('ichc-theme-toggle-btn');
            if (!themeBtn) {
                themeBtn = document.createElement('button');
                themeBtn.id = 'ichc-theme-toggle-btn';
                themeBtn.className = 'ichc-sidebar-btn';
                themeBtn.title = 'Toggle light/dark theme';
                const isLight = document.documentElement.classList.contains('ichc-light-theme');
                themeBtn.innerHTML = isLight ? ICONS.moon : ICONS.sun;
                themeBtn.addEventListener('click', () => {
                    const nowLight = document.documentElement.classList.toggle('ichc-light-theme');
                    themeBtn.innerHTML = nowLight ? ICONS.moon : ICONS.sun;
                    localStorage.setItem('ichc_theme', nowLight ? 'light' : 'dark');
                    document.dispatchEvent(new CustomEvent('ichc-theme-change'));
                });
            }

            [pmBtn, wrapper].forEach(el => {
                if (el && !sidebarStrip.contains(el)) {
                    sidebarStrip.appendChild(el);
                }
            });
            if (!sidebarStrip.contains(themeBtn)) {
                sidebarStrip.insertBefore(themeBtn, pmBtn);
            }

            // PM avatar strip — sits above the theme button
            let pmAvatarStrip = document.getElementById('ichc-pm-avatars');
            if (!pmAvatarStrip) {
                pmAvatarStrip = document.createElement('div');
                pmAvatarStrip.id = 'ichc-pm-avatars';
            }
            if (!sidebarStrip.contains(pmAvatarStrip)) {
                sidebarStrip.insertBefore(pmAvatarStrip, themeBtn);
            }
            initPmAvatarObserver();
        } else {
            // Strip not built yet — retry after buildUserList creates it.
            [200, 600, 1400].forEach(d => window.setTimeout(transformCommandBar, d));
        }

        // gif lives directly in inputRow between txtMsg and sendBtn
        if (gifWrapper && inputRow && !inputRow.contains(gifWrapper)) {
            inputRow.insertBefore(gifWrapper, sendBtn);
        }
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
                // Let the site's native onclick/href restart cams — don't intercept.
                // After the site re-enables cams, reset ghost-aging timestamps so
                // prepareCamCard doesn't immediately re-hide the restarted cards,
                // then reload the cam stream list.
                actionLink.addEventListener('click', () => {
                    window.setTimeout(() => {
                        lurkDiv.classList.remove('ichc-visible');
                        // Reset first-seen timestamps on all cam cards so the
                        // age-based ghost classification re-evaluates from zero.
                        document.querySelectorAll('#cams .rounded_square[data-ichc-first-seen-at]').forEach(card => {
                            delete card.dataset.ichcFirstSeenAt;
                        });
                        requestCamRelayout(1200);
                    }, 400);
                });
            }
        }
    }

    function initLurkBanner() {
        syncLurkBanner();

        if (!lurkState.pollTimer) {
            lurkState.pollTimer = window.setInterval(() => {
                syncLurkBanner();
            }, 5000);
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
        return (12 + Math.floor(Math.random() * 5)) + 'px';
    }

    function buildWordCloud(users) {
        let wc = document.getElementById('ichc-wordcloud');
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
        const camsCol = document.getElementById('ichc-cams-col');
        if (!camsCol) { return null; }
        let wc = document.getElementById('ichc-wordcloud');
        if (!wc) {
            wc = document.createElement('div');
            wc.id = 'ichc-wordcloud';
        }
        const footer = document.getElementById('ichc-footer-bar');
        if (footer && wc.nextSibling !== footer) {
            camsCol.insertBefore(wc, footer);
        } else if (!wc.parentElement) {
            camsCol.appendChild(wc);
        }
        return wc;
    }

    function setWordCloudMode(on) {
        _wordCloudMode = on;
        localStorage.setItem('ichc_wc_mode', on ? '1' : '0');
        const shell = document.getElementById('ichc-chat-shell');
        if (shell) { shell.classList.toggle('ichc-wordcloud-mode', on); }
        const wc = ensureWordCloud();
        if (wc) { wc.classList.toggle('ichc-wc-visible', on); }
        const btn = document.getElementById('ichc-wc-toggle-btn');
        if (btn) {
            btn.classList.toggle('ichc-wc-active', on);
            btn.title = on ? 'Switch to user list' : 'Switch to word cloud';
        }
        if (on) { buildUserList({ force: true }); }
    }

    function buildUserList({ force = false } = {}) {
        const src = document.getElementById('activeUserList');
        if (!src) { return; }

        if (!force && isUserListSearchActive()) {
            userListState.rebuildPendingAfterSearch = true;
            window.clearTimeout(userListState.timer);
            return;
        }
        userListState.rebuildPendingAfterSearch = false;
        // Track focus — panel.innerHTML='' blurs anything focused inside the panel.
        // Use the persistent state flag as the source of truth: panel.innerHTML='' fires blur
        // synchronously, which would zero out activeElement before we can read it below.
        const _blFocusedId = document.activeElement?.id;
        const _hadSearchFocus = userListState.searchFocused || (document.activeElement?.classList?.contains('ichc-ul-search-input') ?? false);
        const shell = document.getElementById('ichc-chat-shell');

        const modSet = new Set();
        src.querySelectorAll('p').forEach(p => {
            if (/mod/i.test(p.textContent)) {
                p.querySelectorAll('a.userlink').forEach(a =>
                    modSet.add(a.textContent.trim().toLowerCase()));
            }
        });

        const cammed      = getCammedNames();
        const liveEntries = getLiveCamEntries();
        const liveKeys    = new Set(liveEntries.map(e => e.name.trim().toLowerCase()));
        const blocked = loadBlockedUsers();
        const seen    = new Set();
        const users   = [];

        // Pre-scan: find supporter markers and map them to the nearest userlink.
        // theme.js may replace smicon images with span[data-icon], so check both forms.
        const supporterNames = new Set();
        const supporterPattern = /(get[_-]?hearted|hearted|heart|supporter|trophysupporter|trophy[_-]?supporter|heart_delete|valentine)/i;
        const markerSelector = [
            'img.smicon',
            'img[src*="heart" i]',
            'img[src*="support" i]',
            'img[src*="trophy" i]',
            'span[data-icon]',
            '[title*="heart" i]',
            '[title*="support" i]',
            '[aria-label*="heart" i]',
            '[aria-label*="support" i]'
        ].join(',');
        const markerText = node => [
            node.getAttribute?.('src'),
            node.getAttribute?.('data-icon'),
            node.getAttribute?.('title'),
            node.getAttribute?.('alt'),
            node.getAttribute?.('aria-label'),
            node.className,
        ].filter(Boolean).join(' ');
        const isSupporterMarker = node => !!node && supporterPattern.test(markerText(node));
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

        src.querySelectorAll('a.userlink').forEach(a => {
            const name = a.textContent.trim();
            const key  = name.toLowerCase();
            if (seen.has(key)) { return; }
            seen.add(key);
            const parentLi = a.closest('li');
            const smicon = a.querySelector('img.smicon') || parentLi?.querySelector('img.smicon');
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
                karma:   extractKarmaFromUserAnchor(a),
                trigger: a,
                icon:      smicon ? { src: smicon.src, title: smicon.title || smicon.alt || '' } : null,
                supporter: supporterNames.has(key) || !!(parentLi && Array.from(parentLi.querySelectorAll(markerSelector)).some(isSupporterMarker)),
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

        users.sort((a, b) => {
            // hidden-but-cammed: sort with cammed users (0); hidden-offline: bottom (4)
            const rank = u => (u.hidden && !u.cammed ? 4 : u.idle ? 3 : u.cammed ? 0 : u.mod ? 1 : 2);
            return rank(a) - rank(b);
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
        const prevMoreOpen = panel.querySelector('.ichc-ul-more-menu')?.hidden === false;
        const prevOfflineOpen = panel.querySelector('.ichc-ul-offline-hidden.is-open') !== null;

        userListState._suppressBlur = true;
        panel.innerHTML = '';
        userListState._suppressBlur = false;
        if (prevSearchOpen) { panel.classList.add('ichc-ul-search-open'); }

        const activeCount = users.filter(u => !u.idle).length;
        const idleCount   = users.filter(u => u.idle).length;
        const cammedCount = users.filter(u => u.cammed).length;

        // Add toggle button to chat-shell if not already there (placed BEFORE userlist)

        const chatShell = document.getElementById('ichc-chat-shell');
        if (chatShell && !document.getElementById('ichc-ul-toggle-btn')) {
            // Must be a <div> not <button> — PM/cog/gif buttons will be inserted
            // inside it, and nesting interactive elements in a <button> is invalid.
            const sidebarDiv = document.createElement('div');
            sidebarDiv.id = 'ichc-ul-toggle-btn';

            const badge = document.createElement('span');
            badge.id = 'ichc-ul-toggle-badge';
            badge.innerHTML = `${ICONS.users}<span id="ichc-ul-badge-users">0</span>${ICONS.videoCam2}<span id="ichc-ul-badge-cams">0</span>`;
            sidebarDiv.appendChild(badge);

            // Strip appended after userlist (grid-column 3)
            chatShell.appendChild(sidebarDiv);

            // Collapse chevron — lives inside the sidebar strip, above the badge.
            const chevronBtn = document.createElement('button');
            chevronBtn.type = 'button';
            chevronBtn.className = 'ichc-ul-toggle-chevron';
            chevronBtn.title = 'Hide user list';
            chevronBtn.innerHTML = ICONS.chevronRight;
            let _ulCollapsed = false;
            chevronBtn.addEventListener('click', () => {
                _ulCollapsed = !_ulCollapsed;
                chatShell.classList.toggle('ichc-ul-collapsed', _ulCollapsed);
                chevronBtn.title = _ulCollapsed ? 'Show user list' : 'Hide user list';
                chevronBtn.innerHTML = _ulCollapsed ? ICONS.chevronLeft : ICONS.chevronRight;
            });
            sidebarDiv.insertBefore(chevronBtn, sidebarDiv.firstChild);
            // Sidebar strip just created — give transformCommandBar a chance to place
            // PM/cog/gif buttons into it (they may already exist but not placed yet).
            window.setTimeout(transformCommandBar, 0);
        }
        // Update badge counts
        const badgeUsers = document.getElementById('ichc-ul-badge-users');
        const badgeCams  = document.getElementById('ichc-ul-badge-cams');
        const hiddenCamCount = users.filter(u => u.hidden && u.cammed).length;
        if (badgeUsers) { badgeUsers.textContent = String(activeCount + idleCount); }
        if (badgeCams)  { badgeCams.textContent  = String(cammedCount); }

        // Sidebar broadcasting avatars — visible only when userlist is collapsed
        const sidebarStrip = document.getElementById('ichc-ul-toggle-btn');
        if (sidebarStrip) {
            let sidebarAvatars = document.getElementById('ichc-ul-sidebar-avatars');
            if (!sidebarAvatars) {
                sidebarAvatars = document.createElement('div');
                sidebarAvatars.id = 'ichc-ul-sidebar-avatars';
                sidebarStrip.appendChild(sidebarAvatars);
            }
            sidebarAvatars.innerHTML = '';

            // Shared tooltip element for sidebar avatar names
            let _sidebarTip = document.getElementById('ichc-sidebar-tip');
            if (!_sidebarTip) {
                _sidebarTip = document.createElement('div');
                _sidebarTip.id = 'ichc-sidebar-tip';
                document.body.appendChild(_sidebarTip);
            }

            users.filter(u => u.cammed && !u.hidden).forEach(u => {
                const key = u.name.toLowerCase();
                const av = document.createElement('span');
                av.className = 'ichc-ul-sidebar-avatar';
                av.textContent = (u.name[0] || '?').toUpperCase();
                av.style.setProperty('--ichc-av-bg', userAvatarColor(u.name));
                // Use real profile image if already fetched for this session
                const cachedUrl = profileImageCache.has(key) ? profileImageCache.get(key) : null;
                if (cachedUrl) {
                    const img = document.createElement('img');
                    img.src = cachedUrl;
                    img.alt = '';
                    img.className = 'ichc-ul-sidebar-avatar-img';
                    av.appendChild(img);
                }
                av.addEventListener('mouseenter', () => {
                    _sidebarTip.textContent = u.name;
                    const rect = av.getBoundingClientRect();
                    _sidebarTip.style.top = (rect.top + rect.height / 2) + 'px';
                    _sidebarTip.style.right = (window.innerWidth - rect.left + 6) + 'px';
                    _sidebarTip.classList.add('ichc-sidebar-tip-visible');
                });
                av.addEventListener('mouseleave', () => {
                    _sidebarTip.classList.remove('ichc-sidebar-tip-visible');
                });
                sidebarAvatars.appendChild(av);
            });
        }

        // ── Header ──
        const header = document.createElement('div');
        header.className = 'ichc-ul-header';

        const titleRow = document.createElement('div');
        titleRow.className = 'ichc-ul-title-row';
        titleRow.innerHTML = '<span class="ichc-ul-title">People</span>';

        const searchBtn = document.createElement('button');
        searchBtn.type = 'button';
        searchBtn.className = 'ichc-ul-search-btn';
        searchBtn.setAttribute('aria-label', 'Search users');
        searchBtn.setAttribute('title', 'Search users');
        searchBtn.innerHTML = ICONS.search;
        titleRow.appendChild(searchBtn);

        const badge = document.createElement('span');
        badge.className = 'ichc-ul-count';
        const userMeta = idleCount > 0 ? ` (${idleCount} inactive)` : '';
        const camMeta  = hiddenCamCount > 0 ? ` (${hiddenCamCount} hidden)` : '';
        badge.innerHTML = `<span class="ichc-ul-count-users">${activeCount + idleCount} users${userMeta}</span><span class="ichc-ul-count-sep"> · </span><span class="ichc-ul-count-cams">${cammedCount} cams${camMeta}</span>`;

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
        header.appendChild(badge);
        header.appendChild(searchRow);
        panel.appendChild(header);

        // ── User rows ──
        const renderUsers = (query) => {
            panel.querySelectorAll('.ichc-ul-user').forEach(el => el.remove());

            let filtered = users;
            if (query) {
                const q = query.toLowerCase();
                filtered = users
                    .map(u => ({ u, score: fuzzyMatch(q, u.name.toLowerCase()) }))
                    .filter(({ score }) => score >= 0)
                    .sort((a, b) => b.score - a.score)
                    .map(({ u }) => u);
            }

            filtered.forEach(u => {
                const span = document.createElement('a');
                span.className = 'ichc-ul-user userlink' +
                    (u.hidden ? ' ichc-ul-hidden-live' : '') +
                    (u.cammed && !u.hidden ? ' cammed' : '') +
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
                        span.setAttribute(attr, u.trigger.getAttribute(attr) || '');
                    });
                }
                span.innerHTML = `
                    <span class="ichc-ul-user-state" aria-hidden="true"></span>
                    <span class="ichc-ul-user-name"></span>
                `;
                span.querySelector('.ichc-ul-user-name').textContent = u.name;

                // Profile avatar — reuse <img> element across rebuilds; src is only set
                // after the row enters the viewport (IntersectionObserver below) to avoid
                // aborting in-progress loads and to limit CDN requests to visible users.
                const imgKey = u.name.toLowerCase();
                let avatarImg = avatarImgCache.get(imgKey);
                if (!avatarImg) {
                    avatarImg = document.createElement('img');
                    avatarImg.className = 'ichc-ul-avatar';
                    avatarImg.alt = '';
                    avatarImg.draggable = false;
                    avatarImg.onerror = () => {
                        avatarImg.removeAttribute('src');
                        avatarImg.classList.remove('ichc-ul-avatar-loaded');
                        // Keep null in profileImageCache — don't delete or we'll retry every rebuild
                        _lsAvSave(imgKey, null);
                    };
                    avatarImgCache.set(imgKey, avatarImg);
                }
                // If URL is already resolved (localStorage hit on this session), show immediately
                const cachedUrl = profileImageCache.get(imgKey); // undefined = not yet fetched
                if (cachedUrl) {
                    avatarImg.src = cachedUrl;
                    avatarImg.classList.add('ichc-ul-avatar-loaded');
                }
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

                if (u.hidden) {
                    const enableBtn = document.createElement('button');
                    enableBtn.type = 'button';
                    enableBtn.className = 'ichc-ul-enable-btn';
                    enableBtn.title = 'Enable cam';
                    enableBtn.innerHTML = ICONS.eye;
                    enableBtn.addEventListener('click', e => {
                        e.preventDefault();
                        e.stopPropagation();
                        revealBlockedUser(u.name.toLowerCase());
                    });
                    span.appendChild(enableBtn);
                } else {
                    span.addEventListener('click', event => {
                        event.preventDefault();
                        event.stopPropagation();
                        triggerUserModal(u.trigger, u.name);
                    });
                    span.addEventListener('keydown', event => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            event.stopPropagation();
                            triggerUserModal(u.trigger, u.name);
                        }
                    });
                }
                panel.appendChild(span);
            });
        };

        // ── IntersectionObserver: only fetch avatars when a row is visible ──────
        // One observer per session, rooted on the #ichc-userlist scroll container.
        // When a tagged row enters the viewport the observer triggers the (throttled,
        // localStorage-cached) fetch and then stops watching that row.
        if (!userListState.avatarObserver) {
            userListState.avatarObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) { return; }
                    const row = entry.target;
                    userListState.avatarObserver.unobserve(row);
                    const key = row.dataset.ichcAvKey;
                    if (!key) { return; }
                    const avatarImg = avatarImgCache.get(key);
                    if (!avatarImg || avatarImg.src) { return; } // already have a src
                    fetchProfileImage(key).then(url => {
                        if (url && avatarImg) {
                            avatarImg.src = url;
                            avatarImg.classList.add('ichc-ul-avatar-loaded');
                        }
                    });
                });
            }, { root: panel, rootMargin: '120px 0px' });
        }

        const observeAvatarRows = () => {
            panel.querySelectorAll('[data-ichc-av-key]').forEach(row => {
                userListState.avatarObserver.observe(row);
            });
        };

        renderUsers(prevQuery);
        observeAvatarRows();

        // ── Search toggle ──
        searchBtn.addEventListener('click', () => {
            const open = panel.classList.toggle('ichc-ul-search-open');
            if (open) {
                searchInput.focus();
            } else {
                searchInput.value = '';
                renderUsers('');
                observeAvatarRows();
            }
        });

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
                if (prevOfflineOpen) { section.classList.add('is-open'); }
                header.addEventListener('click', () => section.classList.toggle('is-open'));
                section.appendChild(header);

                const list = document.createElement('div');
                list.className = 'ichc-ul-offline-hidden-list';
                offlineHiddenKeys.forEach(key => {
                    const row = document.createElement('div');
                    row.className = 'ichc-ul-offline-hidden-row';
                    const name = document.createElement('span');
                    name.className = 'ichc-ul-offline-hidden-name';
                    name.textContent = getBlockedUserDisplayName(key);
                    const removeBtn = document.createElement('button');
                    removeBtn.type = 'button';
                    removeBtn.className = 'ichc-ul-offline-remove-btn';
                    removeBtn.title = 'Remove from hidden list';
                    removeBtn.innerHTML = ICONS.xmark;
                    removeBtn.addEventListener('click', () => revealBlockedUser(key));
                    row.appendChild(name);
                    row.appendChild(removeBtn);
                    list.appendChild(row);
                });
                section.appendChild(list);
                panel.appendChild(section);
            }

            // ⋮ export/import menu in title row
            const titleRow = panel.querySelector('.ichc-ul-title-row');
            if (titleRow && !titleRow.querySelector('.ichc-ul-more-btn')) {
                const moreBtn = document.createElement('button');
                moreBtn.type = 'button';
                moreBtn.className = 'ichc-ul-more-btn';
                moreBtn.title = 'More options';
                moreBtn.innerHTML = ICONS.dotsH;

                const moreMenu = document.createElement('div');
                moreMenu.className = 'ichc-ul-more-menu';
                moreMenu.hidden = true;

                const exportItem = document.createElement('button');
                exportItem.type = 'button';
                exportItem.className = 'ichc-ul-more-item';
                exportItem.textContent = 'Export hidden list';
                exportItem.addEventListener('click', () => {
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
                importLabel.textContent = 'Import hidden list';
                importLabel.appendChild(importInput);

                moreMenu.appendChild(exportItem);
                moreMenu.appendChild(importLabel);
                moreBtn.appendChild(moreMenu);

                if (prevMoreOpen) { moreMenu.hidden = false; }

                moreBtn.addEventListener('click', e => {
                    e.stopPropagation();
                    moreMenu.hidden = !moreMenu.hidden;
                });
                document.addEventListener('click', e => {
                    if (!moreBtn.contains(e.target)) { moreMenu.hidden = true; }
                }, true);

                titleRow.appendChild(moreBtn); // far-right of title row
            }
        }
        // Word cloud — rebuild whenever userlist rebuilds
        if (_wordCloudMode) { buildWordCloud(users); }

        // Restore focus — panel.innerHTML='' blurs anything that was focused inside it.
        // _hadSearchFocus is captured before innerHTML='' so it survives the synchronous blur.
        // Use a short delay so site JS that runs on the same tick can't re-steal focus after us.
        if (_hadSearchFocus || (_blFocusedId === 'txtMsg' && document.activeElement?.id !== 'txtMsg')) {
            window.setTimeout(() => {
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
            userListState.srcObserver = new MutationObserver(() => scheduleUserListBuild(180));
            userListState.srcObserver.observe(src, { childList: true, subtree: true });
            userListState.srcObservedEl = src;
        }
        const cams = document.getElementById('cams');
        if (cams && userListState.camsObservedEl !== cams) {
            userListState.camsObserver?.disconnect();
            userListState.camsObserver = new MutationObserver(() => scheduleUserListBuild(220));
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
            const width = Math.max(rect.width, node.clientWidth || 0, node.offsetWidth || 0, attrWidth);
            const height = Math.max(rect.height, node.clientHeight || 0, node.offsetHeight || 0, attrHeight);

            return width >= 120 && height >= 90;
        });
    }

    function isDecorativeCamMedia(node) {
        if (!node || !(node instanceof Element)) { return true; }
        if (node.closest('.ichc-card-tools')) { return true; }
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
            if (node.matches('.name-on-cam, .ichc-card-tools, .cam-logo, .smicon')) { return false; }
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

    function ensureCardTools(card) {
        if (card.querySelector('.ichc-card-tools') || card.querySelector('.ichc-cam-toggle-btn')) { return; }

        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'ichc-overlay-btn ichc-cam-toggle-btn';
        toggleButton.setAttribute('aria-label', 'Toggle cam');
        toggleButton.setAttribute('title', 'Toggle cam');

        const tools = document.createElement('div');
        tools.className = 'ichc-card-tools';
        tools.innerHTML = `
            <button type="button" class="ichc-overlay-btn ichc-spotlight-btn" aria-label="Focus cam" title="Focus cam"></button>
        `;
        const spotlightButton = tools.querySelector('.ichc-spotlight-btn');

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
                    if (name) {
                        revealBlockedUser(name, { rerender: false });
                    }
                }

                const nativeToggle = getNativeCamToggleControl(card);
                const nativeLabel = (getNativeCamActionLabel(nativeToggle) || '').toLowerCase();
                const actionTarget = nativeToggle?.closest('a, button, [onclick], [href]') || nativeToggle;
                if (actionTarget && nativeLabel && nativeLabel === action) {
                    invokeNativeElementAction(actionTarget);
                } else {
                    const vc = card.querySelector('.videocontainer');
                    if (action === 'disable' || action === 'stop') {
                        vc?.style?.setProperty('display', 'none', 'important');
                    } else if (action === 'start' || action === 'enable') {
                        vc?.style?.removeProperty?.('display');
                    }
                }
                buildHiddenCamManager();
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

        card.appendChild(toggleButton);
        card.appendChild(tools);
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

            ['load', 'loadeddata', 'loadedmetadata', 'canplay'].forEach(type => {
                node.addEventListener(type, () => requestCamRelayout(140), { capture: true, passive: true });
            });
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
        localStorage.setItem(ORDER_KEY, JSON.stringify(
            getCamCards()
                .filter(card => card.dataset.ichcCam)
                .map(card => card.dataset.ichcCam),
        ));
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
        const featuredActive = visible.some(card => card.classList.contains('ichc-featured'));

        let columns = 1;
        let camMin = 360;
        let aspect = '4 / 3';
        const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ichc-gap')) || 18;
        const stageWidth = Math.max(320, Math.round(stage?.getBoundingClientRect().width || stage?.clientWidth || window.innerWidth - 32));

        let userListWidth = window.innerWidth <= 780
            ? 0
            : densityCount >= 12 ? 168
            : densityCount >= 7 ? 182
            : 198;

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
        const availableHeight = Math.max(
            240,
            Math.round((panel?.clientHeight || stage?.clientHeight || window.innerHeight * 0.72) - hiddenBarHeight - 6),
        );

        if (window.innerWidth > 760 && densityCount > 0) {
            let targetMin = 340;
            let maxColumns = 1;
            let aspectValue = 4 / 3;

            if (densityCount <= 1) {
                targetMin = Math.min(980, Math.max(availableWidth - 4, 460));
                maxColumns = 1;
                aspect = '16 / 10';
                aspectValue = 16 / 10;
            } else if (densityCount <= 2) {
                targetMin = Math.max(300, Math.floor((availableWidth - gap) / 2));
                maxColumns = 2;
                aspect = '16 / 10';
                aspectValue = 16 / 10;
            } else if (densityCount <= 4) {
                targetMin = Math.max(260, Math.floor((availableWidth - gap) / 2));
                maxColumns = 3;
                aspect = '4 / 3';
                aspectValue = 4 / 3;
            } else if (densityCount <= 6) {
                targetMin = Math.max(220, Math.floor((availableWidth - gap * 2) / 3));
                maxColumns = 3;
                aspect = '4 / 3';
                aspectValue = 4 / 3;
            } else if (densityCount <= 9) {
                targetMin = Math.max(185, Math.floor((availableWidth - gap * 2) / 3));
                maxColumns = 4;
                aspect = '1 / 1';
                aspectValue = 1;
            } else {
                targetMin = Math.max(165, Math.floor((availableWidth - gap * 3) / 4));
                maxColumns = 5;
                aspect = '1 / 1';
                aspectValue = 1;
            }

            const maxByWidth = Math.max(1, Math.floor((availableWidth + gap) / (targetMin + gap)));
            const widthEmergencyMax = Math.max(1, Math.floor((availableWidth + gap) / (160 + gap)));
            const maxPossibleColumns = Math.max(1, Math.min(densityCount, maxColumns, Math.max(maxByWidth, 1)));
            const emergencyColumns = Math.max(1, Math.min(densityCount, maxColumns, widthEmergencyMax));
            columns = maxPossibleColumns;

            const estimateHeight = candidateColumns => {
                const cardWidth = Math.max(160, Math.floor((availableWidth - gap * (candidateColumns - 1)) / candidateColumns));
                const cardHeight = Math.max(120, Math.floor(cardWidth / aspectValue));

                if (featuredActive && densityCount > 1) {
                    const remaining = densityCount - 1;
                    const rowsBelow = Math.ceil(remaining / candidateColumns);
                    // Featured card uses 16/9 with max-height clamp(180px, 46vh, 520px).
                    const featuredHeight = Math.min(
                        Math.max(180, Math.floor(availableWidth / (16 / 9))),
                        Math.round(availableHeight * 0.46),
                    );
                    // Thumbnail cards use max-height clamp(90px, 22vh, 220px).
                    const thumbH = Math.min(
                        Math.max(90, Math.floor(
                            Math.max(120, Math.floor((availableWidth - gap * (candidateColumns - 1)) / candidateColumns)) / (4 / 3),
                        )),
                        Math.round(availableHeight * 0.22),
                    );
                    return featuredHeight +
                        (rowsBelow > 0 ? gap : 0) +
                        (rowsBelow * thumbH) +
                        (Math.max(0, rowsBelow - 1) * gap);
                }

                const rows = Math.ceil(densityCount / candidateColumns);
                return rows * cardHeight + Math.max(0, rows - 1) * gap;
            };

            while (columns < emergencyColumns && estimateHeight(columns) > availableHeight) {
                const nextColumns = columns + 1;
                columns = nextColumns;
            }

            if (window.innerWidth > 1100 && measuredCamLane >= 680 && densityCount >= 2) {
                columns = Math.max(columns, Math.min(2, emergencyColumns));
            }
            if (window.innerWidth > 1180 && measuredCamLane >= 1020 && densityCount >= 5) {
                columns = Math.max(columns, Math.min(3, emergencyColumns));
            }
            if (window.innerWidth > 1400 && measuredCamLane >= 1320 && densityCount >= 10) {
                columns = Math.max(columns, Math.min(4, emergencyColumns));
            }

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
        if (cams) {
            cams.style.setProperty('grid-template-columns', `repeat(${columns}, minmax(0, 1fr))`, 'important');
        }
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

        const byKey = new Map(
            getCamCards()
                .filter(card => card.dataset.ichcCam)
                .map(card => [card.dataset.ichcCam, card]),
        );

        loadStoredList(ORDER_KEY).forEach(key => {
            const card = byKey.get(key);
            if (card) { cams.appendChild(card); }
        });
    }

    let _featuredSetAt = 0;

    function applyFeaturedCam() {
        const cams = document.getElementById('cams');
        const featured = (localStorage.getItem(FEATURED_KEY) || '').trim().toLowerCase();
        const columns = Math.max(
            1,
            Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ichc-cam-columns'), 10) || 1,
        );
        let found = false;

        getCamCards().forEach(card => {
            const active = !!featured && card.dataset.ichcCam === featured;
            card.classList.toggle('ichc-featured', active);
            if (active) {
                // Always span the full width so no other cam appears beside the featured one.
                if (columns >= 2) {
                    card.style.setProperty('grid-column', '1 / -1', 'important');
                } else {
                    card.style.removeProperty('grid-column');
                }
                // Use a wide aspect for the featured card so it doesn't eat all vertical space.
                card.style.setProperty('aspect-ratio', '16 / 9', 'important');
                card.style.setProperty('min-height', 'clamp(180px, 36vh, 420px)', 'important');
                card.style.setProperty('max-height', 'clamp(180px, 46vh, 520px)', 'important');
                card.style.removeProperty('min-width');
            } else {
                card.style.removeProperty('grid-column');
                card.style.removeProperty('min-height');
                if (featured) {
                    // Thumbnail row when another cam is focused.
                    card.style.setProperty('aspect-ratio', '4 / 3', 'important');
                    card.style.setProperty('max-height', 'clamp(90px, 22vh, 220px)', 'important');
                } else {
                    card.style.removeProperty('aspect-ratio');
                    card.style.removeProperty('max-height');
                }
            }
            const button = card.querySelector('.ichc-spotlight-btn');
            if (button) {
                button.classList.toggle('ichc-spotlight-active', active);
                button.title = active ? 'Unfocus cam' : 'Focus cam';
                button.setAttribute('aria-label', active ? 'Unfocus cam' : 'Focus cam');
            }
            if (active) { found = true; }
        });

        if (cams) { cams.classList.toggle('ichc-has-featured', found); }

        if (featured && !found && Date.now() - _featuredSetAt > 8000) {
            localStorage.removeItem(FEATURED_KEY);
        }
    }

    function toggleFeatured(card) {
        const key = card.dataset.ichcCam;
        if (!key) { return; }
        _featuredSetAt = Date.now();
        const current = (localStorage.getItem(FEATURED_KEY) || '').trim().toLowerCase();

        if (current === key) {
            localStorage.removeItem(FEATURED_KEY);
        } else {
            localStorage.setItem(FEATURED_KEY, key);
            card.parentElement?.prepend(card);
            saveCurrentOrder();
        }

        applyFeaturedCam();
        updateCamDensity();
        layoutChat();
        window.requestAnimationFrame(() => {
            applyFeaturedCam();
            updateCamDensity();
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
        applyFeaturedCam();
        updateCamDensity();
        updateEmptyCamState();
        buildHiddenCamManager();
    }

    function initCamLayout() {
        const cams = document.getElementById('cams');
        if (!cams || cams.dataset.ichcCamLayout === '1') { return; }
        cams.dataset.ichcCamLayout = '1';

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
        new MutationObserver(() => {
            // Always schedule syncSoon — never skip mutations outright.
            syncSoon();
        }).observe(cams, {
            childList: true,
            subtree: true,
        });

        const panel = document.getElementById('ichc-cams-panel');
        if (panel && typeof ResizeObserver !== 'undefined' && !camLayoutState.panelObserver) {
            let lastPanelWidth = Math.round(panel.getBoundingClientRect().width || panel.clientWidth || 0);
            camLayoutState.panelObserver = new ResizeObserver(entries => {
                const nextWidth = Math.round(entries[0]?.contentRect?.width || panel.getBoundingClientRect().width || panel.clientWidth || 0);
                if (isCamRelayoutSuppressed()) { return; }
                if (Math.abs(nextWidth - lastPanelWidth) < 4) { return; }
                lastPanelWidth = nextWidth;
                requestCamRelayout(30);
            });
            camLayoutState.panelObserver.observe(panel);
        }

        cams.addEventListener('click', event => {
            const toggleButton = event.target.closest('.ichc-cam-toggle-btn');
            if (toggleButton) {
                event.preventDefault();
                event.stopPropagation();

                const card = toggleButton.closest('.rounded_square');
                const nativeToggle = card ? getNativeCamToggleControl(card) : null;
                const actionTarget = nativeToggle?.closest('a, button, [onclick], [href]') || nativeToggle;

                if (actionTarget) {
                    invokeNativeElementAction(actionTarget);
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

        updateCamDensity();

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
            if (userList.dataset.ichcTargetHeight !== targetText) {
                userList.dataset.ichcTargetHeight = targetText;
                userList.style.setProperty('height', target + 'px', 'important');
                userList.style.setProperty('min-height', target + 'px', 'important');
                userList.style.setProperty('max-height', target + 'px', 'important');
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
