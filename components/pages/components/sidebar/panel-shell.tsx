"use client";

type ClientPanelShellProps = {
  children: React.ReactNode;
};

export function ClientPanelShell({ children }: ClientPanelShellProps) {
  return (
    <main className="flex-1 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.08),_transparent_28%),linear-gradient(to_bottom,_#f8fafc,_#f1f5f9)]">
      <div className="min-h-[calc(100vh-76px)] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </div>
    </main>
  );
}