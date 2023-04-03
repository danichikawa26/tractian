export interface IMetrics {
  totalCollectsUptime: number;
  totalUptime: number;
  lastUptimeAt: string;
}

export interface IAsset {
  assignedUserIds: number[];
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: number;
  name: string;
  image: string;
  specifications: {
    maxTemp: number;
    power?: number;
    rpm?: number;
  };
  metrics: IMetrics;
  unitId: number;
  companyId: number;
}
