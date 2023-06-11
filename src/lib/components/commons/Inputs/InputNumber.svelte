<script lang="ts">
	export let isDisabled = false
	export let hasError = false
	export let placeholder = ''
	export let value = 0
	export let ref: HTMLInputElement | undefined = undefined
</script>

<input
	class="h-12 w-full rounded border bg-white px-2.5 py-3 text-base text-neutral-600 outline-none"
	class:border-neutral-100={isDisabled}
	class:border-neutral-200={!isDisabled}
	class:border-red-400={hasError}
	autocomplete="on"
	type="number"
	disabled={isDisabled}
	{placeholder}
	on:input
	bind:this={ref}
	bind:value
/>
