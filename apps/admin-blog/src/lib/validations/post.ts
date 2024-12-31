import * as z from "zod"

export const createPostSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  content: z.string().min(20, "Conteúdo deve ter pelo menos 20 caracteres"),
  area: z.enum(["technology", "literature"], {
    required_error: "Por favor selecione uma área",
  }),
})

export const deletePostSchema = z.object({
  id: z.number({
    required_error: "ID do post é obrigatório",
  }),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type DeletePostInput = z.infer<typeof deletePostSchema> 