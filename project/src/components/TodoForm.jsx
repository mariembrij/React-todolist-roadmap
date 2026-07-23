function TodoForm() {
    return (
        <form className="todo-form">
            <input className="todo-input" placeholder="What do you need to do?" />
            <button type="button" className="add-btn">Add</button>
        </form>
    )
}

export default TodoForm