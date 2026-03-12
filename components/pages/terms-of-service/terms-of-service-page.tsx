import { FileText } from "lucide-react";

import { LegalPageLayout } from "../legal/legal-page-layout";

const termsSections = [
  {
    title: "Aceptación de los términos",
    content:
      "Al acceder y utilizar la plataforma PETNOVA, aceptas cumplir estos Términos del servicio. Si no estás de acuerdo con alguna de estas condiciones, no debes utilizar el portal.",
  },
  {
    title: "Uso del portal",
    content:
      "El portal está destinado a clientes de PETNOVA para gestionar citas, consultar información relacionada con sus mascotas y acceder a funcionalidades asociadas a su atención veterinaria. El usuario se compromete a utilizar la plataforma de forma lícita, responsable y respetuosa.",
  },
  {
    title: "Cuenta de usuario",
    content:
      "Para acceder a ciertas funcionalidades, puede ser necesario crear una cuenta. El usuario es responsable de mantener la confidencialidad de sus credenciales y de toda actividad realizada desde su cuenta.",
  },
  {
    title: "Información proporcionada",
    content:
      "El usuario se compromete a proporcionar información veraz, actualizada y completa al registrarse o utilizar los formularios de la plataforma. PETNOVA no se responsabiliza por inconvenientes derivados de datos incorrectos entregados por el usuario.",
  },
  {
    title: "Reservas y atención veterinaria",
    content:
      "Las reservas realizadas mediante la plataforma están sujetas a disponibilidad y validación por parte de la clínica. PETNOVA podrá reprogramar o modificar citas por razones operativas, informando oportunamente al cliente cuando corresponda.",
  },
  {
    title: "Propiedad intelectual",
    content:
      "Todos los contenidos, diseños, textos, logotipos, imágenes y elementos visuales del portal PETNOVA son de propiedad de la clínica o de sus respectivos titulares, y no podrán ser reproducidos sin autorización previa.",
  },
  {
    title: "Limitación de responsabilidad",
    content:
      "PETNOVA realiza esfuerzos razonables para mantener la plataforma disponible y actualizada, pero no garantiza un funcionamiento continuo o libre de errores. La clínica no será responsable por interrupciones temporales, fallas técnicas o accesos no autorizados fuera de su control razonable.",
  },
  {
    title: "Modificaciones",
    content:
      "PETNOVA podrá actualizar estos Términos del servicio en cualquier momento. Las modificaciones entrarán en vigencia una vez publicadas en esta página.",
  },
  {
    title: "Contacto",
    content:
      "Si tienes dudas sobre estos Términos del servicio, puedes contactarnos a través de los canales oficiales publicados en la plataforma.",
  },
];

export function TermsOfServicePage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Términos del servicio"
      description="Estos términos regulan el acceso y uso del portal PETNOVA por parte de los clientes y usuarios registrados."
      icon={<FileText className="h-6 w-6 text-black" />}
      highlightTitle="Condiciones de uso del portal"
      highlightDescription="Te recomendamos leer cuidadosamente estas condiciones para comprender el alcance, responsabilidades y uso adecuado de la plataforma PETNOVA."
      sections={termsSections}
    />
  );
}