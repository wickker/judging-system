<script lang="ts">
	import { onMount } from 'svelte'
	import type { Form } from '$lib/types/commons'

	export let form: Form<any> = null

	export function resetError(keyName: string) {
		if (form?.errors?.[keyName] && form.errors[keyName].length > 0) {
			form.errors[keyName] = []
		}
	}
</script>
