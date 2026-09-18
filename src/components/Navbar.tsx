import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Menu, X, Flame, Shield, Calendar, Image as ImageIcon, MessageSquare, Award } from 'lucide-react';
import { AudioController } from './AudioController';

interface NavbarProps {
  onOpenConfirmModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConfirmModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRowRef = useRef<HTMLDivElement>(null);

  // Expõe a altura real da faixa principal do cabeçalho como variável CSS.
  // As âncoras (scroll-margin-top) usam esse valor para alinhar o topo de
  // cada seção exatamente com a borda inferior do cabeçalho em qualquer
  // breakpoint, sem depender de valores fixos.
  useEffect(() => {
    const el = headerRowRef.current;
    if (!el) return;

    const apply = () => {
      const height = el.getBoundingClientRect().height;
      if (height > 0) {
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      }
    };

    apply();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(apply);
      observer.observe(el);
    }
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', apply);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', apply);
      window.removeEventListener('orientationchange', apply);
    };
  }, []);

  // Lock body scroll when mobile menu is open, restore when closed
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { label: 'Campo Tático', href: '#campo', icon: Shield },
    { label: 'Atletas Dez/26', href: '#atletas', icon: Trophy },
    { label: 'Histórico & Resenha', href: '#historico', icon: Flame },
    { label: 'Votação Bola Cheia/Murcha', href: '#votacao', icon: Award },
    { label: 'Galeria', href: '#galeria', icon: ImageIcon },
    { label: 'Mural da Galera', href: '#mural', icon: MessageSquare },
  ];

  return (
    <nav id="navbar-main" className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRowRef} className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-amber-500 to-red-500 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white flex items-center gap-1.5">
                BADEM <span className="text-amber-400 text-xs font-bold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">VS</span> BECALA
              </span>
              <p className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-400" />
                Jogo Festivo de Fim de Ano • Dezembro/2026
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400/80" />
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-2.5">
            <AudioController variant="navbar" />

            <button
              id="nav-btn-confirmar"
              onClick={onOpenConfirmModal}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              Presença & Informações
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Abrir Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop / véu escuro e menu suspenso */}
      {isOpen && (
        <>
          {/* Véu sobre a página atrás do menu */}
          <div
            className="fixed inset-0 top-16 sm:top-20 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Container do menu móvel com rolagem exclusiva */}
          <div className="lg:hidden relative z-50 bg-slate-900/98 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain shadow-2xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-xs text-slate-300 font-semibold">Música & Torcida:</span>
                <AudioController variant="navbar" />
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenConfirmModal();
                }}
                className="w-full py-2.5 text-sm font-bold text-center rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                Presença & Informações
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
