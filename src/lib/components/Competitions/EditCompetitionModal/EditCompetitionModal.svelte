<script lang="ts">
	import type { Competition } from '@prisma/client'
	import { Modal, Button, PopConfirm } from '$lib/components/commons'
	import { useForm } from '$lib/hooks/useForm'
	import { CompetitionForm } from '$lib/components/Competitions'
	import {
		UpdateCompetitionFormSchema,
		type GetCompetitionRes,
		type UpdateCompetitionReq,
	} from '$lib/types/competition'
	import { ROUTES } from '$lib/utils/constants/routes'
	import IconTrash from '$lib/assets/icon-trash-crimson.svg'

	export let isVisible = false
	export let competition: UpdateCompetitionReq
	export let competitions: Array<GetCompetitionRes>

	const { form, refs, errors, onSubmit, isLoading } = useForm({
		schema: UpdateCompetitionFormSchema,
		defaultValues: { id: competition.id, name: competition.name, year: competition.year },
		route: ROUTES.API.COMPETITIONS,
		successCB: updateCompetitionSuccessCB,
		method: 'put',
	})

	function handleCloseModal() {
		isVisible = false
	}

	function updateCompetitionSuccessCB(data?: Competition) {
		if (!data) return
		const idx = competitions.findIndex((c) => c.id === data.id)
		if (idx >= 0) {
			competitions[idx].name = data.name
			competitions[idx].year = data.year
		}
		handleCloseModal()
	}

	async function deleteRequest() {
		return await fetch(ROUTES.API.COMPETITIONS, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: competition.id }),
		})
	}

	function deleteCompetitionSuccessCB() {
		competitions = competitions.filter((c) => c.id !== competition.id)
		handleCloseModal()
	}
</script>

<Modal bind:isVisible>
	<!-- Title slot -->
	<div class="flex items-center justify-between px-4 pb-3" slot="titleSlot">
		<h1 class="text-2xl text-dark-indigo">Edit Competition</h1>

		<PopConfirm let:onConfirm title="Are you sure to delete this competition?">
			<button
				class="transition-transform active:scale-90"
				on:click={() => onConfirm(deleteRequest, deleteCompetitionSuccessCB)}
			>
				<img src={IconTrash} alt="Icon trash" class="h-8 w-8" />
			</button>
		</PopConfirm>
	</div>

	<!-- Content -->
	<div class="mt-2 px-4">
		<CompetitionForm {form} {refs} errors={$errors} />
	</div>

	<!-- Footer -->
	<div slot="footer" class="flex w-full items-center justify-between bg-neutral-50 px-4 py-5">
		<Button color="indigo" on:click={handleCloseModal}>Cancel</Button>
		<Button on:click={onSubmit} isLoading={$isLoading}>Submit</Button>
	</div>
</Modal>
