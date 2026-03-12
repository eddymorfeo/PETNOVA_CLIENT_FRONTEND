import { Lock } from "lucide-react";

import { LegalPageLayout } from "../legal/legal-page-layout";

const privacySections = [
  {
    title: "Información que recopilamos",
    content:
      "PETNOVA puede recopilar información personal proporcionada por el usuario, como nombre, correo electrónico, teléfono y datos relacionados con sus mascotas, cuando estos sean necesarios para la prestación de nuestros servicios.",
  },
  {
    title: "Uso de la información",
    content:
      "La información recopilada se utiliza para gestionar cuentas de usuario, coordinar reservas, facilitar la atención veterinaria, mejorar la experiencia del portal y enviar comunicaciones relacionadas con el servicio.",
  },
  {
    title: "Protección de datos",
    content:
      "Aplicamos medidas de seguridad razonables para proteger la información personal frente a accesos no autorizados, alteraciones, divulgación o destrucción indebida. Sin embargo, ningún sistema es completamente infalible.",
  },
  {
    title: "Compartición de información",
    content:
      "PETNOVA no vende información personal a terceros. Los datos podrán ser tratados por personal autorizado o proveedores que apoyen la operación del servicio, siempre bajo obligaciones de confidencialidad y con fines relacionados con la prestación del servicio.",
  },
  {
    title: "Conservación de la información",
    content:
      "La información será conservada durante el tiempo necesario para cumplir con las finalidades descritas en esta política o según lo exijan las obligaciones legales y regulatorias aplicables.",
  },
  {
    title: "Derechos del usuario",
    content:
      "El usuario podrá solicitar la actualización o corrección de sus datos personales cuando corresponda, así como realizar consultas respecto del tratamiento de su información a través de los canales oficiales de PETNOVA.",
  },
  {
    title: "Cookies y tecnología similar",
    content:
      "La plataforma puede utilizar cookies u otras tecnologías similares para mejorar la navegación, recordar preferencias y analizar el uso general del portal. El uso específico dependerá de la configuración implementada en la plataforma.",
  },
  {
    title: "Cambios en esta política",
    content:
      "PETNOVA podrá modificar esta Política de privacidad para reflejar cambios operativos, legales o técnicos. Cualquier actualización será publicada en esta página.",
  },
  {
    title: "Contacto",
    content:
      "Si tienes dudas sobre esta Política de privacidad o sobre el tratamiento de tus datos, puedes comunicarte con PETNOVA a través de los medios oficiales disponibles en el sitio.",
  },
];

export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Política de privacidad"
      description="Esta política explica cómo PETNOVA recopila, utiliza y protege la información personal de los usuarios del portal."
      icon={<Lock className="h-6 w-6 text-black" />}
      highlightTitle="Compromiso con tu privacidad"
      highlightDescription="En PETNOVA valoramos la confidencialidad y el uso responsable de la información de nuestros clientes y sus mascotas."
      sections={privacySections}
    />
  );
}