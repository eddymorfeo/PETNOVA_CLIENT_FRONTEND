import Link from "next/link";
import { PawPrint } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-50 ring-1 ring-cyan-100">
            <PawPrint className="size-4 text-cyan-700" />
          </div>
          <span>© 2026 PETNOVA. Todos los derechos reservados.</span>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/login" className="transition hover:text-cyan-700">
            Portal cliente
          </Link>
          <Link href="/appointment-guest" className="transition hover:text-cyan-700">
            Reservar hora
          </Link>
        </div>
      </div>
    </footer>
  );
}
