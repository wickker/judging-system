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
			select: {
				id: true,
				name: true,
				year: true,
				_count: {
					select: {
						sessions: {
							where: { deletedAt: null },
						},
					},
				},
			},
			orderBy: {
				createdAt: 'desc', // newest first
			},
		})

	return { create, findAllByUser }
}

export default useCompetitionDto
