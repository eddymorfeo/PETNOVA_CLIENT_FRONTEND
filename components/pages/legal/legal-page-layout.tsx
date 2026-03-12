import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

type LegalSection = {
  title: string;
  content: string;
};

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  highlightTitle: string;
  highlightDescription: string;
  sections: LegalSection[];
};

export function LegalPageLayout({
  eyebrow,
  title,
  description,
  icon,
  highlightTitle,
  highlightDescription,
  sections,
}: LegalPageLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f3f8fb_0%,#f8fafc_38%,#eef7f6_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-120px] h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-6">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-slate-200 bg-white/90 px-5 text-slate-700 shadow-sm backdrop-blur hover:bg-white"
          >
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] backdrop-blur-xl">
          <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#082f49_0%,#0f172a_42%,#155e75_100%)] px-6 py-10 text-white sm:px-10 sm:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_left_center,rgba(34,211,238,0.12),transparent_28%)]" />
            <div className="relative z-10 max-w-4xl">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur">
                  {icon}
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-black">
                    {eyebrow}
                  </p>
                  <h1 className="mt-2 text-3xl text-black tracking-tight sm:text-4xl lg:text-5xl">
                    {title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-black sm:text-base">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
            <div className="mb-8 rounded-[1.5rem] border border-cyan-100 bg-[linear-gradient(135deg,rgba(236,254,255,0.95),rgba(240,253,250,0.95))] p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-cyan-700" />
                </div>

                <div>
                  <p className="text-base font-bold text-slate-900">
                    {highlightTitle}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    {highlightDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              {sections.map((section, index) => (
                <article
                  key={section.title}
                  className="group rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-[0_20px_45px_-28px_rgba(8,145,178,0.22)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                        {section.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}