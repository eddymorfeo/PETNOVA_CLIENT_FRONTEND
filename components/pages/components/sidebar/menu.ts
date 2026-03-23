import {
  CalendarDays,
  ClipboardList,
  HeartPulse,
  Home,
  PawPrint,
  Settings,
  ShieldCheck,
  Syringe,
  UserRound,
} from "lucide-react";

export type ClientSidebarSubItem = {
  title: string;
  href: string;
};

export type ClientSidebarItem = {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  items?: ClientSidebarSubItem[];
};

export const clientSidebarMenu: ClientSidebarItem[] = [
  {
    title: "Inicio",
    href: "/home",
    icon: Home,
  },
  {
    title: "Mi perfil",
    href: "/home/profile",
    icon: UserRound,
  },
  {
    title: "Mis mascotas",
    icon: PawPrint,
    badge: "2",
    items: [
      { title: "Listado de mascotas", href: "/home/pets" },
      { title: "Registrar mascota", href: "/home/pets/new" },
    ],
  },
  {
    title: "Mis citas",
    icon: CalendarDays,
    badge: "1",
    items: [
      { title: "Citas", href: "/home/appointments" },
    ],
  },
  {
    title: "Ficha clínica",
    icon: ClipboardList,
    items: [
      { title: "Consultas médicas", href: "/home/medical-records" },
      { title: "Tratamientos", href: "/home/treatments" },
      { title: "Recetas", href: "/home/prescriptions" },
    ],
  },
  {
    title: "Vacunas y controles",
    icon: Syringe,
    items: [
      { title: "Vacunas", href: "/home/vaccines" },
      { title: "Recordatorios", href: "/home/reminders" },
    ],
  },
];