import { AppointmentGuestForm } from "./appointment-guest-form";
import { AppointmentGuestHeader } from "./appointment-guest-header";
import { AppointmentGuestSteps } from "./appointment-guest-steps";
import { AppointmentGuestSummary } from "./appointment-guest-summary";


export function AppointmentGuestgPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppointmentGuestHeader />

      <section className="section-shell py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-8">
            <AppointmentGuestSteps />
            <AppointmentGuestForm />
          </div>

          <AppointmentGuestSummary />
        </div>
      </section>
    </main>
  );
}