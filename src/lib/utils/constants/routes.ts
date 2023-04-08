export const ROUTES = {
	HOME: '/',
	REGISTER: '/register',
	LOGIN_ADMIN: '/login-admin',
	LOGIN_JUDGE: '/login-judge',
	SESSIONS: '/sessions',
	API: {
		GOOGLE_AUTH: '/api/google-auth',
		LOGOUT: '/api/logout',
	},
} as const

export const ROUTES_NO_AUTH: Array<string> = [
	ROUTES.HOME,
	ROUTES.REGISTER,
	ROUTES.LOGIN_ADMIN,
	ROUTES.LOGIN_JUDGE,
	ROUTES.API.GOOGLE_AUTH,
]
