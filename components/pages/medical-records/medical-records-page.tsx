"use client";

import { useEffect, useMemo, useState } from "react";
import {
  fetchMyMedicalRecordPets,
  fetchMyPetMedicalRecord,
} from "@/api/medical-records/medical-records.api";
import type {
  MedicalRecordPetItem,
  PetMedicalRecord,
  MedicalRecordConsultation,
} from "@/types/medical-records/medical-records.types";
import { formatDate } from "./medical-records-helpers";
import { MedicalRecordsEmptyBlock } from "./medical-records-empty-block";
import { MedicalRecordsPetsSidebar } from "./medical-records-pets-sidebar";
import { MedicalRecordsConsultationsTable } from "./medical-records-consultations-table";
import { MedicalRecordsConsultationDetailDialog } from "./medical-records-consultation-detail-dialog";

type MedicalRecordConsultationRow = {
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

export function MedicalRecordsPage() {
  const [pets, setPets] = useState<MedicalRecordPetItem[]>([]);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [medicalRecordsByPetId, setMedicalRecordsByPetId] = useState<
    Record<string, PetMedicalRecord>
  >({});
  const [isLoadingPets, setIsLoadingPets] = useState(true);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedConsultationId, setSelectedConsultationId] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const loadMedicalRecords = async () => {
      try {
        setIsLoadingPets(true);
        setIsLoadingRecords(true);
        setErrorMessage("");

        const petsData = await fetchMyMedicalRecordPets();
        setPets(petsData);

        if (petsData.length > 0) {
          setSelectedPetId(petsData[0].id);
        }

        const recordsEntries = await Promise.all(
          petsData.map(async (pet) => {
            const record = await fetchMyPetMedicalRecord(pet.id);
            return [pet.id, record] as const;
          }),
        );

        setMedicalRecordsByPetId(Object.fromEntries(recordsEntries));
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "No fue posible cargar las fichas clínicas.",
        );
      } finally {
        setIsLoadingPets(false);
        setIsLoadingRecords(false);
      }
    };

    void loadMedicalRecords();
  }, []);

  const selectedPetRecord = useMemo(() => {
    if (!selectedPetId) {
      return null;
    }

    return medicalRecordsByPetId[selectedPetId] ?? null;
  }, [medicalRecordsByPetId, selectedPetId]);

  const consultationRows = useMemo<MedicalRecordConsultationRow[]>(() => {
    const targetRecords = selectedPetId
      ? Object.values(medicalRecordsByPetId).filter(
          (record) => record.pet.id === selectedPetId,
        )
      : Object.values(medicalRecordsByPetId);

    return targetRecords
      .flatMap((record) =>
        record.consultations.map((consultation) => ({
          consultationId: consultation.id,
          petId: record.pet.id,
          petName: record.pet.name,
          speciesName: record.pet.speciesName || null,
          breedName: record.pet.breedName || null,
          consultationDate: consultation.consultationDate || null,
          veterinarianName: consultation.veterinarianName || null,
          diagnosis: consultation.diagnosis || null,
          chiefComplaint: consultation.chiefComplaint || null,
          summary: consultation.summary || null,
          statusLabel: "Registrada",
        })),
      )
      .sort((left, right) => {
        const leftTime = left.consultationDate
          ? new Date(left.consultationDate).getTime()
          : 0;
        const rightTime = right.consultationDate
          ? new Date(right.consultationDate).getTime()
          : 0;

        return rightTime - leftTime;
      });
  }, [medicalRecordsByPetId, selectedPetId]);

  const selectedConsultationData = useMemo(() => {
    if (!selectedConsultationId) {
      return {
        petRecord: null as PetMedicalRecord | null,
        consultation: null as MedicalRecordConsultation | null,
        consultationNumber: 0,
      };
    }

    for (const record of Object.values(medicalRecordsByPetId)) {
      const consultationIndex = record.consultations.findIndex(
        (consultation) => consultation.id === selectedConsultationId,
      );

      if (consultationIndex >= 0) {
        return {
          petRecord: record,
          consultation: record.consultations[consultationIndex],
          consultationNumber:
            record.summary.totalConsultations - consultationIndex,
        };
      }
    }

    return {
      petRecord: null,
      consultation: null,
      consultationNumber: 0,
    };
  }, [medicalRecordsByPetId, selectedConsultationId]);

  const handleSelectRow = (row: MedicalRecordConsultationRow) => {
    setSelectedConsultationId(row.consultationId);
    setIsDetailOpen(true);
  };

  return (
    <section className="space-y-5">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
          Fichas clínicas
        </span>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          Historial clínico de tus mascotas
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Consulta una vista resumida de todas las atenciones registradas y haz
          clic en una fila para revisar el detalle completo de la ficha clínica.
        </p>
      </section>

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <MedicalRecordsPetsSidebar
          pets={pets}
          selectedPetId={selectedPetId}
          isLoadingPets={isLoadingPets}
          onSelectPet={setSelectedPetId}
        />

        <div className="space-y-5">
          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-950">
                  {selectedPetRecord
                    ? selectedPetRecord.pet.name
                    : "Todas las fichas clínicas"}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedPetRecord
                    ? `${selectedPetRecord.pet.speciesName || "No informado"} · ${selectedPetRecord.pet.breedName || "No informado"}`
                    : "Selecciona una mascota en el panel lateral para filtrar la tabla."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700">
                  {consultationRows.length} registros
                </span>

                {selectedPetRecord ? (
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                    Última:{" "}
                    {formatDate(selectedPetRecord.summary.lastConsultationDate)}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              {isLoadingRecords ? (
                <div className="space-y-3">
                  <div className="h-14 rounded-xl bg-slate-100" />
                  <div className="h-14 rounded-xl bg-slate-100" />
                  <div className="h-14 rounded-xl bg-slate-100" />
                  <div className="h-14 rounded-xl bg-slate-100" />
                </div>
              ) : consultationRows.length ? (
                <MedicalRecordsConsultationsTable
                  rows={consultationRows}
                  onSelectRow={handleSelectRow}
                />
              ) : (
                <MedicalRecordsEmptyBlock message="No hay consultas clínicas registradas para mostrar." />
              )}
            </div>
          </section>
        </div>
      </section>

      <MedicalRecordsConsultationDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        consultation={selectedConsultationData.consultation}
        petRecord={selectedConsultationData.petRecord}
        consultationNumber={selectedConsultationData.consultationNumber}
      />
    </section>
  );
}