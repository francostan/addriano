import { createContext, useContext } from 'react';
import type { Playable } from '../../types';

export type PlayerState = {
  current: Playable | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  durations: Record<string, number>;
  isMobile: boolean;
  play: (item: Playable) => void;
  pause: () => void;
  toggle: () => void;
  seek: (ms: number) => void;
};

export const PlayerContext = createContext<PlayerState | null>(null);

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside <Player>');
  return ctx;
}
