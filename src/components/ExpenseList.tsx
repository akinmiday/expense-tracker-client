import React from "react";
import "./styles/ExpenseList.css"; // Import CSS for styling

interface Expense {
  _id: string;
  amount: number;
  description: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  if (expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id} className="expense-item">
            <span className="expense-description">{expense.description}</span>
            <span className="expense-amount">${expense.amount.toFixed(2)}</span>
            <span className="expense-date">
              on {new Date(expense.date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
