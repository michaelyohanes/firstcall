import { CircularProgress, Backdrop } from '@mui/material'

export const LoadingBar = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress color='primary' />
    </Backdrop>
  )
}