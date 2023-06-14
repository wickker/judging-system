import { z } from 'zod'

// Requests
export const CompetitionFormSchema = z.object({
	name: z.string().trim().min(1),
	year: z.number().min(2000),
})

// Responses
export type GetCompetitionsRes = Array<{
	name: string
	year: number
	id: number
	_count: {
		sessions: number
	}
}>

export type CompetitionForm = z.infer<typeof CompetitionFormSchema>
