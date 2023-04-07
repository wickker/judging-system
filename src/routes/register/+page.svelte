<script lang="ts">
	import type { ActionData } from './$types'
	import { SignInForm, PageTwoTone, GoogleLogin } from '$lib/components/commons'
	import type { FormErrorResp } from '$lib/types/commons'

	export let form: ActionData | FormErrorResp = null
</script>

<PageTwoTone
	title="Sign Up"
	description="Sign up for an administrator account to view and manage all your competitions and sessions."
>
	<div class="px-5 py-8">
		<SignInForm bind:form buttonText="Sign up" />
	</div>

	<div class="bg-neutral-100 px-5 py-8">
		<GoogleLogin />
	</div>
</PageTwoTone>
