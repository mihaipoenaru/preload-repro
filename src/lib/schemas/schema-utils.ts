import { z } from 'zod';
import { DateTime } from 'luxon';
import { eTags } from '$lib/errors/error-tags';

export const luxonDate = z.custom<DateTime<true>>((val) => val instanceof DateTime && val.isValid, {
	message: eTags.bad_datetime
});
