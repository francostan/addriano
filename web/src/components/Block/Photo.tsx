type Props = { src: string; label?: string; aspect?: string; className?: string };

export function Photo({ src, label, aspect = 'aspect-[4/3]', className = '' }: Props) {
  return (
    <div className={`relative border-[1.5px] border-ink overflow-hidden ${aspect} ${className}`}>
      <img src={src} alt="" className="w-full h-full object-cover block" />
      {label && (
        <span className="absolute left-2 bottom-2 bg-paper border border-ink text-[9px] px-1.5 py-0.5 uppercase tracking-[0.12em]">
          {label}
        </span>
      )}
    </div>
  );
}
