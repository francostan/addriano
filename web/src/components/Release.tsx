import { featured } from '../data/tracks';
import { Block } from './Block';
import { usePlayer } from './Player/context';

// Centered 2/3-width banner — deliberately narrower than the full-width blocks
// to mark it as the latest-release callout. Engraving sits beside the data.
export function Release() {
  const track = featured();
  const { current, isPlaying, play, pause } = usePlayer();
  const active = current?.id === track.id && isPlaying;

  return (
    <div id="new-release" className="scroll-mt-24 md:w-2/3 md:justify-self-center">
      <Block className="!p-0 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-0 shadow-[6px_6px_0_0_#141414]">
        <div className="grid place-items-center p-3 md:p-3 bg-paper-2 border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-ink">
          <img
            src="/releases/beheaded-ritual-art.png"
            alt="beheaded ritual"
            loading="lazy"
            decoding="async"
            className="block w-full max-w-[300px] h-auto border-[1.5px] border-ink"
          />
        </div>

        <div className="px-10 md:px-5 py-5 md:py-4 grid grid-rows-[auto_1fr_auto] gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-2">
              NEW RELEASE · <span className="font-jp tracking-normal">最新</span>
            </div>
            <div className="hidden md:block text-right text-[10px] leading-relaxed tracking-[0.14em] text-ink-2 font-jp">
              <div>座標</div>
              <div>北緯 三一・六二三九度</div>
              <div>東経 一七四・七七〇五度</div>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <h2 className="font-display text-4xl tracking-tight m-0">beheaded ritual</h2>
            <div className="row-meta tracking-[0.14em] uppercase">2026 · 04:40 </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => (active ? pause() : play(track))}
              className="inline-flex justify-center items-center gap-2 border-[1.5px] border-ink bg-lime px-4 py-3 text-[12px] tracking-[0.14em] uppercase hover:bg-paper transition-colors"
              aria-label={active ? 'pause beheaded ritual' : 'play beheaded ritual'}
            >
              {active ? '❚❚ PLAY' : '▶ PLAY'}
            </button>
            <a
              href={track.embedUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center border-[1.5px] border-ink px-4 py-3 text-[12px] tracking-[0.14em] uppercase hover:bg-lime transition-colors"
            >
              SOUNDCLOUD ↗
            </a>
          </div>
        </div>
      </Block>
    </div>
  );
}
