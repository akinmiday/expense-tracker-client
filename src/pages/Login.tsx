import React, { useState } from "react";
import { loginUser } from "../services/api";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import "./styles/Auth.css";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          />
        </div>
        <button type="submit" className="auth-button auth-button-login">
          Login
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
