export type FormErrors<T> = Record<keyof T, Array<string>>

export type FormErrorResp<T> = {
	errors?: FormErrors<T>
	errorMessage?: string
}

export type Form<T> = (T & FormErrorResp<T>) | null
