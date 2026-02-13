import { defineRelations } from 'drizzle-orm';
import * as schema from '$lib/server/db/schema';

export const relations = defineRelations(schema, (r) => ({
	user: {
		sessions: r.many.session(),
		accounts: r.many.account(),
		properties: r.many.properties()
	},
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id
		})
	},
	account: {
		user: r.one.user({
			from: r.account.userId,
			to: r.user.id
		})
	},

	//--------------property
	properties: {
		invoices: r.many.invoices(),
		owner: r.one.user({
			from: r.properties.userId,
			to: r.user.id
		})
	},
	invoices: {
		property: r.one.properties({
			from: r.invoices.propertyId,
			to: r.properties.id
		})
	}
}));
