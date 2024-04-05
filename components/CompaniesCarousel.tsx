import { v4 as uuid } from "uuid"

import CompaniesT from "@/types/companies.types"
import CompanyBox from "./CompanyBox"

const getCompanies = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/companies", { next: { revalidate: 3_600 } })
  return (await res.json()) as CompaniesT[]
}

const CompaniesCarousel = async () => {
  const companies = await getCompanies()

  return (
    <div className="w-full">
      {companies.map((company) => (
        <CompanyBox key={uuid()} company={company} />
      ))}
    </div>
  )
}

export default CompaniesCarousel
