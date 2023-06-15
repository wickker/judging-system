import type { PrismaClient } from '@prisma/client'
import type { CreateCompetitionForm, UpdateCompetitionForm } from '$lib/types/competition'

const useCompetitionDto = (db: PrismaClient) => {
	const create = async ({ name, year }: CreateCompetitionForm, userId: number) =>
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

	const update = async (competition: UpdateCompetitionForm) =>
		await db.competition.update({
			where: { id: competition.id },
			data: {
				name: competition.name,
				year: competition.year,
			},
		})

	return { create, findAllByUser, update }
}

export default useCompetitionDto
