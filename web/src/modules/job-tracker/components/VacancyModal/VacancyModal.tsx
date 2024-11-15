import { Box, Button, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import * as React from 'react'

import styles from './VacancyModal.module.css'

import Modal from '../../../../shared/components/Modal/Modal'

import { useAddVacancy } from '../../hooks/useAddVacancy'
import { useUpdateVacancy } from '../../hooks/useUpdateVacancy'

import { VacancyType } from '../../types'
type VacancyModalCreateProps = {
  mode: 'create'
  vacancy?: undefined
  hideModal: () => void
}
type VacancyModalUpdateProps = {
  mode: 'update'
  vacancy: VacancyType
  hideModal: () => void
}
type VacancyModalProps = VacancyModalCreateProps | VacancyModalUpdateProps

const VacancyModal: React.FC<VacancyModalProps> = ({ hideModal, vacancy, mode }) => {
  const [company, setCompany] = React.useState<string>(vacancy?.company ?? '')
  const [name, setName] = React.useState<string>(vacancy?.name ?? '')
  const [salary, setSalary] = React.useState<number>(vacancy?.salary ?? 0)
  const [status, setStatus] = React.useState<'active' | 'disabled'>(vacancy?.status ?? 'active')
  const [notes, setNotes] = React.useState<string>(vacancy?.notes ?? '')

  const addVacancy = useAddVacancy()
  const updateVacancy = useUpdateVacancy()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    switch (mode) {
      case 'create':
        addVacancy({
          company,
          name,
          salary,
          status,
          notes,
        })
        break
      case 'update':
        updateVacancy({
          _id: vacancy._id,
          company,
          name,
          salary,
          status,
          notes,
        })
        break
    }
    hideModal()
  }
  return (
    <Modal onClose={() => hideModal()}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputLabel>Company</InputLabel>
        <Input id='company' value={company} onChange={(e) => setCompany(e.target.value)} />
        <InputLabel>Name</InputLabel>
        <Input id='name' value={name} onChange={(e) => setName(e.target.value)} />
        <InputLabel>Salary</InputLabel>
        <Input
          id='salary'
          type='number'
          value={salary}
          onChange={(e) => setSalary(isNaN(+e.target.value) ? 0 : +e.target.value)}
        />
        <InputLabel>Status</InputLabel>
        <Select
          size='small'
          value={status}
          onChange={(e) => setStatus(e.target.value as 'active' | 'disabled')}
        >
          <MenuItem value={'active'}>Active</MenuItem>
          <MenuItem value={'disabled'}>Disabled</MenuItem>
        </Select>
        <InputLabel>Notes</InputLabel>
        <TextField
          multiline
          rows={4}
          id='notes'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='contained' type='submit'>
            Ok
          </Button>
        </Box>
      </form>
    </Modal>
  )
}

export default VacancyModal
