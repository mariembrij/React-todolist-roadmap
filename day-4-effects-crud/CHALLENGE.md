# Day 4 Challenge: Effects, Saving & Full CRUD

**Goal:** make the app fully work — add, complete, edit, delete, filter,
and clear completed — with everything surviving a page refresh. Then
refactor the saving logic into your own reusable hook. This is the
biggest day. Take it one piece at a time, and commit after each piece
works.

## Warm up first

Before you start, warm up with `day-4-effects-crud/practice.jsx`. Copy it
into `project/src/Practice.jsx`, temporarily render `<Practice />` from
`main.jsx` (just like Day 3), run `npm run dev`, and finish the three
exercises. Then switch `main.jsx` back to `<App />`. Those exercises
(`useEffect`, a counter that remembers itself, and a mini
`useLocalStorage`) are exactly today's ideas in miniature.

## 1. Persist and load your tasks

Right now a refresh wipes everything. Let's save to the browser's drawer.

- At the top of `App.jsx`, add `useEffect` to your React import:
  `import { useState, useEffect } from 'react'`.
- Change your todos state to **lazy-load** from `localStorage`:
  ```jsx
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos')
    return stored ? JSON.parse(stored) : []
  })
  ```
- Just below your state, add an effect that saves on every change:
  ```jsx
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  ```
- **Test it:** add a couple of tasks, then refresh the page. They should
  still be there.

```sh
git add project/src
git commit -m "Save and load todos with localStorage"
```

## 2. Edit a task's text

Add the ability to double-click a task and rewrite it.

- Add an `editTodo(id, newText)` handler in `App` (trim, and ignore an
  empty result):
  ```jsx
  function editTodo(id, newText) {
    const trimmed = newText.trim()
    if (trimmed === '') return
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)))
  }
  ```
- Replace the **entire** contents of
  `project/src/components/TodoItem.jsx` with this edit-capable version:

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
- Thread the new callback down: in `TodoList.jsx`, add `onEdit` to its
  props and pass `onEdit={onEdit}` to each `<TodoItem>`; in `App`, pass
  `onEdit={editTodo}` to `<TodoList>`.
- **Test it:** double-click a task → a text box appears. Enter or
  clicking away saves the change; Escape cancels and keeps the original.

```sh
git add project/src
git commit -m "Edit task text inline"
```

## 3. Make the filter tabs work

Right now the tabs are just for show. Let's wire them up — without
storing a second list.

- Add filter state in `App`: `const [filter, setFilter] = useState('all')`.
- Replace `project/src/components/FilterTabs.jsx` so it takes
  `{ filter, onFilterChange }` and renders the three tabs from an array
  (this reuses the `.map` + `key` you learned on Day 2):
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
- In `App`, add `useMemo` to your React import
  (`import { useState, useEffect, useMemo } from 'react'`) and derive the
  visible list:
  ```jsx
  const visibleTodos = useMemo(() => {
    return todos.filter((t) => {
      if (filter === 'active') return !t.completed
      if (filter === 'completed') return t.completed
      return true
    })
  }, [todos, filter])
  ```
- Update the render:
  - Give `FilterTabs` its props:
    `<FilterTabs filter={filter} onFilterChange={setFilter} />`.
  - Pass the derived list to `TodoList`, but keep the empty-state tied to
    the **full** list:
    `<TodoList todos={visibleTodos} isEmpty={todos.length === 0} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />`.
- Update `TodoList.jsx` to take an `isEmpty` prop and show the
  empty-state from it (instead of checking `todos.length` itself):
  ```jsx
  function TodoList({ todos, isEmpty, onToggle, onEdit, onDelete }) {
    if (isEmpty) {
      return <p className="empty-state">No tasks yet. Add your first one above!</p>
    }
    // ...the same <ul className="todo-list"> with todos.map(...) as before
  }
  ```
- **Test it:** click All / Active / Completed — the list narrows and the
  active tab turns purple. With tasks present, switching to a filter that
  matches none shows an **empty list but no "No tasks yet" message**
  (that message is only for a truly empty list).

```sh
git add project/src
git commit -m "Filter tasks by all/active/completed"
```

## 4. Clear completed + the items-left count

Wire up the footer you built on Day 1.

- Add a `clearCompleted()` handler in `App`:
  ```jsx
  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }
  ```
- Compute the count of unfinished tasks (from the **full** list, not the
  filtered one):
  ```jsx
  const itemsLeft = todos.filter((t) => !t.completed).length
  ```
- Update `Footer.jsx` to take `{ itemsLeft, onClearCompleted }`, show the
  count, and call `onClearCompleted` from the button:
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
- Pass both props in `App`:
  `<Footer itemsLeft={itemsLeft} onClearCompleted={clearCompleted} />`.
- **Test it:** the count drops as you check tasks off; "Clear completed"
  removes every checked task.

```sh
git add project/src
git commit -m "Add clear-completed and items-left count"
```

## 5. Refactor: extract the `useLocalStorage` custom hook

You now have save/load logic you'll want to reuse for other data. Bottle
it up into your own hook.

- Create the folder `project/src/hooks/`, then create
  `project/src/hooks/useLocalStorage.js` with this exact code:
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
- In `App.jsx`, import it at the top:
  `import { useLocalStorage } from './hooks/useLocalStorage.js'`.
- Replace your manual todos state **and** the saving `useEffect` from
  step 1 with a single line:
  ```jsx
  const [todos, setTodos] = useLocalStorage('todos', [])
  ```
  Delete the `localStorage` effect you added in step 1 — the hook does
  that for you now. You can also drop `useEffect` from your React import
  (you'll still keep `useState` and `useMemo`).
- **Test it:** everything still works, and tasks still survive a refresh
  — you just moved the plumbing into a reusable hook.

```sh
git add project/src
git commit -m "Extract useLocalStorage custom hook"
```

## Definition of Done

- [ ] Adding, toggling complete, editing, deleting, filtering, and
  clearing completed all work.
- [ ] After a full page refresh, all your tasks and their
  completed/not-completed state are exactly as you left them.
- [ ] The "items left" count shows only NOT-completed tasks, counted from
  the full list (not the filtered view).
- [ ] The "No tasks yet" empty-state shows only when there are truly zero
  tasks — not when a filter merely hides everything.
- [ ] Editing: Enter and clicking away save; Escape cancels and keeps the
  original text.
- [ ] Your todos use `useLocalStorage('todos', [])`, and
  `project/src/hooks/useLocalStorage.js` exists.

## Push your work

```sh
git push origin main
```

Check your Day 4 box in the root `README.md`, then move to
`day-5-polish/CHALLENGE.md`.
