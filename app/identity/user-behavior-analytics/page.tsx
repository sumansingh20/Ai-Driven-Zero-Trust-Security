"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Users, 
  Activity, 
  Brain, 
  AlertTriangle, 
  Shield, 
  Eye, 
  TrendingUp,
  UserX,
  UserCheck,
  Zap,
  Target
} from "lucide-react"

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default function UserBehaviorAnalytics() {
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      department: "Engineering",
      riskScore: 85,
      anomalies: 3,
      status: "high_risk"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@company.com", 
      department: "Finance",
      riskScore: 15,
      anomalies: 0,
      status: "normal"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Marketing",
      riskScore: 42,
      anomalies: 1,
      status: "medium_risk"
    }
  ]

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-red-500"
    if (score >= 40) return "text-yellow-500"
    return "text-green-500"
  }

  const getBadgeVariant = (status: string) => {
    if (status === 'high_risk') return 'destructive'
    if (status === 'medium_risk') return 'secondary'
    return 'default'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">User Behavior Analytics</h1>
              <p className="text-slate-400">AI-powered user activity monitoring and anomaly detection</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2,847</div>
              <p className="text-xs text-blue-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">High Risk Users</CardTitle>
              <UserX className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">127</div>
              <p className="text-xs text-red-400 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                +5% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Anomalies Detected</CardTitle>
              <Brain className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">43</div>
              <p className="text-xs text-yellow-400 flex items-center">
                <Activity className="h-3 w-3 mr-1" />
                Last 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Normal Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2,677</div>
              <p className="text-xs text-green-400 flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                94% of total users
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-600">
              User Analysis
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="data-[state=active]:bg-purple-600">
              Anomalies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Risk Score Distribution
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    User risk levels across the organization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Low Risk (0-30)</span>
                      <span className="text-sm text-green-400">1,847 users</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Medium Risk (31-69)</span>
                      <span className="text-sm text-yellow-400">873 users</span>
                    </div>
                    <Progress value={31} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">High Risk (70-100)</span>
                      <span className="text-sm text-red-400">127 users</span>
                    </div>
                    <Progress value={4} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Analysis Summary
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Machine learning insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-yellow-500 bg-yellow-500/10">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <AlertDescription className="text-yellow-200">
                      3 users showing unusual login patterns detected in the last hour
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Model Accuracy</span>
                      <span className="text-sm text-green-400">94.7%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">False Positive Rate</span>
                      <span className="text-sm text-blue-400">2.1%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Last Model Update</span>
                      <span className="text-sm text-slate-400">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">User Risk Analysis</CardTitle>
                <CardDescription className="text-slate-400">
                  Individual user behavior assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-slate-400">{user.email}</p>
                          <p className="text-xs text-slate-500">{user.department}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-slate-300">Risk Score</p>
                          <p className={`text-lg font-bold ${getRiskColor(user.riskScore)}`}>
                            {user.riskScore}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-slate-300">Anomalies</p>
                          <p className="text-lg font-bold text-white">{user.anomalies}</p>
                        </div>
                        
                        <Badge 
                          variant={getBadgeVariant(user.status)}
                          className="capitalize"
                        >
                          {user.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Recent Anomalies
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Suspicious activities detected by AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-red-500 bg-red-500/10">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-200">
                      <strong>High Priority:</strong> Multiple failed login attempts from unusual location for user john.smith@company.com
                      <div className="text-xs text-red-300 mt-1">15 minutes ago</div>
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-yellow-500 bg-yellow-500/10">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <AlertDescription className="text-yellow-200">
                      <strong>Medium Priority:</strong> Unusual data access pattern detected for mike.chen@company.com
                      <div className="text-xs text-yellow-300 mt-1">1 hour ago</div>
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-blue-500 bg-blue-500/10">
                    <Eye className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-blue-200">
                      <strong>Low Priority:</strong> Off-hours access detected for sarah.j@company.com
                      <div className="text-xs text-blue-300 mt-1">3 hours ago</div>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
