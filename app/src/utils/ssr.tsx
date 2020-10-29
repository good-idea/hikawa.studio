import * as React from 'react'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { AllProviders } from '../providers'
import { createApolloClient } from '../services'

interface AppProps {
  children: React.ReactNode
  ssrClient: ApolloClient<any>
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

const StaticApp = ({ children, ssrClient }: AppProps) => {
  return (
    <AllProviders
      shopifyApolloClient={shopifyApolloClient}
      apolloClient={ssrClient}
    >
      {children}
    </AllProviders>
  )
}

interface SSRProps {
  apolloCache: NormalizedCacheObject
}

type ReactFnComponent = (props: any) => JSX.Element | null

export const getApolloCache = async (
  View: React.ComponentType | ReactFnComponent,
  viewProps: Record<string, any> = {},
): Promise<SSRProps> => {
  await ssrClient.cache.reset()

  const RenderedApp = (
    <StaticApp ssrClient={ssrClient}>
      <View {...viewProps} />
    </StaticApp>
  )

  await getDataFromTree(RenderedApp)
  const apolloCache = ssrClient.extract()
  return { apolloCache }
}
