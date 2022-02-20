import { HTMLAttributes, ReactNode, useRef } from 'react';
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';
import { ReactComponent as ChevronLeftIcon } from '../../assets/icons/chevron-left.svg';
import styles from './Modal.module.css';
import useOnClickOutside from '../useOnClickOutside/useOnClickOutside';
import useEscHandler from '../useEscHandler/useEscHandler';
import ReactPortal from '../ReactPortal/ReactPortal';

export interface ModalClasses {
  root?: string;
  modal?: string;
  headerRoot?: string;
  header?: string;
  body?: string;
  footer?: string;
}

export interface ModalProps extends HTMLAttributes<HTMLElement> {
  classes?: ModalClasses;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  appId?: string;
  handleClose: () => unknown;
  handleBack?: () => unknown;
}

export function Modal(props: ModalProps) {
  const {
    children,
    isOpen,
    handleClose,
    handleBack,
    header,
    className = '',
    style = {},
    classes,
    footer,
    appId,
  } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalContentRef, handleClose);
  useEscHandler(handleClose);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container" appId={appId}>
      <div
        ref={modalRef}
        className={`${styles.modal} ${className} ${classes?.root || ''}`}
        style={style}
      >
        <div
          ref={modalContentRef}
          className={`${styles['modal-content']} ${classes?.modal || ''}`}
        >
          <header
            className={`${styles['modal-header']} ${classes?.headerRoot || ''}`}
          >
            <span>
              {handleBack && (
                <button
                  onClick={handleBack}
                  className={`${styles['icon-button']}`}
                >
                  <ChevronLeftIcon />
                </button>
              )}
            </span>
            <div className={classes?.header || ''}>{header}</div>
            <button
              onClick={handleClose}
              className={`${styles['icon-button']}`}
            >
              <XIcon width={24} height={24} />
            </button>
          </header>
          <main
            className={`${styles['modal-content-body']} ${classes?.body || ''}`}
          >
            {children}
          </main>
          {footer && (
            <footer
              className={`${styles['modal-content-footer']} ${
                classes?.footer || ''
              }`}
            >
              {footer}
            </footer>
          )}
        </div>
      </div>
    </ReactPortal>
  );
}

export default Modal;
