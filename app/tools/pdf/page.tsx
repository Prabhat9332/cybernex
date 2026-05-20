"use client";

import { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { FileText, Download, Lock, FileUp, Settings, Trash2 } from "lucide-react";

export default function PdfToolkit() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    setMergedPdfUrl(null);
  }, []);

  const handleRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (error) {
      console.error(error);
      alert("Error merging PDFs. Ensure all files are valid PDF documents.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadMerged = () => {
    if (!mergedPdfUrl) return;
    const link = document.createElement("a");
    link.href = mergedPdfUrl;
    link.download = "merged-document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">PDF Merger & Editor</h1>
        <p className="text-gray-600 flex items-center justify-center gap-2">
           <Lock className="w-4 h-4 text-green-600" />
           Merge PDFs entirely in your browser securely.
        </p>
      </div>

      <div className="bg-white rounded-3xl border p-6 md:p-8 shadow-sm">
        
        <Dropzone onDrop={onDrop} accept={{ 'application/pdf': ['.pdf'] }}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-8 mb-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <FileUp className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700">
                {isDragActive
                  ? "Drop PDFs here"
                  : "Drag & drop PDFs here, or click to select"}
              </p>
            </div>
          )}
        </Dropzone>

        {files.length > 0 && (
           <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-gray-900 border-b pb-2">Selected Files ({files.length})</h3>
              <div className="space-y-2">
                 {files.map((file, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                       <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-5 h-5 text-red-500 shrink-0" />
                          <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                       </div>
                       <button onClick={() => handleRemove(i)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {files.length > 0 && !mergedPdfUrl && (
           <button
             onClick={handleMerge}
             disabled={isProcessing || files.length < 2}
             className="w-full py-4 rounded-xl bg-red-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-700 disabled:opacity-50 transition-colors"
           >
             {isProcessing ? "Merging..." : "Merge PDFs"}
           </button>
        )}
        {files.length < 2 && files.length > 0 && !mergedPdfUrl && (
           <p className="text-xs text-center mt-2 text-gray-500">Please select at least 2 PDFs to merge.</p>
        )}

        {mergedPdfUrl && (
           <div className="pt-6 border-t space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl font-medium text-center">
                 Successfully merged {files.length} PDFs!
              </div>
              <div className="flex gap-4">
                 <button
                    onClick={() => { setFiles([]); setMergedPdfUrl(null); }}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                 >
                    Start Over
                 </button>
                 <button
                    onClick={downloadMerged}
                    className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-md"
                 >
                    <Download className="w-5 h-5" /> Download Merged PDF
                 </button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
}
