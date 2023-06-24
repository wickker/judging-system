<div class="grid h-full w-full grid-rows-[auto_1fr]">
	{#if $$slots.header}
		<slot name="header" />
	{:else}
		<div />
	{/if}

	<slot />
</div>
