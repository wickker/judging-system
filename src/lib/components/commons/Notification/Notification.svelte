<script lang="ts">
	import { useNotification } from '$lib/hooks/useNotification'
	import { slide } from 'svelte/transition'
	import IconCross from '$lib/assets/icon-cross-white.svg'
	import IconSuccess from '$lib/assets/icon-success-white.svg'
	import IconError from '$lib/assets/icon-error-white.svg'

	const { notifications, remove } = useNotification()
</script>

<div class="absolute top-0 flex w-full max-w-lg flex-col gap-2 p-3">
	{#each $notifications as { uuid, type, message } (uuid)}
		<div
			class="z-10 grid w-full grid-cols-[1fr_24px] items-start gap-3 rounded-md p-3 text-white shadow-lg"
			class:bg-crimson={type === 'error'}
			class:bg-[#149960]={type === 'success'}
			transition:slide={{ duration: 250, axis: 'y' }}
		>
			<div class="flex items-start justify-start gap-2">
				{#if type === 'success'}
					<img src={IconSuccess} alt="Icon success" class="h-6 w-6" />
				{:else}
					<img src={IconError} alt="Icon error" class="h-6 w-6" />
				{/if}
				<p>{message}</p>
			</div>

			<button class='transition-transform active:scale-90' on:click={() => remove(uuid)}>
				<img src={IconCross} alt="Icon cross" class="h-6 w-6" />
			</button>
		</div>
	{/each}
</div>

<slot />
