import { z } from 'zod'

// Requests
export const CreateCompetitionFormSchema = z.object({
	name: z.string().trim().min(1),
	year: z.number().min(2000),
})

export const DeleteCompetitionSchema = z.object({
	id: z.number(),
})

export const UpdateCompetitionFormSchema = DeleteCompetitionSchema.merge(
	CreateCompetitionFormSchema
)

// Responses
export type GetCompetitionRes = {
	name: string
	year: number
	id: number
	_count: {
		sessions: number
	}
}

export type CreateCompetitionReq = z.infer<typeof CreateCompetitionFormSchema>
export type UpdateCompetitionReq = z.infer<typeof UpdateCompetitionFormSchema>
export type DeleteCompetitionReq = z.infer<typeof DeleteCompetitionSchema>
