import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
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
      <TableContainer component={Paper} sx={{ width: 'fit-content', p: 1 }}>
        <Table sx={{ minWidth: 650, maxWidth: 1250 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Vacancy</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Control</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacancies?.map((vacancy) => (
              <Vacancy key={vacancy._id} {...vacancy} />
            ))}
          </TableBody>
        </Table>
        <Box sx={{ mt: 1 }}>
          <Button size='small' variant='contained' onClick={showModal}>
            <AddIcon sx={{ fontSize: 16 }} /> Add new
          </Button>
        </Box>
      </TableContainer>

      {vacancyModal}
    </>
  )
}

export default JobList
