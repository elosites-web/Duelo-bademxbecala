import React, { useState } from 'react';
import { Player } from '../types';
import { Shield, Sparkles, Flame, Trophy, Info, Eye, Users } from 'lucide-react';

interface InteractivePitchProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
  onSelectSpecialEvent: (type: 'churrasco' | 'resenha' | 'trofeu' | 'penaltis') => void;
}

export const InteractivePitch: React.FC<InteractivePitchProps> = ({
  players,
  onSelectPlayer,
  onSelectSpecialEvent,
}) => {
  const [teamFilter, setTeamFilter] = useState<'all' | 'badem' | 'becala'>('all');
  const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);

  const filteredPlayers = players.filter((p) => {
    if (teamFilter === 'all') return true;
    return p.team === teamFilter;
  });

  return (
    <section id="campo" className="py-14 sm:py-20 bg-slate-950/70 backdrop-blur-[2px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Arte Interativa & Tática
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
            O Gramado do <span className="text-emerald-400">Grande Duelo</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Clique nos atletas e nas áreas especiais do campo para abrir a aba com fotos, causos de anos anteriores, histórias do churrasco e detalhes para Dezembro/26.
          </p>
        </div>

        {/* Tactical Controls & Legends */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-900/80 p-3 sm:p-4 rounded-xl border border-slate-800">
          
          {/* Team Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setTeamFilter('all')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                teamFilter === 'all'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Ambos os Times
            </button>
            <button
              onClick={() => setTeamFilter('badem')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                teamFilter === 'badem'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-blue-400 hover:bg-slate-800'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              Amigos do Badem
            </button>
            <button
              onClick={() => setTeamFilter('becala')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                teamFilter === 'becala'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-400 hover:text-red-400 hover:bg-slate-800'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              Amigos do Becala
            </button>
          </div>

          {/* Special Hotspot Buttons */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <span className="text-slate-400 hidden md:inline font-medium">Atalhos da Resenha:</span>
            <button
              onClick={() => onSelectSpecialEvent('churrasco')}
              className="px-2.5 py-1.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              🥩 O Churrasco
            </button>
            <button
              onClick={() => onSelectSpecialEvent('resenha')}
              className="px-2.5 py-1.5 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              🍻 A Resenha & Pagode
            </button>
            <button
              onClick={() => onSelectSpecialEvent('trofeu')}
              className="px-2.5 py-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              🏆 Troféu Tradicional
            </button>
          </div>
        </div>

        {/* Pitch Container with realistic Grass texture & markings */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/9.5] max-h-[620px] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700/80 select-none bg-emerald-800">
          
          {/* Alternating striped pitch grass effect */}
          <div className="absolute inset-0 flex">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 ${i % 2 === 0 ? 'bg-emerald-800' : 'bg-emerald-700/90'}`}
              />
            ))}
          </div>

          {/* Grass subtle noise overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

          {/* Official Field Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/85" strokeWidth="2.5" fill="none">
            {/* Outer border / touch lines */}
            <rect x="4%" y="5%" width="92%" height="90%" rx="4" />

            {/* Halfway line */}
            <line x1="50%" y1="5%" x2="50%" y2="95%" />

            {/* Centre circle & spot */}
            <circle cx="50%" cy="50%" r="13%" />
            <circle cx="50%" cy="50%" r="4" fill="white" />

            {/* Left penalty box (Badem side) */}
            <rect x="4%" y="22%" width="17%" height="56%" />
            {/* Left goal area */}
            <rect x="4%" y="36%" width="6%" height="28%" />
            {/* Left penalty spot */}
            <circle cx="15%" cy="50%" r="3" fill="white" />
            {/* Left penalty arc */}
            <path d="M 21% 40% A 10% 10% 0 0 1 21% 60%" />

            {/* Right penalty box (Becala side) */}
            <rect x="79%" y="22%" width="17%" height="56%" />
            {/* Right goal area */}
            <rect x="90%" y="36%" width="6%" height="28%" />
            {/* Right penalty spot */}
            <circle cx="85%" cy="50%" r="3" fill="white" />
            {/* Right penalty arc */}
            <path d="M 79% 40% A 10% 10% 0 0 0 79% 60%" />

            {/* Corner arcs */}
            <path d="M 4% 8% A 3% 3% 0 0 0 6% 5%" />
            <path d="M 4% 92% A 3% 3% 0 0 1 6% 95%" />
            <path d="M 96% 8% A 3% 3% 0 0 1 94% 5%" />
            <path d="M 96% 92% A 3% 3% 0 0 0 94% 95%" />
          </svg>

          {/* Team Side Labels on Pitch Floor */}
          <div className="absolute left-[12%] top-7 pointer-events-none opacity-40 hidden sm:block">
            <span className="font-display font-black text-2xl lg:text-3xl text-blue-200 tracking-wider">
              AMIGOS DO BADEM
            </span>
          </div>
          <div className="absolute right-[12%] top-7 pointer-events-none opacity-40 hidden sm:block text-right">
            <span className="font-display font-black text-2xl lg:text-3xl text-red-200 tracking-wider">
              AMIGOS DO BECALA
            </span>
          </div>

          {/* Special Center Circle Hotspot: O Troféu Histórico */}
          <button
            onClick={() => onSelectSpecialEvent('trofeu')}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            title="Clique para ver detalhes dos Troféus e Campeões Anteriores"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 shadow-xl shadow-amber-500/50 flex items-center justify-center hover:scale-125 transition-transform animate-pulse">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-slate-950/90 text-amber-300 font-bold text-[10px] whitespace-nowrap border border-amber-400/40 opacity-90 group-hover:opacity-100 shadow-md">
              Taça da Amizade
            </span>
          </button>

          {/* Special Hotspot 1: Sideline Barbecue (Churrasqueira da Resenha) */}
          <button
            onClick={() => onSelectSpecialEvent('churrasco')}
            className="absolute left-[30%] bottom-3 sm:bottom-4 -translate-x-1/2 z-20 group cursor-pointer"
            title="Clique para ver fotos e histórias do churrasco"
          >
            <div className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-amber-500/50 hover:border-amber-400 text-amber-300 flex items-center gap-1.5 text-[10px] sm:text-xs font-bold shadow-lg shadow-amber-900/40 hover:scale-105 transition-all">
              <span className="text-sm">🥩</span>
              <span>Área do Churrasco & Grelha</span>
            </div>
          </button>

          {/* Special Hotspot 2: Roda de Samba & Resenha dos Atletas */}
          <button
            onClick={() => onSelectSpecialEvent('resenha')}
            className="absolute right-[30%] bottom-3 sm:bottom-4 translate-x-1/2 z-20 group cursor-pointer"
            title="Clique para ver a resenha, vestiário e samba"
          >
            <div className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-purple-500/50 hover:border-purple-400 text-purple-300 flex items-center gap-1.5 text-[10px] sm:text-xs font-bold shadow-lg shadow-purple-900/40 hover:scale-105 transition-all">
              <span className="text-sm">🍻</span>
              <span>Roda de Pagode & Resenha</span>
            </div>
          </button>

          {/* Player Pins */}
          {filteredPlayers.map((player) => {
            const isBadem = player.team === 'badem';
            const isCaptain = player.number === 10 && isBadem || player.number === 9 && !isBadem;

            return (
              <div
                key={player.id}
                style={{
                  left: `${player.pitchCoords.x}%`,
                  top: `${player.pitchCoords.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300"
              >
                <button
                  onClick={() => onSelectPlayer(player)}
                  onMouseEnter={() => setHoveredPlayer(player)}
                  onMouseLeave={() => setHoveredPlayer(null)}
                  className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
                  aria-label={`Ver perfil de ${player.name} (${player.position})`}
                >
                  {/* Outer glow ring for captains */}
                  {isCaptain && (
                    <div className="absolute -inset-1 rounded-full bg-amber-400/40 blur-[3px] animate-pulse" />
                  )}

                  {/* Player Node / Jersey / Avatar */}
                  <div
                    className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full p-0.5 shadow-xl transition-all duration-200 group-hover:scale-125 ${
                      isBadem
                        ? 'bg-gradient-to-b from-blue-400 to-blue-700 shadow-blue-900/60'
                        : 'bg-gradient-to-b from-red-400 to-red-700 shadow-red-900/60'
                    }`}
                  >
                    <img
                      src={player.avatarUrl}
                      alt={player.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover border border-white/40"
                    />

                    {/* Jersey Number badge */}
                    <span
                      className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-[10px] font-black flex items-center justify-center text-white border border-slate-900 shadow-sm ${
                        isBadem ? 'bg-blue-600' : 'bg-red-600'
                      }`}
                    >
                      {player.number}
                    </span>
                  </div>

                  {/* Player Name Pill */}
                  <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-950/95 border border-slate-700/80 shadow-md flex items-center gap-1 group-hover:border-amber-400 transition-colors max-w-[85px] sm:max-w-none">
                    <span className="text-[9px] sm:text-[11px] font-bold text-slate-100 truncate whitespace-nowrap">
                      {player.name}
                    </span>
                  </div>

                  {/* Captain tag */}
                  {isCaptain && (
                    <span className="text-[8px] font-black text-amber-300 uppercase tracking-wider bg-amber-500/30 px-1 rounded -mt-0.5">
                      Capitão
                    </span>
                  )}
                </button>
              </div>
            );
          })}

          {/* Quick Hover Tooltip on Pitch */}
          {hoveredPlayer && (
            <div
              style={{
                left: `${Math.min(Math.max(hoveredPlayer.pitchCoords.x, 15), 85)}%`,
                top: `${hoveredPlayer.pitchCoords.y > 60 ? hoveredPlayer.pitchCoords.y - 18 : hoveredPlayer.pitchCoords.y + 12}%`,
              }}
              className="absolute -translate-x-1/2 z-40 bg-slate-950/95 border border-slate-700 rounded-xl p-2.5 shadow-2xl pointer-events-none w-52 sm:w-60 backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    hoveredPlayer.team === 'badem' ? 'bg-blue-400' : 'bg-red-400'
                  }`}
                />
                <span className="text-xs font-bold text-white truncate">{hoveredPlayer.name}</span>
                <span className="text-[10px] text-slate-400 ml-auto">#{hoveredPlayer.number}</span>
              </div>
              <p className="text-[11px] text-amber-300 font-medium">{hoveredPlayer.nickname}</p>
              <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-2">{hoveredPlayer.roleDescription}</p>
              <div className="mt-1.5 pt-1 border-t border-slate-800 flex items-center justify-between text-[9px] text-emerald-400 font-semibold">
                <span>Status Dez/26: Confirmado</span>
                <span className="text-slate-400 flex items-center gap-0.5">
                  <Eye className="w-2.5 h-2.5" /> Clique para abrir
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Interaction Guidance Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 px-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400" />
            <span>Toque ou clique em qualquer atleta para ver a ficha completa com fotos dos anos anteriores.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Amigos do Badem
            </span>
            <span className="flex items-center gap-1.5 text-red-300">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Amigos do Becala
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
