import { sets } from '../data/sets';
import { Block } from './Block';
import { Player } from './Player';
import { usePlayer } from './Player/context';
import { formatMs } from './Player/format';

export function SetsBlock() {
  const { current, durations } = usePlayer();
  return (
    <Block>
      <Block.Header right num="02" title="SETS" jp="順番は気分" />
      <Block.Body>
        <Block.Photo src="/photos/hero.webp" aspect="aspect-[1139/1400]" objectPosition="center bottom" />
        <div className="border-t border-ink mt-1">
          {sets.map(s => {
            const active = current?.id === s.id;
            const [, mm, dd] = s.date.split('-');
            return (
              <div key={s.id} className={`row grid-cols-[64px_1fr_auto_28px] ${active ? 'bg-lime' : ''}`}>
                <span className="font-display text-[13px]">{dd}·{mm}</span>
                <span>
                  <b className="row-title block">{s.title}</b>
                  <span className="row-meta tabular-nums">{durations[s.embedUrl] ? formatMs(durations[s.embedUrl]) : s.duration}</span>
                </span>
                <span className="text-[11px] tracking-[0.14em] uppercase border border-ink px-1.5 py-0.5">{s.id}</span>
                <Player.Button item={s} />
              </div>
            );
          })}
        </div>
      </Block.Body>
    </Block>
  );
}
