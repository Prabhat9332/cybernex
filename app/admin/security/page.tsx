"use client";

import { motion } from "motion/react";
import { ShieldCheck, Server, Key, Lock, AlertTriangle } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Security & Audit</h1>
        <p className="text-slate-500">Monitor platform security and manage access controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Admins", value: "3", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
          { label: "Failed Logins (24h)", value: "12", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "API Keys Issued", value: "8", icon: Key, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 overflow-hidden">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Security Events</h2>
        <div className="space-y-4">
          {[
            { action: "Admin login", user: "prabhatkumar9765@gmail.com", ip: "192.168.1.100", time: "2 mins ago", status: "success" },
            { action: "Config updated", user: "system", ip: "localhost", time: "1 hour ago", status: "success" },
            { action: "Failed login attempt", user: "unknown", ip: "45.22.19.11", time: "3 hours ago", status: "failed" },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">{log.action}</div>
                  <div className="text-xs text-slate-500 flex gap-2">
                    <span>{log.user}</span> &bull; <span>{log.ip}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-400">{log.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
