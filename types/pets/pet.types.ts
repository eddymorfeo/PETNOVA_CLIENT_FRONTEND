export type PetSex = "MALE" | "FEMALE" | "UNKNOWN";

export type PetItem = {
  id: string;
  clientId: string;
  name: string;
  speciesId?: string | null;
  breedId?: string | null;
  sex?: PetSex | null;
  birthDate?: string | null;
  color?: string | null;
  microchip?: string | null;
  isSterilized?: boolean | null;
  allergies?: string | null;
  notes?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PetsListResponse = {
  success: boolean;
  message: string;
  data?: PetItem[];
};

export type PetResponse = {
  success: boolean;
  message: string;
  data?: PetItem;
};

export type CreatePetPayload = {
  name: string;
  speciesId?: string | null;
  breedId?: string | null;
  sex?: PetSex | null;
  birthDate?: string | null;
  color?: string | null;
  microchip?: string | null;
  isSterilized?: boolean | null;
  allergies?: string | null;
  notes?: string | null;
};

export type SpeciesOption = {
  id: string;
  name: string;
};

export type BreedOption = {
  id: string;
  name: string;
  speciesId?: string | null;
};