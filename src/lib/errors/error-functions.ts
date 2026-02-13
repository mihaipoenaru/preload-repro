import { error } from '@sveltejs/kit';

export function error404() {
	return error(404);
}