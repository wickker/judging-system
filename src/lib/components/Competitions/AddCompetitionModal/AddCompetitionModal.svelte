<script lang="ts">
	import type { Competition } from '@prisma/client'
	import { Modal, Button } from '$lib/components/commons'
	import { CompetitionForm } from '$lib/components/Competitions'
	import {
		CompetitionFormSchema,
		type CompetitionForm as TCompetitionForm,
	} from '$lib/types/competition'
	import type { FormErrors } from '$lib/types/commons'
	import { ROUTES } from '$lib/utils/constants/routes'
	import { handleSubmit } from '$lib/utils/functions/form'
  import { DEFAULT_FORM_VALUES } from '$lib/utils/constants/defaults'

	export let isVisible = false

	let formFields: TCompetitionForm = DEFAULT_FORM_VALUES.COMPETITION_FORM
	let errors: FormErrors<TCompetitionForm> = {}
	let isLoading = false

	function handleCloseModal() {
		isVisible = false
	}

	function createCompetitionSuccessCB(data?: Competition) {
		console.log('new competition : ', data)
		// TODO:
		isLoading = false
		isVisible = false
	}

	function createCompetitonErrorCB() {
		isLoading = false
	}

	async function handleSubmitForm() {
		isLoading = true
		errors = await handleSubmit(formFields, errors, CompetitionFormSchema, ROUTES.API.COMPETITIONS, createCompetitionSuccessCB, createCompetitonErrorCB)
	}
</script>

<Modal bind:isVisible title="Add New Competition">
	<!-- Content -->
	<div class="mt-2 px-4">
		<CompetitionForm {formFields} {errors} />
	</div>

	<!-- Footer -->
	<div slot="footer" class="flex w-full items-center justify-between bg-neutral-50 px-4 py-5">
		<Button color="indigo" on:click={handleCloseModal}>Cancel</Button>
		<Button on:click={handleSubmitForm} {isLoading}>Submit</Button>
	</div>
</Modal>
