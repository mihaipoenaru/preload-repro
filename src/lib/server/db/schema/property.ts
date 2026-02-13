import { integer, pgEnum, pgTable, real, text } from 'drizzle-orm/pg-core';
import { luxonTimestamp } from '$lib/server/db/custom-types';
import { publiclyVisible, tableBase } from '$lib/server/db/schema/db-utils';
import { user } from '$lib/server/db/schema/session';

export const invoiceStatus = pgEnum('status', ['created', 'sent', 'paid']);

export const properties = pgTable('properties', {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	name: text().notNull(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	propCode: text()
		.notNull()
		.unique()
		.$defaultFn(() => generateAlphanumeric(4)),
	...tableBase,
	...publiclyVisible
});

export const invoices = pgTable('invoices', {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	emittedAt: luxonTimestamp(),
	billedDate: luxonTimestamp().notNull(),
	status: invoiceStatus(),
	propertyId: integer()
		.notNull()
		.references(() => properties.id, { onDelete: 'cascade' }),
	gas: real(),
	electricity: real(),
	maintenance: real(),
	...tableBase,
	...publiclyVisible
});

const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateAlphanumeric(length: number): string {
	return Array.from(crypto.getRandomValues(new Uint8Array(length)))
		.map((x) => ALPHANUMERIC[x % ALPHANUMERIC.length])
		.join('');
}

export type Property = typeof properties.$inferSelect;
export type PropertyIns = typeof properties.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type InvoiceIns = typeof invoices.$inferInsert;
