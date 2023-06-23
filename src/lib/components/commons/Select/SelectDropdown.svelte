<script lang="ts">
	import { portal } from 'svelte-portal'
	import { fade, slide } from 'svelte/transition'
	import type { Option } from './Select.svelte'
	import IconTick from '$lib/assets/icon-tick-crimson.svg'

	export let options: Array<Option>
	export let selectedOption: Option

	let isVisible = false

	export function handleOpen() {
		isVisible = true
	}

	function handleClose() {
		isVisible = false
	}

	function handleSelect<T>(e: MouseEvent, label: string, value: T, isSelected: boolean) {
		e.stopPropagation()
		if (isSelected) return
		selectedOption = { label, value }
		handleClose()
	}
</script>

{#if isVisible}
	<div
		class="absolute inset-0 flex justify-center bg-transparent"
		transition:fade={{ duration: 250 }}
		use:portal={'body'}
		hidden={!isVisible}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="relative flex h-full w-full max-w-lg flex-col justify-center bg-black bg-opacity-50"
			on:click={handleClose}
		>
			<div
				class="absolute bottom-0 w-full rounded-t-2xl bg-white px-3 py-8"
				transition:slide={{ axis: 'y', duration: 250 }}
			>
				{#each options as { label, value } (value)}
					{@const isSelected = selectedOption?.value === value}
					<button
						class="flex w-full justify-between border-b border-b-zinc-200 py-2 text-dark-indigo"
						on:click={(e) => handleSelect(e, label, value, isSelected)}
					>
						<p class:font-semibold={isSelected}>{label}</p>

						{#if isSelected}
							<img src={IconTick} alt="Icon tick" class="h-6 w-6" />
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}
