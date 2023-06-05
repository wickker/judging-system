import bcrypt from 'bcryptjs'
import { fail, redirect } from '@sveltejs/kit'
import type { Action } from './$types'
import db from '$lib/db/database'
import { LoginFormSchema, type LoginForm } from '$lib/types/user'
import { COOKIES, COOKIE_CONFIGS } from '$lib/utils/constants/clientStorage'
import { ROUTES } from '$lib/utils/constants/routes'
import useUserDto from '$lib/dtos/users'

const userDto = useUserDto(db)

const loginAdmin: Action = async ({ request, cookies }) => {
	console.log('data : ', request)
	// const data = Object.fromEntries(await request.formData())
	// const res = LoginFormSchema.safeParse(data)

	// if (!res.success) {
	// 	const errors = convertZodErrorsToFormErrorResp(res.error)
	// 	return fail(400, { errors } satisfies FormErrorResp<LoginForm>)
	// }

	// const user = await userDto.findByEmail(res.data.email)
	// const isPasswordMatch = await bcrypt.compare(res.data.password, user?.hashedPassword || '')

	// if (!user || !isPasswordMatch) {
	// 	return fail(400, {
	// 		errorMessage: 'Invalid credentials',
	// 	} satisfies FormErrorResp<LoginForm>)
	// }

	// const authenticatedUser = await userDto.updateClientTokenAndExpiry(user.id)

	// cookies.set(COOKIES.ADMIN, authenticatedUser.clientToken, COOKIE_CONFIGS.ADMIN)

	// throw redirect(302, ROUTES.SESSIONS)
}

export const actions = { default: loginAdmin }
