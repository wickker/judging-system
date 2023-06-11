import { json, error, type RequestHandler } from '@sveltejs/kit'
import useCompetitionDto from '$lib/dtos/competitions'
import db from '$lib/db/database'
import { CompetitionFormSchema } from '$lib/types/competition'
import logger from '$lib/logger/logger'

const competitionDto = useCompetitionDto(db)

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json()
	const res = CompetitionFormSchema.safeParse(data)

	if (!res.success) {
		logger.error(`Unable to zod parse create competition data : ${JSON.stringify(res.error.errors)}`)
		throw error(400, { message: JSON.stringify(res.error) })
	}

	const competition = await competitionDto.create(res.data, locals.user.id)

	return json(competition)
}
