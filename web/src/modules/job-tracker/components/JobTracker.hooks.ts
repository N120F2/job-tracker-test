import { useCallback, useEffect, useState } from 'react'

import { useFetch } from '../../../shared/hooks/useFetch'
import { JobTrackerApiService } from '../service/ApiService'
import { VacancyType } from '../types'

export const useVacancies = () => {
  const [vacancies, setVacancies] = useState<VacancyType[]>([])

  const fetchCallback = useCallback(async () => {
    const data = await JobTrackerApiService.getVacancies()
    setVacancies(data)
  }, [])
  const [fetchVacancies, isFetching, error] = useFetch(fetchCallback, true)

  useEffect(() => {
    fetchVacancies()
  }, [fetchVacancies])

  return [vacancies, setVacancies, isFetching, error] as const
}
