<script lang="ts">
	import { SvelteComponent, onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import type { Form } from '$lib/types/commons'
	import { Input, FormItem, Button, FormLogic } from '$lib/components/commons'
	import type { UserRegistrationForm } from '$lib/types/user'

	export let form: Form<UserRegistrationForm> = null
	export let buttonText = ''
	export let buttonColor: 'crimson' | 'indigo' = 'crimson'
	export let showPasswordHelper = false

	let formLogic: SvelteComponent
	let emailRef: HTMLInputElement | undefined = undefined

	onMount(() => {
		emailRef?.focus()
	})
</script>

<FormLogic bind:form bind:this={formLogic} />

<form method="POST" use:enhance>
	<FormItem label="Email" slotName="email" errorMessage={form?.errors?.email?.[0] || ''}>
		<Input
			let:slotName
			name={slotName}
			slot="formItem"
			on:input={() => formLogic.resetError(slotName)}
			bind:ref={emailRef}
		/>
	</FormItem>

	<FormItem label="Password" slotName="password" errorMessage={form?.errors?.password?.[0] || ''}>
		<Input
			let:slotName
			name={slotName}
			slot="formItem"
			type="password"
			on:input={() => formLogic.resetError(slotName)}
		/>
		{#if showPasswordHelper}
			<!-- TODO: Handle forgot password -->
			<button class="text-sm text-blue-600" type="button">Forgot password?</button>
		{/if}
	</FormItem>

	<Button isBlock type="submit" color={buttonColor}>{buttonText}</Button>
</form>
