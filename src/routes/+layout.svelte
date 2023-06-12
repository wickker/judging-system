<script lang="ts">
	import '../app.css'
</script>

<svelte:head>
	<meta name="description" content="Judging for performance sports simplified!" />
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div class="mx-auto h-screen max-h-screen w-full max-w-lg bg-neutral-50">
	<slot />
</div>
