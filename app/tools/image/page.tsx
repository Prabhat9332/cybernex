"use client";

import { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import imageCompression from "browser-image-compression";
import { removeBackground } from "@imgly/background-removal";
import { Upload, Download, Image as ImageIcon, Zap, CheckCircle, RefreshCcw, Lock, Scissors, Loader2 } from "lucide-react";

export default function ImageToolkit() {
  const [file, setFile] = useState<File | null>(null);
  const [previewSize, setPreviewSize] = useState("0 KB");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"compress" | "bg-remove">("compress");

  // Compress state
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionRatio, setCompressionRatio] = useState(80);

  // BG Remove state
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessingBg, setIsProcessingBg] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewSize((selectedFile.size / 1024).toFixed(2) + " KB");
      setOriginalUrl(URL.createObjectURL(selectedFile));
      resetStates();
    }
  }, []);

  const resetStates = () => {
    setCompressedFile(null);
    setCompressedUrl(null);
    setProcessedUrl(null);
  }

  const handleCompress = async () => {
    if (!file) return;
    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: file.size / 1024 / 1024 * (compressionRatio / 100),
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const result = await imageCompression(file, options);
      setCompressedFile(result);
      setCompressedUrl(URL.createObjectURL(result));
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleBgRemove = async () => {
    if (!file || !originalUrl) return;
    setIsProcessingBg(true);
    try {
      const imageBlob = await removeBackground(originalUrl);
      const url = URL.createObjectURL(imageBlob);
      setProcessedUrl(url);
    } catch (error) {
      console.error("BG Removal failed:", error);
    } finally {
      setIsProcessingBg(false);
    }
  };

  const handleDownload = (url: string | null, prefix: string) => {
    if (url && file) {
      const link = document.createElement("a");
      link.href = url;
      link.download = `${prefix}_${file.name.replace(/\.[^/.]+$/, "")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Image Toolkit</h1>
        <p className="text-gray-600 flex items-center justify-center gap-2">
           <Lock className="w-4 h-4 text-green-600" />
           Compress and remove background locally without uploading.
        </p>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        
        {/* Mode Selector */}
        <div className="flex border-b">
           <button 
              onClick={() => setMode("compress")}
              className={`flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${mode === "compress" ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50/50" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
           >
              <Zap className="w-4 h-4" /> Compress Image
           </button>
           <button 
              onClick={() => setMode("bg-remove")}
              className={`flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${mode === "bg-remove" ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50/50" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
           >
              <Scissors className="w-4 h-4" /> Remove Background
           </button>
        </div>

        <div className="p-8">
          {!file ? (
            <Dropzone onDrop={onDrop} accept={{ 'image/*': [] }} multiple={false}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    {isDragActive
                      ? "Drop image here"
                      : "Drag & drop image here, or click to upload"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG, WebP supported</p>
                </div>
              )}
            </Dropzone>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 rounded-xl border gap-4">
                 <div className="flex items-center gap-4">
                    {originalUrl && <img src={originalUrl} alt="Thumbnail" className="w-16 h-16 object-cover rounded-lg border shadow-sm" />}
                    <div>
                       <h3 className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-xs">{file.name}</h3>
                       <p className="text-sm text-gray-500">Size: {previewSize}</p>
                    </div>
                 </div>
                 <button onClick={() => { setFile(null); resetStates(); setOriginalUrl(null); }} className="text-sm text-red-600 hover:underline">
                    Clear Image
                 </button>
              </div>

              {mode === "compress" && (
                 <>
                   {!compressedFile ? (
                      <div className="space-y-6">
                        <div>
                          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                            <span>Target Output Quality</span>
                            <span>{compressionRatio}%</span>
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={compressionRatio}
                            onChange={(e) => setCompressionRatio(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                          />
                        </div>
                        <button
                          onClick={handleCompress}
                          disabled={isCompressing}
                          className="w-full py-4 rounded-xl bg-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 disabled:opacity-50 transition-colors shadow-sm"
                        >
                          {isCompressing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                          {isCompressing ? "Compressing locally..." : "Compress Image"}
                        </button>
                      </div>
                   ) : (
                      <div className="space-y-6 border-t pt-6">
                         <div className="flex items-center gap-4 bg-green-50 text-green-800 p-4 rounded-xl border border-green-200">
                            <CheckCircle className="w-6 h-6 shrink-0" />
                            <div>
                               <p className="font-semibold">Successfully Compressed!</p>
                               <p className="text-sm text-green-700">New Size: {(compressedFile.size / 1024).toFixed(2)} KB (Saved {((file.size - compressedFile.size) / file.size * 100).toFixed(0)}%)</p>
                            </div>
                         </div>
                         
                         <div className="flex gap-4">
                            <button
                               onClick={() => { setCompressedFile(null); setCompressedUrl(null); }}
                               className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                               Adjust again
                            </button>
                            <button
                               onClick={() => handleDownload(compressedUrl, "compressed")}
                               className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow-md"
                            >
                               <Download className="w-5 h-5" /> Download
                            </button>
                         </div>
                      </div>
                   )}
                 </>
              )}

              {mode === "bg-remove" && (
                 <>
                   {!processedUrl ? (
                      <div className="space-y-6">
                        <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 text-sm">
                           The AI model will be downloaded to your browser on the first run (roughly ~40MB). It will process instantly for all future images. Your image never leaves your device.
                        </div>
                        <button
                          onClick={handleBgRemove}
                          disabled={isProcessingBg}
                          className="w-full py-4 rounded-xl bg-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 disabled:opacity-50 transition-colors shadow-sm"
                        >
                          {isProcessingBg ? <Loader2 className="w-5 h-5 animate-spin" /> : <Scissors className="w-5 h-5" />}
                          {isProcessingBg ? "AI is processing your image (this may take a moment)..." : "Remove Background"}
                        </button>
                      </div>
                   ) : (
                      <div className="space-y-6 border-t pt-6">
                         <div className="flex flex-col items-center gap-4">
                            <h3 className="font-semibold text-gray-900">Background Removed</h3>
                            <div className="rounded-xl border shadow-sm p-4 bg-gray-100 max-w-[300px] w-full" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZThlOGU4IiAvPjxyZWN0IHg9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmZmZmYiIC8+PHJlY3QgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZmZmZiIgLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2U4ZThlOCIgLz48L3N2Zz4=')" }}>
                               <img src={processedUrl} alt="Processed" className="mx-auto" />
                            </div>
                         </div>
                         
                         <div className="flex gap-4">
                            <button
                               onClick={() => setProcessedUrl(null)}
                               className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                               Try Another
                            </button>
                            <button
                               onClick={() => handleDownload(processedUrl, "nobg")}
                               className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow-md"
                            >
                               <Download className="w-5 h-5" /> Download Transparent PNG
                            </button>
                         </div>
                      </div>
                   )}
                 </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
