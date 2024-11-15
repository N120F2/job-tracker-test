import { useCallback } from 'react'

import { useVacanciesContext } from './useVacanciesContext'

import { handleRequest } from '../../../shared/utils/utils'
import { JobTrackerApiService } from '../service/ApiService'
import { VacancyType } from '../types'

export const useUpdateVacancy = () => {
  const { setVacancies } = useVacanciesContext()

  return useCallback(
    async (data: VacancyType) => {
      handleRequest(async () => {
        const updatedVacancy = await JobTrackerApiService.updateVacancy(data)
        setVacancies((prev) => {
          const copiedArr = [...prev]
          const index = copiedArr.findIndex((vacancy) => vacancy._id === updatedVacancy._id)
          copiedArr.splice(index, 1, updatedVacancy)
          return copiedArr
        })
      })
    },
    [setVacancies],
  )
}
