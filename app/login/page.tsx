"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if ((email === "suman@cybershield.com" && password === "suman123") || 
          (email === "admin@cybershield.com" && password === "admin123")) {
        // Redirect to dashboard
        window.location.href = "/";
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">CyberShield</h1>
          <p className="text-blue-200">AI-Driven Zero Trust Security Platform</p>
        </div>

        <div className="border border-slate-700 bg-slate-800/90 backdrop-blur-sm shadow-2xl rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-white mb-4">Welcome Back</h2>
          <p className="text-center text-slate-300 mb-6">Sign in to your security operations center</p>
          
          {error && (
            <div className="border border-red-500 bg-red-500/10 p-3 rounded mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-slate-200 text-sm font-medium">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="suman@cybershield.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-slate-200 text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-300 text-center">
              <strong>Demo Credentials:</strong><br />
              <strong>Email:</strong> suman@cybershield.com<br />
              <strong>Password:</strong> suman123<br />
              <span className="text-slate-400">(Or admin@cybershield.com / admin123)</span>
            </p>
          </div>

          <div className="text-center mt-4">
            <span className="text-slate-400">Don't have an account? </span>
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
