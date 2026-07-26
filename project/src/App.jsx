import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TodoList from './components/TodoList.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const todos = [
    { id: '1', text: 'learn html', completed: false },
    { id: '2', text: 'Read the React lesson', completed: true },
  ]

  return (
    <main className="app-card">
      <Header />
      <TodoForm />
      <SearchBar />
      <FilterTabs />
      <TodoList />
      <TodoList todos={todos} />
      <Footer />
    </main>
  )
}

export default App