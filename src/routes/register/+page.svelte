<script lang="ts">
	import type { ActionData } from './$types'
	import { enhance } from '$app/forms'

	export let form: ActionData

	$: console.log(form)
  // $: console.log(form?.error)
</script>

<h1>Register</h1>

<form action="?/register" method="POST" use:enhance>
	<div>
		<label for="email">Username</label>
		<input name="email" type="text" required />
	</div>

	<div>
		<label for="password">Password</label>
		<input name="password" type="password" required />
	</div>

	<!-- {#if form?.user}
    <p class="error">Username is taken.</p>
  {/if} -->

	<button type="submit">Register</button>
</form>
