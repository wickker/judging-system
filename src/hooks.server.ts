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
		if (clientToken && ROUTES_REDIRECT_ON_AUTH.includes(event.url.pathname)) {
			event = await injectUser(clientToken, event)
			return new Response('Redirect', { status: 303, headers: { location: ROUTES.SESSIONS } })
		}
		return await resolve(event)
	}

	if (!clientToken) {
		// handle google login
		if (event.url.pathname === ROUTES.SESSIONS && event.url.searchParams.get('token')) {
			const isSuccess = await handleGoogleLogin(event)
			if (!isSuccess) {
				throw error(400, {
					message: 'Failed to authenticate user via google',
				})
			}
			return await resolve(event)
		}
		return new Response('Redirect', { status: 303, headers: { location: ROUTES.HOME } })
	}

	event = await injectUser(clientToken, event)

	return await resolve(event) 
}

const handleGoogleLogin = async (
	event: RequestEvent<Partial<Record<string, string>>, string | null>
) => {
	const token = event.url.searchParams.get('token')
	if (!token) return false
	const exists = await userDto.clientTokenExists(token)
	if (!exists) return false
	return true
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
