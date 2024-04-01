import { create } from "zustand"

import JobAdsT from "@/types/jobads.types"

type UseJobAdsT = {
  selectedJobAd: JobAdsT | undefined
}

const useJobAds = create<UseJobAdsT>(() => ({
  selectedJobAd: undefined,
}))

export default useJobAds