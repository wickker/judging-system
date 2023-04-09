<script lang="ts">
	import Portal from 'svelte-portal'
	import { createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'
	import IconLogout from '$lib/assets/icon-logout-crimson.svg'
	import { goto } from '$app/navigation'
	import { ROUTES } from '$lib/utils/constants/routes'

	const dispatch = createEventDispatcher<{ close: boolean }>()

	function handleLogout() {
		goto(ROUTES.API.LOGOUT)
	}

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
			<div class="bg-dark-indigo p-5" transition:slide={{ duration: 250, axis: 'y' }}>
				<button class="flex items-center gap-2" on:click={handleLogout}>
					<img src={IconLogout} alt="Icon logout" class="h-6 w-6" />
					<h1 class="text-base text-neutral-50">Logout</h1>
				</button>
			</div>
		</div>
	</div>
</Portal>
