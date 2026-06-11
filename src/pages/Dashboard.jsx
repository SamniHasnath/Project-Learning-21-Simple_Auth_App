import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/dashboard")
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    await api.get("/auth/logout");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard">
        <h2>Unauthorized ❌</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      {/* Header */}
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Welcome 👋</h1>
        <p>Hello, {user.username || "User"}! Welcome back.</p>
      </motion.div>

      {/* Cards */}
      <div className="dashboard-cards">

        <motion.div
          className="card"
          whileHover={{ scale: 1.05 }}
        >
          <h3>Account Status</h3>
          <p>Active ✅</p>
        </motion.div>

        <motion.div
          className="card"
          whileHover={{ scale: 1.05 }}
        >
          <h3>User Role</h3>
          <p>{user.role || "Member"}</p>
        </motion.div>

        <motion.div
          className="card"
          whileHover={{ scale: 1.05 }}
        >
          <h3>Login Status</h3>
          <p>Logged In 🔐</p>
        </motion.div>

      </div>

      {/* Logout */}
      <motion.div
        className="logout-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button onClick={logout}>Logout</button>
      </motion.div>

    </div>
  );
}