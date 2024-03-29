import { JobAds } from "@prisma/client"
import { create } from "zustand"

type UseJobsT = {
  jobAds: JobAds[]
  activeFilters: string[]
  addFilter: (filter: string) => void
  removeFilter: (filter: string) => void
}

const useJobs = create<UseJobsT>((set) => ({
  jobAds: [],
  activeFilters: [],
  addFilter: (filter) => set(state => ({ activeFilters: [...state.activeFilters, filter] })),
  removeFilter: (filter) => set(state => ({
    activeFilters: state.activeFilters.filter(active => !active.includes(filter))
  }))
}))

export default useJobs