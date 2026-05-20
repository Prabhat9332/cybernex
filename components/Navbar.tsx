"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Menu, X, LogOut, LayoutGrid, Search, Moon, Sun, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigations = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Categories", href: "/#categories" },
    { name: "Pricing", href: "/pricing" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (e: any) {
      toast.error(e.message || "Failed to logout");
    }
  };

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between px-6 py-3 rounded-3xl transition-all duration-300 border ${
          scrolled 
            ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border-white/40 dark:border-slate-700/50" 
            : "bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-sm border-white/20 dark:border-slate-800/50"
        }`}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="https://i.ibb.co/Q3wKkqsd/Chat-GPT-Image-May-19-2026-08-52-32-PM.png" alt="CyberNex Logo" className="h-8 md:h-9 w-auto object-contain group-hover:scale-105 transition-transform" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 px-2 py-1.5 rounded-2xl border border-white/50 dark:border-slate-700/50">
            {navigations.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isLinkActive(item.href)
                    ? "bg-white dark:bg-slate-700 text-[#6C63FF] shadow-sm transform scale-105"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2.5 rounded-xl text-slate-500 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
               <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl text-slate-500 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl shadow-sm border border-white/50 dark:border-slate-600 transition-all"
                >
                  <LayoutGrid className="w-4 h-4 text-[#6C63FF]" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white px-4 py-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-all"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center rounded-xl bg-[#6C63FF] hover:bg-[#5b54e5] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(108,99,255,0.39)] hover:shadow-[0_6px_20px_rgba(108,99,255,0.23)] transition-all transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl text-slate-500">
               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="space-y-1 px-4 py-6">
              {navigations.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-3 rounded-2xl text-base font-semibold transition-colors ${
                    isLinkActive(item.href)
                      ? "bg-[#6C63FF]/10 text-[#6C63FF]"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2.5 w-full bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 text-[#6C63FF] py-3.5 rounded-2xl text-base font-semibold transition-colors"
                    >
                      <LayoutGrid className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center justify-center gap-2 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 py-3.5 rounded-2xl text-base font-medium transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 py-3.5 rounded-2xl text-base font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center bg-[#6C63FF] py-3.5 rounded-2xl text-base font-semibold text-white shadow-lg shadow-[#6C63FF]/30"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
