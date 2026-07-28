function SearchBar({ query, onQueryChange }) {
    return (
        <div className="search-bar">
            <input
                type="search"
                className="search-input"
                placeholder="Search tasks…"
                aria-label="Search tasks"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
            />
        </div>
    )
}

export default SearchBar