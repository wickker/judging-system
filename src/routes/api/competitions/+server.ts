import { json, error, type RequestHandler } from '@sveltejs/kit'
import useCompetitionDto from '$lib/dtos/competitions'
import db from '$lib/db/database'
import { CreateCompetitionFormSchema, UpdateCompetitionFormSchema } from '$lib/types/competition'
import logger from '$lib/logger/logger'

const competitionDto = useCompetitionDto(db)

export const PUT: RequestHandler = async ({ request }) => {
	const data = await request.json()
	const res = UpdateCompetitionFormSchema.safeParse(data)

	if (!res.success) {
		logger.error(
			`Unable to zod parse update competition data : ${JSON.stringify(res.error.errors)}`
		)
		throw error(400, { message: JSON.stringify(res.error) })
	}

	const competition = await competitionDto.update(res.data)

	return json(competition)
}

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json()
	const res = CreateCompetitionFormSchema.safeParse(data)

	if (!res.success) {
		logger.error(
			`Unable to zod parse create competition data : ${JSON.stringify(res.error.errors)}`
		)
		throw error(400, { message: JSON.stringify(res.error) })
	}

	const competition = await competitionDto.create(res.data, locals.user.id)

	return json(competition)
}
