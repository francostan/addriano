import { picks } from '../data/picks';
import { Block } from './Block';

export function BonusGrid() {
  return (
    <Block>
      <Block.Header num="04" title="BONUS TRACK" jp="誰かのポケットに" />
      <div className="border-t-[1.5px] border-ink">
        {picks.map((p, i) => (
          <div key={p.id} className="grid grid-cols-[24px_1fr_auto_24px] gap-3 items-center py-2 border-b border-dashed border-ink text-[11px]">
            <span className="font-display text-sm">{i + 1}</span>
            <span>
              <b className="font-display text-xs block">{p.artist} — {p.track}</b>
              <span className="text-ink-2 text-[10px]">{p.label} · {p.year}</span>
            </span>
            <span className="text-[10px] tracking-[0.14em] uppercase border border-ink px-1.5 py-0.5">{p.source}</span>
            <a href={p.url} target="_blank" rel="noreferrer" className="text-[14px]">↗</a>
          </div>
        ))}
      </div>
    </Block>
  );
}
