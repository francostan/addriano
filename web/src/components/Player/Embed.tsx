import { usePlayer } from './context';

export function Embed() {
  const { current } = usePlayer();
  if (!current?.embedUrl) return null;
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(current.embedUrl)}&auto_play=true&visual=false`;
  return (
    <iframe
      key={current.id}
      title="player-embed"
      src={src}
      width="0"
      height="0"
      allow="autoplay"
      style={{ position: 'absolute', left: -9999, top: -9999 }}
    />
  );
}
