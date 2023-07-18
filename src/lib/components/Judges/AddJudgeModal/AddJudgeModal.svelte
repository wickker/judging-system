<script lang="ts">
	import type { Judge } from '@prisma/client'
	import { Modal, Button } from '$lib/components/commons'
	import { CreateJudgeFormSchema, type GetJudgeRes } from '$lib/types/judge'
	import { useForm } from '$lib/hooks/useForm'
	import { DEFAULT_FORM_VALUES } from '$lib/utils/constants/defaults'
	import { ROUTES } from '$lib/utils/constants/routes'
	import { JudgeForm } from '$lib/components/Judges'

	export let isVisible = false
	export let judges: Array<GetJudgeRes>

	const { form, refs, errors, onSubmit, isLoading } = useForm({
		schema: CreateJudgeFormSchema,
		defaultValues: DEFAULT_FORM_VALUES.JUDGE_FORM,
		route: ROUTES.API.JUDGES,
		successCB: createJudgeSuccessCB,
	})

	function handleCloseModal() {
		isVisible = false
	}

	function createJudgeSuccessCB(data?: Judge) {
		if (!data) return
		judges = [{ name: data.name, id: data.id, email: data.email }, ...judges]
		handleCloseModal()
	}
</script>

<Modal bind:isVisible title="Add New Judge">
	<!-- Content -->
	<div class="mt-2 px-4">
		<JudgeForm {form} {refs} errors={$errors} />
	</div>

	<!-- Footer -->
	<div slot="footer" class="flex w-full items-center justify-between bg-neutral-50 px-4 py-5">
		<Button color="indigo" on:click={handleCloseModal}>Cancel</Button>
		<Button on:click={onSubmit} isLoading={$isLoading}>Submit</Button>
	</div>
</Modal>
