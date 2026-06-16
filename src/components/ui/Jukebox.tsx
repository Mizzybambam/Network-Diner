"use client";

import { useState } from "react";
import { Music, Disc, Play, Square } from "lucide-react";

export default function Jukebox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    { title: "Midnight Espresso", artist: "LoFi Diner Beats" },
    { title: "Coding in the Rain", artist: "Jazz Vibes" },
    { title: "Neon Sign Buzz", artist: "Synthwave Chefs" },
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-[#120F0C]/90 backdrop-blur-md border border-amber-500/20 rounded-2xl p-3 flex items-center gap-4 shadow-[0_0_20px_rgba(217,119,6,0.1)] group hover:border-amber-500/50 transition-all font-[family-name:var(--font-inter)] w-[240px]">
      <div className="relative">
        <Disc className={`text-amber-500 transition-all duration-700 ${isPlaying ? "animate-[spin_3s_linear_infinite]" : ""}`} size={32} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#120F0C] rounded-full"></div>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow overflow-hidden">
        <span className="text-xs font-bold text-white truncate font-[family-name:var(--font-space)]">
          {tracks[currentTrack].title}
        </span>
        <span className="text-[10px] text-amber-500/70 truncate">
          {tracks[currentTrack].artist}
        </span>
      </div>

      <div className="flex gap-2">
        <button onClick={togglePlay} className="text-white/50 hover:text-amber-500 transition-colors">
          {isPlaying ? <Square size={16} className="fill-current" /> : <Play size={16} className="fill-current" />}
        </button>
        <button onClick={nextTrack} className="text-white/50 hover:text-amber-500 transition-colors">
          <Music size={16} />
        </button>
      </div>
    </div>
  );
}