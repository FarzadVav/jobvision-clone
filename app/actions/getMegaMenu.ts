"use server"

import { PrismaClient } from "@prisma/client"
import { v4 as uuid } from "uuid"

const prisma = new PrismaClient()

const getMegaMenu = async () => {
  const categories = await prisma.categories.findMany({ include: { tags: true } })
  const provinces = await prisma.provinces.findMany({ include: { cities: true } })
  const cities = await prisma.cities.findMany()
  const cooperationTypes = await prisma.cooperationTypes.findMany()

  type MegaMenuT = {
    id: string
    name: string
    query: string
    menu: {
      link: { id: string; name: string }
      query: string
      subMenu: { id: string; name: string }[]
    }[]
  }
  const megaMenu: MegaMenuT[] = [
    {
      id: uuid(),
      name: 'دسته بندی مشاغل',
      query: 'category',
      menu: categories?.map(category => ({
        link: { id: category.id, name: category.name },
        query: 'tag',
        subMenu: category.tags.map(tag => ({ id: tag.id, name: tag.name }))
      }))
    },
    {
      id: uuid(),
      name: 'استان و شهر',
      query: 'province',
      menu: provinces?.map(province => ({
        link: { id: province.id, name: province.name },
        query: 'city',
        subMenu: province.cities.map(city => ({ id: city.id, name: city.name }))
      }))
    },
    {
      id: uuid(),
      name: 'نوع همکاری',
      query: 'cooperationType',
      menu: cooperationTypes?.map(type => ({
        link: { id: type.id, name: type.name },
        query: 'cooperationType-city',
        subMenu: cities?.map(city => ({ id: city.id, name: `در ${city.name}` }))
      }))
    }
  ]

  return megaMenu
}

export default getMegaMenu