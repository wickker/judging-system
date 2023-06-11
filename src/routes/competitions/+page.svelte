<script lang="ts">
	import { Header, ButtonCircularPlus } from '$lib/components/commons'
	import { AddCompetitionModal } from '$lib/components/Competitions'

	let isAddCompetitionModalVisible = false

	function handleOpenAddCompeitionModal() {
		isAddCompetitionModalVisible = true
	}
</script>

<Header title="Competitions">
	<div class="fixed bottom-0 flex w-full max-w-lg justify-end px-3 py-5">
		<ButtonCircularPlus on:click={handleOpenAddCompeitionModal} />
	</div>
</Header>

{#if isAddCompetitionModalVisible}
	<AddCompetitionModal bind:isVisible={isAddCompetitionModalVisible} />
{/if}
