import type { ReactNode } from 'react';

export function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-start ${className}`}>{children}</div>;
}
