interface FilterSidebarProps {
    selectedFilters: string[];
    clearFilters: () => void;
    getAvailableFilters: () => string[];
    toggleFilter: (filter: string) => void;
  }
  
  export default function FilterSidebar({
    selectedFilters,
    clearFilters,
    getAvailableFilters,
    toggleFilter,
  }: FilterSidebarProps) {
    const availableFilters = getAvailableFilters();
  
    return (
      <aside className="bg-white border rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {selectedFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
  
        <ul className="space-y-2">
          {availableFilters.map((filter) => (
            <li key={filter}>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {filter}
              </label>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
  