<script lang="ts">
	import type { Judge } from '@prisma/client'
	import { Modal, Button, PopConfirm } from '$lib/components/commons'
	import { UpdateJudgeFormSchema, type GetJudgeRes } from '$lib/types/judge'
	import { useForm } from '$lib/hooks/useForm'
	import { ROUTES } from '$lib/utils/constants/routes'
	import { JudgeForm } from '$lib/components/Judges'
	import IconTrash from '$lib/assets/icon-trash-crimson.svg'

	export let isVisible = false
	export let judges: Array<GetJudgeRes>
	export let judge: GetJudgeRes

	const { form, refs, errors, onSubmit, isLoading } = useForm({
		schema: UpdateJudgeFormSchema,
		defaultValues: { ...judge },
		route: ROUTES.API.JUDGES,
		successCB: updateJudgeSuccessCB,
		method: 'put',
	})

	function handleCloseModal() {
		isVisible = false
	}

	function updateJudgeSuccessCB(data?: Judge) {
		if (!data) return
		const idx = judges.findIndex((j) => j.id === data.id)
		if (idx >= 0) {
			judges[idx].name = data.name
			judges[idx].email = data.email
		}
		handleCloseModal()
	}

	async function deleteRequest() {
		return await fetch(ROUTES.API.JUDGES, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: judge.id }),
		})
	}

	function deleteJudgeSuccessCB() {
		judges = judges.filter((j) => j.id !== judge.id)
		handleCloseModal()
	}
</script>

<Modal bind:isVisible>
	<!-- Title slot -->
	<div class="flex items-center justify-between px-4 pb-3" slot="titleSlot">
		<h1 class="text-2xl text-dark-indigo">Edit Judge</h1>

		<PopConfirm let:onConfirm title="Are you sure to delete this judge?">
			<button
				class="transition-transform active:scale-90"
				on:click={() => onConfirm(deleteRequest, deleteJudgeSuccessCB)}
			>
				<img src={IconTrash} alt="Icon trash" class="h-8 w-8" />
			</button>
		</PopConfirm>
	</div>

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
