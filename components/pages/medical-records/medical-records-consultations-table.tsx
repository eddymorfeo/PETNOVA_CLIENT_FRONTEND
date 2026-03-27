"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "./medical-records-helpers";

export type MedicalRecordConsultationRow = {
  consultationId: string;
  petId: string;
  petName: string;
  speciesName: string | null;
  breedName: string | null;
  consultationDate: string | null;
  veterinarianName: string | null;
  diagnosis: string | null;
  chiefComplaint: string | null;
  summary: string | null;
  statusLabel: string;
};

type MedicalRecordsConsultationsTableProps = {
  rows: MedicalRecordConsultationRow[];
  onSelectRow: (row: MedicalRecordConsultationRow) => void;
};

export function MedicalRecordsConsultationsTable({
  rows,
  onSelectRow,
}: MedicalRecordsConsultationsTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200 bg-slate-50/90 hover:bg-slate-50/90">
              <TableHead className="h-14 pl-8 pr-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Mascota
              </TableHead>
              <TableHead className="h-14 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Fecha atención
              </TableHead>
              <TableHead className="h-14 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Veterinario
              </TableHead>
              <TableHead className="h-14 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Motivo
              </TableHead>
              <TableHead className="h-14 pl-6 pr-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Diagnóstico
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.consultationId}
                className="cursor-pointer border-b border-slate-200/80 transition hover:bg-cyan-50/40"
                onClick={() => onSelectRow(row)}
              >
                <TableCell className="pl-8 pr-6 py-5 align-middle">
                  <div className="min-w-[180px]">
                    <p className="text-sm font-semibold text-slate-900">
                      {row.petName}
                    </p>
                    <p className="mt-1.5 text-xs text-slate-500">
                      {row.speciesName || "Especie"} · {row.breedName || "Raza"}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="whitespace-nowrap px-6 py-5 align-middle text-sm text-slate-700">
                  {formatDateTime(row.consultationDate)}
                </TableCell>

                <TableCell className="px-6 py-5 align-middle text-sm text-slate-700">
                  <span className="line-clamp-2 max-w-[220px]">
                    {row.veterinarianName || "No informado"}
                  </span>
                </TableCell>

                <TableCell className="px-6 py-5 align-middle text-sm text-slate-700">
                  <span className="line-clamp-2 max-w-[260px]">
                    {row.chiefComplaint || "Sin motivo registrado"}
                  </span>
                </TableCell>

                <TableCell className="pl-6 pr-8 py-5 align-middle text-sm text-slate-700">
                  <span className="line-clamp-2 max-w-[260px]">
                    {row.diagnosis || "Sin diagnóstico"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}