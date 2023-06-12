<script lang="ts">
	import IconEdit from '$lib/assets/icon-edit-zinc.svg'

	export let name: string = ''
	export let year: number = 0
	export let count: number = 0
</script>

<div class="border-b border-b-zinc-200 py-2">
	<div class="flex items-center justify-between text-lg">
		{name} ({year})
		<button class="transition-transform active:scale-90">
			<img src={IconEdit} alt="Icon edit" class="h-6 w-6" />
		</button>
	</div>
	<p class="text-base text-zinc-500">{count} sessions</p>
</div>
