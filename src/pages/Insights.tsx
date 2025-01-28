import React, { useState, useEffect } from "react";
import { getSpendingInsights, getPrevInsights } from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./styles/Insights.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface InsightsData {
  totalSpending: number;
  categorySpending: Record<string, number>;
  insights: string;
  createdAt?: string;
}

const Insights: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [previousInsights, setPreviousInsights] = useState<InsightsData[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<InsightsData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch previous insights on component mount
  useEffect(() => {
    const fetchPreviousInsights = async () => {
      try {
        const response = await getPrevInsights();
        setPreviousInsights(response.data);
      } catch (err) {
        console.error("Failed to fetch previous insights:", err);
        setError("Failed to fetch previous insights. Please try again later.");
      }
    };

    fetchPreviousInsights();
  }, []);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const cleanText = (text: string): string => {
    return text
      .replace(/#+/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/---/g, "")
      .replace(/\n/g, "<br />");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    setLoading(true);
    setError(null);

    try {
      const response = await getSpendingInsights({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setInsights(response.data);
      setSelectedInsight(null); // Reset selected insight when fetching new insights
    } catch (err) {
      console.error("Failed to fetch insights:", err);
      setError("Failed to fetch insights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectInsight = (insight: InsightsData) => {
    setSelectedInsight(insight);
    setInsights(null); // Reset current insights when selecting a previous insight
  };

  const chartData =
    selectedInsight || insights
      ? Object.entries(
          (selectedInsight?.categorySpending || insights?.categorySpending) ??
            {}
        ).map(([category, amount]) => ({
          category,
          amount,
        }))
      : [];

  return (
    <div className="insights-container">
      <h1 className="insights-title">Spending Insights</h1>
      <form className="insights-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-date">End Date</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Loading..." : "Get Insights"}
        </button>
      </form>

      {loading && <div className="loading-spinner">Loading insights...</div>}

      {error && <p className="error-message">{error}</p>}

      {/* Display previous insights dropdown */}
      {previousInsights.length > 0 && (
        <div className="previous-insights">
          <h3>Previous Insights</h3>
          <select
            onChange={(e) => {
              const selected = previousInsights.find(
                (insight) => insight.createdAt === e.target.value
              );
              if (selected) handleSelectInsight(selected);
            }}
          >
            <option value="">Select a previous insight</option>
            {previousInsights.map((insight) => (
              <option
                key={insight.createdAt || insight.totalSpending}
                value={insight.createdAt}
              >
                {insight.createdAt
                  ? new Date(insight.createdAt).toLocaleDateString()
                  : "Unknown Date"}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display insights or selected insight */}
      {(insights || selectedInsight) && !loading && (
        <div className="insights-card">
          <h2>
            Total Spending: $
            {selectedInsight?.totalSpending || insights?.totalSpending}
          </h2>
          <h3>Category-wise Spending:</h3>
          <SpendingChart data={chartData} />
          <div className="insights-text">
            <h4>Insights:</h4>
            <p
              className="insights-details"
              dangerouslySetInnerHTML={{
                __html: cleanText(
                  (selectedInsight?.insights || insights?.insights) ?? ""
                ),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const SpendingChart: React.FC<{
  data: { category: string; amount: number }[];
}> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Spending",
        data: data.map((item) => item.amount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Category-wise Spending",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Insights;
