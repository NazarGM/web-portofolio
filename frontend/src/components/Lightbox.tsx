import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  src?: string;
  alt: string;
  className?: string;
};

export default function Lightbox({ src, alt, className }: Props) {
  if (!src) return null;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button type="button" className={`lightbox-trigger ${className ?? ''}`} onClick={() => setOpen(true)}>
        <img src={src} alt={alt} />
      </button>
      {open &&
        createPortal(
          <div className="lightbox-overlay" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
            <img src={src} alt={alt} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body
        )}
    </>
  );
}
