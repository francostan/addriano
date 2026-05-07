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
  { id: 'd1', date: '2026-05-13', venue: 'PIBA', city: 'MZA', time: '23:00', kind: 'DJ SET' },
  { id: 'd2', date: '2026-05-23', venue: 'EL ROBLE', city: 'MZA', time: '00:30', kind: 'DJ SET' },
];
