import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VoteOption, Player } from '../types';
import { INITIAL_VOTES } from '../data/mockData';
import { Award, ThumbsUp, AlertTriangle, Sparkles, Check, PlusCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { stadiumAudio } from '../services/stadiumAudio';

interface VotingSectionProps {
  players: Player[];
}

export const VotingSection: React.FC<VotingSectionProps> = ({ players }) => {
  const [activeCategory, setActiveCategory] = useState<'cheia' | 'murcha'>('cheia');
  const [votes, setVotes] = useState<VoteOption[]>(() => {
    const saved = localStorage.getItem('badem_becala_votes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_VOTES;
      }
    }
    return INITIAL_VOTES;
  });

  const [hasVoted, setHasVoted] = useState<{ cheia?: string; murcha?: string }>(() => {
    const saved = localStorage.getItem('badem_becala_user_votes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  const [justVotedId, setJustVotedId] = useState<string | null>(null);
  const [showCustomVoteModal, setShowCustomVoteModal] = useState(false);
  const [customPlayerId, setCustomPlayerId] = useState('');
  const [customReason, setCustomReason] = useState('');

  useEffect(() => {
    localStorage.setItem('badem_becala_votes', JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem('badem_becala_user_votes', JSON.stringify(hasVoted));
  }, [hasVoted]);

  const triggerVoteCelebration = (candidateId: string, category: 'cheia' | 'murcha') => {
    setJustVotedId(candidateId);
    setTimeout(() => {
      setJustVotedId(null);
    }, 3800);

    if (category === 'cheia') {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.65 },
        colors: ['#10b981', '#f59e0b', '#3b82f6', '#34d399', '#fef08a'],
        disableForReducedMotion: true,
      });
      try {
        stadiumAudio.playGoalCheer();
      } catch {
        // audio optional
      }
    } else {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#ef4444', '#f97316', '#fbbf24', '#f87171'],
        disableForReducedMotion: true,
      });
      try {
        stadiumAudio.playNearMiss();
      } catch {
        // audio optional
      }
    }
  };

  const handleVote = (candidateId: string) => {
    if (hasVoted[activeCategory]) return;

    setVotes((prev) =>
      prev.map((opt) => {
        if (opt.playerId === candidateId && opt.category === activeCategory) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      })
    );

    setHasVoted((prev) => ({ ...prev, [activeCategory]: candidateId }));
    triggerVoteCelebration(candidateId, activeCategory);
  };

  const handleAddCustomVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPlayerId || !customReason.trim()) return;

    const selectedPlayer = players.find((p) => p.id === customPlayerId);
    if (!selectedPlayer) return;

    const newOption: VoteOption = {
      playerId: selectedPlayer.id,
      playerName: selectedPlayer.name,
      nickname: selectedPlayer.nickname,
      team: selectedPlayer.team,
      category: activeCategory,
      reason: customReason.trim(),
      votes: 1,
    };

    setVotes((prev) => [...prev, newOption]);
    setHasVoted((prev) => ({ ...prev, [activeCategory]: selectedPlayer.id }));
    setShowCustomVoteModal(false);
    setCustomPlayerId('');
    setCustomReason('');

    triggerVoteCelebration(selectedPlayer.id, activeCategory);
  };

  const currentOptions = votes
    .filter((v) => v.category === activeCategory)
    .sort((a, b) => b.votes - a.votes);

  const totalVotesCategory = currentOptions.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <section id="votacao" className="py-14 sm:py-20 bg-slate-950/60 border-t border-slate-800 relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
            <Award className="w-3.5 h-3.5" />
            Votação da Galera & Torcida
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Bola Cheia <span className="text-amber-400">VS</span> Bola Murcha
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Quem foi o gênio da rodada? E quem protagonizou a furada mais inacreditável? Vote no craque do jogo e na resenha mais hilária do clássico!
          </p>
        </div>

        {/* Category Switcher Tabs with Framer-Motion Layout Animation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative">
            <button
              onClick={() => setActiveCategory('cheia')}
              className={`relative px-5 sm:px-8 py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer z-10 ${
                activeCategory === 'cheia' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeCategory === 'cheia' && (
                <motion.div
                  layoutId="activeVoteTabBg"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-600/30 -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Sparkles className="w-4 h-4 text-amber-300" />
              Troféu Bola Cheia (Craques)
            </button>

            <button
              onClick={() => setActiveCategory('murcha')}
              className={`relative px-5 sm:px-8 py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer z-10 ${
                activeCategory === 'murcha' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeCategory === 'murcha' && (
                <motion.div
                  layoutId="activeVoteTabBg"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-600/30 -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <AlertTriangle className="w-4 h-4 text-yellow-300" />
              Troféu Bola Murcha (Caneludos)
            </button>
          </div>
        </div>

        {/* User Vote Status banner with Framer-Motion */}
        <AnimatePresence>
          {hasVoted[activeCategory] && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              className="max-w-2xl mx-auto mb-6 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-700/60 text-center text-xs text-emerald-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold">
                Seu voto nesta categoria já foi computado com sucesso! Obrigado por participar da resenha.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Podium / Ranking Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {currentOptions.map((option, index) => {
            const percentage = totalVotesCategory > 0 ? Math.round((option.votes / totalVotesCategory) * 100) : 0;
            const isSelectedByMe = hasVoted[activeCategory] === option.playerId;
            const isJustVoted = justVotedId === option.playerId;
            const isBadem = option.team === 'badem';

            return (
              <motion.div
                key={`${option.playerId}-${option.category}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isJustVoted ? [1, 1.03, 1] : 1,
                }}
                transition={{ duration: 0.4 }}
                className={`p-5 rounded-2xl border transition-all duration-300 relative bg-slate-900/85 backdrop-blur-sm ${
                  isJustVoted
                    ? activeCategory === 'cheia'
                      ? 'border-emerald-400 ring-4 ring-emerald-500/30 shadow-2xl shadow-emerald-500/40'
                      : 'border-red-400 ring-4 ring-red-500/30 shadow-2xl shadow-red-500/40'
                    : isSelectedByMe
                    ? activeCategory === 'cheia'
                      ? 'border-emerald-500/70 ring-2 ring-emerald-500/20 bg-slate-900/95'
                      : 'border-red-500/70 ring-2 ring-red-500/20 bg-slate-900/95'
                    : index === 0
                    ? 'border-amber-500/50 shadow-xl shadow-amber-950/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Floating Glow Banner when voted */}
                <AnimatePresence>
                  {isJustVoted && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.7 }}
                        animate={{ opacity: 1, y: -24, scale: 1 }}
                        exit={{ opacity: 0, y: -35, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 280 }}
                        className={`absolute -top-1 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full text-slate-950 font-black text-xs shadow-2xl flex items-center gap-1.5 whitespace-nowrap ${
                          activeCategory === 'cheia'
                            ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300'
                            : 'bg-gradient-to-r from-red-400 via-rose-300 to-amber-300'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 fill-slate-950 animate-spin" />
                        <span>+1 VOTO REGISTRADO!</span>
                      </motion.div>

                      {/* Expanding Radiant Halo */}
                      <motion.div
                        initial={{ scale: 0.96, opacity: 0.8 }}
                        animate={{ scale: 1.04, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: 1, ease: 'easeOut' }}
                        className={`absolute inset-0 rounded-2xl pointer-events-none ${
                          activeCategory === 'cheia'
                            ? 'ring-2 ring-emerald-400 bg-emerald-500/10'
                            : 'ring-2 ring-red-400 bg-red-500/10'
                        }`}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Top Rank Badge */}
                {index === 0 && (
                  <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Award className="w-3 h-3" /> Liderando a Votação
                  </div>
                )}

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isBadem
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {isBadem ? 'Amigos do Badem' : 'Amigos do Becala'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">#{index + 1}</span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                      {option.playerName}
                    </h3>
                    <p className="text-xs text-amber-300 font-semibold">{option.nickname}</p>
                  </div>

                  {/* Vote Button with Framer-Motion feedback */}
                  <motion.button
                    whileHover={{ scale: hasVoted[activeCategory] ? 1 : 1.05 }}
                    whileTap={{ scale: hasVoted[activeCategory] ? 1 : 0.94 }}
                    onClick={() => handleVote(option.playerId)}
                    disabled={Boolean(hasVoted[activeCategory])}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                      isSelectedByMe
                        ? activeCategory === 'cheia'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-red-600 text-white shadow-md'
                        : hasVoted[activeCategory]
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : activeCategory === 'cheia'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-600/30 cursor-pointer'
                        : 'bg-red-600 hover:bg-red-500 text-white shadow-md hover:shadow-red-600/30 cursor-pointer'
                    }`}
                  >
                    {isSelectedByMe ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Votado!
                      </motion.span>
                    ) : (
                      <>
                        <ThumbsUp className="w-3.5 h-3.5" />
                        Votar
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Reason */}
                <p className="text-xs text-slate-300 italic mb-4 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  "{option.reason}"
                </p>

                {/* Live Animated Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">{option.votes} votos computados</span>
                    <span className="text-white font-bold">{percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        activeCategory === 'cheia'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : 'bg-gradient-to-r from-red-500 to-rose-400'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicar Outro Jogador na Votação */}
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowCustomVoteModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-lg"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            Indicar outro jogador para {activeCategory === 'cheia' ? 'Bola Cheia' : 'Bola Murcha'}
          </motion.button>
        </div>

        {/* Modal Indicar Candidato com Framer-Motion */}
        <AnimatePresence>
          {showCustomVoteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowCustomVoteModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Indicar para {activeCategory === 'cheia' ? 'Bola Cheia' : 'Bola Murcha'}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Escolha o atleta do Badem ou Becala e descreva o motivo do voto.
                </p>

                <form onSubmit={handleAddCustomVote} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Selecione o Jogador:
                    </label>
                    <select
                      value={customPlayerId}
                      onChange={(e) => setCustomPlayerId(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">Selecione um boleiro...</option>
                      {players.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.team === 'badem' ? 'Amigos do Badem' : 'Amigos do Becala'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Qual o lance / motivo?
                    </label>
                    <input
                      type="text"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      required
                      placeholder={
                        activeCategory === 'cheia'
                          ? 'Ex: Golaço de falta, desarme decisivo...'
                          : 'Ex: Furou na cara do gol, isolou a bola...'
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCustomVoteModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Confirmar Voto
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
