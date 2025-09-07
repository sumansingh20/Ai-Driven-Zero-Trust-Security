"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Eye, EyeOff, Lock, Mail, User, Building, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { authService } from "@/src/services/auth"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    role: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions")
      setIsLoading(false)
      return
    }

    try {
      // Use real authentication service
      const result = await authService.register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        department: formData.organization || formData.role
      });

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10"></div>
        </div>
        
        <Card className="border-slate-700 bg-slate-800/90 backdrop-blur-sm shadow-2xl max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-600 rounded-full">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
            <p className="text-slate-300 mb-6">
              Your account has been created successfully. Please check your email for verification instructions.
            </p>
            <Link href="/signin">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Continue to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
      </div>
      
      <div className="relative w-full max-w-2xl">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-2xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join CyberShield</h1>
          <p className="text-blue-200">Create your security operations account</p>
        </div>

        <Card className="border-slate-700 bg-slate-800/90 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-white">Create Account</CardTitle>
            <CardDescription className="text-center text-slate-300">
              Get started with advanced cybersecurity tools
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-500 bg-red-500/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-200">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-200">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@cybershield.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-slate-200">Organization</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Company Name"
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-slate-200">Role</Label>
                  <Select onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-blue-500">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="security-analyst">Security Analyst</SelectItem>
                      <SelectItem value="penetration-tester">Penetration Tester</SelectItem>
                      <SelectItem value="security-engineer">Security Engineer</SelectItem>
                      <SelectItem value="soc-manager">SOC Manager</SelectItem>
                      <SelectItem value="ciso">CISO</SelectItem>
                      <SelectItem value="researcher">Security Researcher</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-200">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="border-slate-600 data-[state=checked]:bg-blue-600 mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-slate-300 leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-slate-400">Already have an account? </span>
              <Link href="/signin" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
