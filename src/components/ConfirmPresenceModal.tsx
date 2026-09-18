import React, { useState } from 'react';
import { X, CheckCircle, Calendar, MapPin, Clock, Users, Send, AlertCircle } from 'lucide-react';
import { Player } from '../types';

interface ConfirmPresenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayerSuggestion: (newPlayer: Player) => void;
}

export const ConfirmPresenceModal: React.FC<ConfirmPresenceModalProps> = ({
  isOpen,
  onClose,
  onAddPlayerSuggestion,
}) => {
  const [tab, setTab] = useState<'avisar' | 'indicar'>('avisar');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState('atleta');
  const [preferredTeam, setPreferredTeam] = useState<'badem' | 'becala'>('badem');
  const [position, setPosition] = useState('Meio-Campo');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmitNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Save interest notification to localStorage
    const saved = localStorage.getItem('badem_becala_interest_list');
    const list = saved ? JSON.parse(saved) : [];
    list.push({
      name: name.trim(),
      contact: contact.trim(),
      type,
      date: new Date().toISOString(),
    });
    localStorage.setItem('badem_becala_interest_list', JSON.stringify(list));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const handleSuggestPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlayer: Player = {
      id: `suggested-${Date.now()}`,
      name: name.trim(),
      nickname: notes.trim() || 'O Convidado Especial',
      number: Math.floor(Math.random() * 80) + 11,
      team: preferredTeam,
      position: position as any,
      roleDescription: 'Atleta confirmado na lista de convocação para Dezembro/2026',
      avatarUrl:
        preferredTeam === 'badem'
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
      pitchCoords: {
        x: preferredTeam === 'badem' ? 30 : 70,
        y: Math.floor(Math.random() * 60) + 20,
      },
      confirmed: true,
      editionHistory: {
        appearances: 1,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        bbqRating: 'Promessa na Grelha e na Geladeira',
        bestMoment: 'Estreia aguardada na grande edição de Dezembro de 2026.',
      },
      famousQuote: 'Cheguei pra somar no futebol e multiplicar no churrasco!',
      skillTag: 'Reforço de Peso',
    };

    onAddPlayerSuggestion(newPlayer);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
            Informações & Presença • Dezembro/2026
          </h3>
          <p className="text-xs text-slate-400">
            Fique por dentro das definições oficiais de dia, horário e campo ou confirme presença.
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-slate-800">
            <button
              onClick={() => setTab('avisar')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                tab === 'avisar'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white bg-slate-900'
              }`}
            >
              Receber Notificação de Data & Local
            </button>
            <button
              onClick={() => setTab('indicar')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                tab === 'indicar'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white bg-slate-900'
              }`}
            >
              Confirmar Atleta no Elenco
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-display text-xl font-bold text-white">Confirmação Registrada!</h4>
              <p className="text-xs text-slate-300">
                Seus dados foram salvos com sucesso. A comissão de organização Badem vs Becala agradece!
              </p>
            </div>
          ) : tab === 'avisar' ? (
            <form onSubmit={handleSubmitNotice} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <AlertCircle className="w-4 h-4" /> Status Atual:
                </div>
                <p>• Data: <strong>Dezembro de 2026</strong> (Dia a ser definido)</p>
                <p>• Horário: <strong>A definir</strong></p>
                <p>• Local: <strong>Arena / Campo a ser anunciado</strong></p>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Seu Nome Completo:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Nome do participante..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">WhatsApp ou Contato (para avisar):</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="(DDD) 99999-9999 ou e-mail"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Você pretende ir como:</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="atleta">Atleta (Quero jogar a partida)</option>
                  <option value="churrasco">Torcida & Churrasco (Apenas confraternização)</option>
                  <option value="comissao">Comissão de Apoio / Grelha</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                Registrar e Receber Avisos do Jogo
              </button>
            </form>
          ) : (
            <form onSubmit={handleSuggestPlayer} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome do Boleiro:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Nome do jogador..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Time Escolhido:</label>
                  <select
                    value={preferredTeam}
                    onChange={(e) => setPreferredTeam(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="badem">Amigos do Badem</option>
                    <option value="becala">Amigos do Becala</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Posição em Campo:</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Goleiro">Goleiro</option>
                    <option value="Zagueiro">Zagueiro</option>
                    <option value="Lateral">Lateral</option>
                    <option value="Meio-Campo">Meio-Campo</option>
                    <option value="Atacante">Atacante</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Apelido ou Causo de Várzea:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: O Artilheiro da Madrugada, Canhota de Ouro..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Users className="w-4 h-4" />
                Adicionar Atleta ao Gramado Interativo
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
