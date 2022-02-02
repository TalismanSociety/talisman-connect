import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useOnClickOutside from '../useOnClickOutside/useOnClickOutside';
import styles from './Modal.module.css';

export interface ModalProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  handleClose: () => unknown;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string;
}

// Also, set a default value for wrapperId prop if none provided
function ReactPortal({
  children,
  wrapperId = 'react-portal-wrapper',
}: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export function Modal(props: ModalProps) {
  const { children, isOpen, handleClose, className = '' } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalContentRef, handleClose);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div ref={modalRef} className={`${styles.modal} ${className}`}>
        <button onClick={handleClose} className="close-btn">
          Close
        </button>
        <div ref={modalContentRef} className={styles['modal-content']}>
          {children}
        </div>
      </div>
    </ReactPortal>
  );
}

export default Modal;
