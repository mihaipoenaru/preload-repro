import type { Transport } from '@sveltejs/kit';
import { DateTime } from 'luxon';
import { browser } from '$app/environment';

export const transport: Transport = {
	DateTime: {
		encode: (value) => value instanceof DateTime && value.toUTC().toISO(),

		decode: (value) => {
			const dt = DateTime.fromISO(value, { zone: 'utc' });
			return browser ? dt.toLocal() : dt;
		}
	}
};
