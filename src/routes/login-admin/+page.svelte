<script lang="ts">
	import { onMount } from 'svelte'
	import type { ActionData } from './$types'
	import { enhance } from '$app/forms'
	import { ROUTES } from '$lib/utils/constants/routes'
	import { PUBLIC_VITE_GOOGLE_CLIENT_ID, PUBLIC_VITE_BASE_URL } from '$env/static/public'
	import Logo from '$lib/assets/logo.svg'
	import { Input, FormItem, Button } from '$lib/components/commons'
	import { GOOGLE_AUTH_OPTIONS } from '$lib/utils/constants/commons'
	import type { FormErrorResp } from '$lib/types/commons'

	export let form: ActionData | FormErrorResp

	let gLoginElement: HTMLDivElement | undefined = undefined

  function resetError(keyName: string) {
    if (form?.errors[keyName] && form.errors[keyName].length > 0) {
      form.errors[keyName] = []
    }
  }

	onMount(async () => {
		google.accounts.id.initialize(GOOGLE_AUTH_OPTIONS)
		google.accounts.id.renderButton(gLoginElement, {
			text: 'signin_with',
			width: window.innerWidth <= 400 ? window.innerWidth - 40 : 235,
		})
	})
</script>

<!-- <br />
<form method="POST" action={ROUTES.LOGOUT}>
	<button type="submit">Logout</button>
</form> -->

<div class="relative flex h-full flex-col bg-dark-indigo">
	<div class="flex flex-row items-center gap-3 px-5 py-8">
		<img src={Logo} alt="Logo" class="mx-[-2px] h-12 w-12" />
		<h1 class="text-3xl text-crimson">Sign In</h1>
	</div>
	<p class="px-5 text-base text-neutral-50">
		Sign in as an administrator to view and manage all your competitions and sessions.
	</p>

	<div class="absolute bottom-0 flex w-full flex-col rounded-t-3xl bg-neutral-50">
		<div class="px-5 py-8">
			<form method="POST" use:enhance>
				<FormItem label="Email" slotName="email" errorMessage={form?.errors?.email[0] || ''}>
					<Input let:slotName name={slotName} slot="formItem" on:input={() => resetError("email")} />
				</FormItem>
				<FormItem
					label="Password"
					slotName="password"
					errorMessage={form?.errors?.password[0] || ''}
				>
					<Input let:slotName name={slotName} slot="formItem" type="password" on:input={() => resetError("password")} />
				</FormItem>
				<Button isBlock buttonType="submit">Sign in</Button>
			</form>
		</div>

		<div class="bg-neutral-100 px-5 py-8">
			<div bind:this={gLoginElement} class="flex flex-col items-center" />
		</div>
	</div>
</div>
