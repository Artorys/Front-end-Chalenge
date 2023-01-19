import { ThemeProvider } from "styled-components"
import { Home } from "./pages/Home"
import { theme } from "./themes"
import { GlobalStyle } from "./global/style"
import { Profile } from "./pages/Profile"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Home></Home>
    </ThemeProvider>
  )
}

export default App
