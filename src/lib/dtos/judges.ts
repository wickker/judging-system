import type { PrismaClient } from '@prisma/client'
import type { CreateJudgeReq, UpdateJudgeReq } from '$lib/types/judge'
import { DateTime } from 'luxon'

const useJudgeDto = (db: PrismaClient) => {
	const create = async ({ name, email }: CreateJudgeReq, userId: number) =>
		await db.judge.create({
			data: {
				name,
				email,
				userId,
			},
		})

	const findAllByUser = async (userId: number) =>
		await db.judge.findMany({
			where: { userId, deletedAt: null },
			select: {
				id: true,
				name: true,
				email: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

	const update = async (judge: UpdateJudgeReq) =>
		await db.judge.update({
			where: { id: judge.id },
			data: {
				name: judge.name,
				email: judge.email,
			},
		})

	const emailExists = async (userId: number, judgeEmail: string) =>
		await db.judge.findFirst({
			where: {
				userId,
				email: judgeEmail,
				deletedAt: null,
			},
		})

	const softDelete = async (id: number) =>
		await db.judge.update({
			where: { id },
			data: {
				deletedAt: DateTime.local().toJSDate(),
			},
		})

	return { create, findAllByUser, update, softDelete, emailExists }
}

export default useJudgeDto
