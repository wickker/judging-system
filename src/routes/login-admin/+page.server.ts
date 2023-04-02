import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import { fail, redirect } from '@sveltejs/kit'
import type { Action } from './$types'
import db from '$lib/db/database'
import { UserRegistrationFormSchema } from '$lib/types/user'
import { convertZodErrorsToFormErrorResp } from '$lib/utils/functions/commons'
import type { FormErrorResp } from '$lib/types/commons'
import { COOKIES } from '$lib/utils/constants/clientStorage'
import { ROUTES } from '$lib/utils/constants/routes'

const loginAdmin: Action = async ({ request, cookies }) => {
	const data = Object.fromEntries(await request.formData())
	const res = UserRegistrationFormSchema.safeParse(data)

	if (!res.success) {
		const errors = convertZodErrorsToFormErrorResp(res.error)
		return fail(400, { errors } as FormErrorResp)
	}

	const user = await db.user.findFirst({
		where: { email: res.data.email, deletedAt: null },
	})
	const isPasswordMatch = await bcrypt.compare(res.data.password, user?.hashedPassword || '')

	if (!user || !isPasswordMatch) {
		return fail(400, { message: 'Invalid credentials' })
	}

	const authenticatedUser = await db.user.update({
		where: { id: user.id },
		data: {
			clientToken: uuidv4(),
			clientTokenExpiry: DateTime.local().plus({ days: 1 }).toJSDate(),
		},
	})

  cookies.set(COOKIES.ADMIN, authenticatedUser.clientToken, {
    // send cookie for every page
    path: '/',
    // server side only cookie so you can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: 'strict',
    // only sent over HTTPS in production
    secure: import.meta.env.PROD, 
    // set cookie to expire after a month
    maxAge: 60 * 60 * 24,
  })

  throw redirect(302, ROUTES.HOME) // TODO: change this
}

export const actions = { default: loginAdmin }
