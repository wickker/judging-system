<script lang="ts">
	import { onMount } from 'svelte'
	import type { Form } from '$lib/types/commons'
	import { Input, FormItem } from '$lib/components/commons'
	import { enhance } from '$app/forms'
	import type { CompetitionForm } from '$lib/types/competition'

	export let form: Form<CompetitionForm> = null
	export let formId = ''
	export let actionUrl = ''

	let nameRef: HTMLInputElement | undefined = undefined

	function resetError(keyName: string) {
		if (form?.errors?.[keyName] && form.errors[keyName].length > 0) {
			form.errors[keyName] = []
		}
	}

	onMount(() => {
		nameRef?.focus()
	})
</script>

<form id={formId} method="POST" action={actionUrl} use:enhance>
	<FormItem label="Name" slotName="name" errorMessage={form?.errors?.name?.[0] || ''}>
		<Input
			let:slotName
			name={slotName}
			slot="formItem"
			on:input={() => resetError(slotName)}
			bind:ref={nameRef}
		/>
	</FormItem>

	<FormItem label="Year" slotName="year" errorMessage={form?.errors?.year?.[0] || ''}>
		<Input
			let:slotName
			name={slotName}
			slot="formItem"
			type="number"
			on:input={() => resetError(slotName)}
		/>
	</FormItem>
</form>
