"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ClientSidebar } from "./sidebar";
import { ClientPanelTopbar } from "./panel-topbar";
import { ClientPanelShell } from "./panel-shell";

type ClientSidebarLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function ClientSidebarLayout({
  title,
  subtitle,
  children,
}: ClientSidebarLayoutProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <ClientSidebar />

        <SidebarInset className="bg-transparent">
          <ClientPanelTopbar title={title} subtitle={subtitle} />
          <ClientPanelShell>{children}</ClientPanelShell>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}