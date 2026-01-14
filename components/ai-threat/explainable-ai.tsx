"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb, FileText, TrendingUp, AlertTriangle, CheckCircle, Eye, Brain, BarChart3 } from "lucide-react"

interface ThreatExplanation {
  id: string
  threatType: string
  severity: "low" | "medium" | "high" | "critical"
  confidence: number
  explanation: string
  features: Array<{
    name: string
    importance: number
    value: string
  }>
  mitigationSteps: string[]
  timestamp: string
}

export function ExplainableAI() {
  const [threatExplanations] = useState<ThreatExplanation[]>([
    {
      id: "THR-001",
      threatType: "Lateral Movement",
      severity: "high",
      confidence: 94.2,
      explanation:
        "Unusual network traversal pattern detected. User account 'jdoe' accessed 15 different systems within 3 minutes, which deviates significantly from normal behavior baseline.",
      features: [
        { name: "Access Frequency", importance: 0.89, value: "15 systems in 3 min" },
        { name: "Time Deviation", importance: 0.76, value: "Outside normal hours" },
        { name: "Geographic Anomaly", importance: 0.65, value: "New location detected" },
        { name: "Protocol Usage", importance: 0.54, value: "Unusual SMB traffic" },
      ],
      mitigationSteps: [
        "Immediately suspend user account 'jdoe'",
        "Isolate affected network segments",
        "Initiate forensic analysis on accessed systems",
        "Reset credentials for all accessed accounts",
      ],
      timestamp: "2024-01-15 14:23:17",
    },
    {
      id: "THR-002",
      threatType: "Data Exfiltration",
      severity: "critical",
      confidence: 97.8,
      explanation:
        "Large volume data transfer to external IP detected. 2.3GB of sensitive data was transmitted to an unknown external endpoint during off-hours.",
      features: [
        { name: "Data Volume", importance: 0.95, value: "2.3GB transferred" },
        { name: "Destination Risk", importance: 0.88, value: "Unknown external IP" },
        { name: "Data Classification", importance: 0.82, value: "Contains PII/PHI" },
        { name: "Transfer Method", importance: 0.71, value: "Encrypted tunnel" },
      ],
      mitigationSteps: [
        "Block external IP immediately",
        "Quarantine source system",
        "Notify data protection officer",
        "Initiate incident response protocol",
      ],
      timestamp: "2024-01-15 14:18:42",
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

  const getImportanceColor = (importance: number) => {
    if (importance >= 0.8) return "text-destructive"
    if (importance >= 0.6) return "text-secondary"
    return "text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      {/* XAI Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Explained Threats</CardTitle>
            <Lightbulb className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatExplanations.length}</div>
            <p className="text-xs text-muted-foreground">Detailed analysis available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Brain className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(threatExplanations.reduce((acc, t) => acc + t.confidence, 0) / threatExplanations.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Model certainty</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {threatExplanations.filter((t) => t.severity === "critical").length}
            </div>
            <p className="text-xs text-muted-foreground">Require immediate action</p>
          </CardContent>
        </Card>
      </div>

      {/* Threat Explanations */}
      <div className="space-y-4">
        {threatExplanations.map((threat) => (
          <Card key={threat.id} className="border-l-4 border-l-destructive">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{threat.threatType}</CardTitle>
                  <Badge variant={getSeverityColor(threat.severity)}>{threat.severity.toUpperCase()}</Badge>
                  <Badge variant="outline" className="font-mono">
                    {threat.id}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>Confidence: {threat.confidence}%</span>
                </div>
              </div>
              <CardDescription className="text-base">{threat.explanation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Feature Importance */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <BarChart3 className="h-4 w-4" />
                  Key Decision Factors
                </h4>
                <div className="space-y-3">
                  {threat.features.map((feature, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{feature.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={getImportanceColor(feature.importance)}>
                            {Math.round(feature.importance * 100)}%
                          </span>
                          <span className="text-muted-foreground">{feature.value}</span>
                        </div>
                      </div>
                      <Progress value={feature.importance * 100} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mitigation Steps */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <CheckCircle className="h-4 w-4" />
                  Recommended Actions
                </h4>
                <div className="space-y-2">
                  {threat.mitigationSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
                <span>Detected: {threat.timestamp}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <FileText className="h-3 w-3 mr-1" />
                    Export Report
                  </Button>
                  <Button size="sm" variant="outline">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    View Timeline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Interpretability Status */}
      <Alert className="border-chart-1 bg-chart-1/10">
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Explainable AI Status</AlertTitle>
        <AlertDescription>
          All threat detections include detailed explanations with feature importance scores. Model interpretability
          confidence: 96.3%. Last explanation model update: 2 hours ago.
        </AlertDescription>
      </Alert>
    </div>
  )
}
