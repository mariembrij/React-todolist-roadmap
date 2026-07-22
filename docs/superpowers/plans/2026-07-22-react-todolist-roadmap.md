# React Todo List 5-Day Sprint — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a self-contained repository that teaches an intern React over a 5-day sprint (lessons + challenges), plus a complete runnable reference app, ending in a fully-designed, localStorage-backed React todo app built with Vite.

**Architecture:** Two independent Vite + React (plain JS) apps in the same repo — `project/` (a "Vite-ready" scaffold the intern fills in) and `reference-app/` (the complete answer key). Both share the identical design stylesheet reused verbatim from the existing `todolist-html-css-js` course. State lives in `App.jsx` via hooks (`useState` + a `useLocalStorage` custom hook), flows down through props, and the visible list is derived with `useMemo`. Surrounding the apps are day-by-day `LESSON.md`/`CHALLENGE.md` docs mirroring the vanilla course's pedagogy.

**Tech Stack:** React 18, Vite 5, `@vitejs/plugin-react`, plain JavaScript (`.jsx`), plain CSS, browser `localStorage`. No test framework (tests are out of scope per the spec).

## Global Constraints

- **React version:** `react` `^18.3.1`, `react-dom` `^18.3.1`. **Vite:** `^5.3.1`. **Plugin:** `@vitejs/plugin-react` `^4.3.1`.
- **Language:** plain JavaScript only — `.jsx` / `.js`. No TypeScript, no `.tsx`.
- **Styling:** plain CSS. `index.css` is the vanilla course's design reused verbatim, extended only with: header flex layout, `.theme-toggle`, `.search-bar`/`.search-input`, `.todo-edit-input`, `.empty-state`, and a `:root[data-theme="dark"]` palette. Same **class names** as the vanilla app everywhere.
- **Design tokens (light):** bg `#F5F6FA`, card `#FFFFFF`, border `#E4E7EC`, text `#1F2430`, muted `#6B7280`, accent `#6C5CE7`, accent-hover `#5B4BD6`, success `#22C55E`, danger `#EF4444`. Font: Google **Poppins** (400/500/600/700). Spacing: `4/8/12/16/24/32`px. Radii: card `12px`, input `8px`, pill `9999px`. Shadow: `0 4px 20px rgba(20,20,43,0.06)`.
- **Design tokens (dark, `:root[data-theme="dark"]`):** bg `#14151A`, card `#1E1F26`, border `#2E3038`, text `#F5F6FA`, muted `#9CA3AF`, accent `#6C5CE7`, accent-hover `#7C6CF0`, success `#22C55E`, danger `#EF4444`.
- **localStorage keys:** `"todos"` (array of `{ id, text, completed }`) and `"theme"` (`"light"` | `"dark"`).
- **Todo shape:** `{ id: string, text: string, completed: boolean }`. `id = Date.now().toString()`.
- **Pedagogy (all docs):** beginner-friendly, encouraging; one real-life analogy per new concept; short runnable snippets; exact names specified; a `git add`/`commit`/`push` checkpoint after each working piece; a "Definition of Done" checklist ending each challenge. Reuse the same class names/design as the vanilla app ("same app, new tool").
- **`project/` scaffold rule:** tooling is ready and `npm install && npm run dev` works out of the box, but the scaffold's `main.jsx` does **not** import `index.css` and `App.jsx` is only a plain placeholder — the intern wires the import and builds all components herself. The reference-app's `main.jsx` **does** import `index.css`.

---

## File Structure

**`reference-app/`** (complete working app):
- `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `README.md`
- `src/main.jsx` — imports `index.css`, renders `<App/>`
- `src/index.css` — full design stylesheet
- `src/App.jsx` — owns state, derives visible list, wires callbacks
- `src/hooks/useLocalStorage.js` — the custom hook
- `src/components/` — `Header.jsx`, `ThemeToggle.jsx`, `TodoForm.jsx`, `SearchBar.jsx`, `FilterTabs.jsx`, `TodoList.jsx`, `TodoItem.jsx`, `Footer.jsx`

**`project/`** (intern's scaffold):
- `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `README.md` (placeholder)
- `src/main.jsx` — renders `<App/>`, **no** css import
- `src/App.jsx` — plain placeholder
- `src/index.css` — identical copy of the reference stylesheet (provided, ready to import)

**Docs & roadmap:**
- `README.md` (root), `.gitignore` (root)
- `design-spec/DESIGN_SPEC.md`
- `day-1-react-jsx/{LESSON.md,CHALLENGE.md}`
- `day-2-props-lists/{LESSON.md,CHALLENGE.md}`
- `day-3-state-events/{LESSON.md,CHALLENGE.md,practice.jsx}`
- `day-4-effects-crud/{LESSON.md,CHALLENGE.md,practice.jsx}`
- `day-5-polish/CHALLENGE.md`

---

## Task 1: Reference app — Vite project boots

**Files:**
- Create: `reference-app/package.json`, `reference-app/vite.config.js`, `reference-app/index.html`, `reference-app/.gitignore`, `reference-app/src/main.jsx`, `reference-app/src/App.jsx` (temporary), `reference-app/src/index.css` (empty placeholder for now)

**Interfaces:**
- Produces: a bootable Vite app. `src/main.jsx` mounts `<App/>` into `#root` and imports `./index.css`.

- [ ] **Step 1: Create `reference-app/package.json`**

```json
{
  "name": "react-todo-reference",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.3.1"
  }
}
```

- [ ] **Step 2: Create `reference-app/vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: Create `reference-app/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Tasks — React Todo (Reference)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `reference-app/.gitignore`**

```
node_modules
dist
```

- [ ] **Step 5: Create `reference-app/src/main.jsx`**

```jsx
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(<App />)
```

- [ ] **Step 6: Create a temporary `reference-app/src/App.jsx`**

```jsx
function App() {
  return <h1>Reference app boots ✅</h1>
}

export default App
```

- [ ] **Step 7: Create an empty `reference-app/src/index.css`** (single comment line; real content in Task 2)

```css
/* Design stylesheet — filled in Task 2 */
```

- [ ] **Step 8: Install and verify build**

Run: `cd reference-app && npm install && npm run build`
Expected: install completes; build prints `✓ built in …` and creates `dist/` with no errors.

- [ ] **Step 9: Commit**

```bash
git add reference-app
git commit -m "feat: scaffold reference-app Vite project"
```

---

## Task 2: Reference app — the design stylesheet (`index.css`)

**Files:**
- Modify (replace): `reference-app/src/index.css`

**Interfaces:**
- Produces: all CSS classes the components rely on: `.app-card`, `.app-header`, `.app-subtitle`, `.theme-toggle`, `.todo-form`, `.todo-input`, `.add-btn`, `.search-bar`, `.search-input`, `.filter-tabs`, `.filter-tab`(`.active`), `.todo-list`, `.todo-item`(`.completed`), `.todo-check`(`.checked`), `.todo-text`, `.todo-edit-input`, `.todo-delete`, `.empty-state`, `.app-footer`, `.clear-btn`. Dark palette via `:root[data-theme="dark"]`.

- [ ] **Step 1: Write the complete `reference-app/src/index.css`**

```css
:root {
  --color-bg: #F5F6FA;
  --color-card: #FFFFFF;
  --color-border: #E4E7EC;
  --color-text: #1F2430;
  --color-text-muted: #6B7280;
  --color-accent: #6C5CE7;
  --color-accent-hover: #5B4BD6;
  --color-success: #22C55E;
  --color-danger: #EF4444;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --radius-card: 12px;
  --radius-input: 8px;
  --radius-pill: 9999px;
  --shadow-card: 0 4px 20px rgba(20, 20, 43, 0.06);
}

:root[data-theme="dark"] {
  --color-bg: #14151A;
  --color-card: #1E1F26;
  --color-border: #2E3038;
  --color-text: #F5F6FA;
  --color-text-muted: #9CA3AF;
  --color-accent: #6C5CE7;
  --color-accent-hover: #7C6CF0;
  --color-success: #22C55E;
  --color-danger: #EF4444;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  padding: var(--space-6) var(--space-4);
  background: var(--color-bg);
  font-family: 'Poppins', sans-serif;
  color: var(--color-text);
  transition: background 0.15s ease, color 0.15s ease;
}

#root {
  display: flex;
  justify-content: center;
}

.app-card {
  width: 100%;
  max-width: 480px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: var(--space-6);
  transition: background 0.15s ease, border-color 0.15s ease;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
}

.app-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.app-subtitle {
  margin: var(--space-1) 0 var(--space-5);
  color: var(--color-text-muted);
  font-size: 14px;
}

.theme-toggle {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.theme-toggle:hover { background: var(--color-bg); }

.todo-form {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.todo-input {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-input);
  background: var(--color-card);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-text);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.todo-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);
}

.add-btn {
  padding: var(--space-3) var(--space-5);
  border: none;
  border-radius: var(--radius-input);
  background: var(--color-accent);
  color: #fff;
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease;
}

.add-btn:hover { background: var(--color-accent-hover); }
.add-btn:active { transform: scale(0.97); }
.add-btn:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.search-bar { margin-bottom: var(--space-4); }

.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-input);
  background: var(--color-card);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-text);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.search-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);
}

.filter-tabs {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.filter-tab {
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text-muted);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.filter-tab:hover { background: var(--color-bg); }

.filter-tab.active {
  background: var(--color-accent);
  color: #fff;
}

.todo-list {
  list-style: none;
  margin: 0 0 var(--space-4);
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.todo-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-input);
  transition: background 0.15s ease;
}

.todo-item:hover { background: var(--color-bg); }

.todo-check {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-pill);
  border: 2px solid var(--color-border);
  background: var(--color-card);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 12px;
  line-height: 1;
  color: #fff;
}

.todo-check.checked {
  background: var(--color-success);
  border-color: var(--color-success);
}

.todo-text {
  flex: 1;
  font-size: 14px;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--color-text-muted);
}

.todo-edit-input {
  flex: 1;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-input);
  background: var(--color-card);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-text);
  outline: none;
}

.todo-delete {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius-input);
  cursor: pointer;
  font-size: 14px;
  transition: background 0.15s ease, color 0.15s ease;
}

.todo-delete:hover {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
}

.empty-state {
  margin: 0 0 var(--space-4);
  padding: var(--space-5);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 14px;
}

.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-muted);
}

.clear-btn {
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
}

.clear-btn:hover { color: var(--color-danger); }
```

- [ ] **Step 2: Verify build still succeeds**

Run: `cd reference-app && npm run build`
Expected: `✓ built in …`, no errors.

- [ ] **Step 3: Commit**

```bash
git add reference-app/src/index.css
git commit -m "feat: add full design stylesheet with dark mode to reference-app"
```

---

## Task 3: Reference app — components, custom hook, and wired App

**Files:**
- Create: `reference-app/src/hooks/useLocalStorage.js`
- Create: `reference-app/src/components/{Header,ThemeToggle,TodoForm,SearchBar,FilterTabs,TodoList,TodoItem,Footer}.jsx`
- Modify (replace): `reference-app/src/App.jsx`

**Interfaces:**
- Consumes: classes from Task 2.
- Produces: the complete working app. Key signatures used by the day docs:
  - `useLocalStorage(key, initialValue)` → `[value, setValue]`
  - Handlers in `App`: `addTodo(text)`, `toggleTodo(id)`, `editTodo(id, newText)`, `deleteTodo(id)`, `clearCompleted()`, `toggleTheme()`
  - Component props: `Header({theme,onToggleTheme})`, `ThemeToggle({theme,onToggle})`, `TodoForm({onAdd})`, `SearchBar({query,onQueryChange})`, `FilterTabs({filter,onFilterChange})`, `TodoList({todos,isEmpty,onToggle,onEdit,onDelete})`, `TodoItem({todo,onToggle,onEdit,onDelete})`, `Footer({itemsLeft,onClearCompleted})`

- [ ] **Step 1: Create `reference-app/src/hooks/useLocalStorage.js`**

```js
import { useState, useEffect } from 'react'

// Like useState, but it also reads its initial value from localStorage
// and writes back every time the value changes.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored !== null ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

- [ ] **Step 2: Create `reference-app/src/components/ThemeToggle.jsx`**

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

- [ ] **Step 3: Create `reference-app/src/components/Header.jsx`**

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

- [ ] **Step 4: Create `reference-app/src/components/TodoForm.jsx`**

```jsx
import { useState } from 'react'

function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        aria-label="New task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-btn" disabled={text.trim() === ''}>
        Add
      </button>
    </form>
  )
}

export default TodoForm
```

- [ ] **Step 5: Create `reference-app/src/components/SearchBar.jsx`**

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

- [ ] **Step 6: Create `reference-app/src/components/FilterTabs.jsx`**

```jsx
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

function FilterTabs({ filter, onFilterChange }) {
  return (
    <div className="filter-tabs">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          type="button"
          className={f.key === filter ? 'filter-tab active' : 'filter-tab'}
          onClick={() => onFilterChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}

export default FilterTabs
```

- [ ] **Step 7: Create `reference-app/src/components/TodoItem.jsx`**

```jsx
import { useState, useRef } from 'react'

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  // A little flag that survives re-renders. When the user presses Escape we
  // set it so the blur that fires as the input disappears knows NOT to save.
  const cancelRef = useRef(false)

  function startEditing() {
    setDraft(todo.text)
    cancelRef.current = false
    setIsEditing(true)
  }

  function finishEditing() {
    if (cancelRef.current) {
      cancelRef.current = false
    } else {
      onEdit(todo.id, draft)
    }
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      finishEditing()
    } else if (e.key === 'Escape') {
      cancelRef.current = true
      setIsEditing(false)
    }
  }

  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <button
        type="button"
        className={todo.completed ? 'todo-check checked' : 'todo-check'}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed ? '✓' : ''}
      </button>

      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={finishEditing}
        />
      ) : (
        <span className="todo-text" onDoubleClick={startEditing}>
          {todo.text}
        </span>
      )}

      <button
        type="button"
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
```

- [ ] **Step 8: Create `reference-app/src/components/TodoList.jsx`**

```jsx
import TodoItem from './TodoItem.jsx'

function TodoList({ todos, isEmpty, onToggle, onEdit, onDelete }) {
  if (isEmpty) {
    return <p className="empty-state">No tasks yet. Add your first one above!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
```

- [ ] **Step 9: Create `reference-app/src/components/Footer.jsx`**

```jsx
function Footer({ itemsLeft, onClearCompleted }) {
  return (
    <footer className="app-footer">
      <span>
        {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left
      </span>
      <button type="button" className="clear-btn" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
```

- [ ] **Step 10: Replace `reference-app/src/App.jsx`**

```jsx
import { useState, useEffect, useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TodoList from './components/TodoList.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function addTodo(text) {
    const trimmed = text.trim()
    if (trimmed === '') return
    const newTodo = { id: Date.now().toString(), text: trimmed, completed: false }
    setTodos((prev) => [...prev, newTodo])
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function editTodo(id, newText) {
    const trimmed = newText.trim()
    if (trimmed === '') return
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)))
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

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

  const itemsLeft = todos.filter((t) => !t.completed).length

  return (
    <main className="app-card">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <TodoForm onAdd={addTodo} />
      <SearchBar query={query} onQueryChange={setQuery} />
      <FilterTabs filter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={visibleTodos}
        isEmpty={todos.length === 0}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
      <Footer itemsLeft={itemsLeft} onClearCompleted={clearCompleted} />
    </main>
  )
}

export default App
```

- [ ] **Step 11: Verify build**

Run: `cd reference-app && npm run build`
Expected: `✓ built in …`, no errors.

- [ ] **Step 12: Verify behavior in the browser**

Run: `cd reference-app && npm run dev`, open the printed `http://localhost:5173` URL. Confirm, in order:
1. Card is styled (Poppins font, purple Add button, centered white card).
2. Type a task + Add → it appears; input clears; empty-state gone.
3. Empty input → Add button is disabled (grey).
4. Click the circle → turns green ✓, text strikes through; items-left count drops.
5. Double-click text → edit box; Enter saves; Escape cancels (reverts); clicking away saves.
6. ✕ deletes a task.
7. Filter tabs All/Active/Completed narrow the list; active tab is purple.
8. Type in search → list narrows live; combines with the active filter.
9. Clear completed removes checked tasks.
10. Toggle the 🌙/☀️ button → whole UI switches light/dark.
11. Refresh the page → tasks AND chosen theme persist.
12. Delete all tasks → "No tasks yet" empty-state shows; but with tasks present, switching to a filter/search that matches none shows an empty list WITHOUT the empty-state message.

Stop the dev server (Ctrl+C) when done.

- [ ] **Step 13: Commit**

```bash
git add reference-app/src
git commit -m "feat: implement full reference todo app (CRUD, filters, search, dark mode, persistence)"
```

---

## Task 4: Project scaffold — Vite-ready starter the intern fills in

**Files:**
- Create: `project/package.json`, `project/vite.config.js`, `project/index.html`, `project/.gitignore`, `project/README.md`, `project/src/main.jsx`, `project/src/App.jsx`, `project/src/index.css`

**Interfaces:**
- Consumes: the finished `reference-app/src/index.css` (copied verbatim).
- Produces: a bootable scaffold that shows an **unstyled** placeholder (no css import in `main.jsx`), with `index.css` present and ready for the intern to import on Day 2.

- [ ] **Step 1: Create `project/package.json`** (same as reference, different name)

```json
{
  "name": "react-todo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.3.1"
  }
}
```

- [ ] **Step 2: Create `project/vite.config.js`** (identical to reference)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: Create `project/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Tasks — React Todo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `project/.gitignore`**

```
node_modules
dist
```

- [ ] **Step 5: Create `project/src/main.jsx`** (NOTE: no css import — the intern adds it on Day 2)

```jsx
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
```

- [ ] **Step 6: Create `project/src/App.jsx`** (plain placeholder)

```jsx
function App() {
  return (
    <main>
      <h1>My Tasks</h1>
      <p>
        👋 Start here — open <code>day-1-react-jsx/CHALLENGE.md</code> and build
        the app right here in the <code>src/</code> folder.
      </p>
    </main>
  )
}

export default App
```

- [ ] **Step 7: Copy the design stylesheet into `project/src/index.css`**

Run: `cp reference-app/src/index.css project/src/index.css`
Expected: `project/src/index.css` is byte-for-byte identical to the reference stylesheet.

- [ ] **Step 8: Create `project/README.md`** (placeholder the intern rewrites on Day 5)

```markdown
# My Tasks — React Todo App

_This is a placeholder. You'll replace it with your own README on Day 5._

## Run this project

```sh
npm install
npm run dev
```

Then open the `http://localhost:5173` link it prints.
```

- [ ] **Step 9: Install and verify the scaffold boots (unstyled placeholder)**

Run: `cd project && npm install && npm run build`
Expected: install + build succeed with no errors.
(Optional visual check: `npm run dev` shows a plain, unstyled "My Tasks / Start here" page — unstyled is correct for Day 1.)

- [ ] **Step 10: Commit**

```bash
git add project
git commit -m "feat: add Vite-ready project scaffold for the intern"
```

---

## Task 5: `design-spec/DESIGN_SPEC.md`

**Files:**
- Create: `design-spec/DESIGN_SPEC.md`

**Interfaces:**
- Consumes: the token values in Global Constraints and the running `reference-app`.

- [ ] **Step 1: Write `design-spec/DESIGN_SPEC.md`** with these sections (content must match Global Constraints exactly):
  1. **Intro** — "This is the exact look your app should have. The best way to see it: run the reference app (`cd reference-app && npm install && npm run dev`) and click around — it's the living version of everything described here."
  2. **Colors (light)** — a table of the 9 light tokens (name / hex / used-for), copied from Global Constraints.
  3. **Colors (dark)** — a table of the dark palette; explain it's applied by setting `data-theme="dark"` on the `<html>` element and that the CSS variables do the rest.
  4. **Font** — Poppins (400/500/600/700) with the exact `<link>` tags.
  5. **Spacing scale** — `4/8/12/16/24/32`px.
  6. **Shapes** — card `12px`, input/button `8px`, tabs/checkbox/theme-toggle pill `9999px`, soft card shadow value.
  7. **Layout** — one centered white card, max-width `480px`, vertical stack in this order: (1) header (title + subtitle + **theme-toggle button top-right**), (2) add-task form, (3) **search input**, (4) filter tabs, (5) task list, (6) footer.
  8. **States** — reuse the vanilla list verbatim (input focus glow; Add button normal/hover/active/disabled; row hover; checkbox unchecked/checked; delete hover; filter-tab active/inactive/hover) and add: **search input** focus glow (same as add input); **theme-toggle** hover tint; **edit input** accent border.
  9. **Reference** — "`reference-app/` is the real, interactive version of this design. Run it and compare as you build."

- [ ] **Step 2: Commit**

```bash
git add design-spec/DESIGN_SPEC.md
git commit -m "docs: add design spec (reused tokens + dark palette + search bar)"
```

---

## Task 6: Root `README.md` and root `.gitignore`

**Files:**
- Create: `README.md`, `.gitignore`

**Interfaces:**
- Consumes: the `project/` and `reference-app/` npm scripts from Tasks 1 & 4.

- [ ] **Step 1: Create root `.gitignore`**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 2: Write root `README.md`** with these sections (mirror the warm tone of the vanilla course's README):
  1. **Welcome** — she'll rebuild the same todo app she already built, now in React; reassurance that not knowing React yet is fine.
  2. **What you will build** — bullet list: add, complete, edit, delete, filter, clear-completed, **live search**, **dark mode**, and everything saved in the browser so it survives refresh.
  3. **What you will learn** — Day 1 React + Vite + JSX; Day 2 props, lists & keys; Day 3 state & events (`useState`); Day 4 effects, localStorage & full CRUD (`useEffect` + a custom hook); Day 5 polish (search, dark mode, accessibility, docs). Plus more git practice.
  4. **One-time setup** — (a) fork; (b) clone (`git clone https://github.com/YourUserName/React-todolist-roadmap.git && cd React-todolist-roadmap`); (c) **install Node.js LTS** from nodejs.org (explain: Node lets you run JavaScript tools outside the browser; check with `node -v` and `npm -v`); (d) open in VS Code; (e) `cd project && npm install`; (f) `git config --global user.name/user.email`.
  5. **New tools, in plain words** — short analogy-driven definitions: **npm** = an app store for reusable code (`npm install` downloads what your app needs into `node_modules/`); **a dev server** = a live preview of your app that auto-refreshes when you save; **Vite** = the fast tool that runs that dev server; **a component** = a custom HTML tag you invent, made from a JavaScript function.
  6. **Git refresher** — the same 4 commands (`git status`/`add`/`commit -m`/`push origin main`) with the save-game analogy and good-vs-bad commit message examples.
  7. **How each day works** — read `LESSON.md` first, then do `CHALLENGE.md` (commit when it says to); Days 3 & 4 have a `practice.jsx` warm-up (copy it into `project/src/`, temporarily render `<Practice/>` from `main.jsx`, then switch back to `<App/>`); Day 5 is polish only. All her code lives in `project/src/`.
  8. **How to run YOUR app** — `cd project && npm run dev`, then open the printed `http://localhost:5173` link; stop with Ctrl+C.
  9. **How to run the REFERENCE app** — `cd reference-app && npm install && npm run dev`; this is the finished version to compare against.
  10. **Your week checklist** — 5 unchecked boxes (Day 1 … Day 5), each ending "done and pushed".
  11. **Encouragement** — take your time; mistakes are how you learn.

- [ ] **Step 3: Commit**

```bash
git add README.md .gitignore
git commit -m "docs: add root README and gitignore"
```

---

## Task 7: Day 1 — React + Vite + JSX

**Files:**
- Create: `day-1-react-jsx/LESSON.md`, `day-1-react-jsx/CHALLENGE.md`

- [ ] **Step 1: Write `day-1-react-jsx/LESSON.md`** — opening line: "Today you meet React and build the skeleton of your app out of components — like yesterday's HTML skeleton, but assembled from reusable pieces you invent." Numbered sections, one analogy each:
  1. **What is React?** — a library for building UIs from reusable **components**; it's *declarative* — you describe what the screen should look like for the current data, and React updates the page for you (analogy: a thermostat — you set the target, it handles the adjusting).
  2. **What are Vite, npm, and the dev server?** — npm = app store for code; Vite = the tool that runs a live-preview **dev server** that auto-refreshes on save (analogy: a mirror that updates instantly as you change clothes). Show `npm install` then `npm run dev`.
  3. **JSX — HTML inside JavaScript** — snippet `const el = <h1>Hello</h1>`; rules: **one root element** (wrap siblings in a `<>…</>` Fragment), `className` instead of `class`, self-close tags (`<input />`), put JavaScript in `{curly braces}` (`<h1>{title}</h1>`). Analogy: JSX = writing the HTML and the JS in the same sentence.
  4. **A component is a function that returns JSX** — snippet:
     ```jsx
     function Header() {
       return <h1>My Tasks</h1>
     }
     export default Header
     ```
     Rule: component names start with a **Capital letter**. Analogy: a component = a custom LEGO brick / a tag you invented.
  5. **Composing components** — snippet showing `<App>` rendering `<Header />` and `<Footer />`; explain nesting and `import`/`export default`.
  6. **How the app starts** — `index.html` has `<div id="root">`; `main.jsx` calls `createRoot(...).render(<App />)`. She won't edit this today.
  7. **Recap** — components, JSX rules, one root element, `className`, `{expressions}`, composition.

- [ ] **Step 2: Write `day-1-react-jsx/CHALLENGE.md`**:
  - **Goal:** get the scaffold running and build the **static** component tree (no interactivity, hardcoded content). It will look plain today (no CSS until Day 2).
  - **Setup step:** `cd project && npm install && npm run dev`; open the printed link; confirm the placeholder page shows.
  - **Build steps** — create in `project/src/components/` (create the folder), each a function returning JSX, using the **exact class names**:
    - `Header.jsx` → `<header className="app-header"><div><h1>My Tasks</h1><p className="app-subtitle">Stay on top of your day</p></div></header>`
    - `TodoForm.jsx` → `<form className="todo-form"><input className="todo-input" placeholder="What do you need to do?" /><button className="add-btn">Add</button></form>` (no behavior yet)
    - `SearchBar.jsx` → `<div className="search-bar"><input type="search" className="search-input" placeholder="Search tasks…" /></div>`
    - `FilterTabs.jsx` → a `<div className="filter-tabs">` with three `<button className="filter-tab">` (mark the first `filter-tab active`): All / Active / Completed
    - `TodoList.jsx` → a `<ul className="todo-list">` with **2–3 hardcoded** `<li className="todo-item">` rows, each: `<button className="todo-check" aria-label="Mark complete"></button><span className="todo-text">Buy milk</span><button className="todo-delete" aria-label="Delete task">✕</button>` (make one row `todo-item completed` with a `todo-check checked` containing `✓`)
    - `Footer.jsx` → `<footer className="app-footer"><span>2 items left</span><button className="clear-btn">Clear completed</button></footer>`
    - Update `project/src/App.jsx` to import and render all six inside `<main className="app-card">`.
  - **Definition of Done:** `npm run dev` runs without errors; the page shows header, form, search box, three filter buttons, a few task rows, and a footer — all hardcoded, unstyled, nothing clickable yet. Every component is its own file with a Capital-letter name and `export default`.
  - **Commit checkpoints:** after the app renders the imported components (`"Build static component tree for todo app"`), then `git push origin main`. Tick the Day 1 box in the root README.

- [ ] **Step 3: Commit**

```bash
git add day-1-react-jsx
git commit -m "docs: add Day 1 React + JSX lesson and challenge"
```

---

## Task 8: Day 2 — Props, lists & keys, conditional rendering

**Files:**
- Create: `day-2-props-lists/LESSON.md`, `day-2-props-lists/CHALLENGE.md`

- [ ] **Step 1: Write `day-2-props-lists/LESSON.md`** — opening: "Yesterday your components had hardcoded text. Today they receive their data from outside as **props**, you turn an array of tasks into a list on screen, and you make the app match the design." Sections:
  1. **Importing CSS** — `import './index.css'` inside `main.jsx` (one line) makes the whole stylesheet apply; explain the design is already written for you — you just reuse the same class names.
  2. **Props — data handed into a component** — analogy: a coffee order you hand the barista. Snippet:
     ```jsx
     function Welcome({ name }) {
       return <h1>Hello, {name}</h1>
     }
     // used as: <Welcome name="Ana" />
     ```
     Explain destructuring `{ name }` and that props are read-only.
  3. **Rendering a list with `.map()`** — snippet turning `todos.map(t => <li key={t.id}>{t.text}</li>)`; explain `.map` builds one element per item.
  4. **Why `key` matters** — analogy: name tags so React can tell which row is which when the list changes; use a stable unique id (`todo.id`), never the array index if the list can reorder.
  5. **Conditional rendering** — three tools: `{cond && <X/>}`, `{cond ? <A/> : <B/>}`, and early `return` (a component can `return` the empty-state early). Snippet for empty state.
  6. **Passing many props / passing a whole object** — `<TodoItem todo={todo} />` then read `todo.text` inside.
  7. **Recap** — import CSS, props (read-only, destructured), `.map` + `key`, conditional rendering.

- [ ] **Step 2: Write `day-2-props-lists/CHALLENGE.md`**:
  - **Goal:** make the app match the design, and render a list from a **hardcoded data array** passed through props. Still no interactivity.
  - **Steps:**
    1. Add `import './index.css'` to `project/src/main.jsx`. Save → the app is now styled. (Commit: `"Apply the design stylesheet"`.)
    2. In `App.jsx`, define a hardcoded array, e.g. `const todos = [{ id: '1', text: 'Buy milk', completed: false }, { id: '2', text: 'Read the React lesson', completed: true }]`.
    3. Create `TodoItem.jsx` taking `{ todo }`; render one row (`li.todo-item`, adding `completed` class and a `✓` in the check when `todo.completed`), using `todo.text`.
    4. Change `TodoList.jsx` to take `{ todos }` and `todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)`.
    5. Pass `todos` from `App` → `TodoList`.
    6. In `TodoList`, when `todos.length === 0` return `<p className="empty-state">No tasks yet. Add your first one above!</p>` instead of the `<ul>`.
  - **Definition of Done:** app matches the design spec (compare with the reference app); the two hardcoded tasks render, the completed one has a green check + strikethrough; emptying the array shows the empty-state message; `key` is set to `todo.id`.
  - **Commit checkpoints:** after styling applied, after the list renders from props (`"Render todo list from props with .map and keys"`), push. Tick Day 2.

- [ ] **Step 3: Commit**

```bash
git add day-2-props-lists
git commit -m "docs: add Day 2 props, lists, and keys lesson and challenge"
```

---

## Task 9: Day 3 — State & events (`useState`)

**Files:**
- Create: `day-3-state-events/LESSON.md`, `day-3-state-events/CHALLENGE.md`, `day-3-state-events/practice.jsx`

- [ ] **Step 1: Write `day-3-state-events/LESSON.md`** — opening: "So far your data never changes. Today your components get **memory** with `useState`, and start reacting to clicks and typing." Sections:
  1. **State — a component's memory** — analogy: a whiteboard the component can read and rewrite; when it's rewritten, React repaints. Snippet:
     ```jsx
     import { useState } from 'react'
     const [count, setCount] = useState(0)
     ```
     Explain the pair: current value + a setter.
  2. **Never change state directly** — always call the setter (`setCount(count + 1)`), never `count++`; that's how React knows to re-render. Analogy: don't scribble on the whiteboard behind React's back — hand it the new value.
  3. **Events** — `onClick`, `onSubmit`, `onChange`; pass a function, don't call it (`onClick={handleClick}` not `onClick={handleClick()}`); `e.preventDefault()` on form submit.
  4. **Controlled inputs** — the input's `value` comes from state and `onChange` updates it; snippet of a controlled text box. Analogy: the input and the state are two ends of the same rope.
  5. **Updating arrays without mutating** — add with spread `[...todos, newItem]`, remove with `.filter`, change one with `.map`; each returns a **new** array you pass to the setter.
  6. **Lifting state up** — the todos live in `App` (the shared parent); children receive the data as props and receive **callback functions** (`onAdd`, `onToggle`, `onDelete`) to ask the parent to change it. Analogy: the parent holds the remote; children press buttons that are wired back to it.
  7. **Recap.**

- [ ] **Step 2: Write `day-3-state-events/practice.jsx`** (self-contained warm-up component stubs):

```jsx
// Day 3 Practice — warm up BEFORE the challenge.
// HOW TO RUN THIS:
//   1. Copy this file into your app:  project/src/Practice.jsx
//   2. In project/src/main.jsx, temporarily render <Practice /> instead of <App />:
//        import Practice from './Practice.jsx'
//        createRoot(document.getElementById('root')).render(<Practice />)
//   3. Run `npm run dev` and try your answers live in the browser.
//   4. When you're done, switch main.jsx back to rendering <App />.

import { useState } from 'react'

// 1) COUNTER
// Make the button show a number that goes up by 1 each click.
// Use useState. Start at 0.
function Counter() {
  // TODO: your work here
  return <button>clicked 0 times</button>
}

// 2) TOGGLE
// Make the button flip between "ON" and "OFF" each time you click it.
function Toggle() {
  // TODO: your work here
  return <button>OFF</button>
}

// 3) CONTROLLED INPUT
// Make the paragraph show, live, whatever is typed in the box.
function Echo() {
  // TODO: your work here (hint: value={...} and onChange)
  return (
    <div>
      <input placeholder="type here" />
      <p>You typed: </p>
    </div>
  )
}

// 4) ADD TO A LIST
// Type a word, click Add, and show it in the list below.
// Add WITHOUT mutating: setItems([...items, newWord]).
function WordList() {
  // TODO: your work here
  return (
    <div>
      <input placeholder="a word" />
      <button>Add</button>
      <ul></ul>
    </div>
  )
}

export default function Practice() {
  return (
    <div style={{ padding: 24, display: 'grid', gap: 24, fontFamily: 'sans-serif' }}>
      <Counter />
      <Toggle />
      <Echo />
      <WordList />
    </div>
  )
}
```

- [ ] **Step 3: Write `day-3-state-events/CHALLENGE.md`**:
  - **Goal:** make the app work **in memory** — add, complete, and delete real tasks. (Not saved yet — a refresh clears everything. Day 4 fixes that.)
  - **Steps (commit after each works):**
    1. In `App.jsx`, replace the hardcoded array with state: `const [todos, setTodos] = useState([])`.
    2. Write `addTodo(text)` in `App`: trim; if empty, return; else `setTodos(prev => [...prev, { id: Date.now().toString(), text: trimmed, completed: false }])`. Pass it to `TodoForm` as `onAdd`. (Commit: `"Add tasks with useState"`.)
    3. Make `TodoForm` a **controlled** form: local `const [text, setText] = useState('')`; input `value={text}` + `onChange`; on submit `e.preventDefault()`, call `onAdd(text)`, then `setText('')`. Disable the Add button when `text.trim() === ''`.
    4. Write `toggleTodo(id)` in `App` (`.map` flipping `completed`); pass to items as `onToggle`; wire the check button `onClick={() => onToggle(todo.id)}`. (Commit: `"Toggle tasks complete"`.)
    5. Write `deleteTodo(id)` in `App` (`.filter`); pass as `onDelete`; wire the ✕ button. (Commit: `"Delete tasks"`.)
  - Note that props now flow `App → TodoList → TodoItem` for the data and the callbacks.
  - **Definition of Done:** typing + Add adds a task and clears the box; empty add is rejected and the button is disabled; clicking the circle toggles complete (green ✓ + strikethrough); ✕ deletes; the empty-state shows when the list is empty. (A refresh still clears tasks — expected today.)
  - **Commit checkpoints** as above, then push. Tick Day 3.

- [ ] **Step 4: Commit**

```bash
git add day-3-state-events
git commit -m "docs: add Day 3 state and events lesson, practice, and challenge"
```

---

## Task 10: Day 4 — Effects, localStorage & full CRUD

**Files:**
- Create: `day-4-effects-crud/LESSON.md`, `day-4-effects-crud/CHALLENGE.md`, `day-4-effects-crud/practice.jsx`

- [ ] **Step 1: Write `day-4-effects-crud/LESSON.md`** — opening: "Today is the big one: your tasks survive a refresh, you can edit them, filters work, and you package the saving logic into your own reusable hook." Sections:
  1. **`useEffect` — run code after the screen updates** — analogy: a sticky note that says "after you finish painting, also do this." Snippet:
     ```jsx
     useEffect(() => {
       document.title = `${count} tasks`
     }, [count]) // re-runs only when count changes
     ```
     Explain the **dependency array**: `[]` = once after first render; `[x]` = whenever `x` changes; omitted = after every render (usually not what you want).
  2. **Saving to `localStorage`** — `localStorage.setItem(key, JSON.stringify(value))` and `JSON.parse(localStorage.getItem(key))`; it only stores strings, hence JSON. Analogy: a drawer in the browser that survives closing the tab.
  3. **Loading once, lazily** — `useState(() => { const s = localStorage.getItem('todos'); return s ? JSON.parse(s) : [] })`; explain the function form runs only on the first render.
  4. **Custom hooks — bottle up reusable logic** — a function starting with `use` that calls other hooks; show the full `useLocalStorage(key, initialValue)` (same code as `reference-app/src/hooks/useLocalStorage.js`) and explain each part. Analogy: a labelled recipe you can reuse for both `todos` and (later) `theme`.
  5. **Editing a task** — needs a piece of "am I editing?" state on the row; briefly show the edit pattern (Enter saves, Escape cancels, blur saves) and point to the challenge for the exact snippet, including the one-line reason for the `useRef` cancel-flag.
  6. **Deriving the visible list with `useMemo`** — filtering doesn't need its own state; compute it from `todos` + `filter`. `useMemo(() => …, [todos, filter])` avoids recomputing when nothing changed. Analogy: don't store the filtered list in a second drawer — recompute it from the one source of truth.
  7. **Recap.**

- [ ] **Step 2: Write `day-4-effects-crud/practice.jsx`**:

```jsx
// Day 4 Practice — warm up BEFORE the challenge.
// Run it the same way as Day 3: copy to project/src/Practice.jsx, render
// <Practice /> from main.jsx temporarily, `npm run dev`, then switch back.

import { useState, useEffect } from 'react'

// 1) EFFECT ON MOUNT
// Log "Component appeared!" to the console ONCE, when this component first shows.
// (Open the browser console to see it. It should log once — not on every keystroke.)
function Hello() {
  // TODO: add a useEffect with an empty [] dependency array
  return <p>Open the console.</p>
}

// 2) PERSIST A COUNTER
// Make this counter REMEMBER its value across page refreshes using localStorage.
//   - read the saved value when setting up state (lazy initial state)
//   - write to localStorage in a useEffect whenever it changes
function StickyCounter() {
  // TODO: your work here
  return <button>count: 0</button>
}

// 3) MINI useLocalStorage
// Finish this custom hook so StickyCounter could use it as:
//   const [count, setCount] = useLocalStorage('practice-count', 0)
function useLocalStorage(key, initialValue) {
  // TODO: your work here — read lazily, write in an effect, return [value, setValue]
}

export default function Practice() {
  return (
    <div style={{ padding: 24, display: 'grid', gap: 24, fontFamily: 'sans-serif' }}>
      <Hello />
      <StickyCounter />
    </div>
  )
}
```

- [ ] **Step 3: Write `day-4-effects-crud/CHALLENGE.md`**:
  - **Goal:** full CRUD + filters + persistence; then refactor saving into a custom hook.
  - **Steps (commit after each works):**
    1. **Persist + load:** add `useEffect(() => localStorage.setItem('todos', JSON.stringify(todos)), [todos])`, and change the todos state to lazy-load: `useState(() => { const s = localStorage.getItem('todos'); return s ? JSON.parse(s) : [] })`. Test: add tasks, refresh — they stay. (Commit: `"Save and load todos with localStorage"`.)
    2. **Edit:** replace `TodoItem.jsx` with the edit-capable version (give the exact code below). Add `editTodo(id, newText)` in `App` (trim; ignore empty; `.map`) and pass as `onEdit`. (Commit: `"Edit task text inline"`.)

       ```jsx
       import { useState, useRef } from 'react'

       function TodoItem({ todo, onToggle, onEdit, onDelete }) {
         const [isEditing, setIsEditing] = useState(false)
         const [draft, setDraft] = useState(todo.text)
         const cancelRef = useRef(false) // so the blur after Escape knows not to save

         function startEditing() {
           setDraft(todo.text)
           cancelRef.current = false
           setIsEditing(true)
         }
         function finishEditing() {
           if (cancelRef.current) {
             cancelRef.current = false
           } else {
             onEdit(todo.id, draft)
           }
           setIsEditing(false)
         }
         function handleKeyDown(e) {
           if (e.key === 'Enter') finishEditing()
           else if (e.key === 'Escape') { cancelRef.current = true; setIsEditing(false) }
         }

         return (
           <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
             <button
               type="button"
               className={todo.completed ? 'todo-check checked' : 'todo-check'}
               onClick={() => onToggle(todo.id)}
               aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
             >
               {todo.completed ? '✓' : ''}
             </button>
             {isEditing ? (
               <input
                 type="text"
                 className="todo-edit-input"
                 value={draft}
                 autoFocus
                 onChange={(e) => setDraft(e.target.value)}
                 onKeyDown={handleKeyDown}
                 onBlur={finishEditing}
               />
             ) : (
               <span className="todo-text" onDoubleClick={startEditing}>{todo.text}</span>
             )}
             <button type="button" className="todo-delete" onClick={() => onDelete(todo.id)} aria-label="Delete task">✕</button>
           </li>
         )
       }

       export default TodoItem
       ```
    3. **Filters:** add `const [filter, setFilter] = useState('all')`; make `FilterTabs` take `{ filter, onFilterChange }`, render the three tabs from an array, put the `active` class on the matching one, call `onFilterChange(key)` on click; in `App`, compute `const visibleTodos = useMemo(() => todos.filter(...by filter...), [todos, filter])` and pass `visibleTodos` to `TodoList` while keeping `isEmpty={todos.length === 0}`. (Commit: `"Filter tasks by all/active/completed"`.)
    4. **Clear completed + items-left:** add `clearCompleted()` (`.filter(t => !t.completed)`) wired to the footer; compute `const itemsLeft = todos.filter(t => !t.completed).length` and pass to `Footer`. (Commit: `"Add clear-completed and items-left count"`.)
    5. **Refactor to a custom hook:** create `project/src/hooks/useLocalStorage.js` (exact code from the lesson), then in `App` replace the manual todos state+effect with `const [todos, setTodos] = useLocalStorage('todos', [])`. Confirm everything still works and still persists. (Commit: `"Extract useLocalStorage custom hook"`.)
  - **Definition of Done:** add/toggle/edit/delete/filter/clear all work and **survive a full refresh**; items-left counts only not-completed tasks; the empty-state shows only when there are truly zero tasks; `useLocalStorage` is used for todos.
  - Push. Tick Day 4.

- [ ] **Step 4: Commit**

```bash
git add day-4-effects-crud
git commit -m "docs: add Day 4 effects, localStorage, and CRUD lesson, practice, and challenge"
```

---

## Task 11: Day 5 — Polish: search, dark mode, accessibility, docs

**Files:**
- Create: `day-5-polish/CHALLENGE.md`

- [ ] **Step 1: Write `day-5-polish/CHALLENGE.md`** (polish day — no new lesson, matching the vanilla course):
  - **Goal:** add the last two features and the finishing touches that turn "it works" into "it feels great," then write your docs.
  - **Checklist (commit after each):**
    1. **Live search:** create `SearchBar.jsx` (`{ query, onQueryChange }`, a controlled `type="search"` input with `className="search-input"` inside `div.search-bar`); add `const [query, setQuery] = useState('')` in `App`; render `<SearchBar query={query} onQueryChange={setQuery} />` between the form and the filter tabs; fold search into the `useMemo`: after the filter step, also `.filter(t => t.text.toLowerCase().includes(query.trim().toLowerCase()))`. (Commit: `"Add live search"`.)
    2. **Dark mode:** create `ThemeToggle.jsx` (`{ theme, onToggle }`, a `button.theme-toggle` showing 🌙/☀️ with `aria-label="Toggle dark mode"`); render it in `Header` (`{ theme, onToggleTheme }`); in `App` add `const [theme, setTheme] = useLocalStorage('theme', 'light')`, a `toggleTheme()` that flips it, and `useEffect(() => document.documentElement.setAttribute('data-theme', theme), [theme])`. The dark CSS is already in `index.css`. Test: toggle, then refresh — theme persists. (Commit: `"Add dark mode toggle"`.)
    3. **Empty-state edge case:** confirm the "No tasks yet" message shows only when `todos.length === 0`, NOT when a filter/search merely hides everything (add 2 tasks, search gibberish → list is empty but no message). (Commit if you had to fix it.)
    4. **Keyboard + accessibility pass:** Enter adds (free from the form) and Enter/Escape work in edit; every icon-only button (`todo-check`, `todo-delete`, `theme-toggle`) has an `aria-label`; the add and search inputs have `aria-label`s; Tab through the app — focus order is sensible and the focus ring is visible. (Commit: `"Accessibility and keyboard pass"`.)
    5. **Write `project/README.md`** (replace the placeholder): what the app does (2–3 sentences); how to run it (`npm install`, `npm run dev`, open the link); the features list; optional screenshot (`project/screenshot.png` + `![screenshot](screenshot.png)`). (Commit: `"Write project README"`.)
    6. **Where React goes next (read-only):** a short closing note in the challenge naming, as future horizons (NOT to build now): Context + `useReducer` (share state without passing props down long chains), TypeScript (add types to catch bugs), and a router (multiple pages).
  - **Optional stretch goals (not required):** due dates (`<input type="date">` stored per todo), sort by created/completed, drag-to-reorder (HTML5 Drag & Drop — advanced).
  - **Definition of Done (end of week!):** all Day 1–4 DoD still pass; live search narrows the list and combines with filters; dark mode works and persists; accessibility items above are done; `project/README.md` is written and accurate.
  - Final push. Tick the last box. Closing line: "Congratulations — you rebuilt your todo app in React, with search, dark mode, and persistence. That's a real, modern front-end app."

- [ ] **Step 2: Commit**

```bash
git add day-5-polish
git commit -m "docs: add Day 5 polish challenge"
```

---

## Task 12: Final verification & consistency pass

**Files:**
- Modify: any file needing a fix uncovered here.

- [ ] **Step 1: Both apps build clean**

Run: `cd reference-app && npm run build` then `cd project && npm run build`
Expected: both print `✓ built in …` with no errors.

- [ ] **Step 2: Reference app behaves end-to-end**

Run: `cd reference-app && npm run dev`. Re-verify the 12-point checklist from Task 3, Step 12 (add/toggle/edit/Escape-cancel/delete/filters/search/clear/dark-mode/persist-on-refresh/empty-state edge case). Stop the server after.

- [ ] **Step 3: Cross-check docs against the reference app**

Confirm every class name, component name, prop name, handler name, and localStorage key mentioned in the Day 1–5 docs, the design spec, and the READMEs matches the reference app exactly:
- classes: `app-card app-header app-subtitle theme-toggle todo-form todo-input add-btn search-bar search-input filter-tabs filter-tab(.active) todo-list todo-item(.completed) todo-check(.checked) todo-text todo-edit-input todo-delete empty-state app-footer clear-btn`
- handlers/props: `onAdd onToggle onEdit onDelete onClearCompleted onFilterChange onQueryChange onToggleTheme`, `useLocalStorage(key, initialValue)`, keys `"todos"`/`"theme"`.
Fix any mismatch inline.

- [ ] **Step 4: Cross-check run commands**

Confirm the root README's run commands (`cd project && npm install && npm run dev`; `cd reference-app && npm install && npm run dev`) and the week checklist (5 items) are correct and consistent with the day challenges.

- [ ] **Step 5: Confirm the tree matches the plan**

Run: `find . -type f -not -path './.git/*' -not -path '*/node_modules/*' -not -path '*/dist/*' | sort`
Expected: matches the File Structure section (all docs, both apps, spec).

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "chore: final consistency pass across docs and apps"
```

---

## Self-Review (completed by plan author)

**Spec coverage:** Every spec section maps to a task — repo structure → all tasks; feature set → Task 3 (reference) + Days 3–5; state architecture → Task 3 + Days 3–4; design spec → Tasks 2 & 5; scaffold → Task 4; reference app → Tasks 1–3; README → Task 6; per-day content → Tasks 7–11; success criteria → Task 12.

**Placeholder scan:** Code artifacts are complete and verbatim. Prose docs (lessons/challenges/README/design-spec) are specified section-by-section with the exact analogies, snippets, names, DoD items, and commit messages — no "TBD"/"add error handling"-style gaps.

**Type/name consistency:** Class names, component names, prop/handler names, hook signature, and localStorage keys are identical across the reference app (Task 3), scaffold CSS (Task 4), design spec (Task 5), and day docs (Tasks 7–11); Task 12 Step 3 re-verifies this against the running app.
