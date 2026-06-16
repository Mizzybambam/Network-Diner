"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { Freelancer } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface FreelancerNodeProps {
  freelancer: Freelancer;
  color: string;
  onClick: (id: string) => void;
}

export default function FreelancerNode({ freelancer, color, onClick }: FreelancerNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(infoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "expo.out"
    });
    gsap.to(nodeRef.current, {
      scale: 1.02,
      borderColor: color,
      boxShadow: `0 0 30px ${color}20`,
      duration: 0.5,
      ease: "expo.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(infoRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: "power2.inOut"
    });
    gsap.to(nodeRef.current, {
      scale: 1,
      borderColor: "rgba(255,255,255,0.1)",
      boxShadow: "none",
      duration: 0.4,
      ease: "power2.inOut"
    });
  };

  return (
    <div 
      className="relative shrink-0 w-[300px] md:w-[400px] h-[450px] md:h-[550px] group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(freelancer.id)}
    >
      {/* Connector lines simulating a network */}
      <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors" />
      <div className="absolute top-1/2 -right-8 w-8 h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors" />

      <div 
        ref={nodeRef}
        className="w-full h-full rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md overflow-hidden flex flex-col transition-colors relative z-10"
      >
        <div className="h-1/2 relative bg-black overflow-hidden">
          {freelancer.projects.length > 0 && (
            <Image 
              src={freelancer.projects[0].image} 
              alt={freelancer.projects[0].title || "Project"} 
              fill
              className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-110 ease-out"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono">
            <div className={`w-2 h-2 rounded-full ${freelancer.availability.includes('Now') ? 'bg-green-500' : 'bg-orange-500'}`} />
            {freelancer.availability}
          </div>
        </div>

        <div className="p-6 flex flex-col grow relative z-10 bg-[#0A0A0A]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-[family-name:var(--font-space)] text-xl font-semibold text-white tracking-tight">{freelancer.name}</h3>
              <p className="text-atlas-muted text-sm font-medium">{freelancer.skill}</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden relative">
              <Image src={freelancer.avatar} alt={freelancer.name} fill className="object-cover" />
            </div>
          </div>
          
          <div className="mt-auto">
            <div 
              ref={infoRef}
              className="opacity-0 translate-y-2 flex justify-between items-end border-t border-white/10 pt-4"
            >
              <div className="flex flex-col gap-1 text-sm font-mono text-white/50">
                <span>⭐ {freelancer.rating}</span>
                <span>${freelancer.rate}/hr</span>
              </div>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: isHovered ? color : 'rgba(255,255,255,0.05)', color: isHovered ? '#000' : '#fff' }}
              >
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
