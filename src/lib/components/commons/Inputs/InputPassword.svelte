<script lang="ts">
	export let disabled = false
	export let hasError = false
	export let placeholder = ''
	export let name: string | null | undefined = undefined
	export let value = ''
	export let ref: HTMLInputElement | undefined = undefined
</script>

<input
	class="h-12 w-full rounded border bg-white px-2.5 py-3 text-base text-neutral-600 outline-none"
	class:border-neutral-100={disabled}
	class:border-neutral-200={!disabled}
	class:border-red-400={hasError}
	type='password'
	{disabled}
	{placeholder}
	{name}
	on:input
	autocomplete="on"
	bind:this={ref}
	bind:value
/>