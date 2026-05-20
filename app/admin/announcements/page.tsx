"use client";

import { useState } from "react";
import { Plus, Megaphone, Trash2, Edit3, Send, Clock, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

const MOCK_ANNOUNCEMENTS: any[] = [];

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Announcements</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Push alerts and notifications to your users.</p>
        </div>
        
        <button 
           onClick={() => setIsModalOpen(true)}
           className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-blue-200"
        >
          <Plus className="w-5 h-5" />
          Create Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['active', 'scheduled', 'completed'].map((status) => (
           <div key={status} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center justify-between capitalize">
                 {status} Announcements
                 <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs px-2 py-1 rounded-full">
                    {announcements.filter(a => a.status === status).length}
                 </span>
              </h3>
              
              <div className="space-y-4">
                 {announcements.filter(a => a.status === status).map(ann => (
                    <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       key={ann.id} 
                       className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group"
                    >
                       <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                             <h4 className="font-medium text-slate-900 dark:text-white text-sm line-clamp-2">{ann.title}</h4>
                             <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ann.date}</span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {ann.audience}</span>
                             </div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-1.5 text-slate-400 hover:text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30"><Edit3 className="w-4 h-4" /></button>
                             <button className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30"><Trash2 className="w-4 h-4" /></button>
                          </div>
                       </div>
                       
                       {status === 'scheduled' && (
                          <button className="mt-4 w-full py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                             <PlayCircle className="w-4 h-4" /> Publish Now
                          </button>
                       )}
                    </motion.div>
                 ))}
                 
                 {announcements.filter(a => a.status === status).length === 0 && (
                    <div className="text-center py-8 text-sm text-slate-500">
                       No {status} announcements
                    </div>
                 )}
              </div>
           </div>
        ))}
      </div>
      
      {/* Create Modal Mock */}
      {isModalOpen && (
         <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800"
            >
               <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Megaphone className="w-5 h-5 text-blue-500" /> New Announcement</h2>
               
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                     <input type="text" placeholder="e.g. Server Maintenance" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                     <textarea placeholder="Announcement details..." rows={4} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
                        <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none">
                           <option>Info</option>
                           <option>Success</option>
                           <option>Warning</option>
                           <option>Critical</option>
                        </select>
                     </div>
                     <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Publish Time</label>
                        <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none">
                           <option>Now</option>
                           <option>Schedule for later</option>
                        </select>
                     </div>
                  </div>
               </div>
               
               <div className="flex gap-3 mt-8">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium hover:bg-slate-50 transition-colors">Cancel</button>
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                     <Send className="w-4 h-4" /> Publish
                  </button>
               </div>
            </motion.div>
         </div>
      )}
    </div>
  );
}

// Dummy icon to save space
function Users(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
