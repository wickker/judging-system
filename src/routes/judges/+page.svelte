<script lang="ts">
	import AddJudgeModal from '$lib/components/Judges/AddJudgeModal/AddJudgeModal.svelte'
	import { Header, ButtonCircularPlus, Page } from '$lib/components/commons'

	let isAddModalVisible = false

	function handleOpenAddModal() {
		isAddModalVisible = true
	}
</script>

<Page>
	<Header title="Judges" slot="header">
		<div class="fixed bottom-0 flex w-full max-w-lg justify-end px-3 py-5">
			<ButtonCircularPlus on:click={handleOpenAddModal} />
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

<AddJudgeModal bind:isVisible={isAddModalVisible} />
