"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

type ClientPanelTopbarProps = {
  title: string;
  subtitle?: string;
};

export function ClientPanelTopbar({
  title,
  subtitle,
}: ClientPanelTopbarProps) {
  return (
    <header className=" top-20 z-10 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <SidebarTrigger className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 lg:hidden" />

            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="hidden h-9 w-9 rounded-xl border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 sm:inline-flex"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}