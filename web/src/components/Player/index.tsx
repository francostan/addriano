import { useState, useCallback, type ReactNode } from 'react';
import { PlayerContext, type PlayerState } from './context';
import type { Playable } from '../../types';
import { Sticky } from './Sticky';
import { Button } from './Button';
import { Wave } from './Wave';
import { Time } from './Time';
import { Embed } from './Embed';

function Provider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Playable | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback((item: Playable) => {
    setCurrent(item);
    setIsPlaying(true);
  }, []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const toggle = useCallback(() => {
    setIsPlaying(p => (current ? !p : p));
  }, [current]);

  const value: PlayerState = { current, isPlaying, play, pause, toggle };
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const Player = Object.assign(Provider, { Sticky, Button, Wave, Time, Embed });
