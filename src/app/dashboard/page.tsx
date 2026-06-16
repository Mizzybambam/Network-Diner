"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Coffee, LogOut, Search, Clock, CheckCircle2, Bookmark, CreditCard } from "lucide-react";
import freelancersData from "@/data/freelancers.json";

export default function Dashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // In a real app, this would be a secure token check.
    // Here we just grab it from local storage for the prototype.
    const role = localStorage.getItem("diner_role");
    const name = localStorage.getItem("diner_username");
    
    if (!role || !name) {
      router.push("/auth");
    } else {
      setUserRole(role);
      setUserName(name);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("diner_role");
    localStorage.removeItem("diner_username");
    router.push("/");
  };

  if (!userRole) return <div className="min-h-screen bg-[#0C0A09] text-white flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen w-full bg-[#0C0A09] text-[#FDF8F5] font-[family-name:var(--font-inter)]">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center bg-[#120F0C] border-b border-white/5 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3 font-bold font-[family-name:var(--font-space)] text-xl">
          <Coffee className="text-amber-500" size={24} />
          NETWORK DINER
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-white/50 text-sm font-mono tracking-widest hidden md:inline-block">STATUS: {userRole === "employer" ? "SEATED" : "IN KITCHEN"}</span>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/50 hover:text-amber-500 transition-colors text-sm font-bold">
            <LogOut size={16} /> Leave
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-2">
            Hi, {userName}.
          </h1>
          <p className="text-white/50 text-lg">
            {userRole === "employer" ? "Here is your open tab and active orders." : "Here are your current tickets and earnings."}
          </p>
        </div>

        {userRole === "employer" ? <EmployerDashboard /> : <FreelancerDashboard />}
      </div>
    </main>
  );
}

function EmployerDashboard() {
  const savedTalent = freelancersData.slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column (2/3) */}
      <div className="lg:col-span-2 space-y-8">
        <section className="bg-[#120F0C] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] mb-6 flex items-center gap-2">
            <Clock className="text-amber-500" /> Active Orders
          </h2>
          <div className="p-6 bg-[#1A1510] rounded-2xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500 animate-pulse">
                <Coffee size={20} />
              </div>
              <div>
                <h4 className="font-bold text-lg">SaaS Dashboard UI</h4>
                <p className="text-white/50 text-sm">Being prepared by <span className="text-white">Chloe Dubois</span></p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-xs font-bold mb-1">IN PROGRESS</span>
              <p className="text-white/40 text-xs font-mono">Est. Delivery: 2 Days</p>
            </div>
          </div>
        </section>

        <section className="bg-[#120F0C] border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] mb-6 flex items-center gap-2">
            <Bookmark className="text-amber-500" /> Saved Dishes (Talent)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedTalent.map(talent => (
              <div key={talent.id} className="p-4 bg-[#1A1510] border border-white/5 rounded-2xl flex items-center gap-4 group cursor-pointer hover:border-amber-500/30 transition-colors">
                <img src={talent.avatar} alt={talent.name} className="w-12 h-12 rounded-full border border-white/10" />
                <div>
                  <h4 className="font-bold group-hover:text-amber-400 transition-colors">{talent.name}</h4>
                  <p className="text-xs text-white/50">{talent.skill}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column (1/3) */}
      <div className="space-y-8">
        <section className="bg-[#120F0C] border border-white/5 rounded-3xl p-8 font-mono relative overflow-hidden">
          <div className="absolute -top-4 -right-4 text-white/5 rotate-12 pointer-events-none">
            <CreditCard size={120} />
          </div>
          <h2 className="text-lg uppercase tracking-widest text-white/40 mb-6">Your Tab</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-white/60">Total Spent</span>
              <span className="text-white">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Active Escrow</span>
              <span className="text-amber-500">$2,400.00</span>
            </div>
          </div>
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <p className="text-xs text-amber-500 font-bold mb-1">0% Fee Promo Active</p>
            <p className="text-[10px] text-amber-500/70">You have 4 fee-free contracts remaining.</p>
            <div className="w-full h-1 bg-amber-500/20 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-amber-500 w-1/5 rounded-full" />
            </div>
          </div>
        </section>

        <Link href="/#menu" className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(217,119,6,0.2)] flex justify-center items-center gap-2">
          <Search size={18} /> Browse Menu
        </Link>
      </div>
    </div>
  );
}

function FreelancerDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-8">
        <section className="bg-[#120F0C] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] mb-6 flex items-center gap-2">
            <Coffee className="text-amber-500" /> Current Tickets
          </h2>
          <div className="p-6 bg-[#1A1510] rounded-2xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center font-bold text-white">
                MV
              </div>
              <div>
                <h4 className="font-bold text-lg">Landing Page Rebrand</h4>
                <p className="text-white/50 text-sm">Client: <span className="text-white">Marcus Vance</span></p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold mb-1">FUNDED</span>
              <p className="text-white/40 text-xs font-mono">Amount: $1,200</p>
            </div>
          </div>
        </section>

        <section className="bg-[#120F0C] border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-amber-500" /> Past Orders
          </h2>
          <div className="w-full py-12 text-center text-white/30 border border-white/5 border-dashed rounded-xl font-mono text-sm">
            No completed orders yet. Get cooking!
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        <section className="bg-[#120F0C] border border-white/5 rounded-3xl p-8 font-mono">
          <h2 className="text-lg uppercase tracking-widest text-white/40 mb-6">Earnings</h2>
          <div className="text-4xl font-bold text-white mb-2">$0.00</div>
          <p className="text-white/40 text-xs mb-8">Available for withdrawal</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-xs">
              <span className="text-white/60">Pending Clearance</span>
              <span className="text-white">$1,200.00</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/60">Platform Fee</span>
              <span className="text-green-400">0% (Promo)</span>
            </div>
          </div>
          <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors border border-white/10 text-sm">
            Withdraw Funds
          </button>
        </section>
      </div>
    </div>
  );
}