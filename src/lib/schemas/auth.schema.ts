import { z } from 'zod';
import { eTags } from '$lib/errors/error-tags';

export const signUpSchema = z
	.object({
		email: z.email(eTags.bad_email),
		_password: z
			.string()
			.min(8, eTags.min_length + '|8')
			.max(128, eTags.max_length + '|128')
			.regex(/[a-z]/, eTags.no_lowercase)
			.regex(/[A-Z]/, eTags.no_uppercase)
			.regex(/[0-9]/, eTags.no_number)
			.regex(/[^a-zA-Z0-9]/, eTags.no_symbol),
		_passConf: z.string()
	})
	.refine((data) => data._password === data._passConf, {
		message: eTags.passwords_no_match,
		path: ['_passConf']
	});
