import JobAdsT from "@/types/jobads.types"
import { create } from "zustand"

type UseJobsT = {
  jobAds: JobAdsT[]
  selectedJobAd: JobAdsT | undefined
  activeFilters: string[]
  addFilter: (filter: string) => void
  removeFilter: (filter: string) => void
}

const useJobs = create<UseJobsT>((set) => ({
  jobAds: [],
  selectedJobAd: undefined,
  activeFilters: [],
  addFilter: (filter) => set(state => ({ activeFilters: [...state.activeFilters, filter] })),
  removeFilter: (filter) => set(state => ({
    activeFilters: state.activeFilters.filter(active => !active.includes(filter))
  }))
}))

export default useJobs