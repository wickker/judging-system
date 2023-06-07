export const ROUTES = {
	HOME: '/',
	REGISTER: '/register',
	LOGIN_ADMIN: '/login-admin',
	LOGIN_JUDGE: '/login-judge',
	SESSIONS: '/sessions',
	COMPETITIONS: '/competitions',
	API: {
		GOOGLE_AUTH: '/api/google-auth',
		LOGOUT: '/api/logout',
		COMPETITIONS: '/api/competitions',
		REGISTER: '/api/register',
		LOGIN_ADMIN: '/api/login-admin',
	},
} as const

export const ROUTES_NO_AUTH: Array<string> = [
	ROUTES.HOME,
	ROUTES.REGISTER,
	ROUTES.LOGIN_ADMIN,
	ROUTES.LOGIN_JUDGE,
	ROUTES.API.GOOGLE_AUTH,
	ROUTES.API.REGISTER,
	ROUTES.API.LOGIN_ADMIN,
]

export const ROUTES_REDIRECT_ON_AUTH: Array<string> = [
	ROUTES.HOME,
	ROUTES.REGISTER,
	ROUTES.LOGIN_ADMIN,
	ROUTES.LOGIN_JUDGE,
]
