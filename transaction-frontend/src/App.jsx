import React, { useState, useEffect, useCallback } from "react"; 
import './App.css'
import Header from './components/Header'
import TransactionForm from './components/TransactionForm'
import TransactionList from "./components/TransactionList";
import TransactionSummary from "./components/TransactionSummary";
import TransactionFilter from "./components/TransactionFilter";
import Pagination from "./components/Pagination";


function App() {

  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [page, setPage] = useState(0); // zero-based page index
  const [size] = useState(10); // transactions per page
  const [totalPages, setTotalPages] = useState(0);

  const fetchTransactions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchText.trim()) params.append("keyword", searchText.trim());
      if (minAmount) params.append("min", minAmount);
      if (maxAmount) params.append("max", maxAmount);
      if (filterType !== "all") params.append("type", filterType.toUpperCase());

      // Add pagination
      params.append("page", page);
      params.append("size", size);
      params.append("sort", "timestamp,desc");

      const response = await fetch(`http://localhost:8080/transactions/paginated?${params.toString()}`);
      const data = await response.json();

      setTransactions(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  }, [searchText, minAmount, maxAmount, filterType, page, size]);
  
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch("http://localhost:8080/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) throw new Error("Failed to save transaction");

      fetchTransactions();
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete transaction");

      // Update the UI by removing the deleted transaction
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-xl mx-auto p-4">
        <TransactionSummary transactions={transactions} />
        <TransactionForm onAdd={handleAddTransaction} />
        <TransactionFilter
          searchText={searchText}
          setSearchText={setSearchText}
          filterType={filterType}
          setFilterType={setFilterType}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
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