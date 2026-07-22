# Day 5 Challenge: Polish + Ship

**Goal:** add the last two features and the finishing touches that turn
"it works" into "it feels great" — live search and dark mode — then do an
accessibility pass and write the docs for your own project.

There's **no new lesson today**. You already know everything you need:
`useState`, `useEffect`, props, and your `useLocalStorage` hook. Today is
about using them to polish what you built. Take it one piece at a time,
and commit after each piece works — just like Day 4.

All your code still lives in `project/src/`.

## Checklist

### 1. Live search

A search box that filters the list **as you type** — like the search box
on your phone's contacts, where the list shrinks with every letter.

You scaffolded a static `SearchBar` back on Day 1. Now make it a
**controlled** component, the same pattern as your `TodoForm`: its `value`
comes from state, and `onChange` reports every keystroke back up to
`App`.

Open `project/src/components/SearchBar.jsx` and make it match this:

```jsx
function SearchBar({ query, onQueryChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="search-input"
        placeholder="Search tasks…"
        aria-label="Search tasks"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
```

Now wire it into `App`. Three small changes:

1. Add a new piece of state near your other `useState` lines:

   ```jsx
   const [query, setQuery] = useState('')
   ```

2. Render `<SearchBar />` **between** the form and the filter tabs, passing
   the state down and the setter as the `onQueryChange` callback:

   ```jsx
   <TodoForm onAdd={addTodo} />
   <SearchBar query={query} onQueryChange={setQuery} />
   <FilterTabs filter={filter} onFilterChange={setFilter} />
   ```

3. Fold the search into the `useMemo` you wrote on Day 4. After the
   filter step, add a second `.filter` that keeps only the tasks whose text
   contains the query, and add `query` to the dependency array:

   ```jsx
   const visibleTodos = useMemo(() => {
     const q = query.trim().toLowerCase()
     return todos
       .filter((t) => {
         if (filter === 'active') return !t.completed
         if (filter === 'completed') return t.completed
         return true
       })
       .filter((t) => t.text.toLowerCase().includes(q))
   }, [todos, filter, query])
   ```

Test it: add a few tasks, type part of one into the search box — the list
narrows live. Clear the box — they all come back. Switch a filter tab
while searching — the two work together.

```sh
git add project/
git commit -m "Add live search"
git push origin main
```

### 2. Dark mode

A 🌙/☀️ button in the header that flips the whole app between light and
dark, and remembers your choice.

Think of the `data-theme` attribute as a **master light switch** for the
whole app: flip that one switch on the `<html>` element, and every CSS
variable repaints the room. The dark colors are **already written for you**
in `index.css` — you never touch the CSS. You just flip the switch.

First, create `project/src/components/ThemeToggle.jsx`:

```jsx
function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle
```

Then show it in the header. Update `project/src/components/Header.jsx` to
take `{ theme, onToggleTheme }` and render the toggle next to the title:

```jsx
import ThemeToggle from './ThemeToggle.jsx'

function Header({ theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div>
        <h1>My Tasks</h1>
        <p className="app-subtitle">Stay on top of your day</p>
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}

export default Header
```

Now the `App` side. Notice you can reuse the **same** `useLocalStorage`
hook you built on Day 4 — that's the whole point of a reusable hook. Add
three things to `App`:

1. A theme value that persists, right next to your `todos` line:

   ```jsx
   const [theme, setTheme] = useLocalStorage('theme', 'light')
   ```

2. A handler that flips it:

   ```jsx
   function toggleTheme() {
     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
   }
   ```

3. An effect that flips the master switch on `<html>` whenever `theme`
   changes:

   ```jsx
   useEffect(() => {
     document.documentElement.setAttribute('data-theme', theme)
   }, [theme])
   ```

Finally, pass `theme` and `onToggleTheme` down to your `Header`:

```jsx
<Header theme={theme} onToggleTheme={toggleTheme} />
```

Test it: click the button — the whole UI switches light/dark. Refresh the
page — your chosen theme (and your tasks) are still there.

```sh
git add project/
git commit -m "Add dark mode toggle"
git push origin main
```

### 3. Empty-state edge case

Double-check one subtle thing: the "No tasks yet" message should show
**only** when you have zero tasks overall — NOT when a filter or a search
just happens to hide everything.

You already handled this on Day 4 by passing `isEmpty={todos.length === 0}`
(the full list) to `TodoList`, while passing `visibleTodos` (the filtered
list) as the tasks to render. So this should already be correct — this
step is a test, not new code.

Test it: add 2 tasks, then type gibberish into the search box. The list
should look empty, but the "No tasks yet" message should **not** appear
(you still have 2 tasks — they're just hidden). If your message does pop
up, fix `TodoList` so the empty-state depends on the full `todos` count,
not the visible list.

Only commit if you had to change something:

```sh
git add project/
git commit -m "Fix empty-state to check the full todo count"
git push origin main
```

### 4. Keyboard + accessibility pass

Good apps work for everyone — including people using a keyboard or a
screen reader. Walk through this list and confirm each one:

- **Enter adds a task** — you get this for free from the `<form>`
  submission in `TodoForm`.
- **Enter and Escape work while editing** — in a todo's edit box, Enter
  saves and Escape cancels (from your Day 4 `TodoItem`). Test both.
- **Every icon-only button has an `aria-label`** — check `todo-check`,
  `todo-delete`, and the new `theme-toggle`. A screen reader reads the
  label out loud, since there's no visible text.
- **Both inputs have an `aria-label`** — the add input (`aria-label="New
  task"`) and the search input (`aria-label="Search tasks"`).
- **Tab order is sensible** — click into the app and press Tab a few
  times. You should move through the theme toggle, the add input and Add
  button, the search box, the filter tabs, and each task's buttons, in an
  order that makes sense, with a **visible focus ring** on whatever's
  selected (the ring is already in the design CSS).

```sh
git add project/
git commit -m "Accessibility and keyboard pass"
git push origin main
```

### 5. Write `project/README.md`

Every real project has a README — a short page that tells the next person
(including future you) what this is and how to run it. Replace the
placeholder text in `project/README.md` with your own. Cover:

- **What the app does** — 2–3 sentences.
- **How to run it** — `npm install`, then `npm run dev`, then open the
  `http://localhost:5173` link it prints.
- **Features** — a bullet list of what it can do.
- **Screenshot (optional)** — if you know how to take one, save it as
  `project/screenshot.png` and add `![screenshot](screenshot.png)`.

Here's a starting template you can adapt:

```markdown
# My Tasks — React Todo App

A clean, fast todo app built with React and Vite. Add tasks, check them
off, edit them inline, filter and search, switch to dark mode — and
everything is saved in your browser, so it's still there after a refresh.

## Run it

```sh
npm install
npm run dev
```

Then open the `http://localhost:5173` link it prints. Stop with Ctrl+C.

## Features

- Add, complete, edit, and delete tasks
- Filter by All / Active / Completed
- Live search as you type
- Clear all completed tasks at once
- Dark mode that remembers your choice
- Everything saved to the browser (survives a refresh)
```

```sh
git add project/
git commit -m "Write project README"
git push origin main
```

## Optional stretch goals (only if you finish early — not required)

These are just for fun. Skip them with a clear conscience — the app is
complete without them.

- **Due dates:** add an `<input type="date">` to the form, store the date
  on each todo object, and show it on the task.
- **Sorting:** add a control to sort tasks by when they were created, or
  by completed-vs-active.
- **Drag to reorder:** look up the HTML5 Drag and Drop API and let the
  user drag tasks into a new order. This one is advanced and more
  involved — a real challenge if you want to push further.

## Where React goes next (read-only — don't build these now)

You've now used the core of React: components, props, `useState`,
`useEffect`, and a custom hook. That's genuinely most of what day-to-day
React is. When you're ready for more someday, here's the map — just so the
words aren't scary when you meet them:

- **Context + `useReducer`** — ways to share state across many components
  without passing props down long chains, and to manage more complex state
  updates in one tidy place.
- **TypeScript** — adds types to your JavaScript so the editor catches a
  whole class of bugs before you ever run the app.
- **A router** (like React Router) — lets a React app have multiple
  "pages" and real URLs, instead of just one screen.

Nothing to do here today. File these away for later.

## Definition of Done (this is the end of the week!)

- [ ] All of Day 1–4's Definition of Done items still pass.
- [ ] Live search narrows the list as you type, and combines correctly
  with the active filter tab.
- [ ] Dark mode toggles the whole app and persists across a refresh.
- [ ] Every icon-only button has an `aria-label`, both inputs have
  `aria-label`s, Enter/Escape work in edit mode, and Tab order is sensible
  with a visible focus ring.
- [ ] The empty-state message shows only when there are truly zero tasks.
- [ ] `project/README.md` is written and accurate.

## Final push

Make sure everything is committed and pushed:

```sh
git status
git push origin main
```

Check your Day 5 box (and the last one!) in the root `README.md`.

**Congratulations — you rebuilt your todo app in React, with search, dark
mode, and persistence. That's a real, modern front-end app.**
