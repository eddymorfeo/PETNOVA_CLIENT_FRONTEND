"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { clientSidebarMenu } from "./menu";

function isGroupActive(
  pathname: string,
  href?: string,
  items?: { href: string }[]
) {
  if (href && pathname === href) return true;
  if (!items) return false;
  return items.some((item) => pathname.startsWith(item.href));
}

export function ClientSidebarNav() {
  const pathname = usePathname();

  const defaultOpenGroups = useMemo(() => {
    return clientSidebarMenu.reduce<Record<string, boolean>>((accumulator, item) => {
      if (item.items?.length) {
        accumulator[item.title] = isGroupActive(pathname, item.href, item.items);
      }
      return accumulator;
    }, {});
  }, [pathname]);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(defaultOpenGroups);

  const toggleGroup = (title: string) => {
    setOpenGroups((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  return (
    <nav className="space-y-1.5">
      {clientSidebarMenu.map((item) => {
        const Icon = item.icon;
        const active = isGroupActive(pathname, item.href, item.items);

        if (item.items?.length) {
          const isOpen = openGroups[item.title] ?? false;

          return (
            <div key={item.title}>
              <button
                type="button"
                onClick={() => toggleGroup(item.title)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition ${
                  active
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? "bg-white text-cyan-700 ring-1 ring-slate-200"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="truncate text-sm font-medium">
                    {item.title}
                  </span>
                </div>

                <ChevronRight
                  className={`h-4 w-4 shrink-0 text-slate-400 transition ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-1 space-y-1 pl-6">
                  {item.items.map((subItem) => {
                    const subItemActive = pathname === subItem.href;

                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`block rounded-lg px-3 py-2 text-sm transition ${
                          subItemActive
                            ? "bg-cyan-50 font-medium text-cyan-700"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.title}
            href={item.href || "#"}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
              active
                ? "bg-slate-100 text-slate-950"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                active
                  ? "bg-white text-cyan-700 ring-1 ring-slate-200"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>

            <span className="truncate text-sm font-medium">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}