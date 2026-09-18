// Sistema de Áudio da Confraternização BADEM x BECALA
// Música: playlist real tocada via YouTube IFrame Player API (integração oficial).
// Efeitos de torcida: sintetizados localmente pela Web Audio API, independentes
// da música, cada um com mute individual persistido em localStorage.

export interface AudioTrack {
  id: string;
  title: string;
  genre: string;
  videoId: string;
}

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'partida-de-futebol',
    title: 'Skank - É uma Partida de Futebol',
    genre: 'Skank • Hino do Futebol',
    videoId: 'kVvhHgWwgWA',
  },
  {
    id: 'a-amizade',
    title: 'A Amizade',
    genre: 'Fundo de Quintal • Samba',
    videoId: 'YMKm4BEzhwA',
  },
  {
    id: 'na-cadencia-do-samba',
    title: 'Na Cadência do Samba',
    genre: 'Banda Folia Brasileira • Samba',
    videoId: '0ijPrrXpfhI',
  },
];

export type EffectId = 'goal' | 'applause' | 'nearMiss';

const EFFECTS_STORAGE_KEY = 'badem_becala_sfx_mutes';

interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  loadVideoById(videoId: string): void;
  cueVideoById(videoId: string): void;
  setVolume(volume: number): void;
  getPlayerState(): number;
  destroy(): void;
}

interface YouTubePlayerEvent {
  data: number;
  target: YouTubePlayer;
}

interface YouTubeNamespace {
  Player: new (
    element: HTMLElement | string,
    options: {
      width?: string | number;
      height?: string | number;
      videoId?: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (event: { target: YouTubePlayer }) => void;
        onStateChange?: (event: YouTubePlayerEvent) => void;
        onError?: (event: { data: number; target: YouTubePlayer }) => void;
      };
    }
  ) => YouTubePlayer;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

type YouTubeWindow = Window & {
  YT?: YouTubeNamespace;
  onYouTubeIframeAPIReady?: () => void;
};

class StadiumAudioEngine {
  // Web Audio (efeitos de torcida)
  private ctx: AudioContext | null = null;
  private noise: AudioBuffer | null = null;

  // YouTube (música)
  private ytPlayer: YouTubePlayer | null = null;
  private ytApiPromise: Promise<void> | null = null;
  private ytPlayerPromise: Promise<void> | null = null;

  private isPlaying = false;
  private volume = 0.7;
  private currentTrackIndex = 0;
  private listeners: Array<() => void> = [];

  private effectMutes: Record<EffectId, boolean> = {
    goal: false,
    applause: false,
    nearMiss: false,
  };

  constructor() {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(EFFECTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Record<EffectId, boolean>>;
        this.effectMutes = { ...this.effectMutes, ...parsed };
      }
    } catch {
      // Preferência inválida: mantém o padrão.
    }
    // Pré-carrega as vozes para a narração do locutor.
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }

  // ---------------------------------------------------------------------------
  // Infraestrutura Web Audio (apenas efeitos)
  // ---------------------------------------------------------------------------

  private getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private getNoise(ctx: AudioContext): AudioBuffer {
    if (this.noise) return this.noise;
    const length = Math.floor(ctx.sampleRate * 2);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noise = buffer;
    return buffer;
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentTrack(): AudioTrack {
    return AUDIO_TRACKS[this.currentTrackIndex];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  // Volume exclusivo da música (não afeta os efeitos de torcida).
  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    this.applyMusicVolume();
    this.notify();
  }

  private applyMusicVolume() {
    if (!this.ytPlayer) return;
    try {
      this.ytPlayer.setVolume(Math.round(this.volume * 100));
    } catch {
      // Player ainda não pronto.
    }
  }

  // ---------------------------------------------------------------------------
  // Soundboard: mute individual de cada efeito
  // ---------------------------------------------------------------------------

  public getEffectMutes(): Record<EffectId, boolean> {
    return { ...this.effectMutes };
  }

  public getEffectMuted(id: EffectId): boolean {
    return this.effectMutes[id];
  }

  public toggleEffectMute(id: EffectId): boolean {
    this.effectMutes[id] = !this.effectMutes[id];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(EFFECTS_STORAGE_KEY, JSON.stringify(this.effectMutes));
      } catch {
        // localStorage indisponível: segue apenas em memória.
      }
    }
    this.notify();
    return this.effectMutes[id];
  }

  // ---------------------------------------------------------------------------
  // YouTube IFrame Player API (música)
  // ---------------------------------------------------------------------------

  private loadYouTubeApi(): Promise<void> {
    if (this.ytApiPromise) return this.ytApiPromise;
    this.ytApiPromise = new Promise<void>((resolve) => {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        resolve();
        return;
      }
      const w = window as YouTubeWindow;
      if (w.YT && w.YT.Player) {
        resolve();
        return;
      }
      const previous = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        if (previous) previous();
        resolve();
      };
      if (!document.getElementById('youtube-iframe-api')) {
        const script = document.createElement('script');
        script.id = 'youtube-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
      }
    });
    return this.ytApiPromise;
  }

  private ensurePlayer(): Promise<void> {
    if (this.ytPlayer) return Promise.resolve();
    if (this.ytPlayerPromise) return this.ytPlayerPromise;

    this.ytPlayerPromise = (async () => {
      await this.loadYouTubeApi();
      if (typeof document === 'undefined') return;
      const w = window as YouTubeWindow;
      const YT = w.YT;
      if (!YT || !YT.Player || this.ytPlayer) return;

      const container = document.createElement('div');
      container.id = 'badem-becala-youtube-player';
      container.setAttribute('aria-hidden', 'true');
      // Player real fica fora da tela: a experiência visual é 100% do site.
      container.style.cssText =
        'position:fixed;left:-9999px;top:0;width:320px;height:180px;opacity:0;pointer-events:none;border:0;';
      document.body.appendChild(container);

      await new Promise<void>((resolve) => {
        new YT.Player(container, {
          width: '320',
          height: '180',
          videoId: AUDIO_TRACKS[this.currentTrackIndex].videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            fs: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event) => {
              this.ytPlayer = event.target;
              this.applyMusicVolume();
              resolve();
              this.notify();
            },
            onStateChange: (event) => this.handlePlayerState(event),
            onError: () => {
              resolve();
            },
          },
        });
      });
    })();

    return this.ytPlayerPromise;
  }

  private handlePlayerState(event: YouTubePlayerEvent) {
    const YT = (window as YouTubeWindow).YT;
    if (!YT) return;
    if (event.data === YT.PlayerState.ENDED) {
      this.nextTrack();
      return;
    }
    if (event.data === YT.PlayerState.PLAYING) {
      this.isPlaying = true;
      this.notify();
    } else if (event.data === YT.PlayerState.PAUSED) {
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggleMusic(): boolean {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.ensurePlayer().then(() => {
        if (!this.ytPlayer) return;
        this.applyMusicVolume();
        try {
          this.ytPlayer.playVideo();
        } catch {
          // Player indisponível.
        }
        this.notify();
      });
    } else if (this.ytPlayer) {
      try {
        this.ytPlayer.pauseVideo();
      } catch {
        // Player indisponível.
      }
    }

    this.notify();
    return this.isPlaying;
  }

  public setTrack(index: number) {
    if (index < 0 || index >= AUDIO_TRACKS.length) return;
    this.currentTrackIndex = index;
    const track = AUDIO_TRACKS[index];

    if (this.ytPlayer) {
      try {
        if (this.isPlaying) {
          this.ytPlayer.loadVideoById(track.videoId);
        } else {
          this.ytPlayer.cueVideoById(track.videoId);
        }
      } catch {
        // Player indisponível.
      }
    } else if (this.isPlaying) {
      this.ensurePlayer().then(() => {
        if (!this.ytPlayer) return;
        this.applyMusicVolume();
        try {
          this.ytPlayer.playVideo();
        } catch {
          // Player indisponível.
        }
        this.notify();
      });
    }

    this.notify();
  }

  public nextTrack() {
    this.setTrack((this.currentTrackIndex + 1) % AUDIO_TRACKS.length);
  }

  // ---------------------------------------------------------------------------
  // Efeitos de torcida (soundboard) — volume próprio, separado da música
  // ---------------------------------------------------------------------------

  private synthApplause(duration = 1.6, level = 1) {
    const ctx = this.getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const startTime = now + 0.03;
    const endTime = startTime + duration;

    // Cadeia mestra: remove graves desnecessários, suaviza agudos estridentes
    // (evita chiado/hiss) e controla picos para não clipar.
    const master = ctx.createGain();
    master.gain.value = 0.0001;

    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 320;
    highpass.Q.value = 0.5;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 6200;
    lowpass.Q.value = 0.4;

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -20;
    compressor.knee.value = 22;
    compressor.ratio.value = 3.5;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.18;

    highpass.connect(lowpass);
    lowpass.connect(compressor);
    compressor.connect(master);
    master.connect(ctx.destination);

    // Envelope geral: subida rápida e queda natural (sem cauda artificial).
    const targetGain = 0.75 * level;
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(targetGain, startTime + 0.05);
    master.gain.exponentialRampToValueAtTime(targetGain * 0.45, startTime + duration * 0.55);
    master.gain.exponentialRampToValueAtTime(0.0001, endTime + 0.15);

    const noiseBuffer = this.getNoise(ctx);

    // Uma palma = 2 ou 3 micro-impactos curtos (mãos + rebote), com envelope
    // de ataque bem rápido e decay curto, filtro e volume levemente diferentes.
    const scheduleClap = (time: number, peak: number, dest: AudioNode) => {
      const burstCount = Math.random() < 0.35 ? 3 : 2;
      let burstTime = time;

      for (let b = 0; b < burstCount; b += 1) {
        const src = ctx.createBufferSource();
        src.buffer = noiseBuffer;
        src.playbackRate.value = 0.9 + Math.random() * 0.25;

        const band = ctx.createBiquadFilter();
        band.type = 'bandpass';
        band.frequency.value =
          b === 0 ? 1100 + Math.random() * 1200 : 2200 + Math.random() * 2200;
        band.Q.value = 0.7 + Math.random() * 0.5;

        const gain = ctx.createGain();
        const amp = Math.max(0.0002, peak * (b === 0 ? 1 : 0.45 + Math.random() * 0.25));
        const attack = 0.0008 + Math.random() * 0.0018;
        const decay = (b === 0 ? 0.03 : 0.018) + Math.random() * 0.025;

        gain.gain.setValueAtTime(0.0001, burstTime);
        gain.gain.exponentialRampToValueAtTime(amp, burstTime + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, burstTime + attack + decay);

        src.connect(band);
        band.connect(gain);
        gain.connect(dest);

        src.start(burstTime);
        src.stop(burstTime + attack + decay + 0.02);

        burstTime += 0.006 + Math.random() * 0.012;
      }
    };

    // Várias "pessoas" aplaudindo, cada uma com ritmo próprio e posição fixa
    // na arquibancada (leve estéreo), criando a sensação de massa de palmas.
    const clappers = 9 + Math.floor(Math.random() * 5);
    for (let c = 0; c < clappers; c += 1) {
      const panner =
        typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null;
      let dest: AudioNode = master;
      if (panner) {
        panner.pan.value = (Math.random() * 2 - 1) * 0.55;
        panner.connect(master);
        dest = panner;
      }

      const interval = 0.16 + Math.random() * 0.09;
      let t = startTime + Math.random() * interval;

      while (t < endTime) {
        // Palmas fortes são raras; a maioria fica em intensidade média.
        const closeness = Math.random();
        const peak = 0.16 + closeness * closeness * 0.34;
        scheduleClap(t, peak, dest);

        // Jitter no intervalo para nunca soar como metrônomo.
        t += interval * (0.8 + Math.random() * 0.5);
      }
    }

    window.setTimeout(() => {
      try {
        master.disconnect();
      } catch {
        // já desconectado
      }
    }, (duration + 1.2) * 1000);
  }

  private synthNearMiss() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    const out = ctx.createGain();
    out.gain.value = 0.8;
    out.connect(ctx.destination);

    const src = ctx.createBufferSource();
    src.buffer = this.getNoise(ctx);
    src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(400, now);
    lp.frequency.linearRampToValueAtTime(1400, now + 0.5);
    lp.frequency.linearRampToValueAtTime(500, now + 1.4);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.45);
    gain.gain.linearRampToValueAtTime(0.0001, now + 1.4);
    src.connect(lp);
    lp.connect(gain);
    gain.connect(out);
    src.start(now);
    src.stop(now + 1.5);

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.9);
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(0.12, now + 0.1);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
    osc.connect(oscGain);
    oscGain.connect(out);
    osc.start(now);
    osc.stop(now + 1.2);

    window.setTimeout(() => {
      try {
        out.disconnect();
      } catch {
        // já desconectado
      }
    }, 2000);
  }

  private playGoalHorn() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const out = ctx.createGain();
    out.gain.value = 0.85;
    out.connect(ctx.destination);

    const notes = [
      { freq: 261.63, start: 0.0, dur: 0.16 },
      { freq: 329.63, start: 0.16, dur: 0.16 },
      { freq: 392.0, start: 0.32, dur: 0.2 },
      { freq: 523.25, start: 0.52, dur: 0.8 },
    ];

    notes.forEach(({ freq, start, dur }) => {
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, now + start);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now + start);

      const amp = 0.22;

      gain1.gain.setValueAtTime(0.001, now + start);
      gain1.gain.exponentialRampToValueAtTime(amp, now + start + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

      gain2.gain.setValueAtTime(0.001, now + start);
      gain2.gain.exponentialRampToValueAtTime(amp * 0.5, now + start + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

      osc1.connect(gain1);
      gain1.connect(out);
      osc2.connect(gain2);
      gain2.connect(out);

      osc1.start(now + start);
      osc1.stop(now + start + dur + 0.05);
      osc2.start(now + start);
      osc2.stop(now + start + dur + 0.05);
    });

    window.setTimeout(() => {
      try {
        out.disconnect();
      } catch {
        // já desconectado
      }
    }, 1800);
  }

  private pickPortugueseVoice(): SpeechSynthesisVoice | undefined {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(
      (v) =>
        v.lang.toLowerCase().includes('pt-br') ||
        v.lang.toLowerCase().includes('pt_br') ||
        v.name.toLowerCase().includes('brazil') ||
        v.lang.toLowerCase().startsWith('pt')
    );
  }

  private shout(text: string, pitch: number, rate: number) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      const voice = this.pickPortugueseVoice();
      if (voice) utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Síntese de voz indisponível no navegador.
    }
  }

  public playGoalCheer() {
    if (this.effectMutes.goal) return;
    this.getCtx();
    const phrases = [
      'É goooooooooooooooooool! Gooooooool! Que golaço no clássico Badem e Becala!',
      'Gooooooooooooooooool! É gol de placa! O camisa dez mandou na gaveta!',
      'É goooooooooooooooooool! Bola na rede! Explode a torcida!',
      'Gooooooooooooooooool! Gol do clássico! Que categoria!',
    ];
    this.shout(phrases[Math.floor(Math.random() * phrases.length)], 1.35, 1.1);
    this.playGoalHorn();
    this.synthApplause(2.0, 1.15);
  }

  public playApplause() {
    if (this.effectMutes.applause) return;
    this.getCtx();
    this.synthApplause(1.6, 1);
  }

  public playNearMiss() {
    if (this.effectMutes.nearMiss) return;
    this.getCtx();
    const phrases = [
      'Uhhhhh! Na trave! Essa quase entrou!',
      'Uhhhhh! Raspando a trave! Que perigo!',
      'Uhhhhh! Quase! Passou tirando tinta da trave!',
    ];
    this.shout(phrases[Math.floor(Math.random() * phrases.length)], 1.25, 1.15);
    this.synthNearMiss();
  }
}

export const stadiumAudio = new StadiumAudioEngine();
