import React, { useState, useEffect } from 'react';
import { WallComment } from '../types';
import { INITIAL_WALL_COMMENTS } from '../data/mockData';
import { MessageSquare, Heart, Send, Users, ChevronDown, ChevronUp } from 'lucide-react';

export const CommunityWall: React.FC = () => {
  const [comments, setComments] = useState<WallComment[]>(() => {
    const saved = localStorage.getItem('badem_becala_wall_comments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_WALL_COMMENTS;
      }
    }
    return INITIAL_WALL_COMMENTS;
  });

  const [likedComments, setLikedComments] = useState<string[]>(() => {
    const saved = localStorage.getItem('badem_becala_liked_comments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Display limit state to avoid scroll hijacking
  const [showAll, setShowAll] = useState(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [affiliation, setAffiliation] = useState<'badem' | 'becala' | 'neutro'>('badem');
  const [role, setRole] = useState('Torcedor');
  const [content, setContent] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('⚽');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('badem_becala_wall_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('badem_becala_liked_comments', JSON.stringify(likedComments));
  }, [likedComments]);

  const handleLike = (commentId: string) => {
    if (likedComments.includes(commentId)) {
      setLikedComments((prev) => prev.filter((id) => id !== commentId));
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, likes: Math.max(0, c.likes - 1) } : c))
      );
    } else {
      setLikedComments((prev) => [...prev, commentId]);
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newComment: WallComment = {
      id: `wall-${Date.now()}`,
      author: author.trim(),
      affiliation,
      role: role.trim() || 'Torcedor',
      content: content.trim(),
      badgeEmoji: selectedEmoji,
      date: 'Agora mesmo',
      likes: 1,
    };

    setComments((prev) => [newComment, ...prev]);
    setAuthor('');
    setContent('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const displayedComments = showAll ? comments : comments.slice(0, 5);

  return (
    <section id="mural" className="py-14 sm:py-20 bg-slate-900/75 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 mb-2">
            <Users className="w-3.5 h-3.5" />
            Voz da Torcida, Família & Amigos
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Mural da <span className="text-purple-400">Comunidade</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Deixe o seu recado de apoio, provoque o rival de forma sadia, mande um abraço para os capitães Badem e Becala e marque presença!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Form to leave a message (5 cols) - Fluid, non-sticky to avoid scroll lag */}
          <div className="lg:col-span-5 bg-slate-950/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              Deixar seu Recado no Mural
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Participe da resenha oficial antes de a bola rolar em Dezembro/2026.
            </p>

            {isSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold text-center">
                Recado publicado com sucesso no mural!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Seu Nome / Apelido:</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  placeholder="Ex: Tio Zé, Renata, Bruninho..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sua Torcida:</label>
                  <select
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="badem">Amigos do Badem</option>
                    <option value="becala">Amigos do Becala</option>
                    <option value="neutro">Torcida Neutra / Resenha</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Vínculo:</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Familiar">Familiar</option>
                    <option value="Torcedor">Torcedor</option>
                    <option value="Atleta">Atleta Convidado</option>
                    <option value="Amigo da Turma">Amigo da Turma</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Emoji do Recado:</label>
                <div className="flex items-center gap-2">
                  {['⚽', '🏆', '🥩', '🔥', '🍻', '👏'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`text-lg p-2 rounded-xl transition-colors cursor-pointer ${
                        selectedEmoji === emoji
                          ? 'bg-purple-600/30 border border-purple-500 scale-105'
                          : 'bg-slate-900 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sua Mensagem / Provocação Sadia:</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={3}
                  placeholder="Escreva sua torcida, piada sadia ou recado para a comissão..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                Publicar Mensagem no Mural
              </button>
            </form>
          </div>

          {/* Comments Feed (7 cols) - Natural document scroll with ZERO scroll trapping */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recados da Turma ({comments.length})
              </span>
              <span className="text-xs text-slate-500">Atualizado pela comunidade</span>
            </div>

            {/* Smooth flow list - NO nested overflow scrollbar */}
            <div className="space-y-3.5">
              {displayedComments.map((comment) => {
                const isBadem = comment.affiliation === 'badem';
                const isBecala = comment.affiliation === 'becala';
                const isLiked = likedComments.includes(comment.id);

                return (
                  <div
                    key={comment.id}
                    className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-sm hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                          {comment.badgeEmoji}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-bold text-sm text-white">
                              {comment.author}
                            </h4>
                            <span
                              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                isBadem
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                  : isBecala
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {isBadem ? 'Torce Badem' : isBecala ? 'Torce Becala' : 'Churrasco'}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {comment.role} • {comment.date}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLike(comment.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isLiked
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                        title="Curtir recado"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                        <span>{comment.likes}</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-1">
                      "{comment.content}"
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Expand / Collapse Button if more than 5 comments */}
            {comments.length > 5 && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Mostrar menos recados
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Ver todos os {comments.length} recados
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
