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
import { ClientTimestamp } from "@/components/client-time"
import { 
  Brain, Globe, Users, Target, AlertTriangle, TrendingUp, Activity,
  Eye, Shield, Database, Network, FileText, Search, Clock, Zap,
  Map, Layers, Filter, Download, Share2, BookOpen, Calendar
} from "lucide-react"

interface ThreatActor {
  id: string
  name: string
  aliases: string[]
  type: "nation_state" | "cybercrime" | "hacktivism" | "insider"
  origin: string
  firstSeen: string
  lastActivity: string
  threatLevel: "critical" | "high" | "medium" | "low"
  campaigns: number
  targets: string[]
  ttps: string[]
  motivation: string
}

interface Campaign {
  id: string
  name: string
  actor: string
  status: "active" | "dormant" | "concluded"
  startDate: string
  lastSeen: string
  targets: string[]
  sectors: string[]
  geography: string[]
  malware: string[]
  confidence: number
  victims: number
}

interface IOC {
  id: string
  type: "ip" | "domain" | "hash" | "url" | "email"
  value: string
  source: string
  confidence: number
  firstSeen: string
  lastSeen: string
  tags: string[]
  relatedCampaigns: string[]
  threatLevel: "critical" | "high" | "medium" | "low"
}

interface VulnerabilityIntel {
  id: string
  cve: string
  cvss: number
  title: string
  type: "zero_day" | "known" | "weaponized"
  exploitAvailable: boolean
  exploitPrice: string
  firstSeen: string
  affectedVendors: string[]
  undergroundActivity: boolean
}

interface GeopoliticalEvent {
  id: string
  title: string
  region: string
  date: string
  type: "conflict" | "sanctions" | "policy" | "election"
  cyberImplications: string
  threatActors: string[]
  affectedSectors: string[]
  riskLevel: "critical" | "high" | "medium" | "low"
}

export default function CyberThreatIntelPage() {
  const [threatActors] = useState<ThreatActor[]>([
    {
      id: "actor-001",
      name: "APT Shadow Dragon",
      aliases: ["ShadowDragon", "Dragon-APT", "Group-7743"],
      type: "nation_state",
      origin: "Unknown (East Asia)",
      firstSeen: "2022-03-15",
      lastActivity: "2025-09-06T10:30:00Z",
      threatLevel: "critical",
      campaigns: 23,
      targets: ["Government", "Defense", "Technology"],
      ttps: ["T1566.001", "T1055", "T1083", "T1071.001"],
      motivation: "Espionage, Intellectual Property Theft"
    },
    {
      id: "actor-002",
      name: "BlackMarket Syndicate",
      aliases: ["BMS", "CrimeCorp", "DarkTrade"],
      type: "cybercrime",
      origin: "Eastern Europe",
      firstSeen: "2021-08-22",
      lastActivity: "2025-09-06T09:45:00Z",
      threatLevel: "high",
      campaigns: 45,
      targets: ["Financial", "Healthcare", "Retail"],
      ttps: ["T1486", "T1083", "T1005", "T1041"],
      motivation: "Financial Gain, Ransomware"
    },
    {
      id: "actor-003",
      name: "CyberActivist Collective",
      aliases: ["CAC", "DigitalRebels", "CyberFreedom"],
      type: "hacktivism",
      origin: "Distributed Global",
      firstSeen: "2023-01-10",
      lastActivity: "2025-09-05T18:20:00Z",
      threatLevel: "medium",
      campaigns: 12,
      targets: ["Government", "Corporations", "Media"],
      ttps: ["T1498", "T1499", "T1190", "T1059"],
      motivation: "Political Activism, Social Justice"
    }
  ])

  const [campaigns] = useState<Campaign[]>([
    {
      id: "camp-001",
      name: "Operation Digital Serpent",
      actor: "APT Shadow Dragon",
      status: "active",
      startDate: "2025-07-15",
      lastSeen: "2025-09-06T11:30:00Z",
      targets: ["Defense contractors", "Technology companies"],
      sectors: ["Defense", "Technology", "Research"],
      geography: ["North America", "Europe", "Asia Pacific"],
      malware: ["SerpentRAT", "DragonLoader", "StealthBackdoor"],
      confidence: 94,
      victims: 47
    },
    {
      id: "camp-002",
      name: "Healthcare Ransomware Wave",
      actor: "BlackMarket Syndicate",
      status: "active",
      startDate: "2025-08-01",
      lastSeen: "2025-09-06T10:45:00Z",
      targets: ["Hospitals", "Medical centers", "Pharmaceutical"],
      sectors: ["Healthcare", "Pharmaceuticals"],
      geography: ["North America", "Europe"],
      malware: ["MediCrypt", "HealthLock", "PharmaRansom"],
      confidence: 87,
      victims: 156
    },
    {
      id: "camp-003",
      name: "Corporate Website Defacements",
      actor: "CyberActivist Collective",
      status: "dormant",
      startDate: "2025-05-20",
      lastSeen: "2025-08-15T14:20:00Z",
      targets: ["Corporate websites", "Government portals"],
      sectors: ["Various"],
      geography: ["Global"],
      malware: ["DefaceTool", "WebShell", "SQLiKit"],
      confidence: 76,
      victims: 234
    }
  ])

  const [iocs] = useState<IOC[]>([
    {
      id: "ioc-001",
      type: "ip",
      value: "185.225.19.87",
      source: "Dark Web Intelligence",
      confidence: 95,
      firstSeen: "2025-09-05T14:30:00Z",
      lastSeen: "2025-09-06T11:45:00Z",
      tags: ["c2_server", "apt", "malware"],
      relatedCampaigns: ["Operation Digital Serpent"],
      threatLevel: "critical"
    },
    {
      id: "ioc-002",
      type: "domain",
      value: "secure-update-microsoft[.]com",
      source: "Honeypot Network",
      confidence: 89,
      firstSeen: "2025-09-04T09:15:00Z",
      lastSeen: "2025-09-06T10:20:00Z",
      tags: ["phishing", "typosquatting", "credential_theft"],
      relatedCampaigns: ["Healthcare Ransomware Wave"],
      threatLevel: "high"
    },
    {
      id: "ioc-003",
      type: "hash",
      value: "a1b2c3d4e5f6789012345678901234567890abcdef",
      source: "Malware Analysis",
      confidence: 92,
      firstSeen: "2025-09-03T16:45:00Z",
      lastSeen: "2025-09-06T08:30:00Z",
      tags: ["ransomware", "encryption", "windows"],
      relatedCampaigns: ["Healthcare Ransomware Wave"],
      threatLevel: "critical"
    }
  ])

  const [vulnerabilities] = useState<VulnerabilityIntel[]>([
    {
      id: "vuln-001",
      cve: "CVE-2025-9999",
      cvss: 9.8,
      title: "Critical Remote Code Execution in Popular Web Framework",
      type: "zero_day",
      exploitAvailable: true,
      exploitPrice: "$50,000 BTC",
      firstSeen: "2025-09-05T12:00:00Z",
      affectedVendors: ["WebFramework Corp", "Enterprise Solutions"],
      undergroundActivity: true
    },
    {
      id: "vuln-002",
      cve: "CVE-2025-8888",
      cvss: 8.1,
      title: "Privilege Escalation in Windows Service Manager",
      type: "weaponized",
      exploitAvailable: true,
      exploitPrice: "$5,000 USD",
      firstSeen: "2025-09-01T08:30:00Z",
      affectedVendors: ["Microsoft"],
      undergroundActivity: true
    }
  ])

  const [geopoliticalEvents] = useState<GeopoliticalEvent[]>([
    {
      id: "geo-001",
      title: "New Cyber Security Sanctions Announced",
      region: "Global",
      date: "2025-09-05",
      type: "sanctions",
      cyberImplications: "Expected increase in nation-state cyber activity and proxy operations",
      threatActors: ["APT Shadow Dragon", "State-sponsored groups"],
      affectedSectors: ["Government", "Critical Infrastructure", "Finance"],
      riskLevel: "high"
    },
    {
      id: "geo-002",
      title: "Regional Trade Dispute Escalation",
      region: "Asia Pacific",
      date: "2025-09-03",
      type: "conflict",
      cyberImplications: "Anticipated cyber espionage campaigns targeting trade negotiations",
      threatActors: ["Nation-state actors", "Economic espionage groups"],
      affectedSectors: ["Trade", "Manufacturing", "Technology"],
      riskLevel: "medium"
    }
  ])

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "critical": return "destructive"
      case "high": return "destructive"
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
    }
  }

  const getActorTypeIcon = (type: string) => {
    switch (type) {
      case "nation_state": return <Globe className="h-4 w-4" />
      case "cybercrime": return <Users className="h-4 w-4" />
      case "hacktivism": return <Target className="h-4 w-4" />
      case "insider": return <Eye className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "destructive"
      case "dormant": return "secondary"
      case "concluded": return "outline"
      default: return "outline"
    }
  }

  const getIOCTypeIcon = (type: string) => {
    switch (type) {
      case "ip": return <Network className="h-4 w-4" />
      case "domain": return <Globe className="h-4 w-4" />
      case "hash": return <FileText className="h-4 w-4" />
      case "url": return <Globe className="h-4 w-4" />
      case "email": return <Users className="h-4 w-4" />
      default: return <Database className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">Cyber Threat Intelligence</h1>
              <p className="text-sm text-muted-foreground">Advanced Threat Actor Attribution & Campaign Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              <Activity className="h-3 w-3 mr-1" />
              47 Active Campaigns
            </Badge>
            <Badge variant="destructive" className="text-sm">
              <AlertTriangle className="h-3 w-3 mr-1" />
              3 Critical Threats
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Intelligence Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Zero-Day Exploit Detected</AlertTitle>
            <AlertDescription>
              CVE-2025-9999 actively exploited in underground markets. CVSS 9.8 affecting popular web frameworks.
              Exploit price: $50,000 BTC. Immediate patching recommended.
            </AlertDescription>
          </Alert>

          <Alert className="border-secondary bg-secondary/10">
            <Globe className="h-4 w-4" />
            <AlertTitle>New APT Campaign: Operation Digital Serpent</AlertTitle>
            <AlertDescription>
              Advanced persistent threat targeting defense contractors and technology companies.
              Attribution: APT Shadow Dragon. 47 confirmed victims across North America and Europe.
            </AlertDescription>
          </Alert>
        </div>

        {/* Threat Intelligence Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="actors">Threat Actors</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="iocs">IOCs</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="geopolitical">Geopolitical</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Intelligence Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Threat Actors</CardTitle>
                  <Users className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">234</div>
                  <p className="text-xs text-muted-foreground">Tracked organizations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  <Target className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">Ongoing operations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fresh IOCs</CardTitle>
                  <Database className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,847</div>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Zero-Days</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Active exploits</p>
                </CardContent>
              </Card>
            </div>

            {/* Threat Landscape Overview */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Active Threat Actors
                  </CardTitle>
                  <CardDescription>Currently monitored threat organizations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {threatActors.slice(0, 3).map((actor) => (
                    <div key={actor.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        {getActorTypeIcon(actor.type)}
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{actor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {actor.origin} • {actor.campaigns} campaigns • {actor.targets.slice(0, 2).join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getThreatLevelColor(actor.threatLevel)}>
                          {actor.threatLevel.toUpperCase()}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          <ClientTimestamp timestamp={actor.lastActivity} format="date" />
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    View All Threat Actors
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Critical Campaigns
                  </CardTitle>
                  <CardDescription>High-priority threat campaigns requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {campaigns.filter(c => c.status === "active").map((campaign) => (
                    <div key={campaign.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.actor} • {campaign.victims} victims
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusColor(campaign.status)}>
                            {campaign.status.toUpperCase()}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {campaign.confidence}% confidence
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Sectors: {campaign.sectors.join(", ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Geography: {campaign.geography.slice(0, 2).join(", ")}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Campaign Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Intelligence Sources Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Intelligence Collection Performance
                </CardTitle>
                <CardDescription>Data quality and source reliability metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Dark Web Sources</span>
                      <span className="text-chart-1">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>OSINT Feeds</span>
                      <span className="text-chart-2">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Industry Sharing</span>
                      <span className="text-chart-4">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Honeypot Network</span>
                      <span className="text-chart-3">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>

                <Alert className="border-chart-4 bg-chart-4/10">
                  <Brain className="h-4 w-4" />
                  <AlertTitle>Threat Intelligence Pipeline Active</AlertTitle>
                  <AlertDescription>
                    All intelligence sources operational. Processing 15,847 new IOCs daily with 89% accuracy.
                    Attribution confidence averaging 84% across all active campaigns.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Threat Actor Database
                </CardTitle>
                <CardDescription>Comprehensive profiles of tracked threat organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Input placeholder="Search threat actors..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="nation_state">Nation State</SelectItem>
                      <SelectItem value="cybercrime">Cybercrime</SelectItem>
                      <SelectItem value="hacktivism">Hacktivism</SelectItem>
                      <SelectItem value="insider">Insider Threat</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {threatActors.map((actor) => (
                  <div key={actor.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getActorTypeIcon(actor.type)}
                        <div>
                          <p className="font-medium text-lg">{actor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Aliases: {actor.aliases.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {actor.type.replace("_", " ")}
                        </Badge>
                        <Badge variant={getThreatLevelColor(actor.threatLevel)}>
                          {actor.threatLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 mb-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Origin & Activity</p>
                        <p className="text-sm text-muted-foreground">{actor.origin}</p>
                        <p className="text-xs text-muted-foreground">
                          Active since: <ClientTimestamp timestamp={actor.firstSeen} format="date" />
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last seen: <ClientTimestamp timestamp={actor.lastActivity} format="date" />
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Campaign Statistics</p>
                        <p className="text-lg font-mono">{actor.campaigns} campaigns</p>
                        <p className="text-xs text-muted-foreground">Motivation: {actor.motivation}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Primary Targets:</p>
                      <div className="flex gap-1 flex-wrap">
                        {actor.targets.map((target) => (
                          <Badge key={target} variant="secondary" className="text-xs">
                            {target}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mt-3">
                      <p className="text-sm font-medium">Known TTPs:</p>
                      <div className="flex gap-1 flex-wrap">
                        {actor.ttps.map((ttp) => (
                          <Badge key={ttp} variant="outline" className="text-xs font-mono">
                            {ttp}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Full Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <Activity className="h-3 w-3 mr-1" />
                        Campaign History
                      </Button>
                      <Button size="sm" variant="outline">
                        <Target className="h-3 w-3 mr-1" />
                        Attribution
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Threat Campaign Analysis
                </CardTitle>
                <CardDescription>Active and historical campaign tracking and analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-lg">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Attributed to: {campaign.actor}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(campaign.status)}>
                          {campaign.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm">{campaign.confidence}%</span>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3 mb-3">
                      <div>
                        <p className="text-sm font-medium">Timeline</p>
                        <p className="text-sm text-muted-foreground">
                          Started: <ClientTimestamp timestamp={campaign.startDate} format="date" />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Last seen: <ClientTimestamp timestamp={campaign.lastSeen} format="date" />
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Impact</p>
                        <p className="text-lg font-mono text-destructive">{campaign.victims} victims</p>
                        <p className="text-sm text-muted-foreground">Confirmed compromises</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Confidence</p>
                        <div className="space-y-1">
                          <Progress value={campaign.confidence} className="h-2" />
                          <p className="text-xs text-muted-foreground">Attribution accuracy</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Target Sectors:</p>
                        <div className="flex gap-1 flex-wrap">
                          {campaign.sectors.map((sector) => (
                            <Badge key={sector} variant="secondary" className="text-xs">
                              {sector}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Geographic Focus:</p>
                        <div className="flex gap-1 flex-wrap">
                          {campaign.geography.map((geo) => (
                            <Badge key={geo} variant="outline" className="text-xs">
                              {geo}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Associated Malware:</p>
                        <div className="flex gap-1 flex-wrap">
                          {campaign.malware.map((malware) => (
                            <Badge key={malware} variant="destructive" className="text-xs">
                              {malware}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Map className="h-3 w-3 mr-1" />
                        Campaign Map
                      </Button>
                      <Button size="sm" variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Timeline
                      </Button>
                      <Button size="sm" variant="outline">
                        <Database className="h-3 w-3 mr-1" />
                        IOCs
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="iocs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Indicators of Compromise
                </CardTitle>
                <CardDescription>Fresh threat intelligence indicators and their attribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Input placeholder="Search IOCs..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="ip">IP Addresses</SelectItem>
                      <SelectItem value="domain">Domains</SelectItem>
                      <SelectItem value="hash">File Hashes</SelectItem>
                      <SelectItem value="url">URLs</SelectItem>
                      <SelectItem value="email">Email Addresses</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {iocs.map((ioc) => (
                  <div key={ioc.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getIOCTypeIcon(ioc.type)}
                        <div>
                          <p className="font-mono text-sm">{ioc.value}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {ioc.type} • Source: {ioc.source}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getThreatLevelColor(ioc.threatLevel)}>
                          {ioc.threatLevel.toUpperCase()}
                        </Badge>
                        <span className="text-sm">{ioc.confidence}%</span>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 mb-3">
                      <div>
                        <p className="text-sm font-medium">Timeline</p>
                        <p className="text-xs text-muted-foreground">
                          First seen: <ClientTimestamp timestamp={ioc.firstSeen} format="date" />
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last seen: {new Date(ioc.lastSeen).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Related Campaigns</p>
                        {ioc.relatedCampaigns.length > 0 ? (
                          <div className="space-y-1">
                            {ioc.relatedCampaigns.map((campaign) => (
                              <Badge key={campaign} variant="outline" className="text-xs">
                                {campaign}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">No campaigns linked</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Tags:</p>
                      <div className="flex gap-1 flex-wrap">
                        {ioc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Shield className="h-3 w-3 mr-1" />
                        Block
                      </Button>
                      <Button size="sm" variant="outline">
                        <Search className="h-3 w-3 mr-1" />
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share Intel
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Vulnerability Intelligence
                </CardTitle>
                <CardDescription>Zero-day exploits and weaponized vulnerabilities from underground sources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{vuln.title}</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {vuln.cve} • CVSS: {vuln.cvss}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {vuln.type.replace("_", " ")}
                        </Badge>
                        {vuln.undergroundActivity && (
                          <Badge variant="destructive">Underground Activity</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3 mb-3">
                      <div>
                        <p className="text-sm font-medium">Exploit Status</p>
                        {vuln.exploitAvailable ? (
                          <div className="space-y-1">
                            <Badge variant="destructive">Available</Badge>
                            <p className="text-sm font-mono">{vuln.exploitPrice}</p>
                          </div>
                        ) : (
                          <Badge variant="outline">Not Available</Badge>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">Discovery Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(vuln.firstSeen).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">CVSS Score</p>
                        <div className="flex items-center gap-2">
                          <Progress value={vuln.cvss * 10} className="h-2 flex-1" />
                          <span className="text-sm font-mono">{vuln.cvss}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Affected Vendors:</p>
                      <div className="flex gap-1 flex-wrap">
                        {vuln.affectedVendors.map((vendor) => (
                          <Badge key={vendor} variant="secondary" className="text-xs">
                            {vendor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Technical Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Shield className="h-3 w-3 mr-1" />
                        Mitigation
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

          <TabsContent value="geopolitical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Geopolitical Cyber Threat Analysis
                </CardTitle>
                <CardDescription>Global events and their cybersecurity implications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {geopoliticalEvents.map((event) => (
                  <div key={event.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.region} • {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {event.type}
                        </Badge>
                        <Badge variant={getThreatLevelColor(event.riskLevel)}>
                          {event.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-muted/50 rounded-md p-3">
                        <p className="text-sm font-medium mb-1">Cyber Implications:</p>
                        <p className="text-sm">{event.cyberImplications}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Related Threat Actors:</p>
                        <div className="flex gap-1 flex-wrap">
                          {event.threatActors.map((actor) => (
                            <Badge key={actor} variant="destructive" className="text-xs">
                              {actor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Affected Sectors:</p>
                        <div className="flex gap-1 flex-wrap">
                          {event.affectedSectors.map((sector) => (
                            <Badge key={sector} variant="secondary" className="text-xs">
                              {sector}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Analysis
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        Timeline
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="h-3 w-3 mr-1" />
                        Related Actors
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI-Powered Attribution
                  </CardTitle>
                  <CardDescription>Machine learning threat actor attribution analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Attribution Accuracy</span>
                      <span className="font-mono text-chart-4">84%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Campaign Correlation</span>
                      <span className="font-mono text-chart-1">91%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">TTP Matching</span>
                      <span className="font-mono text-chart-2">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Intelligence Trends
                  </CardTitle>
                  <CardDescription>Threat landscape evolution and predictions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Trend analysis dashboard</p>
                    <p className="text-sm">Threat evolution patterns and forecasting</p>
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
