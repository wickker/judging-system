<script lang="ts">
	import IconPlus from '$lib/assets/icon-plus-white.svg'

	export let color: 'indigo' | 'crimson' = 'crimson'

	function getColors() {
		if (color === 'indigo') {
			return `bg-dark-indigo border-dark-indigo text-white`
		}
		return `bg-crimson border-crimson text-white`
	}
</script>

<button
	on:click
	class="flex items-center justify-center rounded-full p-2 text-lg text-white transition-transform active:scale-90 {getColors()} z-50"
>
	<img src={IconPlus} alt="Icon plus" class="h-7 w-7" />
</button>
