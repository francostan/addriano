import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { PlayerContext, type PlayerState } from './context';
import type { Playable } from '../../types';
import { Sticky } from './Sticky';
import { Button } from './Button';
import { Wave } from './Wave';
import { Time } from './Time';
import { Progress } from './Progress';

declare global {
  interface Window {
    SC?: {
      Widget: {
        (iframe: HTMLIFrameElement): SCWidget;
        Events: Record<string, string>;
      };
    };
  }
}

type SCWidget = {
  bind: (event: string, cb: (data?: unknown) => void) => void;
  unbind: (event: string) => void;
  load: (url: string, opts: Record<string, unknown>) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seekTo: (ms: number) => void;
  getDuration: (cb: (ms: number) => void) => void;
};

function Provider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Playable | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<SCWidget | null>(null);
  const initialSrcRef = useRef<string | null>(null);
  const isFirstLoadRef = useRef(true);

  if (!initialSrcRef.current && current) {
    initialSrcRef.current = `https://w.soundcloud.com/player/?url=${encodeURIComponent(current.embedUrl)}&auto_play=true&visual=false`;
  }

  // Bind widget events once iframe mounts
  useEffect(() => {
    if (!iframeRef.current || widgetRef.current) return;
    let cancelled = false;
    const tryInit = () => {
      if (cancelled) return;
      if (!window.SC || !iframeRef.current) {
        setTimeout(tryInit, 100);
        return;
      }
      const w = window.SC.Widget(iframeRef.current);
      widgetRef.current = w;
      const E = window.SC.Widget.Events;
      w.bind(E.READY, () => {
        w.getDuration((d: number) => setDuration(d));
      });
      w.bind(E.PLAY, () => setIsPlaying(true));
      w.bind(E.PAUSE, () => setIsPlaying(false));
      w.bind(E.FINISH, () => setIsPlaying(false));
      w.bind(E.PLAY_PROGRESS, (data) => {
        const e = data as { currentPosition: number };
        setPosition(e.currentPosition);
      });
    };
    tryInit();
    return () => { cancelled = true; };
  }, [current !== null]);

  // Load track on subsequent changes
  useEffect(() => {
    if (!current || !widgetRef.current) return;
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }
    setPosition(0);
    setDuration(0);
    widgetRef.current.load(current.embedUrl, {
      auto_play: true,
      visual: false,
      callback: () => {
        widgetRef.current?.getDuration((d: number) => setDuration(d));
      },
    });
  }, [current]);

  const play = useCallback((item: Playable) => {
    setCurrent(prev => {
      if (prev?.id === item.id) {
        widgetRef.current?.play();
      }
      return item;
    });
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    widgetRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (!current) return;
    widgetRef.current?.toggle();
    setIsPlaying(p => !p);
  }, [current]);

  const seek = useCallback((ms: number) => {
    widgetRef.current?.seekTo(ms);
    setPosition(ms);
  }, []);

  const value: PlayerState = { current, isPlaying, position, duration, play, pause, toggle, seek };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {initialSrcRef.current && (
        <iframe
          ref={iframeRef}
          title="player-embed"
          src={initialSrcRef.current}
          width="0"
          height="0"
          allow="autoplay"
          style={{ position: 'absolute', left: -9999, top: -9999 }}
        />
      )}
    </PlayerContext.Provider>
  );
}

export const Player = Object.assign(Provider, { Sticky, Button, Wave, Time, Progress });
