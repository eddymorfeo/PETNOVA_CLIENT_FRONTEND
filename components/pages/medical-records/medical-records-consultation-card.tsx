"use client";

import type { ReactNode } from "react";
import {
  Activity,
  FileText,
  Paperclip,
  Pill,
  Stethoscope,
  Syringe,
  Thermometer,
  Weight,
} from "lucide-react";
import type { MedicalRecordConsultation } from "@/types/medical-records/medical-records.types";
import {
  formatDate,
  formatDateTime,
} from "./medical-records-helpers";
import { MedicalRecordsSummaryCard } from "./medical-records-summary-card";

type MedicalRecordsConsultationCardProps = {
  consultation: MedicalRecordConsultation;
  consultationNumber: number;
};

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

type BlockSectionProps = {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
};

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

function BlockSection({ title, children, icon }: BlockSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function MedicalRecordsConsultationCard({
  consultation,
  consultationNumber,
}: MedicalRecordsConsultationCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-cyan-700" />
            <h3 className="text-lg font-semibold text-slate-950">
              Atención #{consultationNumber}
            </h3>
          </div>

          <p className="mt-2 text-sm text-slate-600">
            Fecha de atención:{" "}
            <span className="font-medium text-slate-800">
              {formatDateTime(consultation.consultationDate)}
            </span>
          </p>

          <p className="mt-1 text-sm text-slate-600">
            Veterinario:{" "}
            <span className="font-medium text-slate-800">
              {consultation.veterinarianName || "No informado"}
            </span>
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Registrada: {formatDateTime(consultation.createdAt)}
          </p>
        </div>

        <div className="grid min-w-[240px] gap-3 md:grid-cols-3 lg:w-[360px]">
          <MetricCard
            icon={<Weight className="h-4 w-4" />}
            label="Peso"
            value={
              consultation.weightKg != null
                ? `${consultation.weightKg} kg`
                : "No registrado"
            }
          />
          <MetricCard
            icon={<Thermometer className="h-4 w-4" />}
            label="Temperatura"
            value={
              consultation.temperatureC != null
                ? `${consultation.temperatureC} °C`
                : "No registrada"
            }
          />
          <MetricCard
            icon={<Activity className="h-4 w-4" />}
            label="Diagnóstico"
            value={consultation.diagnosis || "Sin diagnóstico"}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <MedicalRecordsSummaryCard
          label="Motivo principal"
          value={consultation.chiefComplaint || "Sin información."}
        />
        <MedicalRecordsSummaryCard
          label="Diagnóstico"
          value={consultation.diagnosis || "Sin diagnóstico registrado."}
        />
        <MedicalRecordsSummaryCard
          label="Anamnesis"
          value={consultation.anamnesis || "Sin anamnesis registrada."}
        />
        <MedicalRecordsSummaryCard
          label="Examen físico"
          value={consultation.physicalExam || "Sin examen físico registrado."}
        />
        <MedicalRecordsSummaryCard
          label="Evaluación clínica"
          value={consultation.assessment || "Sin evaluación clínica registrada."}
        />
        <MedicalRecordsSummaryCard
          label="Plan clínico"
          value={consultation.plan || "Sin plan clínico registrado."}
        />
      </div>

      <div className="mt-4">
        <MedicalRecordsSummaryCard
          label="Resumen de la atención"
          value={consultation.summary || "Sin resumen registrado."}
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        <BlockSection
          title="Notas clínicas"
          icon={<FileText className="h-4 w-4 text-cyan-700" />}
        >
          <div className="space-y-3">
            {consultation.consultationNotes.length ? (
              consultation.consultationNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-700"
                >
                  {note.note}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Sin notas clínicas registradas.
              </p>
            )}
          </div>
        </BlockSection>

        <BlockSection
          title="Tratamientos"
          icon={<Syringe className="h-4 w-4 text-cyan-700" />}
        >
          <div className="space-y-3">
            {consultation.treatments.length ? (
              consultation.treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-700"
                >
                  {treatment.description}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Sin tratamientos registrados.
              </p>
            )}
          </div>
        </BlockSection>

        <BlockSection
          title="Prescripciones"
          icon={<Pill className="h-4 w-4 text-cyan-700" />}
        >
          <div className="space-y-3">
            {consultation.prescriptions.length ? (
              consultation.prescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 p-3"
                >
                  <p className="text-sm font-medium text-slate-900">
                    {prescription.medicationName || "Medicamento"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {prescription.dose || "Sin dosis"} ·{" "}
                    {prescription.frequency || "Sin frecuencia"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {prescription.duration || "Sin duración"}
                  </p>
                  {prescription.notes ? (
                    <p className="mt-1 text-sm text-slate-600">
                      {prescription.notes}
                    </p>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Sin prescripciones registradas.
              </p>
            )}
          </div>
        </BlockSection>

        <BlockSection
          title="Adjuntos"
          icon={<Paperclip className="h-4 w-4 text-cyan-700" />}
        >
          <div className="space-y-3">
            {consultation.attachments.length ? (
              consultation.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 p-3"
                >
                  <p className="text-sm font-medium text-slate-900">
                    {attachment.fileName || "Archivo adjunto"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {attachment.mimeType || "Tipo no informado"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Sin adjuntos registrados.
              </p>
            )}
          </div>
        </BlockSection>
      </div>
    </article>
  );
}