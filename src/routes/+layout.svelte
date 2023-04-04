<script lang="ts">
	import '../app.css'
</script>

<svelte:head>
	<!-- TODO: Change this -->
	<meta name="description" content="Svelte demo app" />
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div class="mx-auto h-screen w-full max-w-lg bg-neutral-50">
	<slot />
</div>
