import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TodoList from './components/TodoList.jsx'
import Footer from './components/Footer.jsx'
import { useState, useEffect } from 'react'//day 4//
function App() {

  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos')
    return stored ? JSON.parse(stored) : []
  })//day4//

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])//day 4//



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

  function editTodo(id, newText) {
    const trimmed = newText.trim()
    if (trimmed === '') return
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)))
  }//day 4//

  return (
    <main className="app-card">
      <Header />
      <SearchBar />
      <FilterTabs />
      <TodoList todos={todos} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
      <TodoForm onAdd={addTodo} />
      <Footer />
    </main>
  )
}

export default App