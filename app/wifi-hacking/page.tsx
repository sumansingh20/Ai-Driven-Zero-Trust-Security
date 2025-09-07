"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/src/hooks/use-toast"
import { 
  Wifi, Signal, Lock, Unlock, Zap, Target, Activity, Eye, Search,
  Terminal, Database, Code, Settings, Bug, AlertTriangle, Play, Loader2
} from "lucide-react"

interface WifiNetwork {
  id: string
  bssid: string
  essid: string
  channel: number
  frequency: string
  encryption: "WEP" | "WPA" | "WPA2" | "WPA3" | "Open"
  cipher: string
  authentication: string
  signal_strength: number
  clients_count: number
  vendor: string
  crackable: boolean
  handshake_captured: boolean
  estimated_crack_time: string
  vulnerability: string[]
}

interface WirelessClient {
  id: string
  mac_address: string
  associated_bssid: string
  station_mac: string
  power: number
  packets: number
  probes: string[]
  device_type: string
  vendor: string
  last_seen: string
  deauth_vulnerable: boolean
}

interface WirelessAttack {
  id: string
  attack_type: "deauth" | "handshake_capture" | "evil_twin" | "wps_attack" | "krack" | "pmkid"
  target_bssid: string
  target_essid: string
  status: "preparing" | "active" | "completed" | "failed"
  duration: string
  success_rate: number
  captured_data: string[]
  command_used: string
}

export default function WirelessHackingPage() {
  const { toast } = useToast()
  const [loadingStates, setLoadingStates] = useState({
    scan: false,
    attack: "",
    crack: "",
    monitor: ""
  })

  const handleNetworkScan = async () => {
    setLoadingStates(prev => ({ ...prev, scan: true }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      toast({
        title: "Network Scan Complete",
        description: "Discovered 12 wireless networks. 5 vulnerable targets identified.",
      })
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "Unable to scan wireless networks. Check adapter configuration.",
        variant: "destructive",
      })
    } finally {
      setLoadingStates(prev => ({ ...prev, scan: false }))
    }
  }

  const handleWifiAttack = async (networkId: string, networkName: string) => {
    setLoadingStates(prev => ({ ...prev, attack: networkId }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 4000))
      
      toast({
        title: "Attack Successful",
        description: `Successfully captured handshake from ${networkName}. Beginning password crack...`,
      })
    } catch (error) {
      toast({
        title: "Attack Failed", 
        description: "Unable to capture handshake. Target may be hardened.",
        variant: "destructive",
      })
    } finally {
      setLoadingStates(prev => ({ ...prev, attack: "" }))
    }
  }

  const handlePasswordCrack = async (networkId: string, networkName: string) => {
    setLoadingStates(prev => ({ ...prev, crack: networkId }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 6000))
      
      toast({
        title: "Password Cracked",
        description: `Successfully cracked ${networkName}. Password: 'admin123' - Recommend immediate security remediation.`,
      })
    } catch (error) {
      toast({
        title: "Crack Failed",
        description: "Password crack unsuccessful. Consider dictionary attack or extended brute force.",
        variant: "destructive",
      })
    } finally {
      setLoadingStates(prev => ({ ...prev, crack: "" }))
    }
  }

  const [wifiNetworks] = useState<WifiNetwork[]>([
    {
      id: "net-001",
      bssid: "AA:BB:CC:DD:EE:FF",
      essid: "CORPORATE_WIFI",
      channel: 6,
      frequency: "2.437 GHz",
      encryption: "WPA2",
      cipher: "CCMP",
      authentication: "PSK",
      signal_strength: -45,
      clients_count: 23,
      vendor: "Cisco Systems",
      crackable: true,
      handshake_captured: true,
      estimated_crack_time: "4-6 hours",
      vulnerability: ["KRACK", "Weak password policy"]
    },
    {
      id: "net-002",
      bssid: "11:22:33:44:55:66",
      essid: "HOME_NETWORK_5G",
      channel: 149,
      frequency: "5.745 GHz", 
      encryption: "WPA3",
      cipher: "GCMP-256",
      authentication: "SAE",
      signal_strength: -62,
      clients_count: 7,
      vendor: "ASUS",
      crackable: false,
      handshake_captured: false,
      estimated_crack_time: "Not feasible",
      vulnerability: ["WPS enabled"]
    },
    {
      id: "net-003",
      bssid: "99:88:77:66:55:44",
      essid: "FreeWiFi_Guest",
      channel: 11,
      frequency: "2.462 GHz",
      encryption: "Open",
      cipher: "None",
      authentication: "None",
      signal_strength: -38,
      clients_count: 156,
      vendor: "TP-Link",
      crackable: true,
      handshake_captured: false,
      estimated_crack_time: "Immediate",
      vulnerability: ["No encryption", "Captive portal bypass"]
    },
    {
      id: "net-004",
      bssid: "FF:EE:DD:CC:BB:AA",
      essid: "LEGACY_ROUTER",
      channel: 1,
      frequency: "2.412 GHz",
      encryption: "WEP",
      cipher: "WEP",
      authentication: "Open",
      signal_strength: -55,
      clients_count: 3,
      vendor: "Linksys",
      crackable: true,
      handshake_captured: false,
      estimated_crack_time: "< 5 minutes",
      vulnerability: ["WEP encryption", "Default credentials", "WPS PIN attack"]
    }
  ])

  const [wirelessClients] = useState<WirelessClient[]>([
    {
      id: "client-001",
      mac_address: "12:34:56:78:90:AB",
      associated_bssid: "AA:BB:CC:DD:EE:FF",
      station_mac: "12:34:56:78:90:AB",
      power: -52,
      packets: 1247,
      probes: ["CORPORATE_WIFI", "iPhone_Network", "HOME_5G"],
      device_type: "iPhone 15 Pro",
      vendor: "Apple Inc.",
      last_seen: "2024-09-07 10:45:32",
      deauth_vulnerable: true
    },
    {
      id: "client-002",
      mac_address: "AB:CD:EF:12:34:56",
      associated_bssid: "AA:BB:CC:DD:EE:FF",
      station_mac: "AB:CD:EF:12:34:56",
      power: -48,
      packets: 3456,
      probes: ["CORPORATE_WIFI", "Samsung_Galaxy", "AndroidAP"],
      device_type: "Samsung Galaxy S24",
      vendor: "Samsung Electronics",
      last_seen: "2024-09-07 10:44:55",
      deauth_vulnerable: true
    },
    {
      id: "client-003",
      mac_address: "DE:AD:BE:EF:CA:FE",
      associated_bssid: "99:88:77:66:55:44",
      station_mac: "DE:AD:BE:EF:CA:FE",
      power: -41,
      packets: 892,
      probes: ["FreeWiFi_Guest", "LAPTOP_HOTSPOT"],
      device_type: "MacBook Pro",
      vendor: "Apple Inc.",
      last_seen: "2024-09-07 10:45:12",
      deauth_vulnerable: true
    }
  ])

  const [activeAttacks] = useState<WirelessAttack[]>([
    {
      id: "attack-001",
      attack_type: "handshake_capture",
      target_bssid: "AA:BB:CC:DD:EE:FF",
      target_essid: "CORPORATE_WIFI",
      status: "completed",
      duration: "00:03:27",
      success_rate: 100,
      captured_data: ["4-way handshake", "PMKID"],
      command_used: "airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon"
    },
    {
      id: "attack-002",
      attack_type: "deauth",
      target_bssid: "AA:BB:CC:DD:EE:FF",
      target_essid: "CORPORATE_WIFI",
      status: "active",
      duration: "00:01:45",
      success_rate: 87,
      captured_data: ["23 deauth packets sent"],
      command_used: "aireplay-ng --deauth 0 -a AA:BB:CC:DD:EE:FF wlan0mon"
    },
    {
      id: "attack-003",
      attack_type: "evil_twin",
      target_bssid: "99:88:77:66:55:44",
      target_essid: "FreeWiFi_Guest",
      status: "preparing",
      duration: "00:00:12",
      success_rate: 0,
      captured_data: [],
      command_used: "hostapd /etc/hostapd/hostapd.conf & dnsmasq -C /etc/dnsmasq.conf"
    }
  ])

  const getEncryptionColor = (encryption: string) => {
    switch (encryption) {
      case "Open": return "bg-red-900 text-red-100"
      case "WEP": return "bg-red-900 text-red-100"
      case "WPA": return "bg-orange-900 text-orange-100"
      case "WPA2": return "bg-yellow-900 text-yellow-100"
      case "WPA3": return "bg-green-900 text-green-100"
      default: return "bg-gray-900 text-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-900 text-green-100"
      case "completed": return "bg-blue-900 text-blue-100"
      case "failed": return "bg-red-900 text-red-100"
      case "preparing": return "bg-yellow-900 text-yellow-100"
      default: return "bg-gray-900 text-gray-100"
    }
  }

  const getSignalBars = (strength: number) => {
    if (strength > -30) return 4
    if (strength > -50) return 3
    if (strength > -70) return 2
    return 1
  }

  return (
    <div className="min-h-screen bg-black text-cyan-500">
      {/* Header */}
      <header className="border-b border-cyan-900 bg-gray-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Wifi className="h-8 w-8 text-cyan-500" />
            <div>
              <h1 className="text-xl font-bold text-cyan-400">WIRELESS PENETRATION SUITE</h1>
              <p className="text-sm text-cyan-600">Advanced WiFi Security Assessment & Attack Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="destructive" className="text-sm bg-red-900">
              <Signal className="h-3 w-3 mr-1" />
              24 Networks
            </Badge>
            <Badge variant="destructive" className="text-sm bg-orange-900">
              <Target className="h-3 w-3 mr-1" />
              3 Active Attacks
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Live Attack Status */}
        <div className="mb-6 space-y-3">
          <Alert className="border-green-500 bg-green-950/50 text-green-400">
            <Unlock className="h-4 w-4" />
            <AlertTitle>Handshake Captured</AlertTitle>
            <AlertDescription>
              WPA2 4-way handshake successfully captured from CORPORATE_WIFI.
              Initiating dictionary attack with rockyou.txt wordlist.
            </AlertDescription>
          </Alert>

          <Alert className="border-red-500 bg-red-950/50 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Deauthentication Attack Active</AlertTitle>
            <AlertDescription>
              Continuous deauth attack targeting 23 clients on CORPORATE_WIFI.
              87% success rate. Forcing handshake capture attempts.
            </AlertDescription>
          </Alert>
        </div>

        {/* Wireless Hacking Dashboard */}
        <Tabs defaultValue="networks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900">
            <TabsTrigger value="networks" className="data-[state=active]:bg-cyan-900">WiFi Networks</TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-cyan-900">Wireless Clients</TabsTrigger>
            <TabsTrigger value="attacks" className="data-[state=active]:bg-cyan-900">Active Attacks</TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-cyan-900">WiFi Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="networks" className="space-y-6">
            <Card className="bg-gray-900 border-cyan-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Wifi className="h-5 w-5" />
                  Discovered WiFi Networks
                </CardTitle>
                <CardDescription className="text-cyan-600">
                  Real-time wireless network reconnaissance and vulnerability assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {wifiNetworks.map((network) => (
                  <div key={network.id} className="rounded-lg border border-cyan-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-3 rounded-sm ${
                                i < getSignalBars(network.signal_strength) 
                                  ? 'bg-cyan-500' 
                                  : 'bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <div>
                          <p className="font-medium text-cyan-400">{network.essid}</p>
                          <p className="text-sm text-cyan-600 font-mono">{network.bssid}</p>
                          <p className="text-xs text-gray-400">{network.vendor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getEncryptionColor(network.encryption)}>
                          {network.encryption}
                        </Badge>
                        <p className="text-sm font-bold text-cyan-400 mt-1">
                          {network.signal_strength} dBm
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-4 text-sm mb-3">
                      <div>
                        <p className="text-cyan-600">Channel</p>
                        <p className="text-cyan-400">{network.channel} ({network.frequency})</p>
                      </div>
                      <div>
                        <p className="text-cyan-600">Clients</p>
                        <p className="text-cyan-400">{network.clients_count}</p>
                      </div>
                      <div>
                        <p className="text-cyan-600">Cipher</p>
                        <p className="text-cyan-400">{network.cipher}</p>
                      </div>
                      <div>
                        <p className="text-cyan-600">Crack Time</p>
                        <p className={`${network.crackable ? 'text-red-400' : 'text-green-400'}`}>
                          {network.estimated_crack_time}
                        </p>
                      </div>
                    </div>

                    {network.vulnerability.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-cyan-600 mb-1">Vulnerabilities:</p>
                        <div className="flex gap-1 flex-wrap">
                          {network.vulnerability.map((vuln) => (
                            <Badge key={vuln} variant="destructive" className="text-xs bg-red-900">
                              {vuln}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <Lock className="h-3 w-3 text-cyan-500" />
                      <span className="text-cyan-600">Handshake:</span>
                      <Badge variant={network.handshake_captured ? "default" : "secondary"}>
                        {network.handshake_captured ? "CAPTURED" : "PENDING"}
                      </Badge>
                      <Zap className="h-3 w-3 text-cyan-500 ml-2" />
                      <span className="text-cyan-600">Crackable:</span>
                      <Badge variant={network.crackable ? "destructive" : "default"}>
                        {network.crackable ? "YES" : "NO"}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-red-900 hover:bg-red-800">
                        <Target className="h-3 w-3 mr-1" />
                        Attack Network
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyan-900 text-cyan-400">
                        <Activity className="h-3 w-3 mr-1" />
                        Capture Handshake
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyan-900 text-cyan-400">
                        <Terminal className="h-3 w-3 mr-1" />
                        Deauth Clients
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyan-900 text-cyan-400">
                        <Search className="h-3 w-3 mr-1" />
                        Crack Password
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card className="bg-gray-900 border-cyan-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Database className="h-5 w-5" />
                  Wireless Client Intelligence
                </CardTitle>
                <CardDescription className="text-cyan-600">
                  Connected devices and probe request analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {wirelessClients.map((client) => (
                  <div key={client.id} className="rounded-lg border border-cyan-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-cyan-400 font-mono text-sm">
                          {client.mac_address}
                        </p>
                        <p className="text-sm text-cyan-600">
                          {client.device_type} • {client.vendor}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-cyan-400">{client.power} dBm</p>
                        <Badge variant={client.deauth_vulnerable ? "destructive" : "secondary"}>
                          {client.deauth_vulnerable ? "VULNERABLE" : "PROTECTED"}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 text-sm mb-3">
                      <div>
                        <p className="text-cyan-600">Associated BSSID</p>
                        <p className="text-cyan-400 font-mono text-xs">{client.associated_bssid}</p>
                      </div>
                      <div>
                        <p className="text-cyan-600">Packets</p>
                        <p className="text-cyan-400">{client.packets.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-cyan-600">Last Seen</p>
                        <p className="text-cyan-400">{client.last_seen}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-cyan-600 mb-1">Probe Requests:</p>
                      <div className="flex gap-1 flex-wrap">
                        {client.probes.map((probe) => (
                          <Badge key={probe} variant="outline" className="text-xs border-cyan-900 text-cyan-400">
                            {probe}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-orange-900 hover:bg-orange-800">
                        <Zap className="h-3 w-3 mr-1" />
                        Deauthenticate
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyan-900 text-cyan-400">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor Traffic
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyan-900 text-cyan-400">
                        <Terminal className="h-3 w-3 mr-1" />
                        Target Device
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attacks" className="space-y-6">
            <Card className="bg-gray-900 border-cyan-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Target className="h-5 w-5" />
                  Active Wireless Attacks
                </CardTitle>
                <CardDescription className="text-cyan-600">
                  Real-time wireless attack monitoring and control
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeAttacks.map((attack) => (
                  <div key={attack.id} className="rounded-lg border border-cyan-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-cyan-400 capitalize">
                          {attack.attack_type.replace('_', ' ')} Attack
                        </p>
                        <p className="text-sm text-cyan-600">
                          Target: {attack.target_essid} ({attack.target_bssid})
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(attack.status)}>
                          {attack.status.toUpperCase()}
                        </Badge>
                        <p className="text-sm font-bold text-cyan-400 mt-1">
                          {attack.success_rate}% Success
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 text-sm mb-3">
                      <div>
                        <p className="text-cyan-600">Duration</p>
                        <p className="text-cyan-400 font-mono">{attack.duration}</p>
                      </div>
                      <div>
                        <p className="text-cyan-600">Success Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={attack.success_rate} className="flex-1 h-2" />
                          <span className="text-cyan-400">{attack.success_rate}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-cyan-600 mb-1">Captured Data:</p>
                      <div className="space-y-1">
                        {attack.captured_data.map((data) => (
                          <div key={data} className="text-xs text-green-400 bg-black p-1 rounded font-mono">
                            {data}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3 p-2 bg-black border border-cyan-900 rounded">
                      <p className="text-xs text-cyan-600 mb-1">Command:</p>
                      <code className="text-xs text-cyan-400 font-mono break-all">
                        {attack.command_used}
                      </code>
                    </div>

                    <div className="flex gap-2">
                      {attack.status === "active" ? (
                        <Button size="sm" className="bg-red-900 hover:bg-red-800">
                          <Bug className="h-3 w-3 mr-1" />
                          Stop Attack
                        </Button>
                      ) : attack.status === "completed" ? (
                        <Button size="sm" className="bg-green-900 hover:bg-green-800">
                          <Eye className="h-3 w-3 mr-1" />
                          View Results
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                          <Play className="h-3 w-3 mr-1" />
                          Start Attack
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-cyan-900 text-cyan-400">
                        <Terminal className="h-3 w-3 mr-1" />
                        Console
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyan-900 text-cyan-400">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-900 border-cyan-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Terminal className="h-5 w-5" />
                    Aircrack-ng Suite
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-cyan-900 hover:bg-cyan-800">
                    <Terminal className="h-4 w-4 mr-2" />
                    airodump-ng - Packet Capture
                  </Button>
                  <Button className="w-full justify-start bg-cyan-900 hover:bg-cyan-800">
                    <Zap className="h-4 w-4 mr-2" />
                    aireplay-ng - Deauth Attack
                  </Button>
                  <Button className="w-full justify-start bg-cyan-900 hover:bg-cyan-800">
                    <Lock className="h-4 w-4 mr-2" />
                    aircrack-ng - Password Crack
                  </Button>
                  <Button className="w-full justify-start bg-cyan-900 hover:bg-cyan-800">
                    <Settings className="h-4 w-4 mr-2" />
                    airmon-ng - Monitor Mode
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-cyan-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Code className="h-5 w-5" />
                    Advanced WiFi Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-cyan-900 hover:bg-cyan-800">
                    <Wifi className="h-4 w-4 mr-2" />
                    Reaver - WPS Attack
                  </Button>
                  <Button className="w-full justify-start bg-cyan-900 hover:bg-cyan-800">
                    <Target className="h-4 w-4 mr-2" />
                    Bully - WPS Brute Force
                  </Button>
                  <Button className="w-full justify-start bg-cyan-900 hover:bg-cyan-800">
                    <Database className="h-4 w-4 mr-2" />
                    Hashcat - GPU Cracking
                  </Button>
                  <Button className="w-full justify-start bg-cyan-900 hover:bg-cyan-800">
                    <Search className="h-4 w-4 mr-2" />
                    hcxtools - PMKID Attack
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-cyan-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Activity className="h-5 w-5" />
                  WiFi Attack Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center p-3 bg-gray-800 rounded border border-cyan-900">
                    <p className="text-2xl font-bold text-cyan-400">247</p>
                    <p className="text-sm text-cyan-600">Networks Scanned</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800 rounded border border-cyan-900">
                    <p className="text-2xl font-bold text-red-400">89</p>
                    <p className="text-sm text-cyan-600">Handshakes Captured</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800 rounded border border-cyan-900">
                    <p className="text-2xl font-bold text-green-400">34</p>
                    <p className="text-sm text-cyan-600">Passwords Cracked</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800 rounded border border-cyan-900">
                    <p className="text-2xl font-bold text-orange-400">156</p>
                    <p className="text-sm text-cyan-600">Clients Deauthed</p>
                  </div>
                </div>

                <Alert className="border-cyan-500 bg-cyan-950/50">
                  <Unlock className="h-4 w-4" />
                  <AlertTitle>Network Compromised</AlertTitle>
                  <AlertDescription className="text-sm">
                    Successfully cracked WPA2 password for CORPORATE_WIFI using dictionary attack.
                    Password: "Corporate2024!" - Full network access established.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
