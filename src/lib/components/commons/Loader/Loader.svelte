<script lang='ts'>
	export let size: 's' | 'm' = 'm'
</script>

<div
	class="animate-spin rounded-full border-neutral-400 border-t-dark-indigo"
	class:h-8={size === 'm'}
	class:w-8={size === 'm'}
	class:border-[6px]={size === 'm'}
	class:h-6={size === 's'}
	class:w-6={size === 's'}
	class:border-[4px]={size === 's'}
/>
