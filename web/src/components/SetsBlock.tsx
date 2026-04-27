import { sets } from '../data/sets';
import { Block } from './Block';
import { Player } from './Player';
import { usePlayer } from './Player/context';

export function SetsBlock() {
  const { current } = usePlayer();
  return (
    <Block>
      <Block.Corner>FIG. 03</Block.Corner>
      <Block.Header num="02" title="SETS" jp="DJセット · CHRONOLOGICAL" />
      <Block.Body>
        <Block.Photo src="/photos/sets.jpg" label="Sets · Landscape" />
        <div className="border-t-[1.5px] border-ink">
          {sets.map(s => {
            const active = current?.id === s.id;
            const [, mm, dd] = s.date.split('-');
            return (
              <div key={s.id} className={`grid grid-cols-[64px_1fr_auto_28px] gap-3 items-center py-2.5 px-1 border-b border-ink text-xs ${active ? 'bg-lime' : ''}`}>
                <span className="font-display text-[13px]">{dd}·{mm}</span>
                <span>
                  <b className="font-display text-sm block">{s.venue} / {s.city}</b>
                  <span className="text-ink-2 text-[11px]">{s.genre} · {s.duration}</span>
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
