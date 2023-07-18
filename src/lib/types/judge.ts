import { z } from 'zod'

// Requests
export const CreateJudgeFormSchema = z.object({
	name: z.string().trim().min(1),
	email: z.string().trim().email(),
})

export const DeleteJudgeSchema = z.object({
	id: z.number(),
})

export const UpdateJudgeFormSchema = DeleteJudgeSchema.merge(CreateJudgeFormSchema)

// Responses
export type GetJudgeRes = {
	id: number
	name: string
	email: string
}

export type CreateJudgeReq = z.infer<typeof CreateJudgeFormSchema>
export type UpdateJudgeReq = z.infer<typeof UpdateJudgeFormSchema>
export type DeleteJudgeReq = z.infer<typeof DeleteJudgeSchema>
