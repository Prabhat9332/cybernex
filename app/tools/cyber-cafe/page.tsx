"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Type, Copy, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function CyberCafeToolkit() {
  const [activeTab, setActiveTab] = useState<"qr" | "text">("qr");
  
  // QR State
  const [qrText, setQrText] = useState("");
  
  // Text state
  const [textContent, setTextContent] = useState("");

  const handleCopy = () => {
     if (textContent) {
        navigator.clipboard.writeText(textContent);
        toast.success("Text copied!");
     }
  }

  const formatText = (type: "upper" | "lower" | "capitalize" | "clear") => {
     if (type === "clear") {
        setTextContent("");
        return;
     }
     
     if (type === "upper") setTextContent(textContent.toUpperCase());
     if (type === "lower") setTextContent(textContent.toLowerCase());
     if (type === "capitalize") {
        setTextContent(textContent.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '));
     }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Cyber Cafe Toolkit</h1>
        <p className="text-gray-600">
           Quick tools for everyday tasks. Zero data collected.
        </p>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden min-h-[500px] flex flex-col md:flex-row">
         {/* Sidebar */}
         <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto">
            <button 
               onClick={() => setActiveTab("qr")}
               className={`flex items-center gap-3 p-3 rounded-xl transition-colors font-medium text-sm whitespace-nowrap ${activeTab === 'qr' ? 'bg-white shadow-sm border border-gray-200 text-blue-600' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
               <QrCode className="w-5 h-5" /> QR Generator
            </button>
            <button 
               onClick={() => setActiveTab("text")}
               className={`flex items-center gap-3 p-3 rounded-xl transition-colors font-medium text-sm whitespace-nowrap ${activeTab === 'text' ? 'bg-white shadow-sm border border-gray-200 text-blue-600' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
               <Type className="w-5 h-5" /> Text Formatter
            </button>
         </div>

         {/* Content */}
         <div className="flex-1 p-6 md:p-8">
            {activeTab === "qr" && (
               <div className="space-y-6 max-w-md mx-auto">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">QR Code Generator</h2>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Generate from Text / URL</label>
                     <input 
                        type="text" 
                        placeholder="https://example.com"
                        value={qrText}
                        onChange={(e) => setQrText(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                     />
                  </div>
                  
                  <div className="bg-gray-50 border rounded-2xl p-8 flex items-center justify-center min-h-[250px]">
                     {qrText ? (
                        <QRCodeSVG value={qrText} size={200} />
                     ) : (
                        <div className="text-gray-400 flex flex-col items-center gap-2">
                           <QrCode className="w-12 h-12 opacity-50" />
                           <p className="text-sm">Enter text to generate QR</p>
                        </div>
                     )}
                  </div>
               </div>
            )}

            {activeTab === "text" && (
               <div className="space-y-6 h-full flex flex-col">
                  <div className="flex items-center justify-between border-b pb-4">
                     <h2 className="text-xl font-bold text-gray-900">Text Formatter</h2>
                     <button onClick={handleCopy} className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors">
                        <Copy className="w-4 h-4" /> Copy 
                     </button>
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2">
                     <button onClick={() => formatText('upper')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 whitespace-nowrap">UPPERCASE</button>
                     <button onClick={() => formatText('lower')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 whitespace-nowrap">lowercase</button>
                     <button onClick={() => formatText('capitalize')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 whitespace-nowrap">Capitalize Words</button>
                     <button onClick={() => formatText('clear')} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium whitespace-nowrap ml-auto">Clear</button>
                  </div>

                  <textarea 
                     value={textContent}
                     onChange={(e) => setTextContent(e.target.value)}
                     placeholder="Type or paste your text here to format..."
                     className="w-full flex-1 min-h-[300px] border border-gray-300 rounded-xl p-4 bg-gray-50 focus:bg-white outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                  <div className="text-right text-sm text-gray-500">
                     Characters: {textContent.length} | Words: {textContent.split(/\s+/).filter(w => w.length > 0).length}
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
