export const salaryCalculationForView = (
  minSalary: number,
  maxSalary: number | null
) => `${minSalary} ${maxSalary ? `تا ${maxSalary}` : ""} میلیون`

export const releaseDateCalculation = (date: Date) => {
  const now = new Date()
  const differenceInTime = now.getTime() - date.getTime()
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24))

  return differenceInDays > 0 ? `${differenceInDays} روز گذشته` : "امروز"
}