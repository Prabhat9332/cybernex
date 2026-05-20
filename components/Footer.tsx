"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Shield, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-1.5Col">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="https://i.ibb.co/Q3wKkqsd/Chat-GPT-Image-May-19-2026-08-52-32-PM.png" alt="CyberNex Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              The premium, all-in-one cyber cafe & digital services platform. High-performance, locally processed PDF tools, AI services, passport photo creation, and instant government links.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Core Utilities</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools" className="hover:text-blue-400 hover:underline inline-flex items-center gap-1 transition-colors">
                  All Utility Tools <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/tools/image" className="hover:text-blue-400 hover:underline transition-colors">Image Compressor</Link>
              </li>
              <li>
                <Link href="/tools/image" className="hover:text-blue-400 hover:underline transition-colors">Background Remover</Link>
              </li>
              <li>
                <Link href="/govt-links" className="hover:text-blue-400 hover:underline transition-colors">Yojana & Govt Portal</Link>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Legal & Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/pricing" className="hover:text-blue-400 hover:underline transition-colors">Pricing & Plans</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400 hover:underline transition-colors">Help & FAQ</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 hover:underline transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 hover:underline transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Contact CyberNex</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href="mailto:support@cybernex.local" className="hover:text-white transition-colors">support@cybernex.local</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Station Road, Digital Plaza complex, Main Block, CG Central</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom line */}
        <div className="border-t border-slate-800 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {currentYear} CyberNex Inc. All rights reserved. Locally processed with client security.</p>
          <div className="flex gap-4">
             <Link href="/privacy" className="hover:text-white">Privacy</Link>
             <span>&middot;</span>
             <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
