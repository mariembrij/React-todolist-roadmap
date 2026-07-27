import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TodoList from './components/TodoList.jsx'
import Footer from './components/Footer.jsx'
import { useState } from 'react'//day 3//
function App() {
 
  
  const [todos, setTodos] = useState([{ id: '1', text: 'learn html', completed: false },
    { id: '2', text: 'Read the React lesson', completed: true }])//day3//


  function addTodo(text) {
    const trimmed = text.trim()
    if (trimmed === '') return;

    const newTodo = { id: Date.now().toString(), text: trimmed, completed: false }
    setTodos((prev) => [...prev, newTodo])
  }
  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <main className="app-card">
      <Header />
      <SearchBar />
      <FilterTabs />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <TodoForm onAdd={addTodo} />
      <Footer />
    </main>
  )
}

export default App
