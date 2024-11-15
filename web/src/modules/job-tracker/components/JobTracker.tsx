import * as React from 'react'

import Container from './Container/Container'
import JobList from './JobList/JobList'
import { useVacancies } from './JobTracker.hooks'

import { VacanciesContext } from '../context'
interface JobTrackerProps {}

const JobTracker: React.FC<JobTrackerProps> = () => {
  const [vacancies, setVacancies, isFetching, error] = useVacancies()

  if (isFetching) return <>Loading</>
  if (error) return <>Error: error</>
  return (
    <VacanciesContext.Provider value={{ vacancies, setVacancies }}>
      <Container>
        <div>Vacancies</div>
        <JobList vacancies={vacancies} />
      </Container>
    </VacanciesContext.Provider>
  )
}

export default JobTracker
