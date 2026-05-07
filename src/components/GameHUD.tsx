import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameState } from '../types.ts';
import { celebrityById } from '../App.tsx';
import GameBoard from './GameBoard.tsx';
import SnipeModal from './SnipeModal.tsx';
import { Target, ArrowRight, UserCircle, RotateCcw } from 'lucide-react';
import { CELEBRITIES } from '../constants.ts';
import { cn } from '../lib/utils.ts';

interface GameHUDProps {
  state: GameState;
  onEliminate: (celebId: string) => void;
  onNextTurn: () => void;
  onSnipe: (guessId: string) => void;
}

export default function GameHUD({ state, onEliminate, onNextTurn, onSnipe }: GameHUDProps) {
  const [showSnipe, setShowSnipe] = useState(false);
  
  const activePlayerName = state.currentTurn === 1 ? state.player1Name : state.player2Name;
  const activeSelectionId = state.currentTurn === 1 ? state.player1Selection : state.player2Selection;
  const activeEliminatedIds = state.currentTurn === 1 ? state.eliminatedByP1 : state.eliminatedByP2;
  
  return (
    <div className="min-h-screen bg-surface-base text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="h-16 md:h-28 px-4 md:px-12 bg-surface-header backdrop-blur-md sticky top-0 z-40 border-b border-white/5 flex items-center justify-between overflow-hidden">
        {/* Player 1 Detail - Mobile: Show if turn 1, Tablet: Always show */}
        <div className={cn(
          "flex items-center gap-3 md:gap-6 transition-all duration-500",
          state.currentTurn === 2 && "max-md:hidden opacity-50 grayscale pt-2"
        )}>
          <div className={cn(
            "w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-gradient-to-br shadow-lg transition-all ring-2 ring-white/5",
            "from-accent-cyan to-accent-violet",
            state.currentTurn === 1 ? "shadow-accent-cyan/40 scale-110 ring-accent-cyan/20" : "scale-100 md:scale-90"
          )}>
            <span className="font-black text-black text-[10px] md:text-base">P1</span>
          </div>
          <div className="space-y-0 text-left">
            <h2 className="text-[10px] md:text-base font-black tracking-widest uppercase text-slate-100">
              {state.player1Name}
            </h2>
            <div className="flex items-center gap-2">
              <p className={cn(
                "text-[8px] md:text-[10px] font-bold uppercase tracking-widest",
                state.currentTurn === 1 ? "text-accent-cyan" : "text-slate-500"
              )}>
                {state.currentTurn === 1 ? 'Active Turn' : 'Waiting'}
              </p>
              <div className="md:hidden text-[10px] font-mono text-slate-400">
                • {24 - state.eliminatedByP1.length} left
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress - Tablet Only */}
        <div className="hidden md:flex flex-col items-center gap-2 flex-1 max-w-[200px] mx-8">
           <div className="flex justify-between w-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span>{24 - state.eliminatedByP1.length} </span>
              <span>VS</span>
              <span> {24 - state.eliminatedByP2.length}</span>
           </div>
           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-accent-cyan transition-all duration-1000" 
                style={{ width: `${(state.eliminatedByP1.length / 24) * 100}%` }}
              />
              <div 
                className="h-full bg-accent-rose transition-all duration-1000" 
                style={{ width: `${(state.eliminatedByP2.length / 24) * 100}%` }}
              />
           </div>
        </div>

        {/* Player 2 Detail - Mobile: Show if turn 2, Tablet: Always show */}
        <div className={cn(
          "flex items-center gap-3 md:gap-6 transition-all duration-500 text-right flex-row-reverse",
          state.currentTurn === 1 && "max-md:hidden opacity-50 grayscale pt-2"
        )}>
          <div className={cn(
            "w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-gradient-to-br shadow-lg transition-all ring-2 ring-white/5",
            "from-accent-violet to-accent-rose",
            state.currentTurn === 2 ? "shadow-accent-rose/40 scale-110 ring-accent-rose/20" : "scale-100 md:scale-90"
          )}>
            <span className="font-black text-black text-[10px] md:text-base">P2</span>
          </div>
          <div className="space-y-0">
            <h2 className="text-[10px] md:text-base font-black tracking-widest uppercase text-slate-100">
              {state.player2Name}
            </h2>
            <div className="flex items-center justify-end gap-2">
              <div className="md:hidden text-[10px] font-mono text-slate-400">
                {24 - state.eliminatedByP2.length} left •
              </div>
              <p className={cn(
                "text-[8px] md:text-[10px] font-bold uppercase tracking-widest",
                state.currentTurn === 2 ? "text-accent-rose" : "text-slate-500"
              )}>
                {state.currentTurn === 2 ? 'Active Turn' : 'Waiting'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Board */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-2 pb-28">
        <GameBoard 
          eliminatedIds={activeEliminatedIds} 
          onCardClick={onEliminate} 
          selectionId={activeSelectionId}
        />
      </main>

      {/* Footer Controls */}
      <footer className="h-24 md:h-44 px-4 md:px-16 bg-black/90 backdrop-blur-xl border-t border-white/5 sticky bottom-0 z-40 flex items-center justify-between">
        <div className="flex gap-4 md:gap-8 items-center">
          {/* Identity removed per user request */}
        </div>

        <div className="flex gap-2 md:gap-6">
          <button 
            onClick={onNextTurn}
            className="group flex items-center gap-3 px-4 md:px-10 py-3 md:py-6 bg-surface-hover hover:bg-[#25252E] rounded-lg md:rounded-2xl border border-white/10 font-bold uppercase tracking-[0.2em] text-[9px] md:text-[11px] transition-all active:scale-95 shadow-xl"
          >
            End Turn
            <ArrowRight size={16} className="hidden md:block group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setShowSnipe(true)}
            className="relative px-6 md:px-14 py-3 md:py-6 bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-500 hover:to-rose-700 rounded-lg md:rounded-2xl shadow-[0_0_50px_rgba(225,29,72,0.3)] transition-all group overflow-hidden active:scale-95"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-0 group-hover:opacity-40 transition-opacity" />
            <span className="relative z-10 font-black uppercase tracking-[0.1em] md:tracking-[0.3em] text-[10px] md:text-lg text-white">Snipe</span>
          </button>
        </div>

        <div className="hidden xl:block w-48 bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] uppercase text-slate-500 font-black tracking-widest">Match Pulse</p>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          </div>
          <div className="flex gap-1.5 overflow-hidden h-1">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className={cn(
                "flex-1 rounded-full",
                i < state.eliminatedByP1.length / 2 ? "bg-accent-cyan" : "bg-white/10"
              )} />
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-mono font-bold">{activeEliminatedIds.length}/24 Eliminated</p>
        </div>
      </footer>

      <AnimatePresence>
        {showSnipe && (
          <SnipeModal 
            onClose={() => setShowSnipe(false)} 
            onGuess={(id) => {
              setShowSnipe(false);
              onSnipe(id);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
