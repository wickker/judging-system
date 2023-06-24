import bcrypt from 'bcryptjs'
import { json, error, type RequestHandler } from '@sveltejs/kit'
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
		logger.error(`Unable to zod parse login data : ${JSON.stringify(parsed.error.errors)}`)
		throw error(400, { message: 'Invalid data format' })
	}

	const user = await userDto.findByEmail(data.email)
	const isPasswordMatch = await bcrypt.compare(data.password, user?.hashedPassword || '')

	if (!user || !isPasswordMatch) {
		logger.error(`Unable to find user or match password [User: ${data.email}]`)
		throw error(400, {
			message: 'Invalid credentials',
		})
	}

	const authenticatedUser = await userDto.updateClientTokenAndExpiry(user.id)

	cookies.set(COOKIES.ADMIN, authenticatedUser.clientToken, COOKIE_CONFIGS.ADMIN)

	return json(null)
}
