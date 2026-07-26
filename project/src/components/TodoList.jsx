import TodoItem from './TodoItem.jsx'

function TodoList({ todos, onToggle }) {
    if (todos.length === 0) {
        return <p className="empty-state">No tasks yet. Add your first one above!</p>
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
            ))}
        </ul>
    )
}

export default TodoList