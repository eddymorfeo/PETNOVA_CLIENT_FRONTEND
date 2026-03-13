import { ClientSidebarLayout } from "@/components/pages/components/sidebar/sidebar-layout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientSidebarLayout
      title="Portal del cliente"
      subtitle="Gestiona tus mascotas, citas, fichas clínicas y recordatorios."
    >
      {children}
    </ClientSidebarLayout>
  );
}