import { HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";

const highlights = [
  {
    title: "Atención organizada",
    description:
      "Gestiona reservas, pacientes e historial clínico en un solo lugar.",
    icon: Stethoscope,
  },
  {
    title: "Seguimiento clínico",
    description:
      "Controla vacunas, tratamientos y evolución médica fácilmente.",
    icon: HeartPulse,
  },
  {
    title: "Acceso seguro",
    description:
      "Ingresa a la plataforma con una experiencia moderna y protegida.",
    icon: ShieldCheck,
  },
];

export function LoginBrandPanel() {
  return (
    <section className="relative hidden min-h-[720px] overflow-hidden bg-[linear-gradient(135deg,#082f49_0%,#0f172a_42%,#164e63_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute inset-0">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute right-[-40px] top-20 h-64 w-64 rotate-12 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm" />
        <div className="absolute right-20 top-48 h-56 w-56 rotate-12 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm" />
        <div className="absolute right-[-20px] bottom-[-20px] h-64 w-64 rotate-12 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm" />
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg font-black">
            P
          </div>

          <div>
            <p className="text-sm font-black tracking-[0.18em]">PETNOVA</p>
            <p className="text-xs text-white/70">Clínica veterinaria</p>
          </div>
        </div>

        <div className="mt-12 max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Bienvenido
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight xl:text-5xl">
            Accede a una experiencia clínica veterinaria más moderna y cercana.
          </h1>

          <p className="mt-6 text-base leading-8 text-white/80">
            Ingresa a tu cuenta para gestionar citas, revisar historiales
            clínicos y mantener la atención de tus mascotas siempre organizada.
          </p>
        </div>
      </div>

      <div className="relative z-10 grid gap-4">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="h-5 w-5 text-cyan-200" />
                </div>

                <div>
                  <h2 className="font-semibold text-white">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}