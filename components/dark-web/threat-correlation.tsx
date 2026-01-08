"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link, Database, TrendingUp, AlertTriangle, CheckCircle, Zap, Network, Target } from "lucide-react"

interface CorrelationMetrics {
  totalCorrelations: number
  highConfidenceMatches: number
  siemIntegrations: number
  xdrConnections: number
  correlationAccuracy: number
  processingLatency: number
}

interface ThreatCorrelation {
  id: string
  darkWebSource: string
  internalEvent: string
  confidence: number
  severity: "low" | "medium" | "high" | "critical"
  correlationType: "credential_match" | "malware_signature" | "ip_overlap" | "timing_pattern"
  description: string
  timestamp: string
  actions: string[]
}

export function ThreatCorrelation() {
  const [correlationMetrics] = useState<CorrelationMetrics>({
    totalCorrelations: 156,
    highConfidenceMatches: 23,
    siemIntegrations: 3,
    xdrConnections: 2,
    correlationAccuracy: 91.7,
    processingLatency: 1.2,
  })

  const [threatCorrelations] = useState<ThreatCorrelation[]>([
    {
      id: "CORR-001",
      darkWebSource: "Credential dump on DarkMarket",
      internalEvent: "Failed login attempts from user@company.com",
      confidence: 96.8,
      severity: "critical",
      correlationType: "credential_match",
      description: "Employee credentials found in dark web dump correlate with recent failed authentication attempts",
      timestamp: "2024-01-15 14:23:17",
      actions: ["Force password reset", "Enable MFA", "Monitor account activity"],
    },
    {
      id: "CORR-002",
      darkWebSource: "Malware discussion on CrimeForum",
      internalEvent: "Suspicious process execution on LAPTOP-07",
      confidence: 87.4,
      severity: "high",
      correlationType: "malware_signature",
      description: "Malware hash discussed in forum matches detected file signature on endpoint",
      timestamp: "2024-01-15 14:18:42",
      actions: ["Quarantine endpoint", "Run full scan", "Update signatures"],
    },
    {
      id: "CORR-003",
      darkWebSource: "IP address in botnet listing",
      internalEvent: "Outbound connection to 185.234.72.19",
      confidence: 94.2,
      severity: "high",
      correlationType: "ip_overlap",
      description: "Network traffic to IP address identified as C2 server in dark web intelligence",
      timestamp: "2024-01-15 14:15:28",
      actions: ["Block IP address", "Investigate source", "Check for lateral movement"],
    },
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getCorrelationTypeIcon = (type: string) => {
    switch (type) {
      case "credential_match":
        return <Target className="h-4 w-4 text-destructive" />
      case "malware_signature":
        return <AlertTriangle className="h-4 w-4 text-secondary" />
      case "ip_overlap":
        return <Network className="h-4 w-4 text-chart-1" />
      case "timing_pattern":
        return <TrendingUp className="h-4 w-4 text-chart-2" />
      default:
        return <Link className="h-4 w-4" />
    }
  }

  const getCorrelationTypeName = (type: string) => {
    switch (type) {
      case "credential_match":
        return "Credential Match"
      case "malware_signature":
        return "Malware Signature"
      case "ip_overlap":
        return "IP Overlap"
      case "timing_pattern":
        return "Timing Pattern"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      {/* Correlation Overview */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Correlations</CardTitle>
            <Link className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{correlationMetrics.totalCorrelations}</div>
            <p className="text-xs text-muted-foreground">Total matches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Confidence</CardTitle>
            <Target className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{correlationMetrics.highConfidenceMatches}</div>
            <p className="text-xs text-muted-foreground">Above 90% match</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SIEM Links</CardTitle>
            <Database className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{correlationMetrics.siemIntegrations}</div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XDR Links</CardTitle>
            <Network className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{correlationMetrics.xdrConnections}</div>
            <p className="text-xs text-muted-foreground">Integrated platforms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{correlationMetrics.correlationAccuracy}%</div>
            <p className="text-xs text-muted-foreground">Match precision</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latency</CardTitle>
            <Zap className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{correlationMetrics.processingLatency}s</div>
            <p className="text-xs text-muted-foreground">Avg processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            SIEM/XDR Integration Status
          </CardTitle>
          <CardDescription>Real-time correlation with enterprise security platforms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Splunk SIEM</span>
                <span className="text-chart-4">Connected</span>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-muted-foreground">Real-time log correlation active</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Microsoft Sentinel</span>
                <span className="text-chart-4">Connected</span>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-muted-foreground">Azure integration operational</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CrowdStrike XDR</span>
                <span className="text-chart-2">Syncing</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">Endpoint telemetry integration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Correlations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            High-Priority Threat Correlations
          </CardTitle>
          <CardDescription>Dark web intelligence matched with internal security events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {threatCorrelations.map((correlation) => (
            <div key={correlation.id} className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getCorrelationTypeIcon(correlation.correlationType)}
                  <div>
                    <p className="font-medium">{getCorrelationTypeName(correlation.correlationType)}</p>
                    <p className="text-sm text-muted-foreground">ID: {correlation.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-lg font-bold">{correlation.confidence}%</p>
                  </div>
                  <Badge variant={getSeverityColor(correlation.severity)}>{correlation.severity.toUpperCase()}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-destructive">Dark Web Source:</p>
                    <p className="text-sm">{correlation.darkWebSource}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-chart-1">Internal Event:</p>
                    <p className="text-sm">{correlation.internalEvent}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Analysis:</p>
                  <p className="text-sm text-muted-foreground">{correlation.description}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Recommended Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {correlation.actions.map((action, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                <span>Detected: {correlation.timestamp}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Investigate
                  </Button>
                  <Button size="sm" variant="outline">
                    Create Incident
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Correlation Engine Status */}
      <Alert className="border-chart-1 bg-chart-1/10">
        <Link className="h-4 w-4" />
        <AlertTitle>Correlation Engine Active</AlertTitle>
        <AlertDescription>
          Processing {correlationMetrics.totalCorrelations} correlations with {correlationMetrics.correlationAccuracy}%
          accuracy. Average processing latency: {correlationMetrics.processingLatency} seconds.
          {correlationMetrics.highConfidenceMatches} high-confidence matches require immediate attention.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          Tune Correlation Rules
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Database className="h-4 w-4" />
          Export Correlations
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Network className="h-4 w-4" />
          Test Integrations
        </Button>
      </div>
    </div>
  )
}
