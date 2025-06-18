function TransactionFilter({
	searchText,
	setSearchText,
	filterType,
	setFilterType,
	minAmount,
	setMinAmount,
	maxAmount,
	setMaxAmount,
	setPage
}) {

	const handleClearFilters = () => {
		setFilterType('all');      // reset filterType to 'all'
		setSearchText('');         // clear searchText
		setMinAmount('');          // clear min amount
		setMaxAmount('');          // clear max amount
	  };

	return (
		<div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-4">

			<div className="flex items-center justify-between mb-4">
			<h2 className="mr-2 text-base sm:text-lg font-medium text-gray-800 flex items-center">
				Filters
			</h2>

				{(filterType !== 'all' || searchText || minAmount || maxAmount) && (
					<button
						onClick={handleClearFilters}
						className="text-sm text-blue-600 hover:underline"
					>
						Clear Filters
					</button>
				)}

			</div>

			{/* search field */}
			<div className="relative">
				<input
					type="text"
					placeholder="Search transactions..."
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					className="w-full px-4 py-2 h-12 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
					/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pt-4">
				<div>
					{/* <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700  mb-1">
						Min Amount
					</label> */}
					<input
						type="number"
						placeholder="Min Amount"
						value={minAmount}
						onChange={(e) => setMinAmount(e.target.value)}
						className="w-full px-4 py-2 h-12 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
						/>
				</div>
				
				<div>
					{/* <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700  mb-1">
						Max Amount
					</label> */}
					<input
						type="number"
						placeholder="Max Amount"
						value={maxAmount}
						onChange={(e) => setMaxAmount(e.target.value)}
						className="w-full px-4 py-2 h-12 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
						/>
				</div>
			</div>

			{/* filter buttons */}
			<div className="flex flex-wrap justify-center gap-2 mb-4 mt-8">
				<button
					onClick={() => {
						setFilterType("all");
						setPage(0); // ✅ reset pagination
					}}
					className={`px-5 sm:px-10 py-2 h-12 rounded-lg text-sm font-medium transition-colors ${filterType === "all" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
				>
					All
				</button>

				<button
					onClick={() => {
						setFilterType("INCOME");
						setPage(0);
					}}
					className={`px-5 sm:px-10 py-2 h-12 rounded-lg text-sm font-medium transition-colors ${filterType === "INCOME" ? "bg-green-500 text-white" : "bg-gray-300"}`}
				>
					Income
				</button>

				<button
					onClick={() => {
						setFilterType("EXPENSE");
						setPage(0);
					}}
					className={`px-5 sm:px-10 py-2 h-12 rounded-lg text-sm font-medium transition-colors ${filterType === "EXPENSE" ? "bg-red-500 text-white" : "bg-gray-300"}`}
				>
					Expense
				</button>
			</div>
		</div>
	);
}
export default TransactionFilter;