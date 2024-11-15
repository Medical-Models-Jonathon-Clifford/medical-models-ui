export type Drug = {
  name: string;
  halfLife: number;
}

export const DRUG_HALF_LIVES: Drug[] = [
  { name: 'Paracetamol', halfLife: 12 },
  { name: 'Diazepam', halfLife: 4 },
  { name: 'Ibuprofen', halfLife: 2 },
  { name: 'Buprenorphine', halfLife: 16 },
  { name: 'Phenylephrine Hydrochloride', halfLife: 24 },
  { name: 'Benzydamine Hydrochloride', halfLife: 50 },
  { name: 'Esomeprazole Magnesium', halfLife: 30 },
  { name: 'Diclofenac', halfLife: 8 }
];

export function drugFromName(name: string) {
  return DRUG_HALF_LIVES.filter(drug => drug.name === name)[0];
}

export const DEFAULT_DRUG = DRUG_HALF_LIVES[0];
