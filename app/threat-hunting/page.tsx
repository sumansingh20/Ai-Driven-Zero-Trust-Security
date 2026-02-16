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
import { 
  Search, Eye, Target, Zap, Brain, Network, Shield, AlertTriangle, 
  Clock, Database, Activity, TrendingUp, Cpu, HardDrive, Globe,
  Lock, Unlock, Users, FileText, Code, Terminal, ChevronRight
} from "lucide-react"

interface ThreatSignature {
  id: string
  name: string
  severity: "critical" | "high" | "medium" | "low"
  confidence: number
  iocs: string[]
  tactics: string[]
  techniques: string[]
  lastSeen: string
  status: "active" | "hunting" | "neutralized"
}

interface HuntingQuery {
  id: string
  name: string
  query: string
  type: "yara" | "sigma" | "kql" | "custom"
  results: number
  status: "running" | "completed" | "failed"
  created: string
}

interface NetworkAnomaly {
  id: string
  type: "lateral_movement" | "data_exfiltration" | "c2_communication" | "port_scan"
  source: string
  destination: string
  protocol: string
  severity: "critical" | "high" | "medium" | "low"
  confidence: number
  timestamp: string
}

export default function ThreatHuntingPage() {
  const [activeHunts, setActiveHunts] = useState<HuntingQuery[]>([
    {
      id: "hunt-001",
      name: "Advanced Persistent Threat Detection",
      query: "process_name:powershell.exe AND command_line:*-EncodedCommand*",
      type: "kql",
      results: 23,
      status: "running",
      created: "2025-09-06T10:30:00Z"
    },
    {
      id: "hunt-002", 
      name: "Lateral Movement via WMI",
      query: "event_id:4648 AND process_name:wmiprvse.exe",
      type: "sigma",
      results: 7,
      status: "completed",
      created: "2025-09-06T09:15:00Z"
    },
    {
      id: "hunt-003",
      name: "Suspicious Registry Modifications", 
      query: "registry_path:*\\Software\\Microsoft\\Windows\\CurrentVersion\\Run*",
      type: "custom",
      results: 156,
      status: "completed",
      created: "2025-09-06T08:45:00Z"
    }
  ])

  const [threatSignatures] = useState<ThreatSignature[]>([
    {
      id: "sig-001",
      name: "Cobalt Strike Beacon Activity",
      severity: "critical",
      confidence: 95,
      iocs: ["185.225.19.87", "beacon.exe", "C:\\temp\\update.dat"],
      tactics: ["Command and Control", "Persistence"],
      techniques: ["T1071.001", "T1547.001"],
      lastSeen: "2025-09-06T11:23:45Z",
      status: "active"
    },
    {
      id: "sig-002", 
      name: "Mimikatz Credential Dumping",
      severity: "critical",
      confidence: 87,
      iocs: ["sekurlsa::logonpasswords", "lsass.exe", "ntdll.dll"],
      tactics: ["Credential Access"],
      techniques: ["T1003.001"],
      lastSeen: "2025-09-06T10:45:12Z",
      status: "hunting"
    },
    {
      id: "sig-003",
      name: "PowerShell Empire Stager",
      severity: "high", 
      confidence: 78,
      iocs: ["powershell.exe", "-EncodedCommand", "System.Net.WebClient"],
      tactics: ["Execution", "Defense Evasion"],
      techniques: ["T1059.001", "T1027"],
      lastSeen: "2025-09-06T09:12:33Z",
      status: "neutralized"
    }
  ])

  const [networkAnomalies] = useState<NetworkAnomaly[]>([
    {
      id: "net-001",
      type: "lateral_movement",
      source: "192.168.1.45",
      destination: "192.168.1.67",
      protocol: "SMB",
      severity: "critical",
      confidence: 92,
      timestamp: "2025-09-06T11:45:23Z"
    },
    {
      id: "net-002",
      type: "c2_communication", 
      source: "192.168.1.23",
      destination: "185.225.19.87",
      protocol: "HTTPS",
      severity: "high",
      confidence: 85,
      timestamp: "2025-09-06T11:32:15Z"
    },
    {
      id: "net-003",
      type: "data_exfiltration",
      source: "192.168.1.78",
      destination: "45.33.32.156",
      protocol: "DNS",
      severity: "high", 
      confidence: 79,
      timestamp: "2025-09-06T11:15:42Z"
    }
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive"
      case "high": return "destructive" 
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "destructive"
      case "hunting": return "secondary"
      case "neutralized": return "default"
      case "running": return "secondary" 
      case "completed": return "default"
      case "failed": return "destructive"
      default: return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">Advanced Threat Hunting</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Threat Detection & Response</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              <Activity className="h-3 w-3 mr-1" />
              12 Active Hunts
            </Badge>
            <Badge variant="destructive" className="text-sm">
              <AlertTriangle className="h-3 w-3 mr-1" />
              7 Critical Alerts
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Critical Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Active APT Campaign Detected</AlertTitle>
            <AlertDescription>
              Cobalt Strike beacon activity observed across 5 endpoints. C2 server: 185.225.19.87. 
              Automated containment protocols initiated.
            </AlertDescription>
          </Alert>
        </div>

        {/* Hunting Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active-hunts">Active Hunts</TabsTrigger>
            <TabsTrigger value="signatures">Signatures</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="intel">Intel Fusion</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
                  <Target className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">+15 in last hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hunt Queries</CardTitle>
                  <Search className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Running continuously</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ML Detections</CardTitle>
                  <Brain className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">892</div>
                  <p className="text-xs text-muted-foreground">AI-powered alerts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Neutralized</CardTitle>
                  <Shield className="h-4 w-4 text-chart-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">234</div>
                  <p className="text-xs text-muted-foreground">Threats contained</p>
                </CardContent>
              </Card>
            </div>

            {/* Threat Landscape Overview */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Real-Time Threat Detection
                  </CardTitle>
                  <CardDescription>Live feed of detected threats and anomalies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {threatSignatures.slice(0, 3).map((threat) => (
                    <div key={threat.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{threat.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Confidence: {threat.confidence}% • {threat.techniques.join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <Badge variant={getStatusColor(threat.status)}>
                          {threat.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    View All Signatures
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Network Anomaly Detection
                  </CardTitle>
                  <CardDescription>Suspicious network patterns and communications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {networkAnomalies.map((anomaly) => (
                    <div key={anomaly.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium capitalize">
                          {anomaly.type.replace("_", " ")}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {anomaly.source} → {anomaly.destination} ({anomaly.protocol})
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {anomaly.confidence}% confidence
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Network className="h-4 w-4 mr-2" />
                    Network Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Hunt Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Hunt Performance Analytics
                </CardTitle>
                <CardDescription>Detection rates and system performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Detection Rate</span>
                      <span className="text-chart-1">94.7%</span>
                    </div>
                    <Progress value={94.7} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>False Positive Rate</span>
                      <span className="text-destructive">2.3%</span>
                    </div>
                    <Progress value={2.3} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Response Time</span>
                      <span className="text-chart-4">1.2s avg</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active-hunts" className="space-y-6">
            {/* Hunt Query Builder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Hunt Query Builder
                </CardTitle>
                <CardDescription>Create and execute advanced threat hunting queries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Query Name</label>
                    <Input placeholder="Enter hunt name..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Query Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select query type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kql">KQL (Kusto Query Language)</SelectItem>
                        <SelectItem value="sigma">Sigma Rule</SelectItem>
                        <SelectItem value="yara">YARA Rule</SelectItem>
                        <SelectItem value="custom">Custom Query</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hunt Query</label>
                  <Textarea 
                    placeholder="Enter your threat hunting query..."
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Execute Hunt
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Save Query
                  </Button>
                  <Button variant="outline">
                    <Terminal className="h-4 w-4 mr-2" />
                    Query Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Hunts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Running Hunt Queries
                </CardTitle>
                <CardDescription>Currently executing threat hunting operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeHunts.map((hunt) => (
                  <div key={hunt.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="space-y-1">
                          <p className="font-medium">{hunt.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {hunt.type.toUpperCase()} • Created: {new Date(hunt.created).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(hunt.status)}>
                          {hunt.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm font-mono">{hunt.results} results</span>
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-md p-3">
                      <code className="text-sm">{hunt.query}</code>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Results
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                      {hunt.status === "running" && (
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Stop Hunt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signatures" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Threat Signatures Database
                </CardTitle>
                <CardDescription>Advanced threat indicators and behavioral patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {threatSignatures.map((signature) => (
                  <div key={signature.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{signature.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last seen: {new Date(signature.lastSeen).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(signature.severity)}>
                          {signature.severity.toUpperCase()}
                        </Badge>
                        <Badge variant={getStatusColor(signature.status)}>
                          {signature.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm">{signature.confidence}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">MITRE ATT&CK Techniques:</p>
                        <div className="flex gap-1 mt-1">
                          {signature.techniques.map((technique) => (
                            <Badge key={technique} variant="outline" className="text-xs">
                              {technique}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Indicators of Compromise:</p>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {signature.iocs.map((ioc, index) => (
                            <Badge key={index} variant="secondary" className="text-xs font-mono">
                              {ioc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Tactics:</p>
                        <div className="flex gap-1 mt-1">
                          {signature.tactics.map((tactic) => (
                            <Badge key={tactic} variant="outline" className="text-xs">
                              {tactic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Search className="h-3 w-3 mr-1" />
                        Hunt
                      </Button>
                      <Button size="sm" variant="outline">
                        <Shield className="h-3 w-3 mr-1" />
                        Block
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Network Traffic Analysis
                </CardTitle>
                <CardDescription>Real-time network anomaly detection and traffic analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {networkAnomalies.map((anomaly) => (
                  <div key={anomaly.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium capitalize">{anomaly.type.replace("_", " ")}</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {anomaly.source} → {anomaly.destination}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                        <span className="text-sm">{anomaly.confidence}%</span>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3 text-sm">
                      <div>
                        <p className="font-medium">Protocol</p>
                        <p className="text-muted-foreground">{anomaly.protocol}</p>
                      </div>
                      <div>
                        <p className="font-medium">Timestamp</p>
                        <p className="text-muted-foreground">
                          {new Date(anomaly.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Risk Score</p>
                        <p className="text-destructive font-mono">
                          {Math.round(anomaly.confidence * (anomaly.severity === "critical" ? 1 : 0.7))}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Lock className="h-3 w-3 mr-1" />
                        Block Traffic
                      </Button>
                      <Button size="sm" variant="outline">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Create Alert
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Threat Timeline
                </CardTitle>
                <CardDescription>Chronological view of security events and threat progression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-12 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Interactive threat timeline will be rendered here</p>
                    <p className="text-sm">Showing attack chains, lateral movement, and incident progression</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Threat Intelligence Fusion
                </CardTitle>
                <CardDescription>Integrated threat intelligence from multiple sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">External Intelligence Feeds</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">MISP Threat Sharing</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">VirusTotal API</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">AlienVault OTX</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Dark Web Feeds</span>
                        <Badge variant="secondary">Monitoring</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Intelligence Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">IOCs Processed Today</span>
                        <span className="font-mono">15,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Threat Actors Tracked</span>
                        <span className="font-mono">234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Campaigns Identified</span>
                        <span className="font-mono">67</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Attribution Confidence</span>
                        <span className="font-mono">84%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
