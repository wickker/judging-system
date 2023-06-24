<script lang="ts">
	import { Header, ButtonCircularPlus, Page } from '$lib/components/commons'
</script>

<Page>
	<Header title="Judges" slot="header">
		<div class="fixed bottom-0 flex w-full max-w-lg justify-end px-3 py-5">
			<ButtonCircularPlus />
		</div>
	</Header>

	<div class="overflow-y-auto px-3 py-2">
		<!-- {#each competitions as { id, name, year, _count } (id)}
			<CompetitionTile
				bind:name
				bind:year
				bind:count={_count.sessions}
				onEdit={() =>
					handleClickEdit({
						id,
						name,
						year,
					})}
			/>
		{/each} -->
	</div>
</Page>
