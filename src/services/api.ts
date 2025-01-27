import axios from "axios";

// Define environment variable for base URL
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies
});

// Define interfaces for API responses
interface RegisterResponse {
  message: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

interface LoginResponse {
  message: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  token: string;
}

interface Expense {
  _id: string;
  amount: number;
  description: string;
  date: string;
  user: string;
}

interface SpendingInsights {
  totalSpending: number;
  categorySpending: Record<string, number>;
  insights: string;
}

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const registerUser = (data: {
  username: string;
  email: string;
  password: string;
}): Promise<{ data: RegisterResponse }> => api.post("/users/register", data);

export const loginUser = (data: {
  email: string;
  password: string;
}): Promise<{ data: LoginResponse }> => api.post("/users/login", data);

export const logoutUser = (): Promise<{ data: { message: string } }> =>
  api.post("/logout");

// Expense endpoints
export const addExpense = (data: {
  amount: number;
  description: string;
  date: string;
}): Promise<{ data: Expense }> => api.post("/expenses", data);

export const getUserExpenses = (): Promise<{ data: Expense[] }> =>
  api.get("/expenses");

// export const getSpendingInsights = (params: {
//   startDate: string;
//   endDate: string;
// }): Promise<{ data: SpendingInsights }> =>
//   api.get("/expenses/insights", { params });

export const getSpendingInsights = (params: {
  startDate: string;
  endDate: string;
}): Promise<{ data: SpendingInsights }> => {
  console.log("Sending params to /expenses/insights:", params); // Debug log
  return api.get("/expenses/insights", { params });
};

export default api;
