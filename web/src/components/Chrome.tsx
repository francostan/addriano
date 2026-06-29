import { useEffect, useState } from 'react';
import { Player } from './Player';

export function Chrome() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 bg-paper border-b-[1.5px] border-ink py-4 transition-[opacity,transform] duration-[360ms] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-7 flex items-center justify-between gap-6">
        <div className="flex flex-col items-start gap-1 shrink-0">
          <img
            src="/brand/logo-wordmark-horizontal.png"
            alt="addriano"
            decoding="async"
            className="h-6 md:h-7 w-auto block"
          />
          <span className="font-jp text-[9px] tracking-[0.18em] text-ink-2 font-bold leading-none">
            メモ書き
          </span>
        </div>
        <Player.Inline />
        <img
          src="/brand/logo-monogram-ar.png"
          alt="addriano"
          decoding="async"
          className="h-4 md:h-5 w-auto block shrink-0"
        />
      </div>
    </header>
  );
}
