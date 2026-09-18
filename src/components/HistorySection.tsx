import React from 'react';
import { PAST_EDITIONS } from '../data/mockData';
import { Flame, Trophy, Award, Sparkles, Beer, History, Siren } from 'lucide-react';
import ticoPortrait from '../assets/images/tico-referee.jpg';

export const HistorySection: React.FC = () => {
  return (
    <section id="historico" className="py-14 sm:py-20 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
            <History className="w-3.5 h-3.5" />
            Memória Viva do Clássico
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Histórico das <span className="text-amber-400">Edições Anteriores</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Relembre os placares históricos, os golaços inesquecíveis, os micos hilários e a fartura dos churrascos que consagraram o confronto Badem vs Becala.
          </p>
        </div>

        {/* Global Statistics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="font-display text-3xl sm:text-4xl font-black text-amber-400 block">
              +8 Anos
            </span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              De Tradição Ininterrupta
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="font-display text-3xl sm:text-4xl font-black text-emerald-400 block">
              64 Gols
            </span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Marcados na História
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="font-display text-3xl sm:text-4xl font-black text-red-400 block">
              +350 kg
            </span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              De Picanha & Costelão
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="font-display text-3xl sm:text-4xl font-black text-blue-400 block">
              100%
            </span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Amizade & Resenha Pura
            </span>
          </div>
        </div>

        {/* Editions Timeline */}
        <div className="space-y-6">
          {PAST_EDITIONS.map((edition) => {
            const isBademWin = edition.winner === 'badem';

            return (
              <div
                key={edition.year}
                className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-xl"
              >
                {/* Left accent border color based on winner */}
                <div
                  className={`absolute top-0 left-0 w-2 h-full ${
                    isBademWin ? 'bg-blue-500' : 'bg-red-500'
                  }`}
                />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl sm:text-4xl font-black text-white">
                      {edition.year}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isBademWin
                          ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                      }`}
                    >
                      Campeão: {isBademWin ? 'Amigos do Badem' : 'Amigos do Becala'}
                    </span>
                  </div>

                  <div className="font-display font-bold text-base sm:text-xl text-amber-300">
                    {edition.score}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-200 mt-4 leading-relaxed">
                  {edition.summary}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
                  {/* Dentro de Campo */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Trophy className="w-3.5 h-3.5" /> Destaque da Bola
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{edition.highlight}</p>
                  </div>

                  {/* O Churrasco & Resenha */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Flame className="w-3.5 h-3.5" /> A Grelha & Confraternização
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{edition.churrascoHighlight}</p>
                  </div>

                  {/* Craque MVP */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Award className="w-3.5 h-3.5" /> Bola Cheia (Craque)
                    </span>
                    <p className="text-xs font-semibold text-white">{edition.mvp}</p>
                  </div>

                  {/* Bola Murcha */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5" /> Bola Murcha (Cômico)
                    </span>
                    <p className="text-xs font-semibold text-white">{edition.bolaMurcha}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Equipe de Arbitragem */}
        <div className="mt-10 bg-slate-950/90 rounded-2xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-400" />

          <div className="flex items-center gap-2 mb-5">
            <Siren className="w-4 h-4 text-amber-400" />
            <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white tracking-tight">
              Equipe de <span className="text-amber-400">Arbitragem</span>
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-amber-300 to-emerald-400 shadow-lg shadow-amber-500/30 shrink-0 relative">
              <img
                src={ticoPortrait}
                alt="Tico, o Gato Guerreiro, árbitro único e oficial do clássico"
                className="w-full h-full rounded-full object-cover border-2 border-slate-900 bg-slate-900"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-md">
                <Siren className="w-3.5 h-3.5 text-amber-400" />
              </span>
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 mb-1">
                <h4 className="font-display text-lg sm:text-xl font-bold text-white">Tico</h4>
                <span className="inline-flex self-center sm:self-auto items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Gato Guerreiro 🐱⚔️
                </span>
                <span className="inline-flex self-center sm:self-auto items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Árbitro Único e Oficial
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                O árbitro oficial e imparcial (até onde a resenha permite) de todas as edições do clássico. Comanda o apito com autoridade total sobre os dois esquadrões — sozinho, sem bandeirinha e sem instant replay.
              </p>
              <a
                href="#arbitragem"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
              >
                Conhecer a equipe de arbitragem
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
