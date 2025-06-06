import { useState } from "react";
import TransactionForm from "./TransactionForm";

function AddTransaction({ onAdd }) {
	const [showForm, setShowForm] = useState(false);

	return (
		<div className="bg-white rounded-xl shadow mb-4 overflow-hidden transition-all duration-300">
			{/* Toggle button */}
			<button
				onClick={() => setShowForm(!showForm)}
				className="w-full py-4 px-6 h-20 flex items-center justify-between font-medium text-gray-700 hover:bg-gray-50 transition-colors"
				>
				<span className="text-base sm:text-lg flex items-center">
					Add New Transaction
				</span>

				<span className={`transform transition-transform duration-300 ${showForm ? 'rotate-45' : 'rotate-0'}`}>
					+
				</span>
			</button>

			{/* Conditionally render the form */}
			{showForm && (
				<TransactionForm
					onAdd={(data) => {
						onAdd(data);
						setShowForm(false);
					}}
				/>
			)}
		</div>
	);
}

export default AddTransaction;