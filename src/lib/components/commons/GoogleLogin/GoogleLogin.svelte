<script lang="ts">
	import { onMount } from 'svelte'
	import { PUBLIC_VITE_GOOGLE_CLIENT_ID, PUBLIC_VITE_BASE_URL } from '$env/static/public'
	import { ROUTES } from '$lib/utils/constants/routes'
	import { page } from '$app/stores'
	import { Loader } from '$lib/components/commons'

	let loginRef: HTMLDivElement | undefined = undefined
	let isLoggingIn = false

	function handleClickGoogleLogin() {
		isLoggingIn = true
	}

	// TODO: Find another way to implement this
	onMount(async function () {
		if ('google' in window) {
			const google = window.google as any

			google.accounts.id.initialize({
				client_id: PUBLIC_VITE_GOOGLE_CLIENT_ID,
				ux_mode: 'redirect',
				login_uri: `${PUBLIC_VITE_BASE_URL}${ROUTES.API.GOOGLE_AUTH}?origin=${$page.url.pathname}`,
			})

			google.accounts.id.renderButton(loginRef, {
				text: 'continue_with',
				click_listener: handleClickGoogleLogin,
			})
		}
	})
</script>

{#if isLoggingIn}
	<div class="flex justify-center">
		<Loader />
	</div>
{:else}
	<div bind:this={loginRef} class="flex justify-center" />
{/if}
