import bcrypt from 'bcryptjs'
import { fail } from '@sveltejs/kit'
import type { Action } from './$types'
import db from '$lib/db/database'
import { UserRegistrationFormSchema } from '$lib/types/user'

// export const load = async () => {}

const register: Action = async ({ request }) => {
	const data = Object.fromEntries(await request.formData())
  console.log('data : ', data)
	const res = UserRegistrationFormSchema.safeParse(data)
  console.log('res : ', res)

	if (!res.success) {
		const errors = res.error.errors.map((e) => {
			return {
				field: e.path[0],
				message: e.message,
			}
		})
    console.log(errors)
		return fail(400, { error: true, errors })
	}

	// const user = await db.user.findFirst({
	// 	where: { email: email as string },
	// })

	// if (!user) {
	// 	// create user
	// }
}

export const actions = { register }
