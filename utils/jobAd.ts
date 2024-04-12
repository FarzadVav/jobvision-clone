export const salaryCalculationForView = (salary: [number, number?]) => {
  let currentSalary: string = salary[0].toString()
  if (salary[1]) currentSalary += " " + `تا ${salary[1]}`
  currentSalary += " " + "میلیون"

  return currentSalary
}

export const releaseDateCalculation = (date: Date) => {
  const now = new Date()
  const differenceInTime = date.getTime() - now.getTime()
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24))

  return differenceInDays > 0 ? + `${differenceInDays} روز گذشته` : "امروز"
}