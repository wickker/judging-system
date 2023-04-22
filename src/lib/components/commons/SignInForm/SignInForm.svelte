<script lang="ts">
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import type { Form } from '$lib/types/commons'
	import { Input, FormItem, Button, InputPassword } from '$lib/components/commons'
	import type { UserRegistrationForm } from '$lib/types/user'
	import { resetError } from '$lib/utils/functions/commons'

	export let form: Form<UserRegistrationForm> = null
	export let buttonText = ''
	export let buttonColor: 'crimson' | 'indigo' = 'crimson'
	export let showPasswordHelper = false

	let emailRef: HTMLInputElement | undefined = undefined

	function reset(s: keyof UserRegistrationForm) {
		if (form?.errors) {
			form.errors = resetError(form.errors, s)
		}
	}

	onMount(() => {
		emailRef?.focus()
	})
</script>

<form method="POST" use:enhance>
	<FormItem label="Email" slotName="email" errorMessage={form?.errors?.email?.[0] || ''}>
		<Input
			let:slotName
			name={slotName}
			slot="formItem"
			on:input={() => reset("email")}
			bind:ref={emailRef}
		/>
	</FormItem>

	<FormItem label="Password" slotName="password" errorMessage={form?.errors?.password?.[0] || ''}>
		<InputPassword
			let:slotName
			name={slotName}
			slot="formItem"
		  on:input={() => reset("password")}
		/>
		{#if showPasswordHelper}
			<!-- TODO: Handle forgot password -->
			<button class="text-sm text-blue-600" type="button">Forgot password?</button>
		{/if}
	</FormItem>

	<Button isBlock type="submit" color={buttonColor}>{buttonText}</Button>
</form>
