<script lang="ts">
	import { onMount } from 'svelte'
	import { FormItem, InputText } from '$lib/components/commons'
	import type { FormErrors, FormRefs } from '$lib/hooks/useForm'
	import type { CreateJudgeReq } from '$lib/types/judge'

	export let form: CreateJudgeReq
	export let refs: FormRefs<CreateJudgeReq>
	export let errors: FormErrors<CreateJudgeReq>

	onMount(function () {
		refs.name?.focus()
	})
</script>

<FormItem label="Name" errorMessage={errors.name}>
	<InputText bind:value={form.name} bind:ref={refs.name} hasError={!!errors.name} />
</FormItem>

<FormItem label="Email" errorMessage={errors.email}>
	<InputText bind:value={form.email} bind:ref={refs.email} hasError={!!errors.email} />
</FormItem>