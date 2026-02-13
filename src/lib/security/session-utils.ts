import type {User} from '$lib/server/db/schema/session';

export function getLoggedInUser(): User | null {
	return {
		id: '1',
		name: 'John Doe',
		emailVerified: true,
		email: 'a@a.co'
	}
}