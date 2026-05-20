import Link from "next/link";
import { 
  Scissors, 
  FileText, 
  Image as ImageIcon, 
  Briefcase,
  Wand2,
  Lock,
  ArrowRight,
  Calculator
} from "lucide-react";

export const metadata = {
  title: 'All Tools - CyberNex',
};

const categories = [
  {
    name: "Photo & Image Processing",
    icon: <ImageIcon className="w-5 h-5 text-purple-500" />,
    color: "border-purple-100 bg-purple-50/50",
    tools: [
      { name: "Image Compressor", desc: "Reduce size down to KB", href: "/tools/image" },
      { name: "Background Remover", desc: "Local AI driven removal", href: "/tools/image" },
    ]
  },
  {
    name: "PDF Utilities",
    icon: <FileText className="w-5 h-5 text-red-500" />,
    color: "border-red-100 bg-red-50/50",
    tools: [
      { name: "Merge PDF", desc: "Combine multiple PDFs offline", href: "/tools/pdf" },
    ]
  },
  {
    name: "Cyber Cafe Essentials",
    icon: <Briefcase className="w-5 h-5 text-emerald-500" />,
    color: "border-emerald-100 bg-emerald-50/50",
    tools: [
      { name: "QR Generator", desc: "Create codes instantly", href: "/tools/cyber-cafe" },
      { name: "Text Formatter", desc: "Word counts, case conversions", href: "/tools/cyber-cafe" },
    ]
  },
  {
    name: "Utility Calculators",
    icon: <Calculator className="w-5 h-5 text-blue-500" />,
    color: "border-blue-100 bg-blue-50/50",
    tools: [
      { name: "GST Calculator", desc: "Instant Add/Remove GST", href: "/tools/calculators" },
      { name: "EMI Calculator", desc: "Loan math offline", href: "/tools/calculators" },
      { name: "Age Calculator", desc: "Years, months, days", href: "/tools/calculators" },
      { name: "Discount Calculator", desc: "Find final price easily", href: "/tools/calculators" },
    ]
  }
];

export default function ToolsCatalog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">All CyberNex Tools</h1>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-green-600" />
          Everything runs locally on your device for absolute privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 line-clamp-3">
        {categories.map(category => (
          <div key={category.name} className={`rounded-3xl border ${category.color} p-6 flex flex-col`}>
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                   {category.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
             </div>
             <div className="space-y-3 flex-1">
                {category.tools.map(tool => (
                   <Link key={tool.name} href={tool.href} className="group block p-4 bg-white rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-md transition-all">
                      <div className="flex justify-between items-center">
                         <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
                         </div>
                         <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                   </Link>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
