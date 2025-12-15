"use client";

export default function BackgroundGeometry() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-yellow-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      
      {/* Geometric Shapes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="0.2" fill="none" className="text-green-600" />
        <rect x="80" y="20" width="10" height="10" stroke="currentColor" strokeWidth="0.2" fill="none" transform="rotate(45 85 25)" className="text-blue-600" />
        <path d="M 20 80 L 30 95 L 10 95 Z" stroke="currentColor" strokeWidth="0.2" fill="none" className="text-yellow-600" />
        <circle cx="90" cy="80" r="8" stroke="currentColor" strokeWidth="0.2" fill="none" className="text-green-600" />
        <rect x="50" y="50" width="15" height="15" stroke="currentColor" strokeWidth="0.2" fill="none" transform="rotate(15 57.5 57.5)" className="text-blue-600" />
      </svg>

      <svg className="absolute top-0 right-0 opacity-[0.02]" width="100%" height="100%">
         <defs>
            <pattern id="grid-pattern-global" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none" className="text-gray-900"/>
            </pattern>
         </defs>
         <rect width="100%" height="100%" fill="url(#grid-pattern-global)" />
      </svg>
    </div>
  );
}
