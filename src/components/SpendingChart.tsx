import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SpendingChartProps {
  data: { category: string; amount: number }[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  const chartData: ChartData<"bar"> = {
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

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Category-wise Spending",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
