import { form } from '$app/server';
import { profileSchema } from '$lib/schemas/profile.schema';
import { log } from '$lib/server/logger';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';

export const updateProfile = form(profileSchema, async (data) => {
});
