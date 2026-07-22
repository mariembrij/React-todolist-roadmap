// Day 3 Practice — warm up BEFORE the challenge.
// HOW TO RUN THIS:
//   1. Copy this file into your app:  project/src/Practice.jsx
//   2. In project/src/main.jsx, temporarily render <Practice /> instead of <App />:
//        import Practice from './Practice.jsx'
//        createRoot(document.getElementById('root')).render(<Practice />)
//   3. Run `npm run dev` and try your answers live in the browser.
//   4. When you're done, switch main.jsx back to rendering <App />.

import { useState } from 'react'

// 1) COUNTER
// Make the button show a number that goes up by 1 each click.
// Use useState. Start at 0.
function Counter() {
  // TODO: your work here
  return <button>clicked 0 times</button>
}

// 2) TOGGLE
// Make the button flip between "ON" and "OFF" each time you click it.
function Toggle() {
  // TODO: your work here
  return <button>OFF</button>
}

// 3) CONTROLLED INPUT
// Make the paragraph show, live, whatever is typed in the box.
function Echo() {
  // TODO: your work here (hint: value={...} and onChange)
  return (
    <div>
      <input placeholder="type here" />
      <p>You typed: </p>
    </div>
  )
}

// 4) ADD TO A LIST
// Type a word, click Add, and show it in the list below.
// Add WITHOUT mutating: setItems([...items, newWord]).
function WordList() {
  // TODO: your work here
  return (
    <div>
      <input placeholder="a word" />
      <button>Add</button>
      <ul></ul>
    </div>
  )
}

export default function Practice() {
  return (
    <div style={{ padding: 24, display: 'grid', gap: 24, fontFamily: 'sans-serif' }}>
      <Counter />
      <Toggle />
      <Echo />
      <WordList />
    </div>
  )
}
