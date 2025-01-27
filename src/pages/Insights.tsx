import React, { useState } from "react";
import { getSpendingInsights } from "../services/api";

// Define the structure of the insights data
interface InsightsData {
  totalSpending: number;
  categorySpending: Record<string, number>; // Key-value pairs of category and amount
  insights: string;
}

const Insights: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [insights, setInsights] = useState<InsightsData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await getSpendingInsights({ startDate, endDate });
      setInsights(response.data);
    } catch (err) {
      console.error("Failed to fetch insights:", err);
    }
  };

  return (
    <div>
      <h1>Spending Insights</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit">Get Insights</button>
      </form>
      {insights && (
        <div>
          <h2>Total Spending: ${insights.totalSpending}</h2>
          <h3>Category-wise Spending:</h3>
          <ul>
            {Object.entries(insights.categorySpending).map(
              ([category, amount]) => (
                <li key={category}>
                  {category}: ${amount as number}{" "}
                  {/* Explicitly type 'amount' as number */}
                </li>
              )
            )}
          </ul>
          <p>{insights.insights}</p>
        </div>
      )}
    </div>
  );
};

export default Insights;
