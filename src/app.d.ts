// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { User, UserSession } from '$lib/server/db/schema/session';

declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').SessionValidationResult['user'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
		}

		// interface Error {}
		interface Locals {
			user: User,
			session: UserSession
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
