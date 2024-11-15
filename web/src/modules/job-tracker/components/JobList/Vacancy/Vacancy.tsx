import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
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
      <TableRow>
        <TableCell>{company}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{salary}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{notes}</TableCell>
        <TableCell>
          <Tooltip title='Delete'>
            <IconButton onClick={() => deleteVacancy(_id)}>
              <DeleteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton onClick={() => showModal()}>
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      {vacancyModal}
    </>
  )
}

export default Vacancy
