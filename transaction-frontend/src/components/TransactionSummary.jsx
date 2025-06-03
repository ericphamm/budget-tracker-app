import React from 'react';
import {Wallet } from 'lucide-react';

const formatCurrency = (amount) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);

function TransactionSummary({ summary }) {
	const { income, expense, balance } = summary;

	return (
		<div className="bg-white shadow rounded-xl p-4 sm:p-6 mb-4">
			<div className="flex justify-center mb-3 sm:mb-4">
				<div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-blue-100 flex items-center justify-center">
					<Wallet size={26} className="text-blue-600 sm:size-20" />
				</div>
			</div>
			
			<h2 className="text-center text-gray-600 mb-2 text-base font-light">
				Current Balance
			</h2>

			<p
				className={`text-center text-3xl font-bold mb-6 ${balance >= 0 ? 'text-green-600' : 'text-red-600'
					}`}
			>
				{formatCurrency(balance)}
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{/* Income Card */}
				<div className="bg-gray-50 rounded-lg p-4 text-center">
					<p className="text-sm text-gray-500 mb-1 ">Income</p>
					<p className="text-xl font-semibold text-green-600">
						{formatCurrency(income)}
					</p>
				</div>

				{/* Expense Card */}
				<div className="bg-gray-50 rounded-lg p-4 text-center">
					<p className="text-sm text-gray-500 mb-1">Expenses</p>
					<p className="text-xl font-semibold text-red-600">
						-{formatCurrency(expense)}
					</p>
				</div>
			</div>
		</div>
	);
}

export default TransactionSummary;