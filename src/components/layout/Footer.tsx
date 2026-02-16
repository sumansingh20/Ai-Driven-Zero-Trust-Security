/**
 * Footer Component - IIT Patna Branding
 * CyberShield AI-Driven Security Platform
 * Developed by Suman Kumar at IIT Patna
 */

import Link from "next/link";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-bold">CyberShield</h3>
                <p className="text-sm text-slate-400">AI-Driven Security</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Advanced cybersecurity platform developed at IIT Patna, powered by artificial intelligence. 
              Research-oriented security solutions with cutting-edge threat detection and response capabilities.
            </p>
          </div>

          {/* Essential Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="text-sm text-slate-400 hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/support" className="text-sm text-slate-400 hover:text-white transition-colors">Support Center</Link></li>
              <li><Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-slate-400">contact@iitp.ac.in</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-slate-400">+917903835951</span>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                <span className="text-slate-400">IIT Patna, Bihta, Patna, Bihar 801106, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © 2025 CyberShield. All rights reserved. Developed by Suman Kumar at IIT Patna.
          </p>
          <p className="text-xs text-slate-500 mt-2 md:mt-0">
            🎓 Academic Research Project • Advanced AI-Driven Cybersecurity Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
