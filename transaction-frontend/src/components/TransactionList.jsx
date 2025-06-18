import TransactionListItem from './TransactionListItem';

function TransactionList({ transactions, onDelete, onTransactionClick }) {
	return (
		<div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-4">
			<ul className="mt-4 ">
				<h2 className="mb-4 text-base sm:text-lg font-medium text-gray-800 flex items-center">
					Transaction History
				</h2>
				{transactions.map((tx) => (
					<TransactionListItem
						key={tx.id}
						tx={tx}
						onClick={() => onTransactionClick(tx)}
					/>))}
			</ul>
		</div>
	);
}

export default TransactionList;