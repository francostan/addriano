import { useEffect, useRef } from 'react';
import { usePlayer } from './context';

export function Sticky() {
  const { current, isMobile, setPlayingUrl } = usePlayer();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isMobile || !current) return;
    let cancelled = false;
    const tryInit = () => {
      if (cancelled) return;
      if (!window.SC || !iframeRef.current) {
        setTimeout(tryInit, 100);
        return;
      }
      const w = window.SC.Widget(iframeRef.current);
      const E = window.SC.Widget.Events;
      const sync = () => {
        w.getCurrentSound((s) => {
          const url = (s as { permalink_url?: string } | null)?.permalink_url ?? null;
          setPlayingUrl(url);
        });
      };
      w.bind(E.READY, sync);
      w.bind(E.PLAY, sync);
      w.bind(E.PLAY_PROGRESS, (data) => {
        const e = data as { currentPosition: number };
        if (e.currentPosition < 1500) sync();
      });
    };
    tryInit();
    return () => { cancelled = true; };
  }, [isMobile, current, setPlayingUrl]);

  if (!isMobile || !current) return null;

  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(current.embedUrl)}&auto_play=true&visual=false&color=ccff33&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&show_artwork=false&show_playcount=false&buying=false&sharing=false&download=false&liking=false`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-ink border-t-[1.5px] border-ink">
      <iframe
        ref={iframeRef}
        key={current.embedUrl}
        src={src}
        title={`now-playing-${current.id}`}
        width="100%"
        height="120"
        allow="autoplay; encrypted-media"
        scrolling="no"
        frameBorder="no"
        className="block w-full"
      />
    </div>
  );
}
