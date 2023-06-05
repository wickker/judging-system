<script lang="ts">
	import { onMount } from 'svelte'
	import type { FormErrors } from '$lib/types/commons'
	import { FormItem, InputText, InputPassword, Button } from '$lib/components/commons'
	import { LoginFormSchema, type LoginForm } from '$lib/types/user'
	import useForm from '$lib/utils/hooks/useForm'

	export let showPasswordHelper = true
	export let formFields: LoginForm = { email: '', password: '' }

	let errors: FormErrors<LoginForm> = {}
	let emailRef: HTMLInputElement | undefined = undefined

	const { validate, resetField } = useForm(formFields, LoginFormSchema)

	function handleSubmit() {
		errors = validate(errors)
		if (Object.keys(errors).length > 0) return
		// handle submit
		// invoke success CB
		// reset formFields
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

<Button isBlock color="indigo" on:click={handleSubmit}>Sign in</Button>
