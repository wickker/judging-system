<script lang="ts">
	import { Modal, Button } from '$lib/components/commons'
	import { Form } from '$lib/components/Competitions'
	import type { ActionData } from '../../../../routes/competitions/$types'
	import type { Form as TForm } from '$lib/types/commons'
	import { ROUTES } from '$lib/utils/constants/routes'
	import type { CompetitionForm } from '$lib/types/competition'

	export let isVisible = false
	export let form: TForm<CompetitionForm> = null

	const formId = 'inser-competition-form'

	function handleCloseModal() {
		isVisible = false
	}
</script>

<Modal bind:isVisible title="Add New Competition">
	<!-- Content -->
	<div class="mt-2 px-4">
		<Form bind:form {formId} actionUrl={`${ROUTES.COMPETITIONS}?action=insert`} />
	</div>

	<!-- Footer -->
	<div slot="footer" class="flex w-full items-center justify-between bg-neutral-50 px-4 py-5">
		<Button color="indigo" on:click={handleCloseModal}>Cancel</Button>
		<Button type="submit" form={formId}>Submit</Button>
	</div>
</Modal>
