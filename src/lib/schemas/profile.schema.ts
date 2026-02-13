import { z } from 'zod';
import { eTags } from '$lib/errors/error-tags';

const name = z
	.string()
	.min(1, eTags.min_length + '1')
	.max(128, eTags.max_length + '128');

export const profileSchema = z.object({
	name,
	surname: name
});
