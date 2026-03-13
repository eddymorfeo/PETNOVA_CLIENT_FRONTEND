import { PetEditForm } from "./pet-edit-form";

export function PetEditPage({ petId }: { petId: string }) {
  return <PetEditForm petId={petId} />;
}