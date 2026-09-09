import type { ReactNode } from "react";

interface MobileViewportProps {
  children: ReactNode;
}

export function MobileViewport({ children }: MobileViewportProps) {
  return (
    <div className="app-stage">
      <div className="app-device" data-testid="mobile-viewport">
        <div className="app-device-speaker" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
