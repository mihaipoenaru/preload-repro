import {form, query} from '$app/server';
import {type RemoteForm} from '@sveltejs/kit';
import {type Invoice} from '$lib/server/db/schema/property';
import {DateTime} from 'luxon';
import {invoiceSchema} from '$lib/schemas/property.schema';
import {z} from 'zod';

export const getInvoice = query(z.string(), async (invoiceId): Promise<Invoice> => {
	return {
		billedDate: DateTime.now()
	};
});

export const newInvoice = form(async () => {
});

export const getAllInvoices = query(async (): Promise<Invoice[]> => {
	return [{
		uuid: 'invuuid',
		billedDate: DateTime.now()
	}]
});

//todo remove the type
type IFT = z.infer<typeof invoiceSchema>;
export const editInvoice: RemoteForm<IFT, void> = form(invoiceSchema, async (data: IFT) => {
	console.log(data);
});

