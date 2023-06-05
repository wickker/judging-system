<script lang="ts">
	import { Modal, Button } from '$lib/components/commons'
	import { Form } from '$lib/components/Competitions'
	import type { CompetitionForm } from '$lib/types/competition'
  import type { Competition } from '@prisma/client'
	import { DateTime } from 'luxon'

	export let isVisible = false

	let form: CompetitionForm = { name: '', year: DateTime.local().year }
	let isLoading = false

	const formId = 'insert-competition-form'

	function handleCloseModal() {
		isVisible = false
	}

	function handleClickSubmit() {
		isLoading = true
	}

	function handleFormSubmit(e: CustomEvent<Competition | null>) {
		isLoading = false
		if (!e.detail) return
		
		isVisible = false
		// TODO: Add new competition to array
	}
</script>

<Modal bind:isVisible title="Add New Competition">
	<!-- Content -->
	<div class="mt-2 px-4">
		<Form bind:form {formId} on:submit={handleFormSubmit}/>
	</div>

	<!-- Footer -->
	<div slot="footer" class="flex w-full items-center justify-between bg-neutral-50 px-4 py-5">
		<Button color="indigo" on:click={handleCloseModal}>Cancel</Button>
		<!-- <Button form={formId} type="submit" on:click={handleClickSubmit} {isLoading}>Submit</Button> -->
	</div>
</Modal>
