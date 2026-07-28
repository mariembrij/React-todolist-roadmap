# Day 4: Effects, Saving & Full CRUD

Today is the big one: your tasks survive a refresh, you can edit them,
filters work, and you package the saving logic into your own reusable
hook. You already have tasks that live in state. The problem: close the
tab and they vanish. Today we fix that for good — and finish every
action a real todo app needs.










## 1. `useEffect` — run code after the screen updates

Some work isn't about drawing the screen — it's about talking to the
outside world: saving data, setting the page title, calling an API.
React gives you `useEffect` for exactly that: code that runs **after**
React finishes updating the screen.

```jsx
import { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `${count} tasks`
  }, [count]) // re-runs only when count changes

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

The `[count]` at the end is the **dependency array**. It tells React
when to re-run the effect:

- `[]` (empty) — run **once**, right after the first render. Great for
  "do this when the app starts."
- `[count]` — run after the first render, then again **any time
  `count` changes**.
- (nothing at all) — run after **every** render. You almost never want
  this.

Think of the effect as a sticky note on React's easel: "after you finish
painting, also do this." The dependency array is the condition written on
the note — "...but only when this changed."

## 2. Saving to `localStorage`

Every browser has `localStorage` — a little drawer where your app can
stash data. What you put there survives refreshes, and even closing the
tab. It only holds **strings**, so we convert to and from text with JSON:

```jsx
// save
localStorage.setItem('todos', JSON.stringify(todos))

// read
const stored = localStorage.getItem('todos')
const todos = JSON.parse(stored)
```

`JSON.stringify` turns your array into a string to store. `JSON.parse`
turns that string back into a real array when you read it. Pair
`localStorage` with `useEffect` and you get automatic saving — every time
`todos` changes, write it to the drawer:

```jsx
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos]) // save whenever todos changes
```

## 3. Loading once, lazily

When the app starts, you want to read the saved tasks back **one time**.
`useState` lets you pass a *function* instead of a starting value — React
calls that function only on the very first render:

```jsx
const [todos, setTodos] = useState(() => {
  const stored = localStorage.getItem('todos')
  return stored ? JSON.parse(stored) : []
})
```

This is called **lazy initial state**. If there's something in the
drawer, we start with it; if not (a first-ever visit), we start with an
empty array. It's like checking your mailbox once when you get home —
not every single time you walk past the door.

## 4. Custom hooks — bottle up reusable logic

Notice we now have two moves that always go together: *read from the
drawer once*, and *write to the drawer whenever the value changes*. When
a chunk of hook-logic repeats, you can bottle it into your own **custom
hook** — a plain function whose name starts with `use` and that calls
other hooks inside.

```jsx
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

Read it slowly:

- It takes a `key` (the drawer's label) and an `initialValue` (what to
  use if the drawer is empty).
- Inside, it uses the same lazy `useState` from section 3.
- Its `useEffect` saves on every change.
- It **returns `[value, setValue]`** — exactly the shape `useState`
  gives you, so you use it the same way.

Now it's a labelled recipe card. `const [todos, setTodos] =
useLocalStorage('todos', [])` saves your tasks; later, the very same
recipe will store your theme. Write it once, reuse it anywhere.

## 5. Editing a task

To edit a row, that row needs a small piece of memory: "am I being
edited right now?" That's a `useState` boolean on the `TodoItem`. While
editing, the row shows a text box holding a **draft** of the text
(another piece of state). There are three ways to finish:

- **Enter**, or **clicking away** (blur) → save the draft.
- **Escape** → cancel, keeping the original.

It's like scribbling a change in pencil — you can ink it in, or rub it
out. There's one tricky bit: pressing Escape hides the input, which also
fires its `blur` event, and blur normally saves. So we keep a tiny flag
with `useRef` that says "this blur is a cancel, don't save." (`useRef`
holds a value that survives re-renders without causing one.) The exact,
ready-to-use code is in the challenge — read it, don't memorize it.

## 6. Deriving the visible list with `useMemo`

When you add filter tabs (All / Active / Completed), it's tempting to
store a separate "filtered todos" array in state. Don't. The filtered
list is **derived** — you can always compute it from `todos` plus the
current `filter`. Storing it twice means two things to keep in sync (and
bugs when they drift apart).

`useMemo` computes a value and remembers it, only recalculating when its
dependencies change:

```jsx
import { useMemo } from 'react'

const visibleTodos = useMemo(() => {
  return todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })
}, [todos, filter]) // recompute only when todos or filter change
```

`todos` stays the single source of truth in your one drawer; don't keep
the filtered list in a second drawer — `visibleTodos` is just a *view*
of it. If neither `todos` nor `filter` changed since last time, React
hands back the previous result instead of filtering all over again.

## Recap

Today you learned: `useEffect` and its dependency array (`[]` = once,
`[x]` = when `x` changes); saving to `localStorage` with
`JSON.stringify`/`JSON.parse`; lazy initial state to load once; writing
your own `useLocalStorage` custom hook; editing a row with a draft plus a
`useRef` cancel-flag; and deriving the visible list with `useMemo`
instead of storing it twice. Now go finish the app in `CHALLENGE.md`.
