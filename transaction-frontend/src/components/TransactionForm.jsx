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
		<form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mt-4">
			
			{error && (
				<div className="text-red-600 mb-2">
					{error}
				</div>
			)}

			<div className="mb-2">
				<input
					type="text"
					placeholder="Description"
					className="w-full border p-2 rounded"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="mb-2">
				<input
					type="number"
					placeholder="Amount"
					className="w-full border p-2 rounded"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					min="0.01" // HTML validation
					step="0.01" // Allow decimals
				/>
			</div>
			<div className="mb-2">
				<select
					className="w-full border p-2 rounded"
					value={type}
					onChange={(e) => setType(e.target.value)}
				>
					<option value="income">Income</option>
					<option value="expense">Expense</option>
				</select>
			</div>
			
			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				Add Transaction
			</button>
		</form>
	);
}

export default TransactionForm;