<script lang="ts">
	import { GoogleLogin, PageTwoTone, Button } from '$lib/components/commons'
	import LoginForm from '$lib/components/commons/LoginForm/LoginForm.svelte'
	// import type { Form } from '$lib/types/commons'
	// import type { LoginForm } from '$lib/types/user'

	// export let form: Form<LoginForm> = null

	// TODO: Handle case { errorMessage: 'Invalid credentials' } with notifications
	// $: console.log('form : ', form)
</script>

<!-- <br />
<form method="POST" action={ROUTES.LOGOUT}>
	<button type="submit">Logout</button>
</form> -->

<PageTwoTone
	title="Sign In"
	description="Sign in as an administrator to view and manage all your competitions and sessions."
>
	<div class="px-5 py-8">
		<!-- <SignInForm bind:form buttonText="Sign in" showPasswordHelper buttonColor="indigo" /> -->
		<!-- <LoginForm /> -->
	</div>

	<div class="bg-neutral-100 px-5 py-8">
		<GoogleLogin />
	</div>
</PageTwoTone>
