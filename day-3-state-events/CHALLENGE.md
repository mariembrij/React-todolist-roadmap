# Day 3 Challenge: Make Adding, Checking, and Deleting Work

**Goal:** turn your static app into a working one — add real tasks, check
them off, and delete them. Everything lives **in memory** today, which
means a page refresh will wipe your tasks. That's expected! Day 4 adds
saving. Right now we just make it *work*.

By the end, your data and callbacks will flow like this:
`App → TodoList → TodoItem`.

## Warm up first

Before you touch the real app, open `practice.jsx` in this folder and
follow the instructions at the top of that file. It has four tiny
exercises — a counter, a toggle, a live input, and add-to-a-list — that
rehearse exactly what you're about to build. Do those first, then come
back here.

## Step 1 — Give the list real memory

Right now `App.jsx` has a hardcoded `todos` array from Day 2. Replace it
with **state** so the app can change it.

At the top of `project/src/App.jsx`, import `useState`:

```jsx
import { useState } from 'react'
```

Then, inside `App`, delete the hardcoded array and create state instead:

```jsx
// Day 2 (delete this):
// const todos = [ /* ...hardcoded tasks... */ ]

// Day 3:
const [todos, setTodos] = useState([])
```

The list starts empty now, so you'll see the "No tasks yet" empty-state.
That's correct — you're about to add real tasks.

## Step 2 — Teach App to add a task

Add this handler inside `App`, above the `return`:

```jsx
function addTodo(text) {
  const trimmed = text.trim()
  if (trimmed === '') return
  const newTodo = { id: Date.now().toString(), text: trimmed, completed: false }
  setTodos((prev) => [...prev, newTodo])
}
```

- `text.trim()` removes stray spaces; if nothing's left, we `return` and
  do nothing.
- `Date.now().toString()` is a simple unique **id** for the new task.
- `setTodos((prev) => [...prev, newTodo])` adds it *without mutating* — a
  fresh array with the old items plus the new one.

Now hand this function to the form:

```jsx
<TodoForm onAdd={addTodo} />
```

## Step 3 — Make the form controlled

The form doesn't do anything yet. Make it a **controlled** form that calls
`onAdd`. Replace `project/src/components/TodoForm.jsx` with:

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

- The input's `value` comes from `text`; `onChange` keeps `text` in sync.
- On submit we stop the page reload, call `onAdd(text)`, then clear the
  box with `setText('')`.
- `disabled={text.trim() === ''}` greys out the Add button when the box is
  empty.

**Test it:** type a task and press Add (or hit Enter) → it appears and the
box clears. An empty box → the Add button is disabled.

This is your first working piece. Commit and push:

```sh
git add project/src
git commit -m "Add tasks with useState"
git push origin main
```

## Step 4 — Check a task off (toggle)

Add this handler inside `App`:

```jsx
function toggleTodo(id) {
  setTodos((prev) =>
    prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
  )
}
```

It `.map`s over the todos and swaps the matching one for a **new** object
with `completed` flipped.

Now pass it down. In `App`, add `onToggle` where you render the list:

```jsx
<TodoList todos={todos} onToggle={toggleTodo} />
```

Update `project/src/components/TodoList.jsx` to accept and forward it:

```jsx
import TodoItem from './TodoItem.jsx'

function TodoList({ todos, onToggle }) {
  if (todos.length === 0) {
    return <p className="empty-state">No tasks yet. Add your first one above!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  )
}

export default TodoList
```

Update `project/src/components/TodoItem.jsx` to accept `onToggle` and wire
the check button:

```jsx
function TodoItem({ todo, onToggle }) {
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
      <span className="todo-text">{todo.text}</span>
      <button type="button" className="todo-delete" aria-label="Delete task">
        ✕
      </button>
    </li>
  )
}

export default TodoItem
```

**Test it:** click a task's circle → it turns green with a ✓ and the text
strikes through; click again → it goes back.

Commit and push:

```sh
git add project/src
git commit -m "Toggle tasks complete"
git push origin main
```

## Step 5 — Delete a task

Add this handler inside `App`:

```jsx
function deleteTodo(id) {
  setTodos((prev) => prev.filter((t) => t.id !== id))
}
```

`.filter` keeps every task **except** the one whose id matches — a fresh
array without it.

Now thread `onDelete` all the way down:

1. In `App`, add it to the list:

   ```jsx
   <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
   ```

2. In `TodoList.jsx`, add `onDelete` to the props (`{ todos, onToggle,
   onDelete }`) and pass it to each item: `<TodoItem key={todo.id}
   todo={todo} onToggle={onToggle} onDelete={onDelete} />`.

3. In `TodoItem.jsx`, add `onDelete` to the props (`{ todo, onToggle,
   onDelete }`) and wire the ✕ button:

   ```jsx
   <button
     type="button"
     className="todo-delete"
     onClick={() => onDelete(todo.id)}
     aria-label="Delete task"
   >
     ✕
   </button>
   ```

**Test it:** click ✕ on a task → it disappears. Delete them all → the
"No tasks yet" empty-state comes back.

Commit and push:

```sh
git add project/src
git commit -m "Delete tasks"
git push origin main
```

## Definition of Done

- [ ] Typing a task and pressing Add (or Enter) adds it to the list and
  clears the box.
- [ ] The Add button is disabled (greyed) when the box is empty; adding an
  empty or spaces-only task does nothing.
- [ ] Clicking a task's circle toggles it complete — green ✓ and
  strikethrough — and clicking again undoes it.
- [ ] Clicking ✕ deletes that task.
- [ ] When there are no tasks, the "No tasks yet. Add your first one
  above!" empty-state shows.
- [ ] You never changed state directly — every change goes through
  `setTodos` with a **new** array.
- [ ] (Expected) Refreshing the page clears your tasks — that's fine,
  Day 4 adds saving.

You've already pushed each piece. Check your Day 3 box in the root
`README.md`, then move to `day-4-effects-crud/LESSON.md`.
