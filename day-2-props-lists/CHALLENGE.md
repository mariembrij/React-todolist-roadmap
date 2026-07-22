# Day 2 Challenge: Style the App & Render a List from Props

**Goal:** make your app match the design, and render the task list from
a **hardcoded data array** passed down through props. There's still no
interactivity — no adding, checking, or deleting yet. That's coming.
Today is about the look, and about data flowing from a parent into
children.

Keep the reference app open in a second terminal so you can compare as
you go — it's the finished version:

```sh
cd reference-app && npm install && npm run dev
```

## Step 1 — Turn on the design

Open `project/src/main.jsx` and add this one line:

```jsx
import './index.css'
```

Save the file. Your app should instantly go from plain text to a
centered white card with the Poppins font and a purple Add button. If
it doesn't change, double-check you're editing `project/src/main.jsx`
and that your dev server is running (`cd project && npm run dev`).

**Commit checkpoint** — the app is now styled:

```sh
git add project/src/main.jsx
git commit -m "Apply the design stylesheet"
```

## Step 2 — Add a hardcoded todos array in `App.jsx`

Open `project/src/App.jsx`. Inside the `App` function, above the
`return`, define an array of tasks. Give each one an `id`, some `text`,
and a `completed` flag:

```jsx
function App() {
  const todos = [
    { id: '1', text: 'Buy milk', completed: false },
    { id: '2', text: 'Read the React lesson', completed: true },
  ]

  return (
    // ...your components...
  )
}
```

## Step 3 — Create `TodoItem.jsx`

Yesterday you hardcoded the task rows straight inside `TodoList`. Today
you'll pull one row out into its own reusable component that takes a
single `todo` object as a prop.

Create `project/src/components/TodoItem.jsx`:

```jsx
function TodoItem({ todo }) {
  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <button
        className={todo.completed ? 'todo-check checked' : 'todo-check'}
        aria-label="Mark complete"
      >
        {todo.completed ? '✓' : ''}
      </button>
      <span className="todo-text">{todo.text}</span>
      <button className="todo-delete" aria-label="Delete task">
        ✕
      </button>
    </li>
  )
}

export default TodoItem
```

Notice how the `className` changes based on `todo.completed`: a
completed task gets `todo-item completed` and a `todo-check checked`
with a `✓` inside. The buttons don't do anything yet — that's fine.

## Step 4 — Rewrite `TodoList.jsx` to use props + `.map()`

Change `project/src/components/TodoList.jsx` so it takes a `todos` prop
and maps each one into a `<TodoItem>`. Add the empty-state too: when
there are no tasks, return the message instead of the list.

```jsx
import TodoItem from './TodoItem.jsx'

function TodoList({ todos }) {
  if (todos.length === 0) {
    return <p className="empty-state">No tasks yet. Add your first one above!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList
```

The `key={todo.id}` is required — it's the name tag React uses to keep
track of each row.

## Step 5 — Pass `todos` from `App` down to `TodoList`

Back in `project/src/App.jsx`, hand your array to `TodoList` as a prop:

```jsx
<TodoList todos={todos} />
```

Your `App` return should now look like this (the other components stay
exactly as they were yesterday):

```jsx
return (
  <main className="app-card">
    <Header />
    <TodoForm />
    <SearchBar />
    <FilterTabs />
    <TodoList todos={todos} />
    <Footer />
  </main>
)
```

Save and check the browser. You should see your two tasks, with "Read
the React lesson" showing a green check and a strikethrough because
`completed` is `true`.

## Step 6 — Test the empty state

Temporarily change your array in `App.jsx` to an empty one:

```jsx
const todos = []
```

The list should disappear and the message **"No tasks yet. Add your
first one above!"** should show instead. Once you've seen it work, put
your two tasks back.

**Commit checkpoint** — the list now renders from props:

```sh
git add project/src
git commit -m "Render todo list from props with .map and keys"
git push origin main
```

## Definition of Done

- [ ] `main.jsx` imports `./index.css`, and the app matches the design
  (compare it side by side with the reference app).
- [ ] `App.jsx` defines a hardcoded `todos` array and passes it to
  `<TodoList todos={todos} />`.
- [ ] `TodoItem.jsx` is its own file with a Capital-letter name and
  `export default`, and it reads `todo.text` and `todo.completed` from
  its `todo` prop.
- [ ] The two hardcoded tasks render, and the completed one has a green
  check plus a strikethrough.
- [ ] Setting the array to `[]` shows the empty-state message.
- [ ] Every `<TodoItem>` has `key={todo.id}` (no missing-key warning in
  the browser console).

Once every box is checked, tick the **Day 2** box in the root
`README.md`, then move on to `day-3-state-events/LESSON.md`.
