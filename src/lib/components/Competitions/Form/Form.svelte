<script lang="ts">
	import { onMount } from 'svelte'
	import { Input, FormItem, InputNumber } from '$lib/components/commons'
	import { CompetitionFormSchema, type CompetitionForm } from '$lib/types/competition'
	import { convertZodErrorsToFormErrorResp, resetError } from '$lib/utils/functions/commons'
	import type { FormErrors } from '$lib/types/commons'

	export let form: CompetitionForm
	export let formId = ''

	let errors: FormErrors<CompetitionForm> = { name: [], year: [] }
	let nameRef: HTMLInputElement | undefined = undefined

	function handleSubmit() {
		const res = CompetitionFormSchema.safeParse(form)

		if (!res.success) {
			errors = convertZodErrorsToFormErrorResp(res.error) as FormErrors<CompetitionForm>
			return
		}

		// TODO: Call API
	}

	onMount(() => {
		nameRef?.focus()
	})
</script>

<form on:submit|preventDefault={handleSubmit} id={formId}>
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
</form>
