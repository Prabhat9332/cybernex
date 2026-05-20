import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "CyberNex",
  description: "Advanced utility platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased text-[#1A1F36] bg-[#F7F8FC] dark:bg-[#0B0F19] dark:text-slate-100">
        <ThemeProvider>
          <AuthProvider>
             {children}
             <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
