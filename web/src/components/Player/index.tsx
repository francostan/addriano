import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { PlayerContext, type PlayerState } from './context';
import type { Playable } from '../../types';
import { tracks } from '../../data/tracks';
import { sets } from '../../data/sets';
import { lives } from '../../data/lives';
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

const ALL_URLS = Array.from(
  new Set([...tracks, ...sets, ...lives].map(p => p.embedUrl).filter(Boolean))
);

const CACHE_KEY = 'addriano:durations:v1';

function loadCache(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function saveCache(durations: Record<string, number>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(durations));
  } catch {
    // quota or disabled
  }
}

function Provider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Playable | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [durations, setDurations] = useState<Record<string, number>>(() => loadCache());

  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const widgetsRef = useRef<Map<string, SCWidget>>(new Map());
  const activeUrlRef = useRef<string | null>(null);

  useEffect(() => {
    saveCache(durations);
  }, [durations]);

  useEffect(() => {
    let cancelled = false;
    const tryInit = () => {
      if (cancelled) return;
      if (!window.SC) {
        setTimeout(tryInit, 100);
        return;
      }
      const E = window.SC.Widget.Events;
      ALL_URLS.forEach((url, i) => {
        const el = iframeRefs.current[i];
        if (!el || widgetsRef.current.has(url)) return;
        const w = window.SC.Widget(el);
        widgetsRef.current.set(url, w);
        w.bind(E.READY, () => {
          w.getDuration((ms: number) => {
            if (ms > 0) setDurations(prev => prev[url] ? prev : { ...prev, [url]: ms });
          });
        });
        w.bind(E.PLAY, () => {
          if (activeUrlRef.current === url) setIsPlaying(true);
        });
        w.bind(E.PAUSE, () => {
          if (activeUrlRef.current === url) setIsPlaying(false);
        });
        w.bind(E.FINISH, () => {
          if (activeUrlRef.current === url) setIsPlaying(false);
        });
        w.bind(E.PLAY_PROGRESS, (data) => {
          if (activeUrlRef.current !== url) return;
          const e = data as { currentPosition: number };
          setPosition(e.currentPosition);
        });
      });
    };
    tryInit();
    return () => { cancelled = true; };
  }, []);

  const play = useCallback((item: Playable) => {
    const url = item.embedUrl;
    const w = widgetsRef.current.get(url);
    if (!w) return;

    const prevUrl = activeUrlRef.current;
    if (prevUrl && prevUrl !== url) {
      widgetsRef.current.get(prevUrl)?.pause();
    }

    if (prevUrl !== url) {
      activeUrlRef.current = url;
      setPosition(0);
      w.getDuration((d: number) => setDuration(d));
    }

    w.play();
    setCurrent(item);
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    const url = activeUrlRef.current;
    if (!url) return;
    widgetsRef.current.get(url)?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (!current) return;
    const url = activeUrlRef.current;
    if (!url) return;
    widgetsRef.current.get(url)?.toggle();
    setIsPlaying(p => !p);
  }, [current]);

  const seek = useCallback((ms: number) => {
    const url = activeUrlRef.current;
    if (!url) return;
    widgetsRef.current.get(url)?.seekTo(ms);
    setPosition(ms);
  }, []);

  const value: PlayerState = { current, isPlaying, position, duration, durations, play, pause, toggle, seek };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {ALL_URLS.map((url, i) => (
        <iframe
          key={url}
          ref={el => { iframeRefs.current[i] = el; }}
          title={`player-embed-${i}`}
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=false&visual=false`}
          width="320"
          height="120"
          allow="autoplay; encrypted-media"
          aria-hidden
          style={{ position: 'absolute', left: -9999, top: -9999, opacity: 0, pointerEvents: 'none' }}
        />
      ))}
    </PlayerContext.Provider>
  );
}

export const Player = Object.assign(Provider, { Sticky, Button, Wave, Time, Progress });
