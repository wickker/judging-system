import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import { fail, redirect } from '@sveltejs/kit'
import type { Action } from './$types'
import db from '$lib/db/database'
import { UserRegistrationFormSchema } from '$lib/types/user'
import { convertZodErrorsToFormErrorResp } from '$lib/utils/functions/commons'
import type { FormErrorResp } from '$lib/types/commons'
import { ROUTES } from '$lib/utils/constants/routes'

// export const load = async () => {}

const register: Action = async ({ request }) => {
	const data = Object.fromEntries(await request.formData())
	const res = UserRegistrationFormSchema.safeParse(data)

	if (!res.success) {
		const errors = convertZodErrorsToFormErrorResp(res.error)
		return fail(400, { errors } as FormErrorResp)
	}

	const user = await db.user.findFirst({
		where: { email: res.data.email, deletedAt: null },
	})

	if (user) {
		return fail(400, { errors: { email: ['User already exists'] } } as FormErrorResp)
	}

	await db.user.create({
		data: {
			email: res.data.email,
			hashedPassword: bcrypt.hashSync(res.data.password, 11),
			clientToken: uuidv4(),
			clientTokenExpiry: DateTime.local().plus({ days: 1 }).toJSDate(),
		},
	})

	throw redirect(303, ROUTES.LOGIN_ADMIN)
}

export const actions = { register }
