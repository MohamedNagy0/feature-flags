export type Environment = 'development' | 'staging' | 'production';
export type StatusFilter = 'all' | 'enabled' | 'disabled';

export interface FeatureFlag {
  id: string;
  name: string;
  environment: Environment;
  enabled: boolean;
  createdAt: string;
}

export interface Filters {
  environment: Environment | 'all';
  status: StatusFilter;
}
