const formatCurrency = (amount) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
};

function TransactionList({ transactions, onDelete }) {
	return (
		<div className="mt-6">
			<h2 className="text-xl font-semibold mb-2">Transaction History</h2>
			<ul className="space-y-2">
				{transactions.map((tx) => (
					<li
						key={tx.id}
						className={`p-3 rounded shadow flex justify-between items-center ${tx.type === 'INCOME' ? 'bg-green-100' : 'bg-red-100'
							}`}
					>
						<div className="flex flex-col items-start pl-2">
							<p className="text-sm text-gray-500 font-light mb-1">
								{new Date(tx.timestamp).toLocaleDateString('cs-CZ')}
							</p>
							<p className="text-lg break-words">{tx.description}</p>
						</div>

						<div className="flex items-center gap-4 whitespace-nowrap">
						<span>
								{formatCurrency(tx.type === 'EXPENSE' ? -tx.amount : tx.amount)}
							</span>
							<button
								onClick={() => onDelete(tx.id)}
								className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
							>
								✕
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
  }

export default TransactionList;