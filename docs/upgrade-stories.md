# Dependency Upgrade Stories (Backlog)

Major upgrades that were **deliberately deferred** during the 2026-06 dependency
sweep. The app runs correctly on the current versions; each of these is a real
migration, not a version bump, so they are tracked here as backlog stories rather
than done blindly.

The safe + tooling upgrades from that sweep (Vite 7, TypeScript 6, ESLint 9 flat
config, husky 9, removing `ua-parser-js`, in-range patches) are already merged.

_Last reviewed: 2026-06-21._

---

## Story 1 — React 18 → 19 (paired with styled-components 5 → 6)

**Status:** deferred / backlog.

**Current → target:** `react`/`react-dom` 18.3.1 → 19.x, `@types/react`(-dom) 18 → 19,
`styled-components` 5.3.11 → 6.x.

**Why deferred:** the app works on React 18, and React 19 + styled-components 6 are
both breaking majors that have to move **together** (sc6's prop handling assumes the
newer React). This is a coordinated migration with a wide surface, not a bump.

**Scope / what's involved:**

- **React 19:** ref-as-prop (the `forwardRef` story changes), removed legacy APIs,
  stricter effect/StrictMode semantics. `@vitejs/plugin-react` 6 + the React Compiler
  peer tooling become relevant (we stayed on plugin-react 5 precisely to avoid this).
- **styled-components 6:** changed prop forwarding — custom props are no longer
  auto-forwarded to the DOM (transient `$`-props are the new convention). This app
  spreads the whole `Theme` object via `{...theme}` into many styled components; under
  sc6 the non-DOM props (`keywordColor`, etc.) get filtered from the DOM (which
  actually removes today's potential unknown-prop warnings) but the pattern should be
  reviewed deliberately. sc6 also changes the `as` prop, drops the babel macro, and
  ships its own types (so `@types/styled-components` would be removed).

**Risks:** broad — every styled component, every ref/effect. Visual regressions and
prop-forwarding surprises are the main hazards.

**Effort:** ~1 day on a branch, with full visual QA across themes and the audio/canvas
flow.

**Acceptance:** `npm run build` + `npm run lint` pass; all browser flows work on
React 19 + sc6 (sort animation, PLAY → audio, mute/unmute, theme switching, themed
icons); no console prop-forwarding warnings.

---

## Story 2 — CodeMirror 5 → 6

**Status:** deferred / backlog.

**Current → target:** `codemirror` 5.65.x → 6.x (the scoped `@codemirror/*` packages),
`@types/codemirror` retired.

**Why deferred:** CodeMirror 6 is a **complete rewrite** with a different architecture
(`@codemirror/state`, `@codemirror/view`, `EditorState`/`EditorView`), not an upgrade.

**Scope / what's involved:**

- Rewrite `CodeArea` from CM5's imperative `Codemirror(dom, {value, mode, theme})` to a
  CM6 `EditorView` + extensions (`@codemirror/lang-javascript`, line wrapping, a theme).
- **The hard part:** the app derives its entire color palette from the editor. CM5
  ships ~60 **CSS** themes, and `Theme/functions.ts#queryTheme` reads the _computed_
  colors of `.cm-keyword` / `.cm-variable` / … token elements out of a hidden second
  editor (`themeMirror`). CM6 themes are JS extensions, not CSS classes, and don't
  expose token colors this way — so the whole "read the palette out of the editor"
  mechanism (and the 60-theme picker) would have to be redesigned.

**Risks:** very high — it touches `queryTheme`, which drives the colors of the bars,
menu, and icons across the entire app, plus the 60-theme selector.

**Effort:** several days — effectively a feature rebuild of `CodeArea` + the theme
engine. Not worth it unless CM5 becomes unmaintained or develops a real security issue.

**Acceptance:** code display and the 60-theme palette extraction behave identically;
the app's derived colors (bars/menu/icons) still track the selected theme.

---

## Also intentionally left as-is

- **CI `npm audit` scope** (`--omit=dev`): the remaining advisories live in
  `semantic-release`'s bundled dev tooling (a vendored `npm`/`undici`), never ship in
  the static bundle, and are not fixable via `npm audit fix`. Production deps are
  audited at `high`. Revisit if a real shipped-dependency advisory appears.
