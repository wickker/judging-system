import { error } from '@sveltejs/kit'
import { ROUTES, ROUTES_NO_AUTH, ROUTES_REDIRECT_ON_AUTH } from '$lib/utils/constants/routes'
import useUserDto from '$lib/dtos/users'
import db from '$lib/db/database'
import type { Handle, RequestEvent } from '@sveltejs/kit'
import { COOKIES } from '$lib/utils/constants/clientStorage'
import logger from '$lib/logger/logger'

const userDto = useUserDto(db)

export const handle: Handle = async ({ event, resolve }) => {
	const clientToken = event.cookies.get(COOKIES.ADMIN)

	if (ROUTES_NO_AUTH.includes(event.url.pathname)) {
		// case: route does not require auth, cookie token is valid hence redirect to sessions
		if (clientToken && ROUTES_REDIRECT_ON_AUTH.includes(event.url.pathname)) {
			await injectUser(clientToken, event)
			return new Response('Redirect', { status: 303, headers: { location: ROUTES.SESSIONS } })
		}

		// case: route does not require auth and no valid cookie token
		return await resolve(event)
	}

	if (!clientToken) {
		// case: route requires auth, no valid cookie token and google login / sign in
		const token = event.url.searchParams.get('token')
		if (event.url.pathname === ROUTES.SESSIONS && token) {
			const user = await userDto.clientTokenExists(token)
			if (!user) {
				throw error(400, {
					message: 'Failed to authenticate user via google',
				})
			}
			event.locals.user = user
			return await resolve(event)
		}

		// case: route requries auth but no valid cookie token hence redirect to login
		return new Response('Redirect', { status: 303, headers: { location: ROUTES.HOME } })
	}

	// case: route requires auth and there is a valid cookie token
	event = await injectUser(clientToken, event)

	return await resolve(event)
}

const injectUser = async (
	clientToken: string,
	event: RequestEvent<Partial<Record<string, string>>, string | null>
) => {
	const user = await userDto.findByClientToken(clientToken)
	if (!user) {
		logger.error(`Unable to find user [ClientToken: ${clientToken}]`)
		throw error(400, {
			message: 'Failed to authenticate user',
		})
	}

	if (user.clientTokenExpiry.getTime() <= Date.now()) {
		logger.error(`User session expired [User: ${user.email}]`)
		throw error(400, {
			message: 'User session expired, please login again',
		})
	}

	event.locals.user = user
	return event
}
