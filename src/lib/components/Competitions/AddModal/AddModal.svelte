<script lang="ts">
	import { Modal, Button } from '$lib/components/commons'
	import { Form } from '$lib/components/Competitions'
	import type { CompetitionForm } from '$lib/types/competition'
	import { DateTime } from 'luxon'

	export let isVisible = false

	let form: CompetitionForm = { name: '', year: DateTime.local().year }

	const formId = 'insert-competition-form'

	function handleCloseModal() {
		isVisible = false
	}
</script>

<Modal bind:isVisible title="Add New Competition">
	<!-- Content -->
	<div class="mt-2 px-4">
		<Form bind:form {formId} />
	</div>

	<!-- Footer -->
	<div slot="footer" class="flex w-full items-center justify-between bg-neutral-50 px-4 py-5">
		<Button color="indigo" on:click={handleCloseModal}>Cancel</Button>
		<Button form={formId} type="submit">Submit</Button>
	</div>
</Modal>
