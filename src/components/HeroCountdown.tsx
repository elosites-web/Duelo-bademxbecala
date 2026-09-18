import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, AlertCircle, Sparkles, Trophy, Bell, Share2, Check, MessageCircle } from 'lucide-react';
import { MATCH_INFO } from '../data/mockData';

interface HeroCountdownProps {
  onOpenConfirmModal: () => void;
  onJumpToPitch: () => void;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({ onOpenConfirmModal, onJumpToPitch }) => {
  // Target date for December 2026
  const targetDate = new Date(MATCH_INFO.targetDate).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Jogo Festivo de Fim de Ano: Amigos do Badem VS Amigos do Becala',
        text: 'Vem aí o tradicional Clássico de Fim de Ano em Dezembro/2026! Confira o campo interativo, escalações e vote no Bola Cheia vs Bola Murcha.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      '⚽ *JOGO FESTIVO DE FIM DE ANO: Amigos do Badem VS Amigos do Becala*\n\n' +
      '🔥 A resenha e o clássico mais aguardado de Dezembro/2026! Acesse o site oficial para conferir a escalação tática no campinho, histórico dos confrontos e votar no Bola Cheia vs Bola Murcha:\n' +
      window.location.href
    );
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-slate-800">
      {/* Background stadium atmospheric light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Tradição, Futebol, Resenha & Churrasco
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Trophy className="w-3.5 h-3.5" />
            O Grande Clássico de Fim de Ano
          </span>
        </motion.div>

        {/* Main Headings */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto mb-10"
        >
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none mb-4">
            Amigos do <span className="text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.4)]">Badem</span>
            <span className="text-amber-400 text-2xl sm:text-4xl lg:text-5xl font-black mx-2 sm:mx-4 tracking-normal">
              VS
            </span>
            Amigos do <span className="text-red-400 drop-shadow-[0_0_20px_rgba(248,113,113,0.4)]">Becala</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            A bola vai rolar no confronto mais esperado de dezembro! Amizade, rivalidade sadia, golaços, caneladas e aquele churrasco de responsabilidade.
          </p>
        </motion.div>

        {/* Match Info Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="max-w-3xl mx-auto mb-10 bg-slate-900/90 rounded-2xl border border-slate-700/80 p-5 sm:p-6 shadow-2xl backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              Status Oficial do Evento de Dezembro/2026:
            </span>
            <span className="ml-auto text-[11px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold uppercase tracking-wider">
              Em Planejamento
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Data do Jogo</p>
                <p className="text-sm sm:text-base font-bold text-white mt-0.5">Dezembro / 2026</p>
                <p className="text-xs text-amber-400/90 font-medium">(Dia a definir)</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Horário</p>
                <p className="text-sm sm:text-base font-bold text-white mt-0.5">A definir</p>
                <p className="text-xs text-slate-400">(Tarde / Confraternização)</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Local & Arena</p>
                <p className="text-sm sm:text-base font-bold text-white mt-0.5">A definir</p>
                <p className="text-xs text-slate-400">(Campo / Arena em votação)</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>* Assim que a comissão técnica bater o martelo sobre a data exata e o campo, atualizaremos aqui!</span>
            <button
              onClick={onOpenConfirmModal}
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 flex items-center gap-1 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5" />
              Quero ser avisado da confirmação
            </button>
          </div>
        </motion.div>

        {/* Countdown Timer Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="text-center mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Contagem Regressiva para Dezembro de 2026
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
              <span className="font-display font-black text-2xl sm:text-5xl text-white block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Dias
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
              <span className="font-display font-black text-2xl sm:text-5xl text-emerald-400 block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Horas
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
              <span className="font-display font-black text-2xl sm:text-5xl text-amber-400 block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Minutos
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
              <span className="font-display font-black text-2xl sm:text-5xl text-red-400 block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Segundos
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            id="hero-btn-pitch"
            onClick={onJumpToPitch}
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            Explorar Campo Tático Interativo
          </button>

          <button
            id="hero-btn-whatsapp"
            onClick={handleShareWhatsApp}
            className="px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-[#25D366]/25 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            title="Compartilhar link com thumbnail no WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current text-slate-950" />
            <span>Enviar no WhatsApp</span>
          </button>

          <button
            id="hero-btn-share"
            onClick={handleShare}
            className="px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm sm:text-base border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            title="Copiar link ou compartilhar"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-300" />
                <span>Copiar Link</span>
              </>
            )}
          </button>
        </motion.div>

      </div>
    </section>
  );
};
