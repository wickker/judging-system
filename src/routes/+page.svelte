<script lang="ts">
	import { onMount } from 'svelte'
	import Logo from '$lib/assets/logo.svg'
	import { Input, FormItem, Button } from '$lib/components/commons'

	let loginElement: HTMLDivElement | undefined = undefined

	onMount(async () => {
		google.accounts.id.initialize({
			client_id: '301604255242-geljs46di82rvv80uv2qvg0marl66to1.apps.googleusercontent.com',
			ux_mode: 'redirect',
			// context: 'use',
			login_uri: 'http://localhost:5173/api/google-auth',
		})
		google.accounts.id.renderButton(loginElement, {
			width: '220',
			theme: 'outline',
			size: 'large',
			type: 'standard',
			text: 'signin_with',
			shape: 'rectangular',
			logo_alignment: 'left',
		})
	})

  $: console.log(import.meta.env.MODE)
</script>

<div class="relative flex h-full flex-row items-center justify-center bg-dark-indigo">
	<img src={Logo} alt="Logo" class="mb-[332px] h-28 w-28" />
	<div class="absolute bottom-0 flex w-full flex-col gap-5 rounded-t-3xl bg-neutral-50 px-5 py-8">
		<!-- <FormItem label="Email" slotName="email">
			<Input let:slotName name={slotName} slot="formItem" />
		</FormItem> -->
		<h1 class="mb-3 text-2xl text-neutral-700">Welcome</h1>
		<Button isBlock>Sign in (as Administrator)</Button>
		<Button isBlock>Sign in (as Judge)</Button>
		<div />
		<Button isBlock color="indigo">Sign up</Button>
		<div />

		<!-- <div class="g_id_signin" bind:this={loginElement} /> -->
		<div id="buttonDiv" bind:this={loginElement} />
	</div>
</div>
