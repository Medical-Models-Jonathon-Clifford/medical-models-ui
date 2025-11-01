import { ValidBlocks } from './block';

export type DailyResourceCount = {
  date: string;
  newResources: number;
  runningTotal: number;
};

export type TotalResourceMetrics = {
  total: number;
  dailyCounts: DailyResourceCount[];
};

export type ModelRanking = {
  type: ValidBlocks;
  frequency: number;
};

export type NamedUserRanking = {
  name: string;
  frequency: number;
};

export type ViewCompanyDetailsDto = {
  id: string;
  name: string;
  locationState: string;
  logoFilename: string;
};

export type UserSearchResult = {
  id: string;
  name: string;
  email: string;
};

export type CompanySearchResult = {
  id: string;
  name: string;
  locationState: string;
};
