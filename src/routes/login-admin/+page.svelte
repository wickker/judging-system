<script lang="ts">
	import type { ActionData } from './$types'
	import { enhance } from '$app/forms'
	import { ROUTES } from '$lib/utils/constants/routes'

	export let form: ActionData

	$: console.log('login admin form : ', form)
</script>

<!-- <h1>Login - Admin</h1>

<form method="POST" use:enhance>
	<div>
		<label for="email">Username</label>
		<input name="email" type="text" required />
	</div>

	<div>
		<label for="password">Password</label>
		<input name="password" type="password" required />
	</div>

	<button type="submit">Login</button>
</form>

<br />
<form method="POST" action={ROUTES.LOGOUT}>
	<button type="submit">Logout</button>
</form> -->
