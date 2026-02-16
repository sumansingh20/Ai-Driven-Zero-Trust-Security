"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { 
  Zap, Brain, Activity, TrendingUp, Clock, AlertTriangle, CheckCircle,
  Play, Pause, Square, Settings, FileText, Code, Terminal, Database,
  Network, Shield, Lock, Users, Eye, Target, Search, Workflow
} from "lucide-react"

interface PlaybookExecution {
  id: string
  name: string
  type: "incident_response" | "threat_hunting" | "compliance" | "remediation"
  status: "running" | "completed" | "failed" | "paused"
  progress: number
  startTime: string
  duration: string
  actions: number
  successRate: number
}

interface AutomationRule {
  id: string
  name: string
  trigger: string
  conditions: string[]
  actions: string[]
  enabled: boolean
  executions: number
  successRate: number
  lastExecuted: string
}

interface ThreatResponse {
  id: string
  threatType: string
  severity: "critical" | "high" | "medium" | "low"
  source: string
  detectionTime: string
  responseTime: string
  containmentStatus: "contained" | "investigating" | "escalated"
  automatedActions: string[]
}

interface ComplianceCheck {
  id: string
  framework: "SOX" | "HIPAA" | "PCI-DSS" | "GDPR" | "ISO27001"
  control: string
  status: "compliant" | "non_compliant" | "needs_review"
  lastCheck: string
  evidence: string[]
  remediation: string
}

interface WorkflowTemplate {
  id: string
  name: string
  category: "incident" | "compliance" | "threat" | "maintenance"
  description: string
  steps: number
  avgDuration: string
  usageCount: number
}

export default function SOARAutomationPage() {
  const [playbookExecutions] = useState<PlaybookExecution[]>([
    {
      id: "exec-001",
      name: "Malware Incident Response",
      type: "incident_response",
      status: "running", 
      progress: 67,
      startTime: "2025-09-06T11:30:00Z",
      duration: "15 min",
      actions: 12,
      successRate: 94
    },
    {
      id: "exec-002",
      name: "Phishing Campaign Analysis",
      type: "threat_hunting",
      status: "completed",
      progress: 100,
      startTime: "2025-09-06T10:45:00Z", 
      duration: "28 min",
      actions: 23,
      successRate: 98
    },
    {
      id: "exec-003",
      name: "PCI-DSS Compliance Audit",
      type: "compliance",
      status: "running",
      progress: 45,
      startTime: "2025-09-06T11:00:00Z",
      duration: "32 min",
      actions: 45,
      successRate: 91
    }
  ])

  const [automationRules] = useState<AutomationRule[]>([
    {
      id: "rule-001",
      name: "High Severity Threat Auto-Containment",
      trigger: "threat.severity >= 'high' AND confidence >= 85",
      conditions: [
        "Threat confidence > 85%",
        "Not in maintenance window",
        "Source IP not whitelisted"
      ],
      actions: [
        "Isolate affected endpoints",
        "Block malicious IPs",
        "Create incident ticket",
        "Notify security team",
        "Collect forensic evidence"
      ],
      enabled: true,
      executions: 47,
      successRate: 96,
      lastExecuted: "2025-09-06T11:30:00Z"
    },
    {
      id: "rule-002",
      name: "Suspicious Login Pattern Response", 
      trigger: "auth.failed_attempts >= 5 OR location.is_anomalous = true",
      conditions: [
        "Failed login attempts > 5",
        "Login from new location",
        "Outside business hours"
      ],
      actions: [
        "Lock user account", 
        "Require MFA verification",
        "Send security alert",
        "Log security event"
      ],
      enabled: true,
      executions: 123,
      successRate: 92,
      lastExecuted: "2025-09-06T11:15:00Z"
    },
    {
      id: "rule-003",
      name: "Data Exfiltration Prevention",
      trigger: "network.data_transfer > threshold AND destination.is_external = true",
      conditions: [
        "Data transfer > 100MB",
        "External destination",
        "After hours access",
        "Sensitive data classification"
      ],
      actions: [
        "Block network connection",
        "Quarantine source system", 
        "Alert data protection team",
        "Initiate DLP investigation"
      ],
      enabled: true,
      executions: 23,
      successRate: 89,
      lastExecuted: "2025-09-06T10:45:00Z"
    }
  ])

  const [threatResponses] = useState<ThreatResponse[]>([
    {
      id: "resp-001",
      threatType: "Advanced Persistent Threat",
      severity: "critical",
      source: "Network monitoring", 
      detectionTime: "2025-09-06T11:23:45Z",
      responseTime: "00:02:15",
      containmentStatus: "contained",
      automatedActions: [
        "Isolated 5 affected endpoints",
        "Blocked C2 communication",
        "Created incident IR-2025-001",
        "Notified SOC team",
        "Initiated forensic collection"
      ]
    },
    {
      id: "resp-002", 
      threatType: "Phishing Campaign",
      severity: "high",
      source: "Email security",
      detectionTime: "2025-09-06T10:45:12Z",
      responseTime: "00:01:33",
      containmentStatus: "contained",
      automatedActions: [
        "Quarantined malicious emails",
        "Updated threat intelligence",
        "Blocked sender domains",
        "Alerted targeted users"
      ]
    },
    {
      id: "resp-003",
      threatType: "Insider Threat", 
      severity: "medium",
      source: "UEBA system",
      detectionTime: "2025-09-06T09:30:28Z",
      responseTime: "00:05:42",
      containmentStatus: "investigating",
      automatedActions: [
        "Increased monitoring for user",
        "Logged suspicious activities",
        "Restricted file access",
        "Notified HR security"
      ]
    }
  ])

  const [complianceChecks] = useState<ComplianceCheck[]>([
    {
      id: "comp-001",
      framework: "PCI-DSS",
      control: "Requirement 3: Protect stored cardholder data",
      status: "compliant",
      lastCheck: "2025-09-06T08:00:00Z",
      evidence: ["Encryption audit log", "Key management report", "Access control matrix"],
      remediation: "No action required"
    },
    {
      id: "comp-002",
      framework: "SOX", 
      control: "IT General Controls - Access Management",
      status: "non_compliant",
      lastCheck: "2025-09-06T08:00:00Z",
      evidence: ["User access report", "Segregation of duties matrix"],
      remediation: "Review and remediate privileged access assignments"
    },
    {
      id: "comp-003",
      framework: "GDPR",
      control: "Article 32: Security of processing",
      status: "needs_review",
      lastCheck: "2025-09-06T08:00:00Z", 
      evidence: ["Encryption status", "Access logs", "Data processing inventory"],
      remediation: "Update data protection impact assessment"
    }
  ])

  const [workflowTemplates] = useState<WorkflowTemplate[]>([
    {
      id: "template-001",
      name: "Ransomware Incident Response",
      category: "incident",
      description: "Comprehensive response workflow for ransomware attacks",
      steps: 15,
      avgDuration: "45 min",
      usageCount: 23
    },
    {
      id: "template-002",
      name: "Quarterly Compliance Assessment",
      category: "compliance", 
      description: "Automated compliance checking across multiple frameworks",
      steps: 32,
      avgDuration: "2.5 hrs",
      usageCount: 4
    },
    {
      id: "template-003",
      name: "APT Threat Hunt",
      category: "threat",
      description: "Advanced persistent threat hunting and analysis",
      steps: 28,
      avgDuration: "90 min", 
      usageCount: 17
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "secondary"
      case "completed": return "default"
      case "failed": return "destructive"
      case "paused": return "outline"
      case "contained": return "default"
      case "investigating": return "secondary"
      case "escalated": return "destructive"
      case "compliant": return "default"
      case "non_compliant": return "destructive"
      case "needs_review": return "secondary"
      default: return "outline"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive"
      case "high": return "destructive"
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "incident_response": return <AlertTriangle className="h-4 w-4" />
      case "threat_hunting": return <Target className="h-4 w-4" />
      case "compliance": return <Shield className="h-4 w-4" />
      case "remediation": return <Settings className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">SOAR Automation Platform</h1>
              <p className="text-sm text-muted-foreground">Security Orchestration, Automation & Response</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              <Activity className="h-3 w-3 mr-1" />
              3 Active Playbooks
            </Badge>
            <Badge variant="default" className="text-sm">
              <CheckCircle className="h-3 w-3 mr-1" />
              98.5% Success Rate
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Active Automation Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-chart-2 bg-chart-2/10">
            <Zap className="h-4 w-4" />
            <AlertTitle>Automated Response Executed</AlertTitle>
            <AlertDescription>
              High-severity APT threat automatically contained in 2 minutes 15 seconds.
              5 endpoints isolated, C2 communication blocked, incident created.
            </AlertDescription>
          </Alert>

          <Alert className="border-secondary bg-secondary/10">
            <Brain className="h-4 w-4" />
            <AlertTitle>Compliance Check Running</AlertTitle>
            <AlertDescription>
              PCI-DSS automated compliance assessment in progress. 
              45% complete, estimated 20 minutes remaining.
            </AlertDescription>
          </Alert>
        </div>

        {/* SOAR Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key SOAR Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Playbooks</CardTitle>
                  <Workflow className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">3 currently running</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Automated Actions</CardTitle>
                  <Zap className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,347</div>
                  <p className="text-xs text-muted-foreground">Today's executions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-chart-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.8s</div>
                  <p className="text-xs text-muted-foreground">Average automation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-chart-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.5%</div>
                  <p className="text-xs text-muted-foreground">Execution success</p>
                </CardContent>
              </Card>
            </div>

            {/* Real-Time Execution Dashboard */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Active Playbook Executions
                  </CardTitle>
                  <CardDescription>Currently running security orchestration workflows</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {playbookExecutions.filter(exec => exec.status === "running").map((execution) => (
                    <div key={execution.id} className="space-y-3 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(execution.type)}
                          <div>
                            <p className="font-medium">{execution.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {execution.actions} actions • {execution.duration}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(execution.status)}>
                          {execution.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{execution.progress}%</span>
                        </div>
                        <Progress value={execution.progress} className="h-2" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Monitor
                        </Button>
                      </div>
                    </div>
                  ))}
                  {playbookExecutions.filter(exec => exec.status === "running").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Workflow className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No playbooks currently running</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Recent Automated Responses
                  </CardTitle>
                  <CardDescription>Latest threat responses and containment actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {threatResponses.slice(0, 3).map((response) => (
                    <div key={response.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium">{response.threatType}</p>
                          <p className="text-xs text-muted-foreground">
                            Response time: {response.responseTime}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getSeverityColor(response.severity)}>
                            {response.severity.toUpperCase()}
                          </Badge>
                          <Badge variant={getStatusColor(response.containmentStatus)} className="ml-1">
                            {response.containmentStatus.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Automated Actions:</p>
                        <p className="text-xs">{response.automatedActions[0]}</p>
                        <p className="text-xs text-muted-foreground">
                          +{response.automatedActions.length - 1} more actions
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    View All Responses
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Automation Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  SOAR Performance Analytics
                </CardTitle>
                <CardDescription>Key performance indicators and operational metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Incident Response Time</span>
                      <span className="text-chart-4">1.8s avg</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Automation Coverage</span>
                      <span className="text-chart-1">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>False Positive Rate</span>
                      <span className="text-destructive">1.5%</span>
                    </div>
                    <Progress value={1.5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyst Time Saved</span>
                      <span className="text-chart-2">340 hrs</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>

                <Alert className="border-chart-4 bg-chart-4/10">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>SOAR Platform Operational</AlertTitle>
                  <AlertDescription>
                    All automation systems functioning normally. 2,347 actions executed today 
                    with 98.5% success rate. Average incident response time: 1.8 seconds.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playbooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  Security Playbook Management
                </CardTitle>
                <CardDescription>Orchestrated response workflows and execution history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    New Execution
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Playbook
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Templates
                  </Button>
                </div>

                {playbookExecutions.map((execution) => (
                  <div key={execution.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(execution.type)}
                        <div>
                          <p className="font-medium">{execution.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {execution.type.replace("_", " ")} • {execution.actions} actions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(execution.status)}>
                          {execution.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm">{execution.successRate}%</span>
                      </div>
                    </div>

                    {execution.status === "running" && (
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{execution.progress}%</span>
                        </div>
                        <Progress value={execution.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        Started: {new Date(execution.startTime).toLocaleString()} • 
                        Duration: {execution.duration}
                      </span>
                      <div className="flex gap-2">
                        {execution.status === "running" && (
                          <>
                            <Button size="sm" variant="outline">
                              <Pause className="h-3 w-3 mr-1" />
                              Pause
                            </Button>
                            <Button size="sm" variant="outline">
                              <Square className="h-3 w-3 mr-1" />
                              Stop
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Automation Rule Engine
                </CardTitle>
                <CardDescription>Configure intelligent automation rules and triggers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Button>
                    <Code className="h-4 w-4 mr-2" />
                    New Rule
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Import Rules
                  </Button>
                  <Button variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </div>

                {automationRules.map((rule) => (
                  <div key={rule.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Switch checked={rule.enabled} />
                        <div>
                          <p className="font-medium">{rule.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {rule.executions} executions • {rule.successRate}% success rate
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Last executed</p>
                        <p className="text-sm font-mono">
                          {new Date(rule.lastExecuted).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-muted/50 rounded-md p-3">
                        <p className="text-sm font-medium mb-1">Trigger Condition:</p>
                        <code className="text-xs">{rule.trigger}</code>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium mb-2">Conditions:</p>
                          <div className="space-y-1">
                            {rule.conditions.map((condition, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-chart-4" />
                                <span className="text-xs">{condition}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Automated Actions:</p>
                          <div className="space-y-1">
                            {rule.actions.map((action, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Zap className="h-3 w-3 text-chart-2" />
                                <span className="text-xs">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Edit Rule
                      </Button>
                      <Button size="sm" variant="outline">
                        <Play className="h-3 w-3 mr-1" />
                        Test Rule
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Performance
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Automated Threat Responses
                </CardTitle>
                <CardDescription>Real-time threat containment and response actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {threatResponses.map((response) => (
                  <div key={response.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{response.threatType}</p>
                        <p className="text-sm text-muted-foreground">
                          Source: {response.source} • Response time: {response.responseTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(response.severity)}>
                          {response.severity.toUpperCase()}
                        </Badge>
                        <Badge variant={getStatusColor(response.containmentStatus)}>
                          {response.containmentStatus.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Automated Response Actions:</p>
                      <div className="space-y-1">
                        {response.automatedActions.map((action, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-chart-4" />
                            <span className="text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                      <span>
                        Detected: {new Date(response.detectionTime).toLocaleString()}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Timeline
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Automated Compliance Monitoring
                </CardTitle>
                <CardDescription>Continuous compliance assessment and remediation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceChecks.map((check) => (
                  <div key={check.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{check.control}</p>
                        <p className="text-sm text-muted-foreground">
                          Framework: {check.framework}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(check.status)}>
                          {check.status.toUpperCase().replace("_", " ")}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last check: {new Date(check.lastCheck).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Evidence Collected:</p>
                      <div className="flex gap-1 flex-wrap">
                        {check.evidence.map((evidence, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {evidence}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {check.status !== "compliant" && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-md">
                        <p className="text-sm font-medium">Remediation Required:</p>
                        <p className="text-sm">{check.remediation}</p>
                      </div>
                    )}

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Evidence
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Report
                      </Button>
                      {check.status !== "compliant" && (
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3 mr-1" />
                          Remediate
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  Workflow Template Library
                </CardTitle>
                <CardDescription>Pre-built and custom workflow templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {workflowTemplates.map((template) => (
                    <Card key={template.id}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Steps:</span>
                            <span className="font-mono">{template.steps}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg Duration:</span>
                            <span className="font-mono">{template.avgDuration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Usage Count:</span>
                            <span className="font-mono">{template.usageCount}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Play className="h-3 w-3 mr-1" />
                            Execute
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                  <Button variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Import Templates
                  </Button>
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Library
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
