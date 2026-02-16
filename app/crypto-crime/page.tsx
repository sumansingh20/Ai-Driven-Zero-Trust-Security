"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Bitcoin, DollarSign, TrendingUp, Eye, Activity,
  Play, Database, Network, Lock, Search, Zap,
  Code, Bug, Shield, Target, Skull, Terminal, Globe
} from "lucide-react"

interface CryptoExchange {
  id: string
  name: string
  domain: string
  security_rating: "high" | "medium" | "low"
  volume_24h: string
  vulnerabilities: number
  last_breach: string
  user_funds: string
  hot_wallet: string
  cold_wallet: string
  kyc_level: "none" | "basic" | "full"
  exploitable: boolean
}

interface WalletTarget {
  id: string
  address: string
  blockchain: "bitcoin" | "ethereum" | "monero" | "litecoin"
  balance: string
  wallet_type: "hot" | "cold" | "exchange" | "defi"
  security: "weak" | "medium" | "strong"
  private_key_status: "recovered" | "targeted" | "unknown"
  last_activity: string
  transactions_today: number
}

interface DeFiProtocol {
  id: string
  name: string
  protocol: string
  tvl: string
  smart_contract: string
  vulnerabilities: string[]
  audit_status: "none" | "partial" | "full"
  exploit_potential: number
  governance_token: string
  admin_keys: boolean
  flash_loan_vulnerable: boolean
}

interface BlockchainExploit {
  id: string
  name: string
  target: string
  type: "reentrancy" | "flash_loan" | "oracle_manipulation" | "governance_attack" | "bridge_exploit"
  estimated_yield: string
  complexity: "low" | "medium" | "high" | "expert"
  success_probability: number
  detection_risk: number
  execution_time: string
  required_capital: string
}

interface DarkWebMarket {
  id: string
  name: string
  url: string
  escrow_system: boolean
  payment_methods: string[]
  vendor_count: number
  listing_count: number
  security_features: string[]
  uptime: number
  trust_score: number
  law_enforcement_risk: number
}

export default function CryptoCrimePage() {
  const [exchanges] = useState<CryptoExchange[]>([
    {
      id: "ex-001",
      name: "CryptoVault Exchange",
      domain: "cryptovault.trade",
      security_rating: "low",
      volume_24h: "$2.4B",
      vulnerabilities: 23,
      last_breach: "2025-07-15",
      user_funds: "$890M",
      hot_wallet: "$45M",
      cold_wallet: "$845M",
      kyc_level: "basic",
      exploitable: true
    },
    {
      id: "ex-002", 
      name: "SecureTrader Pro",
      domain: "securetrader.io",
      security_rating: "medium",
      volume_24h: "$1.8B",
      vulnerabilities: 8,
      last_breach: "Never",
      user_funds: "$1.2B",
      hot_wallet: "$60M",
      cold_wallet: "$1.14B",
      kyc_level: "full",
      exploitable: false
    }
  ])

  const [wallets] = useState<WalletTarget[]>([
    {
      id: "wal-001",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      blockchain: "bitcoin",
      balance: "847.23 BTC",
      wallet_type: "cold",
      security: "medium",
      private_key_status: "targeted",
      last_activity: "2025-09-05",
      transactions_today: 0
    },
    {
      id: "wal-002",
      address: "0x742d35Cc6635C0532925a3b8D431D3C7C36b58DE",
      blockchain: "ethereum",
      balance: "12,456 ETH",
      wallet_type: "defi",
      security: "weak",
      private_key_status: "recovered",
      last_activity: "2025-09-06",
      transactions_today: 47
    }
  ])

  const [defiProtocols] = useState<DeFiProtocol[]>([
    {
      id: "defi-001",
      name: "YieldFarm Protocol",
      protocol: "Automated Market Maker",
      tvl: "$450M",
      smart_contract: "0x1234...5678",
      vulnerabilities: [
        "Reentrancy in withdraw function",
        "Integer overflow in rewards calculation",
        "Unprotected admin functions"
      ],
      audit_status: "none",
      exploit_potential: 89,
      governance_token: "YFP",
      admin_keys: true,
      flash_loan_vulnerable: true
    },
    {
      id: "defi-002",
      name: "FlashSwap DEX",
      protocol: "Decentralized Exchange",
      tvl: "$1.2B",
      smart_contract: "0xabcd...ef90",
      vulnerabilities: [
        "Oracle price manipulation",
        "Sandwich attack vulnerable",
        "MEV extraction possible"
      ],
      audit_status: "partial",
      exploit_potential: 67,
      governance_token: "FST",
      admin_keys: false,
      flash_loan_vulnerable: true
    }
  ])

  const [exploits] = useState<BlockchainExploit[]>([
    {
      id: "exp-001",
      name: "YieldFarm Reentrancy Drain",
      target: "YieldFarm Protocol",
      type: "reentrancy",
      estimated_yield: "$23.4M",
      complexity: "medium",
      success_probability: 94,
      detection_risk: 15,
      execution_time: "< 1 block",
      required_capital: "$50K"
    },
    {
      id: "exp-002",
      name: "Oracle Price Manipulation",
      target: "FlashSwap DEX",
      type: "oracle_manipulation",
      estimated_yield: "$8.7M",
      complexity: "high",
      success_probability: 78,
      detection_risk: 45,
      execution_time: "2-3 blocks",
      required_capital: "$2M"
    }
  ])

  const [darkMarkets] = useState<DarkWebMarket[]>([
    {
      id: "dm-001",
      name: "ShadowBazaar",
      url: "shadow7x8k9l2m.onion",
      escrow_system: true,
      payment_methods: ["Bitcoin", "Monero", "Zcash"],
      vendor_count: 2847,
      listing_count: 34562,
      security_features: ["PGP", "Multi-sig", "2FA", "Dead man switch"],
      uptime: 98.7,
      trust_score: 87,
      law_enforcement_risk: 23
    },
    {
      id: "dm-002",
      name: "CriminalMarket",
      url: "crime9d8f7g6h.onion",
      escrow_system: true,
      payment_methods: ["Monero", "Bitcoin"],
      vendor_count: 1234,
      listing_count: 15678,
      security_features: ["PGP", "Multi-sig", "Tails required"],
      uptime: 94.2,
      trust_score: 78,
      law_enforcement_risk: 34
    }
  ])

  const getSecurityColor = (level: string) => {
    switch (level) {
      case "high": return "text-green-500"
      case "medium": return "text-orange-500"
      case "low": return "text-red-500"
      case "strong": return "text-green-500"
      case "weak": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "high": return "default"
      case "medium": return "secondary"
      case "low": return "destructive"
      default: return "outline"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low": return "text-green-500"
      case "medium": return "text-yellow-500"
      case "high": return "text-orange-500"
      case "expert": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-black text-yellow-500">
      {/* Header */}
      <header className="border-b border-yellow-900 bg-gray-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Bitcoin className="h-8 w-8 text-yellow-500" />
            <div>
              <h1 className="text-xl font-bold text-yellow-400">CRYPTOCURRENCY CRIME SYNDICATE</h1>
              <p className="text-sm text-yellow-600">Blockchain Exploitation & Digital Asset Theft</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="destructive" className="text-sm bg-yellow-900">
              <DollarSign className="h-3 w-3 mr-1" />
              $47.8M Stolen
            </Badge>
            <Badge variant="destructive" className="text-sm bg-yellow-900">
              <Bitcoin className="h-3 w-3 mr-1" />
              23 Active Exploits
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Critical Success Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-green-500 bg-green-950/50 text-green-400">
            <DollarSign className="h-4 w-4" />
            <AlertTitle>DeFi Protocol Drained</AlertTitle>
            <AlertDescription>
              Successfully executed reentrancy attack on YieldFarm Protocol.
              $23.4M extracted in single transaction. Funds laundered through privacy mixers.
            </AlertDescription>
          </Alert>

          <Alert className="border-yellow-500 bg-yellow-950/50 text-yellow-400">
            <Bitcoin className="h-4 w-4" />
            <AlertTitle>Private Key Recovery Complete</AlertTitle>
            <AlertDescription>
              High-value Ethereum wallet compromised via social engineering.
              12,456 ETH ($47.2M) transferred to mixer. Cold storage access obtained.
            </AlertDescription>
          </Alert>
        </div>

        {/* Cryptocurrency Crime Dashboard */}
        <Tabs defaultValue="exchanges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900">
            <TabsTrigger value="exchanges" className="data-[state=active]:bg-yellow-900">Exchanges</TabsTrigger>
            <TabsTrigger value="wallets" className="data-[state=active]:bg-yellow-900">Wallets</TabsTrigger>
            <TabsTrigger value="defi" className="data-[state=active]:bg-yellow-900">DeFi</TabsTrigger>
            <TabsTrigger value="exploits" className="data-[state=active]:bg-yellow-900">Exploits</TabsTrigger>
            <TabsTrigger value="darkweb" className="data-[state=active]:bg-yellow-900">Dark Markets</TabsTrigger>
            <TabsTrigger value="laundering" className="data-[state=active]:bg-yellow-900">Laundering</TabsTrigger>
          </TabsList>

          <TabsContent value="exchanges" className="space-y-6">
            {/* Exchange Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gray-900 border-yellow-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-400">Target Exchanges</CardTitle>
                  <Globe className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">47</div>
                  <p className="text-xs text-yellow-600">12 high-value targets</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-400">Total Volume</CardTitle>
                  <TrendingUp className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">$47.8B</div>
                  <p className="text-xs text-yellow-600">Daily trading volume</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-400">Vulnerable</CardTitle>
                  <Bug className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">23</div>
                  <p className="text-xs text-yellow-600">Exploitable platforms</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-400">Success Rate</CardTitle>
                  <Target className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">87%</div>
                  <p className="text-xs text-yellow-600">Exchange penetration</p>
                </CardContent>
              </Card>
            </div>

            {/* Exchange Targets */}
            <Card className="bg-gray-900 border-yellow-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Bitcoin className="h-5 w-5" />
                  Cryptocurrency Exchange Intelligence
                </CardTitle>
                <CardDescription className="text-yellow-600">
                  Target analysis and vulnerability assessment for exchange platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {exchanges.map((exchange) => (
                  <div key={exchange.id} className="rounded-lg border border-yellow-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-yellow-400">{exchange.name}</p>
                        <p className="text-sm text-yellow-600">
                          {exchange.domain} • {exchange.volume_24h} daily volume
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getRatingColor(exchange.security_rating)} className="mb-1">
                          {exchange.security_rating.toUpperCase()} SECURITY
                        </Badge>
                        <p className={`text-sm font-bold ${getSecurityColor(exchange.security_rating)}`}>
                          {exchange.vulnerabilities} vulnerabilities
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-4 text-sm mb-3">
                      <div>
                        <p className="text-yellow-600">User Funds</p>
                        <p className="font-mono text-yellow-400">{exchange.user_funds}</p>
                      </div>
                      <div>
                        <p className="text-yellow-600">Hot Wallet</p>
                        <p className="font-mono text-red-400">{exchange.hot_wallet}</p>
                      </div>
                      <div>
                        <p className="text-yellow-600">KYC Level</p>
                        <Badge variant="outline" className="border-yellow-900 text-yellow-400 capitalize">
                          {exchange.kyc_level}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-yellow-600">Last Breach</p>
                        <p className="text-yellow-400">{exchange.last_breach}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className={`${exchange.exploitable ? 'bg-red-900 hover:bg-red-800' : 'bg-yellow-900 hover:bg-yellow-800'}`}>
                        <Target className="h-3 w-3 mr-1" />
                        {exchange.exploitable ? 'Exploit' : 'Research'}
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Database className="h-3 w-3 mr-1" />
                        Intelligence
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallets" className="space-y-6">
            <Card className="bg-gray-900 border-yellow-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Lock className="h-5 w-5" />
                  High-Value Wallet Targets
                </CardTitle>
                <CardDescription className="text-yellow-600">
                  Private key recovery and wallet exploitation operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {wallets.map((wallet) => (
                  <div key={wallet.id} className="rounded-lg border border-yellow-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-yellow-400 font-mono text-sm">
                          {wallet.address.slice(0, 20)}...{wallet.address.slice(-6)}
                        </p>
                        <p className="text-sm text-yellow-600 capitalize">
                          {wallet.blockchain} • {wallet.wallet_type} wallet
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-400">{wallet.balance}</p>
                        <Badge variant={wallet.private_key_status === 'recovered' ? 'destructive' : 'secondary'}>
                          {wallet.private_key_status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 text-sm mb-3">
                      <div>
                        <p className="text-yellow-600">Security Level</p>
                        <p className={`font-medium ${getSecurityColor(wallet.security)}`}>
                          {wallet.security.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-yellow-600">Last Activity</p>
                        <p className="text-yellow-400">{wallet.last_activity}</p>
                      </div>
                      <div>
                        <p className="text-yellow-600">Today's Txns</p>
                        <p className="font-mono text-yellow-400">{wallet.transactions_today}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className={`${wallet.private_key_status === 'recovered' ? 'bg-green-900 hover:bg-green-800' : 'bg-red-900 hover:bg-red-800'}`}>
                        <Bitcoin className="h-3 w-3 mr-1" />
                        {wallet.private_key_status === 'recovered' ? 'Transfer Funds' : 'Crack Keys'}
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Activity className="h-3 w-3 mr-1" />
                        Trace
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="defi" className="space-y-6">
            <Card className="bg-gray-900 border-yellow-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Code className="h-5 w-5" />
                  DeFi Protocol Vulnerabilities
                </CardTitle>
                <CardDescription className="text-yellow-600">
                  Smart contract analysis and exploit development for DeFi protocols
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {defiProtocols.map((protocol) => (
                  <div key={protocol.id} className="rounded-lg border border-yellow-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-yellow-400">{protocol.name}</p>
                        <p className="text-sm text-yellow-600">
                          {protocol.protocol} • TVL: {protocol.tvl}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-yellow-400">Exploit Potential: {protocol.exploit_potential}%</p>
                        <Progress value={protocol.exploit_potential} className="w-32 h-2 mt-1" />
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 mb-3">
                      <div>
                        <p className="text-sm font-medium text-yellow-400 mb-1">Smart Contract:</p>
                        <p className="text-sm text-yellow-600 font-mono">{protocol.smart_contract}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-yellow-400 mb-1">Audit Status:</p>
                        <Badge variant={protocol.audit_status === 'none' ? 'destructive' : 'secondary'}>
                          {protocol.audit_status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <p className="text-sm font-medium text-yellow-400 mb-1">Vulnerabilities:</p>
                      <ul className="text-sm text-yellow-600 space-y-1">
                        {protocol.vulnerabilities.map((vuln) => (
                          <li key={vuln} className="flex items-center gap-2">
                            <Bug className="h-3 w-3 text-red-500" />
                            {vuln}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-yellow-500" />
                        <span className="text-yellow-600">Admin Keys</span>
                        <Badge variant={protocol.admin_keys ? 'destructive' : 'default'}>
                          {protocol.admin_keys ? 'YES' : 'NO'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        <span className="text-yellow-600">Flash Loan</span>
                        <Badge variant={protocol.flash_loan_vulnerable ? 'destructive' : 'default'}>
                          {protocol.flash_loan_vulnerable ? 'VULNERABLE' : 'SAFE'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-red-900 hover:bg-red-800">
                        <Code className="h-3 w-3 mr-1" />
                        Develop Exploit
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Eye className="h-3 w-3 mr-1" />
                        Analyze Code
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Terminal className="h-3 w-3 mr-1" />
                        Test Attack
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exploits" className="space-y-6">
            <Card className="bg-gray-900 border-yellow-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Skull className="h-5 w-5" />
                  Blockchain Exploit Arsenal
                </CardTitle>
                <CardDescription className="text-yellow-600">
                  Ready-to-deploy cryptocurrency and DeFi exploits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {exploits.map((exploit) => (
                  <div key={exploit.id} className="rounded-lg border border-yellow-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-yellow-400">{exploit.name}</p>
                        <p className="text-sm text-yellow-600">
                          Target: {exploit.target}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-400">{exploit.estimated_yield}</p>
                        <Badge variant="destructive" className="bg-red-900 capitalize">
                          {exploit.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-4 text-sm mb-3">
                      <div>
                        <p className="text-yellow-600">Complexity</p>
                        <p className={`font-medium ${getComplexityColor(exploit.complexity)}`}>
                          {exploit.complexity.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-yellow-600">Success Rate</p>
                        <p className="text-green-400">{exploit.success_probability}%</p>
                      </div>
                      <div>
                        <p className="text-yellow-600">Detection Risk</p>
                        <p className="text-red-400">{exploit.detection_risk}%</p>
                      </div>
                      <div>
                        <p className="text-yellow-600">Required Capital</p>
                        <p className="text-yellow-400">{exploit.required_capital}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-900 hover:bg-green-800">
                        <Play className="h-3 w-3 mr-1" />
                        Execute Attack
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Terminal className="h-3 w-3 mr-1" />
                        Test Run
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Code className="h-3 w-3 mr-1" />
                        View Code
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="darkweb" className="space-y-6">
            <Card className="bg-gray-900 border-yellow-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Globe className="h-5 w-5" />
                  Dark Web Marketplace Intelligence
                </CardTitle>
                <CardDescription className="text-yellow-600">
                  Underground marketplaces for cryptocurrency and stolen data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {darkMarkets.map((market) => (
                  <div key={market.id} className="rounded-lg border border-yellow-900 p-4 bg-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-yellow-400">{market.name}</p>
                        <p className="text-sm text-yellow-600 font-mono">{market.url}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-yellow-400">Trust Score: {market.trust_score}%</p>
                        <p className="text-sm text-green-400">Uptime: {market.uptime}%</p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 text-sm mb-3">
                      <div>
                        <p className="text-yellow-600">Vendors</p>
                        <p className="font-mono text-yellow-400">{market.vendor_count.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-yellow-600">Listings</p>
                        <p className="font-mono text-yellow-400">{market.listing_count.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-yellow-600">LE Risk</p>
                        <p className="text-red-400">{market.law_enforcement_risk}%</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <p className="text-sm font-medium text-yellow-400 mb-1">Payment Methods:</p>
                      <div className="flex gap-1 flex-wrap">
                        {market.payment_methods.map((method) => (
                          <Badge key={method} variant="outline" className="text-xs border-yellow-900 text-yellow-400">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <p className="text-sm font-medium text-yellow-400 mb-1">Security Features:</p>
                      <div className="flex gap-1 flex-wrap">
                        {market.security_features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs bg-gray-700">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-yellow-900 hover:bg-yellow-800">
                        <Globe className="h-3 w-3 mr-1" />
                        Access Market
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-900 text-yellow-400">
                        <Search className="h-3 w-3 mr-1" />
                        Intel Gather
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="laundering" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-900 border-yellow-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <Network className="h-5 w-5" />
                    Money Laundering Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-yellow-900 hover:bg-yellow-800">
                    <Bitcoin className="h-4 w-4 mr-2" />
                    Bitcoin Mixer
                  </Button>
                  <Button className="w-full justify-start bg-yellow-900 hover:bg-yellow-800">
                    <Lock className="h-4 w-4 mr-2" />
                    Monero Exchanger
                  </Button>
                  <Button className="w-full justify-start bg-yellow-900 hover:bg-yellow-800">
                    <Globe className="h-4 w-4 mr-2" />
                    Chain Hopping
                  </Button>
                  <Button className="w-full justify-start bg-yellow-900 hover:bg-yellow-800">
                    <Code className="h-4 w-4 mr-2" />
                    Tornado Cash
                  </Button>
                  <Button className="w-full justify-start bg-yellow-900 hover:bg-yellow-800">
                    <Database className="h-4 w-4 mr-2" />
                    Atomic Swaps
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <TrendingUp className="h-5 w-5" />
                    Criminal Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-600">Bitcoin Holdings</span>
                      <span className="text-yellow-400">1,247 BTC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-600">Ethereum Holdings</span>
                      <span className="text-yellow-400">23,456 ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-600">Monero Holdings</span>
                      <span className="text-yellow-400">45,678 XMR</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-yellow-900 pt-2">
                      <span className="text-yellow-600 font-medium">Total Portfolio</span>
                      <span className="text-green-400 font-bold">$247.8M USD</span>
                    </div>
                  </div>

                  <Alert className="border-green-500 bg-green-950/50">
                    <DollarSign className="h-4 w-4" />
                    <AlertTitle>Laundering Complete</AlertTitle>
                    <AlertDescription className="text-sm">
                      $47.2M successfully cleaned through privacy mixers.
                      Funds now untraceable across 247 wallets.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
