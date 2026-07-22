# Day 1: React + Vite + JSX — Building the Skeleton

Today you meet React and build the skeleton of your app out of
components — like yesterday's HTML skeleton, but assembled from reusable
pieces you invent. Same todo app, new tool. It will look plain today; we
add the styling on Day 2.

## 1. What is React?

React is a **library** — a big bundle of ready-made code — for building
user interfaces out of small, reusable pieces called **components**.

The most important idea in React is that it is **declarative**. That's a
fancy word for a simple habit: you describe what the screen should look
like for the data you have right now, and React figures out how to update
the actual page for you. You never reach in and change the page by hand
(no `document.getElementById` like in the vanilla version).

Think of a **thermostat**. You don't manually turn the heater on and off
all day. You set the temperature you want, and the thermostat does the
adjusting. React is the same: you set what the screen should show, and
React does the adjusting.

## 2. What are Vite, npm, and the dev server?

Three new words, one job: getting your app running on your computer.

- **npm** is like an app store for code. Other people wrote React, and
  npm downloads it into a folder called `node_modules/` so your app can
  use it. You already ran this once during setup.
- **Vite** is the tool that runs your app while you build it.
- **The dev server** is the live preview Vite gives you. When you save a
  file, the page in your browser updates on its own — no manual refresh.

The dev server is like a **mirror**. As you change clothes, the mirror
shows the new outfit instantly. As you change your code and save, the
browser shows the new app instantly.

Two commands run the whole thing:

```sh
npm install     # download the code your app needs (once)
npm run dev     # start the live preview
```

`npm run dev` prints a link like `http://localhost:5173`. Open it in your
browser to see your app. Press `Ctrl+C` in the terminal to stop it.

## 3. JSX — HTML inside JavaScript

In React you write your HTML **inside** your JavaScript, using a syntax
called **JSX**:

```jsx
const el = <h1>Hello</h1>
```

That looks like HTML, but it lives in a `.jsx` file right next to your
JavaScript. JSX is like writing the HTML and the JavaScript in the same
sentence, instead of in two separate files.

A few rules are slightly different from plain HTML:

- **One root element.** A piece of JSX must return a single outer element.
  If you need two things side by side, wrap them in an empty
  `<>…</>` tag (called a **Fragment**):

  ```jsx
  return (
    <>
      <h1>My Tasks</h1>
      <p>Stay on top of your day</p>
    </>
  )
  ```

- **`className`, not `class`.** Because `class` already means something in
  JavaScript, JSX uses `className` for CSS classes:

  ```jsx
  <button className="add-btn">Add</button>
  ```

- **Self-close empty tags.** Tags with no children must close themselves
  with a slash: `<input />`, not `<input>`.

- **JavaScript goes in `{curly braces}`.** Anywhere inside JSX, curly
  braces drop you back into JavaScript:

  ```jsx
  const title = 'My Tasks'
  const el = <h1>{title}</h1>   // shows: My Tasks
  ```

## 4. A component is a function that returns JSX

A **component** is just a JavaScript function that returns some JSX:

```jsx
function Header() {
  return <h1>My Tasks</h1>
}

export default Header
```

Once you write that, you can use `<Header />` anywhere, like it was a
built-in HTML tag. A component is a **custom LEGO brick** — you design it
once, then click it into place as many times as you want.

One rule you must never forget: **component names start with a Capital
letter.** `Header` is a component; `header` is a plain HTML tag. React
tells them apart by that first letter.

## 5. Composing components

Bigger components are built by clicking smaller ones together — just like
snapping LEGO bricks into a larger model. A parent component uses its
children as tags inside its own JSX:

```jsx
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function App() {
  return (
    <main>
      <Header />
      <Footer />
    </main>
  )
}

export default App
```

Two small words make this work:

- **`export default`** at the bottom of a file means "this is the main
  thing this file hands out."
- **`import`** at the top of another file means "give me that thing so I
  can use it here."

So `App` imports `Header` and `Footer`, then renders them nested inside a
`<main>`. That nesting is called **composition**, and it is how every
React app is built — small pieces inside bigger pieces.

## 6. How the app starts

You might wonder how `<App />` ever ends up on the screen. Two files you
already have take care of it, and you will **not** edit them today:

- `index.html` has one nearly-empty line: `<div id="root"></div>`. That
  empty box is where your whole app gets placed.
- `src/main.jsx` finds that box and drops your app into it:

  ```jsx
  import { createRoot } from 'react-dom/client'
  import App from './App.jsx'

  createRoot(document.getElementById('root')).render(<App />)
  ```

That's the one and only bridge between the HTML page and your React code.
Everything else you build lives inside `<App />`.

## Recap

Today you learned:

- **React** builds UIs from reusable **components** and is **declarative** —
  you describe the screen, React updates it.
- **Vite** runs a **dev server** that live-previews your app as you save;
  **npm** downloaded the code with `npm install`.
- **JSX** lets you write HTML inside JavaScript, with a few rules: **one
  root element** (use a `<>…</>` Fragment), **`className`** instead of
  `class`, **self-close** empty tags, and **`{curly braces}`** for
  JavaScript.
- A **component** is a function that returns JSX; its name starts with a
  **Capital letter**.
- You **compose** components by nesting them, wiring files together with
  `import` and `export default`.

Now go build the skeleton of your todo app in `CHALLENGE.md`.
