function Footer({ itemsLeft, onClearCompleted }) {
    return (
        <footer className="app-footer">
            <span>
                {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left
            </span>
            <button type="button" className="clear-btn" onClick={onClearCompleted}>
                Clear completed
            </button>
        </footer>
    )
}

export default Footer