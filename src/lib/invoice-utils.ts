import type { Invoice, Property } from '$lib/server/db/schema/property';

export function generateInvoiceId(invoice: Invoice & { property: Property | null }) {
	return `${invoice.property!.propCode}/${invoice.billedDate.toFormat('yyyy-MM')}`;
}
