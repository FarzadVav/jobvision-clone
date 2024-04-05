"use server"

import { CATEGORIES, TAGS, PROVINCES, CITIES, COOPERATION_TYPES } from "@/utils/initialData"
import { prisma } from "@/utils/client"

const addInitialDatasToDB = async () => {
  try {
    const categories = await prisma.categories.findMany()
    if (categories.length === 0) {
      await prisma.categories.createMany({ data: CATEGORIES })
      console.log("Created initial [categories] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [categories] --->", error)
  }

  try {
    const tags = await prisma.tags.findMany()
    if (tags.length === 0) {
      await prisma.tags.createMany({ data: TAGS })
      console.log("Created initial [tags] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [tags] --->", error)
  }

  try {
    const provinces = await prisma.provinces.findMany()
    if (provinces.length === 0) {
      await prisma.provinces.createMany({ data: PROVINCES })
      console.log("Created initial [provinces] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [provinces] --->", error)
  }

  try {
    const cities = await prisma.cities.findMany()
    if (cities.length === 0) {
      await prisma.cities.createMany({ data: CITIES })
      console.log("Created initial [cities] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [cities] --->", error)
  }

  try {
    const cooperationTypes = await prisma.cooperationTypes.findMany()
    if (cooperationTypes.length === 0) {
      await prisma.cooperationTypes.createMany({ data: COOPERATION_TYPES })
      console.log("Created initial [cooperationTypes] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [cooperationTypes] --->", error)
  }
}

export default addInitialDatasToDB
