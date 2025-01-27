// import React, { useState } from "react";
// import { getSpendingInsights } from "../services/api";
// import "./styles/Insights.css";

// interface InsightsData {
//   totalSpending: number;
//   categorySpending: Record<string, number>;
//   insights: string;
// }

// const Insights: React.FC = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [insights, setInsights] = useState<InsightsData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const formatDate = (date: string) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so adding 1
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!startDate || !endDate) {
//       setError("Please select both start and end dates.");
//       return;
//     }

//     // Format the dates before sending
//     const formattedStartDate = formatDate(startDate);
//     const formattedEndDate = formatDate(endDate);

//     setLoading(true);
//     setError(null);
//     console.log("Fetching insights with:", {
//       startDate: formattedStartDate,
//       endDate: formattedEndDate,
//     });

//     try {
//       const response = await getSpendingInsights({
//         startDate: formattedStartDate,
//         endDate: formattedEndDate,
//       });
//       setInsights(response.data);
//     } catch (err) {
//       console.error("Failed to fetch insights:", err);
//       setError("Failed to fetch insights. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="insights-container">
//       <h1 className="insights-title">Spending Insights</h1>
//       <form className="insights-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="start-date">Start Date</label>
//           <input
//             id="start-date"
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="end-date">End Date</label>
//           <input
//             id="end-date"
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn-submit" disabled={loading}>
//           {loading ? "Loading..." : "Get Insights"}
//         </button>
//       </form>

//       {loading && <div className="loading-spinner">Loading insights...</div>}

//       {error && <p className="error-message">{error}</p>}

//       {insights && !loading && (
//         <div className="insights-card">
//           <h2>Total Spending: ${insights.totalSpending}</h2>
//           <h3>Category-wise Spending:</h3>
//           <ul className="category-list">
//             {Object.entries(insights.categorySpending).map(
//               ([category, amount]) => (
//                 <li key={category}>
//                   <span className="category-name">{category}</span>: ${amount}
//                 </li>
//               )
//             )}
//           </ul>
//           <div className="insights-text">
//             <h4>Insights:</h4>
//             <p
//               className="insights-details"
//               dangerouslySetInnerHTML={{ __html: insights.insights }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Insights;

import React, { useState } from "react";
import { getSpendingInsights } from "../services/api";
import "./styles/Insights.css";

interface InsightsData {
  totalSpending: number;
  categorySpending: Record<string, number>;
  insights: string;
}

const Insights: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so adding 1
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    // Format the dates before sending
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    setLoading(true);
    setError(null);
    console.log("Fetching insights with:", {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    try {
      // Assuming the API expects a POST request with a JSON body
      const response = await getSpendingInsights({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setInsights(response.data);
    } catch (err) {
      console.error("Failed to fetch insights:", err);
      setError("Failed to fetch insights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

      {insights && !loading && (
        <div className="insights-card">
          <h2>Total Spending: ${insights.totalSpending}</h2>
          <h3>Category-wise Spending:</h3>
          <ul className="category-list">
            {Object.entries(insights.categorySpending).map(
              ([category, amount]) => (
                <li key={category}>
                  <span className="category-name">{category}</span>: ${amount}
                </li>
              )
            )}
          </ul>
          <div className="insights-text">
            <h4>Insights:</h4>
            <p
              className="insights-details"
              dangerouslySetInnerHTML={{ __html: insights.insights }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
