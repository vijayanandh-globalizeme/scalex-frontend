'use client';

import { useEffect, useState } from 'react';

export function useGridColumns() {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    const lg = window.matchMedia('(min-width: 1024px)');
    const md = window.matchMedia('(min-width: 768px)');
    const update = () => setCols(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    lg.addEventListener('change', update);
    md.addEventListener('change', update);
    return () => {
      lg.removeEventListener('change', update);
      md.removeEventListener('change', update);
    };
  }, []);

  return cols;
}
