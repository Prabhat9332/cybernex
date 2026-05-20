"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Shield, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/40 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6C63FF]/30 to-transparent"></div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Description */}
          <div className="space-y-6 md:col-span-1.5Col">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <img src="https://i.ibb.co/Q3wKkqsd/Chat-GPT-Image-May-19-2026-08-52-32-PM.png" alt="CyberNex Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              The premium, all-in-one cyber utility platform. High-performance, locally processed PDF tools, AI services, passport photo creation, and instant government links.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Core Utilities</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/tools" className="text-slate-500 hover:text-[#6C63FF] transition-colors inline-flex items-center gap-1.5 font-medium">
                  All Utility Tools <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/tools/image" className="text-slate-500 hover:text-[#6C63FF] font-medium transition-colors">Image Compressor</Link>
              </li>
              <li>
                <Link href="/tools/image" className="text-slate-500 hover:text-[#6C63FF] font-medium transition-colors">Background Remover</Link>
              </li>
              <li>
                <Link href="/govt-links" className="text-slate-500 hover:text-[#6C63FF] font-medium transition-colors">Yojana & Govt Portal</Link>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Legal & Support</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/pricing" className="text-slate-500 hover:text-[#6C63FF] font-medium transition-colors">Pricing & Plans</Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-500 hover:text-[#6C63FF] font-medium transition-colors">Help & FAQ</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-500 hover:text-[#6C63FF] font-medium transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-500 hover:text-[#6C63FF] font-medium transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-center gap-3 hover:text-[#6C63FF] transition-colors">
                <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-800 border border-white/40 dark:border-slate-700">
                   <Mail className="w-4 h-4 text-[#6C63FF]" />
                </div>
                <a href="mailto:support@cybernex.local" className="font-medium">support@cybernex.local</a>
              </li>
              <li className="flex items-center gap-3 hover:text-[#6C63FF] transition-colors">
                <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-800 border border-white/40 dark:border-slate-700">
                   <Phone className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <a href="tel:+919876543210" className="font-medium">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-800 border border-white/40 dark:border-slate-700 shrink-0 mt-0.5">
                   <MapPin className="w-4 h-4 text-[#A855F7]" />
                </div>
                <span className="font-medium leading-relaxed">Tech Park, Digital Avenue, Block B, Innovation City</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom line */}
        <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
          <p>&copy; {currentYear} CyberNex Inc. All rights reserved.</p>
          <div className="flex gap-6">
             <Link href="/privacy" className="hover:text-[#6C63FF] transition-colors">Privacy</Link>
             <Link href="/terms" className="hover:text-[#6C63FF] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
