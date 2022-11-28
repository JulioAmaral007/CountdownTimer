import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './global'
import { Router } from './Router'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />

        <Router />
      </ThemeProvider>
    </BrowserRouter>
  )
}
