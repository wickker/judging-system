<script lang="ts" context="module">
	export type ButtonColor = 'indigo' | 'crimson'
</script>

<script lang="ts">
	import { fade } from 'svelte/transition'
	import { Loader } from '$lib/components/commons'

	export let color: ButtonColor = 'crimson'
	export let isBlock = false
	export let isLoading = false

	function getColors() {
		if (color === 'indigo') {
			return `bg-dark-indigo border-dark-indigo text-white`
		}
		return `bg-crimson border-crimson text-white`
	}
</script>

<button
	on:click
	class="flex h-12 max-w-full flex-row items-center justify-center gap-2 truncate rounded border-2 px-6 py-3 text-lg text-white transition-transform active:scale-90 {getColors()}"
	class:w-full={isBlock}
>
	{#if isLoading}
		<div transition:fade={{ duration: 250 }}>
			<Loader size="s" />
		</div>
	{/if}

	<slot />
</button>
