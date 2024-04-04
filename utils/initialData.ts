import { Categories, Tags, Provinces, Cities, CooperationTypes } from "@prisma/client"
import { v4 as uuid } from "uuid"

export const CATEGORIES: Categories[] = [
  { id: uuid(), name: "برنامه نویسی" },
  { id: uuid(), name: "گرافیک" },
  { id: uuid(), name: "مارکتینگ" }
]

export const TAGS: Tags[] = [
  { id: uuid(), name: "فرانت اند", category_id: CATEGORIES[0].id },
  { id: uuid(), name: "بک اند", category_id: CATEGORIES[0].id },
  { id: uuid(), name: "موبایل android", category_id: CATEGORIES[0].id },
  { id: uuid(), name: "موبایل ios", category_id: CATEGORIES[0].id },

  { id: uuid(), name: "طراح رابط کاربری", category_id: CATEGORIES[1].id },
  { id: uuid(), name: "فتوشاپ", category_id: CATEGORIES[1].id },
  { id: uuid(), name: "طراح مانگا", category_id: CATEGORIES[1].id },

  { id: uuid(), name: "دیجیتال مارکتر", category_id: CATEGORIES[2].id },
  { id: uuid(), name: "فیسبوک ads", category_id: CATEGORIES[2].id },
  { id: uuid(), name: "بازاریاب", category_id: CATEGORIES[2].id },
]

export const PROVINCES: Provinces[] = [
  { id: uuid(), name: "خراسان رضوی" },
  { id: uuid(), name: "تهران" },
  { id: uuid(), name: "شمال" }
]

export const CITIES: Cities[] = [
  { id: uuid(), name: "مشهد", province_id: PROVINCES[0].id },
  { id: uuid(), name: "نیشابور", province_id: PROVINCES[0].id },
  { id: uuid(), name: "سبزوار", province_id: PROVINCES[0].id },

  { id: uuid(), name: "تهران", province_id: PROVINCES[1].id },
  { id: uuid(), name: "کرج", province_id: PROVINCES[1].id },
  { id: uuid(), name: "شهریار", province_id: PROVINCES[1].id },

  { id: uuid(), name: "مازندران", province_id: PROVINCES[2].id },
  { id: uuid(), name: "رشت", province_id: PROVINCES[2].id },
  { id: uuid(), name: "چالوس", province_id: PROVINCES[2].id },
  { id: uuid(), name: "انزلی", province_id: PROVINCES[2].id },
  { id: uuid(), name: "گیلان", province_id: PROVINCES[2].id },
]

export const COOPERATION_TYPES: CooperationTypes[] = [
  { id: uuid(), name: "تمام وقت" },
  { id: uuid(), name: "پاره وقت" },
  { id: uuid(), name: "پروژه ای" }
]

export const FILTER_KEYS = {
  search: "search",
  remote: "remote",
  knowledgeBased: "knowledgeBased",
  type: "type",
  salary: "salary",
  category: "category",
  tag: "tag",
  province: "province",
  city: "city",
  cooperationType: "cooperationType",
  cooperationTypeCity: "cooperationType-city",
}

export const SALARY_FILTERS: [number, number][] = [
  [0, 5],
  [5, 10],
  [10, 15],
  [15, 25],
  [25, 35],
  [35, 60],
  [60, 100]
]