"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getCities = async () => {
  try {
    return await prisma.cities.findMany()
  } catch (error) {
    console.log("Unknown error on get cities --->", error)
  }
}

export default getCities