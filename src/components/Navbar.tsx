import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./styles/Navbar.css";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      alert("Logout successful!");
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Failed to log out: ${err.message}`);
      } else {
        alert("Failed to log out.");
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/insights" className="navbar-link">
          Insights
        </Link>
      </div>
      <button onClick={handleLogout} className="navbar-logout-button">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
