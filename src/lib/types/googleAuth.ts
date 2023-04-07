import { z } from 'zod'

// Requests

// Responses
export const GoogleAuthSchema = z.object({
	clientId: z.string().optional(),
	credential: z.string(),
	g_csrf_token: z.string(),
	select_by: z.string().optional(),
	client_id: z.string().optional(),
})

export const GoogleAuthCredentialSchema = z.object({
	iss: z.string().optional(),
	nbf: z.number().optional(),
	aud: z.string().optional(),
	sub: z.string().optional(),
	hd: z.string().optional(),
	email: z.string().email(),
	email_verified: z.boolean().optional(),
	azp: z.string().optional(),
	name: z.string().optional(),
	picture: z.string().optional(),
	given_name: z.string().optional(),
	iat: z.number().optional(),
	exp: z.number().optional(),
	jti: z.string().optional(),
})
