import { z } from 'zod';
import type { InvoiceIns, PropertyIns } from '$lib/server/db/schema/property';
import { eTags } from '$lib/errors/error-tags';

export const invoiceSchema = z.object({
	gas: z.number().nullable(),
	electricity: z.number().nullable(),
	maintenance: z.number().nullable(),
	telco: z.number().nullable(),
	emittedAt: z.any(),
	billedDate: z.any()
}) satisfies z.ZodType<Partial<InvoiceIns>>;

export const propertySchema = z.object({
	name: z
		.string(eTags.generic_missing_field)
		.min(3)
		.refine((val) => val !== 'Proprietate nouă', {
			message: eTags.generic_missing_field
		})
}) satisfies z.ZodType<Partial<PropertyIns>>;
