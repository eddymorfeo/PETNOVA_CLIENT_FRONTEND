import { Apple, Chrome, Facebook } from "lucide-react";

import { Button } from "@/components/ui/button";

const socialItems = [
  {
    label: "Apple",
    icon: Apple,
  },
  {
    label: "Google",
    icon: Chrome,
  },
  {
    label: "Facebook",
    icon: Facebook,
  },
];

export function LoginSocialButtons() {
  return (
    <div className="mt-8">
      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-slate-400">
            O continúa con
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {socialItems.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.label}
              type="button"
              variant="outline"
              className="h-12 rounded-2xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              <Icon className="h-5 w-5" />
            </Button>
          );
        })}
      </div>
    </div>
  );
}