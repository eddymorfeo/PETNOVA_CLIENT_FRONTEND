import { PetEditPage } from "@/components/pages/pets/pet-edit-page";

export default async function HomePetEditPage({
  params,
}: {
  params: Promise<{ petId: string }>;
}) {
  const { petId } = await params;

  return <PetEditPage petId={petId} />;
}