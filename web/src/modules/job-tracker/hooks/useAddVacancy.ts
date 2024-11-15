import { useCallback } from 'react'

import { useVacanciesContext } from './useVacanciesContext'

import { handleRequest } from '../../../shared/utils/utils'
import { JobTrackerApiService } from '../service/ApiService'
import { VacancyType } from '../types'

export const useAddVacancy = () => {
  const { setVacancies } = useVacanciesContext()

  return useCallback(
    async (data: Omit<VacancyType, '_id'>) => {
      handleRequest(async () => {
        const newVacancy = await JobTrackerApiService.createVacancy(data)
        setVacancies((prev) => [...prev, newVacancy])
      })
    },
    [setVacancies],
  )
}
