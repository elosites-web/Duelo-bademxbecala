import React from 'react';
import { Siren, ArrowLeft, Eye, ShieldAlert, MessageSquareOff, Award } from 'lucide-react';
import ticoPortrait from '../assets/images/tico-referee.jpg';

export const RefereeSection: React.FC = () => {
  const curiosities = [
    {
      icon: Eye,
      label: 'Jogos Apitados',
      value: '+8 edições',
      detail: 'Presente em todas as edições, sem nunca ter pedido aumento.',
    },
    {
      icon: ShieldAlert,
      label: 'Bandeirinhas',
      value: 'Zero',
      detail: 'Apita sozinho: o impedimento é decidido no olho e na convicção.',
    },
    {
      icon: MessageSquareOff,
      label: 'VAR',
      value: 'Nunca existiu',
      detail: 'Aqui o lance polêmico é resolvido na resenha, não no telão.',
    },
    {
      icon: Award,
      label: 'Cartões Amarelos',
      value: 'Motivacionais',
      detail: 'Quase sempre acompanhados de um conselho de amigo.',
    },
  ];

  return (
    <section
      id="arbitragem"
      className="py-14 sm:py-20 bg-slate-900/40 border-t border-slate-800 relative overflow-hidden"
    >
      {/* Ambience glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
            <Siren className="w-3.5 h-3.5" />
            Autoridade Máxima do Apito
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Equipe de <span className="text-amber-400">Arbitragem</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Uma comissão enxuta, eficiente e com pulso firme: apenas uma pessoa, um apito e a
            consciência tranquila.
          </p>
        </div>

        {/* Featured Referee Card */}
        <div className="bg-slate-950/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-400" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Retrato do Tico */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-amber-300 to-emerald-400 shadow-lg shadow-amber-500/40 shrink-0">
                <img
                  src={ticoPortrait}
                  alt="Tico, o Gato Guerreiro, árbitro único e oficial do clássico Badem vs Becala"
                  className="w-full h-full rounded-full object-cover border-2 border-slate-900 bg-slate-900"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-9 h-9 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-md">
                  <Siren className="w-4 h-4 text-amber-400" />
                </span>
              </div>

              {/* Name & Badges */}
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1.5">
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white">Tico</h3>
                  <span className="inline-flex self-center sm:self-auto items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Gato Guerreiro 🐱⚔️
                  </span>
                  <span className="inline-flex self-center sm:self-auto items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Árbitro Único e Oficial
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  O comandante do apito em todas as edições do clássico Badem vs Becala. Apita
                  sozinho, sem bandeirinha e sem VAR, confiando no próprio olhar — e na certeza de
                  que, no fim, o churrasco une todo mundo de novo. Quando a marcação é duvidosa, ele
                  faz o que todo bom árbitro de várzea faz: aponta para o meio de campo e segue o
                  jogo com a consciência (quase sempre) limpa.
                </p>
              </div>
            </div>

            {/* Curiosities / Mini stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-7">
              {curiosities.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800"
                  >
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Icon className="w-3.5 h-3.5" /> {item.label}
                    </span>
                    <span className="font-display text-lg font-black text-white block">
                      {item.value}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Back to history */}
            <div className="mt-7 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                Confira também as decisões (e as resenhas) que marcaram cada edição no histórico.
              </p>
              <a
                href="#historico"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 text-xs font-bold inline-flex items-center gap-2 transition-all shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400" />
                Voltar ao Histórico das Edições
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
