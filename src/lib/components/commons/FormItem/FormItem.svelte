<script lang="ts">
	export let label = ''
	export let slotName = ''
	export let errorMessage = ''
</script>

<label class="mb-1 inline-block text-base text-neutral-600" for={slotName}>{label}:</label>
<slot {slotName} name="formItem" />
<p class="mb-2 h-4 text-xs text-red-500">{errorMessage}</p>
