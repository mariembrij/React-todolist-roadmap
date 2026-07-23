function TodoList() {
    return (
        <ul className="todo-list">
            <li className="todo-item">
                <button className="todo-check" aria-label="Mark complete"></button>
                <span className="todo-text">Buy milk</span>
                <button className="todo-delete" aria-label="Delete task">✕</button>
            </li>
            <li className="todo-item completed">
                <button className="todo-check checked" aria-label="Mark complete">✓</button>
                <span className="todo-text">Read the React lesson</span>
                <button className="todo-delete" aria-label="Delete task">✕</button>
            </li>
            <li className="todo-item">
                <button className="todo-check" aria-label="Mark complete"></button>
                <span className="todo-text">Water the plants</span>
                <button className="todo-delete" aria-label="Delete task">✕</button>
            </li>
        </ul>
    )
}

export default TodoList