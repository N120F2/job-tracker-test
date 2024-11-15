import { useContext } from 'react'

import { VacanciesContext } from '../context'

export const useVacanciesContext = () => {
  const context = useContext(VacanciesContext)
  if (!context) throw new Error('[Error] "VacanciesContext" used out of its provider!')
  return context
}
