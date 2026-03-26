"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import type { PetItem } from "@/types/pets/pet.types";

export type PetTableRow = PetItem;

function formatSex(value?: string | null) {
  if (value === "MALE") return "Macho";
  if (value === "FEMALE") return "Hembra";
  return "No informado";
}

function formatSterilized(value?: boolean | null) {
  if (value === true) return "Sí";
  if (value === false) return "No";
  return "No informado";
}

function formatBirthDate(value?: string | null) {
  if (!value) return "No informada";

  const trimmedValue = value.trim();

  if (/^\d{2}-\d{2}-\d{4}$/.test(trimmedValue)) {
    return trimmedValue;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
    const [year, month, day] = trimmedValue.split("-");
    return `${day}-${month}-${year}`;
  }

  const parsedDate = new Date(trimmedValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return "No informada";
  }

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${day}-${month}-${year}`;
}

function formatText(value?: string | null, fallback = "No informado") {
  if (!value) return fallback;
  const trimmedValue = value.trim();
  return trimmedValue || fallback;
}

type CreatePetColumnsParams = {
  deletingPetId: string | null;
  onDelete: (petId: string, petName: string) => void;
};

export function createPetColumns({
  deletingPetId,
  onDelete,
}: CreatePetColumnsParams): ColumnDef<PetTableRow>[] {
  return [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="min-w-0">
          <div className="font-medium leading-tight text-slate-900 line-clamp-1">
            {row.original.name ?? "—"}
          </div>
          <div className="text-xs text-muted-foreground line-clamp-1">
            {formatSex(row.original.sex)}
          </div>
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "color",
      header: "Color",
      accessorFn: (row) => formatText(row.color),
      cell: ({ row }) => (
        <span className="text-sm text-slate-700">
          {formatText(row.original.color)}
        </span>
      ),
      enableSorting: true,
    },
    {
      id: "isSterilized",
      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Esterilización
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      accessorFn: (row) => formatSterilized(row.isSterilized),
      cell: ({ row }) => (
        <span className="text-sm text-slate-700">
          {formatSterilized(row.original.isSterilized)}
        </span>
      ),
      enableSorting: true,
    },
    {
      id: "birthDate",
      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha nacimiento
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      accessorKey: "birthDate",
      sortingFn: (rowA, rowB) => {
        const valueA = rowA.original.birthDate
          ? new Date(rowA.original.birthDate).getTime()
          : 0;
        const valueB = rowB.original.birthDate
          ? new Date(rowB.original.birthDate).getTime()
          : 0;

        return valueA - valueB;
      },
      cell: ({ row }) => (
        <span className="text-sm text-slate-700">
          {formatBirthDate(row.original.birthDate)}
        </span>
      ),
      enableSorting: true,
    },
    {
      id: "allergies",
      header: "Alergias",
      accessorFn: (row) => formatText(row.allergies, "No registradas"),
      cell: ({ row }) => (
        <div className="max-w-[180px] truncate text-sm text-slate-700">
          {formatText(row.original.allergies, "No registradas")}
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "notes",
      header: "Observaciones",
      accessorFn: (row) => formatText(row.notes, "Sin observaciones"),
      cell: ({ row }) => (
        <div className="max-w-[220px] truncate text-sm text-slate-700">
          {formatText(row.original.notes, "Sin observaciones")}
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "status",
      header: "Estado",
      accessorFn: (row) => (row.isActive ? "Activa" : "Inactiva"),
      cell: ({ row }) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            row.original.isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {row.original.isActive ? "Activa" : "Inactiva"}
        </span>
      ),
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Acciones",
      enableHiding: false,
      cell: ({ row }) => {
        const pet = row.original;
        const isDeleting = deletingPetId === pet.id;

        return (
          <TooltipProvider delayDuration={120}>
            <div className="flex items-center justify-end gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    type="button"
                    variant="outline"
                    className="h-9 rounded-xl border-slate-200"
                  >
                    <Link href={`/home/pets/${pet.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-xl border border-slate-200 bg-slate-950 px-3 py-1.5 text-xs font-medium text-white shadow-lg"
                >
                  <p>Editar</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isDeleting}
                    onClick={() => onDelete(pet.id, pet.name)}
                    className="h-9 w-9 rounded-xl border-rose-200 p-0 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    aria-label={
                      isDeleting
                        ? `Eliminando mascota ${pet.name}`
                        : `Eliminar mascota ${pet.name}`
                    }
                    title={isDeleting ? "Eliminando..." : "Eliminar"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-xl border border-slate-200 bg-slate-950 px-3 py-1.5 text-xs font-medium text-white shadow-lg"
                >
                  <p>Eliminar</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        );
      },
    },
  ];
}
