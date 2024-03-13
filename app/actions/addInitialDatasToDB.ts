"use server"

import { PrismaClient, Categories, Tags, Provinces, Cities, CooperationTypes } from "@prisma/client"
import { v4 as uuid } from "uuid"

const prisma = new PrismaClient()

const categoriesData: Categories[] = [
  { id: uuid(), name: "برنامه نویسی" },
  { id: uuid(), name: "گرافیک" },
  { id: uuid(), name: "مارکتینگ" }
]

const tagsData: Tags[] = [
  { id: uuid(), name: "فرانت اند", category_id: categoriesData[0].id },
  { id: uuid(), name: "بک اند", category_id: categoriesData[0].id },
  { id: uuid(), name: "موبایل android", category_id: categoriesData[0].id },
  { id: uuid(), name: "موبایل ios", category_id: categoriesData[0].id },

  { id: uuid(), name: "طراح رابط کاربری", category_id: categoriesData[1].id },
  { id: uuid(), name: "فتوشاپ", category_id: categoriesData[1].id },
  { id: uuid(), name: "طراح مانگا", category_id: categoriesData[1].id },

  { id: uuid(), name: "دیجیتال مارکتر", category_id: categoriesData[2].id },
  { id: uuid(), name: "فیسبوک ads", category_id: categoriesData[2].id },
  { id: uuid(), name: "بازاریاب", category_id: categoriesData[2].id },
]

const provincesData: Provinces[] = [
  { id: uuid(), name: "خراسان رضوی" },
  { id: uuid(), name: "تهران" },
  { id: uuid(), name: "شمال" }
]

const citiesData: Cities[] = [
  { id: uuid(), name: "مشهد", province_id: provincesData[0].id },
  { id: uuid(), name: "نیشابور", province_id: provincesData[0].id },
  { id: uuid(), name: "سبزوار", province_id: provincesData[0].id },

  { id: uuid(), name: "تهران", province_id: provincesData[1].id },
  { id: uuid(), name: "کرج", province_id: provincesData[1].id },
  { id: uuid(), name: "شهریار", province_id: provincesData[1].id },

  { id: uuid(), name: "مازندران", province_id: provincesData[2].id },
  { id: uuid(), name: "رشت", province_id: provincesData[2].id },
  { id: uuid(), name: "چالوس", province_id: provincesData[2].id },
  { id: uuid(), name: "انزلی", province_id: provincesData[2].id },
  { id: uuid(), name: "گیلان", province_id: provincesData[2].id },
]

const cooperationTypesData: CooperationTypes[] = [
  { id: uuid(), name: "تمام وقت" },
  { id: uuid(), name: "پاره وقت" },
  { id: uuid(), name: "پروژه ای" }
]

const addInitialDatasToDB = async () => {
  try {
    const categories = await prisma.categories.findMany()
    if (categories.length === 0) {
      await prisma.categories.createMany({ data: categoriesData })
      console.log("Created initial [categories] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [categories] --->", error)
  }

  try {
    const tags = await prisma.tags.findMany()
    if (tags.length === 0) {
      await prisma.tags.createMany({ data: tagsData })
      console.log("Created initial [tags] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [tags] --->", error)
  }

  try {
    const provinces = await prisma.provinces.findMany()
    if (provinces.length === 0) {
      await prisma.provinces.createMany({ data: provincesData })
      console.log("Created initial [provinces] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [provinces] --->", error)
  }

  try {
    const cities = await prisma.cities.findMany()
    if (cities.length === 0) {
      await prisma.cities.createMany({ data: citiesData })
      console.log("Created initial [cities] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [cities] --->", error)
  }

  try {
    const cooperationTypes = await prisma.cooperationTypes.findMany()
    if (cooperationTypes.length === 0) {
      await prisma.cooperationTypes.createMany({ data: cooperationTypesData })
      console.log("Created initial [cooperationTypes] :))")
    }
  } catch (error) {
    console.log("Unknown server error on create [cooperationTypes] --->", error)
  }
}

export default addInitialDatasToDB
