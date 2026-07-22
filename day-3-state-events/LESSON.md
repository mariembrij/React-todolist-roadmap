# Day 3: State & Events — Making It React

So far your data never changes. Today your components get **memory** with
`useState`, and start reacting to clicks and typing. This is the day your
app stops being a picture and starts being a program.

## 1. State — a component's memory

Imagine each component has a small **whiteboard** it can read from and
write to. When you rewrite the whiteboard, React notices and repaints the
screen to match. That whiteboard is called **state**.

You create a piece of state with the `useState` hook:

```jsx
import { useState } from 'react'

const [count, setCount] = useState(0)
```

- `useState(0)` — `0` is the **starting value**.
- It hands you back a **pair**: the current value and a function to change
  it. The square brackets just give those two things names.
- `count` is the current value (read it anywhere you like).
- `setCount` is the **setter** — call it to write a new value on the
  whiteboard, which tells React to repaint.

## 2. Never change state directly

Only the setter tells React to repaint. If you edit the value yourself,
you're scribbling on the whiteboard behind React's back — the value
changes, but the screen never updates.

```jsx
setCount(count + 1) // ✅ React sees the change and repaints
count++             // ❌ value changes, but the screen does not
```

When the new value is built from the old one, hand the setter a small
function instead. `prev` is the latest value:

```jsx
setCount((prev) => prev + 1)
```

You'll use this `prev` form for your todos today.

## 3. Events — responding to clicks and typing

An **event** is like a doorbell: you wire up what should happen when the
bell rings, but you never ring it yourself. React lets you wire handlers
with props like `onClick`, `onChange`, and `onSubmit`.

```jsx
function handleClick() {
  console.log('clicked!')
}

<button onClick={handleClick}>Click me</button>
```

One rule that trips everyone up: **pass the function, don't call it.**

- `onClick={handleClick}` — hand React the function; it calls it on click.
- `onClick={handleClick()}` — ❌ this runs it *immediately* while
  rendering, which is not what you want.

Forms have one extra wrinkle: submitting a form makes the browser try to
reload the page. Stop that with `e.preventDefault()`:

```jsx
function handleSubmit(e) {
  e.preventDefault() // stop the browser from reloading the page
  // ...do your thing
}

<form onSubmit={handleSubmit}> ... </form>
```

## 4. Controlled inputs

An input box and a piece of state can be tied together like **two ends of
the same rope** — pull one and the other follows. The input shows what's
in state, and every keystroke updates that state.

```jsx
const [text, setText] = useState('')

<input
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

- `value={text}` — what's in the box comes **from** state.
- `onChange` fires on every keystroke; `e.target.value` is the new text,
  and `setText` writes it back to state, which repaints the box.

State is now the single source of truth for what's typed. Want to clear
the box? Just `setText('')`.

## 5. Updating arrays without mutating

Your todos live in an array, and React only repaints when you hand it a
**brand-new** array — not the same one with edits. So instead of erasing
and rewriting on the same shopping list, you make a fresh copy with the
change already on it. Three moves cover everything:

```jsx
// ADD — spread the old items, then the new one
setTodos((prev) => [...prev, newTodo])

// REMOVE — keep everything except the one you don't want
setTodos((prev) => prev.filter((t) => t.id !== id))

// CHANGE ONE — map, swapping the match for a NEW object
setTodos((prev) =>
  prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
)
```

Never use `todos.push(...)` or `t.completed = true`. Those edit the old
array or object in place, and React won't notice.

## 6. Lifting state up

Who should own the todos? Think of the parent component (`App`) as holding
the **remote**: it owns the list. The children are the buttons on that
remote — they can't change the channel by themselves, but pressing them is
wired back to the parent.

So `App` keeps the todos in state and hands each child two things: the
**data** (as props) and **callback functions** (`onAdd`, `onToggle`,
`onDelete`) the child calls to *ask* `App` to change it.

```jsx
// App owns the data AND the actions
function App() {
  const [todos, setTodos] = useState([])

  function addTodo(text) {
    setTodos((prev) => [...prev, /* the new todo */])
  }

  return <TodoForm onAdd={addTodo} />
}

// TodoForm just asks App to add — it never owns the list
function TodoForm({ onAdd }) {
  // ...later, when the form is submitted:
  onAdd(text)
}
```

Why bother? Because the form, the list, and the footer all need to agree
about the same tasks. The one place they can all share is their common
parent, `App`.

## Recap

- `useState` gives a component memory: `const [value, setValue] = useState(start)`.
- Change state **only** through the setter — never edit it directly.
- Events (`onClick`, `onChange`, `onSubmit`) take a function; pass it,
  don't call it. Use `e.preventDefault()` on form submit.
- A **controlled input** ties an input's `value` to state via `onChange`.
- Update arrays with `[...spread]`, `.filter`, and `.map` — always a new
  array.
- **Lift** shared state to the parent; pass data *down* as props and
  changes *up* through callbacks.

Now bring your app to life in `CHALLENGE.md`.
