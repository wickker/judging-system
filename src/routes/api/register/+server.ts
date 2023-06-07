import { error, type RequestHandler } from '@sveltejs/kit'
import db from '$lib/db/database'
import useUserDto from '$lib/dtos/users'
import { LoginFormSchema } from '$lib/types/user'
import { COOKIE_CONFIGS, COOKIES } from '$lib/utils/constants/clientStorage'
import logger from '$lib/logger/logger'

const userDto = useUserDto(db)

export const POST: RequestHandler = async ({ request, cookies }) => {
	const data = await request.json()

	const parsed = LoginFormSchema.safeParse(data)
	if (!parsed.success) {
		logger.error(`Unable to zod parse sign up data : ${JSON.stringify(parsed.error.errors)}`)
		throw error(400, { message: 'Invalid data format' })
	}

	const user = await userDto.findByEmail(data.email)
	if (user) {
		logger.error(`User ${data.email} already exists`)
		throw error(400, { message: 'User email already exists' })
	}

	const newUser = await userDto.create(data.email, data.password)

	cookies.set(COOKIES.ADMIN, newUser.clientToken, COOKIE_CONFIGS.ADMIN)

	return new Response(null, { status: 204 })
}
