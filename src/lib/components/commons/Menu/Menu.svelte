<script lang="ts">
	import Portal from 'svelte-portal'
	import { createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'
	import IconLogout from '$lib/assets/icon-logout-crimson.svg'
	import IconEvent from '$lib/assets/icon-event-crimson.svg'
	import IconSession from '$lib/assets/icon-session-crimson.svg'
	import { goto } from '$app/navigation'
	import { ROUTES } from '$lib/utils/constants/routes'
	import { page } from '$app/stores'

	const dispatch = createEventDispatcher<{ close: boolean }>()

	const options = [
		{
			icon: IconEvent,
			alt: 'Icon event',
			route: ROUTES.COMPETITIONS,
			label: 'Competitions',
		},
		{
			icon: IconSession,
			alt: 'Icon session',
			route: ROUTES.SESSIONS,
			label: 'Sessions',
		},
		{
			icon: IconLogout,
			alt: 'Icon logout',
			route: ROUTES.API.LOGOUT,
			label: 'Logout',
		},
	]

	function handleCloseMenu() {
		dispatch('close', true)
	}
</script>

<Portal>
	<div class="absolute top-[70px] flex h-[calc(100%-70px)] w-full justify-center bg-transparent">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="flex h-full w-full max-w-lg flex-col bg-white bg-opacity-50"
			on:click={handleCloseMenu}
		>
			<div class="bg-dark-indigo pb-2" transition:slide={{ duration: 250, axis: 'y' }}>
				{#each options as { route, icon, alt, label }}
					<button
						class="flex w-full items-center gap-2 px-5 py-3"
						on:click={() => goto(route)}
						class:bg-zinc-600={$page.url.pathname === route}
					>
						<img src={icon} {alt} class="h-6 w-6" />
						<h1 class="text-base text-neutral-50">{label}</h1>
					</button>
				{/each}
			</div>
		</div>
	</div>
</Portal>
