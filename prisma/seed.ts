import { CATEGORIES, CITIES, COOPERATION_TYPES, PROVINCES, TAGS } from "./../utils/initialData"
import { prisma } from "./client"

const main = async () => {
  await prisma.categories.deleteMany()
  console.log("[categories] Deleted :))")
  await prisma.categories.createMany({ data: CATEGORIES })
  console.log("initial [categories] Created :))")

  await prisma.tags.deleteMany()
  console.log("[tags] Deleted :))")
  await prisma.tags.createMany({ data: TAGS })
  console.log("initial [tags] Created :))")

  await prisma.provinces.deleteMany()
  console.log("[provinces] Deleted :))")
  await prisma.provinces.createMany({ data: PROVINCES })
  console.log("initial [provinces] Created :))")

  await prisma.cities.deleteMany()
  console.log("[cities] Deleted :))")
  await prisma.cities.createMany({ data: CITIES })
  console.log("initial [cities] Created :))")

  await prisma.cooperationTypes.deleteMany()
  console.log("[cooperationTypes] Deleted :))")
  await prisma.cooperationTypes.createMany({ data: COOPERATION_TYPES })
  console.log("initial [cooperationTypes] Created :))")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })