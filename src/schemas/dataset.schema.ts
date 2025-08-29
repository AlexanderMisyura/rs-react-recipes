import { z } from 'zod';

export const DataItemSchema = z.object({
  year: z.number(),
  population: z.number().optional(),
  co2: z.number().optional(),
  co2_per_capita: z.number().optional(),
  methane: z.number().optional(),
  oil_co2: z.number().optional(),
  temperature_change_from_co2: z.number().optional(),
});

export const DatasetEntrySchema = z
  .object({
    data: z.array(DataItemSchema),
    iso_code: z.string().optional(),
  })
  .strict();

export const DatasetSchema = z.record(z.string(), DatasetEntrySchema);

export const DatasetStoredEntrySchema = z.object({
  country: z.string(),
  data: z.array(DataItemSchema),
  iso_code: z.string().optional(),
});

export const DatasetStoredSchema = z.array(DatasetStoredEntrySchema);
