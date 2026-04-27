import { tracks } from '../data/tracks';
import { Player } from './Player';
import { Block } from './Block';

const TAGS = ['DJ', 'PRODUCER', 'LIVE HW', 'EST. 2024'];

export function Hero() {
  const latest = tracks[0];
  return (
    <Block className="!p-0 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-0">
      <Block.Corner lime>FIG. 00</Block.Corner>

      <div className="p-7 md:p-9 flex flex-col justify-end gap-5">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-2">↳ HOME · 00 / INTRO</div>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.85] tracking-tight m-0">
          ADD<mark className="bg-lime text-ink px-[0.08em]">RIA</mark><br />NO.
        </h1>

        <div className="flex flex-wrap gap-2 items-center">
          {TAGS.map(t => (
            <span key={t} className="border border-ink px-2 py-0.5 text-[10px] tracking-[0.12em] uppercase bg-paper">{t}</span>
          ))}
          <span className="font-jp text-[11px] text-ink-2 tracking-[0.18em]">ハードグルーヴ・テクノ・ハウス</span>
        </div>

        <p className="max-w-xl text-xs leading-relaxed text-ink-2 m-0">
          Hardgroove · 90's techno · groove · house · hypnotic. Berlin / París underground. RD-9 + TD-3 hardware live.
        </p>

        <div className="flex gap-2 flex-wrap">
          <Player.Button item={latest} size="md" />
          <span className="inline-flex items-center gap-2 border-[1.5px] border-ink bg-lime px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase">
            ▶ Latest Track
          </span>
          <a href="https://soundcloud.com/addriano" target="_blank" rel="noreferrer" className="inline-flex items-center border-[1.5px] border-ink px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase">SC ↗</a>
          <a href="https://addriano.bandcamp.com" target="_blank" rel="noreferrer" className="inline-flex items-center border-[1.5px] border-ink px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase">BC ↗</a>
          <a href="https://instagram.com/addriano" target="_blank" rel="noreferrer" className="inline-flex items-center border-[1.5px] border-ink px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase">IG ↗</a>
        </div>
      </div>

      <div className="relative border-l-0 md:border-l-[1.5px] border-ink min-h-[480px]">
        <img src="/photos/hero.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </Block>
  );
}
