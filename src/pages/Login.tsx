import React, { useState } from "react";
import { loginUser } from "../services/api";
import "./styles/Auth.css"; // Import the CSS file

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(form);
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
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="auth-input"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="auth-input"
      />
      <button type="submit" className="auth-button auth-button-login">
        Login
      </button>
    </form>
  );
};

export default Login;
