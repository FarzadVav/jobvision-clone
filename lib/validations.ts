import { z } from "zod"
import { Companies } from "@prisma/client"

type userT = Pick<Companies, "email" | "password">
export const checkUserForRegister = (user: userT) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(256)
  })

  return schema.safeParse(user).success
}