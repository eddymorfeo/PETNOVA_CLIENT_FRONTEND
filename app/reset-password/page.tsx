import { Suspense } from "react";

import { ResetPasswordPage } from "@/components/pages/reset-password/reset-password-page";

export default function ResetPassword() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordPage />
    </Suspense>
  );
}
