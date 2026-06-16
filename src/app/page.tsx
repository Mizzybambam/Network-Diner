"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Search, Star, Coffee, Zap, Shield, Quote, SlidersHorizontal, ArrowRight } from "lucide-react";
import freelancersData from "@/data/freelancers.json";
import TalentDetailModal from "@/components/profiles/TalentDetailModal";

export default function Home() {
  const [selectedFreelancerId, setSelectedFreelancerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [activeCategory, setActiveCategory] = useState("All");

  // The 10 specific skills listed out
  const categories = ["All", "Frontend", "Backend", "UI/UX", "Branding", "Motion", "3D", "Copywriting", "Mobile", "SEO", "Web3"];

  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.fromTo(".hero-element", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // Add fade-in animation when category changes
  useEffect(() => {
    gsap.fromTo(".menu-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeCategory, searchQuery, maxPrice]);

  const filteredFreelancers = freelancersData.filter((f) => {
    const matchesSearch = f.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          f.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = f.rate <= maxPrice;
    const matchesCategory = activeCategory === "All" || f.categoryId === activeCategory;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <main className="relative w-full overflow-hidden bg-[#0C0A09] text-[#FDF8F5] font-[family-name:var(--font-inter)]">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-[#0C0A09]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3 font-bold font-[family-name:var(--font-space)] text-xl tracking-tight">
          <Coffee className="text-amber-500" size={24} />
          NETWORK DINER
        </div>
        <div className="flex gap-6 items-center">
          <Link href="#menu" className="text-sm font-medium text-white/70 hover:text-amber-500 transition-colors hidden md:block">The Menu</Link>
          <Link href="#about" className="text-sm font-medium text-white/70 hover:text-amber-500 transition-colors hidden md:block">Our Story</Link>
          <Link href="/auth" className="px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-500 transition-colors shadow-[0_0_15px_rgba(217,119,6,0.3)]">
            Grab a Seat
          </Link>
        </div>
      </header>

      {/* PROMO BANNER */}
      <div className="w-full bg-amber-600/10 border-b border-amber-600/20 py-3 mt-[76px] flex justify-center items-center gap-2 text-amber-500 text-sm font-medium px-4 text-center z-40 relative">
        <Zap size={16} className="animate-pulse" />
        <span>The Early Bird Special: <strong>0% platform fees</strong> for your first 5 successful jobs. 10% thereafter.</span>
      </div>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative w-full pt-20 pb-32 px-6 flex flex-col items-center text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-amber-600/10 rounded-[100%] blur-[120px] pointer-events-none" />
        <h1 className="hero-element text-5xl md:text-7xl font-bold font-[family-name:var(--font-space)] tracking-tight mb-6 leading-tight max-w-4xl">
          Welcome to Network Diner.
        </h1>
        <p className="hero-element text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed mb-10">
          Pull up a chair. The internet's premium hub where elite freelancers and ambitious founders share a table. No bidding wars. No hidden menus.
        </p>
        <div className="hero-element flex flex-col md:flex-row gap-4">
          <Link href="#menu" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">Browse the Menu</Link>
          <Link href="/auth" className="px-8 py-4 bg-[#1A1510] border border-white/10 text-white font-bold rounded-full hover:bg-[#2A241D] transition-colors">Hire Talent</Link>
        </div>
      </section>

      {/* THE MENU */}
      <section id="menu" className="relative w-full py-24 px-6 bg-[#120F0C] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-space)] mb-3">The Menu</h2>
              <p className="text-white/50">10 premium skillsets. Handpicked talent.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Search skills or names..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#1A1510] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12 bg-[#1A1510] p-4 rounded-2xl border border-white/5">
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-amber-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto shrink-0">
              <SlidersHorizontal size={20} className="text-white/40" />
              <span className="text-sm text-white/60 font-mono">Max: ${maxPrice}/hr</span>
              <input type="range" min="50" max="300" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-32 md:w-48 accent-amber-500"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <div key={freelancer.id} onClick={() => setSelectedFreelancerId(freelancer.id)} className="menu-card p-6 bg-[#1A1510] border border-white/5 rounded-2xl cursor-pointer hover:border-amber-500/50 transition-all group flex flex-col relative overflow-hidden">
                {freelancer.rating >= 4.9 && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg">CHEF'S CHOICE</div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <img src={freelancer.avatar} alt={freelancer.name} className="w-14 h-14 rounded-full object-cover border border-white/10" />
                  <div>
                    <h3 className="font-bold font-[family-name:var(--font-space)] group-hover:text-amber-400 transition-colors">{freelancer.name}</h3>
                    <p className="text-xs text-white/50">{freelancer.skill}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5 font-mono text-xs">
                  <span className="text-amber-500">${freelancer.rate}/hr</span>
                  <span className="flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/>{freelancer.rating}</span>
                </div>
              </div>
            ))}
          </div>
          {filteredFreelancers.length === 0 && (
             <div className="w-full py-24 text-center text-white/40 border border-white/5 border-dashed rounded-2xl">No freelancers found. Try adjusting filters.</div>
          )}
        </div>
      </section>

      {/* WHY WE ARE DIFFERENT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-4">Why We Are Different</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Most freelance platforms are a race to the bottom. Network Diner is built like a private professional network.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#120F0C] p-8 rounded-3xl border border-white/5">
              <Shield size={24} className="text-amber-500 mb-6" />
              <h3 className="text-xl font-bold mb-3">For Employers</h3>
              <p className="text-white/60 text-sm">Skip the noisy bidding wars. Sit down directly with verified professionals who deliver high-end results.</p>
            </div>
            <div className="bg-[#120F0C] p-8 rounded-3xl border border-white/5 md:-translate-y-4">
              <Coffee size={24} className="text-amber-500 mb-6" />
              <h3 className="text-xl font-bold mb-3">The Diner Promise</h3>
              <p className="text-white/60 text-sm">0% platform fees on your first 5 successful contracts. 10% after that. Fair, transparent pricing.</p>
            </div>
            <div className="bg-[#120F0C] p-8 rounded-3xl border border-white/5">
              <Zap size={24} className="text-amber-500 mb-6" />
              <h3 className="text-xl font-bold mb-3">For Freelancers</h3>
              <p className="text-white/60 text-sm">Keep what you earn. Work with founders who respect your craft and understand the value of premium work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RATINGS / TESTIMONIALS */}
      <section className="py-24 px-6 bg-[#1A1510] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl font-bold font-[family-name:var(--font-space)] mb-16">Overheard at the Diner</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Employer Reviews (4) */}
            <div>
              <h3 className="text-xl font-bold text-amber-500 mb-6 border-b border-white/10 pb-2">From Employers</h3>
              <div className="space-y-6">
                {[
                  { name: "Marcus V.", text: "Found a killer React dev in hours, not weeks. Top tier." },
                  { name: "Sarah L.", text: "The 0% fee on the first 5 hires saved my startup thousands." },
                  { name: "David T.", text: "No bidding wars. Just a clean menu of professionals." },
                  { name: "Jessica M.", text: "Hired a UI designer for our SaaS. Flawless execution." }
                ].map((r, i) => (
                  <div key={i} className="bg-[#0C0A09] p-4 rounded-xl border border-white/5 relative">
                    <Quote className="absolute top-4 right-4 text-white/5" size={24} />
                    <p className="text-sm text-white/80 italic mb-2">"{r.text}"</p>
                    <span className="text-xs font-bold text-white/50">- {r.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Freelancer Reviews (5) */}
            <div>
              <h3 className="text-xl font-bold text-amber-500 mb-6 border-b border-white/10 pb-2">From Freelancers</h3>
              <div className="space-y-6">
                {[
                  { name: "Elena R.", text: "Finally, clients who respect the craft and pay the rate." },
                  { name: "John K.", text: "Keeping 100% of my early earnings helped me go full-time." },
                  { name: "Alex W.", text: "The speakeasy vibe attracts premium founders. Love it here." },
                  { name: "Priya P.", text: "Left Upwork for this. Never looking back." },
                  { name: "Sam B.", text: "Direct communication, no middleman friction. Pure bliss." }
                ].map((r, i) => (
                  <div key={i} className="bg-[#0C0A09] p-4 rounded-xl border border-white/5 relative">
                    <Quote className="absolute top-4 right-4 text-white/5" size={24} />
                    <p className="text-sm text-white/80 italic mb-2">"{r.text}"</p>
                    <span className="text-xs font-bold text-white/50">- {r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MASSIVE FINAL CTA */}
      <section ref={ctaRef} className="py-32 px-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Glow effect matching the hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-amber-600/10 rounded-[100%] blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <Coffee className="text-amber-500 mx-auto mb-8" size={48} />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-space)] mb-6 tracking-tight">
            Ready to order?
          </h2>
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop scrolling through endless generic proposals. Sit down, open a tab, and hire exactly who you need today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/auth" 
              className="group relative px-10 py-5 bg-amber-600 text-white font-bold rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(217,119,6,0.3)] hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <span className="relative z-10 flex items-center gap-2 text-lg">
                Open Your Tab <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
            </Link>
            
            <span className="text-sm font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 50+ Chefs Online
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-white/5 bg-[#0C0A09]">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-space)] mb-2 text-white">Network Diner</h2>
        <p className="text-white/30 text-sm font-mono">Premium Talent Ecosystem. © 2026.</p>
      </footer>
      
      <TalentDetailModal freelancerId={selectedFreelancerId} onClose={() => setSelectedFreelancerId(null)} />
    </main>
  );
}