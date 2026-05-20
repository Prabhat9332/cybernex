"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-20 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 shrink-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-8 md:p-12 space-y-8">
             <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
                <p className="text-sm text-slate-500 mt-2">Latest update: May 20, 2026</p>
             </div>

             <div className="space-y-6 text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. Use of Service</h3>
                <p>
                   By registering an account with CyberNex, you agree to comply with standard legal usage constraints. You are solely responsible for verifying the authenticity of certificates filed or generated through our official portal quicklinks.
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">2. Local Sandbox Utilities</h3>
                <p>
                   Our tools are supplied "as-is" without warranty. While all tools compute completely on client devices to prioritize data security, we encourage users to keep backups of pristine original files prior to compression or background processing.
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">3. Professional Accounts & Membership</h3>
                <p>
                   Cyber Nex provides subscription membership packages. Fees are processed securely via third-party providers. Subscriptions are billed monthly and users may cancel anytime via the customer dashboard settings panel.
                </p>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">4. Jurisdiction & Support</h3>
                <p>
                   These Terms are governed by local statutes. For queries, contact us at <strong>support@cybernex.local</strong>.
                </p>
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
