function TodoItem({ todo }) {
    return (
        <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
            <button
                className={todo.completed ? 'todo-check checked' : 'todo-check'}
                aria-label="Mark complete"
            >
                {todo.completed ? '✓' : ''}
            </button>
            <span className="todo-text">{todo.text}</span>
            <button className="todo-delete" aria-label="Delete task">
                ✕
            </button>
        </li>
    )
}

export default TodoItem