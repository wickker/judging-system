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
} 
