export const REGEX = {
	// minimum 8 characters, at least one letter and one number
	PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
} as const
