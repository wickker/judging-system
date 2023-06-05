<script lang="ts">
	import { fade } from 'svelte/transition'
	import { Loader } from '$lib/components/commons'

	export let color: 'indigo' | 'crimson' = 'crimson'
	export let isBlock = false
	export let type: 'button' | 'submit' | 'reset' = 'button'
	export let formaction: null | string | undefined = undefined
	export let form: null | string | undefined = undefined
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
	{type}
	{formaction}
	{form}
>
	{#if isLoading}
		<div transition:fade={{ duration: 250 }}>
			<Loader size="s" />
		</div>
	{/if}
	
	<slot />
</button>
