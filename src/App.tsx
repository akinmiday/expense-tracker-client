import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthContext

const App: React.FC = () => {
  const PrivateRoute: React.FC = () => {
    const { isAuthenticated } = useAuth(); // Get authentication state

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Layout />;
  };
  return (
    <AuthProvider>
      {/* Wrap the entire app in AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="insights" element={<Insights />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
