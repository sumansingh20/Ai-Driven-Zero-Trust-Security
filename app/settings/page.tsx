"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Monitor, 
  Database,
  AlertTriangle,
  CheckCircle,
  Save,
  RefreshCw
} from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    security: true,
    updates: true
  })

  const [apiSettings, setApiSettings] = useState({
    rateLimit: "1000",
    timeout: "30",
    retries: "3"
  })

  const [darkMode, setDarkMode] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">System Settings</h1>
              <p className="text-slate-400">Configure your security platform preferences</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger value="general" className="data-[state=active]:bg-blue-600">
              <Monitor className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-blue-600">
              <Database className="h-4 w-4 mr-2" />
              API
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-blue-600">
              <Settings className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  General Preferences
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your basic platform settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-white">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-white">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="cet">Central European Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Dark Mode</Label>
                    <p className="text-sm text-slate-400">Use dark theme across the platform</p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Auto-save Changes</Label>
                    <p className="text-sm text-slate-400">Automatically save configuration changes</p>
                  </div>
                  <Switch
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Configuration
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure security policies and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-yellow-500 bg-yellow-500/10">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-200">
                    Changes to security settings will require administrator approval.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout" className="text-white">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      defaultValue="30"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts" className="text-white">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      defaultValue="5"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-sm text-slate-400">Require 2FA for all admin actions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">IP Whitelist</Label>
                      <p className="text-sm text-slate-400">Only allow access from approved IPs</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Audit Logging</Label>
                      <p className="text-sm text-slate-400">Log all system access and changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Choose how you want to receive alerts and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-slate-400">Receive alerts via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, email: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Push Notifications</Label>
                      <p className="text-sm text-slate-400">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, push: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Security Alerts</Label>
                      <p className="text-sm text-slate-400">Critical security notifications</p>
                    </div>
                    <Switch
                      checked={notifications.security}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, security: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">System Updates</Label>
                      <p className="text-sm text-slate-400">Platform updates and maintenance</p>
                    </div>
                    <Switch
                      checked={notifications.updates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, updates: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-2">
                  <Label htmlFor="emailAddress" className="text-white">Email Address</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    defaultValue="admin@cybershield.com"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  API Configuration
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure API access and rate limiting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rateLimit" className="text-white">Rate Limit (req/hour)</Label>
                    <Input
                      id="rateLimit"
                      value={apiSettings.rateLimit}
                      onChange={(e) => setApiSettings(prev => ({ ...prev, rateLimit: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeout" className="text-white">Timeout (seconds)</Label>
                    <Input
                      id="timeout"
                      value={apiSettings.timeout}
                      onChange={(e) => setApiSettings(prev => ({ ...prev, timeout: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retries" className="text-white">Max Retries</Label>
                    <Input
                      id="retries"
                      value={apiSettings.retries}
                      onChange={(e) => setApiSettings(prev => ({ ...prev, retries: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-white">API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="apiKey"
                      type="password"
                      defaultValue="sk-1234567890abcdef"
                      className="bg-slate-700 border-slate-600 text-white"
                      readOnly
                    />
                    <Button variant="outline" size="icon" className="border-slate-600">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400">This key provides access to all API endpoints</p>
                </div>

                <Alert className="border-blue-500 bg-blue-500/10">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-200">
                    API is currently operational. Last check: 2 minutes ago
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Advanced Configuration
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Advanced system configuration and debugging options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-red-500 bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200">
                    Advanced settings can affect system performance. Proceed with caution.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Debug Mode</Label>
                      <p className="text-sm text-slate-400">Enable detailed logging and error reporting</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Performance Monitoring</Label>
                      <p className="text-sm text-slate-400">Track system performance metrics</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Beta Features</Label>
                      <p className="text-sm text-slate-400">Enable experimental features</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customConfig" className="text-white">Custom Configuration</Label>
                  <Textarea
                    id="customConfig"
                    placeholder="Enter JSON configuration..."
                    className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                  />
                  <p className="text-xs text-slate-400">Advanced users can input custom JSON configuration</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            Reset to Defaults
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
