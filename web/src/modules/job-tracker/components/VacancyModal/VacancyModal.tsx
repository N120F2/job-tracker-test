import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
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
  //need to display validation errors
  const [isFormValidated, setIsFormValidated] = React.useState<boolean>(false)

  const [company, setCompany] = React.useState<string>(vacancy?.company ?? '')
  const companyError = !company

  const [name, setName] = React.useState<string>(vacancy?.name ?? '')
  const nameError = !name

  const [salary, setSalary] = React.useState<number>(vacancy?.salary ?? 0)
  const salaryError = isNaN(+salary)

  const [status, setStatus] = React.useState<'active' | 'disabled'>(vacancy?.status ?? 'active')
  const [notes, setNotes] = React.useState<string>(vacancy?.notes ?? '')

  const addVacancy = useAddVacancy()
  const updateVacancy = useUpdateVacancy()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //Set flag foe form validation
    setIsFormValidated(true)
    if (companyError || nameError || salaryError) return
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
      <Box
        component={'form'}
        sx={{ display: 'flex', gap: 1 }}
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Typography style={{ textTransform: 'capitalize', fontSize: 24 }}>{mode}</Typography>
        <TextField
          size='small'
          label={'Company'}
          id='company'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          error={isFormValidated && companyError}
          helperText={isFormValidated && companyError ? 'Please enter company name!' : ''}
        />
        <TextField
          size='small'
          label={'Name'}
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={isFormValidated && nameError}
          helperText={isFormValidated && nameError ? 'Please enter vacancy name!' : ''}
        />

        <TextField
          size='small'
          label={'Salary'}
          id='salary'
          type='number'
          value={salary}
          onChange={(e) => setSalary(isNaN(+e.target.value) ? 0 : +e.target.value)}
          error={isFormValidated && salaryError}
          helperText={isFormValidated && salaryError ? 'Salary should be a number!' : ''}
          onFocus={(e) => e.target.select()}
        />
        <FormControl fullWidth>
          <InputLabel id='select-status-label'>Status</InputLabel>
          <Select
            label='Status'
            labelId='select-status-label'
            aria-describedby='select-helper'
            size='small'
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'disabled')}
          >
            <MenuItem value={'active'}>Active</MenuItem>
            <MenuItem value={'disabled'}>Disabled</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size='small'
          label={'Notes'}
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
      </Box>
    </Modal>
  )
}

export default VacancyModal
