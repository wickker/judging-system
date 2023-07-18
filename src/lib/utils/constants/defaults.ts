import { DateTime } from 'luxon'

export const DEFAULT_FORM_VALUES = {
	LOGIN_FORM: {
		email: '',
		password: '',
	},
	COMPETITION_FORM: {
		name: '',
		year: DateTime.local().year,
	},
	JUDGE_FORM: {
		name: '',
		email: '',
	},
} as const
