import React, { useState } from 'react'
import { Container, Box, Button, Dialog, DialogTitle, TextField, Alert } from '@mui/material'
import { dialogTitleStyling } from '@/styling/ts/modal'
import { UserFieldType } from '@/types/user'

export interface AddUserModalProps {
  onClose: () => void
  onSubmit: (field: UserFieldType) => void
  errorMsg?: string
}


export const AddUserModal = (props: AddUserModalProps) => {
  const { onClose, onSubmit, errorMsg } = props
  const [usernameError, setUsernameError] = useState<string>('')
  const [firstnameError, setFirstnameError] = useState<string>('')
  const [lastnameError, setLastnameError] = useState<string>('')
  const [field, setField] = useState<UserFieldType>({
    username: '',
    firstname: '',
    lastname: ''
  })

  const validate = (min: number, max: number, value: string) => {
    const length = value.length

    if (min && length < min) return `Minimum length is ${min} char.`
    if (length > max) return `Maximum length is ${max} char.`
    return ''
  }

  const updateField = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const { value } = evt.target

    switch (type) {
    case 'username':
      const usernameResult = validate(6, 50, value)

      if (usernameResult !== usernameError) {
        setUsernameError(usernameResult)
      }
      break
    case 'firstname':
      const firstnameResult = validate(6, 50, value)

      if (firstnameResult !== firstnameError) {
        setFirstnameError(firstnameResult)
      }
      break
    case 'lastname':
      const lastnameResult = validate(0, 50, value)

      if (lastnameResult !== lastnameError) {
        setLastnameError(lastnameResult)
      }
      break
    }

    field[type] = value
    setField(field)
  }

  const submitHandler = (event: any) => {
    event.preventDefault()

    onSubmit(field)
  }

  const isSubmitable = !usernameError &&
    !firstnameError &&
    !lastnameError &&
    !!field.username &&
    !!field.firstname

  return (
    <Dialog onClose={onClose} open fullWidth maxWidth='sm'>
      <DialogTitle sx={dialogTitleStyling}>
        Add User
      </DialogTitle>
      <Container component='main' maxWidth='xs'>
        <Box
          component='form'
          onSubmit={isSubmitable ? submitHandler : undefined}
          noValidate
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <TextField
            label='Username'
            variant='outlined'
            fullWidth
            required
            error={!!usernameError}
            helperText={usernameError}
            onChange={evt => updateField(evt, 'username')}
            autoComplete='off'
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label='First Name'
            variant='outlined'
            fullWidth
            required
            error={!!firstnameError}
            helperText={firstnameError}
            onChange={evt => updateField(evt, 'firstname')}
            autoComplete='off'
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            id='lastname'
            label='Last Name'
            variant='outlined'
            fullWidth
            error={!!lastnameError}
            helperText={lastnameError}
            onChange={evt => updateField(evt, 'lastname')}
            autoComplete='off'
            inputProps={{ maxLength: 60 }}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3 }}
            disabled={!isSubmitable}
          >
            Submit
          </Button>
          <Button
            fullWidth
            color='warning'
            variant='contained'
            onClick={onClose}
          >
            Cancel
          </Button>
          {!errorMsg ? '' : (
            <Alert severity="error" sx={{ width: '100%' }}>{errorMsg}</Alert>
          )}
        </Box>
      </Container>
    </Dialog>
  )
}
