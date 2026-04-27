const BARS = Array.from({ length: 70 }, (_, i) =>
  Math.max(4, Math.abs(Math.sin(i * 0.6) + Math.cos(i * 0.21)) * 10 + (i % 5 === 0 ? 6 : 0))
);

export function Wave() {
  return (
    <div className="h-6 flex gap-[2px] items-end" aria-hidden>
      {BARS.map((h, i) => (
        <i key={i} style={{ height: `${h}px` }} className="block w-[2px] bg-lime" />
      ))}
    </div>
  );
}
