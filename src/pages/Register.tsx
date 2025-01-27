import React, { useState } from "react";
import { registerUser } from "../services/api";
import "./styles/Auth.css"; // Import the CSS file

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registration successful!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Failed to register: ${err.message}`);
      } else {
        alert("Failed to register.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        className="auth-input"
      />
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
      <button type="submit" className="auth-button auth-button-register">
        Register
      </button>
    </form>
  );
};

export default Register;
