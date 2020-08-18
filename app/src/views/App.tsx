import * as React from 'react'
import { AllProviders } from '../providers'
import { createApolloClient } from '../services'

interface AppProps {
  children: React.ReactNode
}

export const ssrClient = createApolloClient()

export const App = ({ children }: AppProps) => {
  return <AllProviders apolloClient={ssrClient}>{children}</AllProviders>
}
