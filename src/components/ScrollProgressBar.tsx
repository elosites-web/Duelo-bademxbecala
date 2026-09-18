import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollable =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const ratio = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, ratio)));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('orientationchange', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('orientationchange', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] sm:h-1 overflow-hidden pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-red-500 shadow-[0_0_10px_rgba(16,185,129,0.65)] transition-[width] duration-150 ease-out will-change-[width]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
