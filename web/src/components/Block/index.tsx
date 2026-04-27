import type { ReactNode } from 'react';
import { Header } from './Header';
import { Body } from './Body';
import { List } from './List';
import { Photo } from './Photo';
import { Corner } from './Corner';

function Wrapper({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative border-[1.5px] border-ink bg-paper p-5 ${className}`}>
      {children}
    </section>
  );
}

export const Block = Object.assign(Wrapper, { Header, Body, List, Photo, Corner });
