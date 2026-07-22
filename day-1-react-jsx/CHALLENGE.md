# Day 1 Challenge: Build the Static Component Tree

**Goal:** get the app running, then build the **skeleton** of your todo
app out of components — a header, a form, a search box, filter tabs, a
task list, and a footer. Everything is **hardcoded** today: no typing,
no clicking, nothing saved. And it will look plain and unstyled — that's
expected! Day 2 adds the design. Today is all about the structure.

You will build every component with the **exact class names** shown
below. Those class names are the "door handles" the Day 2 stylesheet
grabs onto, so spelling matters — copy them carefully.

## Setup — get the app running

1. Open a terminal in the `project/` folder and start the dev server:

   ```sh
   cd project
   npm install
   npm run dev
   ```

2. Open the `http://localhost:5173` link it prints. You should see the
   plain placeholder page ("My Tasks / Start here…"). Leave the dev
   server running — it will refresh on its own every time you save.

## Build steps

All your code goes in `project/src/`. First, **create a new folder**
called `components/` inside `project/src/`. Each component below is its
own file in that folder.

### 1. `project/src/components/Header.jsx`

```jsx
function Header() {
  return (
    <header className="app-header">
      <div>
        <h1>My Tasks</h1>
        <p className="app-subtitle">Stay on top of your day</p>
      </div>
    </header>
  )
}

export default Header
```

### 2. `project/src/components/TodoForm.jsx`

No behavior yet — just the shape. We add `type="button"` to the Add button
so it doesn't try to submit the form and reload the page. (On Day 3 you'll
make it actually add a task.)

```jsx
function TodoForm() {
  return (
    <form className="todo-form">
      <input className="todo-input" placeholder="What do you need to do?" />
      <button type="button" className="add-btn">Add</button>
    </form>
  )
}

export default TodoForm
```

### 3. `project/src/components/SearchBar.jsx`

```jsx
function SearchBar() {
  return (
    <div className="search-bar">
      <input type="search" className="search-input" placeholder="Search tasks…" />
    </div>
  )
}

export default SearchBar
```

### 4. `project/src/components/FilterTabs.jsx`

Three buttons. Give the **first one** both classes — `filter-tab active` —
so it looks selected. The other two get just `filter-tab`.

```jsx
function FilterTabs() {
  return (
    <div className="filter-tabs">
      <button className="filter-tab active">All</button>
      <button className="filter-tab">Active</button>
      <button className="filter-tab">Completed</button>
    </div>
  )
}

export default FilterTabs
```

### 5. `project/src/components/TodoList.jsx`

A `<ul className="todo-list">` with a few **hardcoded** task rows. Make
**one** row look completed by giving its `<li>` the class
`todo-item completed`, giving its check button the class
`todo-check checked`, and putting a checkmark (`✓`) inside that button.
The other rows leave the check button empty.

```jsx
function TodoList() {
  return (
    <ul className="todo-list">
      <li className="todo-item">
        <button className="todo-check" aria-label="Mark complete"></button>
        <span className="todo-text">Buy milk</span>
        <button className="todo-delete" aria-label="Delete task">✕</button>
      </li>
      <li className="todo-item completed">
        <button className="todo-check checked" aria-label="Mark complete">✓</button>
        <span className="todo-text">Read the React lesson</span>
        <button className="todo-delete" aria-label="Delete task">✕</button>
      </li>
      <li className="todo-item">
        <button className="todo-check" aria-label="Mark complete"></button>
        <span className="todo-text">Water the plants</span>
        <button className="todo-delete" aria-label="Delete task">✕</button>
      </li>
    </ul>
  )
}

export default TodoList
```

### 6. `project/src/components/Footer.jsx`

```jsx
function Footer() {
  return (
    <footer className="app-footer">
      <span>2 items left</span>
      <button className="clear-btn">Clear completed</button>
    </footer>
  )
}

export default Footer
```

### 7. Wire them together in `project/src/App.jsx`

Replace the placeholder `App.jsx` so it imports all six components and
renders them, in this order, inside one `<main className="app-card">`:

```jsx
import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TodoList from './components/TodoList.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <main className="app-card">
      <Header />
      <TodoForm />
      <SearchBar />
      <FilterTabs />
      <TodoList />
      <Footer />
    </main>
  )
}

export default App
```

Save. Check the browser — the whole skeleton should appear.

## Definition of Done

- [ ] `npm run dev` runs with no errors in the terminal or the browser.
- [ ] The page shows, top to bottom: the title + subtitle, the add-task
  form, the search box, three filter buttons (with "All" looking
  selected), a few task rows (one of them completed), and the footer with
  a count and a "Clear completed" button.
- [ ] Everything is hardcoded and unstyled, and nothing is clickable yet —
  that's exactly right for Day 1.
- [ ] Each of the six components lives in its own file, has a
  **Capital-letter** name, and ends with `export default`.
- [ ] Every class name matches the list above, spelled exactly.

## Commit checkpoint

Once the skeleton renders in your browser:

```sh
git add project/src
git commit -m "Build static component tree for todo app"
git push origin main
```

Check your checklist box for Day 1 in the root `README.md`, then move on
to `day-2-props-lists/LESSON.md`.
