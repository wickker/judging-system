import { error } from '@sveltejs/kit'
import { ROUTES_NO_AUTH } from '$lib/utils/constants/routes'
import useUserDto from '$lib/dtos/users'
import db from '$lib/db/database'
import type { Handle } from '@sveltejs/kit'
import { COOKIES } from '$lib/utils/constants/clientStorage'

const userDto = useUserDto(db)

export const handle: Handle = async ({ event, resolve }) => {
	// handle routes without authentication
	if (ROUTES_NO_AUTH.includes(event.url.pathname)) {
		return await resolve(event)
	}

	const clientToken = event.cookies.get(COOKIES.ADMIN)
	if (!clientToken) {
		throw error(400, {
			message: 'Failed to authenticate user',
		})
	}

  const user = await userDto.findByClientToken(clientToken)
  if (!user) {
    throw error(400, {
			message: 'Failed to authenticate user',
		})
  }

  if (user.clientTokenExpiry.getTime() <= Date.now()) {
    throw error(400, {
			message: 'User session expired, please login again',
		})
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event.locals as any).user = user
  
  return await resolve(event)
}
