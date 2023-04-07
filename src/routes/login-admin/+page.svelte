<script lang="ts">
	import Logo from '$lib/assets/logo.svg'
	import { GoogleLogin, SignInForm, PageTwoTone } from '$lib/components/commons'
	import type { ActionData } from './$types'
	import type { FormErrorResp } from '$lib/types/commons'

	export let form: ActionData | FormErrorResp = null
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
		<SignInForm bind:form />
	</div>

	<div class="bg-neutral-100 px-5 py-8">
		<GoogleLogin />
	</div>
</PageTwoTone>
