<script lang="ts">
	import Logo from '$lib/assets/logo.svg'

	export let title = ''
	export let description = ''
</script>

<div class="relative flex h-full flex-col bg-dark-indigo">
	<div class="flex flex-row items-center gap-3 px-5 py-8">
		<img src={Logo} alt="Logo" class="mx-[-2px] h-12 w-12" />
		<h1 class="text-3xl text-crimson">{title}</h1>
	</div>

	<p class="px-5 text-base text-neutral-50">
		{description}
	</p>

	<div class="fixed bottom-0 flex w-full flex-col rounded-t-3xl bg-neutral-50 max-w-lg">
		<slot />
	</div>
</div>
