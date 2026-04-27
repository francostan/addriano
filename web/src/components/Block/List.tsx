import type { ReactNode } from 'react';

export function List({ children }: { children: ReactNode }) {
  return <div className="border-t-[1.5px] border-ink mt-2">{children}</div>;
}
