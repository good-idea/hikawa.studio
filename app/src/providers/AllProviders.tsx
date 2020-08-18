import * as React from 'react'
import { ApolloProvider, ApolloClient } from '@apollo/client'
import { ThemeProvider } from '@xstyled/styled-components'
import { SiteSettingsProvider } from './SiteSettings'
import { defaultTheme, GlobalStyles } from '../theme'
import { Announcement } from '../components/Announcement'
import { NavMenu } from '../components/Navigation'
import { Footer } from '../components/Footer'

interface AllProvidersProps {
  apolloClient: ApolloClient<any>
  children: React.ReactNode
}

export const AllProviders = ({ children, apolloClient }: AllProvidersProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ApolloProvider client={apolloClient}>
        <GlobalStyles />
        <SiteSettingsProvider>
          <Announcement />
          <NavMenu />
          {children}
          <Footer />
        </SiteSettingsProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}
