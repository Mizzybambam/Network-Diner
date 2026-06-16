"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MoveRight } from "lucide-react";

export default function EntryMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const exploreBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.to(gridRef.current, {
        opacity: 0.15,
        duration: 2,
        ease: "power2.inOut",
      })
      .fromTo(titleRef.current, 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" }, 
        "-=1"
      )
      .fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=1"
      )
      .fromTo(exploreBtnRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // Simple grid animation
      gsap.to(".grid-line-vertical", {
        yPercent: 100,
        duration: 10,
        repeat: -1,
        ease: "linear",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });
      gsap.to(".grid-line-horizontal", {
        xPercent: 100,
        duration: 10,
        repeat: -1,
        ease: "linear",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202]">
      {/* Animated Grid Background */}
      <div ref={gridRef} className="absolute inset-0 opacity-0 pointer-events-none flex justify-center items-center">
        {/* We can simulate a spatial grid */}
        <div className="absolute w-[200vw] h-[200vh] border border-white/5 rounded-full blur-[100px]" />
        
        {/* Vertical lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`v-${i}`} className="grid-line-vertical absolute top-[-100%] w-[1px] h-[300%] bg-gradient-to-b from-transparent via-white/10 to-transparent" style={{ left: `${(i+1) * 10}%` }} />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`h-${i}`} className="grid-line-horizontal absolute left-[-100%] h-[1px] w-[300%] bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ top: `${(i+1) * 10}%` }} />
        ))}
        
        {/* Central glowing orb */}
        <div className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono text-atlas-muted uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          System Online
        </div>
        
        <h1 ref={titleRef} className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-6 font-[family-name:var(--font-space)] leading-none">
          Freelance<br/>Atlas
        </h1>
        
        <p ref={subtitleRef} className="text-lg md:text-xl text-atlas-muted max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed mb-10">
          A living, global map of premium talent and creative nodes. Explore a borderless ecosystem of developers, designers, and strategists.
        </p>
        
        <button ref={exploreBtnRef} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 flex items-center gap-3 font-[family-name:var(--font-space)]">
          <span className="relative z-10 flex items-center gap-2">
            Explore the Map <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity z-0" />
        </button>
      </div>

      <div className="absolute bottom-10 left-10 text-xs font-mono text-white/30 flex flex-col gap-1">
        <span>LAT: 40.7128° N</span>
        <span>LNG: 74.0060° W</span>
      </div>
      
      <div className="absolute bottom-10 right-10 text-xs font-mono text-white/30 flex flex-col gap-1 text-right">
        <span>NODES: 8,492</span>
        <span>CONNECTIONS: OPTIMAL</span>
      </div>
    </section>
  );
}
