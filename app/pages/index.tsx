import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userApi, useGetUserListQuery } from '@/redux/userApi'
import { Button, Container, Divider, Typography } from '@mui/material'
import { UserTable } from '@/component/UserTable'
import { LoadingBar } from '@/component/LoadingBar'
import { dashboardAddUserStyle } from '@/styling/ts/dashboard'
import { AddUserModal } from '@/component/AddUserModal'
import { EditUserModal } from '@/component/EditUserModal'
import { UserFieldType, CatchErrorType, UserType, UpdateByIdRequest } from '@/types/user'
import { AnyAction } from '@reduxjs/toolkit'

export default function Page() {
  const dispatch = useDispatch()

  const [isAddModalShown, setAddModalShow] = useState<boolean>(false)
  const [isEditModalShown, setEditModalShow] = useState<boolean>(false)
  const [addErrorMsg, setAddErrorMsg] = useState<string>('')
  const [editErrorMsg, setEditErrorMsg] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<UserType>({
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    updatedAt: ''
  })
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const { page } = paginationModel
  const [addUser] = userApi.useAddUserMutation()
  const { isLoading, data } = useGetUserListQuery({ page })
  const [editUser] = userApi.useEditUserMutation()
  const [deleteUser] = userApi.useDeleteUserMutation()


  const toggleAddModal = () => {
    setAddModalShow(!isAddModalShown)
    setAddErrorMsg('')
  }

  const toggleEditModal = () => {
    setEditModalShow(!isEditModalShown)
    setEditErrorMsg('')
  }

  const initiateRefetch = () => {
    dispatch(userApi.endpoints.getUserList.initiate({page: 0}, {forceRefetch: true }) as unknown as AnyAction)
  }

  const submitAddHandler = (field: UserFieldType) => {
    addUser(field)
      .unwrap()
      .then(() => {
        toggleAddModal()
        setPaginationModel({ page: 0, pageSize: 5 })
        initiateRefetch()
      })
      .catch((e: CatchErrorType) => {
        setAddErrorMsg(e.data.message)
      })
  }

  const submitEditHandler = (field: UpdateByIdRequest) => {
    editUser(field)
      .unwrap()
      .then(() => {
        toggleEditModal()
        setPaginationModel({ page: 0, pageSize: 5 })
        initiateRefetch()
      })
      .catch((e: CatchErrorType) => {
        setEditErrorMsg(e.data.message)
      })
  }

  const deleteHandler = () => {
    const { id } = selectedUser

    deleteUser({ id })
      .unwrap()
      .then(() => {
        toggleEditModal()
        setPaginationModel({ page: 0, pageSize: 5 })
        initiateRefetch()
      })
      .catch((e: CatchErrorType) => {
        setEditErrorMsg(e.data.message)
      })
  }

  if (!data || isLoading) {
    return <LoadingBar />
  }

  const cellClickHandler = (e: { row: UserType }) => {
    const { row } = e
    setSelectedUser(row)
    toggleEditModal()
  }

  return <>
    <Container sx={dashboardAddUserStyle}>
      <Typography variant='h4' color='primary'>
        DASHBOARD
      </Typography>
      <Divider sx={{mb: 2, mt: 1}} />
      <Button variant='contained' onClick={toggleAddModal}>
        Add User
      </Button>
    </Container>
    <UserTable
      data={data}
      isLoading={isLoading}
      paginationModel={paginationModel}
      setPaginationModel={setPaginationModel}
      onCellClick={cellClickHandler}
    />
    {isAddModalShown &&
      <AddUserModal
        onClose={toggleAddModal}
        onSubmit={submitAddHandler}
        errorMsg={addErrorMsg}
      />}
    {isEditModalShown &&
      <EditUserModal
        onClose={toggleEditModal}
        onSubmit={submitEditHandler}
        onDelete={deleteHandler}
        errorMsg={editErrorMsg}
        defaultField={selectedUser}
      />}
  </>
}