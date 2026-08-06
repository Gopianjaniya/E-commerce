import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const res = await axios.post(backendUrl + "/api/user/register", { name, email, password });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);
          toast.success("Account created! Welcome 🎉");
        } else toast.error(res.data.message);
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", { email, password });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userEmail", email);
          toast.success("Logged in successfully!");
        } else toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (token) navigate("/"); }, [token]);

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}
      className="min-h-[80vh] flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card p-8 sm:p-10">
          {/* Logo area */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
              A
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {mode === "login" ? "Sign in to your ApnaCart account" : "Join ApnaCart today"}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Your full name"
                  required
                  className="input-modern"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
                className="input-modern"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                {mode === "login" && (
                  <button type="button" className="text-xs text-blue-600 hover:underline">Forgot?</button>
                )}
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                required
                className="input-modern"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="spinner" />
              ) : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </motion.div>
  );
}
