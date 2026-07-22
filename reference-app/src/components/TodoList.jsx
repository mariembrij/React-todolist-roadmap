import TodoItem from './TodoItem.jsx'

function TodoList({ todos, isEmpty, onToggle, onEdit, onDelete }) {
  if (isEmpty) {
    return <p className="empty-state">No tasks yet. Add your first one above!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
