<script lang="ts">
	import { portal } from 'svelte-portal'
	import { fade } from 'svelte/transition'
	import Button from '../Button/Button.svelte'

	export let isVisible = false
	// export let title = ''

	function handleCloseModal() {
		isVisible = false
	}
</script>

<div
	class="absolute inset-0 flex justify-center bg-transparent"
	transition:fade={{ duration: 250 }}
	use:portal={'body'}
	hidden={!isVisible}
>
	<div
		class="relative flex h-full w-full max-w-lg flex-col justify-center bg-black bg-opacity-50 px-5"
	>
		<div class="flex w-full flex-col items-center justify-center rounded-2xl bg-white px-5 py-10">
			<p class="mb-1 text-center text-xl text-dark-indigo">Are you sure to delete?</p>
			<p class="mb-12 text-center text-sm text-zinc-600">
				Long ass description and warning about action to be taken.
			</p>
			<Button isBlock>Ok</Button>
			<div class="m-1" />
			<Button isBlock color="indigo">Cancel</Button>
		</div>
	</div>
</div>
