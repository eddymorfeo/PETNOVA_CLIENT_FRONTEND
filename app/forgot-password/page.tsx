import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Button
          asChild
          variant="outline"
          className="rounded-2xl border-primary/20"
        >
          <Link href="/login">Volver al login</Link>
        </Button>
        Restablecer Contraseña
      </div>
    </div>
  );
}
