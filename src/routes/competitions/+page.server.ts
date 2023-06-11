import type { PageServerLoad } from './$types'
import db from '$lib/db/database'
import useCompetitionDto from '$lib/dtos/competitions'

const competitionDto = useCompetitionDto(db)

export const load: PageServerLoad = async ({ locals }) => {
	const competitions = await competitionDto.findAllByUser(locals.user.id)
  return { competitions }
}
