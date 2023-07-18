<script lang="ts">
	import { portal } from 'svelte-portal'
	import { createEventDispatcher } from 'svelte'
	import { fade, slide } from 'svelte/transition'
	import type { Option } from './Select.svelte'
	import SelectOption from './SelectOption.svelte'
	import IconSearch from '$lib/assets/icon-search-crimson.svg'
	import { InputText, Icons } from '$lib/components/commons'
	import useDebounce from '$lib/hooks/useDebounce'

	export let options: Array<Option>
	export let selectedOption: Option
	export let hasSearch = false

	let isVisible = false
	let searchRef: HTMLInputElement
	let filteredOptions = options
	let dropdownHeight: number
	let windowHeight: number

	const dispatch = createEventDispatcher<{ select: Option }>()
	const { debounce } = useDebounce()

	$: if (searchRef && isVisible) {
		searchRef.focus()
	}

	export function handleOpen() {
		filteredOptions = options
		isVisible = true
	}

	function handleClose() {
		isVisible = false
	}

	function handleSelect<T>(e: MouseEvent, label: string, value: T, isSelected: boolean) {
		e.stopPropagation()
		if (isSelected) return
		dispatch('select', { label, value })
		handleClose()
	}

	function handleSearch() {
		debounce(function () {
			if (searchRef.value) {
				filteredOptions = options.filter((o) => o.label.includes(searchRef.value))
			} else {
				filteredOptions = options
			}
		})
	}
</script>

<svelte:window bind:innerHeight={windowHeight} />

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
			<!-- Dropdown -->
			<div
				class="absolute bottom-0 flex max-h-[100vh] w-full flex-col overflow-hidden bg-white py-10"
				class:rounded-t-2xl={dropdownHeight && windowHeight && dropdownHeight < windowHeight}
				in:slide={{ axis: 'y', duration: 250 }}
				out:fade={{ duration: 250 }}
				on:click={(e) => e.stopPropagation()}
				bind:offsetHeight={dropdownHeight}
			>
				<!-- Close button -->
				<div class="pb-3 pl-3">
					<button on:click={handleClose}>
						<Icons.Cross class="h-6 w-6 text-dark-indigo" />
					</button>
				</div>

				<!-- Filtered options -->
				<div class="flex flex-col overflow-y-auto px-3">
					{#if filteredOptions.length > 0}
						{#each filteredOptions as { label, value } (value)}
							{@const isSelected = selectedOption?.value === value}
							<SelectOption {handleSelect} {isSelected} {label} {value} />
						{/each}
					{:else}
						<p class="pb-3 text-center text-zinc-500">No data</p>
					{/if}
				</div>

				<!-- Search input -->
				{#if hasSearch}
					<div class="px-3 pt-5">
						<InputText
							leftIcon={IconSearch}
							placeholder="Search"
							bind:ref={searchRef}
							on:input={handleSearch}
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
