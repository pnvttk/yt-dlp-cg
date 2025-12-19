import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary selection:text-black flex flex-col">
      <header className="p-6 border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold font-mono tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-primary before:content-['$'] before:mr-2 before:text-text-muted">yt-dlp</span>
            <span className="text-secondary">_generator</span>
          </h1>
          <div className="flex gap-4">
             {/* Future Header Actions */}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 flex-grow flex flex-col gap-8">
        {children}
      </main>

      <footer className="p-6 border-t border-border mt-auto text-center text-text-muted text-sm">
        <p>Built with React + Vite & Tailwind using Feature-Sliced Design</p>
      </footer>
    </div>
  );
}
