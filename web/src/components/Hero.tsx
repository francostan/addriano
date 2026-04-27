import { tracks } from '../data/tracks';
import { Block } from './Block';
import { usePlayer } from './Player/context';

const TAGS = ['DJ', 'PRODUCER', 'LIVE', 'EST. 2024'];

export function Hero() {
  const latest = tracks[0];
  const { current, isPlaying, play, pause } = usePlayer();
  const active = current?.id === latest.id && isPlaying;
  return (
    <Block className="!p-0 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-0">
      <div className="p-7 md:p-9 grid grid-rows-[auto_1fr_auto] gap-6 min-h-[560px]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-2">HOME · 00 / INTRO</div>

        <div className="flex items-center">
          <h1 className="font-display text-6xl md:text-[8rem] leading-[0.85] tracking-tight m-0">
            ADD<mark className="bg-lime text-ink px-[0.08em]">RIA</mark><br />NO.
          </h1>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2 items-center">
            {TAGS.map(t => (
              <span key={t} className="border border-ink px-2 py-0.5 text-[10px] tracking-[0.12em] uppercase bg-paper">{t}</span>
            ))}
            <span className="font-jp text-[11px] text-ink-2 tracking-[0.18em]">ハードグルーヴ・テクノ・ハウス</span>
          </div>

          <p className="max-w-xl text-xs leading-relaxed text-ink-2 m-0">
            Hardgroove · 90's techno · groove · house · hypnotic. RD-9 + TD-3 live.
          </p>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => (active ? pause() : play(latest))}
              className="inline-flex items-center gap-2 border-[1.5px] border-ink bg-lime px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase hover:bg-paper transition-colors"
              aria-label={active ? 'pause latest track' : 'play latest track'}
            >
              {active ? '❚❚ PAUSE' : '▶ LATEST TRACK'}
            </button>
            <a href="https://soundcloud.com/adriano-stanziola" target="_blank" rel="noreferrer" className="inline-flex items-center border-[1.5px] border-ink px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase">SOUNDCLOUD ↗</a>
            <a href="https://www.instagram.com/addriano______/" target="_blank" rel="noreferrer" className="inline-flex items-center border-[1.5px] border-ink px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase">INSTAGRAM ↗</a>
          </div>
        </div>
      </div>

      <div className="relative border-l-0 md:border-l-[1.5px] border-ink min-h-[560px]">
        <img src="/photos/hero.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-[center_90%]" />
      </div>
    </Block>
  );
}
