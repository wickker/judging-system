import jwtDecode from 'jwt-decode'
import { redirect, type RequestHandler } from '@sveltejs/kit'
import { GoogleAuthSchema, GoogleAuthCredentialSchema } from '$lib/types/googleAuth'
import { ROUTES } from '$lib/utils/constants/routes'
import logger from '$lib/logger/logger'
import useUserDto from '$lib/dtos/users'
import db from '$lib/db/database'
import { COOKIES, COOKIE_CONFIGS } from '$lib/utils/constants/clientStorage'

const userDto = useUserDto(db)

// Handles JWT response from google auth
// Used at /register and /login-admin
export const POST: RequestHandler = async ({ request, cookies, url }) => {
	const data = Object.fromEntries(await request.formData())
	const dataRes = GoogleAuthSchema.safeParse(data)
	const origin = url.searchParams.get('origin') || ROUTES.HOME

	if (!dataRes.success) {
		logger.error(`Invalid google authentication response : ${dataRes.error.errors}`)
		throw redirect(302, origin)
	}

	const cookieCsrfToken = cookies.get('g_csrf_token')
	if (!cookieCsrfToken) {
		logger.error('Invalid cookie csrf token')
		throw redirect(302, origin)
	}

	if (cookieCsrfToken !== dataRes.data.g_csrf_token) {
		logger.error(`Csrf tokens do not match : ${cookieCsrfToken}, ${dataRes.data.g_csrf_token}`)
		throw redirect(302, origin)
	}

	const credential = jwtDecode(dataRes.data.credential)
	const credRes = GoogleAuthCredentialSchema.safeParse(credential)

	if (!credRes.success) {
		logger.error(`Invalid google authentication credential : ${credRes.error.errors}`)
		throw redirect(302, origin)
	}

	const user = await userDto.upsertByEmail(credRes.data.email)

	cookies.set(COOKIES.ADMIN, user.clientToken, COOKIE_CONFIGS.ADMIN)

	throw redirect(302, `${ROUTES.SESSIONS}?token=${user.clientToken}`)
}
