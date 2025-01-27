import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { addExpense, getUserExpenses } from "../services/api";

// Define the Expense type with _id included
interface Expense {
  _id: string;
  amount: number;
  description: string;
  date: string;
}

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getUserExpenses();
      setExpenses(response.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  const handleAddExpense = async (
    amount: number,
    description: string,
    date: string
  ) => {
    try {
      await addExpense({ amount, description, date });
      fetchExpenses(); // Refresh the list
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onSubmit={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Home;
