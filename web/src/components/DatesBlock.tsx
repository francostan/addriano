import { useMemo, useState } from 'react';
import { dates, type DateEntry } from '../data/dates';
import { Block } from './Block';

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function groupByMonth(items: DateEntry[]) {
  const map = new Map<string, DateEntry[]>();
  items.forEach(d => {
    const [y, m] = d.date.split('-');
    const key = `${MONTHS[+m - 1]} · ${y.slice(2)}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(d);
  });
  return Array.from(map, ([label, items]) => ({ label, items }));
}

function pillClass(kind: DateEntry['kind']) {
  if (kind === 'LIVE') return 'bg-lime border-ink';
  if (kind === 'B2B')  return 'bg-ink text-paper border-ink';
  return 'border-ink';
}

function Row({ d }: { d: DateEntry }) {
  const dd = d.date.split('-')[2];
  return (
    <div className="row grid-cols-[40px_1fr_auto_auto] border-b border-dashed border-ink">
      <span className="font-display text-[15px]">{dd}</span>
      <span>
        <b className="row-title">{d.venue}</b>
        <span className="row-meta ml-2 tracking-[0.14em] uppercase">{d.city}</span>
      </span>
      <span className="row-meta tabular-nums">{d.time}</span>
      <span className={`text-[10px] tracking-[0.14em] uppercase px-1.5 py-0.5 border ${pillClass(d.kind)}`}>{d.kind}</span>
    </div>
  );
}

export function DatesBlock() {
  const [showPast, setShowPast] = useState(false);
  const upcoming = useMemo(() => groupByMonth(dates.filter(d => !d.past)), []);
  const past = useMemo(() => dates.filter(d => d.past), []);

  return (
    <Block>
      <Block.Header num="04" title="DATES" jp="会いましょう" />

      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-2 mb-3">UPCOMING</div>

      {upcoming.map(g => (
        <div key={g.label} className="mt-8 first:mt-0">
          <h3 className="font-display text-3xl tracking-tight mb-2">{g.label}</h3>
          <div className="border-t-[1.5px] border-ink">
            {g.items.map(d => <Row key={d.id} d={d} />)}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setShowPast(v => !v)}
        className="w-full flex justify-between items-center text-[10px] uppercase tracking-[0.14em] text-ink-2 mt-8 hover:text-ink transition-colors"
      >
        <span>PAST</span>
        <span>{showPast ? '— HIDE' : `+ ${past.length} MORE`}</span>
      </button>

      {showPast && (
        <div className="border-t border-dashed border-ink mt-2">
          {past.map(d => <Row key={d.id} d={d} />)}
        </div>
      )}
    </Block>
  );
}
