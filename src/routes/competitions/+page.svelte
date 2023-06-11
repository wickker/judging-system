<script lang="ts">
	import { Header, ButtonCircularPlus } from '$lib/components/commons'
	import { AddCompetitionModal } from '$lib/components/Competitions'
	import IconEdit from '$lib/assets/icon-edit-zinc.svg'

	export let data

	let isAddCompetitionModalVisible = false

	$: competitions = data.competitions
	$: console.log(competitions)

	function handleOpenAddCompeitionModal() {
		isAddCompetitionModalVisible = true
	}
</script>

<Header title="Competitions">
	<div class="fixed bottom-0 flex w-full max-w-lg justify-end px-3 py-5">
		<ButtonCircularPlus on:click={handleOpenAddCompeitionModal} />
	</div>
</Header>

<div class="px-3 py-4">
	{#each competitions as { id, name, year, _count } (id)}
		<div class='py-2'>
			<div class="flex items-center justify-between text-lg">
				{name} ({year})
				<img src={IconEdit} alt="Icon edit" class="h-6 w-6" />
			</div>
			<p class="text-base text-zinc-500">{_count.sessions} sessions</p>
		</div>
	{/each}
</div>

{#if isAddCompetitionModalVisible}
	<AddCompetitionModal bind:isVisible={isAddCompetitionModalVisible} />
{/if}
