<script lang="ts">
	export let color: 'indigo' | 'crimson' = 'crimson'
	export let buttonType: 'bordered' | 'filled' = 'filled'
	export let isBlock = false
	export let type: 'button' | 'submit' | 'reset' = 'button'

	function getColors() {
		if (buttonType === 'bordered' && color === 'crimson') {
			return 'bg-white border-crimson text-crimson'
		} else if (buttonType === 'bordered' && color === 'indigo') {
			return 'bg-white border-dark-indigo text-dark-indigo'
		} else if (color === 'indigo') {
			return `bg-dark-indigo border-dark-indigo text-white`
		}
		return `bg-crimson border-crimson text-white`
	}
</script>

<button
	on:click
	class="flex h-12 max-w-full flex-row items-center justify-center truncate rounded border-2 px-6 py-3 text-lg text-white transition-transform active:scale-90 {getColors()}"
	class:w-full={isBlock}
	{type}
>
	<slot />
</button>
