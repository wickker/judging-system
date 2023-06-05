<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import type { FormErrors } from '$lib/types/commons'
	import { FormItem, InputText, InputPassword, Button } from '$lib/components/commons'
	import { LoginFormSchema, type LoginForm } from '$lib/types/user'
	import useForm from '$lib/utils/hooks/useForm'
  import { DEFAULT_FORM_VALUES } from '$lib/utils/constants/defaults'
  import { ROUTES } from '$lib/utils/constants/routes'

	export let buttonText: string = ''
	export let onSubmit: (data: LoginForm) => Promise<Response>

	let formFields: LoginForm = DEFAULT_FORM_VALUES.LOGIN_FORM
	let errors: FormErrors<LoginForm> = {}
	let emailRef: HTMLInputElement | undefined = undefined

	const { validate, resetField } = useForm(formFields, LoginFormSchema)

	$: showPasswordHelper = !(buttonText === "Sign up")
	$: buttonColor = showPasswordHelper ? "crimson" : "indigo" as "indigo" | "crimson"

	async function handleSubmit() {
		errors = validate(errors)
		if (Object.keys(errors).length > 0) return
		const res = await onSubmit(formFields)
		
		if (res.status >= 400) {
			const errorMessage = await res.json()
			console.log('error : ', errorMessage)
			// TODO: Show notification
			return
		}

		formFields = DEFAULT_FORM_VALUES.LOGIN_FORM
		goto(ROUTES.SESSIONS)
	}

	onMount(function () {
		emailRef?.focus()
	})
</script>

<FormItem label="Email" errorMessage={errors?.email?.[0] || ''}>
	<InputText
		bind:value={formFields.email}
		hasError={!!errors?.email}
		on:input={() => (errors = resetField(errors, 'email'))}
	/>
</FormItem>

<FormItem label="Password" errorMessage={errors?.password?.[0] || ''}>
	<InputPassword
		bind:value={formFields.password}
		hasError={!!errors?.password}
		on:input={() => (errors = resetField(errors, 'password'))}
	/>
	{#if showPasswordHelper}
		<div class="flex justify-end">
			<button class="text-sm text-blue-600" type="button">Forgot password?</button>
		</div>
	{/if}
</FormItem>

<Button isBlock color={buttonColor} on:click={handleSubmit}>{buttonText}</Button>
