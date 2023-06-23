<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Header, Page, Select } from '$lib/components/commons'
	import { ROUTES } from '$lib/utils/constants/routes'

	onMount(function () {
		// handle google login
		if ($page.url.searchParams.get('token')) {
			goto(ROUTES.SESSIONS)
		}
	})
</script>

<Page>
	<Header title="Sessions" slot="header">
		<div class="px-3 py-2 shadow-sm">
			<Select
				options={[
					{ label: 'Hello', value: 1 },
					{ label: 'Bye', value: '2' },
				]}
			/>
		</div>
	</Header>

	<div class="px-3 py-2">Rest of the page</div>
</Page>
