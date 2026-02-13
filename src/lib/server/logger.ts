import pino from 'pino';
import { dev } from '$app/environment';
import { getLoggedInUser } from '$lib/security/session-utils';

export const log = pino({
	level: dev ? 'debug' : 'info',
	transport: dev ? { target: 'pino-pretty' } : undefined,
	mixin() {
		const user = getLoggedInUser()?.id;
		return { user: user };
	}
});
