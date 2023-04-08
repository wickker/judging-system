<script>
	import { page } from '$app/stores'
	import IconSadFace from '$lib/assets/icon-sad-face-crimson.svg'

	// TODO: Clean this up
</script>

<div class="flex flex-row items-center justify-center gap-4 bg-dark-indigo text-center">
	<img src={IconSadFace} alt="Icon sad face" class="h-10 w-10" />
	<h1 class="text-xl text-crimson">Ooops, an error has occured</h1>
	<p class="text-base text-neutral-50">{$page.error?.message}</p>
</div>
