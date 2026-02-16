"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ClientTime, ClientDate } from "@/components/client-time"
import { useToast } from "@/hooks/use-toast"
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Users, 
  Network, 
  Eye, 
  Brain,
  Target,
  Globe,
  Bug,
  Wifi,
  Search,
  TrendingUp,
  Minus,
  ArrowUpRight,
  Timer,
  CheckCircle,
  User,
  Crown,
  Zap,
  Database,
  Lock,
  Radar,
  Cpu,
  HardDrive,
  Server,
  MonitorSpeaker
} from "lucide-react"
import Link from "next/link"

interface UserInfo {
  id: number;
  email: string;
  name: string;
  role: string;
  department: string;
}

const securityModules = [
  {
    title: "Threat Intelligence",
    description: "Advanced OSINT and threat correlation analysis",
    href: "/threat-intelligence",
    icon: Brain,
    status: "active",
    threats: 1247,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Network Infiltration",
    description: "Real-time network security monitoring",
    href: "/network-infiltration",
    icon: Network,
    status: "active",
    threats: 89,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "User Behavior Analytics",
    description: "AI-powered user activity analysis",
    href: "/identity/user-behavior-analytics",
    icon: Users,
    status: "active",
    threats: 34,
    color: "from-purple-500 to-violet-500"
  },
  {
    title: "Advanced Exploitation",
    description: "CVE database and exploit research",
    href: "/advanced-exploitation",
    icon: Bug,
    status: "warning",
    threats: 156,
    color: "from-red-500 to-rose-500"
  },
  {
    title: "Penetration Testing",
    description: "Professional security assessment tools",
    href: "/pentest-arsenal",
    icon: Target,
    status: "active",
    threats: 0,
    color: "from-orange-500 to-amber-500"
  },
  {
    title: "WiFi Security",
    description: "Wireless network penetration testing",
    href: "/wifi-hacking",
    icon: Wifi,
    status: "active",
    threats: 12,
    color: "from-indigo-500 to-blue-500"
  }
]

export default function Dashboard() {
  const { toast } = useToast()
  const [selectedTab, setSelectedTab] = useState("overview")
  const [user, setUser] = useState<UserInfo | null>(null)
  const [realTimeStats, setRealTimeStats] = useState({
    activeSessions: 1247,
    blockedThreats: 89,
    vulnerabilitiesFound: 23,
    systemUptime: 99.9,
    networkTraffic: 2.4,
    lastScanTime: new Date(),
    aiModelAccuracy: 97.8,
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
        responseTime: Math.max(0.1, 0.3 + (Math.random() - 0.5) * 0.1),
        lastScanTime: new Date()
      }))
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo))
      } catch (error) {
        console.error('Error parsing user info:', error)
      }
    }
  }, [])
  
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
  
  const overallThreatLevel = 3
  const getThreatText = () => {
    if (overallThreatLevel >= 4) return { text: "Critical", color: "text-red-500" }
    if (overallThreatLevel >= 3) return { text: "Elevated", color: "text-yellow-500" }
    return { text: "Normal", color: "text-green-500" }
  }

  const threatInfo = getThreatText()

  const getRoleIcon = (role: string) => {
    if (role === 'admin') return <Crown className="h-4 w-4 text-yellow-500" />
    return <User className="h-4 w-4 text-blue-500" />
  }

  const getRoleBadgeColor = (role: string) => {
    if (role === 'admin') return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    return "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Personalized Welcome */}
        <div className="mb-8">
          {/* Welcome Message */}
          {user && (
            <div className="mb-6 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600 rounded-full">
                    {getRoleIcon(user.role)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Welcome back, {user.name}!
                    </h2>
                    <p className="text-blue-200 mt-1">
                      {user.department} • Security Operations Dashboard
                    </p>
                    <p className="text-xs text-slate-400 mt-2 opacity-75">
                      🎓 Developed by Suman Kumar at IIT Patna • Advanced AI-Driven Cybersecurity Research Platform
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={`${getRoleBadgeColor(user.role)} px-3 py-1`}>
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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                Security Operations Center
              </h1>
              <p className="text-xl text-slate-400">AI-Driven Zero Trust Cybersecurity Platform</p>
              <div className="flex items-center space-x-4 mt-3">
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
            <div className="flex flex-col items-end space-y-3">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className={`text-lg px-4 py-2 ${threatInfo.color} border-current`}>
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Threat Level: {threatInfo.text}
                </Badge>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">All Systems Online</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-400">
                <span>SOC Analysts: 12 Active</span>
                <span>•</span>
                <span>Response Time: 2.3 min avg</span>
              </div>
            </div>
          </div>

          {/* Enhanced Critical Alerts with Animation */}
          <div className="space-y-3">
            <Alert className="border-red-500 bg-red-500/10 animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-400">
                <strong>Critical Alert:</strong> Advanced Persistent Threat detected in corporate network. 
                <Link href="/advanced-exploitation" className="underline ml-1 hover:text-red-300">
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
        </div>

        {/* Enhanced Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm hover:from-slate-700/50 hover:to-slate-600/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Active Sessions</CardTitle>
              <div className="p-2 rounded-lg bg-green-500/20">
                <Activity className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{realTimeStats.activeSessions.toLocaleString()}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Real-time monitoring
                </p>
                <Badge variant="outline" className="text-xs border-green-500 text-green-400">Live</Badge>
              </div>
              <div className="mt-2">
                <Progress value={85} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">Network capacity: {(realTimeStats.networkTraffic).toFixed(1)} GB/s</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm hover:from-slate-700/50 hover:to-slate-600/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Threats Blocked</CardTitle>
              <div className="p-2 rounded-lg bg-red-500/20">
                <Shield className="h-4 w-4 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{realTimeStats.blockedThreats.toLocaleString()}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-red-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{Math.floor(Math.random() * 5 + 2)} in last hour
                </p>
                <Badge variant="destructive" className="text-xs">Active</Badge>
              </div>
              <div className="mt-2">
                <Progress value={68} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">Malware: {Math.floor(realTimeStats.blockedThreats * 0.4)} | Phishing: {Math.floor(realTimeStats.blockedThreats * 0.6)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm hover:from-slate-700/50 hover:to-slate-600/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Vulnerabilities</CardTitle>
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Bug className="h-4 w-4 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{realTimeStats.vulnerabilitiesFound}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-yellow-400 flex items-center">
                  <Minus className="h-3 w-3 mr-1" />
                  -2 patched today
                </p>
                <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-400">Medium</Badge>
              </div>
              <div className="mt-2">
                <Progress value={30} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">Critical: 3 | High: 7 | Medium: {realTimeStats.vulnerabilitiesFound - 10}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm hover:from-slate-700/50 hover:to-slate-600/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">System Health</CardTitle>
              <div className="p-2 rounded-lg bg-blue-500/20">
                <CheckCircle className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{realTimeStats.systemUptime}%</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-blue-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Response: {realTimeStats.responseTime.toFixed(1)}s
                </p>
                <Badge variant="outline" className="text-xs border-green-500 text-green-400">Optimal</Badge>
              </div>
              <div className="mt-2">
                <Progress value={realTimeStats.systemUptime} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">AI Accuracy: {realTimeStats.aiModelAccuracy}% | Last scan: {realTimeStats.lastScanTime.toLocaleTimeString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm hover:from-slate-700/50 hover:to-slate-600/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Blocked Attacks</CardTitle>
              <div className="p-2 rounded-lg bg-green-500/20">
                <Shield className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">45,231</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from yesterday
                </p>
                <Badge className="bg-green-500/20 text-green-400 text-xs">Excellent</Badge>
              </div>
              <div className="mt-2">
                <Progress value={92} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">Success Rate: 99.7% | Response: 245ms avg</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm hover:from-slate-700/50 hover:to-slate-600/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Network Health</CardTitle>
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Activity className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">98.7%</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 flex items-center">
                  <Minus className="h-3 w-3 mr-1" />
                  Stable performance
                </p>
                <Badge className="bg-blue-500/20 text-blue-400 text-xs">Optimal</Badge>
              </div>
              <div className="mt-2">
                <Progress value={99} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">Uptime: 99.9% | Latency: 12ms avg</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm hover:from-slate-700/50 hover:to-slate-600/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Users Monitored</CardTitle>
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Users className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">2,847</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-blue-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3% from yesterday
                </p>
                <Badge className="bg-purple-500/20 text-purple-400 text-xs">Active</Badge>
              </div>
              <div className="mt-2">
                <Progress value={85} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">Online: 2,421 | Anomalies: 15 flagged</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Security Modules Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Security Modules
              </h2>
              <p className="text-slate-400 mt-1">Comprehensive cybersecurity toolkit and monitoring systems</p>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Search className="h-4 w-4 mr-2" />
              View All Tools
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityModules.map((module) => (
              <Link key={module.title} href={module.href}>
                <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm hover:from-slate-700/60 hover:to-slate-600/40 transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <module.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {module.status === "active" ? (
                          <div className="flex items-center space-x-1">
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          </div>
                        )}
                        <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {module.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{module.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 mb-1">
                          {module.threats > 0 ? `${module.threats} active alerts` : "System secure"}
                        </span>
                        {module.threats > 0 && (
                          <Progress value={Math.min(module.threats / 10, 100)} className="h-1.5 w-20" />
                        )}
                      </div>
                      <Badge 
                        variant={module.status === "active" ? "default" : "destructive"} 
                        className={`text-xs px-3 py-1 ${
                          module.status === "active" 
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }`}
                      >
                        {module.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-slate-800/50 border border-slate-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Eye className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="threats" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Active Threats
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Brain className="h-4 w-4 mr-2" />
                AI Analytics
              </TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Network className="h-4 w-4 mr-2" />
                Network Status
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Activity className="h-4 w-4" />
              <span>Real-time Updates</span>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-white">Threat Detection Timeline</CardTitle>
                  <CardDescription className="text-slate-400">
                    Real-time threat detection over the past 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Malware Detection</span>
                      <span className="text-sm text-red-400">147 blocked</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Phishing Attempts</span>
                      <span className="text-sm text-yellow-400">89 blocked</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">DDoS Attacks</span>
                      <span className="text-sm text-blue-400">23 mitigated</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-white">System Performance</CardTitle>
                  <CardDescription className="text-slate-400">
                    Core system metrics and health indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">CPU Usage</span>
                      <span className="text-sm text-green-400">34%</span>
                    </div>
                    <Progress value={34} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Memory Usage</span>
                      <span className="text-sm text-yellow-400">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Network Bandwidth</span>
                      <span className="text-sm text-blue-400">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="threats">
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  Active Threat Feed
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Live monitoring of current security threats and incidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      id: "apt-001", 
                      type: "Critical", 
                      name: "Advanced Persistent Threat", 
                      ip: "192.168.1.45", 
                      time: "2 mins ago", 
                      severity: "high",
                      description: "Suspicious lateral movement detected"
                    },
                    { 
                      id: "login-002", 
                      type: "Warning", 
                      name: "Suspicious Login Attempt", 
                      ip: "10.0.0.123", 
                      time: "5 mins ago", 
                      severity: "medium",
                      description: "Multiple failed authentication attempts"
                    },
                    { 
                      id: "scan-003", 
                      type: "Info", 
                      name: "Port Scan Detected", 
                      ip: "172.16.0.89", 
                      time: "8 mins ago", 
                      severity: "low",
                      description: "Network reconnaissance activity"
                    },
                    { 
                      id: "malware-004", 
                      type: "Critical", 
                      name: "Malware Signature Match", 
                      ip: "192.168.1.67", 
                      time: "12 mins ago", 
                      severity: "high",
                      description: "Known malicious file detected"
                    }
                  ].map((threat) => {
                    const getSeverityColor = (severity: string) => {
                      if (severity === "high") return "bg-red-500"
                      if (severity === "medium") return "bg-yellow-500"
                      return "bg-blue-500"
                    }

                    return (
                      <div key={threat.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`h-3 w-3 rounded-full ${getSeverityColor(threat.severity)} animate-pulse`}></div>
                          <div>
                            <p className="text-white font-medium">{threat.name}</p>
                            <p className="text-sm text-slate-400 mb-1">{threat.description}</p>
                            <p className="text-xs text-slate-500">Source: {threat.ip}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={threat.severity === "high" ? "destructive" : "secondary"}>
                            {threat.type}
                          </Badge>
                          <p className="text-xs text-slate-500 mt-1">{threat.time}</p>
                          <Button size="sm" variant="outline" className="mt-2 text-xs h-6">
                            Investigate
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-white">AI Model Performance</CardTitle>
                  <CardDescription className="text-slate-400">
                    Machine learning model accuracy and efficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Threat Detection Model</span>
                      <span className="text-green-400">96.7% Accuracy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Behavioral Analysis</span>
                      <span className="text-blue-400">94.2% Accuracy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Anomaly Detection</span>
                      <span className="text-yellow-400">89.1% Accuracy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-white">Processing Statistics</CardTitle>
                  <CardDescription className="text-slate-400">
                    Real-time data processing metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Events Processed</span>
                      <span className="text-white">2.4M / hour</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Average Response Time</span>
                      <span className="text-green-400">245ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Queue Size</span>
                      <span className="text-blue-400">1,247 events</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network">
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white">Network Infrastructure Status</CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time network monitoring and health checks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Firewalls</h4>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-slate-300">All 12 online</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">IDS/IPS Systems</h4>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-slate-300">8 of 8 active</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">VPN Gateways</h4>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-slate-300">5 of 6 online</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
