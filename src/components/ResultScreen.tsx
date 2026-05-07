import { motion } from 'motion/react';
import { Celebrity } from '../types.ts';
import { Trophy, RefreshCw, History as HistoryIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface ResultScreenProps {
  winnerName: string;
  loserName: string;
  winnerSelection: Celebrity;
  loserSelection: Celebrity;
  onRematch: () => void;
  onHome: () => void;
}

export default function ResultScreen({ 
  winnerName, 
  loserName, 
  winnerSelection, 
  loserSelection, 
  onRematch, 
  onHome 
}: ResultScreenProps) {
  
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#8b5cf6', '#ef4444']
    });
  }, []);

  return (
    <div className="min-h-screen bg-surface-base text-slate-100 p-8 flex flex-col items-center justify-center overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-16 max-w-xl w-full relative z-10"
      >
        <header className="space-y-6">
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-yellow-500/30 rotate-12">
              <Trophy className="w-12 h-12 text-black" />
            </div>
          </motion.div>
          <div className="space-y-2">
            <p className="text-[10px] text-accent-cyan font-black uppercase tracking-[0.5em]">Ultimate Victory</p>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              {winnerName} <span className="text-accent-cyan">Wins</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-10 md:gap-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            <p className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-[0.2em]">{winnerName}'s Face</p>
            <div className="aspect-[3/4] md:w-64 rounded-3xl overflow-hidden border-2 border-accent-cyan shadow-2xl shadow-accent-cyan/20">
              <img src={winnerSelection.imageUrl} alt={winnerSelection.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <p className="font-black text-xl md:text-2xl tracking-tight text-white">{winnerSelection.name}</p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 md:space-y-6"
          >
            <p className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-[0.2em]">{loserName}'s Face</p>
            <div className="aspect-[3/4] md:w-64 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 grayscale">
              <img src={loserSelection.imageUrl} alt={loserSelection.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <p className="font-black text-xl md:text-2xl tracking-tight text-slate-400">{loserSelection.name}</p>
          </motion.div>
        </div>

        <footer className="grid grid-cols-2 gap-6 w-full pt-12">
          <button 
            onClick={onRematch}
            className="h-16 bg-white text-black font-black rounded-2xl uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/5"
          >
            <RefreshCw className="w-5 h-5" /> Rematch
          </button>
          <button 
            onClick={onHome}
            className="h-16 bg-surface-header text-slate-100 font-black rounded-2xl uppercase tracking-[0.2em] text-sm hover:bg-slate-800 transition-all border border-white/10 flex items-center justify-center gap-3"
          >
            <HistoryIcon className="w-5 h-5" /> Menu
          </button>
        </footer>
      </motion.div>

      {/* Background Glows */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-accent-cyan/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-rose opacity-40 shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
    </div>
  );
}
