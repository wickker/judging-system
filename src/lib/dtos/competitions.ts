import type { PrismaClient } from '@prisma/client'
import { DateTime } from 'luxon'
import type { CreateCompetitionReq, UpdateCompetitionReq } from '$lib/types/competition'

const useCompetitionDto = (db: PrismaClient) => {
	const create = async ({ name, year }: CreateCompetitionReq, userId: number) =>
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

	const update = async (competition: UpdateCompetitionReq) =>
		await db.competition.update({
			where: { id: competition.id },
			data: {
				name: competition.name,
				year: competition.year,
			},
		})

	const softDelete = async (id: number) =>
		await db.competition.update({
			where: { id },
			data: {
				deletedAt: DateTime.local().toJSDate(),
			},
		})

	return { create, findAllByUser, update, softDelete }
}

export default useCompetitionDto
