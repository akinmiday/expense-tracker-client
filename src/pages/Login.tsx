import React, { useState } from "react";
import { loginUser } from "../services/api";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import "./styles/Auth.css";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Add loading state
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts

    try {
      await loginUser(form);
      login(); // Call login function from context
      navigate("/"); // Redirect to home page
      alert("Login successful!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Failed to log in: ${err.message}`);
      } else {
        alert("Failed to log in.");
      }
    } finally {
      setLoading(false); // Set loading to false when login ends
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Login</h2>
        <div className="auth-input-group">
          <FiMail className="auth-icon" />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="auth-input"
            disabled={loading} // Disable input while loading
          />
        </div>
        <div className="auth-input-group">
          <FiLock className="auth-icon" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="auth-input"
            disabled={loading} // Disable input while loading
          />
        </div>
        <button
          type="submit"
          className="auth-button auth-button-login"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <div className="spinner"></div> // Show spinner when loading
          ) : (
            "Login"
          )}
        </button>
        <p className="auth-switch">
          Not a user?{" "}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
