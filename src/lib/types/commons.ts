export type FormErrors<T extends object> = {
	[key in keyof T]?: Array<string>
}

// export type FormErrorResp<T> = {
// 	errors?: FormErrors<T>
// 	errorMessage?: string
// }

// export type Form<T> = (T & FormErrorResp<T>) | null
