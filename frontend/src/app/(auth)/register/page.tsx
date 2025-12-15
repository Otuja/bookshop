"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_confirm: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.password_confirm) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Use email as username if not provided or just rely on backend handling
      const dataToSend = {
        ...formData,
        username: formData.email.split('@')[0] // Simple username generation
      };
      
      await api.post("/auth/register/", dataToSend);
      toast({
        title: "Success",
        description: "Account created successfully. Please login.",
      });
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: JSON.stringify(error.response?.data) || "Registration failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative overflow-hidden">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-[#1B5E20] transition-colors group z-10"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="w-full max-w-md space-y-6 relative z-10">
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
               <Image src="/logo.png" alt="UNN Logo" fill className="object-contain" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
              <p className="text-sm text-gray-500 font-medium">Join the UNN Bookshop Community</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all placeholder:text-gray-400"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all placeholder:text-gray-400"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                placeholder="student@unn.edu.ng"
                className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all placeholder:text-gray-400"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all placeholder:text-gray-400"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all placeholder:text-gray-400"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1B5E20] hover:bg-[#144a18] text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center shadow-lg shadow-green-900/20"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Already have an account?</span>
              <Link href="/login" className="text-xs font-bold text-[#1B5E20] hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Green Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#00693E] relative items-center justify-center overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-10">
           <svg width="100%" height="100%">
             <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <circle cx="20" cy="20" r="1" fill="#fff" />
             </pattern>
             <rect width="100%" height="100%" fill="url(#pattern-circles)" />
           </svg>
        </div>
        
        {/* Big Circle Decoration */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full border border-white/10" />

        <div className="relative z-10 max-w-md w-full">
           <div className="mb-8 text-white space-y-2">
             <h2 className="text-3xl font-bold leading-tight">
               Start your academic journey<br />with UNN Bookshop.
             </h2>
           </div>

           <div className="bg-[#E8F5E9] rounded-3xl p-4 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                 <Image 
                   src="/auth.png" 
                   alt="Student"
                   fill
                   className="object-cover"
                 />
              </div>
           </div>

           {/* Rotating Badge */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute -bottom-12 -left-12 w-32 h-32 bg-white rounded-full flex items-center justify-center p-2 shadow-xl"
           >
              <div className="relative w-full h-full">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="curve"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text className="text-[11px] font-bold uppercase tracking-widest fill-[#00693E]">
                    <textPath href="#curve">
                      Join Us • Join Us • Join Us •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-2xl">🎓</span>
                </div>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
