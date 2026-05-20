"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown, CheckCircle, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const FAQ_SECTIONS = [
  {
    title: "Security & Technology",
    items: [
      {
        q: "Do you store my files on your servers?",
        a: "Absolutely not! CyberNex uses high performance WASM technology to process all images, background removal, and PDF merging entirely inside your browser's local sandbox memory space. Your critical files never touch our servers."
      },
      {
        q: "Do I need to install any software to compile passport sheets?",
        a: "No installation is required. Everything runs directly on standard mobile and desktop web browsers. High-contrast templates are computed inside the client sandbox."
      }
    ]
  },
  {
    title: "Billing & Accounts",
    items: [
      {
        q: "How can I upgrade or downgrade my membership?",
        a: "Simply log in to your account, click on the Dashboard, navigate to 'Membership Settings', and select your preferred level. Standard downgrades take effect at the end of your billing cycle."
      },
      {
        q: "What payment channels are supported?",
        a: "We support Stripe, PayPal, standard UPI, NetBanking and central CC gates securely."
      }
    ]
  }
];

export default function FAQPage() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (q: string) => {
    setActiveItem(activeItem === q ? null : q);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-20 md:py-24 relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 space-y-3">
              <span className="p-1 px-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold rounded-full text-xs">Help Hub</span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Have questions about CyberNex? Find resolutions instantly below.
              </p>
            </div>

            <div className="space-y-10">
              {FAQ_SECTIONS.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 px-1">{section.title}</h3>
                  <div className="space-y-3">
                    {section.items.map((item, iIdx) => (
                      <div key={iIdx} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-1.5 transition-all">
                        <button
                          onClick={() => toggleItem(item.q)}
                          className="w-full text-left px-5 py-3.5 flex items-center justify-between font-bold text-slate-800 dark:text-white"
                        >
                          <span className="flex items-center gap-3">
                             <HelpCircle className="w-5 h-5 text-slate-400 shrink-0" />
                             {item.q}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${activeItem === item.q ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeItem === item.q && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-4 pt-1.5 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850 leading-relaxed">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Support section */}
            <div className="mt-16 text-center bg-white dark:bg-slate-900 border border-slate-200/65 dark:border-slate-800 p-8 rounded-3xl">
              <h3 className="text-xl font-bold">Still have doubts?</h3>
              <p className="text-sm text-slate-500 mt-2 mb-6">Our dedicated help desk is open 24/7 to resolve technical queries.</p>
              <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow shadow-blue-500/10">
                 Contact support
              </Link>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
