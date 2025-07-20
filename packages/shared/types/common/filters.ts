// Filter Types - Common across all filterable endpoints
export interface BaseFilter {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like' | 'ilike';
  value: string | number | boolean | (string | number)[];
}

export interface DateRangeFilter {
  field: string;
  startDate: string;
  endDate: string;
}

export interface GeoFilter {
  field: string;
  lat: number;
  lng: number;
  radius: number; // in kilometers
}

export interface SearchFilter {
  query: string;
  fields: string[];
  fuzzy?: boolean;
}

export interface CompositeFilter {
  operator: 'and' | 'or' | 'not';
  filters: (BaseFilter | CompositeFilter)[];
}

export type Filter = BaseFilter | DateRangeFilter | GeoFilter | SearchFilter | CompositeFilter; 