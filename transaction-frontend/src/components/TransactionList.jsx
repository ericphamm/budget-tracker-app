import TransactionListItem from './TransactionListItem';

function TransactionList({ transactions, onDelete }) {
	return (
		<div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-4">
		<ul className="space-y-2 mt-4 ">
				<h2 className="mb-4 text-base sm:text-lg font-medium text-gray-800 flex items-center">
				Transaction History
				</h2>
			{transactions.map((tx) => (
				<TransactionListItem key={tx.id} tx={tx} onDelete={onDelete} />
			))}
		</ul>
		</div>
	);
}

export default TransactionList;