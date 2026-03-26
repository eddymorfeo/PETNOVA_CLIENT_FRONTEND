import Link from "next/link";
import { PawPrint } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
            <PawPrint className="size-5" />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white">
              PETNOVA
            </p>
            <p className="text-xs text-slate-400">
              © 2026 PETNOVA. Todos los derechos reservados.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
          <Link href="/login" className="transition hover:text-cyan-300">
            Portal cliente
          </Link>
          <Link
            href="/appointment-guest"
            className="transition hover:text-cyan-300"
          >
            Reservar hora
          </Link>
        </div>
      </div>
    </footer>
  );
}