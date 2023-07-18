import { json, error, type RequestHandler } from '@sveltejs/kit'
import useCompetitionDto from '$lib/dtos/competitions'
import db from '$lib/db/database'
import {
	CreateCompetitionFormSchema,
	DeleteCompetitionSchema,
	UpdateCompetitionFormSchema,
} from '$lib/types/competition'
import logger from '$lib/logger/logger'

const competitionDto = useCompetitionDto(db)

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json()
	const res = DeleteCompetitionSchema.safeParse(data)

	if (!res.success) {
		logger.error(
			`Unable to zod parse delete competition data : ${JSON.stringify(res.error.errors)}`
		)
		throw error(400, { message: JSON.stringify(res.error) })
	}

	await competitionDto.softDelete(res.data.id)

	return json(null)
}

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
