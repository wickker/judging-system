<script lang="ts">
	import Logo from '$lib/assets/logo.svg'
	import { Input, FormItem, Button } from '$lib/components/commons'
</script>

<div class="relative h-full flex flex-row items-center justify-center bg-dark-indigo">
	<img src={Logo} alt="Logo" class="h-28 w-28 mb-[332px]" />
	<div class="absolute bottom-0 w-full bg-neutral-50 px-5 py-8 flex flex-col gap-5 rounded-t-3xl">
		<!-- <FormItem label="Email" slotName="email">
			<Input let:slotName name={slotName} slot="formItem" />
		</FormItem> -->
    <h1 class='text-2xl text-neutral-700 mb-3'>Welcome</h1>
    <Button isBlock>Sign in (as Administrator)</Button>
    <Button isBlock>Sign in (as Judge)</Button>
    <div />
    <Button isBlock color='indigo'>Sign up</Button>
	</div>
</div>
