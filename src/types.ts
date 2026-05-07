export interface Celebrity {
  id: string;
  name: string;
  category: 'Actor' | 'Musician' | 'Athlete' | 'Creator' | 'Icon';
  imageUrl: string;
}

export type GamePhase = 
  | 'ENTRY' 
  | 'PLAYER1_SELECT' 
  | 'HANDOFF_TO_P2' 
  | 'PLAYER2_SELECT' 
  | 'GAMEPLAY' 
  | 'TURN_HANDOFF'
  | 'REVEAL';

export interface GameState {
  player1Name: string;
  player2Name: string;
  player1Selection: string | null; // ID of selected celebrity
  player2Selection: string | null; // ID of selected celebrity
  eliminatedByP1: string[]; // IDs of eliminated cards
  eliminatedByP2: string[]; // IDs of eliminated cards
  currentTurn: 1 | 2;
  winner: 1 | 2 | null;
  phase: GamePhase;
}

export interface MatchHistory {
  id: string;
  date: string;
  player1: string;
  player2: string;
  winner: string;
  duration: string;
}
