function FilterBar({
  //receiving props from products page
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) {
  return (
    <div className="bg-gray-300 border rounded-xl border-amber-50 p-4 shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/**creates 3 product card in medimum scree and 1 in small screen*/}
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Search
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)} //when user type any item set search updates the state
            placeholder="Search products..."
            className="w-full border rounded-lg border-gray-500 p-2"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg border-gray-500 text-gray-800 p-2"
          >
            <option value="default">Default</option>
            {categories.map(
              (
                cat, //loops through all catgories got from productpage
              ) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ),
            )}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">Sort</label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)} //sort select depanding on user selection and send the state
            className="w-full border rounded-lg border-gray-500 text-gray-800 p-2"
          >
            <option value="default">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
