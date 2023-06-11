import type { PrismaClient } from '@prisma/client'
import type { CompetitionForm } from '$lib/types/competition'

const useCompetitionDto = (db: PrismaClient) => {
	const create = async ({ name, year }: CompetitionForm, userId: number) =>
		await db.competition.create({
			data: {
				name,
				year,
				userId,
			},
		})

	const findAllByUser = async (userId: number) =>
		await db.competition.findMany({
			where: { userId, deletedAt: null },
		})

	return { create, findAllByUser }
}

export default useCompetitionDto
