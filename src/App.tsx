import React, { useState, useEffect } from 'react';
import { Player } from './types';
import { INITIAL_PLAYERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroCountdown } from './components/HeroCountdown';
import { InteractivePitch } from './components/InteractivePitch';
import { PlayerDetailModal } from './components/PlayerDetailModal';
import { SquadsSection } from './components/SquadsSection';
import { VotingSection } from './components/VotingSection';
import { HistorySection } from './components/HistorySection';
import { RefereeSection } from './components/RefereeSection';
import { PhotoGallery } from './components/PhotoGallery';
import { CommunityWall } from './components/CommunityWall';
import { ConfirmPresenceModal } from './components/ConfirmPresenceModal';
import { Footer } from './components/Footer';
import { DynamicBackdrop } from './components/DynamicBackdrop';
import { ScrollReveal } from './components/ScrollReveal';
import { AudioController } from './components/AudioController';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export default function App() {
  // Players state with local persistence
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('badem_becala_players');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PLAYERS;
      }
    }
    return INITIAL_PLAYERS;
  });

  // Modal states
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [specialEvent, setSpecialEvent] = useState<'churrasco' | 'resenha' | 'trofeu' | 'penaltis' | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('badem_becala_players', JSON.stringify(players));
  }, [players]);

  const handleAddPlayer = (newPlayer: Player) => {
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const handleJumpToPitch = () => {
    const pitchElem = document.getElementById('campo');
    if (pitchElem) {
      pitchElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVoteForPlayer = (player: Player) => {
    const voteElem = document.getElementById('votacao');
    if (voteElem) {
      voteElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white relative">
      {/* Scroll progress bar (fixed above the navbar) */}
      <ScrollProgressBar />

      {/* Dynamic Parallax Backdrop (Football pitch, grass & BBQ grill atmosphere during scroll) */}
      <DynamicBackdrop />

      {/* Top Navbar */}
      <Navbar onOpenConfirmModal={() => setIsConfirmModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section & Countdown to December 2026 */}
        <HeroCountdown
          onOpenConfirmModal={() => setIsConfirmModalOpen(true)}
          onJumpToPitch={handleJumpToPitch}
        />

        {/* The Interactive Football Pitch (Clickable Art with players, bbq, resenha & previous years' stories) */}
        <ScrollReveal>
          <InteractivePitch
            players={players}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
            onSelectSpecialEvent={(type) => setSpecialEvent(type)}
          />
        </ScrollReveal>

        {/* Confirmed Athletes for December 2026 */}
        <ScrollReveal>
          <SquadsSection
            players={players}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
            onOpenConfirmModal={() => setIsConfirmModalOpen(true)}
          />
        </ScrollReveal>

        {/* Voting System: Bola Cheia vs Bola Murcha */}
        <ScrollReveal>
          <VotingSection players={players} />
        </ScrollReveal>

        {/* History of Previous Editions: Banter, BBQ, Scores & Memories */}
        <ScrollReveal>
          <HistorySection />
        </ScrollReveal>

        {/* Dedicated Referee Crew: Tico, the only and official whistle of the classic */}
        <ScrollReveal>
          <RefereeSection />
        </ScrollReveal>

        {/* Exclusive Photo Gallery with Lightbox */}
        <ScrollReveal>
          <PhotoGallery />
        </ScrollReveal>

        {/* Community, Family & Fan Interactive Message Board */}
        <ScrollReveal>
          <CommunityWall />
        </ScrollReveal>
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Player and Special Event Modal / Drawer */}
      <PlayerDetailModal
        player={selectedPlayer}
        specialEvent={specialEvent}
        onClose={() => {
          setSelectedPlayer(null);
          setSpecialEvent(null);
        }}
        onVoteForPlayer={handleVoteForPlayer}
      />

      {/* RSVP & Suggest Athlete Modal */}
      <ConfirmPresenceModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onAddPlayerSuggestion={handleAddPlayer}
      />

      {/* Persistent Stadium Audio Floating Controller */}
      <AudioController variant="floating" />
    </div>
  );
}
