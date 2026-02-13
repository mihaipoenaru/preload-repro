import { customType } from 'drizzle-orm/pg-core';
import { DateTime } from 'luxon';

export const luxonTimestamp = customType<{
	data: DateTime<true>;
	driverData: string;
}>({
	dataType() {
		return 'timestamp';
	},

	toDriver(value: DateTime<true>) {
		return value.toUTC().toISO();
	},

	fromDriver(value: string): DateTime<true> {
		const dt = DateTime.fromSQL(value, { zone: 'utc' });
		if (!dt.isValid) throw new Error(`Invalid date format from DB ${value}`);
		return dt;
	}
});
