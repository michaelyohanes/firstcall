import { DataGrid, GridColDef } from '@mui/x-data-grid'
import moment from 'moment'

import { Paper } from '@mui/material'
import { UserType, ListResponse } from '@/types/user'
import { dataGridStyle } from '@/styling/ts/datagrid'
import { SetStateAction } from 'react'
import { Dispatch } from 'react'

const columns: GridColDef<UserType, any, any>[] = [
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'firstname',
    headerName: 'First Name',
    width: 150,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'lastname',
    headerName: 'Last Name',
    width: 150,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'updatedAt',
    headerName: 'Last Update',
    width: 220,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: any) => moment(params.row.updatedAt).format('lll'),
  }
]

interface UserTableProps {
  data: ListResponse | undefined
  isLoading: boolean
  paginationModel: { page: number, pageSize: number }
  setPaginationModel: Dispatch<SetStateAction<{
    page: number
    pageSize: number
  }>>
  onCellClick: (e: unknown) => void
}

export const UserTable = (props: UserTableProps) => {
  const { data, isLoading, paginationModel, setPaginationModel, onCellClick } = props

  if (!data) return <></>

  return (
    <Paper sx={dataGridStyle} elevation={3}>
      <DataGrid
        disableRowSelectionOnClick
        disableColumnMenu
        rows={data.rows}
        columns={columns}
        rowCount={data.count}
        loading={isLoading}
        pageSizeOptions={[5]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        onCellClick={onCellClick}
        sx={{
          '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
    </Paper>
  )
}
