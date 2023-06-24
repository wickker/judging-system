<script lang="ts">
	export let isDisabled = false
	export let hasError = false
	export let placeholder = ''
	export let value = ''
	export let ref: HTMLInputElement | undefined = undefined
	export let leftIcon = ''
</script>

<div class="relative">
	<input
		class="h-12 w-full rounded border bg-white px-2.5 py-3 text-base text-neutral-600 outline-none"
		class:border-neutral-100={isDisabled}
		class:border-neutral-200={!isDisabled}
		class:border-red-400={hasError}
		class:pl-9={!!leftIcon}
		autocomplete="on"
		type="text"
		disabled={isDisabled}
		{placeholder}
		on:input
		bind:this={ref}
		bind:value
	/>
	{#if leftIcon}
		<div class="absolute left-3 top-0 flex h-full items-center">
			<img src={leftIcon} alt="Icon left" class="h-4 w-4" />
		</div>
	{/if}
</div>
