<script lang="ts">
	export let type = 'text'
	export let disabled = false
	export let hasError = false
	export let placeholder = ''
	export let name = ''
</script>

<input
	class="h-12 w-full rounded border bg-white px-2.5 py-3 text-base text-neutral-600 outline-none"
	class:border-neutral-100={disabled}
	class:border-neutral-200={!disabled}
	class:border-red-400={hasError}
	{disabled}
	{placeholder}
	{type}
	{name}
	on:input
	autocomplete="on"
/>
