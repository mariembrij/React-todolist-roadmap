import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TodoList from './components/TodoList.jsx'
import Footer from './components/Footer.jsx'
import { useState, useMemo } from 'react'//day 4//
import { useLocalStorage } from './hooks/useLocalStorage.js'
function App() {

  const [todos, setTodos] = useLocalStorage('todos', [])

  const [query, setQuery] = useState('')//day5//
  const [filter, setFilter] = useState('all')//day 4//


  const visibleTodos = useMemo(() => {
    3.
    const q = query.trim().toLowerCase()
    return todos
      .filter((t) => {
        if (filter === 'active') return !t.completed
        if (filter === 'completed') return t.completed
        return true
      })
      .filter((t) => t.text.toLowerCase().includes(q))
  }, [todos, filter, query])//day5//

  const itemsLeft = todos.filter((t) => !t.completed).length//day 4//

  function addTodo(text) {
    const trimmed = text.trim()
    if (trimmed === '') return;

    const newTodo = { id: Date.now().toString(), text: trimmed, completed: false }
    setTodos((prev) => [...prev, newTodo])
  }//day 3//
  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }//day3//

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }//day3//

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
      <TodoForm onAdd={addTodo} />
      <SearchBar query={query} onQueryChange={setQuery} />//day5//
      <FilterTabs filter={filter} onFilterChange={setFilter} />
      <TodoList todos={visibleTodos} isEmpty={todos.length === 0} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />

      <Footer />
    </main>
  )
}

export default App
