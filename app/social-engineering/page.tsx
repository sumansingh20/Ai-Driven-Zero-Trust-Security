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
import { useToast } from "@/src/hooks/use-toast"
import { 
  Users, Mail, Phone, Globe, Eye, Brain, Target, Activity, TrendingUp, Clock, AlertTriangle,
  Play, Pause, Square, Settings, FileText, Database, Network, Lock, Search, Zap,
  MessageCircle, Camera, Mic, Wifi, Smartphone, Laptop, Shield, Crosshair, Skull, Loader2
} from "lucide-react"

interface PhishingCampaign {
  id: string
  name: string
  type: "email" | "sms" | "voice" | "usb_drop" | "physical" | "social_media"
  template: string
  targets: number
  sent: number
  opened: number
  clicked: number
  compromised: number
  status: "planning" | "active" | "completed" | "paused"
  successRate: number
  startDate: string
  duration: string
}

interface SocialTarget {
  id: string
  name: string
  email: string
  phone: string
  company: string
  position: string
  linkedIn: string
  facebook: string
  twitter: string
  interests: string[]
  weaknesses: string[]
  riskScore: number
  lastContact: string
  status: "researched" | "contacted" | "engaged" | "compromised"
}

interface PreTextTemplate {
  id: string
  name: string
  scenario: string
  platform: "email" | "phone" | "sms" | "in_person"
  effectiveness: number
  difficulty: "low" | "medium" | "high" | "expert"
  psychologyPrinciple: string[]
  targetType: string
  script: string
}

interface OSINTProfile {
  id: string
  target: string
  platform: string
  username: string
  followers: number
  posts: number
  personalInfo: string[]
  connections: string[]
  interests: string[]
  schedule: string[]
  vulnerabilities: string[]
  lastUpdated: string
}

export default function SocialEngineeringPage() {
  const [campaigns] = useState<PhishingCampaign[]>([
    {
      id: "camp-001",
      name: "Executive Credential Harvest",
      type: "email",
      template: "Office 365 Security Alert",
      targets: 247,
      sent: 247,
      opened: 189,
      clicked: 67,
      compromised: 23,
      status: "active",
      successRate: 27.1,
      startDate: "2025-09-01",
      duration: "5 days"
    },
    {
      id: "camp-002",
      name: "COVID-19 Relief Scam",
      type: "sms",
      template: "Government Relief Fund",
      targets: 1500,
      sent: 1500,
      opened: 1287,
      clicked: 445,
      compromised: 178,
      status: "completed",
      successRate: 40.0,
      startDate: "2025-08-15",
      duration: "10 days"
    },
    {
      id: "camp-003",
      name: "Tech Support Vishing",
      type: "voice",
      template: "Microsoft Security Alert",
      targets: 89,
      sent: 89,
      opened: 76,
      clicked: 34,
      compromised: 12,
      status: "active",
      successRate: 35.3,
      startDate: "2025-09-03",
      duration: "3 days"
    }
  ])

  const [targets] = useState<SocialTarget[]>([
    {
      id: "tgt-001",
      name: "Sarah Mitchell",
      email: "sarah.mitchell@techcorp.com",
      phone: "+917903835951",
      company: "TechCorp Industries",
      position: "Chief Financial Officer",
      linkedIn: "sarah-mitchell-cfo",
      facebook: "sarah.mitchell.89",
      twitter: "@sarahm_cfo",
      interests: ["Golf", "Wine tasting", "Travel", "Charity work"],
      weaknesses: ["Authority pressure", "Urgency tactics", "Charity appeals"],
      riskScore: 87,
      lastContact: "2025-09-05",
      status: "engaged"
    },
    {
      id: "tgt-002",
      name: "David Chen",
      email: "d.chen@securebank.com",
      phone: "+917903835951", 
      company: "SecureBank Corp",
      position: "IT Administrator",
      linkedIn: "david-chen-it",
      facebook: "",
      twitter: "@dchen_tech",
      interests: ["Gaming", "Cryptocurrency", "Tech forums"],
      weaknesses: ["Tech curiosity", "FOMO", "Peer pressure"],
      riskScore: 92,
      lastContact: "2025-09-04",
      status: "compromised"
    }
  ])

  const [pretexts] = useState<PreTextTemplate[]>([
    {
      id: "pt-001",
      name: "IT Security Urgent Update",
      scenario: "Immediate security patch required",
      platform: "email",
      effectiveness: 94,
      difficulty: "low",
      psychologyPrinciple: ["Authority", "Urgency", "Fear"],
      targetType: "All employees",
      script: `Subject: URGENT: Critical Security Update Required - Action Needed Within 4 Hours

Dear [TARGET_NAME],

Our security systems have detected suspicious activity on your account. To protect your data and maintain system integrity, you must complete an immediate security verification.

WARNING: Failure to complete this verification within 4 hours may result in:
- Account suspension
- Loss of access to critical systems  
- Potential data breach exposure

Click here to verify your account immediately: [MALICIOUS_LINK]

This is an automated security message from IT Security Team.
Time remaining: 3:47:23

Best regards,
IT Security Department
[COMPANY_NAME]`
    },
    {
      id: "pt-002",
      name: "CEO Emergency Request",
      scenario: "Urgent financial transaction needed",
      platform: "email", 
      effectiveness: 87,
      difficulty: "medium",
      psychologyPrinciple: ["Authority", "Urgency", "Secrecy"],
      targetType: "Finance/Accounting staff",
      script: `Subject: CONFIDENTIAL: Emergency Wire Transfer - CEO Direct Request

[TARGET_NAME],

I need your immediate assistance with a confidential matter. Due to an urgent acquisition opportunity, I need you to process an emergency wire transfer before close of business today.

Details:
- Amount: $485,000 USD
- Recipient: [ATTACKER_ACCOUNT]
- Reason: Strategic acquisition deposit
- Deadline: Today 5:00 PM

This must remain strictly confidential until the deal is finalized. Please confirm receipt and processing status.

I'm currently in meetings with investors and cannot be reached by phone.

Regards,
[CEO_NAME]
Chief Executive Officer`
    }
  ])

  const [osintProfiles] = useState<OSINTProfile[]>([
    {
      id: "osint-001",
      target: "Sarah Mitchell",
      platform: "LinkedIn",
      username: "sarah-mitchell-cfo",
      followers: 2847,
      posts: 156,
      personalInfo: [
        "Graduated from Harvard Business School 2008",
        "Lives in Manhattan, NY", 
        "Married with 2 children",
        "Active in local charity organizations"
      ],
      connections: [
        "Other C-level executives",
        "Harvard alumni network",
        "Charity board members",
        "Golf club associates"
      ],
      interests: [
        "Financial markets",
        "Sustainable investing", 
        "Women in leadership",
        "Golf tournaments"
      ],
      schedule: [
        "Board meetings every Tuesday 10 AM",
        "Golf lessons Thursday evenings",
        "Charity galas monthly",
        "Harvard alumni events quarterly"
      ],
      vulnerabilities: [
        "Posts personal achievements publicly",
        "Shares company milestone information",
        "Responds to charity-related outreach",
        "Active on professional networks"
      ],
      lastUpdated: "2025-09-06"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "secondary"
      case "completed": return "default"
      case "compromised": return "destructive"
      case "engaged": return "secondary" 
      case "researched": return "outline"
      default: return "outline"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />
      case "sms": return <MessageCircle className="h-4 w-4" />
      case "voice": return <Phone className="h-4 w-4" />
      case "physical": return <Users className="h-4 w-4" />
      case "social_media": return <Globe className="h-4 w-4" />
      case "usb_drop": return <Database className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-500"
    if (score >= 60) return "text-orange-500"
    if (score >= 40) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="min-h-screen bg-black text-orange-500">
      {/* Header */}
      <header className="border-b border-orange-900 bg-gray-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-orange-500" />
            <div>
              <h1 className="text-xl font-bold text-orange-400">SOCIAL ENGINEERING HUB</h1>
              <p className="text-sm text-orange-600">Advanced Human Hacking & Psychological Manipulation</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="destructive" className="text-sm bg-orange-900">
              <Users className="h-3 w-3 mr-1" />
              3 Active Campaigns
            </Badge>
            <Badge variant="destructive" className="text-sm bg-orange-900">
              <Target className="h-3 w-3 mr-1" />
              35 Compromised Targets
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Critical Success Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-green-500 bg-green-950/50 text-green-400">
            <Target className="h-4 w-4" />
            <AlertTitle>High-Value Target Compromised</AlertTitle>
            <AlertDescription>
              CFO credentials successfully harvested via executive phishing campaign.
              Full email access obtained with 2FA bypass. Financial systems accessible.
            </AlertDescription>
          </Alert>

          <Alert className="border-orange-500 bg-orange-950/50 text-orange-400">
            <Activity className="h-4 w-4" />
            <AlertTitle>Vishing Campaign Active</AlertTitle>
            <AlertDescription>
              Tech support voice calls in progress. 12/89 targets compromised so far.
              Average call duration: 8.5 minutes. Remote access established on 8 systems.
            </AlertDescription>
          </Alert>
        </div>

        {/* Social Engineering Dashboard */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900">
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-orange-900">Campaigns</TabsTrigger>
            <TabsTrigger value="targets" className="data-[state=active]:bg-orange-900">Targets</TabsTrigger>
            <TabsTrigger value="pretexts" className="data-[state=active]:bg-orange-900">Pretexts</TabsTrigger>
            <TabsTrigger value="osint" className="data-[state=active]:bg-orange-900">OSINT</TabsTrigger>
            <TabsTrigger value="psychology" className="data-[state=active]:bg-orange-900">Psychology</TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-orange-900">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            {/* Campaign Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gray-900 border-orange-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-400">Active Campaigns</CardTitle>
                  <Activity className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">3</div>
                  <p className="text-xs text-orange-600">Multi-vector attacks</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-orange-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-400">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">34%</div>
                  <p className="text-xs text-orange-600">Average compromise rate</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-orange-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-400">Compromised</CardTitle>
                  <Target className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">213</div>
                  <p className="text-xs text-orange-600">Total victims</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-orange-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-400">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">3.7m</div>
                  <p className="text-xs text-orange-600">Time to compromise</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Campaigns */}
            <Card className="bg-gray-900 border-orange-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Users className="h-5 w-5" />
                  Active Social Engineering Campaigns
                </CardTitle>
                <CardDescription className="text-orange-600">
                  Multi-platform psychological manipulation campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Button className="bg-orange-900 hover:bg-orange-800">
                    <Play className="h-4 w-4 mr-2" />
                    New Campaign
                  </Button>
                  <Button variant="outline" className="border-orange-900 text-orange-400">
                    <Settings className="h-4 w-4 mr-2" />
                    Templates
                  </Button>
                </div>

                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="rounded-lg border border-orange-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(campaign.type)}
                        <div>
                          <p className="font-medium text-orange-400">{campaign.name}</p>
                          <p className="text-sm text-orange-600 capitalize">
                            {campaign.type.replace("_", " ")} • {campaign.template}
                          </p>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(campaign.status)} className="bg-orange-900">
                        {campaign.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid gap-3 md:grid-cols-5 text-sm mb-3">
                      <div>
                        <p className="text-orange-600">Targets</p>
                        <p className="font-mono text-orange-400">{campaign.targets}</p>
                      </div>
                      <div>
                        <p className="text-orange-600">Sent</p>
                        <p className="font-mono text-orange-400">{campaign.sent}</p>
                      </div>
                      <div>
                        <p className="text-orange-600">Opened</p>
                        <p className="font-mono text-orange-400">{campaign.opened}</p>
                      </div>
                      <div>
                        <p className="text-orange-600">Clicked</p>
                        <p className="font-mono text-orange-400">{campaign.clicked}</p>
                      </div>
                      <div>
                        <p className="text-orange-600">Compromised</p>
                        <p className="font-mono text-red-400">{campaign.compromised}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-orange-600">Success Rate</span>
                        <span className="text-orange-400">{campaign.successRate}%</span>
                      </div>
                      <Progress value={campaign.successRate} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-orange-900 hover:bg-orange-800">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="border-orange-900 text-orange-400">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="border-orange-900 text-orange-400">
                        <FileText className="h-3 w-3 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="targets" className="space-y-6">
            <Card className="bg-gray-900 border-orange-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Crosshair className="h-5 w-5" />
                  High-Value Targets Database
                </CardTitle>
                <CardDescription className="text-orange-600">
                  Comprehensive target profiling and vulnerability assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Input placeholder="Search targets..." className="max-w-sm bg-gray-800 border-orange-900 text-orange-400" />
                  <Select>
                    <SelectTrigger className="w-48 bg-gray-800 border-orange-900">
                      <SelectValue placeholder="Filter by risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="critical">Critical (80+)</SelectItem>
                      <SelectItem value="high">High (60-79)</SelectItem>
                      <SelectItem value="medium">Medium (40-59)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {targets.map((target) => (
                  <div key={target.id} className="rounded-lg border border-orange-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-orange-400">{target.name}</p>
                        <p className="text-sm text-orange-600">
                          {target.position} • {target.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(target.status)} className="mb-1">
                          {target.status.toUpperCase()}
                        </Badge>
                        <p className={`text-sm font-bold ${getRiskColor(target.riskScore)}`}>
                          Risk: {target.riskScore}/100
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 mb-3">
                      <div>
                        <p className="text-sm text-orange-600 mb-1">Contact Information:</p>
                        <div className="space-y-1 text-xs">
                          <p className="text-orange-400">📧 {target.email}</p>
                          <p className="text-orange-400">📱 {target.phone}</p>
                          <p className="text-orange-400">💼 {target.linkedIn}</p>
                          <p className="text-orange-400">📘 {target.facebook}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-orange-600 mb-1">Psychological Profile:</p>
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {target.interests.slice(0, 3).map((interest) => (
                              <Badge key={interest} variant="outline" className="text-xs border-orange-900 text-orange-400">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {target.weaknesses.slice(0, 2).map((weakness) => (
                              <Badge key={weakness} variant="destructive" className="text-xs bg-red-900">
                                {weakness}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-orange-900 hover:bg-orange-800">
                        <Target className="h-3 w-3 mr-1" />
                        Target
                      </Button>
                      <Button size="sm" variant="outline" className="border-orange-900 text-orange-400">
                        <Eye className="h-3 w-3 mr-1" />
                        Profile
                      </Button>
                      <Button size="sm" variant="outline" className="border-orange-900 text-orange-400">
                        <Search className="h-3 w-3 mr-1" />
                        OSINT
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pretexts" className="space-y-6">
            <Card className="bg-gray-900 border-orange-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Brain className="h-5 w-5" />
                  Pretext Template Library
                </CardTitle>
                <CardDescription className="text-orange-600">
                  Psychological manipulation scripts and social engineering templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pretexts.map((pretext) => (
                  <div key={pretext.id} className="rounded-lg border border-orange-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-orange-400">{pretext.name}</p>
                        <p className="text-sm text-orange-600 capitalize">
                          {pretext.platform} • {pretext.difficulty} difficulty
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-orange-400">Effectiveness: {pretext.effectiveness}%</p>
                        <Progress value={pretext.effectiveness} className="w-32 h-2 mt-1" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-orange-400 mb-1">Scenario:</p>
                        <p className="text-sm text-orange-600">{pretext.scenario}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-orange-400 mb-1">Psychology Principles:</p>
                        <div className="flex gap-1 flex-wrap">
                          {pretext.psychologyPrinciple.map((principle) => (
                            <Badge key={principle} variant="destructive" className="text-xs bg-red-900">
                              {principle}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <details className="mb-3">
                        <summary className="text-sm font-medium text-orange-400 cursor-pointer">
                          Script Template
                        </summary>
                        <pre className="text-xs bg-black p-2 rounded mt-2 overflow-x-auto text-green-400 whitespace-pre-wrap">
                          {pretext.script}
                        </pre>
                      </details>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-orange-900 hover:bg-orange-800">
                        <Play className="h-3 w-3 mr-1" />
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline" className="border-orange-900 text-orange-400">
                        <Settings className="h-3 w-3 mr-1" />
                        Customize
                      </Button>
                      <Button size="sm" variant="outline" className="border-orange-900 text-orange-400">
                        <FileText className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="osint" className="space-y-6">
            <Card className="bg-gray-900 border-orange-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Search className="h-5 w-5" />
                  OSINT Intelligence Profiles
                </CardTitle>
                <CardDescription className="text-orange-600">
                  Open source intelligence gathering and target reconnaissance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {osintProfiles.map((profile) => (
                  <div key={profile.id} className="rounded-lg border border-orange-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-orange-400">{profile.target}</p>
                        <p className="text-sm text-orange-600">
                          {profile.platform} • @{profile.username}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-orange-400">{profile.followers} followers</p>
                        <p className="text-xs text-orange-600">{profile.posts} posts analyzed</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-orange-400 mb-1">Personal Information:</p>
                        <ul className="text-sm text-orange-600 space-y-1">
                          {profile.personalInfo.map((info, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                              {info}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-orange-400 mb-1">Vulnerabilities:</p>
                        <div className="space-y-1">
                          {profile.vulnerabilities.map((vuln, index) => (
                            <Badge key={index} variant="destructive" className="text-xs bg-red-900 mr-1">
                              {vuln}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-orange-400 mb-1">Schedule Patterns:</p>
                        <ul className="text-sm text-orange-600 space-y-1">
                          {profile.schedule.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-orange-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-orange-900 hover:bg-orange-800">
                        <Eye className="h-3 w-3 mr-1" />
                        Deep Scan
                      </Button>
                      <Button size="sm" variant="outline" className="border-orange-900 text-orange-400">
                        <Search className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                      <Button size="sm" variant="outline" className="border-orange-900 text-orange-400">
                        <FileText className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="psychology" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-900 border-orange-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Brain className="h-5 w-5" />
                    Psychological Triggers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border border-orange-900 rounded">
                    <p className="font-medium text-orange-400">Authority</p>
                    <p className="text-sm text-orange-600">People comply with authority figures</p>
                    <p className="text-xs text-orange-500">Success Rate: 87%</p>
                  </div>
                  <div className="p-3 border border-orange-900 rounded">
                    <p className="font-medium text-orange-400">Urgency</p>
                    <p className="text-sm text-orange-600">Time pressure creates immediate action</p>
                    <p className="text-xs text-orange-500">Success Rate: 92%</p>
                  </div>
                  <div className="p-3 border border-orange-900 rounded">
                    <p className="font-medium text-orange-400">Fear</p>
                    <p className="text-sm text-orange-600">Security threats motivate quick response</p>
                    <p className="text-xs text-orange-500">Success Rate: 89%</p>
                  </div>
                  <div className="p-3 border border-orange-900 rounded">
                    <p className="font-medium text-orange-400">Social Proof</p>
                    <p className="text-sm text-orange-600">Others' actions influence behavior</p>
                    <p className="text-xs text-orange-500">Success Rate: 76%</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-orange-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Activity className="h-5 w-5" />
                    Campaign Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-600">Email Success</span>
                      <span className="text-orange-400">27%</span>
                    </div>
                    <Progress value={27} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-600">SMS Success</span>
                      <span className="text-orange-400">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-600">Voice Success</span>
                      <span className="text-orange-400">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-600">Physical Success</span>
                      <span className="text-orange-400">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-900 border-orange-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Zap className="h-5 w-5" />
                    Social Engineering Toolkit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <Mail className="h-4 w-4 mr-2" />
                    Phishing Email Generator
                  </Button>
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <Phone className="h-4 w-4 mr-2" />
                    Vishing Call Framework
                  </Button>
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    SMS Spoofing Tools
                  </Button>
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <Globe className="h-4 w-4 mr-2" />
                    Social Media Cloner
                  </Button>
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <Search className="h-4 w-4 mr-2" />
                    OSINT Collection Suite
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-orange-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Target className="h-5 w-5" />
                    Advanced Techniques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <Camera className="h-4 w-4 mr-2" />
                    Deepfake Video Calls
                  </Button>
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Cloning AI
                  </Button>
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <Wifi className="h-4 w-4 mr-2" />
                    Evil Twin WiFi Setup
                  </Button>
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile Device Cloning
                  </Button>
                  <Button className="w-full justify-start bg-orange-900 hover:bg-orange-800">
                    <Database className="h-4 w-4 mr-2" />
                    USB Drop Payloads
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
