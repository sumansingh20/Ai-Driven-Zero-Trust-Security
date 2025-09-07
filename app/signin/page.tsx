"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authService } from "@/src/services/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("suman@iitp.ac.in"); // Pre-fill with your email
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use real authentication service
      const result = await authService.login(email, password);
      
      if (result.success) {
        // Redirect to dashboard on successful login
        window.location.href = "/dashboard";
      } else {
        setError(result.message || "Authentication failed. Please check your credentials.");
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error.message || "Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-2xl">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
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
              <div className="relative">
                <svg className="absolute left-3 top-3 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-slate-200 text-sm font-medium">Password</label>
              <div className="relative">
                <svg className="absolute left-3 top-3 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
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
