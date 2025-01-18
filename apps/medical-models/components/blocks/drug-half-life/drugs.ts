export type Drug = {
  name: string;
  halfLife: number;
};

export const DRUG_HALF_LIVES: Drug[] = [
  { name: 'Paracetamol', halfLife: 12 },
  { name: 'Diazepam', halfLife: 4 },
  { name: 'Ibuprofen', halfLife: 2 },
  { name: 'Buprenorphine', halfLife: 16 },
  { name: 'Phenylephrine Hydrochloride', halfLife: 24 },
  { name: 'Benzydamine Hydrochloride', halfLife: 50 },
  { name: 'Esomeprazole Magnesium', halfLife: 30 },
  { name: 'Diclofenac', halfLife: 8 },
  { name: 'Ventolin', halfLife: 0.5 },
  { name: 'Sudocrem', halfLife: 6 },
  { name: 'Minoxidil', halfLife: 3 },
  { name: 'Finasteride', halfLife: 40 },
  { name: 'Testosterone Cipionate', halfLife: 38 },
  { name: 'Human Growth Hormone', halfLife: 27 },
  { name: 'Ozempic', halfLife: 14 },
  { name: 'Cisplatin', halfLife: 23 },
  { name: 'Nicotine', halfLife: 2 },
  { name: 'Germolene', halfLife: 5 },
  { name: 'Lysergic acid diethylamide', halfLife: 3.6 },
  { name: 'Zoledronic acid', halfLife: 6 },
];

export function drugFromName(name: string) {
  return DRUG_HALF_LIVES.filter((drug) => drug.name === name)[0];
}

export const DEFAULT_DRUG = DRUG_HALF_LIVES[0];
