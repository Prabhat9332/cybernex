"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { motion } from "motion/react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all mandatory fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Save contact message database sync
      await addDoc(collection(db, "feedback"), {
        name,
        email,
        subject: subject || "General Inquiry",
        message,
        createdAt: new Date().toISOString()
      });

      setSubmitted(true);
      toast.success("Message dispatched successfully!");
      // clear
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error: any) {
      console.error("Feedback dispatch error:", error);
      toast.error(error.message || "Failed to submit help feedback form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-20 md:py-24 relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[-5%] w-[35%] h-[35%] rounded-full bg-blue-500/5 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="p-1 px-3 bg-blue-50 dark:bg-blue-500/30 text-blue-700 dark:text-blue-400 font-bold rounded-full text-xs">Help Desk</span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                Get in Touch
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Have customized requests or feedback? Message our team directly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
              
              {/* Left Column coordinates */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-8 space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Need on-spot cyber assistance or specific PDF templates? Contact us using any medium.
                  </p>

                  <div className="space-y-4">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/35 flex items-center justify-center text-blue-600 shrink-0">
                           <Mail className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-xs text-slate-400">Email Address</p>
                           <a href="mailto:support@cybernex.local" className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:underline">
                              support@cybernex.local
                           </a>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/35 flex items-center justify-center text-emerald-600 shrink-0">
                           <Phone className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-xs text-slate-400">Call Support</p>
                           <a href="tel:+919876543210" className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:underline">
                              +91 98765 43210
                           </a>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/35 flex items-center justify-center text-red-600 shrink-0">
                           <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-xs text-slate-400">Our Cyber Hub</p>
                           <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                              Station Road, Digital Plaza complex, Main Block, CG Central
                           </p>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-3xl p-8 space-y-4">
                   <h4 className="font-bold text-lg">Instant self-service desk</h4>
                   <p className="text-xs text-blue-100 leading-relaxed">
                      Before sending a message, consider exploring our extensive interactive FAQ page where 90% of user inquiries are resolved instantly.
                   </p>
                   <a href="/faq" className="inline-flex text-xs bg-white text-blue-700 font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                      Open FAQs
                   </a>
                </div>
              </div>

              {/* Right Column Form */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                   {submitted ? (
                      <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="text-center py-12 space-y-4"
                      >
                         <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                            <CheckCircle2 className="w-10 h-10" />
                         </div>
                         <h3 className="text-2xl font-bold">Feedback Dispatched!</h3>
                         <p className="text-sm text-slate-500 max-w-sm mx-auto">
                            Thank you for contacting us. Our operations team averages responses within 4 hours.
                         </p>
                         <button 
                            onClick={() => setSubmitted(false)}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors mt-4"
                         >
                            Send another inquiry
                         </button>
                      </motion.div>
                   ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                               <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 px-1 tracking-wider uppercase">
                                  Your Name *
                               </label>
                               <input 
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="John Doe"
                                  required
                                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white text-sm transition-all"
                               />
                            </div>
                            <div>
                               <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 px-1 tracking-wider uppercase">
                                  Email Address *
                               </label>
                               <input 
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="john@example.com"
                                  required
                                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white text-sm transition-all"
                               />
                            </div>
                         </div>

                         <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 px-1 tracking-wider uppercase">
                               Subject (Optional)
                            </label>
                            <input 
                               type="text"
                               value={subject}
                               onChange={(e) => setSubject(e.target.value)}
                               placeholder="e.g. Passport Template Help"
                               className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white text-sm transition-all"
                            />
                         </div>

                         <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 px-1 tracking-wider uppercase">
                               Your Message *
                            </label>
                            <textarea 
                               rows={5}
                               value={message}
                               onChange={(e) => setMessage(e.target.value)}
                               placeholder="Explain how we can help you today..."
                               required
                               className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white text-sm transition-all resize-none"
                            />
                         </div>

                         <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 flex items-center justify-center disabled:opacity-75"
                         >
                            {isSubmitting ? (
                               <>
                                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                  Sending Message...
                               </>
                            ) : (
                               <>
                                  <MessageSquare className="w-5 h-5 mr-2" />
                                  Dispatch Inquiry
                               </>
                            )}
                         </button>
                      </form>
                   )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
