import React, { useState } from 'react';
import { Player, TeamType } from '../types';
import { Search, Filter, Shield, UserCheck, Plus, Sparkles, Check, ChevronRight } from 'lucide-react';

interface SquadsSectionProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
  onOpenConfirmModal: () => void;
}

export const SquadsSection: React.FC<SquadsSectionProps> = ({
  players,
  onSelectPlayer,
  onOpenConfirmModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<TeamType>('todos');
  const [selectedPosition, setSelectedPosition] = useState<string>('todas');

  const filtered = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.roleDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTeam = selectedTeam === 'todos' || player.team === selectedTeam;
    const matchesPosition = selectedPosition === 'todas' || player.position === selectedPosition;

    return matchesSearch && matchesTeam && matchesPosition;
  });

  const bademCount = players.filter((p) => p.team === 'badem').length;
  const becalaCount = players.filter((p) => p.team === 'becala').length;

  return (
    <section id="atletas" className="py-14 sm:py-20 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
              <UserCheck className="w-3.5 h-3.5" />
              Edição Dezembro/2026
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Atletas Confirmados no <span className="text-amber-400">Esquadrão</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Confira a lista oficial dos boleiros já escalados para o clássico. Clique no atleta para ver histórico e estatísticas completas.
            </p>
          </div>

          <button
            onClick={onOpenConfirmModal}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Confirmar Presença / Sugerir Boleiro
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, apelido ou especialidade..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Team filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedTeam('todos')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedTeam === 'todos'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                }`}
              >
                Todos ({players.length})
              </button>

              <button
                onClick={() => setSelectedTeam('badem')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedTeam === 'badem'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-blue-400 bg-slate-900 border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Badem ({bademCount})
              </button>

              <button
                onClick={() => setSelectedTeam('becala')}
                className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedTeam === 'becala'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Becala ({becalaCount})
              </button>
            </div>
          </div>

          {/* Position Filters */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pt-1 border-t border-slate-800/80">
            <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Posição:
            </span>
            {['todas', 'Goleiro', 'Zagueiro', 'Lateral', 'Meio-Campo', 'Atacante'].map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedPosition === pos
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {pos === 'todas' ? 'Todas' : pos}
              </button>
            ))}
          </div>
        </div>

        {/* Players Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">Nenhum atleta encontrado com os filtros selecionados.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTeam('todos');
                setSelectedPosition('todas');
              }}
              className="mt-3 text-xs text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((player) => {
              const isBadem = player.team === 'badem';

              return (
                <div
                  key={player.id}
                  onClick={() => onSelectPlayer(player)}
                  className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer bg-slate-950/70 hover:bg-slate-900 hover:-translate-y-1 ${
                    isBadem
                      ? 'border-slate-800 hover:border-blue-500/60 shadow-lg shadow-blue-950/20'
                      : 'border-slate-800 hover:border-red-500/60 shadow-lg shadow-red-950/20'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Avatar with team frame */}
                    <div
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl p-0.5 shrink-0 shadow-md ${
                        isBadem
                          ? 'bg-gradient-to-tr from-blue-600 to-sky-400'
                          : 'bg-gradient-to-tr from-red-600 to-amber-500'
                      }`}
                    >
                      <img
                        src={player.avatarUrl}
                        alt={player.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-[10px]"
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[10px] font-black text-white ${
                          isBadem ? 'bg-blue-600' : 'bg-red-600'
                        }`}
                      >
                        #{player.number}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isBadem
                              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                              : 'bg-red-500/15 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {isBadem ? 'Badem' : 'Becala'}
                        </span>
                        <span className="text-xs text-slate-400 font-medium truncate">
                          {player.position}
                        </span>
                      </div>

                      <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                        {player.name}
                      </h3>
                      <p className="text-xs text-amber-300/90 font-medium truncate">{player.nickname}</p>

                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {player.roleDescription}
                      </p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 mt-3" />
                  </div>

                  {/* Card Bottom status tag */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Confirmado Dez/26
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      {player.editionHistory.appearances} edições disputadas
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
