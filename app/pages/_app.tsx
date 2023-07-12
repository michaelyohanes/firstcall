import { wrapper } from '@/redux/store'
import { Provider } from 'react-redux'
import { Container, CssBaseline } from '@mui/material'
import { dashboardStyle } from '@/styling/ts/dashboard'
import '@/styling/scss/datagrid.scss'

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return <>
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth='xl' sx={dashboardStyle}>
        <Component {...pageProps} />
      </Container>
    </Provider>
  </>
}