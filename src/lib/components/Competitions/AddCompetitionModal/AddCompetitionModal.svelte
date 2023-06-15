<script lang="ts">
	import type { Competition } from '@prisma/client'
	import { Modal, Button } from '$lib/components/commons'
	import { CompetitionForm } from '$lib/components/Competitions'
	import { CreateCompetitionFormSchema, type GetCompetitionRes } from '$lib/types/competition'
	import { useForm } from '$lib/hooks/useForm'
	import { DEFAULT_FORM_VALUES } from '$lib/utils/constants/defaults'
	import { ROUTES } from '$lib/utils/constants/routes'

	export let isVisible = false
	export let competitions: Array<GetCompetitionRes>

	const { form, refs, errors, onSubmit, isLoading } = useForm({
		schema: CreateCompetitionFormSchema,
		defaultValues: DEFAULT_FORM_VALUES.COMPETITION_FORM,
		route: ROUTES.API.COMPETITIONS,
		successCB: createCompetitionSuccessCB,
	})

	function handleCloseModal() {
		isVisible = false
	}

	function createCompetitionSuccessCB(data?: Competition) {
		if (!data) return
		competitions = [
			{ name: data.name, year: data.year, id: data.id, _count: { sessions: 0 } },
			...competitions,
		]
		handleCloseModal()
	}
</script>

<Modal bind:isVisible title="Add New Competition">
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
