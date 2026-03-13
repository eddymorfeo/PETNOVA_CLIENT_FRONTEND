"use client";

import { ClientSidebarHeader } from "./sidebar-header";
import { ClientSidebarNav } from "./sidebar-nav";
import { ClientSidebarUser } from "./sidebar-user";

export function ClientSidebarContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="pb-4">
        <ClientSidebarHeader />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <ClientSidebarNav />
      </div>

      <div className="pt-4">
        <ClientSidebarUser />
      </div>
    </div>
  );
}