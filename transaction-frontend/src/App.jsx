import React, { useEffect, useState } from 'react';
import AddTransaction from './components/AddTransaction';
import Filter from './components/Filter';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';

// Dynamically use backend URLs depending on environment
const BASE_URL = import.meta.env.VITE_TRANSACTION_SERVICE_API_URL || 'http://localhost:8080';
const REPORT_BASE_URL = import.meta.env.VITE_REPORT_SERVICE_API_URL || 'http://localhost:8081';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  // Load all transactions and update state
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/transactions`);
      const data = await response.json();
      setTransactions(data);
      setFiltered(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Load summary data (income and expense totals)
  const fetchSummary = async () => {
    try {
      const incomeRes = await fetch(`${REPORT_BASE_URL}/report/income`);
      const income = await incomeRes.json();

      const expenseRes = await fetch(`${REPORT_BASE_URL}/report/expense`);
      const expense = await expenseRes.json();

      setSummary({ income, expense });
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  // Send transaction to backend
  const handleAddTransaction = async (transaction) => {
    try {
      const response = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        fetchTransactions();
        fetchSummary();
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  // Run once on component mount
  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
      <Summary summary={summary} />
      <AddTransaction onAdd={handleAddTransaction} />
      <Filter transactions={transactions} setFiltered={setFiltered} />
      <TransactionList transactions={filtered} />
    </div>
  );
}

export default App;