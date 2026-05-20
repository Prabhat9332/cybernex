"use client";

import { useState, useRef, useCallback } from "react";
import Dropzone from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Upload, Download, Settings, Image as ImageIcon, FileText, X, Scissors } from "lucide-react";
import jsPDF from "jspdf";

const SIZES = [
  { name: "India Passport (3.5 x 4.5 cm)", width: 35, height: 45 },
  { name: "US Visa (2 x 2 inch)", width: 51, height: 51 },
  { name: "Schengen Visa (3.5 x 4.5 cm)", width: 35, height: 45 },
  { name: "Stamp Size (2 x 2.5 cm)", width: 20, height: 25 },
];

export default function PassportPhotoMaker() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [bgColor, setBgColor] = useState("#ffffff");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setCroppedImage(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCrop = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const cropper = cropperRef.current.cropper;
      const canvas = cropper.getCroppedCanvas({
        fillColor: bgColor,
      });
      setCroppedImage(canvas.toDataURL("image/jpeg", 0.95));
    }
  };

  const generatePDF = () => {
    if (!croppedImage) return;

    const pdf = new jsPDF("p", "mm", "a4");
    
    const margin = 10;
    const spacing = 5;
    const imgWidth = selectedSize.width;
    const imgHeight = selectedSize.height;

    const cols = Math.floor((210 - margin * 2 + spacing) / (imgWidth + spacing));
    const rows = Math.floor((297 - margin * 2 + spacing) / (imgHeight + spacing));

    let count = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = margin + c * (imgWidth + spacing);
        const y = margin + r * (imgHeight + spacing);
        pdf.addImage(croppedImage, "JPEG", x, y, imgWidth, imgHeight);
        count++;
      }
    }

    pdf.save("passport-photos-a4.pdf");
  };

  const generateJPG = () => {
     if (!croppedImage) return;
     const link = document.createElement("a");
     link.download = "passport-photo.jpg";
     link.href = croppedImage;
     link.click();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Passport Photo Maker</h1>
        <p className="text-gray-600">
          Create perfect passport size photos online completely free. Supports A4 sheet layout for easy printing. Processed entirely on your device.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {!image ? (
            <Dropzone onDrop={onDrop} accept={{ 'image/*': [] }} multiple={false}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-white"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    {isDragActive
                      ? "Drop the image here"
                      : "Drag & drop an image here, or click to select"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG, WebP</p>
                </div>
              )}
            </Dropzone>
          ) : (
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                   <Scissors className="w-5 h-5 text-gray-500" /> Adjust Crop
                </h3>
                <button
                  onClick={() => { setImage(null); setCroppedImage(null); }}
                  className="text-gray-500 hover:text-red-500 transition border rounded p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!croppedImage ? (
                 <div className="w-full bg-gray-50 rounded-xl overflow-hidden border">
                   <Cropper
                     src={image}
                     style={{ height: 400, width: "100%" }}
                     initialAspectRatio={selectedSize.width / selectedSize.height}
                     aspectRatio={selectedSize.width / selectedSize.height}
                     guides={true}
                     ref={cropperRef}
                     viewMode={1}
                     background={false}
                   />
                 </div>
              ) : (
                 <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border">
                    <img src={croppedImage} alt="Cropped" className="shadow-lg border bg-white" style={{ maxWidth: '100%', maxHeight: 400 }} />
                    <button 
                       onClick={() => setCroppedImage(null)}
                       className="mt-4 text-blue-600 text-sm font-medium hover:underline"
                    >
                       Edit Crop
                    </button>
                 </div>
              )}
              
              {!croppedImage && (
                 <button
                   onClick={handleCrop}
                   className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                 >
                   Confirm Crop
                 </button>
              )}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <Settings className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-lg">Photo Settings</h3>
          </div>

          <div className="space-y-3">
             <label className="text-sm font-medium text-gray-700 block">Select Size</label>
             <select 
               className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2.5 outline-none border"
               value={JSON.stringify(selectedSize)}
               onChange={(e) => {
                  const size = JSON.parse(e.target.value);
                  setSelectedSize(size);
                  if (cropperRef.current?.cropper) {
                     cropperRef.current.cropper.setAspectRatio(size.width / size.height);
                  }
               }}
             >
                {SIZES.map(s => (
                   <option key={s.name} value={JSON.stringify(s)}>{s.name}</option>
                ))}
             </select>
          </div>

          <div className="space-y-3">
             <label className="text-sm font-medium text-gray-700 block">Background Color</label>
             <div className="flex gap-2">
                {["#ffffff", "#add8e6", "#d3d3d3", "#ff0000"].map(color => (
                   <button
                     key={color}
                     onClick={() => setBgColor(color)}
                     className={`w-8 h-8 rounded-full border-2 ${bgColor === color ? 'border-blue-500 scale-110' : 'border-gray-200'} transition-transform`}
                     style={{ backgroundColor: color }}
                   />
                ))}
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 p-0 border-0 rounded-full cursor-pointer"
                />
             </div>
             <p className="text-xs text-gray-500">Only applies if original image has transparency.</p>
          </div>

          {croppedImage && (
             <div className="pt-4 border-t space-y-3">
                <button
                  onClick={generateJPG}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 rounded-xl font-medium transition-colors"
                >
                  <ImageIcon className="w-5 h-5" /> Download Single JPG
                </button>
                <button
                  onClick={generatePDF}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-colors shadow-sm"
                >
                  <FileText className="w-5 h-5" /> Download A4 Print PDF
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
