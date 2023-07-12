import React, { useState } from 'react'
import { Container, Box, Button, Dialog, DialogTitle, TextField, Alert } from '@mui/material'
import { dialogTitleStyling } from '@/styling/ts/modal'
import { UserType, UpdateByIdRequest } from '@/types/user'

export interface EditUserModalProps {
  onClose: () => void
  onSubmit: (field: UpdateByIdRequest) => void
  onDelete: () => void
  errorMsg?: string
  defaultField: UserType
}


export const EditUserModal = (props: EditUserModalProps) => {
  const { onClose, onSubmit, onDelete, errorMsg, defaultField } = props
  const [usernameError, setUsernameError] = useState<string>('')
  const [firstnameError, setFirstnameError] = useState<string>('')
  const [lastnameError, setLastnameError] = useState<string>('')
  const [username, setUsername] = useState<string>(defaultField.username)
  const [firstname, setFirstname] = useState<string>(defaultField.firstname)
  const [lastname, setLastname] = useState<string>(defaultField.lastname)

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

      if (value !== username) {
        setUsername(value)
      }
      break
    case 'firstname':
      const firstnameResult = validate(6, 50, value)

      if (firstnameResult !== firstnameError) {
        setFirstnameError(firstnameResult)
      }

      if (value !== firstname) {
        setFirstname(value)
      }
      break
    case 'lastname':
      const lastnameResult = validate(0, 50, value)

      if (lastnameResult !== lastnameError) {
        setLastnameError(lastnameResult)
      }

      if (value !== lastname) {
        setLastname(value)
      }
      break
    }
  }

  const submitHandler = (event: any) => {
    event.preventDefault()

    onSubmit({
      id: defaultField.id,
      firstname,
      lastname
    })
  }

  const isSubmitable = !usernameError &&
    !firstnameError &&
    !lastnameError &&
    !!username &&
    !!firstname

  return (
    <Dialog onClose={onClose} open fullWidth maxWidth='sm'>
      <DialogTitle sx={dialogTitleStyling}>
        Edit User
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
            defaultValue={defaultField.username}
            disabled
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
            defaultValue={defaultField.firstname}
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
            defaultValue={defaultField.lastname}
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
            color='error'
            variant='contained'
            onClick={onDelete}
          >
            Delete
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
