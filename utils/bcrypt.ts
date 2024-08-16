import bcrypt from "bcrypt"

export const hashString = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export const compareHashed = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash)
}