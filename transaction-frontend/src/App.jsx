import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import TransactionSummary from "./components/TransactionSummary";
import TransactionFilter from "./components/TransactionFilter";
import Pagination from "./components/Pagination";

const BASE_URL = import.meta.env.VITE_TRANSACTION_SERVICE_API_URL || 'http://localhost:8080';
const REPORT_BASE_URL = import.meta.env.VITE_REPORT_SERVICE_API_URL || 'http://localhost:8081';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(7);
  const [totalPages, setTotalPages] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // NEW STATE FOR SUMMARY
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // Fetch Transactions
  const fetchTransactions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchText.trim()) params.append("keyword", searchText.trim());
      if (minAmount) params.append("min", minAmount);
      if (maxAmount) params.append("max", maxAmount);
      if (filterType !== "all") params.append("type", filterType.toUpperCase());

      params.append("page", page);
      params.append("size", size);
      params.append("sort", "timestamp,desc");

      const response = await fetch(`${BASE_URL}/transactions/paginated?${params.toString()}`);
      const data = await response.json();

      setTransactions(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  }, [searchText, minAmount, maxAmount, filterType, page, size]);

  // Fetch Summary (Income, Expense, Balance)
  const fetchSummary = useCallback(async () => {
    try {
      const [incomeRes, expenseRes, balanceRes] = await Promise.all([
        fetch(`${REPORT_BASE_URL}/report/income`),
        fetch(`${REPORT_BASE_URL}/report/expense`),
        fetch(`${REPORT_BASE_URL}/report/balance`),
      ]);

      const [income, expense, balance] = await Promise.all([
        incomeRes.json(),
        expenseRes.json(),
        balanceRes.json(),
      ]);

      setSummary({ income, expense, balance });
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  }, []);

  // Fetch on mount or any time dependencies change
  useEffect(() => {
    fetchTransactions();
    fetchSummary(); // ✅ Fetch summary on load
  }, [fetchTransactions, fetchSummary]);

  // After creating a transaction → fetch again
  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) throw new Error("Failed to save transaction");

      await fetchTransactions(); // REFRESH transactions
      await fetchSummary(); // REFRESH summary
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  // After deleting a transaction → fetch again
  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete transaction");

      await fetchTransactions(); // REFRESH transactions
      await fetchSummary(); // REFRESH summary
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:text-white">
      <Header />
      <main className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-4 py-4 sm:py-6">
        <TransactionSummary summary={summary} />
        <AddTransaction onAdd={handleAddTransaction} />
        <TransactionFilter
          searchText={searchText}
          setSearchText={setSearchText}
          filterType={filterType}
          setFilterType={setFilterType}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
          setPage={setPage}
        />
        <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}

export default App;