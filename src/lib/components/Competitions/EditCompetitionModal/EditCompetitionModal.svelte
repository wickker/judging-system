<script lang="ts">
	import type { Competition } from '@prisma/client'
	import { Modal, Button } from '$lib/components/commons'
	import { useForm } from '$lib/hooks/useForm'
	import { CompetitionForm } from '$lib/components/Competitions'
	import {
		UpdateCompetitionFormSchema,
		type GetCompetitionRes,
		type UpdateCompetitionForm,
	} from '$lib/types/competition'
	import { ROUTES } from '$lib/utils/constants/routes'

	export let isVisible = false
	export let competition: UpdateCompetitionForm
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
</script>

<Modal bind:isVisible title="Edit Competition">
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
