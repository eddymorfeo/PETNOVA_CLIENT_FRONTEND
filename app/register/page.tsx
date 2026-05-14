import { Suspense } from "react";

import { RegisterPage } from "@/components/pages/register/register-page";

export default function Register() {
  return (
    <Suspense fallback={null}>
      <RegisterPage />
    </Suspense>
  );
}
