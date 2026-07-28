const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
]

function FilterTabs({ filter, onFilterChange }) {
    return (
        <div className="filter-tabs">
            {FILTERS.map((f) => (
                <button
                    key={f.key}
                    type="button"
                    className={f.key === filter ? 'filter-tab active' : 'filter-tab'}
                    onClick={() => onFilterChange(f.key)}
                >
                    {f.label}
                </button>
            ))}
        </div>
    )
}

export default FilterTabs