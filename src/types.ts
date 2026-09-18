export type TeamType = 'badem' | 'becala' | 'comissao' | 'todos';

export type PlayerPosition = 'Goleiro' | 'Zagueiro' | 'Lateral' | 'Meio-Campo' | 'Atacante' | 'Comissão do Churrasco';

export interface Player {
  id: string;
  name: string;
  nickname: string;
  number: number;
  team: 'badem' | 'becala';
  position: PlayerPosition;
  roleDescription: string;
  avatarUrl: string;
  pitchCoords: { x: number; y: number }; // percentage on pitch (0-100)
  confirmed: boolean;
  editionHistory: {
    appearances: number;
    goals: number;
    assists: number;
    yellowCards: number;
    bbqRating: string; // e.g. "Mestre da Grelha", "Primeiro a chegar, último a sair"
    bestMoment: string;
  };
  famousQuote: string;
  skillTag: string;
}

export interface MatchInfo {
  monthYear: string; // "Dezembro / 2026"
  targetDate: string; // ISO date for countdown
  statusDate: string; // "Dia a definir"
  statusTime: string; // "Horário a definir"
  statusLocation: string; // "Local a definir (Campo / Arena da região)"
  editionNumber: string; // "Edição 2026"
  description: string;
}

export interface PastEdition {
  year: number;
  score: string;
  winner: 'badem' | 'becala' | 'empate';
  highlight: string;
  churrascoHighlight: string;
  mvp: string;
  bolaMurcha: string;
  summary: string;
}

export interface VoteOption {
  playerId: string;
  playerName: string;
  nickname: string;
  team: 'badem' | 'becala';
  category: 'cheia' | 'murcha';
  reason: string;
  votes: number;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'campo' | 'resenha' | 'churrasco' | 'trofeu';
  year: number;
  imageUrl: string;
  description: string;
  photographer?: string;
}

export interface WallComment {
  id: string;
  author: string;
  affiliation: 'badem' | 'becala' | 'neutro';
  role: string; // "Torcedor", "Familiar", "Atleta", "Amigo"
  content: string;
  badgeEmoji: string;
  date: string;
  likes: number;
}
