<script lang="ts">
	import { Header, Page, Select } from '$lib/components/commons'

	export let data

	$: competitionOptions = data.competitions.map((c) => ({
		label: `${c.name} (${c.year})`,
		value: c.id,
	}))
</script>

<Page>
	<Header title="Sessions" slot="header">
		<div class="px-3 py-2 shadow-sm">
			<Select options={competitionOptions} placeholder="Select a competition" hasSearch />
		</div>
	</Header>

	<div class="px-3 py-2" />
</Page>
