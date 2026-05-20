"use client";

import { useState } from "react";
import { Wand2, Loader2, Copy, FileText, Briefcase, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function AITools() {
  const [activeTool, setActiveTool] = useState<"application" | "translate">("application");
  
  // Application State
  const [appType, setAppType] = useState("Leave Application");
  const [appContext, setAppContext] = useState("");
  
  // Generate State
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (activeTool === "application" && !appContext) {
      toast.error("Please provide some context details.");
      return;
    }

    setIsGenerating(true);
    setResult("");
    try {
      const prompt = `You are a professional assistant. Generate a professional ${appType} based on these details: ${appContext}. Format it properly. Do not include any placeholder brackets like [Your Name] unless absolutely necessary, try to write a complete general template if specific details are missing but prioritize the provided context.`;

      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: "gemini-2.5-flash" }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setResult(data.text);
    } catch (err: any) {
       toast.error(err.message || "Something went wrong.");
    } finally {
       setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full mb-4 border border-amber-100">
           <Wand2 className="w-4 h-4" /> AI Powered
        </div>
        <h1 className="text-3xl font-bold mb-4">Smart Assistants</h1>
        <p className="text-gray-600">
           Draft professional applications, letters, and emails instantly using Gemini AI.
        </p>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm p-6 md:p-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Draft Details</h2>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                  <select 
                     value={appType}
                     onChange={(e) => setAppType(e.target.value)}
                     className="w-full border-gray-300 rounded-xl shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-gray-50 p-3 outline-none border transition-colors"
                  >
                     <option value="Leave Application">Leave Application</option>
                     <option value="Sick Leave Letter">Sick Leave Letter</option>
                     <option value="Resignation Letter">Resignation Letter</option>
                     <option value="Bank Account Transfer Application">Bank Component Transfer</option>
                     <option value="Police Complaint">Police Complaint Form</option>
                     <option value="Job Cover Letter">Job Cover Letter</option>
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Context / Details</label>
                  <textarea 
                     value={appContext}
                     onChange={(e) => setAppContext(e.target.value)}
                     placeholder="E.g., I have a fever and need 2 days off starting tomorrow. I will visit the doctor."
                     className="w-full h-40 border border-gray-300 rounded-xl p-4 bg-gray-50 focus:bg-white outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">More details = better results.</p>
               </div>

               <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-4 rounded-xl bg-amber-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-md shadow-amber-200"
               >
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                  {isGenerating ? "Generating..." : "Generate Draft"}
               </button>
            </div>

            <div className="bg-gray-50 border rounded-2xl p-6 flex flex-col h-full min-h-[400px]">
               <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                     <FileText className="w-4 h-4 text-gray-500" /> Result
                  </h3>
                  {result && (
                     <button onClick={handleCopy} className="text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors">
                        <Copy className="w-4 h-4" /> Copy 
                     </button>
                  )}
               </div>
               
               <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">
                  {result ? result : (
                     <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 opacity-50">
                        <FileText className="w-12 h-12" />
                        <p>Your generated document will appear here.</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
