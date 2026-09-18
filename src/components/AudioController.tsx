import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sliders, Music, SkipForward, Play, Pause, Sparkles } from 'lucide-react';
import { stadiumAudio, AUDIO_TRACKS, EffectId } from '../services/stadiumAudio';

interface AudioControllerProps {
  variant?: 'navbar' | 'floating';
}

export const AudioController: React.FC<AudioControllerProps> = ({ variant = 'floating' }) => {
  const [isPlaying, setIsPlaying] = useState(stadiumAudio.getIsPlaying());
  const [volume, setVolume] = useState(stadiumAudio.getVolume());
  const [currentTrack, setCurrentTrack] = useState(stadiumAudio.getCurrentTrack());
  const [currentTrackIndex, setCurrentTrackIndex] = useState(stadiumAudio.getCurrentTrackIndex());
  const [isOpen, setIsOpen] = useState(false);
  const [lastEffect, setLastEffect] = useState<string | null>(null);
  const [effectMutes, setEffectMutes] = useState<Record<EffectId, boolean>>(() =>
    stadiumAudio.getEffectMutes()
  );
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = stadiumAudio.subscribe(() => {
      setIsPlaying(stadiumAudio.getIsPlaying());
      setVolume(stadiumAudio.getVolume());
      setCurrentTrack(stadiumAudio.getCurrentTrack());
      setCurrentTrackIndex(stadiumAudio.getCurrentTrackIndex());
      setEffectMutes(stadiumAudio.getEffectMutes());
    });
    return () => unsubscribe();
  }, []);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    const newState = stadiumAudio.toggleMusic();
    setIsPlaying(newState);
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    stadiumAudio.nextTrack();
  };

  const handleSelectTrack = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const wasPlaying = stadiumAudio.getIsPlaying();
    stadiumAudio.setTrack(index);
    if (!wasPlaying) {
      stadiumAudio.toggleMusic();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    stadiumAudio.setVolume(val);
  };

  const triggerSound = (name: string, id: EffectId, fn: () => void) => {
    if (stadiumAudio.getEffectMuted(id)) {
      setLastEffect(`${name} (silenciado)`);
      setTimeout(() => setLastEffect(null), 2000);
      return;
    }
    fn();
    setLastEffect(name);
    setTimeout(() => setLastEffect(null), 2000);
  };

  const handleToggleEffectMute = (e: React.MouseEvent, id: EffectId) => {
    e.stopPropagation();
    stadiumAudio.toggleEffectMute(id);
  };

  const soundEffects: Array<{
    id: EffectId;
    emoji: string;
    label: string;
    sub: string;
    color: string;
    border: string;
    playTitle: string;
    play: () => void;
  }> = [
    {
      id: 'goal',
      emoji: '🎙️⚽',
      label: 'Grito de Gol',
      sub: 'Narrador',
      color: 'text-amber-300',
      border: 'hover:border-amber-500/60 hover:bg-amber-500/10',
      playTitle: 'Locutor de rádio grita É GOL + fanfarra de estádio + torcida',
      play: () => stadiumAudio.playGoalCheer(),
    },
    {
      id: 'applause',
      emoji: '👏🎉',
      label: 'Palmas Torcida',
      sub: 'Arquibancada',
      color: 'text-emerald-300',
      border: 'hover:border-emerald-500/60 hover:bg-emerald-500/10',
      playTitle: 'Palmas e aclamação da torcida',
      play: () => stadiumAudio.playApplause(),
    },
    {
      id: 'nearMiss',
      emoji: '😱🥅',
      label: 'Uhhhh! Quase',
      sub: 'Na Trave',
      color: 'text-blue-300',
      border: 'hover:border-blue-500/60 hover:bg-blue-500/10',
      playTitle: 'Reação de quase gol e locutor',
      play: () => stadiumAudio.playNearMiss(),
    },
  ];

  // Content for Soundboard & Music Controller Popup
  const PopoverContent = (
    <div
      ref={popoverRef}
      className={`absolute z-50 bg-slate-900/98 border border-slate-700/90 rounded-2xl p-4 shadow-2xl backdrop-blur-md w-80 text-xs text-slate-200 transition-all ${
        variant === 'navbar'
          ? 'top-full right-0 mt-2'
          : 'bottom-full right-0 mb-3'
      }`}
    >
      {/* Header & Main Toggle */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-amber-500/20 text-emerald-400 border border-emerald-500/30">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Música & Torcida</h4>
            <p className="text-[10px] text-slate-400">Trilha da Resenha BADEM x BECALA</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            isPlaying
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 fill-current" /> PAUSAR
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" /> TOCAR
            </>
          )}
        </button>
      </div>

      {/* Currently Playing Card */}
      <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-base flex-shrink-0">
              {isPlaying ? '🎵' : '⏸️'}
            </span>
            <div className="truncate">
              <p className="font-bold text-slate-100 text-xs truncate">
                {currentTrack.title}
              </p>
              <p className="text-[10px] text-emerald-400 truncate">
                {currentTrack.genre}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNextTrack}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex-shrink-0 ml-2"
            title="Próxima faixa"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Playlist (3 faixas do YouTube) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Music className="w-3 h-3 text-emerald-400" /> Playlist · 3 Faixas
          </span>
          <span className="text-[9px] text-slate-500 font-semibold">YouTube</span>
        </div>

        <div className="space-y-1.5">
          {AUDIO_TRACKS.map((track, index) => {
            const isActive = index === currentTrackIndex;
            return (
              <button
                key={track.id}
                type="button"
                onClick={(e) => handleSelectTrack(e, index)}
                title={isActive && isPlaying ? 'Faixa atual' : `Tocar ${track.title}`}
                className={`w-full flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/10 border-emerald-500/40'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {isActive && isPlaying ? (
                    <span className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-full bg-slate-950 animate-[bounce_0.8s_infinite]" />
                      <span className="w-0.5 h-2/3 bg-slate-950 animate-[bounce_0.6s_infinite_0.2s]" />
                      <span className="w-0.5 h-4/5 bg-slate-950 animate-[bounce_0.7s_infinite_0.4s]" />
                    </span>
                  ) : (
                    index + 1
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[11px] font-bold truncate ${
                      isActive ? 'text-emerald-300' : 'text-slate-200'
                    }`}
                  >
                    {track.title}
                  </span>
                  <span className="block text-[9px] text-slate-500 truncate">{track.genre}</span>
                </span>

                {isActive && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 shrink-0">
                    Atual
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Volume Slider */}
      <div className="mb-4 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px]">
            <Sliders className="w-3 h-3 text-slate-400" /> Volume Geral
          </span>
          <span className="font-bold text-emerald-400 text-[11px]">
            {Math.round(volume * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
      </div>

      {/* Authentic Crowd & Celebration FX Soundboard */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Efeitos de Torcida
          </span>
          {lastEffect && (
            <span className="text-[10px] text-amber-300 font-bold animate-pulse flex items-center gap-1">
              🎙️ {lastEffect}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {soundEffects.map((effect) => {
            const isMuted = effectMutes[effect.id];
            return (
              <div
                key={effect.id}
                className={`relative rounded-xl bg-slate-950 border transition-all group ${
                  isMuted
                    ? 'border-slate-800/70 opacity-70'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => triggerSound(effect.label, effect.id, effect.play)}
                  className={`w-full p-2.5 text-center cursor-pointer rounded-xl transition-all ${effect.border}`}
                  title={effect.playTitle}
                >
                  <span className="text-lg block mb-0.5 group-hover:scale-110 transition-transform">
                    {effect.emoji}
                  </span>
                  <span
                    className={`font-bold text-[10px] block leading-tight ${effect.color}`}
                  >
                    {effect.label}
                  </span>
                  <span className={`text-[8px] font-semibold block mt-0.5 ${effect.color}`}>
                    {effect.sub}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleToggleEffectMute(e, effect.id)}
                  className={`absolute -top-1.5 -right-1.5 p-1 rounded-full border shadow-md transition-colors cursor-pointer ${
                    isMuted
                      ? 'bg-slate-950 text-slate-500 border-slate-700 hover:text-slate-300'
                      : 'bg-emerald-600/90 text-white border-emerald-400/60 hover:bg-emerald-500'
                  }`}
                  title={
                    isMuted
                      ? `Ativar som de ${effect.label}`
                      : `Silenciar apenas o efeito ${effect.label}`
                  }
                  aria-label={
                    isMuted
                      ? `Ativar som de ${effect.label}`
                      : `Silenciar apenas o efeito ${effect.label}`
                  }
                  aria-pressed={isMuted}
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-2 text-[9px] text-slate-500 leading-snug">
          Toque no alto-falante de cada efeito para silenciá-lo individualmente. A preferência
          fica salva no seu navegador e não afeta a música.
        </p>
      </div>
    </div>
  );

  // Variant: Top Navbar Integration
  if (variant === 'navbar') {
    return (
      <div className="relative inline-block">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleToggle}
            className={`px-3 py-1.5 rounded-l-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border-y border-l ${
              isPlaying
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
            }`}
            title={isPlaying ? 'Pausar música da resenha' : 'Tocar música da resenha'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Música: Tocando</span>
                {/* Animated Equalizer Wave */}
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-emerald-400 animate-[bounce_0.8s_infinite]" />
                  <span className="w-0.5 h-2/3 bg-emerald-400 animate-[bounce_0.6s_infinite_0.2s]" />
                  <span className="w-0.5 h-4/5 bg-emerald-400 animate-[bounce_0.7s_infinite_0.4s]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Música: Pausada</span>
              </>
            )}
          </button>

          {/* Quick Trigger to open popover options in navbar */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`px-2 py-1.5 rounded-r-lg border border-l-0 text-[10px] font-bold cursor-pointer transition-colors ${
              isPlaying
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
            }`}
            title="Escolher faixa e efeitos de torcida"
          >
            ⚙️
          </button>
        </div>

        {isOpen && PopoverContent}
      </div>
    );
  }

  // Variant: Floating Bottom-Right Pill Widget (Always accessible while scrolling)
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center select-none">
      <div className="relative">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-950/95 border border-slate-700/90 shadow-2xl backdrop-blur-md">
          {/* Main Toggle Button */}
          <button
            type="button"
            onClick={handleToggle}
            className={`px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
            title={isPlaying ? 'Pausar música da resenha' : 'Tocar música da resenha'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-200" />
                <span className="text-xs">Samba & Torcida</span>
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-white animate-[bounce_0.8s_infinite]" />
                  <span className="w-0.5 h-2/3 bg-white animate-[bounce_0.6s_infinite_0.2s]" />
                  <span className="w-0.5 h-4/5 bg-white animate-[bounce_0.7s_infinite_0.4s]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="text-xs">Ouvir Música</span>
              </>
            )}
          </button>

          {/* Settings / Soundboard Dropdown Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Efeitos de torcida, volume e faixas"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {isOpen && PopoverContent}
      </div>
    </div>
  );
};
