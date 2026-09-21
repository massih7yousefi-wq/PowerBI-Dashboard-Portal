import { useState, type ReactNode } from 'react';

import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({
  children,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="app-shell">
      <div className="app-video-background">
        <video
          className="app-background-video"
          src="/PHMA1268.MP4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>

      <div className="app-video-overlay" />

      <div className="app-background-glow app-glow-one" />
      <div className="app-background-glow app-glow-two" />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">
        <Header
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}