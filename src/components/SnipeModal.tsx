import { motion, AnimatePresence } from 'motion/react';
import { CELEBRITIES } from '../constants.ts';
import { Celebrity } from '../types.ts';
import { Search, X, Target } from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from '../lib/utils.ts';

interface SnipeModalProps {
  onClose: () => void;
  onGuess: (celebrityId: string) => void;
}

export default function SnipeModal({ onClose, onGuess }: SnipeModalProps) {
  const [search, setSearch] = useState('');
  
  const filteredCelebrities = useMemo(() => {
    if (!search) return CELEBRITIES;
    return CELEBRITIES.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-surface-header w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
          <div>
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-rose flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              Direct Snipe
            </h2>
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] mt-1.5 ml-1">High Risk • High Reward</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 bg-black/40">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search opponent's identity..."
              className="w-full bg-[#1A1A20] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-slate-100 font-bold placeholder:text-slate-700 outline-none focus:border-accent-rose/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-4 space-y-2 custom-scrollbar bg-black/20">
          {filteredCelebrities.map((celeb) => (
            <button
              key={celeb.id}
              onClick={() => onGuess(celeb.id)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group text-left border border-transparent hover:border-accent-rose/30"
            >
              <div className="w-12 h-16 rounded-xl overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all border border-white/5 shadow-lg">
                <img src={celeb.imageUrl} alt={celeb.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <p className="text-slate-100 font-bold tracking-tight text-base leading-tight">{celeb.name}</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{celeb.category}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 bg-accent-rose text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-[0.1em]">
                SNIPE
              </div>
            </button>
          ))}
          {filteredCelebrities.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-600 font-bold uppercase text-xs tracking-widest">No matching celebrity</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
