"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { threatIntelOperations, showOperationResult } from "@/lib/cybersecurity-operations"
import { toast } from "@/hooks/use-toast"
import { 
  Brain, Search, Eye, Globe, Target, Database, Activity, AlertTriangle,
  Users, FileText, Code, Zap, Network, Bug, Shield, Loader2
} from "lucide-react"

interface ThreatIntelligence {
  id: string
  ioc_type: "ip" | "domain" | "hash" | "email" | "url"
  value: string
  threat_type: "malware" | "phishing" | "c2" | "botnet" | "apt" | "ransomware"
  confidence: number
  severity: "low" | "medium" | "high" | "critical"
  first_seen: string
  last_seen: string
  sources: string[]
  related_campaigns: string[]
  description: string
  tags: string[]
}

interface OSINTTarget {
  id: string
  name: string
  email: string
  phone?: string
  social_profiles: {platform: string, username: string, url: string, followers?: number}[]
  employment: {company: string, position: string, duration: string}[]
  location: string
  interests: string[]
  data_breaches: string[]
  risk_score: number
  last_updated: string
}

interface ThreatActor {
  id: string
  name: string
  aliases: string[]
  country: string
  motivation: "financial" | "espionage" | "hacktivist" | "nation-state"
  sophistication: "low" | "medium" | "high" | "advanced"
  targets: string[]
  ttps: string[]
  malware_families: string[]
  active_campaigns: string[]
  attribution_confidence: number
  first_observed: string
}

interface DarkWebIntel {
  id: string
  source: "market" | "forum" | "chat" | "leak_site"
  title: string
  category: "credentials" | "malware" | "services" | "data_leak" | "discussion"
  price?: string
  vendor: string
  description: string
  credibility: number
  post_date: string
  url: string
  risk_level: "low" | "medium" | "high" | "critical"
}

export default function ThreatIntelPage() {
  const [threatIntel] = useState<ThreatIntelligence[]>([
    {
      id: "ioc-001",
      ioc_type: "ip",
      value: "185.220.102.8",
      threat_type: "c2",
      confidence: 95,
      severity: "critical",
      first_seen: "2024-08-15",
      last_seen: "2024-09-07",
      sources: ["VirusTotal", "AbuseIPDB", "OTX AlienVault", "Shodan"],
      related_campaigns: ["APT29 Cozy Bear", "Midnight Blizzard"],
      description: "Command and control server for Cobalt Strike beacons. Associated with APT29 operations targeting government entities.",
      tags: ["APT29", "Cobalt Strike", "C2", "Government", "Espionage"]
    },
    {
      id: "ioc-002",
      ioc_type: "domain",
      value: "secure-update-microsoft.com",
      threat_type: "phishing",
      confidence: 98,
      severity: "high",
      first_seen: "2024-09-01",
      last_seen: "2024-09-07",
      sources: ["URLVoid", "PhishTank", "OpenPhish", "Cisco Talos"],
      related_campaigns: ["Business Email Compromise", "Credential Harvesting"],
      description: "Malicious domain impersonating Microsoft to steal Office 365 credentials. Active phishing campaign with high success rate.",
      tags: ["Phishing", "Microsoft", "Credentials", "BEC", "Social Engineering"]
    },
    {
      id: "ioc-003",
      ioc_type: "hash",
      value: "d41d8cd98f00b204e9800998ecf8427e",
      threat_type: "ransomware",
      confidence: 92,
      severity: "critical",
      first_seen: "2024-08-20",
      last_seen: "2024-09-05",
      sources: ["Hybrid Analysis", "VirusTotal", "MalwareBazaar", "ANY.RUN"],
      related_campaigns: ["LockBit 3.0", "Black Basta"],
      description: "LockBit 3.0 ransomware payload. Targets Windows systems with double extortion tactics. Encrypts files and steals sensitive data.",
      tags: ["Ransomware", "LockBit", "Double Extortion", "Windows", "Encryption"]
    }
  ])

  const [osintTargets] = useState<OSINTTarget[]>([
    {
      id: "target-001",
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      phone: "+917903835951",
      social_profiles: [
        {platform: "LinkedIn", username: "sarah-johnson-cto", url: "linkedin.com/in/sarah-johnson-cto", followers: 2847},
        {platform: "Twitter", username: "@sarahj_tech", url: "twitter.com/sarahj_tech", followers: 1234},
        {platform: "GitHub", username: "sarahtech", url: "github.com/sarahtech"}
      ],
      employment: [
        {company: "TechCorp Inc.", position: "Chief Technology Officer", duration: "2022-Present"},
        {company: "DataSys Solutions", position: "Senior Software Engineer", duration: "2019-2022"}
      ],
      location: "IIT Patna, Bihta, Patna, Bihar 801106, India",
      interests: ["Cloud Computing", "AI/ML", "Cybersecurity", "Open Source"],
      data_breaches: ["LinkedIn 2021", "Adobe 2013", "Dropbox 2012"],
      risk_score: 87,
      last_updated: "2024-09-07 10:30:00"
    },
    {
      id: "target-002",
      name: "Michael Chen",
      email: "m.chen@financebank.com",
      social_profiles: [
        {platform: "LinkedIn", username: "michael-chen-ciso", url: "linkedin.com/in/michael-chen-ciso", followers: 3456},
        {platform: "Facebook", username: "mike.chen.security", url: "facebook.com/mike.chen.security"}
      ],
      employment: [
        {company: "Finance Bank Corp", position: "Chief Information Security Officer", duration: "2020-Present"},
        {company: "SecureIT Consulting", position: "Security Architect", duration: "2017-2020"}
      ],
      location: "IIT Patna, Bihta, Patna, Bihar 801106, India",
      interests: ["Cybersecurity", "Risk Management", "Compliance", "Digital Forensics"],
      data_breaches: ["Equifax 2017", "Yahoo 2016"],
      risk_score: 92,
      last_updated: "2024-09-07 09:45:00"
    }
  ])

  const [threatActors] = useState<ThreatActor[]>([
    {
      id: "apt-001",
      name: "APT29 (Cozy Bear)",
      aliases: ["The Dukes", "Midnight Blizzard", "NOBELIUM"],
      country: "Russia",
      motivation: "espionage",
      sophistication: "advanced",
      targets: ["Government", "Defense", "Healthcare", "Technology"],
      ttps: [
        "Spear-phishing emails",
        "Supply chain attacks", 
        "Living off the land techniques",
        "Cloud infrastructure abuse",
        "OAuth app abuse"
      ],
      malware_families: ["SUNBURST", "TEARDROP", "GoldMax", "Sibot", "FoggyWeb"],
      active_campaigns: ["SolarWinds Supply Chain", "Microsoft Exchange Compromise", "Cloud Tenant Takeover"],
      attribution_confidence: 95,
      first_observed: "2008"
    },
    {
      id: "apt-002", 
      name: "APT28 (Fancy Bear)",
      aliases: ["Sofacy", "Pawn Storm", "STRONTIUM", "Sednit"],
      country: "Russia", 
      motivation: "espionage",
      sophistication: "advanced",
      targets: ["Government", "Military", "Defense Contractors", "Media"],
      ttps: [
        "Zero-day exploits",
        "Credential harvesting",
        "Strategic web compromises",
        "Mobile device targeting",
        "IoT device compromise"
      ],
      malware_families: ["X-Agent", "Downdelph", "CHOPSTICK", "Zebrocy", "JHUHUGIT"],
      active_campaigns: ["DNC Hack 2016", "Olympic Destroyer", "VPNFilter Botnet"],
      attribution_confidence: 92,
      first_observed: "2007"
    },
    {
      id: "crime-001",
      name: "FIN7",
      aliases: ["Carbanak Group", "Navigator Group"],
      country: "Eastern Europe",
      motivation: "financial", 
      sophistication: "high",
      targets: ["Retail", "Hospitality", "Financial Services", "Healthcare"],
      ttps: [
        "Business Email Compromise",
        "Point-of-sale malware",
        "Fileless attacks",
        "PowerShell abuse", 
        "Social engineering"
      ],
      malware_families: ["Carbanak", "BABYMETAL", "BOOSTWRITE", "GRIFFON", "HALFBAKED"],
      active_campaigns: ["POS Intrusions", "BEC Schemes", "Ransomware Operations"],
      attribution_confidence: 88,
      first_observed: "2013"
    }
  ])

  const [darkWebIntel] = useState<DarkWebIntel[]>([
    {
      id: "dw-001",
      source: "market",
      title: "Corporate Database - Fortune 500 Company",
      category: "data_leak",
      price: "$50,000 BTC",
      vendor: "DataBroker_87",
      description: "Complete customer database from major tech company. 2.4M records including PII, payment data, internal documents. Fresh breach from Q3 2024.",
      credibility: 87,
      post_date: "2024-09-05",
      url: "market7x8k9l.onion/listing/12847",
      risk_level: "critical"
    },
    {
      id: "dw-002",
      source: "forum",
      title: "New 0-day Exploit - Windows 11",
      category: "malware",
      price: "$75,000",
      vendor: "ExploitMaster",
      description: "Unpatched privilege escalation vulnerability in Windows 11 22H2/23H2. Reliable LPE with SYSTEM privileges. Private exploit, no AV detection.",
      credibility: 92,
      post_date: "2024-09-03",
      url: "blackhat_forum.onion/thread/98234",
      risk_level: "critical"
    },
    {
      id: "dw-003", 
      source: "leak_site",
      title: "Government Contractor Files Leaked",
      category: "data_leak",
      vendor: "RansomGroup_X",
      description: "Classified documents and employee data from defense contractor. 500GB of sensitive government project files, security clearance info, and contracts.",
      credibility: 95,
      post_date: "2024-09-01",
      url: "ransom_leaks.onion/victim/defense_corp",
      risk_level: "critical"
    }
  ])

  // Loading states for operations
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({})
  const [searchQuery, setSearchQuery] = useState("")
  
  // Handler functions for button operations
  const handleBlockIOC = async (ioc: string, iocType: string) => {
    const loadingKey = `block-${ioc}`
    setLoadingStates(prev => ({...prev, [loadingKey]: true}))
    
    try {
      const result = await threatIntelOperations.blockIOC(ioc, iocType)
      showOperationResult(result)
      
      if (result.success) {
        toast({
          title: "IOC Blocked Successfully",
          description: `${ioc} has been blocked across ${result.data?.affectedDevices} security devices`,
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: "Operation Failed",
        description: "Failed to block IOC. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingStates(prev => ({...prev, [loadingKey]: false}))
    }
  }

  const handleInvestigateIOC = async (ioc: string) => {
    const loadingKey = `investigate-${ioc}`
    setLoadingStates(prev => ({...prev, [loadingKey]: true}))
    
    try {
      const result = await threatIntelOperations.investigateIOC(ioc)
      showOperationResult(result)
      
      if (result.success) {
        toast({
          title: "Investigation Complete",
          description: `Threat Level: ${result.data?.threatLevel}, Confidence: ${result.data?.confidence}%`,
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: "Investigation Failed", 
        description: "Unable to complete investigation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingStates(prev => ({...prev, [loadingKey]: false}))
    }
  }

  const handleOSINTSearch = async (target: string) => {
    const loadingKey = `osint-${target}`
    setLoadingStates(prev => ({...prev, [loadingKey]: true}))
    
    try {
      const result = await threatIntelOperations.osintSearch(target)
      showOperationResult(result)
      
      if (result.success) {
        toast({
          title: "OSINT Search Complete",
          description: `Found ${result.data?.socialProfiles} social profiles, Risk Score: ${result.data?.riskScore}%`,
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: "OSINT Search Failed",
        description: "Unable to complete OSINT search. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingStates(prev => ({...prev, [loadingKey]: false}))
    }
  }

  const handleThreatSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search query (IP, domain, hash, etc.)",
        variant: "destructive",
      })
      return
    }
    
    const loadingKey = "search-all"
    setLoadingStates(prev => ({...prev, [loadingKey]: true}))
    
    try {
      // Simulate comprehensive threat intelligence search
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      toast({
        title: "Search Complete",
        description: `Found 23 IOC matches, 5 threat actor references, and 12 campaign links for "${searchQuery}"`,
        duration: 5000,
      })
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to complete search. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingStates(prev => ({...prev, [loadingKey]: false}))
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-900 text-red-100"
      case "high": return "bg-orange-900 text-orange-100"
      case "medium": return "bg-yellow-900 text-yellow-100"
      case "low": return "bg-green-900 text-green-100"
      default: return "bg-gray-900 text-gray-100"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ip": return "bg-blue-900 text-blue-100"
      case "domain": return "bg-purple-900 text-purple-100"
      case "hash": return "bg-green-900 text-green-100"
      case "email": return "bg-orange-900 text-orange-100"
      case "url": return "bg-red-900 text-red-100"
      default: return "bg-gray-900 text-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-black text-purple-500">
      {/* Header */}
      <header className="border-b border-purple-900 bg-gray-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-purple-500" />
            <div>
              <h1 className="text-xl font-bold text-purple-400">THREAT INTELLIGENCE CENTER</h1>
              <p className="text-sm text-purple-600">Advanced OSINT & Dark Web Monitoring Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="destructive" className="text-sm bg-red-900">
              <AlertTriangle className="h-3 w-3 mr-1" />
              147 Critical IOCs
            </Badge>
            <Badge variant="destructive" className="text-sm bg-purple-900">
              <Activity className="h-3 w-3 mr-1" />
              Live Monitoring
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Critical Threat Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-red-500 bg-red-950/50 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>APT29 C2 Infrastructure Active</AlertTitle>
            <AlertDescription>
              New Cozy Bear C2 server (185.220.102.8) detected targeting government entities.
              Cobalt Strike beacons communicating every 60 seconds. Block immediately.
            </AlertDescription>
          </Alert>

          <Alert className="border-orange-500 bg-orange-950/50 text-orange-400">
            <Database className="h-4 w-4" />
            <AlertTitle>Corporate Data Breach on Dark Web</AlertTitle>
            <AlertDescription>
              Fortune 500 company database (2.4M records) being sold for $50,000 BTC.
              Contains customer PII, payment data, internal documents. Breach confirmed Q3 2024.
            </AlertDescription>
          </Alert>
        </div>

        {/* Threat Intelligence Dashboard */}
        <Tabs defaultValue="iocs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900">
            <TabsTrigger value="iocs" className="data-[state=active]:bg-purple-900">IOCs</TabsTrigger>
            <TabsTrigger value="osint" className="data-[state=active]:bg-purple-900">OSINT</TabsTrigger>
            <TabsTrigger value="actors" className="data-[state=active]:bg-purple-900">Threat Actors</TabsTrigger>
            <TabsTrigger value="darkweb" className="data-[state=active]:bg-purple-900">Dark Web</TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-purple-900">Intel Search</TabsTrigger>
          </TabsList>

          <TabsContent value="iocs" className="space-y-6">
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Target className="h-5 w-5" />
                  Indicators of Compromise (IOCs)
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Real-time threat intelligence feeds and malicious indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {threatIntel.map((ioc) => (
                  <div key={ioc.id} className="rounded-lg border border-purple-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getTypeColor(ioc.ioc_type)}>
                            {ioc.ioc_type.toUpperCase()}
                          </Badge>
                          <code className="text-purple-400 font-mono text-sm">{ioc.value}</code>
                        </div>
                        <p className="text-sm text-purple-600 capitalize">
                          {ioc.threat_type.replace('_', ' ')} Threat
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getSeverityColor(ioc.severity)}>
                          {ioc.severity.toUpperCase()}
                        </Badge>
                        <p className="text-sm font-bold text-purple-400 mt-1">
                          {ioc.confidence}% Confidence
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 text-sm mb-3">
                      <div>
                        <p className="text-purple-600">First Seen</p>
                        <p className="text-purple-400">{ioc.first_seen}</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Last Seen</p>
                        <p className="text-purple-400">{ioc.last_seen}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Description:</p>
                      <p className="text-sm text-purple-400">{ioc.description}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Intelligence Sources:</p>
                      <div className="flex gap-1 flex-wrap">
                        {ioc.sources.map((source) => (
                          <Badge key={source} variant="secondary" className="text-xs bg-gray-700">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Related Campaigns:</p>
                      <div className="flex gap-1 flex-wrap">
                        {ioc.related_campaigns.map((campaign) => (
                          <Badge key={campaign} variant="destructive" className="text-xs bg-red-900">
                            {campaign}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Tags:</p>
                      <div className="flex gap-1 flex-wrap">
                        {ioc.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-purple-900 text-purple-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-red-900 hover:bg-red-800"
                        onClick={() => handleBlockIOC(ioc.value, ioc.ioc_type)}
                        disabled={loadingStates[`block-${ioc.value}`]}
                      >
                        {loadingStates[`block-${ioc.value}`] ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Shield className="h-3 w-3 mr-1" />
                        )}
                        {loadingStates[`block-${ioc.value}`] ? "Blocking..." : "Block IOC"}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-900 text-purple-400"
                        onClick={() => handleInvestigateIOC(ioc.value)}
                        disabled={loadingStates[`investigate-${ioc.value}`]}
                      >
                        {loadingStates[`investigate-${ioc.value}`] ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Search className="h-3 w-3 mr-1" />
                        )}
                        {loadingStates[`investigate-${ioc.value}`] ? "Investigating..." : "Investigate"}
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <FileText className="h-3 w-3 mr-1" />
                        Generate Intel
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="osint" className="space-y-6">
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Users className="h-5 w-5" />
                  OSINT Target Profiles
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Open source intelligence gathering on high-value targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {osintTargets.map((target) => (
                  <div key={target.id} className="rounded-lg border border-purple-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-purple-400">{target.name}</p>
                        <p className="text-sm text-purple-600">{target.email}</p>
                        <p className="text-sm text-purple-600">{target.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-red-400">Risk Score: {target.risk_score}%</p>
                        <p className="text-xs text-purple-600">Updated: {target.last_updated}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 text-sm mb-3">
                      <div>
                        <p className="text-purple-600">Current Position</p>
                        <p className="text-purple-400">
                          {target.employment[0]?.position} at {target.employment[0]?.company}
                        </p>
                      </div>
                      <div>
                        <p className="text-purple-600">Phone</p>
                        <p className="text-purple-400 font-mono">{target.phone || "Not found"}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Social Media Profiles:</p>
                      <div className="space-y-1">
                        {target.social_profiles.map((profile) => (
                          <div key={profile.platform} className="flex items-center justify-between p-2 bg-gray-900 rounded">
                            <div>
                              <span className="text-sm text-purple-400">{profile.platform}: </span>
                              <span className="text-sm text-purple-300">@{profile.username}</span>
                            </div>
                            {profile.followers && (
                              <Badge variant="secondary" className="text-xs">
                                {profile.followers} followers
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Data Breaches:</p>
                      <div className="flex gap-1 flex-wrap">
                        {target.data_breaches.map((breach) => (
                          <Badge key={breach} variant="destructive" className="text-xs bg-red-900">
                            {breach}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Interests:</p>
                      <div className="flex gap-1 flex-wrap">
                        {target.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="text-xs border-purple-900 text-purple-400">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-orange-900 hover:bg-orange-800">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor Target
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-900 text-purple-400"
                        onClick={() => handleOSINTSearch(target.name)}
                        disabled={loadingStates[`osint-${target.name}`]}
                      >
                        {loadingStates[`osint-${target.name}`] ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Search className="h-3 w-3 mr-1" />
                        )}
                        {loadingStates[`osint-${target.name}`] ? "Searching..." : "Deep Search"}
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Users className="h-3 w-3 mr-1" />
                        Social Graph
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actors" className="space-y-6">
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Bug className="h-5 w-5" />
                  Advanced Persistent Threat Actors
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Known threat actor groups and their tactics, techniques, and procedures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {threatActors.map((actor) => (
                  <div key={actor.id} className="rounded-lg border border-purple-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-purple-400">{actor.name}</p>
                        <p className="text-sm text-purple-600">
                          {actor.country} • {actor.motivation} • First observed: {actor.first_observed}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className="mb-1 capitalize" variant={actor.sophistication === 'advanced' ? 'destructive' : 'secondary'}>
                          {actor.sophistication}
                        </Badge>
                        <p className="text-sm font-bold text-purple-400">
                          {actor.attribution_confidence}% Attribution
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Aliases:</p>
                      <div className="flex gap-1 flex-wrap">
                        {actor.aliases.map((alias) => (
                          <Badge key={alias} variant="secondary" className="text-xs bg-gray-700">
                            {alias}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Primary Targets:</p>
                      <div className="flex gap-1 flex-wrap">
                        {actor.targets.map((target) => (
                          <Badge key={target} variant="outline" className="text-xs border-purple-900 text-purple-400">
                            {target}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">TTPs (Top 5):</p>
                      <ul className="text-sm text-purple-400 space-y-1">
                        {actor.ttps.slice(0, 5).map((ttp) => (
                          <li key={ttp} className="flex items-center gap-2">
                            <Zap className="h-3 w-3 text-purple-500" />
                            {ttp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Malware Families:</p>
                      <div className="flex gap-1 flex-wrap">
                        {actor.malware_families.map((malware) => (
                          <Badge key={malware} variant="destructive" className="text-xs bg-red-900">
                            {malware}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Active Campaigns:</p>
                      <div className="flex gap-1 flex-wrap">
                        {actor.active_campaigns.map((campaign) => (
                          <Badge key={campaign} variant="destructive" className="text-xs bg-orange-900">
                            {campaign}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-red-900 hover:bg-red-800">
                        <Target className="h-3 w-3 mr-1" />
                        Track Actor
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <FileText className="h-3 w-3 mr-1" />
                        Intel Report
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Network className="h-3 w-3 mr-1" />
                        Attribution Graph
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="darkweb" className="space-y-6">
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Globe className="h-5 w-5" />
                  Dark Web Intelligence
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Monitoring underground markets, forums, and leak sites for threats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {darkWebIntel.map((intel) => (
                  <div key={intel.id} className="rounded-lg border border-purple-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-purple-400">{intel.title}</p>
                        <p className="text-sm text-purple-600 capitalize">
                          {intel.source.replace('_', ' ')} • {intel.category.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-purple-600">Vendor: {intel.vendor}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getSeverityColor(intel.risk_level)}>
                          {intel.risk_level.toUpperCase()}
                        </Badge>
                        {intel.price && (
                          <p className="text-sm font-bold text-green-400 mt-1">{intel.price}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 text-sm mb-3">
                      <div>
                        <p className="text-purple-600">Posted</p>
                        <p className="text-purple-400">{intel.post_date}</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Credibility</p>
                        <div className="flex items-center gap-2">
                          <Progress value={intel.credibility} className="flex-1 h-2" />
                          <span className="text-purple-400">{intel.credibility}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-purple-600 mb-1">Description:</p>
                      <p className="text-sm text-purple-400">{intel.description}</p>
                    </div>

                    <div className="mb-3 p-2 bg-black border border-purple-900 rounded">
                      <p className="text-xs text-purple-600 mb-1">Dark Web URL:</p>
                      <code className="text-xs text-purple-400 font-mono break-all">{intel.url}</code>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-red-900 hover:bg-red-800">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Create Alert
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Globe className="h-3 w-3 mr-1" />
                        Visit Source
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Database className="h-3 w-3 mr-1" />
                        Archive Intel
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Search className="h-5 w-5" />
                  Threat Intelligence Search
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Search across IOCs, dark web, OSINT databases, and threat actor intelligence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="search-input" className="text-sm text-purple-400 mb-2 block">Search Query</label>
                    <Input 
                      id="search-input"
                      placeholder="IP address, domain, hash, email, or threat actor name..."
                      className="bg-gray-800 border-purple-900 text-purple-400 font-mono"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleThreatSearch()}
                    />
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      className="bg-purple-900 hover:bg-purple-800"
                      onClick={handleThreatSearch}
                      disabled={loadingStates['search-all']}
                    >
                      {loadingStates['search-all'] ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : (
                        <Search className="h-3 w-3 mr-1" />
                      )}
                      {loadingStates['search-all'] ? "Searching..." : "Search All Sources"}
                    </Button>
                    <Button variant="outline" className="border-purple-900 text-purple-400">
                      <Target className="h-3 w-3 mr-1" />
                      IOC Lookup
                    </Button>
                    <Button variant="outline" className="border-purple-900 text-purple-400">
                      <Globe className="h-3 w-3 mr-1" />
                      Dark Web Search
                    </Button>
                    <Button variant="outline" className="border-purple-900 text-purple-400">
                      <Users className="h-3 w-3 mr-1" />
                      OSINT Lookup
                    </Button>
                  </div>
                </div>

                <Alert className="border-purple-500 bg-purple-950/50">
                  <Code className="h-4 w-4" />
                  <AlertTitle>Advanced Search Operators</AlertTitle>
                  <AlertDescription className="text-sm">
                    Use operators like "type:ip", "severity:critical", "country:russia", "malware:cobalt_strike"
                    to filter results across threat intelligence databases.
                  </AlertDescription>
                </Alert>

                {/* Sample Search Results */}
                <div className="mt-4 p-4 bg-black border border-purple-900 rounded">
                  <p className="text-purple-400 mb-2 text-sm">Sample search results for "APT29":</p>
                  <div className="text-green-500 font-mono text-xs space-y-1">
                    <div className="text-purple-400">[IOC] 185.220.102.8 - APT29 C2 Server (95% confidence)</div>
                    <div className="text-purple-400">[ACTOR] APT29 (Cozy Bear) - Nation-state threat actor</div>
                    <div className="text-purple-400">[MALWARE] SUNBURST - Associated with APT29 campaigns</div>
                    <div className="text-purple-400">[CAMPAIGN] SolarWinds Supply Chain - Active APT29 operation</div>
                    <div className="text-purple-400">[OSINT] 23 LinkedIn profiles of potential targets</div>
                    <div className="text-purple-400">[DARKWEB] 0 direct mentions in monitored forums</div>
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
