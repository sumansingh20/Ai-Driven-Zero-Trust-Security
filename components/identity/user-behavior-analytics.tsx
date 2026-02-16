"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TrendingUp, Clock, MapPin, Monitor, CheckCircle, Activity, MousePointer, Keyboard } from "lucide-react"

interface BehaviorMetrics {
  keystrokePattern: number
  mouseMovement: number
  loginTiming: number
  locationConsistency: number
  deviceFingerprint: number
  anomalyScore: number
}

export function UserBehaviorAnalytics() {
  const [behaviorMetrics] = useState<BehaviorMetrics>({
    keystrokePattern: 94,
    mouseMovement: 87,
    loginTiming: 92,
    locationConsistency: 98,
    deviceFingerprint: 96,
    anomalyScore: 12,
  })

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-chart-4"
    if (score >= 70) return "text-chart-2"
    return "text-destructive"
  }

  const getAnomalyLevel = (score: number) => {
    if (score <= 20) return { level: "Low", variant: "default" as const }
    if (score <= 50) return { level: "Medium", variant: "secondary" as const }
    return { level: "High", variant: "destructive" as const }
  }

  const anomalyLevel = getAnomalyLevel(behaviorMetrics.anomalyScore)

  return (
    <div className="space-y-6">
      {/* Behavior Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Behavior Score</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (behaviorMetrics.keystrokePattern + behaviorMetrics.mouseMovement + behaviorMetrics.loginTiming) / 3,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Composite behavioral match</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anomaly Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{behaviorMetrics.anomalyScore}%</span>
              <Badge variant={anomalyLevel.variant}>{anomalyLevel.level}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Deviation from baseline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Level</CardTitle>
            <CheckCircle className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">Trusted</div>
            <p className="text-xs text-muted-foreground">Based on ML analysis</p>
          </CardContent>
        </Card>
      </div>

      {/* Behavioral Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="h-5 w-5" />
            Behavioral Pattern Analysis
          </CardTitle>
          <CardDescription>Real-time analysis of user interaction patterns for anomaly detection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Keyboard className="h-4 w-4" />
                    Keystroke Dynamics
                  </span>
                  <span className={getScoreColor(behaviorMetrics.keystrokePattern)}>
                    {behaviorMetrics.keystrokePattern}%
                  </span>
                </div>
                <Progress value={behaviorMetrics.keystrokePattern} className="h-2" />
                <p className="text-xs text-muted-foreground">Typing rhythm and dwell time patterns</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4" />
                    Mouse Movement
                  </span>
                  <span className={getScoreColor(behaviorMetrics.mouseMovement)}>{behaviorMetrics.mouseMovement}%</span>
                </div>
                <Progress value={behaviorMetrics.mouseMovement} className="h-2" />
                <p className="text-xs text-muted-foreground">Cursor trajectory and click patterns</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Login Timing
                  </span>
                  <span className={getScoreColor(behaviorMetrics.loginTiming)}>{behaviorMetrics.loginTiming}%</span>
                </div>
                <Progress value={behaviorMetrics.loginTiming} className="h-2" />
                <p className="text-xs text-muted-foreground">Access time patterns and frequency</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location Consistency
                  </span>
                  <span className={getScoreColor(behaviorMetrics.locationConsistency)}>
                    {behaviorMetrics.locationConsistency}%
                  </span>
                </div>
                <Progress value={behaviorMetrics.locationConsistency} className="h-2" />
                <p className="text-xs text-muted-foreground">Geographic access patterns</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Device Fingerprint
                  </span>
                  <span className={getScoreColor(behaviorMetrics.deviceFingerprint)}>
                    {behaviorMetrics.deviceFingerprint}%
                  </span>
                </div>
                <Progress value={behaviorMetrics.deviceFingerprint} className="h-2" />
                <p className="text-xs text-muted-foreground">Hardware and software characteristics</p>
              </div>

              <Alert className="border-chart-1 bg-chart-1/10">
                <Activity className="h-4 w-4" />
                <AlertTitle>ML Model Status</AlertTitle>
                <AlertDescription>Behavioral baseline updated 15 minutes ago. Model confidence: 94.2%</AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Anomalies */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Behavioral Anomalies</CardTitle>
          <CardDescription>Detected deviations from established patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Unusual login time detected</p>
                <p className="text-xs text-muted-foreground">Access at 3:47 AM - outside normal hours (9 AM - 6 PM)</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Medium</Badge>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Keystroke pattern deviation</p>
                <p className="text-xs text-muted-foreground">15% slower typing speed than baseline average</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Low</Badge>
                <span className="text-xs text-muted-foreground">4h ago</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">New device fingerprint</p>
                <p className="text-xs text-muted-foreground">Browser update changed device characteristics</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Info</Badge>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
