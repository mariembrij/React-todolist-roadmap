import { useState, useRef } from 'react'

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  // A little flag that survives re-renders. When the user presses Escape we
  // set it so the blur that fires as the input disappears knows NOT to save.
  const cancelRef = useRef(false)

  function startEditing() {
    setDraft(todo.text)
    cancelRef.current = false
    setIsEditing(true)
  }

  function finishEditing() {
    if (cancelRef.current) {
      cancelRef.current = false
    } else {
      onEdit(todo.id, draft)
    }
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      finishEditing()
    } else if (e.key === 'Escape') {
      cancelRef.current = true
      setIsEditing(false)
    }
  }

  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <button
        type="button"
        className={todo.completed ? 'todo-check checked' : 'todo-check'}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed ? '✓' : ''}
      </button>

      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={finishEditing}
        />
      ) : (
        <span className="todo-text" onDoubleClick={startEditing}>
          {todo.text}
        </span>
      )}

      <button
        type="button"
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
