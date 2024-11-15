import * as React from 'react'

import Vacancy from './Vacancy/Vacancy'

import { useVacancyModal } from '../../hooks/useVacancyModal'
import { VacancyType } from '../../types'

interface JobListProps {
  vacancies: VacancyType[]
}

const JobList: React.FC<JobListProps> = ({ vacancies }) => {
  const [vacancyModal, showModal] = useVacancyModal('create')
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Vacancy</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {vacancies?.map((vacancy) => (
              <Vacancy key={vacancy._id} {...vacancy} />
            ))}
          </tbody>
        </table>
        <button onClick={showModal}>Add new</button>
      </div>
      {vacancyModal}
    </>
  )
}

export default JobList
