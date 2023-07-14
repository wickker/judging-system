import type { PageServerLoad } from './$types'
import db from '$lib/db/database'
import useJudgeDto from '$lib/dtos/judges'

const judgeDto = useJudgeDto(db)

export const load: PageServerLoad = async ({ locals }) => {
  
	// const competitions = await competitionDto.findAllByUser(locals.user.id)
	// return { competitions }
}