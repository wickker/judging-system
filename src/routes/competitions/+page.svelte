<script lang="ts">
	import { Header, ButtonCircularPlus, Page } from '$lib/components/commons'
	import { AddCompetitionModal, CompetitionTile } from '$lib/components/Competitions'

	export let data

	let isAddCompetitionModalVisible = false

	$: competitions = data.competitions

	function handleOpenAddCompeitionModal() {
		isAddCompetitionModalVisible = true
	}
</script>

<Page>
	<Header title="Competitions" slot="header">
		<div class="fixed bottom-0 flex w-full max-w-lg justify-end px-3 py-5">
			<ButtonCircularPlus on:click={handleOpenAddCompeitionModal} />
		</div>
	</Header>

	<div class="overflow-y-auto px-3 py-2">
		{#each competitions as { id, name, year, _count } (id)}
			<CompetitionTile bind:name bind:year bind:count={_count.sessions} />
		{/each}
	</div>
</Page>

{#if isAddCompetitionModalVisible}
	<AddCompetitionModal bind:isVisible={isAddCompetitionModalVisible} />
{/if}
