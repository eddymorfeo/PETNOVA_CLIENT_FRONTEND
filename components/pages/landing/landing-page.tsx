import { LandingAbout } from "./landing-about";
import { LandingContact } from "./landing-contact";
import { LandingCta } from "./landing-cta";
import { LandingFooter } from "./landing-footer";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingServices } from "./landing-services";

export function LandingPage() {
  return (
    <main className="bg-white text-slate-950">
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