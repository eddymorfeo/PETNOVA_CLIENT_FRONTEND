import { LandingAbout } from "./landing-about";
import { LandingContact } from "./landing-contact";
import { LandingCta } from "./landing-cta";
import { LandingFooter } from "./landing-footer";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingServices } from "./landing-services";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fcff_0%,#ffffff_18%,#f8fbff_48%,#f4fbfb_100%)] text-slate-900">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_42%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_28%),radial-gradient(circle_at_center,rgba(16,185,129,0.07),transparent_34%)]" />
      <LandingHeader />
      <LandingHero />
      <LandingServices />
      <LandingAbout />
      <LandingCta />
      <LandingContact />
      <LandingFooter />
    </main>
  );
}