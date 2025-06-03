import { useState } from "react";

const formatCurrency = (amount) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
};

function TransactionForm({ onAdd }) {
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");
	const [amount, setAmount] = useState("");
	const [type, setType] = useState("expense");
	
	const handleSubmit = (e) => {
		e.preventDefault();
		
		const numAmount = parseFloat(amount);

		if (!description.trim()) {
			setError("Please enter a description.");
			return;
		}

		if (!amount || isNaN(numAmount) || numAmount <= 0) {
			setError("Please enter a valid amount greater than 0.");
			return;
		}

		setError(""); // clear error if everything is okay

		const newTransaction = {
			description,
			amount: parseFloat(amount),
			type: type.toUpperCase(),
		};

		onAdd(newTransaction);

		// reset form
		setDescription("");
		setAmount("");
		setType("income");
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="p-6 border-t border-gray-100">
			
			{error && (
				<div className="text-red-600 mb-2">
					{error}
				</div>
			)}

			<div className="mb-4">
				<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 text-left">
					Description
				</label>
				<input
					type="text"
					placeholder="What's this transaction for?"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-full px-4 py-2 h-14 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					required
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1 text-left">
					Amount
				</label>
				<input
					type="number"
					placeholder="0.00"
					className="w-full px-4 py-2 h-14 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					min="0.01" // HTML validation
					step="0.01" // Allow decimals
				/>
			</div>

			<div className="mb-7">
				<label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1 text-left">
					Transaction Type
				</label>
			<div className="flex gap-6 h-14">
				<button
					type="button"
					onClick={() => setType("income")}
					className={`flex-1 py-3 rounded-lg border text-center font-light transition ${type === "income"
							? "bg-green-100 text-green-700 border-green-500"
							: "bg-white text-gray-700 border-gray-300"
						}`}
				>
					+ Income
				</button>

				<button
					type="button"
					onClick={() => setType("expense")}
					className={`flex-1 py-3 rounded-lg border text-center font-light transition ${type === "expense"
							? "bg-red-100 text-red-700 border-red-500"
							: "bg-white text-gray-700 border-gray-300"
						}`}
				>
					− Expense
				</button>
			</div>
			</div>
			
			<button
				type="submit"
				className="w-full h-14 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Add Transaction
			</button>
		</form>
		</div>
	);
}

export default TransactionForm;