<script lang="ts">
	import { onMount } from 'svelte'
	import { PUBLIC_VITE_GOOGLE_CLIENT_ID, PUBLIC_VITE_BASE_URL } from '$env/static/public'
	import { ROUTES } from '$lib/utils/constants/routes'

	let loginRef: HTMLDivElement | undefined = undefined

	onMount(async () => {
		google.accounts.id.initialize({
			client_id: PUBLIC_VITE_GOOGLE_CLIENT_ID,
			ux_mode: 'redirect',
			login_uri: `${PUBLIC_VITE_BASE_URL}${ROUTES.API.GOOGLE_AUTH}`,
		})
    
		google.accounts.id.renderButton(loginRef, {
			text: 'signin_with',
			width: window.innerWidth <= 400 ? window.innerWidth - 40 : 235,
		})
	})
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div bind:this={loginRef} class="flex flex-col items-center" />
