import type { AppProps } from 'next/app'

import { GlobalProvider } from 'client/context'

import Container from 'client/components/Container'
import Navigation from 'client/components/Navigation'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './style.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Container>
        <Navigation />
        <Component {...pageProps} />
      </Container>
    </GlobalProvider>
  )
}

export default MyApp
