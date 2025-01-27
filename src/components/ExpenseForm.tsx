import React, { useState } from "react";
import { FaDollarSign, FaAlignLeft, FaCalendarAlt } from "react-icons/fa";
import "./styles/ExpenseForm.css";

interface ExpenseFormProps {
  onSubmit: (amount: number, description: string, date: string) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate amount
    const amountNumber = Number(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    // Validate date
    const selectedDate = new Date(date);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      setError("Date cannot be in the future.");
      return;
    }

    // Clear error and submit
    setError("");
    onSubmit(amountNumber, description, date);
    setAmount("");
    setDescription("");
    setDate("");
    setIsFormVisible(false); // Hide the form after submission
  };

  return (
    <div className="expense-container">
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="toggle-button"
        >
          Add Expense
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="expense-form">
          <h2 className="form-title">Add New Expense</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="amount">
              <FaDollarSign className="icon" /> Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              <FaAlignLeft className="icon" /> Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">
              <FaCalendarAlt className="icon" /> Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">
              Add Expense
            </button>
            <button
              type="button"
              onClick={() => setIsFormVisible(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;
