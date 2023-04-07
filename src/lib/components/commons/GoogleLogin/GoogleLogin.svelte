<script lang="ts">
	import { onMount } from 'svelte'
	import { PUBLIC_VITE_GOOGLE_CLIENT_ID, PUBLIC_VITE_BASE_URL } from '$env/static/public'
	import { ROUTES } from '$lib/utils/constants/routes'
	import { page } from '$app/stores'

	let loginRef: HTMLDivElement | undefined = undefined

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
				width: window.innerWidth <= 400 ? window.innerWidth - 40 : 235, // max button width is 400
			})
		}
	})
</script>

<div bind:this={loginRef} class="flex flex-col items-center" />
