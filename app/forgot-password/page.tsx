"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Mail, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple email validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
    }, 1500)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
        </div>
        
        <div className="relative w-full max-w-md">
          <Card className="border-slate-700 bg-slate-800/90 backdrop-blur-sm shadow-2xl">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-600 rounded-full">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
              <p className="text-slate-300 mb-2">
                We've sent a password reset link to:
              </p>
              <p className="text-blue-400 font-medium mb-6">{email}</p>
              <p className="text-slate-300 text-sm mb-6">
                Click the link in your email to reset your password. If you don't see the email, check your spam folder.
              </p>
              
              <div className="space-y-3">
                <Link href="/login">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => {
                    setSuccess(false)
                    setEmail("")
                  }}
                >
                  Try Another Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CyberShield</h1>
          <p className="text-blue-200">Reset Your Password</p>
        </div>

        <Card className="border-slate-700 bg-slate-800/90 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-white">Forgot Password?</CardTitle>
            <CardDescription className="text-center text-slate-300">
              No worries! Enter your email address and we'll send you a reset link.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-500 bg-red-500/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    required
                  />
                </div>
                <p className="text-xs text-slate-400">
                  We'll send a password reset link to this email address.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Send Reset Link</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">or</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <Link href="/login">
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
              
              <div className="text-sm text-slate-400">
                Remember your password?{" "}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-white mb-1">Security Notice</h3>
              <p className="text-xs text-slate-300">
                For your security, password reset links expire after 1 hour. 
                If you don't receive an email within a few minutes, please check your spam folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
