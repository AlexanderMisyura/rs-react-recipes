import { Portal } from '@components';
import { useEffect, useRef, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, handleClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }

    const dialog = dialogRef.current;

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        dialog?.close();
      }
    };

    if (dialog) {
      if (isOpen) {
        dialog.showModal();
        dialog.addEventListener('click', handleOutsideClick);
      } else {
        dialog.close();
      }
    }

    return () => {
      setShouldRender(false);
      dialog?.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, shouldRender]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <dialog
        onClose={handleClose}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        ref={dialogRef}
        aria-modal="true"
      >
        {children}
      </dialog>
    </Portal>
  );
};
