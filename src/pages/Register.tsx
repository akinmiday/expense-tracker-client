// import React, { useState } from "react";
// import { registerUser } from "../services/api";
// import { FiUser, FiMail, FiLock } from "react-icons/fi";
// import "./styles/Auth.css";

// const Register: React.FC = () => {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await registerUser(form);
//       alert("Registration successful!");
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         alert(`Failed to register: ${err.message}`);
//       } else {
//         alert("Failed to register.");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="auth-form">
//       <div className="auth-input-group">
//         <FiUser className="auth-icon" />
//         <input
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           required
//           className="auth-input"
//         />
//       </div>
//       <div className="auth-input-group">
//         <FiMail className="auth-icon" />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="auth-input"
//         />
//       </div>
//       <div className="auth-input-group">
//         <FiLock className="auth-icon" />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="auth-input"
//         />
//       </div>
//       <button type="submit" className="auth-button auth-button-register">
//         Register
//       </button>
//     </form>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { registerUser } from "../services/api";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./styles/Auth.css";

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
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Register</h2>
        <div className="auth-input-group">
          <FiUser className="auth-icon" />
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="auth-input"
          />
        </div>
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
        <button type="submit" className="auth-button auth-button-register">
          Register
        </button>
        <p className="auth-switch">
          Already a user?{" "}
          <Link to="/login" className="auth-link">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
