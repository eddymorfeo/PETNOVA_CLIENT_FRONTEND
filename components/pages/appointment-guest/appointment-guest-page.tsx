import { AppointmentGuestForm } from "./appointment-guest-form";
import { AppointmentGuestHeader } from "./appointment-guest-header";
import { AppointmentGuestSteps } from "./appointment-guest-steps";

export function AppointmentGuestgPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppointmentGuestHeader />

      <section className="py-8 lg:py-10">
        <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
          <div className="space-y-6">
            <AppointmentGuestSteps />
            <AppointmentGuestForm />
          </div>
        </div>
      </section>
    </main>
  );
}