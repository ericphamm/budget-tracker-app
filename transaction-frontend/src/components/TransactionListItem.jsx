import React from 'react';
import { Banknote, ShoppingCart } from 'lucide-react';

function TransactionListItem({ tx, onClick }) {
	if (!tx) return null;

	const isIncome = tx.type === 'INCOME';
	const Icon = isIncome ? Banknote : ShoppingCart;
	const formattedDate = new Date(tx.timestamp).toLocaleDateString('cs-CZ');

	const bgColor = isIncome ? 'bg-green-100' : 'bg-red-100';
	const textColor = isIncome ? 'text-green-600' : 'text-red-600';
	const amountSign = isIncome ? '+' : '-';
	const formattedAmount = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(tx.amount);

	return (
		<li onClick={() => onClick(tx)}
		className="flex items-center justify-between pt-5 pb-5 px-2 transition duration-200 border-b last:border-b-0 border-gray-200 hover:bg-gray-50 hover:shadow-sm cursor-pointer"
	>
			{/* Left: Icon + Description + Date */}
			<div className="flex items-center gap-4">
				<div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${bgColor}`}>
					<Icon className={`${textColor}`} size={24} /> {/* ✅ Correct usage */}
				</div>
				<div className="flex flex-col items-start">
					<p className="text-sm text-gray-400">{formattedDate}</p>
					<p className="text-sm font-medium text-gray-700">{tx.description}</p>
				</div>
			</div>

			{/* Right: Amount + Delete */}
			<div className="flex items-center gap-4">
				<p className={`text-sm font-semibold text-lg ${textColor}`}>
					{amountSign}
					{formattedAmount}
				</p>
			</div>
		</li>
	);
}

export default TransactionListItem;