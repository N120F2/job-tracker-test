import * as React from 'react'

import { useDeleteVacancy } from '../../../hooks/useDeleteVacancy'

import { useVacancyModal } from '../../../hooks/useVacancyModal'

import { VacancyType } from '../../../types'
interface VacancyProps extends VacancyType {}

const Vacancy: React.FC<VacancyProps> = (props) => {
  const { company, name, notes, salary, status, _id } = props
  const [vacancyModal, showModal] = useVacancyModal('update', props)
  const deleteVacancy = useDeleteVacancy()
  return (
    <>
      <tr>
        <td>{company}</td>
        <td>{name}</td>
        <td>{salary}</td>
        <td>{status}</td>
        <td>{notes}</td>
        <td>
          <button onClick={() => deleteVacancy(_id)}>delete</button>
          <button onClick={() => showModal()}>edit</button>
        </td>
      </tr>
      {vacancyModal}
    </>
  )
}

export default Vacancy
