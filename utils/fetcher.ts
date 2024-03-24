import ContentT from "@/types/content.types";

export const contentFetcher = () => fetch("/api/content")
  .then((res) => res.json())
  .then((data) => data as ContentT)