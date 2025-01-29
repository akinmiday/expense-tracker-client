import React from "react";
import { FaRegCalendarAlt, FaTags, FaMoneyBillWave } from "react-icons/fa";
import "./styles/ExpenseList.css";

interface Expense {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  if (expenses.length === 0) {
    return (
      <p className="no-expenses">
        No expenses found. Add your first expense to get started!
      </p>
    );
  }

  return (
    <div className="expense-list">
      <h4 className="title">Expenses</h4>
      <ul className="expense-items">
        {expenses.map((expense) => (
          <li key={expense._id} className="expense-item">
            <div className="expense-info">
              <FaTags className="icon category-icon" />
              <span className="expense-description">{expense.description}</span>
              <span className="expense-category">{expense.category}</span>
            </div>
            <div className="expense-details">
              <span className="expense-amount">
                <FaMoneyBillWave className="icon money-icon" />$
                {expense.amount.toFixed(2)}
              </span>
              <span className="expense-date">
                <FaRegCalendarAlt className="icon calendar-icon" />
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
