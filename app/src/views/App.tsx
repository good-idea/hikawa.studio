import * as React from 'react'
import { AllProviders } from '../providers'
import { createApolloClient } from '../services'

interface AppProps {
  children: React.ReactNode
}

const SANITY_GRAPHQL_URL = process.env.SANITY_GRAPHQL_URL
const SHOPIFY_GRAPHQL_URL = process.env.SHOPIFY_GRAPHQL_URL
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_GRAPHQL_URL

if (!SANITY_GRAPHQL_URL)
  throw new Error('You must provide a SANITY_GRAPHQL_URL')
if (!SHOPIFY_GRAPHQL_URL)
  throw new Error('You must provide a SHOPIFY_GRAPHQL_URL')
if (!SHOPIFY_STOREFRONT_TOKEN)
  throw new Error('You must provide a SHOPIFY_STOREFRONT_TOKEN')

export const ssrClient = createApolloClient({ uri: SANITY_GRAPHQL_URL })
export const shopifyApolloClient = createApolloClient({
  uri: SHOPIFY_GRAPHQL_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
  },
})

export const App = ({ children }: AppProps) => {
  return (
    <AllProviders
      shopifyApolloClient={shopifyApolloClient}
      apolloClient={ssrClient}
    >
      {children}
    </AllProviders>
  )
}
