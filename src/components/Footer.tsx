import React from 'react';
import { Trophy, Calendar, MapPin, Shield, Heart, ArrowUp } from 'lucide-react';
import eloSitesLogo from '../assets/images/elo-sites-logo.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-slate-950/90 backdrop-blur-sm border-t border-slate-800 text-slate-400 text-xs pt-12 pb-28 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Column 1: Match Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-display font-black text-lg">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>AMIGOS DO BADEM VS AMIGOS DO BECALA</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              O tradicional jogo festivo de fim de ano que celebra a união, a lealdade no esporte e a melhor resenha com churrasco e samba entre amigos e famílias.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Edição Oficial Programada para Dezembro / 2026
            </div>
          </div>

          {/* Column 2: Official Notice */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" /> Informações Oficiais do Jogo
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>• <strong>Mês Previsto:</strong> Dezembro de 2026</li>
              <li>• <strong>Data exata:</strong> A definir pela comissão organizadora</li>
              <li>• <strong>Horário:</strong> A definir</li>
              <li>• <strong>Local da Partida:</strong> Campo / Arena a ser confirmada</li>
              <li>• <strong>Pós-Jogo:</strong> Churrasco de confraternização e roda de samba</li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Navegação Rápida
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <a href="#campo" className="hover:text-white transition-colors">Campo Tático</a>
              <a href="#atletas" className="hover:text-white transition-colors">Atletas Confirmados</a>
              <a href="#historico" className="hover:text-white transition-colors">Histórico do Clássico</a>
              <a href="#votacao" className="hover:text-white transition-colors">Bola Cheia / Murcha</a>
              <a href="#galeria" className="hover:text-white transition-colors">Galeria de Fotos</a>
              <a href="#mural" className="hover:text-white transition-colors">Mural da Galera</a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px] text-center sm:text-left max-w-xl">
            Jogo Festivo de Fim de Ano — Amigos do Badem vs Amigos do Becala © 2026. Feito com amor ao futebol amador e à verdadeira amizade.
          </p>

          <button
            id="footer-btn-scroll-top"
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center gap-2 text-xs font-semibold shadow-md transition-all cursor-pointer"
            title="Voltar ao início da página"
          >
            <ArrowUp className="w-4 h-4 text-emerald-400" />
            <span>Voltar ao Topo</span>
          </button>
        </div>

        {/* Créditos de Desenvolvimento */}
        <div className="pt-5 mt-5 border-t border-slate-800/60 flex justify-center">
          <p className="text-slate-500 text-[11px] text-center flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            <span>CRIADO E DESENVOLVIDO POR EVERTON CABRONE DA</span>
            <img
              src={eloSitesLogo}
              alt="ēloSites"
              className="inline-block h-4 sm:h-[18px] w-auto align-middle"
            />
            <span>O MELHOR SITE PELO MELHOR PREÇO!</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
