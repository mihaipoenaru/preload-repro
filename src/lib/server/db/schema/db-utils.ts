import { luxonTimestamp } from '$lib/server/db/custom-types';
import { sql } from 'drizzle-orm';
import { DateTime } from 'luxon';
import { char } from 'drizzle-orm/pg-core';
import { generate } from 'short-uuid';

export const tableBase = {
	createdAt: luxonTimestamp()
		.notNull()
		.default(sql`now()`),
	updatedAt: luxonTimestamp()
		.notNull()
		.default(sql`now()`)
		.$onUpdate(() => /* @__PURE__ */ DateTime.now())
};

export const publiclyVisible = {
	uuid: char({ length: 22 }).unique().notNull().$defaultFn(generate)
};