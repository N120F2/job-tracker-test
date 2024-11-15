import { useCallback } from 'react'

import { useVacanciesContext } from './useVacanciesContext'

import { handleRequest } from '../../../shared/utils/utils'
import { JobTrackerApiService } from '../service/ApiService'

export const useDeleteVacancy = () => {
  const { setVacancies } = useVacanciesContext()

  return useCallback(
    async (id: string) => {
      handleRequest(async () => {
        await JobTrackerApiService.deleteVacancy(id)
        setVacancies((prev) => [...prev].filter((vacancy) => vacancy._id !== id))
      })
    },
    [setVacancies],
  )
}
