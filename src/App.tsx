/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Celebrity, GamePhase, GameState, MatchHistory } from './types.ts';
import { CELEBRITIES } from './constants.ts';
import EntryScreen from './components/EntryScreen.tsx';
import SelectionScreen from './components/SelectionScreen.tsx';
import HandoffScreen from './components/HandoffScreen.tsx';
import GameHUD from './components/GameHUD.tsx';
import ResultScreen from './components/ResultScreen.tsx';

export const celebrityById = (id: string) => CELEBRITIES.find(c => c.id === id);

const INITIAL_STATE: GameState = {
  player1Name: '',
  player2Name: '',
  player1Selection: null,
  player2Selection: null,
  eliminatedByP1: [],
  eliminatedByP2: [],
  currentTurn: 1,
  winner: null,
  phase: 'ENTRY',
};

export default function App() {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('face-duel-last-session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only restore if not finished
        if (parsed.phase !== 'REVEAL') return parsed;
      } catch (e) {
        console.error("Failed to restore session", e);
      }
    }
    return INITIAL_STATE;
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('face-duel-last-session', JSON.stringify(state));
  }, [state]);

  const handleStartMatch = (p1: string, p2: string) => {
    setState(prev => ({
      ...prev,
      player1Name: p1,
      player2Name: p2,
      phase: 'PLAYER1_SELECT'
    }));
  };

  const handleP1Select = (celebId: string) => {
    setState(prev => ({
      ...prev,
      player1Selection: celebId,
      phase: 'HANDOFF_TO_P2'
    }));
  };

  const handleP2Select = (celebId: string) => {
    setState(prev => ({
      ...prev,
      player2Selection: celebId,
      phase: 'GAMEPLAY'
    }));
  };

  const toggleElimination = (celebId: string) => {
    setState(prev => {
      const field = prev.currentTurn === 1 ? 'eliminatedByP1' : 'eliminatedByP2';
      const existing = prev[field];
      const next = existing.includes(celebId) 
        ? existing.filter(id => id !== celebId)
        : [...existing, celebId];
      
      return { ...prev, [field]: next };
    });
  };

  const handleNextTurn = () => {
    setState(prev => ({
      ...prev,
      currentTurn: prev.currentTurn === 1 ? 2 : 1,
      phase: 'TURN_HANDOFF'
    }));
  };

  const handleSnipe = (guessId: string) => {
    const opponentSelection = state.currentTurn === 1 ? state.player2Selection : state.player1Selection;
    
    if (guessId === opponentSelection) {
      // Victory!
      setState(prev => ({
        ...prev,
        winner: prev.currentTurn,
        phase: 'REVEAL'
      }));
      saveToHistory(state.currentTurn);
    } else {
      // Failed Snipe penalty: Skip turn
      alert(`Wrong! That was not their celebrity. You lose your turn.`);
      handleNextTurn();
    }
  };

  const saveToHistory = (winnerSlot: 1 | 2) => {
    const history: MatchHistory[] = JSON.parse(localStorage.getItem('face-duel-history') || '[]');
    const newEntry: MatchHistory = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      player1: state.player1Name,
      player2: state.player2Name,
      winner: winnerSlot === 1 ? state.player1Name : state.player2Name,
      duration: '5 min' // Placeholder
    };
    localStorage.setItem('face-duel-history', JSON.stringify([newEntry, ...history].slice(0, 20)));
  };

  const resetGame = () => {
    setState({
      ...INITIAL_STATE,
      player1Name: state.player1Name,
      player2Name: state.player2Name,
      phase: 'PLAYER1_SELECT'
    });
  };

  const goHome = () => {
    setState(INITIAL_STATE);
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <AnimatePresence mode="wait">
        {state.phase === 'ENTRY' && (
          <motion.div key="entry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EntryScreen onStart={handleStartMatch} />
          </motion.div>
        )}

        {state.phase === 'PLAYER1_SELECT' && (
          <motion.div key="p1-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SelectionScreen playerName={state.player1Name} onSelect={handleP1Select} />
          </motion.div>
        )}

        {state.phase === 'HANDOFF_TO_P2' && (
          <motion.div key="handoff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HandoffScreen nextPlayer={state.player2Name} onContinue={() => setState(p => ({ ...p, phase: 'PLAYER2_SELECT' }))} />
          </motion.div>
        )}

        {state.phase === 'PLAYER2_SELECT' && (
          <motion.div key="p2-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SelectionScreen playerName={state.player2Name} onSelect={handleP2Select} />
          </motion.div>
        )}

        {state.phase === 'GAMEPLAY' && (
          <motion.div key="gameplay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GameHUD 
              state={state} 
              onEliminate={toggleElimination} 
              onNextTurn={handleNextTurn}
              onSnipe={handleSnipe}
            />
          </motion.div>
        )}

        {state.phase === 'TURN_HANDOFF' && (
          <motion.div key="turn-handoff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HandoffScreen 
              nextPlayer={state.currentTurn === 1 ? state.player1Name : state.player2Name} 
              onContinue={() => setState(p => ({ ...p, phase: 'GAMEPLAY' }))} 
            />
          </motion.div>
        )}

        {state.phase === 'REVEAL' && (
          <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultScreen 
              winnerName={state.winner === 1 ? state.player1Name : state.player2Name}
              loserName={state.winner === 1 ? state.player2Name : state.player1Name}
              winnerSelection={celebrityById(state.winner === 1 ? state.player1Selection! : state.player2Selection!)!}
              loserSelection={celebrityById(state.winner === 1 ? state.player2Selection! : state.player1Selection!)!}
              onRematch={resetGame}
              onHome={goHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

