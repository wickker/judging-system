<script lang="ts" context="module">
	export type Option<T = unknown> = {
    label: string,
    value: T
  }
</script>

<script lang="ts">
	import IconChevron from '$lib/assets/icon-chevron-neutral.svg'

	export let isDisabled = false
	export let hasError = false
	export let placeholder = 'Select an option'

	let selectedOption: Option
</script>

<button
	class="grid h-12 w-full grid-cols-[1fr_24px] rounded border bg-white px-2.5 py-3 text-left text-base text-neutral-600 outline-none"
	class:border-neutral-100={isDisabled}
	class:border-neutral-200={!isDisabled}
	class:border-red-400={hasError}
  class:text-neutral-400={!selectedOption?.label}
  class:text-neutral-600={!!selectedOption?.label}
>
	{selectedOption?.label || placeholder}
	<img src={IconChevron} alt="Icon chevron" class="h-6 w-6 rotate-180" />
</button>
