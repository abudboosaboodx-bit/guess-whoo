import { motion } from 'motion/react';
import { Smartphone, Lock } from 'lucide-react';

interface HandoffScreenProps {
  nextPlayer: string;
  onContinue: () => void;
}

export default function HandoffScreen({ nextPlayer, onContinue }: HandoffScreenProps) {
  return (
    <div className="min-h-screen bg-surface-base flex flex-col items-center justify-center text-slate-100 p-8 overflow-hidden relative">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-12 relative z-10"
      >
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-violet flex items-center justify-center animate-pulse shadow-2xl shadow-accent-cyan/30">
            <Smartphone className="w-10 h-10 text-black" />
          </div>
          <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-surface-base border-4 border-surface-base flex items-center justify-center">
             <div className="w-full h-full rounded-full bg-accent-rose flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-500">Device Handover</h2>
          <h3 className="text-5xl font-bold tracking-tighter leading-tight">
            Pass device to<br />
            <span className="text-accent-cyan italic">{nextPlayer}</span>
          </h3>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] bg-white/5 inline-block px-4 py-2 rounded-full border border-white/5">
            Hide the screen from your opponent
          </p>
        </div>

        <button 
          onClick={onContinue}
          className="bg-white text-black font-black px-12 py-5 rounded-full uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/5 border border-white/10"
        >
          Confirm Handover
        </button>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-violet/10 rounded-full blur-[120px]" />
      
      {/* Bottom edge gradient */}
      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-rose opacity-40" />
    </div>
  );
}
