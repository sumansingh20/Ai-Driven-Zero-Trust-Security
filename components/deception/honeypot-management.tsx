"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Server, Shield, AlertTriangle, CheckCircle, Eye, Network, Database, Globe, Zap } from "lucide-react"

interface HoneypotMetrics {
  totalHoneypots: number
  activeHoneypots: number
  interactions: number
  capturedAttacks: number
  honeytokensDeployed: number
  honeytokensTriggered: number
}

interface Honeypot {
  id: string
  name: string
  type: "web_server" | "database" | "file_share" | "email_server" | "ssh_server" | "rdp_server"
  status: "active" | "compromised" | "offline" | "maintenance"
  location: string
  interactions: number
  lastActivity: string
  threatLevel: "low" | "medium" | "high" | "critical"
}

interface HoneytokenAlert {
  id: string
  tokenType: "credential" | "document" | "api_key" | "certificate"
  location: string
  accessedBy: string
  timestamp: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
}

export function HoneypotManagement() {
  const [honeypotMetrics] = useState<HoneypotMetrics>({
    totalHoneypots: 24,
    activeHoneypots: 22,
    interactions: 147,
    capturedAttacks: 8,
    honeytokensDeployed: 156,
    honeytokensTriggered: 3,
  })

  const [honeypots] = useState<Honeypot[]>([
    {
      id: "HP-001",
      name: "Finance-WebServer-Decoy",
      type: "web_server",
      status: "compromised",
      location: "DMZ-Subnet-A",
      interactions: 23,
      lastActivity: "5 minutes ago",
      threatLevel: "critical",
    },
    {
      id: "HP-002",
      name: "HR-Database-Trap",
      type: "database",
      status: "active",
      location: "Internal-Network-B",
      interactions: 7,
      lastActivity: "2 hours ago",
      threatLevel: "medium",
    },
    {
      id: "HP-003",
      name: "Backup-FileShare-Honey",
      type: "file_share",
      status: "active",
      location: "Storage-Network",
      interactions: 12,
      lastActivity: "45 minutes ago",
      threatLevel: "high",
    },
    {
      id: "HP-004",
      name: "Admin-SSH-Decoy",
      type: "ssh_server",
      status: "offline",
      location: "Management-VLAN",
      interactions: 0,
      lastActivity: "6 hours ago",
      threatLevel: "low",
    },
  ])

  const [honeytokenAlerts] = useState<HoneytokenAlert[]>([
    {
      id: "HT-001",
      tokenType: "credential",
      location: "\\\\fileserver\\admin\\passwords.txt",
      accessedBy: "192.168.1.45",
      timestamp: "2024-01-15 14:23:17",
      severity: "critical",
      description: "Fake admin credentials accessed from compromised workstation",
    },
    {
      id: "HT-002",
      tokenType: "api_key",
      location: "config\\api_keys.json",
      accessedBy: "10.0.2.15",
      timestamp: "2024-01-15 13:45:22",
      severity: "high",
      description: "Honeypot API key extracted by malware during lateral movement",
    },
    {
      id: "HT-003",
      tokenType: "document",
      location: "Documents\\Financial_Report_Q4.docx",
      accessedBy: "172.16.0.33",
      timestamp: "2024-01-15 12:18:09",
      severity: "medium",
      description: "Decoy financial document opened by insider threat actor",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "compromised":
        return "destructive"
      case "offline":
        return "secondary"
      case "maintenance":
        return "outline"
      default:
        return "outline"
    }
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "web_server":
        return <Globe className="h-4 w-4" />
      case "database":
        return <Database className="h-4 w-4" />
      case "file_share":
        return <Server className="h-4 w-4" />
      case "email_server":
        return <Network className="h-4 w-4" />
      case "ssh_server":
      case "rdp_server":
        return <Shield className="h-4 w-4" />
      default:
        return <Server className="h-4 w-4" />
    }
  }

  const getTokenIcon = (type: string) => {
    switch (type) {
      case "credential":
        return <Shield className="h-4 w-4" />
      case "document":
        return <Server className="h-4 w-4" />
      case "api_key":
        return <Zap className="h-4 w-4" />
      case "certificate":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Honeypot Overview */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Honeypots</CardTitle>
            <Server className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{honeypotMetrics.totalHoneypots}</div>
            <p className="text-xs text-muted-foreground">Total deployed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{honeypotMetrics.activeHoneypots}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interactions</CardTitle>
            <Eye className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{honeypotMetrics.interactions}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attacks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{honeypotMetrics.capturedAttacks}</div>
            <p className="text-xs text-muted-foreground">Captured today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Honeytokens</CardTitle>
            <Shield className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{honeypotMetrics.honeytokensDeployed}</div>
            <p className="text-xs text-muted-foreground">Deployed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Triggered</CardTitle>
            <Zap className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{honeypotMetrics.honeytokensTriggered}</div>
            <p className="text-xs text-muted-foreground">Token alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Honeypot Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Deployed Honeypots
          </CardTitle>
          <CardDescription>Deception infrastructure monitoring attacker behavior and lateral movement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {honeypots.map((honeypot) => (
            <div key={honeypot.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                {getTypeIcon(honeypot.type)}
                <div>
                  <p className="font-medium">{honeypot.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {honeypot.type.replace("_", " ").toUpperCase()} • {honeypot.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Interactions</p>
                  <p className="text-lg font-bold">{honeypot.interactions}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Activity</p>
                  <p className="text-sm font-mono">{honeypot.lastActivity}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={getThreatColor(honeypot.threatLevel)}>{honeypot.threatLevel.toUpperCase()}</Badge>
                  <Badge variant={getStatusColor(honeypot.status)}>{honeypot.status.toUpperCase()}</Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Honeytoken Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Honeytoken Alerts
          </CardTitle>
          <CardDescription>Triggered deception tokens indicating unauthorized access attempts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {honeytokenAlerts.map((alert) => (
            <div key={alert.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTokenIcon(alert.tokenType)}
                  <div>
                    <p className="font-medium capitalize">{alert.tokenType.replace("_", " ")} Token Accessed</p>
                    <p className="text-sm text-muted-foreground">ID: {alert.id}</p>
                  </div>
                </div>
                <Badge variant={getThreatColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Location:</p>
                  <p className="text-sm font-mono text-muted-foreground">{alert.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Accessed By:</p>
                  <p className="text-sm font-mono text-destructive">{alert.accessedBy}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Description:</p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                <span>Triggered: {alert.timestamp}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Investigate
                  </Button>
                  <Button size="sm" variant="outline">
                    Block Source
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Deception Network Health */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deception Network Health</CardTitle>
            <CardDescription>Overall status of honeypot infrastructure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Network Coverage</span>
                <span className="text-chart-4">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Honeypot Uptime</span>
                <span className="text-chart-1">98.7%</span>
              </div>
              <Progress value={98.7} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Detection Accuracy</span>
                <span className="text-chart-2">96.3%</span>
              </div>
              <Progress value={96.3} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Compromise Activity</CardTitle>
            <CardDescription>Latest honeypot interactions and compromises</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert className="border-destructive bg-destructive/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Active Compromise</AlertTitle>
              <AlertDescription>Finance-WebServer-Decoy showing persistent attacker presence</AlertDescription>
            </Alert>

            <Alert className="border-secondary bg-secondary/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Lateral Movement Detected</AlertTitle>
              <AlertDescription>Attacker attempting to pivot from compromised honeypot</AlertDescription>
            </Alert>

            <Alert className="border-chart-1 bg-chart-1/10">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>New Honeypot Deployed</AlertTitle>
              <AlertDescription>Email-Server-Trap successfully deployed in DMZ</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Server className="h-4 w-4" />
          Deploy New Honeypot
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Shield className="h-4 w-4" />
          Generate Honeytokens
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Eye className="h-4 w-4" />
          View Attack Timeline
        </Button>
      </div>
    </div>
  )
}
