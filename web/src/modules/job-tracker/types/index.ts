export interface VacancyType {
  _id: string
  company: string
  name: string
  salary: number
  status: 'active' | 'disabled'
  notes: string
}
export const VacancyStatus = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
} as const

export type VacancyStatus = (typeof VacancyStatus)[keyof typeof VacancyStatus]

/* Context */
export interface IVacanciesContext {
  vacancies: VacancyType[]
  setVacancies: React.Dispatch<React.SetStateAction<VacancyType[]>>
}
