import type { CompetitionForm } from '$lib/types/competition'
import type { PrismaClient } from '@prisma/client'

const useCompetitionDto = (db: PrismaClient) => {
	const create = async ({ name, year }: CompetitionForm, userId: number) =>
		await db.competition.create({
			data: {
				name,
				year,
        userId
			},
		})

	return { create }
}

export default useCompetitionDto
