<script lang="ts">
	import { fade } from 'svelte/transition'

	export let label = ''
	// export let slotName = ''
	export let errorMessage = ''
</script>

<div class="mb-1 inline-block text-sm text-neutral-600">{label}:</div>
<slot />
<!-- <div class="flex flex-row justify-end">
	<slot />
</div> -->

<div class="h-9 text-xs text-red-500">
	{#if errorMessage}
		<p transition:fade={{ duration: 250 }}>{errorMessage}</p>
	{/if}
</div>
