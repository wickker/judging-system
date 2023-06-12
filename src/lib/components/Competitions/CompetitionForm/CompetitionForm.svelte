<script lang="ts">
	import { onMount } from 'svelte'
	import { FormItem, InputNumber, InputText } from '$lib/components/commons'
	import type { CompetitionForm } from '$lib/types/competition'
	import type { FormErrors } from '$lib/types/commons'
	import { resetField } from '$lib/utils/functions/form'

	export let formFields: CompetitionForm
	export let errors: FormErrors<CompetitionForm>

	let nameRef: HTMLInputElement | undefined = undefined

	onMount(function () {
		nameRef?.focus()
	})
</script>

<FormItem label="Name" errorMessage={errors?.name?.[0] || ''}>
	<InputText
		bind:value={formFields.name}
		bind:ref={nameRef}
		hasError={!!errors?.name}
		on:input={() => (errors = resetField(errors, 'name'))}
	/>
</FormItem>

<FormItem label="Year" errorMessage={errors?.year?.[0] || ''}>
	<InputNumber
		bind:value={formFields.year}
		hasError={!!errors?.year}
		on:input={() => (errors = resetField(errors, 'year'))}
	/>
</FormItem>
