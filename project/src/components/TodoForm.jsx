import { useState } from 'react'

function TodoForm({ onAdd }) {
    const [text, setText] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        onAdd(text)
        setText('')
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                placeholder="What do you need to do?"
                aria-label="New task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="add-btn" disabled={text.trim() === ''}>
                Add
            </button>
        </form>
    )
}

export default TodoForm