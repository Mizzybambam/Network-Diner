"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import freelancersData from "@/data/freelancers.json";
import { Freelancer } from "@/types";
import { X, Star, Utensils, ExternalLink, Receipt, Link as LinkIcon } from "lucide-react";

interface TalentDetailModalProps {
  freelancerId: string | null;
  onClose: () => void;
}

export default function TalentDetailModal({ freelancerId, onClose }: TalentDetailModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);

  useEffect(() => {
    if (freelancerId) {
      const found = freelancersData.find(f => f.id === freelancerId);
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFreelancer(found as Freelancer);
        document.body.style.overflow = "hidden";
      }
    } else {
      setTimeout(() => {
        setFreelancer(null);
        document.body.style.overflow = "";
      }, 500);
    }
  }, [freelancerId]);

  useEffect(() => {
    if (freelancer && containerRef.current && contentRef.current) {
      gsap.set(containerRef.current, { display: "flex" });
      gsap.fromTo(contentRef.current, 
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.6, ease: "power4.out" }
      );
    } else if (!freelancer && contentRef.current) {
      gsap.to(contentRef.current, { x: "100%", opacity: 0, duration: 0.5, ease: "power3.in" });
      setTimeout(() => gsap.set(containerRef.current, { display: "none" }), 500);
    }
  }, [freelancer]);

  if (!freelancer && !freelancerId) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] hidden justify-end bg-black/60 backdrop-blur-sm">
      <div 
        ref={contentRef} 
        className="w-full md:w-[600px] h-full bg-[#120F0C] border-l border-white/10 shadow-2xl overflow-y-auto flex flex-col font-[family-name:var(--font-inter)]"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#120F0C]/90 backdrop-blur-md z-10">
          <div className="font-bold font-[family-name:var(--font-space)] text-xl flex items-center gap-2">
            <Receipt className="text-amber-500" />
            Diner Profile Tab
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {freelancer && (
          <div className="p-8 flex flex-col gap-8">
            <div className="flex gap-6 items-center">
              <img src={freelancer.avatar} alt={freelancer.name} className="w-24 h-24 rounded-full border-4 border-[#1A1510] shadow-[0_0_20px_rgba(217,119,6,0.15)]" />
              <div>
                {freelancer.rating >= 4.9 && (
                  <span className="text-[10px] uppercase tracking-widest bg-amber-500/20 text-amber-500 px-2 py-1 rounded-sm font-bold mb-2 inline-block border border-amber-500/30">
                    🏆 Chef's Choice
                  </span>
                )}
                <h1 className="text-3xl font-bold font-[family-name:var(--font-space)] text-white">{freelancer.name}</h1>
                <p className="text-amber-500 font-medium">{freelancer.skill}</p>
              </div>
            </div>

            <p className="text-lg text-white/70 leading-relaxed italic border-l-2 border-amber-500/30 pl-4">"{freelancer.bio}"</p>

            {/* The Tab (Stats) */}
            <div className="bg-[#1A1510] border border-white/5 rounded-2xl p-6 font-mono text-sm">
              <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                <span className="text-white/40 uppercase">Hourly Rate</span>
                <span className="text-white">${freelancer.rate}.00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                <span className="text-white/40 uppercase">Status</span>
                <span className={freelancer.availability === "Taking Orders" ? "text-green-400" : "text-orange-400"}>{freelancer.availability}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 uppercase">Diner Rating</span>
                <span className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-500"/> {freelancer.rating}/5.0</span>
              </div>
            </div>

            {/* Signature Dishes (Skills) */}
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-4 text-white/80 font-[family-name:var(--font-space)]">
                <Utensils size={18} className="text-amber-500" /> Signature Dishes
              </h3>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/90">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links & Proof of Work */}
            <div>
              <h3 className="font-bold mb-4 text-white/80 font-[family-name:var(--font-space)]">Proof of Work & Links</h3>
              <div className="flex flex-col gap-3">
                <a href={freelancer.portfolioUrl} target="_blank" className="flex items-center justify-between p-4 bg-[#1A1510] border border-white/5 rounded-xl hover:border-amber-500/50 transition-colors group">
                  <span className="font-medium text-white/80 group-hover:text-amber-500">View Full Portfolio</span>
                  <ExternalLink size={18} className="text-white/30 group-hover:text-amber-500" />
                </a>
                
                <div className="flex gap-3 mt-2">
                  {freelancer.socials.github && <a href={freelancer.socials.github} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><LinkIcon size={20} /></a>}
                  {freelancer.socials.twitter && <a href={freelancer.socials.twitter} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><LinkIcon size={20} /></a>}
                  {freelancer.socials.linkedin && <a href={freelancer.socials.linkedin} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><LinkIcon size={20} /></a>}
                  {freelancer.socials.dribbble && <a href={freelancer.socials.dribbble} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><LinkIcon size={20} /></a>}
                </div>
              </div>
            </div>

            <button className="w-full py-4 mt-6 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(217,119,6,0.2)]">
              Place an Order (Hire)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}