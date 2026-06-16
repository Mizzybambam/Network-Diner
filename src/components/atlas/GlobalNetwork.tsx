"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>('.network-path');
      const nodes = gsap.utils.toArray<SVGCircleElement>('.network-node');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(paths, 
        { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 },
        { strokeDashoffset: 0, opacity: 0.3, duration: 2, stagger: 0.1, ease: "power2.inOut" }
      )
      .fromTo(nodes,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(2)" },
        "-=1.5"
      );

      // Continuous subtle breathing animation
      gsap.to(nodes, {
        scale: 1.2,
        opacity: 0.8,
        duration: "random(1.5, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] bg-[#020202] flex items-center justify-center overflow-hidden border-y border-white/5">
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none mix-blend-difference">
        <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space)] text-white text-center mb-6 max-w-4xl tracking-tighter">
          A Boundless<br/>Ecosystem
        </h2>
        <p className="text-xl text-white/60 font-[family-name:var(--font-inter)] max-w-xl text-center">
          Talent isn&apos;t confined to cities anymore. It&apos;s an interconnected mesh of global creativity.
        </p>
      </div>

      <svg ref={svgRef} className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        {/* Abstract interconnected map */}
        <g stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
          <path className="network-path" d="M 100 300 Q 250 150 400 300 T 700 300 T 900 100" />
          <path className="network-path" d="M 200 500 Q 300 400 500 450 T 800 200" />
          <path className="network-path" d="M 50 100 Q 200 300 350 200 T 600 400 T 850 500" />
          <path className="network-path" d="M 300 100 Q 450 250 600 100 T 900 400" />
          <path className="network-path" d="M 150 400 Q 350 550 550 350 T 750 150" />
          <path className="network-path" d="M 400 300 L 500 450 L 600 400 L 700 300" />
          <path className="network-path" d="M 350 200 L 400 300 L 600 100" />
        </g>
        
        <g fill="#fff">
          <circle className="network-node" cx="100" cy="300" r="3" fill="#33CCFF" />
          <circle className="network-node" cx="400" cy="300" r="5" fill="#FF3366" />
          <circle className="network-node" cx="700" cy="300" r="4" fill="#33FF99" />
          <circle className="network-node" cx="900" cy="100" r="3" fill="#B833FF" />
          
          <circle className="network-node" cx="200" cy="500" r="3" fill="#FF9933" />
          <circle className="network-node" cx="500" cy="450" r="6" fill="#33CCFF" />
          <circle className="network-node" cx="800" cy="200" r="4" fill="#FF3333" />
          
          <circle className="network-node" cx="50" cy="100" r="2" fill="#33FF99" />
          <circle className="network-node" cx="350" cy="200" r="5" fill="#B833FF" />
          <circle className="network-node" cx="600" cy="400" r="4" fill="#FF3366" />
          <circle className="network-node" cx="850" cy="500" r="3" fill="#FF9933" />
          
          <circle className="network-node" cx="300" cy="100" r="4" fill="#33CCFF" />
          <circle className="network-node" cx="600" cy="100" r="5" fill="#33FF99" />
          <circle className="network-node" cx="900" cy="400" r="4" fill="#FF3333" />
          
          <circle className="network-node" cx="150" cy="400" r="3" fill="#FF3366" />
          <circle className="network-node" cx="550" cy="350" r="5" fill="#FF9933" />
          <circle className="network-node" cx="750" cy="150" r="4" fill="#33CCFF" />
        </g>
      </svg>
    </section>
  );
}
