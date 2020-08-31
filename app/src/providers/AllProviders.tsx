import * as React from 'react'
import { DocumentNode } from 'graphql'
import { ApolloProvider, ApolloClient } from '@apollo/client'
import { ThemeProvider } from '@xstyled/styled-components'
import { AnalyticsProvider } from './AnalyticsProvider'
import { SiteSettingsProvider } from './SiteSettings'
import { defaultTheme, GlobalStyles } from '../theme'
import { CheckoutProvider } from './CheckoutProvider'
import { Announcement } from '../components/Announcement'
import { NavMenu } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { MailerPopup } from '../components/Mailer'
import { CartModal } from '../components/Cart'

interface AllProvidersProps {
  apolloClient: ApolloClient<any>
  shopifyApolloClient: ApolloClient<any>
  children: React.ReactNode
}

export const AllProviders = ({
  children,
  shopifyApolloClient,
  apolloClient,
}: AllProvidersProps) => {
  return (
    <AnalyticsProvider>
      <ThemeProvider theme={defaultTheme}>
        <ApolloProvider client={apolloClient}>
          <CheckoutProvider client={shopifyApolloClient}>
            <GlobalStyles />
            <SiteSettingsProvider>
              <MailerPopup />
              <Announcement />
              <NavMenu />
              <CartModal />
              {children}
              <Footer />
            </SiteSettingsProvider>
          </CheckoutProvider>
        </ApolloProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  )
}
