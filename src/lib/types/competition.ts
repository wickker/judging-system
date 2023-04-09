import { z } from 'zod'

// Requests
export const CompetitionFormSchema = z.object({
	email: z.string().trim().min(1),
	year: z.number().min(4),
})

// Responses

export type CompetitionForm = z.infer<typeof CompetitionFormSchema>
