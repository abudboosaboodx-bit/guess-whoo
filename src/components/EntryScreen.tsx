import React from 'react';
import { motion } from 'motion/react';
import { User, Users } from 'lucide-react';

interface EntryScreenProps {
  onStart: (p1: string, p2: string) => void;
}

export default function EntryScreen({ onStart }: EntryScreenProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const p1 = formData.get('p1') as string || 'Player 1';
    const p2 = formData.get('p2') as string || 'Player 2';
    onStart(p1, p2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-base text-slate-100 p-6 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <p className="text-[10px] text-accent-cyan font-black uppercase tracking-[0.3em]">Premium Duel Engine</p>
          </div>
          <h1 className="text-7xl font-black italic uppercase tracking-tighter mb-2 bg-gradient-to-br from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
            Face Duel
          </h1>
          <p className="text-slate-500 font-bold tracking-[0.4em] text-[10px] uppercase">Celebrity Deduction Duel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-3 block ml-1">Player One</label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus-within:border-accent-cyan/50 transition-all shadow-inner">
                <User className="w-5 h-5 text-slate-500 mr-4" />
                <input 
                  autoFocus
                  name="p1"
                  placeholder="Enter First Name"
                  className="bg-transparent border-none outline-none w-full text-slate-100 placeholder:text-slate-700 font-bold tracking-tight text-lg"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-3 block ml-1">Player Two</label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus-within:border-accent-violet/50 transition-all shadow-inner">
                <Users className="w-5 h-5 text-slate-500 mr-4" />
                <input 
                  name="p2"
                  placeholder="Enter Second Name"
                  className="bg-transparent border-none outline-none w-full text-slate-100 placeholder:text-slate-700 font-bold tracking-tight text-lg"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full h-16 bg-white text-black font-black rounded-2xl uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-2xl shadow-white/10 mt-12 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/20 to-accent-cyan/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10">Start Match</span>
          </button>
        </form>

        <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
          <div className="h-px w-12 bg-slate-500" />
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Social Deduction</p>
          <div className="h-px w-12 bg-slate-500" />
        </div>
      </motion.div>

      {/* Background Gradients */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent-violet/5 rounded-full blur-[120px]" />
    </div>
  );
}
