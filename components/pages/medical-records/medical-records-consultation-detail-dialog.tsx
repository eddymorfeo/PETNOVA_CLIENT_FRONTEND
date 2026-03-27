"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  MedicalRecordConsultation,
  PetMedicalRecord,
} from "@/types/medical-records/medical-records.types";
import { MedicalRecordsConsultationCard } from "./medical-records-consultation-card";

type MedicalRecordsConsultationDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultation: MedicalRecordConsultation | null;
  petRecord: PetMedicalRecord | null;
  consultationNumber: number;
};

export function MedicalRecordsConsultationDetailDialog({
  open,
  onOpenChange,
  consultation,
  petRecord,
  consultationNumber,
}: MedicalRecordsConsultationDetailDialogProps) {
  if (!consultation || !petRecord) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[min(96vw,1320px)] !max-w-[1320px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-0 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <div className="flex max-h-[100vh] flex-col overflow-hidden rounded-[1.5rem]">
          <DialogHeader className="border-b border-slate-200 bg-white px-8 py-5 text-left">
            <div className="pr-12">
              <DialogTitle className="text-left text-[1.45rem] font-semibold tracking-tight text-slate-950">
                Detalle de ficha clínica
              </DialogTitle>

              <div className="mt-3">
                <p className="text-base font-semibold text-slate-900">
                  {petRecord.pet.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {petRecord.pet.speciesName || "No informado"} ·{" "}
                  {petRecord.pet.breedName || "No informado"}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto px-7 py-6">
            <MedicalRecordsConsultationCard
              consultation={consultation}
              consultationNumber={consultationNumber}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}