export type Track = {
  id: string;
  title: string;
  year: number;
  label?: string;
  bpm: number;
  musicalKey: string;
  duration: string;
  embedUrl: string;
  tag?: 'NEW' | 'UNREL.' | 'SPLIT EP' | 'BC' | 'TAPE';
  downloadable?: boolean;
};

export type DJSet = {
  id: string;
  date: string;
  venue: string;
  city: string;
  genre: string;
  duration: string;
  embedUrl: string;
};

export type Live = {
  id: string;
  title: string;
  setup: string;
  context: string;
  duration: string;
  embedUrl: string;
};

export type Pick = {
  id: string;
  artist: string;
  track: string;
  label?: string;
  year?: number;
  url: string;
  source: 'SC' | 'BC' | 'YT';
};

export type Playable = Track | DJSet | Live;
