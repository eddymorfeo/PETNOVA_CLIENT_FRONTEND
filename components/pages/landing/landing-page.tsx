import { LandingAbout } from "./landing-about";
import { LandingContact } from "./landing-contact";
import { LandingCta } from "./landing-cta";
import { LandingFooter } from "./landing-footer";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingServices } from "./landing-services";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fafc_0%,#f8fbfd_16%,#f5f9fc_42%,#f2f7fb_72%,#eef5f9_100%)] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10rem] top-[-8rem] h-[26rem] w-[26rem] rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="absolute right-[-7rem] top-[4rem] h-[22rem] w-[22rem] rounded-full bg-sky-200/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-emerald-100/30 blur-3xl" />
      </div>

      <LandingHeader />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-8 pt-6 sm:px-6 lg:gap-10 lg:px-8 lg:pb-12 lg:pt-8">
        <LandingHero />
        <LandingServices />
        <LandingAbout />
        <LandingCta />
        <LandingContact />
      </div>

      <LandingFooter />
    </main>
  );
}
