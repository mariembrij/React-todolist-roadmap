# Day 2: Props, Lists & Keys — Feeding Your Components Data

Yesterday your components had hardcoded text baked right into them.
Today they receive their data from outside as **props**, you turn an
array of tasks into a list on screen, and you make the whole app match
the design. By the end of today, your app will finally look good.

## 1. Importing the CSS

Right now your app is plain and unstyled. The good news: the entire
stylesheet is already written for you, sitting in
`project/src/index.css`. You never have to write CSS this week — you
just reuse the same class names you already added yesterday, and the
design lights up.

To turn it on, add **one line** to `main.jsx`:

```jsx
// project/src/main.jsx
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'   // ← add this one line

createRoot(document.getElementById('root')).render(<App />)
```

Think of this like flipping the main power switch. The wiring — all
those `className` labels — was already installed yesterday. This line
just turns on the electricity, and the whole room lights up.

## 2. Props — data handed into a component

A **prop** is a piece of data you hand into a component from outside,
so the same component can show different things.

Imagine ordering at a coffee shop. You (the parent) hand the barista
(the component) an order: "a latte, oat milk." The barista always does
the same job — makes a drink — but *what* they make depends on the
order you handed them. Props are that order.

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>
}

// used as:
<Welcome name="Ana" />
```

Two things to notice:

- `{ name }` in the parentheses is **destructuring** — a shortcut that
  pulls the `name` prop out so you can use it directly.
- Props are **read-only**. A component reads its props but never
  changes them, just like the barista fills your order but doesn't get
  to rewrite it.

## 3. Rendering a list with `.map()`

Most of the time you don't know ahead of time how many tasks there
are. So instead of typing out each `<li>` by hand, you take an array
and transform it into a list of elements with `.map()`.

`.map()` is like a cookie cutter. You feed it a tray of dough (your
array), and it stamps out one cookie (one element) per lump:

```jsx
const todos = [
  { id: '1', text: 'Buy milk' },
  { id: '2', text: 'Read the lesson' },
]

<ul>
  {todos.map((todo) => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>
```

For every item in the array, `.map()` returns one `<li>`. Wrap the
`.map()` call in `{curly braces}` so JSX runs it as JavaScript.

## 4. Why `key` matters

Did you notice the `key={todo.id}` in that snippet? React needs it.

Picture a conference where everyone wears a name tag. If the crowd
shuffles around, you can still tell who's who by reading the tags.
`key` is that name tag. It gives each element a stable identity so
React can tell which row is which when the list changes — and update
only what actually changed, instead of redrawing everything.

- Use a **stable, unique** value. Our todos each have an `id`, so use
  `key={todo.id}`.
- Do **not** use the array index (`key={index}`) if the list can ever
  reorder, get sorted, or have items removed — the tags would get
  swapped onto the wrong people.

## 5. Conditional rendering

Sometimes you want to show something only in certain situations — like
an "empty list" message when there are no tasks. React gives you three
handy tools:

```jsx
// 1) show something only when a condition is true
{todos.length === 0 && <p>No tasks yet.</p>}

// 2) choose between two things
{todo.completed ? <span>✓</span> : <span></span>}

// 3) a component can return early
function TodoList({ todos }) {
  if (todos.length === 0) {
    return <p className="empty-state">No tasks yet. Add your first one above!</p>
  }
  return <ul className="todo-list">{/* the rows go here */}</ul>
}
```

Think of the early `return` like a "Sorry, we're closed" sign you hang
on the door only when the shop is empty. When there are no tasks, the
component shows the sign and stops; otherwise it shows the real list.

## 6. Passing a whole object

You can hand a component a single value like `name="Ana"`, but you can
also hand it an **entire object** at once:

```jsx
<TodoItem todo={todo} />

function TodoItem({ todo }) {
  return <span className="todo-text">{todo.text}</span>
}
```

Back to the coffee shop: instead of reading out every detail one by
one, you hand the barista the whole order card. Now `TodoItem` gets the
full `todo` object and can read `todo.text`, `todo.completed`, and
`todo.id` from it.

## Recap

Today you learned:

- **Import the CSS** with one line in `main.jsx` — the design is
  already written, you just switch it on.
- **Props** are data handed into a component from outside; they're
  read-only, and you destructure them with `{ name }`.
- **`.map()`** turns an array into a list of elements — one per item.
- **`key`** gives each list element a stable identity; use `todo.id`,
  never the array index.
- **Conditional rendering** with `&&`, `? :`, or an early `return`
  lets you show different things in different situations.

Now go make your app come to life in `CHALLENGE.md`.
