export type FormErrors<T extends object> = {
	[key in keyof T]?: Array<string>
}

