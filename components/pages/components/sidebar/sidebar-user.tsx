"use client";

import { LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  clearClientSession,
  getClientSessionUser,
} from "@/lib/auth/client-session";

export function ClientSidebarUser() {
  const router = useRouter();
  const client = getClientSessionUser();

  const handleLogout = () => {
    clearClientSession();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-700 ring-1 ring-slate-200">
          <UserRound className="h-4.5 w-4.5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {client?.fullName || "Cliente PETNOVA"}
          </p>
          <p className="truncate text-xs text-slate-500">
            {client?.email || "correo@cliente.com"}
          </p>
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={handleLogout}
        className="mt-3 h-9 w-full justify-start rounded-xl px-3 text-sm font-medium text-slate-700 hover:bg-white"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Cerrar sesión
      </Button>
    </div>
  );
}