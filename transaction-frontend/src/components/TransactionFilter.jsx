function TransactionFilter({
	searchText,
	setSearchText,
	filterType,
	setFilterType,
	minAmount,
	setMinAmount,
	maxAmount,
	setMaxAmount
  }) {
	return (
		<div className="flex flex-wrap gap-2 mb-4">
			<input
				type="text"
				placeholder="Search description..."
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				className="flex-1 min-w-[150px] border p-2 rounded"
			/>

			<select
				value={filterType}
				onChange={(e) => setFilterType(e.target.value)}
				className="min-w-[100px] border p-2 rounded"
			>
				<option value="all">All</option>
				<option value="income">Income</option>
				<option value="expense">Expense</option>
			</select>

			<input
				type="number"
				placeholder="Min Amount"
				value={minAmount}
				onChange={(e) => setMinAmount(e.target.value)}
				className="w-[120px] border p-2 rounded"
			/>

			<input
				type="number"
				placeholder="Max Amount"
				value={maxAmount}
				onChange={(e) => setMaxAmount(e.target.value)}
				className="w-[120px] border p-2 rounded"
			/>
		</div>
	);
}

export default TransactionFilter;