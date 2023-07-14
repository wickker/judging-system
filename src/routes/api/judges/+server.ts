import { json, error, type RequestHandler } from '@sveltejs/kit'
import db from '$lib/db/database'
import logger from '$lib/logger/logger'
import useJudgeDto from '$lib/dtos/judges'
import { CreateJudgeFormSchema } from '$lib/types/judge'

const judgeDto = useJudgeDto(db)

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json()
	const res = CreateJudgeFormSchema.safeParse(data)

	if (!res.success) {
		logger.error(
			`Unable to zod parse create judge data : ${JSON.stringify(res.error.errors)}`
		)
		throw error(400, { message: JSON.stringify(res.error) })
	}

  // TODO: Check that judge doesn't already exist

	const judge = await judgeDto.create(res.data, locals.user.id)

	return json(judge)
}