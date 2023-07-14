import type { PrismaClient } from '@prisma/client'
import type { CreateJudgeReq } from '$lib/types/judge'

const useJudgeDto = (db: PrismaClient) => {
	const create = async ({ name, email }: CreateJudgeReq, userId: number) =>
		await db.judge.create({
			data: {
				name,
				email,
        userId,
			},
		})

	return { create }
}

export default useJudgeDto
