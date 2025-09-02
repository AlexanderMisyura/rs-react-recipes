import type {
  DataItemSchema,
  DatasetEntrySchema,
  DatasetSchema,
  DatasetStoredEntrySchema,
  DatasetStoredSchema,
} from '@schemas';
import type { z } from 'zod';

export type DataItem = z.infer<typeof DataItemSchema>;

export type DatasetEntry = z.infer<typeof DatasetEntrySchema>;

export type Dataset = z.infer<typeof DatasetSchema>;

export type DatasetStoredEntry = z.infer<typeof DatasetStoredEntrySchema>;

export type DatasetStored = z.infer<typeof DatasetStoredSchema>;
