import type { Release, Track } from '../types';

export const releases: Release[] = [
  {
    id: 'r-singles',
    kind: 'singles',
    title: 'SINGLES',
    side: 'A',
    tracks: [
      { id: 'beheaded-ritual', title: 'beheaded ritual', year: 2026, duration: '04:40', embedUrl: 'https://soundcloud.com/adriano-stanziola/beheaded-ritual', tag: 'NEW', downloadable: true },
      { id: 't1', title: 'dermatologia', year: 2026, label: 'self-released', duration: '05:18', embedUrl: 'https://soundcloud.com/adriano-stanziola/dermatologia', downloadable: true },
      { id: 't2', title: 'visceral', year: 2025, duration: '06:42', embedUrl: 'https://soundcloud.com/adriano-stanziola/visceral', downloadable: true },
    ],
  },
  {
    id: 'r-repeticion-circular',
    kind: 'EP',
    title: 'repeticion circular',
    year: 2026,
    side: 'B',
    embedUrl: 'https://soundcloud.com/adriano-stanziola/sets/repeticion-circular',
    tracks: [
      { id: 'b1', title: 'molecular erosion', year: 2026, duration: '', embedUrl: 'https://soundcloud.com/adriano-stanziola/molecular-erosion-1-2' },
      { id: 'b2', title: 'presicion', year: 2026, duration: '', embedUrl: 'https://soundcloud.com/adriano-stanziola/presicion-1-3' },
      { id: 'b3', title: 'cincinaty^^^^(ft. ilovecookies)', year: 2026, duration: '', embedUrl: 'https://soundcloud.com/adriano-stanziola/cincinaty-1-1' },
    ],
  },
];

export const tracks: Track[] = releases.flatMap(r => r.tracks);

/** Explicitly-marked latest release the NEW RELEASE band consumes — not "last in array". */
export const FEATURED_ID = 'beheaded-ritual';

export function featured(): Track {
  const t = tracks.find(t => t.id === FEATURED_ID);
  if (!t) throw new Error(`featured track "${FEATURED_ID}" not found`);
  return t;
}

export function releaseAsTrack(r: Release): Track {
  return {
    id: r.id,
    title: r.title,
    year: r.year ?? new Date().getFullYear(),
    duration: '',
    embedUrl: r.embedUrl!,
  };
}
