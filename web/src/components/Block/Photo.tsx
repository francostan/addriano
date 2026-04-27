type Props = { src: string; label?: string; aspect?: string; className?: string; objectPosition?: string; fit?: 'cover' | 'contain' | 'natural' };

export function Photo({ src, label, aspect = 'aspect-[4/3]', className = '', objectPosition, fit = 'cover' }: Props) {
  const natural = fit === 'natural';
  const wrapAspect = natural ? '' : aspect;
  const imgClass = natural
    ? 'w-full h-auto block'
    : `w-full h-full block ${fit === 'contain' ? 'object-contain' : 'object-cover'}`;
  const wrapBg = fit === 'contain' ? 'bg-paper-2' : '';
  return (
    <div className={`relative border-[1.5px] border-ink overflow-hidden ${wrapAspect} ${wrapBg} ${className}`}>
      <img src={src} alt="" className={imgClass} style={objectPosition ? { objectPosition } : undefined} />
      {label && (
        <span className="absolute left-2 bottom-2 bg-paper border border-ink text-[9px] px-1.5 py-0.5 uppercase tracking-[0.12em]">
          {label}
        </span>
      )}
    </div>
  );
}
