import { create } from "zustand"

import JobAdsT from "@/types/jobads.types"

type UseJobAdsT = {
  jobAds: JobAdsT[]
}

const useJobAds = create<UseJobAdsT>(() => ({
  jobAds: [],
}))

export default useJobAds