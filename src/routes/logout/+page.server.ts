import { COOKIES } from '$lib/utils/constants/clientStorage'
import { ROUTES } from '$lib/utils/constants/routes'
import type { Action } from './$types'
import { redirect } from '@sveltejs/kit'

export const load = async () => {
	throw redirect(302, ROUTES.HOME)
}

const logout: Action = async ({ cookies }) => {
	cookies.set(COOKIES.ADMIN, '', {
		path: '/',
		expires: new Date(0),
	})

	throw redirect(302, ROUTES.LOGIN_ADMIN)
}

export const actions = { default: logout }
