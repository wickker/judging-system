import { PUBLIC_VITE_GOOGLE_CLIENT_ID, PUBLIC_VITE_BASE_URL } from '$env/static/public'
import { ROUTES } from '$lib/utils/constants/routes'

export const GOOGLE_AUTH_OPTIONS = {
	client_id: PUBLIC_VITE_GOOGLE_CLIENT_ID,
	ux_mode: 'redirect',
	login_uri: `${PUBLIC_VITE_BASE_URL}${ROUTES.API.GOOGLE_AUTH}`,
} as const
