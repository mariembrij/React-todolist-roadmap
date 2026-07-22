// Day 4 Practice — warm up BEFORE the challenge.
// Run it the same way as Day 3: copy to project/src/Practice.jsx, render
// <Practice /> from main.jsx temporarily, `npm run dev`, then switch back.

import { useState, useEffect } from 'react'

// 1) EFFECT ON MOUNT
// Log "Component appeared!" to the console ONCE, when this component first shows.
// (Open the browser console to see it. It should log once — not on every keystroke.)
function Hello() {
  // TODO: add a useEffect with an empty [] dependency array
  return <p>Open the console.</p>
}

// 2) PERSIST A COUNTER
// Make this counter REMEMBER its value across page refreshes using localStorage.
//   - read the saved value when setting up state (lazy initial state)
//   - write to localStorage in a useEffect whenever it changes
function StickyCounter() {
  // TODO: your work here
  return <button>count: 0</button>
}

// 3) MINI useLocalStorage
// Finish this custom hook so StickyCounter could use it as:
//   const [count, setCount] = useLocalStorage('practice-count', 0)
function useLocalStorage(key, initialValue) {
  // TODO: your work here — read lazily, write in an effect, return [value, setValue]
}

export default function Practice() {
  return (
    <div style={{ padding: 24, display: 'grid', gap: 24, fontFamily: 'sans-serif' }}>
      <Hello />
      <StickyCounter />
    </div>
  )
}
