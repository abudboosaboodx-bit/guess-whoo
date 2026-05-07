import { CELEBRITIES } from '../constants.ts';
import Card from './Card.tsx';
import { cn } from '../lib/utils.ts';

interface GameBoardProps {
  eliminatedIds: string[];
  onCardClick: (celebrityId: string) => void;
  selectionId?: string | null;
  disabled?: boolean;
}

export default function GameBoard({ eliminatedIds, onCardClick, selectionId, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-6 p-2 sm:p-8">
      {CELEBRITIES.map((celeb) => (
        <Card
          key={celeb.id}
          celebrity={celeb}
          isEliminated={eliminatedIds.includes(celeb.id)}
          isSelected={selectionId === celeb.id}
          onClick={() => onCardClick(celeb.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
