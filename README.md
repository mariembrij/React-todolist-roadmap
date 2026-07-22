# My Todo List — Now in React

Welcome back! You already built this todo app once, in plain HTML, CSS,
and JavaScript. This week you're going to build the **very same app**
again — same look, same features — but this time in **React**.

Doing it a second time, with a new tool, is one of the fastest ways to
learn. You already know what the app should do. Now you get to see how
React makes it easier to build. If you don't know any React yet, that's
completely fine — that's the whole point of this week. Go slow, read
carefully, and try things yourself before asking for help.

## What you will build

The same todo list app you know, rebuilt in React. It:

- Adds a new task when you type it and press "Add".
- Marks a task as done (with a nice green checkmark).
- Edits a task's text.
- Deletes a task.
- Filters tasks: All / Active / Completed.
- Clears all completed tasks at once.
- Has a **live search** box that filters the list as you type.
- Has a **dark mode** toggle (light and dark themes).
- Saves everything in your browser, so your tasks and your chosen theme
  are still there after you refresh or close the tab.

## What you will learn

- **Day 1:** React, Vite, and JSX — building the app out of reusable
  pieces called components.
- **Day 2:** Props, lists, and keys — handing data into components and
  turning an array of tasks into a list on screen.
- **Day 3:** State and events (`useState`) — giving your components
  memory, and reacting to clicks and typing.
- **Day 4:** Effects, localStorage, and full CRUD (`useEffect` plus a
  custom hook) — the 4 basic actions every app needs (Create, Read,
  Update, Delete), plus saving to the browser.
- **Day 5:** Polish — search, dark mode, accessibility, and writing docs.

You will also get **more git practice** — the same save-your-work habit
you built last week, one commit at a time.

## One-time setup (do this once, before Day 1)

1. **Fork this repo.** "Fork" means: make your own copy of this repo on
   your own GitHub account. Click the "Fork" button on the GitHub page.
2. **Clone your fork** — this downloads your copy onto your computer.
   Open a terminal and run (replace `YourUserName`):
   ```sh
   git clone https://github.com/YourUserName/React-todolist-roadmap.git
   cd React-todolist-roadmap
   ```
3. **Install Node.js (LTS version)** from
   [nodejs.org](https://nodejs.org). Node lets you run JavaScript tools
   on your computer, outside the browser — React's build tools need it.
   Pick the version labeled **LTS** (it means "Long-Term Support", the
   stable one). After it installs, check it worked by running:
   ```sh
   node -v
   npm -v
   ```
   Each should print a version number. If they do, you're good.
4. **Open the folder in VS Code** (or any code editor).
5. **Install the app's dependencies:**
   ```sh
   cd project
   npm install
   ```
   This downloads the code your app depends on (more on that just below).
6. Set your name and email in git, so your commits are labeled as yours:
   ```sh
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```

## New tools, in plain words

React comes with a few new words. Here's what they actually mean:

- **npm** — think of it as an **app store for code**. Instead of writing
  everything yourself, you download reusable pieces other people wrote.
  Running `npm install` reads the list of things your app needs and
  downloads them all into a folder called `node_modules/`. You run it
  once per app, then only again if the needs change.
- **A dev server** — a **live preview** of your app, like a mirror that
  updates the instant you change what you're wearing. It runs your app at
  a local web address and auto-refreshes the page every time you save a
  file, so you see your changes immediately.
- **Vite** — the fast tool that **runs that dev server** for you (it's
  the engine under the hood). You start it with `npm run dev` and stop it
  with `Ctrl+C`.
- **A component** — a **custom HTML tag you invent**, like a LEGO brick
  you design once and then snap in wherever you need it. Under the hood
  it's just a JavaScript function that returns what to show. You'll build
  your whole app out of components like `<Header />` and `<TodoList />`.

## Git refresher — the 4 commands you'll use every day

Think of git like a **save-game system**. `commit` is like saving your
game at a checkpoint. `push` is like uploading that save to the cloud, so
it's safe even if your computer breaks.

```sh
git status               # see what files changed
git add <file>           # pick which changes to save (like selecting what to save)
git commit -m "message"  # save a checkpoint, with a short note about what you did
git push origin main     # upload your checkpoints to GitHub
```

A good commit message is short and says **what** changed, for example:
`"Build static component tree for todo app"` or
`"Render todo list from props with .map and keys"`.
Not: `"stuff"`, `"changes"`, or `"asdf"`.

## How each day works

Each day has its own folder, like `day-1-react-jsx/`. Inside:

- **`LESSON.md`** — read this **first**. It teaches the ideas for the day
  with simple explanations and real-life examples.
- **`CHALLENGE.md`** — after the lesson, do this. It tells you exactly
  what to build, step by step, using the exact names. It also tells you
  when to `git commit` and `git push` — do it every time it says to, even
  if the change feels small. That's how you build the commit habit.

**Days 3 and 4** also include a `practice.jsx` file — a short warm-up to
do **before** the challenge. To run it:

1. Copy `practice.jsx` into your app as `project/src/Practice.jsx`.
2. In `project/src/main.jsx`, **temporarily** render `<Practice />`
   instead of `<App />`:
   ```jsx
   import Practice from './Practice.jsx'
   createRoot(document.getElementById('root')).render(<Practice />)
   ```
3. Run `npm run dev` and try your answers live in the browser.
4. When you're done warming up, switch `main.jsx` **back** to rendering
   `<App />`, and move on to the challenge.

**Day 5** has no new lesson — it's just polishing what you already built.

All of **your** app code lives in one place: the `project/src/` folder.
You'll keep adding to it all week.

## How to run YOUR app

From the repo folder, start the dev server:

```sh
cd project
npm run dev
```

Then open the `http://localhost:5173` link it prints, in your browser.
Leave it running while you work — it refreshes automatically every time
you save. When you're done, stop it with **Ctrl+C** in the terminal.

(You only need `npm install` the very first time; after that, `npm run
dev` is all you need to start working.)

## How to run the REFERENCE app

There's a complete, finished version of the app in the `reference-app/`
folder. It's your **answer key** — run it whenever you want to see
exactly how the final app should look and behave, and compare it to what
you're building.

```sh
cd reference-app
npm install
npm run dev
```

Open the `http://localhost:5173` link it prints. (It's a separate app, so
it needs its own `npm install` the first time.)

## Your week checklist

- [ ] Day 1 — React + JSX component skeleton done and pushed
- [ ] Day 2 — Props, lists & keys (matches the design) done and pushed
- [ ] Day 3 — State & events (adding a task works) done and pushed
- [ ] Day 4 — Effects + full CRUD + saving done and pushed
- [ ] Day 5 — Polish + project README done and pushed

## You've got this

Take your time. You already built this app once — this week is about
seeing it through a new lens. It's completely normal to get stuck,
misspell a name, or see a red error message; that's not failure, that's
just part of learning. Read the message, fix one thing, save, and look
again. Mistakes are how you learn.

Good luck, and have fun!
