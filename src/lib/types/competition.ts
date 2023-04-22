import { z } from 'zod'

// Requests
export const CompetitionFormSchema = z.object({
	name: z.string().trim().min(1),
	year: z.number().min(2000),
})

// Responses

export type CompetitionForm = z.infer<typeof CompetitionFormSchema>
