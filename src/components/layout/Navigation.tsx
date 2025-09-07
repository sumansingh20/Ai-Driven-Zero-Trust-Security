"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Shield,
  Home,
  Activity,
  Brain,
  Search,
  Users,
  Settings,
  Bell,
  Menu,
  LogOut,
  User,
  Moon,
  Sun,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface UserInfo {
  id: number;
  email: string;
  name: string;
  role: string;
  department: string;
}

const navigationItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Threat Intel", href: "/threat-intelligence", icon: Brain },
  { name: "Network", href: "/network-infiltration", icon: Activity },
  { name: "Analytics", href: "/identity/user-behavior-analytics", icon: Users },
  { name: "Tools", href: "/pentest-arsenal", icon: Search },
]

const moreItems = [
  { name: "Zero Trust", href: "/zero-trust", icon: Shield },
  { name: "Dark Web", href: "/dark-web", icon: Activity },
  { name: "SOAR", href: "/soar", icon: Brain },
  { name: "Threat Hunting", href: "/threat-hunting", icon: Search },
  { name: "Vulnerability", href: "/vulnerability", icon: Activity },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  const [user, setUser] = useState<UserInfo | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo))
      } catch (error) {
        console.error('Error parsing user info:', error)
      }
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Clear cookie
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    
    // Redirect to signin page
    window.location.href = "/signin";
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/80 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-200">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  CyberShield
                </h1>
                <p className="text-xs text-slate-400 font-medium">AI-Driven Security</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 ${
                      isActive ? "bg-blue-600/20 text-blue-400 border border-blue-600/30" : ""
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
            
            {/* More Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  More
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-slate-800/95 backdrop-blur border-slate-700">
                <DropdownMenuLabel className="text-slate-300">Security Tools</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild className="text-slate-300 hover:bg-slate-700 cursor-pointer">
                    <Link href={item.href} className="flex items-center">
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="flex items-center space-x-1.5">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">All Systems Operational</span>
              </div>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800/50 relative transition-all duration-200">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-slate-800/95 backdrop-blur border-slate-700 shadow-xl">
                <DropdownMenuLabel className="text-white flex items-center justify-between">
                  <span>Notifications</span>
                  <Badge variant="destructive" className="text-xs">3 New</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <div className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 cursor-pointer p-3">
                    <div className="flex items-start space-x-3 w-full">
                      <div className="p-1.5 bg-red-500 rounded-full mt-0.5 shadow-lg">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">Critical Security Alert</p>
                        <p className="text-xs text-slate-400 leading-relaxed">Suspicious activity detected on network segment 192.168.1.0/24</p>
                        <p className="text-xs text-slate-500 mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 cursor-pointer p-3">
                    <div className="flex items-start space-x-3 w-full">
                      <div className="p-1.5 bg-yellow-500 rounded-full mt-0.5 shadow-lg">
                        <Activity className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">System Update Complete</p>
                        <p className="text-xs text-slate-400 leading-relaxed">Security patches installed successfully</p>
                        <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 cursor-pointer p-3">
                    <div className="flex items-start space-x-3 w-full">
                      <div className="p-1.5 bg-blue-500 rounded-full mt-0.5 shadow-lg">
                        <Users className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">New User Registration</p>
                        <p className="text-xs text-slate-400 leading-relaxed">john.doe@company.com joined the platform</p>
                        <p className="text-xs text-slate-500 mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="text-center text-blue-400 hover:bg-slate-700/50 cursor-pointer font-medium">
                  View all notifications →
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 px-3">
                  <Avatar className="h-8 w-8 mr-2 ring-2 ring-slate-700">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium">{user ? user.name.split(' ')[0] : 'User'}</span>
                    <span className="text-xs text-slate-400">{user ? user.role : 'Analyst'}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-slate-800/95 backdrop-blur border-slate-700 shadow-xl">
                <DropdownMenuLabel className="text-white">
                  <div className="flex items-center space-x-3 p-2">
                    <Avatar className="h-12 w-12 ring-2 ring-blue-500/20">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium">
                        {user ? getInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-white">{user ? user.name : 'User'}</p>
                      <p className="text-xs text-slate-400">{user ? user.email : 'user@cybershield.com'}</p>
                      {user && (
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                            {user.role}
                          </Badge>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-400">{user.department}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
                  <Link href="/profile" className="flex items-center py-2">
                    <User className="h-4 w-4 mr-3" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
                  <Link href="/settings" className="flex items-center py-2">
                    <Settings className="h-4 w-4 mr-3" />
                    Preferences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-900/20 cursor-pointer py-2" onClick={handleLogout}>
                  <div className="flex items-center w-full">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900/95 backdrop-blur border-slate-700 w-80">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-white flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <span>CyberShield</span>
                  </SheetTitle>
                  <SheetDescription className="text-slate-400">
                    AI-Driven Security Platform
                  </SheetDescription>
                </SheetHeader>
                
                {/* User Info */}
                <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 ring-2 ring-blue-500/20">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium">
                        {user ? getInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">{user ? user.name : 'User'}</p>
                      <p className="text-xs text-slate-400">{user ? user.email : 'user@cybershield.com'}</p>
                      {user && (
                        <Badge variant="outline" className="mt-1 text-xs border-blue-500/30 text-blue-400">
                          {user.role}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="mt-6 space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Main Navigation</h4>
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                            : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                {/* More Tools */}
                <div className="mt-6 space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Security Tools</h4>
                  {moreItems.slice(0, 4).map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-600/20 text-blue-400"
                            : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                {/* Footer Actions */}
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Theme</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleTheme}
                      className="text-slate-400 hover:text-white h-8 px-2"
                    >
                      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full text-red-400 border-red-400/30 hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
