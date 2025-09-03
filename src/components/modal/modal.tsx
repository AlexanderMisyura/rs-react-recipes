import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, handleClose }) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.getElementById('root');
    const backdrop = backdropRef.current;
    if (!root || !isOpen) {
      return;
    }

    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    root.inert = true;
    backdrop?.addEventListener('click', handleClose);
    document.addEventListener('keydown', handleEscPress);

    return () => {
      root.inert = false;
      backdrop?.removeEventListener('click', handleClose);
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div id="modal-root">
      <div
        ref={backdropRef}
        data-testid="backdrop"
        className="fixed inset-0 z-40 h-dvh w-dvw bg-[#00000080] backdrop-blur-xs"
      />
      <div
        className="fixed inset-1/2 z-50 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        aria-modal
        role="dialog"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
