<script lang="ts">
	import { Header, ButtonCircularPlus, Page } from '$lib/components/commons'
	import { AddCompetitionModal, CompetitionTile } from '$lib/components/Competitions'
	import type { UpdateCompetitionForm } from '$lib/types/competition'
	import EditCompetitionModal from '$lib/components/Competitions/EditCompetitionModal/EditCompetitionModal.svelte'

	export let data

	let isAddModalVisible = false
	let isEditModalVisible = false
	let selectedCompetition: UpdateCompetitionForm
	let competitions = data.competitions

	function handleOpenAddModal() {
		isAddModalVisible = true
	}

	function handleClickEdit(c: UpdateCompetitionForm) {
		selectedCompetition = c
		isEditModalVisible = true
	}
</script>

<Page>
	<Header title="Competitions" slot="header">
		<div class="fixed bottom-0 flex w-full max-w-lg justify-end px-3 py-5">
			<ButtonCircularPlus on:click={handleOpenAddModal} />
		</div>
	</Header>

	<div class="overflow-y-auto px-3 py-2">
		{#each competitions as { id, name, year, _count } (id)}
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
		{/each}
	</div>
</Page>

{#if isAddModalVisible}
	<AddCompetitionModal bind:isVisible={isAddModalVisible} bind:competitions />
{/if}

{#if isEditModalVisible}
	<EditCompetitionModal
		bind:isVisible={isEditModalVisible}
		competition={selectedCompetition}
		bind:competitions
	/>
{/if}
