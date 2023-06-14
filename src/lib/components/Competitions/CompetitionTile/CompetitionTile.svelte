<script lang="ts">
	import IconEdit from '$lib/assets/icon-edit-zinc.svg'
	import type { CompetitionForm } from '$lib/types/competition'

	export let name = ''
	export let year = 0
	export let count = 0
	export let onEdit: () => void
</script>

<div class="border-b border-b-zinc-200 py-2">
	<div class="flex items-center justify-between text-lg">
		{name} ({year})
		<button class="transition-transform active:scale-90" on:click={onEdit}>
			<img src={IconEdit} alt="Icon edit" class="h-6 w-6" />
		</button>
	</div>
	<p class="text-base text-zinc-500">{count} sessions</p>
</div>
