<script lang="ts">
	import { LoginForm, PageTwoTone, GoogleLogin } from '$lib/components/commons'
	// import type { Form } from '$lib/types/commons'
	// import type { LoginForm } from '$lib/types/user'

	// export let form: Form<UserRegistrationForm> = null
</script>

<PageTwoTone
	title="Sign Up"
	description="Sign up for an administrator account to view and manage all your competitions and sessions."
>
	<div class="px-5 py-8">
		<LoginForm />
	</div>

	<div class="bg-neutral-100 px-5 py-8">
		<GoogleLogin />
	</div>
</PageTwoTone>
