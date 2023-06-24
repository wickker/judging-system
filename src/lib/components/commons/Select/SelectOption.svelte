<script lang="ts">
	import IconTick from '$lib/assets/icon-tick-crimson.svg'

	type T = $$Generic

	export let handleSelect: (e: MouseEvent, label: string, value: T, isSelected: boolean) => void
	export let isSelected: boolean
	export let value: T
	export let label: string
</script>

<button
	class="flex w-full justify-between border-b border-b-zinc-200 py-2 text-dark-indigo"
	on:click={(e) => handleSelect(e, label, value, isSelected)}
>
	<p class:font-semibold={isSelected}>{label}</p>

	{#if isSelected}
		<img src={IconTick} alt="Icon tick" class="h-6 w-6" />
	{/if}
</button>
