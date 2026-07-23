function FilterTabs() {
    return (
        <div className="filter-tabs">
            <button className="filter-tab active">All</button>
            <button className="filter-tab">Active</button>
            <button className="filter-tab">Completed</button>
        </div>
    )
}

export default FilterTabs