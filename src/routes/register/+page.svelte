<script lang="ts">
	import { LoginForm, PageTwoTone, GoogleLogin } from '$lib/components/commons'
	import { ROUTES } from '$lib/utils/constants/routes'
</script>

<PageTwoTone
	title="Sign Up"
	description="Sign up for an administrator account to view and manage all your competitions and sessions."
>
	<div class="px-5 py-8">
		<LoginForm buttonText="Sign up" route={ROUTES.API.REGISTER} />
	</div>

	<div class="bg-neutral-100 px-5 py-8">
		<GoogleLogin />
	</div>
</PageTwoTone>
