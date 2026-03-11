import Link from "next/link";
import { PawPrint } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur">
      <div className="section-shell flex flex-col gap-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <PawPrint className="size-4 text-primary" />
          <span>© 2026 PETNOVA. Todos los derechos reservados.</span>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/login" className="transition hover:text-primary">
            Portal cliente
          </Link>
          <Link href="/reservar-hora" className="transition hover:text-primary">
            Reservar hora
          </Link>
        </div>
      </div>
    </footer>
  );
}