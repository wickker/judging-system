<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte'
	import { FormItem, InputNumber } from '$lib/components/commons'
	import { CompetitionFormSchema, type CompetitionForm } from '$lib/types/competition'
	import { convertZodErrorsToFormErrorResp, resetError } from '$lib/utils/functions/commons'
	import type { FormErrors } from '$lib/types/commons'
	import { ROUTES } from '$lib/utils/constants/routes'
	import type { Competition } from '@prisma/client'

	export let form: CompetitionForm
	export let formId = ''

	let errors: FormErrors<CompetitionForm> = { name: [], year: [] }
	let nameRef: HTMLInputElement | undefined = undefined

	const dispatch = createEventDispatcher<{ submit: Competition | null }>()

	async function handleSubmit() {
		const res = CompetitionFormSchema.safeParse(form)

		if (!res.success) {
			errors = convertZodErrorsToFormErrorResp(res.error) as FormErrors<CompetitionForm>
			dispatch('submit', null)
			return
		}

		try {
			const response = await fetch(ROUTES.API.COMPETITIONS, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(res.data),
			})
			const newCompetition = await response.json()
			console.log(newCompetition)
			dispatch('submit', newCompetition)
		} catch (error) {
			console.error(error)
			dispatch('submit', null)
			// TODO: Show notification
		}
	}

	onMount(() => {
		nameRef?.focus()
	})
</script>

<!-- <form on:submit|preventDefault={handleSubmit} id={formId}>
	<FormItem label="Name" errorMessage={errors?.name?.[0] || ''}>
		<Input
			slot="formItem"
			bind:ref={nameRef}
			bind:value={form.name}
			on:input={() => (errors = resetError(errors, 'name'))}
		/>
	</FormItem>

	<FormItem label="Year" errorMessage={errors?.year?.[0] || ''}>
		<InputNumber
			slot="formItem"
			bind:value={form.year}
			on:input={() => (errors = resetError(errors, 'year'))}
		/>
	</FormItem>
</form> -->
