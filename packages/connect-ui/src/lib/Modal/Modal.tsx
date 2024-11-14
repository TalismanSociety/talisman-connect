import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import ChevronLeftIcon from '../../assets/icons/chevron-left.svg?react'
import XIcon from '../../assets/icons/x.svg?react'
import { useOnClickOutside } from '../useOnClickOutside/useOnClickOutside'
import styles from './Modal.module.css'

// TODO: Move this to @talisman/connect-ui
export interface ModalProps {
  title?: ReactNode
  footer?: ReactNode
  children: ReactNode
  className?: string
  isOpen: boolean
  appId?: string
  handleClose: () => unknown
  handleBack?: () => unknown
}

function createWrapperAndAppendToBody(wrapperId: string, appendToId?: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  const destinationElement = appendToId
    ? document.getElementById(appendToId)
    : document.body
  if (destinationElement) {
    destinationElement.appendChild(wrapperElement)
  }
  return wrapperElement
}

interface ReactPortalProps {
  children: ReactNode
  wrapperId: string
  appId?: string
}

// Also, set a default value for wrapperId prop if none provided
function ReactPortal({
  children,
  wrapperId = 'react-portal-wrapper',
  appId,
}: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId, appId)
    }
    setWrapperElement(element)

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [appId, wrapperId])

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) {
    return null
  }

  return createPortal(children, wrapperElement)
}

export function Modal(props: ModalProps) {
  const {
    children,
    isOpen,
    handleClose,
    handleBack,
    title,
    className = '',
    footer,
    appId,
  } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(modalContentRef, handleClose)

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  if (!isOpen) return null

  return (
    <ReactPortal wrapperId="react-portal-modal-container" appId={appId}>
      <div ref={modalRef} className={`${styles.modal} ${className}`}>
        <div ref={modalContentRef} className={styles['modal-content']}>
          <header className={styles['modal-header']}>
            <span>
              {handleBack && (
                <button onClick={handleBack} className={styles['icon-button']}>
                  <ChevronLeftIcon />
                </button>
              )}
            </span>
            <div>{title}</div>
            <button onClick={handleClose} className={styles['icon-button']}>
              <XIcon width={24} height={24} />
            </button>
          </header>
          <main className={styles['modal-content-body']}>{children}</main>
          {footer && (
            <footer className={styles['modal-content-footer']}>{footer}</footer>
          )}
        </div>
      </div>
    </ReactPortal>
  )
}
