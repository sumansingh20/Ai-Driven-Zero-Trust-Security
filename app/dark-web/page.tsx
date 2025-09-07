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
import { 
  Globe, Search, Eye, AlertTriangle, Shield, Database, Users, Activity,
  Lock, Unlock, FileText, Download, Upload, Brain, Network, Zap,
  Server, HardDrive, Cpu, TrendingUp, Clock, Target, ChevronRight
} from "lucide-react"

interface DarkWebSource {
  id: string
  name: string
  type: "forum" | "marketplace" | "leak_site" | "chat" | "ransomware_blog" | "telegram"
  url: string
  status: "active" | "monitoring" | "offline" | "banned"
  threats: number
  lastCrawl: string
  riskScore: number
}

interface ThreatIntel {
  id: string
  title: string
  type: "credential_dump" | "malware_sample" | "exploit_kit" | "ransomware" | "apt_campaign"
  severity: "critical" | "high" | "medium" | "low"
  source: string
  confidence: number
  iocs: string[]
  timestamp: string
  tags: string[]
}

interface CyberCriminalGroup {
  id: string
  name: string
  aliases: string[]
  type: "ransomware" | "apt" | "cybercrime" | "hacktivism"
  threatLevel: "critical" | "high" | "medium" | "low"
  activeMembers: number
  knownMalware: string[]
  targetSectors: string[]
  lastActivity: string
}

interface MarketplaceListing {
  id: string
  title: string
  category: "credentials" | "malware" | "exploits" | "services" | "data"
  price: string
  seller: string
  sellerRating: number
  postedDate: string
  relevanceScore: number
}

export default function DarkWebIntelPage() {
  const [darkWebSources] = useState<DarkWebSource[]>([
    {
      id: "dw-001",
      name: "Underground Forum Alpha",
      type: "forum",
      url: "http://alpha[.]onion",
      status: "active",
      threats: 47,
      lastCrawl: "2025-09-06T11:45:23Z",
      riskScore: 95
    },
    {
      id: "dw-002",
      name: "CriminalMarket Pro",
      type: "marketplace", 
      url: "http://market[.]onion",
      status: "monitoring",
      threats: 234,
      lastCrawl: "2025-09-06T11:30:15Z",
      riskScore: 87
    },
    {
      id: "dw-003",
      name: "DataLeaks Repository",
      type: "leak_site",
      url: "http://leaks[.]onion", 
      status: "active",
      threats: 156,
      lastCrawl: "2025-09-06T11:15:42Z",
      riskScore: 92
    },
    {
      id: "dw-004",
      name: "RansomBlog Network",
      type: "ransomware_blog",
      url: "http://ransom[.]onion",
      status: "active", 
      threats: 78,
      lastCrawl: "2025-09-06T10:58:31Z",
      riskScore: 89
    }
  ])

  const [threatIntel] = useState<ThreatIntel[]>([
    {
      id: "intel-001",
      title: "Corporate Email Database Breach - Fortune 500 Company",
      type: "credential_dump",
      severity: "critical",
      source: "Underground Forum Alpha",
      confidence: 94,
      iocs: ["admin@company[.]com", "leaked_db_2025.sql", "175.45.23.89"],
      timestamp: "2025-09-06T11:23:45Z",
      tags: ["data_breach", "credentials", "corporate"]
    },
    {
      id: "intel-002", 
      title: "Advanced Persistent Threat Toolkit v3.7",
      type: "malware_sample",
      severity: "critical",
      source: "CriminalMarket Pro",
      confidence: 91,
      iocs: ["apt_toolkit.exe", "c2.malware[.]domain", "SHA256:a1b2c3..."],
      timestamp: "2025-09-06T10:45:12Z", 
      tags: ["apt", "toolkit", "malware"]
    },
    {
      id: "intel-003",
      title: "Zero-Day Exploit for CVE-2025-XXXX",
      type: "exploit_kit", 
      severity: "critical",
      source: "DataLeaks Repository",
      confidence: 87,
      iocs: ["exploit_kit.zip", "payload.dll", "192.168.1.100"],
      timestamp: "2025-09-06T09:30:28Z",
      tags: ["zero_day", "exploit", "cve"]
    },
    {
      id: "intel-004",
      title: "BlackCat Ransomware 2.0 Campaign Announcement", 
      type: "ransomware",
      severity: "high",
      source: "RansomBlog Network",
      confidence: 96,
      iocs: ["blackcat2.exe", "ransom_note.txt", "tor_payment_site"],
      timestamp: "2025-09-06T08:15:33Z",
      tags: ["ransomware", "blackcat", "campaign"]
    }
  ])

  const [cyberGroups] = useState<CyberCriminalGroup[]>([
    {
      id: "group-001",
      name: "DarkHalo APT",
      aliases: ["APT-47", "ShadowTeam", "CyberPhantom"],
      type: "apt",
      threatLevel: "critical", 
      activeMembers: 23,
      knownMalware: ["DarkLoader", "ShadowRAT", "PhantomBeacon"],
      targetSectors: ["Finance", "Healthcare", "Government"],
      lastActivity: "2025-09-06T11:30:00Z"
    },
    {
      id: "group-002",
      name: "BlackMarket Syndicate",
      aliases: ["BMS", "DarkTraders", "UndergroundSales"],
      type: "cybercrime",
      threatLevel: "high",
      activeMembers: 156,
      knownMalware: ["InfoStealer", "CryptoMiner", "BankingTrojan"],
      targetSectors: ["Retail", "E-commerce", "Banking"],
      lastActivity: "2025-09-06T10:45:00Z"
    },
    {
      id: "group-003", 
      name: "RansomCorp Elite",
      aliases: ["RC-Elite", "CryptoCorp", "LockDown"],
      type: "ransomware",
      threatLevel: "critical",
      activeMembers: 67,
      knownMalware: ["RansomCorp", "FileLocker", "CryptoWall"],
      targetSectors: ["Healthcare", "Education", "Manufacturing"],
      lastActivity: "2025-09-06T09:20:00Z"
    }
  ])

  const [marketplaceListings] = useState<MarketplaceListing[]>([
    {
      id: "market-001",
      title: "Fresh Corporate Email Database - 50K Records",
      category: "credentials",
      price: "$2,500 BTC",
      seller: "DataMaster99",
      sellerRating: 4.8,
      postedDate: "2025-09-06T11:00:00Z",
      relevanceScore: 95
    },
    {
      id: "market-002", 
      title: "Advanced Banking Trojan - Undetectable",
      category: "malware",
      price: "$5,000 BTC", 
      seller: "MalwareKing",
      sellerRating: 4.9,
      postedDate: "2025-09-06T10:30:00Z",
      relevanceScore: 88
    },
    {
      id: "market-003",
      title: "RDP Access to Government Network",
      category: "services",
      price: "$15,000 BTC",
      seller: "NetworkGhost", 
      sellerRating: 4.7,
      postedDate: "2025-09-06T09:45:00Z",
      relevanceScore: 92
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
      case "active": return "default"
      case "monitoring": return "secondary"
      case "offline": return "destructive"
      case "banned": return "outline"
      default: return "outline"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "credentials": return <Users className="h-4 w-4" />
      case "malware": return <AlertTriangle className="h-4 w-4" />
      case "exploits": return <Target className="h-4 w-4" />
      case "services": return <Server className="h-4 w-4" />
      case "data": return <Database className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">Dark Web Intelligence</h1>
              <p className="text-sm text-muted-foreground">Advanced Threat Intelligence from Underground Sources</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              <Eye className="h-3 w-3 mr-1" />
              847 Sources Monitored
            </Badge>
            <Badge variant="destructive" className="text-sm">
              <AlertTriangle className="h-3 w-3 mr-1" />
              23 Critical Threats
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Critical Intelligence Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Intelligence: Corporate Data Breach</AlertTitle>
            <AlertDescription>
              Fresh credential dump containing 50,000+ corporate email accounts detected on Underground Forum Alpha.
              Automated monitoring initiated for affected domains.
            </AlertDescription>
          </Alert>

          <Alert className="border-secondary bg-secondary/10">
            <Shield className="h-4 w-4" />
            <AlertTitle>New Ransomware Campaign Detected</AlertTitle>
            <AlertDescription>
              BlackCat Ransomware 2.0 campaign announced targeting healthcare sector. 
              Updated IOCs distributed to defense systems.
            </AlertDescription>
          </Alert>
        </div>

        {/* Dark Web Intelligence Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
            <TabsTrigger value="groups">Threat Groups</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sources</CardTitle>
                  <Globe className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">847</div>
                  <p className="text-xs text-muted-foreground">Onion domains monitored</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Threat Intel</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">Intelligence reports today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Criminal Groups</CardTitle>
                  <Users className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">234</div>
                  <p className="text-xs text-muted-foreground">Threat actors tracked</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">IOCs Collected</CardTitle>
                  <Target className="h-4 w-4 text-chart-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,847</div>
                  <p className="text-xs text-muted-foreground">Indicators processed</p>
                </CardContent>
              </Card>
            </div>

            {/* Real-Time Intelligence Feed */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Live Intelligence Feed
                  </CardTitle>
                  <CardDescription>Real-time threat intelligence from dark web sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {threatIntel.slice(0, 4).map((intel) => (
                    <div key={intel.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{intel.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {intel.source} • {intel.confidence}% confidence • {intel.tags.join(", ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getSeverityColor(intel.severity)}>
                          {intel.severity.toUpperCase()}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(intel.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    View All Intelligence
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Active Threat Groups
                  </CardTitle>
                  <CardDescription>Cybercriminal organizations under surveillance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cyberGroups.slice(0, 3).map((group) => (
                    <div key={group.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{group.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {group.aliases.slice(0, 2).join(", ")} • {group.activeMembers} members
                          </p>
                        </div>
                        <Badge variant={getSeverityColor(group.threatLevel)}>
                          {group.threatLevel.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Target Sectors: {group.targetSectors.slice(0, 2).join(", ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last Activity: {new Date(group.lastActivity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    View All Groups
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Dark Web Coverage Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Dark Web Coverage & Performance
                </CardTitle>
                <CardDescription>Monitoring coverage across different underground networks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Forums Coverage</span>
                      <span className="text-chart-1">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Marketplaces</span>
                      <span className="text-chart-2">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Leak Sites</span>
                      <span className="text-chart-4">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Chat Networks</span>
                      <span className="text-destructive">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                </div>

                <Alert className="border-chart-2 bg-chart-2/10">
                  <Globe className="h-4 w-4" />
                  <AlertTitle>Dark Web Monitoring Status</AlertTitle>
                  <AlertDescription>
                    12 active crawlers monitoring 847 onion domains across 45 different networks.
                    Average collection rate: 15,847 intelligence points per day.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Dark Web Source Management
                </CardTitle>
                <CardDescription>Monitored underground sources and their status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Input placeholder="Search sources..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="forum">Forums</SelectItem>
                      <SelectItem value="marketplace">Marketplaces</SelectItem>
                      <SelectItem value="leak_site">Leak Sites</SelectItem>
                      <SelectItem value="chat">Chat Networks</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Add Source
                  </Button>
                </div>

                {darkWebSources.map((source) => (
                  <div key={source.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="space-y-1">
                          <p className="font-medium">{source.name}</p>
                          <p className="text-sm text-muted-foreground font-mono">{source.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {source.type.replace("_", " ")}
                        </Badge>
                        <Badge variant={getStatusColor(source.status)}>
                          {source.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4 text-sm">
                      <div>
                        <p className="font-medium">Threats Found</p>
                        <p className="text-destructive font-mono">{source.threats}</p>
                      </div>
                      <div>
                        <p className="font-medium">Risk Score</p>
                        <p className="text-destructive font-mono">{source.riskScore}/100</p>
                      </div>
                      <div>
                        <p className="font-medium">Last Crawl</p>
                        <p className="text-muted-foreground">
                          {new Date(source.lastCrawl).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Status</p>
                        <p className="text-muted-foreground capitalize">{source.status}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Export Data
                      </Button>
                      <Button size="sm" variant="outline">
                        <Activity className="h-3 w-3 mr-1" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Threat Intelligence Database
                </CardTitle>
                <CardDescription>Collected and analyzed threat intelligence from dark web sources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {threatIntel.map((intel) => (
                  <div key={intel.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{intel.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {intel.source} • {new Date(intel.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(intel.severity)}>
                          {intel.severity.toUpperCase()}
                        </Badge>
                        <span className="text-sm">{intel.confidence}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">Type:</p>
                        <Badge variant="outline" className="text-xs capitalize">
                          {intel.type.replace("_", " ")}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Indicators of Compromise:</p>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {intel.iocs.map((ioc, index) => (
                            <Badge key={index} variant="secondary" className="text-xs font-mono">
                              {ioc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Tags:</p>
                        <div className="flex gap-1 mt-1">
                          {intel.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Export IOCs
                      </Button>
                      <Button size="sm" variant="outline">
                        <Shield className="h-3 w-3 mr-1" />
                        Block Indicators
                      </Button>
                      <Button size="sm" variant="outline">
                        <Search className="h-3 w-3 mr-1" />
                        Hunt Similar
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Threat Group Profiles
                </CardTitle>
                <CardDescription>Detailed profiles of cybercriminal organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cyberGroups.map((group) => (
                  <div key={group.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-lg">{group.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Aliases: {group.aliases.join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {group.type}
                        </Badge>
                        <Badge variant={getSeverityColor(group.threatLevel)}>
                          {group.threatLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Active Members:</p>
                        <p className="text-lg font-mono">{group.activeMembers}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Last Activity:</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(group.lastActivity).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mt-3">
                      <p className="text-sm font-medium">Known Malware:</p>
                      <div className="flex gap-1 flex-wrap">
                        {group.knownMalware.map((malware) => (
                          <Badge key={malware} variant="destructive" className="text-xs">
                            {malware}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mt-3">
                      <p className="text-sm font-medium">Target Sectors:</p>
                      <div className="flex gap-1 flex-wrap">
                        {group.targetSectors.map((sector) => (
                          <Badge key={sector} variant="secondary" className="text-xs">
                            {sector}
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
                        Track Activity
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

          <TabsContent value="marketplace" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Underground Marketplace Monitoring
                </CardTitle>
                <CardDescription>Active listings and transactions in criminal marketplaces</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketplaceListings.map((listing) => (
                  <div key={listing.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(listing.category)}
                        <div>
                          <p className="font-medium">{listing.title}</p>
                          <p className="text-sm text-muted-foreground">
                            By {listing.seller} • Rating: {listing.sellerRating}/5
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-lg">{listing.price}</p>
                        <p className="text-xs text-muted-foreground">
                          Relevance: {listing.relevanceScore}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {listing.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Posted: {new Date(listing.postedDate).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Alert
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Monitoring Configuration
                  </CardTitle>
                  <CardDescription>Configure automated monitoring rules and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Keywords to Monitor</label>
                    <Input placeholder="company, data breach, ransomware..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alert Threshold</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Mentions</SelectItem>
                        <SelectItem value="medium">Medium & Above</SelectItem>
                        <SelectItem value="high">High & Critical</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Update Monitoring Rules
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Collection Statistics
                  </CardTitle>
                  <CardDescription>Dark web intelligence collection metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Collections</span>
                      <span className="font-mono">15,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Crawlers</span>
                      <span className="font-mono">12/15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-mono text-chart-4">94.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Response Time</span>
                      <span className="font-mono">2.3s</span>
                    </div>
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
