import { z } from "zod";

export const formSchemaPost = z.object({
    description: z.string().min(1).max(900),
})