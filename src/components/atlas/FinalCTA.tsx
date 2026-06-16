"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom bottom",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[60vh] md:h-[80vh] bg-black flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-white/5 rounded-[100%] blur-[120px] pointer-events-none" />
      
      <div ref={textRef} className="relative z-10 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-[family-name:var(--font-space)] text-white tracking-tighter mb-8 leading-tight max-w-5xl">
          Find the right talent<br/>anywhere in the world.
        </h2>
        
        <div className="w-16 h-1 bg-white mb-10" />
        
        <p className="text-atlas-muted font-mono text-sm tracking-[0.2em] uppercase">
          The Freelance Atlas &copy; 2026
        </p>
      </div>
      
      {/* Visual coordinates decoration */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/30" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/30" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/30" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/30" />
    </section>
  );
}
