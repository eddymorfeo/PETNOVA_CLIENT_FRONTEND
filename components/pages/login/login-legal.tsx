import Link from "next/link";

export function LoginLegal() {
  return (
    <p className="mt-6 text-center text-xs leading-6 text-slate-500">
      Al continuar, aceptas nuestros{" "}
      <Link
        href="/terms"
        className="font-medium text-slate-700 underline underline-offset-4 hover:text-cyan-700"
      >
        Términos del servicio
      </Link>{" "}
      y{" "}
      <Link
        href="/privacy"
        className="font-medium text-slate-700 underline underline-offset-4 hover:text-cyan-700"
      >
        Política de privacidad
      </Link>
      .
    </p>
  );
}