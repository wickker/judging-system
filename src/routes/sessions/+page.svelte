<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Header, Page, Select } from '$lib/components/commons'
	import { ROUTES } from '$lib/utils/constants/routes'

	export let data

	$: competitionOptions = data.competitions.map((c) => ({
		label: `${c.name} (${c.year})`,
		value: c.id,
	}))

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
				options={competitionOptions}
				placeholder='Select a competition'
			/>
		</div>
	</Header>

	<div class="px-3 py-2">Rest of the page</div>
</Page>
