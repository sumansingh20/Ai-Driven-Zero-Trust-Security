"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users, UserX, TrendingUp, Clock, Monitor, AlertTriangle, Activity } from "lucide-react"

interface UEBAMetrics {
  totalEntities: number
  riskyUsers: number
  riskyDevices: number
  insiderThreats: number
  behaviorBaselines: number
}

interface EntityRisk {
  id: string
  name: string
  type: "user" | "device" | "service"
  riskScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  anomalies: string[]
  lastActivity: string
}

export function UEBADashboard() {
  const [uebaMetrics] = useState<UEBAMetrics>({
    totalEntities: 1247,
    riskyUsers: 23,
    riskyDevices: 8,
    insiderThreats: 3,
    behaviorBaselines: 1189,
  })

  const [entityRisks] = useState<EntityRisk[]>([
    {
      id: "USR-001",
      name: "john.doe@company.com",
      type: "user",
      riskScore: 87,
      riskLevel: "high",
      anomalies: [
        "Unusual login times (3 AM - 5 AM)",
        "Access to sensitive files increased 300%",
        "New geographic location detected",
      ],
      lastActivity: "15 minutes ago",
    },
    {
      id: "DEV-045",
      name: "LAPTOP-SALES-07",
      type: "device",
      riskScore: 72,
      riskLevel: "medium",
      anomalies: [
        "Unusual network traffic patterns",
        "New software installations detected",
        "Failed authentication attempts",
      ],
      lastActivity: "2 hours ago",
    },
    {
      id: "SVC-012",
      name: "backup-service",
      type: "service",
      riskScore: 94,
      riskLevel: "critical",
      anomalies: [
        "Accessing unauthorized databases",
        "Data transfer volume 500% above normal",
        "Running outside scheduled hours",
      ],
      lastActivity: "5 minutes ago",
    },
  ])

  const getRiskColor = (level: string) => {
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

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4" />
      case "device":
        return <Monitor className="h-4 w-4" />
      case "service":
        return <Activity className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* UEBA Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entities</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uebaMetrics.totalEntities.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Under monitoring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risky Users</CardTitle>
            <UserX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uebaMetrics.riskyUsers}</div>
            <p className="text-xs text-muted-foreground">Above risk threshold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risky Devices</CardTitle>
            <Monitor className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uebaMetrics.riskyDevices}</div>
            <p className="text-xs text-muted-foreground">Anomalous behavior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insider Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uebaMetrics.insiderThreats}</div>
            <p className="text-xs text-muted-foreground">High confidence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Baselines</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uebaMetrics.behaviorBaselines}</div>
            <p className="text-xs text-muted-foreground">Established profiles</p>
          </CardContent>
        </Card>
      </div>

      {/* High-Risk Entities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            High-Risk Entities
          </CardTitle>
          <CardDescription>Users, devices, and services exhibiting anomalous behavior patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {entityRisks.map((entity) => (
            <div key={entity.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getEntityIcon(entity.type)}
                  <div>
                    <p className="font-medium">{entity.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {entity.type} • ID: {entity.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">Risk Score</p>
                    <p className="text-2xl font-bold">{entity.riskScore}</p>
                  </div>
                  <Badge variant={getRiskColor(entity.riskLevel)}>{entity.riskLevel.toUpperCase()}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Risk Level</span>
                  <span>{entity.riskScore}%</span>
                </div>
                <Progress value={entity.riskScore} className="h-2" />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Detected Anomalies:</p>
                <div className="space-y-1">
                  {entity.anomalies.map((anomaly, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <span>{anomaly}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last activity: {entity.lastActivity}
                </span>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    Investigate
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Quarantine
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Behavioral Analytics Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Baseline Learning Status</CardTitle>
            <CardDescription>Machine learning model training progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>User Behavior Models</span>
                <span className="text-chart-4">Complete</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Device Fingerprinting</span>
                <span className="text-chart-2">Training</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Service Behavior</span>
                <span className="text-chart-1">Active</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Insider Threat Alerts</CardTitle>
            <CardDescription>High-confidence insider threat detections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert className="border-destructive bg-destructive/10">
              <UserX className="h-4 w-4" />
              <AlertTitle>Potential Data Theft</AlertTitle>
              <AlertDescription>
                Employee accessing competitor-sensitive files before resignation date.
              </AlertDescription>
            </Alert>

            <Alert className="border-secondary bg-secondary/10">
              <Monitor className="h-4 w-4" />
              <AlertTitle>Privilege Escalation</AlertTitle>
              <AlertDescription>Service account attempting unauthorized admin operations.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
