import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Brain,
  Network,
  Users,
  Eye,
  ArrowRight,
  Play,
  Star,
  Target,
  Lock
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Simple Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CyberShield</h1>
                <p className="text-xs text-slate-400">AI-Driven Security</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-600/20 text-blue-400 border-blue-500/30 px-4 py-2">
              🚀 Next-Generation Cybersecurity Platform
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI-Driven
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                &nbsp;Zero Trust&nbsp;
              </span>
              Security
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced cybersecurity platform powered by artificial intelligence. 
              Protect your organization with cutting-edge threat detection, real-time monitoring, 
              and automated response capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/signin">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                  <Shield className="h-5 w-5 mr-2" />
                  Access Security Center
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-6"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Comprehensive Security Arsenal
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our platform combines multiple security disciplines into a unified, AI-powered defense system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Threat Intelligence</h3>
                <p className="text-slate-400 leading-relaxed">Advanced OSINT analysis and threat correlation with real-time IOCs and attack pattern recognition</p>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Network className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Network Infiltration</h3>
                <p className="text-slate-400 leading-relaxed">Real-time network monitoring with advanced intrusion detection and automated response systems</p>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">User Behavior Analytics</h3>
                <p className="text-slate-400 leading-relaxed">AI-powered behavioral analysis to detect insider threats and compromised accounts</p>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Penetration Testing</h3>
                <p className="text-slate-400 leading-relaxed">Professional-grade security assessment tools with automated vulnerability scanning</p>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Advanced Exploitation</h3>
                <p className="text-slate-400 leading-relaxed">Comprehensive CVE database with working exploits for security research and testing</p>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Zero Trust Architecture</h3>
                <p className="text-slate-400 leading-relaxed">Implementation of zero trust principles with continuous verification and least privilege access</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Secure Your Organization?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Join thousands of organizations that trust CyberShield to protect their digital assets
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                  <Star className="h-5 w-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="/signin">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-6"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>

            <p className="text-slate-500 mt-6">
              Ready to start • Easy setup • Professional support
            </p>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">CyberShield</h3>
                <p className="text-sm text-slate-400">AI-Driven Security</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6">
              Advanced cybersecurity platform powered by artificial intelligence
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
              <span>&copy; 2025 CyberShield. All rights reserved.</span>
              <span>•</span>
              <span>AI-Powered Protection</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
