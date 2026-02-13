import {getLoggedInUser} from "$lib/security/session-utils";
import type {User} from "better-auth";
import {query} from "$app/server";

export const getUser = query(async (): Promise<User> => {
	return getLoggedInUser()!;
});
