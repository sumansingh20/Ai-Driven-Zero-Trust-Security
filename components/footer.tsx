"use client"

import { ClientTime } from "@/components/client-time"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { 
  Shield, Globe, Mail, Phone, MapPin, ArrowRight, ExternalLink
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">CyberShield</h3>
                <p className="text-sm text-slate-400">AI-Driven Security</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Advanced cybersecurity platform developed at IIT Patna, powered by artificial intelligence. 
              Research-oriented security solutions with cutting-edge threat detection and response capabilities.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="text-slate-400 hover:text-white transition-colors">
                <ExternalLink className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-slate-400 hover:text-white transition-colors">
                <ExternalLink className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-slate-400 hover:text-white transition-colors">
                <ExternalLink className="h-5 w-5" />
              </Link>
              <Link href="https://cybershield.com" className="text-slate-400 hover:text-white transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/threat-intelligence" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Threat Intelligence
                </Link>
              </li>
              <li>
                <Link href="/network-infiltration" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Network Security
                </Link>
              </li>
              <li>
                <Link href="/identity/user-behavior-analytics" className="text-slate-400 hover:text-white transition-colors text-sm">
                  User Analytics
                </Link>
              </li>
              <li>
                <Link href="/pentest-arsenal" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Security Tools
                </Link>
              </li>
              <li>
                <Link href="/advanced-exploitation" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Vulnerability Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/documentation" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api-reference" className="text-slate-400 hover:text-white transition-colors text-sm">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/security-blog" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Security Blog
                </Link>
              </li>
              <li>
                <Link href="/research-papers" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Mail className="h-4 w-4" />
                <span>contact@iitp.ac.in</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Phone className="h-4 w-4" />
                <span>+917903835951</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4" />
                <span>IIT Patna, Bihta, Patna, Bihar 801106, India</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Subscribe to security updates</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 flex-1"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-slate-400">
              &copy; 2025 CyberShield. All rights reserved. | Developed by Suman Kumar at IIT Patna
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-slate-400">AI-Powered Protection</span>
            </div>
          </div>
        </div>

        {/* Security Status Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400">All Systems Operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-slate-400">High Availability</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-slate-400">AI Models Active</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span>Last updated: <ClientTime format="date" /></span>
              <span>•</span>
              <span>Version 2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
