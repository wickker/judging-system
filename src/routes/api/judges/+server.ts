import { json, error, type RequestHandler } from '@sveltejs/kit'
import db from '$lib/db/database'
import logger from '$lib/logger/logger'
import useJudgeDto from '$lib/dtos/judges'
import { CreateJudgeFormSchema, UpdateJudgeFormSchema, DeleteJudgeSchema } from '$lib/types/judge'

const judgeDto = useJudgeDto(db)

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json()
	const res = DeleteJudgeSchema.safeParse(data)

	if (!res.success) {
		logger.error(
			`Unable to zod parse delete judge data : ${JSON.stringify(res.error.errors)}`
		)
		throw error(400, { message: JSON.stringify(res.error) })
	}

	await judgeDto.softDelete(res.data.id)

	return json(null)
}

export const PUT: RequestHandler = async ({ request }) => {
	const data = await request.json()
	const res = UpdateJudgeFormSchema.safeParse(data)

	if (!res.success) {
		logger.error(
			`Unable to zod parse update judge data : ${JSON.stringify(res.error.errors)}`
		)
		throw error(400, { message: JSON.stringify(res.error) })
	}

	const judge = await judgeDto.update(res.data)

	return json(judge)
}

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json()
	const res = CreateJudgeFormSchema.safeParse(data)

	if (!res.success) {
		logger.error(`Unable to zod parse create judge data : ${JSON.stringify(res.error.errors)}`)
		throw error(400, { message: JSON.stringify(res.error) })
	}

	// check that judge doesn't already exist
	const exists = await judgeDto.emailExists(locals.user.id, res.data.email)
	if (exists) {
		throw error(400, { message: 'A judge with the same email already exists' })
	}

	const judge = await judgeDto.create(res.data, locals.user.id)

	return json(judge)
}
