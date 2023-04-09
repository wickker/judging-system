<script lang="ts">
	import { goto } from '$app/navigation'
	import Logo from '$lib/assets/logo.svg'
	import { Button } from '$lib/components/commons'
	import { ROUTES } from '$lib/utils/constants/routes'
</script>

<div class="relative flex h-full flex-row items-center justify-center bg-dark-indigo">
	<img src={Logo} alt="Logo" class="mb-[332px] h-28 w-28" />
	<div class="fixed bottom-0 flex w-full max-w-lg flex-col gap-5 rounded-t-3xl bg-neutral-50 px-5 py-8">
		<h1 class="mb-3 text-2xl text-neutral-700">Welcome</h1>
		<Button isBlock on:click={() => goto(ROUTES.LOGIN_ADMIN)}>Sign in (as Administrator)</Button>
		<Button isBlock>Sign in (as Judge)</Button>
		<div />
		<Button isBlock color="indigo" on:click={() => goto(ROUTES.REGISTER)}>Sign up</Button>
	</div>
</div>
