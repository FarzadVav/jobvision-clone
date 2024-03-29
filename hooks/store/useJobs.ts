import { JobAds } from "@prisma/client"
import { create } from "zustand"

type UseJobsT = {
  jobAds: JobAds[]
  activeFilters: string[]
}

const useJobs = create<UseJobsT>(set => ({
  jobAds: [],
  activeFilters: []
}))

export default useJobs