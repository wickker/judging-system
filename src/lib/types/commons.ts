export type FormErrorResp = {
	errors?: Record<string, Array<string>> // field name, array of error messages
	errorMessage?: string
}

export type Form<T> = (T & FormErrorResp) | null
