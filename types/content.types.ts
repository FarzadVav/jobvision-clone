import { CategoriesT, CitiesT, CooperationTypesT, ProvincesT, TagsT } from "./prisma.types"

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
  categories: CategoriesT[]
  tags: TagsT[]
  provinces: ProvincesT[]
  cities: CitiesT[]
  cooperationTypes: CooperationTypesT[]
  megaMenu: MegaMenuT[]
}

export default ContentT