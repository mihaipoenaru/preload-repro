import {form, getRequestEvent, query} from '$app/server';
import {z} from 'zod';
import {properties, type Property} from '$lib/server/db/schema/property';
import {log} from '$lib/server/logger';
import {getUser} from '$lib/remotes/auth.remote';
import {db} from '$lib/server/db';
import {propertySchema} from '$lib/schemas/property.schema';
import {error404} from '$lib/errors/error-functions';
import {and, eq} from 'drizzle-orm';
import {getLoggedInUser} from '$lib/security/session-utils';

export const getProperty = query(z.string(), async (uuid): Promise<Property> => {
	return {
		uuid:'propuuid'
	}
});

export const getAllProperties = query(async (): Promise<Property[]> => {
	log.info('Getting all properties');

	return  [{
		name: 'property',
		id: 101,
		propCode: 'pcd',
		uuid:'blablabla',
	}];
});

export const newProperty = form(async () => {
});

export const editProperty = form(propertySchema, async (data) => {
});

async function getLatestNewPropNr(uid: string): Promise<number | undefined> {
}

async function getUid() {
	return (await getUser()).id;
}

function getPropUuid() {
	return getRequestEvent().params.propId;
}

async function getVerifiedUuid() {
	const uuid = getPropUuid() ?? error404();
	const count = await db.$count(
		properties,
		and(eq(properties.uuid, uuid), eq(properties.userId, getLoggedInUser()?.id ?? ''))
	);

	if (count === 0) error404();
	return uuid;
}
