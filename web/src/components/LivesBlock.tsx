import { lives } from '../data/lives';
import { Block } from './Block';
import { Player } from './Player';
import { usePlayer } from './Player/context';
import { formatMs } from './Player/format';

export function LivesBlock() {
  const { current, durations } = usePlayer();
  return (
    <Block>
      <Block.Header num="03" title="LIVES" jp="間違いも音楽" />
      <Block.Body>
        <div className="border-t border-ink mt-1">
          {lives.map(l => {
            const active = current?.id === l.id;
            return (
              <div key={l.id} className={`row grid-cols-[1fr_auto_28px] ${active ? 'bg-lime' : ''}`}>
                <span>
                  <b className="row-title block">{l.title}</b>
                  <span className="row-meta tabular-nums">{durations[l.embedUrl] ? formatMs(durations[l.embedUrl]) : l.duration}</span>
                </span>
                <span className="text-[11px] tracking-[0.14em] uppercase border border-ink px-1.5 py-0.5">{l.id.toUpperCase()}</span>
                <Player.Button item={l} />
              </div>
            );
          })}
        </div>
        <Block.Photo src="/photos/lives.webp" fit="natural" />
      </Block.Body>
    </Block>
  );
}
