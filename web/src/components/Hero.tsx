import { latestPlayable } from '../data/tracks';
import { Block } from './Block';
import { usePlayer } from './Player/context';

export function Hero() {
  const { track: latest, kind } = latestPlayable();
  const { current, isPlaying, play, pause } = usePlayer();
  const active = current?.id === latest.id && isPlaying;
  const label = kind === 'singles' ? 'LATEST TRACK' : `LATEST ${kind}`;
  return (
    <Block className="!p-0 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-0 shadow-[6px_6px_0_0_#141414]">
      <div className="relative min-h-[560px] border-b-[1.5px] md:border-b-0 border-ink">
        <img src="/photos/sets.webp" alt="" loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover object-[68%_80%]" />
      </div>

      <div className="p-6 md:p-12 grid grid-rows-[auto_1fr_auto] gap-8 md:gap-10 md:min-h-[560px] border-l-0 md:border-l-[1.5px] border-ink">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-2 md:text-center">HOME · 00 / INTRO</div>

        <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
          <img
            src="/brand/logo-hero-stacked.png"
            alt="ADDRIANO"
            decoding="async"
            fetchPriority="high"
            className="block h-auto w-full max-w-[480px] select-none"
          />
          <p className="max-w-xl text-[13px] leading-relaxed text-ink-2 m-0 text-center">
            sonido hipnótico, minimalista e introspectivo. sets buscando repetición, texturas y atmósferas sutiles — capas profundas combinadas con ritmos naturales, generando un feedback de emoción y sentimiento en la pista.
          </p>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-2">
          <button
            onClick={() => (active ? pause() : play(latest))}
            className="col-span-2 md:col-auto inline-flex justify-center items-center gap-2 border-[1.5px] border-ink bg-lime px-3 py-2 md:py-1.5 text-[11px] tracking-[0.14em] uppercase hover:bg-paper transition-colors"
            aria-label={active ? `pause ${label.toLowerCase()}` : `play ${label.toLowerCase()}`}
          >
            {active ? '❚❚ PAUSE' : `▶ ${label}`}
          </button>
          <a href="https://soundcloud.com/adriano-stanziola" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center border-[1.5px] border-ink px-3 py-2 md:py-1.5 text-[11px] tracking-[0.14em] uppercase">SOUNDCLOUD ↗</a>
          <a href="https://www.instagram.com/addriano______/" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center border-[1.5px] border-ink px-3 py-2 md:py-1.5 text-[11px] tracking-[0.14em] uppercase">INSTAGRAM ↗</a>
        </div>
      </div>
    </Block>
  );
}
