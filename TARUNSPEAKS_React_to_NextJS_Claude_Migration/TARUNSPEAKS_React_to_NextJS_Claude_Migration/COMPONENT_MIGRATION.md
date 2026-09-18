# Component Migration

Reuse the current components where possible.

Server Components: static/data-driven content.

Client Components: only where required for state, effects, event handlers, browser APIs, interactive widgets, or browser-only libraries.

Keep client boundaries small. Do not add `"use client"` to entire pages without a concrete reason.
