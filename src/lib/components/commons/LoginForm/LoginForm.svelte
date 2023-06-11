<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import type { FormErrors } from '$lib/types/commons'
	import { FormItem, InputText, InputPassword, Button } from '$lib/components/commons'
	import { LoginFormSchema, type LoginForm } from '$lib/types/user'
  import { DEFAULT_FORM_VALUES } from '$lib/utils/constants/defaults'
  import { ROUTES } from '$lib/utils/constants/routes'
	import { handleSubmit, resetField } from '$lib/utils/functions/form'

	export let buttonText: string = ''
	export let route: string = ''

	let formFields: LoginForm = DEFAULT_FORM_VALUES.LOGIN_FORM
	let errors: FormErrors<LoginForm> = {}
	let emailRef: HTMLInputElement | undefined = undefined

	$: showPasswordHelper = !(buttonText === "Sign up")
	$: buttonColor = showPasswordHelper ? "crimson" : "indigo" as "indigo" | "crimson"

	function successCB() {
		formFields = DEFAULT_FORM_VALUES.LOGIN_FORM
		goto(ROUTES.SESSIONS)
	}

	async function handleSubmitForm() {
		errors = await handleSubmit(formFields, errors, LoginFormSchema, route, successCB)
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

<Button isBlock color={buttonColor} on:click={handleSubmitForm}>{buttonText}</Button>
