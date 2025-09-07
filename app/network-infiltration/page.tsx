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
import { networkOperations, showOperationResult } from "@/lib/cybersecurity-operations"
import { toast } from "@/hooks/use-toast"
import { 
  Network, Wifi, Router, Server, Database, Lock, Unlock, Eye, Activity, TrendingUp, Clock, AlertTriangle,
  Play, Pause, Square, Settings, FileText, Search, Zap, Target, Crosshair, Skull, Shield,
  Terminal, Code, Bug, Cpu, HardDrive, Globe, Map, Layers, GitBranch, Sword, Loader2
} from "lucide-react"

interface NetworkSegment {
  id: string
  name: string
  subnet: string
  vlan: number
  devices: number
  compromised: number
  security: "high" | "medium" | "low"
  access: "none" | "limited" | "admin" | "domain_admin"
  lastScan: string
  vulnerabilities: number
  services: string[]
}

interface CompromisedHost {
  id: string
  hostname: string
  ip: string
  os: string
  domain: string
  privilege: "user" | "admin" | "system" | "domain_admin"
  implant: string
  lastCallback: string
  persistence: boolean
  credentials: string[]
  capabilities: string[]
  networkAccess: string[]
}

interface LateralMovement {
  id: string
  technique: string
  source: string
  target: string
  method: "smb" | "wmi" | "psexec" | "rdp" | "ssh" | "powershell" | "mimikatz"
  status: "planning" | "active" | "successful" | "failed"
  privilege: string
  timestamp: string
  detection_risk: number
}

interface NetworkTunnel {
  id: string
  type: "reverse_shell" | "socks_proxy" | "port_forward" | "dns_tunnel" | "http_tunnel"
  localPort: number
  remoteHost: string
  remotePort: number
  protocol: "tcp" | "udp" | "http" | "https" | "dns"
  encryption: boolean
  bandwidth: string
  status: "active" | "inactive" | "establishing"
  traffic: number
}

interface C2Infrastructure {
  id: string
  name: string
  type: "domain" | "ip" | "cdn" | "p2p" | "social_media"
  endpoint: string
  region: string
  agents: number
  status: "operational" | "burned" | "maintenance"
  lastContact: string
  bandwidth: string
  detection_score: number
}

export default function NetworkInfiltrationPage() {
  const [segments] = useState<NetworkSegment[]>([
    {
      id: "seg-001",
      name: "DMZ Network",
      subnet: "192.168.100.0/24",
      vlan: 100,
      devices: 23,
      compromised: 8,
      security: "medium",
      access: "admin",
      lastScan: "2025-09-06",
      vulnerabilities: 12,
      services: ["HTTP", "HTTPS", "SSH", "FTP"]
    },
    {
      id: "seg-002", 
      name: "Internal LAN",
      subnet: "10.0.1.0/24",
      vlan: 10,
      devices: 156,
      compromised: 34,
      security: "low",
      access: "domain_admin",
      lastScan: "2025-09-06",
      vulnerabilities: 47,
      services: ["SMB", "RDP", "WMI", "LDAP", "DNS"]
    },
    {
      id: "seg-003",
      name: "Server Farm",
      subnet: "10.0.10.0/24", 
      vlan: 200,
      devices: 89,
      compromised: 12,
      security: "high",
      access: "limited",
      lastScan: "2025-09-05",
      vulnerabilities: 8,
      services: ["HTTPS", "SQL", "RDP", "SSH"]
    }
  ])

  // Loading states for different operations
  const [loadingStates, setLoadingStates] = useState({
    expandAccess: "",
    scanNetwork: "",
    deployImplant: false,
    shell: "",
    files: "",
    screen: "",
    pivot: "",
    executeMovement: ""
  })

  // Handler functions
  const handleExpandAccess = async (segmentId: string) => {
    setLoadingStates(prev => ({ ...prev, expandAccess: segmentId }))
    try {
      const result = await networkOperations.expandAccess(segmentId, "lateral_movement")
      toast({
        title: result.success ? "Access Expanded" : "Operation Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to expand network access",
        variant: "destructive"
      })
    }
    setLoadingStates(prev => ({ ...prev, expandAccess: "" }))
  }

  const handleScanNetwork = async (segmentId: string) => {
    setLoadingStates(prev => ({ ...prev, scanNetwork: segmentId }))
    try {
      const result = await networkOperations.scanNetwork(`segments/${segmentId}`)
      toast({
        title: result.success ? "Network Scan Complete" : "Scan Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      })
    } catch (error) {
      toast({
        title: "Error", 
        description: "Network scan operation failed",
        variant: "destructive"
      })
    }
    setLoadingStates(prev => ({ ...prev, scanNetwork: "" }))
  }

  const handleDeployImplant = async () => {
    setLoadingStates(prev => ({ ...prev, deployImplant: true }))
    try {
      const result = await networkOperations.deployImplant("beacon", "new_target")
      toast({
        title: result.success ? "Implant Deployed" : "Deployment Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deploy implant",
        variant: "destructive"
      })
    }
    setLoadingStates(prev => ({ ...prev, deployImplant: false }))
  }

  const handleHostShell = async (hostId: string) => {
    setLoadingStates(prev => ({ ...prev, shell: hostId }))
    try {
      const result = await networkOperations.remoteShell(hostId, "powershell")
      toast({
        title: result.success ? "Shell Access Granted" : "Shell Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to establish shell connection",
        variant: "destructive"
      })
    }
    setLoadingStates(prev => ({ ...prev, shell: "" }))
  }

  const handleFileAccess = async (hostId: string) => {
    setLoadingStates(prev => ({ ...prev, files: hostId }))
    try {
      const result = await networkOperations.fileAccess(hostId, "/", "list")
      toast({
        title: result.success ? "File Access Granted" : "File Access Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to access host files",
        variant: "destructive"
      })
    }
    setLoadingStates(prev => ({ ...prev, files: "" }))
  }

  const handleScreenCapture = async (hostId: string) => {
    setLoadingStates(prev => ({ ...prev, screen: hostId }))
    try {
      const result = await networkOperations.screenCapture(hostId)
      toast({
        title: result.success ? "Screenshot Captured" : "Screen Capture Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to capture screen",
        variant: "destructive"
      })
    }
    setLoadingStates(prev => ({ ...prev, screen: "" }))
  }

  const handlePivot = async (hostId: string) => {
    setLoadingStates(prev => ({ ...prev, pivot: hostId }))
    try {
      const result = await networkOperations.pivot(hostId, "discover_networks")
      toast({
        title: result.success ? "Pivot Successful" : "Pivot Failed", 
        description: result.message,
        variant: result.success ? "default" : "destructive"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to pivot through host",
        variant: "destructive"
      })
    }
    setLoadingStates(prev => ({ ...prev, pivot: "" }))
  }

  const handleExecuteMovement = async (movementId: string) => {
    setLoadingStates(prev => ({ ...prev, executeMovement: movementId }))
    try {
      const result = await networkOperations.lateralMovement(movementId, "execute")
      toast({
        title: result.success ? "Movement Executed" : "Movement Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute lateral movement",
        variant: "destructive"
      })
    }
    setLoadingStates(prev => ({ ...prev, executeMovement: "" }))
  }

  const [compromisedHosts] = useState<CompromisedHost[]>([
    {
      id: "host-001",
      hostname: "DC01.corp.local",
      ip: "10.0.1.10",
      os: "Windows Server 2019",
      domain: "CORP",
      privilege: "domain_admin",
      implant: "Cobalt Strike Beacon",
      lastCallback: "2025-09-06T14:23:45Z",
      persistence: true,
      credentials: ["Administrator", "krbtgt", "backup_admin"],
      capabilities: ["Golden Ticket", "DCSync", "Silver Ticket"],
      networkAccess: ["All subnets", "Domain trusts", "External connections"]
    },
    {
      id: "host-002",
      hostname: "WS-FINANCE-07",
      ip: "10.0.1.47",
      os: "Windows 10 Pro",
      domain: "CORP",
      privilege: "admin",
      implant: "Custom RAT",
      lastCallback: "2025-09-06T14:21:12Z",
      persistence: true,
      credentials: ["sarah.mitchell", "local_admin"],
      capabilities: ["Keylogger", "Screen capture", "File exfil"],
      networkAccess: ["Finance VLAN", "File servers", "Email access"]
    },
    {
      id: "host-003",
      hostname: "DB-SERVER-02",
      ip: "10.0.10.25",
      os: "Ubuntu 20.04 LTS",
      domain: "N/A",
      privilege: "system",
      implant: "Linux Rootkit",
      lastCallback: "2025-09-06T14:19:34Z",
      persistence: true,
      credentials: ["root", "mysql", "backup"],
      capabilities: ["Database dump", "Log manipulation", "Network pivot"],
      networkAccess: ["Database tier", "Backup network", "Management VLAN"]
    }
  ])

  const [movements] = useState<LateralMovement[]>([
    {
      id: "move-001",
      technique: "Pass-the-Hash Attack",
      source: "WS-FINANCE-07",
      target: "FILE-SRV-01",
      method: "smb",
      status: "successful",
      privilege: "admin",
      timestamp: "2025-09-06T13:45:23Z",
      detection_risk: 23
    },
    {
      id: "move-002",
      technique: "Golden Ticket",
      source: "DC01.corp.local",
      target: "ANY-HOST",
      method: "mimikatz",
      status: "successful",
      privilege: "domain_admin",
      timestamp: "2025-09-06T12:15:45Z",
      detection_risk: 15
    },
    {
      id: "move-003",
      technique: "WMI Remote Execution",
      source: "WS-FINANCE-07",
      target: "PRINT-SRV-03",
      method: "wmi",
      status: "active",
      privilege: "user",
      timestamp: "2025-09-06T14:20:12Z",
      detection_risk: 67
    }
  ])

  const [tunnels] = useState<NetworkTunnel[]>([
    {
      id: "tun-001",
      type: "socks_proxy",
      localPort: 1080,
      remoteHost: "10.0.1.47",
      remotePort: 443,
      protocol: "tcp",
      encryption: true,
      bandwidth: "2.3 MB/s",
      status: "active",
      traffic: 15673
    },
    {
      id: "tun-002",
      type: "dns_tunnel",
      localPort: 53,
      remoteHost: "attacker.evil.com",
      remotePort: 53,
      protocol: "dns",
      encryption: true,
      bandwidth: "125 KB/s",
      status: "active",
      traffic: 8932
    }
  ])

  const [c2Servers] = useState<C2Infrastructure[]>([
    {
      id: "c2-001",
      name: "Primary C2",
      type: "domain",
      endpoint: "update.microsoft-security.com",
      region: "US-East",
      agents: 47,
      status: "operational",
      lastContact: "2025-09-06T14:25:12Z",
      bandwidth: "5.7 MB/s",
      detection_score: 12
    },
    {
      id: "c2-002",
      name: "Backup C2",
      type: "cdn",
      endpoint: "cdn.cloudfront.net/updates",
      region: "EU-West",
      agents: 23,
      status: "operational",
      lastContact: "2025-09-06T14:23:45Z",
      bandwidth: "2.1 MB/s", 
      detection_score: 8
    }
  ])

  const getSecurityColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-500"
      case "medium": return "text-orange-500"
      case "low": return "text-green-500"
      default: return "text-gray-500"
    }
  }

  const getAccessColor = (access: string) => {
    switch (access) {
      case "domain_admin": return "destructive"
      case "admin": return "destructive"
      case "limited": return "secondary"
      case "none": return "outline"
      default: return "outline"
    }
  }

  const getPrivilegeColor = (privilege: string) => {
    switch (privilege) {
      case "domain_admin": return "text-red-500"
      case "system": return "text-red-500"
      case "admin": return "text-orange-500"
      case "user": return "text-yellow-500"
      default: return "text-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful": return "default"
      case "active": return "secondary"
      case "operational": return "default"
      case "failed": return "destructive"
      case "burned": return "destructive"
      default: return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-black text-purple-500">
      {/* Header */}
      <header className="border-b border-purple-900 bg-gray-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Network className="h-8 w-8 text-purple-500" />
            <div>
              <h1 className="text-xl font-bold text-purple-400">NETWORK INFILTRATION CENTER</h1>
              <p className="text-sm text-purple-600">Advanced Lateral Movement & Network Domination</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="destructive" className="text-sm bg-purple-900">
              <Server className="h-3 w-3 mr-1" />
              89 Compromised Hosts
            </Badge>
            <Badge variant="destructive" className="text-sm bg-purple-900">
              <Network className="h-3 w-3 mr-1" />
              54 Active Tunnels
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Critical Network Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-red-500 bg-red-950/50 text-red-400">
            <Skull className="h-4 w-4" />
            <AlertTitle>Domain Controller Compromised</AlertTitle>
            <AlertDescription>
              Full domain administrative access achieved via Golden Ticket attack.
              All domain resources accessible. 147 workstations under control.
            </AlertDescription>
          </Alert>

          <Alert className="border-green-500 bg-green-950/50 text-green-400">
            <Network className="h-4 w-4" />
            <AlertTitle>Network Pivot Successful</AlertTitle>
            <AlertDescription>
              SOCKS proxy established through compromised finance workstation.
              Internal network fully mapped. Database servers identified and accessed.
            </AlertDescription>
          </Alert>
        </div>

        {/* Network Infiltration Dashboard */}
        <Tabs defaultValue="segments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900">
            <TabsTrigger value="segments" className="data-[state=active]:bg-purple-900">Network Map</TabsTrigger>
            <TabsTrigger value="hosts" className="data-[state=active]:bg-purple-900">Compromised</TabsTrigger>
            <TabsTrigger value="movement" className="data-[state=active]:bg-purple-900">Lateral Movement</TabsTrigger>
            <TabsTrigger value="tunnels" className="data-[state=active]:bg-purple-900">Tunnels</TabsTrigger>
            <TabsTrigger value="c2" className="data-[state=active]:bg-purple-900">C2 Infrastructure</TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-purple-900">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="segments" className="space-y-6">
            {/* Network Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gray-900 border-purple-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-400">Network Segments</CardTitle>
                  <Layers className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">12</div>
                  <p className="text-xs text-purple-600">3 fully compromised</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-purple-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-400">Total Devices</CardTitle>
                  <Server className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">1,247</div>
                  <p className="text-xs text-purple-600">89 under control</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-purple-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-400">Compromise Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">71%</div>
                  <p className="text-xs text-purple-600">Network penetration</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-purple-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-400">Privilege Level</CardTitle>
                  <Shield className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">DA</div>
                  <p className="text-xs text-purple-600">Domain Admin achieved</p>
                </CardContent>
              </Card>
            </div>

            {/* Network Segments */}
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Map className="h-5 w-5" />
                  Network Segment Analysis
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Compromised network segments and lateral movement opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {segments.map((segment) => (
                  <div key={segment.id} className="rounded-lg border border-purple-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-purple-400">{segment.name}</p>
                        <p className="text-sm text-purple-600">
                          {segment.subnet} • VLAN {segment.vlan}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getAccessColor(segment.access)} className="mb-1">
                          {segment.access.replace("_", " ").toUpperCase()}
                        </Badge>
                        <p className={`text-sm font-bold ${getSecurityColor(segment.security)}`}>
                          Security: {segment.security.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-4 text-sm mb-3">
                      <div>
                        <p className="text-purple-600">Total Devices</p>
                        <p className="font-mono text-purple-400">{segment.devices}</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Compromised</p>
                        <p className="font-mono text-red-400">{segment.compromised}</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Vulnerabilities</p>
                        <p className="font-mono text-orange-400">{segment.vulnerabilities}</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Penetration</p>
                        <p className="font-mono text-purple-400">
                          {Math.round((segment.compromised / segment.devices) * 100)}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <p className="text-sm font-medium text-purple-400 mb-1">Available Services:</p>
                      <div className="flex gap-1 flex-wrap">
                        {segment.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs border-purple-900 text-purple-400">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-600">Network Control</span>
                        <span className="text-purple-400">
                          {Math.round((segment.compromised / segment.devices) * 100)}%
                        </span>
                      </div>
                      <Progress value={Math.round((segment.compromised / segment.devices) * 100)} className="h-2" />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        className="bg-purple-900 hover:bg-purple-800"
                        onClick={() => handleExpandAccess(segment.id)}
                        disabled={loadingStates.expandAccess === segment.id}
                      >
                        {loadingStates.expandAccess === segment.id ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Network className="h-3 w-3 mr-1" />
                        )}
                        Expand Access
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-900 text-purple-400"
                        onClick={() => handleScanNetwork(segment.id)}
                        disabled={loadingStates.scanNetwork === segment.id}
                      >
                        {loadingStates.scanNetwork === segment.id ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Eye className="h-3 w-3 mr-1" />
                        )}
                        Scan
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Map className="h-3 w-3 mr-1" />
                        Visualize
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hosts" className="space-y-6">
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Server className="h-5 w-5" />
                  Compromised Host Inventory
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Active implants and remote access capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <Input placeholder="Search hosts..." className="max-w-sm bg-gray-800 border-purple-900 text-purple-400" />
                  <Button 
                    className="bg-purple-900 hover:bg-purple-800"
                    onClick={handleDeployImplant}
                    disabled={loadingStates.deployImplant}
                  >
                    {loadingStates.deployImplant ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Deploy Implant
                  </Button>
                </div>

                {compromisedHosts.map((host) => (
                  <div key={host.id} className="rounded-lg border border-purple-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-purple-400">{host.hostname}</p>
                        <p className="text-sm text-purple-600">
                          {host.ip} • {host.os}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="mb-1 bg-purple-900">
                          {host.implant}
                        </Badge>
                        <p className={`text-sm font-bold ${getPrivilegeColor(host.privilege)}`}>
                          {host.privilege.replace("_", " ").toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 mb-3">
                      <div>
                        <p className="text-sm font-medium text-purple-400 mb-1">Harvested Credentials:</p>
                        <div className="space-y-1">
                          {host.credentials.map((cred) => (
                            <Badge key={cred} variant="outline" className="text-xs border-purple-900 text-purple-400 mr-1">
                              {cred}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-400 mb-1">Capabilities:</p>
                        <div className="space-y-1">
                          {host.capabilities.map((cap) => (
                            <Badge key={cap} variant="destructive" className="text-xs bg-red-900 mr-1">
                              {cap}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-purple-400 mb-1">Network Access:</p>
                      <div className="text-sm text-purple-600">
                        {host.networkAccess.join(", ")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-purple-600">
                        Last Callback: {new Date(host.lastCallback).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-purple-600">Active</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Lock className="h-3 w-3 text-purple-500" />
                          <span className="text-xs text-purple-600">Persistent</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-purple-900 hover:bg-purple-800"
                        onClick={() => handleHostShell(host.id)}
                        disabled={loadingStates.shell === host.id}
                      >
                        {loadingStates.shell === host.id ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Terminal className="h-3 w-3 mr-1" />
                        )}
                        Shell
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-900 text-purple-400"
                        onClick={() => handleFileAccess(host.id)}
                        disabled={loadingStates.files === host.id}
                      >
                        {loadingStates.files === host.id ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <HardDrive className="h-3 w-3 mr-1" />
                        )}
                        Files
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-900 text-purple-400"
                        onClick={() => handleScreenCapture(host.id)}
                        disabled={loadingStates.screen === host.id}
                      >
                        {loadingStates.screen === host.id ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Eye className="h-3 w-3 mr-1" />
                        )}
                        Screen
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-900 text-purple-400"
                        onClick={() => handlePivot(host.id)}
                        disabled={loadingStates.pivot === host.id}
                      >
                        {loadingStates.pivot === host.id ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Network className="h-3 w-3 mr-1" />
                        )}
                        Pivot
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movement" className="space-y-6">
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <GitBranch className="h-5 w-5" />
                  Lateral Movement Operations
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Advanced techniques for network traversal and privilege escalation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {movements.map((movement) => (
                  <div key={movement.id} className="rounded-lg border border-purple-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-purple-400">{movement.technique}</p>
                        <p className="text-sm text-purple-600">
                          {movement.source} → {movement.target}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(movement.status)} className="mb-1">
                          {movement.status.toUpperCase()}
                        </Badge>
                        <p className={`text-sm font-bold ${getPrivilegeColor(movement.privilege)}`}>
                          {movement.privilege.replace("_", " ").toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 text-sm mb-3">
                      <div>
                        <p className="text-purple-600">Method</p>
                        <Badge variant="outline" className="border-purple-900 text-purple-400 uppercase">
                          {movement.method}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-purple-600">Timestamp</p>
                        <p className="text-purple-400">
                          {new Date(movement.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-purple-600">Detection Risk</p>
                        <div className="flex items-center gap-2">
                          <Progress value={movement.detection_risk} className="flex-1 h-2" />
                          <span className="text-purple-400">{movement.detection_risk}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-purple-900 hover:bg-purple-800"
                        onClick={() => handleExecuteMovement(movement.id)}
                        disabled={loadingStates.executeMovement === movement.id}
                      >
                        {loadingStates.executeMovement === movement.id ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Play className="h-3 w-3 mr-1" />
                        )}
                        Execute
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tunnels" className="space-y-6">
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Globe className="h-5 w-5" />
                  Network Tunneling Infrastructure
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Encrypted tunnels and covert communication channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tunnels.map((tunnel) => (
                  <div key={tunnel.id} className="rounded-lg border border-purple-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-purple-400 capitalize">
                          {tunnel.type.replace("_", " ")}
                        </p>
                        <p className="text-sm text-purple-600">
                          {tunnel.remoteHost}:{tunnel.remotePort} → :{tunnel.localPort}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(tunnel.status)} className="mb-1">
                          {tunnel.status.toUpperCase()}
                        </Badge>
                        <p className="text-sm text-purple-400">{tunnel.bandwidth}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 text-sm mb-3">
                      <div>
                        <p className="text-purple-600">Protocol</p>
                        <Badge variant="outline" className="border-purple-900 text-purple-400 uppercase">
                          {tunnel.protocol}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-purple-600">Traffic</p>
                        <p className="text-purple-400">{tunnel.traffic.toLocaleString()} bytes</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Encryption</p>
                        <div className="flex items-center gap-1">
                          {tunnel.encryption ? (
                            <Lock className="h-3 w-3 text-green-500" />
                          ) : (
                            <Unlock className="h-3 w-3 text-red-500" />
                          )}
                          <span className="text-purple-400">
                            {tunnel.encryption ? "Enabled" : "Disabled"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-purple-900 hover:bg-purple-800">
                        <Activity className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Square className="h-3 w-3 mr-1" />
                        Terminate
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="c2" className="space-y-6">
            <Card className="bg-gray-900 border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Server className="h-5 w-5" />
                  Command & Control Infrastructure
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Resilient C2 architecture with redundancy and stealth capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {c2Servers.map((c2) => (
                  <div key={c2.id} className="rounded-lg border border-purple-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-purple-400">{c2.name}</p>
                        <p className="text-sm text-purple-600">
                          {c2.endpoint} • {c2.region}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(c2.status)} className="mb-1">
                          {c2.status.toUpperCase()}
                        </Badge>
                        <p className="text-sm text-purple-400">{c2.agents} agents</p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 text-sm mb-3">
                      <div>
                        <p className="text-purple-600">Type</p>
                        <Badge variant="outline" className="border-purple-900 text-purple-400 capitalize">
                          {c2.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-purple-600">Bandwidth</p>
                        <p className="text-purple-400">{c2.bandwidth}</p>
                      </div>
                      <div>
                        <p className="text-purple-600">Detection Score</p>
                        <div className="flex items-center gap-2">
                          <Progress value={c2.detection_score} className="flex-1 h-2" />
                          <span className="text-purple-400">{c2.detection_score}%</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-purple-600 mb-3">
                      Last Contact: {new Date(c2.lastContact).toLocaleString()}
                    </p>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-purple-900 hover:bg-purple-800">
                        <Activity className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-900 text-purple-400">
                        <FileText className="h-3 w-3 mr-1" />
                        Logs
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-900 border-purple-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Sword className="h-5 w-5" />
                    Network Exploitation Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-purple-900 hover:bg-purple-800">
                    <Terminal className="h-4 w-4 mr-2" />
                    Cobalt Strike
                  </Button>
                  <Button className="w-full justify-start bg-purple-900 hover:bg-purple-800">
                    <Network className="h-4 w-4 mr-2" />
                    Metasploit Framework
                  </Button>
                  <Button className="w-full justify-start bg-purple-900 hover:bg-purple-800">
                    <Code className="h-4 w-4 mr-2" />
                    Empire PowerShell
                  </Button>
                  <Button className="w-full justify-start bg-purple-900 hover:bg-purple-800">
                    <Database className="h-4 w-4 mr-2" />
                    Mimikatz
                  </Button>
                  <Button className="w-full justify-start bg-purple-900 hover:bg-purple-800">
                    <Wifi className="h-4 w-4 mr-2" />
                    BloodHound
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-purple-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Activity className="h-5 w-5" />
                    Network Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-600">Network Coverage</span>
                      <span className="text-purple-400">71%</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-600">Privilege Escalation</span>
                      <span className="text-purple-400">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-600">Persistence</span>
                      <span className="text-purple-400">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-600">Stealth Rating</span>
                      <span className="text-purple-400">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
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
