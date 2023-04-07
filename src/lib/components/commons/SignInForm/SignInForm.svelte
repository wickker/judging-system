<script lang="ts">
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import type { ActionData } from '../../../../routes/login-admin/$types'
	import type { FormErrorResp } from '$lib/types/commons'
	import { Input, FormItem, Button } from '$lib/components/commons'

	export let form: ActionData | FormErrorResp = null

	let emailRef: HTMLInputElement | undefined = undefined

	function resetError(keyName: string) {
		if (form?.errors[keyName] && form.errors[keyName].length > 0) {
			form.errors[keyName] = []
		}
	}

  onMount(() => {
    emailRef?.focus()
  })
</script>

<form method="POST" use:enhance>
	<FormItem label="Email" slotName="email" errorMessage={form?.errors?.email[0] || ''}>
		<Input
			let:slotName
			name={slotName}
			slot="formItem"
			on:input={() => resetError(slotName)}
			bind:ref={emailRef}
		/>
	</FormItem>
	<FormItem label="Password" slotName="password" errorMessage={form?.errors?.password[0] || ''}>
		<Input
			let:slotName
			name={slotName}
			slot="formItem"
			type="password"
			on:input={() => resetError(slotName)}
		/>
	</FormItem>
	<Button isBlock type="submit">Sign in</Button>
</form>
