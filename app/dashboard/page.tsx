"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navigation from "@/src/components/layout/Navigation"
import Footer from "@/src/components/layout/Footer"
import { ClientTime } from "@/src/components/common/ClientTime";
import { useToast } from "@/src/hooks/use-toast"
import { 
  Shield, AlertTriangle, Activity, Users, Network, Eye, Brain, Target, Globe, Bug,
  TrendingUp, ArrowUpRight, Timer, CheckCircle, User, Crown, Zap, Server, Lock
} from "lucide-react"
import Link from "next/link"

interface UserInfo {
  id: number
  email: string
  name: string
  role: string
  department: string
}

export default function Dashboard() {
  const { toast } = useToast()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [realTimeStats, setRealTimeStats] = useState({
    activeSessions: 1247,
    blockedThreats: 89,
    vulnerabilities: 23,
    systemUptime: 99.9,
    networkTraffic: 2.4,
    aiAccuracy: 97.8,
    responseTime: 0.3
  })
  
  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        ...prev,
        activeSessions: prev.activeSessions + Math.floor(Math.random() * 10) - 5,
        blockedThreats: prev.blockedThreats + Math.floor(Math.random() * 3),
        networkTraffic: Math.max(0.1, prev.networkTraffic + (Math.random() - 0.5) * 0.5),
        responseTime: Math.max(0.1, 0.3 + (Math.random() - 0.5) * 0.1)
      }))
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo))
      } catch (error) {
        console.error('Error parsing user info:', error)
      }
    }
  }, [])

  const securityModules = [
    {
      title: "Threat Intelligence",
      description: "Advanced OSINT and threat correlation analysis",
      href: "/threat-intelligence",
      icon: Brain,
      status: "active",
      threats: 1247
    },
    {
      title: "Network Infiltration", 
      description: "Real-time network monitoring and intrusion detection",
      href: "/network-infiltration",
      icon: Network,
      status: "active",
      threats: 89
    },
    {
      title: "User Behavior Analytics",
      description: "AI-powered behavioral analysis for insider threats",
      href: "/identity/user-behavior-analytics", 
      icon: Users,
      status: "active",
      threats: 23
    },
    {
      title: "Penetration Testing",
      description: "Professional security assessment tools",
      href: "/pentest-arsenal",
      icon: Target,
      status: "active", 
      threats: 156
    },
    {
      title: "Exploit Development",
      description: "Comprehensive CVE database with working exploits",
      href: "/exploit-development",
      icon: Bug,
      status: "active",
      threats: 67
    },
    {
      title: "Vulnerability Assessment", 
      description: "Automated vulnerability scanning and management",
      href: "/vulnerability",
      icon: Shield,
      status: "active",
      threats: 234
    }
  ]

  const runSystemDiagnostics = () => {
    toast({
      title: "System Diagnostics Started",
      description: "Running comprehensive security system diagnostics...",
    })
    
    setTimeout(() => {
      toast({
        title: "Diagnostics Complete",
        description: "All systems operational. Security posture: STRONG",
      })
    }, 3000)
  }

  const getRoleIcon = (role: string) => {
    if (role === 'admin') return <Crown className="h-4 w-4 text-yellow-500" />
    return <User className="h-4 w-4 text-blue-500" />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-4 pb-6">
        {/* Welcome Section */}
        {user && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-full">
                  {getRoleIcon(user.role)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Welcome back, {user.name}!</h2>
                  <p className="text-blue-200 text-sm">{user.department} • Security Operations Dashboard</p>
                  <p className="text-xs text-slate-400 mt-1 opacity-75">
                    🎓 Developed by Suman Kumar at IIT Patna • Advanced AI-Driven Cybersecurity Research Platform
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="px-2 py-1 bg-blue-600 text-xs">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
                <div className="text-right">
                  <p className="text-sm text-slate-300">{user.email}</p>
                  <p className="text-xs text-slate-400">Last login: <ClientTime format="datetime" /></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
              Security Operations Center
            </h1>
            <p className="text-lg text-slate-400">AI-Driven Zero Trust Cybersecurity Platform</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2 text-sm">
                <Timer className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300">Last Update: </span>
                <span className="text-blue-400 font-mono"><ClientTime format="time" /></span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="h-4 w-4 text-green-400" />
                <span className="text-slate-300">Global Coverage: </span>
                <span className="text-green-400">24/7</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-lg px-4 py-2 text-yellow-500 border-yellow-500">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Threat Level: Elevated
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">All Systems Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
              <CardTitle className="text-sm font-medium text-slate-300">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="text-2xl font-bold text-white mb-1">{realTimeStats.activeSessions.toLocaleString()}</div>
              <p className="text-xs text-green-400 flex items-center mb-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Real-time monitoring
              </p>
              <Progress value={85} className="h-1" />
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
              <CardTitle className="text-sm font-medium text-slate-300">Threats Blocked</CardTitle>
              <Shield className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="text-2xl font-bold text-white mb-1">{realTimeStats.blockedThreats.toLocaleString()}</div>
              <p className="text-xs text-red-400 flex items-center mb-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{Math.floor(Math.random() * 5 + 2)} in last hour
              </p>
              <Progress value={68} className="h-1" />
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
              <CardTitle className="text-sm font-medium text-slate-300">Vulnerabilities</CardTitle>
              <Bug className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="text-2xl font-bold text-white mb-1">{realTimeStats.vulnerabilities}</div>
              <p className="text-xs text-yellow-400 mb-1">-2 patched today</p>
              <Progress value={30} className="h-1" />
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
              <CardTitle className="text-sm font-medium text-slate-300">System Health</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="text-2xl font-bold text-white mb-1">{realTimeStats.systemUptime}%</div>
              <p className="text-xs text-blue-400 mb-1">
                AI Accuracy: {realTimeStats.aiAccuracy}%
              </p>
              <Progress value={realTimeStats.systemUptime} className="h-1" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <Button 
            className="h-20 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={runSystemDiagnostics}
          >
            <div className="flex flex-col items-center space-y-2">
              <Activity className="h-6 w-6" />
              <span className="font-medium">Run Diagnostics</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 border-slate-700 hover:bg-slate-800"
            onClick={() => {
              toast({
                title: "Emergency Response Activated",
                description: "Activating emergency incident response protocol...",
              })
            }}
          >
            <div className="flex flex-col items-center space-y-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <span className="font-medium">Emergency Response</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 border-slate-700 hover:bg-slate-800"
            onClick={() => {
              toast({
                title: "Security Report Generated",
                description: "Executive security summary report generated and saved.",
              })
            }}
          >
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-6 w-6 text-green-400" />
              <span className="font-medium">Generate Report</span>
            </div>
          </Button>
        </div>

        {/* Security Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {securityModules.map((module, index) => {
            const Icon = module.icon
            return (
              <Link href={module.href} key={index}>
                <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm hover:from-slate-700/50 hover:to-slate-600/30 transition-all duration-300 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Icon className="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <Badge 
                        variant={module.status === 'active' ? 'default' : 'outline'}
                        className={module.status === 'active' ? 'bg-green-500/20 text-green-400 text-xs' : 'text-xs'}
                      >
                        {module.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-300 transition-colors text-lg">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-slate-400 mb-3 text-sm">
                      {module.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Active Threats</span>
                      <span className="text-lg font-bold text-white">{module.threats}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Security Alerts */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white mb-3">Security Alerts</h3>
          <Alert className="border-red-500 bg-red-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-400">
              <strong>Critical Alert:</strong> Potential advanced persistent threat detected in network segment 192.168.1.0/24
              <Link href="/exploit-development" className="underline ml-1 hover:text-red-300">
                Investigate Now →
              </Link>
            </AlertDescription>
          </Alert>
          <Alert className="border-yellow-500 bg-yellow-500/10">
            <Eye className="h-4 w-4" />
            <AlertDescription className="text-yellow-400">
              <strong>Security Notice:</strong> Unusual login patterns detected from 15 user accounts.
              <Link href="/identity/user-behavior-analytics" className="underline ml-1 hover:text-yellow-300">
                Review Behavior →
              </Link>
            </AlertDescription>
          </Alert>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
