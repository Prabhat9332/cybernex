"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Shield, Sparkles, HelpCircle, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-20 md:py-28 relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[5%] right-[5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
            <div className="absolute bottom-[10%] left-[5%] w-[35%] h-[35%] rounded-full bg-indigo-500/5 blur-[110px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 text-xs font-bold uppercase tracking-wider">
                Simple, transparent plans
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                Choose Your Level of Service
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                CyberNex scales to meet your requirements. Perfect for casual visitors and professional cyber hubs alike.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Free Plan */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative shadow-sm"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free Essentials</h3>
                  <p className="text-slate-500 text-sm mt-1">Fundamental tools running completely locally</p>
                  
                  <div className="my-6">
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$0</span>
                    <span className="text-slate-500 text-sm ml-1.5">/ forever</span>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-800 my-6" />

                  <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      Client-side Image Compressor down to KB
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      A4 passport size layout sheet alignment
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      Access direct Government portal portals index
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      Merge client-side PDF documents (up to 3 files)
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link href="/auth/register" className="block text-center w-full py-3.5 border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 font-bold rounded-2xl text-sm transition-all text-slate-800 dark:text-slate-200">
                    Get Started Free
                  </Link>
                </div>
              </motion.div>

              {/* Pro Plan */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-blue-500/60 dark:border-blue-500/40 flex flex-col justify-between relative shadow-lg shadow-blue-500/5"
              >
                <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm shadow-blue-500/15">
                  <Sparkles className="w-3.5 h-3.5 fill-current" /> Most Popular
                </span>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro Hub Premium</h3>
                  <p className="text-slate-500 text-sm mt-1">Unlimited power curated for professional executives</p>
                  
                  <div className="my-6">
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$15</span>
                    <span className="text-slate-500 text-sm ml-1.5">/ month</span>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-800 my-6" />

                  <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                      Unlimited double-speed background removal processing
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                      AI Request Letter & Resume composition drafting
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                      Dynamic watermark overlays & Custom A4 print templates
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                      High frequency Optical Character Recognition (OCR) 
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                      Premium email helper & VIP live platform assistance
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link href="/auth/register?plan=pro" className="block text-center w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-sm shadow-md transition-all">
                    Upgrade to Pro Now
                  </Link>
                </div>
              </motion.div>

            </div>

            {/* Satisfaction Card */}
            <div className="mt-16 bg-blue-50/50 dark:bg-blue-950/20 rounded-3xl p-6 border border-blue-100/60 dark:border-blue-900/40 text-center max-w-2xl mx-auto flex items-center justify-center gap-4">
              <Shield className="w-8 h-8 text-blue-600 shrink-0" />
              <p className="text-sm text-slate-700 dark:text-slate-300 text-left leading-relaxed">
                <strong>Zero-risk trial guarantee:</strong> Safe operations are guaranteed. Because all heavy file operations handle entirely locally in your web browser, file privacy remains absolute.
              </p>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
