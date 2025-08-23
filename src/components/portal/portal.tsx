import { PORTAL_ROOT_ID } from '@constants';
import type { PropsWithChildren } from 'react';
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal: React.FC<PropsWithChildren> = ({ children }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let portalContainer = document.getElementById(PORTAL_ROOT_ID);

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = PORTAL_ROOT_ID;
      document.body.append(portalContainer);
    }

    setPortalRoot(portalContainer);

    return () => {
      portalRoot?.remove();
    };
  }, [portalRoot]);

  if (!portalRoot) {
    return null;
  }

  return createPortal(children, portalRoot);
};
