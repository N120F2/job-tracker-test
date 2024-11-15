import { createContext } from 'react'

import { IVacanciesContext } from '../types'

export const VacanciesContext = createContext<IVacanciesContext | null>(null)
VacanciesContext.displayName = 'VacanciesContext'
