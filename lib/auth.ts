import jwt from "jsonwebtoken"

export const signUser = (user: {}) => {
  try {
    const token = jwt.sign(user, process.env.TOKEN_KEY as string, {
      expiresIn: "30d"
    })
    return token
  } catch (error) {
    console.log("Error on generate token --->", error)
  }
}