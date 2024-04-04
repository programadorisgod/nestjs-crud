import { z } from 'zod'

export const createItemSchema = z.object({
  name: z.string(),
  description: z.string(),
})
