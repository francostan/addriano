type Props = { children: string; lime?: boolean };

export function Corner({ children, lime = false }: Props) {
  const bg = lime ? 'bg-lime text-ink' : 'bg-ink text-paper';
  return (
    <span className={`absolute -top-px -right-px ${bg} font-mono text-[9px] tracking-[0.14em] px-2 py-[3px]`}>
      {children}
    </span>
  );
}
