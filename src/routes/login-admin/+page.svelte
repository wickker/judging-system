<script lang="ts">
	import { GoogleLogin, PageTwoTone } from '$lib/components/commons'
	import LoginForm from '$lib/components/commons/LoginForm/LoginForm.svelte'
	import type { LoginForm as TLoginForm } from '$lib/types/user'
  import { ROUTES } from '$lib/utils/constants/routes'

	async function handleLogin(formFields: TLoginForm) {
		return await fetch(ROUTES.API.LOGIN_ADMIN, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formFields),
		})
	}
</script>

<PageTwoTone
	title="Sign In"
	description="Sign in as an administrator to view and manage all your competitions and sessions."
>
	<div class="px-5 py-8">
		<LoginForm buttonText="Log in" onSubmit={handleLogin}/>
	</div>

	<div class="bg-neutral-100 px-5 py-8">
		<GoogleLogin />
	</div>
</PageTwoTone>
