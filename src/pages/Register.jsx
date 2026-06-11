import React, { useState } from "react";
import { api } from "../api/api";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        username,
        password,
      });

      toast.success(res.data.message || "Registered Successfully!");

    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration Failed ❌";

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
      >
        <h2>Register</h2>

        <form onSubmit={register}>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <motion.button
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? "Loading..." : "Register"}
          </motion.button>
        </form>
      </motion.div>

    </div>
  );
}