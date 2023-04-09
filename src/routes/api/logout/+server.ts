import { redirect, type RequestHandler } from '@sveltejs/kit'
import { COOKIES } from '$lib/utils/constants/clientStorage'
import { ROUTES } from '$lib/utils/constants/routes'
import useUserDto from '$lib/dtos/users'
import db from '$lib/db/database'
import type { User } from '@prisma/client'

const userDto = useUserDto(db)

export const GET: RequestHandler = async ({ cookies, locals }) => {
	cookies.set(COOKIES.ADMIN, '', {
		path: '/',
		expires: new Date(0),
	})

	if ('user' in locals) {
		await userDto.expireClientToken((locals.user as User).email)
	}

	throw redirect(302, ROUTES.HOME)
}
