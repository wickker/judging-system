import type { Action } from '@sveltejs/kit'
// import { fail, redirect } from '@sveltejs/kit'
// import { ROUTES } from '$lib/utils/constants/routes'

const handleInsertUpdate: Action = async ({ request, url }) => {
	const data = Object.fromEntries(await request.formData())
	console.log('data : ', data)
	console.log('url : ', url)
	const action = url.searchParams.get('action')
	console.log('action : ', action)
}

export const actions = { default: handleInsertUpdate }
