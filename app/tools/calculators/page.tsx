"use client";

import { useState } from "react";
import { Calculator, Percent, Calendar, IndianRupee, RefreshCcw } from "lucide-react";

export default function CalculatorToolkit() {
  const [activeTab, setActiveTab] = useState<"gst" | "emi" | "age" | "discount">("gst");

  // GST State
  const [gstAmount, setGstAmount] = useState<number | "">("");
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstMode, setGstMode] = useState<"add" | "remove">("add");

  // EMI State
  const [loanAmount, setLoanAmount] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [loanTenure, setLoanTenure] = useState<number | "">(""); // in months

  // Age State
  const [dob, setDob] = useState<string>("");
  const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number } | null>(null);

  // Discount State
  const [originalPrice, setOriginalPrice] = useState<number | "">("");
  const [discountPercent, setDiscountPercent] = useState<number | "">("");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
  };

  const calculateGst = () => {
    if (!gstAmount) return { base: 0, tax: 0, total: 0 };
    const amount = Number(gstAmount);
    if (gstMode === "add") {
      const tax = amount * (gstRate / 100);
      return { base: amount, tax: tax, total: amount + tax };
    } else {
      const base = amount / (1 + (gstRate / 100));
      const tax = amount - base;
      return { base: base, tax: tax, total: amount };
    }
  };

  const calculateEmi = () => {
    if (!loanAmount || !interestRate || !loanTenure) return { emi: 0, totalInterest: 0, totalPayment: 0 };
    const p = Number(loanAmount);
    const r = Number(interestRate) / 12 / 100;
    const n = Number(loanTenure);
    
    // EMI = P x R x (1+R)^N / [(1+R)^N-1]
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    return {
      emi: emi,
      totalInterest: totalPayment - p,
      totalPayment: totalPayment
    };
  };

  const calculateAge = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAgeResult({ years, months, days });
  };

  const calculateDiscount = () => {
    if (!originalPrice || !discountPercent) return { discountValue: 0, finalPrice: 0 };
    const p = Number(originalPrice);
    const d = Number(discountPercent);
    const discountValue = p * (d / 100);
    return {
      discountValue: discountValue,
      finalPrice: p - discountValue
    };
  };

  const { base: gstBase, tax: gstTax, total: gstTotal } = calculateGst();
  const { emi, totalInterest, totalPayment } = calculateEmi();
  const { discountValue, finalPrice } = calculateDiscount();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full block">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Utility Calculators</h1>
        <p className="text-gray-600">
           Fast, offline mathematical calculators for daily cyber cafe operations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
         {/* Sidebar Navigation */}
         <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto">
            <button 
               onClick={() => setActiveTab("gst")}
               className={`flex items-center gap-3 p-3 rounded-xl transition-colors font-medium text-sm whitespace-nowrap ${activeTab === 'gst' ? 'bg-white shadow-sm border border-gray-200 text-blue-600' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
               <Percent className="w-5 h-5" /> GST Calculator
            </button>
            <button 
               onClick={() => setActiveTab("emi")}
               className={`flex items-center gap-3 p-3 rounded-xl transition-colors font-medium text-sm whitespace-nowrap ${activeTab === 'emi' ? 'bg-white shadow-sm border border-gray-200 text-blue-600' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
               <IndianRupee className="w-5 h-5" /> EMI Calculator
            </button>
            <button 
               onClick={() => setActiveTab("age")}
               className={`flex items-center gap-3 p-3 rounded-xl transition-colors font-medium text-sm whitespace-nowrap ${activeTab === 'age' ? 'bg-white shadow-sm border border-gray-200 text-blue-600' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
               <Calendar className="w-5 h-5" /> Age Calculator
            </button>
            <button 
               onClick={() => setActiveTab("discount")}
               className={`flex items-center gap-3 p-3 rounded-xl transition-colors font-medium text-sm whitespace-nowrap ${activeTab === 'discount' ? 'bg-white shadow-sm border border-gray-200 text-blue-600' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
               <Calculator className="w-5 h-5" /> Discount Calculator
            </button>
         </div>

         {/* Content Area */}
         <div className="flex-1 p-6 md:p-8">
            
            {/* GST Calculator */}
            {activeTab === "gst" && (
               <div className="space-y-6 max-w-md mx-auto">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">GST Calculator</h2>
                  
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                     <button onClick={() => setGstMode("add")} className={`flex-1 py-2 text-sm font-medium rounded-lg ${gstMode === 'add' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Add GST (+)</button>
                     <button onClick={() => setGstMode("remove")} className={`flex-1 py-2 text-sm font-medium rounded-lg ${gstMode === 'remove' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Remove GST (-)</button>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Original Amount</label>
                     <input 
                        type="number" 
                        value={gstAmount}
                        onChange={(e) => setGstAmount(e.target.value ? Number(e.target.value) : "")}
                        placeholder="₹ 0.00"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">GST Rate</label>
                     <div className="flex flex-wrap gap-2">
                        {[0, 5, 12, 18, 28].map(rate => (
                           <button 
                              key={rate} 
                              onClick={() => setGstRate(rate)}
                              className={`px-4 py-2 rounded-xl text-sm font-medium border ${gstRate === rate ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                           >
                              {rate}%
                           </button>
                        ))}
                     </div>
                  </div>

                  {gstAmount !== "" && (
                     <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-4">
                        <div className="flex justify-between text-blue-800">
                           <span>Net Amount:</span>
                           <span className="font-medium">{formatCurrency(gstBase)}</span>
                        </div>
                        <div className="flex justify-between text-blue-800">
                           <span>GST Amount ({gstRate}%):</span>
                           <span className="font-medium">{formatCurrency(gstTax)}</span>
                        </div>
                        <div className="border-t border-blue-200/50 pt-4 flex justify-between text-blue-900 font-bold text-lg">
                           <span>Total Amount:</span>
                           <span>{formatCurrency(gstTotal)}</span>
                        </div>
                     </div>
                  )}
               </div>
            )}

            {/* EMI Calculator */}
            {activeTab === "emi" && (
               <div className="space-y-6 max-w-md mx-auto">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Loan EMI Calculator</h2>
                  
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (Principal)</label>
                     <input 
                        type="number" 
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value ? Number(e.target.value) : "")}
                        placeholder="₹ 500000"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                        <input 
                           type="number" 
                           value={interestRate}
                           onChange={(e) => setInterestRate(e.target.value ? Number(e.target.value) : "")}
                           placeholder="8.5"
                           className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Months)</label>
                        <input 
                           type="number" 
                           value={loanTenure}
                           onChange={(e) => setLoanTenure(e.target.value ? Number(e.target.value) : "")}
                           placeholder="60"
                           className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                        />
                     </div>
                  </div>

                  {loanAmount !== "" && interestRate !== "" && loanTenure !== "" && !isNaN(emi) && emi > 0 && (
                     <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 space-y-4">
                        <div className="flex justify-between text-emerald-800">
                           <span>Monthly EMI:</span>
                           <span className="font-bold text-lg">{formatCurrency(emi)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-800 text-sm">
                           <span>Principal Amount:</span>
                           <span>{formatCurrency(Number(loanAmount))}</span>
                        </div>
                        <div className="flex justify-between text-emerald-800 text-sm">
                           <span>Total Interest:</span>
                           <span>{formatCurrency(totalInterest)}</span>
                        </div>
                        <div className="border-t border-emerald-200/50 pt-3 flex justify-between text-emerald-900 font-bold">
                           <span>Total Payment:</span>
                           <span>{formatCurrency(totalPayment)}</span>
                        </div>
                     </div>
                  )}
               </div>
            )}

            {/* Age Calculator */}
            {activeTab === "age" && (
               <div className="space-y-6 max-w-md mx-auto">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Age Calculator</h2>
                  
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                     <div className="flex gap-4">
                        <input 
                           type="date" 
                           value={dob}
                           onChange={(e) => setDob(e.target.value)}
                           className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                        />
                        <button 
                           onClick={calculateAge}
                           className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                        >
                           Calculate
                        </button>
                     </div>
                  </div>

                  {ageResult && (
                     <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 text-center">
                        <div className="text-indigo-600 text-sm font-medium mb-2">Current Age</div>
                        <div className="text-4xl font-extrabold text-indigo-900">
                           {ageResult.years} <span className="text-lg font-medium text-indigo-700">Years</span>
                        </div>
                        <div className="text-xl font-bold text-indigo-800 mt-2">
                           {ageResult.months} <span className="text-sm font-medium text-indigo-600">Months</span> &nbsp;
                           {ageResult.days} <span className="text-sm font-medium text-indigo-600">Days</span>
                        </div>
                     </div>
                  )}
               </div>
            )}

            {/* Discount Calculator */}
            {activeTab === "discount" && (
               <div className="space-y-6 max-w-md mx-auto">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Discount Calculator</h2>
                  
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                     <input 
                        type="number" 
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : "")}
                        placeholder="₹ 0.00"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage (%)</label>
                     <input 
                        type="number" 
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value ? Number(e.target.value) : "")}
                        placeholder="15"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                     />
                  </div>

                  {originalPrice !== "" && discountPercent !== "" && (
                     <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 space-y-4">
                        <div className="flex justify-between text-amber-800">
                           <span>Original Price:</span>
                           <span className="line-through">{formatCurrency(Number(originalPrice))}</span>
                        </div>
                        <div className="flex justify-between text-amber-800">
                           <span>You Save:</span>
                           <span>{formatCurrency(discountValue)}</span>
                        </div>
                        <div className="border-t border-amber-200/50 pt-4 flex justify-between text-amber-900 font-bold text-lg">
                           <span>Final Price (to pay):</span>
                           <span>{formatCurrency(finalPrice)}</span>
                        </div>
                     </div>
                  )}
               </div>
            )}

         </div>
      </div>
    </div>
  );
}
