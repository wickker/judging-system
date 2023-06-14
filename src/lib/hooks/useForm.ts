import { get, writable } from 'svelte/store'
import type { ZodIssue, z } from 'zod'

type UseFormProps<T, K> = {
	schema: z.Schema<T>
	defaultValues: T
	route: string
	successCB?: (data?: K) => void
	errorCB?: () => void
	method?: string
}

export type FormErrors<T extends object> = {
	[key in keyof T]?: string
}

export type FormRefs<T extends object> = {
	[key in keyof T]?: HTMLInputElement
}

export const useForm = <T extends object, K>({
	schema,
	defaultValues,
	route,
	successCB,
	errorCB,
	method = 'post',
}: UseFormProps<T, K>) => {
	const form: T = structuredClone(defaultValues)
	const refs: FormRefs<T> = {}
	const errors = writable<FormErrors<T>>({})
	const isLoading = writable<boolean>(false)
	const formProxy = new Proxy(form, {
		set(target, key, value) {
			resetFieldError(target, key, value)
			return Reflect.set(target, key, value)
		},
	})

	const resetFieldError = (
		target: T,
		key: string | symbol,
		newValue: string | number | boolean | Array<string | number | boolean>
	) => {
		const formKey = key as keyof T
		if (!(formKey in get(errors))) return

		const parsed = schema.safeParse({ ...target, [key]: newValue })

		if (parsed.success) {
			errors.set({ ...get(errors), [formKey]: undefined })
			return
		}

		const formKeysWithErrors = parsed.error.issues.map((issue) => issue.path[0].toString())

		if (!formKeysWithErrors.includes(formKey as string)) {
			errors.set({ ...get(errors), [formKey]: undefined })
		}
	}

	const submitRequest = async (data: T) =>
		await fetch(route, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

	const handleParseErrors = (zodErrors: Array<ZodIssue>) => {
		const errorMap: FormErrors<T> = {}
		let firstErrorKey: keyof T | undefined = undefined

		for (const e of zodErrors) {
			const fieldName = e.path[0].toString() as keyof T
			errorMap[fieldName] = e.message
			if (!firstErrorKey) {
				firstErrorKey = fieldName
			}
		}

		errors.set(errorMap)
		if (firstErrorKey && refs[firstErrorKey]) {
			refs[firstErrorKey]?.focus()
		}
		isLoading.set(false)
	}

	const resetForm = () => {
		for (const key in form) {
			form[key] = defaultValues[key]
		}
		errors.set({})
	}

	const onSubmit = async () => {
		isLoading.set(true)
		const parsed = schema.safeParse(form)

		if (!parsed.success) {
			handleParseErrors(parsed.error.errors)
			return
		}

		const response = await submitRequest(parsed.data)

		if (response.status >= 400) {
			const errorMessage = await response.json()
			console.error('error : ', errorMessage) // TODO: Show notification
			errorCB && errorCB()
			isLoading.set(false)
			return
		}

		const data = await response.json()
		successCB && successCB(data)
		isLoading.set(false)
		resetForm()
	}

	return {
		form: formProxy,
		refs,
		errors,
		onSubmit,
		isLoading,
	}
}
