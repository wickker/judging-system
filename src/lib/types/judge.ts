import { z } from 'zod'

// Requests
export const CreateJudgeFormSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
})

// Responses

export type CreateJudgeReq = z.infer<typeof CreateJudgeFormSchema>