import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const getToken = (user: {}) => {
  try {
    return jwt.sign(user, process.env.TOKEN_KEY as string, {
      expiresIn: "30d"
    })
  } catch (error) {
    console.log("Error on generate token --->", error)
  }
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.TOKEN_KEY as string) as ({ email: string; password: string } | undefined)
  } catch (error) {
    console.log("Error on verify token --->", error)
  }
}

export const hashPassword = (password: string) => {
  try {
    return bcrypt.hashSync(password, 10)
  } catch (error) {
    console.log("Error on hash password --->", error)
  }
}

export const comparePassword = (password: string, hash: string) => {
  try {
    return bcrypt.compareSync(password, hash)
  } catch (error) {
    console.log("Error on compare hashed password --->", error)
  }
}