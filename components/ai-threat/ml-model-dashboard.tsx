"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Brain,
  Cpu,
  Network,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Zap,
  BarChart3,
  Target,
  RefreshCw,
} from "lucide-react"

interface MLModelMetrics {
  isolationForest: {
    accuracy: number
    status: "active" | "training" | "offline"
    anomaliesDetected: number
    lastUpdate: string
  }
  autoencoder: {
    accuracy: number
    status: "active" | "training" | "offline"
    reconstructionError: number
    lastUpdate: string
  }
  graphNeuralNetwork: {
    accuracy: number
    status: "active" | "training" | "offline"
    networkAnomalies: number
    lastUpdate: string
  }
  reinforcementLearning: {
    policyVersion: string
    successRate: number
    adaptations: number
    lastUpdate: string
  }
}

export function MLModelDashboard() {
  const [modelMetrics] = useState<MLModelMetrics>({
    isolationForest: {
      accuracy: 94.2,
      status: "active",
      anomaliesDetected: 23,
      lastUpdate: "2 minutes ago",
    },
    autoencoder: {
      accuracy: 91.7,
      status: "active",
      reconstructionError: 0.034,
      lastUpdate: "5 minutes ago",
    },
    graphNeuralNetwork: {
      accuracy: 88.9,
      status: "training",
      networkAnomalies: 7,
      lastUpdate: "1 minute ago",
    },
    reinforcementLearning: {
      policyVersion: "v2.3.1",
      successRate: 96.4,
      adaptations: 142,
      lastUpdate: "30 seconds ago",
    },
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "training":
        return "secondary"
      case "offline":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-chart-4" />
      case "training":
        return <RefreshCw className="h-4 w-4 text-chart-2 animate-spin" />
      case "offline":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Model Status Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <Brain className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/4</div>
            <p className="text-xs text-muted-foreground">Models operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <Target className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.6%</div>
            <p className="text-xs text-muted-foreground">Across all models</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto Adaptations</CardTitle>
            <Zap className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Policy updates today</p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Model Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Isolation Forest Model
            </CardTitle>
            <CardDescription>Unsupervised anomaly detection for outlier identification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(modelMetrics.isolationForest.status)}
                <Badge variant={getStatusColor(modelMetrics.isolationForest.status)}>
                  {modelMetrics.isolationForest.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accuracy</span>
                <span className="font-mono">{modelMetrics.isolationForest.accuracy}%</span>
              </div>
              <Progress value={modelMetrics.isolationForest.accuracy} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Anomalies Detected</p>
                <p className="font-bold text-destructive">{modelMetrics.isolationForest.anomaliesDetected}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p className="font-mono text-xs">{modelMetrics.isolationForest.lastUpdate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Autoencoder Model
            </CardTitle>
            <CardDescription>Deep learning reconstruction for behavioral anomaly detection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(modelMetrics.autoencoder.status)}
                <Badge variant={getStatusColor(modelMetrics.autoencoder.status)}>
                  {modelMetrics.autoencoder.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accuracy</span>
                <span className="font-mono">{modelMetrics.autoencoder.accuracy}%</span>
              </div>
              <Progress value={modelMetrics.autoencoder.accuracy} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Reconstruction Error</p>
                <p className="font-mono">{modelMetrics.autoencoder.reconstructionError}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p className="font-mono text-xs">{modelMetrics.autoencoder.lastUpdate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Graph Neural Network
            </CardTitle>
            <CardDescription>Network topology analysis for lateral movement detection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(modelMetrics.graphNeuralNetwork.status)}
                <Badge variant={getStatusColor(modelMetrics.graphNeuralNetwork.status)}>
                  {modelMetrics.graphNeuralNetwork.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accuracy</span>
                <span className="font-mono">{modelMetrics.graphNeuralNetwork.accuracy}%</span>
              </div>
              <Progress value={modelMetrics.graphNeuralNetwork.accuracy} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Network Anomalies</p>
                <p className="font-bold text-secondary">{modelMetrics.graphNeuralNetwork.networkAnomalies}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p className="font-mono text-xs">{modelMetrics.graphNeuralNetwork.lastUpdate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Reinforcement Learning
            </CardTitle>
            <CardDescription>Adaptive defense policy optimization and evolution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Policy Version</span>
              <Badge variant="outline" className="font-mono">
                {modelMetrics.reinforcementLearning.policyVersion}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Success Rate</span>
                <span className="font-mono">{modelMetrics.reinforcementLearning.successRate}%</span>
              </div>
              <Progress value={modelMetrics.reinforcementLearning.successRate} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Adaptations</p>
                <p className="font-bold text-chart-2">{modelMetrics.reinforcementLearning.adaptations}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p className="font-mono text-xs">{modelMetrics.reinforcementLearning.lastUpdate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Training Status */}
      <Alert className="border-chart-2 bg-chart-2/10">
        <RefreshCw className="h-4 w-4" />
        <AlertTitle>Model Training in Progress</AlertTitle>
        <AlertDescription>
          Graph Neural Network is currently retraining on new network topology data. Expected completion in 12 minutes.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Retrain All Models
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Target className="h-4 w-4" />
          Tune Hyperparameters
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Zap className="h-4 w-4" />
          Deploy New Policy
        </Button>
      </div>
    </div>
  )
}
