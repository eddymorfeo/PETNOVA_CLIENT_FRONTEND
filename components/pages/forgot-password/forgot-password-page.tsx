import { LoginBrandPanel } from "../login/login-brand-panel";
import { ForgotPasswordForm } from "./forgot-password-form";

export function ForgotPasswordPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f4fbff_0%,#f8fafc_35%,#eef7f7_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-80px] h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_40%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <LoginBrandPanel />

          <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
            <div className="w-full max-w-md">
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}