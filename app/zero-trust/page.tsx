"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ClientTimestamp } from "@/components/client-time"
import { 
  Lock, Unlock, Shield, AlertTriangle, Users, Eye, Network, Database,
  Fingerprint, Brain, Activity, TrendingUp, Clock, Zap, Server, Cpu,
  CheckCircle, XCircle, HardDrive, Globe, Search, Target, FileText
} from "lucide-react"

interface ZeroTrustScore {
  overall: number
  identity: number
  device: number
  network: number
  application: number
  data: number
}

interface PolicyRule {
  id: string
  name: string
  type: "identity" | "device" | "network" | "application" | "data"
  condition: string
  action: "allow" | "deny" | "require_mfa" | "quarantine"
  enabled: boolean
  violations: number
  lastTriggered: string
}

interface AccessRequest {
  id: string
  user: string
  resource: string
  type: "file" | "application" | "network" | "database"
  riskScore: number
  status: "pending" | "approved" | "denied" | "requires_approval"
  timestamp: string
  justification: string
}

interface DeviceCompliance {
  id: string
  deviceName: string
  user: string
  os: string
  compliance: "compliant" | "non_compliant" | "unknown"
  riskScore: number
  lastSeen: string
  violations: string[]
}

interface IdentityRisk {
  userId: string
  userName: string
  department: string
  riskScore: number
  riskFactors: string[]
  lastActivity: string
  privilegeLevel: "standard" | "elevated" | "admin"
  anomalies: number
}

export default function ZeroTrustPage() {
  const [zeroTrustScore] = useState<ZeroTrustScore>({
    overall: 87,
    identity: 92,
    device: 84,
    network: 89,
    application: 86,
    data: 91
  })

  const [policyRules] = useState<PolicyRule[]>([
    {
      id: "policy-001",
      name: "Multi-Factor Authentication Required",
      type: "identity",
      condition: "user.risk_score > 50 OR location.is_new = true",
      action: "require_mfa",
      enabled: true,
      violations: 23,
      lastTriggered: "2025-09-06T11:30:00Z"
    },
    {
      id: "policy-002",
      name: "Device Compliance Check",
      type: "device", 
      condition: "device.compliance = false OR device.encryption = false",
      action: "deny",
      enabled: true,
      violations: 7,
      lastTriggered: "2025-09-06T10:45:00Z"
    },
    {
      id: "policy-003",
      name: "Sensitive Data Access Control",
      type: "data",
      condition: "data.classification = 'confidential' AND user.clearance < 3",
      action: "deny",
      enabled: true,
      violations: 45,
      lastTriggered: "2025-09-06T11:15:00Z"
    },
    {
      id: "policy-004",
      name: "Suspicious Network Activity",
      type: "network",
      condition: "traffic.anomaly_score > 80 OR connection.is_tor = true",
      action: "quarantine",
      enabled: true,
      violations: 12,
      lastTriggered: "2025-09-06T09:20:00Z"
    }
  ])

  const [accessRequests] = useState<AccessRequest[]>([
    {
      id: "req-001",
      user: "john.doe@company.com",
      resource: "Financial Database - Q3 Reports",
      type: "database",
      riskScore: 85,
      status: "pending",
      timestamp: "2025-09-06T11:45:00Z",
      justification: "Need access for quarterly analysis and board presentation"
    },
    {
      id: "req-002",
      user: "jane.smith@company.com", 
      resource: "Production Server - WebApp01",
      type: "application",
      riskScore: 92,
      status: "requires_approval",
      timestamp: "2025-09-06T11:30:00Z",
      justification: "Emergency deployment fix for critical security vulnerability"
    },
    {
      id: "req-003",
      user: "mike.wilson@company.com",
      resource: "HR Confidential Files",
      type: "file",
      riskScore: 67,
      status: "approved",
      timestamp: "2025-09-06T11:00:00Z", 
      justification: "Regular review of employee performance data"
    }
  ])

  const [deviceCompliance] = useState<DeviceCompliance[]>([
    {
      id: "dev-001",
      deviceName: "LAPTOP-JD-001",
      user: "john.doe@company.com",
      os: "Windows 11",
      compliance: "compliant",
      riskScore: 15,
      lastSeen: "2025-09-06T11:45:00Z",
      violations: []
    },
    {
      id: "dev-002",
      deviceName: "MOBILE-JS-002", 
      user: "jane.smith@company.com",
      os: "iOS 17.5",
      compliance: "non_compliant",
      riskScore: 78,
      lastSeen: "2025-09-06T11:30:00Z",
      violations: ["Outdated OS", "No encryption", "Jailbroken"]
    },
    {
      id: "dev-003",
      deviceName: "WORKSTATION-MW-003",
      user: "mike.wilson@company.com", 
      os: "macOS Sonoma",
      compliance: "compliant",
      riskScore: 22,
      lastSeen: "2025-09-06T11:20:00Z",
      violations: []
    }
  ])

  const [identityRisks] = useState<IdentityRisk[]>([
    {
      userId: "usr-001",
      userName: "john.doe@company.com",
      department: "Finance",
      riskScore: 85,
      riskFactors: ["Unusual login location", "Failed MFA attempts", "After hours access"],
      lastActivity: "2025-09-06T11:45:00Z",
      privilegeLevel: "elevated",
      anomalies: 3
    },
    {
      userId: "usr-002", 
      userName: "jane.smith@company.com",
      department: "Engineering",
      riskScore: 92,
      riskFactors: ["Non-compliant device", "Privileged access", "Data exfiltration pattern"],
      lastActivity: "2025-09-06T11:30:00Z",
      privilegeLevel: "admin",
      anomalies: 7
    },
    {
      userId: "usr-003",
      userName: "mike.wilson@company.com",
      department: "HR", 
      riskScore: 45,
      riskFactors: ["Standard access pattern"],
      lastActivity: "2025-09-06T11:00:00Z", 
      privilegeLevel: "standard",
      anomalies: 0
    }
  ])

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-chart-4"
    if (score >= 75) return "text-chart-2" 
    if (score >= 60) return "text-chart-3"
    return "text-destructive"
  }

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "destructive"
    if (risk >= 60) return "secondary"
    if (risk >= 40) return "outline"
    return "default"
  }

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case "compliant": return "default"
      case "non_compliant": return "destructive" 
      case "unknown": return "secondary"
      default: return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "default"
      case "pending": return "secondary"
      case "denied": return "destructive"
      case "requires_approval": return "destructive"
      default: return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Lock className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">Zero Trust Architecture</h1>
              <p className="text-sm text-muted-foreground">Never Trust, Always Verify - Continuous Security Posture</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-chart-4" />
              <span className="text-sm font-medium">Trust Score: {zeroTrustScore.overall}%</span>
            </div>
            <Badge variant="secondary" className="text-sm">
              <Activity className="h-3 w-3 mr-1" />
              Live Monitoring
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Critical Zero Trust Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>High-Risk Identity Detected</AlertTitle>
            <AlertDescription>
              User jane.smith@company.com accessing production systems from non-compliant device. 
              Risk score: 92/100. Immediate review required.
            </AlertDescription>
          </Alert>

          <Alert className="border-secondary bg-secondary/10">
            <Fingerprint className="h-4 w-4" />
            <AlertTitle>MFA Challenge Triggered</AlertTitle>
            <AlertDescription>
              23 users prompted for additional authentication due to risk-based access policies.
              Average response time: 1.2 minutes.
            </AlertDescription>
          </Alert>
        </div>

        {/* Zero Trust Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Zero Trust Score Dashboard */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Overall Trust Score
                  </CardTitle>
                  <CardDescription>Comprehensive security posture assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(zeroTrustScore.overall)}`}>
                      {zeroTrustScore.overall}%
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Zero Trust Maturity</p>
                  </div>
                  <Progress value={zeroTrustScore.overall} className="h-3" />
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trust Pillars Breakdown
                  </CardTitle>
                  <CardDescription>Individual component assessment scores</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Fingerprint className="h-4 w-4" />
                          Identity
                        </span>
                        <span className={`font-mono ${getScoreColor(zeroTrustScore.identity)}`}>
                          {zeroTrustScore.identity}%
                        </span>
                      </div>
                      <Progress value={zeroTrustScore.identity} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4" />
                          Device
                        </span>
                        <span className={`font-mono ${getScoreColor(zeroTrustScore.device)}`}>
                          {zeroTrustScore.device}%
                        </span>
                      </div>
                      <Progress value={zeroTrustScore.device} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Network className="h-4 w-4" />
                          Network
                        </span>
                        <span className={`font-mono ${getScoreColor(zeroTrustScore.network)}`}>
                          {zeroTrustScore.network}%
                        </span>
                      </div>
                      <Progress value={zeroTrustScore.network} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Server className="h-4 w-4" />
                          Application
                        </span>
                        <span className={`font-mono ${getScoreColor(zeroTrustScore.application)}`}>
                          {zeroTrustScore.application}%
                        </span>
                      </div>
                      <Progress value={zeroTrustScore.application} className="h-2" />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Database className="h-4 w-4" />
                          Data Protection
                        </span>
                        <span className={`font-mono ${getScoreColor(zeroTrustScore.data)}`}>
                          {zeroTrustScore.data}%
                        </span>
                      </div>
                      <Progress value={zeroTrustScore.data} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-Time Activity Feed */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Real-Time Access Decisions
                  </CardTitle>
                  <CardDescription>Live zero trust policy enforcement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {accessRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{request.resource}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.user} • Risk: {request.riskScore}/100
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(request.status)}>
                          {request.status.toUpperCase().replace("_", " ")}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          <ClientTimestamp timestamp={request.timestamp} format="time" />
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View All Access Requests
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    High-Risk Identities
                  </CardTitle>
                  <CardDescription>Users requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {identityRisks.filter(risk => risk.riskScore >= 80).map((risk) => (
                    <div key={risk.userId} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{risk.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {risk.department} • {risk.privilegeLevel} access • {risk.anomalies} anomalies
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getRiskColor(risk.riskScore)}>
                          RISK: {risk.riskScore}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          <ClientTimestamp timestamp={risk.lastActivity} format="time" />
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Identity Risk Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Policy Enforcement Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Policy Enforcement Overview
                </CardTitle>
                <CardDescription>Zero trust policy rules and their current status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-chart-4">156</div>
                    <p className="text-sm text-muted-foreground">Active Policies</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-chart-1">1,247</div>
                    <p className="text-sm text-muted-foreground">Daily Evaluations</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">87</div>
                    <p className="text-sm text-muted-foreground">Policy Violations</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-chart-2">98.7%</div>
                    <p className="text-sm text-muted-foreground">Enforcement Rate</p>
                  </div>
                </div>

                <Alert className="border-chart-4 bg-chart-4/10">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Zero Trust Policies Active</AlertTitle>
                  <AlertDescription>
                    All critical zero trust policies are enforced and functioning normally. 
                    Real-time evaluation processing 1,247 access requests per day with 98.7% accuracy.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="identity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5" />
                  Identity Risk Assessment
                </CardTitle>
                <CardDescription>Comprehensive user risk analysis and behavior monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {identityRisks.map((risk) => (
                  <div key={risk.userId} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{risk.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {risk.department} • {risk.privilegeLevel} access
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getRiskColor(risk.riskScore)}>
                          RISK: {risk.riskScore}
                        </Badge>
                        <span className="text-sm">{risk.anomalies} anomalies</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Risk Factors:</p>
                      <div className="flex gap-1 flex-wrap">
                        {risk.riskFactors.map((factor, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                      <span>Last Activity: <ClientTimestamp timestamp={risk.lastActivity} format="datetime" /></span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="outline">
                          <Lock className="h-3 w-3 mr-1" />
                          Restrict
                        </Button>
                        {risk.riskScore >= 80 && (
                          <Button size="sm" variant="destructive">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Suspend
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Device Compliance Management
                </CardTitle>
                <CardDescription>Monitor and enforce device security standards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {deviceCompliance.map((device) => (
                  <div key={device.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{device.deviceName}</p>
                          <p className="text-sm text-muted-foreground">
                            {device.user} • {device.os}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getComplianceColor(device.compliance)}>
                          {device.compliance.toUpperCase().replace("_", " ")}
                        </Badge>
                        <span className="text-sm">Risk: {device.riskScore}</span>
                      </div>
                    </div>

                    {device.violations.length > 0 && (
                      <div className="space-y-2 mb-3">
                        <p className="text-sm font-medium text-destructive">Compliance Violations:</p>
                        <div className="flex gap-1 flex-wrap">
                          {device.violations.map((violation, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {violation}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last Seen: <ClientTimestamp timestamp={device.lastSeen} format="datetime" /></span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        {device.compliance === "non_compliant" && (
                          <>
                            <Button size="sm" variant="outline">
                              <Zap className="h-3 w-3 mr-1" />
                              Remediate
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Lock className="h-3 w-3 mr-1" />
                              Block Device
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Zero Trust Policy Engine
                </CardTitle>
                <CardDescription>Configure and manage adaptive security policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {policyRules.map((policy) => (
                  <div key={policy.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Switch checked={policy.enabled} />
                        <div>
                          <p className="font-medium">{policy.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {policy.type} policy • {policy.action.replace("_", " ")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-destructive font-mono">{policy.violations} violations</p>
                        <p className="text-xs text-muted-foreground">
                          Last triggered: <ClientTimestamp timestamp={policy.lastTriggered} format="datetime" />
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-md p-3 mb-3">
                      <p className="text-sm font-medium mb-1">Condition:</p>
                      <code className="text-xs">{policy.condition}</code>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Violations
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Edit Policy
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Access Control Center
                </CardTitle>
                <CardDescription>Real-time access requests and risk-based decisions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {accessRequests.map((request) => (
                  <div key={request.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{request.resource}</p>
                        <p className="text-sm text-muted-foreground">
                          Requested by: {request.user}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(request.status)}>
                          {request.status.toUpperCase().replace("_", " ")}
                        </Badge>
                        <span className="text-sm">Risk: {request.riskScore}</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-md p-3 mb-3">
                      <p className="text-sm font-medium mb-1">Business Justification:</p>
                      <p className="text-sm">{request.justification}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {request.type.charAt(0).toUpperCase() + request.type.slice(1)} access • 
                        <ClientTimestamp timestamp={request.timestamp} format="datetime" />
                      </span>
                      <div className="flex gap-2">
                        {request.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="h-3 w-3 mr-1" />
                              Deny
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Zero Trust Metrics
                  </CardTitle>
                  <CardDescription>Key performance indicators and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Policy Compliance Rate</span>
                      <span className="font-mono text-chart-4">98.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average Risk Score</span>
                      <span className="font-mono">34/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">MFA Challenge Rate</span>
                      <span className="font-mono">12.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Access Denial Rate</span>
                      <span className="font-mono text-destructive">3.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI-Driven Insights
                  </CardTitle>
                  <CardDescription>Machine learning recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Alert className="border-chart-2 bg-chart-2/10">
                      <Brain className="h-4 w-4" />
                      <AlertTitle>Recommendation</AlertTitle>
                      <AlertDescription className="text-sm">
                        Implement stricter device compliance policies for engineering department based on recent risk patterns.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-chart-3 bg-chart-3/10">
                      <Target className="h-4 w-4" />
                      <AlertTitle>Optimization</AlertTitle>
                      <AlertDescription className="text-sm">
                        Reduce MFA friction for compliant devices while maintaining security posture.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
