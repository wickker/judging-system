<script lang="ts">
	import { fade } from 'svelte/transition'
	import IconHamburger from '$lib/assets/icon-hamburger-crimson.svg'
	import IconSearch from '$lib/assets/icon-search-crimson.svg'
	import IconCross from '$lib/assets/icon-cross-crimson.svg'
	import { Input, Menu } from '$lib/components/commons'

	export let hasSearch = false
	export let searchPlaceholder = ''
	export let title = ''

	let isSearchVisible = false
	let searchValue = ''
	let isMenuVisible = false

	function handleClickSearch() {
		isSearchVisible = true
	}

	function handleSearchInputChange() {
		console.log('search value : ', searchValue) // TODO: Change this
	}

	function handleClickCross() {
		isSearchVisible = false
		searchValue = ''
	}

	function handleCLickMenu() {
		isMenuVisible = !isMenuVisible
	}

	function handleCloseMenu() {
		isMenuVisible = false
	}
</script>

<div class="grid h-[70px] grid-cols-[40px_1fr_40px] items-center gap-x-3 bg-dark-indigo px-5">
	{#if isSearchVisible}
		<button
			class="transition-transform active:scale-90"
			on:click={handleClickCross}
			in:fade={{ duration: 250 }}
		>
			<img src={IconCross} alt="Icon cross" class="h-10 w-10" />
		</button>
	{:else}
		<button
			class="transition-transform active:scale-90"
			in:fade={{ duration: 250 }}
			on:click={handleCLickMenu}
		>
			<img src={IconHamburger} alt="Icon hamburger" class="h-10 w-10" />
		</button>
	{/if}

	{#if isSearchVisible}
		<div class="col-span-2" in:fade={{ duration: 250 }}>
			<Input
				bind:value={searchValue}
				on:input={handleSearchInputChange}
				placeholder={searchPlaceholder}
			/>
		</div>
	{:else}
		<h1 class="text-3xl text-white" in:fade={{ duration: 250 }}>{title}</h1>

		{#if hasSearch}
			<button
				class="transition-transform active:scale-90"
				on:click={handleClickSearch}
				in:fade={{ duration: 250 }}
			>
				<img src={IconSearch} alt="Icon search" class="h-9 w-9" />
			</button>
		{/if}
	{/if}
</div>

{#if isMenuVisible}
	<Menu on:close={handleCloseMenu} />
{/if}

<!-- Rest of the page goes here -->
<slot />
