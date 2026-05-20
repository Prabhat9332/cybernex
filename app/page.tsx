"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  FileText, 
  Scissors, 
  Image as ImageIcon, 
  Wand2, 
  ChevronDown, 
  CheckCircle, 
  Star,
  ExternalLink,
  HelpCircle,
  Clock,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Typewriter } from 'react-simple-typewriter';

const FAQ_ITEMS = [
  {
    q: "How secure are my uploaded files on CyberNex?",
    a: "Your files never leave your browser! All core operations on CyberNex, such as image compression, background removal, and PDF merging, run 100% locally on your device via client-side WebAssembly and JavaScript. No remote storage or server uploads are required for operations, ensuring maximum privacy."
  },
  {
    q: "How to create passport-size photos with print templates?",
    a: "Simple! Navigate to our Passport Photo Maker under the Tools page, upload any portrait, adjust the crop to passport specifications, clear the background in one click, and download an aligned grid (e.g., 35x45mm dimensions on an A4 layout block) completely ready for instant printing."
  },
  {
    q: "What benefits does the Pro Membership provide?",
    a: "The Pro Plan unlocks access to advanced AI-powered tools (including Gemini-powered document drafting, high-fidelity translation tools, and offline OCR scanners), removes execution limit gates, enables ultra-high quality image rendering, and provides premium email assistance."
  },
  {
    q: "Are the government links authentic?",
    a: "Yes! The Government Links catalog references official state and central websites directly (like UIDAI, PM Kisan Portal, and RTPS). We provide a unified routing hub to help cyber cafes and individuals locate correct application gateways without falling prey to phishing mirrors."
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 shrink-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[10%] left-[5%] w-[35%] h-[35%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> All-In-One Cyber Cafe Hub
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight leading-tight min-h-[120px] sm:min-h-0"
            >
              <Typewriter
                words={['Digital Services at', 'Next-Gen Tools at', 'Cyber Cafe Hub at']}
                loop={true}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
              <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 sm:ml-2">
                Your Fingertips
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400"
            >
              Locally-processed tools for lightning-quick PDF editing, automated passport photo alignment, seamless government links, and document translation. Zero server uploads. Complete privacy.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link 
                href="/tools" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
              >
                Explore Utility Tools <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/auth/register" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900/50 rounded-2xl transition-all"
              >
                <UserCheck className="w-5 h-5" /> Register Account
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-20 border-t border-slate-100 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/20 relative z-10 shrink-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Popular Digital Tools</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">Most accessed utilities by Cyber users daily.</p>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              View all tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group relative">
               <span className="absolute top-4 right-4 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 text-xs px-2.5 py-1 rounded-full font-bold">Free</span>
               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6" />
               </div>
               <h3 className="text-lg font-bold">Image Compressor</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 mb-6">
                 Compress JPEG, PNG & WebP images completely offline. Reduce weight below KB constraints for form uploads.
               </p>
               <Link href="/tools/image" className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800/80 rounded-xl text-sm font-semibold transition-colors">
                 Open Compressor <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group relative">
               <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold">Free</span>
               <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <Scissors className="w-6 h-6" />
               </div>
               <h3 className="text-lg font-bold">Background Remover</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 mb-6">
                 Eliminate photo backgrounds locally in your browser. Powered by Client AI, fast, crisp, completely secure.
               </p>
               <Link href="/tools/image" className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800/80 rounded-xl text-sm font-semibold transition-colors">
                 Remove BG <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group relative">
               <span className="absolute top-4 right-4 bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 text-xs px-2.5 py-1 rounded-full font-bold text-center">Pro</span>
               <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                  <Wand2 className="w-6 h-6" />
               </div>
               <h3 className="text-lg font-bold">AI Document Drafts</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 mb-6">
                 Draft official request letters, standard complaints, legal summaries and resumes securely with integrated models.
               </p>
               <Link href="/tools" className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800/80 rounded-xl text-sm font-semibold transition-colors">
                 Try AI Drafting <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Govt & Yojana */}
      <section className="py-20 border-t border-slate-100 dark:border-slate-800/80 relative z-10 shrink-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight">Direct Government Portal Quicklinks</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">Authentic links to central & state yojana facilities.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-blue-500 transition-colors group">
               <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Aadhaar Services</h4>
                  <p className="text-xs text-slate-500 mt-1">Verify, download Aadhaar card or find update centers.</p>
               </div>
               <div className="flex items-center justify-between mt-6 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Visit official portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
               </div>
             </a>

             <a href="https://www.pan.utiitsl.com" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-blue-500 transition-colors group">
               <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">UTI PAN Portal</h4>
                  <p className="text-xs text-slate-500 mt-1">Apply for new PAN card, check status, or corrections.</p>
               </div>
               <div className="flex items-center justify-between mt-6 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>UTIITS PAN Desk</span>
                  <ExternalLink className="w-3.5 h-3.5" />
               </div>
             </a>

             <a href="https://rtps.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-blue-500 transition-colors group">
               <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Bihar RTPS Service</h4>
                  <p className="text-xs text-slate-500 mt-1">Apply for Residence, Income, and Caste certificates.</p>
               </div>
               <div className="flex items-center justify-between mt-6 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Go to RTPS Bihar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
               </div>
             </a>

             <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-blue-500 transition-colors group">
               <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">PM Kisan Yojana</h4>
                  <p className="text-xs text-slate-500 mt-1">Check farmer benefit status, installment plans, e-KYC.</p>
               </div>
               <div className="flex items-center justify-between mt-6 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Kisan Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
               </div>
             </a>
          </div>

          <div className="mt-8 text-center">
            <Link href="/govt-links" className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-xs font-bold px-4 py-2 rounded-xl transition-colors">
               Explore Govt Links directory <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 border-t border-slate-100 dark:border-slate-800/80 bg-slate-100/40 dark:bg-slate-900/10 relative z-10 shrink-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight">Simple Membership Plans</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">Flexible options curated for cyber cafe executives and individuals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             
             {/* Free Plan */}
             <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative shadow-sm">
                <div>
                   <h3 className="text-xl font-bold">Standard Free Plan</h3>
                   <p className="text-slate-500 text-sm mt-1">Essential tools for daily offline usage</p>
                   
                   <div className="my-6">
                      <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                      <span className="text-slate-500 text-sm ml-1">/ lifetime</span>
                   </div>

                   <hr className="border-slate-100 dark:border-slate-800 my-6" />

                   <ul className="space-y-3.5 text-sm">
                      <li className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                         <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                         Image Compressor down to KB constraints
                      </li>
                      <li className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                         <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                         Basic Passport Photo align templates
                      </li>
                      <li className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                         <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                         Unified government desk portals routing
                      </li>
                   </ul>
                </div>

                <Link href="/auth/register" className="w-full text-center py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-bold rounded-2xl text-sm transition-all mt-8">
                   Get Started Free
                </Link>
             </div>

             {/* Pro Plan */}
             <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-blue-500/60 dark:border-blue-500/40 flex flex-col justify-between relative shadow-md shadow-blue-500/5">
                <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                   <Star className="w-3 h-3 fill-current" /> Recommended
                </span>
                
                <div>
                   <h3 className="text-xl font-bold">Pro Cafe Premium</h3>
                   <p className="text-slate-500 text-sm mt-1">Advanced tools & unlimited processing power</p>
                   
                   <div className="my-6 flex items-baseline">
                      <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$15</span>
                      <span className="text-slate-500 text-sm ml-1">/ month</span>
                   </div>

                   <hr className="border-slate-100 dark:border-slate-800 my-6" />

                   <ul className="space-y-3.5 text-sm">
                      <li className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                         <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                         Double-speed background removal processing
                      </li>
                      <li className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                         <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                         AI official Request Letter & Resume Drafting
                      </li>
                      <li className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                         <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                         Premium template layouts, customized A4 grid scales
                      </li>
                      <li className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                         <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                         Priority email & digital portal chat support
                      </li>
                   </ul>
                </div>

                <Link href="/pricing" className="w-full text-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-sm shadow-md transition-all mt-8">
                   Go Pro Today
                </Link>
             </div>

          </div>
        </div>
      </section>

      {/* Accordion FAQ */}
      <section className="py-20 border-t border-slate-100 dark:border-slate-800/80 relative z-10 shrink-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">Locate solutions rapidly. Find the answer to everything.</p>
          </div>

          <div className="space-y-3.5">
             {FAQ_ITEMS.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-2xl transition-all">
                   <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-slate-900 dark:text-white"
                   >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                   </button>
                   <AnimatePresence>
                      {activeFaq === idx && (
                         <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                         >
                            <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-50 dark:border-slate-800 leading-relaxed">
                               {faq.a}
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
