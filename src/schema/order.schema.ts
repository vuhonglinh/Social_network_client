import { z } from "zod";

export const formSchemaOrder = z.object({
    username: z.string().min(2).max(50),
})