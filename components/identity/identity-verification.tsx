"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, Fingerprint, Smartphone, Eye, CheckCircle, AlertTriangle, Clock, Key, Lock, Zap } from "lucide-react"

interface IdentityMetrics {
  trustScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  mfaStatus: "active" | "pending" | "disabled"
  biometricStatus: "verified" | "pending" | "failed"
  blockchainVerified: boolean
  lastVerification: string
}

export function IdentityVerification() {
  const [identityMetrics] = useState<IdentityMetrics>({
    trustScore: 87,
    riskLevel: "low",
    mfaStatus: "active",
    biometricStatus: "verified",
    blockchainVerified: true,
    lastVerification: "2 minutes ago",
  })

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
        return <CheckCircle className="h-4 w-4 text-chart-4" />
      case "pending":
        return <Clock className="h-4 w-4 text-chart-2" />
      case "failed":
      case "disabled":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Identity Status Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{identityMetrics.trustScore}%</div>
            <Progress value={identityMetrics.trustScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Based on behavioral patterns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={getRiskColor(identityMetrics.riskLevel)}>{identityMetrics.riskLevel.toUpperCase()}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last assessed: {identityMetrics.lastVerification}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blockchain DID</CardTitle>
            <Key className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {identityMetrics.blockchainVerified ? (
                <CheckCircle className="h-5 w-5 text-chart-4" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              )}
              <span className="text-sm font-medium">{identityMetrics.blockchainVerified ? "Verified" : "Pending"}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Decentralized identity confirmed</p>
          </CardContent>
        </Card>
      </div>

      {/* Authentication Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Multi-Factor Authentication Status
          </CardTitle>
          <CardDescription>Continuous authentication and verification methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-chart-1" />
                <div>
                  <p className="font-medium">Mobile Authenticator</p>
                  <p className="text-sm text-muted-foreground">TOTP-based verification</p>
                </div>
              </div>
              {getStatusIcon(identityMetrics.mfaStatus)}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-chart-2" />
                <div>
                  <p className="font-medium">Biometric Scan</p>
                  <p className="text-sm text-muted-foreground">Fingerprint & facial recognition</p>
                </div>
              </div>
              {getStatusIcon(identityMetrics.biometricStatus)}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-chart-3" />
                <div>
                  <p className="font-medium">Behavioral Analysis</p>
                  <p className="text-sm text-muted-foreground">Keystroke & mouse patterns</p>
                </div>
              </div>
              <CheckCircle className="h-4 w-4 text-chart-4" />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-chart-5" />
                <div>
                  <p className="font-medium">Hardware Token</p>
                  <p className="text-sm text-muted-foreground">FIDO2/WebAuthn security key</p>
                </div>
              </div>
              <CheckCircle className="h-4 w-4 text-chart-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Context-Aware Risk Assessment</CardTitle>
            <CardDescription>Real-time risk factors and adaptive policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Location Risk</span>
                <Badge variant="default">Low</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Device Trust</span>
                <Badge variant="default">High</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Time-based Risk</span>
                <Badge variant="default">Normal</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Network Security</span>
                <Badge variant="secondary">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Smart Contract Verification</CardTitle>
            <CardDescription>Blockchain-based identity attestation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-chart-4 bg-chart-4/10">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Identity Contract Active</AlertTitle>
              <AlertDescription>
                Your decentralized identity is verified on the blockchain with hash: 0x7f9a...3b2c
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Contract Deployment</span>
                <span className="text-chart-4">Confirmed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Identity Attestations</span>
                <span className="font-mono">3/3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Block Update</span>
                <span className="font-mono">Block #18,234,567</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Re-verify Identity
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Key className="h-4 w-4" />
          Update DID Contract
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Fingerprint className="h-4 w-4" />
          Enroll New Biometric
        </Button>
      </div>
    </div>
  )
}
