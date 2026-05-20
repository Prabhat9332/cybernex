"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ExternalLink, ShieldCheck, Heart, User, Milestone, GraduationCap, FileBadge } from "lucide-react";
import { motion } from "motion/react";

const GOVT_LINKS = [
  {
    title: "UIDAI Aadhaar Hub",
    category: "Identity",
    desc: "Verify biometric link status, download print copies, and update residential address.",
    url: "https://uidai.gov.in",
    icon: User,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
  },
  {
    title: "UTI PAN Card Desk",
    category: "Identity",
    desc: "Submit request forms for new PAN, correcting spellings, and file linkages.",
    url: "https://www.pan.utiitsl.com",
    icon: FileBadge,
    color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
  },
  {
    title: "Voter Service Portal",
    category: "Identity",
    desc: "NVSP election card search in electoral rolls, register new EPIC numbers.",
    url: "https://voters.eci.gov.in",
    icon: Milestone,
    color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
  },
  {
    title: "RTPS Bihar Certificate",
    category: "Certificates",
    desc: "Online certificate drafting/fillings for Income (Aay), Caste (Jati), and Residence (Niwas).",
    url: "https://rtps.bihar.gov.in",
    icon: ShieldCheck,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20"
  },
  {
    title: "PM Kisan Samman Nidhi",
    category: "Schemes",
    desc: "Verify installment ledger sheets, complete pending e-KYC steps, and check balances.",
    url: "https://pmkisan.gov.in",
    icon: Heart,
    color: "text-red-500 bg-red-50 dark:bg-red-900/20"
  },
  {
    title: "NSP Scholarship Portal",
    category: "Education",
    desc: "Unified National Scholarship registrations, eligibility metrics and school trackings.",
    url: "https://scholarships.gov.in",
    icon: GraduationCap,
    color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20"
  }
];

export default function GovtLinksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Identity", "Certificates", "Schemes", "Education"];

  const filteredLinks = GOVT_LINKS.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          link.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || link.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 shrink-0">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="p-1 px-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold rounded-full text-xs">Portal Routing Hub</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
               Official Government Gateways
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
               Avoid scam mirrors. Instantly fetch authentic direct linkages for biometric updates, tax certificates, results, and beneficiary payments.
            </p>
          </div>

          {/* Search and filter rail */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white dark:bg-slate-900 p-4 border border-slate-200/50 dark:border-slate-800 rounded-2xl shadow-sm">
             
             {/* Search */}
             <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input 
                   type="text"
                   placeholder="Search Govt services (e.g. Aadhaar)..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white text-sm"
                />
             </div>

             {/* Categories */}
             <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categories.map(cat => (
                   <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                         selectedCategory === cat 
                           ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" 
                           : "bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}
                   >
                      {cat}
                   </button>
                ))}
             </div>

          </div>

          {/* Grid listing */}
          {filteredLinks.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLinks.map((link, idx) => (
                   <motion.a
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={link.title}
                      className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                   >
                      <div>
                         <div className={`w-11 h-11 ${link.color} rounded-2xl flex items-center justify-center shrink-0 mb-5`}>
                            <link.icon className="w-5 h-5" />
                         </div>
                         <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                               {link.title}
                            </h3>
                            <span className="text-[10px] uppercase font-extrabold tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-md">
                               {link.category}
                            </span>
                         </div>
                         <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                            {link.desc}
                         </p>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 mt-8">
                         <span>Go to Official Website</span>
                         <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                   </motion.a>
                ))}
             </div>
          ) : (
             <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-500 text-sm">No matching portals found for your search query. Try typing another term.</p>
             </div>
          )}

          {/* Secure disclaimer */}
          <div className="mt-16 bg-blue-50/50 dark:bg-blue-950/20 rounded-3xl p-6 border border-blue-100/60 dark:border-blue-900/40 text-center max-w-2xl mx-auto flex items-center justify-center gap-4">
            <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
            <p className="text-sm text-slate-700 dark:text-slate-300 text-left leading-relaxed">
               <strong>Safety warning:</strong> CyberNex only redirects to direct domains certified by government agencies. Always check the browser address bar lock icon when dealing with personal details.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
