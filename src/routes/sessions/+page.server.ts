import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	console.log('/sessions event : ', event)
}
