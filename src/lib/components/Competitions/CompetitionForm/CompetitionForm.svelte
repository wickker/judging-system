<script lang="ts">
	import { onMount } from 'svelte'
	import { FormItem, InputNumber, InputText } from '$lib/components/commons'
	import type { CompetitionForm } from '$lib/types/competition'
  import type { FormErrors, FormRefs } from '$lib/hooks/useForm'

	export let form: CompetitionForm
	export let refs: FormRefs<CompetitionForm>
	export let errors: FormErrors<CompetitionForm>

	onMount(function () {
		refs.name?.focus()
	})
</script>

<FormItem label="Name" errorMessage={errors.name}>
	<InputText
		bind:value={form.name}
		bind:ref={refs.name}
		hasError={!!errors.name}
		/>
</FormItem>

<FormItem label="Year" errorMessage={errors.year}>
	<InputNumber
		bind:value={form.year}
		bind:ref={refs.year}
		hasError={!!errors.year}
	/>
</FormItem>
