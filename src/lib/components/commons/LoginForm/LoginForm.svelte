<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { FormItem, InputText, InputPassword, Button } from '$lib/components/commons'
	import { LoginFormSchema } from '$lib/types/user'
	import { DEFAULT_FORM_VALUES } from '$lib/utils/constants/defaults'
	import { ROUTES } from '$lib/utils/constants/routes'
	import { useForm } from '$lib/hooks/useForm'
	import type { ButtonColor } from '$lib/components/commons/Button/Button.svelte'

	export let buttonText: string = ''
	export let route: string = ''

	const { form, refs, errors, onSubmit } = useForm({
		schema: LoginFormSchema,
		defaultValues: DEFAULT_FORM_VALUES.LOGIN_FORM,
		route,
		successCB,
	})

	$: showPasswordHelper = !(buttonText === 'Sign up')
	$: buttonColor = (showPasswordHelper ? 'crimson' : 'indigo') as ButtonColor

	function successCB() {
		goto(ROUTES.SESSIONS)
	}

	onMount(function () {
		refs.email?.focus()
	})
</script>

<FormItem label="Email" errorMessage={$errors.email}>
	<InputText bind:value={form.email} bind:ref={refs.email} hasError={!!$errors.email} />
</FormItem>

<FormItem label="Password" errorMessage={$errors.password}>
	<InputPassword
		bind:value={form.password}
		bind:ref={refs.password}
		hasError={!!$errors.password}
	/>
	{#if showPasswordHelper}
		<div class="flex justify-end">
			<button class="text-sm text-blue-600" type="button">Forgot password?</button>
		</div>
	{/if}
</FormItem>

<Button isBlock color={buttonColor} on:click={onSubmit}>{buttonText}</Button>
