import { fail, redirect } from '@sveltejs/kit'
import type { Action } from './$types'
import db from '$lib/db/database'
import { UserRegistrationFormSchema } from '$lib/types/user'
import { convertZodErrorsToFormErrorResp } from '$lib/utils/functions/commons'
import type { FormErrorResp } from '$lib/types/commons'
import { ROUTES } from '$lib/utils/constants/routes'
import useUserDto from '$lib/dtos/users'

const userDto = useUserDto(db)

const register: Action = async ({ request }) => {
	const data = Object.fromEntries(await request.formData())
	const res = UserRegistrationFormSchema.safeParse(data)

	if (!res.success) {
		const errors = convertZodErrorsToFormErrorResp(res.error)
		return fail(400, { errors } as FormErrorResp)
	}

	const user = await userDto.findByEmail(res.data.email)
	if (user) {
		return fail(400, { errors: { email: ['User already exists'] } } as FormErrorResp)
	}

	await userDto.create(res.data.email, res.data.password)

	throw redirect(302, ROUTES.LOGIN_ADMIN)
}

export const actions = { default: register }
