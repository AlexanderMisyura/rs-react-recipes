export type SortKey = 'country' | 'population';

export type SortDirection = 1 | -1;

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}
