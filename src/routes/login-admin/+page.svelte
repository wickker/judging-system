<script lang="ts">
	import { GoogleLogin, PageTwoTone } from '$lib/components/commons'
	import LoginForm from '$lib/components/commons/LoginForm/LoginForm.svelte'
  import { ROUTES } from '$lib/utils/constants/routes'
</script>

<PageTwoTone
	title="Sign In"
	description="Sign in as an administrator to view and manage all your competitions and sessions."
>
	<div class="px-5 py-8">
		<LoginForm buttonText="Log in" route={ROUTES.API.LOGIN_ADMIN}/>
	</div>

	<div class="bg-neutral-100 px-5 py-8">
		<GoogleLogin />
	</div>
</PageTwoTone>
