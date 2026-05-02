export function Chrome() {
  return (
    <header className="sticky top-0 z-30 bg-paper border-b-[1.5px] border-ink py-3">
      <div className="max-w-[1400px] mx-auto px-7 flex items-center justify-between gap-4">
        <div className="font-display text-xl tracking-tight leading-none">
          ADDRIANO
          <span className="block font-jp text-[11px] tracking-[0.18em] text-ink-2 font-bold mt-1">
            メモ書き
          </span>
        </div>
        <img
          src="/logo_web.webp"
          alt="addriano"
          decoding="async"
          className="h-12 md:h-14 w-auto block mix-blend-darken"
        />
      </div>
    </header>
  );
}
