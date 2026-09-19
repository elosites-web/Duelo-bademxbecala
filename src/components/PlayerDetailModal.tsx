import React, { useState } from 'react';
import { Player } from '../types';
import { X, Trophy, Flame, Calendar, Clock, MapPin, Award, CheckCircle2, Quote, Sparkles, MessageCircle } from 'lucide-react';
import { MATCH_INFO } from '../data/mockData';

interface PlayerDetailModalProps {
  player: Player | null;
  specialEvent: 'churrasco' | 'resenha' | 'trofeu' | 'penaltis' | null;
  onClose: () => void;
  onVoteForPlayer?: (player: Player) => void;
}

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  player,
  specialEvent,
  onClose,
  onVoteForPlayer,
}) => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'historico' | 'resenha'>('perfil');

  if (!player && !specialEvent) return null;

  // SPECIAL EVENT MODAL (Churrasco, Resenha, Troféu)
  if (specialEvent) {
    const eventDetails = {
      churrasco: {
        title: 'A Tradição do Churrasco de Fim de Ano',
        subtitle: 'Picanha, Fogo de Chão, Linguiça Toscana e Muita Amizade',
        badge: '🥩 O Banquete Sagrado',
        badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
        description:
          'Mais do que uma simples partida de futebol, o confronto entre Amigos do Badem e Amigos do Becala é celebrado ao redor da grelha. Nos anos anteriores (2023, 2024 e 2025), a comissão churrasqueira serviu mais de 60kg de carnes nobres por edição, com direito a pão de alho crocante, vinagrete caseiro e farofa crocante.',
        rules: [
          'Quem perde o jogo ajuda a servir a primeira rodada de carnes;',
          'O acendedor oficial nunca deixa o braseiro esfriar;',
          'É terminantemente proibido falar de canelada ou gol perdido enquanto a picanha estiver no ponto;',
          'Para Dezembro/2026, a comissão já prepara cortes especiais e chopp em dobro!',
        ],
      },
      resenha: {
        title: 'A Grande Resenha & Roda de Pagode',
        subtitle: 'Cavaquinho, Pandeiro e Histórias que Aumentam a Cada Ano',
        badge: '🍻 O Pós-Jogo Histórico',
        badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
        description:
          'Assim que o apito final soa, a rivalidade é esquecida instantaneamente. Os vestiários se abrem para os abraços, a caixa de som começa a tocar os clássicos do samba raiz e os causos mais hilários do futebol amador entram em pauta.',
        rules: [
          'Toda jogada duvidosa ganha 3 versões diferentes durante a resenha;',
          'O "Bola Murcha" do ano ganha homenagem com música ao vivo;',
          'O craque da partida é obrigado a puxar o refrão no microfone;',
          'Famílias e amigos se unem em uma confraternização que atravessa a madrugada.',
        ],
      },
      trofeu: {
        title: 'A Taça da Fraternidade & Premiação',
        subtitle: 'O Troféu que Guarda a Glória dos Amigos do Badem e Becala',
        badge: '🏆 A Disputa Histórica',
        badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        imageUrl: '/taca-fraternidade.jpg',
        description:
          'Criado para celebrar a união de amigos que jogam juntos há anos, o troféu não tem dono definitivo: ele viaja de capitão em capitão a cada edição de fim de ano, carregando fitas azuis (Badem) e vermelhas (Becala).',
        rules: [
          'Histórico geral: Amigos do Badem 2 títulos vs 1 título Amigos do Becala (com edições resolvidas nos pênaltis);',
          'Premiações oficiais: Troféu Bola Cheia (Craque), Troféu Bola Murcha (Comédia do Ano) e Troféu Churrasqueiro de Honra;',
          'Em Dezembro/2026, a taça estará novamente em disputa no gramado!',
        ],
      },
      penaltis: {
        title: 'Os Pênaltis Lendários',
        subtitle: 'A Marca da Cal que Testou os Corações nas Edições Passadas',
        badge: '⚽ Emoção Pura',
        badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
        description:
          'Em 2025, o empate eletrizante em 4x4 levou a decisão para as penalidades máximas. A torcida invadiu a linha lateral para vibrar em cada cobrança!',
        rules: [
          'Cavadinha é por conta e risco: se errar, o churrasco todo cobra!',
          'Goleiros sempre viram heróis nas disputas de fim de ano.',
        ],
      },
    }[specialEvent];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={eventDetails.imageUrl}
              alt={eventDetails.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border mb-2 ${eventDetails.badgeColor}`}>
                {eventDetails.badge}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">{eventDetails.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300">{eventDetails.subtitle}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed">
            <p className="text-base text-slate-200">{eventDetails.description}</p>
            
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Destaques & Tradições do Clássico
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {eventDetails.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✔</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Match status reminder */}
            <div className="bg-emerald-950/30 border border-emerald-800/40 p-3.5 rounded-xl text-xs text-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold block text-white">Próximo Encontro Marcado:</span>
                <span>Dezembro de 2026 (Data, horário e local a serem confirmados em breve)</span>
              </div>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 cursor-pointer shrink-0 ml-3"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PLAYER DETAILS MODAL
  if (!player) return null;

  const isBadem = player.team === 'badem';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Top Banner with Team Theme */}
        <div
          className={`relative p-5 sm:p-6 pb-4 border-b border-slate-800 ${
            isBadem
              ? 'bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950'
              : 'bg-gradient-to-r from-red-950 via-slate-900 to-slate-950'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            {/* Player Avatar */}
            <div
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 shadow-2xl shrink-0 ${
                isBadem
                  ? 'bg-gradient-to-tr from-blue-500 to-cyan-300'
                  : 'bg-gradient-to-tr from-red-500 to-amber-400'
              }`}
            >
              <img
                src={player.avatarUrl}
                alt={player.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[12px]"
              />
              <span
                className={`absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md text-xs font-black text-white shadow-md ${
                  isBadem ? 'bg-blue-600' : 'bg-red-600'
                }`}
              >
                #{player.number}
              </span>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isBadem
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      : 'bg-red-500/20 text-red-300 border-red-500/40'
                  }`}
                >
                  {isBadem ? 'Amigos do Badem' : 'Amigos do Becala'}
                </span>
                <span className="text-xs text-slate-400 font-medium">| {player.position}</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-black text-white truncate">
                {player.name}
              </h3>
              <p className="text-sm font-semibold text-amber-400">{player.nickname}</p>
              
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirmado para Dezembro/2026</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-slate-800/80 pt-3">
            <button
              onClick={() => setActiveTab('perfil')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'perfil'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ficha & Dez/26
            </button>
            <button
              onClick={() => setActiveTab('historico')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'historico'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Histórico no Clássico
            </button>
            <button
              onClick={() => setActiveTab('resenha')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'resenha'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Churrasco & Resenha
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm text-slate-300">
          
          {activeTab === 'perfil' && (
            <div className="space-y-4">
              {/* Role & Quote */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Estilo de Jogo & Função:
                </span>
                <p className="text-slate-200 font-medium">{player.roleDescription}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  Especialidade: {player.skillTag}
                </div>
              </div>

              {/* Quote */}
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-2.5">
                <Quote className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm italic text-slate-200">"{player.famousQuote}"</p>
              </div>

              {/* Next Match schedule card for this athlete */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Detalhes de Dezembro/2026
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Escalado
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Mês / Ano</span>
                    <span className="font-semibold text-white">Dezembro/26</span>
                    <span className="text-[10px] text-amber-400 block">Dia a definir</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Horário</span>
                    <span className="font-semibold text-white">A definir</span>
                    <span className="text-[10px] text-slate-400 block">(Tarde/Noite)</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Local</span>
                    <span className="font-semibold text-white truncate block">A definir</span>
                    <span className="text-[10px] text-slate-400 block">(Arena da região)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'historico' && (
            <div className="space-y-4">
              {/* Previous Editions Stats Grid */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-lg sm:text-2xl font-black text-white block">
                    {player.editionHistory.appearances}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Edições</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-lg sm:text-2xl font-black text-emerald-400 block">
                    {player.editionHistory.goals}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Gols</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-lg sm:text-2xl font-black text-blue-400 block">
                    {player.editionHistory.assists}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Passes</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-lg sm:text-2xl font-black text-amber-400 block">
                    {player.editionHistory.yellowCards}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Amarelos</span>
                </div>
              </div>

              {/* Best Moment */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Award className="w-4 h-4" /> Maior Momento em Edições Anteriores:
                </div>
                <p className="text-sm text-slate-200">{player.editionHistory.bestMoment}</p>
              </div>
            </div>
          )}

          {activeTab === 'resenha' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-950 border border-amber-800/40 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" /> Desempenho no Churrasco & Roda de Samba:
                </span>
                <p className="text-base font-bold text-white">{player.editionHistory.bbqRating}</p>
                <p className="text-xs text-slate-300">
                  Conhecido pela pontualidade britânica para chegar ao cooler e por nunca abandonar a roda de samba antes do último refrão.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <span className="font-bold text-slate-100 block">Compromisso Ético da Resenha:</span>
                <p>• O que acontece no gramado fica no gramado;</p>
                <p>• Toda assistência comemora-se com um copo d'água ou suco gelado (ou aquela loira trincando para quem curte);</p>
                <p>• Presença garantida no clássico de Dezembro/2026!</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {player.name} #{player.number}
          </span>
          <div className="flex items-center gap-2">
            {onVoteForPlayer && (
              <button
                onClick={() => {
                  onVoteForPlayer(player);
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                Votar neste atleta
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
