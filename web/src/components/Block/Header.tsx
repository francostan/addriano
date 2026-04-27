type Props = { num: string; title: string; jp?: string };

export function Header({ num, title, jp }: Props) {
  return (
    <header className="flex items-baseline gap-4 mb-4">
      <span className="font-display text-5xl leading-none tracking-tight">
        {num}<span className="text-base text-ink-2 ml-1">/04</span>
      </span>
      <div>
        <h2 className="font-display text-3xl m-0 tracking-tight">{title}</h2>
        {jp && <div className="font-jp text-xs text-ink-2 tracking-[0.18em] mt-1">{jp}</div>}
      </div>
    </header>
  );
}
