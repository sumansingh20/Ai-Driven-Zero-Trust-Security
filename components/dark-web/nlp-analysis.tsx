"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Brain, FileText, TrendingUp, AlertTriangle, Zap, BarChart3, MessageSquare } from "lucide-react"

interface NLPMetrics {
  modelsActive: number
  documentsProcessed: number
  sentimentAnalysis: number
  threatKeywords: number
  languagesSupported: number
  processingSpeed: number
}

interface ThreatKeyword {
  keyword: string
  frequency: number
  severity: "low" | "medium" | "high" | "critical"
  context: string
  lastSeen: string
}

interface NLPModel {
  name: string
  type: "BERT" | "GPT" | "LLaMA" | "Custom"
  status: "active" | "training" | "offline"
  accuracy: number
  specialization: string
}

export function NLPAnalysis() {
  const [nlpMetrics] = useState<NLPMetrics>({
    modelsActive: 4,
    documentsProcessed: 15847,
    sentimentAnalysis: 87.3,
    threatKeywords: 1247,
    languagesSupported: 12,
    processingSpeed: 2340,
  })

  const [threatKeywords] = useState<ThreatKeyword[]>([
    {
      keyword: "company.com credentials",
      frequency: 23,
      severity: "critical",
      context: "Credential dump discussion",
      lastSeen: "15 minutes ago",
    },
    {
      keyword: "ransomware toolkit",
      frequency: 18,
      severity: "high",
      context: "Malware marketplace",
      lastSeen: "32 minutes ago",
    },
    {
      keyword: "zero-day exploit",
      frequency: 12,
      severity: "high",
      context: "Technical forum",
      lastSeen: "1 hour ago",
    },
    {
      keyword: "phishing campaign",
      frequency: 8,
      severity: "medium",
      context: "Criminal services",
      lastSeen: "2 hours ago",
    },
  ])

  const [nlpModels] = useState<NLPModel[]>([
    {
      name: "CyberBERT-v2",
      type: "BERT",
      status: "active",
      accuracy: 94.7,
      specialization: "Threat classification",
    },
    {
      name: "DarkGPT-Analyst",
      type: "GPT",
      status: "active",
      accuracy: 91.2,
      specialization: "Context understanding",
    },
    {
      name: "ThreatLLaMA",
      type: "LLaMA",
      status: "training",
      accuracy: 88.9,
      specialization: "Multi-language analysis",
    },
    {
      name: "CriminalIntent-NER",
      type: "Custom",
      status: "active",
      accuracy: 96.1,
      specialization: "Named entity recognition",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "training":
        return "secondary"
      case "offline":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getModelIcon = (type: string) => {
    switch (type) {
      case "BERT":
        return <Brain className="h-4 w-4 text-chart-1" />
      case "GPT":
        return <MessageSquare className="h-4 w-4 text-chart-2" />
      case "LLaMA":
        return <Zap className="h-4 w-4 text-chart-3" />
      case "Custom":
        return <BarChart3 className="h-4 w-4 text-chart-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* NLP Overview */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <Brain className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nlpMetrics.modelsActive}</div>
            <p className="text-xs text-muted-foreground">AI models running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nlpMetrics.documentsProcessed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Processed today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nlpMetrics.sentimentAnalysis}%</div>
            <p className="text-xs text-muted-foreground">Threat sentiment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keywords</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nlpMetrics.threatKeywords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Threat indicators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Languages</CardTitle>
            <MessageSquare className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nlpMetrics.languagesSupported}</div>
            <p className="text-xs text-muted-foreground">Supported</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Speed</CardTitle>
            <Zap className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nlpMetrics.processingSpeed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Docs/hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Active NLP Models */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            NLP Model Performance
          </CardTitle>
          <CardDescription>Transformer models analyzing dark web content for threat intelligence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {nlpModels.map((model, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getModelIcon(model.type)}
                    <div>
                      <p className="font-medium">{model.name}</p>
                      <p className="text-sm text-muted-foreground">{model.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {model.type}
                    </Badge>
                    <Badge variant={getStatusColor(model.status)}>{model.status.toUpperCase()}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-mono">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Threat Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            High-Priority Threat Keywords
          </CardTitle>
          <CardDescription>Most frequently detected threat indicators in dark web content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {threatKeywords.map((keyword, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Badge variant={getSeverityColor(keyword.severity)}>{keyword.severity.toUpperCase()}</Badge>
                </div>
                <div>
                  <p className="font-medium font-mono">{keyword.keyword}</p>
                  <p className="text-sm text-muted-foreground">{keyword.context}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <p className="text-muted-foreground">Frequency</p>
                  <p className="font-bold text-destructive">{keyword.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Last Seen</p>
                  <p className="font-mono">{keyword.lastSeen}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* NLP Processing Status */}
      <Alert className="border-chart-1 bg-chart-1/10">
        <Brain className="h-4 w-4" />
        <AlertTitle>NLP Processing Active</AlertTitle>
        <AlertDescription>
          4 transformer models are actively analyzing dark web content. Current processing rate:{" "}
          {nlpMetrics.processingSpeed.toLocaleString()} documents per hour. Threat detection confidence: 94.2%
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Retrain Models
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <FileText className="h-4 w-4" />
          Export Analysis
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Zap className="h-4 w-4" />
          Optimize Performance
        </Button>
      </div>
    </div>
  )
}
