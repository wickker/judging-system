<script lang="ts">
	import { portal } from 'svelte-portal'
	import { fade } from 'svelte/transition'
	import IconCross from '$lib/assets/icon-cross-indigo.svg'

	export let isVisible = false
	export let title = ''

	function handleCloseModal() {
		isVisible = false
	}
</script>

{#if isVisible}
	<div
		class="absolute inset-0 flex justify-center bg-transparent"
		transition:fade={{ duration: 250 }}
		use:portal={'body'}
	>
		<div class="relative h-full w-full max-w-lg bg-white">
			<button class="my-5 ml-3 transition-transform active:scale-90" on:click={handleCloseModal}>
				<img src={IconCross} alt="Icon cross" class="h-8 w-8" />
			</button>

			{#if $$slots.titleSlot}
				<slot name="titleSlot" />
			{:else}
				<h1 class="px-4 pb-3 text-2xl text-dark-indigo">{title}</h1>
			{/if}

			<slot />

			{#if $$slots.footer}
				<div class="fixed bottom-0 w-full max-w-lg">
					<slot name="footer" />
				</div>
			{/if}
		</div>
	</div>
{/if}
