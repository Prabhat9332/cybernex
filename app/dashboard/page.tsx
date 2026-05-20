"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Star, 
  Bell, 
  Settings, 
  LogOut, 
  Download, 
  User, 
  CheckCircle, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  ArrowUpRight,
  ShieldAlert,
  Loader2,
  Home,
  Briefcase
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, collection, query, limit, getDocs } from "firebase/firestore";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"dashboard" | "files" | "membership" | "notifications" | "settings">("dashboard");
  const [preferences, setPreferences] = useState<any>({ theme: "system", language: "en" });
  const [dbUser, setDbUser] = useState<any>(null);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const loadProfileAndPrefs = async () => {
        try {
          // Load central user roles/membership profile
          const userSnap = await getDoc(doc(db, "users", user.uid));
          if (userSnap.exists()) {
            setDbUser(userSnap.data());
          }

          // Fetch recent activity logs from subcollection
          const actSnap = await getDocs(query(collection(db, "users", user.uid, "activities"), limit(5)));
          const list: any[] = [];
          actSnap.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setRecentActivities(list);

          // Preferences query
          const docRef = doc(db, "users", user.uid, "preferences", "main");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPreferences(docSnap.data());
          }
        } catch (error) {
          console.error("Error loading user profile dataset:", error);
        }
      };
      loadProfileAndPrefs();
    }
  }, [user]);

  const savePreferences = async (updater: any) => {
    if (!user) return;
    const newPrefs = { ...preferences, ...updater };
    setPreferences(newPrefs);
    setSavingPrefs(true);
    try {
      await setDoc(doc(db, "users", user.uid, "preferences", "main"), {
        ...newPrefs,
        updatedAt: serverTimestamp()
      });
      toast.success("Preferences updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to commit settings");
    } finally {
      setSavingPrefs(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      router.push("/");
    } catch (e: any) {
      toast.error("Sign out process failed");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const userMembership = dbUser?.membership || "free";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between pb-20 md:pb-0">
      
      {/* Navbar header */}
      <Navbar />

      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Dashboard Left Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800 space-y-7 sticky top-24">
              
              {/* Profile card */}
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                 </div>
                 <div className="min-w-0">
                    <h4 className="font-extrabold text-slate-900 dark:text-white truncate text-sm">
                       {user.displayName || "Client User"}
                    </h4>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                       <CheckCircle className="w-3 h-3 fill-current" /> Verified
                    </span>
                 </div>
              </div>

              {/* Sidebar Tabs */}
              <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                 <button 
                   onClick={() => setActiveTab("dashboard")}
                   className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                     activeTab === "dashboard"
                       ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                       : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white"
                   }`}
                 >
                    <LayoutDashboard className="w-4.5 h-4.5" /> Dashboard
                 </button>

                 <button 
                   onClick={() => setActiveTab("files")}
                   className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                     activeTab === "files"
                       ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                       : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white"
                   }`}
                 >
                    <FileText className="w-4.5 h-4.5" /> My Files
                 </button>

                 <button 
                   onClick={() => setActiveTab("membership")}
                   className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                     activeTab === "membership"
                       ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                       : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white"
                   }`}
                 >
                    <Sparkles className="w-4.5 h-4.5" /> Membership
                 </button>

                 <button 
                   onClick={() => setActiveTab("notifications")}
                   className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                     activeTab === "notifications"
                       ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                       : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white"
                   }`}
                 >
                    <Bell className="w-4.5 h-4.5" /> Notifications
                 </button>

                 <button 
                   onClick={() => setActiveTab("settings")}
                   className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                     activeTab === "settings"
                       ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                       : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white"
                   }`}
                 >
                    <Settings className="w-4.5 h-4.5" /> Settings
                 </button>
              </div>

              {/* Logout button bottom */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                 <button 
                   onClick={handleLogout}
                   className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                 >
                    <LogOut className="w-4.5 h-4.5" /> Sign Out
                 </button>
              </div>

            </div>
          </aside>

          {/* Right Main Container page space */}
          <main className="flex-grow min-w-0">
             
             {/* welcome panel message */}
             <div className="bg-gradient-to-br from-blue-650 to-indigo-700 bg-blue-600 text-white rounded-3xl p-8 mb-8 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none">
                  <Sparkles className="w-full h-full fill-current" />
                </div>
                <div className="relative z-10 max-w-xl space-y-2">
                   <h2 className="text-2xl md:text-3xl font-black">
                      Welcome Back, {user.displayName || "Valued User"}!
                   </h2>
                   <p className="text-blue-100 text-sm leading-relaxed">
                      All tools are fully functional. Compress images below KB specs or align your A4 passport sheets to streamline applications.
                   </p>
                </div>
             </div>

             <AnimatePresence mode="wait">
                {activeTab === "dashboard" && (
                   <motion.div 
                     key="dashboard-view"
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -15 }}
                     className="space-y-8"
                   >
                     {/* Dashboard overview metrics */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Membership card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center justify-between">
                           <div className="space-y-1">
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Plan Level</p>
                              <h4 className="text-xl font-extrabold capitalize text-slate-900 dark:text-white">
                                 {userMembership} Plan
                              </h4>
                           </div>
                           <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                              <Sparkles className="w-5 h-5" />
                           </div>
                        </div>

                        {/* Saved files indicator */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center justify-between">
                           <div className="space-y-1">
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider font-sans">Recent Tools</p>
                              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                 Image Toolkit
                              </h4>
                           </div>
                           <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                              <FileText className="w-5 h-5 animate-pulse" />
                           </div>
                        </div>

                        {/* Recent Downloads index */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center justify-between">
                           <div className="space-y-1">
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Security</p>
                              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                 Client WASM
                              </h4>
                           </div>
                           <div className="w-11 h-11 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5" />
                           </div>
                        </div>

                     </div>

                     {/* Split View */}
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* History usage list */}
                        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-6">
                           <div className="flex items-center justify-between">
                              <h3 className="font-extrabold text-lg flex items-center gap-2">
                                 <Briefcase className="w-5 h-5 text-blue-500" /> Recent Activity Log
                              </h3>
                              <span className="text-xs text-slate-400">Past 5 activations</span>
                           </div>

                           {recentActivities.length > 0 ? (
                              <div className="space-y-4">
                                {recentActivities.map((act) => (
                                  <div key={act.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm">
                                     <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <span className="font-bold">{act.toolName}</span>
                                     </div>
                                     <span className="text-xs text-slate-400">{new Date(act.timestamp).toLocaleDateString()}</span>
                                  </div>
                                ))}
                              </div>
                           ) : (
                              <div className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-850 text-center text-sm text-slate-400">
                                 No transactions or process events indexed yet. Open any tool inside Catalog to perform local operations.
                              </div>
                           )}
                        </div>

                        {/* Premium Upgrades CTA banner */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border border-indigo-100 dark:border-indigo-900 p-8 rounded-3xl flex flex-col justify-between">
                           <div className="space-y-3">
                              <h4 className="font-extrabold text-lg text-indigo-950 dark:text-indigo-400 flex items-center gap-2">
                                 <Sparkles className="w-5 h-5 text-indigo-500" /> Pro Features Pending
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed">
                                 Unlock accelerated server-authoritative background removal scaling and automated letters, schemas, and templates instantly.
                              </p>
                           </div>
                           <button 
                             onClick={() => setActiveTab("membership")}
                             className="w-full mt-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-md transition-all uppercase tracking-wider"
                           >
                              Review memberships
                           </button>
                        </div>

                     </div>
                   </motion.div>
                )}

                {/* My Files View */}
                {activeTab === "files" && (
                   <motion.div 
                     key="files-view"
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -15 }}
                     className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-8 rounded-3xl"
                   >
                      <div className="flex justify-between items-center mb-6">
                         <h3 className="font-extrabold text-lg">Saved Local Canvas Files</h3>
                         <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2.5 py-1 rounded-full font-bold">0 Active Documents</span>
                      </div>
                      <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-850">
                         <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                         <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                            No files stored securely inside your Firestore storage container space. Uploaded items appear here automatically.
                         </p>
                      </div>
                   </motion.div>
                )}

                {/* Membership Tab */}
                {activeTab === "membership" && (
                   <motion.div 
                     key="membership-view"
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -15 }}
                     className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-8 rounded-3xl space-y-6"
                   >
                      <h3 className="font-extrabold text-lg">My Subscription Status</h3>
                      <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                         <div>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Current Tier</span>
                            <h4 className="text-2xl font-black capitalize text-slate-905 dark:text-slate-100">{userMembership} Plan</h4>
                            <p className="text-xs text-slate-400 mt-1">Unlimited offline local tools included by default.</p>
                         </div>
                         {userMembership === "free" && (
                            <Link href="/pricing" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-blue-500/10">
                               Go Pro for $15/mo
                            </Link>
                         )}
                      </div>
                   </motion.div>
                )}

                {/* Notifications View */}
                {activeTab === "notifications" && (
                   <motion.div 
                     key="notifications-view"
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -15 }}
                     className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-8 rounded-3xl space-y-4"
                   >
                      <h3 className="font-extrabold text-lg">System Messages & Broadcasts</h3>
                      <div className="space-y-3.5">
                         <div className="p-4 bg-blue-50/50 dark:bg-blue-500/5 rounded-2xl border border-blue-100/5 w-full flex gap-3.5 items-start">
                            <Bell className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                               <p className="text-sm font-bold">Welcome to CyberNex V2.0 Platform</p>
                               <p className="text-xs text-slate-500 mt-1">All utility operations run entirely locally in your sandbox browser. Enjoy military grade privacy.</p>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                   <motion.div 
                     key="settings-view"
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -15 }}
                     className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-8 rounded-3xl space-y-8"
                   >
                      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                         <h3 className="font-extrabold text-lg">Dashboard Configurations</h3>
                         {savingPrefs && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                      </div>

                      <div className="space-y-6 max-w-md">
                         <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">Theme Palette</label>
                            <select 
                               value={preferences.theme}
                               onChange={(e) => savePreferences({ theme: e.target.value })}
                               className="w-full border shadow-sm rounded-xl focus:border-blue-500 bg-slate-50 dark:bg-slate-800 p-3 outline-none border-slate-200 dark:border-slate-700 text-sm"
                            >
                               <option value="system">Follow System Preferences</option>
                               <option value="light">Pure Light Mode</option>
                               <option value="dark">Secure Dark Mode</option>
                            </select>
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">Default Platform Language</label>
                            <select 
                               value={preferences.language}
                               onChange={(e) => savePreferences({ language: e.target.value })}
                               className="w-full border shadow-sm rounded-xl focus:border-blue-500 bg-slate-50 dark:bg-slate-800 p-3 outline-none border-slate-200 dark:border-slate-700 text-sm"
                            >
                               <option value="en">English only</option>
                            </select>
                         </div>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>

          </main>

        </div>
      </div>

      {/* Bottom mobile navigation rail menu */}
      <nav className="fixed bottom-0 left-0 right-0 z-45 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex justify-around py-2.5 lg:hidden px-4">
         <button 
           onClick={() => { setActiveTab("dashboard"); router.push("/dashboard"); }}
           className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "dashboard" ? "text-blue-600 dark:text-blue-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
         >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
         </button>
         <button 
           onClick={() => setActiveTab("files")}
           className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "files" ? "text-blue-600 dark:text-blue-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
         >
            <FileText className="w-5 h-5" />
            <span>My Files</span>
         </button>
         <button 
           onClick={() => router.push("/tools")}
           className="flex flex-col items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
         >
            <Briefcase className="w-5 h-5" />
            <span>All Tools</span>
         </button>
         <button 
           onClick={() => setActiveTab("membership")}
           className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "membership" ? "text-blue-600 dark:text-blue-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
         >
            <Sparkles className="w-5 h-5" />
            <span>Membership</span>
         </button>
         <button 
           onClick={() => setActiveTab("settings")}
           className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "settings" ? "text-blue-600 dark:text-blue-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
         >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
         </button>
      </nav>

    </div>
  );
}
