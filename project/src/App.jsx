import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TodoList from './components/TodoList.jsx'
import Footer from './components/Footer.jsx'
import { useState, useEffect, useMemo } from 'react'//day 4//
import { useLocalStorage } from './hooks/useLocalStorage.js'
function App() {

  const [todos, setTodos] = useLocalStorage('todos', [])


  const [filter, setFilter] = useState('all')//day 4//

  const visibleTodos = useMemo(() => {
    return todos.filter((t) => {
      if (filter === 'active') return !t.completed
      if (filter === 'completed') return t.completed
      return true
    })
  }, [todos, filter])//day 4//

  const itemsLeft = todos.filter((t) => !t.completed).length//day 4//

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

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }//day 4//

  return (
    <main className="app-card">
      <Header />
      <SearchBar />
      <FilterTabs filter={filter} onFilterChange={setFilter} />
      <TodoList todos={visibleTodos} isEmpty={todos.length === 0} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
      <TodoForm onAdd={addTodo} />
      <Footer />
    </main>
  )
}

export default App