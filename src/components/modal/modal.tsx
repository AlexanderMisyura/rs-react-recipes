import { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const Modal = memo<ModalProps>(function Modal({ children, isOpen, handleClose }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.getElementById('root');
    const modal = modalRef.current;
    const backdrop = backdropRef.current;

    if (!root) {
      return;
    }

    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      root.inert = true;
      modal?.classList.add('is-active');
      document.documentElement.classList.add('is-clipped');
      backdrop?.addEventListener('click', handleClose);
      document.addEventListener('keydown', handleEscPress);
    } else {
      root.inert = false;
      modal?.classList.remove('is-active');
      document.documentElement.classList.remove('is-clipped');
    }

    return () => {
      backdrop?.removeEventListener('click', handleClose);
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div ref={modalRef} className="modal">
      <div ref={backdropRef} className="modal-background bg-[#7a858f73]! backdrop-blur-xs"></div>
      <div className="modal-content w-min!">{children}</div>
      <button
        onClick={handleClose}
        type="button"
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>,
    document.body
  );
});
