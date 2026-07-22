# Reference App — My Tasks (React Todo)

This is the **finished** version of the app the intern builds during the 5-day
sprint. It's the "answer key" and the living visual target: run it, click
around, and compare it with your own `project/` app as you go.

You are **not** meant to copy from here file-by-file — build your own version by
following the daily challenges. Use this only to see how the finished app looks
and behaves, or to check an approach when you're stuck.

## Features

- Add, complete (checkbox), inline-edit (double-click), and delete tasks
- Filter by All / Active / Completed
- Clear completed, and a live "items left" count
- Live search that filters as you type (combines with the active filter)
- Dark-mode toggle (remembered across refreshes)
- Everything saved in `localStorage`, so your tasks survive a page refresh
- Keyboard support (Enter to add; Enter/Escape while editing) and accessible labels

## Run it

```sh
npm install
npm run dev
```

Then open the `http://localhost:5173` link it prints. Stop the server with
`Ctrl+C`.

## How it's built

- **Vite + React** (plain JavaScript, `.jsx`)
- State lives in `src/App.jsx` and flows down to components as props
- `src/hooks/useLocalStorage.js` is a small custom hook that keeps a value in
  sync with `localStorage`
- The visible list is derived with `useMemo` from the todos + the active filter
  + the search text
- All styling is plain CSS in `src/index.css` (the same design used across the
  course)
