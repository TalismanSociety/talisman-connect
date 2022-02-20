import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './ReactPortal.module.css';

export interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string;
  appId?: string;
}

function createWrapperAndAppendToBody(wrapperId: string, appendToId?: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  const destinationElement = appendToId
    ? document.getElementById(appendToId)
    : document.body;
  if (destinationElement) {
    destinationElement.appendChild(wrapperElement);
  }
  return wrapperElement;
}

export function ReactPortal(props: ReactPortalProps) {
  const { children, wrapperId = 'react-portal-wrapper', appId } = props;
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId, appId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [appId, wrapperId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) {
    return null;
  }

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
