<script lang="ts">
	import type { ActionData } from './$types'
	import { enhance } from '$app/forms'

	export let form: ActionData

	$: console.log('sign up form : ', form)
</script>

<!-- <h1>Register</h1>

<form method="POST" use:enhance>
	<div>
		<label for="email">Username</label>
		<input name="email" type="text" required />
	</div>

	<div>
		<label for="password">Password</label>
		<input name="password" type="password" required />
	</div>

	<button type="submit">Register</button>
</form> -->
