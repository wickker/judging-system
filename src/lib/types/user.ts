import { z } from 'zod'
import { ZOD_ERROR_MESSAGES } from '$lib/utils/constants/errors'
import { REGEX } from '$lib/utils/constants/regex'

// Requests
export const UserRegistrationFormSchema = z.object({
	email: z.string().trim().min(1).email(),
	password: z
		.string()
		.trim()
		.regex(new RegExp(REGEX.PASSWORD), { message: ZOD_ERROR_MESSAGES.PASSWORD }),
})

// Responses

export type UserRegistrationForm = z.infer<typeof UserRegistrationFormSchema>