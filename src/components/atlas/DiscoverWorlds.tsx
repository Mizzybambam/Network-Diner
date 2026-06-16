"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import regionsData from "@/data/regions.json";
import freelancersData from "@/data/freelancers.json";
import { Region, Freelancer } from "@/types";
import FreelancerNode from "@/components/nodes/FreelancerNode";

export default function DiscoverWorlds({ onSelectFreelancer }: { onSelectFreelancer: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const regions = gsap.utils.toArray<HTMLElement>('.region-section');
      
      regions.forEach((region) => {
        const title = region.querySelector('.region-title');
        const desc = region.querySelector('.region-desc');
        const nodes = region.querySelectorAll('.freelancer-node-wrapper');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: region,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          }
        });

        tl.fromTo(title, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
          .fromTo(desc, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
          .fromTo(nodes, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }, 
            "-=0.4"
          );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#020202] py-32 flex flex-col gap-32">
      {regionsData.map((region: Region) => {
        const regionFreelancers = freelancersData.filter((f) => f.regionId === region.id);
        
        if (regionFreelancers.length === 0) return null;

        return (
          <div key={region.id} className="region-section relative w-full px-6 md:px-20">
            {/* Ambient Background Glow */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[500px] opacity-5 pointer-events-none blur-[150px]"
              style={{ backgroundColor: region.color }}
            />

            <div className="relative z-10 mb-12 max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px]" style={{ backgroundColor: region.color }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: region.color }}>
                  Sector {region.id.split('-')[0]}
                </span>
              </div>
              <h2 className="region-title text-4xl md:text-6xl font-bold font-[family-name:var(--font-space)] mb-4 text-white">
                {region.name}
              </h2>
              <p className="region-desc text-atlas-muted text-lg font-[family-name:var(--font-inter)]">
                {region.description}
              </p>
            </div>

            {/* Horizontal scrollable nodes container */}
            <div className="relative w-full">
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none" />
              <div className="w-full overflow-x-auto pb-10 no-scrollbar cursor-ew-resize">
                <div className="flex gap-24 px-8 min-w-max">
                  {regionFreelancers.map((freelancer) => (
                    <div key={freelancer.id} className="freelancer-node-wrapper">
                      <FreelancerNode 
                        freelancer={freelancer as Freelancer} 
                        color={region.color} 
                        onClick={onSelectFreelancer} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
