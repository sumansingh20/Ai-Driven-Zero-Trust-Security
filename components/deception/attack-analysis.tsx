

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Target, Brain, FileText, Eye, Shield, Zap } from "lucide-react"

interface AttackAnalysis {
  id: string
  attackerIP: string
  honeypotTarget: string
  startTime: string
  duration: string
  ttps: string[]
  mitreMapping: string[]
  severity: "low" | "medium" | "high" | "critical"
  attackPhase: "reconnaissance" | "initial_access" | "persistence" | "lateral_movement" | "exfiltration"
  confidence: number
}

interface TTPAnalysis {
  technique: string
  mitreId: string
  frequency: number
  description: string
  severity: "low" | "medium" | "high" | "critical"
  lastSeen: string
}

interface AttackerProfile {
  id: string
  ipAddress: string
  country: string
  firstSeen: string
  totalInteractions: number
  honeypotTargets: number
  sophisticationLevel: "low" | "medium" | "high" | "advanced"
  threatGroup: string | null
}

export function AttackAnalysis() {
  const [attackAnalyses] = useState<AttackAnalysis[]>([
    {
      id: "ATK-001",
      attackerIP: "192.168.1.45",
      honeypotTarget: "Finance-WebServer-Decoy",
      startTime: "2024-01-15 14:23:17",
      duration: "2h 15m",
      ttps: ["Credential Stuffing", "SQL Injection", "File Enumeration"],
      mitreMapping: ["T1110.003", "T1190", "T1083"],
      severity: "critical",
      attackPhase: "lateral_movement",
      confidence: 94.7,
    },
    {
      id: "ATK-002",
      attackerIP: "10.0.2.15",
      honeypotTarget: "HR-Database-Trap",
      startTime: "2024-01-15 13:45:22",
      duration: "45m",
      ttps: ["Port Scanning", "Service Enumeration"],
      mitreMapping: ["T1046", "T1057"],
      severity: "medium",
      attackPhase: "reconnaissance",
      confidence: 87.3,
    },
    {
      id: "ATK-003",
      attackerIP: "172.16.0.33",
      honeypotTarget: "Backup-FileShare-Honey",
      startTime: "2024-01-15 12:18:09",
      duration: "3h 22m",
      ttps: ["SMB Enumeration", "Privilege Escalation", "Data Staging"],
      mitreMapping: ["T1135", "T1068", "T1074"],
      severity: "high",
      attackPhase: "exfiltration",
      confidence: 91.8,
    },
  ])

  const [ttpAnalyses] = useState<TTPAnalysis[]>([
    {
      technique: "Credential Stuffing",
      mitreId: "T1110.003",
      frequency: 23,
      description: "Automated login attempts using compromised credential lists",
      severity: "high",
      lastSeen: "15 minutes ago",
    },
    {
      technique: "Network Service Scanning",
      mitreId: "T1046",
      frequency: 18,
      description: "Systematic scanning of network services and open ports",
      severity: "medium",
      lastSeen: "32 minutes ago",
    },
    {
      technique: "File and Directory Discovery",
      mitreId: "T1083",
      frequency: 15,
      description: "Enumeration of file systems and directory structures",
      severity: "medium",
      lastSeen: "1 hour ago",
    },
    {
      technique: "Exploitation for Privilege Escalation",
      mitreId: "T1068",
      frequency: 8,
      description: "Exploiting software vulnerabilities to gain elevated privileges",
      severity: "critical",
      lastSeen: "2 hours ago",
    },
  ])

  const [attackerProfiles] = useState<AttackerProfile[]>([
    {
      id: "PROF-001",
      ipAddress: "192.168.1.45",
      country: "Unknown (TOR)",
      firstSeen: "2024-01-14 09:15:33",
      totalInteractions: 47,
      honeypotTargets: 3,
      sophisticationLevel: "advanced",
      threatGroup: "APT-29 (Suspected)",
    },
    {
      id: "PROF-002",
      ipAddress: "10.0.2.15",
      country: "Russia",
      firstSeen: "2024-01-15 08:22:11",
      totalInteractions: 12,
      honeypotTargets: 1,
      sophisticationLevel: "medium",
      threatGroup: null,
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

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "reconnaissance":
        return "outline"
      case "initial_access":
        return "secondary"
      case "persistence":
        return "secondary"
      case "lateral_movement":
        return "destructive"
      case "exfiltration":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getSophisticationColor = (level: string) => {
    switch (level) {
      case "advanced":
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

  return (
    <div className="space-y-6">
      {/* Analysis Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Attacks</CardTitle>
            <Target className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attackAnalyses.length}</div>
            <p className="text-xs text-muted-foreground">Currently analyzed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MITRE TTPs</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ttpAnalyses.length}</div>
            <p className="text-xs text-muted-foreground">Techniques identified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threat Actors</CardTitle>
            <Eye className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attackerProfiles.length}</div>
            <p className="text-xs text-muted-foreground">Unique profiles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
            <Brain className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(attackAnalyses.reduce((acc, a) => acc + a.confidence, 0) / attackAnalyses.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Analysis accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Attack Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Active Attack Analysis
          </CardTitle>
          <CardDescription>AI-powered analysis of attacker behavior and MITRE ATT&CK mapping</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {attackAnalyses.map((attack) => (
            <div key={attack.id} className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium">Attack on {attack.honeypotTarget}</p>
                    <p className="text-sm text-muted-foreground">
                      From {attack.attackerIP} • Duration: {attack.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPhaseColor(attack.attackPhase)}>
                    {attack.attackPhase.replace("_", " ").toUpperCase()}
                  </Badge>
                  <Badge variant={getSeverityColor(attack.severity)}>{attack.severity.toUpperCase()}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Confidence</span>
                  <span className="font-mono">{attack.confidence}%</span>
                </div>
                <Progress value={attack.confidence} className="h-2" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium mb-2">Observed TTPs:</p>
                  <div className="flex flex-wrap gap-1">
                    {attack.ttps.map((ttp, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {ttp}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">MITRE ATT&CK IDs:</p>
                  <div className="flex flex-wrap gap-1">
                    {attack.mitreMapping.map((mitre, index) => (
                      <Badge key={index} variant="secondary" className="text-xs font-mono">
                        {mitre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                <span>Started: {attack.startTime}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Generate Report
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* TTP Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            MITRE ATT&CK Technique Analysis
          </CardTitle>
          <CardDescription>Most frequently observed attack techniques and patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ttpAnalyses.map((ttp, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="font-mono">
                  {ttp.mitreId}
                </Badge>
                <div>
                  <p className="font-medium">{ttp.technique}</p>
                  <p className="text-sm text-muted-foreground">{ttp.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <p className="text-muted-foreground">Frequency</p>
                  <p className="font-bold text-destructive">{ttp.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Last Seen</p>
                  <p className="font-mono">{ttp.lastSeen}</p>
                </div>
                <Badge variant={getSeverityColor(ttp.severity)}>{ttp.severity.toUpperCase()}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Attacker Profiles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Threat Actor Profiles
          </CardTitle>
          <CardDescription>AI-generated profiles of attackers interacting with honeypots</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {attackerProfiles.map((profile) => (
            <div key={profile.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-chart-1" />
                  <div>
                    <p className="font-medium font-mono">{profile.ipAddress}</p>
                    <p className="text-sm text-muted-foreground">
                      {profile.country} • First seen: {profile.firstSeen}
                    </p>
                  </div>
                </div>
                <Badge variant={getSophisticationColor(profile.sophisticationLevel)}>
                  {profile.sophisticationLevel.toUpperCase()}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Interactions</p>
                  <p className="font-bold">{profile.totalInteractions}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Honeypots Targeted</p>
                  <p className="font-bold">{profile.honeypotTargets}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Threat Group</p>
                  <p className="font-bold">{profile.threatGroup || "Unknown"}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Analysis Status */}
      <Alert className="border-chart-1 bg-chart-1/10">
        <Brain className="h-4 w-4" />
        <AlertTitle>AI Attack Analysis Active</AlertTitle>
        <AlertDescription>
          Machine learning models are continuously analyzing attacker behavior patterns and mapping to MITRE ATT&CK
          framework. Current analysis confidence: 91.3%. {attackAnalyses.length} active attack sessions under analysis.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Generate Threat Report
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <FileText className="h-4 w-4" />
          Export MITRE Data
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Zap className="h-4 w-4" />
          Update IOCs
        </Button>
      </div>
    </div>
  )
}
