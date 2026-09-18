import React from 'react';

export const DynamicBackdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Primary Football Stadium & Match Pitch Layer (Vibrant, high-resolution stadium under lights) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=2000&q=80')`,
          opacity: 0.65,
          filter: 'saturate(1.4) contrast(1.2) brightness(0.95)',
          transform: 'scale(1.02)',
        }}
      />

      {/* Secondary Real Grass & Football Turf Texture Layer (Lush green pitch details) */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2000&q=80')`,
          opacity: 0.45,
          filter: 'saturate(1.5) contrast(1.25)',
        }}
      />

      {/* Football Field Pitch Tactical Lines & Markings (Midfield circle, halfway line, penalty arcs) */}
      <div className="absolute inset-0 opacity-[0.22] pointer-events-none">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border-2 border-emerald-300" />
        {/* Center spot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-300" />
        {/* Halfway line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-emerald-300" />
        {/* Penalty Area Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[180px] border-b-2 border-x-2 border-emerald-300" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[70px] border-b-2 border-x-2 border-emerald-300" />
        {/* Penalty Area Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[180px] border-t-2 border-x-2 border-emerald-300" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[70px] border-t-2 border-x-2 border-emerald-300" />
        {/* Corner arcs */}
        <div className="absolute top-0 left-0 w-28 h-28 border-b-2 border-r-2 border-emerald-300 rounded-br-full" />
        <div className="absolute top-0 right-0 w-28 h-28 border-b-2 border-l-2 border-emerald-300 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-28 h-28 border-t-2 border-r-2 border-emerald-300 rounded-tr-full" />
        <div className="absolute bottom-0 right-0 w-28 h-28 border-t-2 border-l-2 border-emerald-300 rounded-tl-full" />
      </div>

      {/* Stadium Floodlights Glow Effect in Corners */}
      <div className="absolute -top-16 -left-16 w-96 h-96 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

      {/* Balanced dark contrast gradient to maintain clear text contrast (WCAG AA) while keeping the stadium pitch clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/45 to-slate-950/70 pointer-events-none" />
    </div>
  );
};
