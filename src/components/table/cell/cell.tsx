import { useLayoutEffect, useRef } from 'react';

export const Cell: React.FC<{ value: string | number | undefined }> = ({ value }) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const prevRef = useRef<string | number | undefined>(value);
  const timerIdRef = useRef<ReturnType<typeof setTimeout>>(null);

  useLayoutEffect(() => {
    const prev = prevRef.current;
    const next = value;
    const cell = cellRef.current;

    if (prev !== next) {
      cell?.classList.add('highlight');

      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }

      timerIdRef.current = setTimeout(() => {
        cell?.classList.remove('highlight');
        timerIdRef.current = null;
      }, 2000);
    }

    prevRef.current = next;

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        cell?.classList.remove('highlight');
        timerIdRef.current = null;
      }
    };
  }, [value]);

  return (
    <td ref={cellRef} className="cell">
      {value ?? 'N/A'}
    </td>
  );
};
