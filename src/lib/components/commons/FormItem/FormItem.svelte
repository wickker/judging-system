<script lang="ts">
	import { fade } from 'svelte/transition'

	export let label = ''
	export let slotName = ''
	export let errorMessage = ''
</script>

<label class="mb-1 inline-block text-sm text-neutral-600" for={slotName}>{label}:</label>
<slot {slotName} name="formItem" />

<div class="flex flex-row justify-end">
	<slot />
</div>

<p class="h-9 text-xs text-red-500">
	{#if errorMessage}
		<span transition:fade={{ duration: 250 }}>{errorMessage}</span>
	{/if}
</p>
