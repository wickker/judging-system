<script lang="ts">
	import { LoginForm, PageTwoTone, GoogleLogin } from '$lib/components/commons'
	import type { LoginForm as TLoginForm } from '$lib/types/user'
	import { ROUTES } from '$lib/utils/constants/routes'

	async function handleLogin(formFields: TLoginForm) {
		return await fetch(ROUTES.API.REGISTER, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formFields),
		})
	}
</script>

<PageTwoTone
	title="Sign Up"
	description="Sign up for an administrator account to view and manage all your competitions and sessions."
>
	<div class="px-5 py-8">
		<LoginForm buttonText="Sign up" onSubmit={handleLogin} />
	</div>

	<div class="bg-neutral-100 px-5 py-8">
		<GoogleLogin />
	</div>
</PageTwoTone>
