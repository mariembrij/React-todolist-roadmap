# Design Spec — React Todo List: 5-Day Learning Sprint

**Date:** 2026-07-22
**Status:** Approved (design phase) — ready for implementation plan
**Audience for the deliverable:** a junior intern who has just finished the
`todolist-html-css-js` roadmap (HTML, CSS, and vanilla JavaScript). This is her
first exposure to React.

## 1. Goal

Produce a self-contained repository that teaches the intern React over a
**5-day sprint**, following the exact same pedagogy as the existing
`todolist-html-css-js` course, and ending with a **fully-designed, working,
localStorage-backed React todo app** built with Vite.

The repo contains two things:

1. A **day-by-day learning roadmap** (lessons + challenges) she works through.
2. A **complete, runnable reference app** — the "answer key" and living visual
   target she can run and compare against.

The whole point is continuity: she rebuilds *the same todo app she already
built in vanilla JS*, so the only new thing she has to learn is **React
itself** — not a new design, not a new feature set, not a new styling system.
"Same app, new tool."

## 2. Locked decisions

These were confirmed with the user during brainstorming:

| Decision | Choice | Why |
|---|---|---|
| Deliverable shape | Roadmap **+** finished reference app | Best satisfies "full designed and working" while keeping the learning structure. |
| Language | **Plain JavaScript** (`.jsx`) | Smoothest step from the vanilla JS she just learned; keeps focus on React, not a type system. |
| Styling | **Plain CSS**, reusing the exact vanilla design | Zero new styling concepts → 100% of attention on React. |
| Extra features | **Live search** + **dark-mode toggle** | Chosen by the user. (Due dates and priority/tags were explicitly **not** chosen.) |
| State architecture | Hooks + "lifting state up" + one custom hook (`useLocalStorage`) | The canonical beginner React model; maps 1:1 onto the vanilla version. Context/`useReducer` mentioned only as a Day-5 "next step" horizon. |

## 3. Repository structure

```
React-todolist-roadmap/
  README.md                      root guide (intro, setup, primers, run instructions, week checklist)
  design-spec/
    DESIGN_SPEC.md               colors/fonts/spacing/shapes/layout/states (reused) + search bar + dark-mode palette
  day-1-react-jsx/
    LESSON.md
    CHALLENGE.md
  day-2-props-lists/
    LESSON.md
    CHALLENGE.md
  day-3-state-events/
    LESSON.md
    CHALLENGE.md
    practice.jsx                 warm-up useState exercises
  day-4-effects-crud/
    LESSON.md
    CHALLENGE.md
    practice.jsx                 warm-up useEffect + localStorage exercises
  day-5-polish/
    CHALLENGE.md                 polish day — no new LESSON (matches HTML course's Day 5)
  project/                       Vite-READY scaffold; the intern builds the app HERE
    package.json
    vite.config.js
    index.html
    .gitignore
    README.md                    placeholder; she writes the real one on Day 5
    src/
      main.jsx                   renders <App/>
      App.jsx                    minimal "start here" placeholder
      index.css                  the COMPLETE provided design stylesheet (incl. dark-mode vars)
  reference-app/                 COMPLETE working answer-key app (all features)
    package.json
    vite.config.js
    index.html
    .gitignore
    README.md                    what it is + how to run it
    src/
      main.jsx
      App.jsx
      index.css
      hooks/useLocalStorage.js
      components/
        Header.jsx
        ThemeToggle.jsx
        TodoForm.jsx
        SearchBar.jsx
        FilterTabs.jsx
        TodoList.jsx
        TodoItem.jsx
        Footer.jsx
  docs/superpowers/specs/2026-07-22-react-todolist-roadmap-design.md   (this file)
```

Practice warm-up files live only on the two hook-heavy days (3 & 4), exactly
mirroring how the HTML course placed `practice.js` on its JS-heavy days (3 & 4).

## 4. Final feature set

The reference app — and what the intern ends the week with — supports:

- **Add** a task (controlled input + form submit; empty/whitespace rejected).
- **Toggle complete** (round checkbox → filled green check + strikethrough).
- **Inline edit** a task's text (double-click → input; Enter saves, Escape cancels, blur saves).
- **Delete** a task.
- **Filters:** All / Active / Completed.
- **Clear completed.**
- **Items-left count** (counts not-completed tasks from the full list).
- **Empty state** message — shown only when the full list is truly empty (not when a filter/search merely hides everything).
- **localStorage persistence** — tasks survive a page refresh.
- **Live search** — a text box that filters visible tasks as you type (combines with the active filter).
- **Dark-mode toggle** — light/dark theme, remembered in localStorage under a separate key.
- **Keyboard support** — Enter to add, Enter/Escape in edit mode.
- **Accessibility** — aria-labels on icon-only buttons, a label/aria-label on inputs, visible focus, sensible tab order.

**Out of scope (YAGNI):** due dates, priorities, categories/tags, drag-to-reorder,
routing, multiple lists, backend/API, tests. Day 5 may mention a couple of these
as optional stretch goals, as the HTML course did — but they are not built.

## 5. State & component architecture

**Single source of truth in `App.jsx`:**

```js
const [todos, setTodos] = useLocalStorage("todos", []);   // [{ id, text, completed }]
const [filter, setFilter] = useState("all");              // "all" | "active" | "completed"
const [query, setQuery] = useState("");                   // live search text
const [theme, setTheme] = useLocalStorage("theme", "light"); // "light" | "dark"
```

- **`useLocalStorage(key, initial)`** — the one custom hook. Wraps `useState`
  with lazy initial read from localStorage and a `useEffect` that writes on
  change. Introduced (and extracted) on Day 4.
- **Derived, not stored:** the visible list is computed with `useMemo` from
  `todos` + `filter` + `query`. The items-left count and empty-state flag are
  derived from `todos` directly.
- **Data flow:** `App` passes data down as **props** and passes **callbacks**
  (`onAdd`, `onToggle`, `onEdit`, `onDelete`, `onClearCompleted`, `onFilterChange`,
  `onQueryChange`, `onToggleTheme`) down to children. Children never own todo
  state — this is the "lifting state up" lesson.
- **Immutable updates only:** always `setTodos(prev => ...)` with `.map`,
  `.filter`, or spread — never mutate an object/array in place.
- **Theme application:** `theme` is written to `document.documentElement`'s
  `data-theme` attribute (via `useEffect`); the CSS drives the rest through
  `:root` / `[data-theme="dark"]` variable overrides.

### Component responsibilities

| Component | Does | Key props |
|---|---|---|
| `App` | owns all state, derives the visible list, wires callbacks | — |
| `Header` | title + subtitle + slot for `ThemeToggle` | `theme`, `onToggleTheme` |
| `ThemeToggle` | sun/moon icon button, top-right of header | `theme`, `onToggle` |
| `TodoForm` | controlled add-task input + Add button | `onAdd` |
| `SearchBar` | controlled search input | `query`, `onQueryChange` |
| `FilterTabs` | All/Active/Completed tabs, highlights active | `filter`, `onFilterChange` |
| `TodoList` | maps the visible todos to `TodoItem`s; renders empty state | `todos`, `isEmpty`, callbacks |
| `TodoItem` | one row: checkbox, text (edit mode), delete button | `todo`, `onToggle`, `onEdit`, `onDelete` |
| `Footer` | items-left count + Clear completed button | `itemsLeft`, `onClearCompleted` |

## 6. Design spec (`design-spec/DESIGN_SPEC.md`)

Reuses the existing course's tokens verbatim so the visual result is identical,
then adds what the two new features need.

**Reused from the vanilla course:**

- Colors (light): Background `#F5F6FA`, Card `#FFFFFF`, Border `#E4E7EC`, Text
  `#1F2430`, Muted `#6B7280`, Accent `#6C5CE7`, Accent-hover `#5B4BD6`, Success
  `#22C55E`, Danger `#EF4444`.
- Font: Google **Poppins** (400/500/600/700).
- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32`px.
- Shapes: card `12px`, inputs/buttons `8px`, tabs/checkbox fully round; soft card
  shadow `0 4px 20px rgba(20,20,43,0.06)`.
- Layout: one centered white card, max-width `480px`, vertical stack.
- All interaction states (input focus glow, Add button hover/active/disabled,
  row hover, checkbox checked, delete hover, filter-tab active/inactive).

**Added for this version:**

- **Layout order (updated):** (1) Header with title + subtitle **and a
  theme-toggle button top-right**; (2) add-task form; (3) **search input**
  (full-width, styled like the add input, placeholder "Search tasks…");
  (4) filter tabs; (5) task list; (6) footer.
- **Dark-mode palette** (applied via `[data-theme="dark"]` overriding the
  `:root` CSS variables):
  | Token | Dark value |
  |---|---|
  | Background | `#14151A` |
  | Card | `#1E1F26` |
  | Border | `#2E3038` |
  | Text | `#F5F6FA` |
  | Muted | `#9CA3AF` |
  | Accent | `#6C5CE7` (unchanged) |
  | Accent-hover | `#7C6CF0` |
  | Success | `#22C55E` (unchanged) |
  | Danger | `#EF4444` (unchanged) |
  Theme transitions on `background`/`color` use the same soft `0.15s ease`.
- **Theme toggle button:** round, icon-only (☀️/🌙 or inline SVG), `aria-label="Toggle dark mode"`.

The **runnable `reference-app/` is the living visual target** ("run it to see
exactly what you're building"), the React equivalent of the old static
`reference.html` — but fully interactive.

## 7. The `project/` scaffold ("Vite ready")

Tooling is fully set up so Day 1 is never a fight with configuration:

- `package.json` (React 18 + Vite, `dev`/`build`/`preview` scripts),
  `vite.config.js` (React plugin), `index.html` (with the Poppins `<link>` and
  `<div id="root">`), `.gitignore` (node_modules, dist).
- `src/main.jsx` — standard `createRoot(...).render(<App/>)`.
- `src/App.jsx` — a minimal placeholder: renders a card with a "Start here — see
  `day-1-react-jsx/CHALLENGE.md`" message, so `npm run dev` shows something
  friendly immediately.
- `src/index.css` — the **complete** design stylesheet (light + dark variables,
  all component classes, all states). She never rewrites CSS; she reuses the
  exact design by applying the **same class names** as the vanilla app. The
  dark-mode variables are present from the start; the Day-5 toggle just flips
  `data-theme`, so nothing is spoiled.

`npm install && npm run dev` must work out of the box. She writes every
component and hook herself, following each day's `CHALLENGE.md`.

## 8. The `reference-app/`

A complete, polished copy of the finished app implementing the full feature set
in Section 4, using the architecture in Section 5. It has its own short
`README.md` explaining that it's the answer key / visual target and how to run
it (`npm install && npm run dev`). It shares the identical `index.css` with the
scaffold so the design is guaranteed consistent.

## 9. Root `README.md` outline

Mirrors the warmth and structure of the HTML course's README, adapted for React:

1. **Welcome** — what she'll build (the same todo app, now in React) and reassurance.
2. **What you'll build** (the feature bullet list).
3. **What you'll learn** — Day 1–5 one-liners (React/JSX → props/lists → state/events → effects/persistence → polish).
4. **One-time setup** — fork, clone, **install Node.js (LTS)**, open in VS Code,
   `cd project`, `npm install`, git config.
5. **New-tools primer** — short, analogy-driven: what **npm** is (an app store for
   code), what a **dev server** is (a live preview that auto-refreshes), what
   **Vite** is (the tool that runs it), what a **component** is (a custom HTML tag
   you invent).
6. **Git refresher** — the same 4 commands (status/add/commit/push), same "save-game" analogy.
7. **How each day works** — LESSON first, then CHALLENGE with commit checkpoints; practice files on Days 3 & 4.
8. **How to run your app** — `cd project && npm run dev`, open the printed `localhost` URL.
9. **How to run the reference app** — `cd reference-app && npm install && npm run dev`.
10. **Your week checklist** — the 5 day checkboxes.
11. **Encouragement** — take your time, mistakes are how you learn.

## 10. Per-day content plan

Each `LESSON.md` uses numbered sections, one real-life analogy per concept, short
runnable code snippets, and a Recap. Each `CHALLENGE.md` gives a Goal, exact
component/prop/class names, a checklist, git commit checkpoints after each
working piece, and a Definition of Done. The intern uses the **same class names**
as the vanilla app throughout.

### Day 1 — React + Vite + JSX ("the skeleton, componentized")
- **Lesson:** what React is (build UI from reusable **components**; declarative
  "describe what it should look like, React updates the page"); what Vite/npm/the
  dev server are; **JSX** (HTML-inside-JS, `{expressions}`, `className` not
  `class`, self-closing tags, one root element / Fragments); a component is a
  function returning JSX; composing components; `props` teased.
- **Challenge:** `npm install && npm run dev`; build the **static** component tree
  — `Header`, `TodoForm` (markup only), `SearchBar`, `FilterTabs`, `TodoList`
  with 2–3 hardcoded `TodoItem`s, `Footer` — all hardcoded, no interactivity.
  Same class names as vanilla so it already looks right once CSS is imported.
- **Analogies:** component = a LEGO brick / a custom HTML tag you invent; JSX =
  writing HTML and JS in the same sentence.
- **Commit checkpoints** after the app renders and after each component is split out.

### Day 2 — Props, lists & keys, conditional rendering
- **Lesson:** **props** (data handed into a component, like a coffee order handed
  to the barista); lists with `.map()` and why **`key`** matters (name tags so
  React tracks which row is which); **conditional rendering** (`&&`, ternary,
  early return) for the empty state; `className` + importing `index.css`.
- **Challenge:** import the provided `index.css`; define a hardcoded `todos`
  array in `App`; pass it down through props; render the list via `.map()` with
  `key={todo.id}`; show the empty-state `<p>` conditionally. Still no
  interactivity — data is hardcoded.
- **Definition of Done:** the design matches the spec; the hardcoded list renders;
  removing all array items shows the empty state.

### Day 3 — State & events (`useState`)
- **Lesson:** **`useState`** (a component's short-term memory); the
  render-on-change model (why you call the setter instead of mutating); **event
  handlers** (`onClick`, `onSubmit`, `onChange`); **controlled inputs** (the input
  shows state, typing updates state); **immutable updates** (spread / `.map` /
  `.filter`); **lifting state up** (todos live in `App`, children get callbacks).
- **practice.jsx:** counter, controlled text input, boolean toggle, add-string-to-array.
- **Challenge:** make it work **in memory** — controlled `TodoForm` that adds to
  `todos` on submit (reject empty), toggle complete, delete. No persistence yet;
  a refresh clears everything (that's expected — Day 4 fixes it).
- **Commit checkpoints** after add, after toggle, after delete.

### Day 4 — `useEffect` + localStorage + full CRUD (the biggest day)
- **Lesson:** **`useEffect`** (a note that runs *after* the page is painted; the
  dependency array = "run again only when these change"); reading/writing
  localStorage; **lazy initial state** (`useState(() => ...)`); building **edit
  mode**; deriving the visible list with **`useMemo`**; extracting a **custom
  hook** `useLocalStorage` (reusable stateful logic; "same idea, two values").
- **practice.jsx:** log on mount with `useEffect`; persist a counter to
  localStorage and read it back; a mini `useLocalStorage` sketch.
- **Challenge (one piece at a time, commit after each):** persist with
  `useEffect`; load on start (survives refresh); inline edit (Enter/Escape/blur);
  filters via `useMemo`; clear-completed; then **refactor** the persistence into
  `hooks/useLocalStorage.js` and use it for `todos`.
- **Definition of Done:** full CRUD + filters + clear-completed all work and
  survive a refresh; items-left and empty-state always correct.

### Day 5 — Polish: search, dark mode, accessibility, docs (no new lesson)
- **Challenge:**
  1. **Live search** — wire `SearchBar` to `query` state; fold it into the
     `useMemo` visible-list derivation (search + filter combine).
  2. **Dark-mode toggle** — `ThemeToggle` in the header; `theme` persisted via
     `useLocalStorage`; a `useEffect` sets `data-theme` on `<html>`; the CSS does
     the rest.
  3. **Empty-state edge case** — shows only when `todos` is truly empty, not when
     search/filter hides everything.
  4. **Keyboard + a11y pass** — Enter/Escape in edit; aria-labels on icon buttons;
     input labels; visible focus; sensible tab order.
  5. **Write `project/README.md`** — what the app does, how to run it (`npm
     install`, `npm run dev`), optional screenshot.
  6. **"Where React goes next" note** — one short paragraph naming Context +
     `useReducer`, TypeScript, and routing as future horizons (not built).
- **Optional stretch goals** (not required): due dates, drag-to-reorder — same
  spirit as the HTML course's stretch section.
- **Definition of Done:** all Day 1–4 DoD still pass; search + dark mode work and
  dark mode persists across refresh; accessible; `project/README.md` written.

## 11. Tone & pedagogy commitments (unchanged from the HTML course)

- Beginner-friendly, warm, encouraging; assume no prior React knowledge.
- Exactly one real-life analogy per new concept.
- Short, runnable code snippets; exact names specified so later days depend on them.
- `git add` / `commit` / `push` checkpoints throughout, with good example messages.
- Definition-of-Done checklist at the end of every challenge.
- Reuse the **same class names and design** as the vanilla app for a strong
  "same app, new tool" bridge.

## 12. Success criteria (Definition of Done for the whole deliverable)

- [ ] Repo structure of Section 3 exists.
- [ ] `cd project && npm install && npm run dev` runs and shows the "start here" placeholder.
- [ ] `cd reference-app && npm install && npm run dev` runs and shows the complete, fully-featured, styled app; all features in Section 4 work and persist across refresh; dark mode and live search work.
- [ ] Root `README.md` covers everything in Section 9, with clear run instructions.
- [ ] `design-spec/DESIGN_SPEC.md` documents the reused tokens + search bar + dark-mode palette.
- [ ] Each of Days 1–4 has a `LESSON.md` + `CHALLENGE.md`; Days 3 & 4 have `practice.jsx`; Day 5 has `CHALLENGE.md`.
- [ ] Every challenge has exact names, commit checkpoints, and a Definition of Done.
- [ ] Following the challenges in order reproduces the reference app's behavior.

## 13. Open questions

None — all decisions in Section 2 are locked.
