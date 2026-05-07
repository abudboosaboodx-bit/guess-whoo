import { motion } from 'motion/react';
import { CELEBRITIES } from '../constants.ts';
import Card from './Card.tsx';
import { useState } from 'react';
import { Check, ShieldAlert } from 'lucide-react';

interface SelectionScreenProps {
  playerName: string;
  onSelect: (celebrityId: string) => void;
}

export default function SelectionScreen({ playerName, onSelect }: SelectionScreenProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-surface-base text-slate-100 p-8 pb-40">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex items-center justify-between border-b border-white/5 pb-8">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center shadow-lg shadow-accent-cyan/20">
              <ShieldAlert className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                Secret Selection
              </h2>
              <p className="text-2xl font-bold tracking-tight mt-1">
                Pick your identity, <span className="text-accent-cyan underline decoration-accent-cyan/30 underline-offset-4">{playerName}</span>
              </p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phase: Concealed</span>
          </div>
        </header>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {CELEBRITIES.map((celeb) => (
            <Card
              key={celeb.id}
              celebrity={celeb}
              isSelected={selectedId === celeb.id}
              onClick={() => setSelectedId(celeb.id)}
            />
          ))}
        </div>
      </div>

      {/* Floating Confirm Button */}
      <div className="fixed bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent pt-20 z-50">
        <div className="max-w-xl mx-auto">
          <button
            disabled={!selectedId}
            onClick={() => selectedId && onSelect(selectedId)}
            className="w-full h-16 bg-white text-black font-black rounded-full uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 disabled:grayscale disabled:scale-100 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.1)] group"
          >
            {selectedId ? (
              <>
                Confirm Identity <Check className="w-5 h-5 group-hover:scale-125 transition-transform" />
              </>
            ) : (
              "Select your face"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
