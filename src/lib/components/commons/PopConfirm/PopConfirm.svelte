<script lang="ts">
	import { portal } from 'svelte-portal'
	import { fade } from 'svelte/transition'
	import { useNotification } from '$lib/hooks/useNotification'
	import { Button } from '$lib/components/commons'

	export let title = ''
	export let description = ''

	let confirmCB: () => Promise<Response>
	let successCB: () => void = () => {}
	let isVisible = false
	let isLoading = false

	const notification = useNotification()

	function handleClosePopConfirm() {
		isVisible = false
	}

	function onConfirm(func1: () => Promise<Response>, func2?: () => void) {
		isVisible = true
		confirmCB = func1
		if (func2) {
			successCB = func2
		}
	}

	async function handleConfirm() {
		isLoading = true
		const response = await confirmCB()
		if (response.status >= 400) {
			const errorMessage = await response.json()
			notification.create({
				message: errorMessage,
				type: 'error',
			})
			isLoading = false
			return
		}
		successCB()
		isLoading = false
		handleClosePopConfirm()
	}
</script>

<slot {onConfirm} />

{#if isVisible}
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
				{#if title}
					<p class="mb-1 text-center text-xl text-dark-indigo">{title}</p>
				{/if}
				{#if description}
					<p class="text-center text-sm text-zinc-600">
						{description}
					</p>
				{/if}
				<div class="mt-12" />
				<Button isBlock on:click={handleConfirm} {isLoading}>Ok</Button>
				<div class="m-1" />
				<Button isBlock color="indigo" on:click={handleClosePopConfirm}>Cancel</Button>
			</div>
		</div>
	</div>
{/if}
