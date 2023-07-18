<script lang="ts">
	import { JudgeTile, AddJudgeModal, EditJudgeModal } from '$lib/components/Judges'
	import { Header, ButtonCircularPlus, Page } from '$lib/components/commons'
	import type { GetJudgeRes } from '$lib/types/judge.js'

	export let data

	let isAddModalVisible = false
	let isEditModalVisible = false
	let judges = data.judges
	let selectedJudge: GetJudgeRes

	function handleOpenAddModal() {
		isAddModalVisible = true
	}

	function handleClickEdit(j: GetJudgeRes) {
		selectedJudge = j
		isEditModalVisible = true
	}
</script>

<Page>
	<Header title="Judges" slot="header">
		<div class="fixed bottom-0 flex w-full max-w-lg justify-end px-3 py-5">
			<ButtonCircularPlus on:click={handleOpenAddModal} />
		</div>
	</Header>

	<div class="overflow-y-auto px-3 py-2">
		{#each judges as { id, name, email } (id)}
			<JudgeTile bind:name bind:email onEdit={() => handleClickEdit({ id, name, email })} />
		{/each}
	</div>
</Page>

<AddJudgeModal bind:isVisible={isAddModalVisible} bind:judges />

{#if isEditModalVisible}
	<EditJudgeModal bind:isVisible={isEditModalVisible} judge={selectedJudge} bind:judges />
{/if}
