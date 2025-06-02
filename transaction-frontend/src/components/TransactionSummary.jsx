const formatCurrency = (amount) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
  };

function TransactionSummary({ transactions }) {
	const income = transactions
		.filter((t) => t.type === "INCOME")
		.reduce((sum, t) => sum + t.amount, 0);

	const expense = transactions
		.filter((t) => t.type === "EXPENSE")
		.reduce((sum, t) => sum + t.amount, 0);

	const balance = income - expense;

	return (
		<div className="bg-white shadow rounded p-4 mb-4">
			<h2 className="text-lg font-bold mb-2">Summary</h2>
			<div className="flex justify-between">
				<div>
					<p className="text-green-700">Income</p>
					<p className="font-bold">{formatCurrency(income)}</p>
				</div>
				<div>
					<p className="text-red-700">Expenses</p>
					<p className="font-bold">- {formatCurrency(expense)}</p>
				</div>
				<div>
					<p className="text-blue-700">Balance</p>
					<p className="font-bold">{formatCurrency(balance)}</p>
				</div>
			</div>
		</div>
	);
}

export default TransactionSummary;