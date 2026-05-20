"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldAlert, Eye, Lock, Scale } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-20 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 shrink-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-8 md:p-12 space-y-8">
             <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
                <p className="text-sm text-slate-500 mt-2">Effective date: May 20, 2026</p>
             </div>

             <div className="space-y-6 text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. Core Privacy Promise</h3>
                <p>
                   At CyberNex, your workflow and documents belong exclusively to you. All document conversions, image processing (including compression and signature cropping), passport template rendering, and AI OCR processing are computed completely within your local web browser sandbox utilizing client-side script technologies (JS/WASM).
                </p>
                <p>
                   Because no documents are sent to our servers for processing, your files remain absolute confidential. Your files are not tracked, saved, or inspected by CyberNex.
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">2. Data We Collect</h3>
                <p>
                   We only collect minimal technical data necessary to persist your profile:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                   <li>Profile identifiers (Name, Email address, registration timestamp).</li>
                   <li>Active membership subscription details.</li>
                   <li>Diagnostic feedback and messages that you explicitly submit on our contact form.</li>
                </ul>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">3. Cookies</h3>
                <p>
                   We use local storage and secure cookies to remember temporary dashboard preference panels, active login token states, and toggle selectors.
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">4. Contacts & Auditing</h3>
                <p>
                   Supporters or researchers with questions regarding client-side data handling on CyberNex may contact security at: <strong>support@cybernex.local</strong>.
                </p>
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
