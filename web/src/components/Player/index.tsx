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

const IS_MOBILE = typeof window !== 'undefined'
  && typeof window.matchMedia === 'function'
  && window.matchMedia('(pointer: coarse)').matches;

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

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<SCWidget | null>(null);
  const initialSrcRef = useRef<string | null>(null);
  const isFirstLoadRef = useRef(true);

  const loaderRef = useRef<HTMLIFrameElement | null>(null);
  const durationsRef = useRef(durations);
  durationsRef.current = durations;

  if (!IS_MOBILE && !initialSrcRef.current && current) {
    initialSrcRef.current = `https://w.soundcloud.com/player/?url=${encodeURIComponent(current.embedUrl)}&auto_play=true&visual=false`;
  }

  useEffect(() => {
    saveCache(durations);
  }, [durations]);

  useEffect(() => {
    if (IS_MOBILE) return;
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

  useEffect(() => {
    if (IS_MOBILE) return;
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

  useEffect(() => {
    if (ALL_URLS.length === 0) return;
    const el = loaderRef.current;
    if (!el) return;
    let cancelled = false;
    const tryInit = () => {
      if (cancelled) return;
      if (!window.SC || !loaderRef.current) {
        setTimeout(tryInit, 150);
        return;
      }
      const w = window.SC.Widget(loaderRef.current);
      const E = window.SC.Widget.Events;
      let i = 0;
      const fetchNext = () => {
        if (cancelled) return;
        while (i < ALL_URLS.length && durationsRef.current[ALL_URLS[i]]) i++;
        if (i >= ALL_URLS.length) return;
        const url = ALL_URLS[i++];
        w.load(url, {
          auto_play: false,
          visual: false,
          callback: () => {
            w.getDuration((ms: number) => {
              if (ms > 0) {
                setDurations(prev => prev[url] ? prev : { ...prev, [url]: ms });
              }
              fetchNext();
            });
          },
        });
      };
      w.bind(E.READY, () => {
        w.getDuration((ms: number) => {
          const first = ALL_URLS[0];
          if (ms > 0 && first && !durationsRef.current[first]) {
            setDurations(prev => prev[first] ? prev : { ...prev, [first]: ms });
          }
          i = 1;
          fetchNext();
        });
      });
    };
    tryInit();
    return () => { cancelled = true; };
  }, []);

  const play = useCallback((item: Playable) => {
    if (IS_MOBILE) {
      setCurrent(item);
      setIsPlaying(true);
      return;
    }
    setCurrent(prev => {
      if (prev?.id === item.id) {
        widgetRef.current?.play();
      }
      return item;
    });
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    if (IS_MOBILE) {
      setIsPlaying(false);
      return;
    }
    widgetRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (IS_MOBILE) return;
    if (!current) return;
    widgetRef.current?.toggle();
    setIsPlaying(p => !p);
  }, [current]);

  const seek = useCallback((ms: number) => {
    if (IS_MOBILE) return;
    widgetRef.current?.seekTo(ms);
    setPosition(ms);
  }, []);

  const value: PlayerState = { current, isPlaying, position, duration, durations, isMobile: IS_MOBILE, play, pause, toggle, seek };

  const loaderSrc = ALL_URLS[0]
    ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(ALL_URLS[0])}&auto_play=false&visual=false`
    : null;

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {!IS_MOBILE && initialSrcRef.current && (
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
      {loaderSrc && (
        <iframe
          ref={loaderRef}
          title="durations-loader"
          src={loaderSrc}
          width="0"
          height="0"
          aria-hidden
          tabIndex={-1}
          style={{ position: 'absolute', left: -9999, top: -9999, opacity: 0, pointerEvents: 'none' }}
        />
      )}
    </PlayerContext.Provider>
  );
}

export const Player = Object.assign(Provider, { Sticky, Button, Wave, Time, Progress });
