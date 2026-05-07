export type DateEntry = {
  id: string;
  date: string;
  venue: string;
  city: string;
  time: string;
  kind: 'LIVE' | 'DJ SET' | 'B2B';
  past?: boolean;
};

export const dates: DateEntry[] = [
  { id: 'd1', date: '2026-05-13', venue: 'PIBA', city: 'MZA', time: '23:00', kind: 'LIVE' },
  { id: 'd2', date: '2026-05-23', venue: 'EL ROBLE', city: 'MZA', time: '00:30', kind: 'DJ SET' },
  { id: 'd3', date: '2026-06-07', venue: '01 REC', city: 'BSAS', time: '02:00', kind: 'LIVE' },
  { id: 'd4', date: '2026-06-21', venue: 'HARDDD GRUUUU', city: 'CBA', time: '01:00', kind: 'B2B' },
  { id: 'd5', date: '2026-08-15', venue: 'SHUVIA', city: 'SCL', time: '23:30', kind: 'DJ SET' },
  { id: 'p1', date: '2026-03-08', venue: 'KAOS', city: 'MZA', time: '01:00', kind: 'LIVE', past: true },
  { id: 'p2', date: '2026-02-21', venue: 'JET LAG', city: 'BSAS', time: '02:30', kind: 'DJ SET', past: true },
  { id: 'p3', date: '2026-01-12', venue: 'BAUM', city: 'BSAS', time: '00:00', kind: 'B2B', past: true },
];
