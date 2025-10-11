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
  type: string;
  frequency: number;
};

export type NamedUserRanking = {
  name: string;
  frequency: number;
};
