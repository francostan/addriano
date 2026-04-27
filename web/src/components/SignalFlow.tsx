const NODES = ['RD-9', 'TD-3', 'MIXER', 'FX CHAIN', 'REC OUT'];
const LIME_INDEX = 3;

export function SignalFlow() {
  return (
    <section className="border-[1.5px] border-ink bg-paper-2 px-5 py-4 relative">
      <h3 className="font-display text-sm tracking-[0.06em] uppercase flex justify-between m-0 mb-3">
        FIG. 01 · Signal Flow · 信号フロー
        <span className="text-ink-2 font-normal text-[11px]">REV.A</span>
      </h3>
      <div className="flex items-center gap-2 flex-wrap text-[11px] tracking-[0.1em] uppercase">
        {NODES.map((n, i) => (
          <span key={n} className="contents">
            <span className={`border-[1.5px] border-ink ${i === LIME_INDEX ? 'bg-lime' : 'bg-paper'} px-3 py-2 font-display text-[13px]`}>{n}</span>
            {i < NODES.length - 1 && <span className="font-display">→</span>}
          </span>
        ))}
      </div>
    </section>
  );
}
