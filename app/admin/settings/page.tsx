"use client";

import { useState } from "react";
import { Save, Globe, Shield, HardDrive, Layout, Key, Server, ToggleLeft, ToggleRight } from "lucide-react";
import { motion } from "motion/react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "pwa", label: "PWA Settings", icon: HardDrive },
    { id: "security", label: "Security", icon: Shield },
    { id: "api", label: "API Keys", icon: Key },
    { id: "system", label: "System", icon: Server },
  ];

  const handleSave = () => {
     setSaving(true);
     setTimeout(() => setSaving(false), 1000);
  }

  // Toggle component
  const Switch = ({ enabled }: { enabled: boolean }) => (
    <div className={`w-11 h-6 rounded-full flex items-center transition-colors cursor-pointer px-1 ${enabled ? 'bg-emerald-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'}`}>
      <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-sm" />
    </div>
  );

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Configure global platform options.</p>
        </div>
        
        <button 
           onClick={handleSave}
           disabled={saving}
           className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-blue-200 disabled:opacity-75 disabled:cursor-wait"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left text-sm font-medium ${
                 activeTab === tab.id 
                  ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'
               }`}
             >
                <tab.icon className="w-5 h-5" /> {tab.label}
             </button>
          ))}
        </div>

        {/* Content Pane */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
           
           {activeTab === "general" && (
             <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-500" /> General Settings</h2>
                
                <div className="space-y-4 max-w-xl">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform Name</label>
                      <input type="text" defaultValue="CyberNex" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                   </div>
                   
                   <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Support Email</label>
                      <input type="email" defaultValue="support@cybernex.local" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                   </div>

                   <hr className="border-slate-100 dark:border-slate-800 my-6" />

                   <div className="flex items-center justify-between">
                      <div>
                         <p className="font-medium text-slate-900 dark:text-white">Maintenance Mode</p>
                         <p className="text-sm text-slate-500">Temporarily disable access for non-admins</p>
                      </div>
                      <Switch enabled={false} />
                   </div>
                   
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="font-medium text-slate-900 dark:text-white">Allow Public Registration</p>
                         <p className="text-sm text-slate-500">Users can create new accounts</p>
                      </div>
                      <Switch enabled={true} />
                   </div>
                </div>
             </div>
           )}

           {activeTab === "security" && (
             <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /> Security Policies</h2>
                
                <div className="space-y-4 max-w-xl">
                   <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div>
                         <p className="font-medium text-slate-900 dark:text-white">Strict Rate Limiting</p>
                         <p className="text-sm text-slate-500">Block IPs after 50 requests/min</p>
                      </div>
                      <Switch enabled={true} />
                   </div>
                   
                   <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div>
                         <p className="font-medium text-slate-900 dark:text-white">Require Email Verification</p>
                         <p className="text-sm text-slate-500">Users must verify email before using tools</p>
                      </div>
                      <Switch enabled={false} />
                   </div>
                   
                   <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div>
                         <p className="font-medium text-slate-900 dark:text-white">Session Timeout</p>
                         <p className="text-sm text-slate-500">Logout users after 24 hours of inactivity</p>
                      </div>
                      <Switch enabled={true} />
                   </div>
                </div>
             </div>
           )}

           {activeTab === "api" && (
             <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Key className="w-5 h-5 text-amber-500" /> API Connections</h2>
                
                <div className="space-y-6 max-w-xl">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gemini API Key</label>
                      <div className="flex gap-2">
                         <input type="password" defaultValue="************************" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
                         <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700">Reveal</button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Used for AI document generation</p>
                   </div>
                   
                   <hr className="border-slate-100 dark:border-slate-800" />
                   
                   <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Google AdSense ID</label>
                      <input type="text" placeholder="ca-pub-XXXXXXXXXXXXX" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
                   </div>
                </div>
             </div>
           )}

           {['pwa', 'system'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center py-20 opacity-50">
                 <Layout className="w-16 h-16 text-slate-300 mb-4" />
                 <p className="text-lg font-medium text-slate-500">Configuration panel in development.</p>
              </div>
           )}

        </div>
      </div>
    </div>
  );
}
