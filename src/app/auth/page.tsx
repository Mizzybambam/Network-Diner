"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveLeft, Coffee } from "lucide-react";

export default function AuthPage() {
  const [role, setRole] = useState<"employer" | "freelancer" | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#0C0A09] text-[#FDF8F5] flex flex-col items-center justify-center relative overflow-hidden font-[family-name:var(--font-inter)]">
      {/* Background Diner Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-amber-500 transition-colors z-20 font-mono text-sm uppercase tracking-widest">
        <MoveLeft size={16} /> Exit Diner
      </Link>
      
      <div className="relative z-10 w-full max-w-md bg-[#120F0C] p-10 border border-white/10 rounded-3xl shadow-2xl">
        <div className="flex justify-center mb-6">
           <Coffee className="text-amber-500" size={48} />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-center font-[family-name:var(--font-space)]">
          {isLogin ? "Welcome Back" : "Grab a Seat"}
        </h1>
        <p className="text-white/50 text-center mb-10">
          {isLogin ? "Your usual table is ready." : "Are you looking to hire or looking to work?"}
        </p>
        
        {!isLogin && (
          <div className="flex flex-col gap-4 mb-8">
            <button 
              onClick={() => setRole("employer")}
              className={`p-5 rounded-2xl border transition-all text-left flex flex-col gap-1 ${role === "employer" ? "bg-amber-600 text-white border-amber-500 scale-105" : "bg-[#1A1510] border-white/10 hover:border-amber-500/50 text-white"}`}
            >
              <h3 className="font-bold text-lg font-[family-name:var(--font-space)]">I'm an Employer</h3>
              <p className={role === "employer" ? "text-white/90 text-sm" : "text-white/40 text-sm"}>I need top-tier talent for my kitchen.</p>
            </button>
            
            <button 
              onClick={() => setRole("freelancer")}
              className={`p-5 rounded-2xl border transition-all text-left flex flex-col gap-1 ${role === "freelancer" ? "bg-amber-600 text-white border-amber-500 scale-105" : "bg-[#1A1510] border-white/10 hover:border-amber-500/50 text-white"}`}
            >
              <h3 className="font-bold text-lg font-[family-name:var(--font-space)]">I'm a Freelancer</h3>
              <p className={role === "freelancer" ? "text-white/90 text-sm" : "text-white/40 text-sm"}>I want to take orders and cook.</p>
            </button>
          </div>
        )}

        {/* Form Fields - Only Username and Password! */}
                <form className="flex flex-col gap-4" onSubmit={(e) => { 
          e.preventDefault(); 
          const form = e.target as HTMLFormElement;
          const username = (form.elements[0] as HTMLInputElement).value;
          localStorage.setItem("diner_role", isLogin ? "employer" : (role || "employer"));
          localStorage.setItem("diner_username", username);
          window.location.href = "/dashboard";
        }}>
          <input 
            type="text" 
            placeholder="Username" 
            required
            className="w-full p-4 bg-[#1A1510] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            className="w-full p-4 bg-[#1A1510] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors" 
          />
          <button 
            type="submit" 
            className={`w-full p-4 mt-4 font-bold rounded-xl transition-all font-[family-name:var(--font-space)] ${(role || isLogin) ? "bg-amber-600 text-white hover:bg-amber-500 cursor-pointer shadow-[0_0_15px_rgba(217,119,6,0.3)]" : "bg-white/5 text-white/30 cursor-not-allowed"}`}
            disabled={!isLogin && !role}
          >
            {isLogin ? "Take a Seat" : "Open Your Tab"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-white/50">
          {isLogin ? "First time at the Diner?" : "Already have a tab open?"}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 text-amber-500 hover:text-amber-400 font-bold transition-colors">
            {isLogin ? "Grab a Seat" : "Sign in"}
          </button>
        </div>
      </div>
    </main>
  );
}