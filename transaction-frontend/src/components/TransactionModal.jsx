import React, { useState, useEffect } from "react";
import {
	X, Edit, Trash2, Save, CreditCard, ShoppingCart, Home,
	Zap, Utensils, Code, Laptop, Banknote, Plus, Minus
} from 'lucide-react';

function TransactionModal({ transaction, onClose, onDelete, onEdit }) {
	if (!transaction) return null;

	const { description, amount, type, timestamp, note } = transaction;
	const [isEditing, setIsEditing] = useState(false);
	const [editDescription, setEditDescription] = useState(description);
	const [editAmount, setEditAmount] = useState(amount);
	const [editType, setEditType] = useState(type.toLowerCase());
	const [editNote, setEditNote] = useState(note || "");

	// Add this useEffect to update edit states when transaction changes:
	useEffect(() => {
		setEditDescription(description);
		setEditAmount(amount);
		setEditType(type.toLowerCase());  // important to reset to current transaction value
		setEditNote(note || "");
		setIsEditing(false);  // reset editing mode when switching transaction
	}, [transaction]);

	const formattedDate = new Date(timestamp).toLocaleString("cs-CZ");
	const formattedAmount = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);

	const handleSave = () => {
		// Basic validation
		if (!editDescription.trim()) {
			alert("Description cannot be empty");
			return;
		}

		const parsedAmount = parseFloat(editAmount);
		if (isNaN(parsedAmount) || parsedAmount <= 0) {
			alert("Amount must be a number greater than 0");
			return;
		}

		// Build updated transaction object
		const updatedTransaction = {
			...transaction,
			description: editDescription.trim(),
			amount: parsedAmount,
			type: editType.toUpperCase(),
			note: editNote.trim(),
		};

		// Call the onEdit prop to update in the parent
		onEdit(updatedTransaction);

		// Exit edit mode
		setIsEditing(false);
	};

	const isIncome = type === 'INCOME';
	const bgColor = isIncome ? 'bg-green-100' : 'bg-red-100';
	const textColor = isIncome ? 'text-green-600' : 'text-red-600';
	const Icon = isIncome ? Banknote : ShoppingCart;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-lg w-full max-w-sm sm:max-w-md overflow-hidden max-h-[90vh] overflow-y-auto animate-fadeIn">

				<div className="flex justify-between items-center border-b border-gray-200 px-8 py-6">
					<h2 className="text-base sm:text-lg font-medium text-gray-800 ">
						{isEditing ? 'Edit Transaction' : 'Transaction Details'}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={20} />
					</button>
				</div>

				<div className="p-4 sm:p-8">
					{isEditing ? (
						// EDIT FORM JSX
						<div className="space-y-4 sm:space-y-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1 text-left">Description</label>
								<input
									type="text"
									value={editDescription}
									onChange={(e) => setEditDescription(e.target.value)}
									className="w-full px-4 py-2 h-12 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1 text-left">Amount</label>
								<input
									type="number"
									value={editAmount}
									onChange={(e) => setEditAmount(e.target.value)}
									className="w-full px-4 py-2 h-12 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div>
								<span className="block text-sm font-medium text-gray-700 mb-1 text-left">Transaction Type</span>
								<div className="flex gap-6">
									<button
										type="button"
										onClick={() => setEditType("income")}
										className={`flex-1 py-2 px-4 h-12 rounded-lg transition-colors ${editType === "income"
											? "bg-green-100 text-green-700 border border-green-500"
											: "bg-gray-100 text-gray-700 border border-transparent"
											}`}
									>
										Income
									</button>

									<button
										type="button"
										onClick={() => setEditType("expense")}
										className={`flex-1 py-2 px-4 rounded-lg transition-colors ${editType === "expense"
											? "bg-red-100  text-red-700 border border-red-500"
											: "bg-gray-100  text-gray-700 border border-transparent"
											}`}
									>
										Expense
									</button>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1 text-left">Note (optional)</label>
								<textarea
									rows={3}
									value={editNote}
									onChange={(e) => setEditNote(e.target.value)}
									className="w-full px-4 py-2 rounded-lg border border-gray-300  bg-white da text-gray-800  focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0 gap-2">
								<button
									onClick={handleSave}
									className="h-12 py-2 px-8 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
								>
									<Save size={18} className="mr-1" />
									Save
								</button>
								<button
									onClick={() => setIsEditing(false)}
									className="h-12 py-2 px-8 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
									>
									Cancel
								</button>
							</div>
						</div>
						// EDIT FORM JSX
					) : (
						// CURRENT DETAILS JSX here (what you already have)
						<div className="">
							<div className="flex flex-col items-center mt-4 mb-10">
								<div className={`w-12 h-12 mb-6 rounded-full flex items-center justify-center text-2xl ${bgColor}`}>
									<Icon className={`${textColor}`} size={30} />
								</div>
								<p
									className={`text-3xl font-bold ${type === "INCOME" ? "text-green-600" : "text-red-600"
										}`}
								>
									{type === "INCOME" ? "+" : "-"}
									{formattedAmount}
								</p>
							</div>
							<div className="mb-8 space-y-2">
								<p className="text-gray-700">
									<strong>Description:</strong> {description}
								</p>
								<p className="text-gray-700">
									<strong>Amount:</strong> {formattedAmount}
								</p>
								<p className="text-gray-700">
										<strong>Type:</strong> {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
								</p>
								<p className="text-gray-700">
									<strong>Date:</strong> {formattedDate}
								</p>
								{note && (
									<p className="text-gray-700">
										<strong>Note:</strong> {note}
									</p>
								)}
							</div>

							<div className="flex flex-col sm:flex-row justify-between sm:space-x-2 space-y-2 sm:space-y-0 pt-6 pb-2 border-t border-gray-200">
								<button
									onClick={() => {
										onDelete(transaction.id);
										onClose();
									}}
									className="h-12 py-2 px-8 bg-red-500 hover:bg-red-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
								>
									<Trash2 size={18} className="mr-1" />
									Delete
								</button>

								<button
									onClick={() => setIsEditing(true)}
									className="h-12 py-2 px-8 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
								>
									<Edit size={18} className="mr-1" />

									Edit
								</button>

							
									<button
										onClick={onClose}
										className="h-12 py-2 px-8 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
									>
										<X size={18} className="mr-1" />
										Close
									</button>

							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default TransactionModal;