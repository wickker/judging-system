import { redirect } from "@sveltejs/kit";

export async function POST(event) {
	// console.log('POST')
	// console.log('event : ', event)
  // console.log('req : ', event.request.body)
  const data = Object.fromEntries(await event.request.formData())
  console.log('data : ', data)
  throw redirect(302, '/register')
}
