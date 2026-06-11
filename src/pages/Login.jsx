import React, { useState } from "react";
import { api } from "../api/api";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      toast.success(res.data.message || "Login Success!");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);

    } catch (err) {
      const msg =
        err.response?.data?.message || "Login Failed ❌";

      toast.error(msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Login</h2>

        <form onSubmit={login}>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </motion.button>
        </form>
      </motion.div>

    </div>
  );
}