export const salaryCalculationForView = (salary: [number, number?]) => {
  let currentSalary: string = salary[0].toString()
  if (salary[1]) currentSalary += " " + `تا ${salary[1]}`
  currentSalary += " " + "میلیون"

  return currentSalary
}