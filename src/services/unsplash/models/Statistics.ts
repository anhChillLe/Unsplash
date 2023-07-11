export interface Statistics {
  id: string;
  slug: string;
  downloads: Statistic;
  views: Statistic;
  likes: Statistic;
}

export interface Historical {
  change: number;
  resolution: string;
  quantity: number;
  values: Value[];
}

export interface Statistic {
  total: number;
  historical: Historical;
}

export interface Value {
  date: string;
  value: number;
}
