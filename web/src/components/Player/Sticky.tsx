import { usePlayer } from './context';

export function Sticky() {
  const { current, isMobile } = usePlayer();
  if (!isMobile || !current) return null;

  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(current.embedUrl)}&auto_play=true&visual=false&color=ccff33&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&show_artwork=false&show_playcount=false&buying=false&sharing=false&download=false&liking=false`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-ink border-t-[1.5px] border-ink">
      <iframe
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
