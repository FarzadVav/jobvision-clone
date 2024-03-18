import { Categories, Cities, CooperationTypes, Provinces, Tags } from "@prisma/client"

export type MegaMenuT = {
  id: string
  name: string
  query: string
  menu: {
    link: { id: string; name: string }
    query: string
    subMenu: { id: string; name: string }[]
  }[]
}

type ContentT = {
  categories: (Categories & { tags: Tags[] })[]
  tags: Tags[]
  provinces: (Provinces & { cities: Cities[] })[]
  cities: Cities[]
  cooperationTypes: CooperationTypes[]
  megaMenu: MegaMenuT[]
}

export default ContentT