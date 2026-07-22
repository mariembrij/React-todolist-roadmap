import { useState, useEffect, useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TodoList from './components/TodoList.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function addTodo(text) {
    const trimmed = text.trim()
    if (trimmed === '') return
    const newTodo = { id: Date.now().toString(), text: trimmed, completed: false }
    setTodos((prev) => [...prev, newTodo])
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function editTodo(id, newText) {
    const trimmed = newText.trim()
    if (trimmed === '') return
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)))
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const visibleTodos = useMemo(() => {
    const q = query.trim().toLowerCase()
    return todos
      .filter((t) => {
        if (filter === 'active') return !t.completed
        if (filter === 'completed') return t.completed
        return true
      })
      .filter((t) => t.text.toLowerCase().includes(q))
  }, [todos, filter, query])

  const itemsLeft = todos.filter((t) => !t.completed).length

  return (
    <main className="app-card">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <TodoForm onAdd={addTodo} />
      <SearchBar query={query} onQueryChange={setQuery} />
      <FilterTabs filter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={visibleTodos}
        isEmpty={todos.length === 0}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
      <Footer itemsLeft={itemsLeft} onClearCompleted={clearCompleted} />
    </main>
  )
}

export default App
