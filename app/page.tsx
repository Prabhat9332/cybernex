"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Image as ImageIcon, 
  FileText, 
  Cpu,
  Smartphone,
  Lock,
  GlobeLock,
  WifiOff,
  Search,
  Scissors
} from "lucide-react";
import { motion } from "motion/react";
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#6C63FF]/5 blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#8B5CF6]/5 blur-[120px]" />
         <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-[#A855F7]/3 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 md:pt-52 md:pb-32 shrink-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex justify-center items-center gap-6 px-6 py-2.5 rounded-full bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-700/50 backdrop-blur-md shadow-sm mb-4"
            >
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300"><WifiOff className="w-3.5 h-3.5 text-[#6C63FF]"/> Works Offline</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300"><GlobeLock className="w-3.5 h-3.5 text-[#8B5CF6]"/> 100% Private</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></span>
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300"><Zap className="w-3.5 h-3.5 text-[#A855F7]"/> Fast Processing</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] min-h-[140px] sm:min-h-[160px]"
            >
              All Your Digital Tools <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#A855F7]">
                in One Place
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Fast, secure, privacy-focused tools that work directly in your browser. From PDF manipulation to image compression, done instantly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto w-full"
            >
              <div className="relative w-full max-w-md group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-slate-400 group-focus-within:text-[#6C63FF] transition-colors" />
                 </div>
                 <input 
                    type="text" 
                    placeholder="Search for tools... (e.g. PDF Merge)"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-white/60 dark:border-slate-700/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF] shadow-lg shadow-slate-200/20 dark:shadow-none transition-all outline-none font-medium text-slate-700 dark:text-slate-200"
                 />
                 <div className="absolute inset-y-2 right-2">
                    <button className="h-full px-4 rounded-xl bg-[#6C63FF] text-white text-sm font-bold shadow-md hover:bg-[#5b54e5] transition-colors">
                       Search
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories & Features Grid */}
      <section id="categories" className="py-20 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col sm:flex-row items-end justify-between mb-12">
              <div>
                 <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Tool Categories</h2>
                 <p className="text-slate-500 mt-2">Explore our wide range of tailored utilities.</p>
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { title: 'PDF Tools', icon: FileText, color: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20' },
                { title: 'Image Tools', icon: ImageIcon, color: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/20' },
                { title: 'AI Assistants', icon: Cpu, color: 'from-indigo-500 to-[#6C63FF]', shadow: 'shadow-indigo-500/20' },
                { title: 'Calculators', icon: Smartphone, color: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-500/20' },
              ].map((cat, i) => (
                <Link href="/tools" key={i} className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/50 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl">
                   <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} ${cat.shadow} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <cat.icon className="w-7 h-7 text-white" />
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                   <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-4 h-4" />
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-24 relative z-10 w-full">
         <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/20 backdrop-blur-3xl -skew-y-2 z-0 scale-y-110" />
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
           
           <div className="text-center mb-16">
             <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Most Popular Tools</h2>
             <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Lightning fast utilities that run entirely in your local browser environment.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Tool Card 1 */}
              <div className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 dark:border-slate-700/50 hover:border-[#6C63FF]/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(108,99,255,0.1)]">
                 <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                       <ImageIcon className="w-8 h-8 text-[#6C63FF]" />
                    </div>
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Image Compressor</h3>
                 <p className="text-slate-500 leading-relaxed mb-8">
                    Reduce JPG, PNG, and WebP file sizes instantly to precise KB limits. Perfect for government form uploads and fast web assets.
                 </p>
                 <Link href="/tools/image" className="absolute bottom-8 left-8 right-8 inline-flex items-center justify-center gap-2 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-[#6C63FF] hover:text-white text-slate-800 dark:text-slate-200 rounded-xl font-bold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#6C63FF]/25">
                    Open Tool <ArrowRight className="w-4 h-4" />
                 </Link>
                 {/* Padding to account for absolute button */}
                 <div className="h-14"></div>
              </div>

              {/* Tool Card 2 */}
              <div className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 dark:border-slate-700/50 hover:border-[#8B5CF6]/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)]">
                 <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                       <Scissors className="w-8 h-8 text-[#8B5CF6]" />
                    </div>
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Background Remover</h3>
                 <p className="text-slate-500 leading-relaxed mb-8">
                    Eliminate image backgrounds locally using efficient WebAI models. Crisp edges, no server uploads, fully secure.
                 </p>
                 <Link href="/tools/image" className="absolute bottom-8 left-8 right-8 inline-flex items-center justify-center gap-2 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-[#8B5CF6] hover:text-white text-slate-800 dark:text-slate-200 rounded-xl font-bold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#8B5CF6]/25">
                    Open Tool <ArrowRight className="w-4 h-4" />
                 </Link>
                 <div className="h-14"></div>
              </div>

              {/* Tool Card 3 */}
              <div className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 dark:border-slate-700/50 hover:border-[#A855F7]/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.1)]">
                 <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                       <FileText className="w-8 h-8 text-[#A855F7]" />
                    </div>
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">PDF Merge</h3>
                 <p className="text-slate-500 leading-relaxed mb-8">
                    Combine multiple PDF documents into a single file directly in your browser. Reorder pages intuitively.
                 </p>
                 <Link href="/tools/pdf" className="absolute bottom-8 left-8 right-8 inline-flex items-center justify-center gap-2 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-[#A855F7] hover:text-white text-slate-800 dark:text-slate-200 rounded-xl font-bold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#A855F7]/25">
                    Open Tool <ArrowRight className="w-4 h-4" />
                 </Link>
                 <div className="h-14"></div>
              </div>

           </div>
           
           <div className="mt-16 text-center">
             <Link href="/tools" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold bg-[#6C63FF] hover:bg-[#5b54e5] text-white rounded-2xl shadow-[0_8px_20px_rgba(108,99,255,0.3)] hover:-translate-y-0.5 transition-all">
                Browse All Utilities <ArrowRight className="w-5 h-5" />
             </Link>
           </div>
         </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative z-10 text-center">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-16">The CyberNex Difference</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               
               {[
                 { title: "100% Private", desc: "Files never leave your device. All computing is edge-local.", icon: ShieldCheck, color: "text-emerald-500" },
                 { title: "Super Fast", desc: "No queue times, no uploads. Operations run instantly.", icon: Zap, color: "text-[#6C63FF]" },
                 { title: "Works Offline", desc: "Load the app once, use it completely disconnected.", icon: WifiOff, color: "text-[#8B5CF6]" },
                 { title: "Free Tools", desc: "Core utilities are permanently free, no watermarks.", icon: GlobeLock, color: "text-[#A855F7]" },
               ].map((feature, i) => (
                 <div key={i} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/60 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className="mx-auto w-14 h-14 bg-white/80 dark:bg-slate-800 rounded-2xl shadow-sm border border-white dark:border-slate-700 flex items-center justify-center mb-6">
                       <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                 </div>
               ))}

            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
