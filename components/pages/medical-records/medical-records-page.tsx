"use client";

import { useEffect, useMemo, useState } from "react";
import {
  fetchMyMedicalRecordPets,
  fetchMyPetMedicalRecord,
} from "@/api/medical-records/medical-records.api";
import type {
  MedicalRecordPetItem,
  PetMedicalRecord,
} from "@/types/medical-records/medical-records.types";
import { getSexLabel, formatDate } from "./medical-records-helpers";
import { MedicalRecordsSummaryCard } from "./medical-records-summary-card";
import { MedicalRecordsEmptyBlock } from "./medical-records-empty-block";
import { MedicalRecordsPetsSidebar } from "./medical-records-pets-sidebar";
import { MedicalRecordsConsultationCard } from "./medical-records-consultation-card";

export function MedicalRecordsPage() {
  const [pets, setPets] = useState<MedicalRecordPetItem[]>([]);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [medicalRecord, setMedicalRecord] = useState<PetMedicalRecord | null>(
    null,
  );
  const [isLoadingPets, setIsLoadingPets] = useState(true);
  const [isLoadingRecord, setIsLoadingRecord] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPets = async () => {
      try {
        setIsLoadingPets(true);
        setErrorMessage("");

        const petsData = await fetchMyMedicalRecordPets();
        setPets(petsData);

        if (petsData.length > 0) {
          setSelectedPetId(petsData[0].id);
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "No fue posible cargar las fichas clínicas.",
        );
      } finally {
        setIsLoadingPets(false);
      }
    };

    void loadPets();
  }, []);

  useEffect(() => {
    const loadMedicalRecord = async () => {
      if (!selectedPetId) {
        setMedicalRecord(null);
        return;
      }

      try {
        setIsLoadingRecord(true);
        setErrorMessage("");

        const record = await fetchMyPetMedicalRecord(selectedPetId);
        setMedicalRecord(record);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "No fue posible cargar la ficha clínica.",
        );
      } finally {
        setIsLoadingRecord(false);
      }
    };

    void loadMedicalRecord();
  }, [selectedPetId]);

  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === selectedPetId) ?? null,
    [pets, selectedPetId],
  );

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
          Consulta el historial médico de cada mascota, revisa quién la atendió,
          cuándo fue la atención, el diagnóstico, las indicaciones entregadas,
          tratamientos, prescripciones y observaciones clínicas registradas.
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
          {isLoadingRecord ? (
            <div className="space-y-4">
              <div className="h-32 rounded-[1.5rem] bg-slate-100" />
              <div className="h-72 rounded-[1.5rem] bg-slate-100" />
              <div className="h-72 rounded-[1.5rem] bg-slate-100" />
            </div>
          ) : medicalRecord ? (
            <>
              <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">
                      {medicalRecord.pet.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {medicalRecord.pet.speciesName || "No informado"} ·{" "}
                      {medicalRecord.pet.breedName || "No informado"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700">
                      {medicalRecord.summary.totalConsultations} consultas
                    </span>
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                      Última: {formatDate(medicalRecord.summary.lastConsultationDate)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <MedicalRecordsSummaryCard
                    label="Sexo"
                    value={getSexLabel(medicalRecord.pet.sex)}
                  />
                  <MedicalRecordsSummaryCard
                    label="Fecha de nacimiento"
                    value={formatDate(medicalRecord.pet.birthDate)}
                  />
                  <MedicalRecordsSummaryCard
                    label="Color"
                    value={medicalRecord.pet.color || "No informado"}
                  />
                  <MedicalRecordsSummaryCard
                    label="Microchip"
                    value={medicalRecord.pet.microchip || "No informado"}
                  />
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <MedicalRecordsSummaryCard
                    label="Alergias"
                    value={medicalRecord.pet.allergies || "Sin alergias registradas"}
                  />
                  <MedicalRecordsSummaryCard
                    label="Notas generales"
                    value={medicalRecord.pet.notes || "Sin notas generales registradas"}
                  />
                </div>
              </section>

              {medicalRecord.consultations.length ? (
                <div className="space-y-4">
                  {medicalRecord.consultations.map((consultation, index) => (
                    <MedicalRecordsConsultationCard
                      key={consultation.id}
                      consultation={consultation}
                      consultationNumber={
                        (selectedPet?.consultationsCount ??
                          medicalRecord.summary.totalConsultations) - index
                      }
                    />
                  ))}
                </div>
              ) : (
                <MedicalRecordsEmptyBlock message="Esta mascota aún no tiene consultas registradas." />
              )}
            </>
          ) : (
            <MedicalRecordsEmptyBlock message="Selecciona una mascota para ver su ficha clínica." />
          )}
        </div>
      </section>
    </section>
  );
}