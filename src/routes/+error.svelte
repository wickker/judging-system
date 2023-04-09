<script>
	import { page } from '$app/stores'
	import IconSadFace from '$lib/assets/icon-sad-face-crimson.svg'
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 bg-dark-indigo text-center">
	<img src={IconSadFace} alt="Icon sad face" class="h-14 w-14" />
	<h1 class="text-xl text-crimson">Oops, an error has occured</h1>
	<p class="text-base text-neutral-50">{$page.error?.message}</p>
</div>
