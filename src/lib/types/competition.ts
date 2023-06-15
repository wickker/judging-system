import { z } from 'zod'

// Requests
export const CreateCompetitionFormSchema = z.object({
	name: z.string().trim().min(1),
	year: z.number().min(2000),
})

// Responses
export const UpdateCompetitionFormSchema = z.object({
	id: z.number(),
}).merge(CreateCompetitionFormSchema)

export type GetCompetitionRes = {
	name: string
	year: number
	id: number
	_count: {
		sessions: number
	}
}

export type CreateCompetitionForm = z.infer<typeof CreateCompetitionFormSchema>
export type UpdateCompetitionForm = z.infer<typeof UpdateCompetitionFormSchema>
