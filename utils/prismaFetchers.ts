import { v4 as uuid } from "uuid"

import { prisma } from "@/prisma/client"
import ContentT from "@/types/content.types"
import { verifySession } from "./session"
import { FILTER_KEYS } from "./initialData"

export const getCompany = async (cookie?: string) => {
  const session = await verifySession(cookie)

  if (!session) {
    return null
  }

  const companyy = prisma.companies.findUnique({
    where: { email: session.email, password: session.password },
    include: { city: true, job_ads: true }
  })
  if (!companyy) {
    return null
  }

  return companyy
}

export const getContent = async () => {
  const categories = await prisma.categories.findMany({ include: { tags: true } })
  const tags = await prisma.tags.findMany()
  const provinces = await prisma.provinces.findMany({ include: { cities: true } })
  const cities = await prisma.cities.findMany()
  const cooperationTypes = await prisma.cooperationTypes.findMany()

  const content: ContentT = {
    categories,
    tags,
    provinces,
    cities,
    cooperationTypes,
    megaMenu: [
      {
        id: uuid(),
        name: 'دسته بندی مشاغل',
        query: FILTER_KEYS.category,
        menu: categories?.map(category => ({
          link: { id: category.id, name: category.name },
          query: FILTER_KEYS.tag,
          subMenu: category.tags.map(tag => ({ id: tag.id, name: tag.name }))
        }))
      },
      {
        id: uuid(),
        name: 'استان و شهر',
        query: FILTER_KEYS.province,
        menu: provinces?.map(province => ({
          link: { id: province.id, name: province.name },
          query: FILTER_KEYS.city,
          subMenu: province.cities.map(city => ({ id: city.id, name: city.name }))
        }))
      },
      {
        id: uuid(),
        name: 'نوع همکاری',
        query: FILTER_KEYS.cooperationType,
        menu: cooperationTypes?.map(type => ({
          link: { id: type.id, name: type.name },
          query: FILTER_KEYS.cooperationTypeCity,
          subMenu: cities?.map(city => ({ id: `${type.id}_${city.id}`, name: `در ${city.name}` }))
        }))
      }
    ]
  }
  return content
}