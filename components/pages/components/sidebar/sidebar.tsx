"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ClientSidebarContent } from "./sidebar-content";

export function ClientSidebar() {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-slate-200/80 bg-white"
    >
      <SidebarContent className="bg-white px-3 py-3">
        <ClientSidebarContent />
      </SidebarContent>
    </Sidebar>
  );
}