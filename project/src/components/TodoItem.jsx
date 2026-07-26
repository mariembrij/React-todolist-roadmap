function TodoItem({ todo, onToggle }) {
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
            <span className="todo-text">{todo.text}</span>
            <button type="button" className="todo-delete" aria-label="Delete task">
                ✕
            </button>
        </li>
    )
}

export default TodoItem