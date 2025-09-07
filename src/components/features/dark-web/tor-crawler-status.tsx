"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Globe, Search, Database, CheckCircle, AlertTriangle, RefreshCw, Eye, Shield } from "lucide-react"

interface CrawlerMetrics {
  activeCrawlers: number
  sitesMonitored: number
  dataPointsCollected: number
  lastScanTime: string
  crawlerHealth: "healthy" | "degraded" | "offline"
  torConnectionStatus: "connected" | "connecting" | "disconnected"
}

interface CrawlerTarget {
  id: string
  name: string
  type: "forum" | "marketplace" | "leak_site" | "chat"
  status: "active" | "scanning" | "error"
  lastScan: string
  threatsFound: number
}

export function TorCrawlerStatus() {
  const [crawlerMetrics] = useState<CrawlerMetrics>({
    activeCrawlers: 12,
    sitesMonitored: 847,
    dataPointsCollected: 23456,
    lastScanTime: "2 minutes ago",
    crawlerHealth: "healthy",
    torConnectionStatus: "connected",
  })

  const [crawlerTargets] = useState<CrawlerTarget[]>([
    {
      id: "CR-001",
      name: "Underground Forum Alpha",
      type: "forum",
      status: "active",
      lastScan: "1 minute ago",
      threatsFound: 7,
    },
    {
      id: "CR-002",
      name: "Dark Marketplace Beta",
      type: "marketplace",
      status: "scanning",
      lastScan: "5 minutes ago",
      threatsFound: 3,
    },
    {
      id: "CR-003",
      name: "Credential Leak Site",
      type: "leak_site",
      status: "active",
      lastScan: "3 minutes ago",
      threatsFound: 12,
    },
    {
      id: "CR-004",
      name: "Encrypted Chat Room",
      type: "chat",
      status: "error",
      lastScan: "15 minutes ago",
      threatsFound: 0,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "connected":
      case "active":
        return "default"
      case "degraded":
      case "connecting":
      case "scanning":
        return "secondary"
      case "offline":
      case "disconnected":
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "connected":
      case "active":
        return <CheckCircle className="h-4 w-4 text-chart-4" />
      case "degraded":
      case "connecting":
      case "scanning":
        return <RefreshCw className="h-4 w-4 text-chart-2 animate-spin" />
      case "offline":
      case "disconnected":
      case "error":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "forum":
        return <Globe className="h-4 w-4" />
      case "marketplace":
        return <Database className="h-4 w-4" />
      case "leak_site":
        return <Shield className="h-4 w-4" />
      case "chat":
        return <Eye className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Crawler Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crawlers</CardTitle>
            <Search className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crawlerMetrics.activeCrawlers}</div>
            <p className="text-xs text-muted-foreground">Scanning dark web</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sites Monitored</CardTitle>
            <Globe className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crawlerMetrics.sitesMonitored.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Onion domains tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Collected</CardTitle>
            <Database className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crawlerMetrics.dataPointsCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Intelligence points today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TOR Status</CardTitle>
            <Shield className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {getStatusIcon(crawlerMetrics.torConnectionStatus)}
              <Badge variant={getStatusColor(crawlerMetrics.torConnectionStatus)}>
                {crawlerMetrics.torConnectionStatus.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Network anonymity</p>
          </CardContent>
        </Card>
      </div>

      {/* Crawler Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Crawler Health & Performance
          </CardTitle>
          <CardDescription>Real-time status of dark web intelligence gathering systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Health</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(crawlerMetrics.crawlerHealth)}
              <Badge variant={getStatusColor(crawlerMetrics.crawlerHealth)}>
                {crawlerMetrics.crawlerHealth.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Crawler Uptime</span>
                <span className="text-chart-4">99.7%</span>
              </div>
              <Progress value={99.7} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Quality</span>
                <span className="text-chart-1">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>TOR Anonymity</span>
                <span className="text-chart-2">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>

          <Alert className="border-chart-4 bg-chart-4/10">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Crawler Network Operational</AlertTitle>
            <AlertDescription>
              All 12 crawlers are actively monitoring dark web sources. Last successful scan:{" "}
              {crawlerMetrics.lastScanTime}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Active Crawler Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Monitored Dark Web Sources
          </CardTitle>
          <CardDescription>Current targets being scanned for threat intelligence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {crawlerTargets.map((target) => (
            <div key={target.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                {getTypeIcon(target.type)}
                <div>
                  <p className="font-medium">{target.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {target.type.replace("_", " ")} • ID: {target.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">Threats Found</p>
                  <p className="text-lg font-bold text-destructive">{target.threatsFound}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Scan</p>
                  <p className="text-sm font-mono">{target.lastScan}</p>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusIcon(target.status)}
                  <Badge variant={getStatusColor(target.status)}>{target.status.toUpperCase()}</Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Force Scan All
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Globe className="h-4 w-4" />
          Add New Target
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Shield className="h-4 w-4" />
          Rotate TOR Circuit
        </Button>
      </div>
    </div>
  )
}
