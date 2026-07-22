import ThemeToggle from './ThemeToggle.jsx'

function Header({ theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div>
        <h1>My Tasks</h1>
        <p className="app-subtitle">Stay on top of your day</p>
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}

export default Header
