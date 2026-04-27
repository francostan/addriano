import { lives } from '../data/lives';
import { Block } from './Block';
import { Player } from './Player';
import { usePlayer } from './Player/context';

export function LivesBlock() {
  const { current } = usePlayer();
  return (
    <Block>
      <Block.Corner>FIG. 04</Block.Corner>
      <Block.Header num="03" title="LIVES" jp="ライブ · RD-9 × TD-3 · HARDWARE" />
      <Block.Body>
        <div className="border-t-[1.5px] border-ink">
          {lives.map(l => {
            const active = current?.id === l.id;
            return (
              <div key={l.id} className={`grid grid-cols-[1fr_auto_28px] gap-3 items-center py-2.5 px-1 border-b border-ink text-xs ${active ? 'bg-lime' : ''}`}>
                <span>
                  <b className="font-display text-sm block">{l.title}</b>
                  <span className="text-ink-2 text-[11px]">{l.duration} · {l.context} · {l.setup}</span>
                </span>
                <span className="text-[11px] tracking-[0.14em] uppercase border border-ink px-1.5 py-0.5">{l.id.toUpperCase()}</span>
                <Player.Button item={l} />
              </div>
            );
          })}
        </div>
        <Block.Photo src="/photos/lives.jpg" label="Live · Rig" fit="natural" />
      </Block.Body>
    </Block>
  );
}
